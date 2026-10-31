'use client'

// =============================================================================
// FEED DA THE GROWTH FACTORY (rodada 29/10/2026, CHANGES #01, item 138)
// Grade no estilo do perfil do Instagram: 3 colunas, tiles 3:4 (a proporcao real
// dos arquivos, 1080x1440, sem corte). A capa de cada post e o primeiro slide; o
// icone de carrossel marca quem tem mais de um. Tocar abre os slides num visor
// simples DENTRO do painel (portal para a raiz do painel, nao para a tela): faixa
// de rolagem com encaixe (o deslize do dedo e nativo), contador, setas no desktop,
// Esc e X fecham so o visor. A peca entra como veio: nada de texto por cima.
// Imagens com lazy load pelo next/image. Dados e ordem em `v4-fronts.ts`.
// =============================================================================

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { ACCENT, EASE, En, PAPER } from '@/components/DeckShell/DeckShell'
import { TGF_POSTS, tgfSlide, type TgfPost } from '@/content/pitch/v4-fronts'

const CAROUSELS = TGF_POSTS.filter((p) => p.kind === 'carrossel').length
const SLIDES = TGF_POSTS.reduce((n, p) => n + p.slides, 0)

// ─── Visor ───────────────────────────────────────────────────────────────────
function TgfViewer({
  post,
  num,
  host,
  onClose,
}: {
  post: TgfPost
  num: number
  host: HTMLElement
  onClose: () => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const idx = useRef(0)
  const raf = useRef(0)
  const [i, setI] = useState(0)

  const go = useCallback(
    (n: number) => {
      const el = trackRef.current
      if (!el) return
      const next = Math.max(0, Math.min(post.slides - 1, n))
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
    },
    [post.slides]
  )

  const onScroll = () => {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const el = trackRef.current
      if (!el) return
      const n = Math.round(el.scrollLeft / Math.max(el.clientWidth, 1))
      idx.current = n
      setI(n)
    })
  }

  // O painel guarda o Esc dele em captura na janela, registrado ANTES deste, e
  // ignora o Esc enquanto o visor esta aberto. Aqui o Esc fecha so o visor.
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        // Se este ouvinte vier antes do do painel, ele nao chega a ver o Esc.
        e.stopImmediatePropagation()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(idx.current + 1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(idx.current - 1)
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      cancelAnimationFrame(raf.current)
    }
  }, [go, onClose])

  // O gesto de baixo do painel (arrastar para fechar) nao pode ler o deslize do visor.
  const stop = (e: React.TouchEvent) => e.stopPropagation()

  return createPortal(
    <div
      className="p4-tv"
      role="dialog"
      aria-label={`Post ${num}: ${post.hook}`}
      onTouchStart={stop}
      onTouchEnd={stop}
    >
      <div className="p4-tv__bar">
        <p className="p4-tv__count" aria-live="polite">
          {i + 1} / {post.slides}
          <span className="p4-tv__lab"> Post {String(num).padStart(2, '0')}</span>
        </p>
        <button ref={closeRef} type="button" className="p4-tv__x" onClick={onClose} aria-label="Fechar post / Close post">
          <span aria-hidden="true">&#10005;</span>
        </button>
      </div>

      <div className="p4-tv__stage">
        <div ref={trackRef} className="p4-tv__track" onScroll={onScroll}>
          {Array.from({ length: post.slides }, (_, s) => (
            <div key={s} className="p4-tv__slide">
              <Image
                src={tgfSlide(post, s)}
                alt={s === 0 ? `${post.hook} (slide 1 de ${post.slides})` : `Post ${num}, slide ${s + 1} de ${post.slides}`}
                fill
                sizes="(max-width: 767px) 100vw, 560px"
                className="p4-tv__img"
                loading={s === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
        {post.slides > 1 ? (
          <>
            <button
              type="button"
              className="p4-tv__nav p4-tv__nav--prev"
              onClick={() => go(idx.current - 1)}
              disabled={i === 0}
              aria-label="Slide anterior / Previous slide"
            >
              <span aria-hidden="true">&#8592;</span>
            </button>
            <button
              type="button"
              className="p4-tv__nav p4-tv__nav--next"
              onClick={() => go(idx.current + 1)}
              disabled={i === post.slides - 1}
              aria-label="Próximo slide / Next slide"
            >
              <span aria-hidden="true">&#8594;</span>
            </button>
          </>
        ) : null}
      </div>

      {post.slides > 1 ? (
        <div className="p4-tv__dots" aria-hidden="true">
          {Array.from({ length: post.slides }, (_, s) => (
            <span key={s} className={`p4-tv__dot${s === i ? ' p4-tv__dot--on' : ''}`} />
          ))}
        </div>
      ) : null}

      <style>{`
        .p4-tv {
          position: absolute;
          inset: 0;
          z-index: 4;
          display: flex;
          flex-direction: column;
          padding-bottom: var(--fp-foot, 4.5rem);
          background: #000000;
          animation: p4-tv-in 240ms ${EASE} both;
        }
        @keyframes p4-tv-in { from { opacity: 0; } to { opacity: 1; } }
        .p4-tv__bar {
          flex: none;
          width: 100%;
          max-width: 34rem;
          margin-inline: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1.25rem 0.2rem;
        }
        .p4-tv__count {
          margin: 0;
          font-family: var(--tbf-font-family-printed);
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: ${ACCENT};
        }
        .p4-tv__lab { font-weight: 400; color: rgba(240, 237, 230, 0.55); }
        .p4-tv__x {
          width: 2.75rem;
          height: 2.75rem;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 50%;
          background: rgba(240, 237, 230, 0.1);
          color: ${PAPER};
          font-size: 1rem;
          cursor: pointer;
        }
        .p4-tv__x:focus-visible, .p4-tv__nav:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 2px; }
        .p4-tv__stage { position: relative; flex: 1 1 auto; min-height: 0; width: 100%; max-width: 34rem; margin-inline: auto; }
        .p4-tv__track {
          position: absolute;
          inset: 0;
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          overscroll-behavior: contain;
          scrollbar-width: none;
        }
        .p4-tv__track::-webkit-scrollbar { display: none; }
        .p4-tv__slide { position: relative; flex: 0 0 100%; height: 100%; scroll-snap-align: center; scroll-snap-stop: always; }
        .p4-tv__img { object-fit: contain; }
        .p4-tv__dots { flex: none; display: flex; justify-content: center; gap: 0.35rem; padding: 0.55rem 0 0.2rem; }
        .p4-tv__dot { width: 0.4rem; height: 0.4rem; border-radius: 50%; background: rgba(240, 237, 230, 0.3); }
        .p4-tv__dot--on { background: ${ACCENT}; }
        .p4-tv__nav {
          position: absolute;
          top: 50%;
          width: 2.75rem;
          height: 2.75rem;
          margin-top: -1.375rem;
          display: none;
          place-items: center;
          border: 0;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.62);
          color: ${PAPER};
          font-size: 1.1rem;
          cursor: pointer;
        }
        .p4-tv__nav--prev { left: 0.5rem; }
        .p4-tv__nav--next { right: 0.5rem; }
        .p4-tv__nav:disabled { opacity: 0.25; cursor: default; }
        @media (hover: hover) and (pointer: fine) {
          .p4-tv__nav { display: grid; }
          .p4-tv__nav:hover:not(:disabled) { background: ${ACCENT}; color: #000000; }
        }
        @media (prefers-reduced-motion: reduce) {
          .p4-tv { animation: none; }
        }
      `}</style>
    </div>,
    host
  )
}

// ─── Grade ───────────────────────────────────────────────────────────────────
export function TgfFeed({
  host,
  onViewer,
}: {
  /** Raiz do painel: o visor nasce dentro dela, no retangulo do canvas. */
  host: HTMLElement | null
  /** Avisa o painel que o visor abriu ou fechou (o Esc dele depende disso). */
  onViewer: (open: boolean) => void
}) {
  const [view, setView] = useState<number | null>(null)
  const lastTile = useRef<HTMLButtonElement | null>(null)

  const close = useCallback(() => {
    setView(null)
    onViewer(false)
    lastTile.current?.focus({ preventScroll: true })
  }, [onViewer])

  return (
    <div className="p4-tg">
      <div className="p4-tg__head">
        <p className="p4-tg__title">Feed</p>
        <p className="p4-tg__stats">
          <span className="p4-tg__n">{TGF_POSTS.length}</span> posts
          <span className="p4-tg__sep" aria-hidden="true"> · </span>
          <span className="p4-tg__n">{CAROUSELS}</span> carrosséis
          <span className="p4-tg__sep" aria-hidden="true"> · </span>
          <span className="p4-tg__n">{SLIDES}</span> slides
          <En>
            {TGF_POSTS.length} posts · {CAROUSELS} carousels · {SLIDES} slides
          </En>
        </p>
      </div>

      <ul className="p4-tg__grid">
        {TGF_POSTS.map((p, n) => (
          <li key={p.id} className="p4-tg__li">
            <button
              type="button"
              className="p4-tg__tile"
              aria-label={`Abrir o post ${n + 1}: ${p.hook}${p.slides > 1 ? `. Carrossel com ${p.slides} slides` : ''}`}
              onClick={(e) => {
                lastTile.current = e.currentTarget
                setView(n)
                onViewer(true)
              }}
            >
              <Image
                src={tgfSlide(p, 0)}
                alt=""
                fill
                sizes="(max-width: 767px) 34vw, 220px"
                className="p4-tg__img"
                loading="lazy"
              />
              {p.slides > 1 ? (
                <svg className="p4-tg__ico" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                  <rect x="8.5" y="3.5" width="12" height="12" rx="2.5" fill="none" stroke="#ffffff" strokeWidth="2" />
                  <path d="M5.5 8.2v8.3a3 3 0 0 0 3 3h8.3" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {view !== null && host ? (
        <TgfViewer post={TGF_POSTS[view]} num={view + 1} host={host} onClose={close} />
      ) : null}

      <style>{`
        .p4-tg { width: 100%; }
        .p4-tg__head { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 0.2rem 0.8rem; margin-bottom: 0.7rem; }
        .p4-tg__title {
          margin: 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.04em;
          color: ${ACCENT};
        }
        .p4-tg__stats { margin: 0; font-family: var(--tbf-font-family-body); font-weight: 350; font-size: 0.78rem; line-height: 1.25; color: rgba(240, 237, 230, 0.8); }
        .p4-tg__n { font-family: var(--tbf-font-family-display); font-weight: 800; color: ${PAPER}; }
        .p4-tg__stats .p3-en { font-size: 0.66rem; line-height: 1.2; }
        .p4-tg__grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2px; }
        .p4-tg__li { display: block; min-width: 0; }
        .p4-tg__tile {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 3 / 4;
          padding: 0;
          border: 0;
          overflow: hidden;
          background: #0a0a09;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .p4-tg__img { object-fit: cover; transition: opacity 300ms ease; }
        .p4-tg__tile:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: -2px; }
        .p4-tg__ico { position: absolute; top: 0.4rem; right: 0.4rem; filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6)); pointer-events: none; }
        @media (hover: hover) {
          .p4-tg__tile:hover .p4-tg__img { opacity: 0.82; }
        }
        @media (min-width: 768px) {
          .p4-tg__title { font-size: 1.8rem; }
          .p4-tg__stats { font-size: 0.88rem; }
          .p4-tg__stats .p3-en { font-size: 0.76rem; }
          .p4-tg__grid { gap: 3px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .p4-tg__img { transition: none; }
        }
      `}</style>
    </div>
  )
}
