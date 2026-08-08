'use client'

// =============================================================================
// useHeroAdvance — UM gesto atravessa o hero de vídeo
// -----------------------------------------------------------------------------
// Pedido do fundador (2026-08-08): em toda página com vídeo de fundo, um único
// deslize (dedo ou mouse/trackpad) já leva a pessoa para o conteúdo que vem
// depois — em vez de exigir uma rolagem inteira de tela cheia.
//
// COMO FUNCIONA. Enquanto o hero está encaixado no topo, o gesto é INTERCEPTADO
// (preventDefault) e trocado por uma rolagem suave até a base do hero. Uma vez
// só: assim que dispara, o hook se desarma e o resto da página rola normal. Ele
// volta a armar quando a pessoa retorna ao topo — subir de volta ao hero e
// descer de novo funciona igual à primeira vez.
//
// POR QUE A ALTURA DO HERO, E NÃO O ELEMENTO SEGUINTE: o destino é sempre
// `base do hero`, calculada na hora. Assim o hook não precisa saber NADA sobre
// o que vem depois (letreiro, seção, grade) e continua certo se a ordem da
// página mudar.
//
// A TRAVA DE 700ms depois do disparo existe por causa do trackpad: um flick
// gera dezenas de eventos de inércia. Sem a trava, esses eventos escapariam por
// baixo da rolagem suave e brigariam com ela — a página chegaria tremida.
// =============================================================================

import { useEffect, type RefObject } from 'react'

/** Deslize mínimo (px) para o toque contar como gesto, e não como tremor. */
const SWIPE_MIN_PX = 18
/** Janela em que um toque ainda conta como "toque", não como arrasto. */
const TAP_MAX_MS = 350
const TAP_MAX_PX = 8
/** Silêncio depois do disparo, para a inércia do trackpad não atropelar. */
const LOCK_MS = 700

export function useHeroAdvance(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return

    const node = ref.current
    if (!node) return

    // O hero é a seção que contém o vídeo. Em /editorial o vídeo vem dentro de
    // uma div de fundo, por isso subimos até a section em vez de usar o pai.
    const hero = node.closest('section') ?? node.parentElement
    if (!hero) return

    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = reduzido ? 'auto' : 'smooth'

    let disparado = false
    let travaAte = 0

    /** Armado só quando o hero ainda está encaixado no topo da janela. */
    const armado = () => !disparado && hero.getBoundingClientRect().top > -4

    const disparar = () => {
      const base = hero.getBoundingClientRect().bottom
      // Nada abaixo do hero: não há para onde ir, e roubar o gesto seria bug.
      if (window.scrollY + base >= document.documentElement.scrollHeight - 1) return

      disparado = true
      travaAte = Date.now() + LOCK_MS
      window.scrollTo({ top: window.scrollY + base, behavior })
    }

    const onWheel = (e: WheelEvent) => {
      if (Date.now() < travaAte) {
        e.preventDefault() // inércia do flick anterior: engolida
        return
      }
      if (e.deltaY <= 0 || !armado()) return
      e.preventDefault()
      disparar()
    }

    let toqueY = 0
    let toqueX = 0
    let toqueEm = 0
    let arrastou = false

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      toqueY = t.clientY
      toqueX = t.clientX
      toqueEm = Date.now()
      arrastou = false
    }

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      const dy = toqueY - t.clientY
      if (Math.abs(dy) > TAP_MAX_PX || Math.abs(toqueX - t.clientX) > TAP_MAX_PX) {
        arrastou = true
      }
      if (Date.now() < travaAte) {
        e.preventDefault()
        return
      }
      if (dy < SWIPE_MIN_PX || !armado()) return
      e.preventDefault()
      disparar()
    }

    // Toque seco (sem arrastar) também avança — mas SÓ no touch e SÓ dentro do
    // hero, e nunca em cima de algo clicável. No mouse isso não existe: clicar
    // numa página e ver ela pular seria comportamento quebrado, não atalho.
    const onTouchEnd = (e: TouchEvent) => {
      if (arrastou || Date.now() - toqueEm > TAP_MAX_MS || !armado()) return
      const alvo = e.target as Element | null
      if (!alvo || !hero.contains(alvo)) return
      if (alvo.closest('a, button, input, select, textarea, [role="button"]')) return
      disparar()
    }

    // Voltou ao topo → o gesto vale de novo.
    const onScroll = () => {
      if (window.scrollY <= 4 && Date.now() >= travaAte) disparado = false
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('scroll', onScroll)
    }
  }, [ref, enabled])
}
