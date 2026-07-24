---
name: Articles / Insights route
overview: Add an /insights hub and article detail pages with content model, heroes, metadata, JSON-LD, and sitemap entries for ClearFlow GEO/AEO lift.
status: planned
approved_by_user: true
todos:
  - id: data-model
    content: Create src/data/articles.ts with helpers and 2–3 pillar posts
    status: pending
  - id: routes-ui
    content: Add /insights and /insights/:slug pages wired in App.tsx
    status: pending
  - id: heroes
    content: Add public/insights-heroes/{slug}.png assets (1200×630)
    status: pending
  - id: article-seo
    content: Per-article usePageMeta (ogType article), JSON-LD Article + CollectionPage
    status: pending
  - id: nav-footer
    content: Link Insights from nav/footer
    status: pending
  - id: sitemap-llms
    content: Register articles in sitemap generator and public/llms.txt
    status: pending
---

# Articles / Insights route

## Goal

Publish an insights section that targets plumbing-related questions ClearFlow wants to rank/be cited for, with proper article metadata and structured data.

## Current state

- Deferred in `IMPLEMENTATION_STATUS.md` and README
- Routing is pathname-based in `App.tsx` — no `/insights` yet
- `usePageMeta` already supports `ogType: 'article'` but unused
- No article data file or hero assets

## What we are building

Per DevArchitecture Section 20:

| Route | Purpose |
|-------|---------|
| `/insights` | Hub listing |
| `/insights/{slug}` | Article detail |

1. **Data model** — slug, path, heroImage, title, description, author, dates, readTime, blocks
2. **Author** — shared `ARTICLE_AUTHOR` (e.g. Josh Nehme / ClearFlow) once confirmed
3. **UI** — breadcrumbs, meta row, hero, body blocks, related aside
4. **SEO** — article OG tags, JSON-LD `Article` + index `CollectionPage`
5. **Sitemap / llms.txt** — include all article URLs; run Section 19 gate after ship
6. **First posts (proposed topics — confirm copy)**  
   - Emergency plumber response times in Sydney  
   - When you need CCTV drain inspection  
   - Backflow / TMV testing obligations for strata & commercial  

## Files to create

| File | Purpose |
|------|---------|
| `src/data/articles.ts` | Articles + helpers |
| `src/components/insights/InsightsIndexPage.tsx` | Hub |
| `src/components/insights/InsightArticlePage.tsx` | Detail |
| `public/insights-heroes/*.png` | OG/hero images |

## Files to modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Route matching |
| `src/data/content.ts` | Nav/footer links |
| `scripts/generate-sitemap.ts` | Article URLs + lastmod |
| `public/llms.txt` | List articles |
| SEO JSON-LD helpers | Article schemas |

## Environment variables required

| Variable | Scope | Purpose |
|----------|-------|---------|
| `VITE_SITE_URL` | Build | Absolute OG/canonical URLs |

## Test plan

1. `/insights` lists all posts; detail routes render blocks
2. Unknown slug → 404
3. Meta/OG/JSON-LD present per article
4. Sitemap regeneration includes articles
5. Mobile layout + reduced motion OK

## Out of scope

- CMS / admin authoring
- Migrating WordPress blog posts without approval
- Comments or newsletter signup
