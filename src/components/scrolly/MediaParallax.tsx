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

// =============================================================================
// MediaPair — duas peças lado a lado no desktop, empilhadas no telefone
// -----------------------------------------------------------------------------
// Pedido do fundador (#01 CHANGES 2026-08-14): a foto que sangra de ponta a
// ponta está boa no telefone e "muito grande, estourada" no desktop. Em 1440px
// um quadro 16/10 de largura cheia mede 900px de altura — uma tela inteira por
// foto, e a matéria tinha duas dessas em sequência.
//
// A correção não é encolher a foto: é dar a ela um PAR. Duas peças dividindo a
// mesma faixa ficam com metade da altura cada, o olho compara as duas de uma vez
// (que é o que o par frente/traseira quer) e a página deixa de ser um álbum.
//
// O quadro do par é 4/5, não 16/10: em meia largura o 16/10 vira uma tira baixa
// demais para caber um carro inteiro com dignidade.
//
// O parallax fica LIGADO aqui, ao contrário do `plate`, porque cada peça continua
// sendo foto recortada em `cover` — há de onde tirar movimento sem tremer tarja.
// =============================================================================

export interface MediaPairItem {
  src: string
  alt: string
  caption?: string
}

export function MediaPair({ items }: { items: [MediaPairItem, MediaPairItem] }) {
  return (
    <div className="scrolly-pair">
      {items.map((item) => (
        <figure key={item.src} className="scrolly-media scrolly-pair__item">
          <div className="scrolly-media__frame scrolly-pair__frame">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              // Meia largura a partir de 768px; largura cheia abaixo disso.
              sizes="(min-width: 768px) 50vw, 100vw"
              style={{ objectFit: 'cover' }}
              className="scrolly-media__img"
            />
          </div>
          {item.caption && <figcaption className="scrolly-media__caption">{item.caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}
