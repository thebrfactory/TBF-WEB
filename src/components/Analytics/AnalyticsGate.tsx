'use client'

// =============================================================================
// ANALYTICS GATE — GA4 sob consentimento real, Consent Mode v2
//
// Duas coisas acontecem em momentos diferentes:
//   1. Consent Mode `default denied` — inline, via next/script `beforeInteractive`,
//      ANTES de qualquer script do Google existir na página. Isso roda sempre que
//      o ID do GA existe, independente de escolha de cookie (é o "padrão de
//      fábrica" que o próprio Google exige para respeitar opt-in).
//   2. O script do gtag.js só entra (via `afterInteractive`) quando
//      readConsent()?.analytics === true. Sem isso, nenhuma requisição para
//      googletagmanager.com acontece — nem o script, nem o pixel de coleta.
//
// Reage a `tbf-cookie-choice` (disparado por writeConsent em @/lib/consent):
// aceitar agora carrega o GA4 e despacha a fila de eventos pré-consent;
// revogar para de enviar (o script já injetado fica idle — CookieBanner nunca
// remove <script> do DOM, então só paramos de despachar via pauseQueue()).
//
// Sem NEXT_PUBLIC_GA_MEASUREMENT_ID (ex.: dev sem o env, ou antes do fundador
// criar a propriedade GA4): no-op silencioso, zero script, zero efeito.
// =============================================================================

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { readConsent } from '@/lib/consent'
import { GA_MEASUREMENT_ID, flushQueue, pauseQueue } from '@/lib/analytics'

export function AnalyticsGate() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const read = () => setAllowed(readConsent()?.analytics === true)
    read()
    window.addEventListener('tbf-cookie-choice', read)
    return () => window.removeEventListener('tbf-cookie-choice', read)
  }, [])

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    if (allowed) {
      flushQueue()
      return
    }
    pauseQueue()
    // Revogar precisa CHEGAR ao Google, não só parar a nossa fila. Se a pessoa
    // aceitou e depois revogou na mesma sessão, o gtag.js já está na página e a
    // Medição otimizada da propriedade continuaria mandando page_view, rolagem e
    // clique de saída por conta própria. O consent update denied é o que
    // efetivamente desliga a coleta do lado de lá.
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
    }
  }, [allowed])

  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      {/* Consent Mode v2 — default denied, antes de qualquer script do Google. */}
      <Script id="tbf-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
        `}
      </Script>

      {allowed && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="tbf-ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('consent', 'update', { analytics_storage: 'granted' });
              // GA4 anonimiza IP por padrão; anonymize_ip é parâmetro do
              // Universal Analytics e seria ignorado aqui.
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
    </>
  )
}
