---
name: Contact form → Vercel proxy → n8n
overview: Wire the homepage contact form through a Vercel serverless proxy to n8n, with GDPR consent, Zod validation, and firstName/lastName fields.
status: planned
approved_by_user: true
todos:
  - id: split-name-fields
    content: Replace fullName with firstName + lastName in Contact UI and content model
    status: pending
  - id: add-gdpr-consent
    content: Add required GDPR consent checkbox + privacy copy on contact form
    status: pending
  - id: shared-zod-schema
    content: Add shared Zod schema for contact payload (client + server)
    status: pending
  - id: client-submit
    content: Replace stub submit with validated POST to /api/submit-contact
    status: pending
  - id: vercel-api
    content: Implement api/submit-contact.ts proxy to N8N_WEBHOOK_URL with secret header
    status: pending
  - id: env-docs
    content: Document N8N_WEBHOOK_URL and N8N_WEBHOOK_SECRET in .env.example
    status: pending
  - id: smoke-test
    content: Verify success/error UX and that webhook URL never appears in client bundle
    status: pending
---

# Contact form → Vercel proxy → n8n

## Goal

Turn the stubbed ClearFlow contact form into a production lead capture flow: validate on client and server, require GDPR consent, and forward payloads to n8n via a Vercel serverless function so secrets never reach the browser.

## Current state

- Form UI lives in `src/components/sections/Contact.tsx` with fields: `fullName`, `phone`, `email`, `location`, `workType`, `referral`, `referralOther`, `message`
- Submit only sets local `submitted` state — no fetch, no API
- No GDPR consent checkbox
- `api/` directory is empty; `vercel.json` rewrites non-`api/` routes to SPA
- `.env.example` already lists `N8N_WEBHOOK_URL` and `N8N_WEBHOOK_SECRET` (commented)
- DevArchitecture requires `firstName` / `lastName` (not `fullName`) and server-side Zod re-validation

## What we are building

1. **Form fields** — split name; keep plumbing-specific fields (phone, location, work type, referral, message); add required `gdprConsent`
2. **Validation** — React Hook Form + Zod on client; identical Zod schema on the API route
3. **API proxy** — `POST /api/submit-contact` reads server env, validates body, forwards to n8n with `X-Webhook-Secret` when set, returns sanitized success/error
4. **Payload** — include `submittedAt` (ISO 8601), `source: "clearflow-contact-form"`, plus form fields
5. **UX** — field errors via `aria-invalid` / live region; loading and failure states (not only success)

## Files to create

| File | Purpose |
|------|---------|
| `api/submit-contact.ts` | Vercel serverless proxy |
| `src/lib/validations/contact.ts` | Shared Zod schema + types |
| `src/lib/submitContact.ts` | Client fetch helper |

## Files to modify

| File | Changes |
|------|---------|
| `src/components/sections/Contact.tsx` | RHF + Zod, GDPR, real submit UX |
| `src/data/content.ts` | Consent copy / labels if needed |
| `package.json` | Add `zod`, `react-hook-form`, `@hookform/resolvers` |
| `.env.example` | Uncomment/document n8n vars clearly |
| `vercel.json` | Confirm `/api/*` is not SPA-rewritten (already excluded) |

## Environment variables required

| Variable | Scope | Purpose |
|----------|-------|---------|
| `N8N_WEBHOOK_URL` | Server only | n8n webhook endpoint |
| `N8N_WEBHOOK_SECRET` | Server only | Optional `X-Webhook-Secret` header |

## Test plan

1. Submit empty form → field errors, no network call with invalid data
2. Submit without GDPR → blocked
3. Valid submit → `201/200` from `/api/submit-contact`; n8n receives payload (or mock with request bin in preview)
4. View page source / Network tab → webhook URL and secret never in JS bundle
5. Kill webhook URL in preview → form shows recoverable error, not fake success

## Out of scope

- Building the n8n workflow UI inside this repo (document expected payload only)
- reCAPTCHA / bot protection (can add later)
- Supabase storage of leads
- Email sending from the site itself
