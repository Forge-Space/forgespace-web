# Forge Space Marketing Site

A Next.js 16 marketing website for Forge Space — an open-source Internal Developer Platform (IDP).

## Stack
- **Framework**: Next.js 16.2 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 with custom design tokens via CSS variables
- **Animation**: Motion (formerly Framer Motion)
- **Icons**: Lucide React
- **Analytics**: Custom GA4 event system via `src/lib/analytics/ga4.ts`
- **Runtime**: Node.js, served on port 5000

## Routes
- `/` — Homepage (hero, trust strip, features grid, how-it-works, architecture, CTA)
- `/features` — Platform features detail page
- `/pricing` — Pricing tiers + comparison table + FAQ
- `/startups` — IDP for startups pitch page
- `/ecosystem` — Open-source ecosystem / architecture diagram
- `/roadmap` — Product roadmap
- `/enterprise` — Enterprise-focused page
- `/pt` — Portuguese localization landing page

## Key Design Decisions
- Dark premium aesthetic with violet brand (`#7c3aed` / `#8b5cf6`)
- Font: `--font-display` for headings, `--font-sans` for body
- All section spacing uses the `Section.tsx` primitive (`py-14 md:py-20` default, `py-10 md:py-14` for `dense` variant)
- `PageSection.tsx` is a pure content wrapper (no own padding) — place it inside sections with their own padding
- `TrustStrip` only appears on the homepage; other pages use reduced-intensity CTA patterns
- `CTASection` has variants: `default`, `minimal`, `enterprise`, `pt`
- `HowItWorks` has `locale` prop: `"en"` (default) or `"pt"`
- `Footer` is a client component — uses `usePathname()` to detect `/pt` and render Portuguese labels

## Component Architecture
- `src/components/layout/` — Nav, Footer, MobileMenu, PageSection
- `src/components/ui/` — Button, Badge, Section
- `src/components/landing/` — TrustStrip, CTASection, HowItWorks, HeroSection, FeaturesGrid, ArchitectureDiagram
- `src/components/shared/` — HeroParticlesBackground, EcosystemCard
- `src/lib/` — constants, analytics/ga4

## Important Notes
- `ArchitectureDiagram` has an `inline` prop — when `true`, renders without its own `<section>` wrapper (prevents double-padding on /ecosystem)
- All display h1s use `leading-[1.15]` and `.text-gradient-primary` CSS class to prevent gradient clip clipping
- MobileMenu uses `usePathname()` for active states
- The GitHub stars fetch in Nav is async and intentionally non-deterministic (SSR hydration warning is expected)
- Deployment config: `npm run dev` for development on port 5000; for production use `npm run build && npm start`
