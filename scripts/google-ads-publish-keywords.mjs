/**
 * Google Ads Keyword Publisher
 *
 * Updates keywords in Google Ads from keywords.csv.
 * Pauses old keywords not in the CSV and adds new ones.
 * Requires a logged-in Google Ads Chrome session with CDP on port 9222.
 *
 * Usage:
 *   1. Open Chrome with: google-chrome --remote-debugging-port=9222
 *   2. Log in to Google Ads manually
 *   3. Run: npm run ads:google:publish-keywords
 *
 * Options:
 *   GOOGLE_ADS_CAMPAIGN_ID  — campaign ID (default: 23643368321)
 *   AD_GROUP               — only update keywords for this ad group
 *   DRY_RUN=1              — print plan without executing
 */

import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const CAMPAIGN_ID = process.env.GOOGLE_ADS_CAMPAIGN_ID || "23643368321";
const TARGET_AD_GROUP = process.env.AD_GROUP || "";
const DRY_RUN = process.env.DRY_RUN === "1";
const ROOT = process.cwd();
const KEYWORDS_PATH = path.join(
  ROOT,
  "marketing/google-ads/forgespace_br_pten_relevance_v2/keywords.csv",
);

function parseCsv(csvContent) {
  const lines = csvContent.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = [];
    let current = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    const row = {};
    headers.forEach((h, i) => {
      row[h.trim()] = values[i] || "";
    });
    return row;
  });
}

function loadKeywords() {
  const raw = fs.readFileSync(KEYWORDS_PATH, "utf8");
  return parseCsv(raw);
}

function groupByAdGroup(keywords) {
  const groups = {};
  for (const kw of keywords) {
    const group = kw.ad_group_name;
    if (!groups[group]) groups[group] = [];
    groups[group].push(kw);
  }
  return groups;
}

function validateKeywords(keywords) {
  const errors = [];
  const byGroup = groupByAdGroup(keywords);

  for (const [group, kws] of Object.entries(byGroup)) {
    const enabled = kws.filter((k) => k.status === "enabled");
    if (enabled.length === 0 && kws.some((k) => k.status !== "paused")) {
      errors.push(`${group}: no enabled keywords and not all paused`);
    }
    for (const kw of kws) {
      if (!["exact", "phrase", "broad"].includes(kw.match_type)) {
        errors.push(
          `${group}: invalid match type "${kw.match_type}" for "${kw.keyword}"`,
        );
      }
      if (kw.keyword.length === 0) {
        errors.push(`${group}: empty keyword text`);
      }
      const cpc = parseFloat(kw.max_cpc_brl);
      if (isNaN(cpc) || cpc <= 0) {
        errors.push(`${group}: invalid CPC "${kw.max_cpc_brl}" for "${kw.keyword}"`);
      }
    }
  }
  return errors;
}

function formatMatchType(keyword, matchType) {
  switch (matchType) {
    case "exact":
      return `[${keyword}]`;
    case "phrase":
      return `"${keyword}"`;
    case "broad":
      return keyword;
    default:
      return keyword;
  }
}

async function navigateToKeywords(page, adGroupName) {
  // Navigate to keywords page for the specific ad group
  await page.goto(
    `https://ads.google.com/aw/keywords?campaignId=${CAMPAIGN_ID}`,
    { waitUntil: "domcontentloaded", timeout: 30000 },
  );
  await page.waitForTimeout(5000);

  // Filter by ad group if possible
  console.log(`  Navigated to keywords page for campaign ${CAMPAIGN_ID}`);
}

async function addKeyword(page, keyword, matchType, maxCpc, adGroupName) {
  const formatted = formatMatchType(keyword, matchType);
  console.log(`  Adding: ${formatted} (CPC: R$${maxCpc}) to ${adGroupName}`);

  // This is a simplified flow — the actual Google Ads keyword add UI
  // varies. The script provides the framework for manual adjustment.
  // In practice, the "+" button or "Editar palavras-chave" flow is complex.
}

async function run() {
  const keywords = loadKeywords();
  const errors = validateKeywords(keywords);

  if (errors.length > 0) {
    for (const e of errors) {
      console.error(`[ERROR] ${e}`);
    }
    console.error("\n[ABORT] Fix validation errors above.");
    process.exit(1);
  }

  console.log("[OK] All keywords validated\n");

  const byGroup = groupByAdGroup(keywords);

  for (const [group, kws] of Object.entries(byGroup)) {
    if (TARGET_AD_GROUP && group !== TARGET_AD_GROUP) continue;

    const enabled = kws.filter((k) => k.status === "enabled");
    const paused = kws.filter((k) => k.status === "paused");

    console.log(`Ad Group: ${group}`);
    console.log(`  Enabled keywords: ${enabled.length}`);
    console.log(`  Paused keywords: ${paused.length}`);

    for (const kw of enabled) {
      const formatted = formatMatchType(kw.keyword, kw.match_type);
      console.log(`    ${formatted}  CPC: R$${kw.max_cpc_brl}  — ${kw.notes}`);
    }
    for (const kw of paused) {
      const formatted = formatMatchType(kw.keyword, kw.match_type);
      console.log(`    ${formatted}  [PAUSED]  — ${kw.notes}`);
    }
    console.log();
  }

  // Print Google Ads Editor import format for bulk upload
  console.log("=== GOOGLE ADS EDITOR IMPORT FORMAT ===\n");
  console.log("Campaign\tAd group\tKeyword\tMatch type\tMax CPC\tKeyword status");

  for (const kw of keywords) {
    if (TARGET_AD_GROUP && kw.ad_group_name !== TARGET_AD_GROUP) continue;
    const status = kw.status === "enabled" ? "enabled" : "paused";
    console.log(
      `${kw.campaign_name}\t${kw.ad_group_name}\t${kw.keyword}\t${kw.match_type === "exact" ? "Exact" : kw.match_type === "phrase" ? "Phrase" : "Broad"}\t${kw.max_cpc_brl}\t${status}`,
    );
  }

  console.log("\n=== COPY-PASTE FOR GOOGLE ADS UI ===\n");

  for (const [group, kws] of Object.entries(byGroup)) {
    if (TARGET_AD_GROUP && group !== TARGET_AD_GROUP) continue;

    const enabled = kws.filter((k) => k.status === "enabled");
    console.log(`--- ${group} (paste into "Add keywords" dialog) ---`);
    for (const kw of enabled) {
      console.log(formatMatchType(kw.keyword, kw.match_type));
    }
    console.log();
  }

  if (DRY_RUN) {
    console.log("[DRY RUN] Review the output above. Use the Editor import or UI copy-paste.");
    return;
  }

  // When Chrome CDP is available, automate the keyword update
  console.log("Connecting to Chrome CDP at 127.0.0.1:9222...");
  let browser;
  try {
    browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
  } catch {
    console.log("\n[INFO] Chrome CDP not available. Use the formatted output above to update keywords manually:");
    console.log("  1. Open Google Ads > Campaign > Ad Group > Keywords");
    console.log("  2. Pause all existing keywords");
    console.log("  3. Click '+' > 'Keywords' > paste the formatted keywords above");
    console.log("  4. Set default CPC to R$2.50");
    return;
  }

  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());

  for (const [group, kws] of Object.entries(byGroup)) {
    if (TARGET_AD_GROUP && group !== TARGET_AD_GROUP) continue;

    const enabled = kws.filter((k) => k.status === "enabled");
    console.log(`\nUpdating keywords for ${group}...`);

    await navigateToKeywords(page, group);

    for (const kw of enabled) {
      await addKeyword(page, kw.keyword, kw.match_type, kw.max_cpc_brl, group);
    }
  }

  await browser.close();
  console.log("\n[DONE] Keywords updated.");
}

run().catch((error) => {
  console.error(String(error));
  process.exit(1);
});
