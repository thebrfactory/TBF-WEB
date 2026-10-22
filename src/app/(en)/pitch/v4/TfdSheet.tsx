'use client'

// =============================================================================
// AREA DE METRICAS DA TFD (pedido 22/10/2026, item 9)
// Abre ao clicar no cartao de .THE FIORE DAILY. na cena 06. Os numeros nao
// moram no cartao: moram aqui, cada um com o seu periodo. Fonte e criterio de
// cada bloco em `TFD_METRICS` (v4-scenes.ts). Painel por cima do deck, foco
// preso no botao de fechar, Esc fecha. Botao e `.btn` (pilula do PRESS ROOM).
// =============================================================================

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { ACCENT, En, PAPER } from '@/components/DeckShell/DeckShell'
import { TFD_METRICS, VERTICAL_STORIES } from '@/content/pitch/v4-scenes'
import { BUSINESS } from '@/content/pitch/v3-scenes'

export function TfdSheet({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = BUSINESS.portfolio.find((p) => p.name === '.THE FIORE DAILY.')
  const avatar = VERTICAL_STORIES['.THE FIORE DAILY.']?.avatar

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!item) return null

  return (
    <div className="p4-ms" role="dialog" aria-modal="true" aria-label="Métricas de .THE FIORE DAILY. / Metrics">
      <div className="p4-ms__scrim" onClick={onClose} aria-hidden="true" />
      <div className="p4-ms__panel">
        <div className="p4-ms__head">
          {avatar ? (
            <Image src={avatar} alt="" width={96} height={96} className="p4-ms__avatar" />
          ) : null}
          <div className="p4-ms__id">
            <p className="p3-portfolio-name p4-ms__name" style={{ color: PAPER }}>
              {item.name}
            </p>
            <p className="p4-ms__role">
              {item.role.pt}
              <En>{item.role.en}</En>
            </p>
          </div>
          <button ref={closeRef} type="button" className="btn btn--ghost p4-ms__close" onClick={onClose}>
            Fechar / Close
          </button>
        </div>

        <div className="p4-ms__body">
          <p className="p4-ms__title">
            {TFD_METRICS.title.pt} <span className="p4-ms__title-en">/ {TFD_METRICS.title.en}</span>
          </p>

          {TFD_METRICS.groups.map((g) => (
            <section key={g.period.pt} className="p4-ms__group">
              <p className="p4-ms__period">
                {g.period.pt}
                <span className="p4-ms__period-en"> / {g.period.en}</span>
              </p>
              <div className="p4-ms__stats">
                {g.stats.map((s) => (
                  <div key={s.value + s.label.pt} className="p4-ms__stat">
                    <span className="p4-ms__val">{s.value}</span>
                    <span className="p4-ms__lab">
                      {s.label.pt}
                      <En>{s.label.en}</En>
                    </span>
                  </div>
                ))}
              </div>
              <p className="p4-ms__src">{g.source.pt}</p>
            </section>
          ))}

          <p className="p4-ms__field">
            <span className="p3-label">Por que existe</span>
            {item.why.pt}
          </p>
          <p className="p4-ms__field">
            <span className="p3-label">Como ganha forma</span>
            {item.forms.pt}
          </p>
          <Link href={item.href} className="p4-ms__link">
            Ver página &#8594;
          </Link>
        </div>
      </div>

      <style>{`
        .p4-ms {
          position: fixed;
          inset: 0;
          z-index: var(--tbf-z-modal, 90);
          display: flex;
          align-items: flex-end;
        }
        .p4-ms__scrim {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.82);
        }
        .p4-ms__panel {
          position: relative;
          width: 100%;
          max-height: 100%;
          display: flex;
          flex-direction: column;
          background: #0a0a09;
          border-radius: var(--tbf-radius-card) var(--tbf-radius-card) 0 0;
          overflow: hidden;
        }
        .p4-ms__head {
          flex: none;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem var(--p3-pad-x, 1.25rem) 0.6rem;
        }
        .p4-ms__avatar {
          flex: none;
          width: 2.6rem;
          height: 2.6rem;
          border-radius: var(--tbf-radius-full);
          object-fit: cover;
        }
        .p4-ms__id { min-width: 0; flex: 1 1 auto; }
        .p4-ms .p4-ms__name {
          margin: 0;
          font-size: 0.8rem;
          letter-spacing: -0.03em;
          line-height: 1.1;
          white-space: normal;
        }
        .p4-ms__role {
          margin: 0.15rem 0 0;
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: 0.66rem;
          line-height: 1.25;
          color: rgba(240, 237, 230, 0.62);
        }
        .p4-ms__role .p3-en { font-size: 0.6rem; line-height: 1.15; }
        .p4-ms__close {
          flex: none;
          font-size: 0.62rem;
          padding: 0.5rem 0.9rem;
          min-height: 2.2rem;
        }
        .p4-ms__body {
          flex: 1 1 auto;
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 0.4rem var(--p3-pad-x, 1.25rem) 1.5rem;
        }
        .p4-ms__title {
          margin: 0 0 0.5rem;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.04em;
          color: ${ACCENT};
        }
        .p4-ms__title-en {
          font-family: var(--tbf-font-family-printed);
          font-style: italic;
          font-weight: 300;
          font-size: 0.95rem;
          letter-spacing: 0;
          color: rgba(240, 237, 230, 0.55);
        }
        .p4-ms__group { margin: 0 0 0.9rem; }
        .p4-ms__period {
          margin: 0 0 0.35rem;
          font-family: var(--tbf-font-family-printed);
          font-weight: 600;
          font-size: 0.66rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${PAPER};
        }
        .p4-ms__period-en { font-weight: 400; color: rgba(240, 237, 230, 0.5); }
        .p4-ms__stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(7.2rem, 1fr));
          gap: 0.4rem;
        }
        .p4-ms__stat {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0.6rem 0.7rem;
          background: #111110;
          border-radius: var(--tbf-radius-card);
        }
        .p4-ms__val {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 1.5rem;
          line-height: 1;
          letter-spacing: -0.04em;
          color: ${PAPER};
        }
        .p4-ms__lab {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: 0.68rem;
          line-height: 1.25;
          color: rgba(240, 237, 230, 0.75);
        }
        .p4-ms__lab .p3-en { font-size: 0.6rem; line-height: 1.15; }
        .p4-ms__src {
          margin: 0.3rem 0 0;
          font-family: var(--tbf-font-family-printed);
          font-weight: 400;
          font-size: 0.58rem;
          letter-spacing: 0.04em;
          color: rgba(240, 237, 230, 0.42);
        }
        .p4-ms__field {
          margin: 0.6rem 0 0;
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: 0.74rem;
          line-height: 1.4;
          color: rgba(240, 237, 230, 0.72);
        }
        .p4-ms__field .p3-label { display: block; margin-bottom: 0.1rem; color: ${ACCENT}; }
        .p4-ms__link {
          display: inline-block;
          margin-top: 0.7rem;
          padding: 0.3rem 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          text-decoration: none;
          color: ${ACCENT};
        }
        @media (min-width: 768px) {
          .p4-ms { align-items: center; justify-content: center; }
          .p4-ms__panel {
            width: min(46rem, 92vw);
            max-height: 86vh;
            border-radius: var(--tbf-radius-card);
          }
          .p4-ms__head { padding: 1.2rem 1.6rem 0.8rem; }
          .p4-ms__avatar { width: 3.2rem; height: 3.2rem; }
          .p4-ms .p4-ms__name { font-size: 1rem; }
          .p4-ms__role { font-size: 0.8rem; }
          .p4-ms__role .p3-en { font-size: 0.72rem; }
          .p4-ms__close { font-size: 0.7rem; }
          .p4-ms__body { padding: 0.6rem 1.6rem 1.8rem; }
          .p4-ms__title { font-size: 2rem; }
          .p4-ms__period { font-size: 0.74rem; }
          .p4-ms__val { font-size: 2.1rem; }
          .p4-ms__lab { font-size: 0.82rem; }
          .p4-ms__lab .p3-en { font-size: 0.72rem; }
          .p4-ms__src { font-size: 0.68rem; }
          .p4-ms__field { font-size: 0.86rem; }
        }
      `}</style>
    </div>
  )
}
