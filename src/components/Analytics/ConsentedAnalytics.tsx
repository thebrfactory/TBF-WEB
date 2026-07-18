'use client'

// =============================================================================
// CONSENTED ANALYTICS — carrega o Vercel Analytics + Speed Insights SOMENTE se a
// pessoa consentiu com analytics no CookieBanner. Antes disso (ou após rejeitar)
// nada é carregado. Torna o toggle de analytics REAL, não decorativo (LGPD).
// Re-lê no evento tbf-cookie-choice, então aceitar/rejeitar liga/desliga na hora.
// =============================================================================

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const STORAGE_KEY = 'tbf-cookie-consent'

export function ConsentedAnalytics() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        setAllowed(raw ? !!JSON.parse(raw).analytics : false)
      } catch {
        setAllowed(false)
      }
    }
    read()
    window.addEventListener('tbf-cookie-choice', read)
    return () => window.removeEventListener('tbf-cookie-choice', read)
  }, [])

  if (!allowed) return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
