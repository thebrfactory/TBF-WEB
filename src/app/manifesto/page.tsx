// =============================================================================
// /manifesto — O MANIFESTO FUNDADOR
// Texto estático · Scrollytelling via CSS animation-timeline
// CTAs APENAS após texto completo (regra sagrada)
// Zero sidebar · Zero distração
// =============================================================================

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Manifesto',
  description:
    'O documento fundador da .THE BRAZILIAN FACTORY. A cultura que se produz, não se segue.',
  openGraph: {
    title: 'Manifesto | .THE BRAZILIAN FACTORY.',
    description: 'O documento fundador da .THE BRAZILIAN FACTORY.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

// ─── Fragmentos do Manifesto ──────────────────────────────────────────────────

const FRAGMENTS_PT = [
  {
    key: 'f01',
    text: 'O site da .THE BRAZILIAN FACTORY. não é um website.',
    emphasis: true,
  },
  {
    key: 'f02',
    text: 'É uma sede digital de uma infraestrutura cultural. Um ponto de gravidade. Um sistema de prestígio operando como publicação, manifesto, plataforma de autoridade e ponto de encontro para agentes criativos que já sabem quem são, e estão procurando onde pertencer.',
    emphasis: false,
  },
  {
    key: 'f03',
    text: 'A gente não copia Paris, imprime por cima.',
    emphasis: true,
  },
  {
    key: 'f04',
    text: 'A diferença é que a TBF carrega brasilidade não-literal: não é tropical decorativo. É energia, contraste, excesso e sensualidade crua. É o Manifesto Antropofágico do Oswald de Andrade interpretado pela geração Z e codificado em produto digital.',
    emphasis: false,
  },
  {
    key: 'f05',
    text: 'Fala com quem já sabe. Não explica. Nunca.',
    emphasis: true,
  },
  {
    key: 'f06',
    text: 'O que é "projetos" vira games, simulations e rituals. O que é "portfólio" vira track record of presence. O que é "contato" vira acesso. Onde uma empresa diria "clientes", a TBF diz players.',
    emphasis: false,
  },
  {
    key: 'f07',
    text: 'Mais silêncio que explicação. O espaço em branco fala.',
    emphasis: true,
  },
  {
    key: 'f08',
    text: 'AESTHETIKA (n.): A coded system of perception. The invisible syntax of presence, form and resonance. A field where frequency becomes identity, and beauty is a consequence, not the goal.',
    emphasis: false,
    isAesthetika: true,
  },
  {
    key: 'f09',
    text: 'Presence Is The Currency.',
    emphasis: true,
  },
  {
    key: 'f10',
    text: 'Quando alguém chegar em thebrfactory.com e sentir que está entrando em algum lugar, não apenas navegando, o trabalho estará feito.',
    emphasis: false,
  },
  {
    key: 'f11',
    isClimax: true,
    text: 'TÊBÊÉFHI',
    emphasis: true,
  },
]

const FRAGMENTS_EN = [
  {
    key: 'en01',
    text: 'The .THE BRAZILIAN FACTORY. website is not a website.',
    emphasis: true,
  },
  {
    key: 'en02',
    text: 'It is the digital headquarters of a cultural infrastructure. A center of gravity. A prestige system operating as publication, manifesto, authority platform and meeting point for creative agents who already know who they are, and are looking for where to belong.',
    emphasis: false,
  },
  {
    key: 'en03',
    text: "We don't copy Paris, we print on top.",
    emphasis: true,
  },
  {
    key: 'en04',
    text: 'The difference is that TBF carries a non-literal Brazilian essence: not decorative tropicalism. It is energy, contrast, excess and raw sensuality. It is the Manifesto Antropofágico by Oswald de Andrade interpreted by Generation Z and coded into digital product.',
    emphasis: false,
  },
  {
    key: 'en05',
    text: 'Speaks to those who already know. Never explains.',
    emphasis: true,
  },
  {
    key: 'en06',
    text: "What is a 'project' becomes a game, simulation or ritual. What is a 'portfolio' becomes a track record of presence. Where a company would say 'clients', TBF says players.",
    emphasis: false,
  },
  {
    key: 'en07',
    text: 'More silence than explanation. The white space speaks.',
    emphasis: true,
  },
  {
    key: 'en08',
    text: 'Presence Is The Currency.',
    emphasis: true,
  },
]

export default function ManifestoPage() {
  return (
    <div
      style={{
        paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
      }}
    >
      {/* ─── TÍTULO ────────────────────────────────────────────────────── */}
      <header
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          marginBottom: 'var(--tbf-space-32)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
          }}
        >
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
            .TBF. inc · Documento Fundador
          </p>
          <h1
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'var(--tbf-type-display-xl-size-sm)',
              fontWeight: 'var(--tbf-type-display-xl-weight)',
              lineHeight: 'var(--tbf-type-display-xl-lh-sm)',
              letterSpacing: 'var(--tbf-type-display-xl-ls)',
              color: 'var(--tbf-text-primary)',
            }}
          >
            Manifesto
          </h1>
        </div>
      </header>

      {/* ─── CORPO PT — FRAGMENTOS ─────────────────────────────────────── */}
      <section
        aria-label="Manifesto em português"
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
          }}
        >
          <div className="layout-d">
            <div>
              {FRAGMENTS_PT.map((frag) => {
                if (frag.isClimax) {
                  return (
                    <p
                      key={frag.key}
                      className="manifesto-fragment"
                      lang="pt-BR"
                      style={{
                        fontFamily: 'var(--tbf-type-display-lg-family)',
                        fontSize: 'var(--tbf-type-display-lg-size-sm)',
                        fontWeight: 'var(--tbf-font-weight-raw-800)',
                        lineHeight: 'var(--tbf-type-display-lg-lh-sm)',
                        letterSpacing: 'var(--tbf-type-display-lg-ls)',
                        color: 'var(--tbf-accent)',
                        marginBottom: 'var(--tbf-space-32)',
                        marginTop: 'var(--tbf-space-32)',
                      }}
                    >
                      {frag.text}
                    </p>
                  )
                }

                if (frag.isAesthetika) {
                  return (
                    <blockquote
                      key={frag.key}
                      className="manifesto-fragment"
                      lang="en"
                      style={{
                        fontFamily: 'var(--tbf-type-body-family)',
                        fontSize: 'var(--tbf-type-body-size-sm)',
                        fontStyle: 'italic',
                        lineHeight: 'var(--tbf-type-body-lh)',
                        color: 'var(--tbf-text-secondary)',
                        paddingLeft: 'var(--tbf-space-6)',
                        marginBottom: 'var(--tbf-space-32)',
                      }}
                    >
                      {frag.text}
                    </blockquote>
                  )
                }

                if (frag.emphasis) {
                  return (
                    <p
                      key={frag.key}
                      className="manifesto-fragment"
                      lang="pt-BR"
                      style={{
                        fontFamily: 'var(--tbf-type-h2-family)',
                        fontSize: 'var(--tbf-type-h2-size-sm)',
                        fontWeight: 'var(--tbf-type-h2-weight)',
                        lineHeight: 'var(--tbf-type-h2-lh)',
                        letterSpacing: 'var(--tbf-type-h2-ls)',
                        color: 'var(--tbf-text-primary)',
                        marginBottom: 'var(--tbf-space-32)',
                      }}
                    >
                      {frag.text}
                    </p>
                  )
                }

                return (
                  <p
                    key={frag.key}
                    className="manifesto-fragment"
                    lang="pt-BR"
                    style={{
                      fontFamily: 'var(--tbf-type-body-family)',
                      fontSize: 'var(--tbf-type-body-size-sm)',
                      lineHeight: 'var(--tbf-type-body-lh)',
                      color: 'var(--tbf-text-secondary)',
                      maxWidth: '60ch',
                      marginBottom: 'var(--tbf-space-32)',
                    }}
                  >
                    {frag.text}
                  </p>
                )
              })}

              {/* Separador PT / EN */}
              <div
                className="manifesto-fragment"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--tbf-space-4)',
                  marginBottom: 'var(--tbf-space-32)',
                }}
                aria-hidden="true"
              >
                <span
                  style={{
                    fontFamily: 'var(--tbf-type-micro-family)',
                    fontSize: 'var(--tbf-type-micro-size)',
                    letterSpacing: 'var(--tbf-type-micro-ls)',
                    color: 'var(--tbf-text-tertiary)',
                    textTransform: 'uppercase',
                  }}
                >
                  pt · en
                </span>
              </div>

              {/* Versão EN */}
              {FRAGMENTS_EN.map((frag) => {
                if (frag.emphasis) {
                  return (
                    <p
                      key={frag.key}
                      className="manifesto-fragment"
                      lang="en"
                      style={{
                        fontFamily: 'var(--tbf-type-h2-family)',
                        fontSize: 'var(--tbf-type-h2-size-sm)',
                        fontWeight: 'var(--tbf-type-h2-weight)',
                        lineHeight: 'var(--tbf-type-h2-lh)',
                        letterSpacing: 'var(--tbf-type-h2-ls)',
                        color: 'var(--tbf-text-primary)',
                        marginBottom: 'var(--tbf-space-32)',
                      }}
                    >
                      {frag.text}
                    </p>
                  )
                }
                return (
                  <p
                    key={frag.key}
                    className="manifesto-fragment"
                    lang="en"
                    style={{
                      fontFamily: 'var(--tbf-type-body-family)',
                      fontSize: 'var(--tbf-type-body-size-sm)',
                      lineHeight: 'var(--tbf-type-body-lh)',
                      color: 'var(--tbf-text-secondary)',
                      maxWidth: '60ch',
                      marginBottom: 'var(--tbf-space-32)',
                    }}
                  >
                    {frag.text}
                  </p>
                )
              })}

              {/* Assinatura */}
              <p
                className="manifesto-fragment"
                style={{
                  fontFamily: 'var(--tbf-type-tag-family)',
                  fontSize: 'var(--tbf-type-tag-size)',
                  letterSpacing: 'var(--tbf-type-tag-ls)',
                  color: 'var(--tbf-text-tertiary)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--tbf-space-32)',
                }}
              >
                .TBF. inc · São Paulo, 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTAs — SÓ APÓS TEXTO COMPLETO (regra sagrada) ─────────────── */}
      <section
        aria-label="Próximos passos"
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBlock: 'var(--tbf-space-20)',
          }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
            display: 'flex',
            gap: 'var(--tbf-space-4)',
            flexWrap: 'wrap',
          }}
        >
          {/* CTA 1 primário: Enter the Editorial */}
          <Link href="/editorial" className="btn btn--primary">
            Enter the Editorial
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>

          {/* CTA 2: Apply for Access */}
          <Link href="/collective" className="btn btn--ghost">
            Apply for Access
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
