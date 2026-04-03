import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const ARTIFACTS_DIR = path.join(
  ROOT,
  "marketing/google-ads/forgespace_br_pten_relevance_v2/artifacts",
);

function runStep(label, command, args, env = {}) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: "inherit",
    env: { ...process.env, ...env },
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  console.log(`[OK] ${label}`);
}

function findLatestSummary() {
  const entries = fs
    .readdirSync(ARTIFACTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const summaryPath = path.join(ARTIFACTS_DIR, entry.name, "checkpoint-summary.json");
      if (!fs.existsSync(summaryPath)) {
        return null;
      }

      return {
        summaryPath,
        mtimeMs: fs.statSync(summaryPath).mtimeMs,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.mtimeMs - a.mtimeMs);

  if (entries.length === 0) {
    throw new Error("No checkpoint summary artifact found after checkpoint run.");
  }

  return entries[0].summaryPath;
}

function buildIssues(summary) {
  const issues = [];
  const add = (severity, code, message) => issues.push({ severity, code, message });
  const criticalGuardrails = [
    "english_language",
    "brazil_location",
    "conversion_primary_github",
    "ad_groups_enabled",
  ];

  if (summary.metrics.spend_brl === 0 && summary.metrics.impressions === 0) {
    add(
      "critical",
      "zero_delivery",
      "Campaign has zero spend and zero impressions; Google Ads is not serving at all.",
    );
  }

  for (const [name, ok] of Object.entries(summary.guardrails)) {
    if (ok) continue;
    add(
      criticalGuardrails.includes(name) ? "critical" : "high",
      `guardrail_${name}`,
      `Guardrail failed: ${name}`,
    );
  }

  if (summary.metrics.clicks === 0) {
    add("high", "no_clicks", "Campaign has zero clicks, so search-term quality cannot be evaluated yet.");
  }

  if (summary.conversions.fs_cta_github_click?.status === "missing") {
    add(
      "critical",
      "missing_primary_conversion",
      "Primary GitHub conversion is missing or not marked as Primary in Google Ads.",
    );
  }

  return issues;
}

function buildNextActions(summary) {
  const actions = [];

  if (!summary.guardrails.search_only) {
    actions.push("Google Ads UI → campaign settings → disable Search Partners so only Google Search remains enabled.");
  }
  if (!summary.guardrails.english_language) {
    actions.push("Google Ads UI → campaign settings → add English to Languages.");
  }
  if (!summary.guardrails.brazil_location) {
    actions.push("Google Ads UI → campaign settings → set Locations to Brazil.");
  }
  if (!summary.guardrails.cpc_cap_250) {
    actions.push("Google Ads UI → bidding → cap Max CPC at R$2.50.");
  }
  if (!summary.guardrails.conversion_primary_github) {
    actions.push("Google Ads UI → campaign goals/conversions → switch primary goal to fs_cta_github_click and ensure it is marked Primary.");
  }
  if (!summary.guardrails.ad_groups_enabled) {
    actions.push("Google Ads UI → verify smb_en, oss_en, and startups_en ad groups are enabled.");
  }
  if (summary.metrics.impressions === 0) {
    actions.push("Re-run npm run ads:google:checkpoint after fixing guardrails to confirm delivery starts.");
  }

  return actions;
}

process.env.NEXT_PUBLIC_GA_TRACKING_ID ||= "G-XXXXXXXXXX";

runStep("Prepublish checks completed", "npm", ["run", "ads:google:prepublish"], {
  NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
});
runStep("Checkpoint capture completed", "npm", ["run", "ads:google:checkpoint"]);

const summaryPath = findLatestSummary();
const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
const issues = buildIssues(summary);
const nextActions = buildNextActions(summary);
const hasCritical = issues.some((issue) => issue.severity === "critical");

console.log(
  JSON.stringify(
    {
      status: hasCritical ? "manual_ops_blocked" : "healthy_or_monitoring",
      summary_path: path.relative(ROOT, summaryPath),
      decision: summary.decision,
      issues,
      next_actions: nextActions,
    },
    null,
    2,
  ),
);

process.exit(hasCritical ? 2 : 0);
