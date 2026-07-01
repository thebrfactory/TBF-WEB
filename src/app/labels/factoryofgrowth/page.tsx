// =============================================================================
// /labels/factoryofgrowth — THE GROWTH FACTORY
// Institutional label page — part of .TBF. ecosystem
// =============================================================================

import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '.THE GROWTH FACTORY. | .TGF. | .THE BRAZILIAN FACTORY.',
  description:
    'A growth & business development label inside the .THE BRAZILIAN FACTORY. ecosystem. Focused on strategy, expansion and scalable opportunities.',
  openGraph: {
    title: '.THE GROWTH FACTORY. | .TGF.',
    description:
      'Growth & Business Development Label. Part of .THE BRAZILIAN FACTORY.',
    images: [{ url: '/og-factory.jpg', width: 1200, height: 630 }],
  },
}

const FOCUS_AREAS = [
  'Growth Strategy',
  'Business Development',
  'Brand Expansion',
  'Startup Ecosystems',
  'Innovation',
  'Artificial Intelligence',
  'Market Opportunities',
  'Revenue Systems',
]

// Subtítulos de seção: medium, entre título e corpo
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

// Extrabold wrapper para nomes de marca dentro de texto
const B800: CSSProperties = { fontWeight: 800 }

export default function FactoryOfGrowthPage() {
  return (
    <div data-theme="inverse" style={{ background: '#000', color: '#fff' }}>

      {/* ─── HERO — full-screen com imagem de fundo + overlay ─────────────── */}
      <section
        aria-labelledby="tgf-h1"
        style={{
          position: 'relative',
          width: '100vw',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* Imagem de fundo */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/tgf/tgf-ambition.webp"
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

        {/* Conteúdo */}
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 3,
            paddingBottom: 'var(--tbf-space-20)',
            paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
          }}
        >
          {/* Título — maior, com pontos */}
          <h1
            id="tgf-h1"
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
            .THE GROWTH FACTORY.
          </h1>

          {/* Subtitle — abaixo do título */}
          <p style={{ ...SUBTITLE, marginBottom: 'var(--tbf-space-10)' }}>
            <span style={B800}>.TGF.</span> | Growth &amp; Business Development Label of{' '}
            <span style={B800}>.THE BRAZILIAN FACTORY.</span>
          </p>

          {/* Tagline vertical com espaçamento entre linhas */}
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
            Growth.
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
            Strategy.
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
            Expansion.
          </p>

          {/* Deck — duas linhas com espaçamento */}
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
            A strategic growth label focused on business development,
            innovation and scalable opportunities.
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
            href="https://factoryofgrowth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Visit factoryofgrowth.com
            <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ─── OVERVIEW ──────────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="tgf-overview">
        <div className="layout-b">
          <div>
            <p style={SUBTITLE}>Overview</p>
            <h2
              id="tgf-overview"
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
              What is <span style={B800}>.TGF.</span>?
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
              <span style={B800}>.THE GROWTH FACTORY.</span> é a vertical de crescimento,
              estratégia e desenvolvimento de negócios da{' '}
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
              Criada para transformar ideias, marcas e empresas em ativos
              escaláveis, conectando criatividade, posicionamento, tecnologia
              e oportunidades de mercado.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHY IT EXISTS — full-section com tgf-momentum como fundo ────── */}
      <section
        className="label-fullbleed"
        aria-labelledby="tgf-why"
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
            src="/images/tgf/tgf-momentum.webp"
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
          {/* Duas colunas: Position inside the ecosystem | Philosophy */}
          {/* layout-b → 1 coluna mobile, 2 colunas em ≥1024px */}
          <div className="layout-b" style={{ alignItems: 'start' }}>
            {/* Coluna esquerda — Why it exists */}
            <div>
              <p style={SUBTITLE}>Position inside the ecosystem</p>

              <h2
                id="tgf-why"
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
                Toda comunidade precisa crescer.
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
                Toda marca precisa escalar.
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
                Toda visão precisa de execução.
              </p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  lineHeight: 'var(--tbf-type-body-lh)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                <span style={B800}>.TGF.</span> existe para desenvolver a camada
                estratégica do ecossistema <span style={B800}>.TBF.</span>,
                transformando capital criativo em valor de negócio.
              </p>
            </div>

            {/* Coluna direita — Philosophy */}
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
                Growth is not a marketing department.
                <br />
                Growth is an organizational mindset.
              </p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  lineHeight: 'var(--tbf-type-body-lh)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                Acreditamos que as empresas mais relevantes da próxima década
                serão aquelas capazes de unir criatividade, tecnologia e
                execução em um único sistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOCUS AREAS ───────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="tgf-focus">
        <p style={SUBTITLE}>Areas of interest</p>
        <h2
          id="tgf-focus"
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
      <section className="section container" aria-labelledby="tgf-collective">
        <p style={SUBTITLE}>Relationship with <span style={B800}>.TBF.</span></p>
        <h2
          id="tgf-collective"
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
            <span style={B800}>.TGF.</span> trabalha em colaboração com outras
            iniciativas do ecossistema <span style={B800}>.TBF.</span>, conectando
            crescimento com cultura, comunicação e comunidade.
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
            orientada para expansão, inovação e geração de valor.
          </p>
        </div>
      </section>

      {/* ─── FOOTER BLOCK — tgf-global como fundo + texto sobreposto ──────── */}
      <section
        className="label-fullbleed"
        aria-labelledby="tgf-footer-block"
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
            src="/images/tgf/tgf-global.webp"
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
              id="tgf-footer-block"
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
              Culture creates relevance.
              <br />
              Growth creates scale.
              <br />
              Together they create value.
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
              href="https://factoryofgrowth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              factoryofgrowth.com
              <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
