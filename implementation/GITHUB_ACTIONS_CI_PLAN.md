---
name: GitHub Actions CI
overview: Add a CI workflow that typechecks, lints, and builds the ClearFlow Vite app on pull requests and main pushes.
status: planned
approved_by_user: true
todos:
  - id: workflow-file
    content: Add .github/workflows/ci.yml with Node 20, npm ci, lint, typecheck, build
    status: pending
  - id: sitemap-check
    content: Optionally regenerate sitemap in CI and fail if public/sitemap.xml drifts
    status: pending
  - id: branch-protection-notes
    content: Document enabling required status checks on main (manual GitHub setting)
    status: pending
---

# GitHub Actions CI

## Goal

Catch TypeScript, lint, and build failures before they reach production by running checks on every PR and push to `main`.

## Current state

- No `.github/workflows/` directory
- Local scripts: `lint`, `typecheck`, `build`, `generate:sitemap`
- Hosted on GitHub under `T-bizgrow-solutions/clearflow-plumbing-website`

## What we are building

1. **Workflow** — checkout, setup Node 20, `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`
2. **Env for build** — set `VITE_SITE_URL` to production canonical for deterministic meta in build artifacts
3. **Optional drift check** — run `generate:sitemap` and `git diff --exit-code public/sitemap.xml`
4. **Docs** — note that required checks are enabled in GitHub branch protection (user/admin action)

## Files to create

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | CI pipeline |

## Files to modify

| File | Changes |
|------|---------|
| `IMPLEMENTATION_STATUS.md` | CI live + protection notes |

## Environment variables required

| Variable | Scope | Purpose |
|----------|-------|---------|
| `VITE_SITE_URL` | CI env | Canonical URL during `vite build` |

No secrets required for basic CI. Sentry upload tokens only if source-map upload added later.

## Test plan

1. Open a PR with a deliberate type error → CI fails
2. Fix → CI green
3. Confirm `main` push runs the same workflow

## Out of scope

- Deploy-from-Actions (Vercel Git integration handles deploys)
- E2E Playwright suite (can add later)
- Dependency review / CodeQL (optional later)
