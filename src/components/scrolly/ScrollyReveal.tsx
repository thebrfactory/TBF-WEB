'use client'

// =============================================================================
// ScrollyReveal — client, generaliza RevealWrapper (SPEC §2.1)
// Primário: animation-timeline: view() via CSS. Fallback: IntersectionObserver
// (threshold 0.1, once) adiciona .is-visible. Variantes: default, line, scale.
// =============================================================================

import { useEffect, useRef } from 'react'

interface ScrollyRevealProps {
  children: React.ReactNode
  variant?: 'default' | 'line' | 'scale'
  as?: keyof React.JSX.IntrinsicElements
  className?: string
}

export function ScrollyReveal({
  children,
  variant = 'default',
  as: Tag = 'div',
  className = '',
}: ScrollyRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    // Suporte nativo já cobre a animação — o IO só existe como fallback.
    if (typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: view()')) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const cls = ['scrolly-reveal', `scrolly-reveal--${variant}`, className].filter(Boolean).join(' ')

  return (
    // @ts-expect-error — dynamic tag, mesmo padrão do RevealWrapper existente
    <Tag ref={ref} className={cls}>
      {children}
    </Tag>
  )
}
