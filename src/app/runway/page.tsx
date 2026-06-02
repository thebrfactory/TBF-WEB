// =============================================================================
// /runway — RUNWAY UNITED COLLECTIVE (RUC)
// Arquivo de fashion films + backstage · CTAs: Watch · Explore the Backstage · Collaborate with .RUC.
// =============================================================================

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch, RUNWAY_QUERY, urlFor } from '@/lib/sanity'
import type { FashionFilm, FilmContentType } from '@/types'

export const metadata: Metadata = {
  title: 'Runway — RUC',
  description:
    '.RUC. Runway United Collective — arquivo de fashion films, backstage e colaborações. Linguagem cinematográfica brasileira.',
  openGraph: {
    title: 'Runway United Collective | .THE BRAZILIAN FACTORY.',
    description: 'Fashion Films · Editorial · SPFW',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

export const revalidate = 3600

export default async function RunwayPage() {
  let films: FashionFilm[] = []

  try {
    films = await sanityFetch<FashionFilm[]>(RUNWAY_QUERY)
  } catch {
    films = []
  }

  const featured = films.filter((f) => f.featured)
  const fashionFilms = films.filter((f) => f.contentType === 'fashion-film' && !f.featured)
  const backstage = films.filter((f) => f.contentType === 'backstage')
  const collaborations = films.filter(
    (f) => f.contentType === 'collaboration' || f.contentType === 'spfw'
  )

  return (
    <div
      style={{
        paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
      }}
    >
      {/* ─── HERO HEADER ───────────────────────────────────────────────── */}
      <header
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBottom: 'var(--tbf-space-16)',
          marginBottom: 'var(--tbf-space-16)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--tbf-type-micro-family)',
              fontSize: 'var(--tbf-type-micro-size)',
              letterSpacing: 'var(--tbf-type-micro-ls)',
              color: 'var(--tbf-text-tertiary)',
              textTransform: 'uppercase',
              marginBottom: 'var(--tbf-space-4)',
            }}
          >
            .RUC. — Runway United Collective
          </p>
          <h1
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'var(--tbf-type-display-xl-size-sm)',
              fontWeight: 'var(--tbf-type-display-xl-weight)',
              lineHeight: 'var(--tbf-type-display-xl-lh-sm)',
              letterSpacing: 'var(--tbf-type-display-xl-ls)',
              color: 'var(--tbf-text-primary)',
              marginBottom: 'var(--tbf-space-6)',
            }}
          >
            Runway
          </h1>
          <p
            style={{
              fontFamily: 'var(--tbf-type-deck-family)',
              fontSize: 'var(--tbf-type-deck-size-sm)',
              fontWeight: 'var(--tbf-type-deck-weight)',
              lineHeight: 'var(--tbf-type-deck-lh)',
              color: 'var(--tbf-text-secondary)',
              maxWidth: '55ch',
            }}
          >
            Arquivo visual de uma geração de criadores brasileiros.
            Fashion films, backstage e colaborações.
          </p>
        </div>
      </header>

      {/* ─── FASHION FILMS GRID (todos + featured) ─────────────────────── */}
      <section
        aria-labelledby="films-heading"
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBottom: 'var(--tbf-space-20)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
          }}
        >
          <p
            id="films-heading"
            style={{
              fontFamily: 'var(--tbf-type-micro-family)',
              fontSize: 'var(--tbf-type-micro-size)',
              letterSpacing: 'var(--tbf-type-micro-ls)',
              color: 'var(--tbf-text-tertiary)',
              textTransform: 'uppercase',
              marginBottom: 'var(--tbf-space-8)',
            }}
          >
            Fashion Films
          </p>

          {[...featured, ...fashionFilms].length > 0 ? (
            <div className="layout-c">
              {[...featured, ...fashionFilms].map((film) => (
                <FilmCard key={film._id} film={film} />
              ))}
            </div>
          ) : (
            <div
              style={{
                paddingBlock: 'var(--tbf-space-20)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--tbf-type-deck-family)',
                  fontSize: 'var(--tbf-type-deck-size-sm)',
                  color: 'var(--tbf-text-tertiary)',
                }}
              >
                Em produção.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── BACKSTAGE ─────────────────────────────────────────────────── */}
      {backstage.length > 0 && (
        <section
          id="backstage"
          aria-labelledby="backstage-heading"
          style={{
            paddingInline: 'var(--tbf-grid-margin-sm)',
            paddingBlock: 'var(--tbf-space-16)',
            }}
        >
          <div
            style={{
              maxWidth: 'var(--tbf-grid-max-xl)',
              marginInline: 'auto',
            }}
          >
            <p
              id="backstage-heading"
              style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: 'var(--tbf-type-micro-size)',
                letterSpacing: 'var(--tbf-type-micro-ls)',
                color: 'var(--tbf-text-tertiary)',
                textTransform: 'uppercase',
                marginBottom: 'var(--tbf-space-8)',
              }}
            >
              Backstage
            </p>
            <div className="layout-c">
              {backstage.map((film) => (
                <FilmCard key={film._id} film={film} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA 2: Explore the Backstage — âncora */}
      {backstage.length === 0 && (
        <div
          style={{
            paddingInline: 'var(--tbf-grid-margin-sm)',
            paddingBlock: 'var(--tbf-space-8)',
            }}
        >
          <div
            style={{
              maxWidth: 'var(--tbf-grid-max-xl)',
              marginInline: 'auto',
            }}
          >
            <a href="#backstage" className="btn btn--secondary">
              Explore the Backstage
              <span className="btn__arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      )}

      {/* ─── COLLABORATIONS + CTA 3 ────────────────────────────────────── */}
      <section
        id="collaborations"
        aria-labelledby="collab-heading"
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBlock: 'var(--tbf-space-16)',
          }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
          }}
        >
          {collaborations.length > 0 && (
            <>
              <p
                id="collab-heading"
                style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  letterSpacing: 'var(--tbf-type-micro-ls)',
                  color: 'var(--tbf-text-tertiary)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--tbf-space-8)',
                }}
              >
                Colaborações & SPFW
              </p>
              <div className="layout-c" style={{ marginBottom: 'var(--tbf-space-12)' }}>
                {collaborations.map((film) => (
                  <FilmCard key={film._id} film={film} />
                ))}
              </div>
            </>
          )}

          {/* CTA 3: Collaborate with .RUC. */}
          <Link
            href="/access?intent=ruc"
            className="btn btn--ghost"
          >
            Collaborate with .RUC.
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

// ─── Film Card Component ───────────────────────────────────────────────────────

function FilmCard({ film }: { film: FashionFilm }) {
  const thumbUrl = film.thumbnailImage
    ? urlFor(film.thumbnailImage).width(600).height(338).fit('crop').url()
    : null

  const CONTENT_TYPE_LABELS: Record<FilmContentType, string> = {
    'fashion-film': 'Fashion Film',
    backstage: 'Backstage',
    collaboration: 'Colaboração',
    spfw: 'SPFW',
  }

  return (
    <article
      className="reveal reveal--card"
      style={{
        paddingTop: 'var(--tbf-space-6)',
      }}
      aria-labelledby={`film-${film._id}`}
    >
      {/* Thumbnail com play overlay */}
      <div
        className="video-embed"
        role="button"
        tabIndex={0}
        aria-label={`Assistir: ${film.title}`}
        style={{ marginBottom: 'var(--tbf-space-4)', cursor: 'pointer' }}
      >
        {thumbUrl && (
          <Image
            className="video-embed__thumbnail"
            src={thumbUrl}
            alt={film.thumbnailImage?.alt ?? film.title}
            width={600}
            height={338}
          />
        )}
        <div className="video-embed__overlay">
          <svg
            className="video-embed__play"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
          </svg>
        </div>
      </div>

      {/* Meta */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--tbf-space-2)',
          marginBottom: 'var(--tbf-space-3)',
        }}
      >
        <span className="tag">
          {CONTENT_TYPE_LABELS[film.contentType]}
        </span>
        {film.season && (
          <span className="tag tag--bu">{film.season}</span>
        )}
      </div>

      <h2
        id={`film-${film._id}`}
        style={{
          fontFamily: 'var(--tbf-type-h3-family)',
          fontSize: 'var(--tbf-type-h3-size-sm)',
          fontWeight: 'var(--tbf-type-h3-weight)',
          lineHeight: 'var(--tbf-type-h3-lh)',
          letterSpacing: 'var(--tbf-type-h3-ls)',
          color: 'var(--tbf-text-primary)',
          marginBottom: film.deck ? 'var(--tbf-space-2)' : '0',
        }}
      >
        {film.title}
      </h2>

      {film.deck && (
        <p
          style={{
            fontFamily: 'var(--tbf-type-caption-family)',
            fontSize: 'var(--tbf-type-caption-size-sm)',
            color: 'var(--tbf-text-secondary)',
            lineHeight: 'var(--tbf-type-caption-lh)',
          }}
        >
          {film.deck}
        </p>
      )}
    </article>
  )
}
