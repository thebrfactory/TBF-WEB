// =============================================================================
// ROBOTS.TXT — TBF WEB 2026
// /access e /api/* são noindex
// =============================================================================

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/access', '/api/'],
      },
    ],
    sitemap: 'https://thebrfactory.com/sitemap.xml',
    host: 'https://thebrfactory.com',
  }
}
