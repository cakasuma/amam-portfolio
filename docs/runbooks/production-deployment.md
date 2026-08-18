# Runbook: Production Deployment

`main` deploys to production on Vercel. There is no staging tier, so everything
here happens **before** merge unless marked otherwise.

Supersedes the old `PRODUCTION_CHECKLIST.md`.

## Before merge

### 1. Gates

```bash
npm run verify
```

Lint, typecheck and production build. All three must pass — a failing gate is a
stop, not a note. This is the entire automated safety net; there is no test
suite.

### 2. Specs

- If this ships a change from `openspec/changes/`, confirm its `tasks.md` has no
  unticked implementation boxes.
- Confirm the behaviour matches the scenarios in the affected
  `openspec/specs/<capability>/spec.md`.

### 3. Content policy

- New copy exists in **both** `en` and `id`.
- Any new external origin — script, font, image host, fetch target — is
  permitted by the Content Security Policy in `next.config.ts`. This is the
  most common production-only failure: same-origin resources work locally and
  the CSP violation only appears once deployed.

## Environment variables

Set in the Vercel dashboard, not in the repository. `.env.example` documents the
shape; it must never carry real values.

| Variable | Required | Missing means |
| --- | --- | --- |
| `RESEND_API_KEY` | **Yes in production** | Contact submissions are logged, not delivered — silently |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical/OG URLs fall back to the production domain |
| `CONTACT_EMAIL` | No | Falls back to the owner's address |
| `RESEND_FROM_EMAIL` | No | Falls back to the Resend onboarding sender |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics is not injected |

`RESEND_API_KEY` is the one that matters. Without it the site looks completely
healthy while dropping every contact submission on the floor.

Secrets must never be prefixed `NEXT_PUBLIC_` — that publishes them to every
visitor's browser.

## After deploying

Check the deployed URL, not localhost.

**Routing and locale**

- [ ] `/` redirects to a locale
- [ ] `/en` and `/id` both render
- [ ] Language switch preserves the current page
- [ ] A direct deep link such as `/id/portfolio` renders without redirecting

**Presentation**

- [ ] Theme toggle works and survives a reload
- [ ] Both themes render correctly on mobile widths

**Functionality**

- [ ] `/api/resume/pdf?lng=en` downloads a valid PDF
- [ ] `/api/resume/pdf?lng=id` downloads the Indonesian PDF
- [ ] Contact form submits **and the email actually arrives** — a success
      message alone does not prove delivery

**Discoverability**

- [ ] `/robots.txt` and `/sitemap.xml` resolve
- [ ] A shared link renders the expected preview card
- [ ] Structured data validates in Google's Rich Results Test

**Console**

- [ ] No CSP violations in the browser console
- [ ] No hydration mismatch warnings

## Rolling back

Promote the previous deployment in the Vercel dashboard. This is faster and
safer than fixing forward under pressure. Diagnose afterwards on a branch.

## After a successful release

Archive the shipped change so `openspec/specs/` stays true — see
[`.claude/skills/openspec-archive/SKILL.md`](../../.claude/skills/openspec-archive/SKILL.md).
An unarchived shipped change is how specs start lying.

## Periodic, not per-release

- Submit the sitemap to Google Search Console after a domain change
- Lighthouse or PageSpeed Insights audit after significant UI work
- Review Vercel Speed Insights for real-user regressions
