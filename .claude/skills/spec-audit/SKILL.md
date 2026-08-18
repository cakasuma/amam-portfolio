---
name: spec-audit
description: Check OpenSpec files for format violations and for drift between the specs and the code. Use when asked to validate or review specs, before archiving a change, or when someone asks whether the specs still match what the app actually does.
---

# Audit the specs

Two distinct checks. Say which one you ran.

## A. Format check

Walk every `openspec/specs/**/spec.md` and every
`openspec/changes/*/specs/**/spec.md` and flag:

**Structure**

- Missing `# <Capability> Specification` title.
- Missing `## Purpose` in a spec under `openspec/specs/` (deltas need one only
  when they introduce a new capability).
- Requirements outside a `## Requirements` heading (in specs) or outside an
  `## ADDED` / `## MODIFIED` / `## REMOVED Requirements` heading (in deltas).
- Wrong heading depth: capabilities `#`, sections `##`, requirements `###`,
  scenarios `####`.

**Requirements**

- No RFC 2119 keyword (`SHALL`, `MUST`, `SHOULD`, `MAY`) in the requirement text.
- More than one behaviour in a single requirement — the tell is a load-bearing
  "and" in the statement.
- No `#### Scenario:` beneath it. Every requirement needs at least one.

**Scenarios**

- Missing `WHEN` or `THEN`. `GIVEN` is optional; those two are not.
- Outcomes that are not observable from outside the system — "the state is
  updated", "the function is called". Rewrite as something a person or a test
  could check.
- Happy path only, where the requirement clearly has an error path.

**Deltas**

- A `## MODIFIED Requirements` block that restates only part of the requirement.
  It must carry the complete new text including all scenarios.
- A `## REMOVED Requirements` block with no reason or migration path.
- A delta naming a requirement that does not exist in the base spec — under
  `MODIFIED` or `REMOVED`, that is an error.

## B. Drift check

For a named capability, read its spec and then the code that implements it, and
report where they disagree. Both directions matter:

- **Spec says, code does not.** The requirement is aspirational, or a regression
  shipped.
- **Code does, spec is silent.** Behaviour arrived without a spec update —
  usually a change that was never archived.
- **Both, but differently.** The worst kind: status codes, limits, header names,
  and fallback behaviour drift most often, and quietly.

Read the code as the authority on what *is*, and the spec as the authority on
what *should be*. Where they conflict, do not assume which one is wrong — report
the conflict and let a human decide.

## Reporting

Group findings by file, most severe first. For each: the location, what is
wrong, and the concrete fix. Distinguish clearly between a format violation and
a real behavioural divergence — they need different people to act on them.

Do not edit specs as part of an audit unless you were asked to fix what you
find. If you were, fix format violations directly; raise behavioural drift as a
change proposal instead, since it needs a decision about which side is right.
