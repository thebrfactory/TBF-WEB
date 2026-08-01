// =============================================================================
// MediaParallax — server component (SPEC §2.1)
// Filho translateY(±6%) via animation-timeline: view(); overflow:clip no pai.
// Dormente no piloto (não há foto — 05_PILOTO-CENAS.md §2). Nunca em LCP image.
// =============================================================================

import Image from 'next/image'

interface MediaParallaxProps {
  src: string
  alt: string
  caption?: string
}

export function MediaParallax({ src, alt, caption }: MediaParallaxProps) {
  return (
    <figure className="scrolly-media">
      <div className="scrolly-media__frame">
        <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: 'cover' }} className="scrolly-media__img" />
      </div>
      {caption && <figcaption className="scrolly-media__caption">{caption}</figcaption>}
    </figure>
  )
}
