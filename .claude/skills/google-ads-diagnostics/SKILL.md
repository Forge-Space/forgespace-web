---
name: google-ads-diagnostics
description: >
  Audit a Google Ads campaign by checking delivery health, keyword viability,
  landing-page conversion wiring, budget adequacy, and scorecard progression.
  Use when a campaign shows zero or low delivery, conversions are missing,
  or a pre-checkpoint review is needed. Triggers: "google ads not working",
  "why no impressions", "ads checkpoint", "ads audit", "campaign diagnostics",
  "zero clicks google ads".
metadata:
  owner: forge-space
  tier: contextual
  canonical_source: .claude/skills/google-ads-diagnostics
---

# Google Ads Campaign Diagnostics

## Use When

- A Google Ads campaign shows 0 impressions, 0 clicks, or unexpectedly low delivery.
- Before a scheduled checkpoint (R$3, R$6, R$8) to pre-validate configuration.
- After pausing/resuming a campaign to verify settings are intact.
- When conversion events are expected but not appearing in GA4 or Google Ads.

## Do Not Use When

- The task is writing new ad copy or keyword research. Use brainstorming or marketing-ideas.
- The task is deploying landing page changes. Use standard dev workflow.
- The task is running `ads:google:checkpoint` (that's an operational script, not a diagnostic).

## Inputs / Prereqs

- Campaign config: `marketing/google-ads/forgespace_br_pten_relevance_v2/campaign-config.json`
- Keywords: `marketing/google-ads/forgespace_br_pten_relevance_v2/keywords.csv`
- RSA copy: `marketing/google-ads/forgespace_br_pten_relevance_v2/rsa.json`
- Scorecard: `marketing/google-ads/forgespace_br_pten_relevance_v2/checkpoint-scorecard-live.csv`
- Source tracking: `src/components/analytics/AnalyticsProvider.tsx`, `src/lib/analytics/ga4.ts`
- Landing pages: whichever routes are configured in `campaign-config.json` tracking URLs

## Workflow

### Phase 1: Delivery Health

1. Read `checkpoint-scorecard-live.csv` and compare impressions/clicks/spend against expected checkpoint.
2. Check if spend is R$0 — indicates Google is not serving the campaign at all.
3. Identify delivery blockers:
   - **Audience size**: Cross-reference location + language + keyword specificity. Flag if the intersection is too narrow.
   - **Bid competitiveness**: Compare `max_cpc_brl` against typical B2B/tech keyword floors ($0.50-2.00 USD).
   - **Budget adequacy**: Check if daily budget can generate enough clicks to exit Google's learning phase (~50 conversions/30 days).
   - **Keyword search volume**: Flag keywords with 4+ words in exact match — likely near-zero volume.
   - **Campaign status**: Verify enabled ad groups match config.

### Phase 2: Keyword Viability

4. Read `keywords.csv` and assess:
   - Are keywords too long-tail (4-6 word exact phrases)?
   - Is there a mix of match types (exact + phrase + broad)?
   - Are there enough keywords per ad group (Google recommends 5-20)?
   - Do keywords match how people actually search (vs. how the product team describes the product)?

5. Read `negative-keywords.csv` and verify:
   - Negatives aren't accidentally blocking target keywords.
   - Coverage for known irrelevant themes.

### Phase 3: Conversion Wiring

6. For each ad group's landing page URL:
   - Load the page component source.
   - Verify ALL outbound links that match the primary conversion intent have `data-fs-cta-event` attributes.
   - Check for conversion mismatch: if primary conversion is `fs_cta_github_click`, does the landing page have a GitHub CTA?

7. Verify `AnalyticsProvider.tsx`:
   - GA4 tag loads correctly.
   - Google Ads tag (`AW-*`) is present.
   - Click delegation targets `a[data-fs-cta-event]`.

8. Verify `ga4.ts`:
   - `trackForgeCtaEvent` correctly sends the event name to gtag.
   - Attribution params are attached.

### Phase 4: Landing Page Alignment

9. For each ad group, verify:
   - Ad copy promise (from `rsa.json`) matches landing page content.
   - The primary CTA on the landing page matches the primary conversion event.
   - There's no dead-end: every landing page has at least one tracked CTA.

### Phase 5: Live-vs-Repo Drift Detection

When a Google Ads screenshot or checkpoint artifact is available:

10. Compare live ad headlines against `rsa.json`:
    - Flag any live headline not present in the baseline or challenger variants.
    - Flag any live URL that doesn't match the `final_url` in `rsa.json`.
    - Flag any live display URL path that doesn't match `display_url_path_1`/`display_url_path_2`.
11. Check for URL drift:
    - Verify live URLs point to real routes in `src/app/`.
    - Flag non-existent paths (e.g., `/open-source/infra` when only `/enterprise` and `/ecosystem` exist).
12. Check quality rating drift:
    - Flag any ad with "Ruim" (Poor) quality — these drag down the entire ad group.
    - Flag ads with "Médio" (Medium) quality as optimization targets.
    - Only "Bom" (Good) or better is acceptable for sustained delivery.
13. If drift is detected, generate a reconciliation report:
    - Which ads need to be paused/removed in Google Ads.
    - Which ads from `rsa.json` need to be created in Google Ads.
    - Step-by-step instructions for the manual reconciliation.

### Phase 6: Scorecard Assessment

14. Read scorecard and apply stop/continue rules from `campaign-config.json`:
    - CTR below threshold? → flag pause recommendation.
    - No primary CTA by R$60? → flag stop recommendation.
    - Irrelevant query share rising? → flag negative keyword action needed.

## Automation Scripts

Run these scripts as part of the diagnostic workflow:

| Command | When to use |
|---------|-------------|
| `npm run ads:google:prepublish` | Before any campaign edits — validates config guardrails |
| `DRY_RUN=1 npm run ads:google:publish-rsa` | Validate RSA char limits and URL routes |
| `DRY_RUN=1 npm run ads:google:publish-keywords` | Validate keywords and generate import formats |
| `npm run ads:google:checkpoint` | At each spend checkpoint to capture metrics |

## Outputs / Evidence

- **Severity-ranked issue list**: CRITICAL (blocks delivery), HIGH (blocks conversion), MEDIUM (reduces effectiveness), LOW (optimization opportunity).
- **Specific file:line references** for every technical issue found.
- **Actionable fix list**: what to change in campaign config, keywords, or source code.
- **Scorecard decision recommendation**: continue, pause, or restructure.
- **Automation output**: prepublish check results, RSA validation, keyword validation.

## Failure / Stop Conditions

- If `campaign-config.json` doesn't exist, stop and report missing campaign setup.
- If no GA4 tracking ID is configured, stop and report missing analytics setup.
- Do not recommend budget increases without acknowledging the micro-pilot constraint.
- If AI Max is enabled, flag immediately — it causes uncontrolled ad copy and URL drift.

## Load These Resources

- `references/diagnostic-checklist.md` — full checklist for systematic audit
- `references/common-failures.md` — known failure patterns and fixes

## Memory Hooks

- Read memory for prior checkpoint decisions and campaign history.
- Write memory when a new failure pattern is identified that should persist across sessions.
