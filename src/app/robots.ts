// =============================================================================
// ROBOTS.TXT — TBF WEB 2026
// /access, /api/*, /studio (painel admin do Sanity), /pitch* e /proposta/castelo
// (material de cliente) são noindex. A página já leva `robots: { index: false }`
// na própria metadata. O disallow aqui é a segunda camada, contra crawler que
// ignora meta tag e contra o link cair em algum lugar fora do nosso controle.
// =============================================================================

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/access',
          '/api/',
          '/studio',
          '/pitch',
          '/pitch/',
          '/proposta/',
          '/pt/access',
          '/pt/studio',
          '/pt/pitch',
          '/pt/pitch/',
          '/pt/proposta/',
        ],
      },
    ],
    sitemap: 'https://thebrfactory.com/sitemap.xml',
    host: 'https://thebrfactory.com',
  }
}
