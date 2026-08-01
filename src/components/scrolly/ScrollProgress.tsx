'use client'

// =============================================================================
// ScrollProgress — barra de 2px no topo (SPEC §2.1)
// Primário: animation-timeline: scroll(root) via CSS (scrolly.css).
// Fallback (sem suporte): rAF-throttled scroll listener passivo.
// =============================================================================

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: scroll()')) return

    const bar = barRef.current
    if (!bar) return
    let ticking = false

    function update() {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (bar) bar.style.transform = `scaleX(${pct})`
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scrolly-progress" aria-hidden="true">
      <div ref={barRef} className="scrolly-progress__bar" />
    </div>
  )
}
