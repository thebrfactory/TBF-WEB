import Image from 'next/image'

// Wordmarks de imprensa — carrossel infinito com sombreado nas bordas simulando
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

const TBF_OVERLAY_ASSETS = [
  '/brand/press/tbf-overlay-01.svg',
  '/brand/press/tbf-overlay-02.svg',
  '/brand/press/tbf-overlay-03.svg',
]

export function PressLogosCarousel() {
  const loop = [...PRESS_LOGOS, ...PRESS_LOGOS]

  return (
    <div className="press-carousel" aria-label="Featured in">
      <ul className="press-carousel-track" role="list">
        {loop.map((src, i) => (
          <li key={i} className="press-carousel-slide" aria-hidden={i >= PRESS_LOGOS.length}>
            <Image
              src={src}
              alt={i < PRESS_LOGOS.length ? '' : ''}
              width={200}
              height={80}
              style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'invert(1)', opacity: 0.85 }}
            />
          </li>
        ))}
      </ul>

      {/* Camada de assets .TBF. sobreposta — decorativa, persistente sobre o loop infinito */}
      <div className="press-carousel__overlay" aria-hidden="true">
        {TBF_OVERLAY_ASSETS.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={78}
            height={157}
            style={{
              height: 'clamp(56px, 9vw, 96px)',
              width: 'auto',
              filter: 'invert(1)',
              opacity: 0.14,
              marginInline: 'clamp(0.5rem, 2vw, 1.5rem)',
              transform: i === 1 ? 'scale(1.15)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  )
}
