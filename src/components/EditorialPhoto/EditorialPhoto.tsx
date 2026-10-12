// =============================================================================
// EditorialPhoto: foto de respiro entre blocos de texto (manifesto, about).
// Só foto pronta de /public. Sem texto nem overlay por código.
// =============================================================================

import Image from 'next/image'
import styles from './EditorialPhoto.module.css'

export type EditorialPhotoProps = {
  src: string
  alt: string
  /** `wide`: largura total, paisagem. `half`: meia largura no desktop, retrato. */
  variant?: 'wide' | 'half'
  /** Lado da meia largura no desktop. */
  side?: 'left' | 'right'
}

export function EditorialPhoto({ src, alt, variant = 'wide', side = 'left' }: EditorialPhotoProps) {
  const half = variant === 'half'
  const cls = [styles.figure, half ? `${styles.half} ${styles.tall} ${styles[side]}` : styles.wide].join(' ')
  return (
    <figure className={cls}>
      <div className={styles.frame}>
        <Image
          className={styles.img}
          src={src}
          alt={alt}
          fill
          loading="lazy"
          sizes={half ? '(min-width: 768px) 360px, calc(100vw - 2rem)' : '(min-width: 768px) 680px, calc(100vw - 2rem)'}
        />
      </div>
    </figure>
  )
}
