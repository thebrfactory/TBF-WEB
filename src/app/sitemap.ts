// =============================================================================
// SITEMAP — TBF WEB 2026
// Dinâmico: busca slugs do Sanity para artigos.
//
// BILÍNGUE: cada rota entra DUAS vezes, uma por idioma, e cada entrada declara
// as alternativas em `alternates.languages`. Sem isso o Google trata inglês e
// português como páginas concorrentes que se canibalizam, em vez de duas caras
// da mesma. O inglês é o nativo e fica sem prefixo; o português vive sob /pt.
// =============================================================================

import type { MetadataRoute } from 'next'
import { sanityFetch, ARTICLE_SLUGS_QUERY } from '@/lib/sanity'

const BASE_URL = 'https://thebrfactory.com'

type Rota = {
  path: string
  changeFrequency: 'daily' | 'weekly' | 'monthly'
  priority: number
}

// Rotas estáticas com prioridade SEO (conforme 02_sitemap.md).
// `/access` é noindex e por isso não entra.
const STATIC_ROUTES: Rota[] = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/editorial', changeFrequency: 'daily', priority: 0.9 },
  { path: '/labels/factoryofgrowth', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/consulting', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/manifesto', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ecosystem', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/melfiore', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/runway', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/collective', changeFrequency: 'monthly', priority: 0.6 },
]

/** Uma rota vira duas entradas, cada uma apontando para a irmã. */
function bilingue(rota: Rota): MetadataRoute.Sitemap {
  const sufixo = rota.path === '/' ? '' : rota.path
  const en = `${BASE_URL}${sufixo || '/'}`
  const pt = `${BASE_URL}/pt${sufixo}`
  const languages = { 'en-US': en, 'pt-BR': pt }
  const comum = {
    lastModified: new Date(),
    changeFrequency: rota.changeFrequency,
    priority: rota.priority,
    alternates: { languages },
  }
  return [
    { url: en, ...comum },
    // O português entra com prioridade levemente menor: é a versão traduzida
    // de um site cujo idioma nativo é o inglês, não uma página independente.
    { url: pt, ...comum, priority: Math.max(0.1, rota.priority - 0.1) },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rotas: Rota[] = [...STATIC_ROUTES]

  try {
    const slugs = await sanityFetch<{ slug: string }[]>(ARTICLE_SLUGS_QUERY)
    for (const { slug } of slugs) {
      rotas.push({ path: `/editorial/${slug}`, changeFrequency: 'weekly', priority: 0.8 })
    }
  } catch {
    // Sanity offline — sobem só as rotas estáticas
  }

  return rotas.flatMap(bilingue)
}
