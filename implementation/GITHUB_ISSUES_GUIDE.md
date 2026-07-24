---
name: GitHub issues and label sync
overview: Add the BizGrow label taxonomy and idempotent sync script so ClearFlow work is tracked with consistent type/area/status labels.
status: planned
approved_by_user: true
todos:
  - id: labels-json
    content: Add scripts/github-labels.json with type, area, status, utility labels
    status: pending
  - id: sync-script
    content: Implement scripts/sync-github-labels.mjs (idempotent via gh api)
    status: pending
  - id: run-sync
    content: Run npm run sync:labels against T-bizgrow-solutions/clearflow-plumbing-website
    status: pending
  - id: seed-issues
    content: Open GitHub issues for remaining plan work with correct labels
    status: pending
---

# GitHub issues and label sync

## Goal

Enable structured GitHub issue tracking for ClearFlow using the DevArchitecture label taxonomy (type + area + optional status).

## Current state

- `package.json` has `sync:labels` → `node scripts/sync-github-labels.mjs` but **script file is missing**
- Repo exists: `T-bizgrow-solutions/clearflow-plumbing-website`
- No `.github/` label config yet
- Area labels should reflect this site: `landing-page`, `seo`, `accessibility`, `design`, `config`, `assets`, `infra`, plus plumbing-specific areas as needed (`contact-form`, `services`, `projects`, `articles`, `locations`)

## What we are building

1. **`scripts/github-labels.json`** — colours/descriptions for type, area, status, utility labels
2. **`scripts/sync-github-labels.mjs`** — create/update labels via `gh` API; idempotent
3. **Session habit** — run sync when labels change
4. **Seed issues** — one issue per major remaining workstream (optional but recommended after plans approved)

### Label taxonomy (required per issue)

- **1 type:** `task`, `bug`, `qa`, `blocked`, `docs`, `chore`
- **1 area:** from ClearFlow set above
- **0–1 status:** `needs-client-input`, `in-progress`, `ready-for-review`

## Files to create

| File | Purpose |
|------|---------|
| `scripts/github-labels.json` | Label definitions |
| `scripts/sync-github-labels.mjs` | Sync implementation |

## Files to modify

| File | Changes |
|------|---------|
| `package.json` | Confirm script path (already present) |
| `IMPLEMENTATION_STATUS.md` | Note labels synced |

## Environment variables required

| Variable | Scope | Purpose |
|----------|-------|---------|
| `GITHUB_REPO` | Optional | Override `owner/repo` for sync |

Auth via logged-in `gh` CLI (already available).

## Test plan

1. `npm run sync:labels` twice — second run no duplicates / no errors
2. Create a sample issue with type+area labels
3. Close sample with commit reference when done

## Out of scope

- Replacing Linear for production Sentry triage
- Full project board automation
- Migrating historical WordPress tickets
