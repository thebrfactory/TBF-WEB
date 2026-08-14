'use client'

// =============================================================================
// STORY PLAYER — o quadro 9/16 que se comporta como um story do Instagram
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
// A exceção de autocontenção do /pitch/v3 continua valendo para o RESTO do deck:
// o que saiu foi este objeto, não a folha de estilo da 3.0.
//
// O QUE ELE FAZ ALÉM DE TROCAR IMAGEM:
//   1. O quadro é 9/16. É a proporção do formato, e é ela que faz a peça ser
//      reconhecida como story antes de qualquer outro detalhe.
//   2. A CRONOMETRAGEM: barra segmentada no topo, um traço por imagem, o traço
//      da vez enchendo no mesmo tempo em que a imagem fica na tela. É o que diz
//      "isto está passando", e é o que uma troca de opacidade nunca disse.
//   3. O CABEÇALHO: avatar e handle. Selo de idade do post ("39 sem") NÃO entra:
//      inventar data de publicação é fingir registro.
//
// Cada barra é uma animação CSS de largura reiniciada pela `key` do React (que
// muda a cada volta): sem timer por segmento, sem estado por barra.
//
// prefers-reduced-motion: sem avanço automático e sem barra correndo. Fica na
// primeira imagem, e as barras mostram a posição, paradas.
// =============================================================================

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './StoryPlayer.module.css'

export interface StoryItem {
  src: string
  alt: string
  /** O que a imagem prova. Aparece na tarja de baixo. */
  role: string
  /** Tradução da tarja, opcional: só o deck bilíngue usa. */
  roleEn?: string
}

interface StoryPlayerProps {
  items: StoryItem[]
  /** Handle mostrado no cabeçalho, ex. `.TBF.` ou `@odecasahostel`. */
  handle: string
  /** Avatar opcional. Sem ele, entra um anel da cor da marca no mesmo lugar. */
  avatarSrc?: string
  /** Tempo de cada quadro. O padrão é o do deck. */
  ms?: number
  /** Classe extra do invólucro, para quem usa definir `--story-h`. */
  className?: string
  /** Rótulo do grupo para leitor de tela. */
  label?: string
}

export function StoryPlayer({
  items,
  handle,
  avatarSrc,
  ms = 2400,
  className = '',
  label,
}: StoryPlayerProps) {
  const [i, setI] = useState(0)
  const [running, setRunning] = useState(true)
  const total = items.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRunning(false)
      return
    }
    const t = setInterval(() => setI((v) => (v + 1) % total), ms)
    return () => clearInterval(t)
  }, [total, ms])

  const atual = items[i]

  return (
    <div
      className={`${styles.player}${className ? ` ${className}` : ''}`}
      style={{ ['--story-ms' as string]: `${ms}ms` }}
      role="group"
      aria-label={label}
    >
      {/* Cronômetro. `aria-hidden` porque é decoração de tempo: o que interessa
          ao leitor de tela é a tarja de papel, logo abaixo. */}
      <div className={styles.bars} aria-hidden="true">
        {items.map((item, idx) => (
          <span key={item.src} className={styles.bar}>
            <span
              // A `key` muda a cada volta do laço, e é isso que reinicia a
              // animação do segmento da vez sem tocar nos outros.
              key={idx === i ? `on-${i}` : `off-${idx}`}
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
          <Image src={avatarSrc} alt="" width={48} height={48} className={styles.avatar} />
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

      <span className={styles.role} aria-live="off">
        {atual.role}
        {atual.roleEn && <span className={styles.roleEn}>{atual.roleEn}</span>}
      </span>
    </div>
  )
}

// =============================================================================
// MEDIA BELT — a esteira horizontal que acompanha o player
// -----------------------------------------------------------------------------
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
              alt={m.alt}
              width={360}
              height={640}
              className={styles.beltImg}
              sizes="150px"
            />
            <figcaption className={styles.beltRole}>{m.role}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
