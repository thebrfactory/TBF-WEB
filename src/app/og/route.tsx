// Gerador ÚNICO de imagem social, em URL ESTÁVEL (/og).
// Existe porque o convention file `opengraph-image.tsx` tem URL hasheada e some
// quando uma página de segmento filho declara `openGraph` próprio — medido:
// /manifesto declarava openGraph e saía sem og:image nenhum.

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#000000',
          padding: '64px',
          position: 'relative',
        }}
      >
        {/* Glow ambiente */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '50%',
            background: 'radial-gradient(ellipse at bottom center, rgba(200,169,106,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Tag .TBF. */}
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#6E6B67',
            marginBottom: '24px',
          }}
        >
          São Paulo, Brasil · Est. 2025
        </p>

        {/* Título */}
        {/* O NOME DA CASA, EM DUAS LINHAS DE VERDADE.
            Antes era `.THE BRAZILIAN<br />FACTORY.` — e o Satori, que é quem
            desenha esta imagem, NÃO honra <br />. As duas linhas colavam e o
            card social saía escrito ".THE BRAZILIANFACTORY.", sem o espaço:
            o nome da marca errado no ativo mais compartilhado do site.
            Duas <div> numa coluna flex é a forma que o Satori entende. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'sans-serif',
            fontSize: '80px',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: '#F0EDE6',
            marginBottom: '32px',
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
            /* Era #4A4744 sobre preto: 2,37:1, praticamente invisível no card —
               conferido olhando o PNG gerado, não no papel. Continua recuado,
               mas agora aparece. Isto é a cor DESTA imagem, não o token do
               site: a paleta do site é decisão do fundador e segue de pé. */
            color: '#8A8681',
          }}
        >
          Culture™ Crafted in São Paulo. Consumed Worldwide.
        </p>

        {/* Acento âmbar */}
        <div
          style={{
            position: 'absolute',
            top: '64px',
            right: '64px',
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#C8A96A',
          }}
        >
          thebrfactory.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
