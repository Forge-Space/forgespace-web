import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const CAMPAIGN_ID = process.env.GOOGLE_ADS_CAMPAIGN_ID || "23643368321";
const CAMPAIGN_NAME = process.env.GOOGLE_ADS_CAMPAIGN_NAME || "forgespace_br_en_visibility_v3";
const GOOGLE_ADS_CDP_URL = process.env.GOOGLE_ADS_CDP_URL || "http://127.0.0.1:9222";
const GOOGLE_ADS_OPERATOR_MODE = process.env.GOOGLE_ADS_OPERATOR_MODE || "full_automation";
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

function containsAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
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

function extractNamedConversion(conversionText, conversionName) {
  const tokens = tokenize(conversionText);
  const idx = tokens.findIndex((token) => token.includes(conversionName));
  if (idx < 0) {
    return { status: "missing", value: 0 };
  }

  const window = tokens.slice(idx, idx + 12);
  const status =
    window.find((token) => /Principal|Secund|Primary|Secondary|Inativo|Inactive/i.test(token)) ||
    "unknown";
  const numericToken = window.find((token) => isNumericToken(token)) || "0";

  return { status, value: parseBrNumber(numericToken) };
}

function extractGoalUsage(conversionText, goalName) {
  const tokens = tokenize(conversionText);
  const idx = tokens.findIndex((token) => token === goalName);
  if (idx < 0) {
    return { status: "missing", campaigns_using_goal: null };
  }

  const window = tokens.slice(idx, idx + 8);
  const usage = window.find((token) => /^\d+\s+de\s+\d+\s+campanhas$/i.test(token)) || null;
  return {
    status: usage ? "present" : "unknown",
    campaigns_using_goal: usage,
  };
}

function extractLifecycleSignals(conversionText) {
  return {
    section_present: /Otimização do ciclo de vida do cliente|Customer lifecycle/i.test(conversionText),
    warning_present: /aquisição de clientes|clientes inativos|customer acquisition|inactive customers/i
      .test(conversionText),
  };
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

function isAdTechUrl(url) {
  return /doubleclick|googlesyndication|googleadservices|pagead|googletagservices|ga-audiences/i
    .test(url);
}

function isActualBlockingFailure(failure) {
  return /ERR_BLOCKED_BY_CLIENT|blocked by client|ERR_NAME_NOT_RESOLVED|ERR_CONNECTION_REFUSED/i
    .test(failure.error);
}

function detectAuthRequirement(url, text) {
  return containsAny(`${url}\n${text}`, [
    /accounts\.google\.com/i,
    /ServiceLogin/i,
    /signin/i,
    /Fazer login/i,
    /Sign in/i,
    /Escolha uma conta/i,
    /Choose an account/i,
    /Verifique se é você/i,
    /2-Step Verification/i,
    /Verificação em duas etapas/i,
  ]);
}

function assertAdsSurface(pageName, url, text) {
  if (detectAuthRequirement(url, text)) {
    throw new Error(
      `[AUTH_REQUIRED] ${pageName} requires interactive Google login in the configured CDP browser session`,
    );
  }

  if (!/ads\.google\.com/i.test(url) && !/Google Ads/i.test(text)) {
    throw new Error(
      `[SESSION_INVALID] ${pageName} did not load a Google Ads surface (url=${url || "unknown"})`,
    );
  }
}

function detectAdBlockerSignals(pageInventory, pageSnapshots) {
  const inventoryText = pageInventory
    .map((entry) => `${entry.title} ${entry.url}`)
    .join("\n");
  const snapshotText = pageSnapshots.map((entry) => entry.text).join("\n");
  const extensionDetected = containsAny(inventoryText, [
    /AdBlock/i,
    /uBlock/i,
    /chrome-extension:/i,
    /chrome:\/\/extensions/i,
  ]);
  const bannerPresent = containsAny(snapshotText, [
    /Turn off ad blockers/i,
    /Google Ads can't work when you're using an ad blocker/i,
    /Desative os bloqueadores de anúncios/i,
  ]);

  return {
    extension_detected: extensionDetected,
    banner_present: bannerPresent,
  };
}

function extractLifecycleSelections(text) {
  const matches = [...text.matchAll(/(\d+)\s+selecionadas?\s+\(máximo de \d+\)/gi)];
  const selectedAudienceCount = matches.reduce(
    (total, match) => total + Number.parseInt(match[1] || "0", 10),
    0,
  );
  return {
    selected_audience_count: selectedAudienceCount,
    selected_audience_groups: matches.map((match) => match[0]),
  };
}

async function inspectLifecycleEditor(page) {
  const lifecycleEditButton = page.getByText("Editar meta", { exact: true }).first();
  if (!(await lifecycleEditButton.count())) {
    return {
      available: false,
      underlying_settings_clean: false,
      selected_audience_count: null,
      selected_audience_groups: [],
      warning_text_present: false,
    };
  }

  await lifecycleEditButton.click({ force: true, timeout: 20000 });
  await page.waitForTimeout(2500);
  const drawerText = await page.evaluate(() => document.body.innerText);
  const selections = extractLifecycleSelections(drawerText);
  const closeIcons = page.getByText("close", { exact: true });
  const visibleCloseIndexes = [];

  for (let i = 0; i < await closeIcons.count(); i += 1) {
    if (await closeIcons.nth(i).isVisible().catch(() => false)) {
      visibleCloseIndexes.push(i);
    }
  }

  const closeIndex = visibleCloseIndexes.at(-1);
  if (closeIndex !== undefined) {
    await closeIcons.nth(closeIndex).click({ force: true, timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1000);
  }

  return {
    available: true,
    underlying_settings_clean: selections.selected_audience_count === 0,
    selected_audience_count: selections.selected_audience_count,
    selected_audience_groups: selections.selected_audience_groups,
    warning_text_present: /aquisição de clientes|clientes inativos|customer acquisition|inactive customers/i
      .test(drawerText),
  };
}

function classifyBlockingSignals(adBlockerSignals, requestFailures) {
  const relevantFailures = requestFailures.filter((failure) => isAdTechUrl(failure.url));
  const actualBlockingFailures = relevantFailures.filter(isActualBlockingFailure);

  return {
    ...adBlockerSignals,
    relevant_failures: relevantFailures,
    actual_blocking_failures: actualBlockingFailures,
    actual_blocking_detected:
      adBlockerSignals.extension_detected || actualBlockingFailures.length > 0,
  };
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
  const deadline = Date.now() + 25000;
  while (Date.now() < deadline) {
    await page.waitForTimeout(1500);
    const text = await page.evaluate(() => document.body.innerText);
    const conversionsReady = !/\/aw\/conversions/.test(url) || containsAny(text, [
      /fs_cta_github_click/i,
      /\bInscrição\b/i,
      /Otimização do ciclo de vida do cliente/i,
    ]);
    const keywordsReady = !/\/aw\/keywords/.test(url) || containsAny(text, [
      new RegExp(CAMPAIGN_NAME.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      /Termos de pesquisa/i,
      /Nenhum termo de pesquisa/i,
    ]);

    if (conversionsReady && keywordsReady) {
      return {
        text,
        url: page.url(),
      };
    }
  }
  const text = await page.evaluate(() => document.body.innerText);
  return {
    text,
    url: page.url(),
  };
}

async function capturePage(page, url, artifactDir, name) {
  const snapshot = await getPageText(page, url);
  fs.writeFileSync(path.join(artifactDir, `${name}.txt`), snapshot.text);
  await page.screenshot({ path: path.join(artifactDir, `${name}.png`), fullPage: true });
  return snapshot;
}

async function listPages(context) {
  const pages = context.pages();
  return Promise.all(
    pages.map(async (candidate) => ({
      url: candidate.url(),
      title: await candidate.title().catch(() => ""),
    })),
  );
}

async function extractBidSignals(page) {
  return page.evaluate(() => {
    const inputSignals = Array.from(document.querySelectorAll("input")).map((element) => ({
      ariaLabel: element.getAttribute("aria-label") || "",
      ariaValueText: element.getAttribute("aria-valuetext") || "",
      value: (element.value || "").trim(),
      type: element.getAttribute("type") || "",
    }));
    const labeledText = Array.from(
      document.querySelectorAll("input, label, span, div, button"),
    )
      .map((element) =>
        [
          element.getAttribute("aria-label") || "",
          element.getAttribute("aria-valuetext") || "",
          element.textContent || "",
        ]
          .join(" ")
          .trim(),
      )
      .filter(Boolean);

    return {
      inputSignals,
      labeledText,
    };
  });
}

function hasCpcCap080(settingsText, settingsBidText, bidSignals) {
  const directInputMatch = bidSignals.inputSignals.some((signal) =>
    /0[,.]80/.test(signal.value || ""),
  );
  if (directInputMatch) return true;

  const labeledMatch = bidSignals.labeledText.some((text) =>
    /(cpc|lance|bid|clique|maximize clicks|maximizar cliques|limite máximo)/i.test(text) &&
    /0[,.]80/.test(text),
  );
  if (labeledMatch) return true;

  return /(cpc|lance|bid|limite máximo|maximizar cliques)[\s\S]{0,80}0[,.]80/i.test(
    `${settingsText}\n${settingsBidText}`,
  );
}

async function run() {
  const artifactDir = path.join(ARTIFACT_BASE, `${todayDate()}-checkpoint`);
  fs.mkdirSync(artifactDir, { recursive: true });
  const errorArtifact = path.join(artifactDir, "checkpoint-error.json");
  if (fs.existsSync(errorArtifact)) {
    fs.unlinkSync(errorArtifact);
  }

  const browser = await chromium.connectOverCDP(GOOGLE_ADS_CDP_URL);
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());
  const requestFailures = [];
  page.on("requestfailed", (request) => {
    requestFailures.push({
      url: request.url(),
      error: request.failure()?.errorText || "",
    });
  });
  const pageInventory = await listPages(context);

  const campaignSnapshot = await capturePage(
    page,
    "https://ads.google.com/aw/campaigns",
    artifactDir,
    "campaign",
  );
  assertAdsSurface("campaign", campaignSnapshot.url, campaignSnapshot.text);

  const settingsSnapshot = await capturePage(
    page,
    `https://ads.google.com/aw/settings/campaign/search?campaignId=${CAMPAIGN_ID}`,
    artifactDir,
    "settings",
  );
  assertAdsSurface("settings", settingsSnapshot.url, settingsSnapshot.text);
  const bidPanel = page.getByText("Maximizar cliques", { exact: true }).first();
  if (await bidPanel.count()) {
    await bidPanel.click({ force: true, timeout: 20000 });
    await page.waitForTimeout(2000);
  }
  const settingsBidText = await page.evaluate(() => document.body.innerText);
  const bidSignals = await extractBidSignals(page);
  const conversionSnapshot = await capturePage(
    page,
    "https://ads.google.com/aw/conversions",
    artifactDir,
    "conversions",
  );
  assertAdsSurface("conversions", conversionSnapshot.url, conversionSnapshot.text);
  const lifecycleEditor = await inspectLifecycleEditor(page);

  const keywordsSnapshot = await capturePage(
    page,
    `https://ads.google.com/aw/keywords?campaignId=${CAMPAIGN_ID}`,
    artifactDir,
    "keywords",
  );
  assertAdsSurface("keywords", keywordsSnapshot.url, keywordsSnapshot.text);
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
  const blockingSignals = classifyBlockingSignals(
    detectAdBlockerSignals(pageInventory, [
      campaignSnapshot,
      settingsSnapshot,
      conversionSnapshot,
      keywordsSnapshot,
      { text: searchTermsText, url: page.url() },
    ]),
    requestFailures,
  );

  if (blockingSignals.actual_blocking_detected) {
    throw new Error(
      `[AD_BLOCKER_DETECTED] ${JSON.stringify(blockingSignals)}`,
    );
  }

  const metrics = extractCampaignMetrics(campaignSnapshot.text);
  const conversions = extractConversions(conversionSnapshot.text);
  const signupConversion = extractNamedConversion(conversionSnapshot.text, "Inscrição");
  const signupGoalUsage = extractGoalUsage(conversionSnapshot.text, "Inscrição");
  const lifecycleSignals = extractLifecycleSignals(conversionSnapshot.text);
  const searchTerms = metrics.clicks === 0 ? [] : extractSearchTerms(searchTermsText);
  const classification = classifySearchTerms(searchTerms, readNegativeKeywords());
  const primary = conversions.fs_cta_github_click?.value || 0;
  const checkpoint = determineCheckpoint(metrics.spend_brl);
  const decision = determineDecision(metrics, primary, classification.irrelevant_share_percent);

  const summary = {
    captured_at: nowIso(),
    campaign_id: CAMPAIGN_ID,
    campaign_name: CAMPAIGN_NAME,
    cdp_url: GOOGLE_ADS_CDP_URL,
    operator_mode: GOOGLE_ADS_OPERATOR_MODE,
    checkpoint_brl: checkpoint,
    metrics,
    conversions,
    visibility_goal_audit: {
      goal_scope: "campaign_specific_visibility",
      primary_action: "fs_cta_github_click",
      secondary_actions: [
        "fs_cta_contact_sales_click",
        "fs_cta_siza_click",
      ],
      excluded_primary_actions: ["Inscrição"],
      customer_lifecycle_goal: "disabled",
      observed: {
        signup_conversion: signupConversion,
        signup_goal_usage: signupGoalUsage,
        lifecycle: lifecycleSignals,
        lifecycle_editor: lifecycleEditor,
      },
    },
    browser_session: {
      pages: pageInventory,
      ad_blocker_signals: blockingSignals,
    },
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
      budget_r5_day: /R\$\s*5,00\/dia/.test(settingsSnapshot.text.replace(/\u00a0/g, " ")),
      search_only: /Rede de pesquisa do Google/.test(settingsSnapshot.text) &&
        !/Parceiros de pesquisa/.test(settingsSnapshot.text) &&
        !/Rede de Display/.test(settingsSnapshot.text),
      english_language: /Idiomas[\s\S]{0,80}English/.test(settingsSnapshot.text),
      brazil_location: /Locais[\s\S]{0,80}Brasil/.test(settingsSnapshot.text),
      cpc_cap_080: hasCpcCap080(settingsSnapshot.text, settingsBidText, bidSignals),
      conversion_primary_github:
        /fs_cta_github_click[\s\S]{0,120}Principal/.test(conversionSnapshot.text),
      contact_sales_secondary:
        /fs_cta_contact_sales_click[\s\S]{0,120}(Secund|Secondary)/.test(conversionSnapshot.text),
      siza_secondary:
        /fs_cta_siza_click[\s\S]{0,120}(Secund|Secondary)/.test(conversionSnapshot.text),
      signup_not_primary:
        !/Principal|Primary/.test(signupConversion.status) ||
        /^0\s+de\s+\d+\s+campanhas$/i.test(signupGoalUsage.campaigns_using_goal || ""),
      no_customer_lifecycle_warning: lifecycleEditor.underlying_settings_clean,
      lifecycle_warning_text_present: lifecycleSignals.warning_present,
      ad_blocker_banner_present: blockingSignals.banner_present,
      actual_blocking_detected: blockingSignals.actual_blocking_detected,
    },
  };

  fs.writeFileSync(path.join(artifactDir, "checkpoint-summary.json"), JSON.stringify(summary, null, 2));
  writeScorecard(metrics, checkpoint, primary, classification.irrelevant_share_percent, decision);

  await browser.close();
  console.log(JSON.stringify(summary, null, 2));
}

run().catch((error) => {
  const artifactDir = path.join(ARTIFACT_BASE, `${todayDate()}-checkpoint`);
  fs.mkdirSync(artifactDir, { recursive: true });
  const diagnostic = {
    captured_at: nowIso(),
    cdp_url: GOOGLE_ADS_CDP_URL,
    operator_mode: GOOGLE_ADS_OPERATOR_MODE,
    error: String(error),
  };
  fs.writeFileSync(
    path.join(artifactDir, "checkpoint-error.json"),
    JSON.stringify(diagnostic, null, 2),
  );
  console.error(String(error));
  process.exit(1);
});
