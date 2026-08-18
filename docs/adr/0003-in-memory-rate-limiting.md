# 3. In-memory rate limiting for the contact API

**Status:** Accepted

## Context

`POST /api/contact` sends email. Left open it is a spam relay and a way to burn
the Resend quota, so it needs a limit.

Standard answers — Redis, Upstash, Vercel KV — all mean provisioning a data
store, holding another credential, and adding a network round-trip to a request
that currently has none. For a personal portfolio receiving a handful of genuine
messages a month, that is real operational weight for a small risk.

## Decision

Rate-limit in process: a `Map` from client IP to a count and a window expiry,
5 requests per 15 minutes, with periodic cleanup of expired entries
(`src/lib/rate-limiter.ts`).

The client IP is resolved from `cf-connecting-ip`, then `x-forwarded-for`, then
`x-real-ip`, since the app sits behind a proxy in every deployment.

## Consequences

**Good**

- No external dependency, no credential, no network hop.
- Blocks the realistic threat — a naive script hammering the endpoint from one
  address.
- Trivially testable and inspectable.

**Bad**

- **State is per-instance.** Serverless deployments run several instances, so
  the effective limit is 5 × instances. It resets on cold start.
- **No protection against distributed abuse.** Requests from many addresses are
  each under the limit.
- The counter map grows with distinct IPs between cleanups. Bounded in practice
  by the cleanup interval, unbounded in principle.

These are accepted at current traffic. The mitigation, if abuse ever appears, is
Cloudflare or Vercel WAF in front of the endpoint rather than a bigger rate
limiter behind it — edge filtering is the right layer for this, and it does not
require the app to hold state.

This decision does not generalise. Anything needing a real shared counter should
not copy this pattern.
