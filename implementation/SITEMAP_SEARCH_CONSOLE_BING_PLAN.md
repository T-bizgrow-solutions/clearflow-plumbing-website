---
name: Sitemap, Search Console, and Bing
overview: Data-driven sitemap generation with real lastmod, robots alignment, and Google/Bing webmaster verification + submission workflow.
status: in-progress
approved_by_user: true
todos:
  - id: data-driven-sitemap
    content: Generate sitemap from routing/content sources (services, projects, articles, locations)
    status: completed
  - id: real-lastmod
    content: Drive lastmod from content date constants, not build time alone
    status: completed
  - id: robots-canonical
    content: Keep robots.txt Sitemap line on canonical VITE_SITE_URL
    status: completed
  - id: gsc-verify
    content: Add chosen GSC verification method when user provides token/DNS preference
    status: pending
  - id: bing-verify
    content: Add BingSiteAuth.xml from shared store; complete Bing dashboard verify + sitemap submit
    status: completed
  - id: freshness-gate
    content: Run DevArchitecture Section 19 checklist after route/SEO launches
    status: pending
---

# Sitemap, Search Console, and Bing

## Goal

Keep one sitemap source of truth that lists every public indexable ClearFlow URL with real freshness, point robots at it, and complete Google Search Console + Bing Webmaster Tools verification/submission for `https://clearflowpm.com`.

## Current state

- Data-driven `scripts/generate-sitemap.ts` (21 URLs including services, insights, locations)
- `public/robots.txt` points at `https://clearflowpm.com/sitemap.xml`
- **`public/BingSiteAuth.xml` installed** — copied from `~/CODING - TRW /_shared/seo/BingSiteAuth.xml` (BizGrow account auth)
- GSC verification method not chosen yet
- Manual Bing property add + sitemap submit still required in Bing Webmaster Tools after production/canonical is ready

## What we are building

1. **Generator** — done (data modules + lastmod constants)
2. **Freshness** — done via `SITE_CONTENT_LASTMOD` / article dates
3. **Bing file verification** — done in repo; dashboard steps remain manual
4. **GSC** — awaiting preferred method (DNS / meta / HTML file)
5. **Section 19 gate** — after GSC/Bing dashboard submissions

## Bing verification source

Per DevArchitecture Section 18/19:

| Step | Location |
|------|----------|
| Shared store | `~/CODING - TRW /_shared/seo/BingSiteAuth.xml` |
| Project file | `public/BingSiteAuth.xml` |
| Fallback | Sibling repo `public/BingSiteAuth.xml` (same user code) |

## Files created / modified

| File | Purpose |
|------|---------|
| `public/BingSiteAuth.xml` | Bing Webmaster file verification |
| `src/data/contentDates.ts` | Shared lastmod constants |
| `scripts/generate-sitemap.ts` | Data-driven routes + lastmod |
| `public/sitemap.xml` | Regenerated output |
| `implementation/IMPLEMENTATION_STATUS.md` | Record verification/submission dates |

## Environment variables required

| Variable | Scope | Purpose |
|----------|-------|---------|
| `VITE_SITE_URL` | Build | Absolute sitemap URLs |

## Test plan

1. `https://<deployed-host>/BingSiteAuth.xml` returns the XML after deploy
2. Bing Webmaster Tools accepts file verification for the property
3. Sitemap URL submitted in Bing matches GSC
4. `robots.txt` Sitemap matches production host

## Out of scope

- Creating Google/Bing accounts (user)
- DNS registrar changes (user) unless credentials provided
- IndexNow automation (optional later)
