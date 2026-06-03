// =============================================================================
// /labels/factoryofgrowth — THE GROWTH FACTORY
// Institutional label page — part of .TBF. ecosystem
// Responde apenas: "Por que a TGF existe dentro da TBF?"
// =============================================================================

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Growth Factory | .TGF. | .THE BRAZILIAN FACTORY.',
  description:
    'A growth & business development label inside the .THE BRAZILIAN FACTORY. ecosystem. Focused on strategy, expansion and scalable opportunities.',
  openGraph: {
    title: 'The Growth Factory | .TGF.',
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

export default function FactoryOfGrowthPage() {
  return (
    <div data-theme="inverse">

      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="section section--heroic container"
        aria-labelledby="tgf-h1"
      >
        <p
          style={{
            fontFamily: 'var(--tbf-type-micro-family)',
            fontSize: 'var(--tbf-type-micro-size)',
            letterSpacing: 'var(--tbf-type-micro-ls)',
            color: 'var(--tbf-text-tertiary)',
            textTransform: 'uppercase',
            marginBottom: 'var(--tbf-space-8)',
          }}
        >
          .TGF. — Growth & Business Development Label
        </p>

        <h1
          id="tgf-h1"
          style={{
            fontFamily: 'var(--tbf-type-display-xl-family)',
            fontSize: 'var(--tbf-type-display-xl-size-sm)',
            fontWeight: 'var(--tbf-type-display-xl-weight)',
            lineHeight: 'var(--tbf-type-display-xl-lh-sm)',
            letterSpacing: 'var(--tbf-type-display-xl-ls)',
            color: 'var(--tbf-text-primary)',
            marginBottom: 'var(--tbf-space-8)',
          }}
        >
          THE GROWTH
          <br />
          FACTORY
        </h1>

        <p
          style={{
            fontFamily: 'var(--tbf-type-display-xl-family)',
            fontSize: 'var(--tbf-type-h2-size-sm)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            color: 'var(--tbf-text-secondary)',
            lineHeight: 1.1,
            marginBottom: 'var(--tbf-space-10)',
          }}
        >
          Growth.
          <br />
          Strategy.
          <br />
          Expansion.
        </p>

        <p
          style={{
            fontFamily: 'var(--tbf-type-deck-family)',
            fontSize: 'var(--tbf-type-deck-size-sm)',
            fontWeight: 'var(--tbf-type-deck-weight)',
            lineHeight: 'var(--tbf-type-deck-lh)',
            color: 'var(--tbf-text-secondary)',
            maxWidth: '48ch',
            marginBottom: 'var(--tbf-space-10)',
          }}
        >
          A strategic growth label focused on business development,
          innovation and scalable opportunities.
          <br />
          Part of the .THE BRAZILIAN FACTORY. ecosystem.
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
      </section>

      {/* ─── OVERVIEW ──────────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="tgf-overview">
        <div className="layout-b">
          <div>
            <p
              style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: 'var(--tbf-type-micro-size)',
                letterSpacing: 'var(--tbf-type-micro-ls)',
                color: 'var(--tbf-text-tertiary)',
                textTransform: 'uppercase',
                marginBottom: 'var(--tbf-space-6)',
              }}
            >
              Overview
            </p>
            <h2
              id="tgf-overview"
              style={{
                fontFamily: 'var(--tbf-type-h2-family)',
                fontSize: 'var(--tbf-type-h2-size-sm)',
                fontWeight: 'var(--tbf-type-h2-weight)',
                lineHeight: 'var(--tbf-type-h2-lh)',
                letterSpacing: 'var(--tbf-type-h2-ls)',
                color: 'var(--tbf-text-primary)',
                marginBottom: 'var(--tbf-space-6)',
              }}
            >
              What is .TGF.?
            </h2>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--tbf-type-body-family)',
                fontSize: 'var(--tbf-type-body-size-sm)',
                lineHeight: 'var(--tbf-type-body-lh)',
                color: 'var(--tbf-text-secondary)',
                marginBottom: 'var(--tbf-space-6)',
              }}
            >
              A THE GROWTH FACTORY é a vertical de crescimento, estratégia e
              desenvolvimento de negócios da .THE BRAZILIAN FACTORY.
            </p>
            <p
              style={{
                fontFamily: 'var(--tbf-type-body-family)',
                fontSize: 'var(--tbf-type-body-size-sm)',
                lineHeight: 'var(--tbf-type-body-lh)',
                color: 'var(--tbf-text-secondary)',
              }}
            >
              Criada para transformar ideias, marcas e empresas em ativos
              escaláveis, conectando criatividade, posicionamento, tecnologia
              e oportunidades de mercado.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHY IT EXISTS ─────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="tgf-why">
        <p
          style={{
            fontFamily: 'var(--tbf-type-micro-family)',
            fontSize: 'var(--tbf-type-micro-size)',
            letterSpacing: 'var(--tbf-type-micro-ls)',
            color: 'var(--tbf-text-tertiary)',
            textTransform: 'uppercase',
            marginBottom: 'var(--tbf-space-8)',
          }}
        >
          Position inside the ecosystem
        </p>

        <h2
          id="tgf-why"
          style={{
            fontFamily: 'var(--tbf-type-display-xl-family)',
            fontSize: 'var(--tbf-type-h1-size-sm)',
            fontWeight: 'var(--tbf-type-display-xl-weight)',
            lineHeight: 1.1,
            letterSpacing: 'var(--tbf-type-display-xl-ls)',
            color: 'var(--tbf-text-primary)',
            marginBottom: 'var(--tbf-space-10)',
            maxWidth: '20ch',
          }}
        >
          Why it exists
        </h2>

        <div style={{ maxWidth: '44ch' }}>
          <p
            style={{
              fontFamily: 'var(--tbf-type-deck-family)',
              fontSize: 'var(--tbf-type-deck-size-sm)',
              fontWeight: 'var(--tbf-type-deck-weight)',
              lineHeight: 'var(--tbf-type-deck-lh)',
              color: 'var(--tbf-text-primary)',
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
              color: 'var(--tbf-text-primary)',
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
              color: 'var(--tbf-text-primary)',
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
              color: 'var(--tbf-text-secondary)',
            }}
          >
            A .TGF. existe para desenvolver a camada estratégica do ecossistema
            .TBF., transformando capital criativo em valor de negócio.
          </p>
        </div>
      </section>

      {/* ─── FOCUS AREAS ───────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="tgf-focus">
        <p
          style={{
            fontFamily: 'var(--tbf-type-micro-family)',
            fontSize: 'var(--tbf-type-micro-size)',
            letterSpacing: 'var(--tbf-type-micro-ls)',
            color: 'var(--tbf-text-tertiary)',
            textTransform: 'uppercase',
            marginBottom: 'var(--tbf-space-6)',
          }}
        >
          Areas of interest
        </p>
        <h2
          id="tgf-focus"
          style={{
            fontFamily: 'var(--tbf-type-h2-family)',
            fontSize: 'var(--tbf-type-h2-size-sm)',
            fontWeight: 'var(--tbf-type-h2-weight)',
            lineHeight: 'var(--tbf-type-h2-lh)',
            letterSpacing: 'var(--tbf-type-h2-ls)',
            color: 'var(--tbf-text-primary)',
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
                  color: 'var(--tbf-text-primary)',
                  border: '1px solid var(--tbf-border)',
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

      {/* ─── PHILOSOPHY ────────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="tgf-philosophy">
        <p
          style={{
            fontFamily: 'var(--tbf-type-micro-family)',
            fontSize: 'var(--tbf-type-micro-size)',
            letterSpacing: 'var(--tbf-type-micro-ls)',
            color: 'var(--tbf-text-tertiary)',
            textTransform: 'uppercase',
            marginBottom: 'var(--tbf-space-8)',
          }}
        >
          Philosophy
        </p>

        <blockquote
          style={{ margin: 0, padding: 0 }}
          aria-labelledby="tgf-philosophy"
        >
          <p
            id="tgf-philosophy"
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'var(--tbf-type-h1-size-sm)',
              fontWeight: 'var(--tbf-type-display-xl-weight)',
              lineHeight: 1.05,
              letterSpacing: 'var(--tbf-type-display-xl-ls)',
              color: 'var(--tbf-text-primary)',
              maxWidth: '22ch',
              marginBottom: 'var(--tbf-space-10)',
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
              color: 'var(--tbf-text-secondary)',
              maxWidth: '44ch',
            }}
          >
            Acreditamos que as empresas mais relevantes da próxima década serão
            aquelas capazes de unir criatividade, tecnologia e execução em um
            único sistema.
          </p>
        </blockquote>
      </section>

      {/* ─── CONNECTION TO TBF ─────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="tgf-collective">
        <p
          style={{
            fontFamily: 'var(--tbf-type-micro-family)',
            fontSize: 'var(--tbf-type-micro-size)',
            letterSpacing: 'var(--tbf-type-micro-ls)',
            color: 'var(--tbf-text-tertiary)',
            textTransform: 'uppercase',
            marginBottom: 'var(--tbf-space-6)',
          }}
        >
          Relationship with TBF
        </p>
        <h2
          id="tgf-collective"
          style={{
            fontFamily: 'var(--tbf-type-h2-family)',
            fontSize: 'var(--tbf-type-h2-size-sm)',
            fontWeight: 'var(--tbf-type-h2-weight)',
            lineHeight: 'var(--tbf-type-h2-lh)',
            letterSpacing: 'var(--tbf-type-h2-ls)',
            color: 'var(--tbf-text-primary)',
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
              color: 'var(--tbf-text-secondary)',
            }}
          >
            A .TGF. trabalha em colaboração com outras iniciativas do ecossistema
            .TBF., conectando crescimento com cultura, comunicação e comunidade.
          </p>
          <p
            style={{
              fontFamily: 'var(--tbf-type-body-family)',
              fontSize: 'var(--tbf-type-body-size-sm)',
              lineHeight: 'var(--tbf-type-body-lh)',
              color: 'var(--tbf-text-secondary)',
            }}
          >
            Sua atuação complementa as demais labels através de uma perspectiva
            orientada para expansão, inovação e geração de valor.
          </p>
        </div>
      </section>

      {/* ─── FOOTER BLOCK ──────────────────────────────────────────────────── */}
      <section
        className="section--cta-dark"
        aria-labelledby="tgf-footer-block"
      >
        <div className="container">
          <div style={{ maxWidth: '50ch' }}>
            <p
              id="tgf-footer-block"
              style={{
                fontFamily: 'var(--tbf-type-display-xl-family)',
                fontSize: 'var(--tbf-type-h1-size-sm)',
                fontWeight: 'var(--tbf-type-display-xl-weight)',
                lineHeight: 1.1,
                letterSpacing: 'var(--tbf-type-display-xl-ls)',
                color: 'var(--tbf-text-primary)',
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
                fontSize: 'var(--tbf-type-micro-size)',
                letterSpacing: 'var(--tbf-type-micro-ls)',
                color: 'var(--tbf-text-tertiary)',
                textTransform: 'uppercase',
                marginBottom: 'var(--tbf-space-8)',
              }}
            >
              Founded in São Paulo. Built for global ambition.
              <br />
              Part of .THE BRAZILIAN FACTORY.
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
