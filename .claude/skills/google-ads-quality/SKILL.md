---
name: google-ads-quality
description: >
  Optimize Google Ads Quality Score by validating keyword-to-headline alignment,
  landing page match, URL validity, headline character limits, and ad-group
  coherence. Use when ad quality ratings are Médio/Ruim (Medium/Poor), CTR is
  low, or before publishing new RSA variants. Triggers: "improve ad quality",
  "quality score", "ad relevance", "headline optimization", "ruim", "médio",
  "poor quality ad", "rewrite ad copy".
metadata:
  owner: forge-space
  tier: contextual
  canonical_source: .claude/skills/google-ads-quality
---

# Google Ads Quality Score Optimization

## Use When

- An ad shows "Ruim" (Poor) or "Médio" (Medium) quality rating.
- CTR is below 2% and ad relevance may be the bottleneck.
- Before publishing new RSA variants to Google Ads.
- When rewriting ad copy to match updated keywords.
- After changing landing page URLs or page content.

## Do Not Use When

- The problem is zero delivery (use google-ads-diagnostics instead).
- The task is keyword research. Use brainstorming or marketing-ideas.
- The task is landing page design. Use standard dev workflow.

## Inputs / Prereqs

- `marketing/google-ads/forgespace_br_pten_relevance_v2/rsa.json` — ad copy
- `marketing/google-ads/forgespace_br_pten_relevance_v2/keywords.csv` — target keywords
- `marketing/google-ads/forgespace_br_pten_relevance_v2/campaign-config.json` — landing URLs
- Landing page source files for content alignment verification
- Optional: screenshot from Google Ads showing current quality ratings

## Workflow

### Phase 1: Keyword-Headline Alignment

1. Extract all enabled keywords from `keywords.csv`.
2. For each keyword, verify at least one headline in `rsa.json` contains the **exact keyword text**.
3. Flag any keyword without a matching headline — this directly hurts Ad Relevance.
4. Verify keyword-matched headlines are pinned to position 1 (if using pins).
5. Score: each keyword should appear verbatim in at least 1 headline, ideally 2.

### Phase 2: Headline Validation

6. Check all headlines are ≤30 characters.
7. Check all descriptions are ≤90 characters.
8. Verify each ad has 8-15 headlines and 2-4 descriptions.
9. Check for duplicate or near-duplicate headlines within the same ad.
10. Verify headline diversity: mix of keyword matches, value props, CTAs, and trust signals.

### Phase 3: Landing Page Alignment

11. For each ad group's `final_url`, verify the URL route exists in `src/app/`.
12. Load the landing page component and extract:
    - Page title/h1 text
    - Key value propositions
    - Available CTAs
13. Verify ad descriptions mirror the landing page's actual content.
14. Verify the primary conversion CTA exists on the landing page.
15. Flag any ad that promises something the landing page doesn't deliver.

### Phase 4: URL Validation

16. Verify all `final_url` values use real routes (not fabricated paths).
17. Verify `display_url_path_1` and `display_url_path_2` are set and meaningful.
18. Verify all sitelink URLs in `assets.json` point to real routes.
19. Flag any URL containing paths that don't exist in `src/app/`.

### Phase 5: Quality Score Prediction

20. For each ad group, predict Quality Score components:
    - **Ad Relevance**: keyword text in headlines? → Above Average / Average / Below Average
    - **Expected CTR**: compelling headlines? CTA present? → Above Average / Average / Below Average
    - **Landing Page Experience**: content match? fast load? mobile? → Above Average / Average / Below Average
21. Flag any component predicted as "Below Average" with specific fix.

## Outputs / Evidence

- **Quality Score prediction** for each ad group (1-10 scale estimate).
- **Keyword coverage table**: which keywords appear in which headlines.
- **Character count validation**: any over-limit headlines or descriptions.
- **URL verification**: all URLs point to real, working routes.
- **Fix recommendations**: specific headline/description changes to improve quality.

## Ad Group Reference (v3.5)

| Ad group | Keywords | Landing | h1 | GitHub CTA |
|----------|----------|---------|-----|-----------|
| `smb_en` | internal developer platform, backstage alternative, platform engineering tools | `/` | "Open-source IDP for teams without a platform department" | ✅ hero + footer |
| `oss_en` | open source developer platform, open source IDP, developer platform github | `/ecosystem` | sr-only "Forge Space Ecosystem" | ✅ repo links |
| `startups_en` | IDP for startups, dev platform for startups, platform engineering startups | `/startups` | "Ship Faster Without a Platform Team" | ✅ hero + footer |

All 3 landing pages have verified GitHub CTAs (primary conversion). Tests in `src/__tests__/`.

## Automation

Run validation before publishing any ad changes:

```bash
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX npm run ads:google:prepublish  # full guardrails (56 tests)
npm run ads:google:generate-upload                                       # regenerate editor-upload.csv
DRY_RUN=1 npm run ads:google:publish-rsa       # validates char limits, URL routes, pin config
DRY_RUN=1 npm run ads:google:publish-keywords  # validates match types, formats
```

## Failure / Stop Conditions

- If `rsa.json` doesn't exist, stop and report missing ad copy file.
- If `keywords.csv` is empty, stop and report missing keyword configuration.
- If AI Max is enabled, flag it immediately — it overwrites all RSA copy and URLs with auto-generated content regardless of rsa.json.
- Do not fabricate URLs that don't correspond to actual site routes.
- Never use display URL paths that mislead about the actual landing page content.
- If any headline exceeds 30 chars or any description exceeds 90 chars, fix before publishing.

## Load These Resources

- `references/quality-score-rules.md` — Google's Quality Score factors, pin strategy, and character limits
