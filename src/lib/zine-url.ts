// =============================================================================
// ZINE NO SUBDOMÍNIO (pedido do fundador, #01 CHANGES 19/10/2026)
// zine.thebrfactory.com/<slug>  ->  rota interna /zine/<slug>
// PT: zine.thebrfactory.com/pt/<slug> -> rota interna /pt/zine/<slug>
// (o prefixo /pt é o mesmo do site principal; hreflang fica no mesmo host).
//
// Este é o ÚNICO lugar que sabe o endereço. Canonical, alternates, OG, sitemap e
// links passam por aqui. O roteamento por host mora em src/middleware.ts.
// =============================================================================

import { LANG_PREFIX, type Lang } from '@/lib/i18n'

export const ZINE_HOST = 'zine.thebrfactory.com'
export const ZINE_ORIGIN = `https://${ZINE_HOST}`

/** URL canônica e absoluta no subdomínio. Sem slug: a capa do zine. */
export function zineUrl(slug?: string, lang: Lang = 'en'): string {
  const path = `${LANG_PREFIX[lang]}${slug ? `/${slug}` : ''}`
  return `${ZINE_ORIGIN}${path || '/'}`
}

/**
 * Href para LINK. Em produção aponta para o subdomínio (evita o salto 308 do
 * host principal). Em dev e `next start` local continua em /zine, porque
 * localhost serve a rota normal.
 */
export function zineHref(slug?: string, lang: Lang = 'en'): string {
  if (process.env.NODE_ENV === 'production') return zineUrl(slug, lang)
  return `${LANG_PREFIX[lang]}/zine${slug ? `/${slug}` : ''}`
}

/** `alternates` do metadata: canonical no subdomínio e hreflang EN/PT no mesmo host. */
export function zineAlternates(slug?: string, lang: Lang = 'en') {
  return {
    canonical: zineUrl(slug, lang),
    languages: {
      'en-US': zineUrl(slug, 'en'),
      'pt-BR': zineUrl(slug, 'pt'),
      'x-default': zineUrl(slug, 'en'),
    },
  }
}
