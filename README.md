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

- `src/app/` — App Router pages and layouts
- `src/app/page.tsx` — Landing page with hero, ecosystem cards, Motion animations
- `src/app/features/` — Features grid (AI generation, MCP, BYOK, etc.)
- `src/app/ecosystem/` — Six repos (Siza, siza-mcp, mcp-gateway, etc.)
- `src/app/roadmap/` — Product roadmap (Q4 2023–Q2 2024)
- `src/app/integrations/` — Integrations directory (GitHub, Cloudflare, Supabase, etc.)
- `src/app/command-center/` — Quick actions, recent repos
- `src/app/onboarding/` — Connect Forge to Siza
- `src/app/enterprise/` — Enterprise support portal
- `src/app/protocol/` — Protocol standards & docs
- `src/app/governance/` — Ecosystem governance & RFCs
- `src/app/patterns/` — Universal patterns
- `src/app/how-it-works/` — Architecture flow
- `src/app/layout.tsx` — Root layout with Nav, Footer, fonts (Sora, DM Sans, IBM Plex Mono)
- `src/components/layout/` — Nav and Footer components
- `src/components/shared/` — EcosystemCard, PageSection
- `src/styles/design-tokens.ts` — Raw token values for non-CSS contexts
- `docs/STYLE_GUIDE.md` — Design tokens, component names, Stitch project reference
- `docs/STITCH_PROMPTS.md` — Stitch prompts for Workspace, Ecosystem, Features, Pricing, Docs screens (includes brand-guide + forge-space-design-system definitions)

## Troubleshooting

**Styles not loading (white background, default fonts):** Tailwind v4 may not scan source files if a `.gitignore` in a parent directory (e.g. home) uses broad patterns like `*`. Fix: add `@source "../"` in `src/app/globals.css` to explicitly scope scanning, or run the app from a directory outside the ignored tree. Also try: `rm -rf .next && npm run dev`.
