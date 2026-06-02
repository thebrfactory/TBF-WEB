'use client'

// =============================================================================
// VIDEO EMBED — TBF WEB 2026
// Cloudflare Stream apenas — NUNCA YouTube
// Lazy load via IntersectionObserver
// ARIA: role="button", aria-label com título
// =============================================================================

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { SanityImage } from '@/types'

interface VideoEmbedProps {
  cloudflareStreamId: string
  thumbnail: SanityImage
  title: string
}

export function VideoEmbed({ cloudflareStreamId, thumbnail, title }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false)
  const [inView, setInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Lazy load via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handlePlay = () => {
    if (inView) setPlaying(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePlay()
    }
  }

  return (
    <div
      ref={containerRef}
      className={`video-embed ${playing ? 'video-embed--playing' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={`Assistir: ${title}`}
      onClick={handlePlay}
      onKeyDown={handleKeyDown}
    >
      {!playing && (
        <>
          <Image
            className="video-embed__thumbnail"
            src={urlFor(thumbnail).width(1280).auto('format').url()}
            alt={thumbnail.alt ?? `Thumbnail: ${title}`}
            fill
            sizes="(min-width: 1280px) 80vw, 100vw"
            style={{ objectFit: 'cover', borderRadius: 0 }}
          />
          <div className="video-embed__overlay" aria-hidden="true">
            <svg
              className="video-embed__play"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="32" cy="32" r="30" />
              <polygon fill="currentColor" stroke="none" points="26,20 48,32 26,44" />
            </svg>
          </div>
        </>
      )}

      {playing && (
        <iframe
          className="video-embed__iframe"
          src={`https://iframe.videodelivery.net/${cloudflareStreamId}?autoplay=1&muted=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  )
}
