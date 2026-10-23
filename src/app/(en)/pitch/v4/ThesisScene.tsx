'use client'

// =============================================================================
// PITCH 4.0 · CENA 04: A PERGUNTA, A TESE E O MERCADO (rodada 23/10/2026)
// Pedido do fundador: "muito texto logo de cara. entrar uma informacao por vez.
// clicar na primeira parte de texto expande o resto, transicoes suaves e
// elegantes". A cena abre so com a pergunta. Cada clique (ou toque, ou Enter e
// Espaco no titulo) revela o passo seguinte, um por vez:
//   1 primeira pergunta · 2 segunda pergunta · 3 a tese · 4 a cadeia ·
//   5 o dado de mercado e o lugar da .TBF. (migrou da antiga cena 05).
// Com tudo aberto, clicar no titulo recolhe. Mobile-first, prefixo `.p4-th`.
// =============================================================================

import { Fragment, useState } from 'react'
import { ACCENT, EASE, En, Kicker, PAPER, PitchReveal, S } from '@/components/DeckShell/DeckShell'
import { ARGUMENT } from '@/content/pitch/v3-scenes'
import { THESIS_MARKET } from '@/content/pitch/v4-scenes'

const STEPS = 5

// `fold`: no celular, a partir deste passo o bloco recolhe para dar lugar ao
// resto (a tese responde as perguntas). No desktop ele fica na tela.
function Step({ at, step, fold, children }: { at: number; step: number; fold?: number; children: React.ReactNode }) {
  const on = step >= at
  const folded = fold !== undefined && step >= fold
  return (
    <div className={`p4-th__step${on ? ' p4-th__step--on' : ''}${folded ? ' p4-th__step--fold' : ''}`} aria-hidden={!on}>
      <div className="p4-th__step-inner">{children}</div>
    </div>
  )
}

export function ThesisScene() {
  const [step, setStep] = useState(0)
  const done = step >= STEPS
  const advance = () => setStep((s) => (s >= STEPS ? 0 : s + 1))
  const market = THESIS_MARKET

  return (
    <section
      id="cena-04"
      style={{ ...S, background: '#000000' }}
      aria-label="A Pergunta e a Tese / The Question and the Thesis"
    >
      <Kicker n="04" pt="A Pergunta e a Tese" en="The Question and the Thesis" />

      <PitchReveal delay={100} slot="head">
        <h2 className="p3-h2 p3-h2--md p4-th__h2">
          <button
            type="button"
            className="p4-th__head"
            onClick={advance}
            aria-expanded={step > 0}
            aria-controls="p4-th-body"
          >
            {ARGUMENT.question.headline.pt[0]}
            <br />
            <span style={{ color: ACCENT }}>{ARGUMENT.question.headline.pt[1]}</span>
            <En size="lead">{ARGUMENT.question.headline.en.join(' ')}</En>
          </button>
        </h2>
      </PitchReveal>

      <div id="p4-th-body" className="p4-th">
        <Step at={1} step={step} fold={3}>
          <p className="p4-th__q">
            {ARGUMENT.question.items[0].pt}
            <En>{ARGUMENT.question.items[0].en}</En>
          </p>
        </Step>
        <Step at={2} step={step} fold={3}>
          <p className="p4-th__q">
            {ARGUMENT.question.items[1].pt}
            <En>{ARGUMENT.question.items[1].en}</En>
          </p>
        </Step>

        <Step at={3} step={step}>
          <div className="p4-th__thesis">
            <p className="p3-kicker-mini">
              {ARGUMENT.thesis.kicker.pt}
              <En>{ARGUMENT.thesis.kicker.en}</En>
            </p>
            <p className="p3-thesis-line p4-th__line">
              {ARGUMENT.thesis.lines[0].pt}
              <br />
              <span style={{ color: ACCENT }}>{ARGUMENT.thesis.lines[1].pt}</span>
              <En size="lead">{ARGUMENT.thesis.lines.map((l) => l.en).join(' ')}</En>
            </p>
          </div>
        </Step>

        <Step at={4} step={step}>
          <div className="p3-chain p4-th__chain">
            {ARGUMENT.thesis.chain.map((c, i) => (
              <Fragment key={c.pt}>
                <div className="p3-chain__node">
                  <span className="p3-chain__n">0{i + 1}</span>
                  <p
                    className="p3-chain__title"
                    style={{ color: i === ARGUMENT.thesis.chain.length - 1 ? ACCENT : PAPER }}
                  >
                    {c.pt}
                  </p>
                  <En>{c.en}</En>
                </div>
                {i < ARGUMENT.thesis.chain.length - 1 && (
                  <span className="p3-chain__arrow" aria-hidden="true">
                    &#8594;
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </Step>

        <Step at={5} step={step}>
          <div className="p4-th__mk">
            <div className="p4-th__stat">
              <span className="p4-th__val">{market.stat.value}</span>
              <span className="p4-th__lab">
                {market.stat.label.pt}
                <En>{market.stat.label.en}</En>
              </span>
            </div>
            <div className="p4-th__tbf">
              <span className="p4-th__tbf-name">.TBF.</span>
              <span className="p4-th__tbf-line">
                {market.tbf.label.pt}
                <span className="p4-th__tbf-en">{market.tbf.label.en}</span>
              </span>
            </div>
            <p className="p4-th__src">{market.source.pt}</p>
          </div>
        </Step>
      </div>

      <button type="button" className="p4-th__hint" onClick={advance} aria-label={done ? 'Recolher / Collapse' : 'Continuar / Continue'}>
        <span className="p4-th__dots" aria-hidden="true">
          {Array.from({ length: STEPS + 1 }, (_, i) => (
            <span key={i} className={`p4-th__dot${i <= step ? ' p4-th__dot--on' : ''}`} />
          ))}
        </span>
        <span>{done ? 'Toque para recolher / Tap to collapse' : 'Toque para continuar / Tap to continue'}</span>
      </button>

      <style>{`
        .p4-th__head {
          display: block;
          width: 100%;
          padding: 0;
          border: 0;
          background: none;
          color: inherit;
          font: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          text-align: left;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .p4-th__head:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 6px; }
        .p4-th {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
          margin-top: var(--p3-gap-sm);
          max-width: var(--p3-measure-wide);
        }
        .p4-th__step {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transform: translateY(14px);
          filter: blur(6px);
          pointer-events: none;
          transition: grid-template-rows 800ms ${EASE}, opacity 700ms ${EASE} 120ms, transform 800ms ${EASE} 120ms, filter 700ms ${EASE} 120ms;
        }
        .p4-th__step--on {
          grid-template-rows: 1fr;
          opacity: 1;
          transform: none;
          filter: none;
          pointer-events: auto;
        }
        .p4-th__step-inner { min-height: 0; overflow: hidden; }
        @media (max-width: 767px) {
          .p4-th__step--fold { grid-template-rows: 0fr; opacity: 0; transform: translateY(-10px); }
        }
        .p4-th__q {
          margin: 0 0 0.55rem;
          padding: 0.55rem 0.75rem;
          background: #050505;
          border-top: 2px solid ${ACCENT};
          border-radius: var(--tbf-radius-card);
          font-family: var(--tbf-font-family-display);
          font-weight: 600;
          font-size: 0.9rem;
          line-height: 1.2;
          color: ${PAPER};
        }
        .p4-th__q .p3-en { font-size: 0.68rem; line-height: 1.15; font-weight: 300; }
        .p4-th__thesis { padding-top: 0.2rem; }
        .p4-th__line { margin: 0; font-size: clamp(1.1rem, 5.4vw, 1.9rem); }
        .p4-th__chain { margin-top: 0.7rem; }
        .p4-th__mk {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-top: 0.7rem;
        }
        .p4-th__stat,
        .p4-th__tbf {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0.6rem 0.65rem;
          background: #050505;
          border-radius: var(--tbf-radius-card);
        }
        .p4-th__tbf { background: ${ACCENT}; color: #000000; }
        .p4-th__val {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(1.5rem, 8vw, 2.4rem);
          line-height: 1;
          letter-spacing: -0.04em;
          color: ${ACCENT};
        }
        .p4-th__lab {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: 0.66rem;
          line-height: 1.25;
          color: rgba(240, 237, 230, 0.8);
        }
        .p4-th__lab .p3-en { font-size: 0.58rem; line-height: 1.15; }
        .p4-th__tbf-name {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(1.5rem, 8vw, 2.4rem);
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .p4-th__tbf-line {
          display: flex;
          flex-direction: column;
          font-family: var(--tbf-font-family-body);
          font-weight: 500;
          font-size: 0.68rem;
          line-height: 1.2;
        }
        .p4-th__tbf-en {
          font-family: var(--tbf-font-family-printed);
          font-style: italic;
          font-weight: 400;
          font-size: 0.58rem;
          color: rgba(0, 0, 0, 0.7);
        }
        .p4-th__src {
          grid-column: 1 / -1;
          margin: 0;
          font-family: var(--tbf-font-family-printed);
          font-size: 0.54rem;
          letter-spacing: 0.04em;
          color: rgba(240, 237, 230, 0.4);
        }
        .p4-th__hint {
          position: relative;
          z-index: 2;
          margin-top: var(--p3-gap-sm);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0;
          background: none;
          border: 0;
          cursor: pointer;
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${ACCENT};
          -webkit-tap-highlight-color: transparent;
        }
        .p4-th__dots { display: inline-flex; gap: 0.25rem; }
        .p4-th__dot {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          background: rgba(240, 237, 230, 0.2);
          transition: background 500ms ${EASE};
        }
        .p4-th__dot--on { background: ${ACCENT}; }
        @media (min-width: 768px) {
          .p4-th { margin-top: var(--p3-gap); }
          .p4-th__q { font-size: 1.25rem; padding: 0.8rem 1rem; }
          .p4-th__q .p3-en { font-size: 0.9rem; }
          .p4-th__mk { grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 0.75rem; max-width: 44rem; }
          .p4-th__stat, .p4-th__tbf { padding: 0.9rem 1rem; }
          .p4-th__lab { font-size: 0.85rem; }
          .p4-th__lab .p3-en { font-size: 0.74rem; }
          .p4-th__tbf-line { font-size: 0.9rem; }
          .p4-th__tbf-en { font-size: 0.74rem; }
          .p4-th__src { font-size: 0.66rem; }
          .p4-th__hint { font-size: 0.68rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .p4-th__step, .p4-th__dot { transition: none; }
        }
      `}</style>
    </section>
  )
}
