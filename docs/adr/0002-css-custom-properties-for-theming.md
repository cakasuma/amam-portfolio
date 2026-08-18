# 2. CSS custom properties for theming

**Status:** Accepted

## Context

The site needs a light and a dark presentation, switchable at runtime,
persisted across visits, and defaulting to the OS preference.

Tailwind's `dark:` variant can express this directly, but it requires every
colour decision to be written twice at every call site — `bg-white dark:bg-slate-900`
repeated across dozens of components. Two themes then drift one component at a
time, and there is no single place to see what the palette is.

## Decision

Declare each theme as a set of CSS custom properties on the `html` element, and
have components reference tokens rather than colours.

```css
html.light { --background: …; --primary: …; --glass-bg: …; }
html.dark  { --background: …; --primary: …; --glass-bg: …; }
```

`next-themes` toggles the class. Tailwind utilities map to the tokens, so
components say `bg-background`, never `bg-white dark:bg-slate-900`.

## Consequences

**Good**

- The palette exists in exactly one place, and both themes are visible side by
  side in `globals.css`.
- Switching a theme rebinds custom properties. No component re-renders to change
  colour, so the switch is instant.
- A new component gets correct dark-mode behaviour by using existing tokens —
  the default path is the correct one.
- Adding a third theme is a new class block, not a component-wide edit.

**Bad**

- Introducing a genuinely new colour means adding a token to both blocks first,
  which is more friction than reaching for a Tailwind colour inline. That
  friction is the point, but it is friction.
- Custom properties are invisible to Tailwind's compile-time tooling, so no
  static check catches a token name typo — it resolves to nothing at runtime.
- Reading the theme in JavaScript requires waiting for hydration, which is why
  `ThemeSwitcher` renders a placeholder on the first pass.
