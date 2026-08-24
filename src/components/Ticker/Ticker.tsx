// =============================================================================
// TICKER · TBF WEB 2026
// CSS puro, zero JavaScript | aria-hidden="true" obrigatório
// Sticky abaixo do nav | Loop seamless via texto duplicado
// -----------------------------------------------------------------------------
// O LETREIRO PASSOU A TER DUAS VOZES (#01 CHANGES 2026-08-24). Antes era uma
// string só, num peso só. O fundador escreveu o conteúdo novo já com o peso ao
// lado de cada pedaço (".THE BRAZILIAN FACTORY. em black, HOTEL & CASINO em
// thin, ..."), então o texto deixou de ser uma frase e virou uma SEQUÊNCIA de
// segmentos com peso próprio.
//
// A `prop` antiga `text` continua aceita: uma string vira um segmento único no
// peso padrão. Nenhum call site quebra por causa disto.
// =============================================================================

/** Pesos disponíveis. Nomes da família Brother1816, que é a fonte da casa. */
type TickerWeight = 'thin' | 'medium' | 'black'

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
}

// O LETREIRO DA CASA, escrito pelo fundador em #01 CHANGES 2026-08-24. Ele vale
// para o site inteiro: quem chama <Ticker /> sem `text` recebe este.
// ATENÇÃO: "ARTISTS" está no plural e com a grafia certa. O briefing trazia
// "ARSTIST", erro de digitação evidente contra o que o site já publicava.
const DEFAULT_SEGMENTS: TickerSegment[] = [
  { text: '.THE BRAZILIAN FACTORY.', weight: 'black' },
  { text: 'HOTEL & CASINO', weight: 'thin' },
  { text: '.ONLY FOR ARTISTS & CHANGEMAKERS.', weight: 'medium' },
  { text: 'THE CREATIVE NETWORK', weight: 'thin' },
  { text: 'SÃO PAULO', weight: 'medium' },
  { text: 'BRAZIL', weight: 'thin' },
  { text: 'GOIÂNIA', weight: 'medium' },
  { text: 'GOIÁS', weight: 'thin' },
  { text: 'SALVADOR', weight: 'medium' },
  { text: 'BAHIA', weight: 'thin' },
]

// Cópias por volta. Uma volta precisa ser MAIS LARGA que a tela, senão sobra um
// vão vazio correndo no letreiro (com 2 cópias, uma media ~1311px e já falhava
// num monitor de 1440px). Com 3, a volta passa de 3900px e cobre ultrawide.
// O trilho anda de 0 a -50%, então o total é REPEAT * 2.
// Mexeu aqui? `--tbf-ticker-duration` multiplica a duração base por REPEAT para
// manter a MESMA velocidade em px/s. Os dois números andam juntos.
const REPEAT = 3

export function Ticker({ text = DEFAULT_SEGMENTS, sticky = true, className = '' }: TickerProps) {
  const copies = Array.from({ length: REPEAT * 2 })
  const segmentos: TickerSegment[] = typeof text === 'string' ? [{ text }] : text

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
            {segmentos.map((seg, j) => (
              <span key={j}>
                <span className={`ticker__seg${seg.weight ? ` ticker__seg--${seg.weight}` : ''}`}>
                  {seg.text}
                </span>
                {/* O ponto separador é nó próprio: ele não pertence a nenhum dos
                    dois pesos vizinhos e por isso corre no peso padrão. */}
                <span className="ticker__sep"> · </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
