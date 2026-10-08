// =============================================================================
// withTbf: marca `.TBF.` em extrabold dentro de qualquer texto corrido
// -----------------------------------------------------------------------------
// Regra de marca (CHANGES #01, 08/10/2026): toda menção a `.TBF.` nos textos do
// artigo, legendas incluídas, sai em peso 800. O peso vive em `.tbf-mark`
// (scrolly.css), não aqui, para a regra mudar num lugar só.
// Só casa `.TBF.` com os dois pontos: "TBF" solto e `.THE BRAZILIAN FACTORY.`
// ficam como estão.
// =============================================================================

import type { ReactNode } from 'react'

const TBF = /(\.TBF\.)/g

export function withTbf(text: string): ReactNode {
  if (!text.includes('.TBF.')) return text
  return text.split(TBF).map((part, i) =>
    part === '.TBF.' ? (
      <strong key={i} className="tbf-mark">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}
