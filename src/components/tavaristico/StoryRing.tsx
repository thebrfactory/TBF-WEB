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
  size = 76,
  ariaLabel,
  onClick,
  buttonRef,
  fit = 'cover',
}: {
  cover: string
  alt: string
  seen?: boolean
  /** Tamanho do circulo em px. */
  size?: number
  ariaLabel: string
  onClick: () => void
  buttonRef?: (el: HTMLButtonElement | null) => void
  /**
   * Correcao 10/09/2026 (rodada 5, item 5): cover de foto quer `cover`
   * (preenche o circulo, corta as bordas, e o certo pra fotografia). Cover
   * de logotipo/glifo quer `contain` com respiro: a forma toca a borda do
   * quadrado de origem (estrela, funil do .RUNWAY) e o crop circular corta
   * a ponta de um jeito que descentra o olho, mesmo com o glifo centrado no
   * arquivo. Default `cover` preserva todo uso existente (Campaigns).
   */
  fit?: 'cover' | 'contain'
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
      <span className={`${styles.thumbWrap}${fit === 'contain' ? ` ${styles.thumbWrapContain}` : ''}`}>
        {cover ? (
          <Image
            src={cover}
            alt={alt}
            width={size * 2}
            height={size * 2}
            sizes={`${size}px`}
            className={`${styles.thumb}${fit === 'contain' ? ` ${styles.thumbContain}` : ''}`}
          />
        ) : null}
      </span>
    </button>
  )
}
