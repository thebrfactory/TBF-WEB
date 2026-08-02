import type { CSSProperties } from 'react'
import { pressMedia } from '@/content/i18n/pages/press-media'
import type { Lang } from '@/lib/i18n'

// =============================================================================
// /press/media — brand assets
//
// Uma página, dois idiomas: o texto vem do dicionário. Ver
// src/content/i18n/README.md. Sem links internos nesta página.
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


export default function PressMediaView({ lang }: { lang: Lang }) {
  const t = pressMedia[lang]

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
          <p style={DECK}>{t.hero.deck}</p>
        </div>
      </section>


      {/* ─── USAGE TERMS ──────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>{t.usageTerms.label}</span>
            <h2 style={H2}>{t.usageTerms.heading}</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>
              {t.usageTerms.p1Pre}
              <strong style={{ fontWeight: 700, color: '#fff' }}>{t.usageTerms.p1Strong}</strong>
              {t.usageTerms.p1Post}
            </p>
            <p style={BODY}>
              {t.usageTerms.p2Pre}
              <a
                href={`mailto:${t.contact.email}`}
                style={{ color: '#fff', fontWeight: 700 }}
              >
                {t.contact.email}
              </a>
              {t.usageTerms.p2Post}
            </p>
          </div>
        </div>
      </section>


      {/* ─── AVAILABLE ASSETS ─────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.assets.label}</span>
        <h2 style={H2}>{t.assets.heading}</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--tbf-space-6)',
          }}
        >
          {t.assets.groups.map((group) => (
            <div
              key={group.category}
              style={{
                padding: 'var(--tbf-space-6)',
                border: '1px solid rgba(255,255,255,0.1)',
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
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: 'var(--tbf-space-4)',
                }}
              >
                {group.category}
              </span>
              <ul
                style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-2)' }}
              >
                {group.items.map((item) => (
                  <li
                    key={item}
                    style={{ ...BODY, color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          style={{
            ...BODY,
            color: 'rgba(255,255,255,0.4)',
            marginTop: 'var(--tbf-space-8)',
            fontStyle: 'italic',
          }}
        >
          {t.assets.footnote}
        </p>
      </section>


      {/* ─── GUIDELINES ───────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.guidelines.label}</span>
        <h2 style={H2}>{t.guidelines.heading}</h2>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {t.guidelines.rules.map((rule, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: 'var(--tbf-space-4)',
                padding: 'var(--tbf-space-4) 0',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.25)',
                  minWidth: '1.5rem',
                  paddingTop: '2px',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p style={{ ...BODY, margin: 0, color: 'rgba(255,255,255,0.65)' }}>{rule}</p>
            </li>
          ))}
          <li style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </ul>
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
