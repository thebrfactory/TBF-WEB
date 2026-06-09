---
description: Create a new label page for TBF.COM ecosystem (TFD/RUC/TGF pattern)
---

# new-label

Creates a new label institutional page at `src/app/labels/<label-slug>/page.tsx` following the exact structure of existing label pages (TFD, RUC).

## Before starting

1. Confirm the label slug, full name, and handle:
   - Slug: e.g. `thegrowthfactory`
   - Full name: e.g. `.THE GROWTH FACTORY.`
   - Short: e.g. `.TGF.`
   - Instagram: e.g. `@thegrowthfactory`

2. Prepare 3 images via the `image-prep` skill and place in `public/images/<slug>/`:
   - `<slug>-hero.webp` — fullscreen hero (2400×1350)
   - `<slug>-<middle-section>.webp` — "Why it exists" section background (2400×1350)
   - `<slug>-closing.webp` — footer block background (2400×1350)

3. Add redirect in `next.config.ts` if a vanity route is needed:
   ```ts
   { source: '/<slug>', destination: '/labels/<slug>', permanent: true }
   ```

## Page structure (5 sections — fixed order)

1. **HERO** — fullscreen, `minHeight: 100dvh`, `alignItems: flex-end`, hero image at 45% opacity with top+bottom gradient, H1 + subtitle + 3 keyword lines + deck copy + CTA button
2. **OVERVIEW** — `layout-b`, "What is .X.?" — two paragraphs in Portuguese
3. **WHY IT EXISTS** — full-bleed section with middle image at 45% opacity, two columns: left = manifestos (3 lines) + explanation; right = philosophy headline + body
4. **FOCUS AREAS** — tag cloud of 6–8 focus areas, `border: 1px solid rgba(255,255,255,0.3)`
5. **INSIDE THE COLLECTIVE** — `layout-b`, relationship with .TBF., two paragraphs
6. **FOOTER BLOCK** — full-bleed with closing image at 55% opacity, 3-line manifesto statement + provenance line + CTA

## CTA button

```tsx
<a href="https://instagram.com/<handle>" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
  @<handle>
  <span className="btn__arrow" aria-hidden="true">→</span>
</a>
```

## Conventions (inherited from new-page)

- `data-theme="inverse"`, `background: #000`, `color: #fff`
- All brand marks in `fontWeight: 800`
- No dividers, no `<hr>`, no `nowrap`
- `layout-b` for two-column sections
- Typography tokens throughout — no hardcoded font sizes except `clamp(2rem, 8vw, 6rem)` for H1 and `0.9rem` for subtitle micro

## After creating the page

- Run dev server (`/run`) and navigate to `/labels/<slug>` to verify
- Add the label to the `/labels` index page if it lists all labels
- Deploy via `/deploy`
