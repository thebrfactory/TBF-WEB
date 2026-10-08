// =============================================================================
// /consulting: .TBF. CONSULTING
// Brand. Business. Structure.
//
// Nova arquitetura (08/10/2026): hero, problema, tese, quatro movimentos,
// programa e método, entregáveis, Factory como vantagem, compromisso, briefing
// mínimo e CTA. Corpo na coluna de leitura central e cartões arredondados, como
// o template de matéria (ArticleView). Herói e blocos full-bleed seguem o
// sistema das páginas de label (/labels/*).
//
// FICOU DE FORA, DE PROPÓSITO: prova (cases, números, depoimentos) e preço. Os
// dados ainda não existem e nada foi inventado. Ticket, margem e LTV são
// internos e não entram aqui.
//
// Uma página, dois idiomas: o texto vem do dicionário e os links passam por
// localizedPath. Ver src/content/i18n/README.md.
// =============================================================================

import type { CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeroVideo } from '@/components/HeroVideo/HeroVideo'
import { Ticker } from '@/components/Ticker/Ticker'
import {
  B800,
  BODY,
  CardGrid,
  DECK,
  H2,
  KICKER,
  PlainList,
  READING,
  Section,
} from '@/components/Institutional/Institutional'
import { consulting } from '@/content/i18n/pages/consulting'
import { localizedPath, type Lang } from '@/lib/i18n'

// Marca dentro do lockup do herói: peso mais forte da Brother1816 (Black).
const B900: CSSProperties = { fontWeight: 900 }

// Largura de ".CONSULTING." em ems na Brother1816 ExtraBold com ls -0.04em,
// MEDIDA no browser (6.860) + 1% de folga contra arredondamento. É o divisor
// que faz o título preencher a linha do herói sem quebrar. Mudou o nome? Meça
// de novo, não estime. (".CONSULTING." não se traduz: é lockup de marca.)
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

const DISPLAY: CSSProperties = {
  fontFamily: 'var(--tbf-type-display-xl-family)',
  fontSize: 'clamp(2rem, 7vw, 3.5rem)',
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: 'var(--tbf-type-display-xl-ls)',
  color: '#ffffff',
}

const CTA_ROW: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--tbf-space-4)',
  marginTop: 'var(--tbf-space-8)',
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
            {t.hero.lockupLine2} {t.hero.lockupOf} <span style={B900}>.THE BRAZILIAN FACTORY.</span>
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
        <div style={READING}>
          <p style={DECK}>{t.intro.line1}</p>
          <p style={{ ...BODY, marginBottom: 0 }}>{t.intro.line2}</p>
          <div style={CTA_ROW}>
            <Link href={path('/contact-us')} className="btn btn--primary">
              {t.intro.cta}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <a href="#program" className="btn btn--secondary">
              {t.intro.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─────────────────────────────────────────────────── */}
      <Section id="consulting-problem" kicker={t.problem.kicker} heading={t.problem.heading}>
        <p style={DECK}>{t.problem.lead}</p>
        <p style={BODY}>{t.problem.p1}</p>
        <p style={BODY}>{t.problem.p2}</p>
        <p style={{ ...BODY, color: '#fff', fontWeight: 700, marginBottom: 0 }}>{t.problem.p3}</p>
      </Section>

      {/* ─── THE THESIS: full-bleed ──────────────────────────────────────── */}
      <section
        className="label-fullbleed"
        aria-labelledby="consulting-thesis"
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
              background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.35) 25%, rgba(0,0,0,0.35) 70%, #000000 100%)',
            }}
          />
        </div>

        <div
          className="container"
          style={{ position: 'relative', zIndex: 3, paddingBlock: 'var(--tbf-space-20)' }}
        >
          <div style={READING}>
            <span style={KICKER}>{t.thesis.kicker}</span>
            <h2 id="consulting-thesis" style={{ ...DISPLAY, marginBottom: 'var(--tbf-space-6)' }}>
              {t.thesis.heading}
            </h2>
            <p style={{ ...DECK, color: '#fff' }}>{t.thesis.deck}</p>
            <p style={{ ...BODY, marginBottom: 0 }}>{t.thesis.body}</p>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE SOLVE ───────────────────────────────────────────────── */}
      <Section
        id="consulting-work"
        kicker={t.work.kicker}
        heading={t.work.heading}
        wide={<CardGrid items={t.work.items} />}
      />

      {/* ─── THE PROGRAM + METHOD ────────────────────────────────────────── */}
      <Section
        id="program"
        kicker={t.program.kicker}
        heading={t.program.heading}
      >
        <p style={DECK}>{t.program.deck}</p>
        <p style={{ ...BODY, marginBottom: 0 }}>{t.program.body}</p>
      </Section>

      <Section
        id="consulting-method"
        kicker={t.program.methodKicker}
        heading={t.program.methodHeading}
        wide={<CardGrid items={t.program.steps} />}
      />

      {/* ─── WHAT YOU TAKE AWAY ──────────────────────────────────────────── */}
      <Section id="consulting-deliverables" kicker={t.deliverables.kicker}>
        <h2 id="consulting-deliverables-h" style={H2}>
          {t.deliverables.heading}
        </h2>
        <p style={DECK}>{t.deliverables.deck}</p>
        <PlainList items={t.deliverables.items} numbered />
      </Section>

      {/* ─── THE FACTORY AS ADVANTAGE ────────────────────────────────────── */}
      <Section
        id="consulting-factory"
        kicker={t.factory.kicker}
        heading={t.factory.heading}
        wide={<CardGrid items={t.factory.items} />}
      >
        <p style={{ ...BODY, marginBottom: 0 }}>{t.factory.body}</p>
      </Section>

      {/* ─── COMMITMENT ──────────────────────────────────────────────────── */}
      <Section id="consulting-commitment" kicker={t.commitment.kicker} heading={t.commitment.heading}>
        <p style={BODY}>{t.commitment.p1}</p>
        <p style={{ ...BODY, marginBottom: 0 }}>{t.commitment.p2}</p>
      </Section>

      {/* ─── BEFORE WE TALK ──────────────────────────────────────────────── */}
      <Section id="consulting-briefing" kicker={t.briefing.kicker} heading={t.briefing.heading}>
        <PlainList items={t.briefing.questions} numbered />
      </Section>

      {/* ─── CLOSING: full-bleed ─────────────────────────────────────────── */}
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
              background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.4) 65%, #000000 100%)',
            }}
          />
        </div>

        <div
          className="container"
          style={{ position: 'relative', zIndex: 3, paddingBlock: 'var(--tbf-space-20)' }}
        >
          <div style={READING}>
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
                color: 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                marginBottom: 'var(--tbf-space-8)',
              }}
            >
              {t.closing.creditLine1}
              <br />
              {t.closing.creditLine2Prefix} <span style={B800}>.THE BRAZILIAN FACTORY.</span>
            </p>

            <Link href={path('/contact-us')} className="btn btn--primary">
              {t.closing.cta}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
