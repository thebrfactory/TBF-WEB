'use client'

// =============================================================================
// PITCH 4.0 CLIENT · working deck, 7 cenas + capa (rodada 23/10/2026)
// -----------------------------------------------------------------------------
// NASCEU CÓPIA DA 3.0 (pedido do fundador, CHANGES #01, 19/10/2026), pela mesma
// razão com que a 3.0 nasceu da 2.0: divergir sem tocar no deck que já foi
// apresentado. O casco (DeckShell) e o conteúdo da 3.0 (`v3-scenes.ts`) são
// reaproveitados; só o que é novo mora em `v4-scenes.ts`.
//
// O QUE A 4.0 ACRESCENTA
//   1. Cronômetro de 10 minutos no canto (`DeckTimer.tsx`).
//   2. cena-01: o fundador (jornada e o que faz), logo depois da capa.
//   3. cena-06: cada vertical ganha o anel de avatar e abre o StoryPlayer
//      (layout padrão de stories, `npm run check:stories`).
//   4. (22/10/2026 b) deck para PARCEIRO ESTRATEGICO: cena-05 mercado e mapa,
//      cena-07 como cada vertical ganha + roadmap, cena-09 o que construimos
//      juntos (no lugar da cena de CNPJ e regime), metricas no case VERAOZAO e
//      area de metricas da TFD (`TfdSheet.tsx`). Cenas novas em `NewScenes.tsx`.
// As cenas 02 a 04 são as 01 a 03 da 3.0, renumeradas. Decisões de layout das
// cenas herdadas estão documentadas no `PitchV3Client.tsx`.
// Mobile-first. Prefixo de CSS novo: `.p4-*`.
// =============================================================================

import { MetaPitchEvent } from '@/components/Analytics/MetaEvent'
import { Fragment, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { PressLogosCarousel } from '../v1/PressLogosCarousel'
import { HeroVideo } from '@/components/HeroVideo/HeroVideo'
import { HomeHero } from '@/components/HomeHero/HomeHero'
import { Ticker } from '@/components/Ticker/Ticker'
import { TbfWordmark } from '../v3/TbfWordmark'
import { DeckTimer } from './DeckTimer'
import { StoryPlayer } from '@/components/StoryPlayer/StoryPlayer'
// O anel abre o StoryPlayer, o layout padrao de stories da .TBF. (regra 4: apontar, nao copiar).
import { StoryRing } from '@/components/tavaristico/StoryRing'
import { COVER, REFERENCE, CASE, PARTNERSHIP_OPEN } from '@/content/pitch/v3-scenes'
import type { PartnerScene } from '@/content/pitch/v3-scenes'
import { SCENES_V4, TOTAL_V4, FOUNDER, VERAOZAO_METRICS, VERAOZAO_SOURCE, VERAOZAO_REEL } from '@/content/pitch/v4-scenes'
import { ThesisScene } from './ThesisScene'
import { FrontsScene } from './FrontsScene'
import { CloseScene } from './CloseScene'
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
  EASE,
  PAPER,
  DeckNav,
  DeckStyles,
  En,
  GridRuler,
  Kicker,
  PitchReveal,
  S,
} from '@/components/DeckShell/DeckShell'

const EDITORIAL_VIDEO = {
  desktop: { av1: '/videos/editorial-desktop.av1.mp4', h264: '/videos/editorial-desktop.mp4' },
  mobile: { av1: '/videos/editorial-mobile.av1.mp4', h264: '/videos/editorial-mobile.mp4' },
}

// ─── Cartão de portfólio expansível (cena-06) ────────────────────────────────
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
// hospedagem em /creators/tavaristico/hospitality, o fundador pediu "a mesma
// lógica do layout 05" lá, e duas cópias significaria que o próximo ajuste de
// ritmo ou de contraste só chegaria numa das duas (regra 4: apontar, não copiar).
// O porquê de cada detalhe do player mora no cabeçalho daquele arquivo.

// Sequência do case (cena-06, rodada 26/10/2026): as peças da campanha trocam
// em CORTE SECO, como no visualizador de stories do portfólio (pedido do
// fundador: "cortes secos igual esse"). Troca instantânea de quadro: sem
// crossfade, sem zoom, sem transição CSS. Todas as imagens ficam montadas e
// carregadas; só a visibilidade muda. Com prefers-reduced-motion, fica na primeira.
const CASE_CUT_MS = 2400
function CaseFilm() {
  const frames = CASE.media
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setI((n) => (n + 1) % frames.length), CASE_CUT_MS)
    return () => window.clearInterval(t)
  }, [frames.length])
  return (
    <div className="p4-case__media">
      <div className="p4-case__video" role="img" aria-label={VERAOZAO_REEL.alt.pt}>
        {frames.map((m, idx) => (
          <Image
            key={m.src}
            src={m.src}
            alt=""
            fill
            sizes="(max-width: 767px) 50vw, 30vw"
            quality={85}
            priority={idx < 2}
            className="p4-case__frame"
            style={{ visibility: idx === i ? 'visible' : 'hidden' }}
          />
        ))}
      </div>
    </div>
  )
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
export function PitchV4Client({ partner = PARTNERSHIP_OPEN }: { partner?: PartnerScene } = {}) {
  const [caseStoryOpen, setCaseStoryOpen] = useState(false)
  const caseStoryLabel = 'Peças da campanha VERÃOZÃO / VERÃOZÃO campaign pieces'
  return (
    <div className="p3-deck">
      <MetaPitchEvent />
      <DeckNav scenes={SCENES_V4} total={TOTAL_V4} />
      <DeckTimer />
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

          Ele já estava aqui e já era `position: sticky`, o que não funcionava
          era o LUGAR. Ele nascia DENTRO da `section#cena-00`, e um elemento
          sticky só gruda enquanto o pai dele está na tela: passada a capa, o
          letreiro ia embora junto com ela e as sete cenas seguintes rodavam sem
          ele. É exatamente por isso que na 2.0 ele é filho direto do deck, e é
          para lá que ele volta.

          Não mexer na altura: `--p3-band` já contava com o letreiro pinado no
          topo (é dela que saem o encaixe e a altura de cada cena), então a
          geometria do deck não muda, ela só passa a valer de verdade. */}
      <Ticker />

      {/* ── CENA 01 · O FUNDADOR (novo na 4.0) ─────────────────────────────────
             Primeira cena depois da capa: quem está por trás. Só fato já
             publicado (ver `v4-scenes.ts`). O retrato é o mesmo de
             /creators/tavaristico, em círculo como os retratos do deck. */}
      <section id="cena-01" style={{ ...S, background: '#000000' }} aria-label="O Fundador / The Founder">
        <Kicker n="01" pt="O Fundador" en="The Founder" />

        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2 p3-h2--md">
            {FOUNDER.headline.pt[0]}
            <br />
            <span style={{ color: ACCENT }}>{FOUNDER.headline.pt[1]}</span>
            <En size="lead">{FOUNDER.headline.en.join(' ')}</En>
          </h2>
        </PitchReveal>

        <div className="p4-founder">
          <PitchReveal delay={200}>
            <div className="p4-founder__info">
              <div className="p4-founder__id">
                <Image
                  src={FOUNDER.portrait}
                  alt={FOUNDER.alt}
                  width={400}
                  height={400}
                  sizes="(max-width: 767px) 22vw, 10vw"
                  className="p4-founder__img"
                />
                <div>
                  <p className="p4-founder__name" style={{ color: PAPER }}>
                    {FOUNDER.name}
                  </p>
                  <p className="p4-founder__alias" style={{ color: ACCENT }}>
                    {FOUNDER.alias}
                  </p>
                  <p className="p3-item-desc">{FOUNDER.role.pt}</p>
                </div>
              </div>
              {/* HONESTIDADE DE EQUIPE (22/10/2026 b, item 6): um fundador só, em
                  estágio inicial, e por isso procura parceiros. Sem rosto inventado. */}
              <p className="p4-founder__team">
                {FOUNDER.team.pt}
                <En>{FOUNDER.team.en}</En>
              </p>
              <ul className="p4-founder__disc">
                {FOUNDER.disciplines.map((d) => (
                  <li key={d.pt} className="p4-founder__chip">
                    {d.pt}
                    <span className="p4-founder__chip-en"> / {d.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </PitchReveal>

          {/* O PORTFÓLIO EM MOVIMENTO (20/10/2026, ampliado em 22/10/2026): cinco
              colunas de sete quadros em esteira vertical, sentidos alternados,
              cada uma com a lista duplicada para o laço fechar sem salto. As bordas
              somem por máscara (sem corte duro). Decorativo (aria-hidden). */}
          <PitchReveal delay={320} style={{ minHeight: 0, height: '100%' }}>
            <div className="p4-reel" aria-hidden="true">
              <div className="p4-reel__grid">
                {FOUNDER.reel.map((col, ci) => (
                  <div key={ci} className={`p4-reel__col p4-reel__col--${ci}`}>
                    <div className="p4-reel__track">
                      {[...col, ...col].map((t, i) =>
                        t.kind === 'img' ? (
                          <div key={`${t.src}-${i}`} className="p4-reel__tile" style={{ aspectRatio: t.ar }}>
                            <Image
                              src={t.src}
                              alt=""
                              fill
                              sizes="(max-width: 767px) 38vw, 20vw"
                              quality={90}
                              className="p4-reel__img"
                              loading={ci < 3 && i < 4 ? 'eager' : 'lazy'}
                            />
                          </div>
                        ) : (
                          <div
                            key={`${t.big}-${i}`}
                            className={`p4-reel__tile p4-reel__info p4-reel__info--${t.tone}`}
                            style={{ aspectRatio: t.ar }}
                          >
                            <span className="p4-reel__big">{t.big}</span>
                            <span className="p4-reel__sub">{t.sub}</span>
                            <span className="p4-reel__line">
                              {t.line.pt}
                              <span className="p4-reel__line-en">{t.line.en}</span>
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PitchReveal>
        </div>
      </section>

      {/* ── CENA 02 · ABERTURA ────────────────────────────────────────────────────
             As duas telas antigas (o hero da home + a Abertura) viraram uma:
             o vídeo editorial dá a presença, o letreiro do fundador dá a
             frase, e Culture™ mora aqui, onde o direcionamento pede que
             esteja. A cena não usa mais o HomeHero, e o Ticker sai do deck. */}
      <section
        id="cena-02"
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
              `aria-hidden` e tem alt vazio de propósito, para o leitor de tela
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
              2026-08-14). Ela nasceu em duas linhas, `Culture™` e a linha de
              origem logo abaixo, e o efeito na tela era o de duas assinaturas
              laranjas empilhadas disputando o mesmo posto. Agora é uma frase
              contínua: `Culture™` mantém o corpo cheio e a origem entra inline
              10% menor, que é a hierarquia que ele pediu no #01.

              A quebra que sobra é a natural do parágrafo, quando a linha não
              cabe na largura, não se força `nowrap` em texto neste repo
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
        id="cena-03"
        style={{
          ...S,
          // O trilho de logos é sangrado: o respiro lateral vive no cabeçalho da
          // seção, não na seção, senão o carrossel deixa de correr de ponta a ponta.
          paddingInline: 0,
          background: '#000000',
        }}
        aria-label="Campo de Referência / Reference Field"
      >
        {/* O kicker traz o próprio recuo lateral (`.p3-kicker-slot`), então
            esta cena não precisa mais do invólucro que devolvia a margem
            que a seção sangrada tirou. */}
        <Kicker n="03" pt="Campo de Referência" en="Reference Field" />

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
           , foi o "layout mal distribuído" que ele viu.

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
               escreve, "campos diferentes, a mesma capacidade".

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

      {/* ── CENA 04 · PERGUNTA, TESE E MERCADO (rodada 23/10/2026) ─────────────
             Abre so com a pergunta; cada clique revela um passo. O dado de
             mercado da antiga cena 05 mora no ultimo passo. `ThesisScene.tsx`. */}
      <ThesisScene />

      {/* ── CENA 05 · DA CULTURA AO NEGOCIO (rodada 23/10/2026) ──────────────────
             As quatro frentes empilhadas; cada uma abre em tela cheia.
             Fundiu as antigas cenas 06 e 07. `FrontsScene.tsx`. */}
      <FrontsScene />

      {/* ── CENA 06 · CASE SELECIONADO ───────────────────────────────────────────
             Mídia protagonista, texto mínimo. O filme vertical dá a atmosfera;
             as nove imagens correm em faixa horizontal, respeitando o arco
             narrativo do array (atmosfera → no ar), sem empurrar a cena para
             fora da tela: o scroll é da faixa, não da cena. ────────────────── */}
      <section id="cena-06" style={{ ...S, background: '#000000' }} aria-label="Case Selecionado / Selected Case">
        <Kicker n="06" pt="Case Selecionado" en="Selected Case" />

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
        {/* 20/10/2026 (pedido do fundador): o filme da campanha é o protagonista,
            grande; o resto cai para título curto, uma frase e o anel de stories.
            O parágrafo longo (CASE.body) e a tradução do corpo saíram da tela; o
            texto segue em v3-scenes.ts. O filme é vertical e entra como veio. */}
        <div className="p4-case">
          <PitchReveal delay={100} style={{ flex: '1 1 0', minHeight: 0, display: 'flex', justifyContent: 'center' }}>
            <CaseFilm />
          </PitchReveal>

          <div className="p4-case__copy">
            <PitchReveal delay={180}>
              <div className="p4-case__brand">
                <h2 className="p3-h2 p3-case-title">
                  <Image
                    src={CASE.wordmark}
                    alt={CASE.headline}
                    width={900}
                    height={591}
                    priority
                    className="p4-case__wordmark"
                  />
                </h2>
                <Image
                  src={CASE.clientLogo}
                  alt={CASE.client}
                  width={1249}
                  height={420}
                  className="p4-case__client"
                />
              </div>
            </PitchReveal>
            <PitchReveal delay={260}>
              <p className="p4-case__line">
                {CASE.deck.pt.join(' ')}
                <En>{CASE.deck.en.join(' ')}</En>
              </p>
            </PitchReveal>
            <PitchReveal delay={340}>
              <div className="p4-case__stories">
                {/* CAPA = IDENTIDADE DO Ô (pedido do fundador 2026-09-16): o
                    avatar real do @odecasahostel, nunca a primeira peça. */}
                <StoryRing
                  cover="/images/pitch/veraozao/o-avatar.webp"
                  alt="Ô De Casa"
                  size={56}
                  ariaLabel={`Abrir ${caseStoryLabel}`}
                  onClick={() => setCaseStoryOpen(true)}
                />
                <span className="p3-label">Ver stories</span>
              </div>
            </PitchReveal>
          </div>

          {/* 22/10/2026 b: números confirmados pelo fundador em 25/09/2026 (conta
              @odecasahostel). Três de seis; cada um com o seu período. Fonte em
              `VERAOZAO_METRICS` (v4-scenes.ts). */}
          <PitchReveal delay={420}>
            <div className="p4-case__metrics">
              {VERAOZAO_METRICS.map((m) => (
                <div key={m.value} className="p4-case__metric">
                  <span className="p4-case__mval">{m.value}</span>
                  <span className="p4-case__mlab">
                    {m.label.pt}
                    <En>{m.label.en}</En>
                  </span>
                  <span className="p4-case__mper">{m.period.pt}</span>
                </div>
              ))}
              <p className="p4-case__msrc">{VERAOZAO_SOURCE.pt}</p>
            </div>
          </PitchReveal>

          {caseStoryOpen ? (
            <StoryPlayer
              groups={[
                {
                  id: 'veraozao',
                  handle: 'Ô De Casa',
                  avatarSrc: '/images/pitch/veraozao/o-avatar.webp',
                  timeLabel: 'fev 2026',
                  items: CASE.media.map((m) => ({
                    src: m.src,
                    alt: m.alt.pt,
                    role: m.role.pt,
                  })),
                },
              ]}
              label={caseStoryLabel}
              onClose={() => setCaseStoryOpen(false)}
            />
          ) : null}
        </div>
      </section>

      {/* ── CENA 07 · PARCEIROS, MARCOS E FECHO (rodada 23/10/2026) ─────────────
             Fundiu a antiga 09 (o que construimos juntos) no fecho, no layout
             da cena 06 do pitch v3. `CloseScene.tsx`. */}
      <CloseScene partner={partner} />

      <style>{`
        /* ─── 4.0: timer, fundador, anel das verticais, empresa (mobile-first) ─ */
        .p4-timer {
          position: fixed;
          left: clamp(0.75rem, 3vw, 2rem);
          bottom: clamp(0.9rem, 2vh, 1.4rem);
          z-index: 40;
          pointer-events: none;
          opacity: 0.5;
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: clamp(0.8rem, 2.4vw, 0.95rem);
          letter-spacing: 0.08em;
          font-variant-numeric: tabular-nums;
          color: ${PAPER};
        }

        /* ─── Passador como no v2 (20/10/2026): número + setas soltas, sem
           círculo de fundo. A pílula escura do casco fica; só o botão perde
           fundo e contorno. O toque continua com 2,2rem de alvo. */
        .p3-deck .p3-nav__btn {
          border: 0;
          background: transparent;
          border-radius: 0;
          width: 2.2rem;
          height: 2.2rem;
        }
        .p3-deck .p3-nav__btn:hover:not(:disabled) {
          background: transparent;
          color: ${ACCENT};
        }

        /* ─── Cena 01: o fundador + portfólio em movimento (22/10/2026 b) ────── */
        /* Mosaico maior que antes: sangra até as bordas laterais da tela e desce
           por cima do respiro de rodapé (o passador flutua por cima). As bordas
           não têm corte duro: duas máscaras de transparência (lateral e vertical)
           fazem o quadro sumir no preto, como sombra que se dissolve. */
        .p4-founder {
          position: relative;
          z-index: 1;
          flex: 1 1 auto;
          min-height: 0;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto minmax(0, 1fr);
          gap: clamp(0.4rem, 1.2vh, 1rem);
          margin-top: var(--p3-gap-sm);
          margin-inline: calc(var(--p3-pad-x) * -1);
          /* Rodada 26/10: o mosaico NAO desce mais por baixo do rodape. A caixa
             termina onde o conteudo termina, então as máscaras ficam simétricas
             e o conjunto fica centrado na área dele (antes parecia torto). */
          margin-bottom: 0;
        }
        .p4-founder__info {
          padding-inline: var(--p3-pad-x);
        }
        .p4-founder__id {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .p4-founder__img {
          width: clamp(3rem, min(15vw, 9vh), 6.5rem);
          height: auto;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          flex: none;
          border-radius: var(--tbf-radius-full);
          box-shadow: 0 0 0 2px #000000, 0 0 0 3px rgba(240, 237, 230, 0.28);
        }
        .p4-founder__name {
          margin: 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(0.9rem, min(3vw, 2.6vh), 1.3rem);
          line-height: 1.1;
        }
        .p4-founder__alias {
          margin: 0.05rem 0 0.15rem;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(0.68rem, min(2.2vw, 2vh), 0.9rem);
          letter-spacing: 0.06em;
        }
        .p4-founder__team {
          margin: 0.4rem 0 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 600;
          font-size: 0.78rem;
          line-height: 1.22;
          color: ${PAPER};
        }
        .p4-founder__team .p3-en { font-size: 0.64rem; line-height: 1.15; font-weight: 300; }
        .p4-founder__disc { display: none; }

        /* Rodada 23/10: bordas SEM corte seco. UMA máscara com quatro rampas
           longas e suaves (esquerda, direita, topo, base) intersectadas, então o
           mosaico se dissolve no preto em todos os lados, como sombra. */
        .p4-reel {
          height: 100%;
          overflow: hidden;
          --p4-fade-x: linear-gradient(to right, transparent 0, rgba(0,0,0,0.25) 6%, rgba(0,0,0,0.7) 13%, #000 24%, #000 76%, rgba(0,0,0,0.7) 87%, rgba(0,0,0,0.25) 94%, transparent 100%);
          --p4-fade-y: linear-gradient(to bottom, transparent 0, rgba(0,0,0,0.25) 7%, rgba(0,0,0,0.7) 15%, #000 28%, #000 70%, rgba(0,0,0,0.6) 84%, rgba(0,0,0,0.2) 93%, transparent 100%);
          -webkit-mask-image: var(--p4-fade-x), var(--p4-fade-y);
          mask-image: var(--p4-fade-x), var(--p4-fade-y);
          -webkit-mask-composite: source-in;
          mask-composite: intersect;
        }
        .p4-reel__grid {
          height: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.5rem;
          padding-inline: 0.5rem;
        }
        .p4-reel__col {
          min-width: 0;
          overflow: hidden;
        }
        .p4-reel__col--2,
        .p4-reel__col--3 {
          display: none;
        }
        .p4-reel__track {
          display: flex;
          flex-direction: column;
          animation: p4-reel 26s linear infinite;
          will-change: transform;
        }
        .p4-reel__col--0 .p4-reel__track { animation-duration: 24s; }
        .p4-reel__col--1 .p4-reel__track { animation-duration: 28s; animation-direction: reverse; animation-delay: -9s; }
        .p4-reel__col--2 .p4-reel__track { animation-duration: 26s; animation-delay: -14s; }
        .p4-reel__col--3 .p4-reel__track { animation-duration: 30s; animation-direction: reverse; animation-delay: -5s; }
        .p4-reel__tile {
          position: relative;
          flex: none;
          width: 100%;
          margin-bottom: 0.5rem;
          border-radius: var(--tbf-radius-card);
          overflow: hidden;
          background: #050505;
        }
        .p4-reel__img {
          object-fit: cover;
        }
        /* Peças tipográficas: fato já publicado (papel, cliente, ano). Texto
           sobre fundo chapado, nunca sobre imagem. */
        .p4-reel__info {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0.5rem;
        }
        .p4-reel__info--accent { background: ${ACCENT}; color: #000000; }
        .p4-reel__info--paper { background: ${PAPER}; color: #000000; }
        .p4-reel__info--dark { background: #171716; color: ${PAPER}; }
        .p4-reel__big {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(0.9rem, 4.8vw, 1.6rem);
          overflow-wrap: anywhere;
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .p4-reel__info--dark .p4-reel__big { color: ${ACCENT}; }
        .p4-reel__sub {
          margin-top: 0.1rem;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(0.8rem, 4vw, 1.15rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
        }
        .p4-reel__line {
          margin-top: 0.3rem;
          display: flex;
          flex-direction: column;
          font-family: var(--tbf-font-family-body);
          font-weight: 450;
          font-size: 0.64rem;
          line-height: 1.15;
        }
        .p4-reel__line-en {
          font-family: var(--tbf-font-family-printed);
          font-style: italic;
          font-weight: 300;
          opacity: 0.7;
        }
        @keyframes p4-reel {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .p4-reel__track { animation: none; }
        }

        /* ─── Cena 06: o filme é o protagonista (20/10/2026; métricas 22/10/2026 b) ──
           Mobile: filme à esquerda, marca e frase à direita; faixa de três
           números embaixo, de ponta a ponta. Desktop: filme em coluna, texto e
           números à direita. */
        .p4-case {
          position: relative;
          z-index: 1;
          flex: 1 1 auto;
          min-height: 0;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr) auto;
          align-content: center;
          column-gap: 0.8rem;
          row-gap: 0.6rem;
          margin-top: var(--p3-gap-sm);
        }
        .p4-case > .pitch-reveal:first-child {
          grid-row: 1;
          grid-column: 1;
          flex: none !important;
        }
        .p4-case > .pitch-reveal:nth-child(3) {
          grid-row: 2;
          grid-column: 1 / -1;
        }
        .p4-case__media {
          height: 100%;
          display: flex;
        }
        .p4-case__video {
          height: 100%;
          max-height: calc((100vw - 2 * var(--p3-pad-x)) * 0.5 * 16 / 9);
          width: auto;
          max-width: 100%;
          aspect-ratio: 9 / 16;
          position: relative;
          overflow: hidden;
          border-radius: var(--tbf-radius-card);
          background: #000000;
        }
        .p4-case__frame { object-fit: cover; }
        .p4-case__copy {
          grid-row: 1;
          grid-column: 2;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 0.55rem;
        }
        .p4-case__brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .p4-case__brand .p3-case-title {
          margin: 0;
        }
        .p4-case__wordmark {
          width: 5.2rem;
          height: auto;
          display: block;
        }
        .p4-case__client {
          width: 4.4rem;
          height: auto;
          display: block;
        }
        .p4-case__line {
          margin: 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 600;
          font-size: 0.74rem;
          line-height: 1.25;
          color: ${PAPER};
        }
        .p4-case__line .p3-en { font-size: 0.62rem; line-height: 1.15; font-weight: 300; }
        .p4-case__stories {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.6rem;
        }
        .p4-case__metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.4rem;
        }
        .p4-case__metric {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          padding: 0.5rem 0.55rem;
          background: #050505;
          border-radius: var(--tbf-radius-card);
          min-width: 0;
        }
        .p4-case__mval {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(0.95rem, 4.6vw, 1.4rem);
          line-height: 1;
          letter-spacing: -0.04em;
          color: ${ACCENT};
        }
        .p4-case__mlab {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: 0.58rem;
          line-height: 1.2;
          color: rgba(240, 237, 230, 0.8);
        }
        .p4-case__mlab .p3-en { font-size: 0.52rem; line-height: 1.12; }
        .p4-case__mper {
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: 0.5rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(240, 237, 230, 0.45);
        }
        .p4-case__msrc {
          grid-column: 1 / -1;
          margin: 0;
          font-family: var(--tbf-font-family-printed);
          font-weight: 400;
          font-size: 0.54rem;
          letter-spacing: 0.04em;
          color: rgba(240, 237, 230, 0.4);
        }

        @media (min-width: 768px) {
          .p4-founder {
            margin-top: var(--p3-gap);
            margin-inline: 0;
            grid-template-columns: minmax(15rem, 0.8fr) 2.4fr;
            grid-template-rows: minmax(0, 1fr);
            align-items: start;
            gap: clamp(1.25rem, 3vw, 3rem);
          }
          .p4-founder__info { padding-inline: 0; }
          .p4-founder__team { font-size: clamp(0.95rem, 1.5vw, 1.25rem); margin-top: 1.1rem; }
          .p4-founder__team .p3-en { font-size: clamp(0.78rem, 1.1vw, 0.95rem); }
          .p4-founder__disc {
            list-style: none;
            margin: 1.4rem 0 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
          }
          .p4-founder__chip {
            padding: 0.3rem 0.7rem;
            border-radius: var(--tbf-radius-full);
            background: #050505;
            font-family: var(--tbf-font-family-printed);
            font-weight: 500;
            font-size: 0.68rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: rgba(240, 237, 230, 0.82);
          }
          .p4-founder__chip-en { color: rgba(240, 237, 230, 0.45); font-weight: 400; }
          .p4-reel { height: 100%; }
          .p4-reel__grid {
            align-content: center;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0.8rem;
            padding-inline: 0.8rem;
          }
          .p4-reel__col--2,
          .p4-reel__col--3 { display: block; }
          .p4-reel__tile { margin-bottom: 0.8rem; }
          .p4-reel__info { padding: 0.8rem; }
          .p4-reel__big { font-size: clamp(1rem, 1.7vw, 1.7rem); }
          .p4-reel__sub { font-size: clamp(0.8rem, 1.2vw, 1.2rem); }
          .p4-reel__line { font-size: clamp(0.62rem, 0.8vw, 0.8rem); margin-top: 0.5rem; }

          .p4-case {
            grid-template-columns: auto minmax(0, 1fr);
            grid-template-rows: 1fr auto;
            column-gap: clamp(2rem, 6vw, 5rem);
            row-gap: 1.4rem;
            align-content: stretch;
            align-items: stretch;
          }
          .p4-case > .pitch-reveal:first-child { grid-row: 1 / span 2; }
          .p4-case > .pitch-reveal:nth-child(3) { grid-row: 2; grid-column: 2; }
          .p4-case__video { max-height: none; }
          .p4-case__copy {
            gap: 1.1rem;
            align-self: end;
          }
          .p4-case__brand { flex-direction: row; align-items: center; gap: 1.4rem; }
          .p4-case__wordmark { width: clamp(10rem, 20vw, 17rem); }
          .p4-case__client { width: clamp(7rem, 11vw, 10rem); }
          .p4-case__line {
            max-width: 26rem;
            font-size: clamp(1.1rem, 1.9vw, 1.6rem);
          }
          .p4-case__line .p3-en { font-size: clamp(0.85rem, 1.2vw, 1.05rem); }
          .p4-case__stories { gap: 0.75rem; }
          .p4-case__metrics { gap: 0.75rem; align-self: start; max-width: 40rem; }
          .p4-case__metric { padding: 0.9rem 1rem; gap: 0.3rem; }
          .p4-case__mval { font-size: clamp(1.4rem, 2.6vw, 2.2rem); }
          .p4-case__mlab { font-size: 0.8rem; }
          .p4-case__mlab .p3-en { font-size: 0.7rem; }
          .p4-case__mper { font-size: 0.62rem; }
          .p4-case__msrc { font-size: 0.66rem; }
        }
      `}</style>

      {/* ── Design system do deck + layout responsivo (mobile-first) ─────────── */}
      <DeckStyles />
    </div>
  )
}
