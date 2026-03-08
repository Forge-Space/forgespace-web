# Forge Space Website Redesign — UI/UX & Content Overhaul

## Context

forgespace.co is LIVE on Vercel but every page is shallow — the landing page is just a hero + 3 small cards (135 lines). All 13 pages reuse the same pattern (PageSection header + EcosystemCard grid) with no visual variety, no product imagery, no social proof, and no mobile responsiveness on the nav. The brand guide (`@forgespace/brand-guide@0.6.0`) has a rich design system (gradients, shadows, typography scale, motion tokens, glow effects) that's barely utilized.

**Current state**: v0.2.1, branch `ci/security-scanning`, 1 open PR (#23 — Semgrep+Trivy).
**Design system**: Full token set in `globals.css` — only `--forge-primary`, `--forge-border`, `--forge-surface` are actually used. Gradients, shadows, spacing scale, and typography scale are defined but unused.
**Brand assets**: 7 logo variants (SVG/PNG) at `brand-guide/public/logos/`, Sora/DM Sans/IBM Plex Mono fonts loaded.
**Stitch reference**: 71+ screens in project `14150866373996469001` with adapted Forge design tokens.

### Key Problems
1. **Nav**: No mobile menu, 8 links overflow on small screens, text-only logo
2. **Landing page**: Hero + 3 cards. No screenshots, social proof, architecture diagram, or value demonstration
3. **Visual monotony**: Every page = same card grid. No illustrations, no product shots, no diagrams
4. **Content depth**: Each page has ~30 lines of actual content. Feature descriptions are one-liners
5. **Outdated content**: Roadmap shows Q4 2023 / Q1 2024 / Q2 2024 (all past)
6. **Unnecessary pages**: /command-center, /onboarding, /protocol, /patterns, /governance are app concepts, not marketing
7. **Footer**: Single-row, no multi-column layout, no social links
8. **No mobile responsiveness** on nav

## Pre-Conditions
- [ ] Branch: start from `main` (merge PR #23 first if ready, or branch from main)
- [ ] `cd ~/Desenvolvimento/forge-space/forgespace-web`
- [ ] `npm install` — ensure deps are current
- [ ] `NODE_ENV=production npx next build` passes
- [ ] Tests passing: `npx vitest run` (24 tests)

## Architecture After Implementation

```
src/
  app/
    page.tsx              -- REBUILT: Multi-section landing (hero, features, how-it-works, social proof, CTA)
    pricing/page.tsx      -- ENHANCED: FAQ section, comparison table, trust badges
    features/page.tsx     -- REBUILT: Detailed feature sections with visuals
    ecosystem/page.tsx    -- ENHANCED: Architecture diagram, repo details
    roadmap/page.tsx      -- REBUILT: Updated timeline with current milestones
    enterprise/page.tsx   -- KEPT: Minor content enhancement
    (REMOVED: command-center, onboarding, protocol, governance, patterns, integrations, how-it-works)
  components/
    layout/
      Nav.tsx             -- REBUILT: Mobile hamburger menu, logo SVG, streamlined links
      Footer.tsx          -- REBUILT: Multi-column, social links, newsletter CTA
      PageSection.tsx     -- KEPT
    shared/
      EcosystemCard.tsx   -- KEPT
      HeroParticlesBackground.tsx -- KEPT
    landing/
      HeroSection.tsx     -- NEW: Full hero with animated headline + CTA
      FeaturesGrid.tsx    -- NEW: Detailed feature cards with icons
      HowItWorks.tsx      -- NEW: Visual 3-step flow (inline on landing)
      SocialProof.tsx     -- NEW: Stats bar + trust indicators
      ArchitectureDiagram.tsx -- NEW: SVG flow diagram
      CTASection.tsx      -- NEW: Bottom call-to-action
    ui/
      MobileMenu.tsx      -- NEW: Slide-out mobile navigation
      Button.tsx          -- NEW: Reusable button variants (primary, outline, ghost)
      Badge.tsx           -- NEW: Reusable badge/pill component
      Section.tsx         -- NEW: Enhanced section wrapper with variant backgrounds
```

**Page consolidation**: 13 pages → 5 pages. /how-it-works content moves into landing page. /command-center, /onboarding, /protocol, /governance, /patterns, /integrations are removed (app concepts, not marketing).

---

## Phase 1: Foundation — Nav, Footer, UI Components (~2h)

**Goal:** Responsive nav with mobile menu, multi-column footer, reusable UI primitives.

### Steps

1. **Create `src/components/ui/Button.tsx`** — Reusable button with variants:
   - `primary` (gradient bg from `--forge-gradient-button`), `outline` (border), `ghost`
   - Sizes: `sm`, `md`, `lg`
   - Motion hover/tap via `motion/react`
   - `asChild` pattern for Link wrapping

2. **Create `src/components/ui/Badge.tsx`** — Pill/badge component:
   - Variants: `default` (purple border/bg), `outline`, `solid`
   - Used for "Open Source", "Free", "New" labels

3. **Create `src/components/ui/Section.tsx`** — Enhanced section wrapper:
   - Variants: `default`, `muted` (elevated bg), `gradient` (hero gradient overlay)
   - Consistent max-width, padding, and spacing
   - Optional label, title, subtitle (replaces PageSection for new pages)

4. **Rebuild `src/components/layout/Nav.tsx`**:
   - Add SVG wordmark logo (inline from brand-guide, ~20KB)
   - Reduce nav links to: Features, Pricing, Ecosystem, Docs, GitHub
   - Mobile: hamburger button → slide-out `MobileMenu` with backdrop
   - Sticky with blur backdrop (keep existing)
   - "Get Started" CTA button using new Button component

5. **Create `src/components/layout/MobileMenu.tsx`**:
   - Full-screen overlay with slide-in animation (motion/react)
   - Same links as nav + "Get Started" CTA
   - Close on link click, close on Escape key
   - Trap focus for a11y

6. **Rebuild `src/components/layout/Footer.tsx`**:
   - 4-column layout: Product (Siza, Pricing, Features), Developers (GitHub, Docs, Ecosystem), Company (About, Brand Guide), Legal (MIT License)
   - Bottom row: copyright + social icons (GitHub, X/Twitter)
   - Forge Space wordmark in footer header
   - Responsive: 4-col → 2-col → 1-col

### Verification
- [ ] `NODE_ENV=production npx next build` succeeds
- [ ] `npx vitest run` passes (update Nav/Footer tests)
- [ ] Mobile nav works at 375px viewport
- [ ] Nav links navigate correctly
- [ ] Focus trap works on mobile menu

### Anti-Patterns
- Don't import `@forgespace/brand-guide` as a dependency — inline the logo SVG
- Don't use `useReducedMotion` from motion — it crashes SSG (known gotcha)
- Don't add framer-motion — project uses `motion/react` (motion.dev v12)

---

## Phase 2: Landing Page Rebuild (~3h)

**Goal:** Multi-section landing page that tells a complete story: what → how → why → proof → CTA.

### Steps

1. **Create `src/components/landing/HeroSection.tsx`**:
   - Keep HeroParticlesBackground + gradient overlay
   - Headline: "Generate code with AI. Ship it with confidence." (keep existing — it's strong)
   - Subtitle: Expand to 2-3 sentences with IDP positioning
   - Badges: "Open Source" + "Internal Developer Platform" (keep)
   - CTAs: "Try Siza Free" (primary gradient) + "View on GitHub" (outline)
   - Add subtle animated code snippet or terminal preview below CTAs (CSS-only, no heavy deps)

2. **Create `src/components/landing/FeaturesGrid.tsx`**:
   - 3-column grid of the 6 features (from current /features page)
   - Each card: icon + title + 2-3 sentence description (deeper than current one-liners)
   - Hover glow effect using `--forge-glow-primary-sm`
   - Stagger animation on scroll (intersection observer or motion whileInView)

3. **Create `src/components/landing/HowItWorks.tsx`**:
   - 3-step horizontal flow: Generate → Score → Ship
   - Each step: numbered circle + title + description + icon
   - Connected with a gradient line/arrow between steps
   - Responsive: horizontal on desktop, vertical on mobile

4. **Create `src/components/landing/SocialProof.tsx`**:
   - Stats bar: "9 Open Source Repos" · "30+ MCP Tools" · "MIT Licensed" · "$0 to Start"
   - Use brand-guide typography scale for large stat numbers (font-display, text-4xl)
   - Muted section background using `--forge-bg-elevated`

5. **Create `src/components/landing/ArchitectureDiagram.tsx`**:
   - Simple SVG or CSS-based flow diagram showing:
     forge-patterns → mcp-gateway → siza-mcp → siza
   - Purple-tinted boxes with brand borders and glow
   - Labels explaining each layer's role
   - Responsive: horizontal on lg, vertical on sm

6. **Create `src/components/landing/CTASection.tsx`**:
   - Final call-to-action section
   - "Ready to ship with confidence?"
   - Two buttons: "Start Free" + "Read the Docs"
   - Gradient background accent

7. **Rebuild `src/app/page.tsx`**:
   - Compose: Hero → Features → HowItWorks → SocialProof → Architecture → CTA
   - Each section uses the new `Section` component with alternating backgrounds
   - Remove `"use client"` from page.tsx — make it a server component, push client boundaries to individual sections

### Verification
- [ ] `NODE_ENV=production npx next build` succeeds
- [ ] Page renders all 6 sections
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No CLS (Cumulative Layout Shift) from lazy-loaded particles
- [ ] All links work (Siza, GitHub, Docs)
- [ ] Animations fire on scroll (whileInView)

### Anti-Patterns
- Don't add heavy image assets — use CSS/SVG for diagrams and illustrations
- Don't make the whole page `"use client"` — only individual animated sections need it
- `EASE_SIZA` is `[0.16, 1, 0.3, 1]` — use consistently, don't create new easings

---

## Phase 3: Features, Ecosystem, Pricing Enhancement (~2h)

**Goal:** Deepen content on the 3 remaining internal pages.

### Steps

1. **Rebuild `src/app/features/page.tsx`**:
   - Replace 6 generic cards with 3 detailed feature sections (alternating layout):
     - **AI Generation**: Left text + right code preview mockup (CSS-styled)
     - **Governance & Scorecards**: Right text + left scorecard mockup (A-F badge visual)
     - **MCP-Native Architecture**: Left text + right architecture mini-diagram
   - Each section: heading + 3-4 sentences + bullet points + visual
   - Bottom: comparison vs alternatives (Backstage too heavy, Cursor no governance, etc.)

2. **Enhance `src/app/ecosystem/page.tsx`**:
   - Add architecture diagram at top (reuse ArchitectureDiagram component)
   - Expand repo cards with: version badge, test count, key feature bullets
   - Group repos by layer: Generation Engine (siza, siza-gen, siza-mcp), Governance (core, mcp-gateway), Brand (branding-mcp, brand-guide)
   - Add npm badges/links where applicable

3. **Enhance `src/app/pricing/page.tsx`**:
   - Keep existing 3-tier pricing grid (it's solid)
   - Add FAQ section below pricing cards:
     - "What counts as a generation?"
     - "Can I self-host?"
     - "What AI models are supported?"
     - "Is my API key secure?"
     - "Can I use my own API key?"
   - FAQ uses accordion pattern (details/summary or controlled state)
   - Add trust badges: "MIT Licensed" · "SOC 2 Ready" · "BYOK Encryption"

4. **Rebuild `src/app/roadmap/page.tsx`**:
   - Update milestones to reflect ACTUAL completed + planned work:
     - **Phase 1 (Complete)**: AI generation, scorecards, golden paths, service catalog, BYOK
     - **Phase 2 (In Progress)**: User acquisition, docs, community, good-first-issues
     - **Phase 3 (Planned)**: Multi-agent workspaces, gateway unification, enterprise features
   - Visual timeline with completed/active/planned states
   - Link each milestone to relevant PR or release

5. **Remove shallow pages** — delete these app directories:
   - `src/app/command-center/` (app feature, not marketing)
   - `src/app/onboarding/` (app feature)
   - `src/app/protocol/` (thin — link to docs instead)
   - `src/app/governance/` (thin — merge key content into ecosystem)
   - `src/app/patterns/` (thin — link to GitHub)
   - `src/app/integrations/` (thin — merge into features)

### Verification
- [ ] `NODE_ENV=production npx next build` succeeds
- [ ] No broken links (internal or external)
- [ ] Removed pages return 404 (no dangling routes)
- [ ] Nav links updated to remove references to deleted pages
- [ ] FAQ accordion is keyboard accessible

### Anti-Patterns
- Don't add CMS or API calls for content — static content is fine at this stage
- Don't create comparison table as an image — use HTML table for accessibility
- Check `knip` for dead exports after removing pages

---

## Phase 4: Visual Polish & Brand Depth (~2h)

**Goal:** Leverage the full brand design system. Add visual variety and depth.

### Steps

1. **Enrich `globals.css`** with additional brand tokens:
   - Add gradient variables from brand-guide: `--forge-gradient-button`, `--forge-gradient-card`
   - Add shadow variables: `--forge-shadow-sm`, `--forge-shadow-md`, `--forge-shadow-lg`
   - Add spacing variables if missing from brand-guide
   - Register these in `@theme inline` block for Tailwind 4

2. **Add typography variety**:
   - Hero headline: `font-display text-5xl md:text-7xl font-extrabold` (use the 5xl scale)
   - Section labels: `font-mono text-xs tracking-[0.2em] uppercase text-forge-primary`
   - Stats numbers: `font-display text-4xl font-bold`
   - Feature titles: `font-display text-xl font-semibold`
   - Body: `font-sans text-base text-forge-text-muted` (already default)

3. **Add visual accents**:
   - Gradient text on key headlines: `bg-gradient-to-r from-forge-primary to-forge-primary-hover bg-clip-text text-transparent`
   - Subtle grid/dot background pattern on muted sections (CSS background-image)
   - Card hover: lift + glow + border-primary transition (already partially done)
   - Section dividers: gradient line `h-px bg-gradient-to-r from-transparent via-forge-primary/20 to-transparent`

4. **Add OG image**:
   - Create static OG image (1200x630) using brand colors + wordmark
   - Place at `public/og-image.png`
   - Reference in layout.tsx metadata

5. **Add favicon**:
   - Copy icon from brand-guide `public/logos/png/icon-256.png`
   - Place at `public/favicon.ico` and `public/icon.png`
   - Add `<link>` tags in layout or use Next.js file convention

6. **Improve motion patterns**:
   - Use `whileInView` instead of `animate` for below-fold sections (currently all animate on mount)
   - Add `viewport={{ once: true }}` to prevent re-triggering
   - Stagger children with parent `staggerChildren` variant

### Verification
- [ ] `NODE_ENV=production npx next build` succeeds
- [ ] `npx vitest run` passes
- [ ] OG image renders correctly (check with og-image debugger)
- [ ] Favicon shows in browser tab
- [ ] No CLS from font loading (fonts are preloaded via next/font)
- [ ] Lighthouse performance score > 90

### Anti-Patterns
- Don't add custom fonts beyond Sora/DM Sans/IBM Plex Mono — already defined in brand
- Don't use `bg-forge-primary/10` with hex CSS variable — use `rgba(var(--forge-primary-rgb), 0.1)` pattern (Tailwind v3 opacity modifier gotcha)
- Don't add image files > 100KB — optimize or use SVG

---

## Phase 5: Tests & Ship (~1.5h)

### Steps

1. **Update existing tests**:
   - `Nav.test.tsx` — update for new mobile menu, new link structure
   - `Footer.test.tsx` — update for multi-column layout
   - `design-tokens.test.ts` — add tests for new tokens

2. **Add new tests**:
   - `MobileMenu.test.tsx` — open/close, focus trap, escape key
   - `HeroSection.test.tsx` — renders headline, CTAs, badges
   - `SocialProof.test.tsx` — renders stats
   - `Button.test.tsx` — variants, sizes, asChild

3. **Quality gates**:
   - `npx knip` — no dead exports
   - `npx madge --circular src/` — no circular deps
   - `npx tsc --noEmit` — no type errors

4. **Full validation**:
   ```bash
   npm run lint && NODE_ENV=production npx next build && npx vitest run
   ```

5. **Update CHANGELOG.md** — add v0.3.0 entry:
   ```
   ## [0.3.0] - 2026-03-XX
   ### Added
   - Multi-section landing page (hero, features, how-it-works, social proof, architecture, CTA)
   - Responsive mobile navigation with hamburger menu
   - Multi-column footer with social links
   - Reusable UI components (Button, Badge, Section)
   - FAQ section on pricing page
   - Architecture diagram component
   - OG image and favicon

   ### Changed
   - Features page: expanded from card grid to detailed sections with visuals
   - Ecosystem page: added architecture diagram, grouped repos by layer
   - Roadmap: updated to current milestones (Phase 1-3)
   - Typography: leverage full brand type scale

   ### Removed
   - Shallow pages: /command-center, /onboarding, /protocol, /governance, /patterns, /integrations
   ```

6. **Update README.md** — reflect new page structure (5 pages instead of 13)

7. **Commit & PR**:
   ```bash
   git checkout -b feat/website-redesign
   git add -A
   git commit -m "feat: redesign forgespace.co with multi-section landing, responsive nav, and deeper content"
   GITHUB_TOKEN= gh pr create --title "feat: Website UI/UX redesign v0.3.0" --body "..."
   ```

### Verification
- [ ] CI green on all jobs (lint, typecheck, test, build, quality gates)
- [ ] PR description includes before/after summary
- [ ] No secrets committed
- [ ] Preview deploy works on Vercel

## Key Gotchas
- **Fish shell NODE_ENV**: Must use `NODE_ENV=production npx next build` locally — Fish env var breaks React 19 SSG
- **Motion v12 SSG crash**: Never use `useReducedMotion` — removed in PR #20, Motion handles it via CSS
- **pages/_error.tsx required**: Next.js 15 needs this override — don't delete it
- **Tailwind v4 CSS-first**: No `tailwind.config.*` — all theme config in `globals.css` `@theme inline` block
- **Tailwind opacity modifier + CSS variable**: `bg-forge-primary/10` with hex value generates invalid CSS. Use `rgba(var(--forge-primary-rgb), 0.1)` or define color as RGB channels
- **`"use client"` boundaries**: Push client directives to individual components, not page.tsx. Server components by default
- **knip dead code**: Run after removing pages to catch orphaned imports
- **Vercel preview deploys**: PR will auto-deploy to preview URL for visual review

## What Stays Out of Scope
- Blog / content marketing (separate effort)
- CMS integration (static content is fine for now)
- Dark/light mode toggle (dark-only is intentional brand decision)
- i18n / localization
- Analytics integration
- Search functionality
- Newsletter signup backend (just the UI form)
- Documentation site (separate project: docs.forgespace.co)
- New dependencies beyond what's already in package.json
- E2E tests (separate effort)
- Stitch screen import/adaptation (reference only — manual implementation)
