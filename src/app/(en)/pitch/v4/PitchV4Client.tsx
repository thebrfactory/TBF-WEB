'use client'

// =============================================================================
// PITCH 4.0 CLIENT · working deck, 8 cenas + capa
// -----------------------------------------------------------------------------
// NASCEU CÓPIA DA 3.0 (pedido do fundador, CHANGES #01, 19/10/2026), pela mesma
// razão com que a 3.0 nasceu da 2.0: divergir sem tocar no deck que já foi
// apresentado. O casco (DeckShell) e o conteúdo da 3.0 (`v3-scenes.ts`) são
// reaproveitados; só o que é novo mora em `v4-scenes.ts`.
//
// O QUE A 4.0 ACRESCENTA
//   1. Cronômetro de 10 minutos no canto (`DeckTimer.tsx`).
//   2. cena-01: o fundador (jornada e o que faz), logo depois da capa.
//   3. cena-05: cada vertical ganha o anel de avatar e abre o StoryPlayer
//      (layout padrão de stories, `npm run check:stories`).
//   4. cena-07: a parceria e a empresa (CNPJ, regime INOVA SIMPLES) mescladas.
// As cenas 02 a 08 são as 01 a 07 da 3.0, renumeradas. Decisões de layout das
// cenas herdadas estão documentadas no `PitchV3Client.tsx`.
// Mobile-first. Prefixo de CSS novo: `.p4-*`.
// =============================================================================

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
import { COVER, REFERENCE, ARGUMENT, BUSINESS, CASE, PARTNERSHIP_OPEN, CLOSE } from '@/content/pitch/v3-scenes'
import type { PartnerScene } from '@/content/pitch/v3-scenes'
import { SCENES_V4, TOTAL_V4, FOUNDER, COMPANY, VERTICAL_STORIES } from '@/content/pitch/v4-scenes'
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
  Numeral,
  PitchReveal,
  S,
} from '@/components/DeckShell/DeckShell'

const EDITORIAL_VIDEO = {
  desktop: { av1: '/videos/editorial-desktop.av1.mp4', h264: '/videos/editorial-desktop.mp4' },
  mobile: { av1: '/videos/editorial-mobile.av1.mp4', h264: '/videos/editorial-mobile.mp4' },
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

// Filme do case (cena-06): vertical, em laço e mudo. Com prefers-reduced-motion
// fica parado no poster.
function CaseFilm() {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) ref.current?.pause()
  }, [])
  return (
    <div className="p4-case__media">
      <video
        ref={ref}
        className="p4-case__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={CASE.video.poster}
        aria-label={CASE.video.alt.pt}
      >
        <source src={CASE.video.srcAv1} type='video/mp4; codecs="av01.0.05M.08"' />
        <source src={CASE.video.src} type="video/mp4" />
      </video>
    </div>
  )
}

// 20/10/2026 (pedido do fundador): cartão limpo e padronizado. A área de clique
// é um botão que cobre o cartão (aria-expanded); o anel e o link ficam por cima
// dele, fora do botão, porque controle dentro de controle é inválido.
// Campos iguais nos quatro, na mesma ordem: nome, o que é, por que existe, formas.
// `proof` (só a THE FIORE DAILY. tem) não entra: campo que só um cartão tem
// quebra o padrão. O dado segue em v3-scenes.ts.
function PortfolioCard({
  item,
  delay,
  open,
  onToggle,
  onOpenStory,
}: {
  item: (typeof BUSINESS.portfolio)[number]
  delay: number
  open: boolean
  onToggle: () => void
  onOpenStory: () => void
}) {
  const story = VERTICAL_STORIES[item.name]

  return (
    <PitchReveal delay={delay} style={{ display: 'flex', flex: open ? '3.2 1 0' : '1 1 0', minWidth: 0, transition: `opacity 900ms ${EASE} ${delay}ms, transform 900ms ${EASE} ${delay}ms, filter 900ms ${EASE} ${delay}ms, flex-grow 600ms ${EASE}` }}>
      <div className={`p4-vc${open ? ' p4-vc--open' : ''}`}>
        <button
          type="button"
          className="p4-vc__hit"
          aria-expanded={open}
          aria-label={`${open ? 'Fechar' : 'Expandir'}: ${item.name}`}
          onClick={onToggle}
        />
        <span className="p4-vc__hint" aria-hidden="true">
          EXPAND
        </span>

        <div className="p4-vc__body">
          <div className="p4-vc__head">
          {story ? (
            <div className="p4-vc__ring">
              <StoryRing
                cover={story.avatar}
                alt={item.name}
                size={48}
                ariaLabel={`Abrir stories: ${item.name}`}
                onClick={onOpenStory}
              />
            </div>
          ) : null}
          <div className="p4-vc__id">
          <p className="p3-portfolio-name p4-vc__name" style={{ color: PAPER }}>
            {item.name}
          </p>
          <p className="p4-vc__desc">{item.role.pt}</p>
          </div>
          </div>

          <div className="p4-vc__more">
            <div className="p4-vc__more-inner">
              <p className="p4-vc__field">
                <span className="p3-label">Por que existe</span>
                {item.why.pt}
              </p>
              <p className="p4-vc__field">
                <span className="p3-label">Como ganha forma</span>
                {item.forms.pt}
              </p>
              <Link href={item.href} className="p4-vc__link">
                Ver página &#8594;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PitchReveal>
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
  // Índice da vertical aberta no StoryPlayer (cena-05); null = fechado.
  const [verticalStory, setVerticalStory] = useState<number | null>(null)
  // Índice do cartão de vertical expandido (cena-05); null = todos fechados.
  const [openVertical, setOpenVertical] = useState<number | null>(null)
  const verticalGroups = BUSINESS.portfolio.map((v) => {
    const st = VERTICAL_STORIES[v.name]
    return {
      id: st.handle,
      handle: st.handle,
      avatarSrc: st.avatar,
      items: st.items,
    }
  })
  const caseStoryLabel = 'Peças da campanha VERÃOZÃO / VERÃOZÃO campaign pieces'
  return (
    <div className="p3-deck">
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
      <section id="cena-01" style={{ ...S, background: '#111110' }} aria-label="O Fundador / The Founder">
        <Numeral n="01" />
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
          </PitchReveal>

          {/* O PORTFÓLIO EM MOVIMENTO (20/10/2026): colunas em esteira vertical
              lenta, sentidos alternados, cada uma com a lista duplicada para o
              laço fechar sem salto. Decorativo (aria-hidden). */}
          <PitchReveal delay={320} style={{ minHeight: 0, height: '100%' }}>
            <div className="p4-reel" aria-hidden="true">
              {FOUNDER.reel.map((col, ci) => (
                <div key={ci} className={`p4-reel__col p4-reel__col--${ci}`}>
                  <div className="p4-reel__track">
                    {[...col, ...col].map((src, i) => (
                      <div key={`${src}-${i}`} className="p4-reel__tile">
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(max-width: 767px) 66vw, 30vw"
                          quality={92}
                          className="p4-reel__img"
                          loading={i < col.length ? 'eager' : 'lazy'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
        <Numeral n="03" />
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

      {/* ── CENA 03 · A PERGUNTA, O CONTEXTO E A TESE ───────────────────────────
             UMA composição em TRÊS TEMPOS, não três telas coladas: a pergunta
             abre a tensão, o contexto mostra onde o valor vaza, a tese resolve.
             Os três tempos são revelados em sequência, com delay crescente, e a
             tese carrega o maior peso visual da cena. ─────────────────────── */}
      <section id="cena-04" style={{ ...S, background: '#111110' }} aria-label="A Pergunta e a Tese / The Question and the Thesis">
        <Numeral n="04" />
        <Kicker n="04" pt="A Pergunta e a Tese" en="The Question and the Thesis" />

        {/* Tempo 1, a pergunta */}
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
            como um par, que é o que são. Mesma caixa do resto do deck (fundo
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
            que continuam sendo a tensão e a resolução, o contexto era a ponte
            entre elas, e sem ele a tese responde a pergunta diretamente.

            O conteúdo NÃO foi apagado: `ARGUMENT.context` segue inteiro em
            `v3-scenes.ts`. Para devolver qualquer uma das três, é reescrever
            este bloco a partir do histórico deste arquivo. */}

        {/* Tempo 2, a tese: resolução da cena, maior peso visual */}
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
      <section id="cena-05" style={{ ...S }} aria-label="Da Cultura ao Negócio / From Culture to Business">
        <Numeral n="05" />
        <Kicker n="05" pt="Da Cultura ao Negócio" en="From Culture to Business" />

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
            uma pergunta só, quais são as propriedades.

            `BUSINESS.method` continua em `v3-scenes.ts`, intacto: o conteúdo não
            foi apagado, só não é mais desenhado aqui. */}

        {/* O portfólio: quatro propriedades, expansíveis. */}
        <PitchReveal delay={500}>
          <p className="p3-portfolio-subtitle" style={{ margin: 'var(--p3-gap-sm) 0' }}>
            {BUSINESS.portfolioSubtitle}
          </p>
        </PitchReveal>

        {/* 20/10/2026: cartões limpos, um aberto por vez. Fechado: anel + nome +
            descrição curta da metade para a base. Hover mostra EXPAND; clique
            (ou toque) expande no mesmo cartão, com os mesmos campos em todos. */}
        <div className="p4-verticals">
          {BUSINESS.portfolio.map((item, i) => (
            <PortfolioCard
              key={item.name}
              item={item}
              delay={560 + i * 70}
              open={openVertical === i}
              onToggle={() => setOpenVertical(openVertical === i ? null : i)}
              onOpenStory={() => setVerticalStory(i)}
            />
          ))}
        </div>

        {verticalStory !== null ? (
          <StoryPlayer
            groups={verticalGroups}
            startGroup={verticalStory}
            label="Stories das quatro verticais / Stories of the four verticals"
            onClose={() => setVerticalStory(null)}
          />
        ) : null}

        {/* A frase de visão ("E o caminho tem direção declarada...") e a tradução
            saíram (20/10/2026): não cabiam limpas. Texto em BUSINESS.vision. */}
      </section>

      {/* ── CENA 05 · CASE SELECIONADO ───────────────────────────────────────────
             Mídia protagonista, texto mínimo. O filme vertical dá a atmosfera;
             as nove imagens correm em faixa horizontal, respeitando o arco
             narrativo do array (atmosfera → no ar), sem empurrar a cena para
             fora da tela: o scroll é da faixa, não da cena. ────────────────── */}
      <section id="cena-06" style={{ ...S, background: '#111110' }} aria-label="Case Selecionado / Selected Case">
        <Numeral n="06" />
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
      <section id="cena-07" style={{ ...S }} aria-label={`${partner.kicker.pt} / ${partner.kicker.en}`}>
        <Numeral n="07" />
        <Kicker n="07" pt={partner.kicker.pt} en={partner.kicker.en} />

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

        {/* RODAPÉ DISCRETO (pedido do fundador 20/10/2026). Hipóteses e o bloco
            INOVA SIMPLES saíram da tela; regime, razão social, CNPJ e sede
            viram uma linha só, em corpo miúdo. Os textos seguem em
            `partner.hypotheses` e `COMPANY.regimeText`. */}
        <PitchReveal delay={600}>
          <p className="p4-fineprint">
            <span className="p4-fineprint__part">
              {COMPANY.legalName}, startup no regime {COMPANY.regime}
            </span>
            <span className="p4-fineprint__sep" aria-hidden="true"> · </span>
            <span className="p4-fineprint__part">CNPJ {COMPANY.cnpj}</span>
            <span className="p4-fineprint__sep" aria-hidden="true"> · </span>
            <span className="p4-fineprint__part">{COMPANY.address}</span>
          </p>
        </PitchReveal>
      </section>

      {/* ── CENA 07 · FECHO ──────────────────────────────────────────────────── */}
      <section
        id="cena-08"
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

        /* ─── Cena 01: o fundador + portfólio em movimento (20/10/2026) ─────── */
        .p4-founder {
          position: relative;
          z-index: 1;
          flex: 1 1 auto;
          min-height: 0;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto minmax(0, 1fr);
          gap: clamp(0.6rem, 1.8vh, 1.25rem);
          margin-top: var(--p3-gap-sm);
        }
        .p4-founder__id {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .p4-founder__img {
          width: clamp(3.5rem, min(20vw, 11vh), 6.5rem);
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
          font-size: clamp(0.95rem, min(3vw, 2.6vh), 1.3rem);
          line-height: 1.1;
        }
        .p4-founder__alias {
          margin: 0.1rem 0 0.3rem;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(0.7rem, min(2.2vw, 2vh), 0.9rem);
          letter-spacing: 0.06em;
        }
        .p4-reel {
          height: 100%;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.5rem;
          overflow: hidden;
          /* Esmaece topo e base, bem sutil (22/10/2026): máscara de 4%, que parte
             de 65% de opacidade. Não é camada por cima da imagem. */
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0, #000 4%, #000 96%, rgba(0, 0, 0, 0.65) 100%);
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0, #000 4%, #000 96%, rgba(0, 0, 0, 0.65) 100%);
        }
        .p4-reel__col {
          min-width: 0;
          overflow: hidden;
        }
        .p4-reel__col--3 {
          display: none;
        }
        .p4-reel__track {
          display: flex;
          flex-direction: column;
          animation: p4-reel 80s linear infinite;
          will-change: transform;
        }
        .p4-reel__col--0 .p4-reel__track { animation-duration: 70s; }
        .p4-reel__col--1 .p4-reel__track { animation-duration: 90s; animation-direction: reverse; animation-delay: -25s; }
        .p4-reel__col--2 .p4-reel__track { animation-duration: 80s; animation-delay: -40s; }
        .p4-reel__col--3 .p4-reel__track { animation-duration: 100s; animation-direction: reverse; animation-delay: -10s; }
        .p4-reel__tile {
          position: relative;
          flex: none;
          aspect-ratio: 4 / 5;
          margin-bottom: 0.5rem;
          border-radius: var(--tbf-radius-card);
          overflow: hidden;
          background: #0a0a09;
        }
        .p4-reel__img {
          object-fit: cover;
        }
        @keyframes p4-reel {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .p4-reel__track { animation: none; }
        }

        /* ─── Cena 05: cartões das verticais (20/10/2026) ───────────────────── */
        .p4-verticals {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: var(--p3-gap-sm);
          max-width: var(--p3-inner);
        }
        .p4-vc {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 0.75rem 0.9rem 0.75rem 0.75rem;
          background: #0a0a09;
          border-left: 3px solid ${PAPER};
          border-radius: var(--tbf-radius-card);
          overflow: hidden;
          transition: border-color 400ms ${EASE};
        }
        .p4-vc--open {
          border-color: ${ACCENT};
        }
        .p4-vc__hit {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          background: none;
          border: 0;
          padding: 0;
          cursor: pointer;
          border-radius: inherit;
        }
        .p4-vc__hit:focus-visible {
          outline: 2px solid ${ACCENT};
          outline-offset: -2px;
        }
        /* 22/10/2026: destaque (anel), nome e descrição são UM bloco, igual nos
           quatro. Mobile: anel à esquerda, texto à direita. Desktop: anel em cima,
           nome e descrição embaixo, ancorados na base do cartão. */
        .p4-vc__ring {
          position: relative;
          z-index: 3;
          flex: none;
          pointer-events: auto;
        }
        .p4-vc__hint {
          position: absolute;
          z-index: 2;
          bottom: 0.7rem;
          right: 0.9rem;
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          color: ${ACCENT};
          opacity: 0;
          pointer-events: none;
          transition: opacity 300ms ${EASE};
        }
        @media (hover: hover) {
          .p4-vc:hover .p4-vc__hint { opacity: 1; }
        }
        @media (hover: none) {
          .p4-vc__hint { opacity: 0.6; }
        }
        .p4-vc--open .p4-vc__hint { opacity: 0 !important; }
        .p4-vc__body {
          position: relative;
          pointer-events: none;
        }
        .p4-vc__head {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.85rem;
        }
        .p4-vc__id {
          min-width: 0;
          flex: 1 1 auto;
        }
        .p4-vc .p4-vc__name {
          margin: 0;
          font-size: clamp(0.72rem, 3.1vw, 0.95rem);
          letter-spacing: -0.03em;
          line-height: 1.15;
          white-space: normal;
        }
        .p4-vc__desc {
          margin: 0.3rem 0 0;
          padding-right: 3rem;
          min-height: calc(3 * 1.35em);
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: 0.74rem;
          line-height: 1.35;
          color: rgba(240, 237, 230, 0.62);
        }
        .p4-vc__more {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          visibility: hidden;
          transition: grid-template-rows 600ms ${EASE}, opacity 400ms ${EASE}, visibility 0s linear 600ms;
        }
        .p4-vc--open .p4-vc__more {
          grid-template-rows: 1fr;
          opacity: 1;
          visibility: visible;
          transition-delay: 0s, 120ms, 0s;
        }
        .p4-vc__more-inner {
          min-height: 0;
          overflow: hidden;
        }
        .p4-vc__field {
          margin: 0.6rem 0 0;
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: 0.74rem;
          line-height: 1.4;
          color: rgba(240, 237, 230, 0.72);
        }
        .p4-vc__field .p3-label {
          display: block;
          margin-bottom: 0.1rem;
          color: ${ACCENT};
        }
        .p4-vc__link {
          position: relative;
          z-index: 3;
          pointer-events: auto;
          display: inline-block;
          margin-top: 0.7rem;
          padding: 0.3rem 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          text-decoration: none;
          color: ${ACCENT};
        }

        /* ─── Cena 06: o filme é o protagonista (20/10/2026) ────────────────── */
        .p4-case {
          position: relative;
          z-index: 1;
          flex: 1 1 auto;
          min-height: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-top: var(--p3-gap-sm);
        }
        .p4-case__media {
          height: 100%;
          display: flex;
        }
        .p4-case__video {
          height: 100%;
          width: auto;
          max-width: 100%;
          aspect-ratio: 9 / 16;
          object-fit: cover;
          border-radius: var(--tbf-radius-card);
          background: #000000;
        }
        .p4-case__copy {
          flex: none;
          display: grid;
          grid-template-columns: 1fr auto;
          column-gap: 0.9rem;
          align-items: center;
        }
        .p4-case__copy > :nth-child(3) {
          grid-column: 2;
          grid-row: 1 / span 2;
        }
        .p4-case__brand {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }
        .p4-case__brand .p3-case-title {
          margin: 0;
        }
        .p4-case__wordmark {
          width: 5.6rem;
          height: auto;
          display: block;
        }
        .p4-case__client {
          width: 4.8rem;
          height: auto;
          display: block;
        }
        .p4-case__line {
          margin: 0.3rem 0 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 600;
          font-size: 0.82rem;
          line-height: 1.3;
          color: ${PAPER};
        }
        .p4-case__stories {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
        }

        /* ─── Cena 07: rodapé discreto (20/10/2026) ─────────────────────────── */
        .p4-fineprint {
          position: relative;
          z-index: 1;
          margin: var(--p3-gap-sm) 0 0;
          max-width: var(--p3-measure-wide);
          font-family: var(--tbf-font-family-printed);
          font-weight: 400;
          font-size: 0.64rem;
          line-height: 1.45;
          letter-spacing: 0.02em;
          color: rgba(240, 237, 230, 0.42);
        }

        .p4-fineprint__part { display: block; }
        .p4-fineprint__sep { display: none; }

        @media (min-width: 768px) {
          .p4-fineprint__part { display: inline; }
          .p4-fineprint__sep { display: inline; }
          .p4-founder {
            margin-top: var(--p3-gap);
            grid-template-columns: minmax(14rem, 1fr) 2.2fr;
            grid-template-rows: minmax(0, 1fr);
            align-items: start;
          }
          .p4-reel {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0.75rem;
            /* Escala real (22/10/2026): peça de ~8rem, bem abaixo da resolução
               nativa dos arquivos (720px a 1600px de largura). */
            max-width: 36rem;
            justify-self: center;
            width: 100%;
          }
          .p4-reel__col--3 { display: block; }
          .p4-reel__tile { margin-bottom: 0.75rem; }

          .p4-verticals {
            flex: 1 1 auto;
            min-height: 0;
            max-height: 30rem;
            flex-direction: row;
            gap: 0.75rem;
          }
          .p4-vc {
            padding: 1rem;
          }
          .p4-vc__hint { top: 1.2rem; bottom: auto; right: 1rem; font-size: 0.66rem; }
          .p4-vc__body {
            margin-top: auto;
            padding-bottom: clamp(1rem, 7vh, 3.5rem);
            min-height: 0;
          }
          .p4-vc__head {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.9rem;
          }
          .p4-vc__id { width: 100%; }
          .p4-vc .p4-vc__name { font-size: clamp(0.6rem, 0.78vw, 0.9rem); }
          .p4-vc__desc { padding-right: 0; font-size: 0.72rem; }
          .p4-vc__field { font-size: 0.82rem; }
          .p4-vc__link { font-size: 0.8rem; }

          .p4-case {
            flex-direction: row;
            gap: clamp(2rem, 6vw, 5rem);
            align-items: stretch;
          }
          .p4-case > .pitch-reveal:first-child {
            flex: 0 0 auto !important;
          }
          .p4-case__copy {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 1.1rem;
          }
          .p4-case__brand { gap: 1.4rem; }
          .p4-case__wordmark { width: clamp(10rem, 20vw, 17rem); }
          .p4-case__client { width: clamp(7rem, 11vw, 10rem); }
          .p4-case__line {
            max-width: 26rem;
            font-size: clamp(1.1rem, 1.9vw, 1.6rem);
          }
          .p4-case__stories {
            flex-direction: row;
            gap: 0.75rem;
          }
          .p4-fineprint { font-size: 0.72rem; }
        }
      `}</style>

      {/* ── Design system do deck + layout responsivo (mobile-first) ─────────── */}
      <DeckStyles />
    </div>
  )
}
