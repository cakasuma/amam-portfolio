# Add Scroll-Driven Depth to the Site

## Why

The site currently has no sense of depth. Every surface sits on one plane, and
the only motion is a 280 ms fade that fires on page load — which the home page
opts out of entirely (`animate={false}` on every section), so the landing page
is completely static.

Sites like deriv.com use layered parallax to give a hero a foreground,
mid-ground, and background that separate as you scroll. That effect is worth
having here, but the obvious way to build it — a scroll listener that writes
`transform` on every frame — is exactly what
[`web-performance`](../../specs/web-performance/spec.md) forbids: it would put
animation work back on the main thread and undo the change that removed the
motion runtime.

CSS scroll-driven timelines (`animation-timeline: scroll()` / `view()`) give the
same effect with no JavaScript at all, running off the main thread. That makes
depth affordable within the constraints the site already has.

## What Changes

- An ambient backdrop of three depth planes — a dot grid and two soft
  gradient fields — drifts at different rates behind every page built on
  `PageLayout` (home, portfolio, résumé, blog, contact) as the visitor scrolls.
  It is decorative, `aria-hidden`, and outside the tab order.
- The home hero separates into three planes that move at different rates: a
  glow behind the portrait (furthest), the portrait (nearest), and the text
  block (between them).
- Sections and cards reveal as they scroll into view, rather than all fading at
  once on load. The home page opts into this.
- `PageLayout`'s section primitives (`Section`, `AnimatedCard`, `CTASection`,
  `HeroSection`) gain a `reveal` prop so other pages can adopt the same
  behaviour later.

All of it is CSS. No component gains `"use client"`, no dependency is added,
and only `transform` and `opacity` are animated.

The site's header and footer already hide themselves on scroll from a `scroll`
listener in `SmartHeader` and `SmartFooter`. That is pre-existing and untouched
here, so the requirement below is not that the page runs no scroll JavaScript —
it is that *this* motion needs none of its own, which is verifiable by turning
JavaScript off entirely and watching the planes still move.

Three guards bound the risk, and each is a requirement below:

1. **Reduced motion.** Every rule sits inside
   `@media (prefers-reduced-motion: no-preference)`. Motion is opted into by the
   visitor's OS setting; there is nothing to opt out of.
2. **Unsupported browsers.** Every rule also sits inside
   `@supports (animation-timeline: view())`. Without the guard, a browser
   lacking scroll timelines would treat `animation: reveal linear` as an
   ordinary time-based animation and play the whole choreography once on load.
   With it, those browsers get the static layout.
3. **Never-hidden content.** The hidden state (`opacity: 0`) appears only inside
   `@keyframes`, never in a base rule. When a timeline is inactive — printing,
   a page too short to scroll, an element in a collapsed container — the
   animation's effect is not applied and the element renders at its base style,
   which is fully visible.

## Impact

- Affected specs: `web-performance`
- Affected code: `src/app/[lng]/globals.css`, `src/app/components/PageLayout.tsx`,
  `src/app/[lng]/page.tsx`, and a new
  `src/app/components/ParallaxBackdrop.tsx` (a Server Component)
- Affected translations: none — nothing added is user-facing copy
- Bundle impact: none. Zero bytes of JavaScript; the CSS added is under 3 kB
  before compression
- Contrast: backdrop planes are drawn from `--secondary`, `--primary` and
  `--warning` at 6–12% alpha over `--background`. At 12% the light theme's
  body-text ratio moves from 19.0:1 to ~15.9:1 and the dark theme's from 17.6:1
  to ~14.1:1 — both far above the 4.5:1 that `theming` requires
- Risk: low, and confined to presentation. The failure modes that matter —
  content stranded invisible, animation on load in an unsupported browser,
  motion for a visitor who asked for none — are each closed by a guard above
- Not in scope: parallax on the portfolio, resume, blog or contact pages. They
  get the ambient backdrop through `PageLayout`; opting them into reveals is a
  later change
- Also not in scope: `privacy` and `terms`, which render a bare `<section>` and
  never mount `PageLayout`, so they get no backdrop. Giving them one means
  giving them the shared page chrome — a different width, padding and background
  on two pages this change has no other reason to touch
