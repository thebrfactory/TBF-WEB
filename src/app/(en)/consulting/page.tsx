// =============================================================================
// /consulting — .TBF. CONSULTING
// Branding & Business Development. Página institucional construída no MESMO
// sistema das páginas de label (/labels/*): herói com o nome sobre o vídeo,
// ticker, blocos full-bleed com imagem de fundo e blocos de texto em layout-b.
//
// Conteúdo derivado do TBF BUSINESS OS 3.0 (SISTEMA 3.0), não inventado:
//   · direcao/tese-de-valor/tese-tbf-parceiro-que-entendeu-antes.md
//   · direcao/perfil-ideal-de-cliente/icp-tbf-larissa-viana.md
//   · validacao/oferta/oferta-tbf-projeto-estruturado.md
//   · direcao/tese-de-valor/tese-tgf-confianca-do-rogerio.md (business dev)
//
// O QUE FICOU DE FORA, DE PROPÓSITO: ticket, margem, LTV e metas de 12 meses.
// Estão nas mesmas fichas do OS, mas são números INTERNOS. A oferta do OS ainda
// diz, com todas as letras, "portfólio antes de qualquer proposta" — publicar
// preço aqui contraria a própria tese. Preço se combina na conversa.
// =============================================================================

import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { HeroVideo } from '@/components/HeroVideo/HeroVideo'
import { Ticker } from '@/components/Ticker/Ticker'

export const metadata: Metadata = {
  title: 'Consulting | Branding & Business Development | .THE BRAZILIAN FACTORY.',
  description:
    'Consultoria de branding e business development da .THE BRAZILIAN FACTORY. Infraestrutura criativa e estratégica para marcas e empresas em construção. Por projeto, sem agência e sem pacote.',
  openGraph: {
    title: '.TBF. CONSULTING | Branding & Business Development',
    description:
      'Infraestrutura criativa e estratégica para o projeto que você está construindo.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

// Domínios da consultoria: metade marca, metade negócio. É o par que dá nome
// à página, e a ordem reflete a sequência real de um projeto.
const DOMAINS = [
  'Brand Strategy',
  'Positioning',
  'Naming & Verbal Identity',
  'Visual Identity',
  'Brand Governance',
  'Business Development',
  'Go-to-Market',
  'Offer Design',
  'Revenue Systems',
  'Creative Direction',
]

// Os quatro movimentos de um projeto. Espelham a stack registrada na oferta
// "Projeto Estruturado" do OS: briefing aprofundado, conceito e direção,
// execução integrada, relatório de entrega.
const METHOD = [
  {
    n: '01',
    title: 'Diagnóstico',
    body:
      'Uma sessão longa de briefing, antes de qualquer proposta. É onde entendemos o que você está construindo de verdade, e não o que o mercado diria que você deveria construir.',
  },
  {
    n: '02',
    title: 'Direção',
    body:
      'Posicionamento, território de marca e a tese comercial que sustenta os dois. Sai daqui a decisão do que a marca é, para quem, e por que alguém pagaria por isso.',
  },
  {
    n: '03',
    title: 'Execução',
    body:
      'Identidade, narrativa, conteúdo e os sistemas de entrada de receita, executados de forma integrada. O ecossistema inteiro da casa entra aqui, incluindo a estrutura editorial do .RUC.',
  },
  {
    n: '04',
    title: 'Entrega',
    body:
      'Relatório de entrega e a governança escrita: as regras que fazem a marca continuar de pé depois que a gente sai. Marca que depende de memória humana não sobrevive à primeira contratação.',
  },
]

// Subtítulos de seção: medium, entre título e corpo (padrão das páginas de label)
const SUBTITLE: CSSProperties = {
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: '0.9rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ffffff',
  lineHeight: 1.3,
  marginBottom: 'var(--tbf-space-6)',
}

// Extrabold wrapper para nomes de marca dentro de texto
const B800: CSSProperties = { fontWeight: 800 }

// Marca dentro do lockup do herói — peso mais forte da Brother1816 (Black).
const B900: CSSProperties = { fontWeight: 900 }

// Largura de ".CONSULTING." em ems na Brother1816 ExtraBold com ls -0.04em,
// MEDIDA no browser (6.860) + 1% de folga contra arredondamento. É o divisor
// que faz o título preencher a linha do herói sem quebrar. Mudou o nome? Meça
// de novo, não estime.
const TITLE_FIT = '6.93'

const HERO_LOCKUP: CSSProperties = {
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: 'clamp(0.75rem, 3.2vw, 1rem)',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ffffff',
  lineHeight: 1.6,
  margin: '0 0 var(--tbf-space-6)',
}

const HERO_TAGLINE: CSSProperties = {
  fontFamily: 'var(--tbf-type-display-xl-family)',
  fontSize: '1.25rem',
  fontWeight: 300,
  letterSpacing: '-0.01em',
  color: 'rgba(255,255,255,0.6)',
  lineHeight: 1.3,
  margin: 0,
}

const BODY: CSSProperties = {
  fontFamily: 'var(--tbf-type-body-family)',
  fontSize: 'var(--tbf-type-body-size-sm)',
  lineHeight: 'var(--tbf-type-body-lh)',
  color: 'rgba(255,255,255,0.75)',
}

const DECK: CSSProperties = {
  fontFamily: 'var(--tbf-type-deck-family)',
  fontSize: 'var(--tbf-type-deck-size-sm)',
  fontWeight: 'var(--tbf-type-deck-weight)',
  lineHeight: 'var(--tbf-type-deck-lh)',
  color: 'rgba(255,255,255,0.7)',
}

const H2: CSSProperties = {
  fontFamily: 'var(--tbf-type-h2-family)',
  fontSize: 'var(--tbf-type-h2-size-sm)',
  fontWeight: 800,
  lineHeight: 'var(--tbf-type-h2-lh)',
  letterSpacing: 'var(--tbf-type-h2-ls)',
  color: '#ffffff',
  marginBottom: 'var(--tbf-space-6)',
}

const DISPLAY: CSSProperties = {
  fontFamily: 'var(--tbf-type-display-xl-family)',
  fontSize: 'var(--tbf-type-h1-size-sm)',
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: 'var(--tbf-type-display-xl-ls)',
  color: '#ffffff',
}

export default function ConsultingPage() {
  return (
    <div data-theme="inverse" style={{ background: '#000', color: '#fff' }}>

      {/* ─── HERO ────────────────────────────────────────────────────────── */}
      <section className="hero hero--label" aria-labelledby="consulting-h1" style={{ width: '100vw' }}>
        <div className="hero__overlay-grain" aria-hidden="true" />

        <HeroVideo />

        <div
          className="hero-label__content"
          style={{ '--tbf-label-title-fit': TITLE_FIT } as CSSProperties}
        >
          <h1 id="consulting-h1" className="hero-label__title">
            .CONSULTING.
          </h1>

          <p style={HERO_LOCKUP}>
            Branding &amp; Business Development
            <br />
            Practice
            <br />
            of <span style={B900}>.THE BRAZILIAN FACTORY.</span>
          </p>

          <p style={HERO_TAGLINE}>
            Seu problema não é talento.
            <br />
            É falta de estrutura.
          </p>
        </div>
      </section>

      {/* ─── TICKER ──────────────────────────────────────────────────────── */}
      <Ticker />

      {/* ─── INTRO ───────────────────────────────────────────────────────── */}
      <section className="section container">
        <p style={{ ...DECK, maxWidth: '48ch', marginBottom: 'var(--tbf-space-4)' }}>
          Infraestrutura criativa e estratégica para o projeto que você está
          construindo. Sem agência, sem pacote fechado, sem compromisso de
          longo prazo.
        </p>
        <p style={{ ...DECK, maxWidth: '48ch', marginBottom: 'var(--tbf-space-10)' }}>
          Uma prática de <span style={B800}>.THE BRAZILIAN FACTORY.</span>
        </p>

        <Link href="/contact-us" className="btn btn--primary">
          Start a conversation
          <span className="btn__arrow" aria-hidden="true">→</span>
        </Link>
      </section>

      {/* ─── OVERVIEW ────────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="consulting-overview">
        <div className="layout-b">
          <div>
            <p style={SUBTITLE}>Overview</p>
            <h2 id="consulting-overview" style={H2}>
              O que é <span style={B800}>.TBF. CONSULTING</span>?
            </h2>
          </div>

          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>
              É a camada de consultoria da <span style={B800}>.TBF.</span>: marca
              e negócio tratados como uma coisa só. Posicionamento que resolve
              como a empresa ganha dinheiro, e modelo de negócio que resolve
              como a marca é percebida.
            </p>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>
              Não somos uma agência, nem um freelancer, nem uma consultoria de
              slides. Trabalhamos por projeto, com escopo fechado e prazo
              declarado, dentro do mesmo ecossistema que produz{' '}
              <span style={B800}>.RUC.</span>, <span style={B800}>.MELFIORE.</span>{' '}
              e <span style={B800}>.TGF.</span>
            </p>
            <p style={BODY}>
              O cliente não compra horas. Compra um parceiro que entendeu o que
              está sendo construído antes de fazer proposta.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHY IT EXISTS — full-bleed ──────────────────────────────────── */}
      <section
        className="label-fullbleed"
        aria-labelledby="consulting-why"
        style={{
          position: 'relative',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/tgf/tgf-ambition.webp"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.45 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, #000000 0%, transparent 25%, transparent 70%, #000000 100%)',
            }}
          />
        </div>

        <div
          className="container"
          style={{ position: 'relative', zIndex: 3, paddingBlock: 'var(--tbf-space-20)' }}
        >
          <div className="layout-b" style={{ alignItems: 'start' }}>
            <div>
              <p style={SUBTITLE}>Why it exists</p>

              <h2 id="consulting-why" style={{ ...DISPLAY, marginBottom: 'var(--tbf-space-10)' }}>
                Não é falta de ideia.
              </h2>

              <p style={{ ...DECK, color: '#ffffff', marginBottom: 'var(--tbf-space-2)' }}>
                Marca boa sem estrutura vira gosto pessoal.
              </p>
              <p style={{ ...DECK, color: '#ffffff', marginBottom: 'var(--tbf-space-2)' }}>
                Negócio bom sem marca vira commodity.
              </p>
              <p style={{ ...DECK, color: '#ffffff', marginBottom: 'var(--tbf-space-10)' }}>
                Os dois separados viram retrabalho.
              </p>

              <p style={BODY}>
                A maior parte das empresas que procura a casa já tem repertório,
                produto e vontade. O que falta é a estrutura que transforma isso
                em algo repetível: uma tese escrita, uma marca governada e um
                caminho de receita que não depende de indicação.
              </p>
            </div>

            <div>
              <p style={SUBTITLE}>Philosophy</p>
              <p style={{ ...DISPLAY, lineHeight: 1.05, marginBottom: 'var(--tbf-space-8)' }}>
                Branding não é a camada de cima.
                <br />
                É a decisão de negócio mais cara que existe.
              </p>
              <p style={BODY}>
                Toda escolha de marca é uma escolha de margem, de público e de
                concorrente. Por isso as duas conversas acontecem na mesma sala,
                com as mesmas pessoas, no mesmo projeto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── METHOD ──────────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="consulting-method">
        <p style={SUBTITLE}>How it works</p>
        <h2 id="consulting-method" style={{ ...H2, marginBottom: 'var(--tbf-space-10)' }}>
          Quatro movimentos
        </h2>

        {/* Pilha de cartões arredondados. Sem divisores horizontais: proibidos
            no repo (ver frontend/CLAUDE.md). */}
        <ul
          role="list"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--tbf-space-4)',
          }}
        >
          {METHOD.map((step) => (
            <li
              key={step.n}
              style={{
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: '18px',
                padding: 'var(--tbf-space-6)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  letterSpacing: 'var(--tbf-type-micro-ls)',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--tbf-space-3)',
                }}
              >
                {step.n}
              </p>
              <h3 style={{ ...H2, marginBottom: 'var(--tbf-space-3)' }}>{step.title}</h3>
              <p style={{ ...BODY, maxWidth: '60ch' }}>{step.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── DOMAINS ─────────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="consulting-domains">
        <p style={SUBTITLE}>Areas of practice</p>
        <h2 id="consulting-domains" style={{ ...H2, marginBottom: 'var(--tbf-space-10)' }}>
          Core Domains
        </h2>

        <ul
          role="list"
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--tbf-space-3)',
          }}
        >
          {DOMAINS.map((domain) => (
            <li key={domain}>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  letterSpacing: 'var(--tbf-type-micro-ls)',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '999px',
                  paddingBlock: 'var(--tbf-space-2)',
                  paddingInline: 'var(--tbf-space-4)',
                }}
              >
                {domain}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── COMMITMENT ──────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="consulting-commitment">
        <p style={SUBTITLE}>What we commit to</p>
        <h2 id="consulting-commitment" style={{ ...H2, marginBottom: 'var(--tbf-space-8)' }}>
          Nível ou retrabalho
        </h2>

        <div className="layout-b">
          <p style={BODY}>
            Todo projeto tem escopo escrito e prazo declarado. Se a entrega não
            chegar ao nível do conceito aprovado, ela volta para a mesa sem custo
            adicional, até chegar. Essa é a garantia, e ela está no contrato.
          </p>
          <p style={BODY}>
            Aceitamos poucos projetos por trimestre, de propósito: a casa entrega
            com a própria equipe e não terceiriza direção. Sem retainer no
            primeiro engajamento, porque a primeira entrega é que constrói a
            relação, não o contrato.
          </p>
        </div>
      </section>

      {/* ─── CLOSING BLOCK — full-bleed ──────────────────────────────────── */}
      <section
        className="label-fullbleed"
        aria-labelledby="consulting-closing"
        style={{
          position: 'relative',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/img-04.webp"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.5 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, #000000 0%, transparent 30%, transparent 65%, #000000 100%)',
            }}
          />
        </div>

        <div
          className="container"
          style={{ position: 'relative', zIndex: 3, paddingBlock: 'var(--tbf-space-20)' }}
        >
          <div style={{ maxWidth: '50ch' }}>
            <p id="consulting-closing" style={{ ...DISPLAY, marginBottom: 'var(--tbf-space-10)' }}>
              Marca cria relevância.
              <br />
              Negócio cria escala.
              <br />
              Estrutura mantém as duas de pé.
            </p>

            <p
              style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                marginBottom: 'var(--tbf-space-8)',
              }}
            >
              Crafted in São Paulo, Brazil. Consumed Worldwide.
              <br />
              Part of <span style={B800}>.THE BRAZILIAN FACTORY.</span>
            </p>

            <Link href="/contact-us" className="btn btn--primary">
              Start a conversation
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
