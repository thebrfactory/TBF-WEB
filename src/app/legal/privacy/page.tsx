import type { CSSProperties } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | .THE BRAZILIAN FACTORY.',
  description:
    'Privacy Policy for .THE BRAZILIAN FACTORY. digital properties. Compliant with Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).',
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

export default function PrivacyPage() {
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
        <h1 style={TITLE}>Privacy Policy</h1>
        <p style={META}>
          Last updated: June 2026 · Compliant with Lei 13.709/2018 (LGPD)
        </p>

        <p style={{ ...BODY, marginTop: 'var(--tbf-space-10)' }}>
          This Privacy Policy describes how <span style={B}>.TBF. INC</span> (CNPJ 61.360.565/0001-74),
          the controller of personal data, collects, uses, stores and protects your personal
          information when you access our digital properties, including thebrfactory.com and
          associated label domains.
        </p>
        <p style={BODY}>
          We are committed to protecting your privacy in accordance with the{' '}
          <span style={B}>Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018)</span> and
          other applicable data protection laws.
        </p>

        <h2 style={H2}>1. Data We Collect</h2>
        <p style={BODY}>
          We may collect the following categories of personal data: (a) <span style={B}>Identity data</span> —
          name, email address, when voluntarily provided via contact forms or newsletter subscriptions;
          (b) <span style={B}>Usage data</span> — IP address, browser type, pages visited, time on page,
          referring URLs, collected automatically through analytics tools; (c) <span style={B}>Communications</span> —
          content of messages you send us via email or contact forms.
        </p>
        <p style={BODY}>
          We do not collect sensitive personal data (as defined under LGPD art. 5, II) without
          your explicit consent.
        </p>

        <h2 style={H2}>2. Legal Basis for Processing (LGPD art. 7)</h2>
        <p style={BODY}>
          We process your personal data on the following legal bases: (a) <span style={B}>Consent</span> —
          when you subscribe to our newsletter or submit a contact form; (b) <span style={B}>Legitimate interest</span> —
          for analytics, site performance and fraud prevention; (c) <span style={B}>Legal obligation</span> —
          when required by applicable Brazilian law.
        </p>

        <h2 style={H2}>3. How We Use Your Data</h2>
        <p style={BODY}>
          We use your data to: operate and improve our digital properties; send newsletters or
          communications you have requested; respond to your inquiries; comply with legal
          obligations; and analyze traffic and user behavior to improve the experience of
          our platforms.
        </p>
        <p style={BODY}>
          We do not sell, rent or trade your personal data to third parties for marketing purposes.
        </p>

        <h2 style={H2}>4. Data Retention</h2>
        <p style={BODY}>
          We retain your personal data only for as long as necessary to fulfill the purposes
          described in this policy, or as required by applicable law. Newsletter subscriber
          data is retained until you unsubscribe. Analytics data is retained for up to 26 months.
        </p>

        <h2 style={H2}>5. Your Rights Under LGPD</h2>
        <p style={BODY}>
          Under the LGPD (art. 18), you have the right to: confirm the existence of processing;
          access your data; correct incomplete or inaccurate data; request anonymization, blocking
          or deletion of unnecessary data; obtain information about third parties with whom your
          data has been shared; revoke consent at any time; and lodge a complaint with the
          Autoridade Nacional de Proteção de Dados (ANPD).
        </p>
        <p style={BODY}>
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:privacidade@thebrfactory.com" style={{ color: '#fff', fontWeight: 700 }}>
            privacidade@thebrfactory.com
          </a>.
        </p>

        <h2 style={H2}>6. Cookies</h2>
        <p style={BODY}>
          We use cookies and similar technologies to improve your experience, analyze site usage
          and support our analytics. Essential cookies are required for site functionality.
          Analytics cookies require your consent. You may adjust your browser settings to refuse
          cookies, though this may affect site functionality.
        </p>

        <h2 style={H2}>7. Third-Party Services</h2>
        <p style={BODY}>
          We use the following third-party services which may process your data:
          Google Analytics (site analytics), Vercel (hosting and CDN), Resend (transactional email),
          and Sanity (content management). Each service operates under its own privacy policy.
          We ensure that all data processors provide adequate levels of data protection.
        </p>

        <h2 style={H2}>8. Data Security</h2>
        <p style={BODY}>
          We implement appropriate technical and organizational measures to protect your personal
          data against unauthorized access, disclosure, alteration or destruction. Our platforms
          use HTTPS encryption and are hosted on infrastructure that maintains high security standards.
        </p>

        <h2 style={H2}>9. International Transfers</h2>
        <p style={BODY}>
          Some of our service providers operate outside Brazil. In such cases, we ensure that data
          transfers comply with LGPD requirements for international transfers, including ensuring
          that the destination country provides an adequate level of data protection or that
          appropriate contractual safeguards are in place.
        </p>

        <h2 style={H2}>10. Changes to This Policy</h2>
        <p style={BODY}>
          We may update this Privacy Policy from time to time. Material changes will be communicated
          by updating the date at the top of this page. Continued use of our services after changes
          are posted constitutes your acceptance of the updated policy.
        </p>

        <h2 style={H2}>11. Contact & Data Controller</h2>
        <p style={BODY}>
          For privacy inquiries, data subject requests or to contact our Data Protection Officer:
        </p>
        <p style={{ ...BODY }}>
          <a href="mailto:privacidade@thebrfactory.com" style={{ color: '#fff', fontWeight: 700 }}>
            privacidade@thebrfactory.com
          </a>
        </p>
        <p style={{ ...BODY }}>
          .TBF. INC — CNPJ 61.360.565/0001-74<br />
          R. Pamplona, 145 — Jardim Paulista<br />
          São Paulo — SP, 01405-100 · Brasil
        </p>
      </div>
    </div>
  )
}
