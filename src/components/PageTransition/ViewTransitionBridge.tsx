'use client'

// =============================================================================
// VIEW TRANSITION BRIDGE — avisa a transição de que a rota nova já chegou
//
// Fica montado no layout, uma vez, para todas as páginas. Observa o pathname:
// mudou, a navegação foi comitada, então libera a Promise que o
// ArticleMorphLink deixou pendurada. O efeito roda depois do commit e antes do
// paint, que é exatamente o instante em que o browser quer tirar o snapshot novo.
//
// Precisa ser um componente separado (e não o próprio link) porque o link
// desmonta durante a navegação — o resolvedor mora em @/lib/viewTransition.
// =============================================================================

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { settleNavigation } from '@/lib/viewTransition'

export function ViewTransitionBridge() {
  const pathname = usePathname()

  useEffect(() => {
    settleNavigation()
  }, [pathname])

  return null
}
