# Google Ads Quality Rewrite — 2026-03-15

## Critical Discovery: Live Ads Drifted From Repo

### Live state (from screenshot)
- **smb_en Ad 1**: URL `www.forgespace.co/open-source/infra` (404!), Quality: Médio
- **smb_en Ad 2**: URL `www.forgespace.co/open-source/infra` (404!), Quality: **Ruim** (Poor)
- **oss_en Ad 1**: URL `forgespace.co/ecosystem/open-source` (404!), Quality: Bom
- **oss_en Ad 2**: URL `forgespace.co/ecosystem/open-source` (404!), Quality: Médio
- All ads: 0 impressions, 0 clicks, R$0.00

### Root causes of low quality
1. URLs point to non-existent pages (404s)
2. Headlines don't contain target keywords ("AI Infrastructure" vs "internal developer platform")
3. Ad copy was manually created in Google Ads, diverged from rsa.json
4. One ad rated "Ruim" (Poor) drags down entire smb_en ad group

### Changes made (v3.3)
- **rsa.json**: Complete rewrite with 15 headlines per ad (max). Exact keyword matches pinned to position 1. CTAs pinned to position 3.
- **Landing page strategy**: smb_en changed from /enterprise to / (homepage) — richer content, tracked GitHub CTA
- **assets.json**: Sitelinks updated to /features, /ecosystem, /pricing, /roadmap (all real routes). Added 8 callouts, 2 structured snippet sets.
- **Display URL paths**: Added `open-source/IDP` for smb_en, `ecosystem/open-source` for oss_en

### Skills created/updated
- **Created**: `.claude/skills/google-ads-quality/SKILL.md` with quality-score-rules.md reference
- **Updated**: `.claude/skills/google-ads-diagnostics/SKILL.md` with Phase 5: Live-vs-Repo Drift Detection
- **Updated**: `references/diagnostic-checklist.md` with ad quality and drift sections
- **Updated**: `references/common-failures.md` with drift patterns

### Manual action required
In Google Ads, the operator must:
1. Pause all 4 existing ads
2. Create new ads from the updated rsa.json (baseline + challenger per ad group)
3. Verify new ads show "Bom" (Good) quality or better
4. Update sitelinks from assets.json
5. Update budget to R$10/day, CPC cap to R$2.50
