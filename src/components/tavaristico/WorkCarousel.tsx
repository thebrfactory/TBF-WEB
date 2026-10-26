'use client'

// =============================================================================
// WORK CAROUSEL: esteira horizontal com swipe nativo (scroll-snap), setas e
// contador. Itens: imagem ou video (loop mudo, toca so na tela). Cada item
// reserva a propria proporcao (aspect-ratio + width/height): zero CLS.
// Mobile-first: altura em vw no celular, em px de 768px para cima.
// Pecas entram como vieram do arquivo: sem texto montado por codigo.
// Rodada 23/10/2026; faixa que sangra e legenda em 26/10/2026.
// =============================================================================

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLang } from '@/lib/LangProvider'
import { tavaristico } from '@/content/i18n/pages/tavaristico'
import styles from './WorkCarousel.module.css'

export interface CarouselItem {
  src: string
  alt: string
  /** dimensoes reais do arquivo (a proporcao do item) */
  w: number
  h: number
  /** se houver, o item e video (src = mp4) e `poster` e a imagem de capa */
  poster?: string
  /** legenda curta fora da imagem (nunca sobre ela) */
  caption?: string
  /** video com som: toca mudo por padrao, botao de som na mao de quem ve (sem autoplay com som) */
  sound?: boolean
}

function Slide({ item, index }: { item: CarouselItem; index: number }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const lang = useLang()
  const t = tavaristico[lang].work

  const toggleSound = () => {
    const v = ref.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    if (!v.muted) v.play().catch(() => {})
  }

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      v.controls = true
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.6 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  if (item.poster) {
    return (
      <>
      <video
        ref={ref}
        className={styles.media}
        src={item.src}
        poster={item.poster}
        width={item.w}
        height={item.h}
        muted
        loop
        playsInline
        preload="none"
        aria-label={item.alt}
      />
      {item.sound ? (
        <button
          type="button"
          className={styles.sound}
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? t.soundOn : t.soundOff}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
            {muted ? (
              <path d="M16 9.5l5 5M21 9.5l-5 5" />
            ) : (
              <path d="M16 9a4.5 4.5 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" />
            )}
          </svg>
        </button>
      ) : null}
      </>
    )
  }
  return (
    <Image
      className={styles.media}
      src={item.src}
      alt={item.alt}
      width={item.w}
      height={item.h}
      sizes="(min-width: 1024px) 40vw, 90vw"
      quality={92}
      loading={index < 2 ? 'eager' : 'lazy'}
      unoptimized={item.src.endsWith('.gif')}
    />
  )
}

export function WorkCarousel({
  items,
  label,
  variant,
  prevLabel,
  nextLabel,
}: {
  items: CarouselItem[]
  label?: string
  /** tall: pecas verticais; wide: paisagem e quadradas */
  variant: 'tall' | 'wide'
  prevLabel: string
  nextLabel: string
}) {
  const track = useRef<HTMLUListElement>(null)
  const section = useRef<HTMLElement>(null)
  const [pos, setPos] = useState(0)
  const raf = useRef(0)

  const onScroll = useCallback(() => {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const el = track.current
      if (!el) return
      const kids = Array.from(el.children) as HTMLElement[]
      const left = el.scrollLeft + 4
      let cur = 0
      kids.forEach((k, i) => {
        if (k.offsetLeft - el.offsetLeft <= left) cur = i
      })
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) cur = kids.length - 1
      setPos(cur)
    })
  }, [])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  // A faixa sangra ate a borda da tela (CSS); o snap precisa saber o recuo da coluna.
  useEffect(() => {
    const sec = section.current
    const el = track.current
    if (!sec || !el) return
    const set = () => {
      const px = Math.max(0, (document.documentElement.clientWidth - sec.clientWidth) / 2)
      el.style.setProperty('--bleed', `${px}px`)
    }
    set()
    const ro = new ResizeObserver(set)
    ro.observe(sec)
    return () => ro.disconnect()
  }, [])

  const go = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' })
  }

  const n = String(items.length).padStart(2, '0')

  return (
    <section ref={section} className={styles.section} aria-label={label}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <ul
        ref={track}
        className={`${styles.track} ${variant === 'tall' ? styles.tall : styles.wide}`}
        onScroll={onScroll}
        tabIndex={0}
      >
        {items.map((it, i) => (
          <li key={it.src} className={styles.slide}>
            <span className={styles.frame} style={{ aspectRatio: `${it.w} / ${it.h}` }}>
              <Slide item={it} index={i} />
            </span>
            {it.caption ? <span className={styles.caption}>{it.caption}</span> : null}
          </li>
        ))}
      </ul>
      <div className={styles.controls}>
        <span className={styles.count} aria-live="off">
          {String(pos + 1).padStart(2, '0')} / {n}
        </span>
        <span className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label={prevLabel}>
            &larr;
          </button>
          <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label={nextLabel}>
            &rarr;
          </button>
        </span>
      </div>
    </section>
  )
}
