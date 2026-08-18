# Resume PDF Specification

## Purpose

Recruiters routinely need a résumé as a file rather than a web page. The site
generates a PDF on demand from the same translated content that renders the
résumé page, so the two can never drift apart.

## Requirements

### Requirement: On-demand PDF generation

The system SHALL expose `GET /api/resume/pdf` returning a generated PDF of the
résumé.

#### Scenario: Requesting the résumé

- **WHEN** a client issues `GET /api/resume/pdf`
- **THEN** the response status is `200`
- **AND** `Content-Type` is `application/pdf`
- **AND** the body is a valid PDF document

### Requirement: Locale-aware content

The generated PDF SHALL use the résumé content of the requested locale.

#### Scenario: Indonesian résumé

- **WHEN** a client issues `GET /api/resume/pdf?lng=id`
- **THEN** the PDF body text is drawn from the `id` résumé translations

#### Scenario: Unsupported locale

- **WHEN** a client issues `GET /api/resume/pdf?lng=fr`
- **THEN** the PDF is generated in the fallback locale `en` rather than erroring

#### Scenario: Locale omitted

- **WHEN** a client issues `GET /api/resume/pdf` with no `lng` parameter
- **THEN** the PDF is generated in the fallback locale `en`

### Requirement: Download filename

The response SHALL instruct the browser to download the file under a name
carrying the person's name and the locale.

#### Scenario: English download

- **WHEN** a client issues `GET /api/resume/pdf?lng=en`
- **THEN** `Content-Disposition` is `attachment` with a filename ending
  `-Resume-en.pdf`
- **AND** the filename contains no spaces

### Requirement: Single source of résumé content

PDF content SHALL be derived from the same i18n namespaces and structural
constants that the résumé page renders from.

#### Scenario: Adding a work-experience entry

- **WHEN** an entry is added to the shared résumé data and its translations
- **THEN** it appears in both the résumé page and the generated PDF without any
  additional change

### Requirement: Response caching

The PDF response SHALL be cacheable to avoid regenerating it on every request.

#### Scenario: Repeat request

- **WHEN** the endpoint returns a PDF
- **THEN** the response carries a `Cache-Control` header permitting public
  caching for at least one hour

### Requirement: Reachable from the résumé page

The résumé page SHALL offer a download control that requests the PDF for the
page's current locale.

#### Scenario: Downloading from the Indonesian résumé page

- **GIVEN** a visitor is on `/id/resume`
- **WHEN** they activate the download control
- **THEN** the browser downloads the `id` PDF
