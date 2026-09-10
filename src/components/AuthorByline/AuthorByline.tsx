// =============================================================================
// AUTHOR BYLINE — TBF WEB 2026
// Com/sem portrait | Filho de Article Card e Article Header
// =============================================================================

import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { urlFor } from '@/lib/sanity'
import type { CollectiveMember } from '@/types'

interface AuthorBylineProps {
  author: Pick<CollectiveMember, 'name' | 'slug' | 'portrait' | 'instagramHandle'>
  publishedAt: string
  showPortrait?: boolean
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

export function AuthorByline({
  author,
  publishedAt,
  showPortrait = true,
}: AuthorBylineProps) {
  const hasPortrait = showPortrait && author.portrait

  return (
    <div className={`byline ${hasPortrait ? 'byline--with-portrait' : ''}`}>
      {hasPortrait && author.portrait && (
        <Image
          className="byline__portrait"
          src={urlFor(author.portrait).width(80).height(80).fit('crop').url()}
          alt={author.name}
          width={40}
          height={40}
        />
      )}
      <span className="byline__text">
        Por{' '}
        <Link
          href={`/mag?author=${author.slug.current}`}
          className="byline__link"
        >
          {author.name}
        </Link>
        {' · '}
        <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      </span>
    </div>
  )
}
