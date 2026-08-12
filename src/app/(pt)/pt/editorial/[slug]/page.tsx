// Rota portuguesa da matéria individual.
// A página vive em src/views/ArticleView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import ArticleView from '@/views/ArticleView'
import { sanityFetch, ARTICLE_QUERY, ARTICLE_SLUGS_QUERY, urlFor } from '@/lib/sanity'
import type { EditorialPost } from '@/types'
import { theDayBrazilStoppedTranslatingItself } from '@/content/articles/the-day-brazil-stopped-translating-itself'
import { languageAlternates } from '@/lib/i18n'
import { OG_IMAGE_PATH } from '@/lib/og'

const LANG = 'pt' as const

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>(ARTICLE_SLUGS_QUERY)
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const alternates = languageAlternates(`/editorial/${slug}`)

  // O piloto do motor scrolly vive fora do Sanity, então tem o próprio ramo de
  // metadados: o texto sai do arquivo da matéria, já bilíngue.
  if (slug === theDayBrazilStoppedTranslatingItself.slug) {
    const a = theDayBrazilStoppedTranslatingItself
    return {
      title: a.heroTitle[LANG],
      description: a.deck[LANG],
      alternates,
      openGraph: {
        title: a.heroTitle[LANG],
        description: a.deck[LANG],
        images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630 }],
        type: 'article',
        publishedTime: a.publishedAt,
      },
      twitter: {
        card: 'summary_large_image',
        title: a.heroTitle[LANG],
        description: a.deck[LANG],
        images: [OG_IMAGE_PATH],
      },
    }
  }

  try {
    const post = await sanityFetch<EditorialPost>(ARTICLE_QUERY, { slug })
    if (!post) return { alternates }

    const ogImageUrl = post.ogImage
      ? urlFor(post.ogImage).width(1200).height(630).url()
      : post.heroImage
      ? urlFor(post.heroImage).width(1200).height(630).url()
      : undefined

    return {
      title: post.title,
      description: post.metaDescription ?? post.deck,
      alternates,
      openGraph: {
        title: post.title,
        description: post.metaDescription ?? post.deck,
        images: [
          ogImageUrl
            ? { url: ogImageUrl, width: 1200, height: 630 }
            : { url: OG_IMAGE_PATH, width: 1200, height: 630 },
        ],
        type: 'article',
        publishedTime: post.publishedAt,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.metaDescription ?? post.deck,
        images: [ogImageUrl ?? OG_IMAGE_PATH],
      },
    }
  } catch {
    return { alternates }
  }
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <ArticleView params={params} lang={LANG} />
}
