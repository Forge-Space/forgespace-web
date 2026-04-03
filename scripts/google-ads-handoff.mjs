import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ARTIFACTS_DIR = path.join(
  ROOT,
  "marketing/google-ads/forgespace_br_pten_relevance_v2/artifacts",
);
const HANDOFF_DOC =
  "marketing/google-ads/forgespace_br_pten_relevance_v2/google-ads-admin-handoff.md";

function findLatestSummary() {
  const entries = fs
    .readdirSync(ARTIFACTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const summaryPath = path.join(ARTIFACTS_DIR, entry.name, "checkpoint-summary.json");
      if (!fs.existsSync(summaryPath)) return null;
      return {
        summaryPath,
        mtimeMs: fs.statSync(summaryPath).mtimeMs,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.mtimeMs - a.mtimeMs);

  if (entries.length === 0) {
    throw new Error("No checkpoint summary found.");
  }

  return entries[0].summaryPath;
}

function yesNo(value) {
  return value ? "yes" : "no";
}

const summaryPath = findLatestSummary();
const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
const summaryDir = path.dirname(summaryPath);
const handoffOutputPath = path.join(summaryDir, "admin-handoff.txt");

const lines = [
  `Subject: Google Ads / CM360 unblock needed for ${summary.campaign_name}`,
  "",
  "Hi — repo-side diagnostics and live Google Ads inspection are complete. We’re blocked by upstream Google Ads / CM360 state, not by campaign config in the repo.",
  "",
  `Campaign: ${summary.campaign_name}`,
  `Campaign ID: ${summary.campaign_id}`,
  `Latest checkpoint: R$${summary.checkpoint_brl}`,
  `Spend / impressions / clicks: R$${summary.metrics.spend_brl} / ${summary.metrics.impressions} / ${summary.metrics.clicks}`,
  "",
  "Verified live state:",
  `- AI Max off: ${yesNo(summary.guardrails.ai_max_off)}`,
  `- English language: ${yesNo(summary.guardrails.english_language)}`,
  `- Brazil location: ${yesNo(summary.guardrails.brazil_location)}`,
  `- Search-only network: ${yesNo(summary.guardrails.search_only)}`,
  `- Campaign goal includes fs_cta_github_click: ${yesNo(summary.guardrails.conversion_primary_github)}`,
  `- Ad groups enabled: ${yesNo(summary.guardrails.ad_groups_enabled)}`,
  "",
  "Observed blockers:",
  "- Search Partners is still enabled in campaign settings.",
  "- Campaign Settings → Metas de conversão → Alterar as metas da campanha only shows `Cliques de saída`.",
  "- `fs_cta_github_click` is not available to select at campaign level.",
  "- Google Ads surfaced a Campaign Manager 360 / Floodlight permission error when attempting to edit the relevant conversion action.",
  "",
  "What we need from an admin / CM360 owner:",
  "1. Restore or import `fs_cta_github_click` so it exists in Google Ads as a selectable Primary conversion.",
  "2. Confirm it appears in the campaign goal picker.",
  "3. Disable Search Partners so only Google Search remains enabled.",
  "",
  "After that, repo-side rerun command is:",
  "`npm run ads:google:diagnostics`",
  "",
  `Full runbook: ${HANDOFF_DOC}`,
  `Latest checkpoint artifact: ${path.relative(ROOT, summaryPath)}`,
  `Generated handoff artifact: ${path.relative(ROOT, handoffOutputPath)}`,
];

const output = lines.join("\n");
fs.writeFileSync(handoffOutputPath, `${output}\n`, "utf8");

console.log(output);
