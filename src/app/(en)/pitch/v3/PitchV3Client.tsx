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
import Link from 'next/link'
import { PressLogosCarousel } from '../PressLogosCarousel'
import { HeroVideo } from '@/components/HeroVideo/HeroVideo'
import { HomeHero } from '@/components/HomeHero/HomeHero'
import { Ticker } from '@/components/Ticker/Ticker'
import { TbfWordmark } from './TbfWordmark'
import { SCENES, COVER, REFERENCE, ARGUMENT, BUSINESS, CASE, PARTNERSHIP, CLOSE } from '@/content/pitch/v3-scenes'

const ACCENT = '#FF6500'
const PAPER = '#F0EDE6'

// Curva canônica do design system. Substitui o `ease` genérico que a 2.0 usava:
// desaceleração longa, sem freada seca. É daqui que vem a fluidez.
const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'

const EDITORIAL_VIDEO = {
  desktop: { av1: '/videos/editorial-desktop.av1.mp4', h264: '/videos/editorial-desktop.mp4' },
  mobile: { av1: '/videos/editorial-mobile.av1.mp4', h264: '/videos/editorial-mobile.mp4' },
}

// ─── Camada de tradução ──────────────────────────────────────────────────────
// Um único componente para TODO inglês do deck. Trocar a régua da tradução vira
// uma edição só, em vez de dezenas de estilos inline espalhados.
function En({ children, size = 'sm' }: { children: React.ReactNode; size?: 'sm' | 'lead' }) {
  return <span className={size === 'lead' ? 'p3-en p3-en--lead' : 'p3-en'}>{children}</span>
}

// Cada bloco observa a si mesmo.
//
// A 2.0 tinha UM observer criado no mount da página, varrendo `.pitch-reveal`
// com querySelectorAll. Todo bloco que nascesse depois desse mount (hot-reload,
// re-render, conteúdo novo) ficava fora da lista e travava em `opacity: 0` —
// invisível para sempre, sem erro nenhum no console. Foi exatamente o que
// engoliu os cinco retratos da cena de referência em 2026-07-31.
//
// Com o observer amarrado ao próprio elemento por ref, não existe janela de
// tempo: o bloco só é observado depois de existir, sempre. O observer
// desconecta no primeiro reveal, porque a animação é de entrada e não se
// repete.
function PitchReveal({
  children,
  delay = 0,
  slot,
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  /**
   * BLOCO INVISÍVEL da régua. `head` marca a faixa do título da cena: ela
   * tem altura mínima reservada, então o primeiro bloco de corpo cai sempre na
   * mesma linha, com título de uma, duas ou três linhas. Ver `.p3-slot--head`.
   */
  slot?: 'head'
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
      el.style.filter = 'blur(0)'
    }

    // Sem IntersectionObserver (navegador antigo, ambiente de teste), o texto
    // aparece direto. Perder a animação é aceitável; perder o conteúdo não.
    if (typeof IntersectionObserver === 'undefined') {
      show()
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          show()
          obs.disconnect()
        })
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={slot ? `pitch-reveal p3-slot p3-slot--${slot}` : 'pitch-reveal'}
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        // O desfoque mínimo faz o texto "assentar" em vez de só deslizar.
        filter: 'blur(6px)',
        transition: `opacity 900ms ${EASE} ${delay}ms, transform 900ms ${EASE} ${delay}ms, filter 900ms ${EASE} ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Régua visível (conferência) ─────────────────────────────────────────────
// A régua do deck é invisível por definição. Esta é a forma de OLHAR para ela:
// `?grid=1` na URL sobrepõe as colunas e os dois trilhos (o do título e o do
// primeiro bloco de corpo). Sem o parâmetro, o componente não renderiza nada.
//
// O parâmetro é lido no efeito, e não por `useSearchParams`, de propósito: o
// hook do Next obrigaria a página inteira a nascer dentro de um limite de
// Suspense só por causa de uma ferramenta de conferência.
function GridRuler() {
  const [ligada, setLigada] = useState(false)

  useEffect(() => {
    setLigada(new URLSearchParams(window.location.search).has('grid'))
  }, [])

  if (!ligada) return null

  return (
    <div className="p3-ruler" aria-hidden="true">
      <div className="p3-ruler__cols" />
      <div className="p3-ruler__rail p3-ruler__rail--head" />
      <div className="p3-ruler__rail p3-ruler__rail--body" />
    </div>
  )
}

// ─── Navegação por setas ─────────────────────────────────────────────────────
// Avança e volta entre cenas. Teclado: ← → PageUp PageDown.
// As setas ↑ ↓ ficam com o scroll nativo de propósito, para não sequestrar
// o gesto mais comum de leitura.
function DeckNav() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    // Faixa fina no meio da tela: a cena que cruzar o centro é a ativa.
    // Threshold puro falharia nas seções mais altas que a viewport no mobile.
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const i = SCENES.findIndex((s) => s.id === e.target.id)
          if (i >= 0) setActive(i)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    SCENES.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  // Rolagem calculada à mão, não `scrollIntoView`.
  //
  // O `scrollIntoView({block:'start'})` MORRE NO MEIO quando o destino está
  // acima da posição atual: voltando da segunda cena para a capa, ele parava em
  // ~222px em vez de 0. `window.scrollTo` com o alvo já resolvido não sofre
  // disso. O desconto é o `scroll-margin-top` da própria seção (a faixa de nav
  // + letreiro pinada no topo), lido do CSS em vez de repetido aqui, para os
  // dois nunca se descolarem.
  //
  // O FOCO NO BOTÃO MATAVA A VIAGEM (bug relatado 2026-08-08: "quando aperto pra
  // voltar na página 2, não volta para a capa, fica parado no meio").
  //
  // A causa não é o encaixe de scroll, como parecia. Um clique de verdade deixa
  // o botão FOCADO. Ao chegar na capa, o botão "anterior" vira `disabled`, e
  // então o navegador precisa tirar o foco de um elemento desabilitado: essa
  // mudança de foco cancela a rolagem suave que ainda estava em voo, e a página
  // congela onde estiver (medido: 332px). Prova do diagnóstico, na build de
  // produção, saindo sempre do mesmo ponto: pela tecla ← chega em 0; por
  // `.click()` de script chega em 0; por clique de MOUSE para em 332; e com o
  // foco impedido no mousedown, o mesmo clique de mouse chega em 0.
  //
  // Por isso o foco sai ANTES de partir. Quem navega pelo teclado não perde
  // nada: as setas ← e → são ouvidas na janela, não no botão.
  const go = useCallback((index: number) => {
    const target = SCENES[Math.max(0, Math.min(SCENES.length - 1, index))]
    const el = document.getElementById(target.id)
    if (!el) return

    const focado = document.activeElement
    if (focado instanceof HTMLElement && focado !== document.body) focado.blur()

    const band = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - band)
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault()
        go(active + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        go(active - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, go])

  const current = SCENES[active]
  const atStart = active === 0
  const atEnd = active === SCENES.length - 1

  return (
    <div className="p3-nav" role="group" aria-label="Navegação do deck">
      <div className="p3-nav__meta" aria-live="polite">
        <span className="p3-nav__count">
          {current.n}
          {/* O total conta as 7 CENAS do argumento. A capa e pagina 00 e nao
              entra na conta, senao o passador anunciaria 8 telas. */}
          <span className="p3-nav__total"> / 07</span>
        </span>
        {/* Só leitor de tela: o fundador quer apenas os números no passador,
            mas o bloco é aria-live e sem isto a troca de cena fica muda. */}
        <span className="sr-only">{current.pt}</span>
      </div>

      <div className="p3-nav__buttons">
        <button
          type="button"
          className="p3-nav__btn"
          onClick={() => go(active - 1)}
          disabled={atStart}
          aria-label={`Cena anterior${atStart ? ' (indisponível)' : ''}`}
        >
          <span aria-hidden="true">&#8592;</span>
        </button>
        <button
          type="button"
          className="p3-nav__btn"
          onClick={() => go(active + 1)}
          disabled={atEnd}
          aria-label={`Próxima cena${atEnd ? ' (indisponível)' : ''}`}
        >
          <span aria-hidden="true">&#8594;</span>
        </button>
      </div>
    </div>
  )
}

// Kicker de seção: numeral do deck + rótulo bilíngue.
//
// PONTO FIXO (pedido do fundador 2026-08-08). Antes o kicker era o primeiro
// item do fluxo de uma cena CENTRADA na vertical: cada cena tem uma
// quantidade diferente de conteúdo, então o título numerado subia e descia de
// slide para slide. Quem folheia o deck via o rótulo dançar.
//
// Agora ele é ancorado ao topo da própria cena (`.p3-kicker-slot`, absolute
// dentro da section) e a cena reserva o espaço dele em padding-top. O
// resto do conteúdo continua centrado no que sobra: a composição de cada slide
// não muda, só o título passa a cair sempre na mesma linha, logo abaixo do
// letreiro. A âncora vale para as 7 cenas porque a distância sai de UMA
// variável, --p3-kicker-top.
function Kicker({ n, pt, en }: { n: string; pt: string; en: string }) {
  return (
    <div className="p3-kicker-slot">
      <PitchReveal delay={0}>
        <p className="p3-kicker">
          <span className="p3-kicker__n">{n}</span>
          <span className="p3-kicker__pt">{pt}</span>
          <span className="p3-kicker__en">{en}</span>
        </p>
      </PitchReveal>
    </div>
  )
}

// Numeral marca-d'água: Printed Thin gigante, quase invisível. Dá profundidade
// à seção sem acrescentar nenhum traço (dividers são proibidos no site).
function Numeral({ n }: { n: string }) {
  return (
    <span className="p3-numeral" aria-hidden="true">
      {n}
    </span>
  )
}

// ─── Geometria do slide ──────────────────────────────────────────────────────
// UMA CENA = UMA TELA (pedido do fundador 2026-07-31). Antes era
// `minHeight: 100dvh`, que garante o piso e não impõe teto nenhum: as
// cenas mais cheias passavam de uma tela e meia e o deck virava uma página
// rolável com pedaços de slide.
//
// A altura NÃO é 100dvh: é 100dvh MENOS a faixa pinada no topo (nav fixo +
// letreiro sticky). O motivo é o encaixe. Cada cena tem
// `scroll-margin-top` igual a essa faixa, senão o kicker para debaixo dela — e
// com 100dvh cheios a cena passava a começar 88px abaixo do topo da
// janela e terminar 88px ABAIXO da dobra: o último bloco ficava fora da tela,
// exatamente o que este trabalho veio consertar. Descontando a faixa, a
// cena encaixada ocupa a janela inteira que sobra, do letreiro ao rodapé.
//
// O resto que segura isso de pé:
//   1. o respiro de baixo reserva a barra de navegação do deck, fixa no canto;
//   2. TODA a escala tipográfica e de espaçamento do deck tem um termo em `vh`
//      (ver --p3-gap e os clamps com `min(...vw, ...vh)` mais abaixo): quando a
//      janela encurta, o conteúdo encolhe junto em vez de vazar.
// Mexeu em qualquer um dos dois? Confira as 7 cenas em 390px e 1440px.
const S: React.CSSProperties = {
  height: 'calc(100dvh - var(--p3-band))',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  // TRILHO, NÃO CENTRO (pedido do fundador, #01 CHANGES). Centralizar
  // verticalmente significa deixar a ALTURA DO CONTEÚDO decidir onde o título
  // começa: cenas com quantidades diferentes de texto dão alturas de título
  // diferentes, e era daí que vinha a sensação de desorganizado. Com
  // o conteúdo ancorado no topo, o título de toda cena nasce na mesma
  // linha. O que sobra embaixo é respiro reservado, não sobra.
  justifyContent: 'flex-start',
  paddingInline: 'var(--p3-pad-x)',
  // O respiro de cima é o lugar reservado ao kicker, que saiu do fluxo para
  // ficar sempre na mesma linha (ver --p3-kicker-top).
  paddingTop: 'var(--p3-kicker-reserve)',
  // Teto baixado (era 4.25rem/8vh/7rem): a barra de navegação só ocupa o
  // canto inferior direito (botão de 2.35 a 2.75rem + margem de 0.6 a 2rem),
  // não a largura inteira do respiro. O valor antigo reservava mais do que o
  // botão precisa nas 7 cenas, e foi um dos contribuintes do corte medido em
  // 390px e 1440px.
  paddingBottom: 'var(--p3-foot)',
  position: 'relative',
  overflow: 'hidden',
  scrollSnapAlign: 'start',
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
function CasePanel() {
  const [i, setI] = useState(0)
  const total = CASE.media.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((v) => (v + 1) % total), 2400)
    return () => clearInterval(t)
  }, [total])

  return (
    <div className="p3-case-panel">
      {CASE.media.map((m, idx) => (
        <Image
          key={m.src}
          src={m.src}
          alt={m.alt.pt}
          width={900}
          height={1200}
          sizes="(max-width: 767px) 55vw, 30vw"
          priority={idx === 0}
          className={`p3-case-panel__img${idx === i ? ' p3-case-panel__img--on' : ''}`}
        />
      ))}
      <span className="p3-case-panel__role" aria-live="off">
        {CASE.media[i].role.pt}
        <En>{CASE.media[i].role.en}</En>
      </span>
    </div>
  )
}

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
          <p className="p3-portfolio-name" style={{ color: PAPER }}>
            {item.name}
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

// ─── Página ──────────────────────────────────────────────────────────────────

export function PitchV3Client() {
  return (
    <div className="p3-deck">
      <DeckNav />
      <GridRuler />

      {/* ── CENA 00 · CAPA ────────────────────────────────────────────────────
             A CAPA DE ANTES, DE VOLTA (pedido do fundador 2026-08-12), lida como
             PAGINA 00: o hero da home mais o tabloide em movimento. Ela nao
             recebe kicker nem numeral porque nao e uma cena de argumento, e o
             passador mostra 00 nela. E a unica secao do deck sem a geometria S:
             o hero ja se mede em tela cheia e o Ticker corre logo abaixo. */}
      <section id="cena-00" aria-label="Capa / Cover" style={{ scrollSnapAlign: 'start' }}>
        <HomeHero />
        <Ticker />
      </section>

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
          {/* Eyebrow e headline vieram do fundador já em inglês. Por isso os
              dois não usam <En>: a camada de tradução existe para dobrar o
              português, e aqui não há português para dobrar. */}
          <PitchReveal delay={100}>
            <p className="p3-eyebrow">{COVER.eyebrow}</p>
          </PitchReveal>

          <PitchReveal delay={200}>
            <h1 className="p3-cover-headline">
              {COVER.headlineEn[0]}
              <br />
              {COVER.headlineEn[1]}
              <br />
              <span style={{ color: ACCENT }}>{COVER.headlineEn[2]}</span>
            </h1>
          </PitchReveal>

          <PitchReveal delay={330}>
            <TbfWordmark className="p3-cover-wordmark" />
          </PitchReveal>

          <PitchReveal delay={400}>
            <p className="p3-culture">{COVER.culture}</p>
          </PitchReveal>

          <PitchReveal delay={460}>
            <p className="p3-craft-line">{COVER.craft}</p>
          </PitchReveal>

          <PitchReveal delay={550}>
            <p className="p3-body" style={{ maxWidth: 'var(--p3-measure)' }}>
              {COVER.body.pt}
              <En>{COVER.body.en}</En>
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

        <PressLogosCarousel />

        {/* ── As cinco personalidades de referência ────────────────────────────
               Selecionadas pelo fundador em CHANGES/PERSONALITIES (prefixo
               SELECTED no arquivo). Todas em licença livre, crédito e origem
               registrados no _CREDITOS.md daquela pasta. O retrato é 1:1 na
               origem, então o quadro nunca deforma. */}
        <div className="p3-refs-people">
          <div className="p3-refs-people__grid">
            {REFERENCE.people.map((person, i) => (
              <PitchReveal key={person.name} delay={200 + i * 80}>
                <figure className="p3-person">
                  <Image
                    src={person.src}
                    alt={person.name}
                    width={1200}
                    height={1200}
                    className="p3-person__img"
                    sizes="(max-width: 767px) 45vw, 18vw"
                  />
                  {/* SÓ O NOME. A legenda trazia também o papel em português E
                      em inglês: cinco colunas estreitas com blocos de texto de
                      comprimentos diferentes, que desalinhavam a fila inteira.
                      O papel de cada um já é dito pela frase que fecha o
                      bloco; aqui basta o rosto e o nome. */}
                  <figcaption>
                    <p className="p3-person__name">{person.name}</p>
                  </figcaption>
                </figure>
              </PitchReveal>
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
      <section id="cena-03" style={{ ...S, background: '#111110' }} aria-label="A Pergunta, o Contexto e a Tese / The Question, the Context, the Thesis">
        <Numeral n="03" />
        <Kicker n="03" pt="A Pergunta, o Contexto e a Tese" en="The Question, the Context, the Thesis" />

        {/* Tempo 1 — a pergunta */}
        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2 p3-h2--md">
            {ARGUMENT.question.headline.pt[0]}
            <br />
            <span style={{ color: ACCENT }}>{ARGUMENT.question.headline.pt[1]}</span>
            <En size="lead">{ARGUMENT.question.headline.en.join(' ')}</En>
          </h2>
        </PitchReveal>

        <div className="p3-argument-block">
          {ARGUMENT.question.items.map((q, i) => (
            <PitchReveal key={q.pt} delay={180 + i * 80}>
              <p className="p3-question">
                {q.pt}
                <En>{q.en}</En>
              </p>
            </PitchReveal>
          ))}
        </div>

        {/* Tempo 2 — o contexto */}
        <div className="p3-argument-block p3-tertiary">
          {ARGUMENT.context.lines.map((line, i) => (
            <PitchReveal key={line.pt} delay={340 + i * 90}>
              <p className="p3-context-line">
                {line.pt}
                <En>{line.en}</En>
              </p>
            </PitchReveal>
          ))}
        </div>

        <PitchReveal delay={520}>
          <p className="p3-assert" style={{ marginTop: 'var(--p3-gap-sm)' }}>
            {ARGUMENT.context.assert.pt}
            <En>{ARGUMENT.context.assert.en}</En>
          </p>
        </PitchReveal>

        {/* Tempo 3 — a tese: resolução da cena, maior peso visual */}
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


        {/* Nível 1 — o método, sem vocabulário de startup: quatro verbos. */}
        <div className="p3-os-grid p3-method-grid">
          {BUSINESS.method.map((step, i) => (
            <PitchReveal key={step.title.pt} delay={220 + i * 80}>
              <div
                style={{
                  background: '#0a0a09',
                  padding: 'clamp(0.85rem, 2.4vw, 1.1rem)',
                  height: '100%',
                  borderTop: `2px solid ${ACCENT}`,
                  borderRadius: 'var(--tbf-radius-card)',
                }}
              >
                <p className="p3-item-title">
                  {step.title.pt}
                  <En>{step.title.en}</En>
                </p>
                <p className="p3-item-desc p3-tertiary" style={{ marginTop: '0.35rem' }}>
                  {step.desc.pt}
                  <En>{step.desc.en}</En>
                </p>
              </div>
            </PitchReveal>
          ))}
        </div>

        {/* Nível 2 — o portfólio: quatro propriedades, expansíveis. */}
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
        <div className="p3-portfolio-grid" style={{ maxWidth: 'var(--p3-inner)' }}>
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

        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2">{CASE.headline}</h2>
        </PitchReveal>
        <PitchReveal delay={140}>
          <p className="p3-case-client">{CASE.client}</p>
        </PitchReveal>

        <div className="p3-case-layout">
          <PitchReveal delay={200}>
            <CasePanel />
          </PitchReveal>

          <div className="p3-case-copy">
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

        <PitchReveal delay={420}>
          {/* FAIXA QUE ANDA SOZINHA (pedido do fundador: "proporção muito
              pequena, aqui a gente pode fazer tipo um carrossel que se
              movimenta"). A lista é duplicada e o trilho corre em translateX:
              é assim que uma esteira infinita se faz sem JS, e é o mesmo
              princípio do carrossel de logos da cena 02. `aria-hidden` na
              segunda cópia para o leitor de tela não ler tudo duas vezes. */}
          <div className="p3-case-media" role="group" aria-label="Mídia do case / Case media">
            <div className="p3-case-media__track">
            {[...CASE.media, ...CASE.media].map((m, idx) => (
              <figure key={m.src + idx} className="p3-case-media__item" aria-hidden={idx >= CASE.media.length}>
                <Image
                  src={m.src}
                  alt={m.alt.pt}
                  width={640}
                  height={800}
                  className="p3-case-media__img"
                  sizes="150px"
                />
                <figcaption className="p3-case-media__role">
                  {m.role.pt}
                  <En>{m.role.en}</En>
                </figcaption>
              </figure>
            ))}
            </div>
          </div>
        </PitchReveal>

        <PitchReveal delay={520}>
          <div className="p3-press">
            <p className="p3-label">
              {CASE.press.label.pt}
              <En>{CASE.press.label.en}</En>
            </p>
            <p className="p3-body p3-tertiary" style={{ marginTop: '0.4rem' }}>
              {CASE.press.body.pt}
              <En>{CASE.press.body.en}</En>
            </p>
            <p className="p3-press__credit">{CASE.press.credit}</p>
          </div>
        </PitchReveal>

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
      <section id="cena-06" style={{ ...S }} aria-label="Por Que a Overlens / Why Overlens">
        <Numeral n="06" />
        <Kicker n="06" pt="Por Que a Overlens" en="Why Overlens" />

        <PitchReveal delay={100} slot="head">
          <h2 className="p3-h2 p3-h2--md">
            {PARTNERSHIP.question.pt[0]}
            <br />
            {PARTNERSHIP.question.pt[1]}
            <En size="lead">{PARTNERSHIP.question.en.join(' ')}</En>
          </h2>
        </PitchReveal>

        {/* Os dois lados, tratamento visual equivalente: nenhum dos dois é
            "cliente" do outro. */}
        <div className="p3-partner-grid">
          {PARTNERSHIP.sides.map((side, i) => {
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
            <p className="p3-kicker-mini">{PARTNERSHIP.goal.kicker}</p>
            <p className="p3-goal__line">
              {PARTNERSHIP.goal.lines[0].pt}
              <br />
              <span style={{ color: ACCENT }}>{PARTNERSHIP.goal.lines[1].pt}</span>
              <En size="lead">{PARTNERSHIP.goal.lines.map((l) => l.en).join(' ')}</En>
            </p>
          </div>
        </PitchReveal>

        <PitchReveal delay={600}>
          <p className="p3-body p3-tertiary" style={{ marginTop: 'var(--p3-gap-sm)', maxWidth: 'var(--p3-measure-wide)' }}>
            {PARTNERSHIP.hypotheses.pt}
            <En>{PARTNERSHIP.hypotheses.en}</En>
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
              {CLOSE.eyebrow.pt}
              <En>{CLOSE.eyebrow.en}</En>
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
      <style>{`
        .p3-deck {
          background: #000000;
          color: ${PAPER};
          font-family: var(--tbf-font-family-display);

          /* RÉGUA VERTICAL DO DECK. Todo respiro entre blocos de uma cena
             sai daqui, e o termo dominante é vh: numa janela baixa o deck se
             comprime sozinho e continua cabendo em uma tela. */
          /* FAIXA PINADA no topo: nav fixo + letreiro sticky. É de onde saem
             AO MESMO TEMPO o encaixe da cena (scroll-margin-top) e a
             altura dela (100dvh menos a faixa). Um valor só, para os dois nunca
             se descolarem. */
          --p3-band: calc(var(--tbf-nav-height-sm) + var(--tbf-ticker-height-sm));

          /* Recuo lateral da cena. Virou variável porque o kicker (que é
             ancorado, não empurrado) precisa começar exatamente na mesma
             coluna do texto. */
          --p3-pad-x: clamp(1.25rem, 5vw, 6rem);

          /* PONTO FIXO DO KICKER (pedido do fundador 2026-08-08). O topo da
             seção já cai logo abaixo do letreiro por causa do scroll-margin,
             então esta é a distância entre o letreiro e o título numerado. Um
             valor só, para as 7 cenas começarem na MESMA linha. */
          --p3-kicker-top: clamp(0.75rem, 2.4vh, 1.75rem);
          /* Espaço que a cena reserva para o kicker que saiu do fluxo.
             APERTADO em 2026-08-12: a reserva era generosa demais. Medido, o
             kicker ocupa 22px no desktop e 17px no mobile, e a reserva
             entregava 75,6px de padding para ele. A sobra virava corte no
             rodapé das cenas cheias (03, 04, 05 e 06), que é pior: o deck tem
             overflow: hidden e come o conteúdo em silêncio. O kicker continua
             ancorado na MESMA linha nas 7 cenas, só sem o colchão inútil. */
          --p3-kicker-reserve: calc(var(--p3-kicker-top) + clamp(1.35rem, 3.4vh, 2.1rem));

          /* ─── RÉGUA INVISÍVEL DO DECK ──────────────────────────────────
             Pedido do fundador (#01 CHANGES): "blocos invisíveis e réguas
             invisíveis para dar proporção ao layout de cada tela (...) todos os
             textos se alinham em uma mesma posição". São duas réguas, e nada
             além delas.

             RÉGUA VERTICAL — COLUNAS. A largura útil da cena vira uma
             grade de colunas iguais, e toda medida de texto passa a ser um
             NÚMERO DE COLUNAS.

             A contagem de colunas MUDA POR TELA (mobile-first): no telefone são
             4 e todo texto ocupa as 4, porque dividir 350px em doze faixas daria
             uma coluna de 24px — grade de desktop aplicada ao telefone é o
             defeito clássico. A partir de 768px são 8, e de 1280px são 12.

             RÉGUA HORIZONTAL — TRILHOS. Ver o comentário do objeto S (a
             cena ancora no topo em vez de centralizar) e .p3-slot--head
             (a faixa do título tem altura mínima reservada).

             PARA CONFERIR as duas réguas com o olho, abra a página com ?grid=1 :
             as colunas e os dois trilhos aparecem sobrepostos. */
          --p3-grid-max: 1200px;
          --p3-gutter: clamp(0.75rem, 1.6vw, 1.5rem);
          --p3-inner: min(calc(100vw - 2 * var(--p3-pad-x)), var(--p3-grid-max));
          --p3-track: calc(
            (var(--p3-inner) - (var(--p3-cols) - 1) * var(--p3-gutter)) / var(--p3-cols)
          );

          /* Telefone: 4 colunas, e todo texto ocupa as 4. */
          --p3-cols: 4;
          --p3-n-tight: 4;
          --p3-n-measure: 4;
          --p3-n-wide: 4;
          --p3-n-head: 4;
          --p3-n-grid: 4;

          /* As quatro medidas do deck, derivadas da grade — nunca escritas à mão. */
          --p3-measure-tight: calc(
            var(--p3-track) * var(--p3-n-tight) + var(--p3-gutter) * (var(--p3-n-tight) - 1)
          );
          --p3-measure: calc(
            var(--p3-track) * var(--p3-n-measure) + var(--p3-gutter) * (var(--p3-n-measure) - 1)
          );
          --p3-measure-wide: calc(
            var(--p3-track) * var(--p3-n-wide) + var(--p3-gutter) * (var(--p3-n-wide) - 1)
          );
          --p3-measure-head: calc(
            var(--p3-track) * var(--p3-n-head) + var(--p3-gutter) * (var(--p3-n-head) - 1)
          );
          --p3-measure-grid: calc(
            var(--p3-track) * var(--p3-n-grid) + var(--p3-gutter) * (var(--p3-n-grid) - 1)
          );

          /* Altura reservada à faixa do título (o bloco invisível). Termo em vh
             porque tudo neste deck encolhe junto com a janela. */
          /* Apertado com a reserva do kicker (2026-08-12): a faixa do título
             segue existindo e alinhando as 7 cenas, com menos colchão. */
          --p3-head-min: clamp(3rem, 8.2vh, 5.75rem);

          /* FAIXA DO PASSADOR. A barra de navegacao do deck e FIXA no canto
             de baixo, e a cena precisa reservar a altura dela: sem isso a barra
             passa POR CIMA do ultimo bloco, que foi o bug de 2026-08-08 no
             movimento 09 e voltou em 2026-08-12 nas cenas 03 a 06 (medido: ela
             cobria de 13 a 70px do ultimo bloco). O numero nao e chute, e a
             distancia medida entre o topo da barra e o fim da janela: 58px no
             telefone, 92px no desktop. */
          --p3-foot: 3.75rem;
          --p3-gap:    clamp(0.8rem, 2.5vh, 1.75rem);
          --p3-gap-sm: clamp(0.4rem, 1.2vh, 0.85rem);
          --p3-gap-lg: clamp(1.25rem, 4.2vh, 3rem);
        }

        /* O nav e o letreiro são sticky e ficam pinados no topo. Sem esta
           margem, a seta joga o topo da cena para debaixo dos dois e o
           kicker aparece cortado. Composto dos tokens de altura, não de número
           mágico, para acompanhar qualquer mudança no header. */
        .p3-deck > section {
          scroll-margin-top: var(--p3-band);
        }

        /* Encaixe suave nas cenas. Precisa viver no container que ROLA (o
           html), não na div do deck, que não tem scroll próprio. Esta folha de
           estilo só existe enquanto a página está montada, então não vaza para o
           resto do site. "proximity" (e não "mandatory") deixa o leitor parar no
           meio de uma seção alta sem ser puxado de volta.
           NUNCA escrever o nome da tag de estilo entre sinais de menor/maior
           aqui dentro: o servidor escapa a sequência e o cliente não, o que
           quebra a hidratação da página inteira. */
        html {
          scroll-snap-type: y proximity;
        }

        /* A grade abre conforme a tela cresce. Só os CONTADORES mudam: as
           medidas acima se recalculam sozinhas a partir deles. */
        @media (min-width: 768px) {
          .p3-deck {
            --p3-cols: 8;
            --p3-n-tight: 5;
            --p3-n-measure: 6;
            --p3-n-wide: 8;
            --p3-n-head: 6;
            --p3-n-grid: 8;
          }
        }

        @media (min-width: 1280px) {
          .p3-deck {
            --p3-band: calc(var(--tbf-nav-height-xl) + var(--tbf-ticker-height-xl));
            /* No desktop sobra altura, então o trilho é alto o bastante para
               caber um título de DUAS linhas inteiro — que é o caso das
               cenas 03, 04 e 06. No telefone o mesmo trilho comeria o fim da
               cena, e por isso lá ele é curto.
               Teto baixado de 9rem/14vh para 7.5rem/11.8vh: medido em
               1440x900, um título de duas linhas + tradução mede ~105px, e o
               teto antigo reservava até 126px — 21px de sobra em CADA uma das
               três cenas mais cheias do deck (03, 04, 06), contribuindo pro
               corte medido nelas. */
            /* Segunda passada (2026-08-12): ainda sobrava. Medido em 1440x900,
               o slot reservava 106px para um título que mede ~90px. */
            --p3-head-min: clamp(3.5rem, 9.4vh, 6rem);
            --p3-cols: 12;
            --p3-n-tight: 4;
            --p3-n-measure: 6;
            --p3-n-wide: 8;
            /* Era 6. A pergunta da cena-06 ("Como uma empresa de educação
               pode crescer / entendendo o cenário cultural brasileiro?") é a
               mais longa das três cabeças de duas linhas do deck (03, 04,
               06): em 6 colunas cada uma das DUAS linhas ainda quebrava em
               duas, virando 4 linhas visuais + tradução — sozinho isso media
               ~117px além do que o slot da cabeça reserva. Com 8 colunas
               (mesma largura de --p3-n-wide) cada linha volta a caber em uma
               só, sem reduzir o tamanho da fonte. */
            --p3-n-head: 8;
            --p3-n-grid: 9;
            /* Régua de respiro um pouco mais apertada no desktop: em telas
               baixas (900px é o teste de aceite) o respiro de 3.2vh/1.6vh
               ainda sobrava. Ver --p3-gap/--p3-gap-sm na régua base. */
            --p3-foot: 4.25rem;
            --p3-gap: clamp(0.7rem, 1.9vh, 1.45rem);
            --p3-gap-sm: clamp(0.3rem, 1vh, 0.7rem);
          }
        }

        /* ─── CAMADA DE TRADUÇÃO (EN) ────────────────────────────────────────
           Família diferente do PT (Printed), Light Italic, discreta. É a regra
           única de toda a página: se está em Printed itálico, é tradução. */
        .p3-en {
          display: block;
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-style: italic;
          font-size: clamp(0.78rem, 2.2vw, 0.875rem);
          line-height: 1.3;
          letter-spacing: 0.015em;
          color: rgba(240,237,230,0.52);
          /* PAR COLADO. A tradução tem de andar AGARRADA à frase que traduz.
             Dentro do par, quase nada; entre pares, quem separa é a margem do
             item. */
          margin-top: 0.1rem;
          text-transform: none;
        }
        .p3-en--lead {
          font-size: clamp(0.95rem, 2.8vw, 1.15rem);
          color: rgba(240,237,230,0.58);
          margin-top: 0.2rem;
        }

        /* SEPARAÇÃO ENTRE PARES. Vale para toda lista do deck em que cada item
           traz PT + EN: o que separa um item do outro precisa ser visivelmente
           MAIOR que o que separa a frase da sua tradução, senão a lista volta a
           parecer um bloco de texto. */
        .p3-partner-line:last-child {
          margin-bottom: 0;
        }

        /* ─── BLOCO INVISÍVEL DO TÍTULO ──────────────────────────────────── */
        .p3-slot--head {
          margin-bottom: var(--p3-gap);
        }
        .p3-slot--head > .p3-h2 {
          max-width: var(--p3-measure-head);
        }
        @media (min-height: 640px) {
          .p3-slot--head {
            min-height: var(--p3-head-min);
          }
        }

        /* ─── RÉGUA VISÍVEL (só com ?grid=1) ─────────────────────────────── */
        .p3-ruler {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          padding-inline: var(--p3-pad-x);
        }
        .p3-ruler__cols {
          height: 100%;
          max-width: var(--p3-grid-max);
          background-image: repeating-linear-gradient(
            to right,
            rgba(255, 101, 0, 0.14) 0,
            rgba(255, 101, 0, 0.14) var(--p3-track),
            transparent var(--p3-track),
            transparent calc(var(--p3-track) + var(--p3-gutter))
          );
        }
        .p3-ruler__rail {
          position: absolute;
          left: 0;
          right: 0;
          border-top: 1px dashed rgba(255, 101, 0, 0.75);
        }
        .p3-ruler__rail--head {
          top: calc(var(--p3-band) + var(--p3-kicker-reserve));
        }
        .p3-ruler__rail--body {
          top: calc(
            var(--p3-band) + var(--p3-kicker-reserve) + var(--p3-head-min) + var(--p3-gap)
          );
        }

        /* ─── KICKER ─────────────────────────────────────────────────────── */
        .p3-kicker-slot {
          position: absolute;
          top: var(--p3-kicker-top);
          left: var(--p3-pad-x);
          right: var(--p3-pad-x);
          z-index: 2;
        }

        .p3-kicker {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 0;
        }
        .p3-kicker__n {
          font-family: var(--tbf-font-family-printed);
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: ${ACCENT};
        }
        .p3-kicker__pt {
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${ACCENT};
        }
        .p3-kicker__en {
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-style: italic;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: rgba(255,101,0,0.7);
        }

        /* Mini rótulo reaproveitado dentro de uma cena (tese, THE GOAL): mesma
           régua do kicker de seção, mas SEM âncora — nasce no fluxo. */
        .p3-kicker-mini {
          font-family: var(--tbf-font-family-printed);
          font-weight: 700;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${ACCENT};
          margin-bottom: 0.35rem;
        }

        /* ─── NUMERAL MARCA-D'ÁGUA (Printed Thin) ────────────────────────── */
        .p3-numeral {
          position: absolute;
          top: clamp(2rem, 6vw, 4rem);
          right: clamp(0.5rem, 3vw, 3rem);
          z-index: 0;
          pointer-events: none;
          font-family: var(--tbf-font-family-printed);
          font-weight: 100;
          font-size: clamp(5rem, min(22vw, 32vh), 15rem);
          line-height: 0.8;
          letter-spacing: -0.04em;
          color: rgba(240,237,230,0.045);
        }

        /* ─── TIPOGRAFIA DO DECK ─────────────────────────────────────────── */
        .p3-h2 {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-display);
          font-size: clamp(1.9rem, min(6.4vw, 6.6vh), 3.6rem);
          font-weight: 800;
          line-height: 0.98;
          letter-spacing: -0.04em;
          color: ${PAPER};
        }
        .p3-h2--md {
          font-size: clamp(1.6rem, min(5vw, 5vh), 2.6rem);
        }
        .p3-quote {
          font-size: clamp(1.5rem, min(5.2vw, 5.6vh), 3rem);
          max-width: 18ch;
          margin: 0 auto var(--p3-gap);
        }
        .p3-refs-headline {
          text-align: center;
          max-width: 26ch;
          margin-inline: auto;
        }

        .p3-body {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.82rem, min(2.2vw, 1.9vh), 1rem);
          line-height: 1.38;
          color: rgba(240,237,230,0.65);
        }
        .p3-body--dim { color: rgba(240,237,230,0.5); }

        .p3-eyebrow {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: clamp(0.625rem, 2vw, 0.75rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--tbf-text-tertiary);
          margin-bottom: var(--p3-gap-sm);
        }
        .p3-eyebrow--accent {
          color: ${ACCENT};
          margin-bottom: var(--p3-gap);
        }

        /* "Culture™" — linha de assinatura da capa e do fecho. Printed
           itálico, no mesmo registro de voz da camada de tradução, mas em
           destaque de cor: é a marca registrada da casa, não uma tradução. */
        .p3-culture {
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-style: italic;
          font-size: clamp(0.85rem, 2.6vw, 1.05rem);
          letter-spacing: 0.02em;
          color: ${ACCENT};
          margin-bottom: 0.35rem;
        }
        .p3-craft-line {
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-style: italic;
          font-size: clamp(0.7rem, 2vw, 0.85rem);
          letter-spacing: 0.03em;
          color: rgba(240,237,230,0.55);
          margin-bottom: var(--p3-gap-sm);
        }

        .p3-label {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.5);
        }

        .p3-question {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-display);
          font-weight: 700;
          font-size: clamp(0.95rem, min(2.6vw, 2.45vh), 1.3rem);
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: ${PAPER};
        }

        /* Cena 03, tempo 2: cada linha do contexto é uma frase inteira (não
           mais um par pré-frase + palavra em destaque). */
        .p3-context-line {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-display);
          font-weight: 600;
          font-size: clamp(0.9rem, min(2.2vw, 2vh), 1.05rem);
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: rgba(240,237,230,0.85);
          max-width: var(--p3-measure-wide);
        }

        /* Cena 03, tempo 3: a tese, maior peso visual da cena inteira. */
        .p3-thesis-line {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(1.4rem, min(3.7vw, 3.5vh), 2.05rem);
          line-height: 1.02;
          letter-spacing: -0.03em;
          color: ${PAPER};
          margin-bottom: var(--p3-gap-sm);
        }

        .p3-argument-block {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: var(--p3-gap-sm);
        }
        .p3-argument-block--thesis {
          margin-top: var(--p3-gap);
        }

        .p3-assert {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-display);
          font-weight: 700;
          font-size: clamp(1rem, min(3.2vw, 3.2vh), 1.6rem);
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: ${ACCENT};
        }
        .p3-assert--lg {
          font-size: clamp(1.05rem, min(3.6vw, 3.6vh), 1.8rem);
        }

        .p3-item-title {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(0.95rem, min(2.7vw, 2.5vh), 1.25rem);
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: ${PAPER};
        }
        .p3-item-desc {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.78rem, min(1.9vw, 1.8vh), 0.9rem);
          line-height: 1.28;
          color: rgba(240,237,230,0.5);
        }

        /* Subtítulo do portfólio (cena 04): a pergunta, em Printed itálico. */
        .p3-portfolio-subtitle {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-style: italic;
          font-size: clamp(0.85rem, min(2.4vw, 2.2vh), 1.1rem);
          letter-spacing: 0.02em;
          color: rgba(240,237,230,0.6);
        }

        .p3-portfolio-name {
          font-family: var(--tbf-font-family-display);
          font-weight: 900;
          font-size: clamp(0.9rem, min(2.4vw, 2.2vh), 1.2rem);
          letter-spacing: -0.03em;
        }
        .p3-portfolio-name--more {
          margin-bottom: 0.4rem;
        }

        /* ─── CARTÃO DE PORTFÓLIO EXPANSÍVEL (cena 04) ───────────────────────
           Base: nome + papel, sempre visíveis. Painel expandido: absolute,
           dentro do próprio cartão, com overflow-y:auto próprio — nunca cresce
           para fora da célula da grade, então nunca empurra a cena. */
        .p3-portfolio-link {
          display: block;
          text-decoration: none;
          height: 100%;
        }
        .p3-portfolio-card {
          position: relative;
          background: #0a0a09;
          padding: clamp(0.7rem, 1.4vh, 1.05rem);
          border-left: 3px solid ${PAPER};
          border-radius: var(--tbf-radius-card);
          height: 100%;
          /* SEM overflow: hidden. Ele era a causa do texto cortado no meio da
             frase quando o cartao abria: a expansao e mais alta que o cartao
             fechado, e recortada ela mentia. Agora ela cresce para fora. */
          overflow: visible;
          cursor: pointer;
          transition: border-color 300ms ${EASE};
        }
        .p3-portfolio-card--open {
          border-color: ${ACCENT};
        }
        .p3-portfolio-more {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          min-height: 100%;
          padding: clamp(0.6rem, 1.3vh, 1rem);
          background: #0a0a09;
          border-radius: var(--tbf-radius-card);
          box-shadow: 0 -12px 24px rgba(0,0,0,0.55);
          z-index: 6;
          opacity: 0;
          pointer-events: none;
          transition: opacity 320ms ${EASE};
        }
        .p3-portfolio-card--open .p3-portfolio-more {
          opacity: 1;
          pointer-events: auto;
        }
        .p3-portfolio-why,
        .p3-portfolio-forms {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.72rem, min(1.8vw, 1.7vh), 0.85rem);
          line-height: 1.45;
          color: rgba(240,237,230,0.6);
          margin-bottom: 0.5rem;
        }

        /* Prova numérica de .THE FIORE DAILY.: única propriedade com prova
           REAL. Número sem fonte não pode aparecer, então a fonte vive sempre
           junto, nunca escondida. */
        .p3-proof__stats {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
          margin-top: 0.35rem;
        }
        .p3-proof__stat {
          display: flex;
          flex-direction: column;
        }
        .p3-proof__value {
          font-family: var(--tbf-font-family-display);
          font-weight: 900;
          font-size: clamp(1.1rem, min(3vw, 2.8vh), 1.5rem);
          letter-spacing: -0.03em;
          color: ${ACCENT};
        }
        .p3-proof__label {
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: 0.62rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.5);
        }
        .p3-proof__source {
          margin-top: 0.5rem;
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-style: italic;
          font-size: 0.62rem;
          letter-spacing: 0.03em;
          color: rgba(240,237,230,0.4);
        }

        .p3-craft-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: var(--p3-gap-sm);
        }
        .p3-footnote {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.75rem, 2vw, 0.875rem);
          line-height: 1.7;
          color: rgba(240,237,230,0.4);
        }

        .p3-stat {
          font-family: var(--tbf-font-family-display);
          font-weight: 900;
          font-size: clamp(2.5rem, min(10vw, 10vh), 5rem);
          line-height: 1;
          letter-spacing: -0.05em;
          color: ${ACCENT};
        }
        /* .p3-craft-row__stat PRECISA vir DEPOIS de .p3-stat no arquivo: as
           duas classes têm a MESMA especificidade (uma classe cada), e o
           cartão de portfólio já leva o número junto num respiro pequeno.
           Antes esta regra vinha ANTES de .p3-stat e por isso nunca
           vencia a cascata — o número saía sempre no tamanho gigante da
           capa (até 5rem/80px), e sozinho isso media ~44px de estouro na
           cena-04 desktop. */
        .p3-craft-row__stat {
          font-size: clamp(1.5rem, min(4vw, 3.6vh), 2.25rem);
        }

        .p3-case-client {
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: clamp(0.75rem, 2vw, 0.95rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${ACCENT};
          margin-bottom: var(--p3-gap-sm);
        }
        .p3-case-body {
          font-family: var(--tbf-font-family-display);
          font-weight: 700;
          font-size: clamp(0.95rem, min(2.5vw, 2.3vh), 1.15rem);
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: ${PAPER};
        }

        /* ─── LAYOUT DO CASE (cena 05): filme vertical + copy, lado a lado no
           desktop, empilhados no mobile. */
        .p3-case-layout {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: var(--p3-gap-sm);
        }
        .p3-case-video {
          width: clamp(6rem, 24vw, 9rem);
          aspect-ratio: 9 / 16;
          border-radius: var(--tbf-radius-card);
          overflow: hidden;
          background: #000000;
          flex-shrink: 0;
        }
        .p3-case-video__el {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .p3-case-copy {
          flex: 1;
          min-width: 0;
        }

        /* Faixa horizontal com as nove imagens do case, na ordem do arco
           narrativo. Rola de lado: é a faixa que tem overflow, não a cena. */
        /* PAINEL DO CASE, tipo gif. Proporcao GRANDE (pedido do fundador): no
           telefone metade da largura da cena, no desktop um terco, sempre com o
           teto em vh para nao estourar a tela do deck. As molduras se sobrepoem
           em grid de uma celula, e a troca e de opacidade. */
        .p3-case-panel {
          position: relative;
          display: grid;
          width: clamp(7rem, 42vw, 12rem);
          aspect-ratio: 3 / 4;
          max-height: 29vh;
          border-radius: var(--tbf-radius-card);
          overflow: hidden;
          flex: 0 0 auto;
        }
        .p3-case-panel__img {
          grid-area: 1 / 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 900ms ${EASE};
        }
        .p3-case-panel__img--on { opacity: 1; }
        .p3-case-panel__role {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 0.7rem 0.5rem 0.4rem;
          background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: center;
          color: ${PAPER};
        }

        /* ESTEIRA. O trilho tem o dobro da lista e anda uma metade inteira: no
           fim do ciclo a segunda copia esta exatamente onde a primeira comecou,
           e o salto de volta e invisivel. */
        .p3-case-media__track {
          display: flex;
          gap: 0.6rem;
          width: max-content;
          animation: p3-belt 42s linear infinite;
        }
        @keyframes p3-belt {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .p3-case-media:hover .p3-case-media__track { animation-play-state: paused; }

        .p3-case-media {
          overflow: hidden;
          padding-bottom: 0.4rem;
          margin-top: var(--p3-gap-sm);
        }
        .p3-case-media__item {
          flex: 0 0 auto;
          width: clamp(5.5rem, 13vh, 8rem);
          margin: 0;
        }
        .p3-case-media__img {
          width: 100%;
          height: auto;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          display: block;
          border-radius: var(--tbf-radius-card);
        }
        .p3-case-media__role {
          margin-top: 0.3rem;
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: 0.58rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.5);
          text-align: center;
        }

        .p3-press {
          margin-top: var(--p3-gap-sm);
        }
        .p3-press__credit {
          margin-top: 0.35rem;
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-style: italic;
          font-size: 0.65rem;
          color: rgba(240,237,230,0.4);
        }
        .p3-case-metrics {
          margin-top: var(--p3-gap-sm);
        }

        .p3-partner-name {
          font-family: var(--tbf-font-family-display);
          font-weight: 900;
          font-size: clamp(1.15rem, min(3.4vw, 3.2vh), 1.75rem);
          letter-spacing: -0.03em;
          margin-bottom: var(--p3-gap-sm);
        }
        .p3-partner-line {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.85rem, min(2.1vw, 2vh), 0.95rem);
          line-height: 1.4;
          color: rgba(240,237,230,0.6);
          margin-bottom: calc(var(--p3-gap-sm) * 1.2);
        }

        /* THE GOAL (cena 06): o ponto de convergência dos dois lados, maior
           peso visual da cena. */
        .p3-goal {
          text-align: center;
          margin: var(--p3-gap) auto 0;
          max-width: var(--p3-measure-wide);
        }
        .p3-goal__line {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(1.4rem, min(4.4vw, 4.4vh), 2.1rem);
          line-height: 1.02;
          letter-spacing: -0.03em;
          color: ${PAPER};
        }

        .p3-contact-site {
          font-family: var(--tbf-font-family-display);
          font-weight: 700;
          font-size: clamp(1rem, 3.5vw, 1.75rem);
          letter-spacing: -0.01em;
          color: ${PAPER};
          margin-bottom: 0.5rem;
        }
        .p3-contact-mail {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.875rem, 2.5vw, 1rem);
          color: rgba(240,237,230,0.5);
          margin-bottom: var(--p3-gap);
        }
        .p3-legal {
          margin-top: var(--p3-gap);
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          line-height: 1.6;
          text-transform: uppercase;
          color: rgba(240,237,230,0.45);
        }

        /* ─── AS CINCO PERSONALIDADES DE REFERÊNCIA (cena 02) ────────────────
           UMA FILA ÚNICA, do 390px ao 1440px, como uma barra de stories. No
           mobile o círculo é pequeno demais para segurar a legenda, então lá
           fica só o NOME. */
        .p3-refs-people {
          margin-top: calc(var(--p3-gap) + clamp(1rem, 3vw, 2.5rem));
          padding-inline: clamp(1.25rem, 5vw, 6rem);
        }

        .p3-refs-people__lead {
          max-width: 34ch;
          margin-top: var(--p3-gap);
        }

        .p3-refs-people__grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(0.5rem, 2.5vw, 1.5rem);
          max-width: 540px;
          margin-inline: auto;
        }

        .p3-person {
          margin: 0;
          text-align: center;
        }

        .p3-person__img {
          width: 100%;
          height: auto;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          display: block;
          border-radius: var(--tbf-radius-full);
          box-shadow:
            0 0 0 2px #000000,
            0 0 0 3px rgba(240, 237, 230, 0.28);
          filter: grayscale(1) contrast(1.05);
          transition: filter 600ms ${EASE};
        }

        .p3-person:hover .p3-person__img {
          filter: grayscale(0) contrast(1);
        }

        .p3-person__name {
          margin: 0.7rem 0 0;
          min-height: 2.3em;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(0.56rem, 1.7vw, 0.78rem);
          letter-spacing: 0.06em;
          line-height: 1.15;
          color: rgba(240, 237, 230, 0.85);
        }

        @media (prefers-reduced-motion: reduce) {
          .p3-case-media__track { animation: none; }
          .p3-case-panel__img { transition: none; }
          .p3-person__img { transition: none; }
        }

        /* ─── NAVEGAÇÃO POR SETAS ────────────────────────────────────────── */
        .p3-nav {
          position: fixed;
          right: clamp(0.75rem, 3vw, 2rem);
          bottom: clamp(0.6rem, 1.6vh, 1.15rem);
          z-index: 40;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.35rem 0.35rem 0.35rem 0.9rem;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          /* Ponta viva não pertence ao DS .TBF.: o token de botão é "full".
             NUNCA usar crase dentro deste bloco: ele é um template literal e a
             crase fecha a string, derrubando o arquivo inteiro. */
          border-radius: var(--tbf-radius-full);
        }
        .p3-nav__meta {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .p3-nav__count {
          font-family: var(--tbf-font-family-printed);
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: ${ACCENT};
        }
        .p3-nav__total {
          font-weight: 300;
          color: rgba(240,237,230,0.4);
        }
        .p3-nav__buttons { display: flex; gap: 0.35rem; }
        .p3-nav__btn {
          width: 2.375rem;
          height: 2.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid rgba(240,237,230,0.25);
          border-radius: var(--tbf-radius-full);
          color: ${PAPER};
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 300ms ${EASE}, border-color 300ms ${EASE}, opacity 300ms ${EASE}, transform 300ms ${EASE};
        }
        .p3-nav__btn:hover:not(:disabled) {
          background: ${ACCENT};
          border-color: ${ACCENT};
          color: #000000;
        }
        .p3-nav__btn:active:not(:disabled) { transform: scale(0.94); }
        .p3-nav__btn:disabled { opacity: 0.25; cursor: default; }

        /* A barra de navegação é FIXA sobre a cena. No telefone ela
           precisa caber na folga de baixo reservada pelo slide (ver S), senão
           come a última linha do conteúdo. Botão menor, barra mais baixa. */
        @media (max-width: 767px) {
          .p3-nav {
            padding: 0.35rem 0.35rem 0.35rem 0.9rem;
            bottom: 0.6rem;
            right: 0.6rem;
          }
          .p3-nav__btn {
            width: 2.35rem;
            height: 2.35rem;
          }
        }

        /* ─── LAYOUT ─────────────────────────────────────────────────────── */
        .p3-cover-headline {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-display);
          font-size: clamp(2rem, min(8.4vw, 8vh), 4.6rem);
          font-weight: 100;
          line-height: 1.02;
          letter-spacing: -0.015em;
          color: ${PAPER};
          margin-bottom: var(--p3-gap);
        }
        .p3-cover-wordmark {
          width: 100%;
          max-width: min(520px, 60vw);
          height: auto;
          display: block;
          margin-bottom: var(--p3-gap-sm);
        }

        .p3-question-list {
          display: flex;
          flex-direction: column;
          gap: var(--p3-gap);
        }

        /* Cadeia de etapas (tese): vertical no mobile, horizontal no desktop */
        .p3-chain {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          align-items: start;
        }
        .p3-chain__node {
          display: flex;
          flex-direction: column;
        }
        .p3-chain__n {
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          color: rgba(240,237,230,0.35);
        }
        .p3-chain__title {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(1rem, min(3.1vw, 2.9vh), 1.2rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          white-space: pre-line;
          margin-top: 0.5rem;
        }
        /* Girar o bloco inteiro jogava o glifo para longe do texto (a caixa tem
           largura total da coluna). inline-block + justify-self mantêm a seta
           colada ao nó que ela conecta. */
        .p3-chain__arrow {
          display: inline-block;
          justify-self: start;
          width: auto;
          font-size: 1.25rem;
          line-height: 1;
          color: ${ACCENT};
          transform: rotate(90deg);
          transform-origin: center;
          margin: 0.35rem 0 0.35rem 0.4rem;
        }

        .p3-os-grid,
        .p3-partner-grid,
        .p3-portfolio-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(0.5rem, 1.6vh, 1.25rem);
        }

        /* Quatro cartões curtos empilhados passavam de uma tela no mobile. Em
           duas colunas a cena cabe e cada cartão continua legível. */
        .p3-os-grid,
        .p3-portfolio-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        /* CARTÕES DO MESMO TAMANHO. O cartão já pedia altura 100%, mas quem o
           segura é o wrapper do reveal, e ele não esticava. Duas providências:
           1fr iguala as DUAS linhas entre si e o wrapper passa a ocupar a
           célula inteira. */
        .p3-portfolio-grid {
          grid-auto-rows: 1fr;
        }

        .p3-portfolio-grid > * {
          height: 100%;
        }

        @media (min-width: 768px) {
          .p3-os-grid,
          .p3-partner-grid,
          .p3-portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .p3-chain {
            grid-template-columns: repeat(7, auto);
            justify-content: start;
            align-items: start;
            gap: clamp(0.75rem, 2vw, 1.5rem);
          }
          .p3-chain__arrow {
            transform: none;
            margin: 2.25rem 0 0 0;
          }
          .p3-case-layout {
            flex-direction: row;
            align-items: flex-start;
            gap: var(--p3-gap);
          }
        }

        @media (min-width: 1024px) {
          .p3-os-grid {
            grid-template-columns: repeat(4, 1fr);
          }

          /* CENA 05: a tira de mídia e o bloco de imprensa se medem pela ALTURA
             da janela, não pela largura. Medido em 1440x900, a cena estourava
             146px, o pior corte do deck: a miniatura vinha de clamp por vw e em
             tela larga e BAIXA ela crescia para 104px de lado, 130px de altura,
             empurrando a imprensa para fora. Com termo em vh a tira encolhe
             quando a janela é baixa, que é a regra do deck inteiro. As nove
             imagens continuam todas lá, na mesma ordem do arco. */
          /* Miniatura MAIOR no desktop tambem (pedido do fundador: a faixa
             estava com proporcao muito pequena). Termo em vh: em tela baixa ela
             encolhe junto, que e a regra do deck. */
          .p3-case-media__item {
            width: clamp(4.5rem, 9.5vh, 6.25rem);
          }
          /* Teto do painel no desktop. 25vh em 900px = 225px de altura, contra
             os 171px do filme minusculo que ele substituiu: continua bem maior,
             e agora a cena fecha em uma tela. */
          .p3-case-panel { max-height: 22.5vh; }
          /* Imprensa em duas colunas: o bloco tinha a altura de tres paragrafos
             empilhados numa tela que nao tem essa altura para dar. */
          .p3-press {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0.2rem 1.25rem;
            align-items: baseline;
          }
          .p3-case-media {
            gap: 0.45rem;
            padding-bottom: 0.2rem;
          }
          /* O filme e VERTICAL (720x1280): largura por vw em tela larga e baixa
             virava 185px de altura. Por vh ele acompanha a janela. */
          .p3-case-video {
            width: clamp(4rem, 12vh, 6rem);
          }
          .p3-press {
            margin-top: var(--p3-gap-sm);
          }
        }

        /* Nível 1 da cena 04 (o método): quatro verbos lado a lado a partir de
           1024px, sem competir com o portfólio pela mesma grade. */
        @media (min-width: 1024px) {
          .p3-method-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Portfólio (cena 04, nível 2): a régua geral do .p3-os-grid/
           .p3-portfolio-grid só abre pra 4 em 1024px, e o viewport de
           desktop medido é 1440px — mas o cartão de portfólio não compete
           por espaço com nenhuma outra grade na mesma cena, então ele pode
           abrir 1 fileira de 4 já em 768px. Empilhado em 2x2 até aqui era o
           maior corte medido do deck (375px em 1440x900): cada cartão
           reservava o painel .p3-portfolio-more todo, e a segunda linha de
           cartões vazava a cena. */
        @media (min-width: 768px) {
          .p3-portfolio-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ─── RÉGUA DO TELEFONE ──────────────────────────────────────────────
           Um iPhone 13 dá 664px de altura útil e o deck é BILÍNGUE: cada linha
           nasce dobrada. No desktop as 7 cenas cabem numa tela com folga;
           no telefone, com a régua do desktop, as mais cheias passariam da
           dobra. Aqui a régua inteira encolhe de uma vez — respiros, corpo e a
           camada de tradução — em vez de cada cena ganhar um remendo. */
        @media (max-width: 767px) {
          .p3-deck {
            --p3-gap:    clamp(0.42rem, 1.5vh, 0.8rem);
            --p3-gap-sm: 0.32rem;
            /* A faixa do titulo tambem encolhe no telefone: ela segue alinhando
               as 7 cenas, com o colchao que o mobile nao tem para dar. */
            --p3-head-min: clamp(2.6rem, 7vh, 4.5rem);
            --p3-gap-lg: clamp(0.75rem, 3vh, 1.5rem);
          }
          .p3-en {
            font-size: 0.68rem;
            line-height: 1.18;
            margin-top: 0.05rem;
          }
          .p3-en--lead { font-size: 0.8rem; margin-top: 0.1rem; }
          .p3-h2 { font-size: clamp(1.4rem, 5.1vw, 1.85rem); }
          .p3-h2--md { font-size: clamp(1.15rem, 4.4vw, 1.5rem); }
          .p3-body { font-size: 0.78rem; line-height: 1.4; }
          .p3-assert { font-size: 0.95rem; }
          .p3-assert--lg { font-size: 1.05rem; }
          .p3-item-desc { font-size: 0.63rem; line-height: 1.18; }
          .p3-item-title { font-size: 0.78rem; line-height: 1.05; }
          .p3-footnote { font-size: 0.7rem; line-height: 1.4; }
          .p3-question { font-size: 0.87rem; }
          .p3-context-line { font-size: 0.8rem; }
          .p3-thesis-line { font-size: 1.22rem; margin-bottom: 0.26rem; }
          .p3-goal__line { font-size: 1.25rem; }
          .p3-case-body { font-size: 0.72rem; line-height: 1.2; }
          .p3-case-client { font-size: 0.7rem; margin-bottom: var(--p3-gap-sm); }
          .p3-label { font-size: 0.62rem; }
          .p3-stat { line-height: 0.9; }
          .p3-partner-line { font-size: 0.74rem; margin-bottom: 0.2rem; }
          .p3-kicker__n, .p3-kicker__pt { font-size: 0.62rem; }
          .p3-kicker__en { font-size: 0.68rem; }
          .p3-kicker-mini { font-size: 0.6rem; }

          /* A cadeia de etapas (tese) empilhava 4 nós + 3 setas: era o
             bloco mais alto do deck no telefone. Em 2x2 ela vira um quadro só.
             A seta some junto — em grade, ela apontaria para o lugar errado, e
             a ordem já é dada pelo numeral de cada nó. */
          .p3-chain {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--p3-gap-sm) 0.75rem;
          }
          .p3-chain__arrow { display: none; }
          .p3-chain__title { font-size: 0.82rem; margin-top: 0.12rem; }

          /* Cartões (método, portfólio, parceria): o respiro interno de
             desktop custava espaço demais por cena no telefone. */
          .p3-os-grid > * > div,
          .p3-partner-grid > * > div {
            padding: 0.45rem !important;
          }
          .p3-portfolio-card,
          .p3-portfolio-more {
            padding: 0.45rem !important;
          }

          /* OVERLENS × .TBF. lado a lado também no telefone: são duas listas
             curtas, e empilhadas custavam meia cena. */
          .p3-partner-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          /* Case: filme menor, faixa de imagens mais estreita. */
          .p3-case-video {
            width: clamp(4.5rem, 20vw, 6.5rem);
          }
          .p3-case-media__item {
            width: clamp(3.75rem, 15vw, 5rem);
          }

          /* CAMADA TERCIÁRIA. São os blocos que ELABORAM o que a cena já
             afirmou: no desktop eles cabem e enriquecem; no telefone são a
             diferença entre um slide e um slide e meio. O que some aqui nunca é
             a tese da cena, é o comentário sobre ela. */
          .p3-tertiary { display: none; }
        }

        /* Acessibilidade: sem movimento, sem encaixe, sem desfoque. */
        @media (prefers-reduced-motion: reduce) {
          html { scroll-snap-type: none; }
          .pitch-reveal {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
          .p3-nav__btn, .p3-portfolio-card { transition: none; }
        }
      `}</style>
    </div>
  )
}
