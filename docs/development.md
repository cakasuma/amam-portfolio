# Development

## Prerequisites

- Node.js 20 or newer
- npm

## Setup

```bash
git clone https://github.com/cakasuma/amam-portfolio.git
cd amam-portfolio
npm install
cp .env.example .env.local   # optional — see Environment below
npm run dev
```

The site runs at <http://localhost:3000> and redirects to a locale.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with autofix |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run verify` | Lint, typecheck and build — the full gate |

`npm run verify` must pass before a change is proposed for merge. There is no
automated test suite; these gates are the whole safety net.

> Note: `next lint` was removed in Next.js 16. `npm run lint` calls `eslint`
> directly against the flat config in `eslint.config.mjs`.

## Environment

Everything is optional for local development — the app degrades rather than
failing when a variable is absent.

| Variable | Purpose | Missing means |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Base for canonical and Open Graph URLs | Falls back to the production domain |
| `RESEND_API_KEY` | Contact form email delivery | Submissions log to the console instead |
| `CONTACT_EMAIL` | Contact form recipient | Falls back to the owner's address |
| `RESEND_FROM_EMAIL` | Contact form sender | Falls back to the Resend onboarding sender |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 | Analytics script is not injected |

Never prefix a secret with `NEXT_PUBLIC_` — that publishes it to the browser.

## Layout

```
src/
├── app/
│   ├── [lng]/                # Locale-scoped routes
│   │   ├── blog/  contact/  portfolio/  privacy/  resume/  terms/
│   │   ├── globals.css       # Theme custom properties and keyframes
│   │   ├── layout.tsx        # Metadata, providers, chrome
│   │   └── page.tsx          # Home
│   ├── api/
│   │   ├── contact/          # Contact form handler
│   │   └── resume/pdf/       # On-demand résumé PDF
│   ├── components/           # Page composition (header, footer, forms)
│   ├── i18n/                 # i18next setup and locale JSON
│   └── theme/Providers.tsx   # next-themes provider
├── components/
│   ├── icons.tsx             # Central icon re-exports
│   └── ui/                   # Primitives — Button, Card, Snackbar
├── lib/                      # Framework-free logic and integrations
└── proxy.ts                  # Locale detection and redirect
```

## Common tasks

Most routine work has a skill under `.claude/skills/` that documents it
end to end — those files are readable as prose whether or not you use an AI
assistant.

| Task | Start here |
| --- | --- |
| Add a project to the portfolio | `.claude/skills/add-project/SKILL.md` |
| Add or fix translated copy | `.claude/skills/i18n-sync/SKILL.md` |
| Propose a behaviour change | `.claude/skills/openspec-propose/SKILL.md` |
| Check specs against reality | `.claude/skills/spec-audit/SKILL.md` |
| Ship to production | `docs/runbooks/production-deployment.md` |

## Conventions

The full set is in [`openspec/project.md`](../openspec/project.md). The ones
most easily missed:

- Server Components by default; `"use client"` only where interactivity demands
  it, on the smallest component that needs it.
- Copy lives in `src/app/i18n/locales/<lng>/*.json`, and both locales ship
  together.
- Colours come from CSS custom properties, never hardcoded hex values.
- A new external origin needs a Content Security Policy update in
  `next.config.ts` in the same change.
