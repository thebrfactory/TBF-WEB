import type { CSSProperties } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | .THE BRAZILIAN FACTORY.',
  description: 'Terms of Service for thebrfactory.com and all .TBF. digital properties.',
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

export default function TermsPage() {
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
        <h1 style={TITLE}>Terms of Service</h1>
        <p style={META}>Last updated: June 2026 · Effective immediately upon publication</p>

        <p style={{ ...BODY, marginTop: 'var(--tbf-space-10)' }}>
          These Terms of Service ("Terms") govern your access to and use of the websites,
          digital properties and services operated by{' '}
          <span style={B}>.TBF. INC</span> (CNPJ 61.360.565/0001-74), headquartered at
          R. Pamplona, 145 — Jardim Paulista, São Paulo — SP, 01405-100, Brazil
          (collectively, "we," "us," or ".TBF.").
        </p>
        <p style={BODY}>
          By accessing or using any of our digital properties — including thebrfactory.com and
          all associated label domains — you agree to be bound by these Terms. If you do not
          agree, do not use our services.
        </p>

        <h2 style={H2}>1. Acceptance of Terms</h2>
        <p style={BODY}>
          By accessing any .TBF. digital property, you confirm that you are at least 13 years
          of age (or the minimum age required by applicable law in your jurisdiction), that you
          have the right to enter into these Terms, and that you agree to comply with them in full.
        </p>

        <h2 style={H2}>2. Use of Our Properties</h2>
        <p style={BODY}>
          You may use our digital properties for lawful, personal and non-commercial purposes only.
          You agree not to: (a) copy, reproduce, distribute or create derivative works from our
          content without express written permission; (b) use any automated tools to scrape or
          extract content; (c) interfere with the proper operation of any .TBF. property;
          (d) impersonate .TBF., its labels, or any person associated with the company.
        </p>

        <h2 style={H2}>3. Intellectual Property</h2>
        <p style={BODY}>
          All content published on .TBF. digital properties — including but not limited to text,
          photography, video, brand marks, logotypes, design and code — is the exclusive property
          of <span style={B}>.TBF. INC</span> or its respective rights holders. All rights reserved.
        </p>
        <p style={BODY}>
          The .TBF., .TFD., .RUC. and .TGF. brand marks and identities are trademarks of
          .TBF. INC. Unauthorized use is strictly prohibited.
        </p>

        <h2 style={H2}>4. User Submissions</h2>
        <p style={BODY}>
          If you submit any content to us (including pitches, comments or portfolio materials),
          you grant .TBF. INC a non-exclusive, worldwide, royalty-free license to use, display
          and reproduce that content in connection with our services. You represent that you
          own or have the right to submit such content.
        </p>

        <h2 style={H2}>5. Prohibited Activities</h2>
        <p style={BODY}>
          You agree not to use our services to: distribute spam or unsolicited communications;
          engage in any activity that violates applicable law; upload malicious code or content;
          harass, threaten or harm any individual; or circumvent any security or access control
          measures we have in place.
        </p>

        <h2 style={H2}>6. Links to Third Parties</h2>
        <p style={BODY}>
          Our properties may contain links to third-party websites and services. We are not
          responsible for the content, privacy practices or terms of those third parties.
          The presence of a link does not constitute endorsement.
        </p>

        <h2 style={H2}>7. Disclaimers</h2>
        <p style={BODY}>
          Our digital properties and content are provided "as is" without warranties of any kind,
          express or implied. We do not warrant that our services will be uninterrupted, error-free
          or free of harmful components. We reserve the right to modify, suspend or discontinue
          any service at any time without notice.
        </p>

        <h2 style={H2}>8. Limitation of Liability</h2>
        <p style={BODY}>
          To the maximum extent permitted by applicable law, .TBF. INC and its officers,
          directors, employees, partners and labels shall not be liable for any indirect,
          incidental, special, consequential or punitive damages arising from your use of
          or inability to use our services.
        </p>

        <h2 style={H2}>9. Governing Law & Jurisdiction</h2>
        <p style={BODY}>
          These Terms are governed by the laws of the Federative Republic of Brazil.
          Any disputes arising from or relating to these Terms shall be subject to the
          exclusive jurisdiction of the courts of the city of São Paulo, State of São Paulo, Brazil.
        </p>

        <h2 style={H2}>10. Changes to These Terms</h2>
        <p style={BODY}>
          We may update these Terms at any time. Changes will be effective upon publication on
          this page. Continued use of our services after changes are posted constitutes your
          acceptance of the updated Terms. We encourage you to review this page periodically.
        </p>

        <h2 style={H2}>11. Contact</h2>
        <p style={BODY}>
          For questions about these Terms, contact us at{' '}
          <a href="mailto:legal@thebrfactory.com" style={{ color: '#fff', fontWeight: 700 }}>
            legal@thebrfactory.com
          </a>
          {' '}or by mail at:
        </p>
        <p style={{ ...BODY, fontStyle: 'normal' }}>
          .TBF. INC — CNPJ 61.360.565/0001-74<br />
          R. Pamplona, 145 — Jardim Paulista<br />
          São Paulo — SP, 01405-100 · Brasil
        </p>
      </div>
    </div>
  )
}
