import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | .THE BRAZILIAN FACTORY.',
  description:
    '.THE BRAZILIAN FACTORY. is a multi-label creative company born in São Paulo, built to give Brazilian culture a global platform.',
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


const VALUES = [
  {
    name: 'Culture First',
    desc: 'Every decision starts with a cultural question. We build for meaning before we build for scale.',
  },
  {
    name: 'Creative Integrity',
    desc: 'We do not compromise creative vision for convenience. Quality is non-negotiable.',
  },
  {
    name: 'Community Over Everything',
    desc: 'Our community is the product. We build with them, not for them.',
  },
  {
    name: 'Long-term Thinking',
    desc: 'We are not building for today\'s trend. We are building a company that will still matter in 20 years.',
  },
]

const LABELS = [
  {
    code: '.TBF.',
    name: '.THE BRAZILIAN FACTORY.',
    desc: 'Editorial label and cultural backbone of the ecosystem. Stories, essays, photography.',
    href: '/editorial',
  },
  {
    code: '.TFD.',
    name: '.THE FIORE DAILY.',
    desc: 'Wellness, intimacy, ritual and feminine expression. Presence as a practice.',
    href: '/labels/thefioredaily',
  },
  {
    code: '.RUC.',
    name: '.RUNWAY UNITED COLLECTIVE.',
    desc: 'Fashion film, editorial, SPFW, creative direction. Fashion as cultural memory.',
    href: '/labels/runwayunited',
  },
  {
    code: '.TGF.',
    name: '.THE GROWTH FACTORY.',
    desc: 'Growth strategy, business development and scalable innovation.',
    href: '/labels/factoryofgrowth',
  },
]

export default function AboutPage() {
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
          <span style={TAG}>About .TBF.</span>
          <h1 style={TITLE}>Culture Factory.</h1>
          <p style={DECK}>
            Born in São Paulo. Built for global relevance. We exist to prove that Brazilian
            creativity belongs at the center of the global cultural conversation.
          </p>
        </div>
      </section>


      {/* ─── WHO WE ARE ───────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>Who We Are</span>
            <h2 style={H2}>A company built around culture.</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              <span style={B800}>.THE BRAZILIAN FACTORY.</span> is a multi-label creative company
              founded in 2025 in São Paulo, Brazil. We operate at the intersection of editorial,
              fashion, wellness, lifestyle and business growth, creating content, communities
              and brands that carry cultural weight.
            </p>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              We are not a media company. We are not an agency. We are a creative ecosystem:
              a collection of labels, each with its own identity, audience and purpose,
              united by a shared commitment to craft and culture.
            </p>
            <p style={BODY}>
              Everything we build is intentional. Every label, every story, every collaboration
              exists because it adds something real to the culture, not because it was convenient
              or commercially safe.
            </p>
          </div>
        </div>
      </section>


      {/* ─── MISSION ──────────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>Mission</span>
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
          To make Brazilian culture undeniable.
        </p>
      </section>


      {/* ─── VALUES ───────────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>Values</span>
        <h2 style={H2}>How we operate</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--tbf-space-8)',
            marginTop: 'var(--tbf-space-8)',
          }}
        >
          {VALUES.map((v) => (
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
        <span style={SECTION_LABEL}>The Ecosystem</span>
        <h2 style={H2}>Our labels</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-1)' }}>
          {LABELS.map((label) => (
            <Link
              key={label.href}
              href={label.href}
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
