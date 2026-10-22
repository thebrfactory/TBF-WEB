// =============================================================================
// STORY RING: o circulo com anel gradiente do Instagram, extraido de
// Campaigns.tsx (09/09/2026) para virar componente compartilhado. Nao sabe o
// que abre no clique nem se e "campanha" ou outra coisa - so desenha o
// circulo e avisa quem chama.
// =============================================================================

'use client'

import { useEffect, useRef, useState } from 'react'
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
  staggerIndex,
}: {
  cover: string
  alt: string
  seen?: boolean
  /** Tamanho do circulo em px. */
  size?: number
  ariaLabel: string
  onClick: () => void
  buttonRef?: (el: HTMLButtonElement | null) => void
  /** Opt-in: o anel entra com fade ao aparecer na tela, atrasado 75ms por posicao
   * (maximo 600ms). Sem a prop, o anel e estatico como sempre foi. */
  staggerIndex?: number
}) {
  const stagger = staggerIndex !== undefined
  const localRef = useRef<HTMLButtonElement | null>(null)
  const [shown, setShown] = useState(!stagger)

  useEffect(() => {
    if (!stagger || shown) return
    const el = localRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [stagger, shown])

  const delay = stagger ? Math.min(staggerIndex, 8) * 75 : 0
  const staggerClass = stagger ? ` ${shown ? styles.ringIn : styles.ringPre}` : ''

  return (
    <button
      type="button"
      ref={(el) => {
        localRef.current = el
        buttonRef?.(el)
      }}
      className={`${styles.ring}${seen ? ` ${styles.ringSeen}` : ''}${staggerClass}`}
      // Custom property inline: `size` e um numero livre (nao um punhado de
      // variantes fixas), entao a variavel viaja com o elemento em vez de
      // virar uma classe por tamanho.
      style={{ ['--ring-size' as string]: `${size}px`, ['--ring-delay' as string]: `${delay}ms` }}
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
