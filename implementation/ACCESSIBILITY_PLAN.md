---
name: Accessibility audit pass
overview: Bring the ClearFlow marketing site up to a practical WCAG-oriented baseline for forms, focus, motion, and landmark semantics.
status: planned
approved_by_user: true
todos:
  - id: contact-a11y
    content: Wire form errors with aria-invalid, aria-describedby, and a polite live region
    status: pending
  - id: focus-audit
    content: Ensure visible focus on footer links, cards, selects, and carousel controls
    status: pending
  - id: hero-announcements
    content: Improve carousel slide change announcement without breaking reduced-motion
    status: pending
  - id: keyboard-nav
    content: Verify skip link, mobile menu trap/escape, and hash scroll focus targets
    status: pending
  - id: axe-pass
    content: Run axe/lighthouse a11y on key routes and fix critical/serious issues
    status: pending
---

# Accessibility audit pass

## Goal

Make primary journeys (browse services/projects, open mobile nav, submit contact) usable with keyboard and assistive tech, and ensure motion respects `prefers-reduced-motion`.

## Current state

- Skip link to `#main`; `Section` uses `aria-labelledby`
- Hero carousel has roles/labels; autoplay respects reduced motion
- `WaterCursor` disabled for reduced motion / coarse pointer
- Global CSS kills animations under reduced motion
- Contact form uses `noValidate` with no error UX or live regions
- Footer links lack the same focus ring treatment as `Button`
- No dedicated a11y plan or automated gate yet

## What we are building

1. **Form accessibility** — associated errors, required announcements, GDPR label wiring (coordinates with N8N plan)
2. **Focus visibility** — consistent `:focus-visible` rings on interactive non-Button elements
3. **Carousel** — announce active slide changes appropriately; keep reduced-motion behaviour
4. **Keyboard** — mobile menu Esc/close; skip link lands on main with focus
5. **Audit** — axe DevTools / Lighthouse on `/`, `/services`, one service detail, `/projects`

## Files to create

| File | Purpose |
|------|---------|
| None required beyond this plan | Fixes land in existing components |

## Files to modify

| File | Changes |
|------|---------|
| `src/components/sections/Contact.tsx` | Error associations + live region |
| `src/components/sections/Hero.tsx` | Slide announcement / focus |
| `src/components/sections/Navbar.tsx` | Escape key, focus return |
| `src/components/sections/Footer.tsx` | Focus styles |
| `src/index.css` | Shared focus-visible utility if needed |
| Cards / links as found | Focus rings |

## Environment variables required

None.

## Test plan

1. Keyboard-only: tab through nav, pages, form; submit with errors visible to SR
2. Toggle OS reduced motion → carousel does not auto-advance; water cursor off
3. axe: zero critical/serious on four key routes
4. Zoom 200% — layout usable, no clipped CTAs

## Out of scope

- Full WCAG 2.2 AAA certification
- Screen-reader copywriting rewrite of all marketing prose
- Removing decorative motion entirely for users who allow motion
