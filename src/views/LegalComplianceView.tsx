// =============================================================================
// COMPLIANCE: serve `/compliance` (inglês) e `/pt/compliance` (português)
// =============================================================================

import type { CSSProperties } from 'react'
import { legalCompliance } from '@/content/i18n/pages/legal-compliance'
import type { Lang } from '@/lib/i18n'

const LEGAL_TAG: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: 'var(--tbf-type-micro-size)',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.35)',
  marginBottom: 'var(--tbf-space-4)',
}

const TITLE: CSSProperties = {
  fontFamily: 'var(--tbf-type-display-xl-family)',
  fontSize: 'clamp(2rem, 6vw, 5rem)',
  fontWeight: 800,
  lineHeight: 0.95,
  letterSpacing: 'var(--tbf-type-display-xl-ls)',
  color: '#fff',
  marginBottom: 'var(--tbf-space-6)',
}

const META: CSSProperties = {
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: 'var(--tbf-type-micro-size)',
  color: 'rgba(255,255,255,0.3)',
  letterSpacing: '0.08em',
}

const H2: CSSProperties = {
  fontFamily: 'var(--tbf-type-h2-family)',
  fontSize: '1.25rem',
  fontWeight: 800,
  color: '#fff',
  marginBottom: 'var(--tbf-space-4)',
  marginTop: 'var(--tbf-space-10)',
  scrollMarginTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-6))',
}

const BODY: CSSProperties = {
  fontFamily: 'var(--tbf-type-body-family)',
  fontSize: 'var(--tbf-type-body-size-sm)',
  lineHeight: 'var(--tbf-type-body-lh)' as CSSProperties['lineHeight'],
  color: 'rgba(255,255,255,0.65)',
  marginBottom: 'var(--tbf-space-4)',
}

const TOC_WRAP: CSSProperties = {
  marginTop: 'var(--tbf-space-10)',
  padding: 'var(--tbf-space-6)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 'var(--tbf-radius-card)',
}

const TOC_TITLE: CSSProperties = {
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: 'var(--tbf-type-micro-size)',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: 'var(--tbf-space-4)',
}

const TOC_LIST: CSSProperties = {
  display: 'grid',
  gap: 'var(--tbf-space-2)',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
}

const TOC_LINK: CSSProperties = {
  fontFamily: 'var(--tbf-type-body-family)',
  fontSize: 'var(--tbf-type-body-size-sm)',
  color: 'rgba(255,255,255,0.65)',
  textDecoration: 'none',
}

export default function LegalComplianceView({ lang }: { lang: Lang }) {
  const t = legalCompliance[lang]

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100dvh' }}>
      <div
        className="container"
        style={{
          paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
          paddingBottom: 'var(--tbf-space-20)',
          maxWidth: '72ch',
        }}
      >
        <span style={LEGAL_TAG}>{t.tag}</span>
        <h1 style={TITLE}>{t.title}</h1>
        <p style={META}>{t.updated}</p>

        <p style={{ ...BODY, marginTop: 'var(--tbf-space-10)' }}>{t.intro}</p>

        <nav style={TOC_WRAP} aria-label={t.toc}>
          <span style={TOC_TITLE}>{t.toc}</span>
          <ul style={{ ...TOC_LIST, listStyle: 'none', margin: 0, padding: 0 }}>
            {t.chapters.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} style={TOC_LINK}>
                  {c.num}. {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {t.chapters.map((c) => (
          <section key={c.id} id={c.id}>
            <h2 style={H2}>
              {c.num}. {c.title}
            </h2>
            <p style={BODY}>
              {c.body}
              {'email' in c && c.email ? (
                <>
                  {' '}
                  <a href={`mailto:${c.email}`} style={{ color: '#fff', fontWeight: 700 }}>
                    {c.email}
                  </a>
                  {'. '}
                  {c.bodyAfter}
                </>
              ) : null}
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
