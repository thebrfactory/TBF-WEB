// =============================================================================
// PinnedIntro — server component (SPEC §2.1)
// Container 250vh (180vh mobile) > filho sticky. Fundo scale(1→1.06) via
// animation-timeline: view(). Usado no piloto para a tese (TIER 1, frase 1).
// =============================================================================

import { withTbf } from '@/lib/tbf-text'

interface PinnedIntroProps {
  text: string
  kicker?: string
}

export function PinnedIntro({ text, kicker }: PinnedIntroProps) {
  return (
    <section className="scrolly-pinned" aria-label="Tese">
      <div className="scrolly-pinned__sticky">
        <div className="scrolly-pinned__bg" aria-hidden="true" />
        {kicker && <p className="scrolly-pinned__kicker">{withTbf(kicker)}</p>}
        <p className="scrolly-pinned__text">{withTbf(text)}</p>
      </div>
    </section>
  )
}
