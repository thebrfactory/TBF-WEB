// =============================================================================
// ARTICLE CARD — TBF WEB 2026
// Variantes: featured (8col) / standard (4col)
// Hover: scale imagem + translateX título
// =============================================================================

import Link from 'next/link'
import Image from 'next/image'
import type { ArticleCardProps } from '@/types'
import { urlFor } from '@/lib/sanity'
import { ThumbSpec, thumbDimensions, THUMB_RATIO_FALLBACK } from '@/components/ThumbSpec/ThumbSpec'

const CATEGORY_LABELS: Record<string, string> = {
  'fashion-film': 'Fashion Film',
  editorial: 'Editorial',
  manifesto: 'Manifesto',
  coolhunting: 'Coolhunting',
  collaboration: 'Colaboração',
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}

export function ArticleCard({ post, variant = 'standard' }: ArticleCardProps) {
  const isFeatured = variant === 'featured'
  const cardClass = `card ${isFeatured ? 'card--featured' : 'card--standard'}`
  const ratio = post.cardRatio ?? THUMB_RATIO_FALLBACK
  // A imagem é pedida ao Sanity já no formato final (respeita o hotspot, sem
  // crop no chute), e são os MESMOS números que o selo de dimensão anuncia
  // enquanto a capa não existe.
  const dims = thumbDimensions(ratio)

  return (
    <Link
      href={`/editorial/${post.slug.current}`}
      className={cardClass}
      aria-label={post.title}
    >
      {/* Image: proporção vinda do CMS (cardRatio). Sem capa, o bloco vira
          parchment com o selo de dimensão (pedido). */}
      <div
        className={`card__image-wrapper${post.heroImage ? '' : ' card__image-wrapper--empty'}`}
        style={{ aspectRatio: ratio }}
      >
        {post.heroImage ? (
          <Image
            className="card__image"
            src={urlFor(post.heroImage)
              .width(dims.w)
              .height(dims.h)
              .fit('crop')
              .auto('format')
              .url()}
            alt={post.heroImage.alt ?? post.title}
            width={dims.w}
            height={dims.h}
            loading="lazy"
            sizes="(min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <ThumbSpec ratio={ratio} />
        )}
      </div>

      {/* Content */}
      <div className="card__content">
        {/* Tags */}
        <div className="card__tags">
          {post.category && (
            <span className="tag tag--category">
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
          )}
          {post.tags?.slice(0, 1).map((tag) => (
            <span key={tag._id} className="tag tag--bu">
              {tag.label}
            </span>
          ))}
        </div>

        {/* Title */}
        {isFeatured ? (
          <h2 className="card__title">{post.title}</h2>
        ) : (
          <h3 className="card__title">{post.title}</h3>
        )}

        {/* Byline */}
        <div
          className={`byline ${post.author?.portrait ? 'byline--with-portrait' : ''}`}
        >
          {post.author?.portrait && (
            <Image
              className="byline__portrait"
              src={urlFor(post.author.portrait)
                .width(80)
                .height(80)
                .fit('crop')
                .url()}
              alt={post.author.name}
              width={40}
              height={40}
            />
          )}
          <span className="byline__text">
            {post.author ? (
              <>
                Por{' '}
                <span className="byline__link">{post.author.name}</span>
                {' · '}
              </>
            ) : null}
            <span className="card__meta">{formatDate(post.publishedAt)}</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
