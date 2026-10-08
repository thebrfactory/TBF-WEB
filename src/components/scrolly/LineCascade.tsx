// =============================================================================
// LineCascade — server component (motor, novo — o texto do piloto pediu)
// Coração do modo `manifesto`: revela uma linha por vez, com atraso em
// cascata, conforme o leitor rola. Cada linha tem seu próprio range de
// entrada via animation-timeline: view() (scrolly.css); o `--i` soma um
// pequeno delay extra por posição para acentuar a cascata.
// =============================================================================

import { withTbf } from '@/lib/tbf-text'

interface LineCascadeProps {
  lines: string[]
  /** Índices (0-based) que ganham destaque de escala média — TIER 2 do roteiro. */
  emphasize?: number[]
}

export function LineCascade({ lines, emphasize = [] }: LineCascadeProps) {
  return (
    <div className="scrolly-cascade">
      {lines.map((line, i) => (
        <p
          key={i}
          className={`scrolly-cascade__line${emphasize.includes(i) ? ' scrolly-cascade__line--emphasis' : ''}`}
          style={{ ['--i' as string]: i % 6 }}
        >
          {withTbf(line)}
        </p>
      ))}
    </div>
  )
}
