---
name: Implementation status
overview: Onboarding scope and plan tracker for ClearFlow Plumbing Website.
status: in-progress
approved_by_user: true
---

# Implementation status — ClearFlow Plumbing Website

**Onboarding date:** 2026-07-22  
**Scope confirmed:** 2026-07-25 — all relevant items approved  
**Last status update:** 2026-07-25  
**Canonical domain (target):** https://clearflowpm.com  
**Live preview:** https://clearflow-plumbing-website.vercel.app  
**GitHub:** https://github.com/T-bizgrow-solutions/clearflow-plumbing-website

---

## Done (code / tooling)

| # | Item | Plan | Notes |
|---|------|------|-------|
| 1 | Public marketing site | `SITE_MIGRATION_PLAN.md` | Home, services, projects, SPA routing |
| 2 | Contact form + GDPR + API proxy | `N8N_WEBHOOK_PLAN.md` | Code complete; webhook URL not set yet |
| 3 | Design system / tokens | `DESIGN_SYSTEM_PLAN.md` | Tokens + CSS variables + docs |
| 4 | Accessibility baseline | `ACCESSIBILITY_PLAN.md` | Form a11y, focus, nav Esc, hero live region |
| 5 | SEO / AEO / GEO (in-repo) | `SEO_AEO_GEO_PLAN.md` | FAQ, areas, JSON-LD, meta/twitter, `llms.txt` |
| 6a | Sitemap generation | `SITEMAP_SEARCH_CONSOLE_BING_PLAN.md` | 21 URLs, data-driven, robots.txt |
| 6b | Bing auth file in repo | same | `public/BingSiteAuth.xml` from shared store |
| 7a | Vercel project + prod deploy | `VERCEL_DEPLOYMENT_PLAN.md` | GitHub connected; `VITE_SITE_URL` set |
| 8a | Sentry SDK wiring | `SENTRY_GUIDE.md` | Init gated on DSN; DSN not set yet |
| 9 | GitHub labels | `GITHUB_ISSUES_GUIDE.md` | 26 labels synced |
| 10 | Linear project | `LINEAR_PROJECT_PLAN.md` | Created under BizGrow Solutions |
| 11 | GitHub Actions CI | `GITHUB_ACTIONS_CI_PLAN.md` | `.github/workflows/ci.yml` on `main` |
| 12 | Articles / insights | `ARTICLES_PLAN.md` | `/insights` + 3 posts |
| 13 | Location pages | `LOCATION_PAGES_PLAN.md` | `/locations` + 6 areas |

### Also done

- Shared Bing store: `~/CODING - TRW /_shared/seo/BingSiteAuth.xml`
- DevArchitecture SEO amended for shared Bing file workflow
- Local verification: typecheck, lint, build, sitemap generate, label sync

---

## Not done (blocked on you / client / accounts)

| # | Item | Why it’s waiting |
|---|------|------------------|
| 2b | Live contact → n8n | Need `N8N_WEBHOOK_URL` (+ optional secret) in Vercel |
| 6c | Google Search Console | Need verification method + dashboard submit |
| 6d | Bing Webmaster dashboard | File is in repo; property + sitemap submit still manual |
| 7b | Remaining Vercel env | n8n + Sentry secrets |
| 7c | DNS cutover to `clearflowpm.com` | Client/DNS approval |
| 8b | Sentry project + DSN | Need `VITE_SENTRY_DSN` in Vercel |
| 8c | Sentry → Linear alert | Needs Sentry project + alert rule pointing at Linear |
| — | Client content sign-off | Photos, locations, articles, reviews widget |

---

## Manual checklist (your remaining work)

### Integrations / env (Vercel → Project → Settings → Environment Variables)

- [ ] Add **`N8N_WEBHOOK_URL`** (Production + Preview)
- [ ] Add **`N8N_WEBHOOK_SECRET`** if the n8n workflow expects `X-Webhook-Secret`
- [ ] Add **`VITE_SENTRY_DSN`** (Production + Preview), then redeploy
- [ ] Confirm contact form works end-to-end on production after n8n is set

### Sentry → Linear

- [ ] Create/select Sentry project for ClearFlow
- [ ] Install Sentry ↔ Linear integration
- [ ] Alert rule: new issue → Linear → team **BizGrow Solutions** → project **ClearFlow Plumbing Website**
- [ ] Smoke-test with a unique thrown error on the live site

### Search consoles (after you’re happy with the live URL)

**Google Search Console**

- [ ] Choose verification: DNS TXT (preferred) **or** meta tag **or** HTML file
- [ ] If meta/file: provide token so it can be added to the repo (or add yourself)
- [ ] Add property for canonical host
- [ ] Submit `https://<canonical>/sitemap.xml`
- [ ] Request indexing for `/` and key pages

**Bing Webmaster Tools**

- [ ] Confirm `https://clearflow-plumbing-website.vercel.app/BingSiteAuth.xml` loads (and again on `clearflowpm.com` after DNS)
- [ ] Add site / verify (file method or import from GSC)
- [ ] Submit the same sitemap URL as GSC

### Domain / go-live

- [ ] Point **`clearflowpm.com`** DNS at Vercel when ready
- [ ] Set production domain on the Vercel project
- [ ] Update/confirm `VITE_SITE_URL=https://clearflowpm.com` and redeploy
- [ ] Re-run GSC/Bing sitemap submit on the canonical domain

### Client / content decisions

- [ ] Confirm Josh Nehme photo is correct
- [ ] Confirm project photo mapping matches client expectations
- [ ] Confirm location list (6 areas) and article topics/author
- [ ] Decide reviews/testimonials replacement for Elfsight widget
- [ ] Optional: enable required CI checks on GitHub branch protection for `main`

### Already handled (do not redo)

- [x] Create Linear project  
- [x] Import/link Vercel + first production deploy  
- [x] Push code to GitHub / CI workflow present  
- [x] Add `BingSiteAuth.xml` to the repo  

---

## Links

| Resource | URL |
|----------|-----|
| GitHub | https://github.com/T-bizgrow-solutions/clearflow-plumbing-website |
| Vercel dashboard | https://vercel.com/tyler-9558s-projects/clearflow-plumbing-website |
| Production | https://clearflow-plumbing-website.vercel.app |
| Linear | https://linear.app/bizgrow-solutions/project/clearflow-plumbing-website-616840438d7a |
| Deploy notes | `implementation/DEPLOY_NOTES.md` |
