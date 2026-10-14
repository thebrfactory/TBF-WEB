'use client'

// Lightbox: tela cheia, fundo preto puro, sem caixa nem borda. Foto inteira
// (contain), raio 3px, contador e fechar sobrepostos no topo, legenda embaixo,
// setas so com icone, teclado, swipe, zoom (clique no desktop, duplo toque no
// celular, pinch, arrastar), miniaturas no desktop. Desempenho: gestos mexem no
// DOM por ref (zero setState por pointermove), troca so por transform/opacity,
// srcset por dispositivo (nunca 1920 para um celular), vizinhas pre-carregadas
// com a MESMA url que o <img> usa, depois que a atual carregou. Reutilizavel:
// recebe a lista e o indice; quem abre e quem fecha e o pai (ver GalleryScope).

import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
const DOUBLE_ZOOM = 2
const DOUBLE_TAP_MS = 300
const EXIT_MS = 220

const pad = (n: number) => String(n).padStart(2, '0')
const optimized = (src: string, w: number) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`
// Mesmos larguras do next.config (deviceSizes): so estas o otimizador aceita.
const WIDTHS = [390, 768, 1024, 1280, 1920]
const srcSet = (src: string) => WIDTHS.map((w) => `${optimized(src, w)} ${w}w`).join(', ')
const SIZES = '100vw'

// Miniaturas: memo para nao redesenhar a lista a cada slide.
const Thumbs = memo(function Thumbs({
  items,
  index,
  onPick,
  thumbsRef,
}: {
  items: LightboxItem[]
  index: number
  onPick: (i: number) => void
  thumbsRef: React.RefObject<HTMLDivElement | null>
}) {
  const n = items.length
  return (
    <div ref={thumbsRef} className={styles.thumbs}>
      {items.map((t, i) => (
        <button
          key={t.src}
          type="button"
          className={styles.thumb}
          data-active={i === index}
          onClick={() => onPick(i)}
          aria-label={`${pad(i + 1)} / ${pad(n)}`}
          aria-current={i === index}
          tabIndex={-1}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={optimized(t.src, 128)} alt="" loading="lazy" decoding="async" draggable={false} />
        </button>
      ))}
    </div>
  )
})

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
  const thumbsRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement | null>(null)
  const imgEl = useRef<HTMLImageElement | null>(null)

  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const [prevIdx, setPrevIdx] = useState<number | null>(null)
  const [ready, setReady] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const lastIdx = useRef(index)
  const dir = useRef(1)
  // Zoom vive em ref: pointermove escreve no DOM direto, sem re-render.
  const zoom = useRef({ s: 1, x: 0, y: 0 })

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

  const pick = useCallback(
    (i: number) => {
      if (i === index) return
      dir.current = i > index ? 1 : -1
      onIndexChange(i)
    },
    [index, onIndexChange],
  )

  const go = useCallback(
    (d: number) => {
      if (n < 2) return
      dir.current = d
      onIndexChange((index + d + n) % n)
    },
    [index, n, onIndexChange],
  )

  // Aplica o zoom direto no DOM. `animate` so no duplo toque/clique (transicao CSS).
  const apply = useCallback((animate: boolean) => {
    const box = boxRef.current
    if (!box) return
    const z = zoom.current
    box.style.transition = animate ? '' : 'none'
    box.style.transform = z.s === 1 && z.x === 0 && z.y === 0 ? '' : `translate3d(${z.x}px, ${z.y}px, 0) scale(${z.s})`
    setZoomed((p) => (p === z.s > 1 ? p : z.s > 1))
  }, [])

  // Troca de foto: guarda a anterior para a transicao (ate a nova carregar) e zera o zoom.
  useEffect(() => {
    if (lastIdx.current !== index) {
      setPrevIdx(lastIdx.current)
      lastIdx.current = index
      setReady(false)
      zoom.current = { s: 1, x: 0, y: 0 }
      setZoomed(false)
    }
  }, [index])

  // Anterior sai so depois que a nova ficou visivel.
  useEffect(() => {
    if (!ready || prevIdx === null) return
    const t = window.setTimeout(() => setPrevIdx(null), 260)
    return () => window.clearTimeout(t)
  }, [ready, prevIdx])

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

  // Pre-carga: so DEPOIS que a atual ficou pronta (nao disputa banda com ela),
  // proxima primeiro, depois anterior. Mesmo srcset e sizes do <img>, entao o
  // navegador escolhe o mesmo arquivo e a troca sai do cache.
  const preloaded = useRef(new Map<string, HTMLImageElement>())
  useEffect(() => {
    if (n < 2 || !ready) return
    const order = [1, -1, 2]
    order.forEach((d) => {
      const it = items[(((index + d) % n) + n) % n]
      if (!it || preloaded.current.has(it.src)) return
      const img = new window.Image()
      img.decoding = 'async'
      img.sizes = SIZES
      img.srcset = srcSet(it.src)
      img.src = optimized(it.src, 1280)
      preloaded.current.set(it.src, img)
      img.decode?.().catch(() => {})
    })
  }, [index, items, n, ready])

  // Miniatura ativa sempre visivel.
  useEffect(() => {
    const el = thumbsRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [index, mounted])

  // ---- Gestos: swipe, zoom, pinch, arrastar (tudo por ref, sem setState) -----
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const start = useRef<{ x: number; y: number; px: number; py: number; moved: boolean } | null>(null)
  const pinch = useRef<{ d: number; s: number } | null>(null)
  const lastTap = useRef(0)

  // Arrasto vertical para fechar: a foto acompanha o dedo, o fundo some junto.
  const setDrag = (dy: number) => {
    const root = rootRef.current
    const st = stageRef.current
    if (!root || !st) return
    st.style.transition = dy ? 'none' : ''
    st.style.transform = dy ? `translate3d(0, ${dy}px, 0)` : ''
    root.style.setProperty('--lb-fade', dy ? String(Math.max(0.25, 1 - dy / 500)) : '')
  }

  // Limite do arrasto: usa o tamanho real da foto desenhada (contain), nao o do palco.
  const clamp = (s: number, x: number, y: number) => {
    const st = stageRef.current
    const W = st?.clientWidth ?? 0
    const H = st?.clientHeight ?? 0
    const im = imgEl.current
    const nw = im?.naturalWidth || W
    const nh = im?.naturalHeight || H
    const fit = nw && nh ? Math.min(W / nw, H / nh) : 1
    const dw = nw * fit
    const dh = nh * fit
    const mx = Math.max(0, (dw * s - W) / 2)
    const my = Math.max(0, (dh * s - H) / 2)
    return { s, x: Math.min(mx, Math.max(-mx, x)), y: Math.min(my, Math.max(-my, y)) }
  }

  // Zoom centrado no ponto (cx, cy) em px do palco: o ponto fica sob o dedo/cursor.
  const zoomAt = (cx: number, cy: number) => {
    if (zoom.current.s > 1) {
      zoom.current = { s: 1, x: 0, y: 0 }
      apply(true)
      return
    }
    const st = stageRef.current
    if (!st) return
    const px = cx - st.clientWidth / 2
    const py = cy - st.clientHeight / 2
    zoom.current = clamp(DOUBLE_ZOOM, px * (1 - DOUBLE_ZOOM), py * (1 - DOUBLE_ZOOM))
    apply(true)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values())
      pinch.current = { d: Math.hypot(a.x - b.x, a.y - b.y), s: zoom.current.s }
      start.current = null
    } else {
      start.current = { x: e.clientX, y: e.clientY, px: zoom.current.x, py: zoom.current.y, moved: false }
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = Array.from(pointers.current.values())
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      const s = Math.min(MAX_ZOOM, Math.max(1, (pinch.current.s * d) / pinch.current.d))
      zoom.current = clamp(s, zoom.current.x, zoom.current.y)
      apply(false)
      return
    }
    const st = start.current
    if (!st) return
    const dx = e.clientX - st.x
    const dy = e.clientY - st.y
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) st.moved = true
    if (zoom.current.s > 1) {
      if (st.moved) {
        zoom.current = clamp(zoom.current.s, st.px + dx, st.py + dy)
        apply(false)
      }
    } else if (e.pointerType !== 'mouse' && dy > 0 && Math.abs(dy) > Math.abs(dx)) {
      setDrag(dy)
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const had = pointers.current.delete(e.pointerId)
    if (!had) return
    if (pinch.current) {
      if (pointers.current.size < 2) pinch.current = null
      if (zoom.current.s < 1.05) {
        zoom.current = { s: 1, x: 0, y: 0 }
        apply(true)
      }
      start.current = null
      return
    }
    const st = start.current
    start.current = null
    setDrag(0)
    if (!st) return
    const dx = e.clientX - st.x
    const dy = e.clientY - st.y

    if (!st.moved) {
      const rect = stageRef.current?.getBoundingClientRect()
      const cx = e.clientX - (rect?.left ?? 0)
      const cy = e.clientY - (rect?.top ?? 0)
      if (e.pointerType === 'mouse') {
        // Mouse: um clique alterna o zoom no ponto clicado.
        zoomAt(cx, cy)
      } else {
        // Toque: duas vezes seguidas alterna o zoom.
        const now = Date.now()
        if (now - lastTap.current < DOUBLE_TAP_MS) {
          lastTap.current = 0
          zoomAt(cx, cy)
        } else {
          lastTap.current = now
        }
      }
      return
    }
    if (zoom.current.s > 1) return
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
    else if (e.pointerType !== 'mouse' && dy > SWIPE_PX * 2 && Math.abs(dy) > Math.abs(dx)) requestClose()
  }

  if (!mounted) return null
  const it = items[index]
  if (!it) return null
  const prev = prevIdx !== null ? items[prevIdx] : null
  const sized = it.w && it.h ? { width: it.w, height: it.h } : {}

  return createPortal(
    <div
      ref={rootRef}
      className={`${styles.root} ${shown ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={L.dialog}
    >
      <div
        ref={stageRef}
        className={`${styles.stage} ${zoomed ? styles.zoomed : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {prev && (
          <div key={`p-${prevIdx}`} className={`${styles.layer} ${styles.out}`} aria-hidden="true">
            <div className={styles.zoomBox}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={optimized(prev.src, 1280)}
                srcSet={srcSet(prev.src)}
                sizes={SIZES}
                alt=""
                decoding="async"
                draggable={false}
                className={styles.img}
              />
            </div>
          </div>
        )}
        <div
          key={`c-${index}`}
          className={`${styles.layer} ${ready ? styles.in : styles.wait}`}
          data-dir={dir.current > 0 ? 'next' : 'prev'}
        >
          <div ref={boxRef} className={styles.zoomBox}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={(el) => {
                imgEl.current = el
                if (el && el.complete && el.naturalWidth) setReady(true)
              }}
              src={optimized(it.src, 1280)}
              srcSet={srcSet(it.src)}
              sizes={SIZES}
              alt={it.alt}
              {...sized}
              decoding="async"
              fetchPriority="high"
              draggable={false}
              onLoad={() => setReady(true)}
              onError={() => setReady(true)}
              className={styles.img}
            />
          </div>
        </div>
      </div>

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

      {(it.alt || n > 1) && (
        <div className={styles.foot}>
          {it.alt && !zoomed && <p className={styles.caption}>{it.alt}</p>}
          {n > 1 && <Thumbs items={items} index={index} onPick={pick} thumbsRef={thumbsRef} />}
        </div>
      )}
    </div>,
    document.body,
  )
}
