# Security Policy

## Reporting a vulnerability

Email **amammustofa@gmail.com** with a description, reproduction steps, and the
impact as you see it. Please do not open a public issue for a security problem.

This is a personal project maintained by one person — expect a reply within a
few days rather than within hours.

## Scope

In scope: this repository and the deployed site at `mustofaamami.dev`.

Out of scope: the third-party services the site depends on (Vercel, Resend,
Dev.to, Google Analytics) — report those to their own programmes. Findings that
require physical access, social engineering, or a compromised end-user device
are also out of scope.

Please do not run automated scanners or load tests against the live site. The
contact endpoint sends real email.

## What the site does with data

- **Contact form** submissions are validated, sanitised, and forwarded by email
  via Resend. Nothing is stored server-side; there is no database.
- **Rate limiting** keeps client IPs in memory transiently, to count requests.
  This is not persisted.
- **Analytics** (Vercel, and Google Analytics when configured) collect usage
  data as described in [the privacy policy](https://mustofaamami.dev/en/privacy).

## Measures in place

- Security headers on every response, and a Content Security Policy that names
  each permitted external origin — see `next.config.ts`.
- Server-side validation and sanitisation on all contact form input.
- IP-based rate limiting on the contact endpoint (5 requests / 15 minutes).
- Secrets held only in Vercel environment variables, never in the repository.

## Known limitation

Rate-limit state is in-memory and per-instance, so it resets on cold start and
is not shared across serverless instances. This is a deliberate trade-off for a
low-traffic personal site, with the reasoning and the escalation path recorded
in [`docs/adr/0003-in-memory-rate-limiting.md`](docs/adr/0003-in-memory-rate-limiting.md).
