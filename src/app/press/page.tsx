import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Press Room | .THE BRAZILIAN FACTORY.',
  description:
    'Official source for .THE BRAZILIAN FACTORY. news, announcements, brand assets and media inquiries.',
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

const B800: CSSProperties = { fontWeight: 800 }


export default function PressRoomPage() {
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
          <span style={TAG}>Press Room</span>
          <h1 style={TITLE}>.TBF. Newsroom</h1>
          <p style={DECK}>
            The official source for <span style={B800}>.THE BRAZILIAN FACTORY.</span> news,
            company announcements, brand assets and media inquiries.
          </p>
        </div>
      </section>


      {/* ─── WHO WE ARE ───────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>About</span>
            <h2 style={H2}>We build culture.</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              <span style={B800}>.THE BRAZILIAN FACTORY.</span> is a multi-label creative company
              born in São Paulo. We operate at the intersection of editorial, fashion, wellness,
              lifestyle and growth — producing content, communities and creative work that reflects
              the depth and ambition of Brazilian culture.
            </p>
            <p style={BODY}>
              Our work is built across four active labels:{' '}
              <span style={B800}>.TBF.</span>,{' '}
              <span style={B800}>.THE FIORE DAILY.</span>,{' '}
              <span style={B800}>.RUNWAY UNITED COLLECTIVE.</span> and{' '}
              <span style={B800}>.THE GROWTH FACTORY.</span>
            </p>
          </div>
        </div>
      </section>


      {/* ─── PRESS RESOURCES ──────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>Resources</span>
        <h2 style={H2}>For the press</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--tbf-space-6)',
            marginTop: 'var(--tbf-space-8)',
          }}
        >
          {[
            {
              label: 'Brand Assets',
              desc: 'Logos, brand marks, visual identity guidelines and photography for editorial use.',
              href: '/press/media',
            },
            {
              label: 'Company Facts',
              desc: 'Key figures, founding date, label overview and company information.',
              href: '/about/quick-facts',
            },
            {
              label: 'Founders',
              desc: 'Background on the people who created and lead .THE BRAZILIAN FACTORY.',
              href: '/creators/tavaristico',
            },
            {
              label: 'About .TBF.',
              desc: 'Our mission, values, ecosystem structure and creative philosophy.',
              href: '/about',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: 'var(--tbf-space-6)',
                border: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.2s',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  marginBottom: 'var(--tbf-space-3)',
                }}
              >
                {item.label} →
              </span>
              <p style={{ ...BODY, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>


      {/* ─── CONTACT ──────────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>Contact</span>
            <h2 style={H2}>Media inquiries</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>
              For all press and media inquiries, interview requests, brand partnership
              discussions and image usage approvals, contact our communications team directly.
              We aim to respond within 48 business hours.
            </p>
            <a
              href="mailto:press@thebrfactory.com"
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
              press@thebrfactory.com
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
