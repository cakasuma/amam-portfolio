# 5. Spec-driven development with OpenSpec

**Status:** Accepted

## Context

Most changes to this repository are made with an AI assistant. That shifts where
the bottleneck sits: generating code is cheap, but deciding what the code should
do — and knowing later what it was supposed to do — is not.

The documentation that had accumulated showed the failure mode plainly. Seven
markdown files at the repository root mixed current behaviour, historical change
narratives, and stale to-do lists with no way to tell them apart.
`PERFORMANCE_OPTIMIZATIONS.md` documented Framer Motion optimisations for a
dependency that had since been removed. `MISSING_FAVICON_FILES.md` asked for
files that already existed. `README.md` described components that had been
deleted.

Each was accurate when written. None had a rule about when it should change, so
none did.

## Decision

Adopt spec-driven development in the [OpenSpec](https://openspec.dev) format.

- `openspec/specs/<capability>/spec.md` holds current behaviour as requirements
  with concrete `WHEN`/`THEN` scenarios. It is the source of truth.
- `openspec/changes/<change-id>/` holds proposed behaviour — a proposal, a task
  checklist, and delta specs — reviewed before code is written.
- Shipping a change means folding its deltas into `specs/` and archiving the
  folder.

Repeatable procedures are written as skills under `.claude/skills/`, each with
frontmatter describing when to use it, so an assistant can select the right one
from the task description rather than being told.

## Consequences

**Good**

- Every document now has a rule for when it changes. Specs change when behaviour
  changes; ADRs never change; runbooks change when a procedure changes. Staleness
  becomes detectable rather than invisible.
- The review surface moves earlier. Arguing with a proposal is cheaper than
  arguing with a diff.
- An assistant can be pointed at a spec instead of asked to infer intent from
  code — which is the difference between implementing the requirement and
  reproducing the current bug.
- Writing specs against existing code surfaces divergence. Doing it here
  immediately found that the contact API reports success to the visitor when
  email delivery fails.

**Bad**

- Ceremony. A one-line behaviour change now wants a proposal, which is real
  overhead for a single-author project. Mitigated by an explicit table of what
  does *not* need one — bug fixes, copy edits, refactors.
- Specs can drift from code just as documentation does. The difference is that
  drift is now checkable, not that it is prevented; `spec-audit` exists for
  exactly this, and it has to actually be run.
- The format has to be followed to be worth anything. Requirements without
  scenarios, or scenarios with unobservable outcomes, produce documents that
  look rigorous and are not.
