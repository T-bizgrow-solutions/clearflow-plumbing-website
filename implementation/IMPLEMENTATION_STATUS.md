---
name: Implementation status
overview: Onboarding scope and plan tracker for ClearFlow Plumbing Website.
status: in-progress
approved_by_user: true
---

# Implementation status — ClearFlow Plumbing Website

**Onboarding date:** 2026-07-22  
**Scope confirmed:** 2026-07-25 — all relevant items approved  
**Build started:** 2026-07-25  
**Canonical domain:** https://clearflowpm.com (target)  
**GitHub:** https://github.com/T-bizgrow-solutions/clearflow-plumbing-website

## Scope tracker

| # | Item | Plan file | Status |
|---|------|-----------|--------|
| 1 | Public marketing site | `SITE_MIGRATION_PLAN.md` | complete |
| 2 | Contact + GDPR + n8n + API | `N8N_WEBHOOK_PLAN.md` | code complete — needs `N8N_WEBHOOK_URL` in Vercel |
| 3 | Design system / tokens | `DESIGN_SYSTEM_PLAN.md` | complete |
| 4 | Accessibility pass | `ACCESSIBILITY_PLAN.md` | complete (baseline) |
| 5 | SEO / AEO / GEO | `SEO_AEO_GEO_PLAN.md` | complete (content + JSON-LD) |
| 6 | Sitemap + GSC + Bing | `SITEMAP_SEARCH_CONSOLE_BING_PLAN.md` | sitemap done — GSC/Bing manual |
| 7 | Vercel deploy + env | `VERCEL_DEPLOYMENT_PLAN.md` | project live — add n8n/Sentry secrets |
| 8 | Sentry | `SENTRY_GUIDE.md` | SDK wired — needs `VITE_SENTRY_DSN` |
| 9 | GitHub issues + labels | `GITHUB_ISSUES_GUIDE.md` | labels synced |
| 10 | Linear project | `LINEAR_PROJECT_PLAN.md` | created |
| 11 | GitHub Actions CI | `GITHUB_ACTIONS_CI_PLAN.md` | workflow added |
| 12 | Articles / insights | `ARTICLES_PLAN.md` | complete (3 posts) |
| 13 | Location pages | `LOCATION_PAGES_PLAN.md` | complete (6 areas) |

## Shipped in this build

- Contact form: first/last name, GDPR, Zod + RHF, `POST /api/submit-contact`
- Design tokens doc + CSS variables
- FAQ accordion (DOM-preserved) + areas served
- JSON-LD (Organization, LocalBusiness, FAQ, Service, Article, locations)
- `/insights` + 3 articles; `/locations` + 6 area pages
- Data-driven sitemap (21 URLs) + `public/llms.txt`
- Sentry init (DSN-gated)
- GitHub label sync (26 labels)
- CI workflow (`.github/workflows/ci.yml`)
- Deploy notes in `implementation/DEPLOY_NOTES.md`

## Manual follow-ups (need you)

- [ ] Set `N8N_WEBHOOK_URL` (+ optional `N8N_WEBHOOK_SECRET`) in Vercel
- [ ] Set `VITE_SENTRY_DSN` in Vercel; create Sentry → Linear alert after Linear project exists
- [ ] Add `LINEAR_API_KEY` to `.env.local` and run `npm run linear:create-project`
- [ ] Import repo to Vercel (or approve CLI link) and deploy
- [ ] Push latest commits to GitHub so CI runs
- [ ] Choose GSC/Bing verification method and provide tokens if meta/file
- [ ] Confirm location list + article topics/author with client
- [ ] Confirm Josh photo + project mapping; reviews replacement for Elfsight
- [ ] DNS cutover for `clearflowpm.com` when ready

## Linear project

- **Name:** ClearFlow Plumbing Website  
- **URL:** https://linear.app/bizgrow-solutions/project/clearflow-plumbing-website-616840438d7a  
- **Team:** BizGrow Solutions (`BIZ`)

## Vercel project

- **Name:** `clearflow-plumbing-website`  
- **Team:** tyler-9558s-projects  
- **Project ID:** `prj_1X9KOL6bhsNa0KWab8Sz2gG7DGKF`  
- **GitHub:** connected to `T-bizgrow-solutions/clearflow-plumbing-website`  
- **Production domain:** https://clearflow-plumbing-website.vercel.app  
- **Inspect:** https://vercel.com/tyler-9558s-projects/clearflow-plumbing-website  
- **Env set:** `VITE_SITE_URL` (production)

## Verification

- `npm run typecheck` — pass
- `npm run lint` — pass
- `npm run build` — pass
- `npm run generate:sitemap` — 21 URLs
- `npm run sync:labels` — synced
