# Forge Space Visibility Micro-Pilot Ops (v3.3)

## Pre-publish

1. Run local prepublish checks:
   - `npm run ads:google:prepublish`
2. Run one UTM-tagged visit and click one outbound CTA:
   - `https://forgespace.co/ecosystem?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_br_en_visibility_v3`
3. In GA4 DebugView, verify events:
   - `fs_cta_github_click` (primary)
   - `fs_cta_contact_sales_click` (secondary)
   - `fs_cta_siza_click` (secondary)
4. In Google Ads, verify imported GA4 conversion `fs_cta_github_click` is set to Primary.
5. In GA4, verify custom dimensions exist and are receiving values:
   - `cta_target`
   - `cta_location`

## Campaign setup

1. Use Search campaign display name: `forgespace_br_en_visibility_v3`.
2. Goal: Website traffic with visibility optimization.
3. Networks:
   - Enable: Google Search
   - Disable: Search Partners
   - Disable: Display Network expansion
4. Targeting:
   - Location: Brazil
   - Language: English only
   - Location option: Presence (people in your targeted location)
5. Budget and bid:
   - Daily budget: `R$10`
   - Bidding: Maximize Clicks with CPC cap `R$2.50`
6. Ad groups:
   - Enable: `smb_en`
   - Enable: `oss_en`
   - Pause: `smb_pt` (until PT landing exists)
7. Import keywords from `keywords.csv`:
   - Keep `smb_en` active variants at 8
   - Keep `oss_en` active variants at 6
8. Import negatives from `negative-keywords.csv`.
9. Create ads and assets:
   - Add baseline + challenger RSA variants from `rsa.json`
   - Add sitelinks, callouts, structured snippets, image/logo/business assets from `assets.json`
10. Landing split:
    - `smb_en` -> `/enterprise`
    - `oss_en` -> `/ecosystem`

## Measurement setup

1. Auto-tagging: ON.
2. Final URL suffix:
   - `utm_term={keyword}&utm_content={creative}&campaignid={campaignid}&adgroupid={adgroupid}&matchtype={matchtype}&device={device}`
3. Keep UTM baseline with campaign:
   - `utm_campaign=forgespace_br_en_visibility_v3`
4. Validate setup using `ga4-ads-setup.md`.

## Spend control and cadence

1. Create automated rule: pause campaign at cumulative spend `R$100`.
2. If cumulative spend is below `R$10`, run monitoring-only checks every 12-24h:
   - `npm run ads:google:checkpoint`
   - Keep campaign structure unchanged unless there is a policy/safety issue.
3. At cumulative spend `R$10`, `R$30`, `R$60` (and daily after `R$60` until stop):
   - Run `npm run ads:google:prepublish` before campaign edits.
   - Run `npm run ads:google:checkpoint` to capture artifacts and current metrics.
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
