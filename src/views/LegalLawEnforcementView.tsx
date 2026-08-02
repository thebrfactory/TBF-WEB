// =============================================================================
// DIRETRIZES PARA AUTORIDADES — serve `/legal/law-enforcement` (inglês) e
// `/pt/legal/law-enforcement` (português)
// =============================================================================

import type { CSSProperties } from 'react'
import { legalLawEnforcement } from '@/content/i18n/pages/legal-law-enforcement'
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
}

const BODY: CSSProperties = {
  fontFamily: 'var(--tbf-type-body-family)',
  fontSize: 'var(--tbf-type-body-size-sm)',
  lineHeight: 'var(--tbf-type-body-lh)' as CSSProperties['lineHeight'],
  color: 'rgba(255,255,255,0.65)',
  marginBottom: 'var(--tbf-space-4)',
}

const B: CSSProperties = { fontWeight: 700, color: 'rgba(255,255,255,0.85)' }

const LI: CSSProperties = {
  fontFamily: 'var(--tbf-type-body-family)',
  fontSize: 'var(--tbf-type-body-size-sm)',
  lineHeight: 'var(--tbf-type-body-lh)' as CSSProperties['lineHeight'],
  color: 'rgba(255,255,255,0.65)',
  marginBottom: 'var(--tbf-space-2)',
}

export default function LegalLawEnforcementView({ lang }: { lang: Lang }) {
  const t = legalLawEnforcement[lang]

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

        <p style={{ ...BODY, marginTop: 'var(--tbf-space-10)' }}>
          {t.intro[0]} <span style={B}>{t.introOrg}</span> {t.introAddress}. {t.intro[1]}{' '}
          <a href={`mailto:${t.email}`} style={{ color: '#fff', fontWeight: 700 }}>
            {t.email}
          </a>
          {t.intro[2]}
        </p>

        <h2 style={H2}>{t.s1Title}</h2>
        <p style={BODY}>
          <span style={B}>{t.s1Org}</span> {t.s1Body1[0]}
        </p>
        <p style={BODY}>{t.s1Body2}</p>

        <h2 style={H2}>{t.s2Title}</h2>
        <p style={BODY}>{t.s2Intro}</p>
        <ul style={{ paddingLeft: 'var(--tbf-space-6)', marginBottom: 'var(--tbf-space-4)' }}>
          {t.s2Items.map((item) => (
            <li key={item} style={LI}>{item}</li>
          ))}
        </ul>
        <p style={BODY}>{t.s2Body}</p>

        <h2 style={H2}>{t.s3Title}</h2>
        <p style={BODY}>
          {t.s3Intro1}{' '}
          <a href={`mailto:${t.email}`} style={{ color: '#fff', fontWeight: 700 }}>
            {t.email}
          </a>
          {t.s3Intro2}
        </p>
        <ul style={{ paddingLeft: 'var(--tbf-space-6)', marginBottom: 'var(--tbf-space-4)' }}>
          {t.s3Items.map((item) => (
            <li key={item} style={LI}>{item}</li>
          ))}
        </ul>
        <p style={BODY}>{t.s3Body}</p>

        <h2 style={H2}>{t.s4Title}</h2>
        <p style={BODY}>{t.s4Body}</p>

        <h2 style={H2}>{t.s5Title}</h2>
        <p style={BODY}>
          {t.s5Body1[0]}{' '}
          <a href={`mailto:${t.email}`} style={{ color: '#fff', fontWeight: 700 }}>
            {t.email}
          </a>{' '}
          {t.s5Body1[1]} <span style={B}>&quot;{t.s5Subject}&quot;</span>. {t.s5Body2}
        </p>

        <h2 style={H2}>{t.s6Title}</h2>
        <p style={BODY}>{t.s6Body}</p>

        <h2 style={H2}>{t.s7Title}</h2>
        <p style={BODY}>
          {t.s7Body[0]}{' '}
          <a href={`mailto:${t.email}`} style={{ color: '#fff', fontWeight: 700 }}>
            {t.email}
          </a>
          {t.s7Body[1]}
        </p>

        <h2 style={H2}>{t.s8Title}</h2>
        <p style={BODY}>{t.s8Intro}</p>
        <p style={BODY}>
          <a href={`mailto:${t.email}`} style={{ color: '#fff', fontWeight: 700 }}>
            {t.email}
          </a>
        </p>
        <p style={BODY}>
          {t.addressBlock[0]}<br />
          {t.addressBlock[1]}<br />
          {t.addressBlock[2]}
        </p>
      </div>
    </div>
  )
}
