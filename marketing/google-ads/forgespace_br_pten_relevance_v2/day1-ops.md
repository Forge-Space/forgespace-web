# Forge Space Visibility Micro-Pilot Ops (v3.3)

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

## Pre-publish

1. Run local prepublish checks:
   - `npm run ads:google:prepublish`
2. Validate RSA ads (char limits, URLs):
   - `DRY_RUN=1 npm run ads:google:publish-rsa`
3. Validate keywords (format, match types):
   - `DRY_RUN=1 npm run ads:google:publish-keywords`
4. Run one UTM-tagged visit and click one outbound CTA:
   - `https://forgespace.co/ecosystem?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_br_en_visibility_v3`
5. In GA4 DebugView, verify events:
   - `fs_cta_github_click` (primary)
   - `fs_cta_contact_sales_click` (secondary)
   - `fs_cta_siza_click` (secondary)
6. In Google Ads, verify imported GA4 conversion `fs_cta_github_click` is set to Primary.
7. In GA4, verify custom dimensions exist and are receiving values:
   - `cta_target`
   - `cta_location`

## Campaign settings (already applied)

These settings were applied directly in Google Ads on 2026-03-15:

1. Campaign name: `forgespace_br_en_visibility_v3`
2. Goal: Website traffic with visibility optimization
3. Networks: Google Search only (Search Partners OFF, Display OFF)
4. Targeting: Brazil, English only, Presence
5. Budget: `R$10/day`, CPC cap `R$2.50`
6. AI Max: **OFF** (was causing headline/URL drift)
7. Ad groups: `smb_en` + `oss_en` enabled, `smb_pt` paused

## Keyword update (NEEDS ACTION)

Old keywords were too long-tail (4-6 words, near-zero volume).
New keywords are 2-3 words with broader search volume.

1. In Google Ads, go to Keywords for each ad group
2. Pause ALL existing keywords
3. Run `DRY_RUN=1 npm run ads:google:publish-keywords` to get formatted output
4. Copy the keywords from the "COPY-PASTE FOR GOOGLE ADS UI" section
5. In each ad group, click "+" > "Keywords" > paste > set default CPC to R$2.50

**smb_en (8 keywords):**
```
[internal developer platform]
"internal developer platform"
[backstage alternative]
"backstage alternative"
[platform engineering tools]
"platform engineering tools"
[IDP for startups]
"IDP for startups"
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

## RSA ad creation (NEEDS ACTION)

Old ads were paused (wrong URLs pointing to 404 pages, wrong headlines due to AI Max).
New ads have 15 headlines each with exact keyword matches pinned to position 1.

1. In Google Ads, go to Ads for the campaign
2. Verify all 4 old ads show "Paused" status
3. Create new RSA ads — one baseline + one challenger per ad group

**For each ad, copy from `rsa.json`:**
- Final URL, display path 1, display path 2
- All 15 headlines (pin keyword headlines to position 1, CTA headlines to position 3)
- All 4 descriptions

**smb_en landing:** `https://forgespace.co/?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_br_en_visibility_v3`
**oss_en landing:** `https://forgespace.co/ecosystem?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_br_en_visibility_v3`

**Automation (if Chrome CDP is available):**
```bash
google-chrome --remote-debugging-port=9222
# Log in to Google Ads, then:
npm run ads:google:publish-rsa
```

## Ad extension update

Update sitelinks, callouts, and structured snippets from `assets.json`:
- Sitelinks: Features, Ecosystem, Pricing, Roadmap (all real routes)
- Callouts: Open Source, MIT Licensed, Backstage Alternative, No Platform Team Required, Self-Hosted Ready, Free for Individuals, AI Governance Built In, Scorecards & Audit Trails
- Structured snippets: Types (IDP, Platform Engineering Tools, etc.) + Features (Quality Scorecards, Policy Packs, etc.)

## Measurement setup

1. Auto-tagging: ON
2. Final URL suffix:
   - `utm_term={keyword}&utm_content={creative}&campaignid={campaignid}&adgroupid={adgroupid}&matchtype={matchtype}&device={device}`
3. UTM baseline: `utm_campaign=forgespace_br_en_visibility_v3`
4. Validate using `ga4-ads-setup.md`

## Spend control and cadence

1. Create automated rule: pause campaign at cumulative spend `R$100`
2. If cumulative spend is below `R$10`, run monitoring-only checks every 12-24h:
   - `npm run ads:google:checkpoint`
3. At cumulative spend `R$10`, `R$30`, `R$60` (and daily after `R$60` until stop):
   - Run `npm run ads:google:prepublish` before campaign edits
   - Run `npm run ads:google:checkpoint` to capture artifacts and current metrics
4. At each checkpoint:
   - Review Search Terms relevance
   - Add negatives immediately
   - Pause keywords with `2+` clicks and no primary CTA
   - Update `checkpoint-scorecard-live.csv`

## Go/No-Go

- Continue if:
  - CTR `>= 3%` on at least one active ad group, and
  - At least one `fs_cta_github_click`
- Pause early if:
  - CTR `< 1.5%` by `R$30`, or
  - poor intent quality by `R$60`, or
  - repeated irrelevant terms after two pruning passes

## Available automation scripts

| Command | Purpose |
|---------|---------|
| `npm run ads:google:prepublish` | Pre-publish guardrail checks |
| `npm run ads:google:checkpoint` | Capture metrics + update scorecard |
| `npm run ads:google:publish-rsa` | Create RSA ads from rsa.json (needs Chrome CDP) |
| `npm run ads:google:publish-keywords` | Format keywords for import (works standalone) |
| `DRY_RUN=1` prefix | Validate without executing any of the above |
