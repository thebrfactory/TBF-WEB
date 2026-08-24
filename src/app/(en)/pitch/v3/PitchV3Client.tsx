'use client'

// =============================================================================
// PITCH 3.0 CLIENT · working deck, 7 cenas
// -----------------------------------------------------------------------------
// NASCEU CÓPIA DA 2.0 (pedido do fundador 2026-08-08). É cópia de propósito, e
// esta é a única exceção consciente à regra 4 do ecossistema ("apontar, não
// copiar"): a 3.0 existe justamente para DIVERGIR da 2.0 sem tocar nela — a 2.0
// continua sendo o deck que já foi apresentado, e não pode mudar por tabela.
//
// 13 MOVIMENTOS → 7 CENAS (2026-08-12). O conteúdo e os dados saíram deste
// arquivo e foram para `src/content/pitch/v3-scenes.ts`: este componente só
// COMPÕE. O mapa completo de que movimento virou que cena está documentado lá,
// no cabeçalho do módulo.
//
// AUTOCONTIDA: todo o CSS do deck vive no bloco de estilo no fim deste arquivo,
// com prefixo próprio (.p3-*, --p3-*). Editar a 3.0 não alcança a 2.0, e
// vice-versa. Se algum dia as duas convergirem de novo, aí sim vale extrair o
// que for comum — não antes.
//
// AJUSTE DE LAYOUT que veio da 2.0 (pedido do fundador 2026-08-08): o kicker de
// cada cena é ANCORADO logo abaixo do letreiro, igual nas 7 cenas.
//
// DUAL LANGUAGE (pedido do fundador): português é a voz principal, inglês entra
// logo abaixo, pequeno e discreto. A distinção não é só de tamanho, é de
// FAMÍLIA: PT usa Brother1816, EN usa Brother1816Printed Light Italic. As duas
// famílias já vinham carregadas no site (32 faces) e nunca tinham sido postas
// para trabalhar juntas. É essa a evolução do design system nesta página.
//
// ESCALA TIPOGRÁFICA DO DECK (variações da Brother efetivamente usadas):
//   Printed Thin 100 ....... numeral marca-d'água de cada cena
//   Printed Light 300 it ... toda a camada de tradução (EN)
//   Printed Medium 500 ..... kickers, rótulos, contadores
//   Book 350 ............... corpo de texto PT
//   Bold 700 ............... afirmações e destaques
//   ExtraBold 800 .......... títulos de item
//   Black 900 .............. headlines
//
// A 1.0 (/pitch) está congelada, então NADA aqui importa dela. O wordmark mora
// em TbfWordmark.tsx desde a 2.1, para o corpo do deck caber na cabeça.
// =============================================================================

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { PressLogosCarousel } from '../PressLogosCarousel'
import { HeroVideo } from '@/components/HeroVideo/HeroVideo'
import { HomeHero } from '@/components/HomeHero/HomeHero'
import { Ticker } from '@/components/Ticker/Ticker'
import { TbfWordmark } from './TbfWordmark'
import { StoryDeck } from '@/components/StoryPlayer/StoryPlayer'
import { SCENES, COVER, REFERENCE, ARGUMENT, BUSINESS, CASE, PARTNERSHIP_OPEN, CLOSE } from '@/content/pitch/v3-scenes'
import type { PartnerScene } from '@/content/pitch/v3-scenes'
// ─── O casco do formato mora fora deste arquivo ──────────────────────────────
// EXTRAÍDO em 2026-08-18 para `src/components/DeckShell/DeckShell.tsx`: as
// constantes, a camada de tradução, a animação de entrada, a régua `?grid=1`, o
// passador, o kicker ancorado, o numeral e a geometria de uma cena por tela
// saíram daqui inteiros, junto com o bloco de CSS. Nada mudou de comportamento;
// o que mudou é que a proposta em `/proposta/castelo` usa o MESMO casco em vez
// de uma cópia. O porquê de cada decisão de layout continua documentado lá.
//
// O deck do pitch segue dono do seu conteúdo: as cenas, o cartão de portfólio e
// tudo que fala da .TBF. continuam neste arquivo.
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

const EDITORIAL_VIDEO = {
  desktop: { av1: '/videos/editorial-desktop.av1.mp4', h264: '/videos/editorial-desktop.mp4' },
  mobile: { av1: '/videos/editorial-mobile.av1.mp4', h264: '/videos/editorial-mobile.mp4' },
}

// ─── Cartão de portfólio expansível (cena-04) ────────────────────────────────
// Cada propriedade mostra nome + papel na primeira leitura. Por que e formas
// só aparecem na expansão: hover no desktop, toque no mobile.
//
// Estado em React, não CSS puro: `:hover` sozinho não é confiável em toque
// (alguns navegadores mobile mantêm o estado de hover depois do dedo sair, ou
// nunca o disparam). Com `onMouseEnter`/`onClick` o desktop abre no hover e
// segue o link no clique (já aberto, `open` é `true`, o clique não é mais
// interceptado); o mobile abre no primeiro toque e segue o link no segundo.
//
// O painel expandido é absolute + overflow-y:auto DENTRO do próprio cartão
// (nunca por cima de outro, nunca fora da seção): a regra "um movimento, uma
// tela" não permite que a expansão empurre a cena para fora da janela.
// PAINEL DO CASE: alterna as fotos sozinho, tipo um gif (pedido do fundador
// 2026-08-12: "está ilegível, preciso que tenha uma proporção maior e fique
// alternando entre fotos"). O filme de lançamento é a PRIMEIRA moldura e toca em
// laço; depois dele o painel cruza as nove fotos do arco, uma a cada 2,4s.
// Sem biblioteca: dois nós sobrepostos e opacidade, que é o que uma troca de
// imagem precisa. Respeita prefers-reduced-motion (ver o CSS no fim do arquivo).
// O PLAYER DE STORIES E A ESTEIRA SAIRAM DAQUI (2026-08-14). Os dois viraram
// `src/components/StoryPlayer/StoryPlayer.tsx`, compartilhados com a proposta de
// hospedagem em /creators/tavaristico/hospitality — o fundador pediu "a mesma
// lógica do layout 05" lá, e duas cópias significaria que o próximo ajuste de
// ritmo ou de contraste só chegaria numa das duas (regra 4: apontar, não copiar).
// O porquê de cada detalhe do player mora no cabeçalho daquele arquivo.

function PortfolioCard({ item, delay }: { item: (typeof BUSINESS.portfolio)[number]; delay: number }) {
  const [open, setOpen] = useState(false)

  return (
    <PitchReveal delay={delay}>
      <Link
        href={item.href}
        className="p3-portfolio-link"
        onClick={(e) => {
          if (!open) {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        <div
          className={`p3-portfolio-card${open ? ' p3-portfolio-card--open' : ''}`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* UMA PALAVRA POR LINHA (#04, #01 CHANGES 2026-08-14). Ele desenhou a
              quebra nas quatro marcas, e o motivo aparece na tela: só
              `.RUNWAY UNTD COLLECTIVE.` era comprido o bastante para dobrar
              sozinho, então três cartões abriam com uma linha de nome e um com
              duas, e a fileira ficava desalinhada logo na primeira leitura. Com
              a quebra imposta, os quatro nomes ocupam o mesmo bloco de três
              linhas e os papéis abaixo começam todos na mesma altura.

              A regra é "uma palavra por linha", não uma lista de quebras
              digitadas: as quatro marcas têm exatamente três palavras, e uma
              marca nova entra no mesmo desenho sem ninguém precisar lembrar
              disso. Quem desenha é o `white-space: pre-line` do CSS. */}
          <p className="p3-portfolio-name" style={{ color: PAPER }}>
            {item.name.split(' ').join('\n')}
          </p>
          <p className="p3-item-desc" style={{ marginTop: '0.4rem' }}>
            {item.role.pt}
            <En>{item.role.en}</En>
          </p>

          <div className="p3-portfolio-more">
            <p className="p3-portfolio-name p3-portfolio-name--more" style={{ color: PAPER }}>
              {item.name}
            </p>
            <p className="p3-portfolio-why">
              {item.why.pt}
              <En>{item.why.en}</En>
            </p>
            <p className="p3-portfolio-forms">
              {item.forms.pt}
              <En>{item.forms.en}</En>
            </p>

            {item.proof && (
              <div className="p3-proof">
                <div className="p3-proof__stats">
                  {item.proof.stats.map((s) => (
                    <div key={s.label.pt} className="p3-proof__stat">
                      <span className="p3-proof__value">{s.value}</span>
                      <span className="p3-proof__label">
                        {s.label.pt}
                        <En>{s.label.en}</En>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="p3-proof__source">
                  {item.proof.source.pt}
                  <En>{item.proof.source.en}</En>
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </PitchReveal>
  )
}

// Troca a esteira de miniaturas do case por pontos abaixo de 768px (pedido
// do fundador: "as thumbs podem diminuir e se transformar em pontos"). Começa
// em `false` para bater com o HTML do servidor e só liga depois do mount, no
// mesmo padrão do GridRuler acima: ler `window` antes disso quebra a
// hidratação.
function useDotsNav() {
  const [dots, setDots] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = () => setDots(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return dots
}

// ─── Página ──────────────────────────────────────────────────────────────────

/**
 * O DECK RECEBE O DESTINATÁRIO POR FORA (#02, #01 CHANGES 2026-08-14).
 *
 * `/pitch/v3` monta com a cena aberta (`PARTNERSHIP_OPEN`) e é o deck que se
 * manda para qualquer mesa. `/pitch/v3/overlens` passa a cena da Overlens e vira
 * a proposta endereçada. As duas rotas rodam o MESMO componente: se um ajuste de
 * layout só valesse para uma delas, a proposta endereçada envelheceria sozinha,
 * que é exatamente o que acontece quando se duplica um deck.
 *
 * Para uma proposta nova: escrever um `PartnerScene` em `v3-scenes.ts` e criar
 * `/pitch/v3/<empresa>` passando ele aqui. Não editar a cena aberta.
 */
export function PitchV3Client({ partner = PARTNERSHIP_OPEN }: { partner?: PartnerScene } = {}) {
  const dotsNav = useDotsNav()
  return (
    <div className="p3-deck">
      <DeckNav scenes={SCENES} total="07" />
      <GridRuler />

      {/* ── CENA 00 · CAPA ────────────────────────────────────────────────────
             A CAPA DE ANTES, DE VOLTA (pedido do fundador 2026-08-12), lida como
             PAGINA 00: o hero da home mais o tabloide em movimento. Ela nao
             recebe kicker nem numeral porque nao e uma cena de argumento, e o
             passador mostra 00 nela. E a unica secao do deck sem a geometria S:
             o hero ja se mede em tela cheia e o Ticker corre logo abaixo. */}
      <section id="cena-00" aria-label="Capa / Cover" style={{ scrollSnapAlign: 'start' }}>
        <HomeHero />
      </section>

      {/* LETREIRO EM TODAS AS CENAS (pedido do fundador #03, #01 CHANGES
          2026-08-14: "preciso que o letreiro motion esteja em TODAS as páginas
          assim como na v2").

          Ele já estava aqui e já era `position: sticky` — o que não funcionava
          era o LUGAR. Ele nascia DENTRO da `section#cena-00`, e um elemento
          sticky só gruda enquanto o pai dele está na tela: passada a capa, o
          letreiro ia embora junto com ela e as sete cenas seguintes rodavam sem
          ele. É exatamente por isso que na 2.0 ele é filho direto do deck, e é
          para lá que ele volta.

          Não mexer na altura: `--p3-band` já contava com o letreiro pinado no
          topo (é dela que saem o encaixe e a altura de cada cena), então a
          geometria do deck não muda — ela só passa a valer de verdade. */}
      <Ticker />

      {/* ── CENA 01 · ABERTURA ────────────────────────────────────────────────────
             As duas telas antigas (o hero da home + a Abertura) viraram uma:
             o vídeo editorial dá a presença, o letreiro do fundador dá a
             frase, e Culture™ mora aqui, onde o direcionamento pede que
             esteja. A cena não usa mais o HomeHero, e o Ticker sai do deck. */}
      <section
        id="cena-01"
        style={{ ...S, justifyContent: 'flex-end', padding: 0, background: '#000000' }}
        aria-label="Capa / Cover"
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <HeroVideo sources={EDITORIAL_VIDEO} poster="/images/editorial-feature.webp" opacity={0.35} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, transparent 0%, transparent 58%, rgba(0,0,0,0.72) 100%)',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(2rem, 6vw, 5rem)',
            paddingBottom: 'clamp(3rem, 8vw, 7rem)',
          }}
        >
          {/* A LINHA DE EYEBROW SAIU E VIROU CARIMBO (#01, #01 CHANGES
              2026-08-14). Ela dizia "FELIPE T. · CONFIDENTIAL DOC · .TBF. inc"
              em corpo miúdo, e o aviso que importava ali era o do meio.

              O selo entra ATRÁS do título, no lugar em que o carimbo cairia num
              papel: em cima do texto, meio torto, com a tinta fraca. Ele é
              `aria-hidden` e tem alt vazio de propósito — para o leitor de tela
              o que existe na cena é a headline, e um carimbo decorativo lido em
              voz alta atrapalharia exatamente quem mais precisa da headline.

              A headline veio do fundador já em inglês, e por isso não usa <En>:
              a camada de tradução existe para dobrar o português, e aqui não há
              português para dobrar. */}
          <PitchReveal delay={200}>
            <div className="p3-cover-title">
              <Image
                src={COVER.stamp}
                alt=""
                aria-hidden="true"
                width={1400}
                height={705}
                className="p3-cover-stamp"
              />
              <h1 className="p3-cover-headline">
                {COVER.headlineEn[0]}
                <br />
                {COVER.headlineEn[1]}
                <br />
                <span style={{ color: ACCENT }}>{COVER.headlineEn[2]}</span>
              </h1>
            </div>
          </PitchReveal>

          <PitchReveal delay={330}>
            <TbfWordmark className="p3-cover-wordmark" />
          </PitchReveal>

          {/* UMA ASSINATURA SÓ, SEM QUEBRA DE TEXTO (resposta do fundador
              2026-08-14). Ela nasceu em duas linhas — `Culture™` e a linha de
              origem logo abaixo — e o efeito na tela era o de duas assinaturas
              laranjas empilhadas disputando o mesmo posto. Agora é uma frase
              contínua: `Culture™` mantém o corpo cheio e a origem entra inline
              10% menor, que é a hierarquia que ele pediu no #01.

              A quebra que sobra é a natural do parágrafo, quando a linha não
              cabe na largura — não se força `nowrap` em texto neste repo
              (`frontend/CLAUDE.md`), porque no telefone isso ou vaza a caixa ou
              obriga a encolher a fonte até o ilegível. */}
          <PitchReveal delay={400}>
            <p className="p3-culture p3-culture--cover">
              {COVER.culture} <span className="p3-craft-line">{COVER.craft}</span>
            </p>
          </PitchReveal>

          {/* UMA LINHA SÓ, sem a dobra de tradução: ver a nota em COVER.body. */}
          <PitchReveal delay={550}>
            <p className="p3-body" style={{ maxWidth: 'var(--p3-measure)' }}>
              {COVER.body}
            </p>
          </PitchReveal>
        </div>
      </section>

      {/* ── CENA 02 · CAMPO DE REFERÊNCIA ───────────────────────────────────── */}
      <section
        id="cena-02"
        style={{
          ...S,
          // O trilho de logos é sangrado: o respiro lateral vive no cabeçalho da
          // seção, não na seção, senão o carrossel deixa de correr de ponta a ponta.
          paddingInline: 0,
          background: '#000000',
        }}
        aria-label="Campo de Referência / Reference Field"
      >
        <Numeral n="02" />
        {/* O kicker traz o próprio recuo lateral (`.p3-kicker-slot`), então
            esta cena não precisa mais do invólucro que devolvia a margem
            que a seção sangrada tirou. */}
        <Kicker n="02" pt="Campo de Referência" en="Reference Field" />

        <PitchReveal delay={100} slot="head" style={{ paddingInline: 'clamp(1.25rem, 5vw, 6rem)' }}>
          <h2 className="p3-h2 p3-h2--md p3-refs-headline">
            {REFERENCE.headline.pt[0]}
            <br />
            <span style={{ color: ACCENT }}>{REFERENCE.headline.pt[1]}</span>
            <En size="lead">{REFERENCE.headline.en.join(' ')}</En>
          </h2>
        </PitchReveal>

        {/* O TRILHO VAI PARA O MEIO DA CENA (#02, #01 CHANGES 2026-08-14:
            "coloque esse carrossel no meio do slide, acima dele: apenas o
            título"). A cena ancora no topo (é a regra do deck, ver `S`), então
            tudo nascia grudado em cima e sobrava um terço de tela preta embaixo
            — foi o "layout mal distribuído" que ele viu.

            `margin-block: auto` num filho de coluna flex reparte o espaço livre
            IGUALMENTE acima e abaixo dele: o trilho passa a flutuar no centro do
            que sobra entre o título e a ponte, e a cena se distribui sozinha em
            qualquer altura de janela. É uma propriedade, não uma altura chutada,
            e por isso não precisa ser remedida a cada viewport. */}
        <div className="p3-refs-rail">
          <PressLogosCarousel spacing="wide" />
        </div>

        {/* ── As DUAS personalidades de referência ─────────────────────────────
               Selecionadas pelo fundador em CHANGES/PERSONALITIES (prefixo
               SELECTED no arquivo). Licença livre, crédito e origem registrados
               no _CREDITOS.md daquela pasta. O retrato é 1:1 na origem, então o
               quadro nunca deforma.

               UM EM CADA EXTREMIDADE, LIGADOS POR PONTOS (pedido #04). A fila
               virou uma PONTE: Warhol numa ponta, Oswald na outra, e entre eles
               a mesma linha pontilhada que corre embaixo de HOME no menu. É a
               cena inteira dizendo, sem escrever, o que a frase de baixo depois
               escreve — "campos diferentes, a mesma capacidade".

               Por que a linha é um elemento à parta e não uma borda de um dos
               dois: ela precisa nascer no centro e crescer para os dois lados
               quando a cena entra (ver `.p3-refs-bridge__line`), e borda de
               figura não faz isso sem empurrar o retrato de lugar. */}
        <div className="p3-refs-people">
          <div className="p3-refs-bridge">
            {REFERENCE.people.map((person, i) => (
              <Fragment key={person.name}>
                {/* A linha entra entre os dois, e só entre os dois. */}
                {i > 0 && (
                  <PitchReveal delay={340}>
                    <span className="p3-refs-bridge__line" aria-hidden="true" />
                  </PitchReveal>
                )}
                <PitchReveal delay={200 + i * 90}>
                  <figure className="p3-person">
                    <Image
                      src={person.src}
                      alt={person.name}
                      width={1200}
                      height={1200}
                      className="p3-person__img"
                      sizes="(max-width: 767px) 30vw, 14vw"
                    />
                    {/* SÓ O NOME. O papel de cada um já é dito pela frase que
                        fecha o bloco; aqui basta o rosto e o nome. */}
                    <figcaption>
                      <p className="p3-person__name">{person.name}</p>
                    </figcaption>
                  </figure>
                </PitchReveal>
              </Fragment>
            ))}
          </div>

          {/* A frase fecha o bloco, não abre: entra depois dos cinco rostos,
              como conclusão do que a pessoa acabou de ver. Por isso o delay é
              o maior da seção. */}
          <PitchReveal delay={650}>
            <p className="p3-assert p3-refs-people__lead">
              {REFERENCE.close.pt}
              <En>{REFERENCE.close.en}</En>
            </p>
          </PitchReveal>
        </div>
      </section>

      {/* ── CENA 03 · A PERGUNTA, O CONTEXTO E A TESE ───────────────────────────
             UMA composição em TRÊS TEMPOS, não três telas coladas: a pergunta
             abre a tensão, o contexto mostra onde o valor vaza, a tese resolve.
             Os três tempos são revelados em sequência, com delay crescente, e a
             tese carrega o maior peso visual da cena. ─────────────────────── */}
      <section id="cena-03" style={{ ...S, background: '#111110' }} aria-label="A Pergunta e a Tese / The Question and the Thesis">
        <Numeral n="03" />
        <Kicker n="03" pt="A Pergunta e a Tese" en="The Question and the Thesis" />

        {/* Tempo 1 — a pergunta */}
        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2 p3-h2--md">
            {ARGUMENT.question.headline.pt[0]}
            <br />
            <span style={{ color: ACCENT }}>{ARGUMENT.question.headline.pt[1]}</span>
            <En size="lead">{ARGUMENT.question.headline.en.join(' ')}</En>
          </h2>
        </PitchReveal>

        {/* CADA PERGUNTA NUM QUADRADINHO (pedido do fundador #05, #01 CHANGES
            2026-08-14). Soltas, as duas perguntas eram dois parágrafos colados,
            e a segunda parecia continuação da primeira em vez de uma segunda
            pergunta. No quadro cada uma vira um objeto, e as duas passam a ler
            como um par — que é o que são. Mesma caixa do resto do deck (fundo
            #0a0a09, borda de topo no acento, raio de cartão do design system),
            para a cena 03 não inventar um cartão só dela. */}
        <div className="p3-question-grid">
          {ARGUMENT.question.items.map((q, i) => (
            <PitchReveal key={q.pt} delay={180 + i * 80}>
              <div className="p3-question-box">
                <p className="p3-question">
                  {q.pt}
                  <En>{q.en}</En>
                </p>
              </div>
            </PitchReveal>
          ))}
        </div>

        {/* 🔴 O TEMPO 2 (O CONTEXTO) SAIU DA TELA (#03, #01 CHANGES 2026-08-14).
            Eram as duas linhas do contexto ("O Brasil já produz repertório..." e
            "Mas o valor que nasce da nossa cultura...") mais a assertiva
            ("Atenção é a consequência, não o objetivo."): ele colou as três e
            escreveu "remove".

            A cena deixa de ter três tempos e passa a ter dois, pergunta e tese,
            que continuam sendo a tensão e a resolução — o contexto era a ponte
            entre elas, e sem ele a tese responde a pergunta diretamente.

            O conteúdo NÃO foi apagado: `ARGUMENT.context` segue inteiro em
            `v3-scenes.ts`. Para devolver qualquer uma das três, é reescrever
            este bloco a partir do histórico deste arquivo. */}

        {/* Tempo 2 — a tese: resolução da cena, maior peso visual */}
        <div className="p3-argument-block p3-argument-block--thesis">
          <PitchReveal delay={620}>
            <p className="p3-kicker-mini">
              {ARGUMENT.thesis.kicker.pt}
              <En>{ARGUMENT.thesis.kicker.en}</En>
            </p>
          </PitchReveal>
          <PitchReveal delay={680}>
            <p className="p3-thesis-line">
              {ARGUMENT.thesis.lines[0].pt}
              <br />
              <span style={{ color: ACCENT }}>{ARGUMENT.thesis.lines[1].pt}</span>
              <En size="lead">{ARGUMENT.thesis.lines.map((l) => l.en).join(' ')}</En>
            </p>
          </PitchReveal>
          <PitchReveal delay={760}>
            <div className="p3-chain">
              {ARGUMENT.thesis.chain.map((step, i) => (
                <Fragment key={step.pt}>
                  <div className="p3-chain__node">
                    <span className="p3-chain__n">0{i + 1}</span>
                    <p
                      className="p3-chain__title"
                      style={{ color: i === ARGUMENT.thesis.chain.length - 1 ? ACCENT : PAPER }}
                    >
                      {step.pt}
                    </p>
                    <En>{step.en}</En>
                  </div>
                  {i < ARGUMENT.thesis.chain.length - 1 && (
                    <span className="p3-chain__arrow" aria-hidden="true">
                      &#8594;
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
          </PitchReveal>
        </div>
      </section>

      {/* ── CENA 04 · DA CULTURA AO NEGÓCIO ──────────────────────────────────────
             Dois níveis: a linha de raciocínio (quatro verbos) e o portfólio
             (quatro propriedades, expansíveis). A mais cheia do deck: a
             expansão do portfólio acontece por hover/toque, dentro do próprio
             cartão, para nunca empurrar a cena para fora da tela. ─────────── */}
      <section id="cena-04" style={{ ...S }} aria-label="Da Cultura ao Negócio / From Culture to Business">
        <Numeral n="04" />
        <Kicker n="04" pt="Da Cultura ao Negócio" en="From Culture to Business" />

        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2 p3-h2--md">
            {BUSINESS.headline.pt[0]}
            <br />
            {BUSINESS.headline.pt[1]}
            <En size="lead">{BUSINESS.headline.en.join(' ')}</En>
          </h2>
        </PitchReveal>


        {/* O MÉTODO SAIU DA CENA (pedido do fundador #06, #01 CHANGES
            2026-08-14: "remove esse 4 quadradinhos"). Eram OBSERVAR, DAR FORMA,
            COLOCAR EM MOVIMENTO e FAZER PERMANECER, em quatro cartões acima do
            portfólio.

            A cena tinha DOIS níveis de leitura de quatro caixas cada, um em cima
            do outro, e as duas fileiras competiam pela mesma tela: quem olhava
            não sabia se as oito caixas eram uma lista só de oito ou duas de
            quatro. Sem o método, o portfólio fica sozinho e a cena passa a ter
            uma pergunta só — quais são as propriedades.

            `BUSINESS.method` continua em `v3-scenes.ts`, intacto: o conteúdo não
            foi apagado, só não é mais desenhado aqui. */}

        {/* O portfólio: quatro propriedades, expansíveis. */}
        <PitchReveal delay={500}>
          <p className="p3-portfolio-subtitle" style={{ margin: 'var(--p3-gap-sm) 0' }}>
            {BUSINESS.portfolioSubtitle}
          </p>
        </PitchReveal>

        {/* Largura total da cena (var(--p3-inner)), não var(--p3-measure-grid):
            com 4 colunas numa fileira só (ver .p3-portfolio-grid em
            min-width:768px), a medida de 9 colunas sobrava pouco mais de
            200px por cartão e o papel mais longo ("Soluções de crescimento
            para negócios brasileiros construindo fora") quebrava em 3 a 4
            linhas, empurrando a fileira inteira para a altura do cartão mais
            cheio. Com a largura cheia da cena o mesmo texto cabe em menos
            linhas, sem cortar uma palavra. */}
        {/* `--grow`: com o método fora da cena (#06) sobrou uma faixa vazia de
            quase 300px embaixo dos cartões em 1440x900 — a cena tem altura de
            tela cheia e ancora no topo, então o que sai vira buraco, não vira
            respiro. Os cartões passam a tomar a altura que sobrou (a cena é
            flex-column) e `grid-auto-rows: 1fr` reparte igual entre eles. Os
            quatro continuam do mesmo tamanho, agora maiores. */}
        <div className="p3-portfolio-grid p3-portfolio-grid--grow" style={{ maxWidth: 'var(--p3-inner)' }}>
          {BUSINESS.portfolio.map((item, i) => (
            <PortfolioCard key={item.name} item={item} delay={560 + i * 70} />
          ))}
        </div>

        <div className="p3-craft-row p3-tertiary">
          <PitchReveal delay={860}>
            <p className="p3-footnote">
              {BUSINESS.vision.lead.pt} {BUSINESS.vision.stages.pt}
              <En>
                {BUSINESS.vision.lead.en} {BUSINESS.vision.stages.en}
              </En>
            </p>
          </PitchReveal>
        </div>
      </section>

      {/* ── CENA 05 · CASE SELECIONADO ───────────────────────────────────────────
             Mídia protagonista, texto mínimo. O filme vertical dá a atmosfera;
             as nove imagens correm em faixa horizontal, respeitando o arco
             narrativo do array (atmosfera → no ar), sem empurrar a cena para
             fora da tela: o scroll é da faixa, não da cena. ────────────────── */}
      <section id="cena-05" style={{ ...S, background: '#111110' }} aria-label="Case Selecionado / Selected Case">
        <Numeral n="05" />
        <Kicker n="05" pt="Case Selecionado" en="Selected Case" />

        {/* O TÍTULO SAIU DE CIMA DA CENA e foi para o lado do story (pedido do
            fundador 2026-08-14: "verãozão + nome do cliente do lado direito do
            story"). O motivo é geometria: o story é 9/16 e a cena tem altura de
            uma tela. Com o logotipo ocupando uma faixa horizontal em cima, a
            altura que sobrava para o quadro era metade da que existe. Movido
            para a coluna da direita, ele passa a dividir a LARGURA com o quadro
            em vez de disputar altura, e o story cresce até o rodapé da cena.

            A identidade é a da campanha, não a palavra digitada na tipografia da
            casa: a campanha tem letra própria e é ela que roda no Instagram do
            cliente. O `alt` carrega o texto, então o título da cena continua
            existindo para leitor de tela e para o sumário da página. */}
        <div className="p3-case-layout">
          {/* SEM PitchReveal em volta, e a razão é estrutural, não estética: o
              invólucro do reveal é um <div> de verdade, e um <div> no meio anula
              o `display: contents` do StoryDeck. Com ele aqui, o quadro e a fila
              continuavam empacotados numa coluna só, e a coluna inchava para os
              790px que a fila queria (medido) — foi o buraco entre o story e o
              texto que apareceu na conferência.
              A peça não perde entrada por isso: o story já anima sozinho, com a
              barra correndo desde o primeiro quadro. */}
          <StoryDeck
              deckClassName="p3-deck-flat"
              playerClassName="p3-story"
              thumbsClassName="p3-thumbs"
              items={CASE.media.map((m) => ({
                src: m.src,
                alt: m.alt.pt,
                role: m.role.pt,
              }))}
              // O STORY É DO Ô, NÃO DA .TBF. (pedido do fundador 2026-08-14:
              // "o quadro de story preciso que tenha nome Ô e a foto do ícone
              // coloque a mesma foto do perfil do instagram deles"). E ele está
              // certo pelo motivo que importa: estas peças foram publicadas no
              // perfil do CLIENTE. Assinar o quadro com a marca da agência
              // trocaria o autor da publicação, que é exatamente o tipo de
              // detalhe que uma pessoa da área percebe num deck.
              //
              // O avatar é a foto de perfil real do @odecasahostel, e ela ainda
              // por cima está na mesma paleta da campanha: Ô ciano sobre azul.
              // NOME COMPLETO (pedido do fundador): "Ô" virou "Ô De Casa".
              handle="Ô De Casa"
              avatarSrc="/images/pitch/veraozao/o-avatar.webp"
              nav={dotsNav ? 'dots' : 'thumbs'}
            label="Peças da campanha VERÃOZÃO / VERÃOZÃO campaign pieces"
          />

          <div className="p3-case-copy">
            <PitchReveal delay={100}>
              <h2 className="p3-h2 p3-case-title">
                <Image
                  src={CASE.wordmark}
                  alt={CASE.headline}
                  width={900}
                  height={591}
                  priority
                  className="p3-case-wordmark"
                />
              </h2>
            </PitchReveal>
            {/* O CLIENTE ENTRA PELA MARCA DELE (#05, #01 CHANGES 2026-08-14).
                Era o nome digitado na Printed da casa; virou o logotipo oficial
                do hostel. O `alt` carrega o nome, então a linha continua
                existindo para leitor de tela e para busca no documento. */}
            <PitchReveal delay={140}>
              <Image
                src={CASE.clientLogo}
                alt={CASE.client}
                width={1249}
                height={420}
                className="p3-case-client-logo"
              />
            </PitchReveal>
            <PitchReveal delay={260}>
              <p className="p3-case-body">
                {CASE.deck.pt[0]}
                <br />
                {CASE.deck.pt[1]}
                <En>{CASE.deck.en.join(' ')}</En>
              </p>
            </PitchReveal>
            <PitchReveal delay={330}>
              <p className="p3-body p3-tertiary" style={{ marginTop: 'var(--p3-gap-sm)' }}>
                {CASE.body.pt}
                <En>{CASE.body.en}</En>
              </p>
            </PitchReveal>
          </div>
        </div>

        {/* A ESTEIRA SEPARADA SAIU DAQUI. As miniaturas viraram o SELETOR do
            story e passaram a viver dentro do próprio StoryDeck, logo abaixo do
            quadro (pedido do fundador 2026-08-14: "quero poder selecionar
            outras miniaturas embaixo e quando clicar nelas, ver na tela").
            Esteira que anda sozinha é bonita e impossível de clicar. */}

        {/* O CRÉDITO DA MÍDIA SAIU DA CENA (pedido do fundador 2026-08-14).
            Ele dizia "Peças da campanha VERÃOZÃO, fevereiro de 2026, .TBF. para
            Ô de Casa Hostel", e é informação verdadeira que a própria tela já
            diz duas vezes: o logotipo da campanha e o nome do cliente estão ao
            lado do quadro, em corpo maior. Linha de crédito só se justifica
            quando credita alguém que a tela não nomeia.
            O texto continua em CASE.press.credit, sem uso. */}

        {/* Números do case: VAZIO enquanto não houver medição verificada do
            período da campanha (ver a nota no módulo de conteúdo). Renderiza
            só se `metrics` tiver algo; nunca um placeholder no lugar. */}
        {CASE.metrics.length > 0 && (
          <PitchReveal delay={580}>
            <div className="p3-proof__stats p3-case-metrics">
              {CASE.metrics.map((m) => (
                <div key={m.label.pt} className="p3-proof__stat">
                  <span className="p3-proof__value">{m.value}</span>
                  <span className="p3-proof__label">
                    {m.label.pt}
                    <En>{m.label.en}</En>
                  </span>
                </div>
              ))}
            </div>
          </PitchReveal>
        )}
      </section>

      {/* ── CENA 06 · POR QUE A OVERLENS ─────────────────────────────────────── */}
      <section id="cena-06" style={{ ...S }} aria-label={`${partner.kicker.pt} / ${partner.kicker.en}`}>
        <Numeral n="06" />
        <Kicker n="06" pt={partner.kicker.pt} en={partner.kicker.en} />

        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2 p3-h2--md">
            {partner.question.pt[0]}
            <br />
            {partner.question.pt[1]}
            <En size="lead">{partner.question.en.join(' ')}</En>
          </h2>
        </PitchReveal>

        {/* Os dois lados, tratamento visual equivalente: nenhum dos dois é
            "cliente" do outro. */}
        <div className="p3-partner-grid">
          {partner.sides.map((side, i) => {
            const color = side.color === 'accent' ? ACCENT : PAPER
            return (
              <PitchReveal key={side.who} delay={200 + i * 120}>
                <div
                  style={{
                    background: '#000000',
                    padding: 'clamp(1.1rem, 3vw, 1.4rem)',
                    borderTop: `2px solid ${color}`,
                    borderRadius: 'var(--tbf-radius-card)',
                    height: '100%',
                  }}
                >
                  <p className="p3-partner-name" style={{ color }}>
                    {side.who}
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

        {/* THE GOAL: onde os dois lados convergem, maior peso visual da cena. */}
        <PitchReveal delay={480}>
          <div className="p3-goal">
            <p className="p3-kicker-mini">{partner.goal.kicker}</p>
            <p className="p3-goal__line">
              {partner.goal.lines[0].pt}
              <br />
              <span style={{ color: ACCENT }}>{partner.goal.lines[1].pt}</span>
              <En size="lead">{partner.goal.lines.map((l) => l.en).join(' ')}</En>
            </p>
          </div>
        </PitchReveal>

        <PitchReveal delay={600}>
          <p className="p3-body p3-tertiary" style={{ marginTop: 'var(--p3-gap-sm)', maxWidth: 'var(--p3-measure-wide)' }}>
            {partner.hypotheses.pt}
            <En>{partner.hypotheses.en}</En>
          </p>
        </PitchReveal>
      </section>

      {/* ── CENA 07 · FECHO ──────────────────────────────────────────────────── */}
      <section
        id="cena-07"
        style={{ ...S, alignItems: 'center', textAlign: 'center', background: '#000000' }}
        aria-label="Fecho / Close"
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            src="/brand/BRAND-ASSET-01.svg"
            alt=""
            width={600}
            height={600}
            style={{ width: '80vmin', height: '80vmin', opacity: 0.04, filter: 'invert(1)' }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <PitchReveal delay={100}>
            <blockquote className="p3-h2 p3-quote">
              {CLOSE.quote.pt[0]}
              <br />
              <span style={{ color: ACCENT }}>{CLOSE.quote.pt[1]}</span>
              <En size="lead">{CLOSE.quote.en.join(' ')}</En>
            </blockquote>
          </PitchReveal>

          <PitchReveal delay={280}>
            <TbfWordmark
              style={{
                width: '100%',
                // Teto menor (era 700px): no fecho o logotipo divide a tela com
                // citação, Culture™, contatos, três botões e o rodapé legal.
                maxWidth: 'min(460px, 62vw)',
                height: 'auto',
                display: 'block',
                marginBottom: 'var(--p3-gap-sm)',
              }}
            />
          </PitchReveal>

          <PitchReveal delay={360}>
            <p className="p3-culture">{CLOSE.culture}</p>
          </PitchReveal>

          <PitchReveal delay={450}>
            <p className="p3-eyebrow p3-eyebrow--accent">
              {partner.closeEyebrow.pt}
              <En>{partner.closeEyebrow.en}</En>
            </p>
          </PitchReveal>

          <PitchReveal delay={550}>
            <p className="p3-contact-site">{CLOSE.site}</p>
            <p className="p3-contact-mail">{CLOSE.email}</p>
          </PitchReveal>

          <PitchReveal delay={650}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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

          <PitchReveal delay={800}>
            <p className="p3-legal">{CLOSE.legal}</p>
          </PitchReveal>
        </div>
      </section>

      {/* ── Design system do deck + layout responsivo (mobile-first) ─────────── */}
      <DeckStyles />
    </div>
  )
}
