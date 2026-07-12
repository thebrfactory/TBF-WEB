// =============================================================================
// TYPES — TBF WEB 2026
// TypeScript types para todos os schemas Sanity (F02)
// =============================================================================

// ─── Sanity Base Types ───────────────────────────────────────────────────────

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
  caption?: string
  credit?: string
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityBlock {
  _type: 'block'
  _key: string
  style: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks: string[]
  }>
  markDefs: Array<{
    _type: string
    _key: string
    href?: string
  }>
}

export type SanityPortableText = SanityBlock[]

// ─── Tag Schema ──────────────────────────────────────────────────────────────

export interface Tag {
  _id: string
  _type: 'tag'
  label: string
  labelEn?: string
  slug: SanitySlug
  scope: 'tbf' | 'melfiore' | 'ruc' | 'all'
}

// ─── Collective Member Schema ─────────────────────────────────────────────────

export interface CollectiveMember {
  _id: string
  _type: 'collectiveMember'
  name: string
  slug: SanitySlug
  role: string
  bu?: 'tbf' | 'melfiore' | 'ruc' | 'tgf'
  bio?: SanityPortableText
  bioEn?: SanityPortableText
  portrait?: SanityImage
  instagramHandle?: string
  websiteUrl?: string
  memberSince?: string
  featured: boolean
  status: 'active' | 'collaborator' | 'alumni'
}

// ─── Editorial Post Schema ───────────────────────────────────────────────────

export type ArticleCategory =
  | 'fashion-film'
  | 'editorial'
  | 'manifesto'
  | 'coolhunting'
  | 'collaboration'

export type ArticleStatus =
  | 'draft'
  | 'review'
  | 'published'
  | 'archived'

export interface ArticleCredit {
  _key: string
  role: string
  name: string
  handle?: string
}

// Proporção da capa na galeria masonry (home). Fonte: campo cardRatio do CMS.
export type CardRatio = '3/4' | '2/3' | '1/1' | '4/3' | '3/2'

export interface EditorialPost {
  _id: string
  _type: 'editorialPost'
  title: string
  titleEn?: string
  slug: SanitySlug
  deck: string
  deckEn?: string
  category: ArticleCategory
  bu: 'tbf' | 'melfiore' | 'ruc' | 'tgf'
  heroImage: SanityImage
  cardRatio?: CardRatio
  heroVideo?: string // Cloudflare Stream ID
  body: SanityPortableText
  bodyEn?: SanityPortableText
  credits: ArticleCredit[]
  author?: CollectiveMember
  tags?: Tag[]
  relatedPosts?: EditorialPost[]
  metaDescription?: string
  ogImage?: SanityImage
  publishedAt: string
  featured: boolean
  status: ArticleStatus
}

// ─── Melfiore Entry Schema ───────────────────────────────────────────────────

export type MelfioreEntryType = 'fragment' | 'curation' | 'collection' | 'ritual'
export type ProductStatus = 'available' | 'coming-soon' | 'sold-out' | 'exclusive'

export interface MelfioreEntry {
  _id: string
  _type: 'melfioreEntry'
  title: string
  slug: SanitySlug
  entryType: MelfioreEntryType
  body: SanityPortableText
  heroImage?: SanityImage
  productName?: string
  productStatus?: ProductStatus
  productLink?: string
  publishedAt: string
  tags?: Tag[]
}

// ─── Fashion Film Schema ──────────────────────────────────────────────────────

export type FilmContentType = 'fashion-film' | 'backstage' | 'collaboration' | 'spfw'

export interface FilmCredit {
  _key: string
  role: string
  name: string
  handle?: string
  brand?: string
}

export interface FashionFilm {
  _id: string
  _type: 'fashionFilm'
  title: string
  slug: SanitySlug
  contentType: FilmContentType
  cloudflareStreamId?: string
  thumbnailImage: SanityImage
  deck?: string
  credits: FilmCredit[]
  season?: string
  collaboratingBrands?: string[]
  publishedAt: string
  featured: boolean
}

// ─── TGF Program Schema ───────────────────────────────────────────────────────

export interface TGFProgram {
  _id: string
  _type: 'tgfProgram'
  name: string
  slug: SanitySlug
  tagline: string
  description: SanityPortableText
  targetAudience: string
  deliverables: string[]
  pricing?: string
  ctaLabel: string
  ctaUrl?: string
  order: number
  active: boolean
}

// ─── Site Settings Schema (singleton) ────────────────────────────────────────

export interface SocialHandles {
  tbf?: string
  melfiore?: string
  ruc?: string
  tgf?: string
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  siteTitle: string
  defaultMetaDescription?: string
  ogImage?: SanityImage
  tickerText?: string
  instagramHandles?: SocialHandles
  collectiveApplicationOpen: boolean
}

// ─── Page Props Types ─────────────────────────────────────────────────────────

export interface HomePageProps {
  featuredPost?: EditorialPost
  latestPosts: EditorialPost[]
  siteSettings: SiteSettings
}

export interface EditorialListPageProps {
  posts: EditorialPost[]
  categories: ArticleCategory[]
}

export interface ArticlePageProps {
  post: EditorialPost
  relatedPosts: EditorialPost[]
}

export interface FactoryPageProps {
  programs: TGFProgram[]
}

export interface CollectivePageProps {
  collectiveOpen: boolean
}

// ─── Component Props Types ───────────────────────────────────────────────────

export interface ArticleCardProps {
  post: Pick<EditorialPost, '_id' | 'title' | 'slug' | 'deck' | 'category' | 'heroImage' | 'cardRatio' | 'publishedAt' | 'author' | 'tags'>
  variant?: 'featured' | 'standard'
}

export interface HeroProps {
  title: string
  mediaType: 'video' | 'image'
  videoId?: string
  image?: SanityImage
  showLoadingScreen?: boolean
}

export interface NavigationProps {
  collectiveOpen?: boolean
}

// ─── Form Types ───────────────────────────────────────────────────────────────

export type ContactIntent = 'tbf' | 'melfiore' | 'ruc' | 'tgf'

export interface ContactFormData {
  name: string
  email: string
  intent: ContactIntent
  message: string
  handle?: string
}

export interface ContactFormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  error?: string
}

export interface CollectiveFormData {
  name: string
  role: string
  portfolioLink?: string
  howDidYouFind: string
}
