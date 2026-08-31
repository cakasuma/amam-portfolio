# Tasks

## 1. The first screen is self-contained

- [x] 1.1 Size the hero to the usable viewport, allowing for the real chrome
      (72px header + 89px mobile nav + 64px page padding; 94px + 128px on `lg`)
- [x] 1.2 Keep only the identity in it — portrait, name, role — centred
- [x] 1.3 Move the biography, contact details and social links to an `#intro`
      section directly below
- [x] 1.4 Drop `hero-plane` from the moved blocks: that timeline is ranged to
      the first viewport, so below the fold it would hold a dead offset
- [x] 1.5 Confirm by measurement that nothing is intersected by the fold
- [x] 1.6 Restore the portrait size: it was shrunk to make room for a bio that
      now lives in `#intro`, leaving the hero sparse and the cue adrift

## 2. Scroll cue

- [x] 2.1 Pin the cue to the foot of the hero, in normal flow, so it is on the
      first screen without scrolling
- [x] 2.2 Make it a real anchor to `#intro`, so it is operable rather than
      decorative
- [x] 2.3 Give the target a matching `id`, and rely on the existing
      `scroll-padding-top` so it does not land under the sticky header
- [x] 2.4 Keep it working with reduced motion and without scroll-timeline
      support — any motion on it is decoration over a working link
- [x] 2.5 Size it for the foot of an otherwise empty screen: 16px label, 24px
      arrow, a tap target well past the 44px minimum

## 3. Onward paths

- [x] 3.1 Add a "keep exploring" section before the closing CTA, linking the
      résumé, portfolio and blog
- [x] 3.2 Give each a one-line description of what is there
- [x] 3.3 Prefetch each destination, per `web-performance`
- [x] 3.4 Opt the section into the existing scroll reveal
- [x] 3.5 Give `#intro` depth of its own — it is the payoff for scrolling. A
      `view()`-driven drift on the wrapper, staggered rises on its three
      children. `.hero-plane` cannot serve it: that timeline is ranged to the
      first viewport, so past it there is only a dead offset

## 4. Copy

- [x] 4.1 Add the new keys to `en`
- [x] 4.2 Add the same keys to `id`
- [x] 4.3 Confirm the two locale files still have identical key sets

## 5. Verification

- [x] 5.1 `npm run verify` passes
- [x] 5.2 Measure the fold at 340×734 through 1920×1080
- [x] 5.3 Check `/id` renders every new string, with no raw keys
- [x] 5.4 Check the cue activates the next section and lands clear of the header
- [x] 5.5 Re-run the scroll-depth suites — reduced motion, no-JS, overflow

## Verification record

`npm run verify` passes (lint, typecheck, production build).

The scroll cue is fully within the usable viewport on first load at every
viewport measured — this is the requirement that drove the restructure:

| Viewport | Cue | Fold | `#intro` starts |
| --- | --- | --- | --- |
| 340×734 | 550–630 | 645 | 678 |
| 360×740 | 556–636 | 651 | 684 |
| 390×844 | 660–740 | 755 | 788 |
| 430×932 | 748–828 | 843 | 876 |
| 768×1024 | 910–990 | 1024 | 1054 |
| 1440×900 | 778–850 | 900 | 930 |
| 1920×1080 | 958–1030 | 1080 | 1110 |

Re-measured after restoring the portrait and enlarging the cue; still 7/7. The
larger portrait also closed the dead space the restructure had opened up —
role-to-cue is 32px on a 333px-wide screen, not the ~300px it was.

7/7. The first attempt — tightening spacing — reached 3/7, and only on the
larger screens; the hero wanted 1054–1134px against 573–771px of usable height.

Other checks, headless Chromium against a production build:

| Check | Result |
| --- | --- |
| Cue is a real anchor | `<a href="#intro">`, target present, operable |
| Cue target lands clear of the sticky header | yes, via `scroll-padding-top` |
| Onward paths | `/en/resume`, `/en/portfolio`, `/en/blog`, all prefetched |
| Indonesian | cue and section render translated, zero raw keys on `/id` |
| Reduced motion | cue present, visible and operable; only the bob suppressed |
| Locale parity | `en` and `id` key sets identical |
| Scroll-depth suites | 17/17 and 12/12; motion still runs with JS disabled |
| `#intro` drift | 5.0 → 26.0px across its traverse of the viewport, continuous |
| `#intro` stagger | opacities [1, 0, 0] → [1, 1, 0.21] → [1, 1, 1] as it rises |
| Mobile cue | 186×80px tap target, 16px label, 24px arrow, within the fold |

The Indonesian cue was "Gulir untuk lanjut membaca". Corrected to "Scroll untuk
lanjut membaca": *gulir* is the formal calque, but *scroll* is the loanword
actually in use.

Three hero planes now rather than four — the contact chips took their plane
with them to `#intro`, where it would have held a dead offset.
