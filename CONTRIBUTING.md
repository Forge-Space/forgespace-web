# Contributing to Forge Space Web

Thank you for contributing to Forge Space Web, the official marketing website for the Forge Space ecosystem. This guide covers everything you need to know to submit high-quality contributions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Requirements](#development-requirements)
- [Submitting Changes](#submitting-changes)
- [Review Process](#review-process)

---

## Code of Conduct

All contributors are expected to be respectful, constructive, and professional. Harassment or exclusionary behavior will not be tolerated.

---

## Getting Started

### 1. Fork and clone

```bash
git clone https://github.com/Forge-Space/forgespace-web.git
cd forgespace-web
npm install
```

### 2. Create a feature branch

```bash
git checkout -b feat/my-feature
# or
git checkout -b fix/issue-description
```

Branch naming conventions:
- `feat/*` - New features or pages
- `fix/*` - Bug fixes
- `chore/*` - Maintenance tasks
- `docs/*` - Documentation updates
- `refactor/*` - Code refactoring

### 3. Validate your environment

```bash
npm run lint
npm run build
npm run dev         # Start development server
```

---

## Development Requirements

### Stack

- **Next.js 15** with App Router
- **React 19**
- **Tailwind CSS 4**
- **Motion** (Framer Motion) for animations
- **Three.js / React Three Fiber** for 3D graphics
- **@forgespace/brand-guide** for brand tokens

### Code Standards

- **TypeScript only** - All new code must be TypeScript
- **React functional components** - No class components
- **Function size** - Keep functions under 50 lines
- **Cyclomatic complexity** - Maximum complexity of 10 per function
- **Line width** - Maximum 100 characters per line
- **No comments** - Write self-documenting code unless clarification is absolutely necessary

### Component Guidelines

- Use `'use client'` directive only when necessary (interactivity, hooks, browser APIs)
- Prefer server components by default for better performance
- Follow Atomic Design principles for component structure
- Use brand tokens from `@forgespace/brand-guide` for colors, typography, and spacing

### Testing

- **Minimum 80% test coverage** for new components and utilities
- Test user-facing behavior and interactions
- Focus on accessibility and responsive design

```bash
# Run all tests (when test suite is implemented)
npm test

# Type check
npm run type-check
```

### Quality Gates

Before opening a PR, ensure:

```bash
npm run lint          # ESLint passes
npm run type-check    # TypeScript compilation succeeds
npm run build         # Production build succeeds
```

---

## Submitting Changes

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add IDP features page with governance highlights
fix: resolve R3F type errors with React 19
refactor: extract Hero3D particles to shared component
chore: upgrade dependencies to latest versions
docs: update README with deployment instructions
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `perf`, `chore`, `ci`, `style`

### Checklist before opening a PR

- [ ] Code follows TypeScript and React standards (functions <50 lines, complexity <10)
- [ ] Components use brand tokens from `@forgespace/brand-guide`
- [ ] Responsive design tested across mobile, tablet, desktop
- [ ] Accessibility checked (semantic HTML, ARIA labels, keyboard navigation)
- [ ] Tests added for new functionality with ≥80% coverage (when applicable)
- [ ] Lint checks pass: `npm run lint`
- [ ] Type check passes: `npm run type-check`
- [ ] Build succeeds: `npm run build`
- [ ] CHANGELOG.md updated under `[Unreleased]` section
- [ ] README.md updated if setup or deployment changed
- [ ] Commit messages follow conventional commit format

### Opening the Pull Request

1. Push your branch: `git push origin feat/my-feature`
2. Open a PR against `main`
3. Fill in the PR template with:
   - Summary of changes
   - Screenshots or screen recordings (for UI changes)
   - Test plan
   - Breaking changes (if any)
4. Request a review from a maintainer

---

## Review Process

1. **Automated CI** runs lint, type-check, build, and security scans
2. **Maintainer review** checks visual quality, code quality, and accessibility
3. **Approval** requires CI passing + at least 1 maintainer approval
4. **Merge** is done by a maintainer using squash merge

Typical review turnaround: 2–5 business days.

---

## Questions?

Open a [GitHub Discussion](https://github.com/Forge-Space/forgespace-web/discussions) or file an [issue](https://github.com/Forge-Space/forgespace-web/issues).
