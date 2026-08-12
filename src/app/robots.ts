// =============================================================================
// ROBOTS.TXT — TBF WEB 2026
// /access, /api/* e /studio (painel admin do Sanity) são noindex
// =============================================================================

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/access', '/api/', '/studio'],
      },
    ],
    sitemap: 'https://thebrfactory.com/sitemap.xml',
    host: 'https://thebrfactory.com',
  }
}
