'use client'

// =============================================================================
// StatBlock — client (SPEC §2.1)
// IO dispara count-up via rAF (~800ms). Número final SEMPRE está no HTML —
// o count-up é cosmético, não bloqueia SEO/no-js.
// =============================================================================

import { useEffect, useRef, useState } from 'react'

interface StatBlockProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  /** Formatação final exibida (ex.: "500 milhões"). Sem ela, usa toLocaleString. */
  formatted?: string
}

export function StatBlock({ value, label, prefix = '', suffix = '', formatted }: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const finalDisplay = formatted ?? value.toLocaleString('en-US')
  const [display, setDisplay] = useState(finalDisplay)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.unobserve(el)
          const start = performance.now()
          const duration = 800
          function tick(now: number) {
            const progress = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - progress, 3)
            if (progress < 1) {
              setDisplay(Math.round(value * eased).toLocaleString('en-US'))
              requestAnimationFrame(tick)
            } else {
              setDisplay(finalDisplay)
            }
          }
          requestAnimationFrame(tick)
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, finalDisplay])

  return (
    <div ref={ref} className="scrolly-stat">
      <p className="scrolly-stat__value">
        {prefix}
        {display}
        {suffix}
      </p>
      <div className="scrolly-stat__bar" aria-hidden="true" />
      <p className="scrolly-stat__label">{label}</p>
    </div>
  )
}
