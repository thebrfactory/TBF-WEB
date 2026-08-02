// =============================================================================
// /labels — AS 4 DIVISÕES DO ORGANISMO TBF
// One organism. Four labels. Uma frequência.
//
// Uma página, dois idiomas: o texto vem do dicionário e os links passam por
// localizedPath. Ver src/content/i18n/README.md.
// =============================================================================

import Link from 'next/link'
import { labels } from '@/content/i18n/pages/labels'
import { localizedPath, type Lang } from '@/lib/i18n'

export default function LabelsView({ lang }: { lang: Lang }) {
  const t = labels[lang]
  const path = (p: string) => localizedPath(p, lang)

  return (
    <div
      style={{
        paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
        background: '#000000',
        minHeight: '100dvh',
      }}
    >
      {/* ─── HERO HEADER ───────────────────────────────────────────────── */}
      <header
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBottom: 'var(--tbf-space-20)',
          marginBottom: 'var(--tbf-space-20)',
        }}
      >
        <div style={{ maxWidth: 'var(--tbf-grid-max-xl)', marginInline: 'auto' }}>
          <h1
            style={{
              fontFamily: 'var(--tbf-font-family-display)',
              fontSize: 'clamp(3rem, 10vw, 7.5rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: 'var(--tbf-text-primary)',
              marginBottom: 'var(--tbf-space-6)',
              textTransform: 'uppercase',
            }}
          >
            {t.hero.title}
          </h1>
          <p
            style={{
              fontFamily: 'var(--tbf-font-family-body)',
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
              fontWeight: 300,
              lineHeight: 1.4,
              color: 'var(--tbf-text-secondary)',
              maxWidth: '55ch',
              marginBottom: 'var(--tbf-space-3)',
            }}
          >
            {t.hero.lead}
          </p>
          {/* Eco bilíngue: a mesma frase no outro idioma, em itálico — o
              mesmo gesto que já existia aqui antes da divisão em duas rotas. */}
          <p
            style={{
              fontFamily: 'var(--tbf-font-family-body)',
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
              fontWeight: 300,
              lineHeight: 1.4,
              color: 'var(--tbf-text-tertiary)',
              fontStyle: 'italic',
            }}
          >
            {t.hero.echo}
          </p>
        </div>
      </header>

      {/* ─── 4 LABELS ──────────────────────────────────────────────────── */}
      <section
        aria-label={t.sectionAriaLabel}
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBottom: 'var(--tbf-space-20)',
        }}
      >
        <div style={{ maxWidth: 'var(--tbf-grid-max-xl)', marginInline: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-1)' }}>
            {t.labels.map((label) => (
              <article
                key={label.tag}
                style={{
                  paddingBlock: 'var(--tbf-space-12)',
                }}
                aria-labelledby={`label-${label.tag.replace(/\./g, '')}`}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 'var(--tbf-space-8)',
                  }}
                >
                  {/* Media placeholder */}
                  <div
                    style={{
                      aspectRatio: '16/9',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '6px',
                      background: '#060d18',
                    }}
                  >
                    <p
                      style={{
                        position: 'absolute',
                        top: 'var(--tbf-space-3)',
                        left: 'var(--tbf-space-4)',
                        fontFamily: 'var(--tbf-font-family-ui)',
                        fontSize: '0.55rem',
                        letterSpacing: '0.14em',
                        color: 'rgba(255,255,255,0.2)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {t.previewPlaceholder}
                    </p>
                    <p
                      style={{
                        position: 'absolute',
                        bottom: 'var(--tbf-space-4)',
                        left: 'var(--tbf-space-4)',
                        fontFamily: 'var(--tbf-font-family-display)',
                        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                        fontWeight: 900,
                        color: '#fff',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                      }}
                    >
                      {label.tag}
                    </p>
                  </div>

                  {/* Info */}
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--tbf-font-family-ui)',
                        fontSize: 'var(--tbf-type-tag-size)',
                        letterSpacing: 'var(--tbf-type-tag-ls)',
                        color: 'var(--tbf-accent)',
                        textTransform: 'uppercase',
                        marginBottom: 'var(--tbf-space-3)',
                      }}
                    >
                      {label.tag}
                    </p>
                    <h2
                      id={`label-${label.tag.replace(/\./g, '')}`}
                      style={{
                        fontFamily: 'var(--tbf-font-family-display)',
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        fontWeight: 800,
                        lineHeight: 1.0,
                        letterSpacing: '-0.025em',
                        color: 'var(--tbf-text-primary)',
                        marginBottom: 'var(--tbf-space-2)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {label.name}
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--tbf-font-family-ui)',
                        fontSize: 'var(--tbf-type-caption-size-sm)',
                        color: 'var(--tbf-text-tertiary)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        marginBottom: 'var(--tbf-space-6)',
                      }}
                    >
                      {label.subtitle}
                    </p>
                    <dl
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--tbf-space-4)',
                        marginBottom: 'var(--tbf-space-10)',
                      }}
                    >
                      {[
                        { label: t.pointLabels.category, value: label.category },
                        { label: t.pointLabels.purpose, value: label.purpose },
                        { label: t.pointLabels.forWho, value: label.forWho },
                        { label: t.pointLabels.deliverables, value: label.deliverables },
                      ].map((p) => (
                        <div
                          key={p.label}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '100px 1fr',
                            gap: 'var(--tbf-space-5)',
                            alignItems: 'baseline',
                            paddingBottom: 'var(--tbf-space-3)',
                          }}
                        >
                          <dt
                            style={{
                              fontFamily: 'var(--tbf-font-family-ui)',
                              fontSize: 'var(--tbf-type-micro-size)',
                              letterSpacing: 'var(--tbf-type-micro-ls)',
                              color: 'var(--tbf-text-tertiary)',
                              textTransform: 'uppercase',
                            }}
                          >
                            {p.label}
                          </dt>
                          <dd
                            style={{
                              fontFamily: 'var(--tbf-font-family-body)',
                              fontSize: 'clamp(0.8rem, 2.2vw, 0.95rem)',
                              lineHeight: 1.55,
                              color: 'var(--tbf-text-secondary)',
                            }}
                          >
                            {p.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <Link href={path(label.href)} className="btn btn--secondary">
                      {label.cta}
                    </Link>
                  </div>
                </div>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─────────────────────────────────────────────────── */}
      <section
        aria-label={t.closing.ariaLabel}
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBlock: 'var(--tbf-space-20)',
          }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
            display: 'flex',
            gap: 'var(--tbf-space-4)',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Link href={path('/collective')} className="btn btn--primary">
            {t.closing.casinoCta}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
          <Link href={path('/pitch')} className="btn btn--secondary">
            {t.closing.pitchCta}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
