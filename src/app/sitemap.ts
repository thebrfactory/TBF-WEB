// =============================================================================
// SITEMAP — TBF WEB 2026
// Dinâmico: busca slugs do Sanity para artigos
// =============================================================================

import type { MetadataRoute } from 'next'
import { sanityFetch, ARTICLE_SLUGS_QUERY } from '@/lib/sanity'

const BASE_URL = 'https://thebrfactory.com'

// Rotas estáticas com prioridade SEO (conforme 02_sitemap.md)
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/editorial`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/labels/factoryofgrowth`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/consulting`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/manifesto`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/ecosystem`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/melfiore`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/runway`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/collective`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  // /access é noindex — não incluída no sitemap
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articleRoutes: MetadataRoute.Sitemap = []

  try {
    const slugs = await sanityFetch<{ slug: string }[]>(ARTICLE_SLUGS_QUERY)

    articleRoutes = slugs.map(({ slug }) => ({
      url: `${BASE_URL}/editorial/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {
    // Sanity offline — retorna apenas rotas estáticas
  }

  return [...STATIC_ROUTES, ...articleRoutes]
}
