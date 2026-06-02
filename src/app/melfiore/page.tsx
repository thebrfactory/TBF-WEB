// =============================================================================
// /melfiore — MELFIORE — THE FIORE DAILY
// Paleta: data-theme="melfiore" (Pergaminho + Carmim)
// CTAs: Enter the Daily · Acquire · Who is Mel Fiore?
// =============================================================================

import type { Metadata } from 'next'
import Image from 'next/image'
import { sanityFetch, MELFIORE_QUERY, urlFor } from '@/lib/sanity'
import type { MelfioreEntry } from '@/types'

export const metadata: Metadata = {
  title: 'Melfiore — The Fiore Daily',
  description:
    'MELFIORE — Intimacy, wellness e ritual por Mel Fiore. The Fiore Daily: curadoria de desejo e presença.',
  openGraph: {
    title: 'MELFIORE — The Fiore Daily | .THE BRAZILIAN FACTORY.',
    description: 'Intimacy · Wellness · Ritual por Mel Fiore.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

export const revalidate = 3600

export default async function MelfiorePage() {
  let entries: MelfioreEntry[] = []

  try {
    entries = await sanityFetch<MelfioreEntry[]>(MELFIORE_QUERY)
  } catch {
    entries = []
  }

  return (
    <div
      data-theme="melfiore"
      style={{
        backgroundColor: 'var(--tbf-color-parchment)',
        color: 'var(--tbf-color-obsidian)',
        minHeight: '100dvh',
      }}
    >
      {/* ─── HERO MELFIORE ─────────────────────────────────────────────── */}
      <section
        id="who-is-mel-fiore"
        style={{
          paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
          paddingBottom: 'var(--tbf-space-20)',
          paddingInline: 'var(--tbf-grid-margin-sm)',
          }}
        aria-labelledby="melfiore-heading"
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
          }}
        >
          <div className="layout-b">
            {/* Texto */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  letterSpacing: 'var(--tbf-type-micro-ls)',
                  color: 'var(--tbf-color-editorial-gray)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--tbf-space-4)',
                }}
              >
                .MELFIORE.
              </p>
              <h1
                id="melfiore-heading"
                style={{
                  fontFamily: 'var(--tbf-type-display-xl-family)',
                  fontSize: 'var(--tbf-type-display-xl-size-sm)',
                  fontWeight: 'var(--tbf-type-display-xl-weight)',
                  lineHeight: 'var(--tbf-type-display-xl-lh-sm)',
                  letterSpacing: 'var(--tbf-type-display-xl-ls)',
                  color: 'var(--tbf-color-obsidian)',
                  marginBottom: 'var(--tbf-space-8)',
                }}
              >
                The Fiore<br />Daily.
              </h1>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-deck-family)',
                  fontSize: 'var(--tbf-type-deck-size-sm)',
                  fontWeight: 'var(--tbf-type-deck-weight)',
                  lineHeight: 'var(--tbf-type-deck-lh)',
                  color: 'var(--tbf-color-editorial-gray)',
                  maxWidth: '50ch',
                  marginBottom: 'var(--tbf-space-10)',
                }}
              >
                Intimidade não se vende — se compartilha.
                Mel Fiore cuida, ritual e deseja.
                Cada entrada do Fiore Daily é um fragmento de presença.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--tbf-space-4)',
                  flexWrap: 'wrap',
                }}
              >
                {/* CTA 1 primário: Enter the Daily */}
                <a
                  href="#fiore-daily"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--tbf-space-3)',
                    fontFamily: 'var(--tbf-type-tag-family)',
                    fontSize: 'var(--tbf-type-tag-size)',
                    fontWeight: 'var(--tbf-type-tag-weight)',
                    letterSpacing: 'var(--tbf-type-tag-ls)',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    backgroundColor: 'var(--tbf-color-obsidian)',
                    color: 'var(--tbf-color-parchment)',
                    padding: 'var(--tbf-btn-padding-y-sm) var(--tbf-btn-padding-x-sm)',
                    transition: 'background-color var(--tbf-motion-duration-micro)',
                  }}
                >
                  Enter the Daily ↓
                </a>
              </div>
            </div>

            {/* Narrativa de Mel Fiore */}
            <div
              style={{
                paddingLeft: 'var(--tbf-space-8)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  letterSpacing: 'var(--tbf-type-micro-ls)',
                  color: 'var(--tbf-color-quartz)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--tbf-space-6)',
                }}
              >
                Quem é Mel Fiore
              </p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  lineHeight: 'var(--tbf-type-body-lh)',
                  color: 'var(--tbf-color-editorial-gray)',
                  marginBottom: 'var(--tbf-space-6)',
                }}
              >
                Mel Fiore é a Marilyn Monroe brasileira.
                Morena. Batom vermelho. Sensualidade não como performance —
                como estado natural de existência.
              </p>
              <p
                style={{
                  fontFamily: 'var(--tbf-type-body-family)',
                  fontSize: 'var(--tbf-type-body-size-sm)',
                  lineHeight: 'var(--tbf-type-body-lh)',
                  color: 'var(--tbf-color-editorial-gray)',
                  marginBottom: 'var(--tbf-space-6)',
                }}
              >
                A Melfiore é a divisão Intimacy-Wellness da .TBF. inc.
                Cuida de quem produz, de quem sente, de quem existe
                com intenção.
              </p>
              {/* CTA 3: Who is Mel Fiore? — micro-CTA tipográfico */}
              <a
                href="#who-is-mel-fiore"
                style={{
                  fontFamily: 'var(--tbf-type-tag-family)',
                  fontSize: 'var(--tbf-type-tag-size)',
                  letterSpacing: 'var(--tbf-type-tag-ls)',
                  color: 'var(--tbf-color-crimson)',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Who is Mel Fiore? ↑
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE FIORE DAILY — FEED ────────────────────────────────────── */}
      <section
        id="fiore-daily"
        aria-labelledby="fiore-daily-heading"
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBlock: 'var(--tbf-space-20)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
          }}
        >
          <p
            id="fiore-daily-heading"
            style={{
              fontFamily: 'var(--tbf-type-micro-family)',
              fontSize: 'var(--tbf-type-micro-size)',
              letterSpacing: 'var(--tbf-type-micro-ls)',
              color: 'var(--tbf-color-quartz)',
              textTransform: 'uppercase',
              marginBottom: 'var(--tbf-space-12)',
            }}
          >
            The Fiore Daily — Arquivo
          </p>

          {entries.length > 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--tbf-space-1)',
              }}
            >
              {entries.map((entry) => (
                <article
                  key={entry._id}
                  style={{
                    paddingBlock: 'var(--tbf-space-8)',
                  }}
                  aria-labelledby={`entry-${entry._id}`}
                >
                  <div className="layout-b">
                    {/* Imagem */}
                    {entry.heroImage && (
                      <div
                        style={{
                          aspectRatio: '4 / 3',
                          overflow: 'hidden',
                          backgroundColor: 'var(--tbf-color-editorial-gray)',
                        }}
                      >
                        <Image
                          src={urlFor(entry.heroImage).width(600).height(450).fit('crop').url()}
                          alt={entry.heroImage.alt ?? entry.title}
                          width={600}
                          height={450}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}

                    {/* Conteúdo */}
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--tbf-type-tag-family)',
                          fontSize: 'var(--tbf-type-tag-size)',
                          letterSpacing: 'var(--tbf-type-tag-ls)',
                          color: 'var(--tbf-color-crimson)',
                          textTransform: 'uppercase',
                          marginBottom: 'var(--tbf-space-3)',
                        }}
                      >
                        {entry.entryType}
                      </p>
                      <h2
                        id={`entry-${entry._id}`}
                        style={{
                          fontFamily: 'var(--tbf-type-h3-family)',
                          fontSize: 'var(--tbf-type-h3-size-sm)',
                          fontWeight: 'var(--tbf-type-h3-weight)',
                          lineHeight: 'var(--tbf-type-h3-lh)',
                          letterSpacing: 'var(--tbf-type-h3-ls)',
                          color: 'var(--tbf-color-obsidian)',
                          marginBottom: 'var(--tbf-space-4)',
                        }}
                      >
                        {entry.title}
                      </h2>

                      {/* Produto + CTA 2: Acquire */}
                      {entry.productName && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--tbf-space-4)',
                            marginTop: 'var(--tbf-space-4)',
                          }}
                        >
                          <p
                            style={{
                              fontFamily: 'var(--tbf-type-caption-family)',
                              fontSize: 'var(--tbf-type-caption-size-sm)',
                              color: 'var(--tbf-color-quartz)',
                            }}
                          >
                            {entry.productName}
                          </p>
                          {entry.productStatus === 'available' && entry.productLink ? (
                            <a
                              href={entry.productLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontFamily: 'var(--tbf-type-tag-family)',
                                fontSize: 'var(--tbf-type-tag-size)',
                                letterSpacing: 'var(--tbf-type-tag-ls)',
                                color: 'var(--tbf-color-obsidian)',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                paddingBottom: '1px',
                              }}
                            >
                              Acquire ↗
                            </a>
                          ) : entry.productStatus === 'coming-soon' ? (
                            <span
                              style={{
                                fontFamily: 'var(--tbf-type-tag-family)',
                                fontSize: 'var(--tbf-type-tag-size)',
                                letterSpacing: 'var(--tbf-type-tag-ls)',
                                color: 'var(--tbf-color-quartz)',
                                textTransform: 'uppercase',
                              }}
                            >
                              Soon
                            </span>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
              <div style={{ }} aria-hidden="true" />
            </div>
          ) : (
            <div
              style={{
                paddingBlock: 'var(--tbf-space-24)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--tbf-type-deck-family)',
                  fontSize: 'var(--tbf-type-deck-size-sm)',
                  color: 'var(--tbf-color-quartz)',
                }}
              >
                Em breve. O ritual começa.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
