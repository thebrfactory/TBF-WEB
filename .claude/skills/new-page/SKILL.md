---
description: Create a new page for TBF.COM following brand conventions
---

# new-page

Creates a new route page at `src/app/<route>/page.tsx` with all TBF brand conventions pre-applied.

## Brand conventions (mandatory)

- Background always `#000`, color always `#fff`: `data-theme="inverse"` on root div
- **Names and brand marks always extrabold**: `.TBF.`, `.TFD.`, `.RUC.`, `.TGF.` use `fontWeight: 800`
- **No dividers, no `<hr>`, no border separators** between sections, ever
- **No `white-space: nowrap`** anywhere
- Layout two-column: use `className="layout-b"` (left narrower, right wider)
- Section spacing: `className="section container"` for padded sections
- Full-bleed image sections: `position: relative`, `width: 100vw`, image with `fill` + overlay gradient
- Typography uses CSS tokens: `var(--tbf-type-display-xl-family)`, `var(--tbf-type-h2-*)`, `var(--tbf-type-body-*)`, `var(--tbf-type-micro-*)`
- Subtitle label style: `fontFamily: var(--tbf-type-micro-family)`, `fontSize: 0.9rem`, `fontWeight: 500`, `letterSpacing: 0.1em`, `textTransform: uppercase`
- Spacing tokens: `var(--tbf-space-2)` through `var(--tbf-space-20)`
- Images: always `next/image` with `fill` + `sizes="100vw"` for full-bleed; never `<img>`

## Starter template

```tsx
import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '<PAGE TITLE> | .THE BRAZILIAN FACTORY.',
  description: '<description>',
  openGraph: {
    title: '<PAGE TITLE>',
    description: '<description>',
    images: [{ url: '/og-factory.jpg', width: 1200, height: 630 }],
  },
}

const SUBTITLE: CSSProperties = {
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: '0.9rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ffffff',
  lineHeight: 1.3,
  marginBottom: 'var(--tbf-space-6)',
}

const B800: CSSProperties = { fontWeight: 800 }

export default function <PageName>Page() {
  return (
    <div data-theme="inverse" style={{ background: '#000', color: '#fff' }}>

      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="<id>-h1"
        style={{
          position: 'relative',
          width: '100vw',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/<folder>/<hero>.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.45 }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, #000000 0%, transparent 30%, transparent 55%, #000000 100%)',
          }} />
        </div>

        <div className="container" style={{
          position: 'relative',
          zIndex: 3,
          paddingBottom: 'var(--tbf-space-20)',
          paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
        }}>
          <h1 id="<id>-h1" style={{
            fontFamily: 'var(--tbf-type-display-xl-family)',
            fontSize: 'clamp(2rem, 8vw, 6rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: 'var(--tbf-type-display-xl-ls)',
            color: '#ffffff',
            marginBottom: 'var(--tbf-space-5)',
          }}>
            PAGE TITLE
          </h1>
        </div>
      </section>

      {/* ─── BODY SECTION ──────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="<id>-section">
        <div className="layout-b">
          <div>
            <p style={SUBTITLE}>Label</p>
            <h2 id="<id>-section" style={{
              fontFamily: 'var(--tbf-type-h2-family)',
              fontSize: 'var(--tbf-type-h2-size-sm)',
              fontWeight: 800,
              lineHeight: 'var(--tbf-type-h2-lh)',
              letterSpacing: 'var(--tbf-type-h2-ls)',
              color: '#ffffff',
              marginBottom: 'var(--tbf-space-6)',
            }}>
              Section Title
            </h2>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--tbf-type-body-family)',
              fontSize: 'var(--tbf-type-body-size-sm)',
              lineHeight: 'var(--tbf-type-body-lh)',
              color: 'rgba(255,255,255,0.75)',
            }}>
              Body copy here.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
```

## File location

`src/app/<route>/page.tsx`

For nested routes: `src/app/<parent>/<child>/page.tsx`
