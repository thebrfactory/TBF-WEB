import type { CSSProperties } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media Resources | .THE BRAZILIAN FACTORY.',
  description:
    'Official brand assets, logos, visual identity guidelines and photography resources from .THE BRAZILIAN FACTORY. for editorial and press use.',
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


const GUIDELINES = [
  'Use .TBF. brand marks only in contexts approved in writing by our press team.',
  'Do not modify, crop, recolor or distort any brand mark or logotype.',
  'Maintain minimum clear space around all marks as specified in the brand guidelines.',
  'Never place brand marks over busy backgrounds without our approval.',
  'Photography and video content may only be used for editorial purposes.',
  'All asset requests must be attributed to .THE BRAZILIAN FACTORY. in published work.',
]

export default function MediaPage() {
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
          <span style={TAG}>Media Resources</span>
          <h1 style={TITLE}>Brand Assets.</h1>
          <p style={DECK}>
            Official visual identity resources for editorial, press and approved
            brand partnership use. All content is subject to usage terms.
          </p>
        </div>
      </section>


      {/* ─── USAGE TERMS ──────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>Usage Terms</span>
            <h2 style={H2}>Editorial use only</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>
              All content downloaded from this page, including photography, video, brand marks
              and typographic assets, may only be used for{' '}
              <strong style={{ fontWeight: 700, color: '#fff' }}>editorial purposes</strong>.
              Any other use is strictly prohibited without prior written approval from our
              communications team.
            </p>
            <p style={BODY}>
              When in doubt, contact{' '}
              <a
                href="mailto:press@thebrfactory.com"
                style={{ color: '#fff', fontWeight: 700 }}
              >
                press@thebrfactory.com
              </a>{' '}
              before publishing.
            </p>
          </div>
        </div>
      </section>


      {/* ─── AVAILABLE ASSETS ─────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>Available Resources</span>
        <h2 style={H2}>Brand kit</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--tbf-space-6)',
          }}
        >
          {[
            {
              category: 'Brand',
              items: [
                '.TBF. Primary Logotype',
                '.TBF. São Paulo Mark',
                '.TBF. Symbol (Asterisk Mark)',
                'Brand color palette',
                'Typography specifications',
              ],
            },
            {
              category: 'Labels',
              items: [
                '.TFD. | THE FIORE DAILY mark',
                '.RUC. | RUNWAY UNITED COLLECTIVE mark',
                '.TGF. | THE GROWTH FACTORY mark',
                'Label color systems',
              ],
            },
            {
              category: 'Photography',
              items: [
                'Brand photography library',
                'Editorial photography (licensed per use)',
                'High-resolution product images',
              ],
            },
          ].map((group) => (
            <div
              key={group.category}
              style={{
                padding: 'var(--tbf-space-6)',
                border: '1px solid rgba(255,255,255,0.1)',
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
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: 'var(--tbf-space-4)',
                }}
              >
                {group.category}
              </span>
              <ul
                style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-2)' }}
              >
                {group.items.map((item) => (
                  <li
                    key={item}
                    style={{ ...BODY, color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          style={{
            ...BODY,
            color: 'rgba(255,255,255,0.4)',
            marginTop: 'var(--tbf-space-8)',
            fontStyle: 'italic',
          }}
        >
          Assets are available upon approved request. Contact press@thebrfactory.com to receive
          the brand kit.
        </p>
      </section>


      {/* ─── GUIDELINES ───────────────────────────────────────────────────── */}
      <section className="section container">
        <span style={SECTION_LABEL}>Guidelines</span>
        <h2 style={H2}>Brand usage rules</h2>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {GUIDELINES.map((rule, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: 'var(--tbf-space-4)',
                padding: 'var(--tbf-space-4) 0',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.25)',
                  minWidth: '1.5rem',
                  paddingTop: '2px',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p style={{ ...BODY, margin: 0, color: 'rgba(255,255,255,0.65)' }}>{rule}</p>
            </li>
          ))}
          <li style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </ul>
      </section>


      {/* ─── CONTACT ──────────────────────────────────────────────────────── */}
      <section className="section container">
        <div className="layout-b">
          <div>
            <span style={SECTION_LABEL}>Contact</span>
            <h2 style={H2}>Request assets</h2>
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>
              To request brand assets, high-resolution photography or approval for specific
              uses, contact our press team with a brief description of the project and
              intended publication.
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
