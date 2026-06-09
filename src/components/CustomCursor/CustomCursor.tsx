'use client'

// =============================================================================
// CUSTOM CURSOR — TBF WEB 2026
// Desktop only | 5px amber dot | scale em links/imagens
// prefers-reduced-motion: hidden
// =============================================================================

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function CustomCursor() {
  const pathname = usePathname()

  // Movimento do cursor — roda uma vez, persiste em todas as rotas
  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px) and (hover: hover)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isDesktop || prefersReducedMotion) return

    const cursor = document.getElementById('cursor')
    if (!cursor) return

    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Hover nos elementos — roda em cada mudança de rota para capturar novos links
  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px) and (hover: hover)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isDesktop || prefersReducedMotion) return

    const cursor = document.getElementById('cursor')
    if (!cursor) return

    const handleMouseEnterLink = () => {
      cursor.classList.add('cursor--link')
      cursor.classList.remove('cursor--image')
    }
    const handleMouseEnterImage = () => {
      cursor.classList.add('cursor--image')
      cursor.classList.remove('cursor--link')
    }
    const handleMouseLeave = () => {
      cursor.classList.remove('cursor--link', 'cursor--image')
    }

    // Pequeno delay para garantir que o DOM da nova página já renderizou
    const timer = setTimeout(() => {
      const links = document.querySelectorAll('a, button')
      const images = document.querySelectorAll('img, .figure__img, .card__image')

      links.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterLink)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
      images.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterImage)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
