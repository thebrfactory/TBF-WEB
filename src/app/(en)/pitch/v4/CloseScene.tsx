'use client'

// =============================================================================
// PITCH 4.0 · CENA 06: PARCEIROS E FECHO (rodada 23/10/2026)
// Fundiu "O que construimos juntos" (09) no fecho (10). Layout da cena 06 do
// pitch v3 (pedido do fundador): duas colunas, a .TBF. a ESQUERDA (ela e quem
// chama parceiros) e QUEM PROCURAMOS a direita. Rodada 26/10 tarde: saiu o bloco de
// metas 2027, o site e o contato; os cards saem so em portugues e centralizados. CNPJ com presenca legivel e
// o enquadramento Inova Simples (fato de `_SHARED/LEGAL-ACCOUNTING`, sem
// vantagem inventada). Conteudo: `PARTNERSHIP_OPEN`, `CLOSE`, `COMPANY`.
// No celular a cena pode passar de uma tela (altura automatica); e a ultima.
// Rodada 29/10 (CHANGES #01, item 140): mais espacamento entre todos os itens,
// em tres degraus (xs, sm, lg) tirados dos tokens do deck. Ver o bloco de CSS.
// =============================================================================

import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { ACCENT, En, Kicker, PAPER, PitchReveal, S } from '@/components/DeckShell/DeckShell'
import { CLOSE, PARTNERSHIP_OPEN } from '@/content/pitch/v3-scenes'
import type { PartnerScene } from '@/content/pitch/v3-scenes'
import { COMPANY } from '@/content/pitch/v4-scenes'

export function CloseScene({ partner = PARTNERSHIP_OPEN }: { partner?: PartnerScene }) {
  const tbf = partner.sides.find((s) => s.who === '.TBF.') ?? partner.sides[1]
  const seek = partner.sides.find((s) => s.who !== '.TBF.') ?? partner.sides[0]
  const cols = [
    { side: tbf, tone: 'accent' as const },
    { side: seek, tone: 'paper' as const },
  ]

  return (
    <section
      id="cena-06"
      style={{ ...S, height: 'auto', minHeight: S.height, background: '#000000', paddingBottom: 'calc(var(--p3-foot) + 1rem)' }}
      aria-label="Parceiros e Fecho / Partners and Close"
    >
      <Kicker n="06" pt="Parceiros e Fecho" en="Partners and Close" />

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
                  </li>
                ))}
              </ul>
            </div>
          </PitchReveal>
        ))}
      </div>

      <div className="p4-cl__close">
        <PitchReveal delay={460}>
          <p className="p4-cl__quote">
            {CLOSE.quote.pt[0]} <span style={{ color: ACCENT }}>{CLOSE.quote.pt[1]}</span>
          </p>
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
        /* RODADA 29/10 (CHANGES #01, item 140): "os itens podem ter mais
           espaçamento". O ritmo vertical sai de TRES degraus, todos em tokens do
           deck (--p3-gap e --p3-gap-lg levam um termo em vh: a janela encolhe, o
           respiro encolhe junto) e do site (--tbf-space-*), nunca em numero solto:
             xs  entre as linhas dentro de um cartao e de um par
             sm  entre itens do mesmo grupo (frase e botoes, CNPJ e endereco)
             lg  entre blocos (titulo, cartoes, frase, botoes, empresa)
           Antes os blocos se tocavam (de 7 a 17px entre eles) e sobravam 170px
           vazios no fim da cena em 1440x900. */
        #cena-06 {
          --p4cl-xs: 0.6rem;
          /* Celular (390x844): a cena cabe na tela e o endereco para 24px acima do
             passador, entao os degraus saem um terco menores que no desktop. */
          --p4cl-sm: calc(var(--p3-gap) * 1.25);
          --p4cl-lg: calc(var(--p3-gap-lg) * 0.75);
        }
        .p4-cl__cols {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--tbf-space-3);
          margin-inline: auto;
          margin-top: var(--p4cl-lg);
        }
        .p4-cl__cols > .pitch-reveal { display: flex; }
        .p4-cl__col {
          width: 100%;
          padding: var(--tbf-space-3) var(--tbf-space-3) var(--tbf-space-4);
          background: #050505;
          border-top: 2px solid ${PAPER};
          border-radius: var(--tbf-radius-card);
        }
        .p4-cl__col--accent { border-top-color: ${ACCENT}; }
        .p4-cl__who {
          margin: 0 0 var(--p4cl-xs);
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: -0.02em;
          line-height: 1.05;
          color: ${PAPER};
        }
        .p4-cl__col--accent .p4-cl__who { color: ${ACCENT}; }
        .p4-cl__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--p4cl-xs); }
        .p4-cl__li {
          font-family: var(--tbf-font-family-body);
          font-weight: 400;
          font-size: 0.64rem;
          line-height: 1.22;
          color: rgba(240, 237, 230, 0.85);
        }
        .p4-cl__close {
          position: relative;
          z-index: 1;
          margin-top: var(--p4cl-lg);
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
        .p4-cl__btns { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--tbf-space-3); margin-top: var(--p4cl-sm); }
        .p4-cl__co {
          margin-top: var(--p4cl-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: calc(var(--p3-gap) * 0.8);
        }
        .p4-cl__cnpj { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
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
          gap: 0.45rem;
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
        /* Tablet (768 a 1023): os mesmos degraus do celular, com mais letra e cartao. */
        @media (min-width: 768px) {
          .p4-cl__cols { gap: 1.25rem; max-width: 76rem; margin-inline: auto; }
          .p4-cl__col { padding: var(--tbf-space-4) var(--tbf-space-6); }
          .p4-cl__who { font-size: 1.25rem; margin-bottom: var(--tbf-space-4); }
          .p4-cl__list { gap: var(--tbf-space-3); }
          .p4-cl__li { font-size: 0.86rem; }
          .p4-cl__btns { gap: var(--tbf-space-4); }
          .p4-cl__co { gap: var(--p4cl-sm) 3rem; flex-direction: row; flex-wrap: wrap; justify-content: center; }
          .p4-cl__cnpj-l { font-size: 0.72rem; }
          .p4-cl__cnpj-n { font-size: 1.45rem; }
          .p4-cl__inova { flex-direction: row; text-align: left; align-items: center; gap: 0.8rem; font-size: 0.9rem; max-width: 34rem; }
          .p4-cl__inova .p3-en { font-size: 0.76rem; }
          .p4-cl__badge { font-size: 0.7rem; flex: none; }
          .p4-cl__addr { flex-basis: 100%; text-align: center; font-size: 0.78rem; }
        }
        /* Desktop (1024+): os degraus inteiros, um terco maiores que no celular. */
        @media (min-width: 1024px) {
          #cena-06 {
            --p4cl-sm: calc(var(--p3-gap) * 1.5);
            --p4cl-lg: var(--p3-gap-lg);
          }
        }
        /* Janela baixa (laptop, 1366x768): os degraus encolhem em proporcao e a
           cena continua inteira na tela. Abaixo de 740px de altura nem assim ela
           cabe, e a frase final sai (era a regra de antes, que valia ate 960px). */
        @media (min-width: 768px) and (max-height: 860px) {
          #cena-06 {
            --p4cl-sm: calc(var(--p3-gap) * 1.2);
            --p4cl-lg: calc(var(--p3-gap-lg) * 0.6);
          }
          .p4-cl__col { padding: var(--tbf-space-3) var(--tbf-space-5); }
          .p4-cl__who { margin-bottom: 0.6rem; }
          .p4-cl__list { gap: 0.5rem; }
        }
        @media (min-width: 768px) and (max-height: 740px) {
          .p4-cl__quote { display: none; }
        }
      `}</style>
    </section>
  )
}
