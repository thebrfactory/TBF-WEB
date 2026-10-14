// =============================================================================
// EditorialPhoto: foto de respiro entre blocos de texto (manifesto, about).
// Só foto pronta de /public. Sem texto nem overlay por código.
// =============================================================================

import path from 'node:path'
import Image from 'next/image'
import sharp from 'sharp'
import styles from './EditorialPhoto.module.css'

export type EditorialPhotoProps = {
  src: string
  alt: string
  /** `wide`: largura total, paisagem. `half`: meia largura no desktop, retrato. */
  variant?: 'wide' | 'half'
  /** Lado da meia largura no desktop. */
  side?: 'left' | 'right'
}

// Foto inteira, na proporcao do arquivo (14/10/2026): sem aspect-ratio forcado,
// sem cover. A medida sai do arquivo em /public, no servidor.
async function nativeSize(src: string) {
  try {
    const m = await sharp(path.join(process.cwd(), 'public', src)).metadata()
    if (m.width && m.height) return { width: m.width, height: m.height }
  } catch {}
  return { width: 3, height: 2 }
}

export async function EditorialPhoto({ src, alt, variant = 'wide', side = 'left' }: EditorialPhotoProps) {
  const { width, height } = await nativeSize(src)
  const half = variant === 'half'
  const cls = [styles.figure, half ? `${styles.half} ${styles[side]}` : styles.wide].join(' ')
  return (
    <figure className={cls}>
      <div className={styles.frame}>
        <Image
          className={styles.img}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          sizes={half ? '(min-width: 768px) 360px, calc(100vw - 2rem)' : '(min-width: 768px) 680px, calc(100vw - 2rem)'}
        />
      </div>
    </figure>
  )
}
