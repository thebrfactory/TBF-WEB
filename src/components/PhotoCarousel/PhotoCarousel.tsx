import Image from 'next/image'
import Link from 'next/link'

const SLIDE1 = [
  '/images/slide1/01.webp', '/images/slide1/02.webp', '/images/slide1/03.webp',
  '/images/slide1/04.webp', '/images/slide1/05.webp', '/images/slide1/06.webp',
  '/images/slide1/07.webp', '/images/slide1/08.webp', '/images/slide1/09.webp',
  '/images/slide1/10.webp',
]

// Matéria associada a cada slide — usada para o link + o título que aparece no
// hover/toque. Um pool de matérias é distribuído (cíclico) sobre as fotos.
export interface CarouselArticle {
  title: string
  href: string
}

interface Props {
  photos?: string[]
  articles?: CarouselArticle[]
  href?: string
}

// Carrossel ÚNICO (mobile = desktop): auto-scroll contínuo (NÃO pausa no hover)
// + cada item clicável. Ao passar o cursor/dedo, a imagem escurece e revela o
// título da matéria (Brother bold) centralizado no card.
export function PhotoCarousel({ photos = SLIDE1, articles, href = '/editorial' }: Props) {
  const hasArticles = !!articles && articles.length > 0

  // Cada foto ganha (ciclicamente) uma matéria do pool.
  const slides = photos.map((src, i) => {
    const article = hasArticles ? articles![i % articles!.length] : undefined
    return { src, title: article?.title, href: article?.href ?? href }
  })

  // Duplica a lista para o loop infinito (translateX 0 → -50% emenda sem corte).
  const loop = [...slides, ...slides]

  return (
    <section aria-label="Photo gallery" style={{ background: '#000000' }}>
      <div className="carousel">
        <ul className="carousel-track" role="list">
          {loop.map((slide, i) => (
            <li key={i} className="carousel-slide">
              <Link
                href={slide.href}
                className="carousel-slide__link"
                aria-label={slide.title ?? 'Enter the Magazine'}
              >
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 22vw, 72vw"
                  style={{ objectFit: 'cover', filter: 'grayscale(15%)' }}
                />
                <span className="carousel-slide__overlay" aria-hidden="true">
                  {slide.title && (
                    <span className="carousel-slide__title">{slide.title}</span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
