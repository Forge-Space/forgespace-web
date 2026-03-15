# Google Ads Diagnostic Checklist

## Delivery Health

- [ ] Scorecard shows non-zero impressions
- [ ] Scorecard shows non-zero spend
- [ ] Campaign status is "enabled" in Google Ads
- [ ] All intended ad groups are enabled
- [ ] Daily budget >= R$10 (or configured amount)
- [ ] Max CPC is competitive for the vertical (B2B tech: >= $0.50 USD)
- [ ] Location + language targeting has adequate audience size
- [ ] Ad schedule is not overly restrictive

## Keyword Viability

- [ ] Keywords have measurable search volume (2-3 word phrases, not 4+ word exact)
- [ ] Mix includes at least some phrase or broad match for discovery
- [ ] smb_en has 8 active keyword variants
- [ ] oss_en has 6 active keyword variants
- [ ] Keywords reflect user search intent, not product description
- [ ] Negative keywords don't accidentally block target keywords
- [ ] No keyword cannibalization between ad groups

## Ad Quality (Quality Score)

- [ ] Every keyword has at least 1 exact-match headline in rsa.json
- [ ] Keyword-match headlines are pinned to position 1
- [ ] All headlines ≤30 characters
- [ ] All descriptions ≤90 characters
- [ ] Each ad variant has 8-15 headlines and 2-4 descriptions
- [ ] No duplicate headlines within the same ad
- [ ] Display URL paths are set and meaningful
- [ ] All ads show "Bom" (Good) quality or better
- [ ] No ads with "Ruim" (Poor) quality rating

## Live-vs-Repo Drift

- [ ] Live ad headlines match rsa.json baseline or challenger variants
- [ ] Live ad URLs match final_url in rsa.json
- [ ] Live display URL paths match display_url_path_1/display_url_path_2
- [ ] No live ads point to non-existent routes
- [ ] Sitelink URLs all point to real, working pages

## Conversion Wiring

- [ ] GA4 measurement ID is set (`NEXT_PUBLIC_GA_TRACKING_ID`)
- [ ] Google Ads tag (AW-*) is present in AnalyticsProvider
- [ ] `AnalyticsProvider` is mounted in layout.tsx
- [ ] Click delegation targets `a[data-fs-cta-event]`
- [ ] All CTA links on landing pages have `data-fs-cta-event` attribute
- [ ] Primary conversion event (`fs_cta_github_click`) fires on all landing pages
- [ ] GA4 custom dimensions (cta_target, cta_location) are created in GA4
- [ ] GA4 conversion is imported into Google Ads and marked Primary
- [ ] Auto-tagging is ON in Google Ads
- [ ] Final URL suffix includes ValueTrack parameters

## Landing Page Alignment

- [ ] smb_en landing page (/) has GitHub CTA with tracking
- [ ] oss_en landing page (/ecosystem) has tracked GitHub CTAs on repo links
- [ ] Ad copy promise matches landing page headline/content
- [ ] No dead-end pages (every landing page has at least one tracked CTA)
- [ ] Landing pages load fast (< 3s) and are mobile-responsive

## Budget & Bidding

- [ ] Total hard stop rule is configured (R$100 automated rule)
- [ ] Budget is sufficient for learning phase (needs ~50 conversions/30 days)
- [ ] Bidding strategy matches campaign goal (Maximize Clicks for visibility)
- [ ] CPC cap doesn't suppress all delivery

## Scorecard Progression

- [ ] R$10 checkpoint data is recorded
- [ ] R$30 checkpoint data is recorded
- [ ] R$60 checkpoint data is recorded
- [ ] Decision at each checkpoint follows stop/continue rules
- [ ] Negative keywords are added at each pruning pass
- [ ] Low-performing keywords are paused after 2+ clicks with no primary CTA
