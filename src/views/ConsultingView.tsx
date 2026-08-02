// =============================================================================
// /consulting — .TBF. CONSULTING
// Branding & Business Development. Página institucional construída no MESMO
// sistema das páginas de label (/labels/*): herói com o nome sobre o vídeo,
// ticker, blocos full-bleed com imagem de fundo e blocos de texto em layout-b.
//
// Conteúdo derivado do TBF BUSINESS OS 3.0 (SISTEMA 3.0), não inventado:
//   · direcao/tese-de-valor/tese-tbf-parceiro-que-entendeu-antes.md
//   · direcao/perfil-ideal-de-cliente/icp-tbf-larissa-viana.md
//   · validacao/oferta/oferta-tbf-projeto-estruturado.md
//   · direcao/tese-de-valor/tese-tgf-confianca-do-rogerio.md (business dev)
//
// O QUE FICOU DE FORA, DE PROPÓSITO: ticket, margem, LTV e metas de 12 meses.
// Estão nas mesmas fichas do OS, mas são números INTERNOS. A oferta do OS ainda
// diz, com todas as letras, "portfólio antes de qualquer proposta" — publicar
// preço aqui contraria a própria tese. Preço se combina na conversa.
//
// Uma página, dois idiomas: o texto vem do dicionário e os links passam por
// localizedPath. Ver src/content/i18n/README.md.
// =============================================================================

import type { CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeroVideo } from '@/components/HeroVideo/HeroVideo'
import { Ticker } from '@/components/Ticker/Ticker'
import { consulting } from '@/content/i18n/pages/consulting'
import { localizedPath, type Lang } from '@/lib/i18n'

// Subtítulos de seção: medium, entre título e corpo (padrão das páginas de label)
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

// Marca dentro do lockup do herói — peso mais forte da Brother1816 (Black).
const B900: CSSProperties = { fontWeight: 900 }

// Largura de ".CONSULTING." em ems na Brother1816 ExtraBold com ls -0.04em,
// MEDIDA no browser (6.860) + 1% de folga contra arredondamento. É o divisor
// que faz o título preencher a linha do herói sem quebrar. Mudou o nome? Meça
// de novo, não estime. (".CONSULTING." não se traduz — é lockup de marca.)
const TITLE_FIT = '6.93'

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

const HERO_TAGLINE: CSSProperties = {
  fontFamily: 'var(--tbf-type-display-xl-family)',
  fontSize: '1.25rem',
  fontWeight: 300,
  letterSpacing: '-0.01em',
  color: 'rgba(255,255,255,0.6)',
  lineHeight: 1.3,
  margin: 0,
}

const BODY: CSSProperties = {
  fontFamily: 'var(--tbf-type-body-family)',
  fontSize: 'var(--tbf-type-body-size-sm)',
  lineHeight: 'var(--tbf-type-body-lh)',
  color: 'rgba(255,255,255,0.75)',
}

const DECK: CSSProperties = {
  fontFamily: 'var(--tbf-type-deck-family)',
  fontSize: 'var(--tbf-type-deck-size-sm)',
  fontWeight: 'var(--tbf-type-deck-weight)',
  lineHeight: 'var(--tbf-type-deck-lh)',
  color: 'rgba(255,255,255,0.7)',
}

const H2: CSSProperties = {
  fontFamily: 'var(--tbf-type-h2-family)',
  fontSize: 'var(--tbf-type-h2-size-sm)',
  fontWeight: 800,
  lineHeight: 'var(--tbf-type-h2-lh)',
  letterSpacing: 'var(--tbf-type-h2-ls)',
  color: '#ffffff',
  marginBottom: 'var(--tbf-space-6)',
}

const DISPLAY: CSSProperties = {
  fontFamily: 'var(--tbf-type-display-xl-family)',
  fontSize: 'var(--tbf-type-h1-size-sm)',
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: 'var(--tbf-type-display-xl-ls)',
  color: '#ffffff',
}

export default function ConsultingView({ lang }: { lang: Lang }) {
  const t = consulting[lang]
  const path = (p: string) => localizedPath(p, lang)

  return (
    <div data-theme="inverse" style={{ background: '#000', color: '#fff' }}>

      {/* ─── HERO ────────────────────────────────────────────────────────── */}
      <section className="hero hero--label" aria-labelledby="consulting-h1" style={{ width: '100vw' }}>
        <div className="hero__overlay-grain" aria-hidden="true" />

        <HeroVideo />

        <div
          className="hero-label__content"
          style={{ '--tbf-label-title-fit': TITLE_FIT } as CSSProperties}
        >
          <h1 id="consulting-h1" className="hero-label__title">
            {t.hero.title}
          </h1>

          <p style={HERO_LOCKUP}>
            {t.hero.lockupLine1}
            <br />
            {t.hero.lockupLine2}
            <br />
            {t.hero.lockupOf} <span style={B900}>.THE BRAZILIAN FACTORY.</span>
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

      {/* ─── INTRO ───────────────────────────────────────────────────────── */}
      <section className="section container">
        <p style={{ ...DECK, maxWidth: '48ch', marginBottom: 'var(--tbf-space-4)' }}>
          {t.intro.line1}
        </p>
        <p style={{ ...DECK, maxWidth: '48ch', marginBottom: 'var(--tbf-space-10)' }}>
          {t.intro.line2Prefix} <span style={B800}>.THE BRAZILIAN FACTORY.</span>
        </p>

        <Link href={path('/contact-us')} className="btn btn--primary">
          {t.intro.startConversation}
          <span className="btn__arrow" aria-hidden="true">→</span>
        </Link>
      </section>

      {/* ─── OVERVIEW ────────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="consulting-overview">
        <div className="layout-b">
          <div>
            <p style={SUBTITLE}>{t.overview.subtitle}</p>
            <h2 id="consulting-overview" style={H2}>
              {t.overview.headingPrefix} <span style={B800}>.TBF. CONSULTING</span>{t.overview.headingSuffix}
            </h2>
          </div>

          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>
              {t.overview.p1}
            </p>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>
              {t.overview.p2Prefix}{' '}
              <span style={B800}>.RUC.</span>{t.overview.p2Middle}
              <span style={B800}>.MELFIORE.</span>{' '}
              {t.overview.p2And} <span style={B800}>.TGF.</span>
            </p>
            <p style={BODY}>{t.overview.p3}</p>
          </div>
        </div>
      </section>

      {/* ─── WHY IT EXISTS — full-bleed ──────────────────────────────────── */}
      <section
        className="label-fullbleed"
        aria-labelledby="consulting-why"
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
            src="/images/tgf/tgf-ambition.webp"
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
              <p style={SUBTITLE}>{t.why.subtitle}</p>

              <h2 id="consulting-why" style={{ ...DISPLAY, marginBottom: 'var(--tbf-space-10)' }}>
                {t.why.heading}
              </h2>

              <p style={{ ...DECK, color: '#ffffff', marginBottom: 'var(--tbf-space-2)' }}>
                {t.why.lines[0]}
              </p>
              <p style={{ ...DECK, color: '#ffffff', marginBottom: 'var(--tbf-space-2)' }}>
                {t.why.lines[1]}
              </p>
              <p style={{ ...DECK, color: '#ffffff', marginBottom: 'var(--tbf-space-10)' }}>
                {t.why.lines[2]}
              </p>

              <p style={BODY}>{t.why.body}</p>
            </div>

            <div>
              <p style={SUBTITLE}>{t.why.philosophySubtitle}</p>
              <p style={{ ...DISPLAY, lineHeight: 1.05, marginBottom: 'var(--tbf-space-8)' }}>
                {t.why.philosophyQuote[0]}
                <br />
                {t.why.philosophyQuote[1]}
              </p>
              <p style={BODY}>{t.why.philosophyBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── METHOD ──────────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="consulting-method">
        <p style={SUBTITLE}>{t.method_section.subtitle}</p>
        <h2 id="consulting-method" style={{ ...H2, marginBottom: 'var(--tbf-space-10)' }}>
          {t.method_section.heading}
        </h2>

        {/* Pilha de cartões arredondados. Sem divisores horizontais: proibidos
            no repo (ver frontend/CLAUDE.md). */}
        <ul
          role="list"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--tbf-space-4)',
          }}
        >
          {t.method.map((step) => (
            <li
              key={step.n}
              style={{
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: '18px',
                padding: 'var(--tbf-space-6)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  letterSpacing: 'var(--tbf-type-micro-ls)',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--tbf-space-3)',
                }}
              >
                {step.n}
              </p>
              <h3 style={{ ...H2, marginBottom: 'var(--tbf-space-3)' }}>{step.title}</h3>
              <p style={{ ...BODY, maxWidth: '60ch' }}>{step.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── DOMAINS ─────────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="consulting-domains">
        <p style={SUBTITLE}>{t.domainsSection.subtitle}</p>
        <h2 id="consulting-domains" style={{ ...H2, marginBottom: 'var(--tbf-space-10)' }}>
          {t.domainsSection.heading}
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
          {t.domains.map((domain) => (
            <li key={domain}>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  letterSpacing: 'var(--tbf-type-micro-ls)',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '999px',
                  paddingBlock: 'var(--tbf-space-2)',
                  paddingInline: 'var(--tbf-space-4)',
                }}
              >
                {domain}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── COMMITMENT ──────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="consulting-commitment">
        <p style={SUBTITLE}>{t.commitment.subtitle}</p>
        <h2 id="consulting-commitment" style={{ ...H2, marginBottom: 'var(--tbf-space-8)' }}>
          {t.commitment.heading}
        </h2>

        <div className="layout-b">
          <p style={BODY}>{t.commitment.p1}</p>
          <p style={BODY}>{t.commitment.p2}</p>
        </div>
      </section>

      {/* ─── CLOSING BLOCK — full-bleed ──────────────────────────────────── */}
      <section
        className="label-fullbleed"
        aria-labelledby="consulting-closing"
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
            src="/images/img-04.webp"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.5 }}
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
            <p id="consulting-closing" style={{ ...DISPLAY, marginBottom: 'var(--tbf-space-10)' }}>
              {t.closing.lines[0]}
              <br />
              {t.closing.lines[1]}
              <br />
              {t.closing.lines[2]}
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
              {t.closing.creditLine1}
              <br />
              {t.closing.creditLine2Prefix} <span style={B800}>.THE BRAZILIAN FACTORY.</span>
            </p>

            <Link href={path('/contact-us')} className="btn btn--primary">
              {t.closing.startConversation}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
