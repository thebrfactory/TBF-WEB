import Image from 'next/image'

// Wordmarks de imprensa: carrossel infinito com sombreado nas bordas simulando
// o fim de um trilho, mas na verdade é um loop contínuo (mesma técnica do
// PhotoCarousel: lista duplicada + translateX 0 → -50%).
const PRESS_LOGOS = [
  '/brand/press/032c.svg',
  '/brand/press/a24.svg',
  '/brand/press/dazed.svg',
  '/brand/press/i-d.svg',
  '/brand/press/hypebeast.svg',
  '/brand/press/interview.svg',
  '/brand/press/highsnobiety.svg',
  '/brand/press/msch.svg',
]

// ─── Assets .TBF. sobrepostos ao trilho ──────────────────────────────────────
// Vão INLINE, não via <Image>, por fidelidade de forma: cada asset tem o seu
// próprio viewBox e o <Image> forçava 78×157 em todos. No burst central (asset
// #03, que é quadrado, 111.99x111.7) isso esmagava a estrela num borrão
// vertical. Inline, cada `viewBox` manda no aspecto e o desenho sai idêntico ao
// vetor de origem (`CHANGES/PITCH/#00 #0N TBF.svg`).
// Ordem visual: swoosh esquerdo · burst central · swoosh direito.
//
// O BURST VOLTOU (2026-07-31, pedido do fundador). Ele tinha saído porque
// ficava parado no meio do frame enquanto o trilho corria por baixo e, a cada
// volta, engolia um wordmark inteiro. A solução não é tirar a marca, é dar
// calha a ela: o trilho agora são DUAS metades independentes, com um vão no
// meio onde só o burst mora (ver .press-carousel--half no CSS). Nada mais passa
// por trás de marca nenhuma.
const OVERLAY_SHAPES = [
  {
    key: 'swoosh-left',
    viewBox: '0 0 77.84 157',
    d: 'M0,78.5C20.29,54.87,25.32,21.39,46.86,1.15c8.62,2.8,21.46-2.48,30.97-.83-21.78,19.8-27.97,55.92-45.01,78.17h0c17.04,22.26,23.23,58.38,45.01,78.18-9.51,1.64-22.35-3.63-30.97-.83C25.32,135.61,20.29,102.13,0,78.5h0,0Z',
  },
  {
    key: 'burst',
    viewBox: '0 0 111.99 111.7',
    d: 'M84.51,75.75c6.01,4.24,11.73,8.97,17.34,14.19-14.38,1.87-27.78,2.16-39.6.19,1.18,6.99,1.87,14.19,2.27,21.58-11.23-8.77-20.69-17.93-27.48-27.58-4.24,5.91-8.96,11.72-14.18,17.24-1.87-14.09-2.07-27.28-.1-38.9-7.29,1.28-14.88,1.97-22.75,2.26,9.06-11.62,18.42-21.47,28.37-28.56-5.71-4.04-11.33-8.57-16.65-13.69,14.08-1.77,27.18-1.97,38.81,0-1.28-7.19-1.97-14.78-2.27-22.46,11.43,8.86,21.08,18.03,27.97,27.88,4.14-5.91,8.77-11.52,13.99-17.04,1.77,14.38,2.07,27.78,0,39.6,6.99-1.18,14.28-1.97,21.77-2.27-8.76,11.23-17.82,20.69-27.48,27.58Z',
  },
  {
    key: 'swoosh-right',
    viewBox: '0 0 77.84 157',
    d: 'M77.84,78.5c-20.29,23.63-25.32,57.11-46.86,77.34-8.62-2.8-21.46,2.48-30.97.83,21.78-19.8,27.97-55.92,45.01-78.17h0C27.97,56.25,21.78,20.13,0,.32c9.51-1.64,22.35,3.63,30.97.83,21.55,20.23,26.57,53.72,46.86,77.35h0,0Z',
  },
] as const

// QUATRO cópias, não duas. A animação anda 50% do trilho: com duas cópias esse
// percurso é uma cópia só (1408px) e, numa tela de 1920px, no fim do ciclo o
// trilho já tinha saído do quadro — sobrava um rombo preto depois do último
// logo (o msch, o "!!!"). Era esse o buraco. Com quatro cópias o percurso vira
// 2816px, maior que qualquer tela que o site atende, e a costura some. A
// duração dobrou junto em tokens.css para a velocidade não mudar.
const COPIES = 4

export function PressLogosCarousel() {
  const loop = Array.from({ length: COPIES }, () => PRESS_LOGOS).flat()

  return (
    // O `overflow: hidden` que faz o trilho rolar sem vazar vive AGORA só no
    // .press-carousel. A camada de assets .TBF. é irmã dele, dentro do frame sem
    // clipping: os marcadores são mais altos que a faixa de logos e antes tinham
    // as pontas decepadas pelo overflow: era a "forma esquisita" do pedido.
    <div className="press-carousel-frame" aria-label="Featured in">
      {/* UM trilho só. A calha dos três assets é feita por MÁSCARA (ver
          .press-carousel no CSS): o trilho continua correndo inteiro por baixo,
          mas fica transparente onde cada marca .TBF. mora. Duas metades de DOM,
          que foi a primeira tentativa, mostravam o mesmo wordmark dos dois lados
          do burst — duas janelas do mesmo loop sempre se sobrepõem. */}
      <div className="press-carousel">
        <ul className="press-carousel-track" role="list">
          {loop.map((src, i) => (
            <li key={i} className="press-carousel-slide" aria-hidden={i >= PRESS_LOGOS.length}>
              <Image
                src={src}
                alt=""
                width={200}
                height={80}
                style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'invert(1)', opacity: 0.85 }}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Camada de assets .TBF. sobreposta: decorativa, persistente sobre o
          loop infinito. Branco chapado + a sombra sutil (a única coisa que o
          fundador quis manter do tratamento anterior). */}
      <div className="press-carousel__overlay" aria-hidden="true">
        {OVERLAY_SHAPES.map((shape) => (
          <svg
            key={shape.key}
            viewBox={shape.viewBox}
            role="presentation"
            className="press-carousel__mark"
            style={{ marginInline: 0 }}
          >
            <path d={shape.d} fill="var(--tbf-color-parchment)" />
          </svg>
        ))}
      </div>
    </div>
  )
}
