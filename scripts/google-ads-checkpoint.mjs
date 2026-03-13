import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const CAMPAIGN_ID = process.env.GOOGLE_ADS_CAMPAIGN_ID || "23643368321";
const CAMPAIGN_NAME = process.env.GOOGLE_ADS_CAMPAIGN_NAME || "forgespace_br_en_visibility_v3";
const ROOT = process.cwd();
const CAMPAIGN_DIR = path.join(
  ROOT,
  "marketing/google-ads/forgespace_br_pten_relevance_v2",
);
const NEGATIVE_KEYWORDS_FILE = path.join(CAMPAIGN_DIR, "negative-keywords.csv");
const ARTIFACT_BASE = path.join(CAMPAIGN_DIR, "artifacts");
const SCORECARD_LIVE = path.join(CAMPAIGN_DIR, "checkpoint-scorecard-live.csv");

function nowIso() {
  return new Date().toISOString();
}

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeSpaces(text) {
  return text.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(text) {
  return text
    .replace(/\u00a0/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseBrNumber(raw) {
  if (!raw) return 0;
  const value = raw.replace(/[^0-9,.-]/g, "").replace(/\./g, "").replace(",", ".");
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function isNumericToken(raw) {
  if (!raw) return false;
  let hasDigit = false;

  for (const char of raw) {
    if (char >= "0" && char <= "9") {
      hasDigit = true;
      continue;
    }
    if (char === "." || char === ",") {
      continue;
    }
    return false;
  }

  return hasDigit;
}

function formatCsvNumber(raw, digits = 2) {
  return raw.toFixed(digits);
}

function extractCampaignMetrics(campaignText) {
  const tokens = tokenize(campaignText);
  const index = tokens.findIndex((token) => token === CAMPAIGN_NAME);
  if (index < 0) {
    return {
      found: false,
      budget_brl: 0,
      spend_brl: 0,
      impressions: 0,
      clicks: 0,
      ctr_percent: 0,
      avg_cpc_brl: 0,
      status: "unknown",
    };
  }

  const budget = parseBrNumber(tokens[index + 2] || "");
  const status = tokens[index + 3] || "";
  const impressions = parseBrNumber(tokens[index + 6] || "0");
  const ctr = parseBrNumber(tokens[index + 7] || "0");
  const spend = parseBrNumber(tokens[index + 8] || "0");
  const clicks = parseBrNumber(tokens[index + 10] || "0");
  const avgCpc = clicks > 0 ? spend / clicks : 0;

  return {
    found: true,
    budget_brl: budget,
    spend_brl: spend,
    impressions,
    clicks,
    ctr_percent: ctr,
    avg_cpc_brl: avgCpc,
    status,
  };
}

function extractConversions(conversionText) {
  const tokens = tokenize(conversionText);
  const events = [
    "fs_cta_github_click",
    "fs_cta_contact_sales_click",
    "fs_cta_siza_click",
  ];

  const result = {};
  for (const eventName of events) {
    const idx = tokens.findIndex((token) => token.includes(eventName));
    if (idx < 0) {
      result[eventName] = { status: "missing", value: 0 };
      continue;
    }

    const window = tokens.slice(idx, idx + 10);
    const status = window.find((token) => /Principal|Secund|Primary|Secondary/i.test(token)) || "unknown";
    const numericToken = window.find((token) => isNumericToken(token)) || "0";
    result[eventName] = { status, value: parseBrNumber(numericToken) };
  }

  return result;
}

function extractDelimitedTerms(text) {
  const terms = [];
  const length = text.length;

  for (let i = 0; i < length; i += 1) {
    const opener = text[i];
    if (opener !== "\"" && opener !== "[") continue;

    const closer = opener === "\"" ? "\"" : "]";
    const end = text.indexOf(closer, i + 1);
    if (end < 0) continue;

    const value = text.slice(i + 1, end).trim();
    if (value) {
      terms.push(value);
    }
    i = end;
  }

  return terms;
}

function readNegativeKeywords() {
  const csv = fs.readFileSync(NEGATIVE_KEYWORDS_FILE, "utf8");
  return csv
    .split("\n")
    .slice(1)
    .map((row) => row.split(",")[1]?.replace(/^"|"$/g, "").trim())
    .filter(Boolean)
    .map((value) => value.toLowerCase());
}

function extractSearchTerms(keywordText) {
  const normalized = normalizeSpaces(keywordText).toLowerCase();
  if (normalized.includes("nenhum termo de pesquisa")) {
    return [];
  }

  return [...new Set(extractDelimitedTerms(keywordText))];
}

function classifySearchTerms(searchTerms, negativeKeywords) {
  if (searchTerms.length === 0) {
    return { irrelevant_share_percent: 0, irrelevant_terms: [] };
  }

  const irrelevant = searchTerms.filter((term) => {
    const lower = term.toLowerCase();
    return negativeKeywords.some((negative) => lower.includes(negative));
  });

  return {
    irrelevant_share_percent: (irrelevant.length / searchTerms.length) * 100,
    irrelevant_terms: irrelevant,
  };
}

function determineCheckpoint(spend) {
  if (spend < 3) return 3;
  if (spend < 6) return 3;
  if (spend < 8) return 6;
  return 8;
}

function determineDecision(metrics, primaryCount, irrelevantShare) {
  if (metrics.spend_brl >= 6 && metrics.ctr_percent < 1.5) {
    return "pause_early_ctr_below_1_5";
  }
  if (metrics.spend_brl >= 8 && primaryCount >= 1) {
    return "continue_primary_conversion_hit";
  }
  if (metrics.spend_brl >= 8 && metrics.ctr_percent >= 3 && irrelevantShare <= 30) {
    return "continue_high_intent_signal";
  }
  if (metrics.spend_brl >= 8) {
    return "pause_no_intent_signal_by_r8";
  }
  return "monitor_until_next_checkpoint";
}

function readExistingScorecard() {
  if (!fs.existsSync(SCORECARD_LIVE)) return {};

  const lines = fs
    .readFileSync(SCORECARD_LIVE, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length <= 1) return {};

  const existing = {};
  for (const line of lines.slice(1)) {
    const cells = line.split(",");
    const checkpoint = Number.parseInt(cells[0], 10);
    if (!Number.isFinite(checkpoint)) continue;
    existing[checkpoint] = cells;
  }
  return existing;
}

function writeScorecard(metrics, checkpoint, primaryCount, irrelevantShare, decision) {
  const header =
    "checkpoint_brl,date,spend_brl,impressions,clicks,ctr_percent,avg_cpc_brl,primary_cta_count,primary_cta_rate_percent,irrelevant_query_share_percent,new_negative_keywords,keywords_paused,decision";
  const existing = readExistingScorecard();
  const rate = metrics.clicks > 0 ? (primaryCount / metrics.clicks) * 100 : 0;
  existing[checkpoint] = [
    String(checkpoint),
    todayDate(),
    formatCsvNumber(metrics.spend_brl, 2),
    String(Math.round(metrics.impressions)),
    String(Math.round(metrics.clicks)),
    formatCsvNumber(metrics.ctr_percent, 2),
    formatCsvNumber(metrics.avg_cpc_brl, 2),
    formatCsvNumber(primaryCount, 2),
    formatCsvNumber(rate, 2),
    formatCsvNumber(irrelevantShare, 2),
    "",
    "",
    decision,
  ];

  const rows = [3, 6, 8].map((cp) => {
    const row = existing[cp];
    if (!row) return `${cp},,,,,,,,,,,,`;
    if (row.length >= 13) return row.slice(0, 13).join(",");
    return [...row, ...Array.from({ length: 13 - row.length }, () => "")].join(",");
  });

  fs.writeFileSync(SCORECARD_LIVE, `${header}\n${rows.join("\n")}\n`, "utf8");
}

async function getPageText(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(8000);
  return page.evaluate(() => document.body.innerText);
}

async function capturePage(page, url, artifactDir, name) {
  const text = await getPageText(page, url);
  fs.writeFileSync(path.join(artifactDir, `${name}.txt`), text);
  await page.screenshot({ path: path.join(artifactDir, `${name}.png`), fullPage: true });
  return text;
}

async function run() {
  const artifactDir = path.join(ARTIFACT_BASE, `${todayDate()}-checkpoint`);
  fs.mkdirSync(artifactDir, { recursive: true });

  const browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());

  const campaignText = await capturePage(
    page,
    "https://ads.google.com/aw/campaigns",
    artifactDir,
    "campaign",
  );
  const settingsText = await capturePage(
    page,
    `https://ads.google.com/aw/settings/campaign/search?campaignId=${CAMPAIGN_ID}`,
    artifactDir,
    "settings",
  );
  const bidPanel = page.getByText("Maximizar cliques", { exact: true }).first();
  if (await bidPanel.count()) {
    await bidPanel.click({ force: true, timeout: 20000 });
    await page.waitForTimeout(2000);
  }
  const settingsBidText = await page.evaluate(() => document.body.innerText);
  const bidMoneyValues = await page.evaluate(() =>
    Array.from(document.querySelectorAll("input"))
      .filter((el) => el.getAttribute("type") === "money64")
      .map((el) => (el.value || "").trim()),
  );
  const conversionText = await capturePage(
    page,
    "https://ads.google.com/aw/conversions",
    artifactDir,
    "conversions",
  );
  await capturePage(
    page,
    `https://ads.google.com/aw/keywords?campaignId=${CAMPAIGN_ID}`,
    artifactDir,
    "keywords",
  );
  const searchTermsToggle = page.getByText("Termos de pesquisa", { exact: true }).first();
  if (await searchTermsToggle.count()) {
    try {
      await searchTermsToggle.click({ force: true, timeout: 20000 });
      await page.waitForTimeout(3000);
    } catch {
      await page.waitForTimeout(500);
    }
  }
  const searchTermsText = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync(path.join(artifactDir, "search-terms.txt"), searchTermsText);
  await page.screenshot({ path: path.join(artifactDir, "search-terms.png"), fullPage: true });

  const metrics = extractCampaignMetrics(campaignText);
  const conversions = extractConversions(conversionText);
  const searchTerms = metrics.clicks === 0 ? [] : extractSearchTerms(searchTermsText);
  const classification = classifySearchTerms(searchTerms, readNegativeKeywords());
  const primary = conversions.fs_cta_github_click?.value || 0;
  const checkpoint = determineCheckpoint(metrics.spend_brl);
  const decision = determineDecision(metrics, primary, classification.irrelevant_share_percent);

  const summary = {
    captured_at: nowIso(),
    campaign_id: CAMPAIGN_ID,
    campaign_name: CAMPAIGN_NAME,
    checkpoint_brl: checkpoint,
    metrics,
    conversions,
    search_terms: {
      total: searchTerms.length,
      terms: searchTerms,
    },
    classification,
    actions: {
      negatives_added: [],
      keywords_paused: [],
    },
    decision,
    guardrails: {
      budget_r5_day: /R\$\s*5,00\/dia/.test(settingsText.replace(/\u00a0/g, " ")),
      search_only: /Rede de pesquisa do Google/.test(settingsText) &&
        !/Parceiros de pesquisa/.test(settingsText) &&
        !/Rede de Display/.test(settingsText),
      english_language: /Idiomas[\s\S]{0,80}English/.test(settingsText),
      brazil_location: /Locais[\s\S]{0,80}Brasil/.test(settingsText),
      cpc_cap_080:
        /0,80/.test(settingsText) ||
        /0,80/.test(settingsBidText) ||
        bidMoneyValues.includes("0,80"),
      conversion_primary_github: /fs_cta_github_click[\s\S]{0,120}Principal/.test(conversionText),
    },
  };

  fs.writeFileSync(path.join(artifactDir, "checkpoint-summary.json"), JSON.stringify(summary, null, 2));
  writeScorecard(metrics, checkpoint, primary, classification.irrelevant_share_percent, decision);

  await browser.close();
  console.log(JSON.stringify(summary, null, 2));
}

run().catch((error) => {
  console.error(String(error));
  process.exit(1);
});
