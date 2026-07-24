---
name: Vercel deployment and environment setup
overview: Link the ClearFlow repo to Vercel, configure env vars for preview/production, and ship a production-ready deploy of the Vite SPA.
status: planned
approved_by_user: true
todos:
  - id: link-project
    content: Import GitHub repo to Vercel under BizGrow account/team
    status: pending
  - id: env-preview-prod
    content: Set VITE_SITE_URL, N8N_*, VITE_SENTRY_DSN for preview and production
    status: pending
  - id: build-settings
    content: Confirm Vite build command, output dist, Node version
    status: pending
  - id: preview-smoke
    content: Smoke-test preview URL (routes, contact API, meta)
    status: pending
  - id: production-cutover-notes
    content: Document DNS cutover steps for clearflowpm.com when client is ready
    status: pending
---

# Vercel deployment and environment setup

## Goal

Deploy ClearFlow Plumbing from GitHub to Vercel with correct SPA rewrites, serverless `/api`, and environment separation so preview and production behave safely.

## Current state

- `vercel.json`: framework vite, output `dist`, trailing-slash redirect, SPA rewrite excluding `/api/`
- Repo on GitHub: `T-bizgrow-solutions/clearflow-plumbing-website`
- No Vercel project linked yet (`IMPLEMENTATION_STATUS`: not started)
- `.env.example` documents public + server vars; no production secrets in git

## What we are building

1. **Vercel project** — import from GitHub; production branch `main`
2. **Build** — `npm run build`; output `dist`; Node 20.x
3. **Env** — `VITE_SITE_URL=https://clearflowpm.com` (prod); preview may use Vercel URL until DNS cutover
4. **Server secrets** — `N8N_WEBHOOK_URL`, `N8N_WEBHOOK_SECRET`, `VITE_SENTRY_DSN` when those plans ship
5. **Smoke** — `/`, `/services/*`, `/projects`, `/api/submit-contact` (once live)
6. **DNS notes** — checklist for pointing `clearflowpm.com` at Vercel (user/client action)

## Files to create

| File | Purpose |
|------|---------|
| `implementation/DEPLOY_NOTES.md` | Optional short DNS/cutover checklist if not kept only in status |

## Files to modify

| File | Changes |
|------|---------|
| `.env.example` | Align names/comments with deployed vars |
| `vercel.json` | Only if API runtime/config needs tweaks |
| `IMPLEMENTATION_STATUS.md` | Record project URL, domains, env checklist |

## Environment variables required

| Variable | Scope | Purpose |
|----------|-------|---------|
| `VITE_SITE_URL` | Build (preview + prod) | Canonical absolute URLs |
| `N8N_WEBHOOK_URL` | Server | Contact proxy |
| `N8N_WEBHOOK_SECRET` | Server | Optional webhook auth |
| `VITE_SENTRY_DSN` | Build | Client Sentry |

## Test plan

1. Preview deploy succeeds; SPA deep links work on refresh
2. `/api/submit-contact` responds (not `index.html`)
3. Production build env embeds correct `VITE_SITE_URL` in meta/canonical
4. No secrets in client bundle (search built JS for webhook URL)

## Out of scope

- WordPress DNS cutover execution without client approval
- Custom email/DNS beyond site hosting
- Supabase hosting
