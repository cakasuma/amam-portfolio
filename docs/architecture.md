# Architecture

A bilingual, statically-biased Next.js site with two small server endpoints. The
guiding constraint is that almost everything a visitor sees can be rendered
ahead of time, so the interactive surface stays deliberately small.

## Request path

```
Request
  │
  ├─ /api/*, /_next/*, static assets ──────────────► handled directly
  │
  └─ everything else
        │
        ▼
   src/proxy.ts
        │  locale = i18next cookie → Accept-Language → "en"
        │
        ├─ path lacks a locale prefix ──► 307 redirect to /<lng>/…
        │
        └─ path has one ──► src/app/[lng]/… ──► response
                                                 (+ sets i18next cookie)
```

Locale is a path segment, not a runtime toggle. Every page is therefore
statically analysable per locale, and `generateStaticParams` prerenders both.

## Rendering

Pages are Server Components. Client Components exist only where the browser is
genuinely needed:

| Component | Why it is a client component |
| --- | --- |
| `ThemeSwitcher` | Reads the resolved theme after hydration |
| `LanguageSwitcher` | Interactive navigation control |
| `ContactForm` | Form state and submission |
| `Snackbar` | Transient UI state and timers |
| `GoogleAnalytics` | Route-change tracking |

Cache Components (formerly PPR) is enabled, so a static shell is served
immediately and dynamic parts stream in.

There is no client-side animation runtime. Motion is CSS — Tailwind transitions
and keyframes in `globals.css`. This is a standing requirement, not an
implementation detail; see
[`openspec/specs/web-performance/spec.md`](../openspec/specs/web-performance/spec.md).

## Theming

`next-themes` sets a class on `<html>`. `globals.css` declares one palette per
class as CSS custom properties, and components reference tokens rather than
colours:

```
html.light { --background: …; --primary: …; --glass-bg: …; }
html.dark  { --background: …; --primary: …; --glass-bg: …; }
```

Switching a theme rebinds custom properties; no component re-renders to change
colour. Adding a component means picking existing tokens, which is what keeps
the two themes from drifting.

## Internationalisation

```
src/app/i18n/
├── settings.ts   # languages, fallback, cookie name, namespaces
├── index.ts      # server-side translator
├── client.ts     # client-side translator
└── locales/{en,id}/{translation,resume,portfolio,blog,contact,footer}.json
```

Namespaces are page-scoped so a route loads only the copy it needs.

Much of the codebase writes `t("key") || "English fallback"`. That fallback is
a hazard worth knowing about: a missing Indonesian key renders English rather
than an obvious error, so the page looks fine while being wrong.

## Server endpoints

**`POST /api/contact`** — validates, rate-limits by client IP (5 requests per
15 minutes, in-memory), sanitises, and sends via Resend. Falls back to logging
when unconfigured. Specified in
[`contact-form`](../openspec/specs/contact-form/spec.md).

**`GET /api/resume/pdf`** — generates a PDF with jsPDF from the same i18n
namespaces and structural constants (`src/lib/resume-data.ts`) that the résumé
page renders from, so the two cannot drift. Specified in
[`resume-pdf`](../openspec/specs/resume-pdf/spec.md).

## External dependencies

| Service | Used by | On failure |
| --- | --- | --- |
| Dev.to API | Blog page | Static posts only, no visible error |
| Resend | Contact form | Logs server-side; see the note below |
| Vercel Analytics / Speed Insights | All pages | Silent no-op |
| Google Analytics | All pages, when configured | Not injected |

Every integration degrades rather than failing the page. One exception is
tracked: the contact form currently reports success to the visitor even when
delivery fails — see
[`openspec/changes/surface-contact-delivery-failures/`](../openspec/changes/surface-contact-delivery-failures/).

## Security posture

`next.config.ts` sets `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, HSTS in production, and a Content
Security Policy that names every permitted origin explicitly.

The CSP is the part that bites: a new script, font, image host, or fetch target
must be added to it in the same change, or it will fail in production while
working locally.

## Deliberate limitations

- **No database.** Rate-limit state is per-instance and in-memory. It resets on
  cold start and is not shared across serverless instances. Acceptable at this
  traffic level; not a pattern to extend.
- **No test suite.** Lint, typecheck and build are the whole gate.
- **No staging.** `main` is production, so verification happens before merge.
