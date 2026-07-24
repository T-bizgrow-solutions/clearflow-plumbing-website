---
name: Site migration and rebuild
overview: Migrate clearflowpm.com from WordPress/Elementor into a Vite + React + TypeScript marketing site aligned with DevArchitecture conventions.
status: complete
approved_by_user: true
todos:
  - id: scaffold-vite
    content: Scaffold Vite + React + TS project with Tailwind and Vercel config
    status: completed
  - id: extract-content
    content: Extract and centralise all copy, contact details, and assets from live site
    status: completed
  - id: build-sections
    content: Rebuild homepage sections (hero, about, director, services, projects, why choose us, contact)
    status: completed
  - id: multi-page-routes
    content: Add /services, service detail pages, and /projects gallery
    status: completed
  - id: wire-contact-form
    content: Wire contact form to Vercel API proxy + n8n webhook with GDPR consent
    status: pending
  - id: seo-jsonld
    content: Add JSON-LD, sitemap generation, and SEO/AEO/GEO plan
    status: pending
  - id: design-evolution
    content: Evolve design system, accessibility pass, and performance optimisations
    status: pending
---

# Site migration and rebuild

## Goal

Replace the client's WordPress/Elementor site at https://clearflowpm.com with a modern Vite SPA that preserves existing content and brand identity, while establishing the codebase structure required for subsequent DevArchitecture features.

## Current state

- Repo: `clearflow-plumbing-website` on GitHub (`T-bizgrow-solutions/clearflow-plumbing-website`)
- Vite + React 18 + TypeScript + Tailwind marketing site with multi-page routes
- Contact form still stubbed — ownership moved to `N8N_WEBHOOK_PLAN.md`
- SEO/design/a11y follow-ons moved to dedicated plans (see `IMPLEMENTATION_STATUS.md`)

## What we are building

### Phase 1 — complete

- Vite scaffold, content SSOT, homepage sections, brand tokens, `vercel.json`, multi-page services + projects

### Phase 2 — tracked elsewhere

Remaining migration todos are implemented under dedicated plans so each workstream can be approved and verified independently.

| Remaining concern | Plan file |
|-------------------|-----------|
| Contact + GDPR + n8n | `N8N_WEBHOOK_PLAN.md` |
| Design tokens | `DESIGN_SYSTEM_PLAN.md` |
| Accessibility | `ACCESSIBILITY_PLAN.md` |
| SEO / AEO / GEO | `SEO_AEO_GEO_PLAN.md` |
| Sitemap / GSC / Bing | `SITEMAP_SEARCH_CONSOLE_BING_PLAN.md` |

## Files to create / modify

See Phase 1 history and child plans. No new Phase 1 scaffolding expected.

## Environment variables required

See `.env.example` and child plans.

## Test plan

1. `npm run dev` — home, services, projects, 404
2. `npm run build` — succeeds
3. Content spot-check vs https://clearflowpm.com

## Out of scope

- Supabase auth/booking (explicitly excluded from ClearFlow scope)
- DNS cutover (see `VERCEL_DEPLOYMENT_PLAN.md`)
