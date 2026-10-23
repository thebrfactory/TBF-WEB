'use client'

// =============================================================================
// META PIXEL: inerte até existir NEXT_PUBLIC_META_PIXEL_ID
//
// Sem a variável: não renderiza nada, zero script, zero requisição.
// Com a variável: só carrega com readConsent().marketing === true (categoria
// própria, opt-in, default false; CONSENT_VERSION 3). GA4 e Vercel seguem em
// `analytics`, esta categoria não os afeta.
//
// PageView no load e a cada troca de rota do App Router (usePathname).
// Revogar o consentimento: fbq('consent', 'revoke') e para de disparar.
// =============================================================================

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { readConsent } from '@/lib/consent'
import { META_PIXEL_ID } from '@/lib/meta-pixel'

export function MetaPixel() {
  const [allowed, setAllowed] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!META_PIXEL_ID) return
    const read = () => setAllowed(readConsent()?.marketing === true)
    read()
    window.addEventListener('tbf-cookie-choice', read)
    return () => window.removeEventListener('tbf-cookie-choice', read)
  }, [])

  useEffect(() => {
    if (!META_PIXEL_ID || typeof window.fbq !== 'function') return
    if (!allowed) {
      window.fbq('consent', 'revoke')
      return
    }
    window.fbq('consent', 'grant')
    // O PageView inicial sai do mesmo efeito: o snippet só faz init.
    window.fbq('track', 'PageView')
  }, [allowed, pathname])

  if (!META_PIXEL_ID || !allowed) return null

  return (
    <Script id="tbf-meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  )
}
