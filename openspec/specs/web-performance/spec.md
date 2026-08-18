# Web Performance Specification

## Purpose

The site is often opened on a phone, on a mobile network, by someone deciding
whether to keep reading. Perceived speed is therefore a product requirement, not
a nice-to-have. This capability sets the performance properties the site must
keep as it grows.

## Requirements

### Requirement: Server rendering by default

Pages SHALL be rendered on the server, with client components used only where
interactivity requires them.

#### Scenario: Adding a new page

- **WHEN** a page is added
- **THEN** it renders as a Server Component unless it needs state, effects, or
  browser APIs
- **AND** any `"use client"` boundary is placed at the smallest component that
  needs it

### Requirement: No client-side animation runtime

The client bundle SHALL NOT include a JavaScript animation library. Motion is
expressed in CSS.

#### Scenario: Introducing an animation

- **WHEN** a change adds a transition or animation
- **THEN** it is implemented with CSS transitions, keyframes, or Tailwind
  utilities
- **AND** no animation runtime is added to `dependencies`

### Requirement: Navigation prefetching

Primary navigation links SHALL prefetch their destinations so in-site
navigation resolves without a visible wait.

#### Scenario: Hovering a header link

- **WHEN** a visitor's browser reaches a header, footer, or language-switcher
  link
- **THEN** that route is prefetched
- **AND** activating it renders without a full document request

### Requirement: Optimised asset delivery

Images SHALL be served through Next.js image optimisation in modern formats, and
responses SHALL be compressed.

#### Scenario: Rendering a project image

- **WHEN** a project image is rendered
- **THEN** it is served via the image pipeline and negotiated to WebP or AVIF
  where the browser supports it

### Requirement: Bounded icon imports

Icon imports SHALL be tree-shaken so that using one icon does not ship a whole
icon set.

#### Scenario: Importing a single icon

- **WHEN** a component imports one icon
- **THEN** only that icon's code reaches the client bundle

### Requirement: Reduced-motion honoured

Animations SHALL be suppressed for visitors who have requested reduced motion.

#### Scenario: Reduced-motion visitor

- **GIVEN** the OS reports `prefers-reduced-motion: reduce`
- **WHEN** any animated element renders
- **THEN** its animation is suppressed or reduced to a non-moving state

### Requirement: Build-time verification

A change SHALL NOT be merged unless it passes lint, type checking, and a
production build.

#### Scenario: Proposing a change

- **WHEN** a change is ready for review
- **THEN** `npm run verify` completes successfully
