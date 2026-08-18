# Blog Aggregation Specification

## Purpose

Writing lives in two places: articles published on Dev.to, and posts hosted on
this site. The blog page presents them as one list so readers do not have to
know or care where a given piece is hosted.

## Requirements

### Requirement: Combined post listing

The blog page SHALL present site-hosted posts and Dev.to articles in a single
list.

#### Scenario: Both sources available

- **WHEN** a visitor opens the blog page
- **AND** the Dev.to API responds successfully
- **THEN** the list contains both the site-hosted posts and the fetched Dev.to
  articles

### Requirement: Degrade to local content on upstream failure

The blog page SHALL remain usable when the Dev.to API is unreachable or returns
an error.

#### Scenario: Dev.to unavailable

- **GIVEN** the Dev.to API returns an error or times out
- **WHEN** a visitor opens the blog page
- **THEN** the page renders successfully with the site-hosted posts only
- **AND** no error is surfaced to the visitor

### Requirement: Upstream response caching

Dev.to responses SHALL be revalidated at most once per hour rather than fetched
per request.

#### Scenario: Two requests in quick succession

- **WHEN** two visitors load the blog page within the same revalidation window
- **THEN** at most one request is made to the Dev.to API

### Requirement: Source attribution and outbound links

Each aggregated post SHALL link to where it is actually hosted, and Dev.to as a
source SHALL be credited on the page.

#### Scenario: Opening a Dev.to article

- **WHEN** a visitor activates a Dev.to-sourced post
- **THEN** they are taken to that article's Dev.to URL

#### Scenario: Opening a site-hosted post

- **WHEN** a visitor activates a site-hosted post
- **THEN** they are taken to that post's path on this site

### Requirement: Remote image hosts are allowlisted

Cover images from aggregated posts SHALL load only from hosts permitted by both
the image configuration and the Content Security Policy.

#### Scenario: Article with a Dev.to cover image

- **WHEN** an aggregated article carries a cover image on a permitted Dev.to
  host
- **THEN** the image renders without a CSP or Next.js image-host violation

#### Scenario: Article with no cover image

- **WHEN** an aggregated article has no cover image
- **THEN** the post renders without a broken image placeholder
