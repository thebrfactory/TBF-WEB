'use client'

// Lightbox: pop-up centrado na linguagem do NewsletterPopup (backdrop com blur,
// card com borda e raio, entrada escala+fade, fechar em X fino). Foto inteira
// (contain), contador 03 / 15, setas so com icone, teclado, swipe, zoom
// (duplo toque, pinch, arrastar), miniaturas no desktop, crossfade, pre-carga
// da vizinha, foco preso e scroll do body travado. Reutilizavel: recebe a
// lista e o indice; quem abre e quem fecha e o pai (ver GalleryScope).

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
const MAX_ZOOM = 4
const DOUBLE_ZOOM = 2.5
const DOUBLE_TAP_MS = 300
const EXIT_MS = 220

const pad = (n: number) => String(n).padStart(2, '0')
const optimized = (src: string, w: number) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`

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
  const n = items.length
  const rootRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const [prevIdx, setPrevIdx] = useState<number | null>(null)
  const lastIdx = useRef(index)
  const [zoom, setZoom] = useState({ s: 1, x: 0, y: 0 })
  const zoomRef = useRef(zoom)
  zoomRef.current = zoom

  // Entrada: monta fechado, abre no frame seguinte para a transicao rodar.
  useEffect(() => {
    setMounted(true)
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
    return () => cancelAnimationFrame(id)
  }, [])

  // Saida: anima e so entao avisa o pai.
  const closing = useRef(false)
  const requestClose = useCallback(() => {
    if (closing.current) return
    closing.current = true
    setShown(false)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(onClose, reduced ? 0 : EXIT_MS)
  }, [onClose])

  const go = useCallback(
    (d: number) => {
      if (n > 1) onIndexChange((index + d + n) % n)
    },
    [index, n, onIndexChange],
  )

  // Troca de foto: guarda a anterior para o crossfade e zera o zoom.
  useEffect(() => {
    if (lastIdx.current !== index) {
      setPrevIdx(lastIdx.current)
      lastIdx.current = index
      setZoom({ s: 1, x: 0, y: 0 })
      const t = window.setTimeout(() => setPrevIdx(null), 400)
      return () => window.clearTimeout(t)
    }
  }, [index])

  // Scroll do body travado, sem salto da barra; foco volta a quem abriu.
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
    if (mounted) closeRef.current?.focus({ preventScroll: true })
  }, [mounted])

  // Teclado: ESC, setas, Tab preso no modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        requestClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'Tab') {
        const f = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('button') ?? []).filter(
          (b) => b.offsetParent !== null,
        )
        if (f.length === 0) return
        const first = f[0]
        const last = f[f.length - 1]
        const active = document.activeElement
        const inside = rootRef.current?.contains(active)
        if (e.shiftKey && (active === first || !inside)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && (active === last || !inside)) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [go, requestClose])

  // Pre-carrega vizinhas (mesma URL que o next/image pede).
  useEffect(() => {
    if (n < 2) return
    ;[1, -1].forEach((d) => {
      const it = items[(index + d + n) % n]
      const img = new window.Image()
      img.src = optimized(it.src, 1920)
    })
  }, [index, items, n])

  // Miniatura ativa sempre visivel.
  useEffect(() => {
    const el = thumbsRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [index, mounted])

  // ---- Gestos: swipe, zoom, pinch, arrastar -------------------------------
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const start = useRef<{ x: number; y: number; px: number; py: number; moved: boolean } | null>(null)
  const pinch = useRef<{ d: number; s: number } | null>(null)
  const lastTap = useRef(0)
  const [dragY, setDragY] = useState(0)

  const clamp = (s: number, x: number, y: number) => {
    const box = imgRef.current
    const w = box?.offsetWidth ?? 0
    const h = box?.offsetHeight ?? 0
    const mx = Math.max(0, ((s - 1) * w) / 2)
    const my = Math.max(0, ((s - 1) * h) / 2)
    return { s, x: Math.min(mx, Math.max(-mx, x)), y: Math.min(my, Math.max(-my, y)) }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values())
      pinch.current = { d: Math.hypot(a.x - b.x, a.y - b.y), s: zoomRef.current.s }
      start.current = null
    } else {
      start.current = { x: e.clientX, y: e.clientY, px: zoomRef.current.x, py: zoomRef.current.y, moved: false }
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = Array.from(pointers.current.values())
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      const s = Math.min(MAX_ZOOM, Math.max(1, (pinch.current.s * d) / pinch.current.d))
      const z = zoomRef.current
      setZoom(clamp(s, z.x, z.y))
      return
    }
    const st = start.current
    if (!st) return
    const dx = e.clientX - st.x
    const dy = e.clientY - st.y
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) st.moved = true
    if (zoomRef.current.s > 1) {
      setZoom(clamp(zoomRef.current.s, st.px + dx, st.py + dy))
    } else if (e.pointerType !== 'mouse' && dy > 0 && Math.abs(dy) > Math.abs(dx)) {
      setDragY(dy)
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const had = pointers.current.delete(e.pointerId)
    if (!had) return
    if (pinch.current) {
      if (pointers.current.size < 2) pinch.current = null
      if (zoomRef.current.s < 1.05) setZoom({ s: 1, x: 0, y: 0 })
      start.current = null
      return
    }
    const st = start.current
    start.current = null
    setDragY(0)
    if (!st) return
    const dx = e.clientX - st.x
    const dy = e.clientY - st.y

    if (!st.moved) {
      // Toque: duas vezes seguidas alterna o zoom.
      const now = Date.now()
      if (now - lastTap.current < DOUBLE_TAP_MS) {
        lastTap.current = 0
        setZoom(zoomRef.current.s > 1 ? { s: 1, x: 0, y: 0 } : clamp(DOUBLE_ZOOM, 0, 0))
      } else {
        lastTap.current = now
      }
      return
    }
    if (zoomRef.current.s > 1) return
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
    else if (e.pointerType !== 'mouse' && dy > SWIPE_PX * 2 && Math.abs(dy) > Math.abs(dx)) requestClose()
  }

  if (!mounted) return null
  const it = items[index]
  if (!it) return null
  const prev = prevIdx !== null ? items[prevIdx] : null
  const zoomed = zoom.s > 1

  return createPortal(
    <div
      ref={rootRef}
      className={`${styles.root} ${shown ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={L.dialog}
    >
      <div className={styles.backdrop} onClick={requestClose} aria-hidden="true" />

      <div className={styles.card} style={dragY ? { transform: `translateY(${dragY}px)` } : undefined}>
        <div className={styles.bar}>
          <span className={styles.count} aria-live="polite">
            {pad(index + 1)} / {pad(n)}
          </span>
          <button ref={closeRef} type="button" className={styles.close} onClick={requestClose} aria-label={L.close}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <div
          className={`${styles.stage} ${zoomed ? styles.zoomed : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {prev && (
            <div key={`p-${prevIdx}`} className={`${styles.layer} ${styles.out}`} aria-hidden="true">
              <Image
                src={prev.src}
                alt=""
                width={prev.w ?? 1600}
                height={prev.h ?? 1200}
                sizes="(min-width: 768px) 1000px, 100vw"
                quality={75}
                draggable={false}
                className={styles.img}
              />
            </div>
          )}
          <div key={`c-${index}`} className={`${styles.layer} ${prev ? styles.in : ''}`}>
            <div
              ref={imgRef}
              className={styles.zoomBox}
              style={{
                transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.s})`,
                transition: pointers.current.size ? 'none' : undefined,
              }}
            >
              <Image
                src={it.src}
                alt={it.alt}
                width={it.w ?? 1600}
                height={it.h ?? 1200}
                sizes="(min-width: 768px) 1000px, 100vw"
                quality={75}
                priority
                draggable={false}
                className={styles.img}
              />
            </div>
          </div>

          {n > 1 && (
            <>
              <button
                type="button"
                className={`${styles.nav} ${styles.prev}`}
                onClick={() => go(-1)}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label={L.prev}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 4l-8 8 8 8" />
                </svg>
              </button>
              <button
                type="button"
                className={`${styles.nav} ${styles.next}`}
                onClick={() => go(1)}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label={L.next}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 4l8 8-8 8" />
                </svg>
              </button>
            </>
          )}
        </div>

        {it.alt && <p className={styles.caption}>{it.alt}</p>}

        {n > 1 && (
          <div ref={thumbsRef} className={styles.thumbs}>
            {items.map((t, i) => (
              <button
                key={t.src}
                type="button"
                className={styles.thumb}
                data-active={i === index}
                onClick={() => onIndexChange(i)}
                aria-label={`${pad(i + 1)} / ${pad(n)}`}
                aria-current={i === index}
                tabIndex={-1}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={optimized(t.src, 128)} alt="" loading="lazy" draggable={false} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
