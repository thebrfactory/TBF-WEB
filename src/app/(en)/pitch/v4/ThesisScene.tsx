'use client'

// =============================================================================
// PITCH 4.0 · CENA 02: ABERTURA + A PERGUNTA, A TESE E O MERCADO
// (rodada 23/10/2026; fundida na abertura na rodada 26/10 tarde)
// RODADA 26/10 TARDE: a antiga cena 04 virou uma camada DENTRO da cena 02, sobre o
// mesmo video. A cena abre com o letreiro de abertura (passo -1). O primeiro
// toque tira o letreiro e traz a pergunta; os toques seguintes seguem os passos
// abaixo; depois do ultimo, o toque volta ao letreiro. O video escurece quando a
// tese esta aberta (texto sobre imagem leva overlay).
// Pedido do fundador: "muito texto logo de cara. entrar uma informacao por vez.
// clicar na primeira parte de texto expande o resto, transicoes suaves e
// elegantes". A cena abre so com a pergunta. Cada clique (ou toque, ou Enter e
// Espaco no titulo) revela o passo seguinte, um por vez:
//   1 primeira pergunta · 2 segunda pergunta · 3 a tese · 4 a cadeia ·
//   5 o dado de mercado e o lugar da .TBF. (migrou da antiga cena 05).
// Com tudo aberto, clicar no titulo recolhe. Mobile-first, prefixo `.p4-th`.
// =============================================================================

import { Fragment, useState, type ReactNode } from 'react'
import { ACCENT, EASE, En, Kicker, PAPER, PitchReveal, S } from '@/components/DeckShell/DeckShell'
import { ARGUMENT } from '@/content/pitch/v3-scenes'
import { THESIS_MARKET } from '@/content/pitch/v4-scenes'

const STEPS = 5
// Passo -1 = letreiro de abertura; 0 a 5 = a tese.

// `fold`: no celular, a partir deste passo o bloco recolhe para dar lugar ao
// resto (a tese responde as perguntas). No desktop ele fica na tela.
function Step({ at, step, fold, wide, children }: { at: number; step: number; fold?: number; wide?: boolean; children: React.ReactNode }) {
  const on = step >= at
  const folded = fold !== undefined && step >= fold
  return (
    <div className={`p4-th__step${on ? ' p4-th__step--on' : ''}${folded ? ' p4-th__step--fold' : ''}${wide ? ' p4-th__step--wide' : ''}`} aria-hidden={!on}>
      <div className="p4-th__step-inner">{children}</div>
    </div>
  )
}

export function OpeningScene({ background, cover }: { background: ReactNode; cover: ReactNode }) {
  const [step, setStep] = useState(-1)
  const open = step >= 0
  const done = step >= STEPS
  const advance = () => setStep((s) => (s >= STEPS ? -1 : s + 1))
  const market = THESIS_MARKET

  return (
    <section
      id="cena-02"
      style={{ ...S, justifyContent: 'flex-end', padding: 0, background: '#000000' }}
      aria-label="Abertura e Tese / Opening and Thesis"
    >
      {background}
      <div className={`p4-th__dim${open ? ' p4-th__dim--on' : ''}`} aria-hidden="true" />

      <div className={`p4-th__cover${open ? ' p4-th__cover--off' : ''}`} aria-hidden={open} inert={open}>
        {cover}
      </div>

      <div className={`p4-th__layer${open ? ' p4-th__layer--on' : ''}`} aria-hidden={!open} inert={!open}>
      <Kicker n="02" pt="A Pergunta e a Tese" en="The Question and the Thesis" />

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

        <Step at={3} step={step} wide>
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

        <Step at={4} step={step} wide>
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

        <Step at={5} step={step} wide>
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
      </div>

      <button type="button" className="p4-th__hint" onClick={advance} aria-label={done ? 'Voltar à abertura / Back to opening' : 'Continuar / Continue'}>
        <span className="p4-th__dots" aria-hidden="true">
          {Array.from({ length: STEPS + 2 }, (_, i) => (
            <span key={i} className={`p4-th__dot${i <= step + 1 ? ' p4-th__dot--on' : ''}`} />
          ))}
        </span>
        <span>{done ? 'Toque para voltar / Tap to go back' : 'Toque para continuar / Tap to continue'}</span>
      </button>

      <style>{`
        .p4-th__dim {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: rgba(0, 0, 0, 0.82);
          opacity: 0;
          pointer-events: none;
          transition: opacity 700ms ${EASE};
        }
        .p4-th__dim--on { opacity: 1; }
        .p4-th__cover {
          position: relative;
          z-index: 1;
          transition: opacity 600ms ${EASE}, transform 700ms ${EASE}, visibility 0s linear 0s;
        }
        .p4-th__cover--off {
          opacity: 0;
          transform: translateY(-14px);
          visibility: hidden;
          transition: opacity 500ms ${EASE}, transform 600ms ${EASE}, visibility 0s linear 600ms;
        }
        .p4-th__layer {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          padding-inline: var(--p3-pad-x);
          padding-top: var(--p3-kicker-reserve);
          padding-bottom: var(--p3-foot);
          opacity: 0;
          visibility: hidden;
          transition: opacity 500ms ${EASE}, visibility 0s linear 500ms;
        }
        .p4-th__layer--on {
          opacity: 1;
          visibility: visible;
          transition: opacity 700ms ${EASE} 250ms, visibility 0s linear 0s;
        }
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
          /* No celular a tese inteira so cabe sem a linha em ingles da cadeia e
             do dado de mercado; sem isto ela encosta no indicador do rodape. */
          .p4-th__chain .p3-en,
          .p4-th__lab .p3-en,
          .p4-th__line .p3-en { display: none; }
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
        .p4-th__thesis .p3-kicker-mini .p3-en { display: none; }
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
        /* Rodada 26/10: indicador FIXO no rodapé da cena, mesma coordenada em
           todo passo (nao anda com o conteudo). Fica logo acima da faixa dos
           controles (timer a esquerda, contador e setas a direita). */
        .p4-th__hint {
          position: absolute;
          z-index: 2;
          left: var(--p3-pad-x);
          bottom: calc(var(--p3-foot) - 1.15rem);
          margin: 0;
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
          /* As duas perguntas lado a lado: poupa a altura que a tese inteira
             precisa para nao encostar no indicador do rodape. */
          .p4-th { margin-top: var(--p3-gap); display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 0.75rem; align-content: start; }
          .p4-th__step--wide { grid-column: 1 / -1; }
          .p4-th__chain { margin-top: 0.4rem; }
          .p4-th__mk { margin-top: 0.45rem; }
          .p4-th__q { margin-bottom: 0.4rem; padding: 0.6rem 1rem; }
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
        @media (min-width: 768px) and (max-height: 960px) {
          .p4-th__chain .p3-en,
          .p4-th__lab .p3-en { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .p4-th__step, .p4-th__dot, .p4-th__cover, .p4-th__layer, .p4-th__dim { transition: none; }
        }
      `}</style>
    </section>
  )
}
