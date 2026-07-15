// =============================================================================
// /labels/runwayunited — RUNWAY UNITED COLLECTIVE
// Institutional label page — part of .TBF. ecosystem
// =============================================================================

import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '.RUNWAY UNITED COLLECTIVE. | .RUC. | .THE BRAZILIAN FACTORY.',
  description:
    'A fashion films and editorial label inside the .THE BRAZILIAN FACTORY. ecosystem. Where runway meets culture, film and creative direction.',
  openGraph: {
    title: '.RUNWAY UNITED COLLECTIVE. | .RUC.',
    description:
      'Fashion Film Magazine. Part of .THE BRAZILIAN FACTORY.',
    images: [{ url: '/og-factory.jpg', width: 1200, height: 630 }],
  },
}

const FOCUS_AREAS = [
  'Fashion Films',
  'Editorial',
  'SPFW',
  'Runway',
  'Creative Direction',
  'Fashion Photography',
  'Casting',
  'Cultural Curation',
]

const SUBTITLE: CSSProperties = {
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: '0.9rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ffffff',
  lineHeight: 1.3,
  marginBottom: 'var(--tbf-space-6)',
}

const B800: CSSProperties = { fontWeight: 800 }

export default function RunwayUnitedPage() {
  return (
    <div data-theme="inverse" style={{ background: '#000', color: '#fff' }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="ruc-h1"
        style={{
          position: 'relative',
          width: '100vw',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/ruc/ruc-hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.45 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, #000000 0%, transparent 30%, transparent 55%, #000000 100%)',
            }}
          />
        </div>

        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 3,
            paddingBottom: 'var(--tbf-space-20)',
            paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
          }}
        >
          <h1
            id="ruc-h1"
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'clamp(2rem, 8vw, 6rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: 'var(--tbf-type-display-xl-ls)',
              color: '#ffffff',
              marginBottom: 'var(--tbf-space-5)',
            }}
          >
            .RUNWAY UNITED COLLECTIVE.
          </h1>

          <p style={{ ...SUBTITLE, marginBottom: 'var(--tbf-space-10)' }}>
            <span style={B800}>.RUC.</span> | Fashion Films &amp; Editorial Label of{' '}
            <span style={B800}>.THE BRAZILIAN FACTORY.</span>
          </p>

          <p
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'var(--tbf-type-h2-size-sm)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.1,
              marginBottom: 'var(--tbf-space-3)',
            }}
          >
            Fashion.
          </p>
          <p
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'var(--tbf-type-h2-size-sm)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.1,
              marginBottom: 'var(--tbf-space-3)',
            }}
          >
            Film.
          </p>
          <p
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'var(--tbf-type-h2-size-sm)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.1,
              marginBottom: 'var(--tbf-space-10)',
            }}
          >
            Culture.
          </p>

          <p
            style={{
              fontFamily: 'var(--tbf-type-deck-family)',
              fontSize: 'var(--tbf-type-deck-size-sm)',
              fontWeight: 'var(--tbf-type-deck-weight)',
              lineHeight: 'var(--tbf-type-deck-lh)',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '48ch',
              marginBottom: 'var(--tbf-space-4)',
            }}
          >
            A creative collective focused on fashion films, editorial
            and runway culture.
          </p>
          <p
            style={{
              fontFamily: 'var(--tbf-type-deck-family)',
              fontSize: 'var(--tbf-type-deck-size-sm)',
              fontWeight: 'var(--tbf-type-deck-weight)',
              lineHeight: 'var(--tbf-type-deck-lh)',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '48ch',
              marginBottom: 'var(--tbf-space-10)',
            }}
          >
            Part of the <span style={B800}>.THE BRAZILIAN FACTORY.</span> ecosystem.
          </p>

          <a
            href="https://instagram.com/runwayunited"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            @runwayunited
            <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ─── OVERVIEW ──────────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="ruc-overview">
        <div className="layout-b">
          <div>
            <p style={SUBTITLE}>Overview</p>
            <h2
              id="ruc-overview"
              style={{
                fontFamily: 'var(--tbf-type-h2-family)',
                fontSize: 'var(--tbf-type-h2-size-sm)',
                fontWeight: 800,
                lineHeight: 'var(--tbf-type-h2-lh)',
                letterSpacing: 'var(--tbf-type-h2-ls)',
                color: '#ffffff',
                marginBottom: 'var(--tbf-space-6)',
              }}
            >
              What is <span style={B800}>.RUC.</span>?
            </h2>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--tbf-type-body-family)',
                fontSize: 'var(--tbf-type-body-size-sm)',
                lineHeight: 'var(--tbf-type-body-lh)',
                color: 'rgba(255,255,255,0.75)',
                marginBottom: 'var(--tbf-space-6)',
              }}
            >
              <span style={B800}>.RUNWAY UNITED COLLECTIVE.</span> é a vertical de moda,
              filmes e direção criativa da{' '}
              <span style={B800}>.THE BRAZILIAN FACTORY.</span>
            </p>
            <p
              style={{
                fontFamily: 'var(--tbf-type-body-family)',
                fontSize: 'var(--tbf-type-body-size-sm)',
                lineHeight: 'var(--tbf-type-body-lh)',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              Criada para documentar, produzir e amplificar a cena criativa brasileira,
              unindo runway, cinema e identidade cultural em uma única linguagem.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHY IT EXISTS — full-section com imagem de fundo ─────────────── */}
      <section
        className="label-fullbleed"
        aria-labelledby="ruc-why"
        style={{
          position: 'relative',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/ruc/ruc-backstage.webp"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.45 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, #000000 0%, transparent 25%, transparent 70%, #000000 100%)',
            }}
          />
        </div>

        <div
          className="container"
          style={{ position: 'relative', zIndex: 3, paddingBlock: 'var(--tbf-space-20)' }}
        >
          <div className="layout-b" style={{ alignItems: 'start' }}>
            <div>
              <p style={SUBTITLE}>Position inside the ecosystem</p>

              <h2
                id="ruc-why"
                style={{
                  fontFamily: 'var(--tbf-type-display-xl-family)',
                  fontSize: 'var(--tbf-type-h1-size-sm)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: 'var(--tbf-type-display-xl-ls)',
                  color: '#ffffff',
                  marginBottom: 'var(--tbf-space-10)',
                }}
              >
                Why it exists
              </h2>

              <p
                style={{
                  fontFamily: 'var(--tbf-type-deck-family)',
                  fontSize: 'var(--tbf-type-deck-size-sm)',
                  fontWeight: 'var(--tbf-type-deck-weight)',
                  lineHeight: 'var(--tbf-type-deck-lh)',
                  color: '#ffffff',
                  marginBottom: 'var(--tbf-space-2)',
                }}
              >
                Todo desfile conta uma história.
              </p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-deck-family)',
                  fontSize: 'var(--tbf-type-deck-size-sm)',
                  fontWeight: 'var(--tbf-type-deck-weight)',
                  lineHeight: 'var(--tbf-type-deck-lh)',
                  color: '#ffffff',
                  marginBottom: 'var(--tbf-space-2)',
                }}
              >
                Toda coleção carrega uma visão.
              </p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-deck-family)',
                  fontSize: 'var(--tbf-type-deck-size-sm)',
                  fontWeight: 'var(--tbf-type-deck-weight)',
                  lineHeight: 'var(--tbf-type-deck-lh)',
                  color: '#ffffff',
                  marginBottom: 'var(--tbf-space-10)',
                }}
              >
                Todo criador merece uma plataforma.
              </p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  lineHeight: 'var(--tbf-type-body-lh)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                <span style={B800}>.RUC.</span> existe para documentar a camada
                criativa do ecossistema <span style={B800}>.TBF.</span>,
                transformando moda em narrativa e runway em cultura.
              </p>
            </div>

            <div>
              <p style={SUBTITLE}>Philosophy</p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-display-xl-family)',
                  fontSize: 'var(--tbf-type-h1-size-sm)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: 'var(--tbf-type-display-xl-ls)',
                  color: '#ffffff',
                  marginBottom: 'var(--tbf-space-8)',
                }}
              >
                Fashion is not an industry.
                <br />
                Fashion is a language.
              </p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  lineHeight: 'var(--tbf-type-body-lh)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                Acreditamos que os criadores mais relevantes da próxima geração
                serão aqueles capazes de unir estética, narrativa e impacto
                cultural em uma única visão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOCUS AREAS ───────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="ruc-focus">
        <p style={SUBTITLE}>Areas of interest</p>
        <h2
          id="ruc-focus"
          style={{
            fontFamily: 'var(--tbf-type-h2-family)',
            fontSize: 'var(--tbf-type-h2-size-sm)',
            fontWeight: 800,
            lineHeight: 'var(--tbf-type-h2-lh)',
            letterSpacing: 'var(--tbf-type-h2-ls)',
            color: '#ffffff',
            marginBottom: 'var(--tbf-space-10)',
          }}
        >
          Core Domains
        </h2>

        <ul
          role="list"
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--tbf-space-3)',
          }}
        >
          {FOCUS_AREAS.map((area) => (
            <li key={area}>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  letterSpacing: 'var(--tbf-type-micro-ls)',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  paddingBlock: 'var(--tbf-space-2)',
                  paddingInline: 'var(--tbf-space-4)',
                }}
              >
                {area}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── CONNECTION TO TBF ─────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="ruc-collective">
        <p style={SUBTITLE}>Relationship with <span style={B800}>.TBF.</span></p>
        <h2
          id="ruc-collective"
          style={{
            fontFamily: 'var(--tbf-type-h2-family)',
            fontSize: 'var(--tbf-type-h2-size-sm)',
            fontWeight: 800,
            lineHeight: 'var(--tbf-type-h2-lh)',
            letterSpacing: 'var(--tbf-type-h2-ls)',
            color: '#ffffff',
            marginBottom: 'var(--tbf-space-8)',
          }}
        >
          Inside the Collective
        </h2>

        <div className="layout-b">
          <p
            style={{
              fontFamily: 'var(--tbf-type-body-family)',
              fontSize: 'var(--tbf-type-body-size-sm)',
              lineHeight: 'var(--tbf-type-body-lh)',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            <span style={B800}>.RUC.</span> trabalha em colaboração com outras
            iniciativas do ecossistema <span style={B800}>.TBF.</span>, conectando
            moda com cultura, editorial e comunidade criativa.
          </p>
          <p
            style={{
              fontFamily: 'var(--tbf-type-body-family)',
              fontSize: 'var(--tbf-type-body-size-sm)',
              lineHeight: 'var(--tbf-type-body-lh)',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            Sua atuação complementa as demais labels através de uma perspectiva
            orientada para estética, narrativa visual e direção criativa.
          </p>
        </div>
      </section>

      {/* ─── FOOTER BLOCK ──────────────────────────────────────────────────── */}
      <section
        className="label-fullbleed"
        aria-labelledby="ruc-footer-block"
        style={{
          position: 'relative',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/ruc/ruc-closing.webp"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 20%', opacity: 0.55 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, #000000 0%, transparent 30%, transparent 65%, #000000 100%)',
            }}
          />
        </div>

        <div
          className="container"
          style={{ position: 'relative', zIndex: 3, paddingBlock: 'var(--tbf-space-20)' }}
        >
          <div style={{ maxWidth: '50ch' }}>
            <p
              id="ruc-footer-block"
              style={{
                fontFamily: 'var(--tbf-type-display-xl-family)',
                fontSize: 'var(--tbf-type-h1-size-sm)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: 'var(--tbf-type-display-xl-ls)',
                color: '#ffffff',
                marginBottom: 'var(--tbf-space-10)',
              }}
            >
              Fashion creates culture.
              <br />
              Film creates memory.
              <br />
              Together they create legacy.
            </p>

            <p
              style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                marginBottom: 'var(--tbf-space-8)',
              }}
            >
              Founded in São Paulo. Built for global ambition.
              <br />
              Part of <span style={B800}>.THE BRAZILIAN FACTORY.</span>
            </p>

            <a
              href="https://instagram.com/runwayunited"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              @runwayunited
              <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
