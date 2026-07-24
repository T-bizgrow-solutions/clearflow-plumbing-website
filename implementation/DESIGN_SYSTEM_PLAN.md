---
name: Design system and tokens
overview: Formalise ClearFlow brand tokens, document them, and harden shared UI primitives without restyling the whole site from scratch.
status: planned
approved_by_user: true
todos:
  - id: design-tokens-doc
    content: Add DESIGN_TOKENS.md documenting colours, type, spacing, shadows, motion
    status: pending
  - id: css-variables
    content: Mirror Tailwind brand tokens as CSS variables in index.css for non-Tailwind use
    status: pending
  - id: button-variants
    content: Audit Button variants against real CTAs; align copy/sizing conventions
    status: pending
  - id: section-primitives
    content: Ensure Section, PageHeader, cards stay token-driven (no one-off hex in components)
    status: pending
  - id: sentence-case-pass
    content: Sweep UI labels to sentence case per DevArchitecture frontend conventions
    status: pending
---

# Design system and tokens

## Goal

Lock ClearFlow’s visual language into a documented token system so future pages (articles, locations, SEO blocks) reuse the same colours, type, and components instead of inventing new styles.

## Current state

- Tokens live in `tailwind.config.js`: brand blue `#009fe3`, green `#7ac143`, dark `#231F20`, muted `#a1aaad`, surfaces, Montserrat/Raleway/Sora
- Shared UI: `Button`, `Section`, `PageHeader`, `ServiceCard`, `ProjectCard`, `WaterCursor`
- No `DESIGN_TOKENS.md`; some hex may still appear inline in components
- Brand direction is established; this plan evolves, not redesigns

## What we are building

1. **Token documentation** — single source describing colour roles, type scale, spacing, elevation, motion
2. **CSS variables** — `--color-brand-blue` etc. aligned with Tailwind theme
3. **Component hygiene** — replace stray hex/font overrides with tokens; keep CTA via shared `Button`
4. **Copy convention** — sentence case on buttons/labels (not Title Case / ALL CAPS)

## Files to create

| File | Purpose |
|------|---------|
| `implementation/DESIGN_TOKENS.md` | Living token reference (or `DESIGN_TOKENS.md` at root if preferred — keep under `implementation/` for this project) |

## Files to modify

| File | Changes |
|------|---------|
| `tailwind.config.js` | Extend tokens only if gaps found (radius, focus, semantic success/error) |
| `src/index.css` | CSS variable mirror + any shared utility classes |
| `src/components/ui/*` | Remove hardcoded colours where tokens exist |
| Section/page components | Sentence-case label pass |

## Environment variables required

None.

## Test plan

1. Visual check home, services index, service detail, projects, 404 on desktop + mobile
2. Grep for raw `#` colour literals outside token files — justify or remove
3. Confirm primary/secondary/outline buttons still have visible focus rings

## Out of scope

- Full visual redesign or new illustration system
- Replacing fonts
- Dark-mode product theme
- Building a Storybook
