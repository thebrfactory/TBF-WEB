// =============================================================================
// VIEW TRANSITIONS — ponte entre o clique e a navegação do App Router
//
// A View Transitions API precisa de um callback que devolva uma Promise que só
// resolve quando o DOM novo já está no lugar. O `router.push()` do Next não
// devolve isso: ele agenda a navegação e volta na hora. Sem a ponte, o browser
// tira o snapshot "novo" da página ANTIGA e a transição não anima nada.
//
// A ponte é um resolvedor único de módulo:
//   · o link clicado abre a transição e guarda aqui o `resolve`;
//   · o <ViewTransitionBridge/> do layout observa o pathname e chama o `resolve`
//     assim que a rota nova é comitada.
// O resolvedor mora no módulo (e não no componente) de propósito: o componente
// que foi clicado desmonta durante a navegação e levaria o resolvedor junto.
//
// Um cronômetro de segurança fecha a transição se a navegação travar ou for
// abortada — melhor um corte seco que a página congelada num snapshot.
// =============================================================================

/** Nome que o browser usa para casar a imagem de origem com a de destino. */
export const ARTICLE_MORPH_NAME = 'tbf-article-cover'

const SAFETY_TIMEOUT_MS = 1500

let pendingResolve: (() => void) | null = null
let safetyTimer: ReturnType<typeof setTimeout> | null = null

/** Chamado pelo link: registra o resolvedor e devolve a Promise da transição. */
export function awaitNavigation(): Promise<void> {
  return new Promise<void>((resolve) => {
    pendingResolve = resolve
    safetyTimer = setTimeout(settleNavigation, SAFETY_TIMEOUT_MS)
  })
}

/** Chamado pela ponte (ou pelo cronômetro): libera a transição, uma vez só. */
export function settleNavigation(): void {
  if (safetyTimer) {
    clearTimeout(safetyTimer)
    safetyTimer = null
  }
  const resolve = pendingResolve
  pendingResolve = null
  resolve?.()
}

/** Há uma transição esperando a navegação terminar? */
export function isNavigationPending(): boolean {
  return pendingResolve !== null
}

/**
 * A transição só vale a pena quando o browser suporta e a pessoa não pediu
 * menos movimento. Fora disso, o link se comporta como um link normal.
 */
export function canMorph(): boolean {
  if (typeof document === 'undefined') return false
  if (typeof document.startViewTransition !== 'function') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
