// =============================================================================
// ABOUT — serve `/about` (inglês) e `/pt/about` (português)
// =============================================================================

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { about } from '@/content/i18n/pages/about'
import { localizedPath, type Lang } from '@/lib/i18n'

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

export default function AboutView({ lang }: { lang: Lang }) {
  const t = about[lang]
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
          <p style={DECK}>{t.hero.deck}</p>
        </div>
      </section>


      {/* ─── WHO WE ARE ───────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>{t.whoWeAre.sectionLabel}</span>
            <h2 style={H2}>{t.whoWeAre.h2}</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              <span style={B800}>.THE BRAZILIAN FACTORY.</span> {t.whoWeAre.p1}
            </p>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>{t.whoWeAre.p2}</p>
            <p style={BODY}>{t.whoWeAre.p3}</p>
          </div>
        </div>
      </section>


      {/* ─── MISSION ──────────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.mission.sectionLabel}</span>
        <p
          style={{
            fontFamily: 'var(--tbf-type-display-xl-family)',
            fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: 'var(--tbf-type-display-xl-ls)',
            color: '#fff',
            maxWidth: '20ch',
          }}
        >
          {t.mission.statement}
        </p>
      </section>


      {/* ─── VALUES ───────────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.values.sectionLabel}</span>
        <h2 style={H2}>{t.values.h2}</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--tbf-space-8)',
            marginTop: 'var(--tbf-space-8)',
          }}
        >
          {t.values.items.map((v) => (
            <div key={v.name}>
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
                {v.name}
              </p>
              <p style={{ ...BODY, color: 'rgba(255,255,255,0.55)' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ─── OUR LABELS ───────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.labels.sectionLabel}</span>
        <h2 style={H2}>{t.labels.h2}</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-1)' }}>
          {t.labels.items.map((label) => (
            <Link
              key={label.href}
              href={path(label.href)}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                gap: 'var(--tbf-space-6)',
                padding: 'var(--tbf-space-6) 0',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--tbf-type-micro-family)',
                    fontSize: 'var(--tbf-type-micro-size)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: 'var(--tbf-space-2)',
                  }}
                >
                  {label.code}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--tbf-type-h2-family)',
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: 'var(--tbf-space-2)',
                  }}
                >
                  {label.name}
                </span>
                <span style={{ ...BODY, color: 'rgba(255,255,255,0.5)' }}>{label.desc}</span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.25rem' }}>→</span>
            </Link>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </div>
      </section>

    </div>
  )
}
