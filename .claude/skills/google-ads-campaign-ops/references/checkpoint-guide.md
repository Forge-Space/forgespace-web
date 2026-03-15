# Checkpoint Guide — forgespace_br_en_visibility_v3

## Checkpoint Schedule

| Checkpoint | Spend | Timing | Primary Question |
|-----------|-------|--------|-----------------|
| 1 | R$10 | ~1-2 days | Are we getting impressions? Is CTR viable? |
| 2 | R$30 | ~3-5 days | Is intent quality good? Any conversions? |
| 3 | R$60 | ~6-10 days | Go/no-go: continue, restructure, or stop? |
| Stop | R$100 | Automated | Campaign auto-pauses via Google Ads rule |

## What to Check at Each Checkpoint

### R$10 Checkpoint
- [ ] Impressions > 0 (if 0, run google-ads-diagnostics immediately)
- [ ] CTR > 1% (minimum viable signal)
- [ ] No "Ruim" quality ads
- [ ] Search terms report: any obvious irrelevant queries?
- [ ] Add negatives for any irrelevant terms found

### R$30 Checkpoint
- [ ] CTR ≥ 1.5% on at least one ad group
- [ ] At least 1 `fs_cta_github_click` conversion (or investigate why not)
- [ ] Irrelevant query share < 40%
- [ ] Pause keywords with 2+ clicks and 0 conversions
- [ ] Decision: continue or pause?

### R$60 Checkpoint
- [ ] CTR ≥ 3% on at least one ad group
- [ ] Primary CTA conversions ≥ 1
- [ ] Irrelevant query share < 20%
- [ ] Quality ratings: all "Bom" or better
- [ ] Final go/no-go decision

## Scorecard Fields

```csv
checkpoint_brl  — 10, 30, or 60
date            — YYYY-MM-DD
spend_brl       — actual cumulative spend
impressions     — total impressions
clicks          — total clicks
ctr_percent     — clicks/impressions × 100
avg_cpc_brl     — spend/clicks
primary_cta_count — fs_cta_github_click conversions
primary_cta_rate_percent — primary_cta_count/clicks × 100
irrelevant_query_share_percent — % of search terms that are irrelevant
new_negative_keywords — count added this checkpoint
keywords_paused — count paused this checkpoint
decision        — continue | pause | restructure | stop
```

## Interpreting CTR

- **<1%**: Very low. Check ad quality, keyword match, and audience size.
- **1–2%**: Below average for B2B. Optimize headlines, add more exact-match keywords.
- **2–3%**: Average. Continue, monitor conversions.
- **3–5%**: Good. Continue, consider increasing budget.
- **>5%**: Excellent. Scale up.

## Interpreting Conversion Rate

- **0 conversions by R$30**: Investigate landing page CTAs and GA4 tracking.
- **<1% conversion rate**: Landing page may not match ad intent.
- **1–3%**: Acceptable for B2B awareness campaign.
- **>3%**: Strong. Scale up.
