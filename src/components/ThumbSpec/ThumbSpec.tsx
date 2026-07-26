// =============================================================================
// THUMB SPEC: selo de dimensão da miniatura
// Aparece SÓ enquanto o card não tem capa: escreve, dentro do próprio bloco
// vazio, em que tamanho a imagem tem de entrar. Encaixou a capa? O selo não é
// renderizado (quem chama troca um pelo outro).
// Fonte única das dimensões: THUMB_DIMENSIONS. O ArticleCard pede a imagem ao
// Sanity nesses mesmos números, então o selo nunca mente.
// =============================================================================

// Dimensões-fonte por proporção do card. Base ~1200px de lado maior → nitidez
// retina no masonry (~330 a 430px renderizados).
export const THUMB_DIMENSIONS: Record<string, { w: number; h: number }> = {
  '3/4': { w: 900, h: 1200 },
  '2/3': { w: 900, h: 1350 },
  '1/1': { w: 1100, h: 1100 },
  '4/3': { w: 1200, h: 900 },
  '3/2': { w: 1200, h: 800 },
}

export const THUMB_RATIO_FALLBACK = '3/2'

export function thumbDimensions(ratio: string) {
  return THUMB_DIMENSIONS[ratio] ?? THUMB_DIMENSIONS[THUMB_RATIO_FALLBACK]
}

interface ThumbSpecProps {
  /** Proporção do card (`cardRatio` do CMS), ex.: '3/4'. */
  ratio: string
}

export function ThumbSpec({ ratio }: ThumbSpecProps) {
  const { w, h } = thumbDimensions(ratio)

  return (
    <span className="thumb-spec" aria-hidden="true">
      {w}x{h}p
    </span>
  )
}
