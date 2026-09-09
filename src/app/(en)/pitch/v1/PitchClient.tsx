'use client'

// =============================================================================
// PITCH CLIENT — animações + slides scrollytelling
//
// Componente de cliente: lê o idioma do LangProvider (useLang), herdado da
// árvore em que /pitch ou /pt/pitch está montada. Texto vem do dicionário em
// src/content/i18n/pages/pitch.ts. Ver src/content/i18n/README.md.
// =============================================================================

import { useEffect } from 'react'
import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { PressLogosCarousel } from './PressLogosCarousel'
import { HeroVideo } from '@/components/HeroVideo/HeroVideo'
import { Ticker } from '@/components/Ticker/Ticker'
import { useLang } from '@/lib/LangProvider'
import { localizedPath } from '@/lib/i18n'
import { pitch } from '@/content/i18n/pages/pitch'

const ACCENT = '#FF6500'

// Mesmo vídeo de fundo do hero editorial (loop mudo), aplicado à capa do pitch.
const EDITORIAL_VIDEO = {
  desktop: { av1: '/videos/editorial-desktop.av1.mp4', h264: '/videos/editorial-desktop.mp4' },
  mobile: { av1: '/videos/editorial-mobile.av1.mp4', h264: '/videos/editorial-mobile.mp4' },
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.pitch-reveal')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).style.opacity = '1'
            ;(e.target as HTMLElement).style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function PitchReveal({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  return (
    <div
      className="pitch-reveal"
      style={{
        opacity: 0,
        transform: 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p
        style={{
          fontFamily: 'var(--tbf-font-family-display)',
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: ACCENT,
          marginBottom: '0.25rem',
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: 'var(--tbf-font-family-ui)',
          fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--tbf-text-tertiary)',
        }}
      >
        {label}
      </p>
    </div>
  )
}

const S: React.CSSProperties = {
  minHeight: '100dvh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 'clamp(4rem, 10vw, 8rem) clamp(1.25rem, 5vw, 6rem)',
  position: 'relative',
  overflow: 'hidden',
  }

// Wordmark em SVG, compartilhado entre a capa e o slide de fechamento —
// o `viewBox`/paths não mudam com o idioma, só o `aria-label`.
function Wordmark({ ariaLabel, style }: { ariaLabel: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 397 595.28 47" aria-label={ariaLabel} role="img" style={style} className={style ? undefined : 'pitch-cover-title'}>
      <path d="M5.21,428.52c3.22,0,5.21,1.9,5.21,5.02s-2,5.02-5.21,5.02-5.21-1.9-5.21-5.02,2-5.02,5.21-5.02Z" fill="#fff"/>
      <path d="M36.36,403.16v8.46h-8.84v26.15h-10.09v-26.15h-8.84v-8.46h27.78Z" fill="#fff"/>
      <path d="M60.39,437.77v-13.36h-11.49v13.36h-10.05v-34.61h10.05v12.83h11.49v-12.83h10.09v34.61h-10.09Z" fill="#fff"/>
      <path d="M75.48,403.16h23.17v8.46h-13.12v4.61h11.25v7.93h-11.25v5.14h13.84v8.46h-23.89v-34.61Z" fill="#fff"/>
      <path d="M114.85,403.16h11.78c7.83,0,14.28,2.93,14.28,9.95,0,3.56-2.21,5.62-4.47,6.49,2.79.77,5.72,3.65,5.72,7.74,0,7.35-6.1,10.43-14.76,10.43h-12.55v-34.61ZM124.42,411.14v5.91h2.79c1.92,0,3.6-.72,3.6-2.93s-1.68-2.98-3.6-2.98h-2.79ZM124.42,423.4v6.39h3.51c1.92,0,3.85-.77,3.85-3.17s-1.92-3.22-3.85-3.22h-3.51Z" fill="#fff"/>
      <path d="M163.11,437.77l-5.1-10.77h-2.84v10.77h-9.81v-34.61h13.03c8.51,0,14.52,3.99,14.52,12.16,0,4.9-2.31,8.22-6.1,10.05l6.73,12.4h-10.43ZM155.18,411.62v7.4h3.75c2.02,0,3.85-.87,3.85-3.7s-1.83-3.7-3.85-3.7h-3.75Z" fill="#fff"/>
      <path d="M196.13,433.2h-10.53l-2.11,4.57h-10.43l17.59-35.09h.48l17.59,35.09h-10.43l-2.16-4.57ZM188.39,426.67h5c-.87-2.02-2.16-5.19-2.45-6.44h-.1c-.29,1.25-1.59,4.42-2.45,6.44Z" fill="#fff"/>
      <path d="M223.28,429.31h13.84v8.46h-29.13l14.9-26.15h-13.12v-8.46h28.31l-14.8,26.15Z" fill="#fff"/>
      <path d="M250.92,437.77h-10.05v-34.61h10.05v34.61Z" fill="#fff"/>
      <path d="M255.92,437.77v-34.61h10.05v26.15h11.82v8.46h-21.87Z" fill="#fff"/>
      <path d="M290.57,437.77h-10.05v-34.61h10.05v34.61Z" fill="#fff"/>
      <path d="M315.18,433.2h-10.53l-2.11,4.57h-10.43l17.59-35.09h.48l17.59,35.09h-10.43l-2.16-4.57ZM307.44,426.67h5c-.86-2.02-2.16-5.19-2.45-6.44h-.1c-.29,1.25-1.59,4.42-2.45,6.44Z" fill="#fff"/>
      <path d="M339.12,422.24v15.53h-9.81v-35.09h.48l19.8,16.01v-15.53h9.85v35.09h-.43l-19.9-16.01Z" fill="#fff"/>
      <path d="M379.23,403.16h21.97v8.46h-11.92v5.14h10.05v8.22h-10.05v12.79h-10.05v-34.61Z" fill="#fff"/>
      <path d="M419.94,433.2h-10.53l-2.11,4.57h-10.43l17.59-35.09h.48l17.59,35.09h-10.43l-2.16-4.57ZM412.2,426.67h5c-.86-2.02-2.16-5.19-2.45-6.44h-.1c-.29,1.25-1.59,4.42-2.45,6.44Z" fill="#fff"/>
      <path d="M448.83,402.44c4.42,0,7.45,1.01,9.85,2.26v9.13c-1.87-.96-4.81-2.21-8.84-2.21-6.15,0-9.37,4.28-9.37,8.84s3.12,8.84,8.84,8.84c4.37,0,7.59-1.2,9.61-2.21v9.23c-2.4,1.25-6.39,2.16-10.57,2.16-10.38,0-17.98-7.98-17.98-18.02s7.59-18.02,18.46-18.02Z" fill="#fff"/>
      <path d="M489.18,403.16v8.46h-8.84v26.15h-10.09v-26.15h-8.84v-8.46h27.78Z" fill="#fff"/>
      <path d="M508.38,402.44c10.91,0,18.51,8.12,18.51,18.02s-7.59,18.02-18.51,18.02-18.46-7.98-18.46-18.02,7.59-18.02,18.46-18.02ZM508.38,429.31c5.09,0,8.36-4.18,8.36-8.84s-3.27-8.84-8.36-8.84-8.36,4.28-8.36,8.84,3.32,8.84,8.36,8.84Z" fill="#fff"/>
      <path d="M547.84,437.77l-5.09-10.77h-2.84v10.77h-9.81v-34.61h13.03c8.51,0,14.52,3.99,14.52,12.16,0,4.9-2.31,8.22-6.1,10.05l6.73,12.4h-10.43ZM539.91,411.62v7.4h3.75c2.02,0,3.85-.87,3.85-3.7s-1.83-3.7-3.85-3.7h-3.75Z" fill="#fff"/>
      <path d="M568.94,437.77v-13.07l-12.64-21.53h11.44l6.25,11.97,6.25-11.97h11.44l-12.64,21.53v13.07h-10.09Z" fill="#fff"/>
      <path d="M590.06,428.52c3.22,0,5.21,1.9,5.21,5.02s-2,5.02-5.21,5.02-5.21-1.9-5.21-5.02,2-5.02,5.21-5.02Z" fill="#fff"/>
    </svg>
  )
}

export function PitchClient() {
  useReveal()

  const lang = useLang()
  const t = pitch[lang]
  const path = (p: string) => localizedPath(p, lang)

  return (
    <div
      style={{
        background: '#000000',
        color: '#F0EDE6',
        fontFamily: 'var(--tbf-font-family-display)',
      }}
    >

      {/* ── SLIDE 01: COVER ──────────────────────────────────────────────── */}
      <section
        style={{
          ...S,
          minHeight: '100dvh',
          justifyContent: 'flex-end',
          padding: 0,
          background: '#000000',
        }}
        aria-label={t.cover.ariaLabel}
      >
        {/* Fundo — vídeo em loop esmaecido (mesmo do /editorial) + blend p/ preto */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <HeroVideo
            sources={EDITORIAL_VIDEO}
            poster="/images/editorial-feature.webp"
            opacity={0.35}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              /* Sombreado enxuto (pedido: "remova esse sombreado exagerado,
                 pode deixar um pouquinho só"). Mesma leitura do herói de
                 /labels/runwayunited: o vídeo aparece, e o escurecido é só o
                 mínimo na base para o lockup de texto ter chão. */
              background:
                'linear-gradient(to bottom, transparent 0%, transparent 58%, rgba(0,0,0,0.72) 100%)',
            }}
          />
        </div>

        {/* Fundo — mesmo tratamento da página /editorial */}
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(2rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 8vw, 7rem)' }}>
          <PitchReveal delay={100}>
            <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: 'clamp(0.625rem, 2vw, 0.75rem)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tbf-text-tertiary)', marginBottom: '1.5rem' }}>
              {t.cover.confidential}
            </p>
          </PitchReveal>

          <PitchReveal delay={200}>
            <Wordmark ariaLabel={t.brand.wordmarkAriaLabel} />
          </PitchReveal>

          <PitchReveal delay={350}>
            <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1rem, 4vw, 2rem)', fontWeight: 700, color: ACCENT, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              {t.cover.tagline}
            </p>
          </PitchReveal>

          <PitchReveal delay={450}>
            <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', color: 'rgba(240,237,230,0.6)', fontWeight: 300 }}>
              {t.cover.subtitle}
            </p>
          </PitchReveal>
        </div>

        {/* Sem seta de "role a página": informação inútil (pedido). */}

        <style>{`
          @keyframes pitchPulse {
            0%,100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          @keyframes pitchSlideIn {
            from { opacity: 0; transform: translateX(-40px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes pitchCounter {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}</style>
      </section>

      {/* ── TICKER: letreiro em motion dividindo a capa do resto do pitch,
             igual a /labels/runwayunited (pedido) ─────────────────────────── */}
      <Ticker />

      {/* ── LOGOS DE IMPRENSA: carrossel infinito.
             O rótulo "As seen in" foi removido (pedido). ─────────────────── */}
      {/* O trilho fica CENTRADO na faixa preta, não colado no letreiro (pedido):
          a faixa ganha altura própria e o carrossel se alinha ao meio dela. */}
      <section
        style={{
          minHeight: 'clamp(22rem, 64vh, 40rem)',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(2.5rem, 6vw, 4.5rem) 0',
          background: '#000000',
        }}
        aria-label={t.featuredIn.sectionAriaLabel}
      >
        <PressLogosCarousel />
      </section>

      {/* ── SLIDE 02: THE PROBLEM ────────────────────────────────────────── */}
      <section style={{ ...S }} aria-label={t.problem.ariaLabel}>
        <PitchReveal delay={0}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '2rem' }}>
            {t.problem.eyebrow}
          </p>
        </PitchReveal>

        <PitchReveal delay={100}>
          <h2 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(2rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#F0EDE6', maxWidth: '18ch', marginBottom: '3rem' }}>
            {t.problem.heading}
          </h2>
        </PitchReveal>

        <PitchReveal delay={200}>
          <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', lineHeight: 1.7, color: 'rgba(240,237,230,0.65)', maxWidth: '55ch', marginBottom: '1.5rem' }}>
            {t.problem.body}
          </p>
        </PitchReveal>

        {/* Visual accent */}
        <PitchReveal delay={400}>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {t.problem.tags.map((item) => (
              <span
                key={item}
                style={{
                  padding: '0.5rem 1rem',
                  border: `1px solid ${ACCENT}`,
                  borderRadius: 'var(--tbf-radius-chip)',
                  fontFamily: 'var(--tbf-font-family-ui)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </PitchReveal>
      </section>

      {/* ── SLIDE 03: THE SOLUTION ───────────────────────────────────────── */}
      <section style={{ ...S, background: '#111110' }} aria-label={t.solution.ariaLabel}>
        <PitchReveal delay={0}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '2rem' }}>
            {t.solution.eyebrow}
          </p>
        </PitchReveal>

        <PitchReveal delay={100}>
          <h2 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(2rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#F0EDE6', maxWidth: '20ch', marginBottom: '2rem' }}>
            {t.solution.heading}
          </h2>
        </PitchReveal>

        <PitchReveal delay={150}>
          <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 700, color: ACCENT, marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
            {t.solution.subheading}
          </p>
        </PitchReveal>

        <PitchReveal delay={200}>
          <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', lineHeight: 1.7, color: 'rgba(240,237,230,0.65)', maxWidth: '60ch', marginBottom: '3rem' }}>
            {t.solution.body}
          </p>
        </PitchReveal>

        {/* One organism. Four labels. — movido da home (labels só aparecem pra quem está dentro) */}
        <PitchReveal delay={250}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.4)', marginBottom: '0.75rem' }}>
            {t.solution.labelsEyebrow}
          </p>
          <h3 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#F0EDE6', marginBottom: '2rem' }}>
            {t.solution.labelsHeading}
          </h3>
        </PitchReveal>

        {/* The 4 labels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
          {t.solution.labels.map((item, i) => (
            <PitchReveal key={item.tag} delay={300 + i * 80}>
              <Link
                href={path(item.href)}
                style={{ display: 'block', background: '#111110', padding: 'clamp(1rem, 3vw, 2rem)', borderTop: `2px solid ${item.tag === '.TGF.' ? ACCENT : item.tag === '.TFD.' ? '#C8A96A' : '#F0EDE6'}`, textDecoration: 'none' }}
              >
                <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1rem, 3vw, 1.75rem)', fontWeight: 900, color: item.tag === '.TGF.' ? ACCENT : item.tag === '.TFD.' ? '#C8A96A' : '#F0EDE6', letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>
                  {item.tag}
                </p>
                <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.6)', marginBottom: '0.35rem' }}>
                  {item.name}
                </p>
                <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: '0.65rem', color: 'rgba(240,237,230,0.4)', textTransform: 'uppercase' }}>
                  {item.desc}
                </p>
              </Link>
            </PitchReveal>
          ))}
        </div>

        <PitchReveal delay={700}>
          <div style={{ marginTop: '2rem' }}>
            <Link href={path('/labels')} className="btn btn--ghost">
              {t.solution.exploreCta}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </PitchReveal>
      </section>

      {/* ── SLIDE 04: TRACTION / NUMBERS ────────────────────────────────── */}
      <section style={{ ...S }} aria-label={t.traction.ariaLabel}>
        <PitchReveal delay={0}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '2rem' }}>
            {t.traction.eyebrow}
          </p>
        </PitchReveal>

        <PitchReveal delay={100}>
          <h2 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.5rem, 5vw, 3rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: '#F0EDE6', maxWidth: '25ch', marginBottom: '3.5rem' }}>
            {t.traction.heading}
          </h2>
        </PitchReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(1.5rem, 4vw, 3rem)', marginBottom: '3rem' }}>
          {t.traction.stats.map((stat, i) => (
            <PitchReveal key={stat.label} delay={200 + i * 80}>
              <Stat value={stat.value} label={stat.label} />
            </PitchReveal>
          ))}
        </div>

        {/* Progress bars */}
        <PitchReveal delay={500}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
            {t.traction.progress.map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.6)' }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.65rem', color: ACCENT }}>
                    {item.pct}%
                  </span>
                </div>
                <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: `${item.pct}%`,
                      background: ACCENT,
                      transformOrigin: 'left',
                      animation: 'pitchCounter 1.2s ease forwards',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </PitchReveal>
      </section>

      {/* ── SLIDE 05: MARKET ─────────────────────────────────────────────── */}
      <section style={{ ...S, background: '#111110' }} aria-label={t.market.ariaLabel}>
        <PitchReveal delay={0}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '2rem' }}>
            {t.market.eyebrow}
          </p>
        </PitchReveal>

        <PitchReveal delay={100}>
          <h2 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(2rem, 7vw, 4.5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#F0EDE6', marginBottom: '3rem' }}>
            {t.market.headingLine1}
            <br />
            <span style={{ color: ACCENT }}>{t.market.headingLine2}</span>
          </h2>
        </PitchReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
          {t.market.items.map((item, i) => (
            <PitchReveal key={item.stat} delay={200 + i * 100}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', paddingBottom: '1.5rem', }}>
                <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 900, color: ACCENT, letterSpacing: '-0.03em', flexShrink: 0, lineHeight: 1 }}>
                  {item.stat}
                </p>
                <div>
                  <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', fontWeight: 700, color: '#F0EDE6', marginBottom: '0.25rem' }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: 'rgba(240,237,230,0.5)', lineHeight: 1.5 }}>
                    {item.sub}
                  </p>
                </div>
              </div>
            </PitchReveal>
          ))}
        </div>
      </section>

      {/* ── SLIDE 06: BUSINESS MODEL ─────────────────────────────────────── */}
      <section style={{ ...S }} aria-label={t.businessModel.ariaLabel}>
        <PitchReveal delay={0}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '2rem' }}>
            {t.businessModel.eyebrow}
          </p>
        </PitchReveal>

        <PitchReveal delay={100}>
          <h2 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.75rem, 6vw, 3.5rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.035em', color: '#F0EDE6', maxWidth: '22ch', marginBottom: '3rem' }}>
            {t.businessModel.heading}
          </h2>
        </PitchReveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', background: 'rgba(255,255,255,0.07)', maxWidth: '700px' }}>
          {t.businessModel.rows.map((item, i) => (
            <PitchReveal key={item.label} delay={200 + i * 80}>
              <div
                style={{
                  background: item.highlight ? 'rgba(255,101,0,0.08)' : '#000000',
                  padding: 'clamp(1rem, 3vw, 1.5rem)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  borderLeft: item.highlight ? `3px solid ${ACCENT}` : '3px solid transparent',
                }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', fontWeight: 700, color: item.highlight ? ACCENT : '#F0EDE6', marginBottom: '0.25rem' }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: '0.8rem', color: 'rgba(240,237,230,0.5)' }}>
                    {item.model}
                  </p>
                </div>
                <span style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: item.highlight ? ACCENT : 'rgba(240,237,230,0.4)', whiteSpace: 'nowrap', paddingTop: '2px' }}>
                  {item.stage}
                </span>
              </div>
            </PitchReveal>
          ))}
        </div>
      </section>

      {/* ── SLIDE 07: VISION ─────────────────────────────────────────────── */}
      <section
        style={{
          ...S,
          background: '#000000',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
        aria-label={t.vision.ariaLabel}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            src="/brand/BRAND-ASSET-01.svg"
            alt=""
            width={600}
            height={600}
            style={{ width: '80vmin', height: '80vmin', opacity: 0.04, filter: 'invert(1)' }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <PitchReveal delay={0}>
            <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '3rem' }}>
              {t.vision.eyebrow}
            </p>
          </PitchReveal>

          <PitchReveal delay={100}>
            <blockquote style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.75rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: '#F0EDE6', maxWidth: '20ch', margin: '0 auto 2.5rem' }}>
              {t.vision.quoteLine1}
              <br />
              <span style={{ color: ACCENT }}>{t.vision.quoteLine2}</span>
            </blockquote>
          </PitchReveal>

          <PitchReveal delay={250}>
            <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', lineHeight: 1.7, color: 'rgba(240,237,230,0.6)', maxWidth: '50ch', margin: '0 auto' }}>
              {t.vision.body}
            </p>
          </PitchReveal>
        </div>
      </section>

      {/* ── SLIDE 08: TEAM ───────────────────────────────────────────────── */}
      <section style={{ ...S, background: '#111110' }} aria-label={t.team.ariaLabel}>
        <PitchReveal delay={0}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '2rem' }}>
            {t.team.eyebrow}
          </p>
        </PitchReveal>

        <PitchReveal delay={100}>
          <h2 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.75rem, 6vw, 3.5rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.035em', color: '#F0EDE6', marginBottom: '3rem' }}>
            {t.team.headingLine1}
            <br />
            {t.team.headingLine2}
          </h2>
        </PitchReveal>

        <PitchReveal delay={200}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div
              style={{
                width: 'clamp(80px, 20vw, 120px)',
                height: 'clamp(80px, 20vw, 120px)',
                background: 'rgba(255,101,0,0.1)',
                border: `1px solid ${ACCENT}`,
                borderRadius: 'var(--tbf-radius-tile)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1rem, 3vw, 1.75rem)', fontWeight: 900, color: ACCENT }}>{t.team.initials}</span>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 800, color: '#F0EDE6', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                {t.team.name}
              </p>
              <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                {t.team.role}
              </p>
              <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: '0.9rem', letterSpacing: '0.05em', color: 'rgba(240,237,230,0.5)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {t.team.project}
              </p>
              <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', lineHeight: 1.7, color: 'rgba(240,237,230,0.6)', maxWidth: '50ch' }}>
                {t.team.bio}
              </p>
            </div>
          </div>
        </PitchReveal>
      </section>

      {/* ── SLIDE 09: CLOSE / CTA ────────────────────────────────────────── */}
      <section
        style={{
          ...S,
          minHeight: '100dvh',
          alignItems: 'center',
          textAlign: 'center',
          background: '#000000',
          }}
        aria-label={t.close.ariaLabel}
      >
        <PitchReveal delay={100}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '3rem' }}>
            {t.close.kicker}
          </p>
        </PitchReveal>

        <PitchReveal delay={200}>
          <Wordmark ariaLabel={t.brand.wordmarkAriaLabel} style={{ width: '100%', maxWidth: '700px', height: 'auto', display: 'block', marginBottom: '3rem' }} />
        </PitchReveal>

        <PitchReveal delay={300}>
          <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1rem, 3.5vw, 1.75rem)', fontWeight: 700, color: ACCENT, marginBottom: '1rem', letterSpacing: '-0.01em' }}>
            {t.close.site}
          </p>
        </PitchReveal>

        <PitchReveal delay={400}>
          <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', color: 'rgba(240,237,230,0.5)', marginBottom: '3rem' }}>
            {t.close.email}
          </p>
        </PitchReveal>

        <PitchReveal delay={500}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href={path('/manifesto')} className="btn btn--primary">
              {t.close.ctaManifesto} →
            </Link>
            <Link href={path('/labels')} className="btn btn--secondary">
              {t.close.ctaLabels} →
            </Link>
            <a href="https://instagram.com/thebrfactory" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              {t.close.ctaInstagram} →
            </a>
          </div>
        </PitchReveal>

        <PitchReveal delay={650}>
          {/* Linha legal: um pouco maior e mais visível (pedido): 0.6 para 0.72rem,
              opacidade 0.2→0.45. */}
          <p style={{ marginTop: '5rem', fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.72rem', letterSpacing: '0.1em', lineHeight: 1.6, textTransform: 'uppercase', color: 'rgba(240,237,230,0.45)' }}>
            {t.close.legal}
          </p>
        </PitchReveal>
      </section>

    </div>
  )
}
