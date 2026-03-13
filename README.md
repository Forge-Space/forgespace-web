# Forge Space Web

Marketing site for [Forge Space](https://forgespace.co) — the open-source developer workspace ecosystem.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- Motion (motion.dev) for animations
- Lucide React icons

## Development

**Docker (recommended, matches other Forge Space projects):**

```bash
npm install
npm run dev:docker
# Or: ./scripts/dev.sh up
```

App runs at http://localhost:3000 with hot reload.

**Terminal (alternative):**

```bash
npm install
npm run dev
```

## Build

```bash
NODE_ENV=production npm run build
```

Note: Use `NODE_ENV=production` for builds to avoid Next.js workspace inference warnings.

## Production Smoke Checks

`Production Smoke Checks` validates live production pages with a stable selector
contract (not marketing copy text), and fails closed on regressions.

- Workflow: `.github/workflows/production-smoke.yml`
- Script: `scripts/smoke/production_smoke.py`
- Trigger modes: `schedule`, `workflow_dispatch`, and successful `Deploy to Vercel` (`main`)
- Failure artifacts: `artifacts/smoke/report.json`, `artifacts/smoke/report.md`, screenshot on failure

Run locally:

```bash
python scripts/smoke/production_smoke.py --output-dir artifacts/smoke
```

## Live Ecosystem Sync

Marketing pages consume a server-only GitHub metadata sync for the Forge Space
ecosystem (`repo count`, `latest release tag`, `recent activity`).

- Sync source: GitHub REST API (`Forge-Space` org)
- Cache strategy: `revalidate: 21600` (6 hours)
- Resilience: static fallback snapshot if GitHub is unavailable/rate-limited

Optional authentication (for higher GitHub API limits):

```bash
FORGE_SPACE_GITHUB_TOKEN=ghp_...
# fallback if the variable above is not set:
GITHUB_TOKEN=ghp_...
```

## SEO and Indexability

Forge Space exposes only canonical marketing routes for indexing:

- `/`
- `/features`
- `/pricing`
- `/ecosystem`
- `/roadmap`
- `/enterprise`

Technical SEO behavior:

- Per-route metadata contract with canonical URL, Open Graph URL, and Twitter fields
- Deterministic `sitemap.xml` timestamps to avoid crawl churn
- `robots.txt` publishes sitemap and blocks `/_next/` assets
- Structured data split:
  - Global `Organization` + `WebSite` graph
  - Homepage `SoftwareApplication`
  - Pricing `FAQPage` schema
- Server-rendered `<h1>` coverage for feature, ecosystem, and roadmap routes

## Analytics and Paid Traffic

Forge Space web supports GA4 event tracking for paid traffic optimization and
first-touch attribution persistence.

Set the GA4 measurement ID before running paid launch checks:

```bash
export NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

`ads:google:prepublish` also auto-loads `NEXT_PUBLIC_GA_TRACKING_ID` from
`.env.local` when the variable is not exported in the shell.

Tracked CTA events:

- `fs_cta_github_click` (primary optimization event)
- `fs_cta_contact_sales_click` (secondary)
- `fs_cta_siza_click` (secondary)

First-touch attribution contract stored in browser localStorage:

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `gclid`, `gbraid`, `wbraid`
- `landing_path`, `first_seen_at`

Google Ads campaign assets for the low-cost BR test are in:

- `marketing/google-ads/forgespace_br_pten_relevance_v2/`
- v3.2 defaults:
  - `$10` total-equivalent cap (`R$50` hard stop, `R$5/day`)
  - EN-only active ad groups (`smb_en`, `oss_en`) with a 60/40 keyword mix
  - intent split landing: `/enterprise` for `smb_en`, `/ecosystem` for `oss_en`
  - primary conversion set to `fs_cta_github_click`
  - `smb_pt` paused until a PT landing exists
  - Search-only with strict negative pruning cadence (`R$3`, `R$6`, `R$8`)

Prepublish command:

```bash
npm run ads:google:prepublish
```

Checkpoint command (requires a logged-in Google Ads Chrome session with CDP on `9222`):

```bash
npm run ads:google:checkpoint
```

Checkpoint output:

- `marketing/google-ads/forgespace_br_pten_relevance_v2/artifacts/<YYYY-MM-DD>-checkpoint/`
  with `campaign|settings|conversions|keywords|search-terms` as `.txt` + `.png`
- `marketing/google-ads/forgespace_br_pten_relevance_v2/checkpoint-scorecard-live.csv`
  updated in place (`R$3`, `R$6`, `R$8` rows preserved across runs)

Important campaign files:

- `campaign-config.json` — targeting/budget/measurement contract
- `keywords.csv` — active + paused keyword inventory
- `negative-keywords.csv` — launch + pruning negative set
- `rsa.json` — baseline/challenger RSA variants
- `assets.json` — sitelinks/callouts/snippets/image/logo/business name
- `ga4-ads-setup.md` — GA4 + Ads conversion and custom-dimension contract

## Docker

**Development (hot reload):**
- `./scripts/dev.sh up` or `npm run dev:docker` — foreground
- `./scripts/dev.sh up-d` — detached
- `./scripts/dev.sh down` — stop
- `./scripts/dev.sh logs` — follow logs

**Production:**
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

## Project Structure

### Pages (6 routes)

- `src/app/page.tsx` — Multi-section landing (Hero, Features, HowItWorks, SocialProof, Architecture, CTA)
- `src/app/features/` — Detailed feature sections with bullet points
- `src/app/pricing/` — 3-tier pricing with FAQ accordion and trust badges
- `src/app/ecosystem/` — Repos grouped by layer (Generation, Governance, Brand) with npm badges
- `src/app/roadmap/` — Phase 1 (Complete) / Phase 2 (Active) / Phase 3 (Planned)
- `src/app/enterprise/` — Enterprise support portal

### Components

- `src/components/landing/` — HeroSection, FeaturesGrid, HowItWorks, SocialProof, ArchitectureDiagram, CTASection
- `src/components/layout/` — Nav (responsive with mobile menu), Footer (multi-column)
- `src/components/ui/` — Button, Badge, Section (reusable primitives)
- `src/components/shared/` — EcosystemCard, HeroParticlesBackground, PageSection

### Design System

- `src/app/globals.css` — CSS custom properties (Forge brand tokens + Tailwind 4 theme)
- `src/styles/design-tokens.ts` — TypeScript token constants for non-CSS contexts
- Fonts: Sora (display), DM Sans (body), IBM Plex Mono (code)
- `docs/STYLE_GUIDE.md` — Design tokens reference

## Troubleshooting

**Styles not loading (white background, default fonts):** Tailwind v4 may not scan source files if a `.gitignore` in a parent directory (e.g. home) uses broad patterns like `*`. Fix: add `@source "../"` in `src/app/globals.css` to explicitly scope scanning, or run the app from a directory outside the ignored tree. Also try: `rm -rf .next && npm run dev`.
