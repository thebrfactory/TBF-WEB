'use client'

// =============================================================================
// PITCH 2.0 CLIENT · working deck, 13 movimentos
// -----------------------------------------------------------------------------
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
  { id: 'mov-10', pt: 'Case Selecionado', en: 'Selected Case' },
  { id: 'mov-11', pt: 'Por Que a Overlens', en: 'Why Overlens' },
  { id: 'mov-12', pt: 'Visão de Longo Prazo', en: 'Long-term Vision' },
  { id: 'mov-13', pt: 'Fecho', en: 'Close' },
] as const

// ─── Camada de tradução ──────────────────────────────────────────────────────
// Um único componente para TODO inglês do deck. Trocar a régua da tradução vira
// uma edição só, em vez de 60 estilos inline espalhados.
function En({ children, size = 'sm' }: { children: React.ReactNode; size?: 'sm' | 'lead' }) {
  return <span className={size === 'lead' ? 'p2-en p2-en--lead' : 'p2-en'}>{children}</span>
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

  const go = useCallback((index: number) => {
    const target = MOVEMENTS[Math.max(0, Math.min(MOVEMENTS.length - 1, index))]
    document.getElementById(target.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
    <div className="p2-nav" role="group" aria-label="Navegação do deck">
      <div className="p2-nav__meta" aria-live="polite">
        <span className="p2-nav__count">
          {String(active + 1).padStart(2, '0')}
          <span className="p2-nav__total"> / {MOVEMENTS.length}</span>
        </span>
        <span className="p2-nav__label">{current.pt}</span>
      </div>

      <div className="p2-nav__buttons">
        <button
          type="button"
          className="p2-nav__btn"
          onClick={() => go(active - 1)}
          disabled={atStart}
          aria-label={`Movimento anterior${atStart ? ' (indisponível)' : ''}`}
        >
          <span aria-hidden="true">&#8592;</span>
        </button>
        <button
          type="button"
          className="p2-nav__btn"
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
function Kicker({ n, pt, en }: { n: string; pt: string; en: string }) {
  return (
    <PitchReveal delay={0}>
      <p className="p2-kicker">
        <span className="p2-kicker__n">{n}</span>
        <span className="p2-kicker__pt">{pt}</span>
        <span className="p2-kicker__en">{en}</span>
      </p>
    </PitchReveal>
  )
}

// Numeral marca-d'água: Printed Thin gigante, quase invisível. Dá profundidade
// à seção sem acrescentar nenhum traço (dividers são proibidos no site).
function Numeral({ n }: { n: string }) {
  return (
    <span className="p2-numeral" aria-hidden="true">
      {n}
    </span>
  )
}

const S: React.CSSProperties = {
  minHeight: '100dvh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 'clamp(4rem, 10vw, 8rem) clamp(1.25rem, 5vw, 6rem)',
  // A barra de navegação é fixa no canto inferior direito. Sem esta folga, a
  // última linha de cada movimento passa por baixo dela no mobile.
  paddingBottom: 'clamp(7rem, 14vw, 9rem)',
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
const PORTFOLIO = [
  {
    name: '.THE BRAZILIAN FACTORY.',
    rolePt: 'Holding, camada de pesquisa e de venture',
    roleEn: 'Holding, research and venture layer',
    href: '/editorial',
    color: PAPER,
  },
  {
    name: 'RUNWAY UNTD COLLECTIVE.',
    rolePt: 'Primeiro selo, laboratório de moda, cultura e comunidade',
    roleEn: 'First label, a laboratory for fashion, culture and community',
    href: '/labels/runwayunited',
    color: PAPER,
  },
  {
    name: 'THE FIORE DAILY.',
    rolePt: 'Marca de mídia de lifestyle e sexualidade',
    roleEn: 'Lifestyle and sexuality media brand',
    href: '/labels/thefioredaily',
    color: '#C8A96A',
  },
  {
    name: 'THE GROWTH FACTORY.',
    rolePt: 'Soluções de crescimento para negócios brasileiros construindo fora',
    roleEn: 'Growth solutions for Brazilian businesses building abroad',
    href: '/labels/factoryofgrowth',
    color: ACCENT,
  },
  {
    // Item presente no deck sem descrição. Mantido como propriedade em aberto.
    name: 'DUDE… WHERE’S MY CULTURE?',
    rolePt: 'Em desenvolvimento',
    roleEn: 'In development',
    href: null,
    color: 'rgba(240,237,230,0.55)',
  },
]

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

export function PitchV2Client() {
  return (
    <div className="p2-deck">
      <DeckNav />

      {/* ── 01 · CAPA ─────────────────────────────────────────────────────────
             A capa é o hero da homepage, sem uma linha de diferença: mesmo
             componente (HomeHero), mesmo vídeo, mesmo logotype, mesmo deck.
             Quem abre o deck vê o site. Único acréscimo: o encaixe de scroll do
             movimento, que é do deck e não existe na home. ─────────────────── */}
      <HomeHero id="mov-01" style={{ scrollSnapAlign: 'start' }} />

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
          {/* Eyebrow e headline vieram do fundador já em inglês (2026-07-31).
              Por isso os dois perderam a linha <En> de tradução: a camada de
              tradução existe para dobrar o português, e aqui não há português
              para dobrar. O resto do movimento segue bilíngue. */}
          <PitchReveal delay={100}>
            <p className="p2-eyebrow">FELIPE T. · CONFIDENTIAL DOC · .TBF. inc</p>
          </PitchReveal>

          <PitchReveal delay={200}>
            <h1 className="p2-cover-headline">
              SP BASED.
              <br />
              BUILT ACROSS THE COUNTRY.
              <br />
              <span style={{ color: ACCENT }}>DESIGNED FOR WORLDWIDE REACH.</span>
            </h1>
          </PitchReveal>

          <PitchReveal delay={350}>
            <TbfWordmark className="p2-cover-wordmark" />
          </PitchReveal>

          <PitchReveal delay={450}>
            <p className="p2-body" style={{ maxWidth: '46ch' }}>
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
          // Este é o movimento mais cheio do deck (kicker + carrossel + cinco
          // retratos). Com o respiro padrão ele passava de 1,4 tela no desktop e
          // os nomes caíam fora do primeiro quadro. Respiro vertical menor só
          // aqui; a folga de baixo continua acima da barra de navegação fixa.
          paddingTop: 'clamp(2.5rem, 6vw, 4rem)',
          paddingBottom: 'clamp(6.5rem, 12vw, 7.5rem)',
          background: '#000000',
        }}
        aria-label="Campo de Referência / Reference Field"
      >
        <Numeral n="03" />
        <div style={{ paddingInline: 'clamp(1.25rem, 5vw, 6rem)' }}>
          <Kicker n="03" pt="Campo de Referência" en="Reference Field" />
        </div>

        <PitchReveal delay={100}>
          <p className="p2-refs-label">
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
        <div className="p2-refs-people">
          <div className="p2-refs-people__grid">
            {REFERENCE_PEOPLE.map((person, i) => (
              <PitchReveal key={person.name} delay={200 + i * 80}>
                <figure className="p2-person">
                  <Image
                    src={person.src}
                    alt={person.name}
                    width={1200}
                    height={1200}
                    className="p2-person__img"
                    sizes="(max-width: 767px) 45vw, 18vw"
                  />
                  <figcaption>
                    <p className="p2-person__name">{person.name}</p>
                    <p className="p2-person__role">
                      {person.rolePt}
                      <En>{person.roleEn}</En>
                    </p>
                  </figcaption>
                </figure>
              </PitchReveal>
            ))}
          </div>

          {/* A frase fecha o bloco, não abre: entra depois dos cinco rostos,
              como conclusão do que a pessoa acabou de ver (pedido do fundador
              2026-07-31). Por isso o delay é o maior da seção. */}
          <PitchReveal delay={650}>
            <p className="p2-assert p2-refs-people__lead">
              Todas essas personalidades capturaram o espírito do momento e transformaram isso em
              linguagem.
              <En>
                All of these figures captured the spirit of their moment and turned it into
                language.
              </En>
            </p>
          </PitchReveal>
        </div>

        <PitchReveal delay={250}>
          <p
            className="p2-body p2-body--dim"
            style={{ marginTop: 'clamp(2rem, 5vw, 3rem)', paddingInline: 'clamp(1.25rem, 5vw, 6rem)', maxWidth: '58ch' }}
          >
            Instituições estudadas como modelo de relevância cultural, nunca copiadas como
            identidade.
            <En>
              Institutions studied as a model of cultural relevance, never copied as an identity.
            </En>
          </p>
        </PitchReveal>
      </section>

      {/* ── 04 · A PERGUNTA ─────────────────────────────────────────────────── */}
      <section id="mov-04" style={{ ...S }} aria-label="A Pergunta / The Question">
        <Numeral n="04" />
        <Kicker n="04" pt="A Pergunta" en="The Question" />

        <PitchReveal delay={100}>
          <h2 className="p2-h2" style={{ maxWidth: '14ch', marginBottom: '3rem' }}>
            Como se cria
            <br />
            <span style={{ color: ACCENT }}>valor cultural?</span>
            <En size="lead">How is cultural value created?</En>
          </h2>
        </PitchReveal>

        <div className="p2-question-list">
          {QUESTIONS.map((q, i) => (
            <PitchReveal key={q.pt} delay={200 + i * 100}>
              <p className="p2-question">
                {q.pt}
                <En>{q.en}</En>
              </p>
            </PitchReveal>
          ))}
        </div>

        <PitchReveal delay={550}>
          <p className="p2-body p2-body--dim" style={{ marginTop: '3rem', maxWidth: '50ch' }}>
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
          <h2 className="p2-h2 p2-h2--md" style={{ maxWidth: '20ch', marginBottom: '3.5rem' }}>
            Os mercados se organizam cada vez mais em torno de sentido.
            <En size="lead">Markets are increasingly organized around meaning.</En>
          </h2>
        </PitchReveal>

        <div className="p2-context-grid">
          {CONTEXT_LAYERS.map((layer, i) => (
            <PitchReveal key={layer.wordPt} delay={200 + i * 100}>
              <div style={{ borderTop: `2px solid ${ACCENT}`, paddingTop: '1.25rem' }}>
                <p className="p2-label">{layer.prePt}</p>
                <p className="p2-context-word">{layer.wordPt}</p>
                <En>
                  {layer.preEn} {layer.wordEn}
                </En>
              </div>
            </PitchReveal>
          ))}
        </div>

        <PitchReveal delay={550}>
          <p className="p2-assert" style={{ marginTop: '3rem', maxWidth: '28ch' }}>
            Atenção é a consequência, não o objetivo.
            <En>Attention is the consequence, not the objective.</En>
          </p>
        </PitchReveal>

        <PitchReveal delay={650}>
          <p className="p2-body" style={{ marginTop: '1.5rem', maxWidth: '58ch' }}>
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
          <h2 className="p2-h2 p2-h2--md" style={{ maxWidth: '20ch', marginBottom: '3.5rem' }}>
            Capital cultural pode virar negócio durável.
            <En size="lead">Cultural capital can become durable business.</En>
          </h2>
        </PitchReveal>

        <PitchReveal delay={200}>
          <div className="p2-chain">
            {THESIS_CHAIN.map((step, i) => (
              <Fragment key={step.pt}>
                <div className="p2-chain__node">
                  <span className="p2-chain__n">0{i + 1}</span>
                  <p
                    className="p2-chain__title"
                    style={{ color: i === THESIS_CHAIN.length - 1 ? ACCENT : PAPER }}
                  >
                    {step.pt}
                  </p>
                  <En>{step.en}</En>
                </div>
                {i < THESIS_CHAIN.length - 1 && (
                  <span className="p2-chain__arrow" aria-hidden="true">
                    &#8594;
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </PitchReveal>

        <PitchReveal delay={650}>
          <p className="p2-body" style={{ marginTop: '3rem', maxWidth: '60ch' }}>
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
          <h2 className="p2-h2 p2-h2--md" style={{ maxWidth: '20ch', marginBottom: '1.5rem' }}>
            Um cultural venture studio em construção.
            <En size="lead">A cultural venture studio in the making.</En>
          </h2>
        </PitchReveal>

        <PitchReveal delay={150}>
          <p className="p2-assert" style={{ marginBottom: '3rem' }}>
            Não é uma agência com vocabulário maior.
            <En>Not an agency with a bigger vocabulary.</En>
          </p>
        </PitchReveal>

        <div className="p2-os-grid">
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
                <p className="p2-item-title">
                  {item.titlePt}
                  <En>{item.titleEn}</En>
                </p>
                <p className="p2-item-desc" style={{ marginTop: '0.75rem' }}>
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
          <h2 className="p2-h2 p2-h2--md" style={{ maxWidth: '22ch', marginBottom: '3rem' }}>
            Um portfólio de propriedades, não uma lista de serviços.
            <En size="lead">A portfolio of properties, not a collection of services.</En>
          </h2>
        </PitchReveal>

        {/* Antes: gap de 1px sobre um fundo claro, o truque que desenha um fio
            entre as linhas. Não convive com canto arredondado (o fundo vazaria
            nos cantos) e, no fim, era um divisor horizontal disfarçado, que o
            repo proíbe. Virou uma pilha de cartões com folga de verdade. */}
        <div style={{ display: 'grid', gap: 'clamp(0.5rem, 1.5vw, 0.75rem)', maxWidth: '820px' }}>
          {PORTFOLIO.map((item, i) => {
            const inner = (
              <div
                className="p2-portfolio-row"
                style={{
                  background: '#0a0a09',
                  padding: 'clamp(1rem, 3vw, 1.75rem)',
                  borderLeft: `3px solid ${item.color}`,
                  borderRadius: 'var(--tbf-radius-card)',
                  height: '100%',
                }}
              >
                <p className="p2-portfolio-name" style={{ color: item.color }}>
                  {item.name}
                </p>
                <p className="p2-item-desc" style={{ marginTop: '0.4rem' }}>
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

        <PitchReveal delay={650}>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/labels" className="btn btn--ghost">
              Conheça os Selos
              <span className="btn__arrow" aria-hidden="true">
                &#8594;
              </span>
            </Link>
          </div>
        </PitchReveal>
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
          <h2 className="p2-h2 p2-h2--md" style={{ maxWidth: '22ch', marginBottom: '3.5rem' }}>
            A ambição olha para a frente.
            <br />
            <span style={{ color: ACCENT }}>O ofício já está em movimento.</span>
            <En size="lead">The ambition is future-facing. The craft is already in motion.</En>
          </h2>
        </PitchReveal>

        <PitchReveal delay={200}>
          <div style={{ marginBottom: '3rem' }}>
            <p className="p2-stat">6+</p>
            <p className="p2-label">
              Anos em direção criativa
              <En>Years in creative direction</En>
            </p>
          </div>
        </PitchReveal>

        <div className="p2-context-grid">
          {EVIDENCE.map((item, i) => (
            <PitchReveal key={item.keyPt} delay={300 + i * 100}>
              <div style={{ borderTop: '2px solid rgba(255,255,255,0.15)', paddingTop: '1.25rem' }}>
                <p className="p2-item-title">
                  {item.keyPt}
                  <En>{item.keyEn}</En>
                </p>
                <p className="p2-item-desc" style={{ marginTop: '0.5rem' }}>
                  {item.descPt}
                  <En>{item.descEn}</En>
                </p>
              </div>
            </PitchReveal>
          ))}
        </div>

        <PitchReveal delay={650}>
          <p className="p2-footnote" style={{ marginTop: '2.5rem', maxWidth: '60ch' }}>
            Contexto selecionado: Soul Dila; moda brasileira; comunicação de hostel e hospitalidade;
            direção criativa em marcas de lifestyle.
            <En>
              Selected context: Soul Dila; Brazilian fashion; hostel and hospitality communication;
              creative direction across lifestyle brands.
            </En>
          </p>
        </PitchReveal>
      </section>

      {/* ── 10 · CASE SELECIONADO ───────────────────────────────────────────── */}
      <section id="mov-10" style={{ ...S }} aria-label="Case Selecionado / Selected Case">
        <Numeral n="10" />
        <Kicker n="10" pt="Case Selecionado" en="Selected Case" />

        <PitchReveal delay={100}>
          <h2 className="p2-h2" style={{ marginBottom: '0.5rem' }}>
            VERÃOZÃO
          </h2>
        </PitchReveal>

        <PitchReveal delay={150}>
          <p className="p2-case-client">Ô de Casa Hostel</p>
        </PitchReveal>

        <div className="p2-case-grid">
          {CASE_BLOCKS.map((block, i) => (
            <PitchReveal key={block.labelPt} delay={200 + i * 100}>
              <div style={{ borderTop: `2px solid ${ACCENT}`, paddingTop: '1.25rem', height: '100%' }}>
                <p className="p2-label">
                  {block.labelPt}
                  <En>{block.labelEn}</En>
                </p>
                <p className="p2-case-body" style={{ marginTop: '0.75rem' }}>
                  {block.bodyPt}
                  <En>{block.bodyEn}</En>
                </p>
              </div>
            </PitchReveal>
          ))}

          <PitchReveal delay={400}>
            <div style={{ borderTop: `2px solid ${ACCENT}`, paddingTop: '1.25rem', height: '100%' }}>
              <p className="p2-label">
                Execução
                <En>Execution</En>
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0' }}>
                {CASE_EXECUTION.map((line) => (
                  <li key={line.pt} className="p2-exec-item">
                    {line.pt}
                    <En>{line.en}</En>
                  </li>
                ))}
              </ul>
            </div>
          </PitchReveal>
        </div>

        <PitchReveal delay={550}>
          <p className="p2-body" style={{ marginTop: '3rem', maxWidth: '62ch' }}>
            O trabalho traduziu hospitalidade em um convite culturalmente legível: verão brasileiro,
            feito para ser sentido, não explicado.
            <En>
              The work translated hospitality into a culturally legible invitation: Brazilian summer,
              designed to be felt, not explained.
            </En>
          </p>
        </PitchReveal>
      </section>

      {/* ── 11 · POR QUE A OVERLENS ─────────────────────────────────────────── */}
      <section
        id="mov-11"
        style={{ ...S, background: '#111110' }}
        aria-label="Por Que a Overlens / Why Overlens"
      >
        <Numeral n="11" />
        <Kicker n="11" pt="Por Que a Overlens" en="Why Overlens" />

        <PitchReveal delay={100}>
          <h2 className="p2-h2" style={{ maxWidth: '16ch', marginBottom: '3.5rem' }}>
            Uma parceria para ir
            <br />
            <span style={{ color: ACCENT }}>além de entregáveis.</span>
            <En size="lead">A partnership to move beyond deliverables.</En>
          </h2>
        </PitchReveal>

        <div className="p2-partner-grid">
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
                <p className="p2-partner-name" style={{ color: side.color }}>
                  {side.who}
                </p>
                {side.lines.map((line) => (
                  <p key={line.pt} className="p2-partner-line">
                    {line.pt}
                    <En>{line.en}</En>
                  </p>
                ))}
              </div>
            </PitchReveal>
          ))}
        </div>

        <PitchReveal delay={500}>
          <p className="p2-assert p2-assert--lg" style={{ marginTop: '3rem', maxWidth: '30ch' }}>
            Juntas: serviços criativos podem virar ativos culturais.
            <En>Together: creative services can become cultural assets.</En>
          </p>
        </PitchReveal>
      </section>

      {/* ── 12 · VISÃO DE LONGO PRAZO ───────────────────────────────────────── */}
      <section id="mov-12" style={{ ...S }} aria-label="Visão de Longo Prazo / Long-term Vision">
        <Numeral n="12" />
        <Kicker n="12" pt="Visão de Longo Prazo" en="Long-term Vision" />

        <PitchReveal delay={100}>
          <h2 className="p2-h2 p2-h2--md" style={{ maxWidth: '20ch', marginBottom: '3.5rem' }}>
            De empresa criativa a instituição cultural.
            <En size="lead">From creative company to cultural institution.</En>
          </h2>
        </PitchReveal>

        <PitchReveal delay={200}>
          <div className="p2-chain">
            {VISION_STAGES.map((stage, i) => (
              <Fragment key={stage.pt}>
                <div className="p2-chain__node">
                  <span className="p2-chain__n">0{i + 1}</span>
                  <p
                    className="p2-chain__title"
                    style={{ color: i === VISION_STAGES.length - 1 ? ACCENT : PAPER }}
                  >
                    {stage.pt}
                  </p>
                  <En>{stage.en}</En>
                </div>
                {i < VISION_STAGES.length - 1 && (
                  <span className="p2-chain__arrow" aria-hidden="true">
                    &#8594;
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </PitchReveal>

        <PitchReveal delay={650}>
          <p className="p2-body p2-body--dim" style={{ marginTop: '3rem', maxWidth: '60ch' }}>
            Norte: instituições como a 032c, estudadas como modelo de relevância cultural, nunca
            copiadas como identidade.
            <En>
              North star: institutions such as 032c, studied as a model of cultural relevance, never
              copied as an identity.
            </En>
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
            <blockquote className="p2-h2 p2-quote">
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
              style={{ width: '100%', maxWidth: '700px', height: 'auto', display: 'block', marginBottom: '2.5rem' }}
            />
          </PitchReveal>

          <PitchReveal delay={450}>
            <p className="p2-eyebrow p2-eyebrow--accent">
              Uma conversa de trabalho com a Overlens
              <En>A working conversation with Overlens</En>
            </p>
          </PitchReveal>

          <PitchReveal delay={550}>
            <p className="p2-contact-site">thebrfactory.com</p>
            <p className="p2-contact-mail">tavaristico@thebrfactory.com</p>
          </PitchReveal>

          <PitchReveal delay={650}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/manifesto" className="btn btn--primary">
                Manifesto &#8594;
              </Link>
              <Link href="/labels" className="btn btn--secondary">
                Selos &#8594;
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
            <p className="p2-legal">
              .TBF. inc · CNPJ 61.360.565/0001-74 · Rua Pamplona 145, Jardim Paulista, São Paulo, SP,
              01405-900
            </p>
          </PitchReveal>
        </div>
      </section>

      {/* ── Design system do deck + layout responsivo (mobile-first) ─────────── */}
      <style>{`
        .p2-deck {
          background: #000000;
          color: ${PAPER};
          font-family: var(--tbf-font-family-display);
        }

        /* O nav e o letreiro são sticky e ficam pinados no topo. Sem esta
           margem, a seta joga o topo do movimento para debaixo dos dois e o
           kicker aparece cortado. Composto dos tokens de altura, não de número
           mágico, para acompanhar qualquer mudança no header. */
        .p2-deck > section {
          scroll-margin-top: calc(var(--tbf-nav-height-sm) + var(--tbf-ticker-height-sm));
        }
        @media (min-width: 1280px) {
          .p2-deck > section {
            scroll-margin-top: calc(var(--tbf-nav-height-xl) + var(--tbf-ticker-height-xl));
          }
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

        /* ─── CAMADA DE TRADUÇÃO (EN) ────────────────────────────────────────
           Família diferente do PT (Printed), Light Italic, discreta. É a regra
           única de toda a página: se está em Printed itálico, é tradução. */
        /* Tamanho e contraste subidos (pedido do fundador: o peso fino ficou
           certo, mas não dava para LER). O corpo saiu de 10-12px para 13-15px e
           a opacidade de 0,34 para 0,52. Continua secundária, agora legível. */
        .p2-en {
          display: block;
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-style: italic;
          font-size: clamp(0.8125rem, 2.4vw, 0.9375rem);
          line-height: 1.55;
          letter-spacing: 0.015em;
          color: rgba(240,237,230,0.52);
          margin-top: 0.6rem;
          text-transform: none;
        }
        .p2-en--lead {
          font-size: clamp(0.95rem, 2.8vw, 1.15rem);
          color: rgba(240,237,230,0.58);
          margin-top: 0.9rem;
        }

        /* ─── KICKER ─────────────────────────────────────────────────────── */
        .p2-kicker {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .p2-kicker__n {
          font-family: var(--tbf-font-family-printed);
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: ${ACCENT};
        }
        .p2-kicker__pt {
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${ACCENT};
        }
        .p2-kicker__en {
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-style: italic;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: rgba(255,101,0,0.7);
        }

        /* ─── NUMERAL MARCA-D'ÁGUA (Printed Thin) ────────────────────────── */
        .p2-numeral {
          position: absolute;
          top: clamp(2rem, 6vw, 4rem);
          right: clamp(0.5rem, 3vw, 3rem);
          z-index: 0;
          pointer-events: none;
          font-family: var(--tbf-font-family-printed);
          font-weight: 100;
          font-size: clamp(7rem, 26vw, 20rem);
          line-height: 0.8;
          letter-spacing: -0.04em;
          color: rgba(240,237,230,0.045);
        }

        /* ─── TIPOGRAFIA DO DECK ─────────────────────────────────────────── */
        .p2-h2 {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-display);
          font-size: clamp(2rem, 7vw, 4.5rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: ${PAPER};
        }
        .p2-h2--md {
          font-size: clamp(1.75rem, 6vw, 3.5rem);
        }
        .p2-quote {
          font-size: clamp(1.5rem, 5.5vw, 3.5rem);
          max-width: 18ch;
          margin: 0 auto 2.5rem;
        }

        .p2-body {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.875rem, 2.5vw, 1.125rem);
          line-height: 1.7;
          color: rgba(240,237,230,0.65);
        }
        .p2-body--dim { color: rgba(240,237,230,0.5); }

        .p2-eyebrow {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: clamp(0.625rem, 2vw, 0.75rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--tbf-text-tertiary);
          margin-bottom: 1.5rem;
        }
        .p2-eyebrow--accent {
          color: ${ACCENT};
          margin-bottom: 2.5rem;
        }

        .p2-label {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.5);
        }

        .p2-question {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-display);
          font-weight: 700;
          font-size: clamp(1rem, 3vw, 1.5rem);
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: ${PAPER};
        }

        .p2-context-word {
          font-family: var(--tbf-font-family-display);
          font-weight: 900;
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          line-height: 1;
          letter-spacing: -0.03em;
          color: ${PAPER};
          margin-top: 0.5rem;
        }

        .p2-assert {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-display);
          font-weight: 700;
          font-size: clamp(1rem, 3.5vw, 1.75rem);
          letter-spacing: -0.02em;
          color: ${ACCENT};
        }
        .p2-assert--lg {
          font-size: clamp(1.125rem, 4vw, 2rem);
        }

        .p2-item-title {
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(1rem, 3vw, 1.375rem);
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: ${PAPER};
        }
        .p2-item-desc {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.8rem, 2vw, 0.9rem);
          line-height: 1.6;
          color: rgba(240,237,230,0.5);
        }

        .p2-portfolio-name {
          font-family: var(--tbf-font-family-display);
          font-weight: 900;
          font-size: clamp(1rem, 3vw, 1.5rem);
          letter-spacing: -0.03em;
        }
        /* Deslize curto no hover: confirma que a linha é clicável sem sublinhado. */
        .p2-portfolio-row {
          transition: transform 400ms ${EASE}, background-color 400ms ${EASE};
        }
        a:hover > .p2-portfolio-row {
          transform: translateX(6px);
          background-color: #161613;
        }

        .p2-stat {
          font-family: var(--tbf-font-family-display);
          font-weight: 900;
          font-size: clamp(3rem, 12vw, 7rem);
          line-height: 1;
          letter-spacing: -0.05em;
          color: ${ACCENT};
        }

        .p2-case-client {
          font-family: var(--tbf-font-family-printed);
          font-weight: 500;
          font-size: clamp(0.75rem, 2vw, 0.95rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${ACCENT};
          margin-bottom: 3rem;
        }
        .p2-case-body {
          font-family: var(--tbf-font-family-display);
          font-weight: 700;
          font-size: clamp(1rem, 2.8vw, 1.25rem);
          line-height: 1.35;
          letter-spacing: -0.02em;
          color: ${PAPER};
        }
        .p2-exec-item {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.85rem, 2.2vw, 1rem);
          line-height: 1.6;
          color: rgba(240,237,230,0.65);
          margin-bottom: 0.9rem;
        }

        .p2-partner-name {
          font-family: var(--tbf-font-family-display);
          font-weight: 900;
          font-size: clamp(1.25rem, 4vw, 2rem);
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }
        .p2-partner-line {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.875rem, 2.2vw, 1rem);
          line-height: 1.6;
          color: rgba(240,237,230,0.6);
          margin-bottom: 1rem;
        }

        .p2-footnote {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.75rem, 2vw, 0.875rem);
          line-height: 1.7;
          color: rgba(240,237,230,0.4);
        }
        .p2-contact-site {
          font-family: var(--tbf-font-family-display);
          font-weight: 700;
          font-size: clamp(1rem, 3.5vw, 1.75rem);
          letter-spacing: -0.01em;
          color: ${PAPER};
          margin-bottom: 0.5rem;
        }
        .p2-contact-mail {
          font-family: var(--tbf-font-family-body);
          font-weight: 350;
          font-size: clamp(0.875rem, 2.5vw, 1rem);
          color: rgba(240,237,230,0.5);
          margin-bottom: 3rem;
        }
        .p2-legal {
          margin-top: 5rem;
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          line-height: 1.6;
          text-transform: uppercase;
          color: rgba(240,237,230,0.45);
        }
        .p2-refs-label {
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
        .p2-refs-label .p2-en { text-align: center; }

        /* ─── AS CINCO PERSONALIDADES DE REFERÊNCIA ──────────────────────────
           Mobile-first: duas colunas, que é o que cabe num retrato quadrado sem
           virar selo ilegível no 390px. A quinta fica sozinha na última linha e
           é isso mesmo: cinco é ímpar, e forçar simetria custaria cortar uma
           referência que o fundador escolheu. Em 768px+ as cinco entram na mesma
           linha e a leitura vira uma faixa só. */
        .p2-refs-people {
          margin-top: clamp(2rem, 5vw, 2.75rem);
          padding-inline: clamp(1.25rem, 5vw, 6rem);
        }

        .p2-refs-people__lead {
          max-width: 34ch;
          margin-top: clamp(1.75rem, 4vw, 2.25rem);
        }

        .p2-refs-people__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1rem, 3vw, 1.5rem);
        }

        /* O teto de 900px não é estética, é altura: sem ele, no 1440 cada
           retrato passa de 230px e o movimento fica 1,4× a tela, empurrando os
           nomes para fora do primeiro quadro. Com o teto, o movimento cabe e as
           cinco referências são lidas de uma vez. */
        @media (min-width: 768px) {
          .p2-refs-people__grid {
            grid-template-columns: repeat(5, 1fr);
            max-width: 900px;
          }
        }

        .p2-person {
          margin: 0;
        }

        .p2-person__img {
          width: 100%;
          height: auto;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          display: block;
          border-radius: var(--tbf-radius-card);
          /* O deck é preto e os retratos são de época, de temperaturas muito
             diferentes entre si. O dessaturado parcial costura as cinco fotos
             numa família só, sem apagar o rosto de ninguém. */
          filter: grayscale(1) contrast(1.05);
          transition: filter 600ms ${EASE};
        }

        .p2-person:hover .p2-person__img {
          filter: grayscale(0) contrast(1);
        }

        .p2-person__name {
          margin: 0.85rem 0 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          font-size: clamp(0.7rem, 2.2vw, 0.8rem);
          letter-spacing: 0.02em;
          line-height: 1.15;
          color: ${PAPER};
        }

        .p2-person__role {
          margin: 0.3rem 0 0;
          font-family: var(--tbf-font-family-display);
          font-weight: 350;
          font-size: clamp(0.68rem, 2vw, 0.75rem);
          line-height: 1.35;
          color: rgba(240,237,230,0.55);
        }

        @media (prefers-reduced-motion: reduce) {
          .p2-person__img { transition: none; }
        }

        /* ─── NAVEGAÇÃO POR SETAS ────────────────────────────────────────── */
        .p2-nav {
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
        .p2-nav__meta {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .p2-nav__count {
          font-family: var(--tbf-font-family-printed);
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: ${ACCENT};
        }
        .p2-nav__total {
          font-weight: 300;
          color: rgba(240,237,230,0.4);
        }
        .p2-nav__label {
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-style: italic;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          color: rgba(240,237,230,0.6);
          max-width: 13ch;
        }
        .p2-nav__buttons { display: flex; gap: 0.35rem; }
        .p2-nav__btn {
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
        .p2-nav__btn:hover:not(:disabled) {
          background: ${ACCENT};
          border-color: ${ACCENT};
          color: #000000;
        }
        .p2-nav__btn:active:not(:disabled) { transform: scale(0.94); }
        .p2-nav__btn:disabled { opacity: 0.25; cursor: default; }

        @media (max-width: 400px) {
          .p2-nav__label { display: none; }
        }

        /* ─── LAYOUT ─────────────────────────────────────────────────────── */
        .p2-cover-headline {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-display);
          font-size: clamp(2rem, 9vw, 5rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: ${PAPER};
          margin-bottom: 2rem;
        }
        .p2-cover-wordmark {
          width: 100%;
          max-width: 520px;
          height: auto;
          display: block;
          margin-bottom: 1.25rem;
        }

        .p2-question-list {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        /* Grid de 3 colunas: empilha no mobile */
        .p2-context-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(1.5rem, 4vw, 2.5rem);
        }

        /* Cadeia de etapas: vertical no mobile, horizontal no desktop */
        .p2-chain {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          align-items: start;
        }
        .p2-chain__node {
          display: flex;
          flex-direction: column;
        }
        .p2-chain__n {
          font-family: var(--tbf-font-family-printed);
          font-weight: 300;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          color: rgba(240,237,230,0.35);
        }
        .p2-chain__title {
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
        .p2-chain__arrow {
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

        .p2-os-grid,
        .p2-case-grid,
        .p2-partner-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(1rem, 3vw, 1.5rem);
        }

        @media (min-width: 768px) {
          .p2-context-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .p2-os-grid,
          .p2-partner-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .p2-case-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .p2-chain {
            grid-template-columns: repeat(7, auto);
            justify-content: start;
            align-items: start;
            gap: clamp(0.75rem, 2vw, 1.5rem);
          }
          .p2-chain__arrow {
            transform: none;
            margin: 2.25rem 0 0 0;
          }
        }

        @media (min-width: 1024px) {
          .p2-os-grid {
            grid-template-columns: repeat(4, 1fr);
          }
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
          .p2-portfolio-row, .p2-nav__btn { transition: none; }
        }
      `}</style>
    </div>
  )
}
