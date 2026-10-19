// =============================================================================
// MIDDLEWARE: roteamento por host do ZINE (#01 CHANGES 19/10/2026)
//
//  zine.thebrfactory.com (e zine.localhost, para teste local)
//    /            -> rewrite /zine           /pt        -> rewrite /pt/zine
//    /:slug       -> rewrite /zine/:slug     /pt/:slug  -> rewrite /pt/zine/:slug
//    /zine...     -> 308 para o caminho curto (uma URL por matéria)
//    rota do site -> 308 para o host principal (links do menu, rodapé, logo)
//    sitemap.xml e robots.txt -> versões próprias do zine
//  thebrfactory.com e www (SÓ estes hosts)
//    /zine, /zine/:slug, /pt/zine... -> 308 para o subdomínio
//  localhost e qualquer outro host: passa direto, /zine continua servido.
//
// Por que middleware e não rewrites com `has: host`: o redirect só pode valer
// nos hosts de produção, e a lista de rotas do site precisa voltar para o host
// principal. Não mexe no rewrite do .AURA. (next.config.ts), que só atua em
// /brandsystem e roda depois do middleware.
// =============================================================================

import { NextResponse, type NextRequest } from 'next/server'
import { ZINE_HOST, zineUrl } from '@/lib/zine-url'

const ZINE_HOSTS = new Set([ZINE_HOST, 'zine.localhost'])
const MAIN_HOSTS = new Set(['thebrfactory.com', 'www.thebrfactory.com'])

// Primeiro segmento que pertence ao site principal. Slug de matéria nunca pode
// ser um destes. Rota nova no site: linha nova aqui.
const SITE_ROUTES = new Set([
  'about', 'access', 'agency', 'brand-tech', 'brandsystem', 'careers', 'collective',
  'compliance', 'consulting', 'contact-us', 'creators', 'ecosystem', 'editorial', 'factory',
  'labels', 'legal', 'mag', 'manifesto', 'pitch', 'press', 'proposta', 'publishing',
  'shop', 'studio', 'talks', 'tavaristico',
])

export function middleware(req: NextRequest) {
  const host = (req.headers.get('host') ?? '').split(':')[0].toLowerCase()
  const url = req.nextUrl.clone()
  const { pathname } = req.nextUrl

  if (MAIN_HOSTS.has(host)) {
    const m = pathname.match(/^(\/pt)?\/zine(?:\/([^/]+))?\/?$/)
    if (!m) return NextResponse.next()
    return NextResponse.redirect(zineUrl(m[2], m[1] ? 'pt' : 'en') + req.nextUrl.search, 308)
  }

  if (!ZINE_HOSTS.has(host)) return NextResponse.next()

  if (pathname === '/sitemap.xml') {
    url.pathname = '/zine-sitemap.xml'
    return NextResponse.rewrite(url)
  }
  if (pathname === '/robots.txt') {
    url.pathname = '/zine-robots.txt'
    return NextResponse.rewrite(url)
  }

  const pt = pathname === '/pt' || pathname.startsWith('/pt/')
  const rest = pt ? pathname.slice(3) : pathname // '' | '/' | '/slug' | '/zine/slug'
  const segs = rest.split('/').filter(Boolean)

  // Caminho antigo dentro do subdomínio: vai para o curto.
  if (segs[0] === 'zine') {
    url.pathname = `${pt ? '/pt' : ''}/${segs.slice(1).join('/')}`.replace(/\/$/, '') || '/'
    return NextResponse.redirect(url, 308)
  }

  // Rota do site principal: devolve para o host principal.
  if (segs[0] && SITE_ROUTES.has(segs[0])) {
    if (host === 'zine.localhost') url.hostname = 'localhost'
    else {
      url.hostname = 'thebrfactory.com'
      url.protocol = 'https:'
      url.port = ''
    }
    return NextResponse.redirect(url, 308)
  }

  if (segs.length > 1) return NextResponse.next() // 404 natural
  url.pathname = `${pt ? '/pt' : ''}/zine${segs[0] ? `/${segs[0]}` : ''}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Fora: _next, api, og, pastas de public e qualquer arquivo com extensão.
  matcher: [
    '/((?!_next/|api/|og(?:/|$)|images/|videos/|brand/|fonts/|_ARQUIVO/|.*\\..*).*)',
    '/sitemap.xml',
    '/robots.txt',
  ],
}
