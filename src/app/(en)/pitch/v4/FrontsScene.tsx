'use client'

// =============================================================================
// PITCH 4.0 · CENA 05: DA CULTURA AO NEGOCIO, AS QUATRO FRENTES (rodada 23/10/2026)
// Fundiu as antigas cenas 06 (cartoes das verticais) e 07 (como cada vertical
// ganha). Pedido do fundador: "gosto da estrutura do slide 7 com as quatro
// labels uma em cima da outra... a parte que expande, mas expandir para toda a
// tela com mais detalhes" e "titulo menor logo abaixo, proximo do rodape".
// As quatro frentes ficam empilhadas, cada uma com o papel (CAIXA HOJE, PROXIMO
// MOTOR, CREDIBILIDADE, A APOSTA). Clicar abre um painel em TELA CHEIA, que
// cresce a partir da propria linha (clip-path). Fecha com X, Esc ou arrastar
// para baixo. O anel de avatar continua abrindo os stories (StoryPlayer).
// Conteudo: `BUSINESS.portfolio` (v3-scenes.ts), `MODEL` e `TFD_METRICS`.
// =============================================================================

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { StoryPlayer } from '@/components/StoryPlayer/StoryPlayer'
import { StoryRing } from '@/components/tavaristico/StoryRing'
import { ACCENT, EASE, En, Kicker, PAPER, PitchReveal, S } from '@/components/DeckShell/DeckShell'
import { BUSINESS } from '@/content/pitch/v3-scenes'
import { MODEL, TFD_METRICS, VERTICAL_STORIES } from '@/content/pitch/v4-scenes'

const MS = 620

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

// ─── Painel em tela cheia ────────────────────────────────────────────────────
function FrontPanel({
  front,
  from,
  onClose,
  onStory,
}: {
  front: Front
  from: DOMRect
  onClose: () => void
  onStory: () => void
}) {
  const [shown, setShown] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const startY = useRef<number | null>(null)
  const closing = useRef(false)
  const { item, row, story } = front
  const isTfd = item.name === '.THE FIORE DAILY.'

  const close = useCallback(() => {
    if (closing.current) return
    closing.current = true
    setShown(false)
    window.setTimeout(onClose, MS)
  }, [onClose])

  useEffect(() => {
    const r1 = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      // Setas do deck nao trocam de cena por baixo do painel.
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.stopPropagation()
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      cancelAnimationFrame(r1)
      document.documentElement.style.overflow = prev
      window.removeEventListener('keydown', onKey, true)
    }
  }, [close])

  const vw = typeof window === 'undefined' ? 0 : window.innerWidth
  const vh = typeof window === 'undefined' ? 0 : window.innerHeight
  const clipFrom = `inset(${Math.max(from.top, 0)}px ${Math.max(vw - from.right, 0)}px ${Math.max(vh - from.bottom, 0)}px ${Math.max(from.left, 0)}px round 14px)`

  return createPortal(
    <div
      className={`p4-fp${shown ? ' p4-fp--on' : ''}`}
      style={{ clipPath: shown ? 'inset(0px 0px 0px 0px round 0px)' : clipFrom }}
      role="dialog"
      aria-modal="true"
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

        {isTfd ? (
          <div className="p4-fp__metrics">
            <p className="p4-fp__mtitle">
              {TFD_METRICS.title.pt} <span className="p4-fp__tag-en">/ {TFD_METRICS.title.en}</span>
            </p>
            {TFD_METRICS.groups.map((g) => (
              <div key={g.period.pt} className="p4-fp__mgroup">
                <p className="p4-fp__period">
                  {g.period.pt}
                  <span className="p4-fp__tag-en"> / {g.period.en}</span>
                </p>
                <div className="p4-fp__stats">
                  {g.stats.map((s) => (
                    <div key={s.value + s.label.pt} className="p4-fp__stat">
                      <span className="p4-fp__val">{s.value}</span>
                      <span className="p4-fp__lab">
                        {s.label.pt}
                        <En>{s.label.en}</En>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="p4-fp__src">{g.source.pt}</p>
              </div>
            ))}
          </div>
        ) : null}

        <Link href={item.href} className="p4-fp__link">
          Ver página / See page &#8594;
        </Link>
      </div>

      <style>{`
        .p4-fp {
          position: fixed;
          inset: 0;
          z-index: calc(var(--tbf-z-modal) - 2);
          display: flex;
          flex-direction: column;
          background: #000000;
          clip-path: inset(0);
          transition: clip-path ${MS}ms ${EASE};
          will-change: clip-path;
        }
        .p4-fp__top,
        .p4-fp__body > * {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 500ms ${EASE}, transform 600ms ${EASE};
        }
        .p4-fp--on .p4-fp__top,
        .p4-fp--on .p4-fp__body > * { opacity: 1; transform: none; }
        .p4-fp--on .p4-fp__body > :nth-child(1) { transition-delay: 220ms; }
        .p4-fp--on .p4-fp__body > :nth-child(2) { transition-delay: 300ms; }
        .p4-fp--on .p4-fp__body > :nth-child(3) { transition-delay: 380ms; }
        .p4-fp--on .p4-fp__body > :nth-child(4) { transition-delay: 460ms; }
        .p4-fp--on .p4-fp__body > :nth-child(5) { transition-delay: 540ms; }
        .p4-fp__top {
          flex: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem 0.4rem;
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
          padding: 0.6rem 1.25rem 2.5rem;
          width: 100%;
          max-width: 62rem;
          margin-inline: auto;
        }
        .p4-fp__head { display: flex; align-items: center; gap: 0.9rem; }
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
          margin: 1.4rem 0 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(1.5rem, 7.4vw, 3rem);
          line-height: 1;
          letter-spacing: -0.04em;
          color: ${PAPER};
        }
        .p4-fp__lead .p3-en { margin-top: 0.4rem; }
        .p4-fp__grid { display: grid; grid-template-columns: 1fr; gap: 0.9rem; margin-top: 1.4rem; }
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
        .p4-fp__metrics { margin-top: 1.4rem; }
        .p4-fp__mtitle {
          margin: 0 0 0.6rem;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.04em;
          color: ${ACCENT};
        }
        .p4-fp__mgroup { margin-bottom: 1rem; }
        .p4-fp__period {
          margin: 0 0 0.35rem;
          font-family: var(--tbf-font-family-printed);
          font-weight: 600;
          font-size: 0.66rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${PAPER};
        }
        .p4-fp__stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(7.4rem, 1fr)); gap: 0.4rem; }
        .p4-fp__stat { display: flex; flex-direction: column; gap: 0.2rem; padding: 0.65rem 0.7rem; background: #050505; border-radius: var(--tbf-radius-card); }
        .p4-fp__val { font-family: var(--tbf-font-family-display); font-weight: 800; font-size: 1.6rem; line-height: 1; letter-spacing: -0.04em; color: ${PAPER}; }
        .p4-fp__lab { font-family: var(--tbf-font-family-body); font-weight: 350; font-size: 0.7rem; line-height: 1.25; color: rgba(240, 237, 230, 0.75); }
        .p4-fp__lab .p3-en { font-size: 0.6rem; line-height: 1.15; }
        .p4-fp__src { margin: 0.3rem 0 0; font-family: var(--tbf-font-family-printed); font-size: 0.58rem; letter-spacing: 0.04em; color: rgba(240, 237, 230, 0.42); }
        .p4-fp__link {
          display: inline-block;
          margin-top: 1.4rem;
          padding: 0.4rem 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          text-decoration: none;
          color: ${ACCENT};
        }
        @media (min-width: 768px) {
          .p4-fp__top { padding: 1.6rem 3rem 0.4rem; }
          .p4-fp__body { padding: 1rem 3rem 3rem; }
          .p4-fp__grid { grid-template-columns: 1fr 1fr; gap: 1.2rem; }
          .p4-fp__field { font-size: 1rem; padding: 1.1rem 1.2rem; }
          .p4-fp__field .p3-en { font-size: 0.82rem; }
          .p4-fp__role { font-size: 0.95rem; }
          .p4-fp__role .p3-en { font-size: 0.8rem; }
          .p4-fp__avatar { width: 5rem; height: 5rem; }
          .p4-fp__val { font-size: 2.2rem; }
          .p4-fp__lab { font-size: 0.85rem; }
          .p4-fp__lab .p3-en { font-size: 0.72rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .p4-fp, .p4-fp__top, .p4-fp__body > * { transition: none; }
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

  const groups = FRONTS.map((f) => ({
    id: f.story.handle,
    handle: f.story.handle,
    avatarSrc: f.story.avatar,
    items: f.story.items,
  }))

  return (
    <section
      id="cena-05"
      style={{ ...S, background: '#000000' }}
      aria-label="Da Cultura ao Negócio / From Culture to Business"
    >
      <Kicker n="05" pt="Da Cultura ao Negócio" en="From Culture to Business" />

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
                    size={40}
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
                  <p className="p4-fr__earns">
                    {f.row.earns.pt}
                    <En>{f.row.earns.en}</En>
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

      {/* O titulo do antigo slide 7, menor, junto ao rodape. */}
      <PitchReveal delay={560}>
        <div className="p4-fr__foot">
          <p className="p4-fr__ft">
            {MODEL.headline.pt[0]} <span style={{ color: ACCENT }}>{MODEL.headline.pt[1]}</span>
            <span className="p4-fr__ft-en"> {MODEL.headline.en.join(' ')}</span>
          </p>
          <p className="p4-fr__fl">
            {MODEL.lead.pt}
            <En>{MODEL.lead.en}</En>
          </p>
          <p className="p4-fr__fb">{MODEL.building.pt}</p>
        </div>
      </PitchReveal>

      {open ? (
        <FrontPanel
          front={FRONTS[open.i]}
          from={open.from}
          onClose={() => setOpen(null)}
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
          gap: 0.65rem;
          padding: 0.55rem 0.7rem 0.55rem 0.6rem;
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
          gap: 0.1rem 0.6rem;
        }
        .p4-fr__name {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: -0.02em;
          color: ${PAPER};
        }
        .p4-fr__tag {
          font-family: var(--tbf-font-family-printed);
          font-weight: 600;
          font-size: 0.52rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${ACCENT};
        }
        .p4-fr__tag-en { color: rgba(240, 237, 230, 0.5); font-weight: 400; }
        .p4-fr__earns {
          margin: 0.1rem 0 0;
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: 0.68rem;
          line-height: 1.25;
          color: rgba(240, 237, 230, 0.78);
        }
        .p4-fr__earns .p3-en { font-size: 0.58rem; line-height: 1.15; }
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
        .p4-fr__foot { position: relative; z-index: 1; margin-top: var(--p3-gap-sm); max-width: var(--p3-measure-wide); }
        .p4-fr__ft {
          margin: 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 0.9rem;
          letter-spacing: -0.03em;
          color: ${PAPER};
        }
        .p4-fr__ft-en { font-family: var(--tbf-font-family-printed); font-style: italic; font-weight: 300; font-size: 0.7rem; letter-spacing: 0; color: rgba(240, 237, 230, 0.5); }
        .p4-fr__fl {
          margin: 0.2rem 0 0;
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: 0.64rem;
          line-height: 1.25;
          color: rgba(240, 237, 230, 0.65);
        }
        .p4-fr__fl .p3-en { font-size: 0.56rem; line-height: 1.15; }
        .p4-fr__fb {
          margin: 0.2rem 0 0;
          font-family: var(--tbf-font-family-printed);
          font-size: 0.54rem;
          letter-spacing: 0.04em;
          color: rgba(240, 237, 230, 0.4);
        }
        @media (min-width: 768px) {
          .p4-fr { gap: 0.6rem; max-width: 60rem; margin-top: var(--p3-gap); }
          .p4-fr__row { padding: 0.8rem 1.1rem 0.8rem 0.9rem; gap: 1.1rem; }
          .p4-fr__name { font-size: 1.05rem; }
          .p4-fr__tag { font-size: 0.7rem; }
          .p4-fr__earns { font-size: 0.9rem; }
          .p4-fr__earns .p3-en { font-size: 0.76rem; }
          .p4-fr__ft { font-size: 1.15rem; }
          .p4-fr__ft-en { font-size: 0.85rem; }
          .p4-fr__fl { font-size: 0.82rem; }
          .p4-fr__fl .p3-en { font-size: 0.72rem; }
          .p4-fr__fb { font-size: 0.68rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .p4-fr__row { transition: none; }
        }
      `}</style>
    </section>
  )
}
