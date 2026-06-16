# Design

Visual system for thestream.com. Source of truth for tokens is `src/app/globals.css` (Tailwind v4
`@theme`). This document mirrors it; keep them in sync.

## Theme

Light, blue-anchored, tech-forward. The scene: a lender's vendor-ops lead or a dealer's buyer, at a
desk on a bright monitor, scanning for capability and inventory. Light wins (data legibility,
trust); the brand blue carries identity through full-bleed gradient bands rather than a dark shell.

## Color

Strategy: **Committed** — the brand blue carries the hero and section bands; lime is a tight accent
(≤10% of surface), never a co-equal. Official blue is PMS 300C, shared with UAX (family tie).

| Token | Value | Role |
|---|---|---|
| `--color-stream-blue` | `#005cb9` | Primary brand blue. The anchor. |
| `--color-stream-blue-bright` | `#20a8e0` | Bright cyan. Links/hover, bright end of the gradient. |
| `--color-stream-blue-900` | `#003a78` | Deep blue. Gradient shadow end, dark bands. |
| `--color-stream-blue-100` | `#e6f0fa` | Tint fills, hover rows, pill backgrounds. |
| `--color-stream-lime` | `#90c010` | Accent only (the STREAM wordmark color). Eyebrow rule, one CTA, active sort. |
| `--color-stream-ink` | `#1b2430` | Headings, dark sections, body on light. |
| `--color-stream-grey-700` | `#3d4750` | Body text. |
| `--color-stream-grey` | `#7b868c` | Muted labels, borders. |
| `--color-stream-paper` | `#f7f9fa` | Warm-neutral-free off-white surface (chroma toward blue, not warm). |

Signature surface: diagonal (~135deg) gradient `blue-900 → blue → blue-bright` behind hero/section
bands (`.brand-gradient`). Contrast: body ≥4.5:1; lime is used on dark or as a thin rule, not as
small text on white (it fails 4.5:1) — lime text on light uses the darker `#5a7a08`.

## Typography

Two families, one contrast axis (geometric grotesk display + humanist sans body), inherited from the
United family system:

- **Display:** Archivo (600–900). Headings, eyebrows, buttons, table headers. Uppercase + tight
  tracking on H1/eyebrows to echo the squared "STREAM" wordmark.
- **Body:** Inter. Paragraphs, UI, table data. (Identity-preservation: the family standard.)
- **Mono:** system mono / `tabular-nums` for VINs and numeric table columns.

Scale: fluid where it matters; H1 `text-5xl→7xl`, section H2 `text-3xl→4xl`. `heading` utility sets
`font-display`, weight 800, letter-spacing -0.01em, line-height 1.04.

## Motif

The **5-node hub-and-spoke "network star"** from the logo (`NetworkStar.tsx`). Used three ways:
(1) faint oversized in section/hero backgrounds (`NetworkBackground`, low opacity); (2) the literal
"Where Stream sells" hub-and-spoke graphic (Stream center, platforms orbiting); (3) the team avatar
placeholder. It is the visual argument for "Everywhere."

## Components

- `Header` — black contact bar (tagline + phone/email) above a sticky white nav with the SVG lockup.
- `MobileNav` — full-screen `h-screen w-screen` gradient drawer.
- `Footer` — 3-column (brand+pitch / contact / explore+departments) on `--color-stream-ink`.
- `PageHeader` + `Eyebrow` — gradient inner-page hero; eyebrow = lime rule + tracked label.
- `PlatformNetwork` — SVG hub-and-spoke with orbiting platform logos.
- `RunListTable` — branded sortable/filterable data table (blue header, lime active sort, status
  pills, zebra rows). Data parsed server-side from the Azure run-list app (`lib/runlist.ts`).
- Buttons: primary = solid blue (hover bright); accent CTA = solid lime on dark; ghost = white outline.

## Layout

Max width `max-w-7xl`, `px-4 sm:px-6`. Section rhythm via vertical padding (`py-16`–`py-32`), varied
not uniform. Cards used sparingly (audience trio, pillar grid); avoid nested cards. Responsive grids
use explicit breakpoints or `auto-fit minmax`. Run List table scrolls horizontally on mobile with
the `#`/date columns hidden below `md`.

## Motion

Implemented, dependency-free, reduced-motion safe. A pre-paint script (`layout.tsx`) adds `.motion`
to `<html>` only when JS runs and the user hasn't requested reduced motion — so the default (no JS /
headless / reduced-motion) is fully visible content; animation is a pure enhancement, never a
visibility gate (`<html suppressHydrationWarning>` covers the class injection). Pieces:
- **Hero choreography** — the three headline words + subhead + CTAs `rise` in sequence on load.
- **Scroll reveals** — `Reveal.tsx` (IntersectionObserver, once) wraps below-fold blocks; `.reveal`
  → `.is-in` translates up. Stagger via `--reveal-delay`.
- **Network graphic** — spokes draw (stroke-dashoffset) and nodes fade in staggered when the
  "Where Stream sells" section reveals (`.net-spoke` / `.net-node`).
- Easing: `--ease-out-quint` / `--ease-out-expo`. All gated behind `@media (prefers-reduced-motion)`.

## Known craft backlog

- ✅ **Eyebrow cadence** — fixed: homepage no longer repeats the tracked eyebrow per section;
  cadence varies (headline-led, numbered sequence, two front doors). PageHeader keeps one kicker
  per inner page (not section-grammar).
- ✅ **Card-grid sameness** — fixed: the 6 pillars are an editorial spec-sheet list; the audience
  trio is now two front doors (blue/paper) + a slim Title strip.
- ✅ **Motion** — implemented (see above).
- ✅ **Contact form** — POSTs to `/api/contact` (validate → log → 303) with success + error
  states, and now **preserves all field values on a validation error** (echoed via the redirect
  query). Klaviyo/Resend send is an env-gated TODO in the route.
- ✅ **Active-nav state** — `DesktopNavLinks` (lime active-underline) + MobileNav (lime dot +
  text), `aria-current="page"`, route-tracked via `usePathname`.
- ✅ **Site-wide motion parity** — every inner page now animates: `PageHeader` rises on load, and
  team / causes / title-services content scroll-reveals (run-list and contact stay instant — a data
  tool and a form shouldn't wait on a reveal). Inner-page eyebrow reflex trimmed (causes dropped the
  duplicate abbr kicker; title-services eyebrows became real headings).
- ✅ **A11y/type polish** — `text-wrap: balance` on headings, `pretty` on prose; one consistent
  `:focus-visible` ring; placeholder color bumped to ≥4.5:1.
- **Imagery still thin** — one duotone hero photo; source real facility/lane/team shots when
  available, then place in the front-doors + causes bands. (The only open critique item.)
