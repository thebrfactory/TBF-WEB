// =============================================================================
// PUBLISHING — serve `/publishing` (inglês) e `/pt/publishing` (português)
// =============================================================================

import type { CSSProperties } from 'react'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { publishing } from '@/content/i18n/pages/publishing'
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

export default function PublishingView({ lang }: { lang: Lang }) {
  const t = publishing[lang]
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
            {t.hero.deckPrefix}{' '}
            <strong style={{ fontWeight: 800 }}>.THE BRAZILIAN FACTORY.</strong>{' '}
            {t.hero.deckSuffix}
          </p>
        </div>
      </section>


      {/* ─── WHAT WE PUBLISH ──────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>{t.whatWePublish.sectionLabel}</span>
            <h2 style={H2}>{t.whatWePublish.h2}</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              <strong style={{ fontWeight: 800 }}>.TBF. Magazine</strong>{' '}
              {t.whatWePublish.p1Mid}{' '}
              <strong style={{ fontWeight: 800 }}>.THE BRAZILIAN FACTORY.</strong>{' '}
              {t.whatWePublish.p1End}
            </p>
            <p style={BODY}>{t.whatWePublish.p2}</p>
          </div>
        </div>
      </section>


      {/* ─── FORMATS ──────────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.formats.sectionLabel}</span>
        <h2 style={H2}>{t.formats.h2}</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--tbf-space-6)',
          }}
        >
          {t.formats.items.map((f) => (
            <div
              key={f.format}
              style={{
                padding: 'var(--tbf-space-6)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
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
                {f.format}
              </p>
              <p style={{ ...BODY, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ─── CONTRIBUTE ───────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>{t.contribute.sectionLabel}</span>
            <h2 style={H2}>{t.contribute.h2}</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>{t.contribute.p1}</p>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>{t.contribute.p2}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-4)' }}>
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--tbf-type-micro-family)',
                    fontSize: 'var(--tbf-type-micro-size)',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: 'var(--tbf-space-1)',
                  }}
                >
                  {t.contribute.pitchLabel}
                </span>
                <a
                  href={`mailto:${t.contribute.pitchEmail}`}
                  style={{
                    fontFamily: 'var(--tbf-type-micro-family)',
                    fontSize: 'var(--tbf-type-micro-size)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    textDecoration: 'none',
                  }}
                >
                  {t.contribute.pitchEmail}
                </a>
              </div>
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--tbf-type-micro-family)',
                    fontSize: 'var(--tbf-type-micro-size)',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: 'var(--tbf-space-1)',
                  }}
                >
                  {t.contribute.partnershipsLabel}
                </span>
                <a
                  href={`mailto:${t.contribute.partnershipsEmail}`}
                  style={{
                    fontFamily: 'var(--tbf-type-micro-family)',
                    fontSize: 'var(--tbf-type-micro-size)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    textDecoration: 'none',
                  }}
                >
                  {t.contribute.partnershipsEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── EXPLORE ──────────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>{t.explore.sectionLabel}</span>
        <h2 style={H2}>{t.explore.h2}</h2>
        <Link href={path('/mag')} className="btn btn--primary">
          {t.explore.cta}
          <span className="btn__arrow" aria-hidden="true">→</span>
        </Link>
      </section>

    </div>
  )
}
