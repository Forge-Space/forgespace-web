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

### Pages (5 routes)

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
