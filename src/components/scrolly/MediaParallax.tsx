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
import path from 'node:path'
import Image from 'next/image'
import sharp from 'sharp'
import { withTbf } from '@/lib/tbf-text'

// PROPORCAO NATURAL (14/10/2026, pedido do fundador: "voce esta cortando MUITA
// foto dos artigos"). Foto editorial no corpo aparece INTEIRA. O hero de abertura
// e o unico lugar onde o corte e permitido. Como o conteudo nao carrega
// width/height nas fotos `bleed`, a medida real sai do arquivo em /public, uma
// vez por foto (cache em memoria), no servidor. Falhou a leitura: 3 / 2.
const dimsCache = new Map<string, Promise<{ width: number; height: number }>>()
function nativeSize(src: string) {
  let hit = dimsCache.get(src)
  if (!hit) {
    hit = sharp(path.join(process.cwd(), 'public', src))
      .metadata()
      .then((m) => ({ width: m.width ?? 3, height: m.height ?? 2 }))
      .catch(() => ({ width: 3, height: 2 }))
    dimsCache.set(src, hit)
  }
  return hit
}

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
  /** Opcionais: sem eles, a proporção nativa é lida do arquivo em /public. */
  width?: number
  height?: number
}

export async function MediaParallax({
  src,
  alt,
  caption,
  credit,
  width,
  height,
}: MediaParallaxProps) {
  // Toda foto do corpo e prancha: inteira, na proporcao nativa. `variant` segue
  // aceito (o conteudo ainda o declara), mas `bleed` nao recorta mais.
  {
    if (!(width && height)) ({ width, height } = await nativeSize(src))
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

export async function MediaPair({
  items,
  ratio,
}: {
  items: [MediaPairItem, MediaPairItem]
  /** Proporcao do quadro de cada metade. Default 4/3, ver scrolly.css. */
  ratio?: string
}) {
  // `ratio` fica aceito por compatibilidade com o conteudo, mas nao recorta mais:
  // cada peca usa a proporcao do proprio arquivo.
  void ratio
  const sizes = await Promise.all(items.map((it) => nativeSize(it.src)))
  return (
    <div className="scrolly-pair">
      {items.map((item, i) => (
        <figure key={item.src} className="scrolly-media scrolly-pair__item">
          <Image
            src={item.src}
            alt={item.alt}
            width={sizes[i].width}
            height={sizes[i].height}
            // Meia coluna (340px) a partir de 768px; largura cheia abaixo disso.
            sizes="(min-width: 768px) 340px, 100vw"
            className="scrolly-media__plate-img"
          />
          <MediaCaption caption={item.caption} credit={item.credit} />
        </figure>
      ))}
    </div>
  )
}
