'use client'

// =============================================================================
// LOADING SCREEN — TBF WEB 2026
// Presente apenas na homepage | Máx 2s
// ARIA: role="status", aria-live="polite"
// =============================================================================

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function LoadingScreen() {
  const [exiting, setExiting] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExiting(true)
    }, 600)

    const hideTimer = setTimeout(() => {
      setHidden(true)
    }, 800)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (hidden) return null

  return (
    <div
      className={`loading-screen ${exiting ? 'loading-screen--exit' : ''}`}
      role="status"
      aria-label="Carregando .THE BRAZILIAN FACTORY."
      aria-live="polite"
    >
      <div className="loading-screen__glow" aria-hidden="true" />
      <Image
        src="/brand/TBF-SAO-PAULO.svg"
        alt=".THE BRAZILIAN FACTORY. — São Paulo"
        width={220}
        height={158}
        priority
        unoptimized
        className="loading-screen__mark"
        style={{ width: 'clamp(150px, 42vw, 260px)', height: 'auto' }}
      />
    </div>
  )
}
