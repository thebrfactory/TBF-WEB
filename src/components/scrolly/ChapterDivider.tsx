// =============================================================================
// ChapterDivider — server component (SPEC §2.1)
// Ponto canônico da virada de tema (preto ↔ cinza ↔ branco pontual). A palavra-
// capítulo (quando existe) é camada gráfica; sem ela (piloto: 13 separadores
// sem subtítulo — 05_PILOTO-CENAS.md §2), o divisor carrega só o índice em
// micro + um <h2> discreto (sr-only) para navegação por leitor de tela.
// =============================================================================

import type { ScrollyTheme } from './types'

const ROMAN: Array<[number, string]> = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

function toRoman(n: number): string {
  let result = ''
  let remaining = n
  for (const [value, symbol] of ROMAN) {
    while (remaining >= value) {
      result += symbol
      remaining -= value
    }
  }
  return result
}

interface ChapterDividerProps {
  index: number
  theme?: ScrollyTheme
  /** Palavra-capítulo gigante (camada gráfica, aria-hidden). Opcional — o piloto não usa. */
  label?: string
}

export function ChapterDivider({ index, theme = 'dark', label }: ChapterDividerProps) {
  return (
    <section className={`scrolly-chapter scrolly-chapter--${theme}`}>
      <div className="scrolly-chapter__wipe" aria-hidden="true" />
      {label && (
        <span className="scrolly-chapter__word" aria-hidden="true">
          {label}
        </span>
      )}
      <span className="scrolly-chapter__index" aria-hidden="true">
        {toRoman(index)}
      </span>
      <h2 className="scrolly-chapter__sr">Capítulo {index}</h2>
    </section>
  )
}
