---
name: Site migration and rebuild
overview: Migrate clearflowpm.com from WordPress/Elementor into a Vite + React + TypeScript marketing site aligned with DevArchitecture conventions.
status: in-progress
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

Replace the client's WordPress/Elementor site at https://clearflowpm.com with a modern Vite SPA that preserves existing content and brand identity, while establishing the codebase structure required for subsequent DevArchitecture features (Supabase, booking, Sentry, n8n, SEO, etc.).

## Current state

- Live site: WordPress + Elementor + Gravity Forms + Elfsight reviews widget
- New repo: `clearflow-plumbing-website` — Vite + React 18 + TypeScript + Tailwind
- Single-page marketing site with sections mirroring the original homepage
- Contact form is UI-only (local preview state) — not yet connected to backend/webhook
- Assets pulled from live site into `/public`

## What we are building

### Phase 1 (this session) — complete
- Vite project scaffold matching BizGrow repo conventions
- Content single source of truth in `src/data/content.ts`
- Responsive sections: Navbar, Hero (carousel), About, Director, Services, Projects, Why choose us, Contact, Footer
- Brand tokens: ClearFlow blue `#009fe3`, green `#7ac143`, fonts Montserrat/Raleway/Sora
- `vercel.json` SPA rewrites + API route placeholder at `/api/`
- `.env.example` documented for future integrations

### Phase 2 (onboarding — pending user Y/N)
- Feature checklist per DevArchitecture Section 0
- Individual implementation plans for each approved item

## Files to create

| File | Purpose |
|------|---------|
| `implementation/SITE_MIGRATION_PLAN.md` | This plan |
| `implementation/IMPLEMENTATION_STATUS.md` | Session and phase tracking |
| `src/data/content.ts` | All marketing copy |
| `src/components/sections/*` | Page sections |
| `api/submit.ts` | Future Vercel serverless contact handler |

## Files to modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Route shell; extend for `/insights`, legal pages later |
| `public/robots.txt` | Update when canonical domain confirmed |

## Environment variables required

| Variable | Scope | Purpose |
|----------|-------|---------|
| `VITE_SITE_URL` | Build time | Canonical site URL |
| `N8N_WEBHOOK_URL` | Server only | Contact form webhook (phase 2) |
| `N8N_WEBHOOK_SECRET` | Server only | Webhook auth header (phase 2) |

## Test plan

1. `npm run dev` — verify all sections render, nav anchors scroll correctly
2. `npm run build` — production build succeeds
3. Compare section content against https://clearflowpm.com
4. Mobile nav opens/closes; focus states visible
5. `prefers-reduced-motion` disables hero carousel auto-advance

## Out of scope (this phase)

- Supabase auth and booking backend
- Sentry integration
- n8n webhook wiring
- Google reCAPTCHA replacement
- Elfsight reviews widget (needs approved alternative)
- DNS cutover and production deployment
