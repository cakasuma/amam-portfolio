---
name: openspec-implement
description: Implement an approved OpenSpec change by working its tasks.md checklist. Use when a change folder already exists under openspec/changes/ and the work needs building — "implement the X change", "work through the tasks for X", or resuming a partly-finished change.
---

# Implement an approved change

## 1. Load the change

Read, in order:

1. `openspec/changes/<change-id>/proposal.md` — what you are building and why.
2. `openspec/changes/<change-id>/specs/**/spec.md` — the deltas. These are the
   acceptance criteria. Every scenario has to hold when you are done.
3. `openspec/changes/<change-id>/design.md`, if present.
4. `openspec/changes/<change-id>/tasks.md` — your checklist.
5. `openspec/project.md` — the conventions your code must match.

If `tasks.md` has ticked boxes, the change is partly done. Trust the ticks,
verify the last one actually holds, and resume from the first unticked box.

## 2. Work the checklist in order

Tick each box in `tasks.md` as you complete it, in the same edit as the work.
The file is the live progress record — someone picking this up after you should
be able to tell exactly where things stand.

Do not tick a box you have not verified. If a task turns out to be blocked or
wrong, leave it unticked and write a short note under it saying why. A blocked
change with an honest checklist is more useful than a complete-looking one.

## 3. Stay inside the proposal

The proposal's "Not in scope" section is binding. If you find an adjacent
problem while implementing:

- Fix it only if the change is broken without it.
- Otherwise note it and raise it — a new proposal, or a note in the PR.

Do not quietly widen the change. A diff that exceeds its proposal cannot be
reviewed against it.

## 4. Respect the repository's constraints

From `openspec/project.md`, the ones most easily missed:

- Copy belongs in `src/app/i18n/locales/<lng>/*.json`, never inline in a
  component. A key added to `en` without `id` is an incomplete change.
- Server Components by default; push `"use client"` down to the smallest
  component that needs it.
- Colours come from CSS custom properties, not hardcoded hex values.
- A new external script, font, image host, or fetch target needs a matching
  Content Security Policy update in `next.config.ts` in this same change.
- Never give a secret a `NEXT_PUBLIC_` prefix.

## 5. Verify

Run the gates and report the real output:

```bash
npm run verify
```

Then walk the verification tasks in `tasks.md` and the scenarios in the delta
specs. For each scenario, confirm the `THEN` actually holds. A passing build is
not evidence that a behaviour scenario holds.

## 6. Report

Say what you built, what you verified and how, and what remains unticked and
why. If a gate failed, say so with the output — do not describe a change as
complete on a failing gate.

Archiving is a separate step: `openspec-archive`.
