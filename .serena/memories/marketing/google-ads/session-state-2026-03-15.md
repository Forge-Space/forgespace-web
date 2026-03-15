# Forge Space Session State — 2026-03-15 (LATEST)

## Google Ads Campaign (v3.5 — COMPLETE, ALL PRs MERGED #56–#63)

| Ad group | Keywords | Landing | Primary CTA |
|----------|----------|---------|-------------|
| smb_en | 6 | / | GitHub ✅ |
| oss_en | 6 | /ecosystem | GitHub ✅ |
| startups_en | 6 | /startups | GitHub ✅ |

Budget: R$10/day · CPC cap: R$2.50 · Negatives: 53
Tests: 98 passing
Upload: `npm run ads:google:generate-upload`

## Startup Programs (9/9 drafts complete)

| Program | Value | Status | Deadline |
|---------|-------|--------|----------|
| NLnet NGI0 Commons | EUR 30K | not_submitted | **Apr 1, 2026 (URGENT)** |
| Cloudflare | $250K | not_submitted | rolling |
| Vercel | Pro | not_submitted | rolling |
| Microsoft | $150K | not_submitted | rolling |
| AWS Activate | $100K | not_submitted | rolling |
| Supabase | $10-50K | not_submitted | rolling (email) |
| NVIDIA Inception | VC network | not_submitted | rolling |
| Google Cloud | $350K | not_submitted | rolling |
| YC Summer 2026 | $500K | not_submitted | May 4, 2026 |

All state tracked in: `marketing/startup-programs/submissions.json`
Status command: `npm run startups:status`

## Open PRs
- #66 feat/yc-application-draft — YC S26 draft + skill update
- #67 feat/startup-submission-tracker — submissions.json + enhanced status script + npm cmd

## Skills (all current)
- google-ads-diagnostics, google-ads-quality, google-ads-campaign-ops
- startup-programs (9 programs, submission workflow)

## Next Priorities
1. HUMAN ACTION: Submit NLnet — Apr 1 deadline (17 days)
2. HUMAN ACTION: Submit self-serve programs (Cloudflare, Vercel, MS, AWS, Google Cloud)
3. HUMAN ACTION: Email Supabase at startups@supabase.com
4. CODE: Portuguese landing page + smb_pt ad group (currently paused)
5. CODE: pricing/features/roadmap page CTA tests
