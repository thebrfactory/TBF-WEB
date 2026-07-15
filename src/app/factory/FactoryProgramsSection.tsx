'use client'

// =============================================================================
// FACTORY PROGRAMS SECTION — Layout B alternado por programa
// =============================================================================

import { useEffect, useRef } from 'react'
import { PortableText } from '@portabletext/react'
import type { TGFProgram } from '@/types'

interface FactoryProgramsSectionProps {
  programs: TGFProgram[]
}

// Programas placeholder quando Sanity não disponível
const PLACEHOLDER_PROGRAMS = [
  {
    _id: 'placeholder-1',
    name: 'Programa de Aceleração',
    tagline: 'Para negócios que querem escalar de forma estruturada.',
    description: null,
    targetAudience: 'Empresas com faturamento acima de R$ 50k/mês',
    deliverables: [
      'Diagnóstico completo do negócio',
      'Estratégia de crescimento personalizada',
      'Acompanhamento semanal por 3 meses',
      'Acesso direto ao fundador',
    ],
    ctaLabel: 'Start the Program',
    ctaUrl: 'https://cal.com/tbf',
    order: 1,
  },
  {
    _id: 'placeholder-2',
    name: 'Advisory',
    tagline: 'Conselho estratégico contínuo para decisões que importam.',
    description: null,
    targetAudience: 'Fundadores e líderes de negócio',
    deliverables: [
      'Sessões mensais de estratégia',
      'Disponibilidade por mensagem',
      'Revisão de KPIs e metas',
    ],
    ctaLabel: 'Apply for Advisory',
    ctaUrl: 'https://cal.com/tbf',
    order: 2,
  },
]

export function FactoryProgramsSection({ programs }: FactoryProgramsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const displayPrograms = programs.length > 0 ? programs : PLACEHOLDER_PROGRAMS

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reveals = el.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section container"
      aria-labelledby="programas-heading"
    >
      <h2
        id="programas-heading"
        className="reveal reveal--headline"
        style={{
          fontFamily: 'var(--tbf-type-h2-family)',
          fontSize: 'var(--tbf-type-h2-size-sm)',
          fontWeight: 'var(--tbf-type-h2-weight)',
          lineHeight: 'var(--tbf-type-h2-lh)',
          letterSpacing: 'var(--tbf-type-h2-ls)',
          color: 'var(--tbf-text-primary)',
          marginBottom: 'var(--tbf-space-12)',
        }}
      >
        Programas
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-20)' }}>
        {displayPrograms.map((program, index) => (
          <article
            key={program._id}
            className="reveal reveal--bu"
            style={{
              paddingTop: 'var(--tbf-space-8)',
            }}
          >
            {/* Layout B — alternância texto/info */}
            <div
              className="layout-b"
              style={{ direction: index % 2 === 1 ? 'rtl' : 'ltr' }}
            >
              {/* Texto */}
              <div style={{ direction: 'ltr' }}>
                <p style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  letterSpacing: 'var(--tbf-type-micro-ls)',
                  color: 'var(--tbf-text-tertiary)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--tbf-space-4)',
                }}>
                  0{program.order}
                </p>
                <h3 style={{
                  fontFamily: 'var(--tbf-type-h2-family)',
                  fontSize: 'var(--tbf-type-h2-size-sm)',
                  fontWeight: 'var(--tbf-type-h2-weight)',
                  lineHeight: 'var(--tbf-type-h2-lh)',
                  color: 'var(--tbf-text-primary)',
                  marginBottom: 'var(--tbf-space-4)',
                }}>
                  {program.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--tbf-type-deck-family)',
                  fontSize: 'var(--tbf-type-deck-size-sm)',
                  fontWeight: 'var(--tbf-type-deck-weight)',
                  color: 'var(--tbf-text-secondary)',
                  lineHeight: 'var(--tbf-type-deck-lh)',
                  marginBottom: 'var(--tbf-space-6)',
                }}>
                  {program.tagline}
                </p>
                {program.description && (
                  <div style={{
                    fontFamily: 'var(--tbf-type-body-family)',
                    fontSize: 'var(--tbf-type-body-size-sm)',
                    color: 'var(--tbf-text-secondary)',
                    lineHeight: 'var(--tbf-type-body-lh)',
                    marginBottom: 'var(--tbf-space-8)',
                  }}>
                    <PortableText value={program.description} />
                  </div>
                )}
                <a
                  href={program.ctaUrl ?? 'https://cal.com/tbf'}
                  className="btn btn--primary"
                  target={program.ctaUrl ? '_blank' : undefined}
                  rel={program.ctaUrl ? 'noopener noreferrer' : undefined}
                >
                  {program.ctaLabel}
                  <span className="btn__arrow" aria-hidden="true">→</span>
                </a>
              </div>

              {/* Info coluna */}
              <div style={{ direction: 'ltr' }}>
                <p style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  letterSpacing: 'var(--tbf-type-micro-ls)',
                  color: 'var(--tbf-text-tertiary)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--tbf-space-4)',
                }}>
                  Para quem
                </p>
                <p style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  color: 'var(--tbf-text-secondary)',
                  marginBottom: 'var(--tbf-space-8)',
                }}>
                  {program.targetAudience}
                </p>

                {program.deliverables && program.deliverables.length > 0 && (
                  <>
                    <p style={{
                      fontFamily: 'var(--tbf-type-micro-family)',
                      fontSize: 'var(--tbf-type-micro-size)',
                      letterSpacing: 'var(--tbf-type-micro-ls)',
                      color: 'var(--tbf-text-tertiary)',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--tbf-space-4)',
                    }}>
                      Inclui
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {program.deliverables.map((item, i) => (
                        <li
                          key={i}
                          style={{
                            fontFamily: 'var(--tbf-type-body-family)',
                            fontSize: 'var(--tbf-type-body-size-sm)',
                            color: 'var(--tbf-text-secondary)',
                            paddingBlock: 'var(--tbf-space-2)',
                            display: 'flex',
                            gap: 'var(--tbf-space-3)',
                          }}
                        >
                          <span style={{ color: 'var(--tbf-accent)' }} aria-hidden="true">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
