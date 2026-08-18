---
name: deploy-release
description: Walk the pre-deployment checks before shipping to production. Use when asked to deploy, release, ship to production, or confirm the site is ready to go live.
---

# Ship to production

`main` deploys to production on Vercel. There is no staging tier, so everything
below happens before merge, not after.

## 1. Gates

```bash
npm run verify
```

All three must pass. A failing gate is a stop, not a note.

## 2. Specs and changes

- If this release implements a change under `openspec/changes/`, its `tasks.md`
  should have no unticked implementation boxes.
- Once merged, archive it with `openspec-archive` so `openspec/specs/` stays
  true. An unarchived shipped change is how specs start lying.

## 3. Environment

Confirm the production environment in the Vercel dashboard carries what the
build expects. `.env.example` lists the shape; the values live only in Vercel.

| Variable | Effect when missing |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical and Open Graph URLs fall back to the production domain |
| `RESEND_API_KEY` | Contact form logs instead of emailing — submissions are silently lost in production |
| `CONTACT_EMAIL` | Falls back to the owner's address |
| `RESEND_FROM_EMAIL` | Falls back to the Resend onboarding sender |
| `NEXT_PUBLIC_GA_ID` | Google Analytics is not injected |

`RESEND_API_KEY` is the one that matters most: without it the site looks
perfectly healthy while dropping every contact submission.

Never prefix a secret with `NEXT_PUBLIC_` — that publishes it to the browser.

## 4. Content and policy

- If the change added a script, font, image host, or fetch target on a new
  origin, confirm the Content Security Policy in `next.config.ts` permits it.
  A CSP violation fails silently in production and is invisible locally when
  the resource is same-origin.
- If the change added copy, confirm both locales carry it (`i18n-sync`).

## 5. After deploying

Walk the deployed site, not localhost:

- `/` redirects to a locale, and `/en` and `/id` both render.
- Theme toggle works and survives a reload.
- Language switch keeps you on the same page.
- `/api/resume/pdf?lng=en` and `?lng=id` both download a valid PDF.
- Contact form submits and the email actually arrives.
- `/robots.txt` and `/sitemap.xml` resolve.
- A shared link produces the expected preview card.

## 6. If something is wrong

Roll back by promoting the previous Vercel deployment — faster and safer than
fixing forward under pressure. Then diagnose on a branch.

## Reporting

State what you verified and what you could not. If you could not check
something that needs production access or a real inbox, say so explicitly rather
than implying it passed.
