// =============================================================================
// STORY RING: o circulo com anel gradiente do Instagram, extraido de
// Campaigns.tsx (09/09/2026) para virar componente compartilhado. Nao sabe o
// que abre no clique nem se e "campanha" ou outra coisa - so desenha o
// circulo e avisa quem chama.
// =============================================================================

'use client'

import Image from 'next/image'
import styles from './StoryRing.module.css'

export function StoryRing({
  cover,
  alt,
  seen = false,
  size = 66,
  ariaLabel,
  onClick,
  buttonRef,
}: {
  cover: string
  alt: string
  seen?: boolean
  /** Tamanho do circulo em px. */
  size?: number
  ariaLabel: string
  onClick: () => void
  buttonRef?: (el: HTMLButtonElement | null) => void
}) {
  return (
    <button
      type="button"
      ref={buttonRef}
      className={`${styles.ring}${seen ? ` ${styles.ringSeen}` : ''}`}
      // Custom property inline: `size` e um numero livre (nao um punhado de
      // variantes fixas), entao a variavel viaja com o elemento em vez de
      // virar uma classe por tamanho.
      style={{ ['--ring-size' as string]: `${size}px` }}
      aria-haspopup="dialog"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {/* Correção 10/09/2026 (rodada 6, item 4): a variante `contain` saiu
          (ninguém mais usa), componente só com o comportamento `cover`. */}
      <span className={styles.thumbWrap}>
        {cover ? (
          <Image
            src={cover}
            alt={alt}
            width={size * 2}
            height={size * 2}
            sizes={`${size}px`}
            className={styles.thumb}
          />
        ) : null}
      </span>
    </button>
  )
}
