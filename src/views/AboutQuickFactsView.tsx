// =============================================================================
// ABOUT/QUICK-FACTS — serve `/about/quick-facts` (inglês) e
// `/pt/about/quick-facts` (português)
// =============================================================================

import type { CSSProperties } from 'react'
import { aboutQuickFacts } from '@/content/i18n/pages/about-quick-facts'
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
  marginBottom: 'var(--tbf-space-6)',
}

const FACT_LABEL: CSSProperties = {
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: 'var(--tbf-type-micro-size)',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: 'var(--tbf-space-2)',
  display: 'block',
}

const FACT_VALUE: CSSProperties = {
  fontFamily: 'var(--tbf-type-display-xl-family)',
  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
  fontWeight: 800,
  color: '#fff',
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
}

const FACT_BODY: CSSProperties = {
  fontFamily: 'var(--tbf-type-body-family)',
  fontSize: 'var(--tbf-type-body-size-sm)',
  lineHeight: 'var(--tbf-type-body-lh)' as CSSProperties['lineHeight'],
  color: 'rgba(255,255,255,0.6)',
}

export default function AboutQuickFactsView({ lang }: { lang: Lang }) {
  const t = aboutQuickFacts[lang]

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
            {t.hero.deckPrefix}{' '}
            <strong style={{ fontWeight: 800 }}>.THE BRAZILIAN FACTORY.</strong>
          </p>
        </div>
      </section>


      {/* ─── OVERVIEW NUMBERS ─────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.overview.sectionLabel}</span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--tbf-space-8)',
          }}
        >
          {t.overview.items.map((f) => (
            <div key={f.label}>
              <span style={FACT_LABEL}>{f.label}</span>
              <span style={FACT_VALUE}>{f.value}</span>
            </div>
          ))}
        </div>
      </section>


      {/* ─── LABELS ───────────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.activeLabels.sectionLabel}</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {t.activeLabels.items.map((l) => (
            <div
              key={l.code}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: 'var(--tbf-space-6)',
                alignItems: 'start',
                padding: 'var(--tbf-space-5) 0',
                borderTop: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  paddingTop: '3px',
                }}
              >
                {l.code}
              </span>
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--tbf-type-micro-family)',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    marginBottom: 'var(--tbf-space-1)',
                  }}
                >
                  {l.name}
                </span>
                <span style={FACT_BODY}>{l.focus}</span>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </div>
      </section>


      {/* ─── COMPANY INFO ─────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.company.sectionLabel}</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {t.company.items.map((f) => (
            <div
              key={f.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: 'var(--tbf-space-6)',
                alignItems: 'start',
                padding: 'var(--tbf-space-5) 0',
              }}
            >
              <span style={FACT_LABEL}>{f.label}</span>
              <span
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  color: '#fff',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.6,
                }}
              >
                {f.value}
              </span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </div>
      </section>

      {/* ─── SOCIAL ───────────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.social.sectionLabel}</span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--tbf-space-6)',
          }}
        >
          {t.social.items.map((s) => (
            <a
              key={s.handle}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <span style={FACT_LABEL}>{s.platform}</span>
              <span
                style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.02em',
                }}
              >
                {s.handle}
              </span>
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}
