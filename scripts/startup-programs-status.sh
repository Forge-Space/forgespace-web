#!/usr/bin/env bash
# startup-programs-status.sh — Show current application status and deadlines
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PROGRAMS_DIR="$ROOT_DIR/marketing/startup-programs"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         FORGE SPACE — Startup Programs Status                ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Deadline countdown
NLNET_DEADLINE="2026-04-01"
TODAY=$(date +%Y-%m-%d)
DAYS_LEFT=$(python3 -c "
from datetime import date
deadline = date(2026, 4, 1)
today = date.today()
diff = (deadline - today).days
print(diff)
")

echo "⚠️  URGENT DEADLINES:"
echo "   NLnet NGI0 Commons Fund: $DAYS_LEFT days remaining (deadline $NLNET_DEADLINE)"
echo "   YC Summer 2026: $(python3 -c "from datetime import date; print((date(2026,5,4)-date.today()).days)") days remaining (deadline 2026-05-04)"
echo ""

echo "📁 APPLICATION CONTENT:"
for dir in "$PROGRAMS_DIR"/*/; do
	program=$(basename "$dir")
	if [ -f "$dir/application.md" ]; then
		echo "   ✓ $program — application.md exists"
		if [ -f "$dir/checklist.md" ]; then
			echo "     ✓ checklist.md exists"
		fi
	fi
done
echo ""

echo "💰 SELF-SERVE (apply now, no deadline):"
echo "   □ Cloudflare for Startups — https://cloudflare.com/forstartups/"
echo "     Content: marketing/startup-programs/cloudflare/application.md"
echo "   □ Vercel for Startups    — https://vercel.com/startups"
echo "     Content: marketing/startup-programs/vercel/application.md"
echo "   □ Microsoft Founders Hub — https://foundershub.startups.microsoft.com/"
echo "     Content: marketing/startup-programs/microsoft/application.md"
echo ""

echo "🏦 APPLY THIS WEEK:"
echo "   □ Google for Startups Cloud — https://cloud.google.com/startup"
echo "   □ AWS Activate Founders     — https://aws.amazon.com/activate/"
echo ""

echo "✅ GITHUB SPONSORS PREREQ:"
echo "   Checking FUNDING.yml across repos..."
for repo in mcp-gateway siza core siza-gen ui-mcp branding-mcp forge-ai-init forge-ai-action brand-guide forgespace-web; do
	result=$(gh api /repos/Forge-Space/$repo/contents/.github/FUNDING.yml --jq '.sha' 2>/dev/null || echo "")
	if [ -n "$result" ] && ! echo "$result" | grep -q "Not Found"; then
		echo "   ✓ $repo"
	else
		echo "   ✗ $repo — MISSING"
	fi
done
echo ""

echo "📊 KEY STATS FOR APPLICATIONS:"
echo "   Users: 834 registered"
echo "   Repos: 9 open-source (MIT)"
echo "   Tests: 2,994+ passing"
echo "   Infra: \$0/month (CF Workers + Supabase free tiers)"
echo "   Latest: mcp-gateway v1.13.0, siza v0.47.1, forge-ai-init v0.26.0"
