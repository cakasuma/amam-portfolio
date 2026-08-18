# OpenSpec Instructions

These instructions govern how AI coding assistants work in this repository.
Read them before changing code.

## The core loop

This repo practises spec-driven development. Specs are the source of truth for
how the system behaves; code is the implementation of those specs.

```
Ask → Propose → Review → Implement → Archive
```

1. **Ask.** Read the relevant spec in `openspec/specs/<capability>/spec.md`
   before reading the code. The spec tells you what the behaviour is *supposed*
   to be; the code only tells you what it currently is.
2. **Propose.** For anything that changes behaviour, create a change folder
   under `openspec/changes/<change-id>/` before writing code.
3. **Review.** A human approves the proposal. Deltas are the review surface —
   they are much cheaper to argue about than a diff.
4. **Implement.** Work the checklist in `tasks.md`, ticking items as you go.
5. **Archive.** Fold the deltas into `openspec/specs/`, then move the change
   folder into `openspec/changes/archive/YYYY-MM-DD-<change-id>/`.

## Directory structure

```
openspec/
├── project.md                    # Stack, conventions, constraints
├── AGENTS.md                     # This file
├── specs/                        # Current truth — what IS built
│   └── <capability>/
│       └── spec.md
└── changes/                      # Proposed truth — what SHOULD change
    ├── <change-id>/
    │   ├── proposal.md           # Why / What Changes / Impact
    │   ├── tasks.md              # Implementation checklist
    │   ├── design.md             # Optional — only for non-obvious decisions
    │   └── specs/
    │       └── <capability>/
    │           └── spec.md       # Delta: ADDED / MODIFIED / REMOVED
    └── archive/
        └── YYYY-MM-DD-<change-id>/
```

## When a change proposal is required

| Situation | Proposal needed? |
| --- | --- |
| New capability or user-visible behaviour | Yes |
| Changing existing behaviour, limits, or contracts | Yes |
| Breaking an API shape or response format | Yes |
| Adding a dependency or third-party service | Yes |
| Bug fix that restores documented behaviour | No — fix and reference the spec |
| Copy, typo, or translation-only edits | No |
| Refactor with no behavioural change | No |
| Dependency version bumps with no behaviour change | No |

If you are unsure, write the proposal. It is cheap.

## Spec format

Every spec file follows the same shape:

```markdown
# <Capability> Specification

## Purpose

One paragraph: what this capability gives the user, and why it exists.

## Requirements

### Requirement: <Short imperative name>

The system SHALL <single, observable behaviour>.

#### Scenario: <Concrete case>

- **GIVEN** <starting state>
- **WHEN** <action>
- **THEN** <observable outcome>
```

Rules:

- **One behaviour per requirement.** If you need "and" to describe it, split it.
- **RFC 2119 keywords.** `SHALL`/`MUST` for hard requirements, `SHOULD` for
  recommendations, `MAY` for options. Requirement text must contain one.
- **At least one scenario per requirement**, and every scenario must be
  observable — something you could check from outside the system.
- **`GIVEN` is optional** when the starting state is obvious; `WHEN` and `THEN`
  are not.
- Error paths and edge cases get their own scenarios, not a clause tacked onto
  the happy path.

## Delta format

Files under `changes/<id>/specs/` contain only what changes, grouped under
delta headers:

```markdown
# <Capability> Specification

## ADDED Requirements

### Requirement: <name>
...

## MODIFIED Requirements

### Requirement: <existing name>
The full new text of the requirement, not a diff fragment.

## REMOVED Requirements

### Requirement: <existing name>
Reason for removal, and the migration path if any.
```

A `MODIFIED` block restates the requirement in full. Reviewers should never have
to reconstruct the result by mentally applying a patch.

If a delta adds a capability that has no spec yet, include a `## Purpose`
section so the archived spec has one.

## Naming

- Change IDs are kebab-case verb phrases: `add-project-filtering`,
  `harden-contact-rate-limit`. Not ticket numbers.
- Capability names are kebab-case nouns describing user value:
  `resume-pdf`, `blog-aggregation`. Not module names.

## Before you finish

Run the gates and report the real result:

```bash
npm run verify
```

Do not mark a task complete on a failing gate. If something is blocked, say so
in `tasks.md` and leave the box unticked.
