# Deploy notes — ClearFlow Plumbing

Canonical production domain: **https://clearflowpm.com**

## 1. Import the project on Vercel

1. Sign in to the BizGrow Vercel team.
2. **Add New… → Project** → import `T-bizgrow-solutions/clearflow-plumbing-website`.
3. Confirm settings:
   - Framework: Vite (auto-detected)
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node.js: **20.x**
   - Production branch: `main`
4. Deploy a preview first; do not point DNS until smoke tests pass.

`vercel.json` already configures SPA rewrites (excluding `/api/`) and trailing-slash redirects.

## 2. Environment variables

Set in Vercel → Project → Settings → Environment Variables.

| Variable | Preview | Production | Notes |
|----------|---------|------------|-------|
| `VITE_SITE_URL` | Preview URL or `https://clearflowpm.com` | `https://clearflowpm.com` | Canonical absolute URLs for meta/OG/sitemap |
| `N8N_WEBHOOK_URL` | Test webhook | Production webhook | Server-only — contact API |
| `N8N_WEBHOOK_SECRET` | Optional | Optional | Sent as `X-Webhook-Secret` |
| `VITE_SENTRY_DSN` | Optional | When Sentry live | Client DSN only |

Local scripts (not Vercel):

| Variable | File | Purpose |
|----------|------|---------|
| `LINEAR_API_KEY` | `.env.local` only | `npm run linear:*` |
| `LINEAR_TEAM_ID` | `.env.local` | Optional team override |
| `LINEAR_PROJECT_NAME` | `.env.local` | Default: ClearFlow Plumbing Website |

Never commit `.env.local`. Never prefix secrets with `VITE_` unless they are safe for the client bundle.

## 3. Pre-cutover checklist

- [ ] Preview deploy succeeds
- [ ] `/`, `/services`, `/services/*`, `/projects`, `/insights`, `/insights/*`, `/locations`, `/locations/*` deep-link on refresh
- [ ] `/api/submit-contact` returns JSON (not `index.html`) when webhook env is set
- [ ] View-source / built HTML shows expected `VITE_SITE_URL` in canonical/OG where prerendered; client meta updates on navigation
- [ ] `public/robots.txt` Sitemap line points at `https://clearflowpm.com/sitemap.xml`
- [ ] Run `npm run generate:sitemap` after content/route changes; commit `public/sitemap.xml`
- [ ] No webhook secrets in client JS (`grep` built assets)

## 4. DNS cutover (client / registrar)

When the client is ready to leave WordPress (or the current host):

1. In Vercel → Domains, add `clearflowpm.com` and `www.clearflowpm.com`.
2. Prefer apex → Vercel via registrar DNS (A / ALIAS / ANAME per Vercel docs) and `www` as CNAME to Vercel.
3. Decide www vs apex canonical; keep `VITE_SITE_URL` matching the chosen host; redirect the other.
4. Wait for SSL to provision (Vercel automatic).
5. Smoke-test production URLs and contact form.
6. Submit sitemap in Google Search Console and Bing Webmaster Tools (see `SITEMAP_SEARCH_CONSOLE_BING_PLAN.md`).
7. Record cutover date in `IMPLEMENTATION_STATUS.md`.

## 5. Rollback

- Vercel → Deployments → promote previous production deployment.
- DNS TTL: lower before cutover if possible; raise after stability.

## 6. CI note

GitHub Actions (`.github/workflows/ci.yml`) builds with `VITE_SITE_URL=https://clearflowpm.com`. Enable the workflow as a required status check on `main` in GitHub branch protection (manual admin step).
