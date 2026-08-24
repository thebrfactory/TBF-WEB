'use client'

// =============================================================================
// ShareRow, client (SPEC §2.1).
// Fileira de icones de rede, pedido do fundador em #01 CHANGES 2026-08-24
// (referencia: Forbes Life). Antes era UM botao "Compartilhar" com Web Share
// API. Trocado por LinkedIn, WhatsApp e copiar link, os tres que ele pediu.
// FORA DE PROPOSITO: X, Telegram e Facebook. Ele pediu para tirar os tres, e
// nao entram nem se alguem reintroduzir a lista no futuro sem reler o pedido.
// SVG inline, sem dependencia nova, currentColor. Evento article_share segue
// a cargo da ORD-03 (hook de analytics ainda nao existe neste ciclo).
// =============================================================================

import { useState } from 'react'

interface ShareRowProps {
  title: string
  url?: string
  onShare?: (method: 'native' | 'copy') => void
}

export function ShareRow({ title, url, onShare }: ShareRowProps) {
  const [copied, setCopied] = useState(false)

  function resolveUrl() {
    return url ?? (typeof window !== 'undefined' ? window.location.href : '')
  }

  function handleLinkedIn() {
    const shareUrl = resolveUrl()
    const href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(href, '_blank', 'noopener,noreferrer')
    onShare?.('native')
  }

  function handleWhatsApp() {
    const shareUrl = resolveUrl()
    const text = `${title} ${shareUrl}`
    const href = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(href, '_blank', 'noopener,noreferrer')
    onShare?.('native')
  }

  async function handleCopy() {
    const shareUrl = resolveUrl()
    try {
      await navigator.clipboard?.writeText(shareUrl)
      setCopied(true)
      onShare?.('copy')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ambiente sem clipboard, fica em silencio
    }
  }

  return (
    <div className="scrolly-share">
      <div className="scrolly-share__row">
        <button
          type="button"
          className="scrolly-share__icon"
          onClick={handleLinkedIn}
          aria-label="Compartilhar no LinkedIn"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
          </svg>
        </button>
        <button
          type="button"
          className="scrolly-share__icon"
          onClick={handleWhatsApp}
          aria-label="Compartilhar no WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
            <path d="M12.02 2C6.5 2 2.03 6.47 2.03 12c0 1.77.47 3.45 1.28 4.9L2 22l5.25-1.28A9.94 9.94 0 0 0 12.02 22C17.55 22 22 17.53 22 12S17.55 2 12.02 2zm5.5 14.1c-.23.65-1.35 1.24-1.86 1.29-.5.05-1 .25-3.36-.7-2.84-1.14-4.66-4.01-4.8-4.2-.14-.19-1.15-1.53-1.15-2.92 0-1.38.73-2.06.99-2.34.26-.28.56-.35.75-.35.19 0 .38 0 .54.01.18.01.4-.07.63.48.23.55.79 1.9.86 2.04.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.28-.12.55.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.63-.14.26.09 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.16 1.33z" />
          </svg>
        </button>
        <button
          type="button"
          className="scrolly-share__icon"
          onClick={handleCopy}
          aria-label="Copiar link"
          aria-live="polite"
        >
          {copied ? (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
      {copied && <span className="scrolly-share__feedback" role="status">Link copiado</span>}
    </div>
  )
}
