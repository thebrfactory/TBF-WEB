'use client'

// Ganchos de evento do Meta Pixel (so com marketing aceito, via lib/meta-pixel).
//   <MetaEvent />      ViewContent ao montar (case do portfolio).
//   <MetaPitchEvent /> ViewContent do deck + PitchComplete ao chegar na ultima cena.
// Nao renderizam nada. Sem consentimento na hora, esperam a escolha do banner.

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { trackMetaEvent } from '@/lib/meta-pixel'

type Params = Record<string, unknown>

/** Dispara agora; sem consentimento, uma vez quando o visitante aceitar. */
function fireWhenAllowed(fire: () => boolean): () => void {
  if (fire()) return () => {}
  const onChoice = () => {
    if (fire()) window.removeEventListener('tbf-cookie-choice', onChoice)
  }
  window.addEventListener('tbf-cookie-choice', onChoice)
  return () => window.removeEventListener('tbf-cookie-choice', onChoice)
}

export function MetaContentView({ name, category, id }: { name: string; category: string; id: string }) {
  useEffect(
    () =>
      fireWhenAllowed(() =>
        trackMetaEvent('ViewContent', { content_name: name, content_category: category, content_ids: [id] }),
      ),
    [name, category, id],
  )
  return null
}

export function MetaPitchEvent() {
  const pathname = usePathname() ?? ''
  const id = pathname.replace(/^\/pt(?=\/|$)/, '').replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'pitch'
  useEffect(() => {
    const params: Params = { content_name: id, content_category: 'pitch', content_ids: [id] }
    const stopView = fireWhenAllowed(() => trackMetaEvent('ViewContent', params))

    let done = false
    let io: IntersectionObserver | null = null
    const scenes = document.querySelectorAll('section[id^="cena-"]')
    const last = scenes[scenes.length - 1]
    if (last && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (done || !entries.some((e) => e.isIntersecting)) return
          if (trackMetaEvent('PitchComplete', params)) {
            done = true
            io?.disconnect()
          }
        },
        { threshold: 0.5 },
      )
      io.observe(last)
    }
    return () => {
      stopView()
      io?.disconnect()
    }
  }, [id])
  return null
}
