---
name: openspec-archive
description: Fold a shipped change's deltas into openspec/specs and move it to changes/archive. Use after a change has merged or shipped — "archive the X change", "the X change is done", "update the specs now that X shipped".
---

# Archive a shipped change

Archiving is what keeps `openspec/specs/` true. A change that ships without
being archived leaves the specs describing a system that no longer exists.

## 1. Confirm it actually shipped

Check that the work is merged, and that `tasks.md` has no unticked
implementation boxes. If boxes remain unticked, stop and report — either the
change is not done, or the checklist is lying. Both need a human.

## 2. Apply each delta to the real spec

For every `openspec/changes/<change-id>/specs/<capability>/spec.md`:

| Delta header | Action on `openspec/specs/<capability>/spec.md` |
| --- | --- |
| `## ADDED Requirements` | Insert each requirement under `## Requirements` |
| `## MODIFIED Requirements` | Replace the existing requirement, in full, with the delta's version |
| `## REMOVED Requirements` | Delete the named requirement |

If the capability has no spec file yet, create it: `# <Capability>
Specification`, then the `## Purpose` from the delta, then `## Requirements`.

The result must read as a coherent spec of current behaviour, not as a changelog
with edits pasted in. In particular:

- Delete any note in the spec that pointed at this change as tracking a gap the
  change has now closed.
- Keep requirements grouped sensibly; place new ones near related ones rather
  than always appending.
- Check the `## Purpose` paragraph still describes the capability accurately.

## 3. Move the folder

```bash
git mv openspec/changes/<change-id> \
       openspec/changes/archive/<YYYY-MM-DD>-<change-id>
```

Date it by the day the change merged, not today, unless they are the same.

Leave the archived contents unedited — including the unticked boxes you were
told to stop on, if a human decided to archive anyway. The archive is the record
of what happened, not a tidied version of it.

## 4. Verify

```bash
npm run verify
```

Then re-read the updated spec files end to end. Ask of each: if someone knew
nothing about this system, would this document tell them how it behaves? Fix
anything that only makes sense to someone who read the delta.

## 5. Report

List which specs changed and which requirements were added, modified, or
removed.
