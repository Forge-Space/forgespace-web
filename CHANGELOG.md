# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.7.2] - 2026-03-31

### Fixed

- **lucide-react v1 compatibility** — replaced the removed `Github` brand icon with a local `GitHubIcon` SVG component; upgraded `lucide-react` from `^0.577.0` to `^1.0.1`.

## [0.7.1] - 2026-03-31

### Fixed

- **SocialProof lint** — wrapped synchronous `setState` calls in `startTransition` to resolve `react-hooks/set-state-in-effect` lint errors.
- **Stale test assertions** — updated 8 test files to match current component implementations: ArchitectureDiagram 5-node layout (`delivery MCPs`), FeaturesGrid `CI Quality Gates` section, `Button` shadow class, `MobileMenu` CTA label, `PageSection` element selector, CTA tracking locations, TrustStrip sr-only text, and pricing trust badges.
- **Smoke test viewport fix** — scroll page after `networkidle` to trigger `whileInView` Framer Motion animations before selector checks.

### Changed

- **Responsive layout stability** — fixed roadmap progress labels and breakpoint behavior to remove horizontal overflow on `/roadmap` (mobile) and shared nav overflow at tablet widths.
- **Architecture section resilience** — adjusted landing feature rows and architecture diagram sizing to avoid visual breakage on narrow viewports while keeping existing content/test contracts.
- **Footer social links** — removed the X/Twitter social icon link from the site footer.
- **Footer CTA hardening** — removed the "Join roadmap updates" newsletter CTA from the footer.
- **Landing code snippets** — normalized snippet rendering to multiline `<pre><code>` blocks with consistent indentation in `HowItWorks` and `FeaturesGrid`.
- **Marketing copy hardening** — replaced commitment-heavy claims (free-forever/no-credit-card/self-hostable promises) with neutral capability language across landing, startups, pricing, and SEO metadata.

## [0.7.0] - 2026-03-19

### Added

- **hreflang alternates** — `seo.ts` now emits `<link rel="alternate" hreflang>` pairs for `en`/`pt-BR`/`x-default` on the home and `/pt` routes
- **SoftwareApplication JSON-LD on all pages** — `/ecosystem`, `/enterprise`, `/roadmap` now carry `SoftwareApplication` schema alongside `BreadcrumbList`
- **Coverage thresholds** — `@vitest/coverage-v8` installed with explicit `provider: v8` and 80/80/75 thresholds for lines/functions/branches
- **Error page tests** — `error-pages.test.tsx` covers `not-found.tsx` (404) and `global-error.tsx` (reset button)
- **Deploy CI gate** — `deploy.yml` now runs lint + type-check + test before production deployment

### Changed

- **Sitemap priorities** — `/pricing` raised to `0.9` (conversion page), `/pt` corrected to `0.7` (language variant)
- **Next.js security baseline** — upgraded `next`, `eslint-config-next`, and `@next/bundle-analyzer` to `16.2.0`; production build now runs with `next build --webpack` for stable CI output on the new baseline

## [0.6.0] - 2026-03-16

### Added

- **CTASection on /ecosystem** — Shared `<CTASection />` at bottom of ecosystem
  page with CTA tracking tests for GitHub, Contact Sales, and Siza events
- **CTASection on /startups** — Replaced inline Final CTA with shared
  `<CTASection />`, wiring the `startups_en` ad group landing to the
  `fs_cta_github_click` primary conversion surface; 4 CTA contract tests added
- **Real npm download stats** — Landing page now pulls live download counts
  instead of static numbers
- **Portuguese landing page (/pt)** — PT-BR variant for `smb_pt` ad group;
  Brazilian audience landing with native copy
- **Startups landing page (/startups)** — Accelerator-positioned page for the
  `startups_en` ad group route
- **smb_pt ad group activation** — v3.5 campaign with Portuguese keywords and
  RSA ads
- **Hero fallback guard** — Home route now keeps a branded static background
  when WebGL is unavailable instead of failing the page
- **Public route skip navigation** — Added skip-to-content support with a
  single top-level `main` landmark across public marketing routes
- **Deterministic ecosystem labels** — Ecosystem snapshot now includes
  preformatted server-side date labels for last sync, update dates, and release
  dates
- **Hero background regression coverage** — Added unit coverage for canvas
  gating and static fallback rendering

- **GA4 analytics provider** — Route-aware pageview tracking with configurable
  `NEXT_PUBLIC_GA_TRACKING_ID`
- **First-touch attribution module** — Stores and reuses UTM/click-id context
  (`utm_*`, `gclid`, `gbraid`, `wbraid`, `landing_path`, `first_seen_at`)
- **Forge CTA event contract** — Added `fs_cta_siza_click`,
  `fs_cta_github_click`, and `fs_cta_contact_sales_click`
- **Google Ads launch assets (Forge Space)** — Campaign pack at
  `marketing/google-ads/forgespace_br_pten_relevance_v2/` including config,
  keywords, negatives, RSA copy, and ops runbook
- **Campaign v2.2 hardening** — EN-only execution in Brazil, `smb_pt` paused,
  6-10 active high-intent EN keywords, stricter noise-pruning negatives,
  and `$10` equivalent hard-cap guardrails (`R$50` total / `R$5` day)
  enforced in prepublish
- **Visibility micro-pilot v3.2** — Campaign contract pivoted to ecosystem
  visibility with split intent ad groups (`smb_en`/`oss_en`), intent-specific
  landing routes (`/enterprise`, `/ecosystem`), and contributor-focused
  optimization
- **Ads asset coverage pack** — Added campaign assets contract with sitelinks,
  callouts, structured snippets, image/logo/business information
- **GA4/Ads measurement contract** — Added setup guide for Primary/Secondary
  conversions, custom dimensions (`cta_target`, `cta_location`), and
  ValueTrack final URL suffix
- **Checkpoint scorecard template** — Added structured `$3/$6/$8` run log for
  relevance, CTR, CTA rate, negatives, and pause decisions
- **Ads prepublish script** — `npm run ads:google:prepublish` validates GA4 env
  + lint + CTA/attribution tests before publish
- **Ads checkpoint runner** — Added `npm run ads:google:checkpoint` to capture
  live campaign/conversion/search-term artifacts and write the v3.2 scorecard
  row for checkpoint cadence operations
- **Attribution unit tests** — New coverage for first-touch persistence and
  outbound URL/mailto attribution forwarding
- **Import cycle detection** — `madge --circular` via `npm run check:cycles`
- **Quality Gates CI job** — knip dead code detection + circular dependency check
- **knip config** — `knip.json` with known false positive suppressions
- **Live ecosystem sync module** — Server-only GitHub metadata fetch with
  11-repo allowlist, release enrichment, resilient fallback snapshot, and
  6-hour revalidation
- **Ecosystem sync tests** — Coverage for success mapping, release fallback, and
  org-fetch fallback scenarios
- **SEO contract tests** — Metadata, sitemap/robots, and JSON-LD coverage for
  route-level SEO guarantees
- **Structured data modules** — Global `Organization` + `WebSite`, homepage
  `SoftwareApplication`, and pricing `FAQPage` schema payloads

### Changed

- **CTA instrumentation surfaces** — Hero, landing CTA, nav, footer, pricing,
  enterprise, and roadmap outbound CTAs now emit GA4 events with location and
  target metadata
- **Outbound attribution forwarding** — Siza/contact-sales links now receive
  stored first-touch attribution context on click
- **Ops runbook** — Updated day-ops to include Presence-only geo option,
  auto-tagging checks, ValueTrack suffix setup, and early-stop policy by `R$6`
- **Measurement optimization primary** — Set `fs_cta_github_click` as campaign
  primary conversion, with `fs_cta_contact_sales_click` and
  `fs_cta_siza_click` as secondary signals
- **Prepublish guardrails** — Enforced v3.2 ad-group mix checks (`smb_en=6`,
  `oss_en=4` enabled variants) and primary conversion validation in
  `ads:google:prepublish`
- **Prepublish env loading** — `ads:google:prepublish` now auto-loads
  `NEXT_PUBLIC_GA_TRACKING_ID` from `.env.local`, sanitizes malformed newline
  suffixes, and validates the `G-...` format before running checks
- **Checkpoint evidence capture** — `ads:google:checkpoint` now saves visual
  PNG snapshots (`campaign`, `settings`, `conversions`, `keywords`,
  `search-terms`) alongside text extracts and preserves previously filled
  `R$3/R$6/R$8` rows when updating `checkpoint-scorecard-live.csv`
- **Landing CTA strategy** — Hero and lower CTA now expose explicit visibility
  paths for GitHub, Contact, and Siza while preserving attribution contracts
- **Free-channel loop** — Added message-spine alignment step across ads,
  landing copy, and community posts
- **Production smoke contract hardening** — Replaced brittle homepage copy
  anchors with stable selector checks (CTA data attributes + structural selectors)
  in `scripts/smoke/production_smoke.py`, preserving fail-closed workflow behavior
- **Marketing data model** — Landing, features, architecture, ecosystem, and
  roadmap pages now consume the shared ecosystem snapshot instead of static repo
  counts and stale claims
- **Ecosystem cards** — Added release tag and last-updated chips with improved
  keyboard focus states
- **Env contract** — Added optional `FORGE_SPACE_GITHUB_TOKEN` (preferred) with
  `GITHUB_TOKEN` fallback for authenticated GitHub API calls
- **Route metadata model** — Canonical URL, Open Graph URL, and Twitter fields
  now ship per marketing route
- **Sitemap stability** — `lastModified` timestamps are deterministic to prevent
  request-time churn
- **Server HTML headings** — `/features`, `/ecosystem`, and `/roadmap` now emit
  crawlable server-rendered `<h1>` tags
- **Ecosystem SEO copy** — Replaced stale "9 repositories" description with the
  current 11-repo scope and live release context

## [0.3.0] - 2026-03-07

### Added

- **Landing component tests** — 22 new tests for Button, Badge, SocialProof, FeaturesGrid, HowItWorks, ArchitectureDiagram, CTASection (48 total)
- **Multi-section landing page** — 6 composable sections: Hero, SocialProof, FeaturesGrid, HowItWorks, ArchitectureDiagram, CTASection
- **Responsive mobile navigation** — hamburger menu with slide-out panel, focus management, Escape to close
- **Multi-column footer** — 4-column layout (Product, Developers, Company) with social links and brand description
- **Reusable UI components** — Button (3 variants, 3 sizes), Badge (3 variants), Section (3 variants)
- **FAQ section on pricing** — 6 frequently asked questions with accordion pattern, trust badges
- **Architecture diagram** — visual 4-layer ecosystem flow on landing page
- **Brand monogram in nav** — inline SVG anvil logo from brand-guide
- **Favicon and icon** — from brand-guide assets
- **Mobile menu button** — accessible hamburger with aria-label

### Changed

- **Dark theme contrast** — raised surface/border tokens for visible card hierarchy (`#1a1a1e → #222226`, `#27272a → #333338`)
- **Section separators** — added border-t dividers and gradient overlays between landing sections
- **Architecture layers** — doubled color opacity from 5% to 10% for visibility
- **Features page** — expanded from 6 generic cards to 6 detailed feature sections with bullet points and descriptions
- **Ecosystem page** — grouped repos by layer (Generation Engine, Governance, Design), added npm package badges and highlights
- **Roadmap** — updated from outdated Q4 2023/Q1 2024 timeline to current Phase 1 (Complete) / Phase 2 (Active) / Phase 3 (Planned)
- **Landing page** — server component composition with client boundaries on individual sections (improved hydration)
- **Typography** — leveraged full brand type scale (gradient headlines, mono labels, display stats)
- **Animations** — switched from mount animations to scroll-triggered `whileInView` with `viewport={{ once: true }}`
- **SEO metadata** — server/client page split pattern with `seo.ts` centralized metadata

### Removed

- 7 shallow pages: /command-center, /onboarding, /protocol, /governance, /patterns, /integrations, /how-it-works
- Unused dependencies: `@react-three/drei`, `clsx`, `tailwind-merge`, `@forgespace/brand-guide`

## [0.2.1] - 2026-03-07

### Added

- **CI workflows** — `ci.yml` (lint, type-check, build, security audit) + `secret-scan.yml` (TruffleHog + GitLeaks)
- **R3F v8 + React 19 type fix** — `src/types/react-three-fiber.d.ts` extends ThreeElements into `React.JSX.IntrinsicElements`

### Fixed

- TruffleHog secret scan: use `github.event.before` as base on push events to avoid BASE=HEAD error

## [0.2.0] - 2026-03-07

### Added

- **IDP marketing pages** — 11 pages: Features, Ecosystem, Roadmap, Integrations, Command Center, Onboarding, Enterprise, Protocol, Governance, Patterns, How It Works
- **Docker production config** — Dockerfile (BuildKit, node:22-alpine, healthcheck), docker-compose.yml + docker-compose.prod.yml
- **Shared components** — `PageSection`, `EcosystemCard`, `HeroParticlesBackground`
- **Design system** — `design-tokens.ts`, `constants.ts`, style guide docs
- **Dev tooling** — `scripts/dev.sh`, `.npmrc`, Stitch design prompts

## [0.1.0] - 2025-03-02

### Added

- **Docker optimization** — BuildKit cache mounts for npm (`--mount=type=cache`), pinned `node:22.22.0-alpine`, `deploy.resources` limits/reservations, `healthcheck`, `logging` rotation, `ulimits`, expanded `.dockerignore`. Separate `docker-compose.prod.yml` for production. Matches siza/mcp-gateway patterns.

- **3D hero particles** — `HeroParticlesBackground` component using React Three Fiber and Three.js for particle background on landing page. Respects `prefers-reduced-motion`. Centralized `EASE_SIZA` in `@/lib/constants`.

- **Stitch pages** — Implemented 11 marketing pages from Stitch project (Forge Space Web): Features, Ecosystem, Roadmap, Integrations, Command Center, Onboarding, Enterprise, Protocol, Governance, Patterns, How It Works
- **Shared components** — `PageSection`, `EcosystemCard` for consistent layout and card styling
- **Nav links** — Features, Ecosystem, How It Works, Docs, Enterprise
- **Footer links** — Ecosystem, Governance
- **Style guide** — `docs/STYLE_GUIDE.md` with design tokens, component names, Stitch refs
- **design-tokens.ts** — Raw token values for contexts without CSS (e.g. global-error)
- **UI/UX improvement** — Align with Modern Horn brand (forge-space-design-system tokens)
- **Nav and Footer** — Persistent nav with logo, Docs/Pricing/Sign in links, Get started CTA; footer with tagline, GitHub/Siza/Docs links, copyright
- **Hero refinements** — Open Source badge, radial gradient glow background
- **Ecosystem cards** — Hover glow and border transition to primary
- **404 page** — Design tokens, nav/footer layout, focus states
- **Stitch design exploration** — Generated Forge Space landing variants for reference
- **STITCH_PROMPTS.md** — Copy-paste prompts for Stitch (Workspace, Ecosystem, How It Works, Features, Pricing, Docs); definitions and branding from brand-guide and forge-space-design-system

### Changed

- **Docker optimizations** — BuildKit cache mounts for npm and Next.js build cache; improved .dockerignore (tests, coverage, turbo, logs); `shm_size: 256mb` for dev service; deploy.resources, ulimits, logging limits (matches mcp-gateway/siza patterns).
- **Brand alignment** — Replaced hardcoded colors with `--forge-*` CSS variables
- **global-error** — Brand-aligned UI with Sora/DM Sans fonts, Google Fonts link, error message in dev, `forgeTokens` from design-tokens. Removed duplicate `tokens.ts` (use `design-tokens.ts` only).

### Fixed

- **Stitch page styles** — Tailwind v4 was not generating utility classes. Added `@source "../"` in globals.css to explicitly scope source scanning (fixes parent .gitignore blocking). Extended `@theme inline` with all used forge tokens (forge-bg, forge-bg-elevated, forge-surface-alt, forge-border-hover, forge-text, forge-accent, forge-accent-foreground, forge-ring). Added Troubleshooting section to README.

### Added (initial bootstrap)

- Motion (motion.dev) integration for animations
- Landing page with hero, ecosystem cards, and CTA
- `useReducedMotion()` support for accessibility
- Custom `global-error.tsx` and `not-found.tsx`

[Unreleased]: https://github.com/Forge-Space/forgespace-web/compare/v0.7.1...HEAD
[0.7.1]: https://github.com/Forge-Space/forgespace-web/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/Forge-Space/forgespace-web/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/Forge-Space/forgespace-web/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/Forge-Space/forgespace-web/compare/v0.4.2...v0.5.0
[0.4.2]: https://github.com/Forge-Space/forgespace-web/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/Forge-Space/forgespace-web/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/Forge-Space/forgespace-web/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/Forge-Space/forgespace-web/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/Forge-Space/forgespace-web/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/Forge-Space/forgespace-web/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Forge-Space/forgespace-web/releases/tag/v0.1.0
