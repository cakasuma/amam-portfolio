---
name: i18n-sync
description: Add, rename or audit translation keys across the English and Indonesian locale files. Use when adding user-facing copy, when a string appears untranslated or shows as a raw key, or when asked to check that both locales are in sync.
---

# Keep the locales in sync

Copy never belongs inline in a component. It lives in
`src/app/i18n/locales/<lng>/<namespace>.json`, and **both** locales ship
together — a key added to `en` without `id` is an incomplete change.

## Layout

```
src/app/i18n/locales/
├── en/{translation,resume,portfolio,blog,contact,footer}.json
└── id/{translation,resume,portfolio,blog,contact,footer}.json
```

`translation` is the default namespace for shared copy. The rest are
page-scoped. Locales and the fallback are declared in
`src/app/i18n/settings.ts`.

## Adding copy

1. Pick the namespace the page already loads — do not add a namespace to a page
   just to hold one string.
2. Add the key to `en/<namespace>.json`, placing it near related keys rather
   than appending to the end.
3. Add the **same key path** to `id/<namespace>.json` with a real Indonesian
   translation. Do not paste the English text as a placeholder: it will look
   shipped and never get revisited.
4. Read it in the component with the namespace's `t`.

Nesting mirrors the UI structure (`experience.tech-lead.bullets`). Keep key
names descriptive of role, not of the current wording, so a copy edit does not
force a key rename.

## Auditing

To find divergence, compare the flattened key sets of each namespace pair:

```bash
cd src/app/i18n/locales
for ns in translation resume portfolio blog contact footer; do
  echo "== $ns"
  diff <(python3 -c "
import json,sys
def walk(o,p=''):
    if isinstance(o,dict):
        for k,v in o.items(): yield from walk(v,f'{p}.{k}' if p else k)
    elif isinstance(o,list):
        for i,v in enumerate(o): yield from walk(v,f'{p}[{i}]')
    else: yield p
print('\n'.join(sorted(walk(json.load(open('en/$ns.json'))))))
") <(python3 -c "
import json,sys
def walk(o,p=''):
    if isinstance(o,dict):
        for k,v in o.items(): yield from walk(v,f'{p}.{k}' if p else k)
    elif isinstance(o,list):
        for i,v in enumerate(o): yield from walk(v,f'{p}[{i}]')
    else: yield p
print('\n'.join(sorted(walk(json.load(open('id/$ns.json'))))))
")
done
```

Lines marked `<` exist only in English; `>` only in Indonesian. Array-valued
keys (résumé bullet lists) must match in length too, which the `[i]` suffixes
above will reveal.

## Watch for

- **Hardcoded fallbacks.** Much of this codebase writes
  `t("key") || "English text"`. That fallback masks a missing key — the page
  looks fine in Indonesian while silently rendering English. When you touch such
  a line, confirm the key actually resolves in both locales.
- **Renaming a key** means updating every call site plus both JSON files. Grep
  for the key before renaming.
- **Interpolation placeholders** must be identical in both locales.
- **Array lengths** must match across locales, or one language renders fewer
  bullets than the other.

## Verify

```bash
npm run verify
```

Then load the affected page at `/en/...` and `/id/...` and confirm no raw key
names or unexpected English text appear.
