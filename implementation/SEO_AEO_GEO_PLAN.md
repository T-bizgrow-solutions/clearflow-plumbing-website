---
name: SEO / AEO / GEO optimisation
overview: Content-first SEO, answer-engine, and generative-engine optimisation for ClearFlow Plumbing, culminating in JSON-LD, crawlability, and Search Console readiness.
status: planned
approved_by_user: true
todos:
  - id: entity-alignment
    content: Lock canonical domain, NAP, email, service area across content, footer, SEO helpers
    status: pending
  - id: site-competitor-review
    content: Site review + 3–5 niche competitor notes; propose extra items for approval
    status: pending
  - id: crawlability
    content: Ensure key copy is in HTML; fix meta/twitter sync; 404 noindex
    status: pending
  - id: aeo-content
    content: Add FAQ / question-led section content from single source of truth
    status: pending
  - id: json-ld
    content: Add LocalBusiness/ProfessionalService, Organization, Service, FAQPage, WebPage graph
    status: pending
  - id: sitemap-robots-handoff
    content: Hand off route list + lastmod rules to SITEMAP_SEARCH_CONSOLE_BING_PLAN
    status: pending
---

# SEO / AEO / GEO optimisation

## Goal

Improve organic discovery and AI-citation readiness for ClearFlow Plumbing (Sydney/NSW service-area plumber) by aligning entity signals, strengthening on-page AEO content, and mirroring final copy into JSON-LD — without fabricating reviews.

## Current state

- Client meta via `usePageMeta`; static tags in `index.html`
- Canonical base `VITE_SITE_URL` → `https://clearflowpm.com`
- `robots.txt` + `public/sitemap.xml` (10 URLs, hardcoded lastmod)
- No JSON-LD; twitter tags not updated on client navigations
- NAP: phone, email, licence, service area — **no street address** in `site`
- Services (7) and projects (8) are solid service-area content foundations
- Articles and location pages are separate plans (feed this plan when shipped)

## What we are building

Follow DevArchitecture Section 18 order:

1. **Strategy & entity alignment** — one canonical host; consistent NAP/brand; keyword/service-area confirmation
2. **Agent review + competitor research** — propose quick wins (areas served, FAQ page, llms.txt, etc.) before building extras
3. **Crawlability** — FAQ answers stay in DOM if accordions added; meta/twitter parity; favicons already present
4. **AEO content** — FAQ block(s) and question-style headings from `content.ts`
5. **Article decision** — owned by `ARTICLES_PLAN.md` (in scope for this project)
6. **JSON-LD** — `@graph` with `ProfessionalService` / `LocalBusiness`, `Organization`, per-`Service`, `FAQPage`, `WebPage` + `dateModified`
7. **Sitemap / robots / GSC / Bing** — executed via companion plan `SITEMAP_SEARCH_CONSOLE_BING_PLAN.md`

## Files to create

| File | Purpose |
|------|---------|
| `src/lib/seo/jsonLd.ts` | Builders for schema graph from content data |
| `src/components/seo/JsonLd.tsx` | Inject `application/ld+json` |
| `public/llms.txt` | Optional — only if approved in Stage 2 |
| FAQ content in `src/data/content.ts` | Single source for UI + JSON-LD |

## Files to modify

| File | Changes |
|------|---------|
| `src/hooks/usePageMeta.ts` | Twitter + og:locale/site_name; optional noindex |
| `src/data/content.ts` | NAP/FAQ/areas-served copy |
| `src/App.tsx` / pages | Mount JSON-LD + FAQ section |
| `src/lib/seo/site.ts` | Shared constants for schema |

## Environment variables required

| Variable | Scope | Purpose |
|----------|-------|---------|
| `VITE_SITE_URL` | Build / client | Canonical production origin |

## Test plan

1. View-source / disable JS: critical marketing + FAQ text still present where prerender allows (document SPA limits; mitigate with static FAQ in initial HTML where possible)
2. Rich Results Test on home + one service URL (post-deploy)
3. Grep NAP consistency across repo
4. Confirm no `AggregateRating` unless real reviews approved
5. After deploy: GSC/Bing steps in companion plan

## Out of scope

- DNS cutover ownership (coordinate in Vercel plan)
- Fabricated review schema
- Paid ads / GMB API automation
- Editing WordPress (legacy) content
