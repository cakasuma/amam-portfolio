# Server-Render Every Route and Drop the Motion Runtime

> Archived. Shipped as commit `2d39673` ("perf: server-render every route and
> drop motion runtime", #26) on 2026-04-28. Reconstructed from the shipped diff
> and the superseded `PERFORMANCE_OPTIMIZATIONS.md`, so that the reasoning
> survives in the same shape as any other change.

## Why

Every route was a Client Component wrapped in Framer Motion choreography. That
cost twice: the animation library shipped to every visitor, and page content
could not stream because the whole tree was client-rendered.

The symptoms were long interaction delays — 300–600 ms of animation before a
navigation appeared to do anything — and a shared bundle far larger than a
content site needs.

## What Changes

- Pages become Server Components; `"use client"` is pushed down to the few
  components that genuinely need interactivity.
- The `motion` dependency is removed. Transitions move to CSS, expressed through
  Tailwind utilities and keyframes in `globals.css`.
- `MotionLink`, `Navigation`, and `StickyNavigation` are deleted; `SmartHeader`
  and `SmartFooter` absorb their responsibilities.
- Navigation links opt into prefetching.
- Icon imports are consolidated behind `src/components/icons.tsx` and
  `optimizePackageImports` so a single icon does not pull in a set.
- Cache Components (formerly PPR) is enabled so static shells render immediately
  and dynamic content streams in.
- Duplicated per-locale copies of the profile image are removed.

## Impact

- Affected specs: `web-performance`, `theming`
- Affected code: all route files, all layout components, the UI primitives
- Removed dependency: `motion`
- Risk at the time: high — this touched every route. Mitigated by the fact that
  visual output was intended to be unchanged.
