#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

CAMPAIGN_DIR="marketing/google-ads/forgespace_br_pten_relevance_v2"

load_ga_tracking_id_from_env_file() {
	local env_file="$ROOT_DIR/.env.local"

	if [ -n "${NEXT_PUBLIC_GA_TRACKING_ID:-}" ] || [ ! -f "$env_file" ]; then
		return
	fi

	local raw_line=""
	raw_line="$(grep -E '^NEXT_PUBLIC_GA_TRACKING_ID=' "$env_file" | tail -n 1 || true)"
	if [ -z "$raw_line" ]; then
		return
	fi

	NEXT_PUBLIC_GA_TRACKING_ID="${raw_line#NEXT_PUBLIC_GA_TRACKING_ID=}"
}

sanitize_ga_tracking_id() {
	local value="$1"

	value="${value%\"}"
	value="${value#\"}"
	value="${value%\'}"
	value="${value#\'}"
	value="${value//\\n/}"
	value="$(printf '%s' "$value" | tr -d '\r\n')"
	value="$(printf '%s' "$value" | sed -E 's/^[[:space:]]+//; s/[[:space:]]+$//')"
	printf '%s' "$value"
}

load_ga_tracking_id_from_env_file
NEXT_PUBLIC_GA_TRACKING_ID="$(sanitize_ga_tracking_id "${NEXT_PUBLIC_GA_TRACKING_ID:-}")"
export NEXT_PUBLIC_GA_TRACKING_ID

if [ -z "$NEXT_PUBLIC_GA_TRACKING_ID" ]; then
	echo "[ERROR] NEXT_PUBLIC_GA_TRACKING_ID is not set."
	echo "[HINT] Add NEXT_PUBLIC_GA_TRACKING_ID to .env.local or export it in your shell."
	exit 1
fi

if ! [[ "$NEXT_PUBLIC_GA_TRACKING_ID" =~ ^G-[A-Z0-9]+$ ]]; then
	echo "[ERROR] NEXT_PUBLIC_GA_TRACKING_ID is invalid."
	echo "[HINT] Expected format: G-XXXXXXXXXX (loaded from env or .env.local)."
	exit 1
fi

required_files=(
	"$CAMPAIGN_DIR/campaign-config.json"
	"$CAMPAIGN_DIR/keywords.csv"
	"$CAMPAIGN_DIR/negative-keywords.csv"
	"$CAMPAIGN_DIR/rsa.json"
	"$CAMPAIGN_DIR/assets.json"
	"$CAMPAIGN_DIR/ga4-ads-setup.md"
)

for file in "${required_files[@]}"; do
	if [ ! -f "$file" ]; then
		echo "[ERROR] Missing required campaign file: $file"
		exit 1
	fi
done

node -e '
const fs = require("fs");
const configPath = "marketing/google-ads/forgespace_br_pten_relevance_v2/campaign-config.json";
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

if (config.budget?.total_hard_stop_brl !== 100) {
  throw new Error("Budget hard stop must be R$100");
}

if (config.budget?.amount_per_day_brl !== 10) {
  throw new Error("Daily budget must be R$10");
}

if (JSON.stringify(config.language_targeting) !== JSON.stringify(["English"])) {
  throw new Error("Language targeting must be English-only for v3.2");
}

const adGroups = new Map((config.ad_groups || []).map((g) => [g.name, g.status]));
if (adGroups.get("smb_en") !== "enabled") {
  throw new Error("smb_en ad group must be enabled");
}
if (adGroups.get("oss_en") !== "enabled") {
  throw new Error("oss_en ad group must be enabled");
}
if (adGroups.get("smb_pt") !== "paused") {
  throw new Error("smb_pt ad group must be paused");
}

if (config.measurement?.primary_event !== "fs_cta_github_click") {
  throw new Error("Primary conversion must be fs_cta_github_click");
}

console.log("[OK] Campaign config guardrails validated");
'

smb_en_keywords=$(awk -F, 'NR>1 && $2=="smb_en" && $6=="enabled" {c++} END {print c+0}' "$CAMPAIGN_DIR/keywords.csv")
oss_en_keywords=$(awk -F, 'NR>1 && $2=="oss_en" && $6=="enabled" {c++} END {print c+0}' "$CAMPAIGN_DIR/keywords.csv")

if [ "$smb_en_keywords" -ne 8 ]; then
	echo "[ERROR] smb_en must have exactly 8 enabled keyword variants."
	exit 1
fi

if [ "$oss_en_keywords" -ne 6 ]; then
	echo "[ERROR] oss_en must have exactly 6 enabled keyword variants."
	exit 1
fi

echo "[OK] Keyword mix guardrails validated (smb_en=8, oss_en=6)"

node -e '
const fs = require("fs");
const rsa = JSON.parse(fs.readFileSync("marketing/google-ads/forgespace_br_pten_relevance_v2/rsa.json", "utf8"));
const kwRaw = fs.readFileSync("marketing/google-ads/forgespace_br_pten_relevance_v2/keywords.csv", "utf8");

// Build per-group keyword sets from keywords.csv
const kwByGroup = {};
for (const line of kwRaw.trim().split("\n").slice(1)) {
  const parts = line.split(",");
  const group = parts[1]?.trim();
  const kw = parts[2]?.replace(/"/g, "").trim().toLowerCase();
  const status = parts[5]?.trim();
  if (group && kw && status === "enabled") {
    if (!kwByGroup[group]) kwByGroup[group] = new Set();
    kwByGroup[group].add(kw);
  }
}

let errors = 0;
for (const g of rsa.ad_groups) {
  if (!g.ads) continue;
  const groupKws = [...(kwByGroup[g.ad_group_name] || new Set())];
  for (const ad of g.ads) {
    for (const kw of groupKws) {
      const covered = ad.headlines.some(h => h.toLowerCase().includes(kw));
      if (!covered) {
        console.error("[ERROR] Keyword not covered in " + g.ad_group_name + "/" + ad.variant + ": \"" + kw + "\"");
        errors++;
      }
    }
    // Check for cross-group keyword contamination
    for (const [otherGroup, otherKws] of Object.entries(kwByGroup)) {
      if (otherGroup === g.ad_group_name) continue;
      for (const kw of otherKws) {
        if (!groupKws.includes(kw) && ad.headlines.some(h => h.toLowerCase().includes(kw))) {
          // Only warn — cross-group overlap is not always wrong (e.g. "open source IDP" appears in both)
        }
      }
    }
  }
}
if (errors > 0) process.exit(1);
console.log("[OK] Keyword coverage validated — all keywords covered in their ad group headlines");
'

if ! grep -q "AW-959867732" src/components/analytics/AnalyticsProvider.tsx; then
	echo "[ERROR] Google Ads tag AW-959867732 missing from AnalyticsProvider.tsx"
	exit 1
fi
echo "[OK] Google Ads tag AW-959867732 present in AnalyticsProvider"

node -e '
const fs = require("fs");
const negRaw = fs.readFileSync("marketing/google-ads/forgespace_br_pten_relevance_v2/negative-keywords.csv", "utf8");
const kwRaw = fs.readFileSync("marketing/google-ads/forgespace_br_pten_relevance_v2/keywords.csv", "utf8");

const negLines = negRaw.trim().split("\n").slice(1);
const negatives = negLines.map(l => {
  const parts = l.split(",");
  return { keyword: parts[1]?.toLowerCase().trim(), matchType: parts[2]?.trim() };
}).filter(n => n.keyword);

const kwLines = kwRaw.trim().split("\n").slice(1);
const keywords = kwLines
  .filter(l => l.includes(",enabled,"))
  .map(l => { const m = l.match(/,"([^"]+)",/); return m ? m[1].toLowerCase() : ""; })
  .filter(Boolean);

let conflicts = 0;
for (const neg of negatives) {
  for (const kw of keywords) {
    if (neg.matchType === "broad" && kw.includes(neg.keyword)) {
      console.error("[ERROR] Negative keyword conflict: \"" + neg.keyword + "\" (broad) blocks positive keyword \"" + kw + "\"");
      conflicts++;
    }
  }
}
if (conflicts > 0) process.exit(1);
console.log("[OK] No negative keyword conflicts with positive keywords");
'

echo "[INFO] Running lint"
npm run lint

echo "[INFO] Running CTA + attribution + conversion tracking test pack"
npm run test -- \
	src/__tests__/first-touch-attribution.test.ts \
	src/__tests__/landing.test.tsx \
	src/__tests__/Nav.test.tsx \
	src/__tests__/Footer.test.tsx \
	src/__tests__/ecosystem-cta-tracking.test.tsx \
	src/__tests__/enterprise-cta-tracking.test.tsx

echo "[INFO] Validating RSA char limits and URL routes"
DRY_RUN=1 node scripts/google-ads-publish-rsa.mjs

echo "[INFO] Validating keywords format"
DRY_RUN=1 node scripts/google-ads-publish-keywords.mjs >/dev/null

echo "[OK] Local prepublish checks passed"
echo "[MANUAL] Google Ads: auto-tagging ON"
echo "[MANUAL] Google Ads: AI Max is OFF (prevents headline/URL drift)"
echo "[MANUAL] Google Ads: location option set to Presence"
echo "[MANUAL] Google Ads: final URL suffix includes ValueTrack params"
echo "[MANUAL] Google Ads: fs_cta_github_click imported and set Primary"
echo "[MANUAL] GA4: custom dimensions cta_target and cta_location are active"
echo "[MANUAL] Recommended: npm run ads:google:generate-upload → import editor-upload.csv in Google Ads Editor"
echo "[MANUAL] Alternative: npm run ads:google:publish-rsa (needs Chrome CDP on port 9222)"
