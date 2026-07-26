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
import { HeroVideo } from '@/components/HeroVideo/HeroVideo'
import { Ticker } from '@/components/Ticker/Ticker'

// Vídeo de fundo do hero editorial — mesmo tratamento do hero da home.
const EDITORIAL_VIDEO = {
  desktop: { av1: '/videos/editorial-desktop.av1.mp4', h264: '/videos/editorial-desktop.mp4' },
  mobile: { av1: '/videos/editorial-mobile.av1.mp4', h264: '/videos/editorial-mobile.mp4' },
}

export const metadata: Metadata = {
  title: 'Editorial',
  description:
    'Arquivo editorial da .THE BRAZILIAN FACTORY. Moda, cultura, manifesto e coolhunting de São Paulo para o mundo.',
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
      {/* ─── HERO / SECTION HEADER — vídeo de fundo em loop (igual à home) +
          .TBF. SÃO PAULO ampliado e centralizado como o próprio título ─── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          /* Tela toda, igual ao herói da home (--tbf-hero-height). Em 72vh o
             vídeo, que foi montado no tamanho exato da tela, chegava cortado. */
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
          paddingBottom: 'var(--tbf-space-16)',
          paddingInline: 'var(--tbf-grid-margin-sm)',
        }}
        aria-labelledby="editorial-heading"
      >
        {/* Fundo: só o vídeo em loop, SEM gradiente de sombra (pedido: "fundo
            sem sombras"). Mesma construção do herói de /labels/runwayunited: o
            vídeo vai de ponta a ponta e quem divide as áreas é o letreiro
            (<Ticker />) logo abaixo, não um esmaecido. */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <HeroVideo
            sources={EDITORIAL_VIDEO}
            poster="/images/editorial-feature.webp"
            opacity={0.4}
          />
        </div>

        <h1
          id="editorial-heading"
          style={{
            position: 'relative',
            zIndex: 1,
            margin: 0,
          }}
        >
          <Image
            src="/brand/TBF-SAO-PAULO.svg"
            alt=".TBF. SÃO PAULO · Magazine"
            width={237}
            height={126}
            unoptimized
            priority
            /* -25% sobre min(39vw, 260px) (pedido) + sombra preta discreta para
               dar profundidade sobre o vídeo, agora que não há mais gradiente. */
            style={{
              width: 'min(29.25vw, 195px)',
              height: 'auto',
              filter: 'drop-shadow(0 2px 12px rgba(0, 0, 0, 0.55))',
            }}
          />
        </h1>
      </section>

      {/* ─── TICKER: divisor entre o herói e o grid (pedido) ──────────────── */}
      <Ticker />

      {/* ─── GRID + FILTROS (client component) ────────────────────────────── */}
      <EditorialGrid posts={posts} />
    </>
  )
}
