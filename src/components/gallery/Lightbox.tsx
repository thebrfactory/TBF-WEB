'use client'

// Lightbox: foto em tela cheia, fundo preto, sem bolinhas e sem circulos.
// Anterior/proxima, swipe, setas do teclado, ESC e clique fora fecham, foco
// preso no modal, scroll do body travado. Reutilizavel: recebe a lista e o
// indice; quem abre e quem fecha e o pai (ver GalleryScope para o uso comum).

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import styles from './Lightbox.module.css'

export interface LightboxItem {
  src: string
  alt: string
  /** dimensoes reais, quando conhecidas; sem elas o navegador usa as naturais */
  w?: number
  h?: number
}

const SWIPE_PX = 50

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
  labels,
}: {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onIndexChange: (i: number) => void
  labels?: { close: string; prev: string; next: string; dialog: string }
}) {
  const L = labels ?? { close: 'Close', prev: 'Previous photo', next: 'Next photo', dialog: 'Photo gallery' }
  const rootRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const [mounted, setMounted] = useState(false)
  const n = items.length

  const go = useCallback(
    (d: number) => {
      if (n > 1) onIndexChange((index + d + n) % n)
    },
    [index, n, onIndexChange],
  )

  useEffect(() => setMounted(true), [])

  // Scroll do body travado, sem o salto da barra de rolagem; foco volta pra
  // quem abriu.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const { overflow, paddingRight } = document.body.style
    const bar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (bar > 0) document.body.style.paddingRight = `${bar}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      opener?.focus?.()
    }
  }, [])

  useEffect(() => {
    if (mounted) closeRef.current?.focus()
  }, [mounted])

  // Teclado: ESC, setas, e Tab preso nos botoes do modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'Tab') {
        const f = rootRef.current?.querySelectorAll<HTMLElement>('button')
        if (!f || f.length === 0) return
        const first = f[0]
        const last = f[f.length - 1]
        const active = document.activeElement
        if (e.shiftKey && (active === first || !rootRef.current?.contains(active))) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && (active === last || !rootRef.current?.contains(active))) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // Pre-carrega vizinhas para a troca nao piscar.
  useEffect(() => {
    if (n < 2) return
    ;[1, -1].forEach((d) => {
      const it = items[(index + d + n) % n]
      const img = new window.Image()
      img.src = `/_next/image?url=${encodeURIComponent(it.src)}&w=1920&q=75`
    })
  }, [index, items, n])

  if (!mounted) return null
  const it = items[index]
  if (!it) return null

  return createPortal(
    <div
      ref={rootRef}
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label={L.dialog}
      onClick={(e) => {
        // Clique no preto fecha; clique na foto ou nos botoes, nao.
        if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.stage) onClose()
      }}
      onTouchStart={(e) => {
        const t = e.touches[0]
        touch.current = { x: t.clientX, y: t.clientY }
      }}
      onTouchEnd={(e) => {
        const s = touch.current
        touch.current = null
        if (!s) return
        const t = e.changedTouches[0]
        const dx = t.clientX - s.x
        const dy = t.clientY - s.y
        if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
        else if (dy > SWIPE_PX * 2 && Math.abs(dy) > Math.abs(dx)) onClose()
      }}
    >
      <div className={styles.stage} data-stage="1">
        <Image
          key={it.src}
          src={it.src}
          alt={it.alt}
          width={it.w ?? 1600}
          height={it.h ?? 1200}
          sizes="100vw"
          quality={75}
          priority
          draggable={false}
          className={styles.img}
        />
      </div>

      <span className={styles.count} aria-live="polite">
        {index + 1} / {n}
      </span>
      <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label={L.close}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </button>
      {n > 1 && (
        <>
          <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => go(-1)} aria-label={L.prev}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 4l-8 8 8 8" />
            </svg>
          </button>
          <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => go(1)} aria-label={L.next}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 4l8 8-8 8" />
            </svg>
          </button>
        </>
      )}
    </div>,
    document.body,
  )
}
