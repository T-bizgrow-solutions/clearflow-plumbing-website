# Implementation status — ClearFlow Plumbing Website

**Onboarding date:** 2026-07-22  
**Session:** Initial site migration and rebuild  
**Canonical domain:** https://clearflowpm.com (target)

## Current phase

| Item | Status | Notes |
|------|--------|-------|
| Site migration plan | in-progress | Multi-page routing added (services + projects) |
| Services pages | complete | `/services` index + 7 detail pages |
| Projects page | complete | `/projects` gallery page |
| Articles route | deferred | DevArchitecture phase |
| Location pages | deferred | DevArchitecture phase |
| Contact form → API/webhook | planned | UI built; submission stubbed |
| SEO / AEO / GEO | planned | Basic meta in place; full plan not started |
| Supabase backend | not started | |
| Sentry | not started | |
| n8n integration | not started | |
| GitHub label sync | not started | Scripts placeholder in package.json |
| Linear project | not started | Run `npm run linear:create-project` when ready |
| Vercel deployment | not started | `vercel.json` configured |

## Decisions confirmed

- **Stack:** Vite + React + TypeScript + Tailwind (matches DevArchitecture Vite SPA conventions)
- **Scope (session 1):** Pull in existing site content and re-develop marketing homepage only
- **Evolution:** Further features gated behind DevArchitecture onboarding checklist

## Manual follow-ups

- [ ] Complete DevArchitecture Section 0 feature checklist (user Y/N)
- [ ] Confirm Josh Nehme photo is correct representative image
- [ ] Confirm project photo mapping matches client expectations
- [ ] Decide on reviews/testimonials replacement for Elfsight widget
- [ ] Production deploy to Vercel when approved

## Linear project

_Not created yet._ Add row to DevArchitecture Section 9 when `npm run linear:create-project` is run.
