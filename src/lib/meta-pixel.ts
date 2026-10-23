// Meta Pixel: ID por env. Vazio = integração inerte (ver components/Analytics/MetaPixel).
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Evento Lead. No-op sem pixel carregado (sem ID ou sem consentimento).
 * Com e-mail: correspondência avançada manual (trim + lowercase); o pixel faz o hash.
 */
export function trackMetaLead(email?: string): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  try {
    const em = email?.trim().toLowerCase()
    if (em && META_PIXEL_ID) window.fbq('init', META_PIXEL_ID, { em })
    window.fbq('track', 'Lead')
  } catch {
    /* telemetria nunca derruba a página */
  }
}
