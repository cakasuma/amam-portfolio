# Web Performance Specification

## ADDED Requirements

### Requirement: Scroll-linked motion uses CSS timelines

Motion that tracks scroll position SHALL be driven by a CSS scroll-driven
timeline, not by a scroll event handler.

#### Scenario: Adding a parallax layer

- **WHEN** a change adds an element that moves with scroll
- **THEN** its progress comes from `animation-timeline` with `scroll()` or
  `view()`
- **AND** no scroll, wheel, resize, or `IntersectionObserver` listener is added
  to drive it

#### Scenario: Scrolling the home page

- **WHEN** a visitor scrolls the home page
- **THEN** no site JavaScript executes in response to the scroll

### Requirement: Scroll-linked motion animates compositor properties only

Scroll-linked motion SHALL animate only `transform` and `opacity`, so that
scrolling triggers no layout or paint work.

#### Scenario: A backdrop plane drifts

- **WHEN** a decorative depth plane moves as the page scrolls
- **THEN** the only properties changing are `transform` and `opacity`
- **AND** the document's scrollable width and height are unchanged by the
  motion

### Requirement: Motion degrades to a static layout without timeline support

Scroll-driven rules SHALL be guarded by an `@supports` test for
`animation-timeline`, so that a browser without scroll timelines renders the
static layout rather than playing the animation on load.

#### Scenario: Browser without scroll-timeline support

- **GIVEN** a browser that does not support `animation-timeline: view()`
- **WHEN** a page with scroll-driven motion loads
- **THEN** every element renders in its final position at full opacity
- **AND** no animation plays

### Requirement: Content is never hidden by an inactive timeline

A scroll-driven animation's hidden state SHALL be expressed only in
`@keyframes`, never in a base rule, so that an element whose timeline is
inactive renders visible.

#### Scenario: Page too short to scroll

- **GIVEN** a page whose content does not overflow the viewport
- **WHEN** it renders
- **THEN** all content is fully visible, because the inactive timeline leaves
  the animation's effect unapplied and the base style is opaque

#### Scenario: Printing a page

- **WHEN** a page carrying scroll-driven motion is printed
- **THEN** every element appears in the printed output at full opacity

### Requirement: Decorative depth layers are non-semantic

Elements that exist only to convey depth SHALL be hidden from assistive
technology and SHALL NOT receive pointer or keyboard interaction.

#### Scenario: Navigating with a screen reader

- **WHEN** a visitor reaches a page with the ambient backdrop
- **THEN** the backdrop's planes are `aria-hidden` and announce nothing
- **AND** the tab order is unchanged by their presence
- **AND** they do not intercept pointer events over the content beneath

## MODIFIED Requirements

### Requirement: Reduced-motion honoured

Animations SHALL be suppressed for visitors who have requested reduced motion.
Scroll-linked motion — parallax, depth planes, and scroll-triggered reveals —
SHALL be declared only inside `@media (prefers-reduced-motion: no-preference)`,
so that it is never applied and then undone.

#### Scenario: Reduced-motion visitor

- **GIVEN** the OS reports `prefers-reduced-motion: reduce`
- **WHEN** any animated element renders
- **THEN** its animation is suppressed or reduced to a non-moving state

#### Scenario: Reduced-motion visitor scrolls the home page

- **GIVEN** the OS reports `prefers-reduced-motion: reduce`
- **WHEN** the visitor scrolls the home page from top to bottom
- **THEN** no element moves relative to the page
- **AND** every section is fully visible at all times
