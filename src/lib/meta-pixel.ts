// Meta Pixel: ID por env. Vazio = integração inerte (ver components/Analytics/MetaPixel).
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/** Evento Lead. No-op sem pixel carregado (sem ID ou sem consentimento). Sem PII. */
export function trackMetaLead(): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  try {
    window.fbq('track', 'Lead')
  } catch {
    /* telemetria nunca derruba a página */
  }
}
