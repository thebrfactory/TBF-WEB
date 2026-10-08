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
import { WORKS } from '@/app/(en)/creators/tavaristico/_data'

const BASE_URL = 'https://thebrfactory.com'

type Rota = {
  path: string
  changeFrequency: 'daily' | 'weekly' | 'monthly'
  priority: number
}

// Rotas estáticas, na ordem de importância SEO.
// Toda rota daqui TEM de existir em app/(en) e app/(pt): o sitemap é uma promessa
// ao buscador, e anunciar 404 custa confiança de domínio. Rota nova na árvore,
// linha nova aqui.
// Fora de propósito: `/shop`, `/talks` e `/agency` (portas de membros, noindex),
// `/access` (noindex), `/studio` (CMS, não é página pública),
// `/pitch*` e `/proposta/castelo` (material de cliente, `robots: { index: false }`
// na própria página, sitemap não anuncia página noindex ao buscador),
// `/ecosystem` e `/factory` (páginas de puro redirecionamento, sem conteúdo
// próprio, também `robots: { index: false }`: quem deve indexar é o destino).
const STATIC_ROUTES: Rota[] = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/zine', changeFrequency: 'daily', priority: 0.9 },
  { path: '/consulting', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/brand-tech', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/manifesto', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/labels', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/labels/factoryofgrowth', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/labels/thefioredaily', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/labels/runwayunited', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/creators/tavaristico', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact-us', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/publishing', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/press', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/collective', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/careers', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/about/quick-facts', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/press/media', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/legal/terms', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/legal/privacy', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/legal/conduct', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/legal/law-enforcement', changeFrequency: 'monthly', priority: 0.3 },
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

  // Portfólio do .TAVARÍSTICO.: os trabalhos vivem em dado local, não no CMS.
  for (const { slug } of WORKS) {
    rotas.push({
      path: `/creators/tavaristico/works/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  }

  try {
    const slugs = await sanityFetch<{ slug: string }[]>(ARTICLE_SLUGS_QUERY)
    for (const { slug } of slugs) {
      rotas.push({ path: `/zine/${slug}`, changeFrequency: 'weekly', priority: 0.8 })
    }
  } catch (erro) {
    // Sanity fora do ar: sobem só as rotas estáticas, e o sitemap perde TODAS as
    // matérias sem avisar ninguém. Foi exatamente o que aconteceu em produção, então
    // o erro passa a ser gritado no log em vez de engolido em silêncio.
    console.error('[sitemap] slugs das materias nao vieram do Sanity:', erro)
  }

  return rotas.flatMap(bilingue)
}
