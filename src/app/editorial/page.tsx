// =============================================================================
// /editorial — FEED EDITORIAL
// Grid assimétrico + filtros por categoria (client component)
// CTAs: Read the piece (grid) · Expand the archive (paginação)
// =============================================================================

import type { Metadata } from 'next'
import { sanityFetch, EDITORIAL_LIST_QUERY } from '@/lib/sanity'
import type { EditorialPost } from '@/types'
import { EditorialGrid } from './EditorialGrid'

export const metadata: Metadata = {
  title: 'Editorial',
  description:
    'Arquivo editorial da .THE BRAZILIAN FACTORY. — Moda, cultura, manifesto e coolhunting de São Paulo para o mundo.',
  openGraph: {
    title: 'Editorial | .THE BRAZILIAN FACTORY.',
    description:
      'Arquivo editorial de moda e cultura brasileira.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

export const revalidate = 3600

export default async function EditorialPage() {
  let posts: EditorialPost[] = []

  try {
    posts = await sanityFetch<EditorialPost[]>(EDITORIAL_LIST_QUERY)
  } catch {
    posts = []
  }

  return (
    <>
      {/* ─── HERO / SECTION HEADER ─────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
          paddingBottom: 'var(--tbf-space-12)',
          paddingInline: 'var(--tbf-grid-margin-sm)',
        }}
        aria-labelledby="editorial-heading"
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
            .THE BRAZILIAN FACTORY.
          </p>
          <h1
            id="editorial-heading"
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'var(--tbf-type-display-xl-size-sm)',
              fontWeight: 'var(--tbf-type-display-xl-weight)',
              lineHeight: 'var(--tbf-type-display-xl-lh-sm)',
              letterSpacing: 'var(--tbf-type-display-xl-ls)',
              color: 'var(--tbf-text-primary)',
              textTransform: 'uppercase',
            }}
          >
            Magazine
          </h1>
        </div>
      </section>

      {/* ─── GRID + FILTROS (client component) ────────────────────────────── */}
      <EditorialGrid posts={posts} />
    </>
  )
}
