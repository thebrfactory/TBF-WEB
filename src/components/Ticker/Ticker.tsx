// =============================================================================
// TICKER · TBF WEB 2026
// CSS puro, zero JavaScript | aria-hidden="true" obrigatório
// Sticky abaixo do nav | Loop seamless via texto duplicado
// =============================================================================

interface TickerProps {
  text?: string
  /** Letreiro pinado abaixo do nav (padrão) ou correndo no fluxo da página —
   *  este segundo caso é o letreiro de cidades do rodapé. */
  sticky?: boolean
  /** Classe extra no invólucro, para variantes de escala/altura. */
  className?: string
}

const DEFAULT_TEXT =
  '.THE BRAZILIAN FACTORY. · COLLECTIVE HOTEL CASINO · ONLY FOR ARTISTS & CHANGEMAKERS · EST. 2025 · SÃO PAULO · GOIÂNIA · SALVADOR ·'

// Cópias por volta. Uma volta precisa ser MAIS LARGA que a tela, senão sobra um
// vão vazio correndo no letreiro (com 2 cópias, uma media ~1311px e já falhava
// num monitor de 1440px). Com 3, a volta passa de 3900px e cobre ultrawide.
// O trilho anda de 0 a -50%, então o total é REPEAT * 2.
// Mexeu aqui? `--tbf-ticker-duration` multiplica a duração base por REPEAT para
// manter a MESMA velocidade em px/s. Os dois números andam juntos.
const REPEAT = 3

export function Ticker({ text = DEFAULT_TEXT, sticky = true, className = '' }: TickerProps) {
  const copies = Array.from({ length: REPEAT * 2 })

  return (
    <div
      className={`ticker${sticky ? '' : ' ticker--flow'}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="ticker__track">
        {/* Sequência repetida e depois duplicada: 50% do trilho é exatamente uma
            volta, que é o que faz o loop não ter costura. */}
        {copies.map((_, i) => (
          <span className="ticker__item" key={i}>
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
