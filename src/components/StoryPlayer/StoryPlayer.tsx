'use client'

// Layout padrão de stories da .TBF.: todo material em formato story usa este componente.
// Réplica do instagram.com/stories: quadro 9:16, barras segmentadas, linha do autor, toque
// esquerda/direita, segurar pausa, arrastar para baixo fecha (mobile), setas e vizinhos (desktop).
// Props: groups (StoryGroup[]: id, handle, avatarSrc?, timeLabel?, items), startGroup (0),
//   variant 'modal' (tela cheia/portal, padrão) | 'inline' (story ao lado do texto),
//   thumbs (só inline: miniaturas abaixo do quadro), ms (tempo da foto, 5000), lang 'pt'|'en',
//   label (nome acessível), onClose (modal: o X, Esc e arrastar para baixo).
// StoryItem: src (foto ou poster), alt, role, video {av1,h264,hasAudio?}, ms, overlay {title,kicker?}
//   (legenda opcional no rodapé), cta {label,href} (link sticker).
// Peça não 9:16 vira contain sobre a própria imagem desfocada: nunca corta conteúdo.
// LOOP por padrão (fundador): o último quadro volta ao primeiro, barras zeradas, e tocar à direita
//   no último também volta ao primeiro; nunca fecha sozinho. Vale para modal e inline.
// Cromo e CSS moram só aqui. Página não passa className ao player; o guard é `npm run check:stories`.

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import styles from './StoryPlayer.module.css'

export interface StoryItem {
  src: string
  alt: string
  /** O que a peça prova. Vira `title` da miniatura e rótulo de leitor de tela. */
  role: string
  /**
   * Legenda opcional do quadro, no rodapé sobre gradiente (exceção aberta pelo
   * fundador em 10/09/2026). Quadro sem `overlay` fica liso. Peça de campanha
   * com texto gravado no arquivo nunca leva overlay.
   */
  overlay?: { title: string; kicker?: string }
  /** Link sticker no rodapé do quadro. */
  cta?: { label: string; href: string }
  /**
   * Quadro em movimento. `src` vira poster e miniatura. `hasAudio` liga o botão
   * de som no cabeçalho; sem ele o vídeo é mudo e o botão não aparece.
   */
  video?: { av1: string; h264: string; hasAudio?: boolean }
  /** Tempo do quadro em ms (foto). Vídeo usa a duração real. Sem ele, vale `ms`. */
  ms?: number
}

export interface StoryGroup {
  id: string
  /** Nome ao lado do avatar. */
  handle: string
  avatarSrc?: string
  /** Tempo relativo ("2 sem") ou data curta. Só entra quando o dado existe. */
  timeLabel?: string
  items: StoryItem[]
}

export interface StoryPlayerProps {
  groups: StoryGroup[]
  startGroup?: number
  variant?: 'modal' | 'inline'
  /** Só `inline`: fileira de miniaturas abaixo do quadro. */
  thumbs?: boolean
  /** Tempo de cada foto, em ms. */
  ms?: number
  lang?: 'pt' | 'en'
  label: string
  /** Obrigatório no `modal`. */
  onClose?: () => void
}

const LABELS = {
  pt: {
    close: 'Fechar',
    prev: 'Anterior',
    next: 'Próximo',
    pause: 'Pausar',
    play: 'Tocar',
    mute: 'Silenciar',
    unmute: 'Ativar som',
    piece: 'Peça',
  },
  en: {
    close: 'Close',
    prev: 'Previous',
    next: 'Next',
    pause: 'Pause',
    play: 'Play',
    mute: 'Mute',
    unmute: 'Unmute',
    piece: 'Piece',
  },
} as const

const HOLD_MS = 180
const CLOSE_DRAG = 110
// Tolerância para considerar a peça 9:16 (0,5625).
const RATIO_TOLERANCE = 0.04

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

function Icon({ d, fill }: { d: string; fill?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={styles.icon}>
      <path
        d={d}
        fill={fill ? 'currentColor' : 'none'}
        stroke={fill ? 'none' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const D_PAUSE = 'M7 5h3v14H7zM14 5h3v14h-3z'
const D_PLAY = 'M8 5v14l11-7z'
const D_SOUND = 'M4 9v6h4l5 4V5L8 9H4zM16.5 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11'
const D_MUTED = 'M4 9v6h4l5 4V5L8 9H4zM17 9.5l5 5M22 9.5l-5 5'
const D_CLOSE = 'M6 6l12 12M18 6L6 18'
const D_LEFT = 'M15 5l-7 7 7 7'
const D_RIGHT = 'M9 5l7 7-7 7'

// ─── Mídia de um quadro ──────────────────────────────────────────────────────
function StoryMedia({
  item,
  active,
  paused,
  muted,
  contain,
  sizes,
  priority,
  onFit,
  onVideoRef,
}: {
  item: StoryItem
  active: boolean
  paused: boolean
  muted: boolean
  contain: boolean
  sizes: string
  priority: boolean
  onFit: (src: string, w: number, h: number) => void
  onVideoRef: (el: HTMLVideoElement | null) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasVideo = !!item.video

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = muted
    if (active && !paused) void v.play().catch(() => {})
    else v.pause()
  }, [active, paused, muted])

  useEffect(() => {
    if (!hasVideo || !active) return
    const v = videoRef.current
    if (v) v.currentTime = 0
    onVideoRef(v)
    return () => onVideoRef(null)
  }, [active, hasVideo, onVideoRef])

  const layer = `${styles.media}${active ? ` ${styles.mediaOn}` : ''}${contain ? ` ${styles.mediaContain}` : ''}`

  return (
    <>
      {contain ? (
        <Image
          src={item.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="120px"
          className={`${styles.mediaBlur}${active ? ` ${styles.mediaOn}` : ''}`}
        />
      ) : null}
      {item.video ? (
        <video
          ref={videoRef}
          poster={item.src}
          muted
          playsInline
          preload={active ? 'auto' : 'metadata'}
          aria-label={item.alt}
          className={layer}
          onLoadedMetadata={(e) => onFit(item.src, e.currentTarget.videoWidth, e.currentTarget.videoHeight)}
        >
          <source src={item.video.av1} type="video/mp4; codecs=av01.0.05M.08" />
          <source src={item.video.h264} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={item.src}
          alt={active ? item.alt : ''}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'eager'}
          className={layer}
          onLoad={(e) => onFit(item.src, e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)}
        />
      )}
    </>
  )
}

// ─── O player ────────────────────────────────────────────────────────────────
export function StoryPlayer({
  groups,
  startGroup = 0,
  variant = 'modal',
  thumbs = false,
  ms = 5000,
  lang = 'pt',
  label,
  onClose,
}: StoryPlayerProps) {
  const t = LABELS[lang]
  const modal = variant === 'modal'
  const reduced = useReducedMotion()

  const [gi, setGi] = useState(Math.min(Math.max(startGroup, 0), groups.length - 1))
  const [i, setI] = useState(0)
  // Muda ao voltar para o 1º quadro: reinicia o relógio do mesmo quadro.
  const [restart, setRestart] = useState(0)
  const [held, setHeld] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [muted, setMuted] = useState(true)
  const [inView, setInView] = useState(true)
  const [fit, setFit] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(!modal)

  const group = groups[gi]
  const items = group.items
  const item = items[i]
  const upcoming = i < items.length - 1 ? items[i + 1] : items[0]
  const paused = held || userPaused || reduced || (!modal && !inView)

  const rootRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const elapsed = useRef(0)
  const waited = useRef(0)
  const ready = useRef(false)
  const setVideo = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el
  }, [])

  const onFit = useCallback((src: string, w: number, h: number) => {
    if (!w || !h) return
    const isContain = Math.abs(w / h - 9 / 16) > RATIO_TOLERANCE
    setFit((f) => (f[src] === isContain ? f : { ...f, [src]: isContain }))
    ready.current = true
  }, [])

  // ─── Navegação ─────────────────────────────────────────────────────────────
  const next = useCallback(() => {
    if (i < items.length - 1) setI(i + 1)
    else {
      // Loop: volta ao primeiro quadro do mesmo story.
      setI(0)
      setRestart((r) => r + 1)
    }
  }, [i, items.length])

  const prev = useCallback(() => {
    if (i > 0) setI(i - 1)
    else setRestart((r) => r + 1)
  }, [i])

  const goGroup = useCallback((g: number) => {
    setGi(g)
    setI(0)
  }, [])

  // ─── Barras: estado de cada segmento ao trocar de quadro ───────────────────
  useLayoutEffect(() => {
    elapsed.current = 0
    waited.current = 0
    ready.current = false
    const bars = barsRef.current
    if (!bars) return
    Array.from(bars.children).forEach((bar, idx) => {
      const fill = bar.firstElementChild as HTMLElement | null
      if (!fill) return
      const done = idx < i || (idx === i && reduced)
      fill.style.transform = `scaleX(${done ? 1 : 0})`
    })
  }, [gi, i, restart, reduced])

  // Loop ou volta ao 1º quadro: vídeo que já terminou recomeça.
  useEffect(() => {
    const v = videoRef.current
    if (restart > 0 && v) {
      v.currentTime = 0
      if (!paused) void v.play().catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart])

  // ─── Relógio: foto usa o tempo do quadro, vídeo usa a duração real ─────────
  useEffect(() => {
    if (paused) return
    const photoMs = item.ms ?? ms
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100)
      last = now
      const fill = barsRef.current?.children[i]?.firstElementChild as HTMLElement | undefined
      const vid = videoRef.current
      let p: number
      if (item.video && vid && Number.isFinite(vid.duration) && vid.duration > 0) {
        p = vid.ended ? 1 : vid.currentTime / vid.duration
      } else {
        // Foto só corre depois de carregar; se a rede travar, larga em 2,5s.
        waited.current += dt
        if (ready.current || waited.current > 2500) elapsed.current += dt
        p = elapsed.current / photoMs
      }
      if (fill) fill.style.transform = `scaleX(${Math.min(p, 1)})`
      if (p >= 1) {
        next()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [paused, gi, i, restart, item, ms, next])

  // Inline: só toca enquanto estiver na tela.
  useEffect(() => {
    if (modal) return
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [modal])

  // ─── Modal: portal, scroll, foco, teclado ──────────────────────────────────
  useEffect(() => {
    if (!modal) return
    setMounted(true)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [modal])

  useEffect(() => {
    if (!modal || !mounted) return
    dialogRef.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose?.()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === ' ' && !(e.target instanceof HTMLButtonElement)) {
        e.preventDefault()
        setUserPaused((p) => !p)
      } else if (e.key === 'Tab') {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href]')
        if (!nodes || nodes.length === 0) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modal, mounted, next, prev, onClose])

  function onInlineKey(e: ReactKeyboardEvent) {
    if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') prev()
  }

  // ─── Gesto: toque, segurar, arrastar para baixo ────────────────────────────
  const g = useRef({ id: -1, x: 0, y: 0, moved: false, held: false, drag: 0, timer: 0 })
  const resetDrag = useCallback(() => {
    const s = stageRef.current
    if (s) {
      s.style.transform = ''
      s.style.opacity = ''
    }
    g.current.drag = 0
  }, [])

  function onDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const s = g.current
    s.id = e.pointerId
    s.x = e.clientX
    s.y = e.clientY
    s.moved = false
    s.held = false
    s.drag = 0
    e.currentTarget.setPointerCapture(e.pointerId)
    window.clearTimeout(s.timer)
    s.timer = window.setTimeout(() => {
      if (s.moved) return
      s.held = true
      setHeld(true)
    }, HOLD_MS)
  }

  function onMove(e: ReactPointerEvent<HTMLDivElement>) {
    const s = g.current
    if (s.id !== e.pointerId) return
    const dx = e.clientX - s.x
    const dy = e.clientY - s.y
    if (!s.moved && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
      s.moved = true
      window.clearTimeout(s.timer)
    }
    if (modal && s.moved && dy > 0 && Math.abs(dy) > Math.abs(dx)) {
      s.drag = dy
      const st = stageRef.current
      if (st && !reduced) {
        st.style.transform = `translateY(${dy}px) scale(${1 - Math.min(dy / 1200, 0.1)})`
        st.style.opacity = String(1 - Math.min(dy / 500, 0.6))
      }
    }
  }

  function onUp(e: ReactPointerEvent<HTMLDivElement>) {
    const s = g.current
    if (s.id !== e.pointerId) return
    s.id = -1
    window.clearTimeout(s.timer)
    if (s.held) {
      setHeld(false)
    } else if (!s.moved) {
      const rect = frameRef.current?.getBoundingClientRect()
      if (rect && e.clientX - rect.left < rect.width / 2) prev()
      else next()
    } else if (modal && s.drag > CLOSE_DRAG) {
      onClose?.()
      return
    }
    resetDrag()
  }

  function onCancel() {
    const s = g.current
    s.id = -1
    window.clearTimeout(s.timer)
    setHeld(false)
    resetDrag()
  }

  useEffect(() => () => window.clearTimeout(g.current.timer), [])

  // ─── Render ────────────────────────────────────────────────────────────────
  const hasSound = !!item.video?.hasAudio
  const sizes = modal ? '(max-width: 767px) 100vw, 480px' : '(max-width: 767px) 60vw, 26vw'
  const hasPrev = i > 0
  const hasNext = true

  const frame = (
    <div
      ref={frameRef}
      className={styles.frame}
      role="group"
      aria-roledescription="story"
      aria-label={`${group.handle}: ${i + 1} / ${items.length}`}
      data-hold={held ? 'true' : undefined}
    >
      <div className={styles.layers}>
        {[item, upcoming].map((m, k) =>
          m ? (
            <StoryMedia
              key={m.src}
              item={m}
              active={k === 0}
              paused={paused}
              muted={muted}
              contain={!!fit[m.src]}
              sizes={sizes}
              priority={k === 0 && modal && i === 0}
              onFit={onFit}
              onVideoRef={setVideo}
            />
          ) : null,
        )}
      </div>

      <span className={styles.shadeTop} aria-hidden="true" />
      <span className={styles.shadeBottom} aria-hidden="true" />

      {item.overlay ? (
        <span key={`ov-${item.src}`} className={styles.legend} aria-hidden="true">
          {item.overlay.kicker ? <span className={styles.legendKicker}>{item.overlay.kicker}</span> : null}
          <span className={styles.legendTitle}>{item.overlay.title}</span>
        </span>
      ) : null}

      <div
        className={styles.touch}
        aria-hidden="true"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onCancel}
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className={styles.chrome}>
        <div ref={barsRef} className={styles.bars} aria-hidden="true">
          {items.map((m, idx) => (
            <span key={`${m.src}-${idx}`} className={styles.bar}>
              <span className={styles.fill} />
            </span>
          ))}
        </div>

        <div className={styles.head}>
          <span className={styles.author}>
            {group.avatarSrc ? (
              <Image src={group.avatarSrc} alt="" width={64} height={64} className={styles.avatar} />
            ) : (
              <span className={styles.avatarFallback} aria-hidden="true">
                {group.handle.replace(/^@/, '').charAt(0)}
              </span>
            )}
            <span className={styles.handle}>{group.handle}</span>
            {group.timeLabel ? <span className={styles.time}>{group.timeLabel}</span> : null}
          </span>
          <span className={styles.actions}>
            <button
              type="button"
              className={styles.action}
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? t.play : t.pause}
              aria-pressed={userPaused}
            >
              <Icon d={userPaused ? D_PLAY : D_PAUSE} fill />
            </button>
            {hasSound ? (
              <button
                type="button"
                className={styles.action}
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? t.unmute : t.mute}
                aria-pressed={!muted}
              >
                <Icon d={muted ? D_MUTED : D_SOUND} />
              </button>
            ) : null}
            {modal ? (
              <button type="button" className={styles.action} onClick={onClose} aria-label={t.close}>
                <Icon d={D_CLOSE} />
              </button>
            ) : null}
          </span>
        </div>

        {item.cta ? (
          <a
            className={styles.cta}
            href={item.cta.href}
            target={item.cta.href.startsWith('http') ? '_blank' : undefined}
            rel={item.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            <span className={styles.ctaLabel}>{item.cta.label}</span>
          </a>
        ) : null}
      </div>
    </div>
  )

  if (!modal) {
    return (
      <div
        ref={rootRef}
        className={styles.inline}
        tabIndex={0}
        role="region"
        aria-label={label}
        onKeyDown={onInlineKey}
      >
        {frame}
        {thumbs ? (
          <div className={styles.thumbs} role="tablist" aria-label={label}>
            {items.map((m, idx) => (
              <button
                key={`${m.src}-${idx}`}
                type="button"
                role="tab"
                aria-selected={idx === i}
                aria-label={m.role}
                title={m.role}
                onClick={() => {
                  setI(idx)
                  setRestart((r) => r + 1)
                }}
                className={`${styles.thumb}${idx === i ? ` ${styles.thumbOn}` : ''}`}
              >
                <Image src={m.src} alt="" width={180} height={320} sizes="96px" className={styles.thumbImg} />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  if (!mounted) return null

  const side = (g2: number, pos: 'prev' | 'next') => {
    const gr = groups[g2]
    if (!gr) return null
    return (
      <button
        type="button"
        className={`${styles.neighbor} ${pos === 'prev' ? styles.neighborPrev : styles.neighborNext}`}
        onClick={() => goGroup(g2)}
        aria-label={gr.handle}
      >
        <Image src={gr.items[0].src} alt="" fill sizes="240px" className={styles.neighborImg} />
        <span className={styles.neighborShade} aria-hidden="true" />
        <span className={styles.neighborWho} aria-hidden="true">
          {gr.avatarSrc ? (
            <Image src={gr.avatarSrc} alt="" width={96} height={96} className={styles.neighborAvatar} />
          ) : (
            <span className={styles.neighborAvatarFallback}>{gr.handle.replace(/^@/, '').charAt(0)}</span>
          )}
          <span className={styles.neighborName}>{gr.handle}</span>
        </span>
      </button>
    )
  }

  // 🔴 Portal obrigatório: ancestral com `transform` (RevealWrapper) quebra `position: fixed`.
  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={styles.modal}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose?.()
        }}
      >
        {side(gi - 1, 'prev')}
        <div className={styles.stageWrap}>
          {hasPrev ? (
            <button type="button" className={`${styles.arrow} ${styles.arrowPrev}`} onClick={prev} aria-label={t.prev}>
              <Icon d={D_LEFT} />
            </button>
          ) : null}
          <div ref={stageRef} className={styles.stage}>
            {frame}
          </div>
          {hasNext ? (
            <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} onClick={next} aria-label={t.next}>
              <Icon d={D_RIGHT} />
            </button>
          ) : null}
        </div>
        {side(gi + 1, 'next')}
      </div>
    </div>,
    document.body,
  )
}

// =============================================================================
// MEDIA BELT: esteira decorativa que anda sozinha. Não é story e não se clica.
// A lista é duplicada e o trilho corre em translateX (loop sem JavaScript);
// `aria-hidden` na segunda cópia para o leitor de tela não ler tudo duas vezes.
// =============================================================================

export function MediaBelt({
  items,
  className = '',
  label,
}: {
  items: StoryItem[]
  className?: string
  label?: string
}) {
  return (
    <div className={`${styles.belt}${className ? ` ${className}` : ''}`} role="group" aria-label={label}>
      <div className={styles.beltTrack}>
        {[...items, ...items].map((m, idx) => (
          <figure key={m.src + idx} className={styles.beltItem} aria-hidden={idx >= items.length}>
            <Image
              src={m.src}
              alt={idx < items.length ? m.alt : ''}
              width={360}
              height={640}
              className={styles.beltImg}
              sizes="300px"
            />
          </figure>
        ))}
      </div>
    </div>
  )
}
