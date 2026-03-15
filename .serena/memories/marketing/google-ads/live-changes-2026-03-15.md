# Google Ads Live Changes — 2026-03-15

## Changes Applied Directly in Google Ads

### 1. Paused all 4 old ads
All ads with wrong URLs and mismatched copy are now paused. None are serving.

### 2. Disabled AI Max
**ROOT CAUSE FOUND**: AI Max was enabled with "Personalização do texto" (text personalization) and "Expansão de URL final" (final URL expansion). This was causing Google to auto-generate ad headlines and redirect to non-existent URLs like `/open-source/infra`. This explains why the live ads had completely different copy from rsa.json.

### 3. Budget updated: R$5/day → R$10/day
Doubled to give more room for the algorithm to optimize.

### 4. Search Partners disabled
Was incorrectly enabled. Now showing "Rede de pesquisa do Google" only.

### 5. CPC bid cap set to R$2.50
Was unset (no limit). Now capped at R$2.50 to control spend per click.

## Still Needs Manual Action

### Create new ads from rsa.json
The 4 new RSA ads (baseline + challenger for smb_en and oss_en) need to be created manually in Google Ads using the copy from `marketing/google-ads/forgespace_br_pten_relevance_v2/rsa.json`.

Key points for the new ads:
- smb_en final URL: `https://forgespace.co/?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_br_en_visibility_v3`
- oss_en final URL: `https://forgespace.co/ecosystem?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_br_en_visibility_v3`
- Display URL paths: `open-source/IDP` (smb_en), `ecosystem/open-source` (oss_en)
- Each ad has 15 headlines and 4 descriptions
- Pin keyword-match headlines to position 1, CTA headlines to position 3

## Key Discovery: AI Max Drift Pattern
Added to `.claude/skills/google-ads-diagnostics/references/common-failures.md` as a new failure pattern. AI Max's URL expansion and text personalization features can cause live ads to diverge completely from the configured rsa.json. Always disable AI Max for micro-pilot campaigns where message control is critical.
