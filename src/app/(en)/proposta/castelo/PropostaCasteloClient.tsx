'use client'

// =============================================================================
// PROPOSTA · HOSTEL CASTELO — composição das 8 telas
// -----------------------------------------------------------------------------
// O QUE ESTE ARQUIVO FAZ: compõe. Todo o texto, os números, as fontes e a linha
// entre o que é apresentável e o que é interno moram em
// `src/content/propostas/castelo.ts`. Revisar copy ou corrigir uma data acontece
// LÁ, sem tocar em layout, que é a mesma separação do deck 3.0.
//
// O LAYOUT NÃO É CÓPIA DO PITCH: é o mesmo casco. Geometria de uma cena por
// tela, kicker ancorado, numeral marca-d'água, camada de tradução PT/EN,
// passador e todo o CSS vêm de `@/components/DeckShell/DeckShell`. O fundador
// pediu o layout do pitch "como exemplo"; usar o componente em vez de duplicar
// significa que qualquer ajuste de régua no formato chega nas duas peças.
//
// A PROVA É EMPRESTADA DA OFERTA ABERTA. As catorze fotos do Ô de Casa vêm de
// `@/content/i18n/pages/hospitality`, o mesmo módulo que alimenta
// /creators/tavaristico/hospitality. Não existe segunda cópia da seleção nem das
// legendas: a proposta endereçada mostra exatamente o que a oferta aberta mostra.
//
// O QUE ESTA PEÇA NÃO TEM, e é decisão, não esquecimento: roteiro de conversa,
// minutagem, texto de mensagem, perguntas ao anfitrião e leitura de fraquezas do
// negócio deles. Isso é material de uso interno do fundador e vive na pasta de
// pesquisa, fora do site.
// =============================================================================

import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { StoryDeck } from '@/components/StoryPlayer/StoryPlayer'
import { SHOTS } from '@/content/i18n/pages/hospitality'
import {
  ACCENT,
  PAPER,
  DeckNav,
  DeckStyles,
  En,
  GridRuler,
  Kicker,
  Numeral,
  PitchReveal,
  S,
} from '@/components/DeckShell/DeckShell'
import {
  SCENES,
  COVER,
  PROBLEM,
  ENGINES,
  PROOF,
  AUTHOR,
  CASTELO,
  OFFER,
  AGREEMENT,
} from '@/content/propostas/castelo'

export function PropostaCasteloClient() {
  return (
    <div className="p3-deck">
      <DeckNav scenes={SCENES} total="07" />
      <GridRuler />

      {/* ── CENA 00 · CAPA ──────────────────────────────────────────────────
             A única tela com foto sangrada. Ela abre com a piscina do trabalho
             anterior porque a proposta inteira é sobre o que uma imagem faz
             antes de qualquer texto: a capa da peça se comporta como a capa de
             um anúncio. O crédito embaixo diz que a foto é do Ô de Casa, e não
             do Castelo, para não haver um segundo de confusão. */}
      <section id="cena-00" style={{ ...S, justifyContent: 'flex-end', paddingTop: 0 }} aria-label="Capa / Cover">
        <div className="pc-cover-media" aria-hidden="true">
          <Image
            src={COVER.media.src}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <span className="pc-cover-veil" />
        </div>

        <div className="pc-cover-body">
          <PitchReveal delay={80}>
            <p className="p3-eyebrow p3-eyebrow--accent">
              {COVER.eyebrow.pt}
              <En>{COVER.eyebrow.en}</En>
            </p>
          </PitchReveal>

          <PitchReveal delay={180}>
            {/* OS DOIS NOMES EM LINHAS PRÓPRIAS, com o cruzamento sozinho no
                meio. Em linha corrida o `×` era empurrado para a beirada pela
                quebra natural do telefone e virava um símbolo solto no fim de
                uma linha; sozinho, ele lê como o que é: duas partes. */}
            <h1 className="pc-cover-title">
              <span className="pc-cover-title__line">{COVER.title[0]}</span>
              <span className="pc-cross" aria-hidden="true">
                {COVER.cross}
              </span>
              <span className="pc-cover-title__line">{COVER.title[1]}</span>
            </h1>
          </PitchReveal>

          <PitchReveal delay={300}>
            <p className="p3-body" style={{ maxWidth: 'var(--p3-measure-wide)' }}>
              {COVER.line.pt}
              <En>{COVER.line.en}</En>
            </p>
          </PitchReveal>

          <PitchReveal delay={420}>
            <p className="p3-assert" style={{ marginTop: 'var(--p3-gap-sm)' }}>
              {COVER.thesis.pt}
              <En size="lead">{COVER.thesis.en}</En>
            </p>
          </PitchReveal>

          <PitchReveal delay={540}>
            <p className="p3-footnote pc-credit">
              {COVER.credit.pt}
              <En>{COVER.credit.en}</En>
            </p>
          </PitchReveal>
        </div>
      </section>

      {/* ── CENA 01 · O PROBLEMA ─────────────────────────────────────────── */}
      <section id="cena-01" style={{ ...S }} aria-label="O Problema / The Problem">
        <Numeral n="01" />
        <Kicker n="01" pt="O Problema" en="The Problem" />

        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2">
            {PROBLEM.headline.pt[0]}
            <br />
            <span style={{ color: ACCENT }}>{PROBLEM.headline.pt[1]}</span>
            <En size="lead">{PROBLEM.headline.en.join(' ')}</En>
          </h2>
        </PitchReveal>

        <PitchReveal delay={220}>
          <p className="p3-body" style={{ maxWidth: 'var(--p3-measure-wide)' }}>
            {PROBLEM.body.pt}
            <En>{PROBLEM.body.en}</En>
          </p>
        </PitchReveal>

        <PitchReveal delay={360}>
          <p className="p3-assert p3-assert--lg" style={{ marginTop: 'var(--p3-gap)' }}>
            {PROBLEM.thesis.pt}
            <En size="lead">{PROBLEM.thesis.en}</En>
          </p>
        </PitchReveal>

        <PitchReveal delay={460}>
          <p className="p3-body p3-body--dim">
            {PROBLEM.thesisSub.pt}
            <En>{PROBLEM.thesisSub.en}</En>
          </p>
        </PitchReveal>
      </section>

      {/* ── CENA 02 · O QUE OS MOTORES PREMIAM ────────────────────────────
             Quatro afirmações e três números. Os números entram DEPOIS do
             argumento, de propósito: eles não provam o argumento, eles tiram a
             conversa do gosto pessoal. Cada um carrega a fonte ao lado. */}
      <section id="cena-02" style={{ ...S }} aria-label="Os Motores de Reserva / The Booking Engines">
        <Numeral n="02" />
        <Kicker n="02" pt="Os Motores" en="The Engines" />

        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2 p3-h2--md">
            {ENGINES.headline.pt}
            <En size="lead">{ENGINES.headline.en}</En>
          </h2>
        </PitchReveal>

        <div className="p3-os-grid pc-points">
          {ENGINES.points.map((p, i) => (
            <PitchReveal key={p.n} delay={200 + i * 80}>
              <div>
                <p className="p3-kicker-mini" style={{ color: ACCENT }}>
                  {p.n}
                </p>
                <p className="p3-item-title">
                  {p.title.pt}
                  <En>{p.title.en}</En>
                </p>
                <p className="p3-item-desc">
                  {p.body.pt}
                  {/* A dobra em inglês do CORPO é terciária: no telefone, quatro
                      pontos com título e corpo nos dois idiomas somavam 249px
                      além da tela (medido). O que some é a tradução do
                      comentário; o título segue bilíngue nas duas larguras. */}
                  <span className="p3-tertiary">
                    <En>{p.body.en}</En>
                  </span>
                </p>
              </div>
            </PitchReveal>
          ))}
        </div>

        <PitchReveal delay={560}>
          <div className="p3-proof__stats pc-stats">
            {ENGINES.stats.map((s) => (
              <div key={s.value} className="p3-proof__stat">
                <span className="p3-proof__value">{s.value}</span>
                <span className="p3-proof__label">
                  {s.label.pt}
                  <span className="p3-tertiary">
                    <En>{s.label.en}</En>
                  </span>
                </span>
                <span className="pc-source">{s.source}</span>
              </div>
            ))}
          </div>
        </PitchReveal>
      </section>

      {/* ── CENA 03 · A PROVA ──────────────────────────────────────────────
             O anúncio rodando sozinho, com as catorze do Ô de Casa. Mesma
             mecânica da cena 05 do deck: `p3-deck-flat` desmonta a pilha do
             StoryDeck para o quadro dividir a linha com o texto e a fila de
             miniaturas correr embaixo. */}
      <section id="cena-03" style={{ ...S }} aria-label="A Prova / The Proof">
        <Numeral n="03" />
        <Kicker n="03" pt="A Prova" en="The Proof" />

        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2 p3-h2--md">
            {PROOF.line.pt}
            <En size="lead">{PROOF.line.en}</En>
          </h2>
        </PitchReveal>

        <PitchReveal delay={170}>
          <p className="p3-assert">
            {PROOF.lead.pt}
            <En size="lead">{PROOF.lead.en}</En>
          </p>
        </PitchReveal>

        <div className="p3-case-layout pc-proof">
          <StoryDeck
            deckClassName="p3-deck-flat"
            playerClassName="p3-story"
            thumbsClassName="p3-thumbs"
            handle="Ô"
            avatarSrc="/images/creators/tavaristico/o-avatar.webp"
            label={PROOF.headline.pt}
            items={SHOTS.map((s) => ({ src: s.src, alt: s.alt.pt, role: s.role.pt }))}
          />

          <div className="pc-proof-copy">
            <PitchReveal delay={240}>
              <p className="p3-label">{PROOF.headline.pt}</p>
            </PitchReveal>
            <PitchReveal delay={320}>
              <p className="p3-body">
                {PROOF.body.pt}
                <span className="p3-tertiary">
                  <En>{PROOF.body.en}</En>
                </span>
              </p>
            </PitchReveal>
            <PitchReveal delay={420}>
              <p className="p3-footnote">
                <Link href={PROOF.link.href} className="pc-link">
                  {PROOF.link.label.pt} &#8594;
                </Link>
              </p>
            </PitchReveal>
          </div>
        </div>
      </section>

      {/* ── CENA 04 · QUEM ASSINA ─────────────────────────────────────────── */}
      <section id="cena-04" style={{ ...S }} aria-label="Quem Assina / Who Signs It">
        <Numeral n="04" />
        <Kicker n="04" pt="Quem Assina" en="Who Signs" />

        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2 p3-h2--md">
            {AUTHOR.name}
            <span className="pc-alias">{AUTHOR.alias}</span>
          </h2>
        </PitchReveal>

        <PitchReveal delay={220}>
          <p className="p3-assert">
            {AUTHOR.role.pt}
            <En size="lead">{AUTHOR.role.en}</En>
          </p>
        </PitchReveal>

        <PitchReveal delay={320}>
          <p className="p3-body" style={{ maxWidth: 'var(--p3-measure-wide)' }}>
            {AUTHOR.bio.pt}
            <En>{AUTHOR.bio.en}</En>
          </p>
        </PitchReveal>

        <PitchReveal delay={420}>
          <ul className="pc-credits">
            {AUTHOR.credits.map((c) => (
              <li key={c.pt} className="p3-item-desc">
                {c.pt}
              </li>
            ))}
          </ul>
        </PitchReveal>

        <PitchReveal delay={520}>
          <p className="p3-footnote">
            <Link href={AUTHOR.link.href} className="pc-link">
              {AUTHOR.link.label.pt} &#8594;
            </Link>
          </p>
        </PitchReveal>
      </section>

      {/* ── CENA 05 · O CASTELO VISTO DE FORA ─────────────────────────────
             Dois lados, como a cena de parceria do deck, e pelo mesmo motivo:
             a forma já diz o argumento antes da leitura. À esquerda o que a casa
             tem, à direita o que a vitrine ainda não mostra. Nenhum dos dois
             lados é uma crítica ao serviço, e a nota de rodapé diz de onde veio
             a leitura e em que data. */}
      <section id="cena-05" style={{ ...S }} aria-label="O Castelo Hoje / Castelo Today">
        <Numeral n="05" />
        <Kicker n="05" pt="O Castelo Hoje" en="Castelo Today" />

        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2 p3-h2--md">
            {CASTELO.headline.pt[0]}
            <br />
            <span style={{ color: ACCENT }}>{CASTELO.headline.pt[1]}</span>
            <En size="lead">{CASTELO.headline.en.join(' ')}</En>
          </h2>
        </PitchReveal>

        <div className="p3-partner-grid">
          {CASTELO.sides.map((side, i) => {
            const color = side.color === 'accent' ? ACCENT : PAPER
            return (
              <PitchReveal key={side.who.pt} delay={220 + i * 120}>
                <div className="pc-side" style={{ borderTop: `2px solid ${color}` }}>
                  <p className="p3-partner-name" style={{ color }}>
                    {side.who.pt}
                  </p>
                  {side.lines.map((line) => (
                    <p key={line.pt} className="p3-partner-line">
                      {line.pt}
                      <En>{line.en}</En>
                    </p>
                  ))}
                </div>
              </PitchReveal>
            )
          })}
        </div>

        <PitchReveal delay={520}>
          <p className="p3-footnote p3-tertiary">
            {CASTELO.note.pt}
            <En>{CASTELO.note.en}</En>
          </p>
        </PitchReveal>
      </section>

      {/* ── CENA 06 · A PROPOSTA ──────────────────────────────────────────── */}
      <section id="cena-06" style={{ ...S }} aria-label="A Proposta / The Proposal">
        <Numeral n="06" />
        <Kicker n="06" pt="A Proposta" en="The Proposal" />

        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2 p3-h2--md">
            {OFFER.headline.pt}
            <En size="lead">{OFFER.headline.en}</En>
          </h2>
        </PitchReveal>

        <div className="p3-chain pc-groups">
          {OFFER.groups.map((g, i) => (
            <PitchReveal key={g.n} delay={200 + i * 70}>
              <div className="p3-chain__node">
                <span className="p3-chain__n">{g.n}</span>
                <p className="p3-chain__title">
                  {g.title.pt}
                  <En>{g.title.en}</En>
                </p>
                <p className="p3-item-desc">
                  {g.body.pt}
                  <span className="p3-tertiary">
                    <En>{g.body.en}</En>
                  </span>
                </p>
              </div>
            </PitchReveal>
          ))}
        </div>

        <PitchReveal delay={560}>
          <ul className="pc-deliverables">
            {OFFER.deliverables.map((d) => (
              <li key={d.pt} className="p3-item-desc">
                {d.pt}
                <En>{d.en}</En>
              </li>
            ))}
          </ul>
        </PitchReveal>
      </section>

      {/* ── CENA 07 · O COMBINADO ─────────────────────────────────────────
             O escopo escrito é parte da oferta. Ele fecha a peça porque é o que
             transforma boa vontade em combinado, e porque diz o que NÃO está
             incluído: proposta que não escreve o limite cobra o limite depois. */}
      <section id="cena-07" style={{ ...S }} aria-label="O Combinado / The Agreement">
        <Numeral n="07" />
        <Kicker n="07" pt="O Combinado" en="The Agreement" />

        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2 p3-h2--md">
            {AGREEMENT.headline.pt}
            <En size="lead">{AGREEMENT.headline.en}</En>
          </h2>
        </PitchReveal>

        <dl className="pc-terms">
          {AGREEMENT.terms.map((t, i) => (
            <PitchReveal key={t.k.pt} delay={180 + i * 60}>
              <div className="pc-term">
                <dt className="p3-label">{t.k.pt}</dt>
                <dd className="p3-item-desc">
                  {t.v.pt}
                  <En>{t.v.en}</En>
                </dd>
              </div>
            </PitchReveal>
          ))}
        </dl>

        <PitchReveal delay={480}>
          <p className="p3-footnote pc-scope">
            <span className="p3-label">{AGREEMENT.scope.k.pt}</span> {AGREEMENT.scope.v.pt}
            <span className="p3-tertiary">
              <En>{AGREEMENT.scope.v.en}</En>
            </span>
          </p>
        </PitchReveal>

        {/* O FECHO NÃO É CITAÇÃO. Nasceu com `p3-quote`, que é o corpo do fecho
            do deck do pitch: ali a frase é a última tela inteira, aqui ela
            divide a cena com o combinado e com o contato. Em corpo de citação
            ela estourava a tela em 190px no telefone e 183px no desktop
            (medido), e competia com a headline da própria cena. */}
        <PitchReveal delay={540}>
          <p className="p3-assert p3-assert--lg pc-close">
            {AGREEMENT.close.pt[0]}
            <br />
            <span style={{ color: ACCENT }}>{AGREEMENT.close.pt[1]}</span>
            <En size="lead">{AGREEMENT.close.en.join(' ')}</En>
          </p>
        </PitchReveal>

        <PitchReveal delay={620}>
          <div className="pc-contact">
            <a href={`mailto:${AGREEMENT.contact.mail}`} className="p3-contact-mail">
              {AGREEMENT.contact.mail}
            </a>
            <span className="p3-contact-site">{AGREEMENT.contact.site}</span>
            {/* O INSTAGRAM SAIU DESTA TELA. Ele fazia o contato virar três itens,
                a terceira linha caía em cima do passador no telefone (medido:
                14px) e nenhum dos três ganhava peso. Numa proposta, o endereço
                que importa é o que recebe resposta. O perfil continua no rodapé
                do site, a um toque de distância. */}
          </div>
        </PitchReveal>

        <PitchReveal delay={700}>
          <p className="p3-legal p3-tertiary">{AGREEMENT.legal}</p>
        </PitchReveal>
      </section>

      <DeckStyles />

      {/* ── O pouco que é só desta peça ───────────────────────────────────
             Tudo que o formato já resolve vem do casco. Aqui ficam apenas as
             formas que o deck do pitch não tem: a capa com foto sangrada, a
             fila de termos do combinado e três ajustes de grade. Prefixo `pc-`
             para nunca colidir com o `p3-` compartilhado. */}
      <style>{`
        .pc-cover-media {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        /* O véu existe para o texto ter contraste sem escurecer a foto inteira:
           denso embaixo, onde o texto mora, e quase limpo em cima, onde a água
           precisa continuar aparecendo. */
        .pc-cover-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.92) 0%,
            rgba(0, 0, 0, 0.78) 34%,
            rgba(0, 0, 0, 0.34) 68%,
            rgba(0, 0, 0, 0.12) 100%
          );
        }
        .pc-cover-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: var(--p3-gap-sm);
        }
        .pc-cover-title {
          font-family: var(--font-brother), system-ui, sans-serif;
          font-weight: 900;
          line-height: 0.94;
          letter-spacing: -0.02em;
          color: ${PAPER};
          font-size: clamp(1.9rem, min(7.2vw, 6.4vh), 4.6rem);
          text-transform: uppercase;
          margin: 0;
        }
        /* O cruz entre os dois nomes é o menor elemento da capa e diz a coisa
           mais importante dela: são duas partes, não um fornecedor. */
        .pc-cross {
          color: ${ACCENT};
          font-weight: 300;
        }
        .pc-cover-title__line {
          display: block;
        }
        /* O cruzamento fica na própria linha, pequeno, alinhado à esquerda:
           é uma articulação entre os dois nomes, não um terceiro nome. */
        .pc-cross {
          display: block;
          margin: 0.06em 0;
          font-size: 0.5em;
        }
        .pc-scope {
          margin-top: var(--p3-gap-sm);
          opacity: 0.72;
        }
        .pc-credit {
          margin-top: var(--p3-gap-sm);
          opacity: 0.62;
        }
        .pc-points {
          margin-top: var(--p3-gap-sm);
        }
        /* Três números numa fila, sempre. Em flex-wrap cada um caia numa
           linha assim que o rótulo crescia, e a fila virava lista. */
        .pc-stats {
          margin-top: var(--p3-gap);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.85rem;
          align-items: start;
        }
        .pc-source {
          display: block;
          font-family: var(--font-brother-printed), system-ui, sans-serif;
          font-style: italic;
          font-weight: 300;
          font-size: 0.62rem;
          letter-spacing: 0.04em;
          opacity: 0.5;
          margin-top: 0.2rem;
        }
        .pc-proof {
          margin-top: var(--p3-gap-sm);
        }
        .pc-proof-copy {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .pc-alias {
          display: block;
          color: ${ACCENT};
        }
        .pc-credits,
        .pc-deliverables {
          list-style: none;
          padding: 0;
          margin: var(--p3-gap-sm) 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .pc-credits li::before,
        .pc-deliverables li::before {
          content: '·';
          color: ${ACCENT};
          margin-right: 0.5rem;
        }
        .pc-side {
          padding-top: 0.6rem;
        }
        .pc-groups {
          margin-top: var(--p3-gap-sm);
        }
        /* O combinado é uma fila de pares, e no telefone cada par empilha:
           rótulo em cima, valor embaixo. Tabela de duas colunas em 390px
           espreme o valor até três palavras por linha. */
        .pc-terms {
          margin: var(--p3-gap-sm) 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .pc-term {
          display: grid;
          gap: 0.1rem;
        }
        .pc-close {
          margin-top: var(--p3-gap);
        }
        .pc-contact {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.75rem 1.25rem;
          margin-top: var(--p3-gap-sm);
        }
        .pc-link {
          color: ${ACCENT};
          text-decoration: none;
        }
        .pc-link:hover {
          text-decoration: underline;
        }

        /* ── O aperto do telefone ─────────────────────────────────────────
           Duas cenas nascem mais cheias que as outras seis e passavam da tela em
           390px: a dos motores (quatro pontos mais três números) e a do
           combinado (quatro termos mais fecho e contato). O ajuste é de RITMO,
           não de conteúdo: nada some, o texto só respira menos onde a tela é
           menor. Medido no iPhone 13, cena a cena. */
        @media (max-width: 767px) {
          .pc-points .p3-item-desc {
            font-size: 0.72rem;
            line-height: 1.32;
          }
          .pc-stats {
            margin-top: var(--p3-gap-sm);
            gap: 0.5rem 0.9rem;
          }
          .pc-stats .p3-proof__value {
            font-size: 1.35rem;
          }
          .pc-stats .p3-proof__label {
            font-size: 0.6rem;
            line-height: 1.25;
          }
          .pc-source {
            font-size: 0.55rem;
            margin-top: 0.1rem;
          }
          .pc-terms {
            gap: 0.4rem;
          }
          .pc-contact {
            gap: 0.4rem 0.9rem;
          }
        }

        @media (min-width: 768px) {
          .pc-term {
            grid-template-columns: minmax(9rem, 1fr) 3fr;
            gap: 1.25rem;
            align-items: baseline;
          }
        }
      `}</style>
    </div>
  )
}
