import type { CSSProperties } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Felipe Tavares (Tavarístico)',
  description:
    'Felipe Tavares — aka Tavarístico. Associate Creative Director / Art Director. Represented by .TBF. inc.',
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

const BODY: CSSProperties = {
  fontFamily: 'var(--tbf-type-body-family)',
  fontSize: 'var(--tbf-type-body-size-sm)',
  lineHeight: 'var(--tbf-type-body-lh)' as CSSProperties['lineHeight'],
  color: 'rgba(255,255,255,0.7)',
}

export default function TavaristicoPage() {
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100dvh' }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
          paddingBottom: 'var(--tbf-space-12)',
        }}
      >
        <div className="container">
          <span style={TAG}>Creators</span>
          <h1
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: 'var(--tbf-type-display-xl-ls)',
              color: '#fff',
              marginBottom: 'var(--tbf-space-3)',
            }}
          >
            Felipe Tavares
          </h1>
          <p
            style={{
              fontFamily: 'var(--tbf-type-micro-family)',
              fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: 'var(--tbf-space-8)',
            }}
          >
            aka Tavarístico
          </p>
        </div>
      </section>

      {/* ─── IDENTITY ─────────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b" style={{ alignItems: 'start' }}>
          {/* Left: role */}
          <div>
            <span style={SECTION_LABEL}>Role</span>
            <p
              style={{
                fontFamily: 'var(--tbf-type-display-xl-family)',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: 'var(--tbf-type-display-xl-ls)',
                color: '#fff',
                marginBottom: 'var(--tbf-space-6)',
              }}
            >
              Associate Creative Director
              <br />
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>Art Director</span>
            </p>

            <p
              style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: 'var(--tbf-type-micro-size)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: 'var(--tbf-space-8)',
              }}
            >
              Represented by{' '}
              <strong style={{ fontWeight: 800, color: 'rgba(255,255,255,0.7)' }}>.TBF. inc</strong>
            </p>

            <a
              href="https://instagram.com/thebrfactory"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: 'var(--tbf-type-micro-size)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
              }}
            >
              @thebrfactory →
            </a>
          </div>

          {/* Right: bio */}
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              Felipe Tavares — known creatively as{' '}
              <strong style={{ fontWeight: 800 }}>Tavarístico</strong> — is an Associate Creative
              Director and Art Director based in São Paulo, Brazil.
            </p>
            <p style={BODY}>
              His work moves between creative direction, art direction and brand building —
              translating Brazilian culture into work that travels.{' '}
              <strong style={{ fontWeight: 800 }}>Represented by .TBF. inc.</strong>
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
