# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

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

- **Brand alignment** — Replaced hardcoded colors with `--forge-*` CSS variables
- **global-error** — Uses `@/styles/design-tokens` instead of hardcoded colors

### Fixed

- **Stitch page styles** — Tailwind v4 was not generating utility classes. Added `@source "../"` in globals.css to explicitly scope source scanning (fixes parent .gitignore blocking). Extended `@theme inline` with all used forge tokens (forge-bg, forge-bg-elevated, forge-surface-alt, forge-border-hover, forge-text, forge-accent, forge-accent-foreground, forge-ring). Added Troubleshooting section to README.

### Added (initial bootstrap)

- Motion (motion.dev) integration for animations
- Landing page with hero, ecosystem cards, and CTA
- `useReducedMotion()` support for accessibility
- Custom `global-error.tsx` and `not-found.tsx`
