// =============================================================================
// PullQuote — server component (SPEC §2.1)
// ScrollyReveal variante --scale + tipografia display. <figure>/<blockquote>/
// <figcaption> semânticos. Dormente no piloto (não há citação atribuída —
// 05_PILOTO-CENAS.md §2), testado com o mock jornalismo.
// =============================================================================

import { ScrollyReveal } from './ScrollyReveal'

interface PullQuoteProps {
  quote: string
  attribution?: string
}

export function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <ScrollyReveal as="figure" variant="scale" className="scrolly-quote">
      <blockquote className="scrolly-quote__text">{quote}</blockquote>
      {attribution && <figcaption className="scrolly-quote__attribution">{attribution}</figcaption>}
    </ScrollyReveal>
  )
}
