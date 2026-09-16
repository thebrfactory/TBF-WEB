'use client'

// =============================================================================
// STORY DECK — o quadro 9/16 que se comporta como um story, e a fila de
// miniaturas que o comanda
// -----------------------------------------------------------------------------
// Nasceu dentro do deck /pitch/v3 (pedido do fundador #01, #01 CHANGES
// 2026-08-14, com a referência: um destaque do próprio @thebrfactory). Saiu de
// lá quando a proposta de hospedagem passou a precisar do MESMO objeto ("use
// esses materiais seguindo a mesma lógica do layout 05").
//
// POR QUE COMPARTILHADO, e não copiado. A regra 4 do ecossistema é "apontar, não
// copiar", e aqui ela vale sem ressalva: são duas páginas mostrando a mesma
// coisa (um story rodando) pelo mesmo motivo (provar que o trabalho nasceu no
// formato em que é consumido). Duplicar significaria que o próximo ajuste de
// ritmo, de barra ou de contraste só chegaria em uma das duas.
//
// 🔴 O QUADRO É LISO (pedido do fundador 2026-08-14: "todo stories fica liso
// liso, sem nenhuma descrição, quero só a foto, o sombreamento superior e os
// assets gráficos"). Não existe tarja de legenda, não existe rótulo de papel,
// não existe crédito dentro do quadro. O que aparece sobre a foto é só o que um
// story de verdade tem: a barra de tempo e o cabeçalho de perfil.
//
// O texto NÃO SUMIU DO PRODUTO, mudou de lugar: o `role` de cada peça continua
// no dado e vira o `alt` e o `title` da miniatura, então leitor de tela e mouse
// parado continuam tendo a informação. O que ele tirou foi a POLUIÇÃO sobre a
// imagem, e ele está certo: legenda dentro de story é coisa que story não tem.
//
// AS MINIATURAS COMANDAM (mesmo pedido: "quero poder selecionar outras
// miniaturas embaixo e quando clicar nelas, ver na tela"). A fila deixou de ser
// uma esteira que anda sozinha e virou um seletor: rola de lado, cada miniatura
// é um botão, a ativa ganha o anel da marca. Esteira que anda é bonita e
// impossível de clicar.
//
// O relógio continua rodando por cima da escolha: clicar reposiciona e o avanço
// automático segue dali. Quem parou para clicar quer ver aquele quadro, então o
// timer reinicia inteiro no clique em vez de cortar o tempo pela metade.
//
// prefers-reduced-motion: sem avanço automático e sem barra correndo. As
// miniaturas continuam clicáveis, que é a forma de navegar sem movimento.
// =============================================================================

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './StoryPlayer.module.css'

export interface StoryItem {
  src: string
  alt: string
  /** O que a peça prova. Vira `alt`/`title` da miniatura, nunca tarja na foto. */
  role: string
  /**
   * 🔴 EXCEÇÃO AO "QUADRO LISO", ABERTA PELO FUNDADOR EM 10/09/2026, com a
   * referência na mão: o mesmo tratamento do nome no hero do Tavarístico,
   * texto branco sobre um degradê preto que sobe da base. O que ele proibiu
   * em 14/08 foi a TARJA AUTOMÁTICA de legenda (o `role` impresso em toda
   * foto, que ele chamou de poluição). Isto aqui é o contrário: é opcional,
   * é por quadro, e é COMPOSIÇÃO, o texto que o story existe para dizer.
   * Quadro sem `overlay` continua liso, exatamente como antes.
   *
   * Só aparece no quadro grande. A miniatura nunca recebe texto: lá o espaço
   * é de 60px e a frase viraria borrão.
   */
  overlay?: {
    /** A frase. Uma ideia por quadro, curta o bastante para 2 linhas. */
    title: string
    /** Linha de apoio, em caixa alta e miúda, acima do título. Opcional. */
    kicker?: string
  }
  /**
   * QUADRO EM MOVIMENTO, aberto em 11/09/2026 para o .RUNWAY UNTD COLLECTIVE.:
   * passarela é movimento, e provar moda com foto parada é provar pela metade.
   *
   * `src` CONTINUA obrigatório e vira o poster: é o que a miniatura mostra, o
   * que cobre o quadro enquanto o vídeo carrega, e o que sobra se o vídeo
   * falhar. Quadro sem `video` segue sendo foto, exatamente como antes.
   *
   * Dois arquivos por quadro, na ordem em que o navegador tenta: AV1 (menor)
   * e H.264 (universal). Mesmo par que o HeroVideo já usa na home.
   */
  video?: { av1: string; h264: string }
  /**
   * Tempo deste quadro, em ms. Sem ele, vale o `ms` do deck. Existe porque
   * vídeo tem duração própria: 2,8s cortaria a passarela no meio do passo.
   */
  ms?: number
}

interface StoryDeckProps {
  items: StoryItem[]
  /** Handle mostrado no cabeçalho, ex. `Ô`. */
  handle: string
  /** Avatar. Sem ele, entra um anel da cor da marca no mesmo lugar. */
  avatarSrc?: string
  /** Tempo de cada quadro. */
  ms?: number
  /**
   * Classe do invólucro do CONJUNTO (quadro + fila).
   *
   * Serve para quem usa desmontar a pilha padrão: com `display: contents` nesta
   * classe, o quadro e a fila viram filhos diretos da grade de quem chama, e aí
   * dá para pôr a fila ocupando a largura inteira enquanto o quadro divide a
   * linha de cima com o texto. É o que a cena 05 do deck faz.
   */
  deckClassName?: string
  /** Classe do invólucro do QUADRO, para quem usa definir `--story-h`. */
  playerClassName?: string
  /** Classe da fila de miniaturas, para definir `--thumb-w`. */
  thumbsClassName?: string
  label?: string
  /**
   * Variante do seletor embaixo do quadro. `thumbs` (padrão) é a esteira de
   * miniaturas. `dots` troca por uma fileira de pontos com setas anterior/
   * próxima ao lado, pensada para o mobile: um ponto lê melhor que uma
   * miniatura de 3rem numa tela de telefone. As setas SOBRE o quadro
   * (`.pass`) somem nesta variante para não competir com as novas: ver o
   * comentário em StoryPlayer.module.css.
   */
  nav?: 'thumbs' | 'dots'
  /**
   * Congela o avanco automatico enquanto for `true`. Existe para o gesto de
   * segurar para pausar, que e o do Instagram: quem chama escuta o
   * pointerdown/pointerup e alterna esta prop. Sem ela, o unico jeito de
   * pausar de fora era mexer no intervalo interno.
   */
  paused?: boolean
  /**
   * O (X) de fechar (pedido do fundador 2026-09-16). Sem prop, sem botão: o
   * deck sozinho, fora de modal, não tem o que fechar. Renderiza DENTRO do
   * `.head`, na mesma linha do avatar e do handle, porque é lá que o
   * Instagram põe o dele.
   *
   * ANTES morava no modal (StoryModal/CaseStoryModal), posicionado sobre o
   * `.deckWrap`. O `.deckWrap` não tem largura própria: ele se mede pelo
   * maior filho, e a fila de miniaturas/pontos sem quebra (12 peças no case
   * VERAOZAO) podia ficar mais larga que o quadro. O X herdava essa largura
   * errada e sobrava fora do quadro, à direita, no celular. Aqui dentro do
   * `.head` ele herda a largura do `.player`, que é sempre a largura real do
   * quadro, calculada pela altura, nunca pela fila: não tem como sobrar.
   */
  onClose?: () => void
}

export function StoryDeck({
  items,
  handle,
  avatarSrc,
  ms = 2800,
  deckClassName = '',
  playerClassName = '',
  thumbsClassName = '',
  label,
  nav = 'thumbs',
  paused = false,
  onClose,
}: StoryDeckProps) {
  const [i, setI] = useState(0)
  const [running, setRunning] = useState(true)
  // Muda a cada avanço OU clique. É o que reinicia a animação da barra da vez
  // sem tocar nas outras: a `key` do React remonta só aquele nó.
  const [ciclo, setCiclo] = useState(0)
  const total = items.length
  const trilho = useRef<HTMLDivElement>(null)

  const ir = useCallback((n: number) => {
    setI(((n % total) + total) % total)
    setCiclo((c) => c + 1)
  }, [total])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRunning(false)
      return
    }
    if (paused) return
    // `setTimeout`, nao `setInterval`: cada quadro pode ter o proprio tempo
    // (video tem duracao propria), entao o relogio se remarca a cada troca.
    const t = setTimeout(() => {
      setI((v) => (v + 1) % total)
      setCiclo((c) => c + 1)
    }, items[i]?.ms ?? ms)
    return () => clearTimeout(t)
    // `ciclo` no vetor de dependências de propósito: clicar numa miniatura
    // recria o intervalo, e o quadro escolhido ganha o tempo inteiro em vez do
    // que sobrou do anterior.
  }, [total, ms, ciclo, paused, items, i])

  // A miniatura ativa se traz para a vista quando o avanço automático passa por
  // ela. Sem isto, a fila fica parada mostrando um trecho enquanto o quadro
  // grande já está em outro ponto da sequência.
  useEffect(() => {
    const rail = trilho.current
    const alvo = rail?.children[i] as HTMLElement | undefined
    if (!rail || !alvo) return
    const dentro = alvo.offsetLeft >= rail.scrollLeft &&
      alvo.offsetLeft + alvo.offsetWidth <= rail.scrollLeft + rail.clientWidth
    if (dentro) return
    rail.scrollTo({
      left: alvo.offsetLeft - rail.clientWidth / 2 + alvo.offsetWidth / 2,
      behavior: 'smooth',
    })
  }, [i])

  return (
    <div className={`${styles.deck}${deckClassName ? ` ${deckClassName}` : ''}`}>
      <div
        className={`${styles.player}${playerClassName ? ` ${playerClassName}` : ''}${nav === 'dots' ? ` ${styles.playerDots}` : ''}`}
        style={{ ['--story-ms' as string]: `${items[i]?.ms ?? ms}ms` }}
        role="group"
        aria-label={label}
      >
        {/* Cronômetro. `aria-hidden` porque é decoração de tempo: quem navega
            por leitor de tela usa os botões da fila, que são rotulados. */}
        <div className={styles.bars} aria-hidden="true">
          {items.map((item, idx) => (
            <span key={item.src} className={styles.bar}>
              <span
                key={idx === i ? `on-${ciclo}` : `off-${idx}`}
                // A barra da vez congela junto com o avanco: sem isto o
                // cronometro continuaria correndo enquanto o dedo segura.
                style={paused ? { animationPlayState: 'paused' } : undefined}
                className={
                  idx < i || (idx === i && !running)
                    ? `${styles.fill} ${styles.fillDone}`
                    : idx === i
                      ? `${styles.fill} ${styles.fillLive}`
                      : styles.fill
                }
              />
            </span>
          ))}
        </div>

        <div className={styles.head}>
          {/* Avatar + handle continuam decorativos (a informação real já
              está no `label` do dialog que chama). O X, logo abaixo, não
              entra no `aria-hidden`: ele é o botão de fechar de verdade. */}
          <span className={styles.headInfo} aria-hidden="true">
            {avatarSrc ? (
              <Image src={avatarSrc} alt="" width={160} height={160} className={styles.avatar} />
            ) : (
              <span className={styles.dot} />
            )}
            <span className={styles.handle}>{handle}</span>
          </span>
          {onClose ? (
            <button
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&#10005;</span>
            </button>
          ) : null}
        </div>

        <div className={styles.frame}>
          {/* Só o quadro atual e o próximo entram no DOM (correção QA
              10/09/2026): antes o mapa renderizava os N quadros da sequência
              de uma vez, e o navegador buscava todos ao abrir o story (CRIVO
              sozinho já eram 5 req simultâneas, a pagina inteira soma 21). O
              próximo pré-carrega para a transição de avanço não esperar
              rede; o anterior não fica no DOM, mas o navegador já cacheou o
              que foi visto, então voltar não busca de novo. */}
          {items.map((item, idx) => {
            const proximo = (i + 1) % total
            if (idx !== i && idx !== proximo) return null
            const ligado = idx === i
            // QUADRO EM MOVIMENTO. O poster e o mesmo `src` da foto, entao o
            // quadro ja nasce com a imagem certa e o video entra por cima sem
            // piscar preto. `preload` so no quadro da vez: o proximo fica com
            // os metadados, que e o bastante para comecar rapido sem baixar o
            // arquivo inteiro de um quadro que talvez ninguem veja.
            if (item.video) {
              return (
                <video
                  key={item.src}
                  ref={(el) => {
                    if (!el) return
                    if (ligado) { el.currentTime = 0; void el.play().catch(() => {}) }
                    else el.pause()
                  }}
                  poster={item.src}
                  muted
                  playsInline
                  loop
                  autoPlay={ligado}
                  preload={ligado ? 'auto' : 'metadata'}
                  aria-label={item.alt}
                  className={`${styles.img}${ligado ? ` ${styles.imgOn}` : ''}`}
                >
                  <source src={item.video.av1} type="video/mp4; codecs=av01.0.05M.08" />
                  <source src={item.video.h264} type="video/mp4" />
                </video>
              )
            }
            return (
              <Image
                key={item.src}
                src={item.src}
                alt={item.alt}
                width={720}
                height={1280}
                sizes="(max-width: 767px) 60vw, 26vw"
                priority={ligado && i === 0}
                className={`${styles.img}${ligado ? ` ${styles.imgOn}` : ''}`}
              />
            )
          })}

          {/* O SOMBREADO DE CIMA é um nó próprio, e não o fundo do cabeçalho.
              Como fundo do cabeçalho ele tinha a largura do cabeçalho, que
              respeita um recuo lateral: sobrava um degrau visível nas duas
              beiradas e o topo do quadro ficava com o sombreado "só num
              pedaço", que foi o que o fundador viu. Aqui ele é `inset: 0` sobre
              o quadro inteiro, então acompanha o raio e chega às bordas.
              Também ganhou um irmão embaixo: sem ele, uma foto clara no rodapé
              encostava direto no fim do quadro sem assentar. */}
          <span className={styles.shadeTop} aria-hidden="true" />
          <span className={styles.shadeBottom} aria-hidden="true" />

          {/* SOBREPOSIÇÃO DE TEXTO, quando o quadro pede (ver StoryItem.overlay).
              Fica dentro do `.frame` para herdar o recorte e o raio, e some
              junto com a foto na mesma transição de opacidade: sem isso o
              texto do quadro anterior atravessaria a troca. `aria-hidden`
              porque a mesma frase já está no `alt` da peça e no rótulo da
              miniatura: lida duas vezes, viraria eco no leitor de tela. */}
          {items.map((item, idx) =>
            item.overlay ? (
              <span
                key={`ov-${item.src}`}
                aria-hidden="true"
                className={`${styles.overlay}${idx === i ? ` ${styles.overlayOn}` : ''}`}
              >
                {item.overlay.kicker ? (
                  <span className={styles.overlayKicker}>{item.overlay.kicker}</span>
                ) : null}
                <span className={styles.overlayTitle}>{item.overlay.title}</span>
              </span>
            ) : null
          )}
        </div>

        {/* PASSADORES (pedido do fundador 2026-08-14). Ficam sobre as beiradas
            do quadro, discretos, e aparecem por inteiro no hover ou no foco de
            teclado. Um story de verdade se passa tocando na tela; aqui, num deck
            que é apresentado com o mouse na mão, seta explícita é o que a pessoa
            procura. Os dois dão a volta na lista, então nunca ficam
            desabilitados: numa peça em laço, botão morto é ruído. */}
        <button
          type="button"
          className={`${styles.pass} ${styles.passPrev}`}
          onClick={() => ir(i - 1)}
          aria-label="Peça anterior"
        >
          <span aria-hidden="true">&#8592;</span>
        </button>
        <button
          type="button"
          className={`${styles.pass} ${styles.passNext}`}
          onClick={() => ir(i + 1)}
          aria-label="Próxima peça"
        >
          <span aria-hidden="true">&#8594;</span>
        </button>
      </div>

      {nav === 'dots' ? (
        // A FILEIRA DE PONTOS (pedido do fundador: "as thumbs podem diminuir
        // e se transformar em pontos com setas para navegar"). Mesmo papel da
        // fila de miniaturas, o `role="tablist"` inclusive é o mesmo, só a
        // miniatura de 3rem virou um ponto de 6px com alvo de toque de 44px
        // (ver .dot em StoryPlayer.module.css). As setas ficam FORA da faixa
        // que rola, uma de cada lado, porque elas não pertencem a um item
        // específico como os pontos.
        <div
          className={`${styles.dotsNav}${thumbsClassName ? ` ${thumbsClassName}` : ''}`}
        >
          <button
            type="button"
            className={styles.dotArrow}
            onClick={() => ir(i - 1)}
            aria-label="Peça anterior"
          >
            <span aria-hidden="true">&#8592;</span>
          </button>
          <div ref={trilho} className={styles.dots} role="tablist" aria-label={label}>
            {items.map((item, idx) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={idx === i}
                aria-label={item.role}
                title={item.role}
                onClick={() => ir(idx)}
                className={`${styles.dot}${idx === i ? ` ${styles.dotOn}` : ''}`}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.dotArrow}
            onClick={() => ir(i + 1)}
            aria-label="Próxima peça"
          >
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      ) : (
        // A FILA QUE COMANDA. `role="tablist"` porque é exatamente isso: um
        // seletor de painel único. Cada miniatura é um <button> de verdade, então
        // teclado e leitor de tela funcionam sem nenhum código extra.
        <div
          ref={trilho}
          className={`${styles.thumbs}${thumbsClassName ? ` ${thumbsClassName}` : ''}`}
          role="tablist"
          aria-label={label}
        >
          {items.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={idx === i}
              aria-label={item.role}
              title={item.role}
              onClick={() => ir(idx)}
              className={`${styles.thumb}${idx === i ? ` ${styles.thumbOn}` : ''}`}
            >
              <Image
                src={item.src}
                alt=""
                width={360}
                height={640}
                sizes="200px"
                className={styles.thumbImg}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// =============================================================================
// MEDIA BELT — a esteira horizontal que anda sozinha
// -----------------------------------------------------------------------------
// Continua existindo, e não se confunde com a fila de miniaturas: esta aqui é
// DECORATIVA e não se clica. É o reel de abertura da proposta de hospedagem, o
// que o fundador pediu como "carrossel bem rápido" para as imagens entrarem em
// evidência antes de qualquer palavra.
//
// A lista é duplicada e o trilho corre em translateX: é assim que uma esteira
// infinita se faz sem JavaScript. `aria-hidden` na segunda cópia para o leitor
// de tela não ler tudo duas vezes.
// =============================================================================

export function MediaBelt({
  items,
  className = '',
  label,
}: {
  items: StoryItem[]
  className?: string
  label?: string
}) {
  return (
    <div className={`${styles.belt}${className ? ` ${className}` : ''}`} role="group" aria-label={label}>
      <div className={styles.beltTrack}>
        {[...items, ...items].map((m, idx) => (
          <figure key={m.src + idx} className={styles.beltItem} aria-hidden={idx >= items.length}>
            <Image
              src={m.src}
              alt={idx < items.length ? m.alt : ''}
              width={360}
              height={640}
              className={styles.beltImg}
              sizes="300px"
            />
          </figure>
        ))}
      </div>
    </div>
  )
}
