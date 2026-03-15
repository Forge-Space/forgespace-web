/**
 * Google Ads Editor Bulk Upload Generator
 *
 * Reads rsa.json, keywords.csv, negative-keywords.csv, and assets.json and
 * produces a single CSV in Google Ads Editor bulk-upload format.
 *
 * Import this file via:
 *   Google Ads Editor → File → Import → From CSV
 *
 * Usage:
 *   npm run ads:google:generate-upload
 *   # Output: marketing/google-ads/forgespace_br_pten_relevance_v2/editor-upload.csv
 *
 * The generated file covers:
 *   - Responsive Search Ads (RSA) — all ad variants
 *   - Keywords (positive, exact + phrase)
 *   - Negative keywords
 *   - Sitelinks
 *   - Callout extensions
 *   - Structured snippet extensions
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CAMPAIGN_DIR = path.join(ROOT, "marketing/google-ads/forgespace_br_pten_relevance_v2");
const OUTPUT_PATH = path.join(CAMPAIGN_DIR, "editor-upload.csv");

function loadJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(CAMPAIGN_DIR, filename), "utf8"));
}

function parseCsv(content) {
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = [];
    let cur = "";
    let inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === "," && !inQ) { values.push(cur.trim()); cur = ""; }
      else { cur += ch; }
    }
    values.push(cur.trim());
    const row = {};
    headers.forEach((h, i) => { row[h] = values[i] ?? ""; });
    return row;
  });
}

function csvRow(fields) {
  return fields.map((f) => {
    const s = String(f ?? "");
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  }).join(",");
}

function section(title) {
  return [`\n# ${title}`];
}

function validate(rsa, keywords) {
  const errors = [];
  for (const group of rsa.ad_groups) {
    if (!group.ads) continue;
    for (const ad of group.ads) {
      for (const h of ad.headlines ?? []) {
        if (h.length > 30) errors.push(`Headline >${30} chars: "${h}" (${h.length})`);
      }
      for (const d of ad.descriptions ?? []) {
        if (d.length > 90) errors.push(`Description >${90} chars: "${d}" (${d.length})`);
      }
      if (ad.headlines?.length > 15) errors.push(`${group.ad_group_name}/${ad.variant}: too many headlines (${ad.headlines.length})`);
    }
  }
  for (const kw of keywords) {
    if (!["exact", "phrase", "broad"].includes(kw.match_type)) {
      errors.push(`Invalid match type: "${kw.match_type}" for "${kw.keyword}"`);
    }
  }
  if (errors.length) {
    errors.forEach((e) => console.error(`[ERROR] ${e}`));
    process.exit(1);
  }
  console.log("[OK] Validation passed");
}

function buildRsaRows(rsa) {
  const rows = [];

  // Google Ads Editor RSA format:
  // Campaign, Ad group, Status, Final URL, Path 1, Path 2,
  // Headline 1..15, Description 1..4,
  // Headline 1 position, Headline 2 position, Headline 3 position (for pins)
  const headers = csvRow([
    "Campaign",
    "Ad group",
    "Ad type",
    "Ad status",
    "Final URL",
    "Path 1",
    "Path 2",
    ...Array.from({ length: 15 }, (_, i) => `Headline ${i + 1}`),
    ...Array.from({ length: 4 }, (_, i) => `Description ${i + 1}`),
    ...Array.from({ length: 15 }, (_, i) => `Headline ${i + 1} position`),
    ...Array.from({ length: 4 }, (_, i) => `Description ${i + 1} position`),
  ]);

  rows.push(...section("Responsive Search Ads"));
  rows.push(headers);

  for (const group of rsa.ad_groups) {
    if (group.status !== "enabled" || !group.ads) continue;

    for (const ad of group.ads) {
      // Build pin position arrays (1-indexed; 0 = unpinned)
      const headlinePins = Array(15).fill("");
      const descPins = Array(4).fill("");

      if (ad.headline_pins) {
        for (const [pos, pinnedHeadlines] of Object.entries(ad.headline_pins)) {
          for (const pinnedText of pinnedHeadlines) {
            const idx = ad.headlines.indexOf(pinnedText);
            if (idx >= 0) headlinePins[idx] = pos;
          }
        }
      }

      // Pad headlines and descriptions to max slots
      const headlines = [...(ad.headlines ?? []), ...Array(15).fill("")].slice(0, 15);
      const descriptions = [...(ad.descriptions ?? []), ...Array(4).fill("")].slice(0, 4);

      rows.push(csvRow([
        rsa.campaign_name,
        group.ad_group_name,
        "Responsive search ad",
        "Enabled",
        group.final_url,
        group.display_url_path_1 ?? "",
        group.display_url_path_2 ?? "",
        ...headlines,
        ...descriptions,
        ...headlinePins,
        ...descPins,
      ]));
    }
  }

  return rows;
}

function buildKeywordRows(keywords) {
  const rows = [];

  const headers = csvRow([
    "Campaign",
    "Ad group",
    "Keyword",
    "Match type",
    "Max CPC",
    "Status",
  ]);

  rows.push(...section("Keywords"));
  rows.push(headers);

  for (const kw of keywords) {
    const matchTypeLabel =
      kw.match_type === "exact" ? "Exact"
      : kw.match_type === "phrase" ? "Phrase"
      : "Broad";

    rows.push(csvRow([
      kw.campaign_name,
      kw.ad_group_name,
      kw.keyword,
      matchTypeLabel,
      kw.max_cpc_brl,
      kw.status === "enabled" ? "Enabled" : "Paused",
    ]));
  }

  return rows;
}

function buildNegativeKeywordRows(negatives, campaignName) {
  const rows = [];

  const headers = csvRow([
    "Campaign",
    "Negative keyword",
    "Match type",
  ]);

  rows.push(...section("Campaign Negative Keywords"));
  rows.push(headers);

  for (const neg of negatives) {
    if (neg.scope !== "campaign") continue;
    const matchTypeLabel =
      neg.match_type === "exact" ? "Exact [negative]"
      : neg.match_type === "phrase" ? "Phrase [negative]"
      : "Broad [negative]";

    rows.push(csvRow([campaignName, neg.negative_keyword, matchTypeLabel]));
  }

  return rows;
}

function buildSitelinkRows(assets, campaignName) {
  const rows = [];

  const headers = csvRow([
    "Campaign",
    "Sitelink text",
    "Description line 1",
    "Description line 2",
    "Final URL",
    "Status",
  ]);

  rows.push(...section("Sitelink Extensions"));
  rows.push(headers);

  for (const sl of assets.ad_extensions?.sitelinks ?? []) {
    rows.push(csvRow([
      campaignName,
      sl.link_text,
      sl.description_line_1 ?? "",
      sl.description_line_2 ?? "",
      sl.final_url,
      "Enabled",
    ]));
  }

  return rows;
}

function buildCalloutRows(assets, campaignName) {
  const rows = [];

  const headers = csvRow(["Campaign", "Callout text", "Status"]);

  rows.push(...section("Callout Extensions"));
  rows.push(headers);

  for (const text of assets.ad_extensions?.callouts ?? []) {
    rows.push(csvRow([campaignName, text, "Enabled"]));
  }

  return rows;
}

function buildStructuredSnippetRows(assets, campaignName) {
  const rows = [];

  const headers = csvRow([
    "Campaign",
    "Header",
    "Values",
    "Status",
  ]);

  rows.push(...section("Structured Snippet Extensions"));
  rows.push(headers);

  for (const snippet of assets.ad_extensions?.structured_snippets ?? []) {
    // Google Ads Editor expects values as semicolon-separated
    rows.push(csvRow([
      campaignName,
      snippet.header,
      snippet.values.join(";"),
      "Enabled",
    ]));
  }

  return rows;
}

function run() {
  console.log("Loading campaign data...");

  const rsa = loadJson("rsa.json");
  const assets = loadJson("assets.json");
  const keywordsRaw = fs.readFileSync(path.join(CAMPAIGN_DIR, "keywords.csv"), "utf8");
  const negativesRaw = fs.readFileSync(path.join(CAMPAIGN_DIR, "negative-keywords.csv"), "utf8");

  const keywords = parseCsv(keywordsRaw);
  const negatives = parseCsv(negativesRaw);
  const campaignName = rsa.campaign_name;

  validate(rsa, keywords);

  const lines = [
    `# Google Ads Editor Bulk Upload`,
    `# Campaign: ${campaignName}`,
    `# Generated: ${new Date().toISOString()}`,
    `# Source files: rsa.json, keywords.csv, negative-keywords.csv, assets.json`,
    `#`,
    `# IMPORT INSTRUCTIONS:`,
    `# 1. Open Google Ads Editor`,
    `# 2. File → Import → From CSV`,
    `# 3. Select this file`,
    `# 4. Review proposed changes in the "Proposed changes" panel`,
    `# 5. Click "Apply" to apply — then "Post" to send to Google Ads`,
    `#`,
    `# NOTE: RSA headline pins cannot be set via bulk upload.`,
    `# After import, open each RSA ad and pin headlines manually:`,
    ...rsa.ad_groups
      .filter((g) => g.status === "enabled" && g.ads)
      .flatMap((g) =>
        g.ads.flatMap((ad) =>
          ad.headline_pins
            ? Object.entries(ad.headline_pins).flatMap(([pos, pins]) =>
                pins.map((p) => `#   ${g.ad_group_name}/${ad.variant}: Pin "${p}" → position ${pos}`)
              )
            : []
        )
      ),
    "",
  ];

  lines.push(...buildRsaRows(rsa));
  lines.push(...buildKeywordRows(keywords));
  lines.push(...buildNegativeKeywordRows(negatives, campaignName));
  lines.push(...buildSitelinkRows(assets, campaignName));
  lines.push(...buildCalloutRows(assets, campaignName));
  lines.push(...buildStructuredSnippetRows(assets, campaignName));

  const output = lines.join("\n") + "\n";
  fs.writeFileSync(OUTPUT_PATH, output, "utf8");

  const lineCount = output.split("\n").length;
  console.log(`[OK] Generated: ${OUTPUT_PATH} (${lineCount} lines)`);

  // Summary
  const enabledGroups = rsa.ad_groups.filter((g) => g.status === "enabled" && g.ads);
  const adCount = enabledGroups.reduce((n, g) => n + g.ads.length, 0);
  const kwCount = keywords.filter((k) => k.status === "enabled").length;
  const negCount = negatives.filter((n) => n.scope === "campaign").length;
  const slCount = assets.ad_extensions?.sitelinks?.length ?? 0;
  const coCount = assets.ad_extensions?.callouts?.length ?? 0;
  const ssCount = assets.ad_extensions?.structured_snippets?.length ?? 0;

  console.log("\nUpload summary:");
  console.log(`  RSA ads:              ${adCount} (${enabledGroups.map((g) => `${g.ad_group_name}×${g.ads.length}`).join(", ")})`);
  console.log(`  Keywords:             ${kwCount} enabled`);
  console.log(`  Negative keywords:    ${negCount}`);
  console.log(`  Sitelinks:            ${slCount}`);
  console.log(`  Callouts:             ${coCount}`);
  console.log(`  Structured snippets:  ${ssCount}`);
  console.log("\nPin instructions (must be done manually after import):");

  for (const group of enabledGroups) {
    for (const ad of group.ads) {
      if (!ad.headline_pins) continue;
      for (const [pos, pins] of Object.entries(ad.headline_pins)) {
        for (const pin of pins) {
          console.log(`  [${group.ad_group_name}/${ad.variant}] Pin "${pin}" → position ${pos}`);
        }
      }
    }
  }
}

run();
