# Surface Contact Delivery Failures

## Why

The contact API currently catches errors from the email provider, logs them, and
still responds `200` with `success: true`. The visitor is told their message was
sent when it was not, and nothing surfaces the failure to the site owner either
— the evidence is a log line in a serverless function that nobody reads.

For a portfolio site, the contact form is the single conversion path. A silent
failure on it is the most expensive bug the site can have.

This was found while writing `openspec/specs/contact-form/spec.md` against the
existing implementation, and is recorded as a note on that spec.

## What Changes

- The API distinguishes "accepted and delivered" from "accepted but not
  delivered", and no longer reports success for the latter.
- A delivery failure responds `502` with a generic message that tells the
  visitor the message could not be sent and offers the direct email address as a
  fallback.
- The unconfigured-provider path is unchanged: with no `RESEND_API_KEY` the
  submission is logged and reported as success, because that is a deliberate
  local-development affordance rather than a failure.
- The contact form surfaces the distinct failure state to the visitor.

## Impact

- Affected specs: `contact-form`
- Affected code: `src/app/api/contact/route.ts`, `src/app/components/ContactForm.tsx`
- Affected translations: `contact` namespace in `en` and `id` — one new error string
- Risk: low. No schema, dependency, or infrastructure change.
- Not in scope: retries, a delivery queue, or provider failover.
