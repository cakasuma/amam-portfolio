# Changes

Each folder here is one proposed change to the system's behaviour. A change
folder is created *before* the code is written and archived *after* it ships.

```
<change-id>/
├── proposal.md   # Why this change, what it changes, what it touches
├── tasks.md      # The implementation checklist
├── design.md     # Optional — only when a decision needs arguing
└── specs/
    └── <capability>/spec.md   # Delta against openspec/specs/
```

See `openspec/AGENTS.md` for the format rules and for when a proposal is
required.

## Archiving

When a change has shipped:

1. Fold each delta into the matching file under `openspec/specs/`.
2. Move the folder to `archive/YYYY-MM-DD-<change-id>/`, dated by merge day.
3. Leave the archived contents unedited — they are the record of why.
