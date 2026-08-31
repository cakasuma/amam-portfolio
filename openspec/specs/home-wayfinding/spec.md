# Home Wayfinding Specification

## Purpose

A visitor landing on the home page should always know that the page continues
and where they can go next. The home page is the entry point for people who
arrived from a CV, a search result, or a link; it has to carry them onward
rather than ending on whatever the fold happens to cut.

## Requirements

### Requirement: The scroll cue is visible without scrolling

The home page SHALL show its scroll cue within the usable viewport on first
load, so that a visitor is told the page continues before they have to guess.

#### Scenario: Landing on the home page

- **GIVEN** any viewport from 340×734 to 1920×1080
- **WHEN** the home page loads and nothing has been scrolled
- **THEN** the scroll cue is fully within the area below the header and above
  the mobile navigation

#### Scenario: Activating the cue

- **WHEN** a visitor activates the cue
- **THEN** the section below the hero is scrolled to
- **AND** it lands clear of the sticky header

#### Scenario: Cue without motion support

- **GIVEN** a visitor who has requested reduced motion, or a browser without
  scroll-driven animation
- **WHEN** the home page renders
- **THEN** the cue is still present and still activates the next section

### Requirement: The first screen is self-contained

The hero SHALL be sized to the usable viewport and SHALL carry only the
visitor's identity — portrait, name, role — and the scroll cue, so that the
fold falls on a section boundary rather than through content.

#### Scenario: Loading on any supported viewport

- **WHEN** the home page loads
- **THEN** no hero element is intersected by the bottom of the usable viewport

#### Scenario: Where the rest of the introduction lives

- **WHEN** a visitor scrolls past the hero
- **THEN** the biography, contact details and social links are the first
  content they meet

### Requirement: The page offers onward paths before it ends

The home page SHALL offer the résumé, portfolio and blog as destinations before
its closing call to action.

#### Scenario: Finishing the home page without wanting to make contact

- **WHEN** a visitor reaches the end of the home page
- **THEN** links to the résumé, portfolio and blog are present
- **AND** each is described by a line saying what it contains

### Requirement: Wayfinding copy is translated

Every string added for wayfinding SHALL exist in both `en` and `id`.

#### Scenario: Viewing the home page in Indonesian

- **WHEN** a visitor loads `/id`
- **THEN** the scroll cue and every onward path renders in Indonesian
- **AND** no raw translation key is shown
