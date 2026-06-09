import type { CSSProperties } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quick Facts | .THE BRAZILIAN FACTORY.',
  description:
    'Key facts and figures about .THE BRAZILIAN FACTORY. — founding date, labels, location and company data.',
}

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

const FACTS_OVERVIEW = [
  { label: 'Founded', value: '2025' },
  { label: 'Headquartered', value: 'São Paulo, Brazil' },
  { label: 'Active Labels', value: '4' },
  { label: 'Status', value: 'Active — Growing' },
]

const FACTS_LABELS = [
  { code: '.TBF.', name: '.THE BRAZILIAN FACTORY.', focus: 'Editorial · Culture · Community' },
  { code: '.TFD.', name: '.THE FIORE DAILY.', focus: 'Wellness · Ritual · Feminine Expression' },
  { code: '.RUC.', name: '.RUNWAY UNITED COLLECTIVE.', focus: 'Fashion Film · Editorial · SPFW' },
  { code: '.TGF.', name: '.THE GROWTH FACTORY.', focus: 'Growth · Strategy · Business Development' },
]

const FACTS_COMPANY = [
  { label: 'Legal Name', value: '.TBF. INC' },
  { label: 'CNPJ', value: '61.360.565/0001-74' },
  { label: 'Address', value: 'R. Pamplona, 145 — Jardim Paulista\nSão Paulo — SP, 01405-100\nBrasil' },
  { label: 'Website', value: 'thebrfactory.com' },
  { label: 'Main Instagram', value: '@thebrfactory' },
]

export default function QuickFactsPage() {
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
          <span style={TAG}>Quick Facts</span>
          <h1 style={TITLE}>By the Numbers.</h1>
          <p style={DECK}>
            Key facts and figures about{' '}
            <strong style={{ fontWeight: 800 }}>.THE BRAZILIAN FACTORY.</strong>
          </p>
        </div>
      </section>


      {/* ─── OVERVIEW NUMBERS ─────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>Overview</span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--tbf-space-8)',
          }}
        >
          {FACTS_OVERVIEW.map((f) => (
            <div key={f.label}>
              <span style={FACT_LABEL}>{f.label}</span>
              <span style={FACT_VALUE}>{f.value}</span>
            </div>
          ))}
        </div>
      </section>


      {/* ─── LABELS ───────────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>Active Labels</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FACTS_LABELS.map((l, i) => (
            <div
              key={l.code}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: 'var(--tbf-space-6)',
                alignItems: 'start',
                padding: 'var(--tbf-space-5) 0',
                borderTop: i === 0 ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.07)',
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
        <span style={SECTION_LABEL}>Company Information</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FACTS_COMPANY.map((f, i) => (
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
        <span style={SECTION_LABEL}>Social Media</span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--tbf-space-6)',
          }}
        >
          {[
            { handle: '@thebrfactory', platform: 'Instagram', href: 'https://instagram.com/thebrfactory' },
            { handle: '@thefioredaily', platform: 'Instagram', href: 'https://instagram.com/thefioredaily' },
            { handle: '@runwayunited', platform: 'Instagram', href: 'https://instagram.com/runwayunited' },
            { handle: '@factoryofgrowth', platform: 'Instagram', href: 'https://instagram.com/factoryofgrowth' },
          ].map((s) => (
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
