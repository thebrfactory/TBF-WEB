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
    const t = setInterval(() => {
      setI((v) => (v + 1) % total)
      setCiclo((c) => c + 1)
    }, ms)
    return () => clearInterval(t)
    // `ciclo` no vetor de dependências de propósito: clicar numa miniatura
    // recria o intervalo, e o quadro escolhido ganha o tempo inteiro em vez do
    // que sobrou do anterior.
  }, [total, ms, ciclo])

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
        className={`${styles.player}${playerClassName ? ` ${playerClassName}` : ''}`}
        style={{ ['--story-ms' as string]: `${ms}ms` }}
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

        <div className={styles.head} aria-hidden="true">
          {avatarSrc ? (
            <Image src={avatarSrc} alt="" width={160} height={160} className={styles.avatar} />
          ) : (
            <span className={styles.dot} />
          )}
          <span className={styles.handle}>{handle}</span>
        </div>

        <div className={styles.frame}>
          {items.map((item, idx) => (
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={720}
              height={1280}
              sizes="(max-width: 767px) 60vw, 26vw"
              priority={idx === 0}
              className={`${styles.img}${idx === i ? ` ${styles.imgOn}` : ''}`}
            />
          ))}
        </div>
      </div>

      {/* A FILA QUE COMANDA. `role="tablist"` porque é exatamente isso: um
          seletor de painel único. Cada miniatura é um <button> de verdade, então
          teclado e leitor de tela funcionam sem nenhum código extra. */}
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
