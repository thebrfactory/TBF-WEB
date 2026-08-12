// =============================================================================
// MediaParallax — server component (SPEC §2.1)
// Filho translateY(±6%) via animation-timeline: view(); overflow:clip no pai.
// Nunca em LCP image.
//
// DUAS VARIANTES, e a diferença não é estética, é de respeito ao original:
//
// `bleed` (padrão) — a foto sangra num quadro fixo 16/10 com object-fit: cover e
//   scale(1.12) para o parallax ter de onde tirar movimento. Serve FOTOGRAFIA,
//   onde recortar as beiradas não tira informação.
//
// `plate` — prancha de museu. Serve ARTE IMPRESSA e RETRATO VERTICAL (folheto,
//   anúncio de jornal, retrato em pé): material em que a beirada É conteúdo — o
//   slogan no topo do folheto, a cabeça de quem foi fotografado. Aqui a imagem
//   aparece INTEIRA, na proporção nativa dela (por isso `width`/`height` são
//   obrigatórios nessa variante, em vez de `fill`), e o parallax é desligado:
//   translateY + scale numa imagem contida só faria a tarja do letterbox
//   tremer. Sem recorte, sem zoom, sem invenção de nitidez.
// =============================================================================

import type React from 'react'
import Image from 'next/image'

interface MediaParallaxProps {
  src: string
  alt: string
  caption?: string
  variant?: 'bleed' | 'plate'
  /** Obrigatórios em `plate`: é a proporção nativa que define a altura. */
  width?: number
  height?: number
}

export function MediaParallax({
  src,
  alt,
  caption,
  variant = 'bleed',
  width,
  height,
}: MediaParallaxProps) {
  if (variant === 'plate') {
    return (
      <figure className="scrolly-media scrolly-media--plate">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 768px) 60vw, 100vw"
          className="scrolly-media__plate-img"
          // Proporção nativa entregue ao CSS, que a usa para converter o teto de
          // altura (80svh) em largura. Ver scrolly.css §PRANCHA.
          style={{ '--plate-ratio': width && height ? width / height : 1 } as React.CSSProperties}
        />
        {caption && <figcaption className="scrolly-media__caption">{caption}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className="scrolly-media">
      <div className="scrolly-media__frame">
        <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: 'cover' }} className="scrolly-media__img" />
      </div>
      {caption && <figcaption className="scrolly-media__caption">{caption}</figcaption>}
    </figure>
  )
}
