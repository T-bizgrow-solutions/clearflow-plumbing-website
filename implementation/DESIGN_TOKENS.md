# Design tokens

> Source of truth: `tailwind.config.js`. Prefer Tailwind token classes in components — avoid raw hex except where SVG/`style` attributes require literals (keep them aligned with this table).

## Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `brand.blue` | `#009fe3` | Primary brand, CTAs, links, focus rings |
| `brand.blue-hover` | `#5487fa` | Primary button hover |
| `brand.green` | `#7ac143` | Secondary accent, success checks |
| `brand.dark` | `#231F20` | Body text, headings, dark surfaces |
| `brand.muted` | `#a1aaad` | Captions, meta labels |
| `surface` | `#ffffff` | Default page background |
| `surface.alt` | `#f8f9fa` | Alternating section background |
| `surface.dark` | `#1a1a1a` | Dark CTA sections (`Section dark`) |

### Background rhythm

Alternate `bg-white` / default surface with `bg-surface-alt` between major sections. Use `Section` `dark` for high-contrast CTA bands.

## Typography

| Role | Font token | Notes |
|------|------------|-------|
| Display / headings | `font-display` → **Montserrat** | `h1`–`h5` default via `index.css` |
| Body | `font-body` → **Raleway** | Applied on `body` |
| UI / labels / nav | `font-ui` → **Sora** | Buttons, eyebrows, meta rows |

### Scale conventions

| Role | Classes |
|------|---------|
| Page title (PageHeader) | `text-4xl md:text-5xl font-extrabold` |
| Section title | `text-3xl md:text-4xl font-extrabold text-brand-dark` |
| Eyebrow | `font-ui text-sm font-semibold uppercase tracking-wider text-brand-blue` |
| Body | `text-lg leading-relaxed text-gray-700` (lead) / `text-sm` (cards) |

**Copy convention:** Sentence case on buttons and UI labels — not Title Case or ALL CAPS (eyebrows may stay uppercase).

## Spacing

| Token / utility | Value | Usage |
|-----------------|-------|-------|
| `.section-pad` | `px-4 sm:px-6 lg:px-8 py-16 md:py-24` | All `Section` wrappers |
| Content width | `max-w-7xl mx-auto` | Section inner container |
| Narrow content | `max-w-3xl` | Articles, FAQ, intros |

## Elevation (shadows)

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-card` | `0 4px 24px rgba(0, 0, 0, 0.08)` | Cards, FAQ panel |
| `shadow-card-hover` | `0 8px 32px rgba(0, 159, 227, 0.15)` | Card hover (brand-tinted) |

## Motion

| Token | Definition | Usage |
|-------|------------|-------|
| `animate-fade-in-up` | `fadeInUp 0.6s ease-out forwards` | Entrance reveals |
| `fadeInUp` keyframes | opacity 0→1, `translateY(16px)`→0 | Paired with animation |

Respect `prefers-reduced-motion: reduce` (global overrides in `index.css` collapse durations). Prefer transform/opacity over layout thrashing.

## Components

### Button (`src/components/ui/Button.tsx`)

| Variant | Style |
|---------|-------|
| `primary` | `bg-brand-blue` → hover `brand-blue-hover` |
| `secondary` | `bg-brand-green` |
| `outline` | Border `brand-blue`, fill on hover |

Sizes: `default` (`px-6 py-3 text-sm`), `lg` (`px-8 py-4 text-base`). Focus: `ring-2 ring-brand-blue ring-offset-2`.

### Section / PageHeader

- `Section` — `section-pad`, optional `id`, required `labelledBy`, optional `dark`
- `PageHeader` — full-bleed image or blue gradient, breadcrumbs, eyebrow, title, description

## Adding new tokens

1. Extend `tailwind.config.js` `theme.extend`
2. Document the token here
3. Prefer the new class in components over one-off hex
