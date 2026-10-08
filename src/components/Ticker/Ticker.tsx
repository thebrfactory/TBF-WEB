// =============================================================================
// TICKER · TBF WEB 2026
// CSS puro, zero JavaScript | aria-hidden="true" obrigatório
// Sticky abaixo do nav | Loop seamless via texto duplicado
// -----------------------------------------------------------------------------
// O LETREIRO PASSOU A TER DUAS VOZES (#01 CHANGES 2026-08-24). Antes era uma
// string só, num peso só. O fundador escreveu o conteúdo novo já com o peso ao
// lado de cada pedaço (".THE BRAZILIAN FACTORY. em black, HOTEL & CASINO em
// book, ..."), então o texto deixou de ser uma frase e virou uma SEQUÊNCIA de
// segmentos com peso próprio.
//
// A `prop` antiga `text` continua aceita: uma string vira um segmento único no
// peso padrão. Nenhum call site quebra por causa disto.
// =============================================================================

/** Pesos disponíveis. Nomes da família Brother1816, que é a fonte da casa. */
type TickerWeight = 'book' | 'medium' | 'black'

export interface TickerSegment {
  text: string
  weight?: TickerWeight
}

interface TickerProps {
  /** Conteúdo. String vira um segmento no peso padrão; lista dá peso por pedaço. */
  text?: string | TickerSegment[]
  /** Letreiro pinado abaixo do nav (padrão) ou correndo no fluxo da página.
   *  O segundo caso é o letreiro de cidades do rodapé. */
  sticky?: boolean
  /** Classe extra no invólucro, para variantes de escala/altura. */
  className?: string
  /** Cópias por metade do trilho. Metade do trilho precisa ser MAIS LARGA que a
   *  tela: conteúdo curto (cidades) pede mais cópias. Padrão 3. */
  repeat?: number
}

// O LETREIRO DA CASA, escrito pelo fundador em #01 CHANGES 2026-08-24. Ele vale
// para o site inteiro: quem chama <Ticker /> sem `text` recebe este.
// ATENÇÃO: "ARTISTS" está no plural e com a grafia certa. O briefing trazia
// "ARSTIST", erro de digitação evidente contra o que o site já publicava.
const DEFAULT_SEGMENTS: TickerSegment[] = [
  { text: '.THE BRAZILIAN FACTORY.', weight: 'black' },
  { text: 'HOTEL & CASINO', weight: 'book' },
  { text: '.ONLY FOR ARTISTS & CHANGEMAKERS.', weight: 'medium' },
  { text: 'THE CREATIVE NETWORK', weight: 'book' },
  { text: 'SÃO PAULO', weight: 'medium' },
  { text: 'BRAZIL', weight: 'book' },
  { text: 'GOIÂNIA', weight: 'medium' },
  { text: 'GOIÁS', weight: 'book' },
  { text: 'SALVADOR', weight: 'medium' },
  { text: 'BAHIA', weight: 'book' },
]

// Cópias por volta. Uma volta precisa ser MAIS LARGA que a tela, senão sobra um
// vão vazio correndo no letreiro (com 2 cópias, uma media ~1311px e já falhava
// num monitor de 1440px). Com 3, a volta passa de 3900px e cobre ultrawide.
// O trilho anda de 0 a -50%, então o total é REPEAT * 2.
// Mexeu aqui? `--tbf-ticker-duration` multiplica a duração base por REPEAT para
// manter a MESMA velocidade em px/s. Os dois números andam juntos.
const REPEAT = 3

export function Ticker({ text = DEFAULT_SEGMENTS, sticky = true, className = '', repeat = REPEAT }: TickerProps) {
  const copies = Array.from({ length: repeat * 2 })
  const segmentos: TickerSegment[] = typeof text === 'string' ? [{ text }] : text

  return (
    <div
      className={`ticker${sticky ? '' : ' ticker--flow'}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
      role="presentation"
      style={repeat === REPEAT ? undefined : ({ '--ticker-scale': repeat / REPEAT } as React.CSSProperties)}
    >
      <div className="ticker__track">
        {/* Sequência repetida e depois duplicada: 50% do trilho é exatamente uma
            volta, que é o que faz o loop não ter costura. */}
        {copies.map((_, i) => (
          <span className="ticker__item" key={i}>
            {/* SEM SEPARADOR ENTRE OS SEGMENTOS (2026-08-24: "em momento nenhum
                pedi pra colocar esses pontos"). O que separa um do outro agora é
                só o respiro, e ele é o MESMO em toda emenda, inclusive na volta
                do loop: cada segmento carrega a folga à direita e o item deixou
                de carregar a dele. Cell uniforme é o que faz 50% do trilho valer
                exatamente uma cópia, que é o que tira a costura. */}
            {segmentos.map((seg, j) => (
              <span
                key={j}
                className={`ticker__seg${seg.weight ? ` ticker__seg--${seg.weight}` : ''}`}
              >
                {seg.text}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
