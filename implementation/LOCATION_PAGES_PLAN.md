---
name: Location / suburb landing pages
overview: Add SEO-focused location pages for ClearFlow service areas with shared templates, unique copy hooks, and sitemap inclusion.
status: planned
approved_by_user: true
todos:
  - id: location-data
    content: Define location content model and initial suburb/area list with client confirmation
    status: pending
  - id: location-routes
    content: Add /locations index and /locations/:slug pages in App.tsx
    status: pending
  - id: unique-copy
    content: Write non-duplicate intro + local proof points per location (no thin doorway pages)
    status: pending
  - id: internal-links
    content: Link from home areas-served, services, footer, and relevant projects
    status: pending
  - id: seo-sitemap
    content: Location meta, LocalBusiness areaServed signals, sitemap entries
    status: pending
---

# Location / suburb landing pages

## Goal

Capture local search intent (“plumber in [suburb]”) with genuine, non-spammy location pages that reinforce ClearFlow’s service area and link into services/contact.

## Current state

- `site.serviceArea` is a single string in content
- Projects may include a `location` string but there is no `/locations` route
- Strong candidate for SEO Stage 2 “suburb/location landing pages” add-on (approved via “do all”)

## What we are building

1. **Routes**
   - `/locations` — index of areas served
   - `/locations/{slug}` — suburb/area page
2. **Content model** — name, slug, region blurb, services emphasised, nearby project refs, FAQ subset if useful
3. **Template** — shared layout: intro, services CTAs, projects filtered by area when possible, contact CTA
4. **Quality bar** — unique intros; no spun duplicate pages; start with a focused set (propose 6–10) not 100 thin pages
5. **SEO** — unique title/description; `areaServed` in JSON-LD; sitemap + internal links

### Proposed initial set (confirm with client)

Examples to validate against real jobs/service coverage: Sydney CBD, North Shore, Eastern Suburbs, Inner West, Northern Beaches, Hills District — or suburb-level if preferred (Chatswood, Double Bay, Potts Point, Riverview already appear in project assets).

## Files to create

| File | Purpose |
|------|---------|
| `src/data/locations.ts` | Location entries + helpers |
| `src/components/locations/LocationsIndexPage.tsx` | Index |
| `src/components/locations/LocationDetailPage.tsx` | Detail |

## Files to modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Routing |
| `src/data/content.ts` | Nav/footer / areas-served block |
| `scripts/generate-sitemap.ts` | Location URLs |
| JSON-LD builders | `areaServed` |

## Environment variables required

| Variable | Scope | Purpose |
|----------|-------|---------|
| `VITE_SITE_URL` | Build | Canonical URLs |

## Test plan

1. Index + detail render; unknown slug → 404
2. Each page has unique `<title>` / description
3. Sitemap lists all location URLs
4. Manual review: no two pages share the same body paragraph

## Out of scope

- Programmatic generation of 50+ thin suburb pages
- Google Business Profile API sync
- Paid local ads landing variants
