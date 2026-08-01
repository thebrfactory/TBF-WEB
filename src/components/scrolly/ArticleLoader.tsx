'use client'

// =============================================================================
// ArticleLoader — overlay de identidade sobre o hero (SPEC §2.1, PRD §1.1 V1)
// Client fino: sessionStorage 1×/sessão, teto 1.6s, skip com reduced-motion.
// Overlay decorativo por cima do hero, que pinta por baixo desde o 1º paint —
// não segura LCP. Kill-switch: prop `enabled` (default = constante local).
// =============================================================================

import { useEffect, useState } from 'react'

const ARTICLE_LOADER_ENABLED = true // kill-switch (PRD §1.1) — false desliga em toda a casa
const SESSION_KEY = 'tbf-article-loader'
const LOADER_TIMEOUT_MS = 1600
const EXIT_ANIM_MS = 300

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getInitialVisible(enabled: boolean): boolean {
  if (!enabled) return false
  if (typeof window === 'undefined') return false
  if (prefersReducedMotion()) return false
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false
  } catch {
    // storage indisponível (modo privado) — segue mostrando 1x, sem persistir
  }
  return true
}

interface ArticleLoaderProps {
  /** Metade do título (roteiro §6: título longo usa só a 1ª metade aqui, o resto entra no hero) */
  title: string
  enabled?: boolean
}

export function ArticleLoader({ title, enabled = ARTICLE_LOADER_ENABLED }: ArticleLoaderProps) {
  // Sempre nasce fechado (idêntico em SSR e no 1º render do cliente — evita
  // mismatch de hidratação, já que sessionStorage/matchMedia só existem no
  // browser). A decisão real de mostrar acontece 1 tick depois, no effect.
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!getInitialVisible(enabled)) return
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // ok não persistir
    }
    setVisible(true)
    const exitTimer = setTimeout(() => setExiting(true), LOADER_TIMEOUT_MS - EXIT_ANIM_MS)
    const hideTimer = setTimeout(() => setVisible(false), LOADER_TIMEOUT_MS)
    return () => {
      clearTimeout(exitTimer)
      clearTimeout(hideTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  if (!visible) return null

  return (
    <div
      className={`scrolly-loader${exiting ? ' scrolly-loader--exit' : ''}`}
      role="status"
      aria-hidden="true"
    >
      <div className="scrolly-loader__glow" />
      <div className="scrolly-loader__object">
        <span className="scrolly-loader__plane scrolly-loader__plane--1">.TBF.</span>
        <span className="scrolly-loader__plane scrolly-loader__plane--2">.TBF.</span>
        <span className="scrolly-loader__plane scrolly-loader__plane--3">.TBF.</span>
      </div>
      <p className="scrolly-loader__title">{title}</p>
    </div>
  )
}
