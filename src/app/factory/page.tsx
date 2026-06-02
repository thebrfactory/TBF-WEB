// =============================================================================
// /factory — THE GROWTH FACTORY
// PRIORIDADE 1 — Cashflow BU
// Tema: data-theme="inverse" (Pergaminho + Obsidiana)
// CTAs: Schedule a Session / Start the Program / Open a channel
// =============================================================================

import type { Metadata } from 'next'
import { sanityFetch, FACTORY_QUERY } from '@/lib/sanity'
import type { TGFProgram } from '@/types'
import { FactoryProgramsSection } from './FactoryProgramsSection'
import { FactoryHeroSection } from './FactoryHeroSection'

export const metadata: Metadata = {
  title: 'The Growth Factory | .TGF.',
  description:
    'Programas de aceleração para negócios com faturamento estável que querem crescimento real. Sem promessas genéricas. Com processo.',
  openGraph: {
    title: 'The Growth Factory | .TGF.',
    description:
      'Programas de aceleração para negócios que querem crescimento real.',
    images: [{ url: '/og-factory.jpg', width: 1200, height: 630 }],
  },
}

export const revalidate = 3600

export default async function FactoryPage() {
  let programs: TGFProgram[] = []

  try {
    programs = await sanityFetch<TGFProgram[]>(FACTORY_QUERY)
  } catch {
    // Exibe estrutura com placeholder se Sanity não disponível
    programs = []
  }

  return (
    <div data-theme="inverse">
      {/* ─── HERO / HEADLINE BLOCK ─────────────────────────────────────────── */}
      <FactoryHeroSection />

      {/* ─── PROGRAMAS ─────────────────────────────────────────────────────── */}
      <FactoryProgramsSection programs={programs} />

      {/* ─── TRACK RECORD ──────────────────────────────────────────────────── */}
      <section
        className="section container"
        aria-labelledby="track-record-heading"
      >
        <div className="reveal reveal--headline">
          <h2 id="track-record-heading" style={{
            fontFamily: 'var(--tbf-type-h2-family)',
            fontSize: 'var(--tbf-type-h2-size-sm)',
            fontWeight: 'var(--tbf-type-h2-weight)',
            lineHeight: 'var(--tbf-type-h2-lh)',
            letterSpacing: 'var(--tbf-type-h2-ls)',
            color: 'var(--tbf-text-primary)',
            marginBottom: 'var(--tbf-space-12)',
          }}>
            Track Record
          </h2>
        </div>

        <div className="layout-c">
          {[
            { metric: '3×', label: 'Crescimento médio de receita no primeiro ano' },
            { metric: '100%', label: 'Dos clientes recomendam ativamente' },
            { metric: 'R$0', label: 'Em promessas genéricas de resultado' },
          ].map((item, i) => (
            <div
              key={i}
              className="reveal reveal--card"
              style={{
                paddingTop: 'var(--tbf-space-8)',
              }}
            >
              <p style={{
                fontFamily: 'var(--tbf-type-display-xl-family)',
                fontSize: 'var(--tbf-type-display-lg-size-sm)',
                fontWeight: 'var(--tbf-type-display-xl-weight)',
                letterSpacing: 'var(--tbf-type-display-xl-ls)',
                color: 'var(--tbf-text-primary)',
                marginBottom: 'var(--tbf-space-4)',
              }}>
                {item.metric}
              </p>
              <p style={{
                fontFamily: 'var(--tbf-type-body-family)',
                fontSize: 'var(--tbf-type-body-size-sm)',
                color: 'var(--tbf-text-secondary)',
                lineHeight: 'var(--tbf-type-body-lh)',
              }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROCESSO ──────────────────────────────────────────────────────── */}
      <section
        className="section container"
        aria-labelledby="processo-heading"
      >
        <div className="reveal reveal--headline">
          <h2 id="processo-heading" style={{
            fontFamily: 'var(--tbf-type-h2-family)',
            fontSize: 'var(--tbf-type-h2-size-sm)',
            fontWeight: 'var(--tbf-type-h2-weight)',
            lineHeight: 'var(--tbf-type-h2-lh)',
            letterSpacing: 'var(--tbf-type-h2-ls)',
            color: 'var(--tbf-text-primary)',
            marginBottom: 'var(--tbf-space-12)',
          }}>
            O Processo
          </h2>
        </div>

        <div className="layout-c">
          {[
            {
              step: '01',
              title: 'Diagnóstico',
              desc: 'Sessão inicial de mapeamento. Entendemos onde você está e onde precisa chegar. Sem filtros.',
            },
            {
              step: '02',
              title: 'Estratégia',
              desc: 'Desenvolvemos o plano específico para o seu negócio. Não existe template aqui.',
            },
            {
              step: '03',
              title: 'Execução',
              desc: 'Implementamos juntos. Acompanhamento semanal. Ajustes em tempo real.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="reveal reveal--card"
              style={{
                paddingTop: 'var(--tbf-space-8)',
              }}
            >
              <p style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: 'var(--tbf-type-micro-size)',
                letterSpacing: 'var(--tbf-type-micro-ls)',
                color: 'var(--tbf-text-tertiary)',
                marginBottom: 'var(--tbf-space-4)',
                textTransform: 'uppercase',
              }}>
                {item.step}
              </p>
              <h3 style={{
                fontFamily: 'var(--tbf-type-h3-family)',
                fontSize: 'var(--tbf-type-h3-size-sm)',
                fontWeight: 'var(--tbf-type-h3-weight)',
                color: 'var(--tbf-text-primary)',
                marginBottom: 'var(--tbf-space-4)',
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: 'var(--tbf-type-body-family)',
                fontSize: 'var(--tbf-type-body-size-sm)',
                color: 'var(--tbf-text-secondary)',
                lineHeight: 'var(--tbf-type-body-lh)',
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BLOCK DARK (inversão dentro da inversão) ─────────────────── */}
      <section
        className="section--cta-dark"
        aria-labelledby="cta-block-heading"
      >
        <div className="container">
          <div className="reveal reveal--headline" style={{ textAlign: 'center', maxWidth: '60ch', marginInline: 'auto' }}>
            <h2
              id="cta-block-heading"
              style={{
                fontFamily: 'var(--tbf-type-h1-family)',
                fontSize: 'var(--tbf-type-h1-size-sm)',
                fontWeight: 'var(--tbf-type-h1-weight)',
                lineHeight: 'var(--tbf-type-h1-lh)',
                letterSpacing: 'var(--tbf-type-h1-ls)',
                color: 'var(--tbf-text-primary)',
                marginBottom: 'var(--tbf-space-6)',
              }}
            >
              Pronto para crescimento real?
            </h2>
            <p
              className="reveal reveal--deck"
              style={{
                fontFamily: 'var(--tbf-type-deck-family)',
                fontSize: 'var(--tbf-type-deck-size-sm)',
                fontWeight: 'var(--tbf-type-deck-weight)',
                color: 'var(--tbf-text-secondary)',
                marginBottom: 'var(--tbf-space-10)',
              }}
            >
              Uma sessão. Sem compromisso. Com clareza.
            </p>
            <div style={{ display: 'flex', gap: 'var(--tbf-space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://cal.com/tbf"
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Schedule a Session — abre calendário Calendly"
              >
                Schedule a Session
                <span className="btn__arrow" aria-hidden="true">→</span>
              </a>
              <a href="/access?intent=tgf" className="btn btn--ghost">
                Open a channel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STICKY CTA — Mobile (some quando seção CTA aparece) ─────────── */}
      <div className="sticky-cta" aria-hidden="true">
        <a
          href="https://cal.com/tbf"
          className="btn btn--primary"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
        >
          Schedule a Session →
        </a>
      </div>
    </div>
  )
}
