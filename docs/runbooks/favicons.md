# Runbook: Regenerating Favicons

Only needed when the site's visual identity changes. The current icon set is
generated and wired up; this records how, so it can be redone consistently.

Supersedes the old `MISSING_FAVICON_FILES.md`, whose work is complete.

## Current assets

| File | Purpose |
| --- | --- |
| `public/favicons/favicon.ico` | Legacy browser tab icon |
| `public/favicons/favicon.svg` | Modern vector tab icon |
| `public/favicons/favicon-96x96.png` | Raster fallback |
| `public/favicons/apple-touch-icon.png` | iOS home screen (180×180) |
| `public/favicons/web-app-manifest-192x192.png` | Android / PWA |
| `public/favicons/web-app-manifest-512x512.png` | Android / PWA, splash |
| `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png` | Next.js file-based metadata |
| `src/app/opengraph-image.png`, `src/app/twitter-image.png` | Social preview cards |

Two mechanisms are in play: Next.js picks up the icons in `src/app/` by
filename convention, while `public/manifest.json` references the files in
`public/favicons/`. Both need to stay consistent.

## Regenerating

1. Produce a square master at 512×512 or larger, in SVG where possible.
2. Generate the set with [RealFaviconGenerator](https://realfavicongenerator.net/)
   or [favicon.io](https://favicon.io/).
3. Replace the files above, keeping the existing filenames — the manifest and
   Next.js conventions both depend on them.
4. Update `public/manifest.json` if any path or declared size changed.
5. Update the `themeColor` values in `src/app/[lng]/layout.tsx` if the brand
   colour changed.

## Verifying

```bash
npm run build && npm run start
```

- [ ] Tab icon appears in a fresh browser profile (icons cache aggressively —
      test in a private window)
- [ ] `/manifest.json` resolves and every icon path it names returns 200
- [ ] iOS "Add to Home Screen" shows the correct icon
- [ ] Social preview card renders the expected image
