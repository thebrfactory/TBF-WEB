'use client'

// =============================================================================
// CUSTOM CURSOR — TBF WEB 2026
// Desktop only | 5px amber dot | scale em links/imagens
// prefers-reduced-motion: hidden
// =============================================================================

import { useEffect } from 'react'

export function CustomCursor() {
  useEffect(() => {
    // Check if desktop + hover capable
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

    const handleMouseEnterLink = () => {
      cursor.classList.add('cursor--link')
      cursor.classList.remove('cursor--image')
    }

    const handleMouseEnterImage = () => {
      cursor.classList.add('cursor--image')
      cursor.classList.remove('cursor--link')
    }

    const handleMouseLeaveInteractive = () => {
      cursor.classList.remove('cursor--link', 'cursor--image')
    }

    // Adiciona listeners a links e botões
    const addListeners = () => {
      const links = document.querySelectorAll('a, button')
      const images = document.querySelectorAll('img, .figure__img, .card__image')

      links.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterLink)
        el.addEventListener('mouseleave', handleMouseLeaveInteractive)
      })

      images.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterImage)
        el.addEventListener('mouseleave', handleMouseLeaveInteractive)
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    addListeners()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
