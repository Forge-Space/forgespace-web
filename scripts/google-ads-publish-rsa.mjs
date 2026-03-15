/**
 * Google Ads RSA Publisher
 *
 * Creates Responsive Search Ads in Google Ads from rsa.json.
 * Requires a logged-in Google Ads Chrome session with CDP on port 9222.
 *
 * Usage:
 *   1. Open Chrome with: google-chrome --remote-debugging-port=9222
 *   2. Log in to Google Ads manually
 *   3. Run: npm run ads:google:publish-rsa
 *
 * Options:
 *   GOOGLE_ADS_CAMPAIGN_ID  — campaign ID (default: 23643368321)
 *   AD_GROUP               — only publish ads for this ad group (e.g. "smb_en")
 *   DRY_RUN=1              — print what would be created without executing
 */

import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const CAMPAIGN_ID = process.env.GOOGLE_ADS_CAMPAIGN_ID || "23643368321";
const TARGET_AD_GROUP = process.env.AD_GROUP || "";
const DRY_RUN = process.env.DRY_RUN === "1";
const ROOT = process.cwd();
const RSA_PATH = path.join(ROOT, "marketing/google-ads/forgespace_br_pten_relevance_v2/rsa.json");

function loadRsa() {
  const raw = fs.readFileSync(RSA_PATH, "utf8");
  return JSON.parse(raw);
}

function validateHeadlines(headlines) {
  const errors = [];
  for (const h of headlines) {
    if (h.length > 30) {
      errors.push(`Headline over 30 chars (${h.length}): "${h}"`);
    }
  }
  if (headlines.length < 3 || headlines.length > 15) {
    errors.push(`Need 3-15 headlines, got ${headlines.length}`);
  }
  return errors;
}

function validateDescriptions(descriptions) {
  const errors = [];
  for (const d of descriptions) {
    if (d.length > 90) {
      errors.push(`Description over 90 chars (${d.length}): "${d}"`);
    }
  }
  if (descriptions.length < 2 || descriptions.length > 4) {
    errors.push(`Need 2-4 descriptions, got ${descriptions.length}`);
  }
  return errors;
}

function validateUrl(url) {
  try {
    const u = new URL(url);
    const validPaths = ["/", "/features", "/pricing", "/ecosystem", "/roadmap", "/enterprise"];
    if (u.hostname === "forgespace.co" && !validPaths.includes(u.pathname)) {
      return [`URL path ${u.pathname} is not a known route. Valid: ${validPaths.join(", ")}`];
    }
    return [];
  } catch {
    return [`Invalid URL: ${url}`];
  }
}

async function typeInField(page, selector, text) {
  const field = page.locator(selector).first();
  await field.click();
  await field.fill("");
  await field.fill(text);
  await page.waitForTimeout(300);
}

async function createRsaAd(page, adGroup, ad, finalUrl, displayPath1, displayPath2) {
  const label = `${adGroup}/${ad.variant}`;
  console.log(`\n--- Creating RSA: ${label} ---`);

  // Navigate to ad creation for the specific ad group
  // First, go to the ads page for the campaign
  await page.goto(
    `https://ads.google.com/aw/ads?campaignId=${CAMPAIGN_ID}`,
    { waitUntil: "domcontentloaded", timeout: 30000 },
  );
  await page.waitForTimeout(5000);

  // Click "Criar anúncio" (Create ad) button
  const createBtn = page.locator('button:has-text("Criar anúncio")').first();
  if (!(await createBtn.count())) {
    throw new Error(`Cannot find "Criar anúncio" button for ${label}`);
  }
  await createBtn.click();
  await page.waitForTimeout(3000);

  // Select "Anúncio responsivo de pesquisa" if prompted
  const rsaOption = page.locator('text="Anúncio responsivo de pesquisa"').first();
  if (await rsaOption.count()) {
    await rsaOption.click();
    await page.waitForTimeout(2000);
  }

  // Select the correct ad group
  const adGroupSelector = page.locator(`text="${adGroup}"`).first();
  if (await adGroupSelector.count()) {
    await adGroupSelector.click();
    await page.waitForTimeout(1000);
  }

  // Wait for the RSA editor to load
  await page.waitForTimeout(3000);

  // Fill in the Final URL
  const urlField = page.locator('input[aria-label*="URL final"], input[placeholder*="URL"]').first();
  if (await urlField.count()) {
    await urlField.click();
    await urlField.fill(finalUrl);
    await page.waitForTimeout(500);
  }

  // Fill display URL paths
  if (displayPath1) {
    const path1Field = page.locator('input[aria-label*="Caminho 1"], input[aria-label*="Path 1"]').first();
    if (await path1Field.count()) {
      await path1Field.fill(displayPath1);
    }
  }
  if (displayPath2) {
    const path2Field = page.locator('input[aria-label*="Caminho 2"], input[aria-label*="Path 2"]').first();
    if (await path2Field.count()) {
      await path2Field.fill(displayPath2);
    }
  }

  // Fill headlines
  for (let i = 0; i < ad.headlines.length; i++) {
    const headline = ad.headlines[i];
    // Try to find headline input fields
    const headlineFields = page.locator('input[aria-label*="Título"], input[aria-label*="Headline"]');
    const fieldCount = await headlineFields.count();

    if (i < fieldCount) {
      await headlineFields.nth(i).click();
      await headlineFields.nth(i).fill(headline);
      await page.waitForTimeout(200);
    } else {
      // Need to add more headline fields
      const addHeadlineBtn = page.locator('button:has-text("Adicionar título"), button:has-text("Add headline")').first();
      if (await addHeadlineBtn.count()) {
        await addHeadlineBtn.click();
        await page.waitForTimeout(500);
        // Fill the newly added field
        const updatedFields = page.locator('input[aria-label*="Título"], input[aria-label*="Headline"]');
        const newCount = await updatedFields.count();
        if (newCount > i) {
          await updatedFields.nth(i).click();
          await updatedFields.nth(i).fill(headline);
          await page.waitForTimeout(200);
        }
      }
    }
    console.log(`  H${i + 1}: ${headline}`);
  }

  // Fill descriptions
  const descFields = page.locator('textarea[aria-label*="Descrição"], textarea[aria-label*="Description"]');
  for (let i = 0; i < ad.descriptions.length; i++) {
    const desc = ad.descriptions[i];
    const descCount = await descFields.count();

    if (i < descCount) {
      await descFields.nth(i).click();
      await descFields.nth(i).fill(desc);
      await page.waitForTimeout(200);
    } else {
      const addDescBtn = page.locator('button:has-text("Adicionar descrição"), button:has-text("Add description")').first();
      if (await addDescBtn.count()) {
        await addDescBtn.click();
        await page.waitForTimeout(500);
        const updatedDescs = page.locator('textarea[aria-label*="Descrição"], textarea[aria-label*="Description"]');
        const newCount = await updatedDescs.count();
        if (newCount > i) {
          await updatedDescs.nth(i).click();
          await updatedDescs.nth(i).fill(desc);
          await page.waitForTimeout(200);
        }
      }
    }
    console.log(`  D${i + 1}: ${desc.slice(0, 60)}...`);
  }

  // Take screenshot before saving
  await page.screenshot({
    path: path.join(ROOT, `marketing/google-ads/forgespace_br_pten_relevance_v2/artifacts/rsa-${adGroup}-${ad.variant}.png`),
    fullPage: true,
  });

  console.log(`  Screenshot saved for ${label}`);
  console.log(`  [MANUAL] Review the ad in the editor and click "Salvar" if it looks correct`);
  console.log(`  [MANUAL] Set headline pins according to rsa.json headline_pins`);

  // Wait for manual review
  await page.waitForTimeout(5000);
}

async function run() {
  const rsa = loadRsa();

  // Pre-flight validation
  let hasErrors = false;
  for (const group of rsa.ad_groups) {
    if (group.status !== "enabled") continue;
    if (TARGET_AD_GROUP && group.ad_group_name !== TARGET_AD_GROUP) continue;

    const urlErrors = validateUrl(group.final_url);
    for (const e of urlErrors) {
      console.error(`[ERROR] ${group.ad_group_name}: ${e}`);
      hasErrors = true;
    }

    for (const ad of group.ads || []) {
      const hErrors = validateHeadlines(ad.headlines);
      const dErrors = validateDescriptions(ad.descriptions);
      for (const e of [...hErrors, ...dErrors]) {
        console.error(`[ERROR] ${group.ad_group_name}/${ad.variant}: ${e}`);
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    console.error("\n[ABORT] Fix validation errors above before publishing.");
    process.exit(1);
  }

  console.log("[OK] All RSA variants validated");

  // Print summary
  for (const group of rsa.ad_groups) {
    if (group.status !== "enabled") continue;
    if (TARGET_AD_GROUP && group.ad_group_name !== TARGET_AD_GROUP) continue;

    console.log(`\nAd Group: ${group.ad_group_name}`);
    console.log(`  Final URL: ${group.final_url}`);
    console.log(`  Display: forgespace.co/${group.display_url_path_1 || ""}/${group.display_url_path_2 || ""}`);

    for (const ad of group.ads || []) {
      console.log(`  Variant: ${ad.variant}`);
      console.log(`    Headlines: ${ad.headlines.length}`);
      console.log(`    Descriptions: ${ad.descriptions.length}`);
      if (ad.headline_pins) {
        for (const [pos, pins] of Object.entries(ad.headline_pins)) {
          console.log(`    Pin ${pos}: ${pins.join(", ")}`);
        }
      }
    }
  }

  if (DRY_RUN) {
    console.log("\n[DRY RUN] Would create the ads above. Set DRY_RUN=0 to execute.");
    return;
  }

  // Connect to Chrome CDP
  console.log("\nConnecting to Chrome CDP at 127.0.0.1:9222...");
  const browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
  const context = browser.contexts()[0];
  const page = context.pages()[0] || await context.newPage();

  // Ensure artifacts directory exists
  const artifactsDir = path.join(ROOT, "marketing/google-ads/forgespace_br_pten_relevance_v2/artifacts");
  fs.mkdirSync(artifactsDir, { recursive: true });

  for (const group of rsa.ad_groups) {
    if (group.status !== "enabled") continue;
    if (TARGET_AD_GROUP && group.ad_group_name !== TARGET_AD_GROUP) continue;

    for (const ad of group.ads || []) {
      await createRsaAd(
        page,
        group.ad_group_name,
        ad,
        group.final_url,
        group.display_url_path_1,
        group.display_url_path_2,
      );
    }
  }

  await browser.close();
  console.log("\n[DONE] All ads created. Review each ad in Google Ads and set headline pins manually.");
}

run().catch((error) => {
  console.error(String(error));
  process.exit(1);
});
