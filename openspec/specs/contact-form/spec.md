# Contact Form Specification

## Purpose

Visitors need a way to reach the site owner without exposing an email address to
scrapers. The form posts to a server route that validates the submission,
rate-limits by client IP, and delivers the message by email — degrading to
server-side logging rather than failing when email is not configured.

## Requirements

### Requirement: Field validation

The API SHALL reject submissions that fail server-side validation with HTTP 400
and a human-readable message.

#### Scenario: Name too short

- **WHEN** a submission carries a `name` shorter than 2 characters
- **THEN** the API responds `400` with an error describing the name field
- **AND** no email is sent

#### Scenario: Malformed email

- **WHEN** a submission carries an `email` that does not match the accepted
  address format
- **THEN** the API responds `400` with `"Invalid email format"`

#### Scenario: Subject or message too short

- **WHEN** a submission carries a `subject` shorter than 3 characters or a
  `message` shorter than 10 characters
- **THEN** the API responds `400` naming the offending field

#### Scenario: Valid submission

- **WHEN** a submission carries a name of at least 2 characters, a well-formed
  email, a subject of at least 3 characters, and a message of at least 10
  characters
- **THEN** the API accepts it for delivery

### Requirement: Rate limiting by client IP

The API SHALL allow at most 5 submissions per 15-minute window per client IP and
SHALL respond `429` beyond that.

#### Scenario: Sixth request inside the window

- **GIVEN** an IP has made 5 accepted submissions in the last 15 minutes
- **WHEN** it submits again
- **THEN** the API responds `429`
- **AND** the body carries `resetTime` as an ISO 8601 timestamp
- **AND** the response carries `Retry-After` in seconds

#### Scenario: Window expiry

- **GIVEN** an IP was rate-limited
- **WHEN** it submits again after its window has elapsed
- **THEN** the submission is accepted and its counter restarts

### Requirement: Rate limit headers on every response

Accepted and rejected responses alike SHALL carry the caller's current rate-limit
state.

#### Scenario: Successful submission

- **WHEN** a submission is accepted
- **THEN** the response carries `X-RateLimit-Limit` and `X-RateLimit-Remaining`

### Requirement: Client IP resolution behind proxies

The API SHALL derive the client IP from `cf-connecting-ip`, then
`x-forwarded-for`, then `x-real-ip`, and fall back to a constant when none is
present.

#### Scenario: Request through a forwarding proxy

- **WHEN** a request carries `x-forwarded-for: 203.0.113.7, 70.41.3.18`
- **AND** carries no `cf-connecting-ip`
- **THEN** the rate limiter keys on `203.0.113.7`

### Requirement: Input sanitisation

The API SHALL sanitise submitted values before embedding them in the outgoing
email.

#### Scenario: Message containing markup

- **WHEN** a submission's message contains HTML tags
- **THEN** the delivered email renders them as literal text rather than as
  markup

### Requirement: Email delivery with graceful degradation

The API SHALL deliver accepted submissions by email when `RESEND_API_KEY` is
configured, and SHALL log them server-side when it is not.

#### Scenario: Resend configured

- **GIVEN** `RESEND_API_KEY` is set
- **WHEN** a valid submission is accepted
- **THEN** an email is sent to `CONTACT_EMAIL`
- **AND** the API responds `200` with `success: true`

#### Scenario: Resend not configured

- **GIVEN** `RESEND_API_KEY` is unset
- **WHEN** a valid submission is accepted
- **THEN** the submission is written to the server log
- **AND** the API still responds `200` so the visitor sees a confirmation

#### Scenario: Delivery failure

- **GIVEN** `RESEND_API_KEY` is set
- **WHEN** the email provider returns an error
- **THEN** the submission is written to the server log
- **AND** the API responds `200` with `success: true`

> Note: reporting success to the visitor on a delivery failure is the current
> behaviour, not a desired one. Tracked by the
> `surface-contact-delivery-failures` change.

### Requirement: Generic server errors

The API SHALL respond `500` with a message that does not expose system internals
when it cannot process a request at all.

#### Scenario: Malformed request body

- **WHEN** a request body cannot be parsed as JSON
- **THEN** the API responds `500` with a generic error message
- **AND** the message names no provider, stack frame, or environment variable

### Requirement: Submission feedback

The contact page SHALL tell the visitor whether their message was sent.

#### Scenario: Successful send

- **WHEN** the API responds `200`
- **THEN** a success notification is shown to the visitor

#### Scenario: Rate-limited send

- **WHEN** the API responds `429`
- **THEN** an error notification tells the visitor to try again later
