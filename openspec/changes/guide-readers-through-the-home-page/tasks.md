# Tasks

## 1. Hero fits the small viewport

- [x] 1.1 Shrink the portrait on small screens only, keeping the `lg` size
- [x] 1.2 Tighten the gaps below the portrait, the role and the description on
      small screens only, keeping desktop spacing
- [x] 1.3 Confirm by measurement that the description completes above the
      mobile nav at 390×844

## 2. Scroll cue

- [x] 2.1 Add the cue at the end of the hero, in normal flow
- [x] 2.2 Make it a real anchor to the first content section, so it is
      operable rather than decorative
- [x] 2.3 Give the target a matching `id`, and rely on the existing
      `scroll-padding-top` so it does not land under the sticky header
- [x] 2.4 Keep it working with reduced motion and without scroll-timeline
      support — any motion on it is decoration over a working link

## 3. Onward paths

- [x] 3.1 Add a "keep exploring" section before the closing CTA, linking the
      résumé, portfolio and blog
- [x] 3.2 Give each a one-line description of what is there
- [x] 3.3 Prefetch each destination, per `web-performance`
- [x] 3.4 Opt the section into the existing scroll reveal

## 4. Copy

- [x] 4.1 Add the new keys to `en`
- [x] 4.2 Add the same keys to `id`
- [x] 4.3 Confirm the two locale files still have identical key sets

## 5. Verification

- [x] 5.1 `npm run verify` passes
- [x] 5.2 Measure the hero at 390×844, 360×740 and 1440×900
- [x] 5.3 Check `/id` renders every new string, with no raw keys
- [x] 5.4 Check the cue activates the next section and lands clear of the header
- [x] 5.5 Re-run the scroll-depth suites — reduced motion, no-JS, overflow

## Verification record

`npm run verify` passes (lint, typecheck, production build).

Hero fit, measured against the usable viewport (below the header, above the
mobile nav), before and after:

| Viewport | Usable | Description overran by (before) | After |
| --- | --- | --- | --- |
| 390×844 | 683px | 33px over | 15px clear |
| 360×740 | 579px | 163px over | 115px over |
| 1440×900 | 806px | fits | fits, unchanged |

Desktop is untouched by design: the heading and description sit at exactly the
same offsets as before (506px and 791px), because every trim is `sm`-only.

360×740 still overruns. The remaining 115px is the description itself, which is
about 55 words; closing it means cutting copy, and that is the author's call.
The scroll cue is what makes the cut deliberate rather than broken.

Checked in headless Chromium against a production build:

| Check | Result |
| --- | --- |
| Cue is a real anchor | `<a href="#about">`, target present, operable |
| Cue lands clear of the sticky header | target top 96px, matching `scroll-padding-top` |
| Onward paths | `/en/resume`, `/en/portfolio`, `/en/blog`, all prefetched |
| Indonesian | cue and section render translated, zero raw keys on `/id` |
| Reduced motion | cue present, visible and operable; only the bob is suppressed |
| Locale parity | `en` and `id` key sets identical |
| Scroll-depth suites | 17/17 and 12/12 still pass; motion still runs with JS disabled |
