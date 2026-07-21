# DESIGN.md: Lời Hẹn Wedding Studio

## Foundation

- Capture date: 2026-07-12
- Evidence: an independently implemented wedding-studio structure: navigation, image-led hero, template gallery, service overview, consultation workflow, and responsive behavior.
- Constraint: no third-party logo, copy, image, watermark, or code is reused.

## Design Summary

Lời Hẹn uses a cinematic wedding-storytelling pattern: a compact navigation bar, an emotionally led image hero, a prominent template gallery, concise benefit sections, and clear actions. It expands that rhythm into four coordinated wedding services.

## Design Tokens

### Colors

- Ink: `#1c1817`
- Paper: `#fffaf5`
- Rose: `#b64c57`
- Terracotta: `#c8794c`
- Moss: `#6f8065`
- Gold: `#b99262`
- Projector blue: `#506f8a`
- Border: `rgba(28, 24, 23, 0.14)`

### Typography

- Display: `Playfair Display`, Georgia, serif
- Script accents: `Great Vibes`, cursive
- UI/body: `Manrope`, system-ui, sans-serif
- Display headings use high contrast and generous line-height; operational text uses clear sans-serif labels.

### Spacing And Layout

- Desktop content container: `min(1180px, calc(100vw - 48px))`
- Mobile side padding: `20px`
- Section rhythm: `80px` desktop / `56px` mobile
- Card radius: `8px` maximum
- Use full-width section bands, with cards only for service and template items.

## Components

- Slim sticky navigation with anchor links and a consultation command
- Full-bleed wedding image hero with independent brand title and two clear actions
- Four service cards with distinct accent color and icon
- Template library cards that open the three local invitation routes
- Link-copy action for each demo template
- Consultation form with date/time and service selection; persisted locally in demo mode

## Page Patterns

1. Brand hero and primary service promise
2. Four-service overview
3. Online invitation product detail and template library
4. Tráp and projector-service visual sections
5. Consultation booking form
6. Brand footer

## Content Style

Warm, specific, and service-led. Avoid generic wedding-platform claims. Explain exactly what is supplied: an invitation link, RSVP, guest wishes, image album, QR gifting, trays, and event projection.

## Agent Build Instructions

- Keep `/template/thiep-cuoi-39`, `/template/thiep-cuoi-44`, and `/template/thiep-cuoi-61` as independent customer-facing invitation pages.
- Use local WebP images and independent brand assets only.
- Make the homepage an independent brand called `Lời Hẹn Studio` until final brand assets are supplied.
- Treat template links as stable demo URLs. A production per-customer URL system requires persistent storage and an API, not only a static React build.
