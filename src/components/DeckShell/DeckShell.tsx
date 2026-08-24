'use client'

// =============================================================================
// DECK SHELL · o casco compartilhado do formato "uma cena, uma tela"
// -----------------------------------------------------------------------------
// NASCEU DE UMA EXTRAÇÃO, não de um projeto novo (2026-08-18). Todo o conteúdo
// deste arquivo vinha de `app/(en)/pitch/v3/PitchV3Client.tsx`, onde foi
// desenhado e brigado cena a cena. Ele saiu de lá no dia em que uma SEGUNDA peça
// precisou do mesmo formato: a proposta endereçada ao Hostel Castelo, em
// `/proposta/castelo`. O fundador foi explícito: o pitch é o exemplo de layout,
// não o conteúdo. Copiar 1.500 linhas de CSS para a peça nova significaria que o
// próximo ajuste de régua chegaria só numa das duas (regra 4 do ecossistema:
// apontar, não copiar).
//
// O QUE MORA AQUI: o design system do formato. Constantes de cor e de curva, a
// camada de tradução PT/EN, a animação de entrada, a régua de conferência
// (`?grid=1`), o passador de cenas, o kicker ancorado, o numeral marca-d'água,
// a geometria de UMA CENA = UMA TELA e o bloco de CSS inteiro (prefixo `p3-`,
// preservado de propósito: renomear classe não é refatoração, é risco de
// regressão silenciosa num deck que já foi apresentado).
//
// O QUE NÃO MORA AQUI: cena nenhuma. Quem compõe cenas é cada peça, com o seu
// próprio conteúdo. Se um dia uma peça precisar de um ajuste que a outra não
// quer, ele NÃO entra aqui: entra na peça, como estilo local.
//
// O PASSADOR passou a receber as cenas por fora (`scenes` e `total`), que é a
// única diferença de comportamento em relação ao original: o deck do pitch tem
// 7 cenas mais a capa 00, e a proposta tem outra contagem.
// =============================================================================

import { useCallback, useEffect, useRef, useState } from 'react'

/** Uma cena do passador: id da `<section>`, rótulo bilíngue e numeral. */
export interface DeckScene {
  id: string
  pt: string
  en: string
  n: string
}

import type { PartnerScene } from '@/content/pitch/v3-scenes'

export const ACCENT = '#FF6500'
export const PAPER = '#F0EDE6'

// Curva canônica do design system. Substitui o `ease` genérico que a 2.0 usava:
// desaceleração longa, sem freada seca. É daqui que vem a fluidez.
export const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'

const EDITORIAL_VIDEO = {
  desktop: { av1: '/videos/editorial-desktop.av1.mp4', h264: '/videos/editorial-desktop.mp4' },
  mobile: { av1: '/videos/editorial-mobile.av1.mp4', h264: '/videos/editorial-mobile.mp4' },
}

// ─── Camada de tradução ──────────────────────────────────────────────────────
// Um único componente para TODO inglês do deck. Trocar a régua da tradução vira
// uma edição só, em vez de dezenas de estilos inline espalhados.
export function En({ children, size = 'sm' }: { children: React.ReactNode; size?: 'sm' | 'lead' }) {
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
export function PitchReveal({
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
export function GridRuler() {
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
export function DeckNav({ scenes, total }: { scenes: readonly DeckScene[]; total: string }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    // Faixa fina no meio da tela: a cena que cruzar o centro é a ativa.
    // Threshold puro falharia nas seções mais altas que a viewport no mobile.
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const i = scenes.findIndex((s) => s.id === e.target.id)
          if (i >= 0) setActive(i)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    scenes.forEach((s) => {
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
    const target = scenes[Math.max(0, Math.min(scenes.length - 1, index))]
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

  const current = scenes[active]
  const atStart = active === 0
  const atEnd = active === scenes.length - 1

  return (
    <div className="p3-nav" role="group" aria-label="Navegação do deck">
      <div className="p3-nav__meta" aria-live="polite">
        <span className="p3-nav__count">
          {current.n}
          {/* O total vem de fora: no pitch a capa e pagina 00 e nao entra na
              conta das 7 cenas do argumento, e cada peca decide a sua. */}
          <span className="p3-nav__total"> / {total}</span>
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
export function Kicker({ n, pt, en }: { n: string; pt: string; en: string }) {
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
export function Numeral({ n }: { n: string }) {
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
export const S: React.CSSProperties = {
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

// ─── O CSS do formato ────────────────────────────────────────────────────────
// Bloco preservado byte a byte do deck 3.0. Prefixo `p3-`/`--p3-` mantido: as
// duas peças usam o mesmo vocabulário de classes de propósito.
export function DeckStyles() {
  return (
    <>
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
          /* AUMENTADO (pedido do fundador): o título nascia colado no kicker.
             Era clamp(1.35rem, 3.4vh, 2.1rem). O termo cresceu numa variável
             só, então as 7 cenas ganham a mesma distância de uma vez. */
          --p3-kicker-reserve: calc(var(--p3-kicker-top) + clamp(3.4rem, 9.2vh, 4.6rem));

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
          /* AUMENTADO (pedido do fundador): margem de segurança para o
             conteúdo não chegar tão perto do rodapé/passador. Era 3.75rem;
             a barra de nav mede 58px no telefone, então a folga extra dá
             respiro real antes do botão. */
          --p3-foot: 4.5rem;
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
            /* Mesmo motivo do mobile: era 4.25rem. */
            --p3-foot: 5rem;
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
        /* A capa fecha a assinatura; o fecho (cena 07) usa '.p3-culture' puro e
           mantém o respiro que sempre teve. */
        .p3-culture--cover {
          margin-bottom: var(--p3-gap-sm);
        }

        /* A LINHA DE ORIGEM PASSA A SER A MESMA COISA QUE Culture™ (#01, #01
           CHANGES 2026-08-14: "mantenha a mesma formatação que Culture™ e
           diminua 10% o tamanho da fonte"). Ela era mais leve (peso 300) e mais
           apagada (papel a 55%), o que a lia como legenda de rodapé.
           Era peso 300, cor rgba(240,237,230,0.55), clamp(0.7rem, 2vw, 0.85rem).

           Agora é um TRECHO INLINE da mesma frase (resposta dele, 2026-08-14:
           "sem quebra de texto"), então herda família, peso, itálico e cor do
           parágrafo e só declara o que a diferencia: os 10% de corpo. Um
           '0.9em' em vez de um clamp próprio é o que garante que a proporção se
           mantenha igual nos três degraus do clamp do pai, do telefone ao
           desktop. */
        .p3-craft-line {
          font-size: 0.9em;
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

        /* ─── AS DUAS PERGUNTAS EM QUADRO (cena 03, tempo 1) ─────────────────
           Mobile-first: empilhadas no telefone, lado a lado a partir de 768px
           (ver o media query mais abaixo). grid-auto-rows: 1fr + altura cheia
           no wrapper do reveal para os dois quadros terem a MESMA altura mesmo
           com perguntas de comprimentos diferentes — sem isso o quadro da
           pergunta curta fica baixo e o par perde o alinhamento. */
        .p3-question-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          grid-auto-rows: 1fr;
          gap: clamp(0.5rem, 1.6vh, 1rem);
          margin-top: var(--p3-gap-sm);
          max-width: var(--p3-measure-wide);
        }
        .p3-question-grid > * { height: 100%; }

        .p3-question-box {
          height: 100%;
          background: #0a0a09;
          padding: clamp(0.7rem, 1.6vh, 1.05rem);
          border-top: 2px solid ${ACCENT};
          border-radius: var(--tbf-radius-card);
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
          /* A quebra por palavra do #04 chega como \\n no texto; é este
             'pre-line' que a desenha. Ver a nota no JSX do cartão. */
          white-space: pre-line;
          line-height: 1.04;
        }
        /* O nome do painel expandido continua em linha corrida: lá o espaço
           vertical é do conteúdo que a expansão veio mostrar, e três linhas de
           título comeriam a explicação. */
        .p3-portfolio-name--more {
          margin-bottom: 0.4rem;
          white-space: normal;
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

        /* A MARCA DO CLIENTE (#05). A altura é a da linha de texto que ela
           substituiu, com folga para a assinatura manuscrita "de casa" que fica
           embaixo da palavra HÔSTEL: a peça é larga (quase 3:1), então quem
           manda é a altura e a largura sai dela. Termo em vh porque o deck
           inteiro encolhe com a altura da janela. */
        .p3-case-client-logo {
          width: auto;
          max-width: min(100%, 18rem);
          height: clamp(1.9rem, 5.4vh, 3.2rem);
          object-fit: contain;
          object-position: left center;
          display: block;
          margin-bottom: var(--p3-gap-sm);
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
        /* A COMPOSIÇÃO DA CENA 05, em grade de duas colunas e duas linhas:

             [ quadro ] [ texto do case        ]
             [ fila de miniaturas, largura inteira ]

           LADO A LADO JÁ NO TELEFONE (2026-08-14). Empilhado, o story e a copy
           somavam altura um em cima do outro, e era isso que impedia o quadro de
           crescer: 73px de estouro medido no iPhone 13. Em linha, os dois
           dividem a LARGURA, que é o que sobra numa tela de telefone.

           A FILA NA LARGURA INTEIRA, e não embaixo do quadro: o quadro tem 9/16,
           ou seja é estreito, e uma fila de doze miniaturas presa a 207px de
           largura viraria um túnel de rolagem. display: contents no invólucro
           do StoryDeck (.p3-deck-flat) dissolve a pilha padrão dele e entrega
           quadro e fila como filhos diretos desta grade.

           É a estrutura da referência que o fundador mandou: quadro à esquerda,
           texto à direita, miniaturas atravessando por baixo. */
        .p3-case-layout {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          /* Duas linhas: a de cima estica, a de baixo é do tamanho da fila. É
             isso que faz o story crescer até onde a cena permite em vez de parar
             na altura do texto. */
          grid-template-rows: 1fr auto;
          align-items: start;
          column-gap: var(--p3-gap);
          row-gap: var(--p3-gap-sm);
          /* A composição toma a altura que sobra na cena. Sem isto a grade
             mede-se pelo conteúdo e o story fica pequeno com a tela vazia
             embaixo, que foi o que o fundador viu. min-height: 0 é
             obrigatório: item de flex não encolhe abaixo do conteúdo sem ele, e
             aí o 1fr só cresce e a cena estoura. */
          flex: 1 1 auto;
          min-height: 0;
        }

        .p3-deck-flat { display: contents; }

        /* POSIÇÃO EXPLÍCITA nos três, e não é preciosismo. Com display:
           contents a ordem no DOM vira quadro, fila, texto — nessa ordem. Na
           colocação automática, a fila (que atravessa as duas colunas) empurra o
           texto para uma TERCEIRA linha, e as colunas colapsam: medido,
           1278px na primeira e 0px na segunda. Dizendo onde cada um mora, a
           grade fica do jeito que a referência pede. */
        /* O STORY ATRAVESSA AS DUAS LINHAS (pedido do fundador 2026-08-14: "o
           story expandido também para baixo no lugar das miniaturas"). Ele
           ocupa a coluna da esquerda inteira, do topo da composição até a base,
           e as miniaturas se mudaram para debaixo do texto, na coluna da
           direita. */
        /* 🔴 9/16 TRAVADO, SEM RECORTE (pedido do fundador 2026-08-14: "preciso
           que tenha o formato padrão story sem foto cortada").

           O que estava errado: o quadro esticava até a altura da linha
           (height: 100%) enquanto a LARGURA continuava saindo de --story-h. As
           duas medidas deixavam de conversar, o quadro virava mais alto que
           9/16, e o object-fit: cover da foto passava a recortar para preencher.
           As peças são 1080x1920 nativas, ou seja JÁ SÃO 9/16: não havia nada a
           recortar, o recorte era só do quadro deformado.

           A correção é declarar a proporção e deixar a LARGURA sair dela:
           aspect-ratio + height 100% + width auto. A altura da linha da grade é
           definida, então o navegador resolve a largura sozinho, e o quadro fica
           exatamente 9/16 em qualquer altura de janela. --story-h deixa de
           mandar na largura e passa a ser só o teto. */
        .p3-story {
          grid-column: 1;
          grid-row: 1 / -1;
          align-self: stretch;
          height: 100%;
          width: auto;
          aspect-ratio: 9 / 16;
          /* 🔴 O TETO DO TELEFONE, e ele não é decoração. O quadro é 9/16: cada
             pixel de altura vira 0,56 de largura, e num telefone a largura é o
             recurso escasso. Sem teto, o story tomava a linha inteira da grade
             (844px de altura viram 475 de largura numa tela de 390) e empurrava
             a copy e a esteira para fora da cena, que tem overflow: hidden e come
             o que sai sem avisar. Medido em 390x844 antes de existir este teto.
             No desktop o teto sai (ver o media query de 1024px): lá sobra
             largura e o quadro ocupa a altura inteira da cena, que é onde o deck
             é apresentado. */
          max-height: min(100%, 52vh, 26rem);
          /* 🔴 É DAQUI QUE VINHA O STORY CORTADO NO MEIO (#05, #01 CHANGES
             2026-08-14), e a causa não era o recorte da foto: era o QUADRO.

             O player já ganhava a altura da linha da grade (667px medidos em
             1440x900), mas o quadro por dentro continuava com a altura fixa que
             o componente traz de fábrica, 'height: var(--story-h)' — 512px. A
             peça, que é 9/16 da altura do player, entrava com 668px de altura
             dentro de uma caixa de 512 com 'overflow: hidden': os últimos 156px
             da imagem eram simplesmente decepados, sempre no mesmo lugar, mais
             ou menos no meio do slide. Era isso que ele estava vendo.

             A régua velha existia porque '--story-h' mandava nos dois ao mesmo
             tempo (largura do player E altura do quadro). Aqui o player mede a
             própria altura pela grade, então a variável passa a valer 100% e o
             quadro cresce junto com ele. A tentativa anterior de corrigir isso
             mirava '> div:first-of-type', que no DOM do player é a barra do
             cronômetro, não o quadro — e por isso não consertava nada. */
          --story-h: 100%;
        }
        .p3-case-copy {
          grid-column: 2;
          grid-row: 1;
          align-self: start;
        }
        .p3-thumbs {
          grid-column: 2;
          grid-row: 2;
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
        /* O CSS do player e da esteira mora em StoryPlayer.module.css. O que
           fica aqui é só a MEDIDA que esta cena entrega aos dois: a altura
           disponível é do deck, não do componente.

           A ALTURA SUBIU (pedido do fundador 2026-08-14: "preciso que tenha esse
           tamanho"). O story estava em 33vh, que foi o teto medido quando a cena
           ainda carregava um título de texto em display grande e uma faixa de
           miniaturas 4/5. Com a identidade da campanha no lugar do título e a
           faixa em 9/16, sobrou altura para o quadro crescer. O número é medido,
           não escolhido: é o maior valor em que as sete cenas continuam cabendo
           em uma tela nos dois viewports de aceite. */
        /* O TAMANHO DO STORY É MEDIDO, NÃO ESCOLHIDO, e a régua é a regra dura
           do deck: uma cena, uma tela. Este valor é o maior em que a cena 05
           ainda fecha no iPhone 13 com o título, o cliente, a copy, a esteira e
           o crédito juntos. No desktop sobra altura e ele cresce (ver o media
           query de 1024px), que é onde o deck é apresentado de verdade. */
        /* O TETO SUBIU porque o título saiu de cima da cena: a faixa que o
           logotipo ocupava virou altura de quadro. O valor continua sendo o
           maior em que a cena 05 fecha em uma tela, medido nos dois viewports
           de aceite. */
        /* 🔴 OS TETOS EM vh/rem SAÍRAM DAQUI (#05, 2026-08-14). Eram
           'min(52vh, 26rem)' aqui e 'min(58vh, 32rem)' no media query de 1024px,
           e é essa dupla que decepava o quadro: quem manda na altura do story é
           a LINHA DA GRADE da cena, não um número escolhido à parte, e os dois
           discordavam. '--story-h' agora vale 100% e mora junto com a proporção
           lá em cima, num lugar só. */

        /* A FILA DE MINIATURAS. Ela mora dentro do StoryDeck, colada embaixo do
           quadro, e por isso a largura dela é limitada pela do quadro no
           telefone: rola de lado. No desktop a cena tem largura sobrando e a
           fila ganha a linha inteira (ver o media query de 1024px).
           A miniatura é 9/16 como o quadro, então a largura em rem já define a
           altura: 3.4rem de largura dá 96px de altura. */
        .p3-thumbs {
          --thumb-w: clamp(2.4rem, 5vh, 3.4rem);
        }

        /* A IDENTIDADE DA CAMPANHA no lugar do título de texto. O h2 perde a
           tipografia porque o que ele carrega agora é uma imagem: sem isto, a
           altura de linha da display continuaria reservando espaço vazio embaixo
           do logotipo. O teto é de ALTURA, com termo em vh, como tudo no deck. */
        .p3-case-title {
          font-size: 0;
          line-height: 0;
        }
        /* O ARQUIVO AMARELO TEM BRILHO, e o brilho conta como altura. A peça
           oficial (stickers-fevereiro/01-FINAL-VERÃOZÃO.png) traz o halo em
           volta da letra, então a caixa mede 900x591 enquanto a palavra ocupa
           pouco mais da metade disso. Com o teto antigo, a letra sairia ~45%
           menor do que era na versão ciano sem halo. O teto sobe na mesma
           proporção para o TAMANHO DA PALAVRA ficar igual. */
        .p3-case-wordmark {
          width: auto;
          max-width: 100%;
          height: clamp(5.1rem, 19.2vh, 10.4rem);
          max-width: 100%;
          object-fit: contain;
          object-position: left center;
          display: block;
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
        /* O trilho no centro do que sobra (#02). Ver a nota no JSX da cena 02. */
        .p3-refs-rail {
          margin-block: auto;
          width: 100%;
        }

        /* O respiro de cima saiu: com o trilho centrado por 'margin-block: auto',
           um recuo fixo aqui roubaria do centro e a cena voltaria a pender para
           cima. O ar entre o carrossel e a ponte agora é o espaço livre da cena,
           repartido pelo próprio flex. */
        .p3-refs-people {
          padding-inline: clamp(1.25rem, 5vw, 6rem);
        }

        .p3-refs-people__lead {
          max-width: 34ch;
          margin-top: var(--p3-gap);
        }

        /* A PONTE (cena 02). Três colunas: retrato, linha elástica, retrato. A
           coluna do meio é 1fr e as das pontas são auto, então a linha come
           toda a largura que sobrar — é ela que empurra os dois para as
           extremidades, sem justify-content: space-between e sem largura
           chutada. align-items: center alinha a linha com o CENTRO do círculo,
           não com o nome, que é onde o olho espera a ponte. */
        .p3-refs-bridge {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: clamp(0.5rem, 2vw, 1.5rem);
          width: 100%;
        }

        /* A LINHA DE PONTOS. Mesma construção do underline de HOME no menu
           (.nav__link::after em components.css): border-bottom pontilhado em
           2px. Aqui ela cresce do CENTRO para os dois lados quando o bloco
           revela, que é o gesto de uma ponte sendo lançada — daí o
           transform-origin: center.

           A escala vem do PitchReveal, que troca o transform do wrapper: por
           isso o scaleX mora no wrapper e não aqui. O que este seletor faz é só
           desenhar os pontos e ocupar a coluna inteira. */
        /* PONTOS MAIS ESPAÇADOS (pedido do fundador 2026-08-14: "deixe mais
           espaçado essa linha de pontos"). O border-bottom: dotted do CSS NÃO
           tem folga configurável: o navegador escolhe o intervalo a partir da
           espessura, e com 2px ele desenha uma linha quase contínua. Por isso a
           ponte deixa de ser borda e passa a ser um degradê repetido, que é a
           única construção em que ponto e vão são dois números que eu escolho.

           A conta: 3px de ponto, 10px de passo, ou seja 7px de ar entre um e
           outro. background-repeat: repeat-x com altura de 3px mantém a linha
           fina; background-position: center a alinha com o centro do círculo,
           como antes. */
        .p3-refs-bridge__line {
          display: block;
          width: 100%;
          height: 3px;
          background-image: radial-gradient(
            circle,
            rgba(240, 237, 230, 0.5) 1.5px,
            transparent 1.6px
          );
          background-size: 10px 3px;
          background-repeat: repeat-x;
          background-position: center;
        }

        /* LARGURA EXPLÍCITA, e ela não é preciosismo. Antes o retrato vivia numa
           coluna 1fr de uma grade de cinco, então a figura tinha largura vinda
           de fora e o width: 100% da imagem sabia de quanto era 100%. Nas
           colunas auto da ponte não há essa largura: figura de conteúdo dentro
           de imagem de largura 100% da figura é uma referência circular, e o
           retrato colapsa. Termo em vh junto do vw porque o deck inteiro encolhe
           com a altura da janela, não só com a largura. */
        /* 25% MENOR (#02, #01 CHANGES 2026-08-14). Os três termos do clamp e o
           corpo do nome caíram na mesma proporção, então a ponte inteira encolhe
           junto: retrato menor com nome do tamanho antigo viraria legenda maior
           que a figura. Era clamp(4.5rem, min(22vw, 16vh), 9rem). */
        .p3-person {
          margin: 0;
          width: clamp(3.375rem, min(16.5vw, 12vh), 6.75rem);
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
          margin: 0.55rem 0 0;
          min-height: 2.3em;
          font-family: var(--tbf-font-family-display);
          font-weight: 800;
          /* O nome acompanha o retrato, mas NÃO nos mesmos 25% (#02). O corpo
             mínimo já era 9px; a 25% ele viraria 6,7px, que não é tipografia
             pequena, é texto ilegível — e o nome é a única informação escrita da
             ponte. Desce 10%, que é o quanto dá para descer sem perder a leitura.
             Era clamp(0.56rem, 1.7vw, 0.78rem). */
          font-size: clamp(0.5rem, 1.53vw, 0.7rem);
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
        /* O TÍTULO DA CAPA E O CARIMBO ATRÁS DELE (#01, #01 CHANGES 2026-08-14).
           O invólucro existe só para dar origem ao selo: sem um pai posicionado,
           'position: absolute' do carimbo subiria até a seção e ele deixaria de
           acompanhar o título quando a headline mudar de altura. */
        .p3-cover-title {
          position: relative;
        }
        /* O carimbo. Fica ATRÁS (z-index 0 contra o 1 da headline), com a tinta
           fraca: o pedido foi "um tom levemente transparente cobrindo parte do
           fundo do título", ou seja ele cobre PARTE, não a caixa inteira, e não
           disputa leitura com o texto. A rotação vem desenhada na arte.
           'pointer-events: none' porque carimbo não é alvo de clique. */
        .p3-cover-stamp {
          position: absolute;
          z-index: 0;
          left: 4%;
          top: 50%;
          transform: translateY(-54%);
          width: min(62%, 40rem);
          height: auto;
          opacity: 0.2;
          pointer-events: none;
          user-select: none;
        }
        /* TAMANHO REDUZIDO EM 20% (#01, #01 CHANGES 2026-08-14). Os três termos
           do clamp caíram na mesma proporção, então a curva de resposta da
           headline não muda: ela só passa inteira uma oitava abaixo.
           Era clamp(2rem, min(8.4vw, 8vh), 4.6rem). */
        .p3-cover-headline {
          position: relative;
          z-index: 1;
          font-family: var(--tbf-font-family-display);
          font-size: clamp(1.6rem, min(6.72vw, 6.4vh), 3.68rem);
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

        /* Ver a nota no JSX da cena 04. min-height: 0 é obrigatório: sem ele
           um item de flex não encolhe abaixo do próprio conteúdo e o flex: 1
           só cresce, nunca cede — que é como uma cena de altura fixa estoura. */
        .p3-portfolio-grid--grow {
          flex: 1 1 auto;
          /* Teto: sem ele os quatro cartoes esticam ate o rodape da cena e
             viram quatro caixas altas com o texto encolhido no topo. Com o
             teto eles crescem o suficiente para o buraco sumir e o resto vira
             respiro, que e o que respiro deve ser. */
          max-height: min(46vh, 26rem);
          min-height: 0;
        }

        @media (min-width: 768px) {
          .p3-os-grid,
          .p3-partner-grid,
          .p3-portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          /* As duas perguntas lado a lado assim que houver largura. */
          .p3-question-grid {
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
            column-gap: var(--p3-gap);
            row-gap: var(--p3-gap-sm);
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
          /* No desktop a fila sai de baixo do quadro e ocupa a largura da cena:
             o StoryDeck é uma coluna, mas a cena 05 é uma linha, então a fila
             recebe a largura cheia por posicionamento (ver .p3-case-layout). */
          .p3-thumbs {
            --thumb-w: clamp(3rem, 6.5vh, 4.5rem);
          }
          /* No desktop o quadro toma a altura inteira da cena: aqui sobra
             largura, então o teto que protege o telefone sai do caminho (#05,
             2026-08-14). Ver a nota do teto em '.p3-story'. */
          .p3-story {
            max-height: 100%;
          }
          /* Imprensa em duas colunas: o bloco tinha a altura de tres paragrafos
             empilhados numa tela que nao tem essa altura para dar. */
          .p3-press {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0.2rem 1.25rem;
            align-items: baseline;
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
          /* Os quadros das perguntas (novos em 2026-08-14) custavam 100px de
             estouro na cena 03 no telefone — medido, e num deck com
             overflow: hidden estouro come conteúdo em silêncio. O quadro
             continua existindo (é o pedido), só com o respiro do telefone. */
          .p3-question-box { padding: 0.45rem 0.5rem; }
          /* LADO A LADO JÁ NO TELEFONE, e é medida, não gosto. Empilhadas, as
             duas caixas pagam DOIS respiros internos e dois topos de borda, e a
             cena 03 passava 79px da tela — com o bloco de contexto ("o Brasil já
             produz repertório...") esmagado a ZERO pelo flex, ou seja, sumido.
             Em duas colunas a pergunta quebra em mais linhas, mas paga um
             respiro só, e a cena volta a caber inteira. */
          .p3-question-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.32rem;
          }
          .p3-question { font-size: 0.78rem; line-height: 1.22; }
          .p3-context-line { font-size: 0.8rem; }
          .p3-thesis-line { font-size: 1.14rem; margin-bottom: 0.2rem; }
          .p3-goal__line { font-size: 1.14rem; }
          .p3-case-body { font-size: 0.72rem; line-height: 1.2; }
          .p3-case-client { font-size: 0.7rem; margin-bottom: var(--p3-gap-sm); }
          .p3-label { font-size: 0.62rem; }
          .p3-stat { line-height: 0.9; }
          /* Cena 06: 31px de estouro medido no iPhone 13, e o que ficava de
             fora era o fim do bloco de hipoteses. A grade de parceria e o bloco
             mais alto da cena (328px medidos): o corte sai do respiro entre as
             linhas dela, nao do tamanho da letra. */
          .p3-partner-line { font-size: 0.71rem; margin-bottom: 0.1rem; }
          .p3-partner-name { margin-bottom: 0.25rem; }
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
          .p3-chain__title { font-size: 0.78rem; margin-top: 0.1rem; }

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
          .p3-thumbs {
            --thumb-w: clamp(3.25rem, 13vw, 4.5rem);
          }

          /* CENA 05 NO TELEFONE, EMPILHADA (bug relatado: logotipo da
             campanha, marca do cliente e copy caindo POR CIMA do quadro de
             story). A causa era a grade de 2 colunas: a coluna "auto" do
             quadro tem a largura calculada a partir da ALTURA (aspect-ratio
             9/16), e essa altura só se resolve depois que a grade já mediu a
             coluna, um ciclo que o Safari do iPhone resolve mal. Empilhar em
             flex column tira a dependência circular: cada bloco mede a
             própria altura e a soma é o que decide se cabe, sem grade
             nenhuma no meio.

             ORDEM (por 'order', não pelo DOM): quadro, depois a identidade da
             campanha + copy, depois a fila de miniaturas por último, perto do
             passador do deck. O quadro de story continua 9/16 sem recorte
             ('.p3-story' mantém aspect-ratio); só o teto de altura encolhe
             para sobrar altura para o resto. */
          .p3-case-layout {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--p3-gap-sm);
          }
          .p3-story {
            order: 1;
            grid-column: auto;
            grid-row: auto;
            align-self: center;
            /* Era min(100%, 52vh, 26rem): esse teto presumia o quadro sozinho
               numa coluna, dividindo a LARGURA com o texto. Empilhado, ele
               agora divide a ALTURA com o wordmark, a marca do cliente, a
               copy e a fila. Medido em 390x844 até fechar sem corte. */
            /* Altura EXPLÍCITA, não só um teto: empilhado, o pai (a coluna
               flex) não tem altura própria, então 'height: 100%' (regra
               base) colapsaria a 0 e junto com ele a largura, que sai da
               proporção 9/16 sobre a altura. */
            /* 🔴 O VALOR SAIU DE MEDICAO, e a primeira medida estava apertada
               demais: com 30vh sobravam 237px de vazio na cena (165 dentro da
               copy, que crescia sozinha, e 72 no rodape). Vazio nao e respiro,
               e quadro pequeno a toa: o story e a prova da cena. */
            height: min(44vh, 22rem);
            max-height: min(44vh, 22rem);
          }
          .p3-case-copy {
            order: 2;
            grid-column: auto;
            grid-row: auto;
            width: 100%;
            /* 🔴 A COPY PARA DE CRESCER. A regra base dela traz 'flex: 1', que
               num LADO A LADO significa "ocupe a largura que sobra". Empilhada
               em coluna, o mesmo 'flex: 1' passou a significar "ocupe a ALTURA
               que sobra", e a caixa esticava 165px abaixo da ultima linha de
               texto: era o buraco entre a copy e a fileira de pontos. */
            flex: 0 0 auto;
          }
          .p3-thumbs {
            order: 3;
            grid-column: auto;
            grid-row: auto;
            width: 100%;
          }
          /* O wordmark também encolhe: era pensado para dividir a linha com o
             quadro (largura sobrando), e empilhado ele reserva altura demais
             sozinho. */
          .p3-case-wordmark {
            height: clamp(3.4rem, 11vh, 5.5rem);
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
    </>
  )
}

