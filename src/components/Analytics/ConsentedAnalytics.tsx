'use client'

// =============================================================================
// CONSENTED ANALYTICS — carrega o Vercel Analytics + Speed Insights SOMENTE se a
// pessoa consentiu com analytics no CookieBanner. Antes disso (ou após rejeitar)
// nada é carregado. Torna o toggle de analytics REAL, não decorativo (LGPD).
// Re-lê no evento tbf-cookie-choice, então aceitar/rejeitar liga/desliga na hora.
//
// Escopo deste componente: SÓ Vercel Analytics/Speed Insights (cookieless,
// primeira parte). O GA4 (Google, terceiro, precisa de Consent Mode v2) tem
// gate próprio em @/components/Analytics/AnalyticsGate — os dois leem o mesmo
// @/lib/consent, cada um cuida do seu fornecedor.
// =============================================================================

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { readConsent } from '@/lib/consent'

export function ConsentedAnalytics() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    // readConsent devolve null para registro vencido ou de versão antiga: nesses
    // casos o site volta a perguntar, e até lá não carrega nada.
    const read = () => setAllowed(readConsent()?.analytics === true)
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
