# Internationalization Specification

## Purpose

The site serves an English and an Indonesian audience from the same URLs
structure, with the locale expressed in the path. Visitors should land on a
locale that matches their browser or their previous choice, and should be able
to switch at any time without losing their place.

## Requirements

### Requirement: Locale-prefixed routing

Every user-facing page URL SHALL be prefixed with a supported locale segment
(`/en` or `/id`).

#### Scenario: Request without a locale prefix

- **WHEN** a visitor requests `/resume`
- **THEN** the proxy redirects to `/<lng>/resume`, where `<lng>` is the resolved
  locale

#### Scenario: Request with a supported locale prefix

- **WHEN** a visitor requests `/id/resume`
- **THEN** the request is served without redirect

### Requirement: Locale resolution order

The system SHALL resolve the active locale from the `i18next` cookie first, then
the `Accept-Language` header, and fall back to `en`.

#### Scenario: Returning visitor with a stored preference

- **GIVEN** the visitor has an `i18next` cookie set to `id`
- **WHEN** they request `/`
- **THEN** they are redirected to `/id`

#### Scenario: New visitor with an Indonesian browser

- **GIVEN** no `i18next` cookie is present
- **AND** the request carries `Accept-Language: id-ID`
- **WHEN** they request `/`
- **THEN** they are redirected to `/id`

#### Scenario: Unrecognised language preference

- **GIVEN** no cookie is present
- **AND** the request carries `Accept-Language: fr-FR`
- **WHEN** they request `/`
- **THEN** they are redirected to `/en`

### Requirement: Locale persistence on navigation

The system SHALL persist the visitor's locale to the `i18next` cookie when they
navigate within a locale.

#### Scenario: Navigating between pages

- **WHEN** a visitor follows a link from `/id` to `/id/portfolio`
- **THEN** the response sets the `i18next` cookie to `id`

### Requirement: Translation coverage

Every user-facing string SHALL resolve in both `en` and `id` from the namespace
files in `src/app/i18n/locales/`.

#### Scenario: Key present in both locales

- **WHEN** a page renders a translated key in either locale
- **THEN** the rendered text is the locale's own copy, not a key name and not
  the fallback locale's copy

### Requirement: Non-page routes bypass locale routing

The proxy SHALL NOT redirect API routes, Next.js internals, or static assets.

#### Scenario: API request

- **WHEN** a client requests `/api/contact`
- **THEN** the request reaches the route handler without a locale redirect

#### Scenario: Static asset request

- **WHEN** a browser requests `/favicons/favicon.svg`
- **THEN** the asset is served directly without a locale redirect

### Requirement: Language switching

The system SHALL let a visitor switch locale from any page and land on the
equivalent page in the other locale.

#### Scenario: Switching from the portfolio page

- **GIVEN** a visitor is on `/en/portfolio`
- **WHEN** they select Indonesian in the language switcher
- **THEN** they arrive at `/id/portfolio`
