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

if (config.budget?.total_hard_stop_brl !== 50) {
  throw new Error("Budget hard stop must be R$50");
}

if (config.budget?.amount_per_day_brl !== 5) {
  throw new Error("Daily budget must be R$5");
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

if [ "$smb_en_keywords" -ne 6 ]; then
	echo "[ERROR] smb_en must have exactly 6 enabled keyword variants."
	exit 1
fi

if [ "$oss_en_keywords" -ne 4 ]; then
	echo "[ERROR] oss_en must have exactly 4 enabled keyword variants."
	exit 1
fi

echo "[OK] Keyword mix guardrails validated (smb_en=6, oss_en=4)"

if ! grep -q "AW-959867732" src/components/analytics/AnalyticsProvider.tsx; then
	echo "[ERROR] Google Ads tag AW-959867732 missing from AnalyticsProvider.tsx"
	exit 1
fi
echo "[OK] Google Ads tag AW-959867732 present in AnalyticsProvider"

echo "[INFO] Running lint"
npm run lint

echo "[INFO] Running CTA + attribution test pack"
npm run test -- src/__tests__/first-touch-attribution.test.ts src/__tests__/landing.test.tsx src/__tests__/Nav.test.tsx src/__tests__/Footer.test.tsx

echo "[OK] Local prepublish checks passed"
echo "[MANUAL] Google Ads: auto-tagging ON"
echo "[MANUAL] Google Ads: location option set to Presence"
echo "[MANUAL] Google Ads: final URL suffix includes ValueTrack params"
echo "[MANUAL] Google Ads: fs_cta_github_click imported and set Primary"
echo "[MANUAL] GA4: custom dimensions cta_target and cta_location are active"
