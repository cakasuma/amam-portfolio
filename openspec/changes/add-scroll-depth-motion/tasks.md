# Tasks

## 1. Motion primitives in CSS

- [x] 1.1 Add a scroll-driven motion block to `src/app/[lng]/globals.css`,
      wrapped in both `@media (prefers-reduced-motion: no-preference)` and
      `@supports (animation-timeline: view())`
- [x] 1.2 Define `parallax-depth` keyframes reading `--parallax-x`,
      `--parallax-y`, `--parallax-scale` and `--parallax-opacity`, each
      defaulting to an identity value
- [x] 1.3 Define `reveal-rise` keyframes whose only hidden state is in the
      `from` block — no base rule sets `opacity: 0`
- [x] 1.4 Add `.parallax-backdrop` / `.parallax-plane` (root scroll timeline)
      and `.hero-plane` (root scroll timeline, ranged to the first viewport)
- [x] 1.5 Add `.reveal-on-scroll` on a `view()` timeline, with
      `--reveal-start` / `--reveal-end` so siblings can be staggered

## 2. Ambient backdrop

- [x] 2.1 Add `src/app/components/ParallaxBackdrop.tsx` as a Server Component —
      no `"use client"`
- [x] 2.2 Build the planes from `color-mix()` over existing custom properties;
      no hardcoded hex values
- [x] 2.3 Use radial gradients rather than `filter: blur()`, so the planes cost
      nothing to paint
- [x] 2.4 Mark the backdrop `aria-hidden` and `pointer-events-none`
- [x] 2.5 Render it from `PageLayout` behind a `relative z-10` content wrapper,
      with `isolate` on the root so it cannot escape into the header's layer

## 3. Home page depth

- [x] 3.1 Split the hero into three planes: portrait glow (furthest), portrait
      (nearest), text block (between)
- [x] 3.2 Leave the hero's text opacity unanimated — depth comes from
      displacement, not from fading copy the visitor may still be reading
- [x] 3.3 Add a `reveal` prop to `Section`, `AnimatedCard`, `CTASection` and
      `HeroSection` in `PageLayout`
- [x] 3.4 Opt the home page's About / What I Do cards, testimonials and CTA
      into `reveal`, staggering the two grid cards
- [x] 3.5 Leave the hero itself out of `reveal` — it is above the fold and has
      nothing to reveal from

## 4. Verification

- [x] 4.1 `npm run verify` passes
- [x] 4.2 Manually verify: scrolling the home page moves the backdrop planes
      and hero planes at visibly different rates
- [x] 4.3 Manually verify: with `prefers-reduced-motion: reduce` forced, nothing
      moves on scroll and every section is fully visible
- [x] 4.4 Manually verify: the document has no horizontal scrollbar at 320 px,
      768 px and 1440 px widths
- [x] 4.5 Manually verify: the depth motion runs with JavaScript disabled, so no
      scroll handler of any kind drives it
- [x] 4.6 Manually verify: tab order and screen-reader output are unchanged by
      the backdrop

## Verification record

`npm run verify` passes (lint, typecheck, production build).

The manual checks in section 4 were run in headless Chromium 141 against a
production build (`next build && next start`), driven by Playwright:

| Check | Result |
| --- | --- |
| Hero planes move at different rates | translateY at 350 px scroll: 15.6 / 12.4 / 8.6 / 3.9 px |
| Backdrop planes move at different rates | −5.7 / −15.1 / −28.3 px — all a fraction of the 350 px scrolled |
| Reduced motion suppresses everything | every transform `none`, every section `opacity: 1`, at scroll 0/300/800/2000 |
| No horizontal overflow | `scrollWidth == clientWidth` at 320, 768 and 1440 px |
| No content stranded invisible | swept 0→2756 px at viewport heights 700, 900 and 1400: nothing more than 35% on screen ever sat below 0.15 opacity |
| Print | all reveal targets `opacity: 1`, backdrop `display: none` |
| Motion needs no JavaScript | with JavaScript disabled entirely, a wheel scroll still moved the hero planes (21.3 / 17.1 / 11.7 / 5.3 px), the backdrop planes (−7.8 / −20.7 / −38.8 px) and the reveals (0.56 / 0.35 opacity, stagger intact) |
| Backdrop is inert | `aria-hidden="true"`, `pointer-events: none`, zero focusable descendants |
| Other routes unaffected | `/en/portfolio`, `/en/resume`, `/en/blog`, `/en/contact`, `/id` — 200, no overflow, no invisible text |

Corrected after review: an earlier version of this record claimed no `scroll`
or `wheel` listener was registered on the page. That was a false negative — the
probe read the listener list before hydration finished. After hydration the page
registers eight, two of them the `window` `scroll` listeners in `SmartHeader`
and `SmartFooter`, which predate this change. The claim that matters is the one
in the table above, and it is stronger: the motion runs with JavaScript switched
off, so none of those handlers has anything to do with it.

Not a finding of this change, but recorded because it was seen while testing:
every route logs React error #418 (a text hydration mismatch) in a production
build. It reproduces identically on `main` with this change stashed, so it is
pre-existing. The likely cause is the `t("key") || "English text"` fallback
pattern that `AGENTS.md` already warns about, resolving differently on the
server and the client. It deserves its own change.
