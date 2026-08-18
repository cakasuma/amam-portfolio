# Project Context

## Purpose

`amam-portfolio` is the personal portfolio site of Mustofa Ghaleb Amami — a
bilingual (English / Indonesian) Next.js application that presents a résumé,
project portfolio, aggregated blog writing, and a working contact form.

It is a single-author, single-environment product: `main` deploys to production
on Vercel. There is no staging tier, so correctness has to be established before
merge rather than after.

## Tech Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components) |
| Language | TypeScript 5.9 (`strict`) |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 + CSS custom properties |
| i18n | i18next / react-i18next with path-based locales |
| Theming | `next-themes` (class strategy) |
| Email | Resend |
| PDF | jsPDF |
| Analytics | Vercel Analytics + Speed Insights, optional GA4 |
| Hosting | Vercel |

## Project Conventions

### Code Style

- TypeScript everywhere; no `any` without a written justification.
- Server Components by default. Add `"use client"` only when a component needs
  state, effects, or browser APIs.
- Path alias `@/*` maps to `src/*`. Prefer it over deep relative imports.
- Tailwind utility classes for layout and spacing; semantic colours come from CSS
  custom properties (`--primary`, `--background`, …) so both themes stay in sync.
- Components are named exports in `PascalCase`; helpers in `src/lib` are
  `camelCase`.

### Architecture Patterns

- Routes live under `src/app/[lng]/`, so every page is locale-scoped.
- `src/proxy.ts` resolves the locale from cookie → `Accept-Language` → fallback
  and redirects unprefixed paths.
- Shared UI primitives live in `src/components/ui`; page-composition components
  live in `src/app/components`.
- Pure logic and third-party integrations live in `src/lib` and must be
  importable without React.
- Copy is never hardcoded in components — it belongs in
  `src/app/i18n/locales/<lng>/*.json`.

### Testing Strategy

There is no automated test suite yet. The enforced gates are:

```bash
npm run lint       # eslint (flat config, next/core-web-vitals + typescript)
npm run typecheck  # tsc --noEmit
npm run build      # next build — catches RSC/serialization errors
npm run verify     # all three, in order
```

`npm run verify` must pass before any change is proposed for merge. When adding
behaviour that is genuinely testable in isolation (anything in `src/lib`),
prefer adding a test over adding a manual verification step to `tasks.md`.

### Git Workflow

- Branch from `main`; one change folder per branch where practical.
- Conventional-commit style subjects (`feat:`, `fix:`, `perf:`, `docs:`, `chore:`).
- Squash-merge into `main`. `main` is always deployable.

## Domain Context

- **Capability** — a user-visible slice of behaviour that has its own spec under
  `openspec/specs/`. Capabilities are named for what the user gets
  (`resume-pdf`), not for the module that implements it.
- **Locale** — `en` (fallback) or `id`. Every user-facing string must exist in
  both.

## Important Constraints

- **No server-side database.** Rate-limit state is per-instance and in-memory,
  which is acceptable only because traffic is low and the deployment is
  serverless.
- **Secrets are server-only.** Anything prefixed `NEXT_PUBLIC_` is public.
  `RESEND_API_KEY` must never gain that prefix.
- **CSP is strict** (see `next.config.ts`). Any new third-party script, font, or
  image host requires a matching CSP directive update in the same change.
- **Both locales ship together.** A change that adds a key to `en` without `id`
  is incomplete.

## External Dependencies

| Service | Used for | Failure mode |
| --- | --- | --- |
| Dev.to API | Blog post list | Falls back to static posts only |
| Resend | Contact form delivery | Falls back to server-side logging |
| Vercel Analytics | Traffic + Web Vitals | Silent no-op |
| Google Analytics | Optional traffic | Disabled when `NEXT_PUBLIC_GA_ID` is unset |
