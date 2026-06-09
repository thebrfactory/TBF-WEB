import type { CSSProperties } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Law Enforcement Guidelines | .THE BRAZILIAN FACTORY.',
  description:
    'Guidelines for law enforcement and government authorities requesting information from .THE BRAZILIAN FACTORY.',
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

export default function LawEnforcementPage() {
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
        <h1 style={TITLE}>Law Enforcement Guidelines</h1>
        <p style={META}>Last updated: June 2026</p>

        <p style={{ ...BODY, marginTop: 'var(--tbf-space-10)' }}>
          These guidelines are intended for law enforcement agencies, government authorities
          and regulatory bodies submitting official requests for information to{' '}
          <span style={B}>.TBF. INC</span> (CNPJ 61.360.565/0001-74). Requests from private
          parties should be directed to{' '}
          <a href="mailto:legal@thebrfactory.com" style={{ color: '#fff', fontWeight: 700 }}>
            legal@thebrfactory.com
          </a>
          .
        </p>

        <h2 style={H2}>1. Introduction</h2>
        <p style={BODY}>
          <span style={B}>.TBF. INC</span> is a Brazilian company registered under CNPJ
          61.360.565/0001-74, headquartered in São Paulo, Brazil. We operate digital editorial
          properties and are subject to Brazilian law, including the Marco Civil da Internet
          (Lei 12.965/2014), the Lei Geral de Proteção de Dados (Lei 13.709/2018) and other
          applicable regulations.
        </p>
        <p style={BODY}>
          We cooperate with law enforcement agencies in accordance with applicable Brazilian law.
          We review all requests carefully and may seek clarification before complying.
        </p>

        <h2 style={H2}>2. Types of Information We May Hold</h2>
        <p style={BODY}>
          Depending on the nature of the request, we may hold the following categories of data:
        </p>
        <ul style={{ paddingLeft: 'var(--tbf-space-6)', marginBottom: 'var(--tbf-space-4)' }}>
          {[
            'Newsletter subscriber email addresses (voluntarily provided)',
            'IP addresses and access logs associated with our platforms (retained per LGPD and Marco Civil)',
            'Contact form submissions (email and message content)',
            'Contributor information for editorial submissions',
          ].map((item) => (
            <li key={item} style={LI}>{item}</li>
          ))}
        </ul>
        <p style={BODY}>
          We do not operate social networks, messaging platforms or user accounts. The scope
          of data we hold is limited to what is described above.
        </p>

        <h2 style={H2}>3. How to Submit a Request</h2>
        <p style={BODY}>
          All official requests must be submitted in writing via email to{' '}
          <a href="mailto:legal@thebrfactory.com" style={{ color: '#fff', fontWeight: 700 }}>
            legal@thebrfactory.com
          </a>
          . Requests must include:
        </p>
        <ul style={{ paddingLeft: 'var(--tbf-space-6)', marginBottom: 'var(--tbf-space-4)' }}>
          {[
            'The name and contact information of the requesting authority',
            'A description of the ongoing investigation and legal basis for the request',
            'The specific type of information being requested',
            'The relevant time period',
            'A copy of the applicable court order, judicial authorization or legal instrument',
            'A return address for the response',
          ].map((item) => (
            <li key={item} style={LI}>{item}</li>
          ))}
        </ul>
        <p style={BODY}>
          Requests submitted without the required documentation will not be processed.
        </p>

        <h2 style={H2}>4. Legal Requirements</h2>
        <p style={BODY}>
          We will only disclose information in response to valid legal process as required
          by Brazilian law. Requests from foreign authorities must comply with international
          legal assistance treaties (MLATs) or be submitted through appropriate diplomatic
          channels. We may provide notice to affected users prior to disclosure, unless
          prohibited by law or court order.
        </p>

        <h2 style={H2}>5. Emergency Requests</h2>
        <p style={BODY}>
          In cases involving an imminent threat to life or physical safety, we may cooperate
          with emergency requests outside the standard process. Emergency requests should be
          sent to{' '}
          <a href="mailto:legal@thebrfactory.com" style={{ color: '#fff', fontWeight: 700 }}>
            legal@thebrfactory.com
          </a>{' '}
          with the subject line <span style={B}>"EMERGENCY — IMMINENTE RISCO DE VIDA"</span>.
          Include the requesting officer's name, badge number, agency and direct contact.
          We cannot guarantee a response time for emergency requests but will review them
          as expeditiously as possible.
        </p>

        <h2 style={H2}>6. Processing Time</h2>
        <p style={BODY}>
          We process standard requests within 15 to 30 business days of receipt of a complete
          and valid request, subject to the complexity of the request and applicable legal
          requirements. We will notify the requesting authority if additional time is needed.
        </p>

        <h2 style={H2}>7. Data Preservation Requests</h2>
        <p style={BODY}>
          We will preserve data relevant to a pending legal request for up to 90 days upon
          written request. Preservation requests should also be sent to{' '}
          <a href="mailto:legal@thebrfactory.com" style={{ color: '#fff', fontWeight: 700 }}>
            legal@thebrfactory.com
          </a>
          .
        </p>

        <h2 style={H2}>8. Contact</h2>
        <p style={BODY}>
          All law enforcement inquiries should be addressed to our legal team:
        </p>
        <p style={BODY}>
          <a href="mailto:legal@thebrfactory.com" style={{ color: '#fff', fontWeight: 700 }}>
            legal@thebrfactory.com
          </a>
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
