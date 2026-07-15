// =============================================================================
// IMAGE + CAPTION — TBF WEB 2026
// Variantes: full-bleed (Layout E) / contained
// ZERO border-radius em imagens — regra absoluta
// =============================================================================

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { SanityImage } from '@/types'

interface ImageCaptionProps {
  image: SanityImage
  variant?: 'full-bleed' | 'contained'
  priority?: boolean
  sizes?: string
  aspectRatio?: string
}

export function ImageCaption({
  image,
  variant = 'contained',
  priority = false,
  sizes = '(min-width: 1280px) 80vw, 100vw',
  aspectRatio = '3/2',
}: ImageCaptionProps) {
  const isFullBleed = variant === 'full-bleed'

  return (
    <figure className={`figure ${isFullBleed ? 'figure--full-bleed' : ''}`}>
      <div
        className="figure__media"
        style={{ aspectRatio }}
      >
        <Image
          className="figure__img"
          src={urlFor(image).width(1440).auto('format').url()}
          alt={image.alt ?? ''}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectFit: 'cover', borderRadius: 0 }}
        />
      </div>
      {(image.caption || image.credit) && (
        <figcaption className="figure__caption">
          {image.caption}
          {image.caption && image.credit && ' · '}
          {image.credit}
        </figcaption>
      )}
    </figure>
  )
}
