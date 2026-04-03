import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const ARTIFACTS_DIR = path.join(
  ROOT,
  "marketing/google-ads/forgespace_br_pten_relevance_v2/artifacts",
);
const HANDOFF_DOC =
  "marketing/google-ads/forgespace_br_pten_relevance_v2/google-ads-admin-handoff.md";
const ISSUE_TITLE = "Track Google Ads / CM360 unblock for forgespace_br_en_visibility_v3";
const REPO = "Forge-Space/forgespace-web";
const APPLY = process.env.APPLY === "1";

function runGh(args) {
  return execFileSync("gh", args, {
    cwd: ROOT,
    encoding: "utf8",
    env: { ...process.env, GH_PAGER: "cat" },
  }).trim();
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
    throw new Error("No checkpoint summary found.");
  }

  return entries[0].summaryPath;
}

function yesNo(value) {
  return value ? "yes" : "no";
}

function buildBody(summaryPath, summary) {
  const handoffArtifact = path.relative(ROOT, path.join(path.dirname(summaryPath), "admin-handoff.txt"));
  const summaryRel = path.relative(ROOT, summaryPath);

  return `## Summary
Google Ads automation and diagnostics for \
\`${summary.campaign_name}\` are now merged to \`main\`, but the campaign is still blocked by upstream Google Ads / CM360 state that the current account cannot fix.

## Latest verified state
- Campaign: \`${summary.campaign_name}\`
- Campaign ID: \`${summary.campaign_id}\`
- Latest checkpoint: \`R$${summary.checkpoint_brl}\`
- Spend / impressions / clicks: \`R$${summary.metrics.spend_brl} / ${summary.metrics.impressions} / ${summary.metrics.clicks}\`
- AI Max off: ${yesNo(summary.guardrails.ai_max_off)}
- English language: ${yesNo(summary.guardrails.english_language)}
- Brazil location: ${yesNo(summary.guardrails.brazil_location)}
- Search-only network: ${yesNo(summary.guardrails.search_only)}
- Campaign goal includes fs_cta_github_click: ${yesNo(summary.guardrails.conversion_primary_github)}
- Ad groups enabled: ${yesNo(summary.guardrails.ad_groups_enabled)}

## Root blocker
Google Ads surfaced a Campaign Manager 360 / Floodlight permission error when trying to edit the relevant conversion action, so the current Google Ads user cannot restore or expose \`fs_cta_github_click\` as a selectable Primary conversion.

## Admin action needed
1. Restore or import \`fs_cta_github_click\` as a Primary Google Ads conversion
2. Confirm it appears in Campaign Settings → \`Metas de conversão\` → \`Alterar as metas da campanha\`
3. Disable Search Partners so only Google Search remains enabled

## Repo-side artifacts
- Runbook: \`${HANDOFF_DOC}\`
- Generated escalation artifact: \`${handoffArtifact}\`
- Checkpoint summary: \`${summaryRel}\`

## After admin fix
Run:

\`\`\`bash
npm run ads:google:diagnostics
\`\`\`

Expected improvements:
- \`search_only=true\`
- \`conversion_primary_github=true\`
- blocker should move from configuration/permission to delivery-only, if anything remains
`;
}

function findExistingIssueNumber() {
  const output = runGh([
    "issue",
    "list",
    "--repo",
    REPO,
    "--state",
    "open",
    "--search",
    `in:title \"${ISSUE_TITLE}\"`,
    "--json",
    "number,title",
  ]);
  const issues = JSON.parse(output || "[]");
  const exact = issues.find((issue) => issue.title === ISSUE_TITLE);
  return exact?.number ?? null;
}

const summaryPath = findLatestSummary();
const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
const body = buildBody(summaryPath, summary);
const issueNumber = findExistingIssueNumber();

if (!APPLY) {
  console.log(
    JSON.stringify(
      {
        mode: "dry-run",
        repo: REPO,
        issue_title: ISSUE_TITLE,
        existing_issue_number: issueNumber,
        body_preview: body,
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

if (issueNumber) {
  runGh([
    "issue",
    "edit",
    String(issueNumber),
    "--repo",
    REPO,
    "--title",
    ISSUE_TITLE,
    "--body",
    body,
  ]);
  console.log(`Updated issue #${issueNumber}`);
} else {
  const url = runGh([
    "issue",
    "create",
    "--repo",
    REPO,
    "--title",
    ISSUE_TITLE,
    "--body",
    body,
  ]);
  console.log(`Created issue: ${url}`);
}
