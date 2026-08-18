# Content Inventory

Where each piece of editable content lives, and what is currently unresolved.

This replaces the old `PLACEHOLDER_CONTENT_TO_UPDATE.md`, most of which had been
resolved without the file being updated.

## Where content lives

| Content | Location |
| --- | --- |
| Name, role, email, phone, location | `src/app/i18n/locales/<lng>/translation.json` |
| Résumé copy | `src/app/i18n/locales/<lng>/resume.json` |
| Résumé structure (entry order, skill groups) | `src/lib/resume-data.ts` |
| Portfolio entries and web apps | `src/app/[lng]/portfolio/page.tsx` |
| Site-hosted blog posts | `src/lib/devto.ts` (`STATIC_BLOG_POSTS`) |
| Page chrome and labels | `src/app/i18n/locales/<lng>/<namespace>.json` |
| SEO defaults, Open Graph, Twitter card | `src/app/[lng]/layout.tsx` |
| Structured data (`schema.org`) | `src/app/components/StructuredData.tsx` |
| Crawler files | `public/robots.txt`, `public/sitemap.xml` |
| Project images | `public/projects/` |
| Favicons and app icons | `public/favicons/`, `src/app/` |

Résumé content is shared: the résumé page and the generated PDF both read the
same translations and the same structural constants, so editing one updates
both.

## Resolved

These were open when the placeholder file was written and are now done. Listed
so nobody re-opens them:

- Real email, phone and location are in the translation files.
- Favicons and app icons are generated and wired up in `public/favicons/`.
- Portfolio entries carry real demo and repository URLs, or explicit `null`.
- Project images are real SVGs under `public/projects/`, not `/file.svg`.
- Privacy and terms pages exist.

## Open

### Social handle is inconsistent across the site

Four places disagree about the X/Twitter identity:

| Location | Value |
| --- | --- |
| `src/app/[lng]/page.tsx` | `https://x.com/cakasuma` |
| `src/app/components/StructuredData.tsx` | `https://x.com/cakasuma` |
| `src/app/[lng]/contact/page.tsx` | `https://twitter.com/mustofaamami` |
| `src/app/[lng]/layout.tsx` | `creator: "@mustofaamami"` |

`README.md` and the structured data both point at `cakasuma`, which suggests the
`mustofaamami` references are wrong — but this is the owner's call, not an
inference to act on. Structured data `sameAs` links that resolve to the wrong
profile actively harm search identity, so it is worth settling.

### Footer links to twitter.com with no profile

`src/app/components/Footer.tsx` links to `https://twitter.com` — the site root,
not a profile. Whatever handle is chosen above should replace it.

### Domain is hardcoded in several places

`https://mustofaamami.dev` appears literally in `StructuredData.tsx`,
`public/sitemap.xml` and `public/robots.txt`, while `layout.tsx` correctly reads
`NEXT_PUBLIC_SITE_URL` with that domain as its fallback. On a preview or
alternative domain, the hardcoded copies will be wrong.

### Google Site Verification

`layout.tsx` has no verification token. Add one when Search Console is set up.

## Editing rules

- Copy belongs in the locale JSON files, never inline in a component.
- Both locales ship together — an English string without an Indonesian
  counterpart is an incomplete change. See
  [`.claude/skills/i18n-sync/SKILL.md`](../.claude/skills/i18n-sync/SKILL.md)
  for the audit command.
- Many call sites read `t("key") || "English text"`. That fallback hides a
  missing key: the Indonesian page renders English and looks fine. Verify keys
  resolve rather than trusting the rendered page.
