'use client'

// =============================================================================
// REVEAL WRAPPER — TBF WEB 2026
// IntersectionObserver | threshold 0.1 | trigger once
// Aplica .reveal--visible quando elemento entra no viewport
// =============================================================================

import { useEffect, useRef } from 'react'

interface RevealWrapperProps {
  children: React.ReactNode
  variant?: 'headline' | 'deck' | 'card' | 'image' | 'bu'
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

export function RevealWrapper({
  children,
  variant,
  className = '',
  as: Tag = 'div',
}: RevealWrapperProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const revealClass = [
    'reveal',
    variant ? `reveal--${variant}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={ref} className={revealClass}>
      {children}
    </Tag>
  )
}
