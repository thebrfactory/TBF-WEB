// =============================================================================
// /editorial — FEED EDITORIAL
// Grid assimétrico + filtros por categoria (client component)
// CTAs: Read the piece (grid) · Expand the archive (paginação)
// =============================================================================

import type { Metadata } from 'next'
import Image from 'next/image'
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
      {/* ─── HERO / SECTION HEADER — capa editorial como fundo (estilo /labels) ─── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '56vh',
          display: 'flex',
          alignItems: 'flex-end',
          paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
          paddingBottom: 'var(--tbf-space-16)',
          paddingInline: 'var(--tbf-grid-margin-sm)',
        }}
        aria-labelledby="editorial-heading"
      >
        {/* Fundo — imagem de capa esmaecida + gradiente para blend com a página */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/editorial-feature.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 35%', opacity: 0.4 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, var(--tbf-bg-primary) 0%, transparent 45%, transparent 58%, var(--tbf-bg-primary) 100%)',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
          }}
        >
          <Image
            src="/brand/TBF-SAO-PAULO.svg"
            alt=".TBF. SÃO PAULO"
            width={237}
            height={126}
            unoptimized
            priority
            style={{ width: 'auto', height: 38, marginBottom: 'var(--tbf-space-5)' }}
          />
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
