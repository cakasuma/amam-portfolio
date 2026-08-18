# SEO and Metadata Specification

## Purpose

The site is a professional shopfront, so it has to be discoverable and to
preview correctly when shared. This capability covers page metadata, structured
data, crawler directives, and the security headers that ship alongside them.

## Requirements

### Requirement: Per-page metadata

Every route SHALL declare a title and description, composed against the site-wide
title template.

#### Scenario: Opening a subpage

- **WHEN** a crawler fetches the résumé page
- **THEN** the document title combines the page title with the site title
- **AND** a non-empty meta description is present

### Requirement: Canonical and alternate locale links

Pages SHALL declare a canonical URL and `hreflang` alternates for both supported
locales.

#### Scenario: Crawling the English home page

- **WHEN** a crawler fetches `/en`
- **THEN** the document declares alternates for `en-US` and `id-ID`

### Requirement: Absolute URLs from configuration

Metadata URLs SHALL be resolved against `NEXT_PUBLIC_SITE_URL`, falling back to
the production domain when it is unset.

#### Scenario: Deploying to a preview domain

- **GIVEN** `NEXT_PUBLIC_SITE_URL` is set to the preview domain
- **WHEN** a page renders
- **THEN** its canonical and Open Graph URLs use that domain

### Requirement: Social preview cards

Pages SHALL provide Open Graph and Twitter card metadata, including a preview
image.

#### Scenario: Sharing a link

- **WHEN** a page URL is shared to a platform that reads Open Graph tags
- **THEN** the platform can resolve a title, a description, and a preview image

### Requirement: Structured data

The site SHALL publish `schema.org` structured data describing the site owner as
a `Person`.

#### Scenario: Parsing structured data

- **WHEN** a crawler parses any page
- **THEN** it finds a valid `Person` JSON-LD block with name, job title, and
  `sameAs` profile links

### Requirement: Crawler directives

The site SHALL serve `robots.txt` and `sitemap.xml`, and SHALL permit indexing
of public pages.

#### Scenario: Fetching crawler files

- **WHEN** a crawler requests `/robots.txt` or `/sitemap.xml`
- **THEN** each is served successfully

### Requirement: Security headers

All responses SHALL carry a baseline set of security headers, and a Content
Security Policy that names every permitted external origin.

#### Scenario: Any page response

- **WHEN** a browser loads any route
- **THEN** the response carries `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`, and `Content-Security-Policy`

#### Scenario: Production response

- **GIVEN** the app is running in production
- **WHEN** a browser loads any route
- **THEN** the response additionally carries `Strict-Transport-Security`

#### Scenario: Introducing a new external origin

- **WHEN** a change adds a script, font, image, or fetch target on a new host
- **THEN** the Content Security Policy is updated in the same change to permit
  that host

### Requirement: Optional analytics

Analytics SHALL be active only when configured, and SHALL never block rendering.

#### Scenario: Google Analytics not configured

- **GIVEN** `NEXT_PUBLIC_GA_ID` is unset
- **WHEN** a page renders
- **THEN** no Google Analytics script is injected
- **AND** the page renders normally
