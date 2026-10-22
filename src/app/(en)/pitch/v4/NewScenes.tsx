'use client'

// =============================================================================
// PITCH 4.0 · CENAS NOVAS DA RODADA 22/10/2026 b (deck para parceiro estrategico)
// 05 Mercado e Posicao · 07 Como Cada Vertical Ganha + Roadmap · 09 O Que
// Construimos Juntos. Conteudo em `v4-scenes.ts`. Mobile-first, prefixo `.p4-`.
// Sem traco horizontal: o mapa e uma grade de blocos, sem linha de eixo.
// =============================================================================

import { ACCENT, En, Kicker, Numeral, PAPER, PitchReveal, S } from '@/components/DeckShell/DeckShell'
import { MARKET, MODEL, TOGETHER } from '@/content/pitch/v4-scenes'

// ─── CENA 05 · MERCADO E POSICAO ─────────────────────────────────────────────
export function MarketScene() {
  return (
    <section
      id="cena-05"
      style={{ ...S, background: '#000000' }}
      aria-label="Mercado e Posição / Market and Position"
    >
      <Numeral n="05" />
      <Kicker n="05" pt="Mercado e Posição" en="Market and Position" />

      <PitchReveal delay={100} slot="head">
        <h2 className="p3-h2 p3-h2--md">
          {MARKET.headline.pt[0]}
          <br />
          <span style={{ color: ACCENT }}>{MARKET.headline.pt[1]}</span>
          <En size="lead">{MARKET.headline.en.join(' ')}</En>
        </h2>
      </PitchReveal>

      <div className="p4-mk">
        <PitchReveal delay={200}>
          <div className="p4-mk__stats">
            {MARKET.stats.map((s) => (
              <div key={s.value} className="p4-mk__stat">
                <span className="p4-mk__val">{s.value}</span>
                <span className="p4-mk__lab">
                  {s.label.pt}
                  <En>{s.label.en}</En>
                </span>
                <span className="p4-mk__src">{s.source.pt}</span>
              </div>
            ))}
          </div>
        </PitchReveal>

        <PitchReveal delay={320}>
          <p className="p4-mk__q">
            {MARKET.mapTitle.pt}
            <En>{MARKET.mapTitle.en}</En>
          </p>
          <div className="p4-map">
            <span className="p4-map__corner" aria-hidden="true" />
            <span className="p4-map__col">
              {MARKET.axes.local.pt}
              <En>{MARKET.axes.local.en}</En>
            </span>
            <span className="p4-map__col">
              {MARKET.axes.global.pt}
              <En>{MARKET.axes.global.en}</En>
            </span>

            <span className="p4-map__row">
              {MARKET.axes.ip.pt}
              <En>{MARKET.axes.ip.en}</En>
            </span>
            <div className="p4-map__q">
              {MARKET.quadrants.ipLocal.pt}
              <En>{MARKET.quadrants.ipLocal.en}</En>
            </div>
            <div className="p4-map__q p4-map__q--tbf">
              <span className="p4-map__tbf">.TBF.</span>
              <span className="p4-map__tbfline">Propriedade brasileira, alcance global</span>
              <span className="p4-map__tbfen">Brazilian property, global reach</span>
            </div>

            <span className="p4-map__row">
              {MARKET.axes.agency.pt}
              <En>{MARKET.axes.agency.en}</En>
            </span>
            <div className="p4-map__q">
              {MARKET.quadrants.agencyLocal.pt}
              <En>{MARKET.quadrants.agencyLocal.en}</En>
            </div>
            <div className="p4-map__q">
              {MARKET.quadrants.agencyGlobal.pt}
              <En>{MARKET.quadrants.agencyGlobal.en}</En>
            </div>
          </div>
        </PitchReveal>

        <PitchReveal delay={440}>
          <p className="p4-fineprint p4-fineprint--tight">{MARKET.sources.pt}</p>
        </PitchReveal>
      </div>
    </section>
  )
}

// ─── CENA 07 · COMO CADA VERTICAL GANHA + ROADMAP ────────────────────────────
export function ModelScene() {
  return (
    <section
      id="cena-07"
      style={{ ...S, background: '#111110' }}
      aria-label="Como Cada Vertical Ganha / How Each Vertical Earns"
    >
      <Numeral n="07" />
      <Kicker n="07" pt="Como Cada Vertical Ganha" en="How Each Vertical Earns" />

      <PitchReveal delay={100} slot="head">
        <h2 className="p3-h2 p3-h2--md">
          {MODEL.headline.pt[0]}
          <br />
          <span style={{ color: ACCENT }}>{MODEL.headline.pt[1]}</span>
        </h2>
      </PitchReveal>

      <PitchReveal delay={180}>
        <p className="p4-md__lead">
          {MODEL.lead.pt}
          <En>{MODEL.lead.en}</En>
        </p>
      </PitchReveal>

      <ol className="p4-md">
        {MODEL.rows.map((r, i) => (
          <li key={r.name} className="p4-md__li">
            <PitchReveal delay={260 + i * 80}>
              <div className={`p4-md__row p4-md__row--${r.tone}`}>
                <span className="p4-md__n" aria-hidden="true">
                  0{i + 1}
                </span>
                <div className="p4-md__main">
                  <p className="p4-md__top">
                    <span className="p4-md__name">{r.name}</span>
                    <span className="p4-md__tag">
                      {r.tag.pt}
                      <span className="p4-md__tag-en"> / {r.tag.en}</span>
                    </span>
                  </p>
                  <p className="p4-md__earns">
                    {r.earns.pt}
                    <En>{r.earns.en}</En>
                  </p>
                </div>
              </div>
            </PitchReveal>
          </li>
        ))}
      </ol>

      <PitchReveal delay={620}>
        <p className="p4-md__build">
          {MODEL.building.pt}
          <En>{MODEL.building.en}</En>
        </p>
      </PitchReveal>
    </section>
  )
}

// ─── CENA 09 · O QUE CONSTRUIMOS JUNTOS ──────────────────────────────────────
export function TogetherScene() {
  return (
    <section
      id="cena-09"
      style={{ ...S }}
      aria-label="O Que Construímos Juntos / What We Build Together"
    >
      <Numeral n="09" />
      <Kicker n="09" pt="O Que Construímos Juntos" en="What We Build Together" />

      <PitchReveal delay={100} slot="head">
        <h2 className="p3-h2 p3-h2--md">
          {TOGETHER.headline.pt[0]}{' '}
          <span style={{ color: ACCENT }}>{TOGETHER.headline.pt[1]}</span>
          <En size="lead">{TOGETHER.headline.en.join(' ')}</En>
        </h2>
      </PitchReveal>

      <ol className="p4-tg">
        {TOGETHER.milestones.map((m, i) => (
          <li key={m.when} className="p4-tg__li">
            <PitchReveal delay={200 + i * 100}>
              <div className="p4-tg__card">
                <p className="p4-tg__when">
                  <span className="p4-tg__q">{m.when}</span>
                  <span className="p4-tg__kind">
                    {m.kind.pt}
                    <span className="p4-tg__kind-en"> / {m.kind.en}</span>
                  </span>
                </p>
                <p className="p4-tg__goal">
                  {m.goal.pt}
                  <En>{m.goal.en}</En>
                </p>
                <p className="p4-tg__back">
                  {m.back.pt}
                  <En>{m.back.en}</En>
                </p>
              </div>
            </PitchReveal>
          </li>
        ))}
      </ol>

      <PitchReveal delay={560}>
        <p className="p4-tg__ask">
          {TOGETHER.ask.pt}
          <En>{TOGETHER.ask.en}</En>
        </p>
        <p className="p4-fineprint p4-fineprint--tight">
          {TOGETHER.note.pt} / {TOGETHER.note.en}
        </p>
      </PitchReveal>
    </section>
  )
}

// ─── CSS das cenas novas (mobile-first) ──────────────────────────────────────
export function NewScenesStyles() {
  return (
    <style>{`
      /* ─── Cena 05: mercado e mapa ─────────────────────────────────────── */
      .p4-mk {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: var(--p3-gap-sm);
        min-height: 0;
      }
      .p4-mk__stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
      }
      .p4-mk__stat {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        padding: 0.55rem 0.6rem;
        background: #0a0a09;
        border-radius: var(--tbf-radius-card);
      }
      .p4-mk__val {
        font-family: var(--tbf-font-family-display);
        font-weight: 800;
        font-size: clamp(1.25rem, 6vw, 2rem);
        line-height: 1;
        letter-spacing: -0.04em;
        color: ${ACCENT};
      }
      .p4-mk__lab {
        font-family: var(--tbf-font-family-body);
        font-weight: 350;
        font-size: 0.64rem;
        line-height: 1.25;
        color: rgba(240, 237, 230, 0.8);
      }
      .p4-mk__lab .p3-en {
        font-size: 0.58rem;
        line-height: 1.2;
      }
      .p4-mk__src {
        font-family: var(--tbf-font-family-printed);
        font-weight: 500;
        font-size: 0.56rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(240, 237, 230, 0.42);
      }
      .p4-mk__q {
        margin: 0.2rem 0 0.35rem;
        font-family: var(--tbf-font-family-display);
        font-weight: 600;
        font-size: 0.78rem;
        line-height: 1.25;
        color: ${PAPER};
      }
      .p4-mk__q .p3-en { font-size: 0.64rem; line-height: 1.2; font-weight: 300; }

      .p4-map {
        display: grid;
        grid-template-columns: 3.1rem 1fr 1fr;
        grid-template-rows: auto minmax(3.6rem, 1fr) minmax(3.6rem, 1fr);
        gap: 0.3rem;
      }
      .p4-map__col,
      .p4-map__row {
        font-family: var(--tbf-font-family-printed);
        font-weight: 600;
        font-size: 0.58rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(240, 237, 230, 0.6);
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .p4-map__col { align-items: center; text-align: center; }
      .p4-map__col .p3-en,
      .p4-map__row .p3-en { font-size: 0.52rem; letter-spacing: 0.04em; margin-top: 0; }
      .p4-map__q {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0.4rem 0.5rem;
        background: #0a0a09;
        border-radius: var(--tbf-radius-card);
        font-family: var(--tbf-font-family-body);
        font-weight: 350;
        font-size: 0.64rem;
        line-height: 1.2;
        color: rgba(240, 237, 230, 0.7);
      }
      .p4-map__q .p3-en { font-size: 0.56rem; line-height: 1.15; }
      .p4-map__q--tbf {
        background: ${ACCENT};
        color: #000000;
      }
      .p4-map__tbf {
        font-family: var(--tbf-font-family-display);
        font-weight: 800;
        font-size: 1.15rem;
        letter-spacing: -0.04em;
        line-height: 1;
      }
      .p4-map__tbfline {
        margin-top: 0.15rem;
        font-weight: 500;
        font-size: 0.64rem;
        line-height: 1.2;
      }
      .p4-map__tbfen {
        font-family: var(--tbf-font-family-printed);
        font-style: italic;
        font-weight: 400;
        font-size: 0.56rem;
        line-height: 1.15;
        color: rgba(0, 0, 0, 0.7);
      }
      .p4-fineprint--tight { margin-top: 0.25rem; font-size: 0.56rem; }

      /* ─── Cena 07: como ganha + roadmap ───────────────────────────────── */
      .p4-md__lead {
        position: relative;
        z-index: 1;
        margin: 0 0 var(--p3-gap-sm);
        max-width: var(--p3-measure);
        font-family: var(--tbf-font-family-display);
        font-weight: 600;
        font-size: 0.8rem;
        line-height: 1.25;
        color: ${PAPER};
      }
      .p4-md__lead .p3-en { font-size: 0.66rem; line-height: 1.2; font-weight: 300; }
      .p4-md {
        position: relative;
        z-index: 1;
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        max-width: var(--p3-inner);
      }
      .p4-md__li { display: block; }
      .p4-md__row {
        display: flex;
        gap: 0.65rem;
        padding: 0.5rem 0.7rem 0.5rem 0.6rem;
        background: #0a0a09;
        border-left: 3px solid ${PAPER};
        border-radius: var(--tbf-radius-card);
      }
      .p4-md__row--cash { border-left-color: ${ACCENT}; }
      .p4-md__row--bet { border-left-color: rgba(240, 237, 230, 0.35); }
      .p4-md__n {
        flex: none;
        width: 1.7rem;
        font-family: var(--tbf-font-family-printed);
        font-weight: 200;
        font-size: 1.15rem;
        line-height: 1;
        color: rgba(240, 237, 230, 0.35);
      }
      .p4-md__main { min-width: 0; flex: 1 1 auto; }
      .p4-md__top {
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: 0.1rem 0.6rem;
      }
      .p4-md__name {
        font-family: var(--tbf-font-family-display);
        font-weight: 800;
        font-size: 0.72rem;
        letter-spacing: -0.02em;
        color: ${PAPER};
      }
      .p4-md__tag {
        font-family: var(--tbf-font-family-printed);
        font-weight: 600;
        font-size: 0.54rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: ${ACCENT};
      }
      .p4-md__tag-en { color: rgba(240, 237, 230, 0.5); font-weight: 400; }
      .p4-md__earns {
        margin: 0.1rem 0 0;
        font-family: var(--tbf-font-family-body);
        font-weight: 350;
        font-size: 0.7rem;
        line-height: 1.25;
        color: rgba(240, 237, 230, 0.78);
      }
      .p4-md__earns .p3-en { font-size: 0.6rem; line-height: 1.15; }
      .p4-md__build {
        position: relative;
        z-index: 1;
        margin: var(--p3-gap-sm) 0 0;
        max-width: var(--p3-measure-wide);
        font-family: var(--tbf-font-family-body);
        font-weight: 350;
        font-size: 0.66rem;
        line-height: 1.25;
        color: rgba(240, 237, 230, 0.6);
      }
      .p4-md__build .p3-en { font-size: 0.58rem; line-height: 1.15; }

      /* ─── Cena 09: o que construimos juntos ───────────────────────────── */
      .p4-tg {
        position: relative;
        z-index: 1;
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
      .p4-tg__li { display: block; }
      .p4-tg__card {
        padding: 0.4rem 0.7rem;
        background: #0a0a09;
        border-radius: var(--tbf-radius-card);
        border-left: 3px solid ${ACCENT};
      }
      .p4-tg__when {
        margin: 0;
        display: flex;
        align-items: baseline;
        gap: 0.6rem;
      }
      .p4-tg__q {
        flex: none;
        font-family: var(--tbf-font-family-display);
        font-weight: 800;
        font-size: 0.8rem;
        letter-spacing: -0.02em;
        color: ${ACCENT};
      }
      .p4-tg__kind {
        font-family: var(--tbf-font-family-printed);
        font-weight: 600;
        font-size: 0.56rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(240, 237, 230, 0.6);
      }
      .p4-tg__kind-en { font-weight: 400; color: rgba(240, 237, 230, 0.42); }
      .p4-tg__goal {
        margin: 0.2rem 0 0;
        font-family: var(--tbf-font-family-display);
        font-weight: 600;
        font-size: 0.78rem;
        line-height: 1.22;
        color: ${PAPER};
      }
      .p4-tg__back {
        margin: 0.2rem 0 0;
        font-family: var(--tbf-font-family-body);
        font-weight: 350;
        font-size: 0.68rem;
        line-height: 1.22;
        color: rgba(240, 237, 230, 0.72);
      }
      .p4-tg__goal .p3-en,
      .p4-tg__back .p3-en { font-size: 0.6rem; line-height: 1.15; }
      .p4-tg__ask {
        margin: var(--p3-gap-sm) 0 0;
        max-width: var(--p3-measure-wide);
        font-family: var(--tbf-font-family-display);
        font-weight: 700;
        font-size: 0.78rem;
        line-height: 1.2;
        color: ${PAPER};
      }
      .p4-tg__ask .p3-en { font-size: 0.62rem; line-height: 1.2; font-weight: 300; }

      @media (min-width: 768px) {
        .p4-mk {
          flex: 1 1 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr);
          grid-template-rows: auto auto;
          column-gap: clamp(2rem, 5vw, 5rem);
          row-gap: var(--p3-gap);
          align-content: start;
        }
        .p4-mk > .pitch-reveal:nth-child(1) { grid-column: 1; grid-row: 1; }
        .p4-mk > .pitch-reveal:nth-child(2) { grid-column: 2; grid-row: 1; }
        .p4-mk > .pitch-reveal:nth-child(3) { grid-column: 1 / -1; grid-row: 2; }
        .p4-mk__stats { grid-template-columns: 1fr; gap: 0.75rem; }
        .p4-mk__stat { padding: 0.9rem 1rem; gap: 0.3rem; }
        .p4-mk__val { font-size: clamp(2rem, 3.6vw, 3rem); }
        .p4-mk__lab { font-size: 0.85rem; }
        .p4-mk__lab .p3-en { font-size: 0.74rem; }
        .p4-mk__src { font-size: 0.64rem; }
        .p4-mk__q { font-size: 1rem; margin: 0 0 0.6rem; }
        .p4-mk__q .p3-en { font-size: 0.82rem; }
        .p4-map {
          grid-template-columns: 6rem 1fr 1fr;
          grid-template-rows: auto minmax(4rem, 1fr) minmax(4rem, 1fr);
          gap: 0.5rem;
          max-width: 50rem;
        }
        .p4-map__col, .p4-map__row { font-size: 0.7rem; }
        .p4-map__col .p3-en, .p4-map__row .p3-en { font-size: 0.64rem; }
        .p4-map__q { padding: 0.7rem 0.9rem; font-size: 0.85rem; }
        .p4-map__q .p3-en { font-size: 0.72rem; }
        .p4-map__tbf { font-size: 1.7rem; }
        .p4-map__tbfline { font-size: 0.85rem; }
        .p4-map__tbfen { font-size: 0.72rem; }
        .p4-fineprint--tight { font-size: 0.68rem; }

        .p4-md__lead { font-size: 1.1rem; max-width: var(--p3-measure-wide); }
        .p4-md__lead .p3-en { font-size: 0.85rem; }
        .p4-md { gap: 0.6rem; max-width: 60rem; }
        .p4-md__row { padding: 0.8rem 1.1rem 0.8rem 0.9rem; gap: 1.1rem; }
        .p4-md__n { font-size: 1.8rem; width: 2.8rem; }
        .p4-md__name { font-size: 1.05rem; }
        .p4-md__tag { font-size: 0.7rem; }
        .p4-md__earns { font-size: 0.9rem; }
        .p4-md__earns .p3-en { font-size: 0.76rem; }
        .p4-md__build { font-size: 0.82rem; }
        .p4-md__build .p3-en { font-size: 0.72rem; }

        .p4-tg { flex-direction: row; gap: 0.9rem; max-width: 76rem; align-items: stretch; }
        .p4-tg__li { flex: 1 1 0; min-width: 0; display: flex; }
        .p4-tg__li > .pitch-reveal { width: 100%; }
        .p4-tg__card { height: 100%; padding: 1rem 1.1rem; }
        .p4-tg__q { font-size: 1.3rem; }
        .p4-tg__kind { font-size: 0.66rem; }
        .p4-tg__goal { font-size: 1.1rem; margin-top: 0.5rem; }
        .p4-tg__back { font-size: 0.88rem; margin-top: 0.5rem; }
        .p4-tg__goal .p3-en, .p4-tg__back .p3-en { font-size: 0.76rem; }
        .p4-tg__ask { font-size: 1.35rem; max-width: 46rem; margin-top: var(--p3-gap); }
        .p4-tg__ask .p3-en { font-size: 0.95rem; }
      }
      @media (prefers-reduced-motion: reduce) {
        .p4-md__row, .p4-tg__card { transition: none; }
      }
    `}</style>
  )
}
