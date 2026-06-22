import Image from 'next/image'
import Link from 'next/link'

const SLIDE1 = [
  '/images/slide1/01.webp', '/images/slide1/02.webp', '/images/slide1/03.webp',
  '/images/slide1/04.webp', '/images/slide1/05.webp', '/images/slide1/06.webp',
  '/images/slide1/07.webp', '/images/slide1/08.webp', '/images/slide1/09.webp',
  '/images/slide1/10.webp',
]

interface Props {
  photos?: string[]
  href?: string
}

// Carrossel ÚNICO (mobile = desktop): auto-scroll contínuo + cada item clicável.
export function PhotoCarousel({ photos = SLIDE1, href = '/editorial' }: Props) {
  // Duplica a lista para o loop infinito (translateX 0 → -50% emenda sem corte).
  const loop = [...photos, ...photos]

  return (
    <section aria-label="Photo gallery" style={{ background: '#000000' }}>
      <div className="carousel">
        <ul className="carousel-track" role="list">
          {loop.map((src, i) => (
            <li key={i} className="carousel-slide">
              <Link href={href} className="carousel-slide__link" aria-label="Enter the Magazine">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 22vw, 72vw"
                  style={{ objectFit: 'cover', filter: 'grayscale(15%)' }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
