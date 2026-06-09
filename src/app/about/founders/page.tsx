import type { CSSProperties } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Founders | .THE BRAZILIAN FACTORY.',
  description:
    'Meet the founder behind .THE BRAZILIAN FACTORY. — Felipe Tavares (Tavarístico), Founder, CEO & Creative Director.',
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


export default function FoundersPage() {
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
          <span style={TAG}>Founders</span>
          <h1 style={TITLE}>The People Behind .TBF.</h1>
          <p style={DECK}>
            <strong style={{ fontWeight: 800 }}>.THE BRAZILIAN FACTORY.</strong> was founded by
            a single creative vision — to build a Brazilian cultural company with global ambition.
          </p>
        </div>
      </section>


      {/* ─── FOUNDER PROFILE ──────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b" style={{ alignItems: 'start' }}>
          {/* Left: identity */}
          <div>
            <span style={SECTION_LABEL}>Founder</span>

            <h2
              style={{
                fontFamily: 'var(--tbf-type-display-xl-family)',
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: 'var(--tbf-type-display-xl-ls)',
                color: '#fff',
                marginBottom: 'var(--tbf-space-3)',
              }}
            >
              Felipe Tavares
            </h2>

            <p
              style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 'var(--tbf-space-3)',
              }}
            >
              Known as Tavarístico
            </p>

            <p
              style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: 'var(--tbf-type-micro-size)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: 'var(--tbf-space-8)',
              }}
            >
              Founder · CEO · Creative Director
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
              Felipe Tavares — known creatively as <strong style={{ fontWeight: 800 }}>Tavarístico</strong> —
              is the founder and creative mind behind{' '}
              <strong style={{ fontWeight: 800 }}>.THE BRAZILIAN FACTORY.</strong> Born and based
              in São Paulo, he built <strong style={{ fontWeight: 800 }}>.TBF.</strong> to give
              Brazilian culture a global platform — one that is unapologetically creative, deeply
              intentional, and built to last.
            </p>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              With a background spanning creative direction, brand building and cultural strategy,
              Felipe launched <strong style={{ fontWeight: 800 }}>.TBF.</strong> in 2025 as a
              multi-label ecosystem spanning editorial, fashion, wellness and business growth.
              The company operates four active labels, each with its own distinct identity and community.
            </p>
            <p style={BODY}>
              His work is guided by the belief that the most powerful brands are built around culture,
              not just products — and that São Paulo, as a creative capital, has been consistently
              underrepresented on the global stage.
            </p>
          </div>
        </div>
      </section>


      {/* ─── QUOTE ────────────────────────────────────────────────────────── */}
      <section className="section container">
        <blockquote
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: 'var(--tbf-type-display-xl-ls)',
              color: '#fff',
              marginBottom: 'var(--tbf-space-6)',
              maxWidth: '24ch',
            }}
          >
            "The best Brazilian content doesn't need to be explained. It just needs to be seen."
          </p>
          <footer
            style={{
              fontFamily: 'var(--tbf-type-micro-family)',
              fontSize: 'var(--tbf-type-micro-size)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            — Felipe Tavares (Tavarístico), Founder & CEO
          </footer>
        </blockquote>
      </section>


      {/* ─── VISION ───────────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>Vision</span>
            <h2 style={H2}>Why .TBF. exists</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              <strong style={{ fontWeight: 800 }}>.TBF.</strong> was created from a conviction:
              that Brazilian creative culture is among the most rich and vibrant in the world —
              and that it deserves a company built specifically to develop, distribute and
              champion it at a global level.
            </p>
            <p style={BODY}>
              The ecosystem of labels is the expression of that vision — four distinct creative
              territories, united by a shared commitment to craft, community and cultural longevity.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
