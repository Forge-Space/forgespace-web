---
name: startup-programs
description: >
  Track, draft, and submit Forge Space startup program applications (NLnet, Cloudflare,
  Vercel, Microsoft, AWS, YC, etc). Use when checking application status, drafting
  content, or preparing for a program deadline. Triggers: "startup program", "apply to",
  "NLnet", "Cloudflare for Startups", "YC application", "grant application",
  "funding application", "credits application".
version: 1.0.0
---

# Skill: startup-programs

Manage Forge Space startup program applications — status, drafting, and submission automation.

## Application Registry

All application content lives in `marketing/startup-programs/`:

```
marketing/startup-programs/
  nlnet/           — NLnet NGI0 Commons Fund (deadline Apr 1, 2026)
    application.md — Full draft ready to submit
    checklist.md   — Submission steps
  cloudflare/      — Cloudflare for Startups (rolling)
  vercel/          — Vercel for Startups (rolling)
  microsoft/       — Microsoft Founders Hub (rolling)
  aws/             — AWS Activate Founders (rolling)
```

## Program Status (updated 2026-03-15)

| Program | Status | Value | Deadline | Priority |
|---------|--------|-------|----------|----------|
| NLnet NGI0 Commons | draft_ready | EUR 30K | Apr 1, 2026 | URGENT |
| Cloudflare for Startups | not_started | $5K–$250K | Rolling | HIGH |
| Vercel for Startups | not_started | Pro/Enterprise | Rolling | HIGH |
| Microsoft Founders Hub | not_started | $150K Azure | Rolling | HIGH |
| AWS Activate | not_started | $1K–$25K | Rolling | MEDIUM |
| Google Cloud Startup | not_started | $350K GCP | Rolling | MEDIUM |
| GitHub Sponsors | infra_done | Community | Rolling | DONE-prereq |
| NVIDIA Inception | not_started | VC network | Rolling | LOW |

## Key Pitch Stats (always use these)

- 834 registered users, 9 with projects
- 9 open-source repos, MIT licensed
- 2,994+ tests across ecosystem
- $0/month infrastructure cost (CF Workers + Supabase free tiers)
- mcp-gateway v1.13.0, forge-ai-init v0.26.0, siza v0.47.1

## Workflow: Check Status

```bash
# See what's in the application registry
ls marketing/startup-programs/

# Check NLnet deadline countdown
python3 -c "from datetime import date; d=date(2026,4,1); print(f'{(d-date.today()).days} days until NLnet deadline')"

# Review current application draft
cat marketing/startup-programs/nlnet/application.md
```

## Workflow: Draft New Application

1. Create directory: `mkdir -p marketing/startup-programs/<program>`
2. Copy nlnet/application.md as template
3. Adjust framing per program type (see pitch angles in memory `startup-programs/pitch-angles`)
4. Save to `marketing/startup-programs/<program>/application.md`
5. Create checklist.md with submission steps
6. Commit: `git commit -m "feat(marketing): add <program> application draft"`

## Workflow: Submit NLnet

1. Read checklist: `cat marketing/startup-programs/nlnet/checklist.md`
2. Go to https://nlnet.nl/propose/
3. Use content from `marketing/startup-programs/nlnet/application.md`
4. Abstract: copy first section (≤200 words)
5. After submission: update memory `startup-programs/application-status` with date/reference

## Key Framing by Program Type

**Cloud providers** (Cloudflare, Vercel, MS, AWS, Google):
> "Forge Space runs a zero-cost production architecture on [PROVIDER] that demonstrates
> what modern cloud infrastructure enables. We're already using [PROVIDER] in production."

**Grants / Open source** (NLnet, Sovereign Tech, GitHub):
> "We're building open infrastructure for the MCP standard — the emerging open protocol
> for AI tool integration. MIT licensed, fully self-hostable, provider-agnostic."

**VCs / Accelerators** (YC, OSS Capital, Heavybit):
> "73% of devs use AI code tools, <20% have governance. Forge Space is the open-source
> IDP that adds quality scoring, policy enforcement, and audit trails to AI-assisted
> development. MCP-native architecture. 834 users, $0 CAC."

## Memory Hooks

- Read `startup-programs/application-status` for current state
- Read `startup-programs/pitch-angles` for framing per program type
- Write updates to `startup-programs/application-status` after submissions
