'use client'

// =============================================================================
// PITCH 4.0 · CENA 07: PARCEIROS, MARCOS E FECHO (rodada 23/10/2026)
// Fundiu "O que construimos juntos" (09) no fecho (10). Layout da cena 06 do
// pitch v3 (pedido do fundador): duas colunas, a .TBF. a ESQUERDA (ela e quem
// chama parceiros) e QUEM PROCURAMOS a direita. Os tres marcos de 2027 entram
// enxutos; o fecho segue com site, e-mail e botoes. CNPJ com presenca legivel e
// o enquadramento Inova Simples (fato de `_SHARED/LEGAL-ACCOUNTING`, sem
// vantagem inventada). Conteudo: `PARTNERSHIP_OPEN`, `CLOSE`, `TOGETHER`, `COMPANY`.
// No celular a cena pode passar de uma tela (altura automatica); e a ultima.
// =============================================================================

import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { ACCENT, En, Kicker, PAPER, PitchReveal, S } from '@/components/DeckShell/DeckShell'
import { CLOSE, PARTNERSHIP_OPEN } from '@/content/pitch/v3-scenes'
import type { PartnerScene } from '@/content/pitch/v3-scenes'
import { COMPANY, TOGETHER } from '@/content/pitch/v4-scenes'

export function CloseScene({ partner = PARTNERSHIP_OPEN }: { partner?: PartnerScene }) {
  const tbf = partner.sides.find((s) => s.who === '.TBF.') ?? partner.sides[1]
  const seek = partner.sides.find((s) => s.who !== '.TBF.') ?? partner.sides[0]
  const cols = [
    { side: tbf, tone: 'accent' as const },
    { side: seek, tone: 'paper' as const },
  ]

  return (
    <section
      id="cena-07"
      style={{ ...S, height: 'auto', minHeight: S.height, background: '#000000', paddingBottom: 'calc(var(--p3-foot) + 1rem)' }}
      aria-label="Parceiros e Fecho / Partners and Close"
    >
      <Kicker n="07" pt="Parceiros e Fecho" en="Partners and Close" />

      <PitchReveal delay={100} slot="head">
        <h2 className="p3-h2 p3-h2--md">
          {partner.question.pt[0]}
          <br />
          {partner.question.pt[1]}
          <En size="lead">{partner.question.en.join(' ')}</En>
        </h2>
      </PitchReveal>

      <div className="p4-cl__cols">
        {cols.map(({ side, tone }, ci) => (
          <PitchReveal key={side.who} delay={200 + ci * 90}>
            <div className={`p4-cl__col p4-cl__col--${tone}`}>
              <p className="p4-cl__who">{side.who}</p>
              <ul className="p4-cl__list">
                {side.lines.map((l) => (
                  <li key={l.pt} className="p4-cl__li">
                    {l.pt}
                    <En>{l.en}</En>
                  </li>
                ))}
              </ul>
            </div>
          </PitchReveal>
        ))}
      </div>

      <PitchReveal delay={380}>
        <ol className="p4-cl__ms">
          {TOGETHER.milestones.map((m) => (
            <li key={m.when} className="p4-cl__m">
              <span className="p4-cl__mq">{m.when}</span>
              <span className="p4-cl__mg">
                {m.goal.pt}
                <En>{m.goal.en}</En>
              </span>
            </li>
          ))}
        </ol>
        <p className="p4-cl__note">
          {TOGETHER.note.pt} / {TOGETHER.note.en}
        </p>
      </PitchReveal>

      <div className="p4-cl__close">
        <PitchReveal delay={460}>
          <p className="p4-cl__quote">
            {CLOSE.quote.pt[0]} <span style={{ color: ACCENT }}>{CLOSE.quote.pt[1]}</span>
          </p>
          <p className="p4-cl__site">{CLOSE.site}</p>
          <p className="p4-cl__mail">{CLOSE.email}</p>
        </PitchReveal>

        <PitchReveal delay={540}>
          <div className="p4-cl__btns">
            {CLOSE.links.map((link, i) => {
              const cls = link.external ? 'btn btn--ghost' : i === 0 ? 'btn btn--primary' : 'btn btn--secondary'
              return link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {link.label} &#8594;
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={cls}>
                  {link.label} &#8594;
                </Link>
              )
            })}
          </div>
        </PitchReveal>

        <PitchReveal delay={620}>
          <div className="p4-cl__co">
            <p className="p4-cl__cnpj">
              <span className="p4-cl__cnpj-l">{COMPANY.legalName} · CNPJ</span>
              <span className="p4-cl__cnpj-n">{COMPANY.cnpj}</span>
            </p>
            <p className="p4-cl__inova">
              <span className="p4-cl__badge">{COMPANY.regime}</span>
              <span>
                {COMPANY.regimeText.pt}
                <En>{COMPANY.regimeText.en}</En>
              </span>
            </p>
            <p className="p4-cl__addr">{COMPANY.address}</p>
          </div>
        </PitchReveal>
      </div>

      <style>{`
        .p4-cl__cols {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-top: var(--p3-gap-sm);
        }
        .p4-cl__cols > .pitch-reveal { display: flex; }
        .p4-cl__col {
          width: 100%;
          padding: 0.6rem 0.6rem 0.7rem;
          background: #050505;
          border-top: 2px solid ${PAPER};
          border-radius: var(--tbf-radius-card);
        }
        .p4-cl__col--accent { border-top-color: ${ACCENT}; }
        .p4-cl__who {
          margin: 0 0 0.4rem;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: -0.02em;
          line-height: 1.05;
          color: ${PAPER};
        }
        .p4-cl__col--accent .p4-cl__who { color: ${ACCENT}; }
        .p4-cl__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.35rem; }
        .p4-cl__li {
          font-family: var(--tbf-font-family-body);
          font-weight: 400;
          font-size: 0.64rem;
          line-height: 1.22;
          color: rgba(240, 237, 230, 0.85);
        }
        .p4-cl__li .p3-en { font-size: 0.55rem; line-height: 1.15; }
        .p4-cl__ms {
          position: relative;
          z-index: 1;
          list-style: none;
          margin: var(--p3-gap-sm) 0 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.4rem;
        }
        .p4-cl__m {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0.5rem 0.5rem 0.55rem;
          background: #050505;
          border-left: 2px solid ${ACCENT};
          border-radius: var(--tbf-radius-card);
        }
        .p4-cl__mq { font-family: var(--tbf-font-family-display); font-weight: 800; font-size: 0.78rem; letter-spacing: -0.02em; color: ${ACCENT}; }
        .p4-cl__mg { font-family: var(--tbf-font-family-body); font-weight: 400; font-size: 0.6rem; line-height: 1.2; color: rgba(240, 237, 230, 0.85); }
        .p4-cl__mg .p3-en { font-size: 0.52rem; line-height: 1.12; }
        .p4-cl__note {
          position: relative;
          z-index: 1;
          margin: 0.3rem 0 0;
          font-family: var(--tbf-font-family-printed);
          font-size: 0.54rem;
          letter-spacing: 0.04em;
          color: rgba(240, 237, 230, 0.4);
        }
        .p4-cl__close {
          position: relative;
          z-index: 1;
          margin-top: var(--p3-gap);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .p4-cl__quote {
          margin: 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 0.82rem;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: ${PAPER};
        }
        .p4-cl__site { margin: 0.7rem 0 0; font-family: var(--tbf-font-family-display); font-weight: 800; font-size: 1.25rem; letter-spacing: -0.03em; color: ${PAPER}; }
        .p4-cl__mail { margin: 0.1rem 0 0; font-family: var(--tbf-font-family-printed); font-size: 0.8rem; color: ${ACCENT}; overflow-wrap: anywhere; }
        .p4-cl__btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 0.8rem; }
        .p4-cl__co {
          margin-top: 1.1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
        }
        .p4-cl__cnpj { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 0.1rem; }
        .p4-cl__cnpj-l {
          font-family: var(--tbf-font-family-printed);
          font-weight: 600;
          font-size: 0.64rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(240, 237, 230, 0.7);
        }
        .p4-cl__cnpj-n {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 1.2rem;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
          color: ${PAPER};
        }
        .p4-cl__inova {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          max-width: 26rem;
          font-family: var(--tbf-font-family-body);
          font-weight: 400;
          font-size: 0.74rem;
          line-height: 1.25;
          color: rgba(240, 237, 230, 0.85);
        }
        .p4-cl__inova .p3-en { font-size: 0.64rem; line-height: 1.2; }
        .p4-cl__badge {
          padding: 0.2rem 0.65rem;
          border-radius: var(--tbf-radius-full);
          background: ${ACCENT};
          font-family: var(--tbf-font-family-printed);
          font-weight: 700;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: #000000;
        }
        .p4-cl__addr { margin: 0; font-family: var(--tbf-font-family-body); font-size: 0.66rem; line-height: 1.3; color: rgba(240, 237, 230, 0.6); }
        @media (min-width: 768px) {
          .p4-cl__cols { gap: 1.25rem; max-width: 76rem; margin-top: var(--p3-gap); }
          .p4-cl__col { padding: 0.8rem 1.2rem 0.9rem; }
          .p4-cl__who { font-size: 1.25rem; margin-bottom: 0.45rem; }
          .p4-cl__list { gap: 0.4rem; }
          .p4-cl__li { font-size: 0.86rem; }
          .p4-cl__li .p3-en { font-size: 0.72rem; }
          .p4-cl__ms { max-width: 76rem; gap: 1rem; margin-top: var(--p3-gap); }
          .p4-cl__m { flex-direction: row; align-items: baseline; gap: 0.9rem; padding: 0.5rem 1rem; }
          .p4-cl__mq { font-size: 1.15rem; flex: none; }
          .p4-cl__mg { font-size: 0.85rem; }
          .p4-cl__mg .p3-en { font-size: 0.7rem; }
          .p4-cl__note { font-size: 0.66rem; }
          .p4-cl__quote { font-size: 1rem; }
          .p4-cl__close { margin-top: var(--p3-gap-sm); }
          .p4-cl__co { margin-top: 0.7rem; }
          .p4-cl__site { font-size: 1.5rem; margin-top: 0.4rem; }
          .p4-cl__mail { font-size: 1rem; }
          .p4-cl__co { flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 0.6rem 2.2rem; }
          .p4-cl__cnpj-l { font-size: 0.72rem; }
          .p4-cl__cnpj-n { font-size: 1.45rem; }
          .p4-cl__inova { flex-direction: row; text-align: left; align-items: center; gap: 0.8rem; font-size: 0.9rem; max-width: 34rem; }
          .p4-cl__inova .p3-en { font-size: 0.76rem; }
          .p4-cl__badge { font-size: 0.7rem; flex: none; }
          .p4-cl__addr { flex-basis: 100%; text-align: center; font-size: 0.78rem; }
        }
        @media (min-width: 768px) and (max-height: 960px) {
          .p4-cl__quote { display: none; }
        }
      `}</style>
    </section>
  )
}
