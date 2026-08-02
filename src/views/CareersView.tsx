// =============================================================================
// CAREERS — serve `/careers` (inglês) e `/pt/careers` (português)
// =============================================================================

import type { CSSProperties } from 'react'
import { careers } from '@/content/i18n/pages/careers'
import type { Lang } from '@/lib/i18n'

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

export default function CareersView({ lang }: { lang: Lang }) {
  const t = careers[lang]

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
            <strong style={{ fontWeight: 800 }}>.THE BRAZILIAN FACTORY.</strong> {t.hero.deckSuffix}
          </p>
        </div>
      </section>


      {/* ─── WHY TBF ──────────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>{t.whyTbf.sectionLabel}</span>
            <h2 style={H2}>{t.whyTbf.h2}</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>{t.whyTbf.p1}</p>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>{t.whyTbf.p2}</p>
            <p style={BODY}>{t.whyTbf.p3}</p>
          </div>
        </div>
      </section>


      {/* ─── WHAT WE LOOK FOR ─────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.whatWeLookFor.sectionLabel}</span>
        <h2 style={H2}>{t.whatWeLookFor.h2}</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--tbf-space-8)',
          }}
        >
          {t.whatWeLookFor.items.map((item) => (
            <div key={item.trait}>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  marginBottom: 'var(--tbf-space-3)',
                }}
              >
                {item.trait}
              </p>
              <p style={{ ...BODY, color: 'rgba(255,255,255,0.55)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ─── OPEN ROLES ───────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>{t.openRoles.sectionLabel}</span>
            <h2 style={H2}>{t.openRoles.h2}</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>{t.openRoles.p1}</p>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>{t.openRoles.p2}</p>
            <a
              href={`mailto:${t.openRoles.email}`}
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
              {t.openRoles.email}
            </a>
          </div>
        </div>
      </section>


      {/* ─── HOW WE WORK ──────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.howWeWork.sectionLabel}</span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--tbf-space-8)',
          }}
        >
          {t.howWeWork.items.map((item) => (
            <div key={item.label}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 'var(--tbf-space-2)',
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  color: '#fff',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.6,
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
