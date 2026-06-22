'use client'

// =============================================================================
// HERO VIDEO — background do hero da home
// Mobile-first: escolhe o vídeo vertical (mobile) ou horizontal (desktop) via
// matchMedia, carregando UM só (evita baixar os dois). Poster cobre o load.
// 2 sources por vídeo: AV1 (moderno, menor) → H.264 (fallback universal).
// =============================================================================

import { useEffect, useState } from 'react'

const POSTER = '/images/img-01.webp'

const SOURCES = {
  desktop: { av1: '/videos/hero-desktop.av1.mp4', h264: '/videos/hero-desktop.mp4' },
  mobile: { av1: '/videos/hero-mobile.av1.mp4', h264: '/videos/hero-mobile.mp4' },
} as const

type Variant = keyof typeof SOURCES

const MEDIA_BASE = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0.35,
} as const

export function HeroVideo() {
  const [variant, setVariant] = useState<Variant | null>(null)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const apply = () => setVariant(mql.matches ? 'mobile' : 'desktop')
    apply()
    mql.addEventListener('change', apply)
    return () => mql.removeEventListener('change', apply)
  }, [])

  const src = variant ? SOURCES[variant] : null

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      {/* Pré-mount / SSR: poster estático evita flash preto */}
      {!src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={POSTER}
          alt=""
          style={{ ...MEDIA_BASE, objectPosition: 'center 35%' }}
        />
      )}

      {/* Vídeo: só monta com a variante certa → baixa apenas um arquivo */}
      {src && (
        <video
          key={variant}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
          style={{ ...MEDIA_BASE, objectPosition: 'center' }}
        >
          <source src={src.av1} type='video/mp4; codecs="av01.0.05M.08"' />
          <source src={src.h264} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
