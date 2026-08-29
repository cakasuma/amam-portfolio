# Home Wayfinding Specification

## Purpose

A visitor landing on the home page should always know that the page continues
and where they can go next. The home page is the entry point for people who
arrived from a CV, a search result, or a link; it has to carry them onward
rather than ending on whatever the fold happens to cut.

## ADDED Requirements

### Requirement: The first screen signals that the page continues

The home page SHALL end its hero with a visible cue that more content follows.

#### Scenario: Reaching the bottom of the hero

- **WHEN** a visitor scrolls to the end of the hero
- **THEN** a cue naming the next section is visible
- **AND** activating it moves the visitor to that section

#### Scenario: Cue without motion support

- **GIVEN** a visitor who has requested reduced motion, or a browser without
  scroll-driven animation
- **WHEN** the home page renders
- **THEN** the cue is still present and still activates the next section

### Requirement: The hero fits the small viewport where it can

The hero SHALL be laid out so that its description completes within the usable
viewport on a 390×844 screen — below the header and above the mobile
navigation.

#### Scenario: Loading on a 390×844 phone

- **WHEN** the home page loads at 390×844
- **THEN** the hero description's last line sits above the mobile navigation
- **AND** no line of the description is obscured by it

#### Scenario: Loading on a screen too small for the hero

- **GIVEN** a viewport too short to hold the hero
- **WHEN** the home page loads
- **THEN** the content is cut only below the scroll cue's line of sight, and
  the cue remains reachable by scrolling

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
