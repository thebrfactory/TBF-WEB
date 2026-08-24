// Gerador ÚNICO de imagem social, em URL ESTÁVEL (/og).
// Existe porque o convention file `opengraph-image.tsx` tem URL hasheada e some
// quando uma página de segmento filho declara `openGraph` próprio. Medido:
// /manifesto declarava openGraph e saía sem og:image nenhum.
//
// COMPOSIÇÃO CENTRALIZADA, e o motivo é o WhatsApp.
// O card sai 1200x630, mas o WhatsApp (e o Telegram, e o preview pequeno do
// iMessage) recorta um QUADRADO do centro: sobram os 630px do meio, de x=285
// a x=915. A versão anterior alinhava tudo no canto inferior esquerdo e o
// recorte comia o nome da casa, que chegava ao destinatário como
// "RAZILIANFACTORY". Tudo que precisa ser lido mora agora dentro da faixa
// central de 560px (SAFE_W); o resto da largura é só respiro.

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const SAFE_W = 560

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          position: 'relative',
        }}
      >
        {/* Glow ambiente, agora atrás do bloco central */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '760px',
            height: '560px',
            background:
              'radial-gradient(ellipse at center, rgba(200,169,106,0.14) 0%, transparent 70%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: `${SAFE_W}px`,
          }}
        >
          {/* Tag .TBF. */}
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#6E6B67',
              marginBottom: '28px',
              textAlign: 'center',
            }}
          >
            São Paulo, Brasil · Est. 2025
          </p>

          {/* O NOME DA CASA, EM DUAS LINHAS DE VERDADE.
              O Satori, que é quem desenha esta imagem, NÃO honra <br />: com
              ele as duas linhas colavam e o card saía ".THE BRAZILIANFACTORY.".
              Duas <div> numa coluna flex é a forma que o Satori entende. */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily: 'sans-serif',
              fontSize: '68px',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#F0EDE6',
              marginBottom: '28px',
              textAlign: 'center',
            }}
          >
            <div>.THE BRAZILIAN</div>
            <div>FACTORY.</div>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontFamily: 'serif',
              fontSize: '20px',
              fontWeight: 300,
              lineHeight: 1.4,
              /* Era #4A4744 sobre preto: 2,37:1, praticamente invisível no card.
                 Continua recuado, mas agora aparece. Isto é a cor DESTA imagem,
                 não o token do site. */
              color: '#8A8681',
              marginBottom: '36px',
              textAlign: 'center',
            }}
          >
            Culture™ Crafted in São Paulo. Consumed Worldwide.
          </p>

          {/* Acento âmbar. Estava no canto superior direito, fora do recorte
              quadrado; entrou na faixa central para sobreviver ao WhatsApp. */}
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#C8A96A',
              textAlign: 'center',
            }}
          >
            thebrfactory.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
