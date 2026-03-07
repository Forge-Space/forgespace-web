# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

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
