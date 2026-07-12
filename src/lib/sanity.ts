// =============================================================================
// SANITY CLIENT — TBF WEB 2026
// Cliente Sanity + GROQ queries principais
// =============================================================================

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// ─── Client Configuration (lazy) ──────────────────────────────────────────────

let _client: ReturnType<typeof createClient> | null = null

function getClient() {
  if (_client) return _client
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  _client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2026-05-31',
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_TOKEN,
  })
  return _client
}

// ─── Image URL Builder ────────────────────────────────────────────────────────

export function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(getClient()).image(source)
}

// ─── Fetch Helper ─────────────────────────────────────────────────────────────

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return getClient().fetch<T>(query, params, {
    next: { revalidate: 3600 },
  })
}

// ─── Image Fragment ───────────────────────────────────────────────────────────

const IMAGE_FIELDS = `
  asset->,
  hotspot,
  crop,
  alt,
  caption,
  credit
`

// ─── Post Card Fragment ───────────────────────────────────────────────────────

const POST_CARD_FIELDS = `
  _id,
  title,
  titleEn,
  slug,
  deck,
  category,
  bu,
  heroImage { ${IMAGE_FIELDS} },
  cardRatio,
  publishedAt,
  featured,
  author-> {
    _id,
    name,
    slug,
    portrait { ${IMAGE_FIELDS} },
    instagramHandle
  },
  tags[]-> {
    _id,
    label,
    labelEn,
    slug,
    scope
  }
`

// ─── QUERIES ─────────────────────────────────────────────────────────────────

// Homepage: featured + latest editorial posts
export const HOMEPAGE_QUERY = `{
  "featuredPost": *[_type == "editorialPost" && status == "published" && featured == true] | order(publishedAt desc) [0] {
    ${POST_CARD_FIELDS}
  },
  "latestPosts": *[_type == "editorialPost" && status == "published" && featured != true] | order(publishedAt desc) [0...3] {
    ${POST_CARD_FIELDS}
  },
  "siteSettings": *[_type == "siteSettings"][0] {
    siteTitle,
    tickerText,
    collectiveApplicationOpen,
    instagramHandles,
    ogImage { ${IMAGE_FIELDS} }
  }
}`

// Editorial list page
export const EDITORIAL_LIST_QUERY = `*[_type == "editorialPost" && status == "published"] | order(publishedAt desc) {
  ${POST_CARD_FIELDS}
}`

// Editorial list filtered by category
export const EDITORIAL_BY_CATEGORY_QUERY = `*[_type == "editorialPost" && status == "published" && category == $category] | order(publishedAt desc) {
  ${POST_CARD_FIELDS}
}`

// Single article by slug
export const ARTICLE_QUERY = `*[_type == "editorialPost" && slug.current == $slug][0] {
  _id,
  title,
  titleEn,
  slug,
  deck,
  deckEn,
  category,
  bu,
  heroImage { ${IMAGE_FIELDS} },
  heroVideo,
  body,
  bodyEn,
  credits[] {
    _key,
    role,
    name,
    handle
  },
  author-> {
    _id,
    name,
    slug,
    portrait { ${IMAGE_FIELDS} },
    instagramHandle,
    websiteUrl
  },
  tags[]-> {
    _id,
    label,
    labelEn,
    slug
  },
  relatedPosts[]-> {
    ${POST_CARD_FIELDS}
  },
  metaDescription,
  ogImage { ${IMAGE_FIELDS} },
  publishedAt,
  featured,
  status
}`

// All article slugs for generateStaticParams
export const ARTICLE_SLUGS_QUERY = `*[_type == "editorialPost" && status == "published"] {
  "slug": slug.current
}`

// Factory page
export const FACTORY_QUERY = `*[_type == "tgfProgram" && active == true] | order(order asc) {
  _id,
  name,
  slug,
  tagline,
  description,
  targetAudience,
  deliverables,
  pricing,
  ctaLabel,
  ctaUrl,
  order
}`

// Site settings
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  siteTitle,
  defaultMetaDescription,
  tickerText,
  collectiveApplicationOpen,
  instagramHandles,
  ogImage { ${IMAGE_FIELDS} }
}`

// Melfiore entries
export const MELFIORE_QUERY = `*[_type == "melfioreEntry"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  entryType,
  body,
  heroImage { ${IMAGE_FIELDS} },
  productName,
  productStatus,
  productLink,
  publishedAt,
  tags[]-> { _id, label, slug }
}`

// Fashion films (Runway)
export const RUNWAY_QUERY = `*[_type == "fashionFilm"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  contentType,
  cloudflareStreamId,
  thumbnailImage { ${IMAGE_FIELDS} },
  deck,
  credits[] { _key, role, name, handle, brand },
  season,
  collaboratingBrands,
  publishedAt,
  featured
}`

// Collective members (featured)
export const COLLECTIVE_FEATURED_QUERY = `*[_type == "collectiveMember" && featured == true && status == "active"] | order(memberSince desc) {
  _id,
  name,
  slug,
  role,
  bu,
  portrait { ${IMAGE_FIELDS} },
  instagramHandle
}`

// ISR revalidate tags
export const REVALIDATE_TAGS = {
  editorialPost: 'editorial-post',
  melfioreEntry: 'melfiore-entry',
  fashionFilm: 'fashion-film',
  tgfProgram: 'tgf-program',
  siteSettings: 'site-settings',
  collectiveMember: 'collective-member',
} as const
