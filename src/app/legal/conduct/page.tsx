import type { CSSProperties } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Code of Conduct | .THE BRAZILIAN FACTORY.',
  description:
    'Community standards and behavioral guidelines for all .THE BRAZILIAN FACTORY. digital properties and interactions.',
}

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

export default function ConductPage() {
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
        <span style={LEGAL_TAG}>Legal</span>
        <h1 style={TITLE}>Code of Conduct</h1>
        <p style={META}>Last updated: June 2026</p>

        <p style={{ ...BODY, marginTop: 'var(--tbf-space-10)' }}>
          This Code of Conduct applies to all interactions with{' '}
          <span style={B}>.THE BRAZILIAN FACTORY.</span> digital properties, communities,
          events, communications and any context in which you represent or engage with the
          .TBF. ecosystem. It applies to participants, contributors, collaborators, employees
          and anyone acting on behalf of .TBF.
        </p>

        <h2 style={H2}>1. Our Commitment</h2>
        <p style={BODY}>
          <span style={B}>.THE BRAZILIAN FACTORY.</span> is committed to providing a safe,
          respectful and inclusive environment for everyone — regardless of age, body size,
          disability, ethnicity, gender identity and expression, nationality, personal appearance,
          race, religion, sexual orientation or socioeconomic status.
        </p>
        <p style={BODY}>
          We expect all participants in our community to uphold these standards in every interaction,
          both online and offline.
        </p>

        <h2 style={H2}>2. Expected Behavior</h2>
        <p style={BODY}>All participants are expected to:</p>
        <ul style={{ paddingLeft: 'var(--tbf-space-6)', marginBottom: 'var(--tbf-space-4)' }}>
          {[
            'Treat all individuals with respect, kindness and dignity',
            'Engage in good faith and with honest, constructive intent',
            'Accept constructive feedback and different perspectives gracefully',
            'Prioritize the well-being of the community over individual preferences',
            'Report harmful behavior promptly and responsibly',
            'Respect the intellectual property and privacy of others',
          ].map((item) => (
            <li key={item} style={LI}>{item}</li>
          ))}
        </ul>

        <h2 style={H2}>3. Unacceptable Behavior</h2>
        <p style={BODY}>The following behaviors are explicitly prohibited:</p>
        <ul style={{ paddingLeft: 'var(--tbf-space-6)', marginBottom: 'var(--tbf-space-4)' }}>
          {[
            'Harassment, intimidation, bullying or threatening language directed at any person',
            'Discrimination based on any protected characteristic',
            'Sexual harassment or unwelcome sexual attention in any form',
            'Sharing private information about others without consent',
            'Posting or distributing violent, abusive or sexually explicit content',
            'Spreading misinformation or deliberately false claims about .TBF. or its people',
            'Any attempt to impersonate .TBF., its labels, team members or community figures',
            'Unauthorized use of .TBF. brand marks, content or intellectual property',
          ].map((item) => (
            <li key={item} style={LI}>{item}</li>
          ))}
        </ul>

        <h2 style={H2}>4. Reporting</h2>
        <p style={BODY}>
          If you witness or experience conduct that violates this Code, please report it to our
          team at{' '}
          <a href="mailto:conduta@thebrfactory.com" style={{ color: '#fff', fontWeight: 700 }}>
            conduta@thebrfactory.com
          </a>
          . All reports are treated with confidentiality and reviewed by the .TBF. editorial
          team. We do not tolerate retaliation against anyone who files a good-faith report.
        </p>

        <h2 style={H2}>5. Enforcement</h2>
        <p style={BODY}>
          Violations of this Code may result in actions ranging from a written warning to
          permanent removal from .TBF. platforms and communities, depending on the severity
          and frequency of the behavior. We reserve the right to take any action we deem
          appropriate to protect the integrity and safety of our community.
        </p>
        <p style={BODY}>
          Serious violations involving illegal conduct may be referred to the appropriate
          legal authorities.
        </p>

        <h2 style={H2}>6. Scope</h2>
        <p style={BODY}>
          This Code applies to all .TBF. digital properties, social media channels, comment
          sections, email communications, events (physical and virtual) and any space where
          .TBF. or its labels are represented.
        </p>

        <h2 style={H2}>7. Contact</h2>
        <p style={BODY}>
          Questions about this Code of Conduct may be directed to{' '}
          <a href="mailto:conduta@thebrfactory.com" style={{ color: '#fff', fontWeight: 700 }}>
            conduta@thebrfactory.com
          </a>.
        </p>
        <p style={BODY}>
          .TBF. INC — CNPJ 61.360.565/0001-74<br />
          R. Pamplona, 145 — Jardim Paulista<br />
          São Paulo — SP, 01405-100 · Brasil
        </p>
      </div>
    </div>
  )
}
