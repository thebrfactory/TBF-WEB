// =============================================================================
// i18n — o site em duas línguas
//
// DECISÃO DE ARQUITETURA (fundador, 2026-08-02): o site existe inteiro em
// inglês e inteiro em português. O inglês é o NATIVO e mora na raiz
// (`/manifesto`); o português mora sob prefixo (`/pt/manifesto`). Quem chega
// cai SEMPRE em inglês — não há redirecionamento por idioma do navegador. O
// brasileiro troca se quiser, pela pílula do topo, e a escolha é lembrada.
//
// POR QUE NÃO DUPLICAR AS PÁGINAS: duas cópias de cada página cobram para
// sempre — toda mudança teria de ser feita duas vezes, e no dia em que alguém
// esquecer uma, as versões divergem em silêncio. Aqui existe UMA página por
// rota; o que muda é o dicionário de texto que ela lê. As rotas em `app/pt/`
// são cascas de cinco linhas que chamam a mesma página com `lang="pt"`.
// =============================================================================

export const LANGS = ['en', 'pt'] as const

export type Lang = (typeof LANGS)[number]

/** Inglês é o idioma nativo: é ele que mora na raiz, sem prefixo. */
export const DEFAULT_LANG: Lang = 'en'

/** Prefixo de rota de cada idioma. O nativo não tem prefixo, de propósito. */
export const LANG_PREFIX: Record<Lang, string> = {
  en: '',
  pt: '/pt',
}

/** Valor do atributo `lang` do HTML — o que leitor de tela e navegador leem. */
export const HTML_LANG: Record<Lang, string> = {
  en: 'en',
  pt: 'pt-BR',
}

/** Locale no formato que Open Graph espera. */
export const OG_LOCALE: Record<Lang, string> = {
  en: 'en_US',
  pt: 'pt_BR',
}

export function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'pt'
}

/**
 * Separa o prefixo de idioma de um caminho.
 * `/pt/about` -> { lang: 'pt', path: '/about' } · `/about` -> { lang: 'en', path: '/about' }
 */
export function splitLang(pathname: string): { lang: Lang; path: string } {
  if (pathname === '/pt' || pathname.startsWith('/pt/')) {
    return { lang: 'pt', path: pathname.slice(3) || '/' }
  }
  return { lang: DEFAULT_LANG, path: pathname || '/' }
}

/**
 * O mesmo caminho no outro idioma — é isto que a pílula PT|EN navega.
 * Preserva query string e âncora, para a troca não perder o lugar.
 */
export function localizedPath(pathname: string, lang: Lang): string {
  const { path } = splitLang(pathname)
  const prefix = LANG_PREFIX[lang]
  if (path === '/') return prefix || '/'
  return `${prefix}${path}`
}

/**
 * Bloco `alternates` do metadata: diz ao Google que as duas páginas são a
 * mesma coisa em línguas diferentes. Sem isto, as duas versões competem entre
 * si na busca em vez de se somarem.
 */
export function languageAlternates(path: string) {
  const clean = path === '/' ? '' : path
  return {
    languages: {
      'en-US': `/${clean}`.replace('//', '/'),
      'pt-BR': `/pt${clean}`,
      'x-default': `/${clean}`.replace('//', '/'),
    },
  }
}
