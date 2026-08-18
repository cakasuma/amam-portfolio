---
name: openspec-propose
description: Draft an OpenSpec change proposal before writing code. Use when asked to add a feature, change existing behaviour, alter an API contract, or introduce a dependency — anything where "what should this do?" is not yet settled in openspec/specs. Produces proposal.md, tasks.md and delta specs under openspec/changes/<change-id>/.
---

# Draft an OpenSpec change proposal

Create the change folder **before** writing implementation code. The proposal is
the review surface; a reviewer should be able to accept or reject the idea
without reading a diff.

## 1. Decide whether a proposal is needed

Consult the table in `openspec/AGENTS.md`. Skip the proposal for bug fixes that
restore already-specified behaviour, copy edits, and pure refactors. When
genuinely unsure, write it — it is cheap.

## 2. Read before writing

- `openspec/project.md` — stack, conventions, and the constraints you must not
  break.
- The spec for each capability you are about to touch, under
  `openspec/specs/<capability>/spec.md`.
- The implementing code, but only after the spec. The spec says what the
  behaviour should be; the code only says what it currently is.

If a capability has no spec yet, that is a signal: your delta will need a
`## Purpose` section so the archived spec has one.

## 3. Pick a change ID

Kebab-case verb phrase describing the outcome: `add-project-filtering`,
`harden-contact-rate-limit`. Not a ticket number, not a component name. Create
`openspec/changes/<change-id>/`.

## 4. Write proposal.md

```markdown
# <Title Case Name>

## Why

The problem, in terms of what a user or operator experiences. Name the concrete
symptom. If you found it while reading code, say so. Do not lead with the
solution.

## What Changes

Bullets describing observable behaviour changes. Include what deliberately does
*not* change — a reviewer needs the boundary as much as the content.

## Impact

- Affected specs: <capability names>
- Affected code: <paths>
- Affected translations: <namespaces>, or "none"
- Risk: low / medium / high, and why
- Not in scope: <the adjacent things you are deliberately not doing>
```

## 5. Write the delta specs

For each affected capability, create
`openspec/changes/<change-id>/specs/<capability>/spec.md` containing only what
changes, under `## ADDED Requirements`, `## MODIFIED Requirements`, or
`## REMOVED Requirements`.

A `MODIFIED` block restates the requirement **in full**, including all its
scenarios — not a fragment. Reviewers must never have to reconstruct the result
by mentally applying a patch.

Follow the format rules in `openspec/AGENTS.md`: one behaviour per requirement,
an RFC 2119 keyword in the requirement text, at least one scenario per
requirement, and observable `WHEN`/`THEN` outcomes. Give error paths their own
scenarios.

## 6. Write tasks.md

Hierarchically numbered, grouped under headings, every box unticked:

```markdown
# Tasks

## 1. <Group>

- [ ] 1.1 <Concrete, checkable step>
- [ ] 1.2 <...>

## N. Verification

- [ ] N.1 <Specific manual check, with the expected result>
- [ ] N.2 `npm run verify` passes
```

Tasks are steps someone can actually do and check off, not restatements of the
requirements.

## 7. Add design.md only if it earns its place

Include one when there is a real decision with alternatives — a trade-off
between approaches, a data-shape choice, a dependency worth arguing about.
State the options considered and why the chosen one wins. Skip it otherwise;
an empty design doc is noise.

## 8. Stop

Do not start implementing. Report the change ID and summarise the proposal so a
human can review it. Implementation is `openspec-implement`.
