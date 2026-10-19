// Sitemap do zine.thebrfactory.com (middleware reescreve /sitemap.xml do subdomínio para cá).
// Sitemap só pode listar URLs do próprio host, por isso não divide o do site principal.

import { sanityFetch, ARTICLE_SLUGS_QUERY } from '@/lib/sanity'
import { LOCAIS, SLUGS_LOCAIS } from '@/content/articles'
import { zineUrl } from '@/lib/zine-url'

export const revalidate = 3600

export async function GET() {
  const slugs: { slug: string; lastmod?: string }[] = LOCAIS.map((a) => ({
    slug: a.slug,
    lastmod: a.publishedAt,
  }))
  try {
    const doCms = await sanityFetch<{ slug: string }[]>(ARTICLE_SLUGS_QUERY)
    for (const { slug } of doCms) if (!SLUGS_LOCAIS.includes(slug)) slugs.push({ slug })
  } catch (erro) {
    console.error('[zine-sitemap] slugs das materias nao vieram do Sanity:', erro)
  }

  const entrada = (slug: string | undefined, prio: string, lastmod?: string) =>
    `  <url>\n    <loc>${zineUrl(slug, 'en')}</loc>\n` +
    (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
    `    <priority>${prio}</priority>\n` +
    `    <xhtml:link rel="alternate" hreflang="en-US" href="${zineUrl(slug, 'en')}"/>\n` +
    `    <xhtml:link rel="alternate" hreflang="pt-BR" href="${zineUrl(slug, 'pt')}"/>\n  </url>\n` +
    `  <url>\n    <loc>${zineUrl(slug, 'pt')}</loc>\n` +
    (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
    `    <priority>${(Number(prio) - 0.1).toFixed(1)}</priority>\n` +
    `    <xhtml:link rel="alternate" hreflang="en-US" href="${zineUrl(slug, 'en')}"/>\n` +
    `    <xhtml:link rel="alternate" hreflang="pt-BR" href="${zineUrl(slug, 'pt')}"/>\n  </url>\n`

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entrada(undefined, '0.9') +
    slugs.map((s) => entrada(s.slug, '0.8', s.lastmod)).join('') +
    `</urlset>\n`

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
