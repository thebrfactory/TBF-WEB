'use client'

// =============================================================================
// FACTORY PROGRAMS SECTION — Layout B alternado por programa
// =============================================================================

import { useEffect, useRef } from 'react'
import { PortableText } from '@portabletext/react'
import type { TGFProgram } from '@/types'
import { useLang } from '@/lib/LangProvider'
import { factory } from '@/content/i18n/pages/factory'

interface FactoryProgramsSectionProps {
  programs: TGFProgram[]
}

export function FactoryProgramsSection({ programs }: FactoryProgramsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const lang = useLang()
  const t = factory[lang].programs

  // Programas placeholder quando Sanity não disponível — texto sai do
  // dicionário, ordem/URL do cal.com são os únicos campos fixos aqui.
  const placeholderPrograms = t.placeholder.map((p, i) => ({
    _id: `placeholder-${i + 1}`,
    name: p.name,
    tagline: p.tagline,
    description: null,
    targetAudience: p.targetAudience,
    deliverables: p.deliverables,
    ctaLabel: p.ctaLabel,
    // Link real de agendamento, confirmado pelo fundador em 2026-08-10.
    // O anterior (cal.com/tbf) era INVENTADO: ele nunca criou essa conta, e o
    // endereço devolvia 404 em produção — CTA morto no ar, em três lugares.
    ctaUrl: 'https://calendly.com/thebrazilianfactory/30min',
    order: i + 1,
  }))

  const displayPrograms = programs.length > 0 ? programs : placeholderPrograms

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
        {t.heading}
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
                  href={program.ctaUrl ?? 'https://calendly.com/thebrazilianfactory/30min'}
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
                  {t.forWhomLabel}
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
                      {t.includesLabel}
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
