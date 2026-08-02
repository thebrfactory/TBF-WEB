import type { CSSProperties } from 'react'
import Link from 'next/link'
import { press } from '@/content/i18n/pages/press'
import { localizedPath, type Lang } from '@/lib/i18n'

// =============================================================================
// /press — sala de imprensa
//
// Uma página, dois idiomas: o texto vem do dicionário e os links passam por
// localizedPath. Ver src/content/i18n/README.md.
// =============================================================================

const TAG: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: 'var(--tbf-type-micro-size)',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.45)',
  marginBottom: 'var(--tbf-space-4)',
}

const TITLE: CSSProperties = {
  fontFamily: 'var(--tbf-type-display-xl-family)',
  fontSize: 'clamp(2.5rem, 8vw, 7rem)',
  fontWeight: 800,
  lineHeight: 0.95,
  letterSpacing: 'var(--tbf-type-display-xl-ls)',
  color: '#fff',
  marginBottom: 'var(--tbf-space-8)',
}

const DECK: CSSProperties = {
  fontFamily: 'var(--tbf-type-deck-family)',
  fontSize: 'var(--tbf-type-deck-size-sm)',
  lineHeight: 'var(--tbf-type-deck-lh)' as CSSProperties['lineHeight'],
  color: 'rgba(255,255,255,0.65)',
  maxWidth: '58ch',
}

const SECTION_LABEL: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: 'var(--tbf-type-micro-size)',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: 'var(--tbf-space-4)',
}

const H2: CSSProperties = {
  fontFamily: 'var(--tbf-type-h2-family)',
  fontSize: 'var(--tbf-type-h2-size-sm)',
  fontWeight: 800,
  lineHeight: 'var(--tbf-type-h2-lh)' as CSSProperties['lineHeight'],
  letterSpacing: 'var(--tbf-type-h2-ls)',
  color: '#fff',
  marginBottom: 'var(--tbf-space-6)',
}

const BODY: CSSProperties = {
  fontFamily: 'var(--tbf-type-body-family)',
  fontSize: 'var(--tbf-type-body-size-sm)',
  lineHeight: 'var(--tbf-type-body-lh)' as CSSProperties['lineHeight'],
  color: 'rgba(255,255,255,0.7)',
}

const B800: CSSProperties = { fontWeight: 800 }


export default function PressView({ lang }: { lang: Lang }) {
  const t = press[lang]
  const path = (p: string) => localizedPath(p, lang)

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100dvh' }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
          paddingBottom: 'var(--tbf-space-20)',
        }}
      >
        <div className="container">
          <span style={TAG}>{t.hero.tag}</span>
          <h1 style={TITLE}>{t.hero.title}</h1>
          <p style={DECK}>
            {t.hero.deckPre}<span style={B800}>.THE BRAZILIAN FACTORY.</span>{t.hero.deckPost}
          </p>
        </div>
      </section>


      {/* ─── WHO WE ARE ───────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>{t.about.label}</span>
            <h2 style={H2}>{t.about.heading}</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              <span style={B800}>.THE BRAZILIAN FACTORY.</span> {t.about.p1}
            </p>
            <p style={BODY}>
              {t.about.p2Pre}
              <span style={B800}>.TBF.</span>,{' '}
              <span style={B800}>.THE FIORE DAILY.</span>,{' '}
              <span style={B800}>.RUNWAY UNTD COLLECTIVE.</span>{' '}
              {t.about.p2Connector}{' '}
              <span style={B800}>.THE GROWTH FACTORY.</span>
              {t.about.p2Post}
            </p>
          </div>
        </div>
      </section>


      {/* ─── PRESS RESOURCES ──────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.resources.label}</span>
        <h2 style={H2}>{t.resources.heading}</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--tbf-space-6)',
            marginTop: 'var(--tbf-space-8)',
          }}
        >
          {t.resources.items.map((item) => (
            <Link
              key={item.href}
              href={path(item.href)}
              style={{
                display: 'block',
                padding: 'var(--tbf-space-6)',
                border: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.2s',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  marginBottom: 'var(--tbf-space-3)',
                }}
              >
                {item.label} →
              </span>
              <p style={{ ...BODY, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>


      {/* ─── CONTACT ──────────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>{t.contact.label}</span>
            <h2 style={H2}>{t.contact.heading}</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>
              {t.contact.line}
            </p>
            <a
              href={`mailto:${t.contact.email}`}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: 'var(--tbf-type-micro-size)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#fff',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                paddingBottom: '2px',
              }}
            >
              {t.contact.email}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
