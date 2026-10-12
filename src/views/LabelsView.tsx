// =============================================================================
// /labels: OS 4 MUNDOS DA FACTORY
// One factory. Four worlds. Uma frequência.
//
// Uma página, dois idiomas: o texto vem do dicionário e os links passam por
// localizedPath. Ver src/content/i18n/README.md.
// =============================================================================

import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
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
          {/* Eco bilíngue: a mesma frase no outro idioma, em itálico, o
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
          <p
            style={{
              fontFamily: 'var(--tbf-font-family-body)',
              fontSize: 'var(--tbf-type-body-size-sm)',
              lineHeight: 'var(--tbf-type-body-lh)',
              color: 'var(--tbf-text-secondary)',
              maxWidth: '55ch',
              marginTop: 'var(--tbf-space-8)',
            }}
          >
            {t.hero.intro}
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
            {t.labels.map((label, i) => (
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
                  {/* Preview da fase: foto + gradiente escuro de baixo para cima + sigla */}
                  <div
                    style={{
                      aspectRatio: '16/9',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '6px',
                      background: '#060d18',
                    }}
                  >
                    <Image
                      src={label.image.src}
                      alt={label.image.alt}
                      width={label.image.width}
                      height={label.image.height}
                      sizes="(min-width: 1440px) 1280px, 100vw"
                      priority={i === 0}
                      loading={i === 0 ? undefined : 'lazy'}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 35%, transparent 65%)',
                      }}
                    />
                    <p
                      style={{
                        position: 'absolute',
                        zIndex: 1,
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
                      {label.index} · {label.territory}
                    </p>
                    <h2
                      id={`label-${label.tag.replace(/\./g, '')}`}
                      style={{
                        fontFamily: 'var(--tbf-font-family-display)',
                        fontSize: 'clamp(1.75rem, 6vw, 3rem)',
                        fontWeight: 800,
                        lineHeight: 1.0,
                        letterSpacing: '-0.025em',
                        color: 'var(--tbf-text-primary)',
                        marginBottom: 'var(--tbf-space-2)',
                      }}
                    >
                      {label.line}
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
                      <strong style={{ fontWeight: 800 }}>{label.tag}</strong> · {label.name}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--tbf-font-family-ui)',
                        fontSize: 'var(--tbf-type-micro-size)',
                        letterSpacing: 'var(--tbf-type-micro-ls)',
                        color: 'var(--tbf-text-primary)',
                        textTransform: 'uppercase',
                        marginBottom: 'var(--tbf-space-4)',
                      }}
                    >
                      {label.keywords}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--tbf-font-family-body)',
                        fontSize: 'var(--tbf-type-body-size-sm)',
                        lineHeight: 'var(--tbf-type-body-lh)',
                        color: 'var(--tbf-text-secondary)',
                        maxWidth: '55ch',
                        marginBottom: 'var(--tbf-space-10)',
                      }}
                    >
                      {label.note}
                    </p>

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

      {/* ─── COMO NASCE UMA LABEL ──────────────────────────────────────── */}
      <section
        aria-labelledby="label-born"
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBlock: 'var(--tbf-space-12)',
        }}
      >
        <div style={{ maxWidth: 'min(var(--tbf-grid-max-xl), 42.5rem)', marginInline: 'auto' }}>
          <h2
            id="label-born"
            style={{
              fontFamily: 'var(--tbf-type-h2-family)',
              fontSize: 'var(--tbf-type-h2-size-sm)',
              fontWeight: 'var(--tbf-type-h2-weight)',
              lineHeight: 'var(--tbf-type-h2-lh)',
              letterSpacing: 'var(--tbf-type-h2-ls)',
              color: 'var(--tbf-text-primary)',
              marginBottom: 'var(--tbf-space-4)',
            }}
          >
            {t.born.heading}
          </h2>
          <p
            style={{
              fontFamily: 'var(--tbf-type-body-family)',
              fontSize: 'var(--tbf-type-body-size-sm)',
              lineHeight: 'var(--tbf-type-body-lh)',
              color: 'var(--tbf-text-secondary)',
              marginBottom: 'var(--tbf-space-4)',
            }}
          >
            {t.born.body}
          </p>
          <p
            style={{
              fontFamily: 'var(--tbf-type-h2-family)',
              fontSize: 'var(--tbf-type-h2-size-sm)',
              fontWeight: 'var(--tbf-type-h2-weight)',
              lineHeight: 'var(--tbf-type-h2-lh)',
              color: 'var(--tbf-accent)',
            }}
          >
            {t.born.verdict}
          </p>
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
          <p
            style={{
              flexBasis: '100%',
              fontFamily: 'var(--tbf-type-body-family)',
              fontSize: 'var(--tbf-type-body-size-sm)',
              lineHeight: 'var(--tbf-type-body-lh)',
              color: 'var(--tbf-text-secondary)',
              maxWidth: '55ch',
              marginBottom: 'var(--tbf-space-4)',
            }}
          >
            {t.closing.line}
          </p>
          <Link href={path('/collective')} className="btn btn--primary">
            {t.closing.collectiveCta}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
          <Link href={path('/pitch/v1')} className="btn btn--secondary">
            {t.closing.pitchCta}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
