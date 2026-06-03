import Image from 'next/image'

const SLIDE1 = [
  '/images/slide1/01.webp', '/images/slide1/02.webp', '/images/slide1/03.webp',
  '/images/slide1/04.webp', '/images/slide1/05.webp', '/images/slide1/06.webp',
  '/images/slide1/07.webp', '/images/slide1/08.webp', '/images/slide1/09.webp',
  '/images/slide1/10.webp',
]

interface Props {
  photos?: string[]
}

export function PhotoCarousel({ photos = SLIDE1 }: Props) {
  const loop = [...photos, ...photos]
  return (
    <section aria-hidden="true" style={{ overflow: 'hidden', background: '#000000' }}>
      <div className="carousel-track">
        {loop.map((src, i) => (
          <div key={i} className="carousel-slide">
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width:1024px) 25vw, 50vw"
              style={{ objectFit: 'cover', filter: 'grayscale(15%)' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
