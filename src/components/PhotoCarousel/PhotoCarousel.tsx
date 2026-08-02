import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArticleMorphLink } from '@/components/PageTransition/ArticleMorphLink'

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
  /** Rótulo de acessibilidade do slide sem matéria atrelada, no idioma da rota. */
  fallbackLabel?: string
}

// VELOCIDADE ≠ DURAÇÃO. A animação percorre sempre uma cópia inteira do trilho,
// então com duração fixa um carrossel de 7 fotos anda mais devagar que um de 10:
// mesma duração, distâncias diferentes. Para os dois terem a MESMA velocidade,
// a duração é proporcional ao número de fotos. A referência é o primeiro
// carrossel da home (10 fotos em 24s, ver --tbf-carousel-duration), o que dá
// 2.4s por foto — e é essa cadência que todos herdam.
const SECONDS_PER_SLIDE = 2.4

// Carrossel ÚNICO (mobile = desktop): auto-scroll contínuo (NÃO pausa no hover)
// + cada item clicável. Ao passar o cursor/dedo, a imagem escurece e revela o
// título da matéria (Brother bold) centralizado no card.
// `fallbackLabel` chega por propriedade, e não de useLang(), para este
// componente seguir sendo de SERVIDOR: chamar um hook de cliente aqui derruba a
// pré-renderização da home inteira (custou um build quebrado na Vercel).
export function PhotoCarousel({ photos = SLIDE1, articles, href = '/editorial', fallbackLabel = 'Enter the Magazine' }: Props) {
  const hasArticles = !!articles && articles.length > 0
  const duration = `${(photos.length * SECONDS_PER_SLIDE).toFixed(2)}s`

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
        <ul
          className="carousel-track"
          role="list"
          style={{ '--tbf-carousel-duration': duration } as CSSProperties}
        >
          {loop.map((slide, i) => {
            const isArticle = slide.href.startsWith('/editorial/')
            const LinkTag = isArticle ? ArticleMorphLink : Link
            return (
              <li key={i} className="carousel-slide">
                <LinkTag
                  href={slide.href}
                  className="carousel-slide__link"
                  aria-label={slide.title ?? fallbackLabel}
                >
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 18vw, 58vw"
                    style={{ objectFit: 'cover', filter: 'grayscale(15%)' }}
                  />
                  <span className="carousel-slide__overlay" aria-hidden="true">
                    {slide.title && (
                      <span className="carousel-slide__title">{slide.title}</span>
                    )}
                  </span>
                </LinkTag>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
