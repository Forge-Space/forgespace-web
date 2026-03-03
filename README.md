# Forge Space Web

Marketing site for [Forge Space](https://forgespace.co) — the open-source developer workspace ecosystem.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- Motion (motion.dev) for animations
- Lucide React icons

## Development

```bash
npm install
npm run dev
```

## Build

```bash
NODE_ENV=production npm run build
```

Note: Use `NODE_ENV=production` for builds to avoid Next.js workspace inference warnings.

## Project Structure

- `src/app/` — App Router pages and layouts
- `src/app/page.tsx` — Landing page with hero, ecosystem cards, Motion animations
- `src/app/layout.tsx` — Root layout with Nav, Footer, fonts (Sora, DM Sans, IBM Plex Mono)
- `src/components/layout/` — Nav and Footer components
