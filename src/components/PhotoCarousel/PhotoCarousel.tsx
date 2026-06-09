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

export function PhotoCarousel({ photos = SLIDE1, href = '/editorial' }: Props) {
  const loop = [...photos, ...photos]

  return (
    <section aria-label="Photo gallery" style={{ background: '#000000' }}>

      {/* Mobile: swipeable snap scroll — shown only on mobile */}
      <div className="carousel-mobile">
        {photos.map((src, i) => (
          <Link key={i} href={href} className="carousel-slide">
            <Image
              src={src}
              alt=""
              fill
              sizes="72vw"
              style={{ objectFit: 'cover', filter: 'grayscale(15%)' }}
            />
          </Link>
        ))}
      </div>

      {/* Desktop: infinite auto-scroll — hidden on mobile */}
      <div className="carousel-desktop" aria-hidden="true">
        <div className="carousel-track">
          {loop.map((src, i) => (
            <Link key={i} href={href} className="carousel-slide">
              <Image
                src={src}
                alt=""
                fill
                sizes="22vw"
                style={{ objectFit: 'cover', filter: 'grayscale(15%)' }}
              />
            </Link>
          ))}
        </div>
      </div>

    </section>
  )
}
