// =============================================================================
// /labels — AS 4 DIVISÕES DO ORGANISMO TBF
// One organism. Four labels. Uma frequência.
// =============================================================================

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Labels',
  description:
    'The labels of .THE BRAZILIAN FACTORY. Four divisions of one cultural organism: .TBF. · .MELFIORE. · .RUC. · .TGF.',
  openGraph: {
    title: 'Labels | .THE BRAZILIAN FACTORY.',
    description: 'One organism. Four labels. One frequency.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

const LABELS = [
  {
    tag: '.TBF.',
    name: 'The Brazilian Factory',
    subtitle: 'Collective Hotel Casino',
    subtitlePt: 'Collective Hotel Casino',
    href: '/editorial',
    cta: '→ Enter .TBF. Editorial',
    isCTAPrimary: true,
    points: [
      { label: 'Categoria', value: 'Label editorial cultural. Identidade central do organismo .TBF. inc' },
      { label: 'Propósito', value: 'Produz narrativas, manifesto e curadoria para quem já entende o código cultural' },
      { label: 'Para quem', value: 'Criadores, consumidores culturais, investidores e parceiros estratégicos' },
      { label: 'Entregas', value: 'Artigos editoriais · Manifesto · Entrevistas · Curadoria de referências' },
    ],
  },
  {
    tag: '.TFD.',
    name: 'Melfiore',
    subtitle: 'Intimacy-Wellness Community',
    subtitlePt: 'Intimacy-Wellness Community',
    href: '/labels/thefioredaily',
    cta: '→ Enter The Fiore Daily',
    isCTAPrimary: false,
    points: [
      { label: 'Categoria', value: 'Label de lifestyle e wellness com identidade visual própria' },
      { label: 'Propósito', value: 'Cria rituais de bem-estar e narrativas de intimidade com estética e identidade próprias' },
      { label: 'Para quem', value: 'Mulheres que constroem suas rotinas com intenção, beleza e cuidado pessoal' },
      { label: 'Entregas', value: 'Guias de ritual · Curadoria de produtos · Conteúdo de lifestyle · Colaborações' },
    ],
  },
  {
    tag: '.RUC.',
    name: 'Runway United Collective',
    subtitle: 'Fashion Film Magazine',
    subtitlePt: 'Fashion Film Magazine',
    href: '/labels/runwayunited',
    cta: '→ Explore the Archive',
    isCTAPrimary: false,
    points: [
      { label: 'Categoria', value: 'Arquivo visual de moda com linguagem cinematográfica' },
      { label: 'Propósito', value: 'Documenta e produz a linguagem visual da moda brasileira emergente' },
      { label: 'Para quem', value: 'Designers, modelos, fotógrafos, stylists e admiradores de moda contemporânea' },
      { label: 'Entregas', value: 'Fashion films · Editoriais fotográficos · Cobertura SPFW · Arquivo digital' },
    ],
  },
  {
    tag: '.TGF.',
    name: 'The Growth Factory',
    subtitle: 'Worldwide Brazilian Support',
    subtitlePt: 'Worldwide Brazilian Support',
    href: '/labels/factoryofgrowth',
    cta: '→ Explore .TGF.',
    isCTAPrimary: true,
    points: [
      { label: 'Categoria', value: 'Consultoria de performance e crescimento de negócios' },
      { label: 'Propósito', value: 'Entrega crescimento real para negócios brasileiros nos EUA com autoridade técnica' },
      { label: 'Para quem', value: 'Empreendedores brasileiros nos EUA com negócios ativos que querem escalar com posicionamento premium' },
      { label: 'Entregas', value: 'Estratégia digital · Marketing de performance · Posicionamento · Mentoria' },
    ],
  },
]

export default function LabelsPage() {
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
            Labels
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
            One organism. Four labels. One shared frequency between editorial, desire, fashion, and growth.
          </p>
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
            Um organismo. Quatro divisões. Uma frequência compartilhada entre editorial, desejo, moda e crescimento.
          </p>
        </div>
      </header>

      {/* ─── 4 LABELS ──────────────────────────────────────────────────── */}
      <section
        aria-label="Labels, divisions of .TBF. inc"
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBottom: 'var(--tbf-space-20)',
        }}
      >
        <div style={{ maxWidth: 'var(--tbf-grid-max-xl)', marginInline: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-1)' }}>
            {LABELS.map((label, i) => (
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
                      ADD-PREVIEW-MATERIAL
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
                      <span style={{ display: 'block', fontStyle: 'italic', textTransform: 'none', letterSpacing: 0, marginTop: '2px' }}>
                        {label.subtitlePt}
                      </span>
                    </p>
                    <dl
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--tbf-space-4)',
                        marginBottom: 'var(--tbf-space-10)',
                      }}
                    >
                      {label.points.map(p => (
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

                    <Link
                      href={label.href}
                      className={label.isCTAPrimary ? 'btn btn--secondary' : 'btn btn--ghost'}
                    >
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
        aria-label="Enter the collective"
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
          <Link href="/collective" className="btn btn--primary">
            Enter the Casino
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/pitch" className="btn btn--secondary">
            See our Pitch
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
