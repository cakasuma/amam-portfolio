# Contributing

## Setup

```bash
npm install
npm run dev
```

Full details in [`docs/development.md`](docs/development.md).

## The workflow

This project practises spec-driven development. Behaviour is specified before it
is built.

1. **Check the spec.** `openspec/specs/<capability>/spec.md` describes what the
   capability is supposed to do. If your change contradicts it, that is the
   conversation to have first.
2. **Propose, if the behaviour changes.** Create
   `openspec/changes/<change-id>/` with a proposal, delta specs, and a task
   checklist. See [`openspec/AGENTS.md`](openspec/AGENTS.md) for the format and
   for when a proposal is *not* needed.
3. **Implement**, working the checklist and ticking boxes as you go.
4. **Verify.** `npm run verify` must pass.
5. **Open a PR.** Fill in the template honestly, including what you did not
   check.
6. **Archive after merge**, folding the deltas into `openspec/specs/` and moving
   the change folder to `openspec/changes/archive/`.

### When is a proposal needed?

| Change | Proposal? |
| --- | --- |
| New capability or user-visible behaviour | Yes |
| Changing behaviour, limits, or contracts | Yes |
| Adding a dependency or third-party service | Yes |
| Bug fix restoring documented behaviour | No |
| Copy, typo, or translation edits | No |
| Refactor with no behavioural change | No |

When unsure, write it. It is cheap.

## Standards

**Verification.** There is no test suite. `npm run verify` — lint, typecheck,
build — is the whole gate, and it must pass. Do not silence a lint rule to get
green; fix the cause, or disable it for one line with a comment saying why.

**Copy.** All user-facing text lives in `src/app/i18n/locales/<lng>/*.json`, and
**both locales ship together**. Adding an English string without an Indonesian
one is an incomplete change.

**Rendering.** Server Components by default. `"use client"` goes on the smallest
component that genuinely needs state, effects, or browser APIs.

**Colour.** Use the CSS custom properties in `globals.css`. Hardcoded hex values
break one of the two themes.

**External origins.** A new script, font, image host, or fetch target requires a
Content Security Policy update in `next.config.ts` in the same change — it will
work locally and fail in production otherwise.

**Secrets.** Never prefix one with `NEXT_PUBLIC_`.

## Commits

Conventional-commit subjects: `feat:`, `fix:`, `perf:`, `docs:`, `refactor:`,
`chore:`. Branch from `main`; PRs are squash-merged.

## Working with an AI assistant

[`AGENTS.md`](AGENTS.md) is the entry point, and
[`.claude/skills/`](.claude/skills/) holds the repeatable procedures. Those
files are plain markdown and read perfectly well as human documentation too.
