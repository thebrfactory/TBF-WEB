// =============================================================================
// /labels/thefioredaily — THE FIORE DAILY
// Institutional label page — part of .TBF. ecosystem
// =============================================================================

import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { HeroVideo } from '@/components/HeroVideo/HeroVideo'
import { Ticker } from '@/components/Ticker/Ticker'

export const metadata: Metadata = {
  title: '.THE FIORE DAILY. | .TFD. | .THE BRAZILIAN FACTORY.',
  description:
    'An intimacy, wellness and ritual label inside the .THE BRAZILIAN FACTORY. ecosystem. A daily practice of presence, care and intention.',
  openGraph: {
    title: '.THE FIORE DAILY. | .TFD.',
    description:
      'Intimacy-Wellness Community. Part of .THE BRAZILIAN FACTORY.',
    images: [{ url: '/og-factory.jpg', width: 1200, height: 630 }],
  },
}

const FOCUS_AREAS = [
  'Intimacy',
  'Wellness',
  'Ritual',
  'Self-Care',
  'Body Culture',
  'Mental Health',
  'Lifestyle',
  'Feminine Expression',
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

// Largura de ".THE FIORE DAILY." em ems (medida: 8.565), na Brother1816
// ExtraBold com ls -0.04em, + 1% de folga contra arredondamento. Divide a
// largura do grupo do herói para achar o corpo do título — o nome preenche a
// linha e nunca quebra. Mudou o nome? Meça de novo, não estime.
const TITLE_FIT = '8.65'

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

export default function TheFioreDailyPage() {
  return (
    <div data-theme="inverse" style={{ background: '#000', color: '#fff' }}>

      {/* ─── HERO — nome da label sobre o vídeo, junto à base ──────────────
          Espelha o herói da home: grupo (nome + lockup + tagline) ancorado na
          base do vídeo. Voltou a existir texto por cima, então o vídeo volta à
          opacidade padrão do <HeroVideo /> — é ela, com o grain, que legibiliza.
          `--tbf-label-title-fit` = largura do nome em ems na Brother1816
          ExtraBold com ls -0.04em, medida no browser: é o divisor que faz o
          título preencher a linha do grupo sem quebrar (ver .hero-label__title). */}
      <section className="hero hero--label" aria-labelledby="tfd-h1" style={{ width: '100vw' }}>
        <div className="hero__overlay-grain" aria-hidden="true" />

        <HeroVideo />

        <div
          className="hero-label__content"
          style={{ '--tbf-label-title-fit': TITLE_FIT } as CSSProperties}
        >
          <h1 id="tfd-h1" className="hero-label__title">
            .THE FIORE DAILY.
          </h1>

          <p style={HERO_LOCKUP}>
            a.k.a. <span style={B900}>.TFD.</span>
            <br />
            Intimacy &amp; Wellness Label
            <br />
            of <span style={B900}>.THE BRAZILIAN FACTORY.</span>
          </p>

          <p style={HERO_TAGLINE}>
            Intimacy. Wellness. Ritual.
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
          A daily practice of presence, care and intention.
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
          href="https://instagram.com/thefioredaily"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          @thefioredaily
          <span className="btn__arrow" aria-hidden="true">→</span>
        </a>
      </section>

      {/* ─── OVERVIEW ──────────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="tfd-overview">
        <div className="layout-b">
          <div>
            <p style={SUBTITLE}>Overview</p>
            <h2
              id="tfd-overview"
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
              What is <span style={B800}>.TFD.</span>?
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
              <span style={B800}>.THE FIORE DAILY.</span> é a vertical de bem-estar,
              intimidade e rituais de cuidado da{' '}
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
              Criada para explorar a relação entre presença, corpo e intenção,
              transformando o cotidiano em prática consciente e cultura de cuidado.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHY IT EXISTS — full-section com imagem de fundo ─────────────── */}
      <section
        className="label-fullbleed"
        aria-labelledby="tfd-why"
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
            src="/images/tfd/tfd-ritual.webp"
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
                id="tfd-why"
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
                Todo corpo precisa de atenção.
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
                Toda mente precisa de silêncio.
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
                Toda rotina precisa de intenção.
              </p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  lineHeight: 'var(--tbf-type-body-lh)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                <span style={B800}>.TFD.</span> existe para cultivar a camada
                humana do ecossistema <span style={B800}>.TBF.</span>,
                transformando cuidado em cultura e presença em identidade.
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
                Wellness is not a destination.
                <br />
                Wellness is a daily practice.
              </p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  lineHeight: 'var(--tbf-type-body-lh)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                Acreditamos que as pessoas mais presentes da próxima geração
                serão aquelas capazes de unir autoconhecimento, rituais e
                expressão em uma única prática diária.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOCUS AREAS ───────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="tfd-focus">
        <p style={SUBTITLE}>Areas of interest</p>
        <h2
          id="tfd-focus"
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
      <section className="section container" aria-labelledby="tfd-collective">
        <p style={SUBTITLE}>Relationship with <span style={B800}>.TBF.</span></p>
        <h2
          id="tfd-collective"
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
            <span style={B800}>.TFD.</span> trabalha em colaboração com outras
            iniciativas do ecossistema <span style={B800}>.TBF.</span>, conectando
            bem-estar com cultura, criatividade e comunidade.
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
            orientada para presença, cuidado e expressão humana.
          </p>
        </div>
      </section>

      {/* ─── FOOTER BLOCK ──────────────────────────────────────────────────── */}
      <section
        className="label-fullbleed"
        aria-labelledby="tfd-footer-block"
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
            src="/images/tfd/tfd-closing.webp"
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
              id="tfd-footer-block"
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
              Presence creates depth.
              <br />
              Ritual creates identity.
              <br />
              Together they create life.
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
              href="https://instagram.com/thefioredaily"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              @thefioredaily
              <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
