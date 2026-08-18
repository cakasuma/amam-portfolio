# Theming Specification

## Purpose

The site offers a light and a dark presentation built on CSS custom properties.
Visitors get the theme their operating system already asks for, can override it,
and keep that override across visits — without a flash of the wrong theme on
load.

## Requirements

### Requirement: System preference as the default

The system SHALL adopt the visitor's OS colour-scheme preference when they have
not chosen a theme.

#### Scenario: First visit with a dark OS setting

- **GIVEN** a visitor has never chosen a theme on this site
- **AND** their OS reports `prefers-color-scheme: dark`
- **WHEN** they load any page
- **THEN** the dark palette is applied

### Requirement: Explicit theme override

The system SHALL let a visitor override the resolved theme from a control in the
site header.

#### Scenario: Toggling to light

- **GIVEN** the dark theme is active
- **WHEN** the visitor activates the theme switcher
- **THEN** the light palette is applied immediately

### Requirement: Theme persistence

An explicit theme choice SHALL persist across page loads and sessions.

#### Scenario: Returning after choosing light

- **GIVEN** a visitor previously selected the light theme
- **WHEN** they return to the site later
- **THEN** the light theme is applied, regardless of their OS preference

### Requirement: No hydration flash

The theme switcher SHALL NOT render a theme-dependent icon until the resolved
theme is known on the client.

#### Scenario: Initial paint

- **WHEN** a page is server-rendered and hydrated
- **THEN** the switcher renders a neutral placeholder of the same dimensions
  until hydration completes
- **AND** no theme-mismatched icon is painted at any point

### Requirement: Single source of colour truth

All theme colours SHALL be declared as CSS custom properties under `html.light`
and `html.dark` in `globals.css`, and components SHALL consume them by token
name.

#### Scenario: Adding a component that needs a surface colour

- **WHEN** a new component needs a background
- **THEN** it references an existing custom property rather than a hardcoded hex
  value
- **AND** it renders correctly in both themes without further changes

### Requirement: Accessible contrast

Text and interactive controls SHALL meet WCAG 2.1 AA contrast against their
background in both themes.

#### Scenario: Body copy in either theme

- **WHEN** body text is rendered in light or dark
- **THEN** its contrast ratio against the page background is at least 4.5:1

### Requirement: Reduced-motion support

The system SHALL suppress non-essential animation for visitors who request
reduced motion.

#### Scenario: Visitor with reduced motion enabled

- **GIVEN** the OS reports `prefers-reduced-motion: reduce`
- **WHEN** the visitor loads a page or toggles the theme
- **THEN** decorative transitions are suppressed
- **AND** all content remains reachable and readable
