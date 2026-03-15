# Common Google Ads Failure Patterns

## Zero Delivery (0 impressions)

### Audience too narrow
**Symptom**: Campaign enabled, budget available, but 0 impressions.
**Root cause**: The intersection of location + language + keyword intent is too small.
**Example**: Targeting English speakers in Brazil searching for "internal developer platform for small teams" — near-zero search volume.
**Fix**: Broaden one axis: add Portuguese keywords, expand to LATAM, or use shorter/broader keywords.

### CPC bid below competitive floor
**Symptom**: Campaign enabled but Google won't serve ads.
**Root cause**: Max CPC (e.g., R$0.80 = $0.16 USD) is below the minimum bid floor for B2B/tech keywords.
**Fix**: Raise max CPC to at least $0.50 USD equivalent, or switch to Maximize Conversions with no cap.

### Keywords too long-tail
**Symptom**: Exact match keywords with 4-6 words get 0 impressions.
**Root cause**: Nobody searches for the exact phrase. These are product descriptions, not search queries.
**Fix**: Use 2-3 word phrase/broad match keywords: "backstage alternative", "internal developer platform", "platform engineering open source".

### Budget too low for learning
**Symptom**: Campaign starts but delivery tapers off quickly.
**Root cause**: Google needs ~50 conversions/30 days. A $10 total cap can never achieve this.
**Fix**: Either increase budget or switch primary goal to a micro-conversion (page_view, scroll_depth) during validation phase.

## Conversion Tracking Failures

### Landing page missing primary CTA
**Symptom**: Clicks arrive but 0 conversions.
**Root cause**: Landing page doesn't have the CTA that fires the primary conversion event.
**Example**: smb_en → /enterprise, primary conversion is `fs_cta_github_click`, but enterprise page only has "Contact Sales" mailto.
**Fix**: Add a GitHub CTA to the enterprise page, or change the landing URL to a page with GitHub CTAs.

### CTA links missing data attributes
**Symptom**: Users click outbound links but no conversion events fire.
**Root cause**: Links don't have `data-fs-cta-event` attribute, so AnalyticsProvider's click delegation doesn't intercept them.
**Example**: Ecosystem page repo links go to GitHub but lack `data-fs-cta-event={FORGE_CTA_EVENTS.GITHUB}`.
**Fix**: Add `data-fs-cta-event`, `data-fs-cta-target`, and `data-fs-cta-location` to all outbound CTA links.

### GA4 conversion not imported as Primary
**Symptom**: Conversions appear in GA4 but not in Google Ads reporting.
**Root cause**: The GA4 event wasn't imported into Google Ads, or it's set to Secondary instead of Primary.
**Fix**: In Google Ads > Goals > Conversions, verify the imported GA4 event is marked Primary.

### GA4 tracking ID not set
**Symptom**: No analytics data at all.
**Root cause**: `NEXT_PUBLIC_GA_TRACKING_ID` not in `.env.local` or not exported.
**Fix**: Add `NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX` to `.env.local`.

## Live-vs-Repo Drift

### Ad copy and URLs diverged from source of truth
**Symptom**: Live ads in Google Ads show different headlines, descriptions, or URLs than what's in `rsa.json`.
**Root cause**: Ads were created manually in Google Ads with different copy than the repo files, or were edited in-platform without updating the repo.
**Example**: rsa.json says `final_url: forgespace.co/enterprise` but live ads show `forgespace.co/open-source/infra` (a 404 page).
**Example**: rsa.json has headline "Internal Developer Platform" but live ad shows "Open-Source AI Infrastructure".
**Fix**: Treat `rsa.json` as the single source of truth. Pause all live ads. Recreate ads from the current rsa.json content. Update the repo if intentional live changes were made.

### Live ads pointing to non-existent URLs
**Symptom**: Ads are "Qualificada" (Eligible) but get 0 clicks, or users bounce immediately.
**Root cause**: The URL in the live ad was manually entered with a path that doesn't exist as a route in the Next.js app.
**Example**: `www.forgespace.co/open-source/infra` — no `/open-source/infra` route exists in `src/app/`.
**Fix**: Verify all live ad URLs correspond to actual routes. Valid routes are: `/`, `/features`, `/pricing`, `/ecosystem`, `/roadmap`, `/enterprise`.

### Poor quality rating dragging down ad group
**Symptom**: One or more ads show "Ruim" (Poor) quality, entire ad group underperforms.
**Root cause**: The poor-quality ad has headlines that don't match keywords, or its landing page doesn't match the ad promise.
**Fix**: Immediately pause or remove the "Ruim" ad. Replace with ads whose headlines contain exact keyword text.

### AI Max causing uncontrolled ad copy and URL drift
**Symptom**: Live ads show headlines and URLs that don't exist in rsa.json. Display URL paths point to non-existent pages.
**Root cause**: Google Ads "AI Max for Search Campaigns" was enabled with "Personalização do texto" (text personalization) and "Expansão de URL final" (final URL expansion). These features auto-generate ad text from the website and redirect to any URL Google deems relevant — including paths that don't exist.
**Example**: rsa.json says "Internal Developer Platform" headline with `/enterprise` URL, but Google AI Max generates "Open-Source AI Infrastructure" headline with `/open-source/infra` URL (a 404).
**Fix**: Disable AI Max entirely for micro-pilot campaigns where message control is critical. In Campaign Settings > AI Max, toggle OFF. Also uncheck "Personalização do texto" and "Expansão de URL final" under Otimização de recursos (Asset optimization).

## Strategic Misalignment

### Ad copy doesn't match landing page
**Symptom**: High bounce rate, low time-on-page.
**Root cause**: RSA headlines promise one thing but landing page delivers another.
**Fix**: Ensure message-spine consistency: problem → promise → action matches across ad, landing page, and CTA.

### Wrong landing page for ad group intent
**Symptom**: CTR is ok but conversion rate is 0.
**Root cause**: Users arrive expecting one thing but the page serves a different intent.
**Example**: "backstage alternative for startups" → /enterprise (which is about enterprise support/sales), not about evaluating alternatives.
**Fix**: Route comparison-intent keywords to a page with feature comparison, GitHub links, and evaluation paths.
