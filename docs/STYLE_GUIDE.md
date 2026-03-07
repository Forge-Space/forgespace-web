# Forge Space Web — Style Guide

> **Source of truth** for design tokens, component names, and UX patterns. Aligned with Stitch project "Forge Space Web" (ID `672785806401577800`).

---

## 1. Design Tokens

All tokens live in `src/app/globals.css`. Use CSS variables — never hardcode colors, radii, or shadows. For contexts without CSS (e.g. `global-error.tsx`), use `@/styles/design-tokens`.

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--forge-bg` | `#121214` | Page background |
| `--forge-bg-elevated` | `#18181b` | Elevated surfaces |
| `--forge-surface` | `#1a1a1e` | Cards, panels |
| `--forge-surface-alt` | `#1e1e22` | Alternate surface |
| `--forge-border` | `#27272a` | Borders |
| `--forge-border-hover` | `#3f3f46` | Hover borders |
| `--forge-primary` | `#8B5CF6` | Primary actions, links |
| `--forge-primary-rgb` | `139, 92, 246` | For rgba() |
| `--forge-primary-hover` | `#A78BFA` | Hover state |
| `--forge-primary-pressed` | `#6D28D9` | Pressed state |
| `--forge-text` | `#fafafa` | Primary text |
| `--forge-text-muted` | `#a1a1aa` | Secondary text |
| `--forge-text-subtle` | `#71717a` | Tertiary text |
| `--forge-accent` | `rgba(139, 92, 246, 0.12)` | Accent bg |
| `--forge-accent-foreground` | `#8B5CF6` | Accent text |
| `--forge-ring` | `#8B5CF6` | Focus ring |

### Radii

| Token | Value |
|-------|-------|
| `--forge-radius-sm` | `8px` |
| `--forge-radius-md` | `10px` |
| `--forge-radius-lg` | `12px` |
| `--forge-radius-xl` | `16px` |

### Effects

| Token | Value |
|-------|-------|
| `--forge-glow-primary` | `0 0 30px rgba(139, 92, 246, 0.3)` |
| `--forge-glow-primary-sm` | `0 0 20px rgba(139, 92, 246, 0.25)` |
| `--forge-focus-ring` | `0 0 0 3px rgba(139, 92, 246, 0.15), 0 0 20px rgba(139, 92, 246, 0.1)` |
| `--forge-gradient-hero` | Radial gradient (primary → transparent) |

### Tailwind Mappings

```css
--color-background: var(--background);
--color-foreground: var(--foreground);
--color-forge-primary: var(--forge-primary);
--color-forge-primary-hover: var(--forge-primary-hover);
--color-forge-border: var(--forge-border);
--color-forge-text-muted: var(--forge-text-muted);
--color-forge-text-subtle: var(--forge-text-subtle);
--color-forge-surface: var(--forge-surface);
```

---

## 2. Typography

| Role | Font | Tailwind | Usage |
|------|------|----------|-------|
| Display | Sora | `font-display` | Headlines, brand |
| Body | DM Sans | `font-sans` | Body text |
| Mono | IBM Plex Mono | `font-mono` | Labels, code |

**Scale:** `text-xs` → `text-4xl` (Tailwind defaults). Hero: `text-4xl sm:text-5xl md:text-6xl`.

---

## 3. Component Names (Canonical)

Use these names in code, docs, and Stitch prompts.

| Name | Location | Description |
|------|----------|-------------|
| `Nav` | `src/components/layout/Nav.tsx` | Sticky top nav with logo, links, CTA |
| `Footer` | `src/components/layout/Footer.tsx` | Site footer with links |
| `HeroSection` | `page.tsx` | Hero with badge, headline, CTA |
| `EcosystemCard` | `page.tsx` | Card for Siza, siza-mcp, mcp-gateway |
| `PrimaryButton` | Inline | `bg-forge-primary`, white text |
| `SecondaryButton` | Inline | Border, `hover:bg-forge-surface` |
| `Badge` | Inline | Pill: `border-forge-primary/40 bg-forge-primary/10` |
| `SectionLabel` | Inline | `font-mono text-forge-primary tracking-wider uppercase` |
| `NotFoundPage` | `not-found.tsx` | 404 layout |
| `GlobalError` | `global-error.tsx` | Error boundary fallback |

---

## 4. Stitch Theme Reference

Stitch project "Forge Space Web" uses:

| Property | Value |
|----------|-------|
| `colorMode` | `DARK` |
| `font` | `SPACE_GROTESK` (Stitch default; we use Sora + DM Sans) |
| `roundness` | `ROUND_EIGHT` |
| `customColor` | `#791be4` / `#8859f8` (Stitch-generated; we use `#8B5CF6`) |

When generating Stitch screens, prefer prompts that reference these tokens and component names.

---

## 5. Layout

- **Max width:** `max-w-4xl` (896px)
- **Padding:** `px-6` (24px), `py-24` for main sections
- **Grid gap:** `gap-6` (24px) for cards

---

## 6. Motion

- **Ease:** `[0.16, 1, 0.3, 1]` (custom cubic-bezier)
- **Duration:** 0.4–0.6s for entrances
- **Hover:** `y: -2` for buttons/cards
- **Tap:** `scale: 0.98`
- **Respect:** `useReducedMotion()` — skip animations when user prefers reduced motion

---

## 7. Focus & Accessibility

- All interactive elements: `focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]`
- Use `focus-visible` (not `focus`) to avoid visible ring on mouse click

---

## 8. Anti-Patterns

- Do not hardcode hex colors; use `--forge-*` or Tailwind `text-forge-*` / `bg-forge-*`
- Do not use `focus:` without `-visible` for ring styles
- Do not skip `aria-hidden` on decorative gradients
- Do not hardcode theme colors in `global-error.tsx`; use `@/styles/design-tokens`
