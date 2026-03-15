# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2026-03-07

### Added

- **Google Ads visibility ops skill hook** — Linked the free-channel loop to the
  new local `google-ads-visibility-ops` skill for campaign audits and checkpoint
  decisions
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

## [Unreleased]

### Added

- **Distribution ops automation** — Added `npm run distribution:check` plus a
  weekly workflow that updates one issue with package links, MCP Registry
  visibility, owned-capture route health, and a drafted weekly post
- **Clean Chrome Ads automation flow** — Documented a clean `9223` Chrome CDP
  profile for live Google Ads cleanup and checkpoint capture without reusing the
  dirty daily browser
- **GA4 analytics provider** — Route-aware pageview tracking with configurable
  `NEXT_PUBLIC_GA_TRACKING_ID`
- **First-touch attribution module** — Stores and reuses UTM/click-id context
  (`utm_*`, `gclid`, `gbraid`, `wbraid`, `landing_path`, `first_seen_at`)
- **Forge CTA event contract** — Added `fs_cta_siza_click`,
  `fs_cta_github_click`, `fs_cta_docs_click`,
  `fs_cta_community_click`, and `fs_cta_contact_sales_click`
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
  - lint + CTA/attribution tests before publish
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

- **Owned capture routing** — Nav, footer, landing CTA, and roadmap now route
  docs traffic to `docs.forgespace.co`, community traffic to GitHub
  Discussions, sign-in to `siza.forgespace.co/signin`, and acquisition CTAs to
  `siza.forgespace.co/signup`
- **Homepage CTA strategy** — Landing CTA stack now prioritizes docs,
  discussions, and Siza beta signup over generic app-root or sales-first paths
- **Free-channel loop contract** — Weekly marketing loop now uses Docs,
  GitHub Discussions, and Siza beta signup as the canonical owned-capture trio
- **Visibility goal contract** — Locked the Google Ads pilot to campaign-specific
  visibility goals, excluded `Inscrição` from bidding optimization, and deferred
  customer lifecycle optimization until eligible audiences exist
- **Ads ops runbooks** — Updated GA4/Ads setup and day-ops guidance to enforce
  Primary/Secondary conversion roles and lifecycle-disable checks during launch
  and checkpoints
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
- **Checkpoint browser targeting** — `ads:google:checkpoint` now accepts
  `GOOGLE_ADS_CDP_URL`, fails closed on auth/session mismatches, and surfaces
  ad-blocker interference explicitly instead of silently treating it as missing
  Ads data
- **Checkpoint warning reclassification** — Banner-only ad-blocker warnings and
  generic lifecycle warning copy are now informational when network evidence and
  underlying lifecycle settings are clean; hard failure remains reserved for
  auth/session issues and real blocked-request evidence
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
- **Ecosystem SEO copy** — Replaced stale “9 repositories” description with the
  current 11-repo scope and live release context

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

[Unreleased]: https://github.com/Forge-Space/forgespace-web/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/Forge-Space/forgespace-web/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Forge-Space/forgespace-web/releases/tag/v0.1.0
