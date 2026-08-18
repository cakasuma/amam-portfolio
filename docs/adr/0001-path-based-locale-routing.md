# 1. Path-based locale routing

**Status:** Accepted

## Context

The site serves English and Indonesian. The locale has to be expressible in a
way that survives being shared, bookmarked, and crawled.

Three options were available:

1. **Path prefix** — `/en/resume`, `/id/resume`.
2. **Subdomain** — `en.example.com`, `id.example.com`.
3. **Cookie or header only**, with one set of URLs.

Option 3 makes a URL mean different things to different people: a shared link
shows the sender's language to nobody but the sender. It also gives crawlers no
way to index both versions, and no way to declare `hreflang` alternates.

Option 2 works, but needs DNS and certificate management per locale for a
two-language personal site.

## Decision

Locale is a path segment. Every page route lives under `src/app/[lng]/`, and
`src/proxy.ts` resolves the locale — cookie, then `Accept-Language`, then `en` —
and redirects unprefixed requests.

The resolved locale is written back to the `i18next` cookie so a returning
visitor keeps their choice.

## Consequences

**Good**

- URLs are unambiguous and shareable.
- Both locales are independently crawlable, with `hreflang` alternates.
- `generateStaticParams` can prerender every page in both locales.
- Locale is available to every Server Component as a route param, with no
  runtime context needed.

**Bad**

- Every internal link has to carry the locale. Forgetting it triggers a redirect
  round-trip rather than an obvious error, so the mistake is easy to miss.
- The proxy matcher must exclude API routes, Next.js internals, and static
  assets. That exclusion is a regex, and it is load-bearing: a mistake in it
  either breaks assets or silently stops redirecting pages.
- Adding a locale touches routing, not just content.
