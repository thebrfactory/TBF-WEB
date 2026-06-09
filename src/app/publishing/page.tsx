import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Publishing | .THE BRAZILIAN FACTORY.',
  description:
    '.THE BRAZILIAN FACTORY. Publishing — editorial content, creative contributions and brand storytelling from inside the .TBF. ecosystem.',
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


const FORMATS = [
  { format: 'Editorial', desc: 'Long-form essays, cultural criticism, profiles and opinion pieces. Grounded in culture, written with depth.' },
  { format: 'Photography', desc: 'Visual storytelling from inside the São Paulo creative scene and beyond. Documentary, fashion, lifestyle.' },
  { format: 'Interviews', desc: 'Conversations with creators, founders, artists and thinkers working at the intersection of culture and craft.' },
  { format: 'Label Content', desc: 'Original content from .TFD., .RUC. and .TGF. — each label with its own editorial voice and focus.' },
]

export default function PublishingPage() {
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
          <span style={TAG}>Publishing</span>
          <h1 style={TITLE}>.TBF. Publishing.</h1>
          <p style={DECK}>
            Editorial content, creative contributions and cultural storytelling
            from inside the{' '}
            <strong style={{ fontWeight: 800 }}>.THE BRAZILIAN FACTORY.</strong> ecosystem.
          </p>
        </div>
      </section>


      {/* ─── WHAT WE PUBLISH ──────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>What We Publish</span>
            <h2 style={H2}>Culture, told well.</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              <strong style={{ fontWeight: 800 }}>.TBF. Magazine</strong> is the editorial arm
              of <strong style={{ fontWeight: 800 }}>.THE BRAZILIAN FACTORY.</strong> We publish
              long-form editorial content, photography, interviews and cultural essays — all
              rooted in the São Paulo creative scene and connected to a broader global conversation.
            </p>
            <p style={BODY}>
              Our publishing extends across all four labels: each label contributes content
              from its own specific cultural territory. Everything we publish is made with
              intention and produced to a high standard.
            </p>
          </div>
        </div>
      </section>


      {/* ─── FORMATS ──────────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>Content Formats</span>
        <h2 style={H2}>What we make</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--tbf-space-6)',
          }}
        >
          {FORMATS.map((f) => (
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
            <span style={SECTION_LABEL}>Contribute</span>
            <h2 style={H2}>Work with us</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              We are open to editorial pitches, photography submissions and creative partnerships
              from independent writers, photographers, designers and cultural thinkers.
              We prioritize work that is specific, rigorous and culturally grounded.
            </p>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              Before reaching out, explore our editorial to understand the kind of work
              we publish. Pitches that align with our existing voice and topics are far
              more likely to be considered.
            </p>
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
                  Editorial pitches
                </span>
                <a
                  href="mailto:pitch@thebrfactory.com"
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
                  pitch@thebrfactory.com
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
                  Brand partnerships
                </span>
                <a
                  href="mailto:press@thebrfactory.com"
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
                  press@thebrfactory.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── EXPLORE ──────────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>Explore</span>
        <h2 style={H2}>Read the Magazine</h2>
        <Link href="/editorial" className="btn btn--primary">
          Go to Magazine
          <span className="btn__arrow" aria-hidden="true">→</span>
        </Link>
      </section>

    </div>
  )
}
