---
name: Linear project for ClearFlow
overview: Create the BizGrow Linear project for clearflow-plumbing-website and wire scripts + Sentry alert targeting.
status: planned
approved_by_user: true
todos:
  - id: linear-script
    content: Add scripts/create-linear-project.mjs supporting teams + create-project commands
    status: pending
  - id: env-local
    content: Ensure LINEAR_API_KEY lives only in .env.local (never committed)
    status: pending
  - id: create-project
    content: Run npm run linear:create-project for ClearFlow Plumbing Website
    status: pending
  - id: status-row
    content: Record project URL in IMPLEMENTATION_STATUS.md (and DevArchitecture known projects when convenient)
    status: pending
  - id: sentry-target
    content: Use this project as Sentry → Linear alert destination
    status: pending
---

# Linear project for ClearFlow

## Goal

Give ClearFlow a dedicated Linear project under BizGrow Solutions for roadmap visibility and Sentry alert routing.

## Current state

- `package.json` scripts `linear:teams` / `linear:create-project` point at missing `scripts/create-linear-project.mjs`
- `.env.example` documents `LINEAR_API_KEY`, `LINEAR_TEAM_ID`, `LINEAR_PROJECT_NAME`
- Status file: Linear project not created
- Workspace: BizGrow Solutions (`BIZ`) — https://linear.app/bizgrow-solutions

## What we are building

1. Port/adapt BizGrow `create-linear-project.mjs` for this repo
2. Default project name: `ClearFlow Plumbing Website` (overridable via `LINEAR_PROJECT_NAME`)
3. Create project attached to BizGrow Solutions team
4. Document URL in `IMPLEMENTATION_STATUS.md`
5. Point Sentry alert rule at this project (after Sentry plan)

### Tooling split (DevArchitecture)

| Use case | Tool |
|----------|------|
| Planned work / bugs / QA | GitHub issues + labels |
| Production errors from Sentry | Linear |
| Cross-repo roadmap | Linear projects |

## Files to create

| File | Purpose |
|------|---------|
| `scripts/create-linear-project.mjs` | teams + create-project |

## Files to modify

| File | Changes |
|------|---------|
| `.env.example` | Keep key undocumented as real value; comments only |
| `IMPLEMENTATION_STATUS.md` | Project URL + date |

## Environment variables required

| Variable | Scope | Purpose |
|----------|-------|---------|
| `LINEAR_API_KEY` | Scripts only (`.env.local`) | Personal API key |
| `LINEAR_TEAM_ID` | Optional | Team override |
| `LINEAR_PROJECT_NAME` | Optional | Name override |

## Test plan

1. `npm run linear:teams` lists BizGrow Solutions
2. `npm run linear:create-project` creates project once; second run fails gracefully on duplicate name
3. Project visible in Linear UI

## Out of scope

- Syncing every GitHub issue into Linear
- Storing API keys in repo or Vercel (scripts are local)
