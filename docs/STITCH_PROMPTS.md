# Stitch Design Prompts for Forge Space Web

Copy-paste prompts for [Stitch](https://stitch.google/) `generate_screen_from_text` to create marketing screens that align with our design system.

**Stitch project ID:** `672785806401577800` (Forge Space Web)

---

## Definitions & Branding (from brand-guide + forge-space-design-system)

**Source of truth:** `@forgespace/brand-guide` (identity.json), `@forgespace/forge-space-design-system` (css/tokens.css)

| Term | Definition |
|------|------------|
| **Forge Space** | The developer tools ecosystem. Open-source AI-powered development — from idea to production. |
| **Tagline** | "The developer tools ecosystem." |
| **Hero headline** | "Build better, ship faster." |
| **Modern Horn** | Brand direction: Modern Horn icon + monochrome purple palette + Sora / DM Sans typography. Dark theme only. |
| **Forge Purple** | Primary brand color (#8B5CF6). |
| **Forge Purple Light** | Secondary brand color (#A78BFA). |
| **Forge Purple Dark** | Accent and highlight color (#6D28D9). |
| **Sora** | Display/heading font. |
| **DM Sans** | Body font. |
| **IBM Plex Mono** | Mono font for labels, code, technical text. |

**Canonical tokens (forge-space-design-system):**

- `--forge-primary` #8B5CF6, `--forge-primary-hover` #A78BFA, `--forge-primary-pressed` #6D28D9
- `--forge-bg` #121214, `--forge-surface` #1a1a1e, `--forge-border` #27272a
- `--forge-text` #fafafa, `--forge-text-muted` #a1a1aa
- `--forge-font-display` Sora, `--forge-font-body` DM Sans, `--forge-font-mono` IBM Plex Mono
- `--forge-radius-sm` 8px, `--forge-radius-md` 10px, `--forge-radius-lg` 12px, `--forge-radius-xl` 16px

---

## Design System Preamble

Prepend this block to any prompt when Stitch supports long input, or keep it as reference:

```
## Forge Space Design System (apply to all screens)

**Brand:** Modern Horn — Monochrome (from brand-guide identity.brandDirection). Dark theme only.

**Definitions:** Forge Space = the developer tools ecosystem. Tagline: "The developer tools ecosystem." Hero: "Build better, ship faster."

**Colors (forge-space-design-system tokens):** Primary #8B5CF6 (Forge Purple), secondary #A78BFA (Forge Purple Light), accent #6D28D9 (Forge Purple Dark). Background #121214, surface #1a1a1e, border #27272a. Text #fafafa, muted #a1a1aa.

**Typography (brand-guide):** Display font Sora for headlines, body DM Sans, mono IBM Plex Mono for labels/code.

**Radii:** 8px (sm), 10px (md), 12px (lg), 16px (xl).

**Components:** NavBar (sticky, logo FORGE SPACE, Docs/Pricing/Sign in/Get started), Footer (tagline "The developer tools ecosystem.", GitHub/Siza/Docs links), PrimaryButton (purple bg, white text), SecondaryButton (border, hover surface), Badge (pill, primary/10 bg), EcosystemCard (card with icon, title, description, hover glow).

**Layout:** Max width 896px, padding 24px, grid gap 24px. Subtle radial gradient from primary at top. No generic AI aesthetics; use distinctive purple-on-dark palette.
```

---

## Screen Prompts

### 1. Workspace / What is Forge Space

**Purpose:** Explain the "developer workspace" concept.

```
Create a Forge Space marketing page titled "The Developer Workspace."

Design system: Dark theme. Primary #8B5CF6, secondary #A78BFA, background #121214, surface #1a1a1e. Sora for headlines, DM Sans for body. Radii 8–16px.

Content structure:
- Hero: "One workspace. Full-stack AI. Zero lock-in." Subtext: "Forge Space is the open-source ecosystem for AI-powered development — from idea to production."
- Two-column comparison: "What we are" vs "What we're NOT" — Open-source vs locked-in SaaS, Full-stack vs frontend-only, MCP-native vs monolithic AI, Privacy-first BYOK vs data-harvesting.
- CTA: "Try Siza" (primary button), "View on GitHub" (secondary).

Include NavBar (FORGE SPACE logo, Docs, Pricing, Sign in, Get started) and Footer. Use EcosystemCard-style cards for the comparison. Subtle radial gradient at top. Max width 896px.
```

---

### 2. Ecosystem Deep Dive

**Purpose:** Show all six repos and how they connect.

```
Create a Forge Space "Ecosystem" page.

Design system: Dark theme. Primary #8B5CF6, background #121214, surface #1a1a1e. Sora headlines, DM Sans body. Radii 8–16px.

Content:
- Section label: "THE FORGE SPACE ECOSYSTEM" (mono, uppercase, primary)
- Headline: "Six open-source repos. One vision."
- Subtext: "Designed to work together."
- Six EcosystemCards in a 2x3 or 3x2 grid:
  1. Siza — AI workspace (generate, integrate, ship)
  2. siza-mcp — 21 MCP tools for UI and backend generation
  3. siza-gen — AI generation engine
  4. mcp-gateway — AI-powered tool routing hub
  5. forge-patterns — Shared standards and MCP context server
  6. branding-mcp — Brand identity generation

Each card: icon area, repo name, one-line description. Hover: border glows primary, subtle shadow. NavBar and Footer. Radial gradient at top.
```

---

### 3. How It Works / Architecture

**Purpose:** Visual architecture diagram + flow.

```
Create a Forge Space "How It Works" page.

Design system: Dark theme. Primary #8B5CF6, background #121214. Sora/DM Sans. Radii 8–16px.

Content:
- Headline: "From prompt to production"
- Subtext: "MCP-native. Composable. Self-hostable."
- Architecture diagram (simplified): forge-patterns (foundation) → mcp-gateway (routing) → siza-mcp (UI tools) + branding-mcp → siza (workspace). Use connecting lines or flow arrows. Each node as a small card with repo name.
- Three feature pills: "BYOK — Bring your own key", "MCP-Native — 21+ tools", "Self-Hostable — MIT licensed"
- CTA: Try Siza, Read the Docs

NavBar, Footer. Max width 896px. Use primary glow on diagram nodes.
```

---

### 4. Features Grid

**Purpose:** Feature highlights in a scannable layout.

```
Create a Forge Space "Features" page.

Design system: Dark theme. Primary #8B5CF6, surface #1a1a1e. Sora/DM Sans. Radii 8–16px.

Content:
- Headline: "Built for developers who ship"
- Six feature cards in 2x3 grid:
  1. AI-Powered Generation — Natural language or screenshot to production UI
  2. MCP-Native — 21 UI tools, 9 branding tools, composable via Model Context Protocol
  3. Privacy-First BYOK — Bring your own key, client-side AES-256 encryption
  4. Generous Free Tier — Cloudflare + Supabase + Gemini at $0/month
  5. Self-Hostable — Run locally with Docker, MIT licensed
  6. Multi-LLM — Swap Gemini, Claude, GPT without code changes

Each card: icon, title, 1–2 line description. Hover glow. NavBar, Footer. Radial gradient.
```

---

### 5. Pricing

**Purpose:** Pricing tiers (from Siza README).

```
Create a Forge Space "Pricing" page.

Design system: Dark theme. Primary #8B5CF6, surface #1a1a1e. Sora/DM Sans. Radii 8–16px.

Content:
- Headline: "Simple, transparent pricing"
- Three pricing cards: Free ($0, 50 generations/month), Pro ($19/mo, 500/month), Team ($49/mo, 5 seats, 2500/month). Include "Unlimited" for Team storage.
- Each card: plan name, price, key limit, CTA button. Highlight Pro or use primary accent.
- Footer note: "All plans include self-hosting. Enterprise: custom."

NavBar, Footer. Card hover states. Max width 896px.
```

---

### 6. Docs / Resources

**Purpose:** Documentation hub entry.

```
Create a Forge Space "Docs" or "Resources" page.

Design system: Dark theme. Primary #8B5CF6, surface #1a1a1e. Sora/DM Sans. Radii 8–16px.

Content:
- Headline: "Documentation"
- Subtext: "Quick start, self-hosting, MCP integration, API reference."
- Four link cards: Quick Start, Self-Hosting, MCP Integration, API Reference. Each with short description.
- Secondary: "GitHub Discussions", "Contributing Guide"
- CTA: Start Generating Free

NavBar, Footer. EcosystemCard style for doc links.
```

---

## Usage Instructions

1. **MCP tool:** `generate_screen_from_text` with `projectId: "672785806401577800"` and `prompt` set to one of the prompts above.

2. **Device:** Use `deviceType: "DESKTOP"` for marketing pages.

3. **Generation time:** 2–5 minutes. Do not retry on timeout.

4. **Fetch result:** Use `get_screen` with the screen ID from the response to retrieve the generated design.

5. **Long prompts:** If Stitch supports long input, prepend the Design System Preamble to each prompt for stronger token alignment.

---

## Screen Summary

| Screen       | Purpose                               |
| ------------ | ------------------------------------- |
| Workspace    | What is Forge Space, comparison table |
| Ecosystem    | Six repos, how they connect           |
| How It Works | Architecture diagram, flow            |
| Features     | Six feature cards                     |
| Pricing      | Free / Pro / Team tiers               |
| Docs         | Documentation hub                     |

All prompts embed: dark theme, #8B5CF6 primary, Sora/DM Sans, NavBar/Footer/EcosystemCard component names, max-width 896px, radial gradient.
