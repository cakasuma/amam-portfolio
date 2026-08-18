# 4. CSS-only motion, no animation runtime

**Status:** Accepted

## Context

The site originally used Framer Motion throughout. Every route was a Client
Component so that motion components could run, which meant nothing could be
server-rendered or streamed, and the animation library shipped to every visitor.

The visible cost was interaction latency: 300–600 ms of choreography before a
navigation appeared to do anything. On a phone on a mobile network — how this
site is most often opened — that reads as "slow", not as "polished".

## Decision

Remove the animation runtime. Express motion in CSS: Tailwind transition
utilities and keyframes in `globals.css`.

This freed the routes to become Server Components, which was the larger win.
`MotionLink`, `Navigation` and `StickyNavigation` were deleted; `SmartHeader`
and `SmartFooter` absorbed their responsibilities.

Shipped as `2d39673`; the change record is archived at
[`openspec/changes/archive/2026-04-28-server-render-and-drop-motion-runtime/`](../../openspec/changes/archive/2026-04-28-server-render-and-drop-motion-runtime/).

## Consequences

**Good**

- No animation library in the client bundle.
- Routes render on the server and stream, with Cache Components enabled.
- CSS animations run on the compositor, so they are smoother than the JS-driven
  ones they replaced.
- `prefers-reduced-motion` is a media query away, rather than a prop threaded
  through components.

**Bad**

- Genuinely complex sequencing — orchestrated multi-element chains, gesture-driven
  or physics-based motion — is now hard. If such a thing is ever needed, this
  decision has to be revisited rather than worked around.
- Enter and exit animations for conditionally-rendered elements need a manual
  state machine. `Snackbar` carries one, and it is the fiddliest component in
  the codebase as a direct result.
- The constraint has to be actively maintained: adding an animation library is
  one `npm install` away, so it is written down as a requirement in
  [`web-performance`](../../openspec/specs/web-performance/spec.md).
