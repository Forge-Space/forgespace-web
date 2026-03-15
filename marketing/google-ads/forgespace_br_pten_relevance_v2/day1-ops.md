# Forge Space Visibility Micro-Pilot Ops (v3.5)

## Uploading changes to Google Ads (recommended path)

```bash
npm run ads:google:generate-upload
```

This generates `editor-upload.csv` containing all ads, keywords, negatives,
sitelinks, callouts, and snippets in Google Ads Editor bulk-upload format.

**Import steps:**
1. Open Google Ads Editor
2. File → Import → From CSV → select `editor-upload.csv`
3. Review in "Proposed changes" panel
4. Click "Apply" then "Post"
5. Manually pin headlines after import (see pin list in terminal output)

---

## Pre-publish checklist

Run before any campaign edits:

```bash
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX npm run ads:google:prepublish
```

This validates: config guardrails, keyword mix (smb_en=6, oss_en=6, startups_en=6),
keyword coverage, GA tag, negative conflicts, 56 tracking tests, RSA char limits, URL routes.

## Campaign settings (applied 2026-03-15)

1. Campaign name: `forgespace_br_en_visibility_v3`
2. Goal: Website traffic with visibility optimization
3. Networks: Google Search only (Search Partners OFF, Display OFF)
4. Targeting: Brazil, English only, Presence
5. Budget: `R$10/day`, CPC cap `R$2.50`, hard stop `R$100`
6. AI Max: **OFF** (causes headline/URL drift — never enable)
7. Ad groups: `smb_en` + `oss_en` + `startups_en` enabled, `smb_pt` paused

## Ad group structure

| Ad group | Keywords | Landing page | Ads |
|----------|----------|-------------|-----|
| `smb_en` | 6 (IDP, Backstage, Platform Eng) | `forgespace.co/` | baseline + challenger |
| `oss_en` | 6 (OSS IDP, Dev Platform GitHub) | `forgespace.co/ecosystem` | baseline + challenger |
| `startups_en` | 6 (IDP for startups, Dev Platform, PE Startups) | `forgespace.co/startups` | baseline + challenger |

## Keyword reference

**smb_en (6 keywords):**
```
[internal developer platform]
"internal developer platform"
[backstage alternative]
"backstage alternative"
[platform engineering tools]
"platform engineering tools"
```

**oss_en (6 keywords):**
```
[open source developer platform]
"open source developer platform"
[open source IDP]
"open source IDP"
[developer platform github]
"developer platform github"
```

**startups_en (6 keywords):**
```
[IDP for startups]
"IDP for startups"
[dev platform for startups]
"dev platform for startups"
[platform engineering startups]
"platform engineering startups"
```

## RSA ads (all created via editor-upload.csv)

All 6 ads (baseline + challenger per group) are in `rsa.json` v3.5.
Use `npm run ads:google:generate-upload` to regenerate `editor-upload.csv`.

**Landing URLs:**
- smb_en: `https://forgespace.co/?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_br_en_visibility_v3`
- oss_en: `https://forgespace.co/ecosystem?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_br_en_visibility_v3`
- startups_en: `https://forgespace.co/startups?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_br_en_visibility_v3`

## Ad extensions (from assets.json v3.5)

- **Sitelinks (5):** Features, Ecosystem, Pricing, Roadmap, For Startups
- **Callouts (8):** Open Source, MIT Licensed, Backstage Alternative, No Platform Team Required, Self-Hosted Ready, Free for Individuals, AI Governance Built In, Scorecards & Audit Trails
- **Structured snippets (2):** Types (IDP, Platform Engineering Tools, AI Governance Platform, Developer Portal) + Features (Quality Scorecards, Policy Packs, Audit Trails, Golden Path Templates)

## Measurement setup

1. Auto-tagging: ON
2. Final URL suffix: `utm_term={keyword}&utm_content={creative}&campaignid={campaignid}&adgroupid={adgroupid}&matchtype={matchtype}&device={device}`
3. Primary conversion: `fs_cta_github_click` (imported from GA4, set to Primary)
4. Secondary conversions: `fs_cta_contact_sales_click`, `fs_cta_siza_click`
5. GA4 custom dimensions: `cta_target`, `cta_location`

**Verify tracking:**
```bash
# Visit each landing page with UTM params and click GitHub CTA
# Check GA4 DebugView for fs_cta_github_click event
https://forgespace.co/?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_br_en_visibility_v3
https://forgespace.co/ecosystem?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_br_en_visibility_v3
https://forgespace.co/startups?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_br_en_visibility_v3
```

## Spend control and monitoring cadence

1. Create automated rule: pause campaign at cumulative spend `R$100`
2. Below `R$10`: monitoring-only checks every 12-24h → `npm run ads:google:checkpoint`
3. At `R$10`, `R$30`, `R$60`: full checkpoint → `npm run ads:google:checkpoint`
4. At each checkpoint:
   - Review Search Terms report → add irrelevant terms to `negative-keywords.csv`
   - Pause keywords with 2+ clicks and 0 primary CTA conversions
   - Update `checkpoint-scorecard-live.csv`
   - Re-run prepublish + generate-upload if any changes made

## Go/No-Go rules

**Continue if:**
- CTR ≥ 3% on at least one active ad group, AND
- At least one `fs_cta_github_click` conversion

**Pause early if:**
- CTR < 1.5% by R$30, OR
- Poor intent quality by R$60, OR
- Repeated irrelevant terms after two pruning passes

## Available automation scripts

| Command | Purpose |
|---------|---------|
| `npm run ads:google:prepublish` | Full guardrail checks (run before any edit) |
| `npm run ads:google:generate-upload` | Regenerate editor-upload.csv |
| `npm run ads:google:checkpoint` | Capture metrics + update scorecard (needs Chrome CDP) |
| `npm run ads:google:publish-rsa` | Create RSA ads via Chrome CDP (alternative to Editor) |
| `npm run ads:google:publish-keywords` | Format keywords for manual import |
| `DRY_RUN=1 <command>` | Validate without executing |
