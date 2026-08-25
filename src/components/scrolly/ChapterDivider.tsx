// =============================================================================
// ChapterDivider — server component (SPEC §2.1)
// Ponto canônico da virada de tema (preto ↔ cinza ↔ branco pontual). A palavra-
// capítulo (quando existe) é camada gráfica; sem ela (piloto: 13 separadores
// sem subtítulo — 05_PILOTO-CENAS.md §2), o divisor carrega só o índice em
// micro + um <h2> discreto (sr-only) para navegação por leitor de tela.
// =============================================================================

import type React from 'react'
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
  /**
   * Rótulo do <h2> de leitor de tela, já no idioma da rota. Era a string fixa
   * "Capítulo N", em português, nas duas rotas. E aparecia NA TELA: a classe
   * usada aqui (`scrolly-chapter__sr`) nunca existiu no CSS, então o texto que
   * deveria ser só para leitor de tela ficava visível embaixo de cada capítulo.
   * A classe certa, que existe desde sempre, é `scrolly-sr-only`.
   */
  srLabel: string
  theme?: ScrollyTheme
  /** Palavra-capítulo gigante (camada gráfica, aria-hidden). Opcional — o piloto não usa. */
  label?: string
}

export function ChapterDivider({ index, theme = 'dark', label, srLabel }: ChapterDividerProps) {
  return (
    <section className={`scrolly-chapter scrolly-chapter--${theme}`}>
      <div className="scrolly-chapter__wipe" aria-hidden="true" />
      {label && (
        <span
          className="scrolly-chapter__word"
          aria-hidden="true"
          style={
            {
              /* A MAIOR PALAVRA, nao o rotulo inteiro. `THE SAMENESS` quebra no
                 espaco e cada metade cabe folgada; contar os 12 caracteres faria
                 o capitulo encolher 30% a toa. Quem manda no teto e a palavra
                 que nao pode quebrar. */
              '--sc-chars': Math.max(...label.split(/\s+/).map((w) => w.length)),
            } as React.CSSProperties
          }
        >
          {label}
        </span>
      )}
      <span className="scrolly-chapter__index" aria-hidden="true">
        {toRoman(index)}
      </span>
      <h2 className="scrolly-sr-only">{srLabel}</h2>
    </section>
  )
}
