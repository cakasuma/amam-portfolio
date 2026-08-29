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

Tightening the hero fixes the 390-class phones. It cannot fix the 360-class
ones without cutting copy, which is the author's call, not a layout decision.
So the cut has to become deliberate: a reader who reaches the bottom of the
first screen should be told there is more, not left at a severed sentence.

The same gap exists at the other end. The page finishes on a contact CTA, so a
visitor who is interested but not ready to email has nowhere to go — the résumé,
portfolio and blog are reachable only from the nav bar they scrolled past.

## What Changes

- The hero tightens on small screens: a smaller portrait and smaller gaps
  between blocks, so the description completes above the fold on a 390×844
  phone. Desktop spacing is unchanged.
- A scroll cue closes the hero — a labelled link to the first content section.
  It sits in normal flow at the end of the hero, so it is a step in the page
  rather than an overlay, and it works for everyone rather than depending on
  motion support.
- A "keep exploring" section before the closing CTA offers the résumé,
  portfolio and blog as onward paths, each with a line saying what is there.
- Both additions carry new copy, in `en` and `id`.

## Impact

- Affected specs: `home-wayfinding` (new)
- Affected code: `src/app/[lng]/page.tsx`, and `src/app/i18n/locales/{en,id}/translation.json`
- Affected translations: 9 new keys in the `translation` namespace, in both locales
- Risk: low. Layout and copy only; no new dependency, no client component, no
  new route
- Not in scope: shortening the hero description. That would fix the 360×740
  overrun outright, but the copy is the author's voice and this change should
  not quietly rewrite it. Flagged rather than done
- Not in scope: the same treatment on the portfolio, résumé and blog pages
