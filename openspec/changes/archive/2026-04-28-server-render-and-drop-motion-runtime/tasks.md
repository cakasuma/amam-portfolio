# Tasks

## 1. Remove the animation runtime

- [x] 1.1 Delete `MotionLink`, `Navigation`, and `StickyNavigation`
- [x] 1.2 Replace motion-driven transitions with CSS in `globals.css`
- [x] 1.3 Drop `motion` from `package.json`

## 2. Move rendering to the server

- [x] 2.1 Convert route files to Server Components
- [x] 2.2 Extract interactive parts into client components
      (`ContactForm`, `ThemeSwitcher`, `LanguageSwitcher`, `Snackbar`)
- [x] 2.3 Enable Cache Components in `next.config.ts`

## 3. Trim what reaches the client

- [x] 3.1 Route icon imports through `src/components/icons.tsx`
- [x] 3.2 Configure `optimizePackageImports` for `react-icons`
- [x] 3.3 Enable prefetching on header, footer, and language-switcher links
- [x] 3.4 Delete the duplicated per-locale profile images

## 4. Verification

- [x] 4.1 Production build succeeds
- [x] 4.2 Every route reports as static or partially prerendered
- [x] 4.3 Visual output unchanged in both themes and both locales
