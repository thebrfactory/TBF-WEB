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

    // Referências para o cleanup remover exatamente o que este efeito
    // prendeu. Sem isso, links e imagens que SOBREVIVEM à troca de rota
    // (nav, footer, tudo que mora no layout) acumulavam um novo par de
    // listeners a cada navegação client-side, sessão afora.
    // Começam VAZIAS, como array literal. A tentação é iniciar com um
    // querySelectorAll que não casa nada, mas seletor vazio é inválido em CSS:
    // `document.querySelectorAll('')` LANÇA, e como isso roda dentro do efeito
    // do cursor (que só monta no desktop), a exceção derrubava a hidratação da
    // página inteira em tela grande, deixando o site em branco. Custou uma
    // rodada de QA para achar, porque no celular nada disso executa.
    let links: Element[] = []
    let images: Element[] = []

    // Pequeno delay para garantir que o DOM da nova página já renderizou
    const timer = setTimeout(() => {
      links = Array.from(document.querySelectorAll('a, button'))
      images = Array.from(document.querySelectorAll('img, .figure__img, .card__image'))

      links.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterLink)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
      images.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterImage)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      links.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterLink)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      images.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterImage)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [pathname])

  return null
}
