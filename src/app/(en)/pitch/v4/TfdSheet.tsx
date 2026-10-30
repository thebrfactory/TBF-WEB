'use client'

// =============================================================================
// AREA DE METRICAS DA TFD (pedido 22/10/2026, item 9; refeita na rodada 29/10,
// CHANGES #01, item 138)
// Antes era uma folha modal por cima do deck, que ninguem montava mais. Agora e o
// miolo do popup da TFD na cena 04 (`FrontsScene.tsx`): o grafico das metricas da
// MELFIORE (@thefioredaily), lidas de PRINTS do Media Package.
//   Tela do perfil de 02/06/2026   numeros grandes, com a janela de 30 dias dita.
//   Seguidores                     um ponto por print, no tempo.
//   Visualizacoes por mes          barras, com a fatia de quem nao seguia.
// Cada ponto lista o periodo que o PROPRIO print mostra e a fonte; tocar numa
// linha, num ponto ou numa barra seleciona. Os dados moram em `v4-fronts.ts`; o
// marco do melfiore.com, que nao e metrica do Instagram, em `TFD_METRICS`.
// Sem linha de eixo, sem divisor: so blocos (regra da casa).
// =============================================================================

import { useState } from 'react'
import { ACCENT, En, PAPER } from '@/components/DeckShell/DeckShell'
import { TFD_METRICS } from '@/content/pitch/v4-scenes'
import { TFD_FOLLOWERS, TFD_PROFILE, TFD_VIEWS, type TfdMonth, type TfdPoint } from '@/content/pitch/v4-fronts'
import { TfdChart, type TfdMode } from './TfdChart'

const LAST: Record<TfdMode, string> = {
  followers: TFD_FOLLOWERS[TFD_FOLLOWERS.length - 1].id,
  views: TFD_VIEWS[TFD_VIEWS.length - 1].id,
}

const TABS: { mode: TfdMode; pt: string; en: string }[] = [
  { mode: 'followers', pt: 'Seguidores', en: 'Followers' },
  { mode: 'views', pt: 'Visualizações', en: 'Views' },
]

const pct = (m: TfdMonth) => Math.round((m.nonFollowers ?? 0) * 100)

export function TfdSheet() {
  const [mode, setMode] = useState<TfdMode>('followers')
  const [sel, setSel] = useState<Record<TfdMode, string>>(LAST)

  const pick = (id: string) => setSel((s) => ({ ...s, [mode]: id }))

  const fPoint: TfdPoint | undefined = TFD_FOLLOWERS.find((p) => p.id === sel.followers)
  const vMonth: TfdMonth | undefined = TFD_VIEWS.find((m) => m.id === sel.views)

  return (
    <div className="p4-tm">
      <div className="p4-tm__head">
        <p className="p4-tm__title">
          {TFD_METRICS.title.pt} <span className="p4-tm__en">/ {TFD_METRICS.title.en}</span>
        </p>
        <p className="p4-tm__handle">@thefioredaily · Instagram</p>
      </div>

      <div className="p4-tm__tabs" role="tablist" aria-label="Série do gráfico / Chart series">
        {TABS.map((t) => (
          <button
            key={t.mode}
            type="button"
            role="tab"
            aria-selected={mode === t.mode}
            className="p4-tm__tab"
            onClick={() => setMode(t.mode)}
          >
            {t.pt}
            <span className="p4-tm__tab-en">{t.en}</span>
          </button>
        ))}
      </div>

      {/* O ponto escolhido, em numero grande. */}
      <div className="p4-tm__read" aria-live="polite">
        {mode === 'followers' && fPoint ? (
          <>
            <div className="p4-tm__stat">
              <p className="p4-tm__big">{fPoint.shown.pt}</p>
              <p className="p4-tm__cap">
                {fPoint.label.pt}
                <En>{fPoint.label.en}</En>
              </p>
            </div>
            <p className="p4-tm__meta">
              {fPoint.period.pt} <span className="p4-tm__en">/ {fPoint.period.en}</span>
            </p>
            {fPoint.note ? (
              <p className="p4-tm__note">
                {fPoint.note.pt}
                <En>{fPoint.note.en}</En>
              </p>
            ) : null}
            <p className="p4-tm__src">{fPoint.source.pt}</p>
          </>
        ) : null}

        {mode === 'views' && vMonth && !vMonth.missing ? (
          <>
            <div className="p4-tm__stats">
              <div className="p4-tm__stat">
                <p className="p4-tm__big">{vMonth.shown?.pt}</p>
                <p className="p4-tm__cap">
                  {vMonth.label?.pt}
                  <En>{vMonth.label?.en ?? ''}</En>
                </p>
              </div>
              <div className="p4-tm__stat">
                <p className="p4-tm__big p4-tm__big--accent">{pct(vMonth)}%</p>
                <p className="p4-tm__cap">
                  de quem viu não seguia a conta
                  <En>of viewers were not followers</En>
                </p>
              </div>
            </div>
            <p className="p4-tm__meta">
              {vMonth.period.pt} <span className="p4-tm__en">/ {vMonth.period.en}</span>
            </p>
            {vMonth.shared ? (
              <p className="p4-tm__note">
                {vMonth.shared.pt}
                <En>{vMonth.shared.en}</En>
              </p>
            ) : null}
            {vMonth.source ? <p className="p4-tm__src">{vMonth.source.pt}</p> : null}
          </>
        ) : null}
      </div>

      <TfdChart mode={mode} selected={sel[mode]} onSelect={pick} />

      {mode === 'views' ? (
        <p className="p4-tm__legend">
          <span className="p4-tm__swatch" aria-hidden="true" />
          Parte laranja: visualizações de quem não seguia, na proporção impressa no print.
          <En>Orange part: views from non-followers, in the share printed on the screenshot.</En>
        </p>
      ) : null}

      {/* Cada ponto, com periodo e fonte. */}
      <ul className="p4-tm__list" aria-label="Pontos do gráfico / Chart points">
        {mode === 'followers'
          ? TFD_FOLLOWERS.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="p4-tm__row"
                  aria-pressed={sel.followers === p.id}
                  onClick={() => setSel((s) => ({ ...s, followers: p.id }))}
                >
                  <span className="p4-tm__rv">{p.shown.pt}</span>
                  <span className="p4-tm__rt">
                    <span className="p4-tm__rp">
                      {p.period.pt} <span className="p4-tm__en">/ {p.period.en}</span>
                    </span>
                    {p.note ? <span className="p4-tm__rn">{p.note.pt}</span> : null}
                    <span className="p4-tm__rs">{p.source.pt}</span>
                  </span>
                </button>
              </li>
            ))
          : TFD_VIEWS.map((m) =>
              m.missing ? (
                <li key={m.id} className="p4-tm__gap">
                  <span className="p4-tm__rv p4-tm__rv--off">sem print</span>
                  <span className="p4-tm__rt">
                    <span className="p4-tm__rp">
                      {m.period.pt} <span className="p4-tm__en">/ {m.period.en}</span>
                    </span>
                    <span className="p4-tm__rn">
                      O acervo não tem o print do resumo de março. Sem estimativa.
                      <span className="p4-tm__en"> / No monthly summary screenshot in the archive. No estimate.</span>
                    </span>
                  </span>
                </li>
              ) : (
                <li key={m.id}>
                  <button
                    type="button"
                    className="p4-tm__row"
                    aria-pressed={sel.views === m.id}
                    onClick={() => setSel((s) => ({ ...s, views: m.id }))}
                  >
                    <span className="p4-tm__rv">{m.shown?.pt}</span>
                    <span className="p4-tm__rt">
                      <span className="p4-tm__rp">
                        {m.period.pt} <span className="p4-tm__en">/ {m.period.en}</span>
                      </span>
                      <span className="p4-tm__rn">
                        {m.label?.pt}, {pct(m)}% de não seguidores
                      </span>
                      <span className="p4-tm__rs">{m.source?.pt}</span>
                    </span>
                  </button>
                </li>
              )
            )}
      </ul>

      {/* A tela do perfil: numeros grandes, com a janela dita. */}
      <div className="p4-tm__prof">
        <p className="p4-tm__meta">
          {TFD_PROFILE.period.pt} <span className="p4-tm__en">/ {TFD_PROFILE.period.en}</span>
        </p>
        <div className="p4-tm__pstats">
          {TFD_PROFILE.stats.map((s) => (
            <div key={s.value + s.label.pt} className="p4-tm__pstat">
              <span className="p4-tm__pv">{s.value}</span>
              <span className="p4-tm__pl">
                {s.label.pt}
                <En>{s.label.en}</En>
              </span>
            </div>
          ))}
        </div>
        <p className="p4-tm__src">
          {TFD_PROFILE.window.pt}. {TFD_PROFILE.source.pt}
        </p>
      </div>

      {/* Marco fora do Instagram. */}
      <div className="p4-tm__live">
        <p className="p4-tm__meta">
          {TFD_METRICS.live.period.pt} <span className="p4-tm__en">/ {TFD_METRICS.live.period.en}</span>
        </p>
        <p className="p4-tm__note">
          {TFD_METRICS.live.label.pt}
          <En>{TFD_METRICS.live.label.en}</En>
        </p>
        <p className="p4-tm__src">{TFD_METRICS.live.source.pt}</p>
      </div>

      <style>{`
        .p4-tm { width: 100%; }
        .p4-tm__head { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 0.1rem 0.8rem; }
        .p4-tm__title {
          margin: 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.04em;
          color: ${ACCENT};
        }
        .p4-tm__en { font-family: var(--tbf-font-family-printed); font-style: italic; font-weight: 300; letter-spacing: 0; color: rgba(240, 237, 230, 0.55); }
        .p4-tm__handle {
          margin: 0;
          font-family: var(--tbf-font-family-printed);
          font-weight: 600;
          font-size: 0.66rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240, 237, 230, 0.6);
        }
        .p4-tm__tabs { display: flex; gap: 0.4rem; margin-top: 0.7rem; }
        .p4-tm__tab {
          flex: 1 1 0;
          min-height: 2.75rem;
          padding: 0.3rem 0.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.05rem;
          border: 1px solid rgba(240, 237, 230, 0.28);
          border-radius: var(--tbf-radius-full);
          background: transparent;
          color: ${PAPER};
          font-family: var(--tbf-font-family-body);
          font-weight: 600;
          font-size: 0.78rem;
          line-height: 1.1;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease;
        }
        .p4-tm__tab-en { font-family: var(--tbf-font-family-printed); font-style: italic; font-weight: 300; font-size: 0.6rem; opacity: 0.75; }
        .p4-tm__tab[aria-selected='true'] { background: ${ACCENT}; border-color: ${ACCENT}; color: #000000; }
        .p4-tm__tab:focus-visible, .p4-tm__row:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 2px; }
        .p4-tm__read { margin-top: 1rem; min-height: 9.6rem; }
        .p4-tm__stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.4rem 0.9rem; }
        .p4-tm__stat { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
        .p4-tm__big {
          margin: 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(2.2rem, 11.5vw, 3.4rem);
          line-height: 0.95;
          letter-spacing: -0.045em;
          color: ${PAPER};
        }
        .p4-tm__big--accent { color: ${ACCENT}; }
        .p4-tm__cap { margin: 0; font-family: var(--tbf-font-family-body); font-weight: 350; font-size: 0.78rem; line-height: 1.25; color: rgba(240, 237, 230, 0.85); }
        .p4-tm__cap .p3-en { font-size: 0.66rem; line-height: 1.2; }
        .p4-tm__meta {
          margin: 0.7rem 0 0;
          font-family: var(--tbf-font-family-printed);
          font-weight: 600;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${PAPER};
        }
        .p4-tm__meta .p4-tm__en { text-transform: none; font-weight: 300; letter-spacing: 0.02em; }
        .p4-tm__note { margin: 0.25rem 0 0; font-family: var(--tbf-font-family-body); font-weight: 350; font-size: 0.78rem; line-height: 1.3; color: rgba(240, 237, 230, 0.78); }
        .p4-tm__note .p3-en { font-size: 0.66rem; line-height: 1.2; }
        .p4-tm__src { margin: 0.3rem 0 0; font-family: var(--tbf-font-family-printed); font-size: 0.66rem; line-height: 1.35; letter-spacing: 0.02em; color: rgba(240, 237, 230, 0.58); }
        .p4-tm__legend { margin: 0.5rem 0 0; font-family: var(--tbf-font-family-body); font-weight: 350; font-size: 0.7rem; line-height: 1.3; color: rgba(240, 237, 230, 0.7); }
        .p4-tm__legend .p3-en { font-size: 0.62rem; line-height: 1.2; }
        .p4-tm__swatch { display: inline-block; width: 0.7rem; height: 0.7rem; margin-right: 0.4rem; border-radius: 2px; background: ${ACCENT}; vertical-align: -0.05rem; }
        .p4-tm__list { list-style: none; margin: 0.9rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 0.3rem; }
        .p4-tm__row, .p4-tm__gap {
          width: 100%;
          min-height: 2.75rem;
          display: flex;
          gap: 0.8rem;
          align-items: flex-start;
          padding: 0.6rem 0.75rem;
          text-align: left;
          background: #050505;
          border: 0;
          border-left: 3px solid transparent;
          border-radius: var(--tbf-radius-card);
          color: inherit;
        }
        .p4-tm__row { cursor: pointer; -webkit-tap-highlight-color: transparent; transition: background-color 300ms ease, border-color 300ms ease; }
        .p4-tm__row[aria-pressed='true'] { background: #0d0d0c; border-left-color: ${ACCENT}; }
        .p4-tm__gap { opacity: 0.8; }
        .p4-tm__rv {
          flex: none;
          width: 4.6rem;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 1.05rem;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: ${PAPER};
        }
        .p4-tm__rv--off { font-family: var(--tbf-font-family-printed); font-weight: 600; font-size: 0.66rem; letter-spacing: 0.04em; color: rgba(240, 237, 230, 0.55); }
        .p4-tm__rt { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
        .p4-tm__rp { font-family: var(--tbf-font-family-printed); font-weight: 600; font-size: 0.68rem; letter-spacing: 0.06em; text-transform: uppercase; color: ${PAPER}; }
        .p4-tm__rp .p4-tm__en { text-transform: none; font-weight: 300; letter-spacing: 0.02em; }
        .p4-tm__rn { font-family: var(--tbf-font-family-body); font-weight: 350; font-size: 0.74rem; line-height: 1.3; color: rgba(240, 237, 230, 0.8); }
        .p4-tm__rn .p4-tm__en { font-size: 0.64rem; }
        .p4-tm__rs { font-family: var(--tbf-font-family-printed); font-size: 0.62rem; line-height: 1.3; letter-spacing: 0.02em; color: rgba(240, 237, 230, 0.52); }
        .p4-tm__prof, .p4-tm__live { margin-top: 1.4rem; padding: 0.8rem 0.9rem 0.9rem; background: #050505; border-radius: var(--tbf-radius-card); }
        .p4-tm__prof .p4-tm__meta, .p4-tm__live .p4-tm__meta { margin-top: 0; }
        .p4-tm__pstats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.5rem; margin-top: 0.6rem; }
        .p4-tm__pstat { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
        .p4-tm__pv { font-family: var(--tbf-font-family-display); font-weight: 800; font-size: clamp(0.95rem, 4.6vw, 1.5rem); line-height: 1; letter-spacing: -0.04em; color: ${PAPER}; }
        .p4-tm__pl { font-family: var(--tbf-font-family-body); font-weight: 350; font-size: 0.68rem; line-height: 1.2; color: rgba(240, 237, 230, 0.78); }
        .p4-tm__pl .p3-en { font-size: 0.58rem; line-height: 1.15; }
        @media (min-width: 768px) {
          .p4-tm__title { font-size: 1.8rem; }
          .p4-tm__handle { font-size: 0.72rem; }
          .p4-tm__tab { flex: 0 1 auto; min-width: 11rem; font-size: 0.84rem; }
          .p4-tm__read { min-height: 10.5rem; }
          .p4-tm__cap { font-size: 0.9rem; }
          .p4-tm__cap .p3-en { font-size: 0.76rem; }
          .p4-tm__note { font-size: 0.88rem; }
          .p4-tm__note .p3-en { font-size: 0.76rem; }
          .p4-tm__meta { font-size: 0.74rem; }
          .p4-tm__src { font-size: 0.72rem; }
          .p4-tm__rv { width: 5.4rem; font-size: 1.25rem; }
          .p4-tm__rp { font-size: 0.74rem; }
          .p4-tm__rn { font-size: 0.84rem; }
          .p4-tm__rs { font-size: 0.7rem; }
          .p4-tm__pl { font-size: 0.78rem; }
          .p4-tm__pl .p3-en { font-size: 0.68rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .p4-tm__tab, .p4-tm__row { transition: none; }
        }
      `}</style>
    </div>
  )
}
