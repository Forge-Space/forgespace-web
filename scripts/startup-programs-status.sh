#!/usr/bin/env bash
# startup-programs-status.sh — Show current application status, deadlines, and submission state
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PROGRAMS_DIR="$ROOT_DIR/marketing/startup-programs"
SUBMISSIONS="$PROGRAMS_DIR/submissions.json"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         FORGE SPACE — Startup Programs Status                ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Deadline countdown
python3 - <<'EOF'
from datetime import date

deadlines = [
    ("NLnet NGI0 Commons Fund", date(2026, 4, 1), "URGENT"),
    ("YC Summer 2026",          date(2026, 5, 4), "PREPARE"),
]

print("⚠️  DEADLINE TRACKER:")
for name, deadline, label in deadlines:
    days = (deadline - date.today()).days
    if days < 0:
        icon = "❌"
        note = f"OVERDUE by {-days} days"
    elif days <= 7:
        icon = "🔴"
        note = f"{days} days left"
    elif days <= 30:
        icon = "🟡"
        note = f"{days} days left"
    else:
        icon = "🟢"
        note = f"{days} days left"
    print(f"   {icon} {name}: {note} (deadline {deadline})")
print()
EOF

# Submission status from JSON
echo "📋 SUBMISSION STATUS:"
if [ -f "$SUBMISSIONS" ]; then
	python3 - "$SUBMISSIONS" <<'EOF'
import json, sys
from datetime import date

data = json.load(open(sys.argv[1]))
programs = data.get("programs", {})

status_icons = {
    "not_submitted": "□",
    "submitted":     "⏳",
    "approved":      "✅",
    "rejected":      "❌",
    "in_review":     "🔍",
}

# Sort: deadline programs first, then rolling
def sort_key(item):
    k, v = item
    dl = v.get("deadline", "rolling")
    if dl == "rolling":
        return ("z", k)
    return ("a", dl, k)

for prog, info in sorted(programs.items(), key=sort_key):
    icon = status_icons.get(info["status"], "?")
    status = info["status"].replace("_", " ")
    deadline = info["deadline"]
    if deadline != "rolling":
        days = (date.fromisoformat(deadline) - date.today()).days
        dl_str = f"deadline {deadline} ({days}d)"
    else:
        dl_str = "rolling"
    submitted = f" | submitted {info['submitted_at']}" if info.get("submitted_at") else ""
    response = f" | response: {info['response']}" if info.get("response") else ""
    print(f"   {icon} {prog:<15} [{status}]  {dl_str}{submitted}{response}")
print()
EOF
else
	echo "   (no submissions.json found — run from repo root)"
	echo ""
fi

# Content coverage check
echo "📁 DRAFT CONTENT:"
missing=0
for dir in "$PROGRAMS_DIR"/*/; do
	program=$(basename "$dir")
	[ "$program" = "submissions.json" ] && continue
	if [ -f "$dir/application.md" ]; then
		echo "   ✓ $program"
	else
		echo "   ✗ $program — MISSING application.md"
		missing=$((missing + 1))
	fi
done
if [ $missing -eq 0 ]; then
	echo "   → All drafts present"
fi
echo ""

echo "✅ GITHUB SPONSORS PREREQ:"
echo "   Checking FUNDING.yml across repos..."
all_ok=true
for repo in mcp-gateway siza core siza-gen ui-mcp branding-mcp forge-ai-init forge-ai-action brand-guide forgespace-web; do
	result=$(gh api /repos/Forge-Space/$repo/contents/.github/FUNDING.yml --jq '.sha' 2>/dev/null || echo "")
	if [ -n "$result" ] && ! echo "$result" | grep -q "Not Found"; then
		echo "   ✓ $repo"
	else
		echo "   ✗ $repo — MISSING"
		all_ok=false
	fi
done
$all_ok && echo "   → All repos have FUNDING.yml" || true
echo ""

echo "📊 KEY STATS FOR APPLICATIONS:"
echo "   Users: 834 registered"
echo "   Repos: 9 open-source (MIT)"
echo "   Tests: 3,200+ passing"
echo "   Infra: \$0/month (CF Workers + Supabase free tiers)"
echo "   Latest: mcp-gateway v1.16.0, siza v0.47.1, forge-ai-init v0.28.0"
echo ""
echo "💡 To record a submission:"
echo "   Edit marketing/startup-programs/submissions.json"
echo "   Set status: \"submitted\", add submitted_at: \"$(date +%Y-%m-%d)\""
