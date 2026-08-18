# AGENTS.md

Entry point for AI coding assistants working in this repository. Read this
before changing anything.

## What this is

A bilingual (English / Indonesian) Next.js 16 portfolio site. Server-rendered,
deployed to Vercel from `main`. There is **no staging environment and no
automated test suite** — correctness is established before merge, not after.

## Read these first

| File | Why |
| --- | --- |
| [`openspec/project.md`](openspec/project.md) | Stack, conventions, and the constraints you must not break |
| [`openspec/AGENTS.md`](openspec/AGENTS.md) | The spec-driven workflow and the spec format |
| [`openspec/specs/`](openspec/specs/) | What each capability is supposed to do |
| [`docs/architecture.md`](docs/architecture.md) | How the pieces fit together |

Read the spec for a capability **before** the code that implements it. The spec
says what the behaviour should be; the code only says what it currently is. When
they disagree, that is a finding, not a detail to smooth over.

## The workflow

```
Ask → Propose → Review → Implement → Archive
```

Behaviour changes start with a proposal in `openspec/changes/<change-id>/`, not
with code. The table in [`openspec/AGENTS.md`](openspec/AGENTS.md) says exactly
when a proposal is required — bug fixes that restore specified behaviour, copy
edits and pure refactors do not need one.

## Skills

Repeatable procedures live in [`.claude/skills/`](.claude/skills/), each with
frontmatter describing when it applies. Prefer one over improvising:

| Skill | Use when |
| --- | --- |
| `openspec-propose` | Adding or changing behaviour — write the proposal first |
| `openspec-implement` | Building an approved change from its `tasks.md` |
| `openspec-archive` | A change has shipped and the specs need updating |
| `spec-audit` | Validating spec format, or checking specs against the code |
| `verify-change` | Before a PR, or when a gate fails and needs interpreting |
| `i18n-sync` | Any user-facing copy |
| `add-project` | Adding a portfolio entry or web app |
| `deploy-release` | Shipping to production |

## Verification

```bash
npm run verify   # lint → typecheck → build
```

All three must pass. These gates are the entire safety net, so:

- Never mark work complete over a failing gate.
- Never silence a lint rule to get green. Fix the cause, or disable it for that
  line with a comment explaining why.
- The gates prove the app compiles, not that it behaves. Also check the
  scenarios in the relevant spec by hand.

## Constraints that bite

These are the ones that cause production-only failures or silent wrongness:

- **Both locales ship together.** Copy lives in
  `src/app/i18n/locales/<lng>/*.json`. A key added to `en` without `id` is an
  incomplete change. Note that many call sites read `t("key") || "English text"`
  — that fallback hides a missing key by rendering English on the Indonesian
  page, so it looks fine while being wrong.
- **New external origins need a CSP update** in `next.config.ts`, in the same
  change. A script, font, image host or fetch target on a new host works locally
  and fails silently in production otherwise.
- **Secrets are never `NEXT_PUBLIC_`.** That prefix publishes the value to every
  visitor's browser.
- **Server Components by default.** Push `"use client"` down to the smallest
  component that actually needs state, effects or browser APIs.
- **No animation runtime.** Motion is CSS. This is a standing requirement, not a
  current implementation detail — see
  [`web-performance`](openspec/specs/web-performance/spec.md).
- **Colours come from CSS custom properties**, never hardcoded hex values, or
  the two themes drift.

## Scope

Do what was asked. If you find an adjacent problem, fix it only when the change
is broken without it; otherwise report it, and propose it separately if it
warrants a change. A diff that exceeds its proposal cannot be reviewed against
it.

Report outcomes honestly: what you ran, what passed, what you could not check.
