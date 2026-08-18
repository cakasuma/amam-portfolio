# Contact Form Specification

## MODIFIED Requirements

### Requirement: Email delivery with graceful degradation

The API SHALL deliver accepted submissions by email when `RESEND_API_KEY` is
configured, SHALL log them server-side when it is not, and SHALL report a
delivery failure to the visitor rather than reporting success.

#### Scenario: Resend configured

- **GIVEN** `RESEND_API_KEY` is set
- **WHEN** a valid submission is accepted
- **THEN** an email is sent to `CONTACT_EMAIL`
- **AND** the API responds `200` with `success: true`

#### Scenario: Resend not configured

- **GIVEN** `RESEND_API_KEY` is unset
- **WHEN** a valid submission is accepted
- **THEN** the submission is written to the server log
- **AND** the API responds `200` so the visitor sees a confirmation

#### Scenario: Delivery failure

- **GIVEN** `RESEND_API_KEY` is set
- **WHEN** the email provider returns an error
- **THEN** the submission is written to the server log
- **AND** the API responds `502` with a generic message naming no provider
  internals
- **AND** the response still carries the caller's rate-limit headers

### Requirement: Submission feedback

The contact page SHALL tell the visitor whether their message was sent, and
SHALL distinguish a delivery failure from a rate limit.

#### Scenario: Successful send

- **WHEN** the API responds `200`
- **THEN** a success notification is shown to the visitor

#### Scenario: Rate-limited send

- **WHEN** the API responds `429`
- **THEN** an error notification tells the visitor to try again later

#### Scenario: Failed delivery

- **WHEN** the API responds `502`
- **THEN** an error notification tells the visitor the message could not be sent
- **AND** offers the direct email address as an alternative
