'use client'

// =============================================================================
// ShareRow — client (SPEC §2.1)
// Web Share API (mobile) com fallback clipboard (desktop) + feedback.
// Zero dependência. Evento article_share fica a cargo da ORD-03 (hook de
// analytics ainda não existe neste ciclo).
// =============================================================================

import { useState } from 'react'

interface ShareRowProps {
  title: string
  url?: string
  onShare?: (method: 'native' | 'copy') => void
}

export function ShareRow({ title, url, onShare }: ShareRowProps) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '')

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url: shareUrl })
        onShare?.('native')
      } catch {
        // usuário cancelou o share sheet — silencioso
      }
      return
    }

    try {
      await navigator.clipboard?.writeText(shareUrl)
      setCopied(true)
      onShare?.('copy')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ambiente sem clipboard — silencioso
    }
  }

  return (
    <div className="scrolly-share">
      <button type="button" className="scrolly-share__btn" onClick={handleShare} aria-live="polite">
        {copied ? 'Link copiado' : 'Compartilhar'}
      </button>
    </div>
  )
}
