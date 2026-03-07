# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2026-03-07

### Added

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

- **Import cycle detection** — `madge --circular` via `npm run check:cycles`
- **Quality Gates CI job** — knip dead code detection + circular dependency check
- **knip config** — `knip.json` with known false positive suppressions

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
