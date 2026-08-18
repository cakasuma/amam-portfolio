# Tasks

## 1. API behaviour

- [ ] 1.1 Separate the "provider not configured" branch from the "provider
      returned an error" branch in `src/app/api/contact/route.ts`
- [ ] 1.2 Respond `502` on a delivery error, with a generic message that names
      no provider internals
- [ ] 1.3 Keep the existing rate-limit headers on the failure response
- [ ] 1.4 Keep logging the sanitised submission on failure so the message is not
      lost

## 2. Visitor-facing feedback

- [ ] 2.1 Add a distinct error branch in `ContactForm` for a delivery failure
- [ ] 2.2 Add the error copy to the `contact` namespace in `en`
- [ ] 2.3 Add the same key to `id`

## 3. Spec and verification

- [ ] 3.1 Apply the delta in `specs/contact-form/spec.md` to
      `openspec/specs/contact-form/spec.md` and remove the note about current
      behaviour
- [ ] 3.2 Manually verify: valid submission with a good key still returns `200`
- [ ] 3.3 Manually verify: valid submission with an invalid key returns `502`
      and the form shows the failure message
- [ ] 3.4 Manually verify: with no key set, submission still returns `200`
- [ ] 3.5 `npm run verify` passes
