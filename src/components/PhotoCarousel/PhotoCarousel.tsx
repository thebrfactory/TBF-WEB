import Image from 'next/image'

const SLIDE1 = [
  '/images/slide1/01.png', '/images/slide1/02.png', '/images/slide1/03.png',
  '/images/slide1/04.png', '/images/slide1/05.png', '/images/slide1/06.png',
  '/images/slide1/07.png', '/images/slide1/08.png', '/images/slide1/09.png',
  '/images/slide1/10.png',
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
