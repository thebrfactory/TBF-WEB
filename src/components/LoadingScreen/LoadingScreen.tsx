'use client'

// =============================================================================
// LOADING SCREEN — TBF WEB 2026
// Presente apenas na homepage | Máx 2s
// ARIA: role="status", aria-live="polite"
// =============================================================================

import { useEffect, useState } from 'react'

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
      <span className="loading-screen__mark" aria-hidden="true">
        .TBF.
      </span>
    </div>
  )
}
