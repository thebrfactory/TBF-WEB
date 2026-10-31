'use client'

// =============================================================================
// PITCH 4.0 · CENA 04: DA CULTURA AO NEGOCIO, AS QUATRO FRENTES (rodada 23/10/2026)
// Fundiu as antigas cenas 06 (cartoes das verticais) e 07 (como cada vertical
// ganha). Pedido do fundador: "gosto da estrutura do slide 7 com as quatro
// labels uma em cima da outra... a parte que expande, mas expandir para toda a
// tela com mais detalhes".
//
// RODADA 29/10/2026 (CHANGES #01, item 138), pedido literal: "[138] remove. //
// assim que a gente clica em um desses, abre um pop-up. esse pop-up nao precisa
// tomar toda a tela. basta tomar o espaco do canvas, mantendo o letreiro motion,
// o passador de slides e por ai vai. pode remover o subtitulo embaixo de cada
// label."
//   1. Saiu o bloco abaixo das quatro frentes (titulo "Quatro frentes. Uma por
//      vez.", a frase e o "Em construcao").
//   2. Saiu a descricao embaixo do nome em cada linha. Ela continua dentro do
//      popup, como lead.
//   3. O popup deixou de ser tela cheia. Ele ocupa so o CANVAS: o retangulo da
//      propria cena (a geometria `S` do DeckShell, uma cena = uma tela), do pe do
//      letreiro ao pe da janela. A nav com o N e o PT/EN, o letreiro em movimento,
//      o timer e o passador ficam a vista e funcionando. O retangulo e MEDIDO no
//      DOM (a cena, descontada a faixa pinada do topo que o DeckNav ja le em
//      `scroll-margin-top`) e remedido em resize e em scroll: nenhum numero fixo.
//   4. TFD abre o grafico das metricas da MELFIORE (`TfdSheet.tsx`); TGF abre o
//      feed (`TgfFeed.tsx`). RUC e TBF ficam como estavam.
//
// COMO O POPUP SE COMPORTA
//   Cresce a partir da propria linha (clip-path) e termina no retangulo do canvas.
//   Fecha com X, Esc ou arrastar para baixo (a volta encolhe ate a linha). Clicar
//   numa seta do passador fecha o painel na hora e deixa o deck trocar de cena.
//   O anel de avatar continua abrindo os stories (StoryPlayer, por cima de tudo).
// Conteudo: `BUSINESS.portfolio` (v3-scenes.ts), `MODEL` (v4-scenes.ts) e, para a
// TFD e a TGF, `v4-fronts.ts`.
// =============================================================================

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { StoryPlayer } from '@/components/StoryPlayer/StoryPlayer'
import { StoryRing } from '@/components/tavaristico/StoryRing'
import { ACCENT, EASE, En, Kicker, PAPER, PitchReveal, S } from '@/components/DeckShell/DeckShell'
import { BUSINESS } from '@/content/pitch/v3-scenes'
import { MODEL, VERTICAL_STORIES } from '@/content/pitch/v4-scenes'
import { TfdSheet } from './TfdSheet'
import { TgfFeed } from './TgfFeed'

const MS = 620
const MS_QUICK = 180

type Front = {
  item: (typeof BUSINESS.portfolio)[number]
  row: (typeof MODEL.rows)[number]
  story: (typeof VERTICAL_STORIES)[string]
}

const FRONTS: Front[] = MODEL.rows.map((row) => ({
  row,
  item: BUSINESS.portfolio.find((p) => p.name === row.name)!,
  story: VERTICAL_STORIES[row.name],
}))

// ─── O canvas ────────────────────────────────────────────────────────────────
// O elemento que define o canvas e a PROPRIA cena (`section#cena-04`): o `S` do
// DeckShell da a ela a altura de 100dvh menos a faixa pinada (nav + letreiro) e
// reserva em padding o respiro de baixo para o timer e o passador. O painel herda
// as duas medidas: o topo e o maior entre o topo da cena e a faixa pinada, o pe e
// o da cena (ou o da janela), e o padding de baixo da cena vira a faixa livre do
// painel. A faixa pinada sai do `scroll-margin-top` da cena, o mesmo valor que o
// DeckNav usa para rolar (`--p3-band`), em vez de repetido aqui.
type Canvas = { top: number; left: number; width: number; height: number; foot: number }

function measureCanvas(scene: HTMLElement | null): Canvas {
  const vw = window.innerWidth
  const vh = window.innerHeight
  if (!scene) return { top: 0, left: 0, width: vw, height: vh, foot: 0 }
  const r = scene.getBoundingClientRect()
  const cs = getComputedStyle(scene)
  const band = parseFloat(cs.scrollMarginTop) || 0
  const top = Math.max(r.top, band)
  const bottom = Math.min(r.bottom, vh)
  return {
    top,
    left: r.left,
    width: r.width,
    height: Math.max(bottom - top, 0),
    foot: parseFloat(cs.paddingBottom) || 0,
  }
}

const sameCanvas = (a: Canvas, b: Canvas) =>
  Math.abs(a.top - b.top) < 0.5 &&
  Math.abs(a.left - b.left) < 0.5 &&
  Math.abs(a.width - b.width) < 0.5 &&
  Math.abs(a.height - b.height) < 0.5 &&
  Math.abs(a.foot - b.foot) < 0.5

const OPEN_CLIP = 'inset(0px 0px 0px 0px round 0px)'

// O recorte da linha clicada, relativo ao retangulo do canvas: de onde o painel
// cresce e para onde ele encolhe.
function rowClip(row: DOMRect | null, c: Canvas): string {
  if (!row) return 'inset(50% 50% 50% 50% round 14px)'
  const pos = (n: number) => Math.max(n, 0)
  return `inset(${pos(row.top - c.top)}px ${pos(c.left + c.width - row.right)}px ${pos(c.top + c.height - row.bottom)}px ${pos(row.left - c.left)}px round 14px)`
}

// ─── Painel no canvas ────────────────────────────────────────────────────────
function FrontPanel({
  front,
  scene,
  from,
  getRow,
  storyOpen,
  onClose,
  onStory,
}: {
  front: Front
  scene: React.RefObject<HTMLElement | null>
  from: DOMRect
  getRow: () => DOMRect | null
  storyOpen: boolean
  onClose: () => void
  onStory: () => void
}) {
  const [canvas, setCanvas] = useState<Canvas>(() => measureCanvas(scene.current))
  const [clip, setClip] = useState<string>(() => rowClip(from, measureCanvas(scene.current)))
  const [phase, setPhase] = useState<'in' | 'open' | 'out' | 'quick'>('in')
  const [host, setHost] = useState<HTMLDivElement | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const startY = useRef<number | null>(null)
  const closing = useRef(false)
  const viewerOpen = useRef(false)
  const unlock = useRef<(() => void) | null>(null)
  const canvasRef = useRef(canvas)
  const opened = useRef(canvas)
  const { item, row, story } = front
  const isTfd = item.name === '.THE FIORE DAILY.'
  const isTgf = item.name === '.THE GROWTH FACTORY.'
  const hasMedia = isTfd || isTgf

  // Fechar de volta: encolhe ate a linha, medida AGORA (a janela pode ter mudado).
  const close = useCallback(() => {
    if (closing.current) return
    closing.current = true
    setPhase('out')
    setClip(rowClip(getRow(), canvasRef.current))
    window.setTimeout(onClose, MS)
  }, [getRow, onClose])

  // Fechar por seta do passador: o deck vai rolar para outra cena e o painel e fixo,
  // entao nao ha encolher ate uma linha que ja se foi. Libera a rolagem NA HORA, para
  // a rolagem suave do passador partir livre, e some em um sopro.
  const closeQuick = useCallback(() => {
    if (closing.current) return
    closing.current = true
    unlock.current?.()
    setPhase('quick')
    window.setTimeout(onClose, MS_QUICK)
  }, [onClose])

  // Os ouvintes sao registrados UMA vez e leem o estado mais novo por aqui; assim a
  // ordem deles na janela nao muda (o visor da TGF depende de vir depois do painel).
  const latest = useRef({ close, closeQuick, storyOpen })
  useEffect(() => {
    latest.current = { close, closeQuick, storyOpen }
    canvasRef.current = canvas
  })

  useEffect(() => {
    const r1 = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setPhase('open')
        setClip(OPEN_CLIP)
      })
    )
    // A rolagem da pagina trava no BODY, nao no html. Com `overflow: hidden` no html o
    // letreiro (sticky) solta do topo e some, no WebKit e no Chrome (medido em 31/10:
    // o letreiro ia para -2220px); no body ele segue colado. E o mesmo gesto do menu
    // da nav (`Navigation.tsx`).
    const root = document.body
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    let locked = true
    unlock.current = () => {
      if (!locked) return
      locked = false
      root.style.overflow = prev
    }
    closeRef.current?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Stories e visor da TGF por cima: o Esc e deles.
        if (latest.current.storyOpen || viewerOpen.current) return
        latest.current.close()
      }
      // Setas do deck nao trocam de cena por baixo do painel.
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.stopPropagation()
    }
    // As setas do passador, que continuam a vista e vivas, fecham o painel e deixam o
    // clique seguir para o DeckNav trocar de cena.
    const onClick = (e: MouseEvent) => {
      const t = e.target
      if (t instanceof Element && t.closest('.p3-nav__btn')) latest.current.closeQuick()
    }
    window.addEventListener('keydown', onKey, true)
    document.addEventListener('click', onClick, true)
    return () => {
      cancelAnimationFrame(r1)
      unlock.current?.()
      window.removeEventListener('keydown', onKey, true)
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  // O canvas e remedido quando a janela ou a cena mudam de tamanho e quando a pagina rola.
  useEffect(() => {
    let raf = 0
    const read = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const next = measureCanvas(scene.current)
        setCanvas((c) => (sameCanvas(c, next) ? c : next))
      })
    }
    // O deck andando por baixo (PageDown, rolagem programatica do passador, a tecla de
    // espaco) leva a cena embora: o painel nao fica pendurado numa cena que saiu, fecha.
    const onScroll = () => {
      const now = measureCanvas(scene.current)
      const o = opened.current
      if (Math.abs(now.top - o.top) > 12 || Math.abs(now.height - o.height) > 12) latest.current.closeQuick()
      else read()
    }
    window.addEventListener('resize', read)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.visualViewport?.addEventListener('resize', read)
    const ro = new ResizeObserver(read)
    if (scene.current) ro.observe(scene.current)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', read)
      window.removeEventListener('scroll', onScroll)
      window.visualViewport?.removeEventListener('resize', read)
      ro.disconnect()
    }
  }, [scene])

  const onViewer = useCallback((open: boolean) => {
    viewerOpen.current = open
  }, [])

  return createPortal(
    <div
      ref={setHost}
      className={`p4-fp${hasMedia ? ' p4-fp--media' : ''}${phase === 'open' ? ' p4-fp--on' : ''}${phase === 'quick' ? ' p4-fp--quick' : ''}`}
      style={
        {
          top: canvas.top,
          left: canvas.left,
          width: canvas.width,
          height: canvas.height,
          clipPath: clip,
          '--fp-foot': `${canvas.foot}px`,
        } as React.CSSProperties
      }
      role="dialog"
      aria-label={`${item.name}: ${row.tag.pt}`}
      onTouchStart={(e) => {
        startY.current = bodyRef.current && bodyRef.current.scrollTop <= 0 ? e.touches[0].clientY : null
      }}
      onTouchEnd={(e) => {
        if (startY.current !== null && e.changedTouches[0].clientY - startY.current > 90) close()
        startY.current = null
      }}
    >
      <div className="p4-fp__top">
        <span className="p4-fp__tag">
          {row.tag.pt}
          <span className="p4-fp__tag-en"> / {row.tag.en}</span>
        </span>
        <button ref={closeRef} type="button" className="p4-fp__x" onClick={close} aria-label="Fechar / Close">
          <span aria-hidden="true">&#10005;</span>
        </button>
      </div>

      <div ref={bodyRef} className="p4-fp__body">
        <div className={`p4-fp__layout${hasMedia ? ' p4-fp__layout--media' : ''}`}>
          <div className="p4-fp__head">
            {story ? (
              <StoryRing cover={story.avatar} alt={item.name} size={64} ariaLabel={`Abrir stories: ${item.name}`} onClick={onStory} />
            ) : (
              <Image src="/brand/TBF-AVATAR.webp" alt="" width={64} height={64} className="p4-fp__avatar" />
            )}
            <div className="p4-fp__id">
              <p className="p3-portfolio-name p4-fp__name" style={{ color: PAPER }}>
                {item.name}
              </p>
              <p className="p4-fp__role">
                {item.role.pt}
                <En>{item.role.en}</En>
              </p>
            </div>
          </div>

          <p className="p4-fp__lead">
            {row.earns.pt}
            <En size="lead">{row.earns.en}</En>
          </p>

          {isTfd ? (
            <div className="p4-fp__media">
              <TfdSheet />
            </div>
          ) : null}
          {isTgf ? (
            <div className="p4-fp__media">
              <TgfFeed host={host} onViewer={onViewer} />
            </div>
          ) : null}

          <div className="p4-fp__grid">
            <p className="p4-fp__field">
              <span className="p3-label">Por que existe</span>
              {item.why.pt}
              <En>{item.why.en}</En>
            </p>
            <p className="p4-fp__field">
              <span className="p3-label">Como ganha forma</span>
              {item.forms.pt}
              <En>{item.forms.en}</En>
            </p>
          </div>

          <Link href={item.href} className="p4-fp__link">
            Ver página / See page &#8594;
          </Link>
        </div>
      </div>

      <style>{`
        .p4-fp {
          position: fixed;
          box-sizing: border-box;
          /* Acima do conteudo da cena e do letreiro (sticky, 30); abaixo do timer e do
             passador (40), que continuam por cima, e dos stories (modal, 50). */
          z-index: calc(var(--tbf-z-sticky) + 5);
          display: flex;
          flex-direction: column;
          /* A faixa de baixo da cena, medida: fica livre para o timer e o passador. */
          padding-bottom: var(--fp-foot, 4.5rem);
          background: #000000;
          transition: clip-path ${MS}ms ${EASE}, opacity ${MS_QUICK}ms ${EASE};
          will-change: clip-path;
        }
        .p4-fp--quick { opacity: 0; pointer-events: none; }
        .p4-fp__top,
        .p4-fp__layout > * {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 500ms ${EASE}, transform 600ms ${EASE};
        }
        .p4-fp--on .p4-fp__top,
        .p4-fp--on .p4-fp__layout > * { opacity: 1; transform: none; }
        .p4-fp--on .p4-fp__layout > :nth-child(1) { transition-delay: 220ms; }
        .p4-fp--on .p4-fp__layout > :nth-child(2) { transition-delay: 300ms; }
        .p4-fp--on .p4-fp__layout > :nth-child(3) { transition-delay: 380ms; }
        .p4-fp--on .p4-fp__layout > :nth-child(4) { transition-delay: 460ms; }
        .p4-fp--on .p4-fp__layout > :nth-child(5) { transition-delay: 540ms; }
        .p4-fp__top {
          flex: none;
          width: 100%;
          max-width: 62rem;
          margin-inline: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1.25rem 0.2rem;
        }
        .p4-fp__tag {
          font-family: var(--tbf-font-family-printed);
          font-weight: 600;
          font-size: 0.66rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${ACCENT};
        }
        .p4-fp__tag-en { color: rgba(240, 237, 230, 0.5); font-weight: 400; font-style: normal; }
        .p4-fp__x {
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
        .p4-fp__x:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 2px; }
        .p4-fp__body {
          flex: 1 1 auto;
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 0.4rem 1.25rem 1.5rem;
          width: 100%;
          max-width: 62rem;
          margin-inline: auto;
        }
        /* O miolo e uma grade com areas nomeadas: no celular tudo empilha (cabeca, lead,
           midia, campos, link); com midia (TFD e TGF), do desktop em diante a midia sobe
           para uma segunda coluna e o texto fica ao lado. */
        .p4-fp__layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          grid-template-areas: 'head' 'lead' 'media' 'fields' 'link';
          justify-items: start;
        }
        .p4-fp__head { grid-area: head; display: flex; align-items: center; gap: 0.9rem; width: 100%; }
        /* O anel (ou o avatar) nunca encolhe: com um papel comprido, como o da TGF, o flex
           o espremia num oval. */
        .p4-fp__head > :first-child { flex: none; }
        .p4-fp__avatar { width: 4rem; height: 4rem; border-radius: 50%; object-fit: cover; }
        .p4-fp__id { min-width: 0; }
        .p4-fp .p4-fp__name {
          margin: 0;
          font-size: clamp(0.95rem, 4.6vw, 1.6rem);
          letter-spacing: -0.03em;
          line-height: 1.1;
          white-space: normal;
        }
        .p4-fp__role {
          margin: 0.3rem 0 0;
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: 0.76rem;
          line-height: 1.3;
          color: rgba(240, 237, 230, 0.65);
        }
        .p4-fp__role .p3-en { font-size: 0.64rem; line-height: 1.2; }
        .p4-fp__lead {
          grid-area: lead;
          margin: 1.2rem 0 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(1.5rem, 7.4vw, 3rem);
          line-height: 1;
          letter-spacing: -0.04em;
          color: ${PAPER};
        }
        .p4-fp__lead .p3-en { margin-top: 0.4rem; }
        .p4-fp__media { grid-area: media; width: 100%; min-width: 0; margin-top: 1.4rem; }
        .p4-fp__grid { grid-area: fields; width: 100%; display: grid; grid-template-columns: 1fr; gap: 0.9rem; margin-top: 1.4rem; }
        .p4-fp__field {
          margin: 0;
          padding: 0.8rem 0.9rem;
          background: #050505;
          border-radius: var(--tbf-radius-card);
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: 0.86rem;
          line-height: 1.4;
          color: rgba(240, 237, 230, 0.8);
        }
        .p4-fp__field .p3-label { display: block; margin-bottom: 0.25rem; color: ${ACCENT}; }
        .p4-fp__field .p3-en { font-size: 0.7rem; line-height: 1.25; }
        .p4-fp__link {
          grid-area: link;
          display: inline-block;
          margin-top: 1.2rem;
          padding: 0.7rem 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          text-decoration: none;
          color: ${ACCENT};
        }
        @media (min-width: 768px) {
          .p4-fp__top { padding: 1rem 3rem 0.3rem; }
          .p4-fp__body { padding: 0.6rem 3rem 2rem; }
          .p4-fp__grid { grid-template-columns: 1fr 1fr; gap: 1.2rem; }
          .p4-fp__field { font-size: 1rem; padding: 1.1rem 1.2rem; }
          .p4-fp__field .p3-en { font-size: 0.82rem; }
          .p4-fp__role { font-size: 0.95rem; }
          .p4-fp__role .p3-en { font-size: 0.8rem; }
          .p4-fp__avatar { width: 5rem; height: 5rem; }
        }
        @media (min-width: 1024px) {
          /* Com midia (grafico, feed) a tela larga ganha duas colunas e uma coluna maior. */
          .p4-fp--media .p4-fp__top, .p4-fp--media .p4-fp__body { max-width: 76rem; }
          .p4-fp__layout--media {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            grid-template-areas: 'head media' 'lead media' 'fields media' 'link media';
            grid-template-rows: auto auto auto 1fr;
            column-gap: 2.5rem;
          }
          .p4-fp__layout--media .p4-fp__media { margin-top: 1.2rem; }
          .p4-fp__layout--media .p4-fp__lead { font-size: clamp(1.6rem, 2.9vw, 2.5rem); }
          .p4-fp__layout--media .p4-fp__grid { grid-template-columns: 1fr; align-self: start; }
          .p4-fp__layout--media .p4-fp__link { align-self: start; }
        }
        @media (prefers-reduced-motion: reduce) {
          .p4-fp, .p4-fp__top, .p4-fp__layout > * { transition: none; }
        }
      `}</style>
    </div>,
    document.body
  )
}

// ─── Cena ────────────────────────────────────────────────────────────────────
export function FrontsScene() {
  const [open, setOpen] = useState<{ i: number; from: DOMRect } | null>(null)
  const [story, setStory] = useState<number | null>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const sceneRef = useRef<HTMLElement>(null)

  const groups = FRONTS.map((f) => ({
    id: f.story.handle,
    handle: f.story.handle,
    avatarSrc: f.story.avatar,
    items: f.story.items,
  }))

  const openI = open?.i ?? null
  const getRow = useCallback(
    () => (openI === null ? null : (rowRefs.current[openI]?.getBoundingClientRect() ?? null)),
    [openI]
  )
  const closePanel = useCallback(() => setOpen(null), [])

  return (
    <section
      id="cena-04"
      ref={sceneRef}
      style={{ ...S, background: '#000000' }}
      aria-label="Da Cultura ao Negócio / From Culture to Business"
    >
      <Kicker n="04" pt="Da Cultura ao Negócio" en="From Culture to Business" />

      <PitchReveal delay={100} slot="head">
        <h2 className="p3-h2 p3-h2--md">
          {BUSINESS.headline.pt[0]}
          <br />
          {BUSINESS.headline.pt[1]}
          <En size="lead">{BUSINESS.headline.en.join(' ')}</En>
        </h2>
      </PitchReveal>

      <ol className="p4-fr">
        {FRONTS.map((f, i) => (
          <li key={f.row.name} className="p4-fr__li">
            <PitchReveal delay={220 + i * 80}>
              <div
                ref={(el) => {
                  rowRefs.current[i] = el
                }}
                className={`p4-fr__row p4-fr__row--${f.row.tone}`}
              >
                <button
                  type="button"
                  className="p4-fr__hit"
                  aria-haspopup="dialog"
                  aria-label={`Abrir detalhes: ${f.row.name}`}
                  onClick={() => {
                    const el = rowRefs.current[i]
                    if (el) setOpen({ i, from: el.getBoundingClientRect() })
                  }}
                />
                <span className="p4-fr__ring">
                  <StoryRing
                    cover={f.story.avatar}
                    alt={f.row.name}
                    size={44}
                    ariaLabel={`Abrir stories: ${f.row.name}`}
                    onClick={() => setStory(i)}
                  />
                </span>
                <div className="p4-fr__main">
                  <p className="p4-fr__top">
                    <span className="p4-fr__name">{f.row.name}</span>
                    <span className="p4-fr__tag">
                      {f.row.tag.pt}
                      <span className="p4-fr__tag-en"> / {f.row.tag.en}</span>
                    </span>
                  </p>
                </div>
                <span className="p4-fr__plus" aria-hidden="true">
                  +
                </span>
              </div>
            </PitchReveal>
          </li>
        ))}
      </ol>

      {open ? (
        <FrontPanel
          key={open.i}
          front={FRONTS[open.i]}
          scene={sceneRef}
          from={open.from}
          getRow={getRow}
          storyOpen={story !== null}
          onClose={closePanel}
          onStory={() => setStory(open.i)}
        />
      ) : null}

      {story !== null ? (
        <StoryPlayer
          groups={groups}
          startGroup={story}
          label="Stories das quatro verticais / Stories of the four verticals"
          onClose={() => setStory(null)}
        />
      ) : null}

      <style>{`
        .p4-fr {
          position: relative;
          z-index: 1;
          list-style: none;
          margin: var(--p3-gap-sm) 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          max-width: var(--p3-inner);
        }
        .p4-fr__li { display: block; }
        .p4-fr__row {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-height: 3.75rem;
          padding: 0.6rem 0.8rem 0.6rem 0.7rem;
          background: #050505;
          border-left: 3px solid ${PAPER};
          border-radius: var(--tbf-radius-card);
          transition: border-color 400ms ${EASE}, background 400ms ${EASE};
        }
        .p4-fr__row--cash { border-left-color: ${ACCENT}; }
        .p4-fr__row--bet { border-left-color: rgba(240, 237, 230, 0.35); }
        @media (hover: hover) {
          .p4-fr__row:hover { background: #0d0d0c; border-left-color: ${ACCENT}; }
        }
        .p4-fr__hit {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          padding: 0;
          border: 0;
          background: none;
          border-radius: inherit;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .p4-fr__hit:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: -2px; }
        .p4-fr__ring { position: relative; z-index: 3; flex: none; }
        .p4-fr__main { min-width: 0; flex: 1 1 auto; pointer-events: none; }
        .p4-fr__top {
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.2rem 0.8rem;
        }
        .p4-fr__name {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: -0.02em;
          color: ${PAPER};
        }
        .p4-fr__tag {
          font-family: var(--tbf-font-family-printed);
          font-weight: 600;
          font-size: 0.56rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${ACCENT};
        }
        .p4-fr__tag-en { color: rgba(240, 237, 230, 0.5); font-weight: 400; }
        .p4-fr__plus {
          flex: none;
          width: 1.4rem;
          text-align: center;
          font-family: var(--tbf-font-family-printed);
          font-weight: 200;
          font-size: 1.4rem;
          line-height: 1;
          color: ${ACCENT};
          pointer-events: none;
        }
        @media (min-width: 768px) {
          .p4-fr { gap: 0.6rem; max-width: 60rem; margin-top: var(--p3-gap); }
          .p4-fr__row { min-height: 4.4rem; padding: 0.8rem 1.1rem 0.8rem 0.9rem; gap: 1.1rem; }
          .p4-fr__name { font-size: 1.15rem; }
          .p4-fr__tag { font-size: 0.72rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .p4-fr__row { transition: none; }
        }
      `}</style>
    </section>
  )
}
