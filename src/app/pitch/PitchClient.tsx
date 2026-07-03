'use client'

// =============================================================================
// PITCH CLIENT — animações + slides scrollytelling
// =============================================================================

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PressLogosCarousel } from './PressLogosCarousel'

const ACCENT = '#FF6500'

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

export function PitchClient() {
  useReveal()

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
        aria-label="Cover"
      >
        {/* Fundo — mesmo tratamento da página /editorial: preto sólido, sem imagem */}
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(2rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 8vw, 7rem)' }}>
          <PitchReveal delay={100}>
            <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: 'clamp(0.625rem, 2vw, 0.75rem)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tbf-text-tertiary)', marginBottom: '1.5rem' }}>
              Confidential · São Paulo, 2025 · .TBF. inc
            </p>
          </PitchReveal>

          <PitchReveal delay={200}>
            <svg viewBox="0 397 595.28 47" aria-label=".THE BRAZILIAN FACTORY." role="img" className="pitch-cover-title">
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
          </PitchReveal>

          <PitchReveal delay={350}>
            <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1rem, 4vw, 2rem)', fontWeight: 700, color: ACCENT, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              The Brazilian Cultural Infrastructure.
            </p>
          </PitchReveal>

          <PitchReveal delay={450}>
            <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', color: 'rgba(240,237,230,0.6)', fontWeight: 300 }}>
              Culture™ Crafted in São Paulo. Consumed Worldwide.
            </p>
          </PitchReveal>
        </div>

        {/* Scroll cue */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1, animation: 'pitchBounce 2s ease-in-out infinite' }}>
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none" stroke={ACCENT} strokeWidth="1.5">
            <line x1="10" y1="0" x2="10" y2="26" />
            <polyline points="4,20 10,28 16,20" />
          </svg>
        </div>

        <style>{`
          @keyframes pitchBounce {
            0%,100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(8px); }
          }
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

      {/* ── AS SEEN IN — carrossel infinito de logos de imprensa ──────────── */}
      <section style={{ padding: 'clamp(2.5rem, 6vw, 4.5rem) 0', background: '#000000' }} aria-label="As seen in">
        <p
          style={{
            fontFamily: 'var(--tbf-font-family-ui)',
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.35)',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          As seen in
        </p>
        <PressLogosCarousel />
      </section>

      {/* ── SLIDE 02: THE PROBLEM ────────────────────────────────────────── */}
      <section style={{ ...S }} aria-label="The problem">
        <PitchReveal delay={0}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '2rem' }}>
            01 / The Problem
          </p>
        </PitchReveal>

        <PitchReveal delay={100}>
          <h2 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(2rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#F0EDE6', maxWidth: '18ch', marginBottom: '3rem' }}>
            Brazilian culture has no digital infrastructure.
          </h2>
        </PitchReveal>

        <PitchReveal delay={200}>
          <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', lineHeight: 1.7, color: 'rgba(240,237,230,0.65)', maxWidth: '55ch', marginBottom: '1.5rem' }}>
            Brazil is the 6th largest country by population, top 10 economy worldwide, and one of the most creative nations on earth. But Brazilian culture exports through algorithms — not institutions.
          </p>
        </PitchReveal>

        <PitchReveal delay={300}>
          <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', lineHeight: 1.7, color: 'rgba(240,237,230,0.45)', maxWidth: '55ch', fontStyle: 'italic' }}>
            O Brasil é o 6º país em população, top 10 em economia, e uma das nações mais criativas do planeta. Mas a cultura brasileira se exporta pelo algoritmo — não pelas instituições.
          </p>
        </PitchReveal>

        {/* Visual accent */}
        <PitchReveal delay={400}>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['No editorial standard', 'No cultural OS', 'No prestige system'].map((item) => (
              <span
                key={item}
                style={{
                  padding: '0.5rem 1rem',
                  border: `1px solid ${ACCENT}`,
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
      <section style={{ ...S, background: '#111110' }} aria-label="The solution">
        <PitchReveal delay={0}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '2rem' }}>
            02 / The Solution
          </p>
        </PitchReveal>

        <PitchReveal delay={100}>
          <h2 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(2rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#F0EDE6', maxWidth: '20ch', marginBottom: '2rem' }}>
            .THE BRAZILIAN FACTORY.
          </h2>
        </PitchReveal>

        <PitchReveal delay={150}>
          <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 700, color: ACCENT, marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
            A cultural operating system built in São Paulo.
          </p>
        </PitchReveal>

        <PitchReveal delay={200}>
          <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', lineHeight: 1.7, color: 'rgba(240,237,230,0.65)', maxWidth: '60ch', marginBottom: '3rem' }}>
            .TBF. is not a magazine. Not an agency. Not an app. It's a cultural infrastructure — an editorial system, a prestige engine, a growth machine — all operating under one identity, one aesthetic, one frequency.
          </p>
        </PitchReveal>

        {/* One organism. Four labels. — movido da home (labels só aparecem pra quem está dentro) */}
        <PitchReveal delay={250}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.4)', marginBottom: '0.75rem' }}>
            Labels / Divisões
          </p>
          <h3 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#F0EDE6', marginBottom: '2rem' }}>
            &ldquo;One organism. Four labels.&rdquo;
          </h3>
        </PitchReveal>

        {/* The 4 labels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
          {[
            { tag: '.TBF.', name: 'The Brazilian Factory', desc: 'Collective Hotel Casino', href: '/editorial', color: '#F0EDE6' },
            { tag: '.TFD.', name: 'The Fiore Daily', desc: 'Intimacy-Wellness Community', href: '/labels/thefioredaily', color: '#C8A96A' },
            { tag: '.RUC.', name: 'Runway United Collective', desc: 'Fashion Film Magazine', href: '/labels/runwayunited', color: '#F0EDE6' },
            { tag: '.TGF.', name: 'The Growth Factory', desc: 'Worldwide Brazilian Support', href: '/labels/factoryofgrowth', color: ACCENT },
          ].map((item, i) => (
            <PitchReveal key={item.tag} delay={300 + i * 80}>
              <Link
                href={item.href}
                style={{ display: 'block', background: '#111110', padding: 'clamp(1rem, 3vw, 2rem)', borderTop: `2px solid ${item.color}`, textDecoration: 'none' }}
              >
                <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1rem, 3vw, 1.75rem)', fontWeight: 900, color: item.color, letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>
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
            <Link href="/labels" className="btn btn--ghost">
              Explore the Labels
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </PitchReveal>
      </section>

      {/* ── SLIDE 04: TRACTION / NUMBERS ────────────────────────────────── */}
      <section style={{ ...S }} aria-label="Traction">
        <PitchReveal delay={0}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '2rem' }}>
            03 / Traction
          </p>
        </PitchReveal>

        <PitchReveal delay={100}>
          <h2 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.5rem, 5vw, 3rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: '#F0EDE6', maxWidth: '25ch', marginBottom: '3.5rem' }}>
            Built from scratch. Growing from day one.
          </h2>
        </PitchReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(1.5rem, 4vw, 3rem)', marginBottom: '3rem' }}>
          {[
            { value: '4', label: 'Active Labels' },
            { value: '2025', label: 'Year Founded' },
            { value: 'SP', label: 'Base · São Paulo' },
            { value: '∞', label: 'Creative Output' },
          ].map((stat, i) => (
            <PitchReveal key={stat.label} delay={200 + i * 80}>
              <Stat value={stat.value} label={stat.label} />
            </PitchReveal>
          ))}
        </div>

        {/* Progress bars */}
        <PitchReveal delay={500}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
            {[
              { label: 'Brand Identity', pct: 100 },
              { label: 'Tech Infrastructure', pct: 100 },
              { label: 'Editorial Pipeline', pct: 75 },
              { label: 'Revenue (TGF)', pct: 60 },
            ].map((item) => (
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
      <section style={{ ...S, background: '#111110' }} aria-label="Market">
        <PitchReveal delay={0}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '2rem' }}>
            04 / Market
          </p>
        </PitchReveal>

        <PitchReveal delay={100}>
          <h2 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(2rem, 7vw, 4.5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#F0EDE6', marginBottom: '3rem' }}>
            A $2T+ market
            <br />
            <span style={{ color: ACCENT }}>underrepresented.</span>
          </h2>
        </PitchReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
          {[
            {
              stat: '215M+',
              label: 'Brazilians globally',
              sub: 'Brazil + diaspora — one of the most culturally influential populations on earth',
            },
            {
              stat: '$180B+',
              label: 'Brazilian creative economy',
              sub: 'Fashion, music, design, content — growing 8% YoY',
            },
            {
              stat: '1st',
              label: 'Cultural OS for Brazil',
              sub: 'No direct competitor operating at this intersection',
            },
          ].map((item, i) => (
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
      <section style={{ ...S }} aria-label="Business model">
        <PitchReveal delay={0}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '2rem' }}>
            05 / Business Model
          </p>
        </PitchReveal>

        <PitchReveal delay={100}>
          <h2 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.75rem, 6vw, 3.5rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.035em', color: '#F0EDE6', maxWidth: '22ch', marginBottom: '3rem' }}>
            Four revenue streams. One brand.
          </h2>
        </PitchReveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', background: 'rgba(255,255,255,0.07)', maxWidth: '700px' }}>
          {[
            {
              label: '.TBF. Editorial',
              model: 'Branded content · Licensing · Subscriptions',
              stage: 'Building',
            },
            {
              label: '.MELFIORE. — Wellness',
              model: 'Products · Retreats · Digital rituals',
              stage: 'Building',
            },
            {
              label: '.RUC. — Fashion',
              model: 'Event production · Film commissions · SPFW',
              stage: 'Active',
            },
            {
              label: '.TGF. — Growth',
              model: 'Consulting retainers · Courses · B2B',
              stage: 'Revenue',
              highlight: true,
            },
          ].map((item, i) => (
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
                <span style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: item.stage === 'Revenue' ? ACCENT : 'rgba(240,237,230,0.4)', whiteSpace: 'nowrap', paddingTop: '2px' }}>
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
        aria-label="Vision"
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
              06 / Vision
            </p>
          </PitchReveal>

          <PitchReveal delay={100}>
            <blockquote style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.75rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: '#F0EDE6', maxWidth: '20ch', margin: '0 auto 2.5rem' }}>
              "We don't copy Paris.
              <br />
              <span style={{ color: ACCENT }}>We print over it."</span>
            </blockquote>
          </PitchReveal>

          <PitchReveal delay={250}>
            <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', lineHeight: 1.7, color: 'rgba(240,237,230,0.6)', maxWidth: '50ch', margin: '0 auto 1.5rem' }}>
              In 5 years, .THE BRAZILIAN FACTORY. is the reference point for Brazilian culture globally — a multi-label infrastructure with editorial authority, brand equity, and cultural IP.
            </p>
          </PitchReveal>

          <PitchReveal delay={350}>
            <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', lineHeight: 1.7, color: 'rgba(240,237,230,0.35)', maxWidth: '50ch', margin: '0 auto', fontStyle: 'italic' }}>
              Em 5 anos, a .TBF. é o ponto de referência para a cultura brasileira no mundo — uma infraestrutura multi-label com autoridade editorial, brand equity e IP cultural.
            </p>
          </PitchReveal>
        </div>
      </section>

      {/* ── SLIDE 08: TEAM ───────────────────────────────────────────────── */}
      <section style={{ ...S, background: '#111110' }} aria-label="Team">
        <PitchReveal delay={0}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '2rem' }}>
            07 / Founder
          </p>
        </PitchReveal>

        <PitchReveal delay={100}>
          <h2 style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.75rem, 6vw, 3.5rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.035em', color: '#F0EDE6', marginBottom: '3rem' }}>
            Built by someone
            <br />
            who lives the culture.
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1rem, 3vw, 1.75rem)', fontWeight: 900, color: ACCENT }}>FT</span>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 800, color: '#F0EDE6', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                Felipe Tavares
              </p>
              <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                Founder · CEO · Creative Director
              </p>
              <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: '0.9rem', letterSpacing: '0.05em', color: 'rgba(240,237,230,0.5)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Tavarístico
              </p>
              <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', lineHeight: 1.7, color: 'rgba(240,237,230,0.6)', maxWidth: '50ch' }}>
                Creative director, entrepreneur, and cultural operator based in São Paulo. Founder of the TBF universe — building the infrastructure Brazilian culture always deserved.
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
        aria-label="Contact"
      >
        <PitchReveal delay={100}>
          <p style={{ fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '3rem' }}>
            Let's build together.
          </p>
        </PitchReveal>

        <PitchReveal delay={200}>
          <svg viewBox="0 397 595.28 47" aria-label=".THE BRAZILIAN FACTORY." role="img" style={{ width: '100%', maxWidth: '700px', height: 'auto', display: 'block', marginBottom: '3rem' }}>
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
        </PitchReveal>

        <PitchReveal delay={300}>
          <p style={{ fontFamily: 'var(--tbf-font-family-display)', fontSize: 'clamp(1rem, 3.5vw, 1.75rem)', fontWeight: 700, color: ACCENT, marginBottom: '1rem', letterSpacing: '-0.01em' }}>
            thebrfactory.com
          </p>
        </PitchReveal>

        <PitchReveal delay={400}>
          <p style={{ fontFamily: 'var(--tbf-font-family-body)', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', color: 'rgba(240,237,230,0.5)', marginBottom: '3rem' }}>
            thebrazilianfactory@gmail.com
          </p>
        </PitchReveal>

        <PitchReveal delay={500}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/manifesto" className="btn btn--primary">
              Read the Manifesto →
            </Link>
            <Link href="/labels" className="btn btn--secondary">
              Explore Labels →
            </Link>
            <a href="https://instagram.com/thebrfactory" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              @thebrfactory →
            </a>
          </div>
        </PitchReveal>

        <PitchReveal delay={650}>
          <p style={{ marginTop: '5rem', fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,237,230,0.2)' }}>
            .TBF. inc · CNPJ 61.360.565/0001-74 · Rua Pamplona 145, Jardim Paulista, São Paulo, SP, 01405-900
          </p>
        </PitchReveal>
      </section>

    </div>
  )
}
