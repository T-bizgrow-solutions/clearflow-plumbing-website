# DevArchitecture.md

> **Agent instruction:** Read this file at the start of every session before making any changes. Then check `/implementation/` for any plan files relevant to the current task. Follow this document as the master architecture guide. Where this document references a decision that requires project-specific context, read the codebase to determine the correct interpretation before proceeding.

---

## 0. Project onboarding — run this first on any new project

> **Agent instruction:** When this file is loaded into a new project for the first time, or when the user says "set up this project" or "run onboarding", execute the onboarding flow below before doing anything else. Do not skip steps. Do not build anything until the checklist is complete and approved.

### Step 1 — Feature checklist

Ask the user the following questions one group at a time. Wait for a Y/N answer before continuing to the next group. Record all answers before proceeding to Step 2.

```
I'll walk you through the project setup. Answer Y or N for each item.
You can change your mind later — this just determines which plans we build.

--- BACKEND ---
[ ] Supabase connection (database + auth)
[ ] Admin backend / dashboard
[ ] User roles and access control (admin / client / user / banned)
[ ] Guest booking flow
[ ] Booking history and status tracking
[ ] Auth event logging (login/logout history)
[ ] Edge functions (ban-user, guest-booking, log-auth-event)
[ ] Reporting and CSV export

--- FRONTEND ---
[ ] Public marketing / landing page
[ ] Multi-step form or modal (e.g. audit, booking, lead capture)
[ ] Client dashboard (/app/*)
[ ] GDPR consent on forms
[ ] Accessibility audit pass
[ ] Front-end design system / token setup
[ ] SEO / AEO / GEO optimisation (search, answer engines, generative engines)

--- INTEGRATIONS ---
[ ] n8n webhook integration
[ ] Sentry error tracking
[ ] GitHub issues and label sync
[ ] Linear project and issue tracking
[ ] Vercel serverless proxy (for external API calls)
[ ] Third-party embed (Calendly, booking widget, etc.)

--- DEVOPS ---
[ ] GitHub Actions / CI pipeline
[ ] Deployment to Vercel
[ ] Environment variable setup (.env.example)
[ ] Commit conventions and branch strategy
```

### Step 2 — Confirm scope

After collecting all Y/N answers, present a summary:

```
Here is what we'll build based on your answers:

INCLUDED:
- [list of Y items]

EXCLUDED (can add later):
- [list of N items]

Does this look right? Reply YES to continue, or tell me what to change.
```

Do not proceed until the user confirms.

### Step 3 — Build implementation plans one at a time

For each included item, follow this exact sequence before moving to the next:

```
1. Tell the user: "I'm going to write the implementation plan for [ITEM] now."
2. Write the plan to /implementation/[PLAN_NAME].md
3. Present the plan to the user and ask: "Does this plan look right? 
   Reply APPROVE to start building, REVISE to change something, 
   or SKIP to move on without building this now."
4. If APPROVE → build the feature, then ask: 
   "Done. Should I mark this complete and move to the next item?"
5. If REVISE → update the plan and re-present it. Repeat until approved.
6. If SKIP → note it in IMPLEMENTATION_STATUS.md and move to the next item.
7. Never start the next item until the current one is approved and built.
```

**One item at a time. No exceptions.**

### Step 4 — Create IMPLEMENTATION_STATUS.md

After all items are processed, write `/implementation/IMPLEMENTATION_STATUS.md` with:
- All included items and their current status (planned / in progress / complete / skipped)
- Date onboarding was run
- Any decisions or constraints the user confirmed during onboarding

---

## 1. Project philosophy

This project follows a **plan-first, implement-second** approach. No feature, integration, or refactor is implemented without a corresponding plan in `/implementation/`. Plans are living documents — update them as implementation decisions are made.

Cursor agents must:
- Read relevant `/implementation/*.md` files before touching related code
- Update plan `todos` status as tasks are completed
- Never silently skip errors — surface them with context
- Prefer explicit over implicit: name variables, functions, and files descriptively
- Never expose secrets, env vars, or webhook URLs to the client bundle
- Never start building the next item until the current one is approved

---

## 2. Repository structure

> **Agent instruction:** If this structure does not match the current repo, read the actual directory tree and reconcile before proceeding. The structure below is the target — not necessarily the current state.

```
/
├── app/                        # Framework pages and routes (Next.js App Router or equivalent)
│   ├── (auth)/                 # Auth routes: login, signup, forgot/reset password, callback
│   ├── (public)/               # Public-facing pages: landing, booking, contact
│   ├── admin/                  # Admin dashboard routes
│   └── api/                    # API route handlers and serverless functions
├── components/
│   ├── dashboard/              # Shared dashboard UI (shell, tables, pagination, notifications)
│   ├── admin/                  # Admin-specific components
│   ├── booking/                # Booking flow components
│   └── ui/                     # Base UI components (shadcn or equivalent)
├── lib/
│   ├── actions/                # Server actions
│   ├── supabase/               # DB client: client.ts, server.ts, middleware.ts
│   ├── validations/            # Zod schemas
│   └── types/                  # Generated and manual TypeScript types
├── supabase/
│   ├── migrations/             # SQL migration files (sequential, named)
│   └── functions/              # Edge Functions
├── scripts/                    # Automation scripts (label sync, SEO sync, etc.)
├── implementation/             # Plan files — one per feature/integration
│   ├── N8N_WEBHOOK_PLAN.md
│   ├── SENTRY_GUIDE.md
│   ├── GITHUB_ISSUES_GUIDE.md
│   └── IMPLEMENTATION_STATUS.md
├── .cursor/
│   └── rules                   # Cursor agent rules (points to this file)
├── .env.example                # Documented env vars — no real values
├── .env.local                  # Real values — gitignored
└── DevArchitecture.md          # This file
```

---

## 3. Implementation plan template

> **Agent instruction:** Every plan written to `/implementation/` must follow this structure. Do not create a plan without all required sections.

```markdown
---
name: [Feature name]
overview: [One sentence describing what this plan covers and why]
status: planned | in-progress | complete | skipped
approved_by_user: false
todos:
  - id: [kebab-case-id]
    content: [What to do]
    status: pending | completed
---

# [Feature name]

## Goal
[What we are building and why. One short paragraph.]

## Current state
[What exists today in the codebase. Read the repo before writing this section.]

## What we are building
[Detailed description of the feature, broken into logical parts.]

## Files to create
| File | Purpose |

## Files to modify
| File | Changes |

## Environment variables required
| Variable | Scope | Purpose |

## Test plan
[How to verify this works end to end.]

## Out of scope
[Explicitly list what is NOT being built in this plan.]
```

---

## 4. Environment variables

> **Agent instruction:** Never hardcode secrets. Never prefix server-only vars with `VITE_` or `NEXT_PUBLIC_`. If an env var is missing from `.env.local`, stop and ask the user to provide it rather than guessing.

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Supabase anon key (RLS enforced) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Admin DB access — never expose client-side |
| `N8N_WEBHOOK_URL` | Server only | n8n webhook endpoint |
| `N8N_WEBHOOK_SECRET` | Server only | Optional shared secret for webhook auth |
| `VITE_SENTRY_DSN` | Build time | Sentry error tracking DSN |
| `GITHUB_REPO` | CI / scripts | `owner/repo` override for label sync |
| `LINEAR_API_KEY` | Scripts only | Personal API key for `npm run linear:*` — **never commit** |
| `LINEAR_TEAM_ID` | Scripts only | Optional team override (default: first team in workspace) |
| `LINEAR_PROJECT_NAME` | Scripts only | Optional override for `npm run linear:create-project` |

All variables must be documented in `.env.example`. When adding a new variable, update `.env.example` first.

**Linear API key (local scripts only):** Store in `.env.local`, not in this file or any committed doc. Create at Linear → Settings → Account → API → Personal API keys. The BizGrow workspace team is **BizGrow Solutions (BIZ)** at `linear.app/bizgrow-solutions`.

---

## 5. Auth and access control

> **Agent instruction:** Read the actual middleware and role definitions in the codebase before implementing any auth-related change. The role system below is the intended design — verify it matches the implementation.

### Role model

| Role | How assigned | Access |
|------|--------------|--------|
| `user` | Signs up without booking | Profile only |
| `client` | Completes first booking | Client dashboard |
| `admin` | Manually promoted | Full admin access |
| `banned` | Admin action | Blocked at middleware and RLS |

### Route protection

- `/admin/*` — admin only
- `/app/*` — client or admin
- Authenticated routes — any non-banned authenticated user
- Public routes — unauthenticated allowed

### Auth event logging

Login, logout, and OAuth callbacks must write to `login_history` and `auth_sessions`. This is done via a server action calling the `log-auth-event` edge function. Do not rely on client-side logging for auth events.

---

## 6. Database conventions

> **Agent instruction:** Before writing a migration, check `/supabase/migrations/` for the most recent migration number and increment accordingly. Never modify existing migrations — always write a new one.

- All tables use `uuid` primary keys
- All tables have `created_at` and `updated_at` (timestamptz)
- RLS is enabled on every table — no exceptions
- Role checks use a `get_user_role()` helper function, not inline subqueries
- Status history is recorded for bookings (insert + every update)
- Audit log entries are written from server actions and edge functions for: schedule, cancel, role change, ban

### Migration naming convention

```
YYYYMMDDHHMMSS_description_of_change.sql
```

---

## 7. API and webhook design

### Vercel serverless proxy pattern

Browser requests never call external APIs (n8n, third-party services) directly. All external calls go through a Vercel serverless function in `/api/`. This prevents CORS issues and keeps secrets server-side.

```
Browser → POST /api/submit-audit → Vercel function → POST N8N_WEBHOOK_URL (server-side)
```

### Webhook security

When `N8N_WEBHOOK_SECRET` is set, send it as `X-Webhook-Secret` in the forwarded request. The n8n workflow should validate this header before processing.

### Payload conventions

All webhook payloads must include:
- `submittedAt` — ISO 8601 timestamp
- `source` — identifying string (e.g. `"website-audit-modal"`)

### Server-side validation

Client-side validation is bypassable. Every API route must re-validate the request body server-side using the same Zod schema as the frontend.

---

## 8. GitHub issues and labels

> **Agent instruction:** At the start of every session, run `npm run sync:labels` if the required labels are missing from the repo. Check `scripts/github-labels.json` for the label definitions.

### Label taxonomy

Every issue requires:
- **1 type label:** `task`, `bug`, `qa`, `blocked`, `docs`, `chore`
- **1 area label:** `landing-page`, `seo`, `calendly`, `accessibility`, `design`, `config`, `assets`, `infra`
- **0–1 status labels:** `needs-client-input`, `in-progress`, `ready-for-review`

Utility labels (`duplicate`, `invalid`, `wontfix`, `help needed`) are applied as needed.

### Label sync

```bash
npm run sync:labels
```

This is idempotent — safe to run multiple times.

### Issue lifecycle

Open issues with `task` type for all planned work. Close with a commit reference. Use `blocked` when waiting on external input. Use `help needed` when multiple fix attempts have failed — always comment with what was tried and why it failed.

---

## 9. Linear project tracking

> **Agent instruction:** Linear is used for issue tracking and Sentry alert routing. Do **not** store `LINEAR_API_KEY` in this file, `.env.example`, or any committed file — only in `.env.local` (gitignored).

### Workspace

| Field | Value |
|-------|-------|
| Workspace | BizGrow Solutions |
| URL | https://linear.app/bizgrow-solutions |
| Default team | BizGrow Solutions (`BIZ`) |

### Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `LINEAR_API_KEY` | Yes (for scripts) | Personal API key — `lin_api_...` from Linear → Settings → Account → API |
| `LINEAR_TEAM_ID` | No | Team UUID if workspace has multiple teams |
| `LINEAR_PROJECT_NAME` | No | Override default project name when creating via script |

### Scripts (per repo)

Each BizGrow repo that uses Linear should include `scripts/create-linear-project.mjs` and these npm scripts:

```bash
npm run linear:teams          # List teams and IDs
npm run linear:create-project # Create project for this repo
```

The script reads `.env.local`, calls the Linear GraphQL API, and attaches the project to the configured team. Re-run is safe only if the project does not already exist (Linear will reject duplicate names).

### Known projects

| Repo | Linear project | URL |
|------|----------------|-----|
| `BizGrow-AI-Automation` | BizGrow AI Automation | https://linear.app/bizgrow-solutions/project/bizgrow-ai-automation-daac2bab9d10 |
| `BizGrow-Copywriting-Website` | BizGrow Copywriting Website | https://linear.app/bizgrow-solutions/project/bizgrow-copywriting-website-a5846f004ef1 |

When onboarding a new repo, create its Linear project and add a row to this table.

### Sentry → Linear (Team plan)

On Sentry **Team**, auto-create **GitHub** issues requires Business. Use **Sentry → Linear** instead:

1. Install Sentry ↔ Linear integration in both products (OAuth — no API key in env).
2. Create a Linear project for the repo (manual or `npm run linear:create-project`).
3. In Sentry → Alerts → create rule: **When** a new issue is created → **Then** Create a Linear issue → select team **BizGrow Solutions** and the repo's Linear project.
4. Optional filter: `environment:production`.
5. Smoke test on the live site:

```javascript
setTimeout(() => { throw new Error('Sentry → Linear test ' + Date.now()); }, 0);
```

Verify the issue appears in Sentry and in the correct Linear project.

### Linear vs GitHub issues

| Use case | Tool |
|----------|------|
| Planned work, bugs, QA during development | GitHub issues + `npm run sync:labels` |
| Production error triage from Sentry | Linear (via Sentry alert) |
| Cross-repo visibility in Linear roadmap | Linear projects (one per repo) |

---

## 10. Error tracking (Sentry)

> **Agent instruction:** Read `implementation/SENTRY_GUIDE.md` before making any changes to error handling or Sentry configuration.

### Key rules

- Sentry is initialised in `src/routes/__root.tsx` (primary) and `src/router.tsx` (secondary)
- `package.json` must include `sideEffects` for `sentry.client.ts` to prevent tree-shaking
- Server-side DSN reads `process.env.VITE_SENTRY_DSN || import.meta.env.VITE_SENTRY_DSN`
- Configure the Sentry alert rule (Linear or GitHub, per plan tier) before the first console test
- Use `setTimeout(() => { throw new Error("Unique message " + Date.now()) }, 0)` for repeat testing

### Setup order

1. Sentry account + DSN in Vercel env
2. Linear or GitHub integration + alert rule (see Section 9 for Linear on Team plan)
3. SDK wired in codebase
4. Deploy preview + console test
5. Verify Sentry issue + Linear/GitHub issue created
6. Merge to main
7. Production smoke test

---

## 11. Frontend conventions

### Design system

- Follow the existing design token system (`DESIGN_TOKENS.md` or `src/styles.css`)
- Do not introduce new color values without updating design tokens
- Use existing component variants before creating new ones
- Sentence case on all UI labels — never Title Case or ALL CAPS

### Form handling

- React Hook Form + Zod for all forms
- Validate on the server as well as the client
- GDPR consent checkbox is required on any form that collects personal data
- Collect `firstName` and `lastName` as separate fields — not `fullName`

### CTA consistency

- Extract CTA button into a shared component with variants
- Submit button copy should match the user's intended outcome, not generic labels like "Submit"

### Accessibility

- All `<section>` elements need `aria-labelledby` pointing to their heading
- Animations must respect `prefers-reduced-motion`
- Focus states must be visible on all interactive elements
- Content must not start at `opacity: 0` without a noscript fallback

---

## 12. n8n webhook integration

> **Agent instruction:** Read `implementation/N8N_WEBHOOK_PLAN.md` for full implementation details before modifying any webhook-related code.

### Flow

```
User form → Modal (client) → lib/submit.ts → POST /api/submit (Vercel) → n8n webhook
```

### Required payload fields

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "gdprConsent": true,
  "submittedAt": "ISO8601",
  "source": "string"
}
```

---

## 13. Backend architecture (Supabase)

> **Agent instruction:** Read `implementation/IMPLEMENTATION_BACKEND.md` for full schema, RLS policies, and phase-by-phase implementation details before modifying any database or auth code.

### Edge functions

| Function | Purpose |
|----------|---------|
| `log-auth-event` | Records login/logout to `login_history` and `auth_sessions` |
| `create-guest-booking` | Creates booking + auto-provisions user account |
| `ban-user` | Sets banned role, records reason, revokes sessions |

### Supabase client usage

- `lib/supabase/client.ts` — browser client (anon key)
- `lib/supabase/server.ts` — server component client
- Service role key — edge functions only, never client-side

---

## 14. Admin data pipeline

> **Agent instruction:** Empty admin tables are usually a data pipeline issue, not a permissions issue. Check the cause table below before debugging RLS.

| Page | Common cause of empty data |
|------|---------------------------|
| Login history | `log-auth-event` not wired to auth callback |
| Booking history | Trigger only fires on UPDATE — initial status not recorded |
| Clients page | Filter requires `role = 'client'` — may need backfill migration |
| Appointment sessions | Only created when status moves to `in_progress` |

Never use `data ?? []` without checking `error`. Admin pages must render an error banner on query failure.

---

## 15. Deployment checklist

Before merging to main or deploying to production:

- [ ] All env vars set in Vercel (production + preview)
- [ ] `npm run sync:labels` run if labels changed
- [ ] Sentry alert rule configured and tested (Linear or GitHub)
- [ ] Linear project exists for this repo (if using Sentry → Linear)
- [ ] RLS tested: client cannot read another client's data
- [ ] Webhook URL not visible in browser network tab or JS bundle
- [ ] `.env.example` up to date
- [ ] `IMPLEMENTATION_STATUS.md` updated
- [ ] All implementation plan `todos` marked complete or deferred
- [ ] Final sitemap freshness gate complete: public routes reviewed, `lastmod` values updated from real content dates, `sitemap.xml` regenerated, `robots.txt` points to the canonical sitemap, and Google Search Console / Bing follow-ups recorded

---

## 16. Implementation plan index

> **Agent instruction:** Before starting any task, check whether a plan already exists in `/implementation/`. If it does, read it. If it does not, follow the onboarding flow in Section 0 to create one. For SEO / AEO / GEO work, use Section 18 as the master reference when creating `SEO_AEO_GEO_PLAN.md`. For sitemap generation, Google Search Console, Bing Webmaster Tools, or route/content freshness work, create or read `SITEMAP_SEARCH_CONSOLE_BING_PLAN.md`. For insights/articles content, hero assets, or article UI/SEO, use Section 20 and read `ARTICLES_PLAN.md`.

| Plan file | Covers |
|-----------|--------|
| `N8N_WEBHOOK_PLAN.md` | Vercel proxy, form fields, GDPR, n8n workflow setup |
| `SENTRY_GUIDE.md` | Sentry SDK setup, alert rules, GitHub integration, testing |
| `GITHUB_ISSUES_GUIDE.md` | Label taxonomy, issue workflow, session start checklist |
| `IMPLEMENTATION_BACKEND.md` | Full Supabase schema, RLS, auth, booking, admin dashboards |
| `SEO_AEO_GEO_PLAN.md` | SEO/AEO/GEO rollout — entity alignment, crawlability, AEO content, JSON-LD, sitemap, robots, Search Console, Bing Webmaster Tools |
| `SITEMAP_SEARCH_CONSOLE_BING_PLAN.md` | Sitemap generation/freshness, Google Search Console verification/submission, Bing Webmaster Tools verification/submission |
| `ARTICLES_PLAN.md` | Insights route — article data model, hero assets, block/markdown content, article UI, per-article OG/JSON-LD |
| `IMPLEMENTATION_STATUS.md` | Current phase completion status |

---

## 17. Session start checklist for agents

Run through this at the start of every session:

1. Read this file (`DevArchitecture.md`)
2. Read `implementation/IMPLEMENTATION_STATUS.md` to understand current state
3. Run `npm run sync:labels` if GitHub labels may be out of sync
4. Read any `/implementation/*.md` files relevant to the current task
5. Check for uncommitted changes — do not overwrite without understanding what is there
6. Confirm required env vars exist in `.env.local` before running anything that needs them (including `LINEAR_API_KEY` for Linear scripts)
7. After completing work, update the relevant plan file `todos` and `IMPLEMENTATION_STATUS.md`
8. If this is a new project with no `/implementation/` folder — run the onboarding flow in Section 0
9. If SEO / AEO / GEO work is in scope — read Section 18; create or read `/implementation/SEO_AEO_GEO_PLAN.md` before building
10. If articles / insights work is in scope — read Section 20; create or read `/implementation/ARTICLES_PLAN.md` before building
11. At the end of route, content, SEO, metadata, structured-data, or deployment work — run the final sitemap freshness gate in Section 19
12. If Bing XML verification is needed — copy `BingSiteAuth.xml` from `~/CODING - TRW /_shared/seo/` (see Section 18 Stage 9) into `public/`; never invent a new Bing user code

---

## 18. SEO / AEO / GEO optimisation

> **Agent instruction:** When onboarding includes SEO / AEO / GEO (Section 0), or the user asks to optimise for search, answer engines, or generative engines, follow this section. Write a project-specific plan to `/implementation/SEO_AEO_GEO_PLAN.md` using the template in Section 3. Read the codebase first — do not assume what already exists. The rollout is **content-first, code-second**: settle strategy and on-page content before mirroring it into structured data.

### What each layer targets

| Layer | Surfaces | Primary goal |
|-------|----------|--------------|
| **SEO** | Google, Bing organic | Rank for target keywords; correct indexing and technical health |
| **AEO** | Google AI Overviews, Perplexity, Bing Copilot | Be cited when users ask natural-language questions |
| **GEO** | ChatGPT, Gemini, Claude, other LLM crawlers | Consistent entity signals; authoritative content LLMs can reference |

### Order of operations

Work top to bottom. Do not start a stage until the previous stage is complete and (where noted) approved.

```
Strategy & entity alignment
    ↓
Agent site review + niche competitor research → propose additional items (approval gate)
    ↓
Crawlability / prerender
    ↓
FAQ + section content (AEO-first rewrites)
    ↓
Article route decision + first 2–3 posts (if chosen)
    ↓
JSON-LD (mirror final content)
    ↓
Sitemap lastmod + build-time generation
    ↓
robots.txt tweaks (optional)
    ↓
Google Search Console & Bing Webmaster Tools
    ↓
Final sitemap freshness gate
```

### Stage 1 — Strategy & entity alignment

Lock the foundation before touching content. Wrong canonical identity splits authority across domains and confuses crawlers and LLMs.

- Choose the single canonical production domain; set `NEXT_PUBLIC_SITE_URL` (or framework equivalent) to match the live host.
- Unify **NAP** (Name, Address, Phone) and brand/legal entity across content files, JSON-LD, footer, README, deployment docs, and smoke tests.
- Decide the canonical contact email; reconcile references across the repo (flag conflicts on pages owned by other agents — do not edit without approval).
- Add 301 redirects for non-canonical hosts (`www`, alternate domains) once DNS is decided.
- Confirm target keywords, service areas, and primary offers with the user.

### Stage 2 — Agent site review + niche competitor research (approval gate)

> **Agent instruction:** Before building content, the agent must (a) review the current live/built site end to end, and (b) research comparable sites in the same niche, then propose a prioritised list of additional items for the user to approve. Do not build additional items until approved.

1. **Site review** — record: indexable surface area, on-page content quality, heading hierarchy, internal linking, Core Web Vitals / performance signals, metadata, existing JSON-LD, sitemap/robots, and AEO/GEO gaps.
2. **Niche competitor research** — analyse **3–5 comparable sites** in the same industry and market. For each, capture: content structure (FAQs, articles, service pages, case studies), structured-data usage, freshness signals, and AEO/GEO patterns (question-led headings, comparison tables, `llms.txt`, review schema, author/byline).
3. **Proposal** — present quick wins vs bigger lifts, each mapped to SEO / AEO / GEO. Ask the user to APPROVE, REVISE, or SKIP. Fold approved items into the project plan and `IMPLEMENTATION_STATUS.md`.

### Stage 3 — Crawlability / prerender

Ensure content that matters is in the HTML crawlers and answer engines receive.

- **FAQ accordions:** keep all answers in the DOM (hide collapsed items with CSS / `hidden` / `inert` — do not unmount on collapse).
- Verify key marketing content is server-rendered / prerendered, not injected only after client hydration.
- Add missing favicon/icon assets referenced in metadata.
- Confirm `alternates.canonical`, `lang`/locale consistency, and explicit `viewport` where appropriate.

### Stage 4 — FAQ + section content (AEO-first rewrites)

Rewrite for how answer engines extract and cite content.

- Questions: natural-language, matching how users search.
- Answers: concise, self-contained, lead with the direct answer.
- Expand FAQ coverage (pricing, contracts, industries, service areas, key differentiators).
- Use question-style section headings where natural.
- Keep copy in a single source of truth (e.g. `content.ts` or CMS) so JSON-LD can mirror it verbatim.

### Stage 5 — Article route decision + first 2–3 posts (if chosen)

- Decide with the user whether to add an `/articles`, `/resources`, or `/blog` route. Largest content lift; biggest GEO opportunity.
- **If yes:** publish 2–3 pillar posts with visible author and date. Topics should match the business niche and target queries.
- **If no:** record the decision in `IMPLEMENTATION_STATUS.md` and skip to Stage 6.

### Stage 6 — JSON-LD (mirror final content)

Only after content is finalised — structured data must match the page verbatim.

| Schema | When to add | SEO | AEO | GEO |
|--------|-------------|-----|-----|-----|
| `FAQPage` | FAQs exist on site | ✓ | ✓ | ✓ |
| `Service` + `Offer` | Pricing/plans published | ✓ | ✓ | |
| `Organization` + `sameAs` | GBP, social profiles available | ✓ | | ✓ |
| `LocalBusiness` / `ProfessionalService` | Physical or service-area business | ✓ | | ✓ |
| `Article` / `BlogPosting` | Articles route added | ✓ | ✓ | ✓ |
| `WebPage` with `dateModified` | Any page with freshness signal | ✓ | ✓ | ✓ |

Prefer `@graph` with `@id` cross-references over a flat array. Generate JSON-LD from the same content source as the visible page — never hand-maintain duplicate copy.

**Do not add** `AggregateRating` / `Review` schema unless real, verifiable reviews exist.

### Stage 7 — Sitemap lastmod + build-time generation

- Wire **real per-route `lastModified`** (content dates, constants, or file mtime) — not build timestamp only.
- Extend sitemap for new routes (`/articles/*`, `/faq`, location pages, etc.).
- Use framework conventions (`sitemap.ts`, `sitemap.xml`, or static file) as appropriate.

### Stage 8 — robots.txt tweaks (optional)

- Point `Sitemap:` to the canonical sitemap URL.
- Decide AI crawler policy (`GPTBot`, `Google-Extended`, `anthropic-ai`, `ClaudeBot`, etc.) — allow for LLM visibility or block per user preference.
- Optionally add `llms.txt` at site root summarising services, pricing, FAQs, and contact.

### Stage 9 — Google Search Console & Bing Webmaster Tools

Run after the canonical domain is live, sitemap is deployed, and `robots.txt` points to it. Split work into **code/config** (agent) and **account setup** (user, unless credentials are provided).

#### Google Search Console

1. **Verify domain ownership** — preferred methods (in order):
   - DNS TXT record on the canonical host (best for apex + subdomains)
   - HTML meta tag in site `<head>` (e.g. `google-site-verification` in root layout metadata)
   - HTML file upload to `public/` (e.g. `public/google<token>.html`)
2. **Add property** for the canonical URL prefix or domain property as appropriate.
3. **Submit sitemap** — `https://<canonical-domain>/sitemap.xml`
4. **Request indexing** for homepage and any new high-priority URLs after major launches.
5. **Monitor** — Coverage, Page indexing, Core Web Vitals, and any manual actions. Record baseline in `IMPLEMENTATION_STATUS.md`.

#### Bing Webmaster Tools

1. **Verify site** — options (prefer in order):
   - Import from Google Search Console (fastest if GSC is already verified)
   - XML file in `public/BingSiteAuth.xml` — **required agent step** when using file verification (see shared asset rule below)
   - Meta tag in `<head>` (`msvalidate.01`)
   - DNS CNAME verification
2. **Submit sitemap** — same canonical sitemap URL as GSC.
3. **Configure** — set geo/market if relevant; review URL inspection for key pages.
4. **Monitor** — Indexing, crawl errors, and search performance.

##### Shared Bing auth file (BizGrow)

> **Agent instruction:** For Bing XML verification, do **not** invent a new auth code. Obtain `BingSiteAuth.xml` as follows:
>
> 1. **Preferred:** copy from the workspace shared store:  
>    `~/CODING - TRW /_shared/seo/BingSiteAuth.xml`  
>    → place at `<project>/public/BingSiteAuth.xml`
> 2. **Fallback:** if the shared file is missing, copy from any sibling BizGrow repo’s `public/BingSiteAuth.xml` (same Bing account user code), then restore the shared store copy so future projects can use step 1.
> 3. Commit the project `public/BingSiteAuth.xml`. After production deploy, complete Bing property verification + sitemap submit (user dashboard unless access is granted).
>
> See `~/CODING - TRW /_shared/seo/README.md` for notes.

#### Agent vs user responsibilities

| Task | Agent | User |
|------|-------|------|
| Add verification meta tag or file to codebase | ✓ | |
| Deploy verification change to production | ✓ (if deploying) | ✓ (if user deploys) |
| Create / log into GSC and Bing accounts | | ✓ |
| Complete DNS verification in domain registrar | | ✓ |
| Submit sitemap and request indexing in dashboards | ✓ (if access granted) | ✓ (default) |

> **Agent instruction:** Document chosen verification method(s) in `SEO_AEO_GEO_PLAN.md`. Never commit API keys or account passwords. Verification tokens in meta tags or static files are fine to commit once the user confirms they are not secret rotation targets.

### Common additional items (from competitor research)

Present these to the user during Stage 2; implement only if approved:

| Item | SEO | AEO | GEO |
|------|-----|-----|-----|
| Explicit "areas served" block | ✓ | ✓ | ✓ |
| Pricing transparency in FAQ | ✓ | ✓ | ✓ |
| Case study / results section with metrics | ✓ | ✓ | ✓ |
| Comparison table (us vs typical competitor) | | ✓ | ✓ |
| Dedicated `/faq` page (own URL in sitemap) | ✓ | ✓ | |
| Key takeaways summary block on homepage | | ✓ | ✓ |
| Author/byline on articles | | | ✓ |
| Suburb/location landing pages | ✓ | ✓ | |
| Review/social proof block (real data only) | ✓ | ✓ | ✓ |
| `llms.txt` | | | ✓ |

(GSC and Bing setup are required in Stage 9 — not optional add-ons.)

### Plan file checklist

When creating `/implementation/SEO_AEO_GEO_PLAN.md`, include:

- Goal (one paragraph: SEO + AEO + GEO for this project)
- Current state (read the repo — file paths, what exists, known gaps)
- Order of operations (stages 1–9 above, plus any approved additions)
- Files to create / modify (project-specific)
- Environment variables (`NEXT_PUBLIC_SITE_URL` or equivalent)
- Search Console / Bing verification method chosen and manual follow-ups listed
- Test plan (Rich Results Test, view-source crawlability, sitemap/robots smoke test, canonical/NAP grep, GSC/Bing sitemap submitted, AEO spot check post-deploy)
- Out of scope (pages owned by other agents, fabricated review schema, DNS cutover unless explicitly in scope)

### Verification checklist

Before marking SEO / AEO / GEO complete:

- [ ] Canonical domain and NAP consistent across repo (excluding flagged third-party pages)
- [ ] All FAQ answers visible in HTML source (JS disabled)
- [ ] JSON-LD validates in Google Rich Results Test
- [ ] Sitemap lists all indexable routes with real `lastmod` dates
- [ ] `robots.txt` points to sitemap; AI crawler policy decided
- [ ] Google Search Console property verified; sitemap submitted; no critical coverage errors
- [ ] Bing Webmaster Tools property verified; sitemap submitted
- [ ] `SEO_AEO_GEO_PLAN.md` todos and `IMPLEMENTATION_STATUS.md` updated

---

## 19. Final sitemap freshness gate

> **Agent instruction:** This section is intentionally last. Run it at the end of everything else whenever work may affect public routes, SEO, content, metadata, structured data, `robots.txt`, deployment, or webmaster verification. If the repo has `/implementation/SITEMAP_SEARCH_CONSOLE_BING_PLAN.md`, read it before making sitemap-related changes.

### When this gate is required

Run the gate after:
- Adding, deleting, renaming, redirecting, or hiding public routes
- Updating homepage, service, FAQ, article, pricing, legal, or contact content
- Changing canonical domain, canonical URLs, metadata, JSON-LD, `robots.txt`, or `llms.txt`
- Preparing a production deployment after SEO/content changes
- Verifying or submitting sitemaps in Google Search Console or Bing Webmaster Tools

### Freshness rules

- Keep one sitemap source of truth (`sitemap.ts`, framework `sitemap.xml` route, or equivalent). Do not hand-maintain duplicate route lists.
- Every public, indexable route must be present in the sitemap; private, API, redirected, canonicalized-away, and `noindex` routes must be excluded.
- Use real freshness sources for `lastmod`: content review constants, article `dateModified`, legal page `lastUpdated`, CMS timestamps, or file-derived dates. Do not use build time as the only freshness signal.
- Update freshness only when meaningful visible content, metadata, structured data, or canonical routing changes.
- Regenerate the sitemap after changes and inspect the generated XML before marking work complete.
- `robots.txt` must point to the canonical production sitemap URL.

### Google Search Console

- Preferred verification: DNS TXT record for the canonical domain.
- Acceptable alternatives: `google-site-verification` meta tag or Google HTML verification file in `public/`.
- After production deploy, submit the canonical sitemap URL and request indexing for homepage plus priority launch pages.
- Record verification method, submission date, crawl/indexing issues, and owner in `IMPLEMENTATION_STATUS.md`.

### Bing Webmaster Tools

- Preferred verification: import from Google Search Console after GSC is verified.
- Acceptable alternatives: `BingSiteAuth.xml`, `msvalidate.01` meta tag, or DNS CNAME.
- **`BingSiteAuth.xml` source of truth:** copy from `~/CODING - TRW /_shared/seo/BingSiteAuth.xml` into `public/BingSiteAuth.xml`. If the shared file is missing, copy from a sibling repo’s `public/BingSiteAuth.xml`, then restore the shared store. Never invent a new Bing user code.
- Submit the same canonical sitemap URL used for Google.
- Record verification method, submission date, crawl/indexing issues, and owner in `IMPLEMENTATION_STATUS.md`.

### Final checklist

Before saying route/content/SEO/deployment work is complete:

- [ ] Sitemap source includes every public indexable URL and excludes private/API/noindex/redirect-only URLs
- [ ] `lastmod` values are current and based on real content freshness
- [ ] Generated `sitemap.xml` has been refreshed
- [ ] `robots.txt` references the canonical sitemap URL
- [ ] Google Search Console sitemap submission is complete or listed as a manual follow-up
- [ ] Bing Webmaster Tools sitemap submission is complete or listed as a manual follow-up
- [ ] Relevant implementation plan todos and `IMPLEMENTATION_STATUS.md` are updated

---

## 20. Articles / Insights route

> **Agent instruction:** When adding or editing insights posts, hero assets, article UI, or article-specific SEO, follow this section. Write or read the project-specific plan at `/implementation/ARTICLES_PLAN.md` using the template in Section 3. Read the codebase first — do not assume what already exists.

### Routing

| Route | Purpose |
|-------|---------|
| `/insights` | Hub listing all articles |
| `/insights/{slug}` | Individual article detail |

In Vite SPA projects, route matching lives in `App.tsx` via `window.location.pathname`. In Next.js projects, use `app/articles/` or `app/insights/` with `generateStaticParams` from article slugs.

### Data model

Each article entry should include:

- `slug` — URL segment
- `path` — full public path (e.g. `/insights/{slug}`)
- `heroImage` — optional site-root path (e.g. `/insights-heroes/{slug}.png`)
- `title`, `description` — page title and meta description
- `author`, `authorRole` — from shared `ARTICLE_AUTHOR` constant where appropriate
- `datePublished`, `dateModified` — ISO `YYYY-MM-DD`; update `dateModified` on meaningful content changes
- `readTimeMinutes` — estimated read time
- `blocks` — preferred body format (`p`, `h2`, `h3`, `ul`)
- `markdown` — optional legacy body format if migrating incrementally

Helpers to provide: `getAllArticles()`, `getArticleBySlug()`, `getArticleByPath()`, `resolveArticleHeroImageSrc()`, `getArticleOgImage()`.

### Hero asset conventions

| Rule | Value |
|------|-------|
| Folder | `public/insights-heroes/` (or project-equivalent) |
| Filename | `{slug}.png` |
| Dimensions | 1200×630 (OG-friendly) |
| Style | Match site brand — for BizGrow AI: navy `#0f1419`, electric `#22c55e` |
| Data reference | `heroImage: '/insights-heroes/{slug}.png'` |

`resolveArticleHeroImageSrc()` should accept empty strings, site-root paths, and full canonical-domain URLs.

### Article UI checklist

- Breadcrumbs: Home → Insights (or Articles)
- Metadata block: author, published, updated (formatted `en-AU`), read time
- Hero figure with meaningful `alt` (article title)
- Body via blocks or markdown renderer
- Related articles / insights aside on detail pages
- Index cards: optional hero thumbnail, author, date, read time

### Article SEO checklist

1. `usePageMeta` or framework metadata with `ogType: 'article'`
2. Per-article `og:image` from hero (fallback: site default OG)
3. `article:published_time` and `article:modified_time` meta tags
4. JSON-LD `Article` with optional `image`, `Person` author, `BreadcrumbList`
5. `CollectionPage` JSON-LD on the insights index
6. Sitemap entries with per-article `dateModified` as `lastmod`
7. `public/llms.txt` lists all article URLs when articles are added or removed

### Order of operations for a new article

```
Write content (blocks preferred)
    ↓
Add hero asset to public/insights-heroes/
    ↓
Register entry in articles data file
    ↓
Verify article page + index UI
    ↓
Verify OG / JSON-LD image fields
    ↓
Regenerate sitemap (build)
    ↓
Update llms.txt
    ↓
Run Section 19 sitemap freshness gate
```

### Out of scope (unless explicitly requested)

- CMS or admin authoring UI
- Renaming established routes (`/insights` vs `/articles`) without redirects
- Copying article content from sibling repos without user approval

