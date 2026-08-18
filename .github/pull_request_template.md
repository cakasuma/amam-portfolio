## What changed

<!-- The user-visible change, in a sentence or two. -->

## Why

<!-- The problem this solves. Link the change proposal if there is one:
     openspec/changes/<change-id>/ -->

## Spec impact

<!-- Tick what applies. -->

- [ ] Behaviour changed, and a change proposal exists under `openspec/changes/`
- [ ] Delta specs are written and match what was built
- [ ] No behaviour change — bug fix, refactor, copy, or docs only

## Verification

- [ ] `npm run verify` passes (lint, typecheck, build)
- [ ] Checked in both locales (`/en/…` and `/id/…`) — or not applicable
- [ ] Checked in both themes — or not applicable
- [ ] Walked the scenarios in the affected spec

<!-- Say what you could NOT check, and why. That is more useful than a
     fully-ticked list. -->

## Constraints

- [ ] New copy exists in **both** `en` and `id`
- [ ] Any new external origin is permitted by the CSP in `next.config.ts`
- [ ] No secret is prefixed `NEXT_PUBLIC_`

## Notes for the reviewer

<!-- Anything surprising, any decision you were unsure about, anything you
     deliberately left out of scope. -->
