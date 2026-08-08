'use client'

// =============================================================================
// HERO VIDEO — background do hero da home
// Mobile-first: escolhe o vídeo vertical (mobile) ou horizontal (desktop) via
// matchMedia, carregando UM só (evita baixar os dois). Poster cobre o load.
// 2 sources por vídeo: AV1 (moderno, menor) → H.264 (fallback universal).
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { useHeroAdvance } from '@/hooks/useHeroAdvance'

type SourcePair = { av1: string; h264: string }
type SourceSet = { desktop: SourcePair; mobile: SourcePair }
type Variant = keyof SourceSet

const HERO_POSTER = '/images/img-01.webp'

const HERO_SOURCES: SourceSet = {
  desktop: { av1: '/videos/hero-desktop.av1.mp4', h264: '/videos/hero-desktop.mp4' },
  mobile: { av1: '/videos/hero-mobile.av1.mp4', h264: '/videos/hero-mobile.mp4' },
}

interface HeroVideoProps {
  /** Par de vídeos (desktop/mobile). Default = vídeo do hero da home. */
  sources?: SourceSet
  /** Poster estático (evita flash preto no load). */
  poster?: string
  /** Opacidade do vídeo (0–1). Default 0.35 — igual à imagem original. */
  opacity?: number
  /**
   * Um gesto (deslize de dedo, roda/trackpad, ou toque) atravessa o hero e leva
   * ao conteúdo seguinte. Ligado por padrão: é o comportamento pedido para toda
   * página com vídeo de fundo. Os decks (/pitch e /pitch/v2) desligam — lá a
   * navegação já é por setas e encaixe de movimento, e as duas brigariam.
   */
  advance?: boolean
}

// Reaproveitado no hero da home, no /editorial e no /pitch. Mesmo tratamento:
// escolhe o vídeo vertical/horizontal via matchMedia (baixa UM só) + recuperação
// de autoplay bloqueado, e roda em loop mudo.
export function HeroVideo({
  sources = HERO_SOURCES,
  poster = HERO_POSTER,
  opacity = 0.35,
  advance = true,
}: HeroVideoProps = {}) {
  const [variant, setVariant] = useState<Variant | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Um gesto atravessa o hero. O hook sobe deste nó até a seção do hero, então
  // ele funciona igual nas duas montagens que existem no site: o vídeo solto
  // dentro da section (home, labels, consulting) e o vídeo dentro de uma div de
  // fundo (/editorial).
  useHeroAdvance(wrapRef, advance)

  const MEDIA_BASE = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity,
  } as const

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const apply = () => setVariant(mql.matches ? 'mobile' : 'desktop')
    apply()
    mql.addEventListener('change', apply)
    return () => mql.removeEventListener('change', apply)
  }, [])

  // Recuperação de autoplay. Navegadores móveis bloqueiam o autoplay em alguns
  // cenários (iOS em Modo de Baixo Consumo, data saver, certas versões de
  // Android) e mostram o play button nativo. Não dá pra burlar o bloqueio do SO,
  // mas dá pra retomar no primeiro gesto do usuário (toque/scroll/clique) e
  // quando a aba volta a ficar visível: o vídeo dispara no instante em que a
  // pessoa interage, e o play some. Cobre TODOS os casos de autoplay bloqueado.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    function cleanup() {
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('touchstart', onGesture)
      window.removeEventListener('scroll', onGesture)
      document.removeEventListener('visibilitychange', onVisible)
    }
    const tryPlay = () => {
      const p = v.play()
      if (p && typeof p.then === 'function') p.then(cleanup).catch(() => {})
    }
    const onGesture = () => tryPlay()
    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay()
    }

    tryPlay() // tentativa imediata: cobre os casos em que autoplay é permitido
    window.addEventListener('pointerdown', onGesture, { passive: true })
    window.addEventListener('touchstart', onGesture, { passive: true })
    window.addEventListener('scroll', onGesture, { passive: true })
    document.addEventListener('visibilitychange', onVisible)

    return cleanup
  }, [variant])

  const src = variant ? sources[variant] : null

  return (
    <div ref={wrapRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      {/* Pré-mount / SSR: poster estático evita flash preto */}
      {!src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          style={{ ...MEDIA_BASE, objectPosition: 'center 35%' }}
        />
      )}

      {/* Vídeo: só monta com a variante certa → baixa apenas um arquivo */}
      {src && (
        <video
          key={variant}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          style={{ ...MEDIA_BASE, objectPosition: 'center' }}
        >
          <source src={src.av1} type='video/mp4; codecs="av01.0.05M.08"' />
          <source src={src.h264} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
