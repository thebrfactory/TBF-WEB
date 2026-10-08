// =============================================================================
// INSTAGRAM DEEP LINK: sair do navegador in-app do Instagram para o APP nativo
// =============================================================================
//
// PROBLEMA (pedido do fundador, 2026-09-21): os carrosseis da home linkam pra
// reels do Instagram (`https://www.instagram.com/p/<shortcode>/`). Quando o
// visitante esta DENTRO do proprio app do Instagram e abre thebrfactory.com
// pelo navegador in-app dele, o clique no link abre instagram.com DENTRO do
// mesmo webview, deslogado e inutil. Isso e um comportamento deliberado do
// Instagram (webview proprio nao repassa Universal Link/App Link pro app
// nativo, nem pra ele mesmo): confirmado em pesquisa de setembro/2026, ver
// fontes no fim do arquivo.
//
// O QUE FUNCIONA HOJE (pesquisado, nao suposto):
// 1. Universal Link (https://) tocado dentro do webview do proprio Instagram
//    nunca escapa pro app: o webview intercepta a navegacao e mantem tudo
//    nele mesmo. E exatamente o bug relatado.
// 2. Esquema customizado (`instagram://...`) tocado num <a href> real (gesto
//    do usuario, nao redirect via JS) tem chance de funcionar: e um tap de
//    usuario e navegacao direta, nao redirect automatico, entao o SO as
//    vezes intercepta antes do webview terminar de tratar. Nao e garantido:
//    fontes de 2025/2026 reportam que a Meta reforcou o bloqueio de abertura
//    automatica de app dentro do proprio in-app browser do iOS, entao pode
//    falhar silenciosamente. Aposta, nao fato: por isso o fallback abaixo e
//    obrigatorio, nao cosmetico.
// 3. Intent URI (`intent://...#Intent;...;end`) no Android e o mecanismo
//    oficial do Chromium pra abrir app por pacote a partir de uma pagina
//    web, com fallback embutido (`S.browser_fallback_url`) se o app nao
//    estiver instalado. Dentro do webview do proprio Instagram o
//    comportamento varia por versao do app (fonte: airbridge.io, 2025).
//    Mesma logica: tentar, com fallback.
// 4. O media_id numerico que o `instagram://media?id=<id>` exige nao precisa
//    de chamada de API: da pra calcular local a partir do shortcode do post
//    (`/p/<shortcode>/`), decodificando em base64 com o alfabeto proprio do
//    Instagram, que e o alfabeto base64url padrao (A-Z, a-z, 0-9, -, _).
//    Esse algoritmo e publico e usado por varias ferramentas de terceiros
//    (ver fonte GitHub Gist no fim do arquivo). Fato, verificado.
//
// ESTRATEGIA: no clique, dentro do navegador in-app do Instagram (detectado
// pela User-Agent, que so existe no cliente), tenta o deep link certo pra
// plataforma. Se o app nao assumir a aba em ~1,5s (a pagina nao ficou oculta),
// cai no https:// de sempre. Fora do in-app browser do Instagram, o link
// nunca muda de comportamento.
//
// FONTES (pesquisa 2026-09-21):
// - shortcode para media_id (alfabeto e algoritmo):
//   https://gist.github.com/sclark39/9daf13eea9c0b381667b61e3d2e7bc11
// - Universal Link/App Link falha dentro do webview in-app (WKWebView nao
//   dispara interceptacao do SO por padrao):
//   https://linkrunner.io/blog/universal-links-app-links-break-in-app-browsers
// - Meta bloqueou abertura automatica de app no in-app browser do iOS em
//   2025; intent:// no Android "pode funcionar, varia por versao do app":
//   https://www.airbridge.io/en/blog/deep-link-opened-in-social-app-browser-what-breaks
// - Deteccao por User-Agent e saida guiada como alternativa mais duravel:
//   https://www.flyn.to/blog/instagram-in-app-browser

// Alfabeto base64url que o Instagram usa pro shortcode (identico ao padrao
// RFC 4648 §5: A-Z, a-z, 0-9, -, _).
const IG_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

// Extrai o shortcode de uma URL de post/reel do Instagram
// (`/p/<shortcode>/` ou `/reel/<shortcode>/`). Retorna null se o link nao
// for um post/reel do Instagram (perfil, hashtag, etc.).
export function extractShortcode(href: string): string | null {
  const match = href.match(/instagram\.com\/(?:p|reel|reels)\/([A-Za-z0-9_-]+)/)
  return match ? match[1] : null
}

// Decodifica o shortcode pro media_id numerico (Horner em base 64, com o
// alfabeto do Instagram). Sem chamada de rede, e so aritmetica.
export function shortcodeToMediaId(shortcode: string): string | null {
  let id = BigInt(0)
  const base = BigInt(64)
  for (const char of shortcode) {
    const value = IG_ALPHABET.indexOf(char)
    if (value === -1) return null // shortcode com caractere fora do alfabeto, nao arrisca
    id = id * base + BigInt(value)
  }
  return id.toString()
}

// Navegador in-app do proprio Instagram, a UA carrega o token "Instagram".
// So existe no cliente, por isso nunca entra em render de servidor.
export function isInstagramInAppBrowser(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Instagram/i.test(navigator.userAgent)
}

// Extrai o username de um link de perfil (`instagram.com/<user>`), ignorando
// as rotas de conteudo (p, reel, explore etc.).
export function extractUsername(href: string): string | null {
  const match = href.match(/instagram\.com\/([A-Za-z0-9._]+)\/?(?:[?#].*)?$/)
  if (!match) return null
  return /^(p|reel|reels|explore|stories|accounts|tv)$/i.test(match[1]) ? null : match[1]
}

// Tenta abrir o post/reel/perfil no APP nativo do Instagram, cai no https://
// de sempre se o app nao assumir a aba em ~1,5s. Chamar so depois de
// confirmar `isInstagramInAppBrowser()`, fora dele o link segue normal.
//   iOS:     instagram://media?id=<id> (post/reel) ou instagram://user?username=
//   Android: intent:// com o proprio https do Instagram e package fixo, o
//            app resolve o path sozinho (so precisa do shortcode); se o app
//            nao existir, o Chromium segue S.browser_fallback_url.
export function smartOpenInstagram(href: string): void {
  const shortcode = extractShortcode(href)
  const mediaId = shortcode ? shortcodeToMediaId(shortcode) : null
  const username = shortcode ? null : extractUsername(href)

  const fallback = () => {
    window.location.href = href
  }

  if (!mediaId && !username) {
    fallback()
    return
  }

  const isAndroid = /Android/i.test(navigator.userAgent)
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

  if (!isAndroid && !isIOS) {
    fallback()
    return
  }

  // Se a pagina ficar oculta (o app assumiu a tela), o fallback nao dispara.
  let deepLinkAssumiu = false
  const onVisibilityChange = () => {
    if (document.hidden) deepLinkAssumiu = true
  }
  document.addEventListener('visibilitychange', onVisibilityChange)

  window.setTimeout(() => {
    document.removeEventListener('visibilitychange', onVisibilityChange)
    if (!deepLinkAssumiu) fallback()
  }, 1500)

  if (isAndroid) {
    const path = mediaId ? `p/${shortcode}/` : `${username}/`
    window.location.href =
      `intent://instagram.com/${path}#Intent;package=com.instagram.android;` +
      `scheme=https;S.browser_fallback_url=${encodeURIComponent(href)};end`
  } else {
    window.location.href = mediaId
      ? `instagram://media?id=${mediaId}`
      : `instagram://user?username=${username}`
  }
}
