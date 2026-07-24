---
name: Sentry error tracking
overview: Add Sentry to the Vite + React ClearFlow site, configure Vercel DSN, and route production alerts to Linear.
status: planned
approved_by_user: true
todos:
  - id: install-sdk
    content: Add @sentry/react and initialise in main.tsx with sideEffects safeguard
    status: pending
  - id: env-dsn
    content: Wire VITE_SENTRY_DSN for local optional + Vercel preview/production
    status: pending
  - id: source-maps
    content: Configure upload or disable as appropriate for Vite build
    status: pending
  - id: linear-alert
    content: Document Sentry → Linear alert rule after Linear project exists
    status: pending
  - id: smoke-test
    content: Deploy preview, throw test error, verify Sentry + Linear issue
    status: pending
---

# Sentry error tracking

## Goal

Capture client-side production errors for ClearFlow with enough context to fix regressions, and route new issues to the BizGrow Linear project for triage.

## Current state

- `VITE_SENTRY_DSN` commented in `.env.example` and typed in `vite-env.d.ts`
- No `@sentry/react` dependency; no init in `src/main.tsx`
- DevArchitecture references TanStack-style root files — **adapt to Vite entry** (`main.tsx` / `App.tsx`)
- Linear project for this repo not created yet (see `LINEAR_PROJECT_PLAN.md`)

## What we are building

1. Install and init Sentry early in `main.tsx` (only when DSN present)
2. Set `package.json` `sideEffects` so Sentry init is not tree-shaken
3. Environment: `VITE_SENTRY_DSN` on Vercel
4. After Linear project + Sentry Team integration: alert rule → Linear (BizGrow Solutions team)
5. Smoke test with unique `setTimeout(() => { throw new Error(...) }, 0)`

## Files to create

| File | Purpose |
|------|---------|
| `src/lib/sentry.ts` | Init helper (optional abstraction) |

## Files to modify

| File | Changes |
|------|---------|
| `src/main.tsx` | Call Sentry init before render |
| `package.json` | Dependency + `sideEffects` |
| `.env.example` | Uncomment DSN with notes |
| `vite.config.ts` | Source maps / Sentry plugin if used |

## Environment variables required

| Variable | Scope | Purpose |
|----------|-------|---------|
| `VITE_SENTRY_DSN` | Build time | Sentry project DSN |

## Test plan

1. Local without DSN → app runs, no Sentry noise
2. Preview with DSN → test throw appears in Sentry
3. Alert creates Linear issue in ClearFlow project
4. Production smoke after merge

## Out of scope

- Server-side Sentry for Node API (can add lightweight capture in `/api` later)
- Performance/session replay unless explicitly wanted later
- Business-tier GitHub issue auto-create (use Linear per DevArchitecture)
