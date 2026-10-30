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
import { OpeningScene } from './ThesisScene'
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

// ─── Mosaico do fundador (cena-01): esteira vertical, MESMA velocidade em todas ─
// Rodada 29/10 (CHANGES #01, itens 133 a 137). Pedido: "deixe todas essas peças na
// mesma velocidade". Velocidade em px/s é altura do laço ÷ duração; com a duração igual
// e laços de alturas diferentes, cada coluna andava num ritmo (61 a 78 px/s no desktop).
// Agora a duração de CADA coluna sai da altura do laço dela: `--p4-dur` = laço ÷
// REEL_PX_PER_S, medida no navegador porque o laço depende da largura da coluna, que muda
// com a tela. Sentido de cada coluna e defasagem entre elas ficam no CSS (`--p4-phase`).
//
// O laço é UMA cópia da lista. O trilho leva REEL_COPIES cópias e anda de 0 a uma cópia
// (-100% / REEL_COPIES), então a volta fecha sem emenda. O vão aparece quando a janela da
// coluna passa de (REEL_COPIES - 1) laços; com 3 cópias a janela pode ter até 2 laços
// (hoje ocupa de 18% a 40% de um laço, de 390 a 1440 de largura).
// Sem a medição (antes de montar) vale o 24s do CSS, igual para todas.
const REEL_PX_PER_S = 68
const REEL_COPIES = 3

function FounderReel() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const tune = () => {
      grid.querySelectorAll<HTMLElement>('.p4-reel__track').forEach((track) => {
        const height = parseFloat(getComputedStyle(track).height)
        // Coluna escondida no celular (display: none) não tem altura: fica no 24s do CSS
        // e é medida quando a grade mudar de largura e ela aparecer.
        if (!height) return
        track.style.setProperty('--p4-dur', `${(height / REEL_COPIES / REEL_PX_PER_S).toFixed(3)}s`)
      })
    }
    tune()
    const ro = new ResizeObserver(tune)
    ro.observe(grid)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="p4-reel" aria-hidden="true">
      <div className="p4-reel__grid" ref={gridRef}>
        {FOUNDER.reel.map((col, ci) => (
          <div key={ci} className={`p4-reel__col p4-reel__col--${ci}`}>
            <div className="p4-reel__track" style={{ '--p4-copies': REEL_COPIES } as React.CSSProperties}>
              {Array.from({ length: REEL_COPIES }, (_, copy) => (
                <Fragment key={copy}>
                  {col.map((t, i) => (
                    <div key={t.src} className="p4-reel__tile" style={{ aspectRatio: t.ar }}>
                      <Image
                        src={t.src}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 38vw, 20vw"
                        quality={90}
                        className="p4-reel__img"
                        loading={copy === 0 && i < 4 ? 'eager' : 'lazy'}
                      />
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Cartão de portfólio expansível (cena-05) ────────────────────────────────
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

// Sequência do case (cena-05, rodada 26/10/2026): as peças da campanha trocam
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
  // Rodada 29/10 (CHANGES #01, itens 139 e 140): o quadro 9:16 devolve só o
  // próprio quadro. A coluna do filme (`.p4-case__media`) passou para a cena,
  // porque quem manda na largura dele é a grade, não o conteúdo.
  return (
    <div className="p4-case__video" role="img" aria-label={VERAOZAO_REEL.alt.pt}>
      {frames.map((m, idx) => (
        <Image
          key={m.src}
          src={m.src}
          alt=""
          fill
          sizes="(max-width: 767px) 54vw, 30vw"
          quality={85}
          priority={idx < 2}
          className="p4-case__frame"
          style={{ visibility: idx === i ? 'visible' : 'hidden' }}
        />
      ))}
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

          {/* O PORTFÓLIO EM MOVIMENTO (20/10/2026, ampliado em 22/10/2026; rodada 29/10,
              CHANGES #01, itens 133 a 137): cinco colunas de 7 a 8 fotos (sem quadros de
              nome) em esteira vertical, sentidos alternados, a lista repetida para o laço
              fechar sem salto e uma velocidade só para todas (`FounderReel`, acima). As
              bordas somem por máscara (sem corte duro). Decorativo (aria-hidden). */}
          <PitchReveal delay={320} style={{ minHeight: 0, height: '100%' }}>
            <FounderReel />
          </PitchReveal>
        </div>
      </section>

      {/* ── CENA 02 · ABERTURA ────────────────────────────────────────────────────
             As duas telas antigas (o hero da home + a Abertura) viraram uma:
             o vídeo editorial dá a presença, o letreiro do fundador dá a
             frase, e Culture™ mora aqui, onde o direcionamento pede que
             esteja. A cena não usa mais o HomeHero, e o Ticker sai do deck. */}
      {/* Rodada 26/10 tarde: a pergunta e a tese (antiga cena 04) moram aqui,
             como camada sobre o mesmo video, por toque. `ThesisScene.tsx`. */}
      <OpeningScene
        background={
          <>
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

          </>
        }
        cover={
          <>
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                padding: 'clamp(2rem, 6vw, 5rem)',
                paddingBottom: 'clamp(5.75rem, 8vw, 7rem)',
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
          </>
        }
      />

      {/* ── CENA 03 · CAMPO DE REFERÊNCIA ───────────────────────────────────── */}
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

      {/* ── CENA 04 · DA CULTURA AO NEGOCIO (rodada 23/10/2026) ──────────────────
             As quatro frentes empilhadas; cada uma abre em tela cheia.
             Fundiu as antigas cenas 06 e 07. `FrontsScene.tsx`. */}
      <FrontsScene />

      {/* ── CENA 05 · CASE SELECIONADO ───────────────────────────────────────────
             Mídia protagonista, texto mínimo. O filme vertical dá a atmosfera;
             as nove imagens correm em faixa horizontal, respeitando o arco
             narrativo do array (atmosfera → no ar), sem empurrar a cena para
             fora da tela: o scroll é da faixa, não da cena. ────────────────── */}
      <section id="cena-05" style={{ ...S, background: '#000000' }} aria-label="Case Selecionado / Selected Case">
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
        {/* 20/10/2026 (pedido do fundador): o filme da campanha é o protagonista,
            grande; o resto cai para título curto, uma frase e o anel de stories.
            O parágrafo longo (CASE.body) e a tradução do corpo saíram da tela; o
            texto segue em v3-scenes.ts. O filme é vertical e entra como veio. */}
        {/* RODADA 29/10 (CHANGES #01, itens 139 e 140): "acho que pode melhorar
            esse layout". A grade agora é travada pela ALTURA DO FILME. O filme
            ocupa a caixa útil da cena inteira (do kicker ao respiro do passador)
            e a coluna de texto nasce e termina nas mesmas duas linhas dele:
            identidade, título e anel de stories em cima; os três números em
            cartões iguais embaixo, esticados até a borda direita; a fonte fecha
            a base. Antes o texto boiava no meio e um terço da tela ficava vazio.

            Ordem de leitura = ordem do DOM = hierarquia pedida: filme, logos,
            título, anel, números, fonte. No celular a ordem é a mesma (filme à
            esquerda, texto ao lado, números embaixo). Não empilha: o story é
            9:16 e em 350px de largura um filme empilhado teria ~125px. */}
        <div className="p4-case">
          <div className="p4-case__media">
            <PitchReveal delay={100}>
              <CaseFilm />
            </PitchReveal>
          </div>

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
              `VERAOZAO_METRICS` (v4-scenes.ts). Rodada 29/10 (CHANGES #01, itens
              139 e 140): os três cartões têm largura e altura iguais (três
              colunas iguais, uma linha que estica) e a fonte saiu da grade dos
              cartões para fechar a base da coluna, alinhada à base do filme. */}
          <div className="p4-case__stats">
            <PitchReveal delay={420}>
              <div className="p4-case__metrics">
                {VERAOZAO_METRICS.map((m) => (
                  <div key={m.value} className="p4-case__metric">
                    <span className="p4-case__mval">{m.value}</span>
                    <span className="p4-case__mtxt">
                      <span className="p4-case__mlab">
                        {m.label.pt}
                        <En>{m.label.en}</En>
                      </span>
                      <span className="p4-case__mper">{m.period.pt}</span>
                    </span>
                  </div>
                ))}
              </div>
            </PitchReveal>
            <PitchReveal delay={500}>
              <p className="p4-case__msrc">{VERAOZAO_SOURCE.pt}</p>
            </PitchReveal>
          </div>

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
          height: calc(100% + 0.6rem);
          margin-top: -0.6rem;
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
        .p4-reel__col--3,
        .p4-reel__col--4 {
          display: none;
        }
        .p4-reel__track {
          display: flex;
          flex-direction: column;
          /* Rodada 29/10 (CHANGES #01, itens 133 a 137): a duração NÃO é fixa por coluna.
             A variável --p4-dur (altura do laço ÷ velocidade) vem do FounderReel, coluna a
             coluna, então todas andam em px/s iguais mesmo com laços de alturas diferentes.
             O 24s é só o ponto de partida antes da medição. O atraso é uma FRAÇÃO da
             duração (--p4-phase): a defasagem entre colunas sobrevive à troca de duração. */
          animation: p4-reel var(--p4-dur, 24s) linear infinite;
          animation-delay: calc(var(--p4-dur, 24s) * var(--p4-phase, 0) * -1);
          will-change: transform;
        }
        /* Sentidos como estavam: pares sobem, ímpares descem. Fases = os atrasos antigos
           sobre as durações antigas (9/28, 14/26, 5/30, 11/27). */
        .p4-reel__col--1 .p4-reel__track { --p4-phase: 0.32; animation-direction: reverse; }
        .p4-reel__col--2 .p4-reel__track { --p4-phase: 0.54; }
        .p4-reel__col--3 .p4-reel__track { --p4-phase: 0.17; animation-direction: reverse; }
        .p4-reel__col--4 .p4-reel__track { --p4-phase: 0.41; }
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
        /* O trilho leva --p4-copies cópias da lista (posta pelo FounderReel) e anda de 0
           a UMA cópia: -100% é a altura de todas, então divide pelo número delas. */
        @keyframes p4-reel {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-100% / var(--p4-copies, 3))); }
        }
        @media (prefers-reduced-motion: reduce) {
          .p4-reel__track { animation: none; }
        }

        /* ─── Cena 05: o filme manda na grade (20/10/2026; números 22/10/2026 b;
           recomposta na rodada 29/10, CHANGES #01, itens 139 e 140) ──────────
           A GRADE SAI DA ALTURA DO FILME, não do conteúdo. A variável --p4c-h é a
           caixa útil da cena: o mesmo cálculo do objeto S do casco (janela, menos
           a faixa pinada do topo, o reservado do kicker e o respiro do passador).
           A largura do filme é escrita em número (9:16 dessa altura no desktop,
           uma fração da largura no celular) e não mais "auto" + aspect-ratio:
           a coluna "auto" dependia da altura da linha, que dependia da coluna,
           e o Safari do iPhone fechava esse ciclo em ZERO (o filme sumia no
           celular; medido no WebKit 390x844). Com a largura declarada não há
           ciclo para resolver.

           Celular: filme à esquerda, identidade, título e anel ao lado (topo e
           base alinhados ao filme), três cartões iguais embaixo e a fonte.
           Desktop (1024+): filme na altura útil inteira; a coluna da direita
           nasce e termina nas mesmas duas linhas dele, e os cartões esticam até
           a borda direita. */
        .p4-case {
          --p4c-h: calc(100dvh - var(--p3-band) - var(--p3-kicker-reserve) - var(--p3-foot));
          /* O que a fileira dos números pede abaixo do filme: cartões, fonte e respiro. */
          --p4c-rows: calc(10.4rem + var(--p3-gap-lg));
          --p4c-vw: min(
            calc((var(--p4c-h) - var(--p4c-rows)) * 9 / 16),
            calc((100vw - 2 * var(--p3-pad-x)) * 0.54)
          );
          position: relative;
          z-index: 1;
          flex: 1 1 auto;
          min-height: 0;
          display: grid;
          grid-template-columns: var(--p4c-vw) minmax(0, 1fr);
          grid-template-rows: auto auto;
          align-content: start;
          column-gap: var(--p3-gap);
          row-gap: var(--p3-gap-lg);
        }
        .p4-case__media {
          grid-column: 1;
          grid-row: 1;
          min-width: 0;
        }
        .p4-case__video {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 16;
          overflow: hidden;
          border-radius: var(--tbf-radius-card);
          background: #000000;
        }
        .p4-case__frame { object-fit: cover; }
        .p4-case__copy {
          grid-column: 2;
          grid-row: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--p3-gap);
        }
        .p4-case__brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--p3-gap);
        }
        .p4-case__brand .p3-case-title {
          margin: 0;
        }
        /* O PNG do letreiro traz um halo largo em volta da palavra: a caixa mede
           900x591 e a letra sólida fica no meio, com 54% da largura e 30% da
           altura. Dimensionar pela caixa deixa a letra boiando longe do topo do
           filme e da borda do texto. A variável --p4c-core é a largura da LETRA: a imagem
           nasce 1,844x maior e as margens negativas devolvem o halo ao vazio, de
           modo que a caixa de layout é a própria letra. O brilho continua
           desenhado por fora da caixa, e é isso que alinha o logo ao filme. */
        .p4-case__wordmark {
          --p4c-core: 6.4rem;
          display: block;
          width: calc(var(--p4c-core) * 1.844);
          max-width: none;
          height: auto;
          margin: calc(var(--p4c-core) * -0.42);
        }
        .p4-case__client {
          display: block;
          width: 5.2rem;
          height: auto;
        }
        .p4-case__line {
          margin: 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 700;
          font-size: 0.84rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: ${PAPER};
          text-wrap: balance;
        }
        .p4-case__line .p3-en {
          margin-top: 0.3rem;
          font-size: 0.68rem;
          line-height: 1.2;
          font-weight: 300;
        }
        .p4-case__stories {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: var(--tbf-space-3);
        }
        .p4-case__stories .p3-label {
          color: rgba(240, 237, 230, 0.72);
        }
        /* Os três números: UMA fileira de cartões de largura e altura iguais
           (três colunas 1fr, linha 1fr), com o número no alto e o texto na
           base de cada cartão. A fonte fecha a base da coluna. */
        .p4-case__stats {
          grid-column: 1 / -1;
          grid-row: 2;
          min-width: 0;
          min-height: 0;
          display: flex;
          flex-direction: column;
          gap: var(--p3-gap-sm);
        }
        .p4-case__stats > .pitch-reveal:first-child {
          flex: 1 1 auto;
          display: flex;
        }
        .p4-case__metrics {
          flex: 1 1 auto;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-auto-rows: 1fr;
          gap: var(--tbf-space-2);
        }
        .p4-case__metric {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: var(--tbf-space-3);
          min-width: 0;
          padding: var(--tbf-space-3) 0.6rem;
          background: #050505;
          border-radius: var(--tbf-radius-card);
        }
        .p4-case__mval {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(1.1rem, 5.4vw, 1.6rem);
          line-height: 1;
          letter-spacing: -0.04em;
          color: ${ACCENT};
        }
        .p4-case__mtxt {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .p4-case__mlab {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: 0.66rem;
          line-height: 1.2;
          color: rgba(240, 237, 230, 0.85);
        }
        .p4-case__mlab .p3-en { font-size: 0.58rem; line-height: 1.15; }
        .p4-case__mper {
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: 0.52rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(240, 237, 230, 0.5);
        }
        .p4-case__msrc {
          margin: 0;
          font-family: var(--tbf-font-family-printed);
          font-weight: 400;
          font-size: 0.6rem;
          line-height: 1.3;
          letter-spacing: 0.04em;
          color: rgba(240, 237, 230, 0.5);
        }

        /* Tablet: a mesma grade do celular, com a tipografia e os cartões maiores. */
        @media (min-width: 768px) {
          .p4-case__wordmark { --p4c-core: clamp(9rem, 20vw, 13rem); }
          .p4-case__client { width: clamp(6.5rem, 14vw, 9rem); }
          .p4-case__line { font-size: clamp(1.1rem, 2.6vw, 1.5rem); }
          .p4-case__line .p3-en { font-size: clamp(0.82rem, 1.7vw, 1rem); }
          .p4-case__stories .p3-label { font-size: 0.74rem; }
          .p4-case__metrics { gap: var(--tbf-space-3); }
          .p4-case__metric { padding: var(--tbf-space-4); }
          .p4-case__mval { font-size: clamp(1.7rem, 4.4vw, 2.6rem); }
          .p4-case__mlab { font-size: 0.82rem; }
          .p4-case__mlab .p3-en { font-size: 0.7rem; }
          .p4-case__mper { font-size: 0.62rem; }
          .p4-case__msrc { font-size: 0.68rem; }
        }

        /* Desktop: filme na altura útil inteira (9:16 dela, com teto de 32% da
           largura) e a coluna de texto nas mesmas duas linhas dele. A altura da
           grade é a do filme, então a base da fonte cai na base do filme mesmo
           numa janela alta e estreita. Todo corpo de letra leva um termo em vh,
           como o resto do deck: janela baixa, o conjunto encolhe junto. */
        @media (min-width: 1024px) {
          .p4-case {
            --p4c-vw: min(calc(var(--p4c-h) * 9 / 16), 32vw);
            flex: none;
            height: calc(var(--p4c-vw) * 16 / 9);
            grid-template-rows: auto minmax(0, 1fr);
            column-gap: clamp(2rem, 4.5vw, 5rem);
          }
          .p4-case__media { grid-row: 1 / span 2; }
          .p4-case__copy { justify-content: flex-start; gap: var(--p3-gap-lg); }
          .p4-case__brand { flex-direction: row; align-items: center; gap: clamp(1.5rem, 3.2vw, 3.5rem); }
          .p4-case__wordmark { --p4c-core: clamp(9.5rem, min(16vw, 27vh), 20rem); }
          .p4-case__client { width: clamp(6.5rem, min(12vw, 20vh), 14rem); }
          .p4-case__line {
            max-width: 30em;
            font-size: clamp(1.7rem, min(3.4vw, 5.6vh), 3.9rem);
            line-height: 1.06;
            letter-spacing: -0.03em;
          }
          .p4-case__line .p3-en {
            margin-top: 0.55em;
            font-size: clamp(1rem, min(1.45vw, 2.4vh), 1.4rem);
            line-height: 1.25;
          }
          .p4-case__stories { gap: var(--tbf-space-4); }
          .p4-case__stories .p3-label { font-size: clamp(0.72rem, 0.9vw, 0.9rem); }
          .p4-case__stats { grid-column: 2; }
          .p4-case__metrics { gap: var(--p3-gap); }
          .p4-case__metric { padding: clamp(0.9rem, 1.5vw, 1.5rem); }
          .p4-case__mval { font-size: clamp(2.2rem, min(4vw, 7.2vh), 4.6rem); }
          .p4-case__mtxt { gap: 0.5rem; }
          .p4-case__mlab { font-size: clamp(0.8rem, min(1.1vw, 1.9vh), 1.15rem); }
          .p4-case__mlab .p3-en { font-size: clamp(0.7rem, min(0.95vw, 1.6vh), 0.98rem); }
          .p4-case__mper { font-size: clamp(0.6rem, 0.72vw, 0.78rem); }
          .p4-case__msrc { font-size: clamp(0.64rem, 0.78vw, 0.8rem); }
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
          /* Rodada 26/10 tarde: cinco colunas e o mosaico sobe 3.25rem (~52px). */
          .p4-reel { height: calc(100% + 3.25rem); margin-top: -3.25rem; }
          .p4-reel__grid {
            align-content: center;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 0.8rem;
            padding-inline: 0.8rem;
          }
          .p4-reel__col--2,
          .p4-reel__col--3,
          .p4-reel__col--4 { display: block; }
          .p4-reel__tile { margin-bottom: 0.8rem; }
          /* Rodada 29/10 (CHANGES #01, itens 139 e 140): as regras do case
             saíram daqui e moram juntas, em Cena 05, mais acima. */
        }
      `}</style>

      {/* ── Design system do deck + layout responsivo (mobile-first) ─────────── */}
      <DeckStyles />
    </div>
  )
}
