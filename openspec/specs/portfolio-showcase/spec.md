# Portfolio Showcase Specification

## Purpose

The portfolio page is the site's primary evidence surface: it shows what has
been built, with what, and where to see it running. Entries must degrade
gracefully, because not every project has both a live demo and a public
repository.

## Requirements

### Requirement: Project entries carry provenance

Each project SHALL present a title, a description, a representative image, and
the technologies it was built with.

#### Scenario: Rendering a project card

- **WHEN** the portfolio page renders a project
- **THEN** the card shows its title, description, image, and technology list

### Requirement: Optional links degrade to disabled controls

A project card SHALL render an active link where a URL exists, and a disabled,
labelled control where it does not, so the card's layout stays uniform.

#### Scenario: Project with both links

- **GIVEN** a project has a demo URL and a repository URL
- **WHEN** its card renders
- **THEN** both controls are active links to those URLs

#### Scenario: Project with no public repository

- **GIVEN** a project's repository URL is absent
- **WHEN** its card renders
- **THEN** a disabled control labelled "Private Repo" is rendered in its place
- **AND** no link is emitted for it

#### Scenario: Project with no public demo

- **GIVEN** a project's demo URL is absent
- **WHEN** its card renders
- **THEN** a disabled control labelled "Private Project" is rendered in its place

### Requirement: Web apps are listed separately

Subdomain-hosted web apps SHALL be presented in their own section, ahead of the
project sections.

#### Scenario: Rendering the portfolio page

- **WHEN** a visitor opens the portfolio page
- **THEN** the web apps section appears before the featured projects section

### Requirement: Featured projects lead

Projects marked as featured SHALL be presented ahead of non-featured projects.

#### Scenario: Mixed project list

- **GIVEN** the project list contains featured and non-featured entries
- **WHEN** the portfolio page renders
- **THEN** featured entries appear before the rest

### Requirement: Localised presentation

The page's own copy — headings, section titles, and calls to action — SHALL be
translated for both locales.

#### Scenario: Indonesian portfolio page

- **WHEN** a visitor opens `/id/portfolio`
- **THEN** headings and calls to action render in Indonesian

### Requirement: Project images are local assets

Project imagery SHALL be served from this site's `public/` directory rather than
hot-linked from third parties.

#### Scenario: Adding a project

- **WHEN** a project is added to the list
- **THEN** its image path resolves to a file under `public/projects/`

### Requirement: External links are safely targeted

Links leaving the site SHALL open without granting the destination access to the
originating window.

#### Scenario: Following a demo link

- **WHEN** a visitor activates a project's demo control
- **THEN** the destination opens in a new context with `rel` preventing
  `window.opener` access
