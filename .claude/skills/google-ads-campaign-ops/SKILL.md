---
name: google-ads-campaign-ops
description: >
  Daily operations for a live Google Ads campaign: checkpoint reviews, go/no-go
  decisions, negative keyword pruning, scorecard updates, and upload workflow.
  Use when the campaign is live and you need to run a checkpoint, review search
  terms, add negatives, or decide whether to continue or pause. Triggers:
  "run checkpoint", "review search terms", "add negative keywords",
  "go no-go decision", "campaign checkpoint", "ads spending", "update scorecard",
  "upload to google ads", "import editor csv".
metadata:
  owner: forge-space
  tier: contextual
  canonical_source: .claude/skills/google-ads-campaign-ops
---

# Google Ads Campaign Ops

## Use When

- Running a scheduled checkpoint (R$10, R$30, R$60 spend milestones).
- Reviewing search terms report to add negative keywords.
- Making a go/no-go decision based on CTR and conversion data.
- Uploading new ads, keywords, or extensions to Google Ads Editor.
- Updating the scorecard after a checkpoint.

## Do Not Use When

- The campaign has 0 impressions and you need to diagnose why. Use `google-ads-diagnostics`.
- Ad quality is poor and you need to rewrite copy. Use `google-ads-quality`.
- You're setting up the campaign for the first time. Use `ops-playbook.md`.

## Campaign Files

```
marketing/google-ads/forgespace_br_pten_relevance_v2/
  campaign-config.json       — settings, stop/continue rules
  checkpoint-scorecard-live.csv — live metrics at each checkpoint
  rsa.json                   — ad copy source of truth (v3.4)
  keywords.csv               — positive keywords
  negative-keywords.csv      — negative keywords
  assets.json                — sitelinks, callouts, snippets
  editor-upload.csv          — generated bulk upload (gitignored)
  ops-playbook.md            — full manual ops reference
  day1-ops.md                — upload instructions
```

## Checkpoint Workflow (R$10 / R$30 / R$60)

### Step 1: Run automated checkpoint

```bash
npm run ads:google:checkpoint
```

This captures current metrics and updates `checkpoint-scorecard-live.csv`.

### Step 2: Review scorecard

Read `checkpoint-scorecard-live.csv` and check:
- **CTR**: target ≥3% on at least one ad group
- **Primary CTA count**: at least 1 `fs_cta_github_click` by R$60
- **Irrelevant query share**: rising? → add negatives immediately

### Step 3: Apply stop/continue rules

From `campaign-config.json`:

**Continue if:**
- CTR ≥3% on at least one active ad group, AND
- At least one `fs_cta_github_click` conversion

**Pause early if:**
- CTR <1.5% by R$30, OR
- Poor intent quality by R$60, OR
- Repeated irrelevant terms after two pruning passes

**Stop at R$100** (automated rule in Google Ads).

### Step 4: Prune negative keywords

1. In Google Ads, go to Search Terms report.
2. Identify irrelevant queries (employment, education, entertainment, unrelated software).
3. Add to `negative-keywords.csv` with appropriate match type.
4. Run prepublish to verify no conflicts:
   ```bash
   NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX npm run ads:google:prepublish
   ```
5. Regenerate upload CSV:
   ```bash
   npm run ads:google:generate-upload
   ```
6. Import updated negatives via Google Ads Editor.

### Step 5: Pause underperforming keywords

Pause keywords with 2+ clicks and zero primary CTA conversions:
1. In Google Ads, go to Keywords.
2. Filter: clicks ≥2, conversions = 0.
3. Pause those keywords.
4. Update `keywords.csv` status to `paused` for the affected rows.

### Step 6: Update scorecard

Fill in `checkpoint-scorecard-live.csv` with current data:
```
checkpoint_brl,date,spend_brl,impressions,clicks,ctr_percent,avg_cpc_brl,primary_cta_count,primary_cta_rate_percent,irrelevant_query_share_percent,new_negative_keywords,keywords_paused,decision
10,YYYY-MM-DD,...
```

## Upload Workflow (after any rsa.json / keywords / assets change)

```bash
# 1. Validate everything
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX npm run ads:google:prepublish

# 2. Regenerate bulk upload CSV
npm run ads:google:generate-upload

# 3. Import in Google Ads Editor
#    File → Import → From CSV → editor-upload.csv
#    Review in "Proposed changes" panel → Apply → Post

# 4. Manually pin headlines after import
#    (pin list printed by generate-upload)
```

## Go/No-Go Decision Framework

| Metric | Green | Yellow | Red |
|--------|-------|--------|-----|
| CTR | ≥3% | 1.5–3% | <1.5% |
| Primary CTA | ≥1 by R$30 | 1 by R$60 | 0 by R$60 |
| Irrelevant query share | <20% | 20–40% | >40% |
| Quality rating | All "Bom" | Some "Médio" | Any "Ruim" |

**Green on all**: continue, increase budget to R$15/day.
**Yellow on any**: continue with close monitoring, add negatives.
**Red on any**: pause campaign, diagnose with `google-ads-diagnostics`.

## Negative Keyword Themes to Watch

| Theme | Examples | Action |
|-------|---------|--------|
| Employment | job, salary, internship, vaga | Already blocked |
| Education | tutorial, bootcamp, certification, curso | Already blocked |
| Entertainment | concert, ticket, lyrics, backstage pass | Already blocked |
| Download | apk, crack, download, pdf | Already blocked |
| Design noise | logo, canva, ppt, slides | Already blocked |
| New irrelevant terms | Found in search terms report | Add immediately |

## Commit Convention for Ops Changes

```
fix(marketing): add negative keywords after R$10 checkpoint
fix(marketing): pause low-performing keywords (smb_en)
feat(marketing): update scorecard at R$30 checkpoint
```

## Memory Hooks

- After each checkpoint: write memory with spend, CTR, decision, and any new negatives added.
- Pattern: `marketing/google-ads/checkpoint-YYYY-MM-DD`
