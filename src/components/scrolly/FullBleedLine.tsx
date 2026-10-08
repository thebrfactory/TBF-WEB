// =============================================================================
// FullBleedLine — server component (motor, novo — o texto do piloto pediu)
// TIER 1 do roteiro: uma frase sozinha ocupando a tela inteira, com virada de
// tema opcional (preto → cinza → branco pontual, nunca cor fora da paleta).
// =============================================================================

import type { ScrollyTheme } from './types'
import { withTbf } from '@/lib/tbf-text'

interface FullBleedLineProps {
  text: string
  theme?: ScrollyTheme
  /** display = tese/citação; word = palavra única em escala máxima; wordmark = nome da casa. */
  scale?: 'display' | 'word' | 'wordmark'
  eyebrow?: string
}

export function FullBleedLine({ text, theme = 'dark', scale = 'display', eyebrow }: FullBleedLineProps) {
  return (
    <section className={`scrolly-fullbleed scrolly-fullbleed--${theme}`} aria-label={eyebrow}>
      <div className="scrolly-fullbleed__wipe" aria-hidden="true" />
      <p className={`scrolly-fullbleed__text scrolly-fullbleed__text--${scale}`}>{withTbf(text)}</p>
    </section>
  )
}
