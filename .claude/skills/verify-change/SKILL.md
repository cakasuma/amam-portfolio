---
name: verify-change
description: Run this repository's full verification gate and interpret failures. Use before opening a PR, before marking a change complete, when CI fails, or whenever asked to check that the project still builds, lints and typechecks.
---

# Verify the change

There is no automated test suite in this repository. These three gates are the
whole safety net, so they must actually pass — not "pass except for".

```bash
npm run verify   # lint → typecheck → build, in that order
```

Run them individually when you need to iterate:

```bash
npm run lint       # eslint, flat config
npm run typecheck  # tsc --noEmit
npm run build      # next build
```

## Interpreting failures

**Lint.** The config is `eslint.config.mjs`, a flat config composing
`eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. Note
that `next lint` no longer exists in Next 16 — the script calls `eslint`
directly. Common findings here:

- `react/no-unescaped-entities` — literal `'` or `"` in JSX text. Escape it.
- `react-hooks/set-state-in-effect` — setting state synchronously in an effect.
  Usually means the state should be derived during render instead, or the effect
  should be keyed differently.
- `react-hooks/refs` — reading or writing `ref.current` during render. Move it
  into an effect or an event handler.

Never silence a rule to get green. If a rule genuinely does not apply, disable it
for that line with a comment explaining why.

**Typecheck.** `strict` is on. The frequent one is i18next's `t()` returning
`string` where an array was expected — `returnObjects: true` needs the cast the
surrounding code already uses.

**Build.** `next build` catches what the other two cannot: Server/Client
Component boundary violations, non-serialisable props crossing that boundary,
and `use client` missing on a component using hooks. A lint-and-typecheck pass
with a failing build means the component tree is wrong, not the types.

## Beyond the gates

The gates prove the app compiles. They do not prove it behaves. Also check, by
hand, whatever the change actually touched:

- Both locales, if you touched copy or routing (`/en/...` and `/id/...`).
- Both themes, if you touched styling.
- The real request/response, if you touched an API route.
- The scenarios in the relevant `openspec/specs/<capability>/spec.md`.

## Reporting

State what you ran and what happened. If a gate failed, show the output and say
so plainly — do not describe work as complete over a failing gate. If you
skipped a manual check, say which and why.
