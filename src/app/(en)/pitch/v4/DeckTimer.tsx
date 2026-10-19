'use client'

// =============================================================================
// TIMER DO PITCH 4.0: contagem regressiva de 5 minutos, mm:ss.
// Discreto: canto inferior esquerdo (o direito é do passador), opacidade 50%,
// `pointer-events: none` (não captura clique) e dentro do respiro de rodapé que
// toda cena já reserva (`--p3-foot`), então não cobre conteúdo.
//
// QUANDO COMEÇA: no primeiro avanço do deck (rolagem, seta, PageDown, toque que
// rola). Antes disso mostra 05:00 parado. O tempo é medido por `Date.now()`, não
// por contagem de ticks: aba em segundo plano não atrasa o relógio.
// Chegou a 00:00 para e fica em 00:00. Não interrompe a apresentação.
// Fixed por CSS, então fica fora do fluxo e da geometria das cenas.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { TIMER_SECONDS } from '@/content/pitch/v4-scenes'

function format(total: number) {
  const s = Math.max(0, total)
  const mm = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export function DeckTimer() {
  const [remaining, setRemaining] = useState(TIMER_SECONDS)
  const startedAt = useRef<number | null>(null)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined

    const start = () => {
      if (startedAt.current !== null) return
      startedAt.current = Date.now()
      cleanupListeners()
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - (startedAt.current ?? Date.now())) / 1000)
        const left = Math.max(0, TIMER_SECONDS - elapsed)
        setRemaining(left)
        if (left === 0 && interval) clearInterval(interval)
      }, 250)
    }

    const onScroll = () => {
      if (window.scrollY > 24) start()
    }
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowLeft', 'PageDown', 'PageUp'].includes(e.key)) start()
    }
    function cleanupListeners() {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      cleanupListeners()
      if (interval) clearInterval(interval)
    }
  }, [])

  return (
    <div className="p4-timer" aria-hidden="true">
      {format(remaining)}
    </div>
  )
}
