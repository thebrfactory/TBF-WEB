'use client'

// =============================================================================
// PITCH 3.0 CLIENT · working deck, 13 movimentos
// -----------------------------------------------------------------------------
// NASCEU CÓPIA DA 2.0 (pedido do fundador 2026-08-08). É cópia de propósito, e
// esta é a única exceção consciente à regra 4 do ecossistema ("apontar, não
// copiar"): a 3.0 existe justamente para DIVERGIR da 2.0 sem tocar nela — a 2.0
// continua sendo o deck que já foi apresentado, e não pode mudar por tabela.
// Enquanto a 3.0 não divergir, ela é byte a byte a 2.0 com outro nome.
//
// AUTOCONTIDA: todo o CSS do deck vive no bloco de estilo no fim deste arquivo,
// com prefixo próprio (.p3-*, --p3-*). Editar a 3.0 não alcança a 2.0, e
// vice-versa. Se algum dia as duas convergirem de novo, aí sim vale extrair o
// que for comum — não antes.
//
// AJUSTE DE LAYOUT que veio da 2.0 (pedido do fundador 2026-08-08): o kicker de
// cada movimento é ANCORADO logo abaixo do letreiro, igual nos 13 movimentos.
//
// DUAL LANGUAGE (pedido do fundador): português é a voz principal, inglês entra
// logo abaixo, pequeno e discreto. A distinção não é só de tamanho, é de
// FAMÍLIA: PT usa Brother1816, EN usa Brother1816Printed Light Italic. As duas
// famílias já vinham carregadas no site (32 faces) e nunca tinham sido postas
// para trabalhar juntas. É essa a evolução do design system nesta página.
//
// ESCALA TIPOGRÁFICA DO DECK (variações da Brother efetivamente usadas):
//   Printed Thin 100 ....... numeral marca-d'água de cada movimento
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

const ACCENT = '#FF6500'
const PAPER = '#F0EDE6'

// Curva canônica do design system. Substitui o `ease` genérico que a 2.0 usava:
// desaceleração longa, sem freada seca. É daqui que vem a fluidez.
const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'

const EDITORIAL_VIDEO = {
  desktop: { av1: '/videos/editorial-desktop.av1.mp4', h264: '/videos/editorial-desktop.mp4' },
  mobile: { av1: '/videos/editorial-mobile.av1.mp4', h264: '/videos/editorial-mobile.mp4' },
}

// ─── Movimentos: fonte única da navegação por setas ──────────────────────────
// A ordem aqui define o que as setas percorrem e o que o contador mostra.
const MOVEMENTS = [
  // A capa passou a ser o hero da homepage, byte a byte (componente HomeHero,
  // pedido do fundador 2026-07-31). A capa anterior não foi descartada: virou o
  // movimento 02, "Abertura", e por isso todos os seguintes andaram uma casa —
  // o deck tem 13 movimentos.
  { id: 'mov-01', pt: 'Capa', en: 'Cover' },
  { id: 'mov-02', pt: 'Abertura', en: 'Opening' },
  // O campo de referência era um interlúdio sem número. Virou movimento por
  // pedido do fundador.
  { id: 'mov-03', pt: 'Campo de Referência', en: 'Reference Field' },
  { id: 'mov-04', pt: 'A Pergunta', en: 'The Question' },
  { id: 'mov-05', pt: 'O Contexto', en: 'The Context' },
  { id: 'mov-06', pt: 'Nossa Tese', en: 'Our Thesis' },
  { id: 'mov-07', pt: 'O Sistema Operacional', en: 'The Operating System' },
  { id: 'mov-08', pt: 'Lógica de Portfólio', en: 'Portfolio Logic' },
  { id: 'mov-09', pt: 'Evidência de Execução', en: 'Evidence of Execution' },
  // A Visão de Longo Prazo passou à FRENTE do Case Selecionado (pedido do
  // fundador 2026-07-31): o deck declara onde a casa quer chegar e só então
  // mostra a prova. Case e Overlens andaram uma casa cada.
  { id: 'mov-10', pt: 'Visão de Longo Prazo', en: 'Long-term Vision' },
  { id: 'mov-11', pt: 'Case Selecionado', en: 'Selected Case' },
  { id: 'mov-12', pt: 'Por Que a Overlens', en: 'Why Overlens' },
  { id: 'mov-13', pt: 'Fecho', en: 'Close' },
] as const

// ─── Camada de tradução ──────────────────────────────────────────────────────
// Um único componente para TODO inglês do deck. Trocar a régua da tradução vira
// uma edição só, em vez de 60 estilos inline espalhados.
function En({ children, size = 'sm' }: { children: React.ReactNode; size?: 'sm' | 'lead' }) {
  return <span className={size === 'lead' ? 'p3-en p3-en--lead' : 'p3-en'}>{children}</span>
}

// Cada bloco observa a si mesmo.
//
// A 2.0 tinha UM observer criado no mount da página, varrendo `.pitch-reveal`
// com querySelectorAll. Todo bloco que nascesse depois desse mount (hot-reload,
// re-render, conteúdo novo) ficava fora da lista e travava em `opacity: 0` —
// invisível para sempre, sem erro nenhum no console. Foi exatamente o que
// engoliu os cinco retratos do movimento 03 em 2026-07-31.
//
// Com o observer amarrado ao próprio elemento por ref, não existe janela de
// tempo: o bloco só é observado depois de existir, sempre. O observer
// desconecta no primeiro reveal, porque a animação é de entrada e não se
// repete.
function PitchReveal({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode
  delay?: number
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
      className="pitch-reveal"
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

// ─── Navegação por setas ─────────────────────────────────────────────────────
// Avança e volta entre movimentos. Teclado: ← → PageUp PageDown.
// As setas ↑ ↓ ficam com o scroll nativo de propósito, para não sequestrar
// o gesto mais comum de leitura.
function DeckNav() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    // Faixa fina no meio da tela: o movimento que cruzar o centro é o ativo.
    // Threshold puro falharia nas seções mais altas que a viewport no mobile.
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const i = MOVEMENTS.findIndex((m) => m.id === e.target.id)
          if (i >= 0) setActive(i)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    MOVEMENTS.forEach((m) => {
      const el = document.getElementById(m.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  // Rolagem calculada à mão, não `scrollIntoView`.
  //
  // O `scrollIntoView({block:'start'})` MORRE NO MEIO quando o destino está
  // acima da posição atual: voltando do movimento 02 para a capa, ele parava em
  // ~222px em vez de 0 (o encaixe `scroll-snap-type: y proximity` do html
  // captura a rolagem programática em voo e a abandona num ponto que não é nem
  // o de partida nem o de chegada). Descendo o mesmo código acerta, o que
  // esconde o defeito de quem só testa o botão "próximo".
  // `window.scrollTo` com o alvo já resolvido não sofre disso — medido nos dois
  // sentidos, em todos os 13 movimentos. O desconto é o `scroll-margin-top` da
  // própria seção (a faixa de nav + letreiro pinada no topo), lido do CSS em
  // vez de repetido aqui, para os dois nunca se descolarem.
  //
  // O ENCAIXE SAI DO CAMINHO DURANTE A VIAGEM (bug relatado 2026-08-08).
  // Trocar `scrollIntoView` por `window.scrollTo` resolveu o alvo, não a causa:
  // com `scroll-snap-type: y proximity` ligado no html, o navegador reavalia o
  // encaixe DURANTE a rolagem suave, encontra um ponto de parada no meio do
  // caminho e abandona a viagem ali. Voltando do movimento 02 para a capa, a
  // página parava em ~151px, nem no ponto de partida nem no de chegada: era
  // exatamente o "fica parado no meio".
  //
  // Aqui o encaixe é desligado antes de partir e RELIGADO na chegada. Chegada é
  // detectada por quadro: ou o alvo foi alcançado, ou a página parou de se
  // mexer (cobre o caso de o destino ser mais alto do que o documento permite
  // rolar). O teto de tempo existe para o encaixe nunca ficar desligado se algo
  // interromper a viagem no meio.
  const go = useCallback((index: number) => {
    const target = MOVEMENTS[Math.max(0, Math.min(MOVEMENTS.length - 1, index))]
    const el = document.getElementById(target.id)
    if (!el) return
    const band = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - band)

    const root = document.documentElement
    root.style.scrollSnapType = 'none'

    let quadros = 0
    let ultimo = -1
    let parado = 0
    const religar = () => {
      root.style.scrollSnapType = ''
    }
    const observar = () => {
      const y = Math.round(window.scrollY)
      if (Math.abs(y - top) <= 2) return religar()
      if (y === ultimo) {
        if (++parado >= 4) return religar() // a página parou onde deu
      } else {
        parado = 0
        ultimo = y
      }
      if (++quadros > 180) return religar() // teto de ~3s: nunca fica desligado
      requestAnimationFrame(observar)
    }

    window.scrollTo({ top, behavior: 'smooth' })
    requestAnimationFrame(observar)
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

  const current = MOVEMENTS[active]
  const atStart = active === 0
  const atEnd = active === MOVEMENTS.length - 1

  return (
    <div className="p3-nav" role="group" aria-label="Navegação do deck">
      <div className="p3-nav__meta" aria-live="polite">
        <span className="p3-nav__count">
          {String(active + 1).padStart(2, '0')}
          <span className="p3-nav__total"> / {MOVEMENTS.length}</span>
        </span>
        <span className="p3-nav__label">{current.pt}</span>
      </div>

      <div className="p3-nav__buttons">
        <button
          type="button"
          className="p3-nav__btn"
          onClick={() => go(active - 1)}
          disabled={atStart}
          aria-label={`Movimento anterior${atStart ? ' (indisponível)' : ''}`}
        >
          <span aria-hidden="true">&#8592;</span>
        </button>
        <button
          type="button"
          className="p3-nav__btn"
          onClick={() => go(active + 1)}
          disabled={atEnd}
          aria-label={`Próximo movimento${atEnd ? ' (indisponível)' : ''}`}
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
// item do fluxo de um movimento CENTRADO na vertical: cada movimento tem uma
// quantidade diferente de conteúdo, então o título numerado subia e descia de
// slide para slide. Quem folheia o deck via o rótulo dançar.
//
// Agora ele é ancorado ao topo do próprio movimento (`.p3-kicker-slot`, absolute
// dentro da section) e o movimento reserva o espaço dele em padding-top. O
// resto do conteúdo continua centrado no que sobra: a composição de cada slide
// não muda, só o título passa a cair sempre na mesma linha, logo abaixo do
// letreiro. A âncora vale para os 13 movimentos porque a distância sai de UMA
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
// UM MOVIMENTO = UMA TELA (pedido do fundador 2026-07-31). Antes era
// `minHeight: 100dvh`, que garante o piso e não impõe teto nenhum: os
// movimentos mais cheios passavam de uma tela e meia e o deck virava uma página
// rolável com pedaços de slide.
//
// A altura NÃO é 100dvh: é 100dvh MENOS a faixa pinada no topo (nav fixo +
// letreiro sticky). O motivo é o encaixe. Cada movimento tem
// `scroll-margin-top` igual a essa faixa, senão o kicker para debaixo dela — e
// com 100dvh cheios o movimento passava a começar 88px abaixo do topo da
// janela e terminar 88px ABAIXO da dobra: o último bloco ficava fora da tela,
// exatamente o que este trabalho veio consertar. Descontando a faixa, o
// movimento encaixado ocupa a janela inteira que sobra, do letreiro ao rodapé.
//
// O resto que segura isso de pé:
//   1. o respiro de baixo reserva a barra de navegação do deck, fixa no canto;
//   2. TODA a escala tipográfica e de espaçamento do deck tem um termo em `vh`
//      (ver --p3-gap e os clamps com `min(...vw, ...vh)` mais abaixo): quando a
//      janela encurta, o conteúdo encolhe junto em vez de vazar.
// Mexeu em qualquer um dos dois? Confira os 13 movimentos em 390px e 1440px.
const S: React.CSSProperties = {
  height: 'calc(100dvh - var(--p3-band))',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingInline: 'var(--p3-pad-x)',
  // O respiro de cima é o lugar reservado ao kicker, que saiu do fluxo para
  // ficar sempre na mesma linha (ver --p3-kicker-top).
  paddingTop: 'var(--p3-kicker-reserve)',
  paddingBottom: 'clamp(4.25rem, 8vh, 7rem)',
  position: 'relative',
  overflow: 'hidden',
  scrollSnapAlign: 'start',
}

// ─── Dados dos slides ────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    pt: 'Como produtos comuns viram símbolos de status?',
    en: 'How do ordinary products become status symbols?',
  },
  {
    pt: 'Como comunidades viram instituições?',
    en: 'How do communities become institutions?',
  },
  {
    pt: 'Como códigos locais viajam pelo mundo?',
    en: 'How do local codes travel globally?',
  },
]

const CONTEXT_LAYERS = [
  {
    prePt: 'Produtos competem por',
    wordPt: 'utilidade.',
    preEn: 'Products compete through',
    wordEn: 'utility.',
  },
  {
    prePt: 'Marcas competem por',
    wordPt: 'identidade.',
    preEn: 'Brands compete through',
    wordEn: 'identity.',
  },
  {
    prePt: 'Comunidades competem por',
    wordPt: 'pertencimento.',
    preEn: 'Communities compete through',
    wordEn: 'belonging.',
  },
]

// Referências do fundador, selecionadas em CHANGES/PERSONALITIES.
// A ordem é a das pastas: Warhol, Abloh, Oswald, will.i.am, Metsavaht.
const REFERENCE_PEOPLE = [
  {
    name: 'ANDY WARHOL',
    src: '/images/pitch/references/warhol.webp',
    rolePt: 'Transformou consumo em arte',
    roleEn: 'Turned consumption into art',
  },
  {
    name: 'VIRGIL ABLOH',
    src: '/images/pitch/references/abloh.webp',
    rolePt: 'Traduziu a rua para a alta-costura',
    roleEn: 'Translated the street into luxury',
  },
  {
    name: 'OSWALD DE ANDRADE',
    src: '/images/pitch/references/oswald.webp',
    rolePt: 'Devorou a influência estrangeira e a devolveu brasileira',
    roleEn: 'Devoured foreign influence and gave it back Brazilian',
  },
  {
    name: 'WILL.I.AM',
    src: '/images/pitch/references/william.webp',
    rolePt: 'Levou a cultura pop para dentro da tecnologia',
    roleEn: 'Carried pop culture into technology',
  },
  {
    name: 'OSKAR METSAVAHT',
    src: '/images/pitch/references/metsavaht.webp',
    rolePt: 'Fez do Brasil uma linguagem de design',
    roleEn: 'Made Brazil a design language',
  },
]

const THESIS_CHAIN = [
  { pt: 'Capital\nCultural', en: 'Cultural Capital' },
  { pt: 'Capital\nNarrativo', en: 'Narrative Capital' },
  { pt: 'Propriedade\nIntelectual', en: 'Intellectual Property' },
  { pt: 'Mídia +\nNegócio', en: 'Media + Business' },
]

const OPERATING_SYSTEM = [
  {
    titlePt: 'Inteligência Produtizada',
    titleEn: 'Productized Intelligence',
    descPt: 'sistemas repetíveis de pesquisa, pensamento e criação',
    descEn: 'repeatable research, thinking and creative systems',
  },
  {
    titlePt: 'Venture Studio de IP',
    titleEn: 'IP Venture Studio',
    descPt: 'propriedades originais desenhadas para compor valor além de um único briefing',
    descEn: 'original properties designed to compound beyond one client brief',
  },
  {
    titlePt: 'Ferramentas Internas como Ativos de Mercado',
    titleEn: 'Internal Tools as Market Assets',
    descPt: 'métodos que podem virar produtos, plataformas ou parcerias',
    descEn: 'methods that can become products, platforms or partnerships',
  },
  {
    titlePt: 'Modelo de Spin-off',
    titleEn: 'Spin-off Model',
    descPt: 'novos negócios nascem quando uma ideia conquista lógica cultural e comercial própria',
    descEn: 'new ventures emerge when an idea earns its own cultural and commercial logic',
  },
]

// NOTA DE GOVERNANÇA: o deck de origem trazia a BU02 como
// "MELFIORE. / spin-off from Secret Honey Club". O naming canônico
// (_SHARED/BUSINESS/bu-naming.md, vigente desde 2026-06-11) é THE FIORE DAILY,
// e "Secret Honey Club" é nome histórico já aposentado. Corrigido aqui.
//
// PONTO NO INÍCIO E NO FIM em TODAS as labels (pedido do fundador 2026-07-31):
// a marcação de `.TBF.` vale para o portfólio inteiro, não só para a holding.
// E UMA cor só para os quatro cartões: a paleta por label fazia a lista parecer
// quatro coisas de peso diferente — são quatro propriedades da mesma casa.
const PORTFOLIO = [
  {
    name: '.THE BRAZILIAN FACTORY.',
    rolePt: 'Holding, camada de pesquisa e de venture',
    roleEn: 'Holding, research and venture layer',
    href: '/editorial',
  },
  {
    name: '.RUNWAY UNTD COLLECTIVE.',
    rolePt: 'Primeiro label, laboratório de moda, cultura e comunidade',
    roleEn: 'First label, a laboratory for fashion, culture and community',
    href: '/labels/runwayunited',
  },
  {
    name: '.THE FIORE DAILY.',
    rolePt: 'Marca de mídia de lifestyle e sexualidade',
    roleEn: 'Lifestyle and sexuality media brand',
    href: '/labels/thefioredaily',
  },
  {
    name: '.THE GROWTH FACTORY.',
    rolePt: 'Soluções de crescimento para negócios brasileiros construindo fora',
    roleEn: 'Growth solutions for Brazilian businesses building abroad',
    href: '/labels/factoryofgrowth',
  },
]

// "DUDE… WHERE'S MY CULTURE?" era o quinto cartão da lista de propriedades e
// nunca foi uma vertical: é uma PERGUNTA, e o fundador leu como tal
// (2026-07-31). Saiu da lista e virou o subtítulo do movimento — o que o
// portfólio inteiro está respondendo.
const PORTFOLIO_SUBTITLE = 'DUDE… WHERE’S MY CULTURE?'

const EVIDENCE = [
  {
    keyPt: 'Moda',
    keyEn: 'Fashion',
    descPt: 'universos de marca moldados por autenticidade regional',
    descEn: 'brand worlds shaped by regional authenticity',
  },
  {
    keyPt: 'Hospitalidade',
    keyEn: 'Hospitality',
    descPt: 'trabalho para um público internacional dentro do Brasil',
    descEn: 'work for an international audience in Brazil',
  },
  {
    keyPt: 'Lifestyle',
    keyEn: 'Lifestyle',
    descPt: 'narrativas, sistemas de conteúdo e relações longas com clientes',
    descEn: 'narratives, content systems and long-term client relationships',
  },
]

const CASE_BLOCKS = [
  {
    labelPt: 'Desafio',
    labelEn: 'Challenge',
    bodyPt:
      'Fazer uma campanha de verão de hostel importar para um público majoritariamente internacional.',
    bodyEn: 'Make a summer hostel campaign matter to an audience that was mostly international.',
  },
  {
    labelPt: 'Insight',
    labelEn: 'Insight',
    bodyPt:
      'Não venda uma cama. Venda a experiência cultural brasileira que as pessoas vieram encontrar.',
    bodyEn: 'Do not sell a bed. Sell the Brazilian cultural experience people came to find.',
  },
]

const CASE_EXECUTION = [
  { pt: 'Direção criativa', en: 'Creative direction' },
  { pt: 'Sistema de conteúdo', en: 'Content system' },
  { pt: 'Social media', en: 'Social media' },
  { pt: 'Ativação de comunidade', en: 'Community activation' },
]

const PARTNERSHIP = [
  {
    who: 'OVERLENS',
    lines: [
      { pt: 'Disciplina de produção.', en: 'Production discipline.' },
      { pt: 'Escala operacional.', en: 'Operational scale.' },
      { pt: 'Execução de alto padrão.', en: 'High-quality execution.' },
    ],
    color: PAPER,
  },
  {
    who: '.TBF.',
    lines: [
      { pt: 'Pesquisa cultural.', en: 'Cultural research.' },
      { pt: 'Desenvolvimento de narrativa e IP.', en: 'Narrative and IP development.' },
      { pt: 'Novas propriedades que viajam.', en: 'New properties that travel.' },
    ],
    color: ACCENT,
  },
]

const VISION_STAGES = [
  { pt: 'Estúdio\nCriativo', en: 'Creative Studio' },
  { pt: 'Empresa\nde Mídia', en: 'Media Company' },
  { pt: 'Venture Studio\nde IP', en: 'IP Venture Studio' },
  { pt: 'Instituição\nCultural', en: 'Cultural Institution' },
]

// ─── Página ──────────────────────────────────────────────────────────────────

export function PitchV3Client() {
  return (
    <div className="p3-deck">
      <DeckNav />

      {/* ── 01 · CAPA ─────────────────────────────────────────────────────────
             A capa é o hero da homepage, sem uma linha de diferença: mesmo
             componente (HomeHero), mesmo vídeo, mesmo logotype, mesmo deck.
             Quem abre o deck vê o site. Único acréscimo: o encaixe de scroll do
             movimento, que é do deck e não existe na home. ─────────────────── */}
      <HomeHero id="mov-01" style={{ scrollSnapAlign: 'start' }} advance={false} />

      <Ticker />

      {/* ── 02 · ABERTURA ─────────────────────────────────────────────────────
             A capa da 2.1. Perdeu o posto para o hero da home e virou o
             movimento de abertura, intacta. ────────────────────────────────── */}
      <section
        id="mov-02"
        style={{ ...S, justifyContent: 'flex-end', padding: 0, background: '#000000' }}
        aria-label="Abertura / Opening"
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <HeroVideo sources={EDITORIAL_VIDEO} poster="/images/editorial-feature.webp" opacity={0.35} advance={false} />
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
          {/* Eyebrow e headline vieram do fundador já em inglês (2026-07-31).
              Por isso os dois perderam a linha <En> de tradução: a camada de
              tradução existe para dobrar o português, e aqui não há português
              para dobrar. O resto do movimento segue bilíngue. */}
          <PitchReveal delay={100}>
            <p className="p3-eyebrow">FELIPE T. · CONFIDENTIAL DOC · .TBF. inc</p>
          </PitchReveal>

          <PitchReveal delay={200}>
            <h1 className="p3-cover-headline">
              SP BASED.
              <br />
              BUILT ACROSS THE COUNTRY.
              <br />
              <span style={{ color: ACCENT }}>DESIGNED FOR WORLDWIDE REACH.</span>
            </h1>
          </PitchReveal>

          <PitchReveal delay={350}>
            <TbfWordmark className="p3-cover-wordmark" />
          </PitchReveal>

          <PitchReveal delay={450}>
            <p className="p3-body" style={{ maxWidth: '46ch' }}>
              Um cultural venture studio para ideias brasileiras com alcance global.
              <En>A cultural venture studio for Brazilian ideas with global reach.</En>
            </p>
          </PitchReveal>
        </div>
      </section>

      {/* ── LINHAGEM: o carrossel da 1.0, aqui rotulado como referência ─────────
             O deck 2.0 posiciona a 032c como modelo estudado, nunca copiado.
             O rótulo honra isso: são referências de linguagem, não veículos
             que publicaram a .TBF. ────────────────────────────────────────── */}
      <section
        id="mov-03"
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
            este movimento não precisa mais do invólucro que devolvia a margem
            que a seção sangrada tirou. */}
        <Kicker n="03" pt="Campo de Referência" en="Reference Field" />

        <PitchReveal delay={100}>
          <p className="p3-refs-label">
            O campo de referência que estudamos
            <En>The reference field we study</En>
          </p>
        </PitchReveal>

        <PressLogosCarousel />

        {/* ── As cinco personalidades de referência ────────────────────────────
               Selecionadas pelo fundador em CHANGES/PERSONALITIES (prefixo
               SELECTED no arquivo). Todas em licença livre, crédito e origem
               registrados no _CREDITOS.md daquela pasta. O retrato é 1:1 na
               origem, então o quadro nunca deforma. */}
        <div className="p3-refs-people">
          <div className="p3-refs-people__grid">
            {REFERENCE_PEOPLE.map((person, i) => (
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
                  {/* SÓ O NOME (2026-07-31). A legenda trazia também o papel em
                      português E em inglês: cinco colunas estreitas com blocos
                      de texto de comprimentos diferentes, que desalinhavam a
                      fila inteira e faziam o bloco parecer bagunçado. O papel de
                      cada um já é dito pela frase que fecha o movimento; aqui
                      basta o rosto e o nome. No telefone o papel já estava
                      escondido — agora as duas telas contam a mesma coisa. */}
                  <figcaption>
                    <p className="p3-person__name">{person.name}</p>
                  </figcaption>
                </figure>
              </PitchReveal>
            ))}
          </div>

          {/* A frase fecha o bloco, não abre: entra depois dos cinco rostos,
              como conclusão do que a pessoa acabou de ver (pedido do fundador
              2026-07-31). Por isso o delay é o maior da seção. */}
          <PitchReveal delay={650}>
            <p className="p3-assert p3-refs-people__lead">
              Todas essas personalidades capturaram o espírito do momento e transformaram isso em
              linguagem.
              <En>
                All of these figures captured the spirit of their moment and turned it into
                language.
              </En>
            </p>
          </PitchReveal>
        </div>

        {/* O parágrafo "Instituições estudadas como modelo de relevância
            cultural, nunca copiadas como identidade" saiu daqui (2026-07-31).
            Ele dizia, com outras palavras, exatamente o que o fecho da Visão de
            Longo Prazo já diz: "Norte: instituições como a 032c, estudadas como
            modelo de relevância cultural, nunca copiadas como identidade".
            Repetição não é ênfase — e este era o movimento mais cheio do deck. */}
      </section>

      {/* ── 04 · A PERGUNTA ─────────────────────────────────────────────────── */}
      <section id="mov-04" style={{ ...S }} aria-label="A Pergunta / The Question">
        <Numeral n="04" />
        <Kicker n="04" pt="A Pergunta" en="The Question" />

        <PitchReveal delay={100}>
          <h2 className="p3-h2" style={{ maxWidth: '14ch', marginBottom: 'var(--p3-gap)' }}>
            Como se cria
            <br />
            <span style={{ color: ACCENT }}>valor cultural?</span>
            <En size="lead">How is cultural value created?</En>
          </h2>
        </PitchReveal>

        <div className="p3-question-list">
          {QUESTIONS.map((q, i) => (
            <PitchReveal key={q.pt} delay={200 + i * 100}>
              <p className="p3-question">
                {q.pt}
                <En>{q.en}</En>
              </p>
            </PitchReveal>
          ))}
        </div>

        <PitchReveal delay={550}>
          <p className="p3-body p3-body--dim" style={{ marginTop: 'var(--p3-gap)', maxWidth: '50ch' }}>
            Esta pergunta é a fundação da .TBF.
            <En>This question is the foundation of .TBF.</En>
          </p>
        </PitchReveal>
      </section>

      {/* ── 05 · O CONTEXTO ─────────────────────────────────────────────────── */}
      <section
        id="mov-05"
        style={{ ...S, background: '#111110' }}
        aria-label="O Contexto / The Context"
      >
        <Numeral n="05" />
        <Kicker n="05" pt="O Contexto" en="The Context" />

        <PitchReveal delay={100}>
          <h2 className="p3-h2 p3-h2--md" style={{ maxWidth: '20ch', marginBottom: 'var(--p3-gap-lg)' }}>
            Os mercados se organizam cada vez mais em torno de sentido.
            <En size="lead">Markets are increasingly organized around meaning.</En>
          </h2>
        </PitchReveal>

        <div className="p3-context-grid">
          {CONTEXT_LAYERS.map((layer, i) => (
            <PitchReveal key={layer.wordPt} delay={200 + i * 100}>
              <div style={{ borderTop: `2px solid ${ACCENT}`, paddingTop: '1.25rem' }}>
                <p className="p3-label">{layer.prePt}</p>
                <p className="p3-context-word">{layer.wordPt}</p>
                <En>
                  {layer.preEn} {layer.wordEn}
                </En>
              </div>
            </PitchReveal>
          ))}
        </div>

        <PitchReveal delay={550}>
          <p className="p3-assert" style={{ marginTop: 'var(--p3-gap)', maxWidth: '28ch' }}>
            Atenção é a consequência, não o objetivo.
            <En>Attention is the consequence, not the objective.</En>
          </p>
        </PitchReveal>

        <PitchReveal delay={650}>
          <p className="p3-body p3-tertiary" style={{ marginTop: 'var(--p3-gap-sm)', maxWidth: '58ch' }}>
            As empresas que duram aprendem a transformar valor simbólico em ativos que as pessoas
            escolhem, compartilham e aos quais retornam.
            <En>
              The companies that last learn to turn symbolic value into assets people choose, share
              and return to.
            </En>
          </p>
        </PitchReveal>
      </section>

      {/* ── 06 · NOSSA TESE ─────────────────────────────────────────────────── */}
      <section id="mov-06" style={{ ...S }} aria-label="Nossa Tese / Our Thesis">
        <Numeral n="06" />
        <Kicker n="06" pt="Nossa Tese" en="Our Thesis" />

        <PitchReveal delay={100}>
          <h2 className="p3-h2 p3-h2--md" style={{ maxWidth: '20ch', marginBottom: 'var(--p3-gap-lg)' }}>
            Capital cultural pode virar negócio durável.
            <En size="lead">Cultural capital can become durable business.</En>
          </h2>
        </PitchReveal>

        <PitchReveal delay={200}>
          <div className="p3-chain">
            {THESIS_CHAIN.map((step, i) => (
              <Fragment key={step.pt}>
                <div className="p3-chain__node">
                  <span className="p3-chain__n">0{i + 1}</span>
                  <p
                    className="p3-chain__title"
                    style={{ color: i === THESIS_CHAIN.length - 1 ? ACCENT : PAPER }}
                  >
                    {step.pt}
                  </p>
                  <En>{step.en}</En>
                </div>
                {i < THESIS_CHAIN.length - 1 && (
                  <span className="p3-chain__arrow" aria-hidden="true">
                    &#8594;
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </PitchReveal>

        <PitchReveal delay={650}>
          <p className="p3-body p3-tertiary" style={{ marginTop: 'var(--p3-gap)', maxWidth: '60ch' }}>
            Estudamos, traduzimos e escalamos códigos culturais brasileiros: com cuidado suficiente
            para preservar sentido, com rigor suficiente para gerar valor.
            <En>
              We study, translate and scale Brazilian cultural codes: carefully enough to preserve
              meaning, rigorously enough to create value.
            </En>
          </p>
        </PitchReveal>
      </section>

      {/* ── 07 · O SISTEMA OPERACIONAL ──────────────────────────────────────── */}
      <section
        id="mov-07"
        style={{ ...S, background: '#111110' }}
        aria-label="O Sistema Operacional / The Operating System"
      >
        <Numeral n="07" />
        <Kicker n="07" pt="O Sistema Operacional" en="The Operating System" />

        <PitchReveal delay={100}>
          <h2 className="p3-h2 p3-h2--md" style={{ maxWidth: '20ch', marginBottom: 'var(--p3-gap-sm)' }}>
            Um cultural venture studio em construção.
            <En size="lead">A cultural venture studio in the making.</En>
          </h2>
        </PitchReveal>

        <PitchReveal delay={150}>
          <p className="p3-assert p3-tertiary" style={{ marginBottom: 'var(--p3-gap)' }}>
            Não é uma agência com vocabulário maior.
            <En>Not an agency with a bigger vocabulary.</En>
          </p>
        </PitchReveal>

        <div className="p3-os-grid">
          {OPERATING_SYSTEM.map((item, i) => (
            <PitchReveal key={item.titlePt} delay={250 + i * 90}>
              <div
                style={{
                  background: '#000000',
                  padding: 'clamp(1.25rem, 3vw, 2rem)',
                  height: '100%',
                  borderTop: `2px solid ${ACCENT}`,
                  borderRadius: 'var(--tbf-radius-card)',
                }}
              >
                <p className="p3-item-title">
                  {item.titlePt}
                  <En>{item.titleEn}</En>
                </p>
                <p className="p3-item-desc" style={{ marginTop: '0.75rem' }}>
                  {item.descPt}
                  <En>{item.descEn}</En>
                </p>
              </div>
            </PitchReveal>
          ))}
        </div>
      </section>

      {/* ── 08 · LÓGICA DE PORTFÓLIO ────────────────────────────────────────── */}
      <section id="mov-08" style={{ ...S }} aria-label="Lógica de Portfólio / Portfolio Logic">
        <Numeral n="08" />
        <Kicker n="08" pt="Lógica de Portfólio" en="Portfolio Logic" />

        <PitchReveal delay={100}>
          <h2 className="p3-h2 p3-h2--md" style={{ maxWidth: '22ch', marginBottom: 'var(--p3-gap-sm)' }}>
            Um portfólio de propriedades, não uma lista de serviços.
            <En size="lead">A portfolio of properties, not a collection of services.</En>
          </h2>
        </PitchReveal>

        {/* A pergunta que o portfólio inteiro responde. Ela era o quinto cartão
            da lista — e não é uma vertical, é um subtítulo (pedido do fundador
            2026-07-31). */}
        <PitchReveal delay={150}>
          <p className="p3-portfolio-subtitle" style={{ marginBottom: 'var(--p3-gap)' }}>
            {PORTFOLIO_SUBTITLE}
          </p>
        </PitchReveal>

        {/* Antes: gap de 1px sobre um fundo claro, o truque que desenha um fio
            entre as linhas. Não convive com canto arredondado (o fundo vazaria
            nos cantos) e, no fim, era um divisor horizontal disfarçado, que o
            repo proíbe. Virou uma grade de cartões com folga de verdade — duas
            colunas, para as quatro propriedades caberem numa tela só. */}
        <div className="p3-portfolio-grid" style={{ maxWidth: '900px' }}>
          {PORTFOLIO.map((item, i) => {
            const inner = (
              <div
                className="p3-portfolio-row"
                style={{
                  background: '#0a0a09',
                  padding: 'clamp(1rem, 3vw, 1.75rem)',
                  borderLeft: `3px solid ${PAPER}`,
                  borderRadius: 'var(--tbf-radius-card)',
                  height: '100%',
                }}
              >
                <p className="p3-portfolio-name" style={{ color: PAPER }}>
                  {item.name}
                </p>
                <p className="p3-item-desc" style={{ marginTop: '0.4rem' }}>
                  {item.rolePt}
                  <En>{item.roleEn}</En>
                </p>
              </div>
            )

            return (
              <PitchReveal key={item.name} delay={200 + i * 80}>
                {item.href ? (
                  <Link href={item.href} style={{ display: 'block', textDecoration: 'none' }}>
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </PitchReveal>
            )
          })}
        </div>

        {/* O botão "Conheça os Selos" saiu (2026-07-31). Dois motivos: "selo"
            não existe no vocabulário da casa — aqui se diz LABEL —, e o
            movimento precisava de uma tela só. O caminho para /labels continua
            no fecho do deck e no rodapé do site. */}
      </section>

      {/* ── 09 · EVIDÊNCIA DE EXECUÇÃO ──────────────────────────────────────── */}
      <section
        id="mov-09"
        style={{ ...S, background: '#111110' }}
        aria-label="Evidência de Execução / Evidence of Execution"
      >
        <Numeral n="09" />
        <Kicker n="09" pt="Evidência de Execução" en="Evidence of Execution" />

        <PitchReveal delay={100}>
          <h2 className="p3-h2 p3-h2--md" style={{ maxWidth: '22ch', marginBottom: 'var(--p3-gap)' }}>
            A ambição olha para a frente.
            <br />
            <span style={{ color: ACCENT }}>O ofício já está em movimento.</span>
            <En size="lead">The ambition is future-facing. The craft is already in motion.</En>
          </h2>
        </PitchReveal>

        <PitchReveal delay={200}>
          <div style={{ marginBottom: 'var(--p3-gap)' }}>
            <p className="p3-stat">6+</p>
            <p className="p3-label">
              Anos em direção criativa
              <En>Years in creative direction</En>
            </p>
          </div>
        </PitchReveal>

        <div className="p3-context-grid">
          {EVIDENCE.map((item, i) => (
            <PitchReveal key={item.keyPt} delay={300 + i * 100}>
              <div style={{ borderTop: '2px solid rgba(255,255,255,0.15)', paddingTop: '1.25rem' }}>
                <p className="p3-item-title">
                  {item.keyPt}
                  <En>{item.keyEn}</En>
                </p>
                <p className="p3-item-desc" style={{ marginTop: '0.5rem' }}>
                  {item.descPt}
                  <En>{item.descEn}</En>
                </p>
              </div>
            </PitchReveal>
          ))}
        </div>

        <PitchReveal delay={650}>
          <p className="p3-footnote p3-tertiary" style={{ marginTop: 'var(--p3-gap)', maxWidth: '60ch' }}>
            Contexto selecionado: Soul Dila; moda brasileira; comunicação de hostel e hospitalidade;
            direção criativa em marcas de lifestyle.
            <En>
              Selected context: Soul Dila; Brazilian fashion; hostel and hospitality communication;
              creative direction across lifestyle brands.
            </En>
          </p>
        </PitchReveal>
      </section>

      {/* ── 10 · VISÃO DE LONGO PRAZO ───────────────────────────────────────── */}
      <section id="mov-10" style={{ ...S }} aria-label="Visão de Longo Prazo / Long-term Vision">
        <Numeral n="10" />
        <Kicker n="10" pt="Visão de Longo Prazo" en="Long-term Vision" />

        <PitchReveal delay={100}>
          <h2 className="p3-h2 p3-h2--md" style={{ maxWidth: '20ch', marginBottom: 'var(--p3-gap-lg)' }}>
            De empresa criativa a instituição cultural.
            <En size="lead">From creative company to cultural institution.</En>
          </h2>
        </PitchReveal>

        <PitchReveal delay={200}>
          <div className="p3-chain">
            {VISION_STAGES.map((stage, i) => (
              <Fragment key={stage.pt}>
                <div className="p3-chain__node">
                  <span className="p3-chain__n">0{i + 1}</span>
                  <p
                    className="p3-chain__title"
                    style={{ color: i === VISION_STAGES.length - 1 ? ACCENT : PAPER }}
                  >
                    {stage.pt}
                  </p>
                  <En>{stage.en}</En>
                </div>
                {i < VISION_STAGES.length - 1 && (
                  <span className="p3-chain__arrow" aria-hidden="true">
                    &#8594;
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </PitchReveal>

        <PitchReveal delay={650}>
          <p className="p3-body p3-body--dim" style={{ marginTop: 'var(--p3-gap)', maxWidth: '60ch' }}>
            Norte: instituições como a 032c, estudadas como modelo de relevância cultural, nunca
            copiadas como identidade.
            <En>
              North star: institutions such as 032c, studied as a model of cultural relevance, never
              copied as an identity.
            </En>
          </p>
        </PitchReveal>
      </section>

      {/* ── 11 · CASE SELECIONADO ───────────────────────────────────────────── */}
      <section
        id="mov-11"
        style={{ ...S, background: '#111110' }}
        aria-label="Case Selecionado / Selected Case"
      >
        <Numeral n="11" />
        <Kicker n="11" pt="Case Selecionado" en="Selected Case" />

        <PitchReveal delay={100}>
          <h2 className="p3-h2" style={{ marginBottom: '0.5rem' }}>
            VERÃOZÃO
          </h2>
        </PitchReveal>

        <PitchReveal delay={150}>
          <p className="p3-case-client">Ô de Casa Hostel</p>
        </PitchReveal>

        <div className="p3-case-grid">
          {CASE_BLOCKS.map((block, i) => (
            <PitchReveal key={block.labelPt} delay={200 + i * 100}>
              <div style={{ borderTop: `2px solid ${ACCENT}`, paddingTop: '1.25rem', height: '100%' }}>
                <p className="p3-label">
                  {block.labelPt}
                  <En>{block.labelEn}</En>
                </p>
                <p className="p3-case-body" style={{ marginTop: '0.75rem' }}>
                  {block.bodyPt}
                  <En>{block.bodyEn}</En>
                </p>
              </div>
            </PitchReveal>
          ))}

          <PitchReveal delay={400}>
            <div style={{ borderTop: `2px solid ${ACCENT}`, paddingTop: '1.25rem', height: '100%' }}>
              <p className="p3-label">
                Execução
                <En>Execution</En>
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0' }}>
                {CASE_EXECUTION.map((line) => (
                  <li key={line.pt} className="p3-exec-item">
                    {line.pt}
                    <En>{line.en}</En>
                  </li>
                ))}
              </ul>
            </div>
          </PitchReveal>
        </div>

        <PitchReveal delay={550}>
          <p className="p3-body p3-tertiary" style={{ marginTop: 'var(--p3-gap)', maxWidth: '62ch' }}>
            O trabalho traduziu hospitalidade em um convite culturalmente legível: verão brasileiro,
            feito para ser sentido, não explicado.
            <En>
              The work translated hospitality into a culturally legible invitation: Brazilian summer,
              designed to be felt, not explained.
            </En>
          </p>
        </PitchReveal>
      </section>

      {/* ── 12 · POR QUE A OVERLENS ─────────────────────────────────────────── */}
      <section
        id="mov-12"
        style={{ ...S }}
        aria-label="Por Que a Overlens / Why Overlens"
      >
        <Numeral n="12" />
        <Kicker n="12" pt="Por Que a Overlens" en="Why Overlens" />

        <PitchReveal delay={100}>
          <h2 className="p3-h2" style={{ maxWidth: '16ch', marginBottom: 'var(--p3-gap-lg)' }}>
            Uma parceria para ir
            <br />
            <span style={{ color: ACCENT }}>além de entregáveis.</span>
            <En size="lead">A partnership to move beyond deliverables.</En>
          </h2>
        </PitchReveal>

        <div className="p3-partner-grid">
          {PARTNERSHIP.map((side, i) => (
            <PitchReveal key={side.who} delay={200 + i * 120}>
              <div
                style={{
                  background: '#000000',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  borderTop: `2px solid ${side.color}`,
                  borderRadius: 'var(--tbf-radius-card)',
                  height: '100%',
                }}
              >
                <p className="p3-partner-name" style={{ color: side.color }}>
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
          ))}
        </div>

        <PitchReveal delay={500}>
          <p className="p3-assert p3-assert--lg" style={{ marginTop: 'var(--p3-gap)', maxWidth: '30ch' }}>
            Juntas: serviços criativos podem virar ativos culturais.
            <En>Together: creative services can become cultural assets.</En>
          </p>
        </PitchReveal>
      </section>

      {/* ── 13 · FECHO ──────────────────────────────────────────────────────── */}
      <section
        id="mov-13"
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
              O Brasil sempre exportou commodities.
              <br />
              <span style={{ color: ACCENT }}>Nós exportamos valor cultural.</span>
              <En size="lead">
                Brazil has always exported commodities. We export cultural value.
              </En>
            </blockquote>
          </PitchReveal>

          <PitchReveal delay={350}>
            <TbfWordmark
              style={{
                width: '100%',
                // Teto menor (era 700px): no fecho o logotipo dividia a tela com
                // citação, contatos, três botões e o rodapé legal, e era ele que
                // empurrava o movimento para fora de uma tela.
                maxWidth: 'min(460px, 62vw)',
                height: 'auto',
                display: 'block',
                marginBottom: 'var(--p3-gap)',
              }}
            />
          </PitchReveal>

          <PitchReveal delay={450}>
            <p className="p3-eyebrow p3-eyebrow--accent">
              Uma conversa de trabalho com a Overlens
              <En>A working conversation with Overlens</En>
            </p>
          </PitchReveal>

          <PitchReveal delay={550}>
            <p className="p3-contact-site">thebrfactory.com</p>
            <p className="p3-contact-mail">tavaristico@thebrfactory.com</p>
          </PitchReveal>

          <PitchReveal delay={650}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/manifesto" className="btn btn--primary">
                Manifesto &#8594;
              </Link>
              <Link href="/labels" className="btn btn--secondary">
                Labels &#8594;
              </Link>
              <a
                href="https://instagram.com/thebrfactory"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                @thebrfactory &#8594;
              </a>
            </div>
          </PitchReveal>

          <PitchReveal delay={800}>
            <p className="p3-legal">
              .TBF. inc · CNPJ 61.360.565/0001-74 · Rua Pamplona 145, Jardim Paulista, São Paulo, SP,
              01405-900
            </p>
          </PitchReveal>
        </div>
      </section>

      {/* ── Design system do deck + layout responsivo (mobile-first) ─────────── */}
      <style>{`
        .p3-deck {
          background: #000000;
          color: ${PAPER};
          font-family: var(--tbf-font-family-display);

          /* RÉGUA VERTICAL DO DECK. Todo respiro entre blocos de um movimento
             sai daqui, e o termo dominante é vh: numa janela baixa o deck se
             comprime sozinho e continua cabendo em uma tela. Antes eram valores
             fixos (3rem, 3.5rem) espalhados em estilo inline, que não sabiam
             nada sobre a altura da janela — é de lá que vinha o vazamento. */
          /* FAIXA PINADA no topo: nav fixo + letreiro sticky. É de onde saem
             AO MESMO TEMPO o encaixe do movimento (scroll-margin-top) e a
             altura dele (100dvh menos a faixa). Um valor só, para os dois nunca
             se descolarem. */
          --p3-band: calc(var(--tbf-nav-height-sm) + var(--tbf-ticker-height-sm));

          /* Recuo lateral do movimento. Era um clamp repetido no estilo inline
             da seção E no cabeçalho do movimento 03; virou variável porque o
             kicker (que agora é ancorado, não empurrado) precisa começar
             exatamente na mesma coluna do texto. */
          --p3-pad-x: clamp(1.25rem, 5vw, 6rem);

          /* PONTO FIXO DO KICKER (pedido do fundador 2026-08-08). O topo da
             seção já cai logo abaixo do letreiro por causa do scroll-margin,
             então esta é a distância entre o letreiro e o título numerado. Um
             valor só, para os 13 movimentos começarem na MESMA linha. */
          --p3-kicker-top: clamp(0.75rem, 2.4vh, 1.75rem);
          /* Espaço que o movimento reserva para o kicker que saiu do fluxo. */
          --p3-kicker-reserve: calc(var(--p3-kicker-top) + clamp(1.6rem, 4.5vh, 2.6rem));

          --p3-gap:    clamp(1rem, 3.2vh, 2.25rem);
          --p3-gap-sm: clamp(0.5rem, 1.6vh, 1.1rem);
          --p3-gap-lg: clamp(1.25rem, 4.2vh, 3rem);
        }

        /* O nav e o letreiro são sticky e ficam pinados no topo. Sem esta
           margem, a seta joga o topo do movimento para debaixo dos dois e o
           kicker aparece cortado. Composto dos tokens de altura, não de número
           mágico, para acompanhar qualquer mudança no header. */
        .p3-deck > section {
          scroll-margin-top: var(--p3-band);
        }

        /* Encaixe suave nos movimentos. Precisa viver no container que ROLA (o
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

        @media (min-width: 1280px) {
          .p3-deck {
            --p3-band: calc(var(--tbf-nav-height-xl) + var(--tbf-ticker-height-xl));
          }
        }

        /* ─── CAMADA DE TRADUÇÃO (EN) ────────────────────────────────────────
           Família diferente do PT (Printed), Light Italic, discreta. É a regra
           única de toda a página: se está em Printed itálico, é tradução. */
        /* Tamanho e contraste subidos (pedido do fundador: o peso fino ficou
           certo, mas não dava para LER). O corpo saiu de 10-12px para 13-15px e
           a opacidade de 0,34 para 0,52. Continua secundária, agora legível. */
        .p3-en {
          display: block;
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-style: italic;
          font-size: clamp(0.8125rem, 2.4vw, 0.9375rem);
          line-height: 1.55;
          letter-spacing: 0.015em;
          color: rgba(240,237,230,0.52);
          /* PAR COLADO (pedido do fundador 2026-07-31). A tradução tem de andar
             AGARRADA à frase que traduz. Com respiro de 0,6rem, a distância de
             uma frase para a sua tradução ficava igual à distância entre dois
             itens da lista, e o olho lia um texto corrido só, não pares. A
             regra de agora: dentro do par, quase nada; entre pares, quem separa
             é a margem do item (ver .p3-pair-gap). */
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
        .p3-partner-line:last-child,
        .p3-exec-item:last-child {
          margin-bottom: 0;
        }

        /* ─── KICKER ─────────────────────────────────────────────────────── */
        /* A âncora. Fora do fluxo, presa ao topo do movimento (toda section do
           deck é position: relative), na mesma coluna do texto. O movimento
           reserva o espaço dela em padding-top, então nada passa por baixo. */
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

        /* ─── NUMERAL MARCA-D'ÁGUA (Printed Thin) ────────────────────────── */
        .p3-numeral {
          position: absolute;
          top: clamp(2rem, 6vw, 4rem);
          right: clamp(0.5rem, 3vw, 3rem);
          z-index: 0;
          pointer-events: none;
          font-family: var(--tbf-font-family-printed);
          font-weight: 100;
          /* O numeral é decoração: ele acompanha a MENOR das duas dimensões da
             janela, senão vira uma mancha de 20rem numa tela baixa e come o
             movimento inteiro. */
          font-size: clamp(5rem, min(22vw, 32vh), 15rem);
          line-height: 0.8;
          letter-spacing: -0.04em;
          color: rgba(240,237,230,0.045);
        }

        /* ─── TIPOGRAFIA DO DECK ─────────────────────────────────────────── */
        /* Toda headline mede a janela pelos DOIS lados: o termo vh é o que faz
           o título encolher numa tela baixa em vez de empurrar o resto do
           movimento para fora. Os tetos também baixaram (4.5rem → 3.6rem), que
           é o pedido de "mais enxuto e legível": título menor, movimento
           inteiro visível de uma vez. */
        .p3-h2 {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-display);
          font-size: clamp(1.9rem, min(6.4vw, 6.6vh), 3.6rem);
          font-weight: 900;
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

        .p3-body {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.85rem, min(2.4vw, 2.1vh), 1.0625rem);
          line-height: 1.6;
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
          font-size: clamp(1rem, min(2.9vw, 2.8vh), 1.4rem);
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: ${PAPER};
        }

        .p3-context-word {
          font-family: var(--tbf-font-family-display);
          font-weight: 900;
          font-size: clamp(1.35rem, min(4.4vw, 4vh), 2.1rem);
          line-height: 1;
          letter-spacing: -0.03em;
          color: ${PAPER};
          margin-top: 0.5rem;
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
          line-height: 1.5;
          color: rgba(240,237,230,0.5);
        }

        /* Subtítulo do movimento 08: a pergunta, em Printed itálico, no mesmo
           registro de voz do resto da camada secundária do deck. */
        .p3-portfolio-subtitle {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-style: italic;
          font-size: clamp(0.9rem, min(2.8vw, 2.6vh), 1.3rem);
          letter-spacing: 0.02em;
          color: rgba(240,237,230,0.6);
        }

        .p3-portfolio-name {
          font-family: var(--tbf-font-family-display);
          font-weight: 900;
          font-size: clamp(0.95rem, min(2.6vw, 2.4vh), 1.3rem);
          letter-spacing: -0.03em;
        }
        /* Deslize curto no hover: confirma que a linha é clicável sem sublinhado. */
        .p3-portfolio-row {
          transition: transform 400ms ${EASE}, background-color 400ms ${EASE};
        }
        a:hover > .p3-portfolio-row {
          transform: translateX(6px);
          background-color: #161613;
        }

        .p3-stat {
          font-family: var(--tbf-font-family-display);
          font-weight: 900;
          font-size: clamp(2.5rem, min(10vw, 10vh), 5rem);
          line-height: 1;
          letter-spacing: -0.05em;
          color: ${ACCENT};
        }

        .p3-case-client {
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: clamp(0.75rem, 2vw, 0.95rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${ACCENT};
          margin-bottom: var(--p3-gap);
        }
        .p3-case-body {
          font-family: var(--tbf-font-family-display);
          font-weight: 700;
          font-size: clamp(0.95rem, min(2.5vw, 2.3vh), 1.15rem);
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: ${PAPER};
        }
        .p3-exec-item {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.82rem, min(2vw, 1.9vh), 0.95rem);
          line-height: 1.45;
          color: rgba(240,237,230,0.65);
          margin-bottom: calc(var(--p3-gap-sm) * 1.6);
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
          font-size: clamp(0.85rem, min(2.1vw, 2vh), 1rem);
          line-height: 1.5;
          color: rgba(240,237,230,0.6);
          margin-bottom: calc(var(--p3-gap-sm) * 1.6);
        }

        .p3-footnote {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.75rem, 2vw, 0.875rem);
          line-height: 1.7;
          color: rgba(240,237,230,0.4);
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
        .p3-refs-label {
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.35);
          text-align: center;
          margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
          padding: 0 1.25rem;
        }
        .p3-refs-label .p3-en { text-align: center; }

        /* ─── AS CINCO PERSONALIDADES DE REFERÊNCIA ──────────────────────────
           UMA FILA ÚNICA, do 390px ao 1440px, como uma barra de stories. A
           versão anterior era 2 colunas no mobile com a quinta sozinha na
           última linha: ocupava quase meia tela e quebrava o "um movimento, uma
           tela".
           No mobile o círculo é pequeno demais para segurar a legenda — 5
           colunas de ~60px dariam duas palavras por linha —, então lá fica só o
           NOME. A função de cada referência volta a partir de 768px, onde a
           coluna tem largura para ser lida. Cortar o que não cabe é o pedido de
           "mais enxuto e legível"; espremer não seria nem uma coisa nem outra. */
        /* O respiro sai do TAMANHO DOS MARCADORES, não do gosto: os assets .TBF.
           do carrossel são mais altos que a faixa de logos e sobram para fora
           dela (é o desenho). Com o respiro antigo, essa sobra caía em cima da
           primeira fila de retratos — foi o encosto que o fundador viu. */
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
          /* −40% (pedido do fundador 2026-07-31): 900px → 540px. A fila é uma
             NOTA de rodapé do campo de referência, não o assunto do movimento;
             no tamanho anterior competia com o trilho de imprensa. */
          max-width: 540px;
          /* Centrada: o trilho de logos acima corre de ponta a ponta e o rótulo
             do movimento é centrado. Ancorada à esquerda, a fila de retratos
             deixava meia tela vazia à direita. */
          margin-inline: auto;
        }

        .p3-person {
          margin: 0;
          text-align: center;
        }

        /* Retrato REDONDO, estética de story do Instagram (pedido do fundador
           2026-07-31). O quadrado com canto arredondado virava um cartãozinho;
           o círculo lê como pessoa. Os arquivos já são 1:1 na origem, então o
           recorte circular não corta rosto nenhum. */
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
          /* O deck é preto e os retratos são de época, de temperaturas muito
             diferentes entre si. O dessaturado parcial costura as cinco fotos
             numa família só, sem apagar o rosto de ninguém. */
          filter: grayscale(1) contrast(1.05);
          transition: filter 600ms ${EASE};
        }

        .p3-person:hover .p3-person__img {
          filter: grayscale(0) contrast(1);
        }

        /* Os nomes têm comprimentos muito diferentes (WILL.I.AM x OSWALD DE
           ANDRADE): sem uma altura reservada, uns ocupam uma linha e outros
           duas, e a fila desalinha embaixo. Duas linhas reservadas para todos
           deixam a base do bloco reta. */
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
          .p3-person__img { transition: none; }
        }

        /* ─── NAVEGAÇÃO POR SETAS ────────────────────────────────────────── */
        .p3-nav {
          position: fixed;
          right: clamp(0.75rem, 3vw, 2rem);
          bottom: clamp(0.75rem, 3vw, 2rem);
          z-index: 40;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.5rem 0.5rem 1.1rem;
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
        .p3-nav__label {
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-style: italic;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          color: rgba(240,237,230,0.6);
          max-width: 13ch;
        }
        .p3-nav__buttons { display: flex; gap: 0.35rem; }
        .p3-nav__btn {
          width: 2.75rem;
          height: 2.75rem;
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

        @media (max-width: 400px) {
          .p3-nav__label { display: none; }
        }

        /* A barra de navegação é FIXA sobre o movimento. No telefone ela
           precisa caber na folga de baixo reservada pelo slide (ver S), senão
           come a última linha do conteúdo — foi o que aconteceu com o terceiro
           bloco do movimento 09. Botão menor, barra mais baixa. */
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
        /* Brother1816 THIN (100) na headline da abertura, por pedido do fundador
           (2026-07-31). Era Black (900). No peso fino a mancha muda de natureza:
           o entrelinhamento abre um pouco e o entreletramento afrouxa, senão as
           hastes finas encostam e a linha some sobre o vídeo. */
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

        /* Grid de 3 colunas: empilha no mobile */
        .p3-context-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--p3-gap);
        }

        /* Cadeia de etapas: vertical no mobile, horizontal no desktop */
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
          font-size: clamp(1.125rem, 3.5vw, 1.5rem);
          line-height: 1.1;
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
        .p3-case-grid,
        .p3-partner-grid,
        .p3-portfolio-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(0.5rem, 1.6vh, 1.25rem);
        }

        /* Quatro cartões curtos empilhados passavam de uma tela no mobile. Em
           duas colunas o movimento cabe e cada cartão continua legível. */
        .p3-os-grid,
        .p3-portfolio-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        /* CARTÕES DO MESMO TAMANHO (pedido do fundador 2026-07-31). O cartão já
           pedia altura 100%, mas quem o segura é o wrapper do reveal, e ele não
           esticava. Duas providências: 1fr iguala as DUAS linhas entre si (senão
           cada uma se ajusta ao seu texto mais longo) e o wrapper passa a ocupar
           a célula inteira. */
        .p3-portfolio-grid {
          grid-auto-rows: 1fr;
        }

        .p3-portfolio-grid > *,
        .p3-portfolio-grid > * > a {
          height: 100%;
        }

        @media (min-width: 768px) {
          .p3-context-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .p3-os-grid,
          .p3-partner-grid,
          .p3-portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .p3-case-grid {
            grid-template-columns: repeat(3, 1fr);
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
        }

        @media (min-width: 1024px) {
          .p3-os-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ─── RÉGUA DO TELEFONE ──────────────────────────────────────────────
           Um iPhone 13 dá 664px de altura útil e o deck é BILÍNGUE: cada linha
           nasce dobrada. No desktop os 13 movimentos cabem numa tela com folga;
           no telefone, com a régua do desktop, os mais cheios passavam 200px.
           Aqui a régua inteira encolhe de uma vez — respiros, corpo e a camada
           de tradução — em vez de cada movimento ganhar um remendo. */
        @media (max-width: 767px) {
          .p3-deck {
            --p3-gap:    clamp(0.6rem, 2.4vh, 1.2rem);
            --p3-gap-sm: 0.4rem;
            --p3-gap-lg: clamp(0.75rem, 3vh, 1.5rem);
          }
          .p3-en {
            font-size: 0.68rem;
            line-height: 1.3;
            margin-top: 0.05rem;
          }
          .p3-en--lead { font-size: 0.82rem; margin-top: 0.15rem; }
          .p3-h2 { font-size: clamp(1.4rem, 5.1vw, 1.85rem); }
          .p3-h2--md { font-size: clamp(1.15rem, 4.4vw, 1.5rem); }
          .p3-body { font-size: 0.78rem; line-height: 1.4; }
          .p3-assert { font-size: 0.95rem; }
          .p3-assert--lg { font-size: 1.05rem; }
          .p3-item-desc { font-size: 0.66rem; line-height: 1.25; }
          .p3-item-title { font-size: 0.82rem; line-height: 1.1; }
          .p3-footnote { font-size: 0.7rem; line-height: 1.4; }
          .p3-context-word { font-size: clamp(1.15rem, 4.4vw, 1.5rem); }
          .p3-question { font-size: 0.92rem; }
          .p3-case-body { font-size: 0.72rem; line-height: 1.2; }
          .p3-case-client { font-size: 0.7rem; margin-bottom: var(--p3-gap-sm); }
          .p3-label { font-size: 0.62rem; }
          .p3-stat { line-height: 0.9; }
          .p3-exec-item { font-size: 0.76rem; line-height: 1.25; margin-bottom: 0.2rem; }
          .p3-partner-line { font-size: 0.8rem; margin-bottom: 0.7rem; }
          .p3-kicker__n, .p3-kicker__pt { font-size: 0.62rem; }
          .p3-kicker__en { font-size: 0.68rem; }

          /* A cadeia de etapas (tese e visão) empilhava 4 nós + 3 setas: era o
             bloco mais alto do deck no telefone. Em 2x2 ela vira um quadro só.
             A seta some junto — em grade, ela apontaria para o lugar errado, e
             a ordem já é dada pelo numeral de cada nó. */
          .p3-chain {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--p3-gap-sm) 0.75rem;
          }
          .p3-chain__arrow { display: none; }
          .p3-chain__title { font-size: 1rem; margin-top: 0.25rem; }

          /* Cartões (sistema operacional, portfólio, parceria): o respiro
             interno de desktop custava ~120px por movimento no telefone. */
          .p3-os-grid > * > div,
          .p3-partner-grid > * > div,
          .p3-portfolio-grid > * > div,
          .p3-portfolio-grid > * > a > div {
            padding: 0.75rem !important;
          }

          /* Os blocos com fio superior (contexto, evidência, case) reservavam
             1,25rem entre o fio e o título — respiro de desktop. */
          .p3-context-grid > * > div,
          .p3-case-grid > * > div {
            padding-top: 0.6rem !important;
          }

          /* OVERLENS × .TBF. lado a lado também no telefone: são duas listas
             curtas, e empilhadas custavam meio movimento. */
          .p3-partner-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          /* Case: Desafio e Insight lado a lado, Execução inteira embaixo. São
             dois parágrafos curtos contra uma lista de quatro itens — empilhar
             os três era o único movimento que ainda não cabia numa tela. */
          .p3-case-grid {
            gap: 0.4rem 0.75rem;
            grid-template-columns: 1fr 1fr;
          }
          .p3-case-grid > *:last-child {
            grid-column: 1 / -1;
          }

          /* CAMADA TERCIÁRIA. São os parágrafos que ELABORAM o que o movimento
             já afirmou: no desktop eles cabem e enriquecem; no telefone são a
             diferença entre um slide e um slide e meio. O que some aqui nunca é
             a tese do movimento — é o comentário sobre ela. */
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
          .p3-portfolio-row, .p3-nav__btn { transition: none; }
        }
      `}</style>
    </div>
  )
}
