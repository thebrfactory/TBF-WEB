// =============================================================================
// /labels/runwayunited — RUNWAY UNTD COLLECTIVE
// Institutional label page — part of .TBF. ecosystem
// =============================================================================

import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { HeroVideo } from '@/components/HeroVideo/HeroVideo'
import { Ticker } from '@/components/Ticker/Ticker'

export const metadata: Metadata = {
  title: '.RUNWAY UNTD COLLECTIVE. | .RUC. | .THE BRAZILIAN FACTORY.',
  description:
    'A fashion films and editorial label inside the .THE BRAZILIAN FACTORY. ecosystem. Where runway meets culture, film and creative direction.',
  openGraph: {
    title: '.RUNWAY UNTD COLLECTIVE. | .RUC.',
    description:
      'Fashion Film Magazine. Part of .THE BRAZILIAN FACTORY.',
    images: [{ url: '/og-factory.jpg', width: 1200, height: 630 }],
  },
}

const FOCUS_AREAS = [
  'Fashion Films',
  'Editorial Stories',
  'Runway Culture',
  'Fashion Weeks',
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

// Marca dentro do lockup do herói — peso mais forte da Brother1816 (Black).
const B900: CSSProperties = { fontWeight: 900 }

// Largura de ".RUNWAY UNTD COLLECTIVE." em ems (medida: 13.982), na Brother1816
// ExtraBold com ls -0.04em, + 1% de folga contra arredondamento. Divide a
// largura do grupo do herói para achar o corpo do título — o nome preenche a
// linha e nunca quebra. Mudou o nome? Meça de novo, não estime.
const TITLE_FIT = '14.12'

// Lockup do herói: "a.k.a. .X." / descritor / "of .THE BRAZILIAN FACTORY."
// Corpo próprio (não o SUBTITLE das seções): calibrado para as três linhas
// caberem sem quebrar no mobile, inclusive no descritor mais longo (.TGF.).
const HERO_LOCKUP: CSSProperties = {
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: 'clamp(0.75rem, 3.2vw, 1rem)',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ffffff',
  lineHeight: 1.6,
  margin: '0 0 var(--tbf-space-6)',
}

// Tagline do herói — duas linhas, fechando em "In Brazilian Bass."
// Fecha o grupo: a base é o padding-bottom do próprio .hero.
const HERO_TAGLINE: CSSProperties = {
  fontFamily: 'var(--tbf-type-display-xl-family)',
  fontSize: '1.25rem',
  fontWeight: 300,
  letterSpacing: '-0.01em',
  color: 'rgba(255,255,255,0.6)',
  lineHeight: 1.3,
  margin: 0,
}

export default function RunwayUnitedPage() {
  return (
    <div data-theme="inverse" style={{ background: '#000', color: '#fff' }}>

      {/* ─── HERO — nome da label sobre o vídeo, junto à base ──────────────
          Espelha o herói da home: grupo (nome + lockup + tagline) ancorado na
          base do vídeo. Voltou a existir texto por cima, então o vídeo volta à
          opacidade padrão do <HeroVideo /> — é ela, com o grain, que legibiliza.
          `--tbf-label-title-fit` = largura do nome em ems na Brother1816
          ExtraBold com ls -0.04em, medida no browser: é o divisor que faz o
          título preencher a linha do grupo sem quebrar (ver .hero-label__title). */}
      <section className="hero hero--label" aria-labelledby="ruc-h1" style={{ width: '100vw' }}>
        <div className="hero__overlay-grain" aria-hidden="true" />

        <HeroVideo />

        <div
          className="hero-label__content"
          style={{ '--tbf-label-title-fit': TITLE_FIT } as CSSProperties}
        >
          <h1 id="ruc-h1" className="hero-label__title">
            .RUNWAY UNTD COLLECTIVE.
          </h1>

          <p style={HERO_LOCKUP}>
            a.k.a. <span style={B900}>.RUC.</span>
            <br />
            Editorial Fashion Label
            <br />
            of <span style={B900}>.THE BRAZILIAN FACTORY.</span>
          </p>

          <p style={HERO_TAGLINE}>
            Music. Fashion. Film.
            <br />
            In Brazilian Bass.
          </p>
        </div>
      </section>

      {/* ─── TICKER ──────────────────────────────────────────────────────── */}
      <Ticker />

      {/* ─── INTRO — decks e CTA ─────────────────────────────────────────── */}
      <section className="section container">
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
          A platform dedicated to fashion films, visual essays and
          contemporary runway culture.
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
          Documenting the people, movements and stories shaping the
          next generation of fashion.
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
              <span style={B800}>.RUNWAY UNTD COLLECTIVE.</span> is the fashion, film
              and cultural storytelling label of{' '}
              <span style={B800}>.THE BRAZILIAN FACTORY.</span>
            </p>
            <p
              style={{
                fontFamily: 'var(--tbf-type-body-family)',
                fontSize: 'var(--tbf-type-body-size-sm)',
                lineHeight: 'var(--tbf-type-body-lh)',
                color: 'rgba(255,255,255,0.75)',
                marginBottom: 'var(--tbf-space-6)',
              }}
            >
              Created to document, produce and amplify Brazil&apos;s emerging creative
              scene, <span style={B800}>.RUC.</span> brings together runway culture,
              cinema and visual identity into one editorial language.
            </p>
            <p
              style={{
                fontFamily: 'var(--tbf-type-body-family)',
                fontSize: 'var(--tbf-type-body-size-sm)',
                lineHeight: 'var(--tbf-type-body-lh)',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              Part media platform, part creative studio, part cultural archive.
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
        {/* Foto de fundo. `.label-bg-photo` resolve o mobile: ver components.css.
            Opacidade 0.45 → 0.28 (pedido) para o texto da frente ganhar peso. */}
        <div aria-hidden="true" className="label-bg-photo">
          <Image
            src="/images/ruc/ruc-backstage.webp"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.28 }}
          />
          <div
            className="label-bg-photo__fade"
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
                Every runway tells a story.
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
                Every collection carries a vision.
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
                Every creator deserves a platform.
              </p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  lineHeight: 'var(--tbf-type-body-lh)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                <span style={B800}>.RUNWAY UNTD COLLECTIVE.</span> exists to
                document the creative layer of the{' '}
                <span style={B800}>.THE BRAZILIAN FACTORY.</span> ecosystem,
                transforming fashion into narrative and the runway into
                cultural memory.
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
                The next generation of creators will not be defined by what
                they make, but by the worlds they build through aesthetics,
                storytelling and cultural influence.
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
          What We Document
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
                  borderRadius: 'var(--tbf-radius-chip)',
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
            <span style={B800}>.RUNWAY UNTD COLLECTIVE.</span> is the fashion
            and cultural storytelling label of{' '}
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
            It exists to document the creative pulse of the ecosystem,
            connecting runway, editorial and community through a shared
            visual language.
          </p>
        </div>

        <p
          style={{
            fontFamily: 'var(--tbf-type-deck-family)',
            fontSize: 'var(--tbf-type-deck-size-sm)',
            fontWeight: 'var(--tbf-type-deck-weight)',
            lineHeight: 'var(--tbf-type-deck-lh)',
            color: '#ffffff',
            marginTop: 'var(--tbf-space-8)',
            marginBottom: 'var(--tbf-space-2)',
          }}
        >
          Fashion as narrative.
        </p>
        <p
          style={{
            fontFamily: 'var(--tbf-type-deck-family)',
            fontSize: 'var(--tbf-type-deck-size-sm)',
            fontWeight: 'var(--tbf-type-deck-weight)',
            lineHeight: 'var(--tbf-type-deck-lh)',
            color: '#ffffff',
          }}
        >
          Culture as archive.
        </p>
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
        {/* Sem imagem de fundo (pedido: "pode remover essa imagem de fundo").
            O bloco de fechamento fica no preto chapado da página. */}

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
              Film preserves memory.
              <br />
              Together, they become legacy.
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
              Founded in São Paulo.
              <br />
              Made for the world.
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
