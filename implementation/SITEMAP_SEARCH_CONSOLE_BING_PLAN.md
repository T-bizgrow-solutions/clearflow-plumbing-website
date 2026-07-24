---
name: Sitemap, Search Console, and Bing
overview: Data-driven sitemap generation with real lastmod, robots alignment, and Google/Bing webmaster verification + submission workflow.
status: planned
approved_by_user: true
todos:
  - id: data-driven-sitemap
    content: Generate sitemap from routing/content sources (services, projects, articles, locations)
    status: pending
  - id: real-lastmod
    content: Drive lastmod from content date constants, not build time alone
    status: pending
  - id: robots-canonical
    content: Keep robots.txt Sitemap line on canonical VITE_SITE_URL
    status: pending
  - id: gsc-verify
    content: Add chosen GSC verification method when user provides token/DNS preference
    status: pending
  - id: bing-verify
    content: Add Bing verification (prefer GSC import) and document manual submit steps
    status: pending
  - id: freshness-gate
    content: Run DevArchitecture Section 19 checklist after route/SEO launches
    status: pending
---

# Sitemap, Search Console, and Bing

## Goal

Keep one sitemap source of truth that lists every public indexable ClearFlow URL with real freshness, point robots at it, and complete Google Search Console + Bing Webmaster Tools verification/submission for `https://clearflowpm.com`.

## Current state

- `scripts/generate-sitemap.ts` writes `public/sitemap.xml` with 10 hardcoded paths and `lastmod=2026-07-22`
- Not imported from `services.ts` / future articles or locations
- `public/robots.txt` already points at `https://clearflowpm.com/sitemap.xml`
- No GSC/Bing verification files or meta tags yet
- SPA: sitemap must still enumerate all client routes crawlers should discover

## What we are building

1. **Generator** — import service paths (and later articles/locations) from data modules; include `/`, `/services`, `/projects`
2. **Freshness** — `CONTENT_LASTMOD` / per-entity `dateModified` constants updated when copy meaningfully changes
3. **CI/local** — `npm run generate:sitemap` remains the regenerate path; call out in deploy checklist
4. **Verification hooks** — support meta tag and/or `public/google*.html` / `BingSiteAuth.xml` once user chooses method
5. **Manual follow-ups** — document owner steps for DNS TXT, sitemap submit, indexing requests
6. **Section 19 gate** — run after articles/locations/SEO land

## Files to create

| File | Purpose |
|------|---------|
| `src/data/contentDates.ts` (or equiv.) | Shared lastmod constants |
| Verification files under `public/` | Only after user provides tokens |

## Files to modify

| File | Changes |
|------|---------|
| `scripts/generate-sitemap.ts` | Data-driven routes + lastmod |
| `public/sitemap.xml` | Regenerated output |
| `public/robots.txt` | Keep Sitemap URL canonical |
| `implementation/IMPLEMENTATION_STATUS.md` | Record verification/submission dates |

## Environment variables required

| Variable | Scope | Purpose |
|----------|-------|---------|
| `VITE_SITE_URL` | Build | Absolute sitemap URLs |

## Test plan

1. Add a temporary route in data → regenerate → appears in XML
2. Confirm no `/api/*`, noindex, or hash-only URLs
3. `robots.txt` Sitemap matches production host
4. Post-deploy: submit sitemap in GSC and Bing; record in status file

## Out of scope

- Creating Google/Bing accounts (user)
- DNS registrar changes (user) unless credentials provided
- IndexNow automation (optional later)
