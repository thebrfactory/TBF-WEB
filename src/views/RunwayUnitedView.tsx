// =============================================================================
// /labels/runwayunited — RUNWAY UNTD COLLECTIVE
// Institutional label page — part of .TBF. ecosystem
//
// Uma página, dois idiomas: o texto vem do dicionário e os links passam por
// localizedPath. Ver src/content/i18n/README.md.
// =============================================================================

import type { CSSProperties } from 'react'
import Image from 'next/image'
import { HeroVideo } from '@/components/HeroVideo/HeroVideo'
import { Ticker } from '@/components/Ticker/Ticker'
import { runwayUnited } from '@/content/i18n/pages/labels/runwayunited'
import type { Lang } from '@/lib/i18n'

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
// linha e nunca quebra. Mudou o nome? Meça de novo, não estime. Nome fixo nos
// dois idiomas (marca não se traduz), então a medida vale para as duas rotas.
const TITLE_FIT = '14.12'

// Lockup do herói: "a.k.a. .X." / descritor / "of .THE BRAZILIAN FACTORY."
// Corpo próprio (não o SUBTITLE das seções): calibrado para as três linhas
// caberem sem quebrar no mobile, inclusive no descritor mais longo (.TGF.).
// Por isso o descritor central fica em inglês nos dois idiomas — ver nota no
// dicionário (hero.lockupDescriptor).
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

export default function RunwayUnitedView({ lang }: { lang: Lang }) {
  const t = runwayUnited[lang]

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
            {t.hero.title}
          </h1>

          <p style={HERO_LOCKUP}>
            a.k.a. <span style={B900}>.RUC.</span>
            <br />
            {t.hero.lockupDescriptor}
            <br />
            of <span style={B900}>.THE BRAZILIAN FACTORY.</span>
          </p>

          <p style={HERO_TAGLINE}>
            {t.hero.tagline[0]}
            <br />
            {t.hero.tagline[1]}
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
          {t.intro.line1}
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
          {t.intro.line2}
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
          {t.intro.line3Prefix} <span style={B800}>.THE BRAZILIAN FACTORY.</span>
        </p>

        <a
          href="https://instagram.com/runwayunited"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          {t.intro.ctaLabel}
          <span className="btn__arrow" aria-hidden="true">→</span>
        </a>
      </section>

      {/* ─── OVERVIEW ──────────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="ruc-overview">
        <div className="layout-b">
          <div>
            <p style={SUBTITLE}>{t.overview.subtitle}</p>
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
              {t.overview.heading}
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
              {t.overview.p1}
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
              {t.overview.p2}
            </p>
            <p
              style={{
                fontFamily: 'var(--tbf-type-body-family)',
                fontSize: 'var(--tbf-type-body-size-sm)',
                lineHeight: 'var(--tbf-type-body-lh)',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {t.overview.p3}
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
              <p style={SUBTITLE}>{t.why.subtitle}</p>

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
                {t.why.heading}
              </h2>

              {t.why.deck.map((line, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--tbf-type-deck-family)',
                    fontSize: 'var(--tbf-type-deck-size-sm)',
                    fontWeight: 'var(--tbf-type-deck-weight)',
                    lineHeight: 'var(--tbf-type-deck-lh)',
                    color: '#ffffff',
                    marginBottom: i === t.why.deck.length - 1 ? 'var(--tbf-space-10)' : 'var(--tbf-space-2)',
                  }}
                >
                  {line}
                </p>
              ))}
              <p
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  lineHeight: 'var(--tbf-type-body-lh)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                {t.why.body}
              </p>
            </div>

            <div>
              <p style={SUBTITLE}>{t.why.philosophySubtitle}</p>
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
                {t.why.philosophyLine[0]}
                <br />
                {t.why.philosophyLine[1]}
              </p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  lineHeight: 'var(--tbf-type-body-lh)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                {t.why.philosophyBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOCUS AREAS ───────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="ruc-focus">
        <p style={SUBTITLE}>{t.focus.subtitle}</p>
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
          {t.focus.heading}
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
          {t.focus.areas.map((area) => (
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
        <p style={SUBTITLE}>{t.connection.subtitlePrefix} <span style={B800}>.TBF.</span></p>
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
          {t.connection.heading}
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
            {t.connection.p1}
          </p>
          <p
            style={{
              fontFamily: 'var(--tbf-type-body-family)',
              fontSize: 'var(--tbf-type-body-size-sm)',
              lineHeight: 'var(--tbf-type-body-lh)',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            {t.connection.p2}
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
          {t.connection.deck[0]}
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
          {t.connection.deck[1]}
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
              {t.footer.closer[0]}
              <br />
              {t.footer.closer[1]}
              <br />
              {t.footer.closer[2]}
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
              {t.footer.microLine1}
              <br />
              {t.footer.microLine2}
              <br />
              {t.footer.microLine3Prefix} <span style={B800}>.THE BRAZILIAN FACTORY.</span>
            </p>

            <a
              href="https://instagram.com/runwayunited"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              {t.footer.ctaLabel}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
