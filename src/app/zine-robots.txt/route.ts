// robots.txt do zine.thebrfactory.com (middleware reescreve /robots.txt do subdomínio para cá).

import { ZINE_ORIGIN } from '@/lib/zine-url'

export async function GET() {
  return new Response(`User-Agent: *\nAllow: /\n\nHost: ${ZINE_ORIGIN}\nSitemap: ${ZINE_ORIGIN}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
