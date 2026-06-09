import type { CSSProperties } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers | .THE BRAZILIAN FACTORY.',
  description:
    'Join the team building .THE BRAZILIAN FACTORY. — a creative company at the intersection of culture, fashion, wellness and growth.',
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


const WHAT_WE_LOOK_FOR = [
  {
    trait: 'Creative courage',
    desc: 'We want people who have a point of view and are willing to defend it.',
  },
  {
    trait: 'Independent thinking',
    desc: 'We are a small team. Everyone has ownership. We need people who think, not just execute.',
  },
  {
    trait: 'Deep craft',
    desc: 'Whatever your discipline — writing, design, strategy, code — we expect mastery.',
  },
  {
    trait: 'Cultural sensitivity',
    desc: 'We build for and from culture. You need to understand why that matters.',
  },
]

export default function CareersPage() {
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
          <span style={TAG}>Careers</span>
          <h1 style={TITLE}>Build With Us.</h1>
          <p style={DECK}>
            <strong style={{ fontWeight: 800 }}>.THE BRAZILIAN FACTORY.</strong> is looking for
            people who believe culture is the most powerful business — and are ready to prove it.
          </p>
        </div>
      </section>


      {/* ─── WHY TBF ──────────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>Why .TBF.</span>
            <h2 style={H2}>Small team. Big ambition.</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              We are a lean team building something with genuine cultural ambition. There is no
              bureaucracy, no committee approval for every small decision. If you join, you will
              have real ownership and real impact — from day one.
            </p>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>
              We are São Paulo-based and remote-friendly. We work across editorial, fashion,
              wellness, lifestyle and business growth. Regardless of your discipline, your work
              will connect directly to the culture we are building.
            </p>
            <p style={BODY}>
              We are looking for people with strong opinions, high standards and a genuine
              obsession with their craft. If that sounds like you, we want to talk.
            </p>
          </div>
        </div>
      </section>


      {/* ─── WHAT WE LOOK FOR ─────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>What We Look For</span>
        <h2 style={H2}>Who fits here</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--tbf-space-8)',
          }}
        >
          {WHAT_WE_LOOK_FOR.map((item) => (
            <div key={item.trait}>
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
                {item.trait}
              </p>
              <p style={{ ...BODY, color: 'rgba(255,255,255,0.55)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ─── OPEN ROLES ───────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>Open Roles</span>
            <h2 style={H2}>Current openings</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>
              We do not always have a formal listing open — but we are always looking for
              exceptional people. If you have a perspective on what you would build here and
              why it would matter, send us a message.
            </p>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>
              Areas we are always interested in: editorial, creative direction, photography,
              video, community management, design, brand strategy, and growth.
            </p>
            <a
              href="mailto:careers@thebrfactory.com"
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
              careers@thebrfactory.com
            </a>
          </div>
        </div>
      </section>


      {/* ─── HOW WE WORK ──────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>How We Work</span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--tbf-space-8)',
          }}
        >
          {[
            { label: 'Location', value: 'São Paulo, Brazil\nRemote-friendly' },
            { label: 'Language', value: 'Portuguese\nEnglish' },
            { label: 'Culture', value: 'Culture-first\nHigh ownership' },
            { label: 'Stage', value: 'MVP\nEarly team' },
          ].map((item) => (
            <div key={item.label}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 'var(--tbf-space-2)',
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  color: '#fff',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.6,
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
