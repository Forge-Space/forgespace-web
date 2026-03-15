# GA4 + Google Ads Setup Contract (v3.2)

## Conversion contract

- Goal scope: campaign-specific visibility goals only
- Primary conversion (Google Ads optimization): `fs_cta_github_click`
- Secondary conversions (reporting only):
  - `fs_cta_contact_sales_click`
  - `fs_cta_siza_click`
- Excluded from this campaign's bidding goal set:
  - `Inscrição`
- Customer acquisition / lifecycle goals:
  - disabled for the visibility micro-pilot until audience prerequisites exist

## GA4 custom dimensions

Create event-scoped custom dimensions in GA4 for:

1. `cta_target`
2. `cta_location`

These dimensions are required for checkpoint relevance diagnostics.

## Tracking settings

1. Keep Google Ads auto-tagging ON (`gclid` attached automatically).
2. Keep final URL UTM baseline on ads.
3. Add Final URL suffix:

`utm_term={keyword}&utm_content={creative}&campaignid={campaignid}&adgroupid={adgroupid}&matchtype={matchtype}&device={device}`

## Debug checklist

1. Open ad URL with campaign UTM.
2. Click each CTA type (GitHub, Contact Sales, Siza).
3. Confirm GA4 DebugView receives:
   - event name
   - attribution payload (`utm_*`, click ids, `landing_path`, `first_seen_at`)
   - `cta_target`, `cta_location`
4. Confirm imported Ads conversion `fs_cta_github_click` is receiving and marked Primary.
5. Confirm `fs_cta_contact_sales_click` and `fs_cta_siza_click` remain Secondary.
6. Confirm `Inscrição` is not used for this campaign's bidding optimization.
