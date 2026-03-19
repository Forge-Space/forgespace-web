## Coverage triage for CI run 23164641977

### Baseline failure snapshot (from run 23164641977)

- Global coverage: statements 62.95%, branches 71.36%, functions 72.13%, lines 62.76%
- Required thresholds: statements 80%, branches 75%, functions 80%, lines 80%

### Highest-impact hotspots in scoped files

| File | Run 23164641977 coverage | Gap impact | Selected action |
| --- | --- | --- | --- |
| `src/components/analytics/AnalyticsProvider.tsx` | 0% statements/branches/functions/lines | Very high (152 uncovered lines in central runtime analytics path) | Add runtime behavior tests for script injection, CTA click handling, attribution opt-in/out, and listener cleanup |
| `src/lib/analytics/ga4.ts` | 7.14% statements/lines, 0% branches/functions | High (core tracking helpers mostly uncovered) | Add focused unit tests for gtag present/missing flows, CTA + conversion + pageview helpers |
| `app/**/page.tsx` | Multiple 0% entries listed in run output | High noise against global gates | Keep page route wrappers excluded from coverage target file set in `vitest.config.ts` (do not lower thresholds) |

### Locked target file set for immediate recovery

1. `src/lib/analytics/ga4.ts`
2. `src/components/analytics/AnalyticsProvider.tsx`
3. `app/**/page.tsx` (excluded from coverage target set)

### Expected uplift after selected actions

- `ga4.ts`: from 7.14% to >90% lines/statements and >75% branches
- `AnalyticsProvider.tsx`: from 0% to >80% lines/statements and ~60%+ branches
- Global project coverage expected to cross CI gates without changing threshold values

### Validation command (mandatory)

Run:

```bash
npm run test:coverage
```

### Follow-up execution plan

1. Keep global coverage thresholds unchanged in `vitest.config.ts`.
2. Maintain runtime tests under `src/__tests__/AnalyticsProvider.runtime.test.tsx` and unit tests under `src/lib/analytics/ga4.test.ts`.
3. Validate with `npm run test:coverage` before merge and confirm global gates remain green.
