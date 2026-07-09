// =============================================================================
// TICKER — TBF WEB 2026
// CSS puro — zero JavaScript | aria-hidden="true" obrigatório
// Sticky abaixo do nav | Loop seamless via texto duplicado
// =============================================================================

interface TickerProps {
  text?: string
}

const DEFAULT_TEXT =
  '.THE BRAZILIAN FACTORY. · COLLECTIVE HOTEL CASINO · ONLY FOR ARTISTS & CHANGEMAKERS · EST. 2025 · GESTÃO EM SÃO PAULO · GOIÂNIA · SALVADOR ·'

export function Ticker({ text = DEFAULT_TEXT }: TickerProps) {
  return (
    <div
      className="ticker"
      aria-hidden="true"
      role="presentation"
    >
      <div className="ticker__track">
        {/* Texto duplicado para loop seamless via CSS */}
        <span className="ticker__item">{text}</span>
        <span className="ticker__item" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  )
}
