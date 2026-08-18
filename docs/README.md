# Documentation

| Where | What lives there |
| --- | --- |
| [`architecture.md`](architecture.md) | How the app is put together and why |
| [`development.md`](development.md) | Getting set up, day-to-day commands, common tasks |
| [`content.md`](content.md) | Where every piece of editable content lives |
| [`adr/`](adr/) | Architecture decision records — decisions and their trade-offs |
| [`runbooks/`](runbooks/) | Operational procedures |
| [`../openspec/`](../openspec/) | Specs: what the system does, and proposed changes |

## What goes where

Documentation in this repository is split by **what it answers**, and the split
is worth respecting — it is what keeps any of it accurate.

- **`openspec/specs/`** answers *what does the system do?* Behavioural
  requirements with concrete scenarios. Updated whenever behaviour changes, via
  a change proposal. This is the source of truth.
- **`docs/adr/`** answers *why is it like this?* One record per decision,
  written once and then left alone. Superseded rather than edited.
- **`docs/runbooks/`** answers *how do I do this task?* Step-by-step procedures
  for humans.
- **`docs/architecture.md`** and **`docs/development.md`** answer *how do I find
  my way around?* Orientation for someone new.
- **`AGENTS.md`** and **`.claude/skills/`** answer the same questions for an AI
  assistant, in the form it needs them.

If you find yourself writing the same fact in two of these, it belongs in one
and should be linked from the other. Duplicated documentation diverges.
