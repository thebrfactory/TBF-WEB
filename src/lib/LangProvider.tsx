'use client'

// =============================================================================
// LangProvider — o idioma corrente disponível para os componentes de cliente
//
// As páginas são componentes de servidor e recebem `lang` como propriedade,
// direto da rota. Mas o cromo do site (navegação, rodapé, aviso de cookies,
// popup, formulários) é feito de componentes de cliente espalhados, e passar a
// propriedade de mão em mão por essa árvore toda seria um convite ao
// esquecimento — bastaria um componente novo não receber para o site voltar a
// falar inglês no meio do português.
//
// O idioma é constante dentro de cada árvore (cada root layout sabe o seu, em
// tempo de build), então o contexto nunca muda em runtime: trocar de idioma é
// navegar para a outra rota, com carregamento novo.
// =============================================================================

import { createContext, useContext } from 'react'
import type { Lang } from './i18n'
import { DEFAULT_LANG } from './i18n'

const LangContext = createContext<Lang>(DEFAULT_LANG)

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}

/** Idioma da página atual. Fora de um provider, cai no nativo (inglês). */
export function useLang(): Lang {
  return useContext(LangContext)
}

/**
 * Escolhe a versão certa de um par de textos.
 * `t({ en: 'Magazine', pt: 'Revista' })`
 */
export function useT() {
  const lang = useLang()
  return function t<T>(pair: Record<Lang, T>): T {
    return pair[lang]
  }
}
