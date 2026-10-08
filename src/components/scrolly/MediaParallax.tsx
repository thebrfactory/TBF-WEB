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
import { withTbf } from '@/lib/tbf-text'

// LEGENDA (08/10/2026, CHANGES #01): a frase em light, o crédito em bold, e as
// duas sempre dentro do `figcaption`, que mora no MESMO `figure` da imagem. A
// legenda herda a largura da imagem, então a borda esquerda dela é a borda
// esquerda da foto, em qualquer variante. Antes o `figure` ocupava a tela
// inteira e a prancha ficava centralizada dentro dele: a legenda começava fora
// do alinhamento da imagem. O crédito continua obrigatório (licenças CC).
function MediaCaption({ caption, credit }: { caption?: string; credit?: string }) {
  if (!caption && !credit) return null
  return (
    <figcaption className="scrolly-media__caption">
      {caption && <span className="scrolly-media__caption-text">{withTbf(caption)}</span>}
      {caption && credit && ' · '}
      {credit && <strong className="scrolly-media__credit">{withTbf(credit)}</strong>}
    </figcaption>
  )
}

interface MediaParallaxProps {
  src: string
  alt: string
  caption?: string
  credit?: string
  variant?: 'bleed' | 'plate'
  /** Obrigatórios em `plate`: é a proporção nativa que define a altura. */
  width?: number
  height?: number
}

export function MediaParallax({
  src,
  alt,
  caption,
  credit,
  variant = 'bleed',
  width,
  height,
}: MediaParallaxProps) {
  if (variant === 'plate') {
    return (
      <figure
        className="scrolly-media scrolly-media--plate"
        // Proporção nativa entregue ao CSS, que a usa para converter o teto de
        // altura (80svh) em largura da PRÓPRIA figura (e não só da imagem), para a
        // legenda acompanhar a borda da foto. Ver scrolly.css §PRANCHA.
        style={{ '--plate-ratio': width && height ? width / height : 1 } as React.CSSProperties}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 768px) 680px, 100vw"
          className="scrolly-media__plate-img"
        />
        <MediaCaption caption={caption} credit={credit} />
      </figure>
    )
  }

  return (
    <figure className="scrolly-media">
      <div className="scrolly-media__frame">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 680px, 100vw" style={{ objectFit: 'cover' }} className="scrolly-media__img" />
      </div>
      <MediaCaption caption={caption} credit={credit} />
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
  credit?: string
}

export function MediaPair({
  items,
  ratio,
}: {
  items: [MediaPairItem, MediaPairItem]
  /** Proporcao do quadro de cada metade. Default 4/3, ver scrolly.css. */
  ratio?: string
}) {
  return (
    <div className="scrolly-pair">
      {items.map((item) => (
        <figure key={item.src} className="scrolly-media scrolly-pair__item">
          <div
            className="scrolly-media__frame scrolly-pair__frame"
            style={ratio ? ({ ['--pair-ratio']: ratio } as React.CSSProperties) : undefined}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              // Meia coluna (340px) a partir de 768px; largura cheia abaixo disso.
              sizes="(min-width: 768px) 340px, 100vw"
              style={{ objectFit: 'cover' }}
              className="scrolly-media__img"
            />
          </div>
          <MediaCaption caption={item.caption} credit={item.credit} />
        </figure>
      ))}
    </div>
  )
}
