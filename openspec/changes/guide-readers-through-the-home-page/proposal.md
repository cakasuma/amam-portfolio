# Guide Readers Through the Home Page

## Why

The home page ends its first screen mid-sentence. The hero's description is
about 55 words; on a 390×844 phone it overruns the usable area by 33px, and on
a 360×740 phone by 163px. The last line is cut by the fixed bottom nav with
nothing to say that more follows, so the page reads as broken rather than as
continuing.

Measured against the usable viewport (below the header, above the mobile nav):

| Viewport | Usable height | Description overruns by |
| --- | --- | --- |
| 390×844 | 683px | 33px |
| 360×740 | 579px | 163px |
| 1440×900 | 806px | fits, but the contact chips are cut |

A first attempt tightened the hero — smaller portrait, smaller gaps — and
bought about 60px. That was nibbling at the wrong thing. Measured properly, the
hero wanted 1054–1134px against 573–771px of usable height: it overran on every
phone *and* on a 1440×900 desktop, because it was carrying the biography and
the contact details as well as the identity. No amount of spacing would close a
280–560px gap.

The established pattern is a hero of headline, subheadline, one visual and one
action, with the biography below the fold. Adopting it makes the first screen
self-contained: the fold falls on a section boundary, so nothing is sliced, and
there is room for the cue to sit on the first screen where it can do its job.

The same gap exists at the other end. The page finishes on a contact CTA, so a
visitor who is interested but not ready to email has nowhere to go — the résumé,
portfolio and blog are reachable only from the nav bar they scrolled past.

## What Changes

- The hero is sized to the usable viewport and carries only the identity —
  portrait, name, role — with the scroll cue at its foot. The fold then falls
  on a section boundary rather than through a paragraph or a half-drawn card,
  and the cue is on the first screen rather than several hundred pixels below
  it.
- The biography, contact details and social links move out of the hero into an
  `#intro` section directly below it, which is what the cue points at.
- The scroll cue is a labelled anchor in normal flow, so it is a step in the
  page rather than an overlay, and it works without motion support.
- A "keep exploring" section before the closing CTA offers the résumé,
  portfolio and blog as onward paths, each with a line saying what is there.
- Both additions carry new copy, in `en` and `id`.

## Impact

- Affected specs: `home-wayfinding` (new)
- Affected code: `src/app/[lng]/page.tsx`, and `src/app/i18n/locales/{en,id}/translation.json`
- Affected translations: 9 new keys in the `translation` namespace, in both locales
- Risk: low. Layout and copy only; no new dependency, no client component, no
  new route
- Not in scope: shortening the hero description. Moving it below the fold
  removes the pressure on it, so it no longer needs cutting
- Not in scope: the same treatment on the portfolio, résumé and blog pages
