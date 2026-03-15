# Google Ads Campaign Diagnosis — 2026-03-15

## Campaign: forgespace_br_en_visibility_v3

### Status: ZERO DELIVERY
- Scorecard 2026-03-13: R$0 spend, 0 impressions, 0 clicks

### Root Causes (ranked)
1. **Audience too narrow**: EN-only in Brazil + ultra-niche keywords = near-zero audience
2. **Keywords too long-tail**: 4-6 word exact phrases have zero search volume
3. **CPC cap too low**: R$0.80 ($0.16 USD) below competitive floor for B2B tech
4. **Budget inadequate for learning**: R$50 total ($10 USD) can never reach 50 conversions
5. **Enterprise page missing GitHub CTA**: primary conversion can't fire on smb_en landing
6. **Ecosystem page missing tracking**: repo links lack `data-fs-cta-event` attributes
7. **No Portuguese targeting**: excludes 95% of BR market

### Technical Bugs to Fix
- `src/app/ecosystem/client.tsx:89-135` — repo links need `data-fs-cta-event` + target + location attrs
- `src/app/enterprise/client.tsx` — needs GitHub CTA button for primary conversion

### Skill Created
- `.claude/skills/google-ads-diagnostics/SKILL.md` with references for checklist and common failures

### Recommended Next Steps
1. Shorten keywords to 2-3 words, add phrase/broad match
2. Raise CPC to R$4+ or remove cap
3. Fix ecosystem page tracking
4. Add GitHub CTA to enterprise page
5. Consider PT keywords or geography expansion
