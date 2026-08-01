// =============================================================================
// lib/analytics.ts — track() com fila pré-consent (contrato PRD §6.2)
//
// Nenhum evento é despachado ao GA4 antes do consentimento (LGPD, Consent Mode
// v2). Enquanto o AnalyticsGate não libera, track() só enfileira em memória
// (teto de 50 — depois disso descarta em silêncio, nunca quebra a UI). Quando o
// gate libera (aceite ou reabertura já concedida), flushQueue() despacha tudo
// que ficou pendente, na ordem em que chegou.
//
// Interface fechada por evento: cada evento só aceita os campos do contrato
// (PRD §6.2). Isso é a garantia de ZERO PII em tempo de compilação — não existe
// campo de nome, e-mail, telefone ou IP em nenhum TrackParams.
// =============================================================================

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

const QUEUE_MAX = 50

// ─── Contrato de eventos (PRD §6.2) ────────────────────────────────────────

type ArticleEventBase = {
  slug: string
}

type TrackParams = {
  article_view: ArticleEventBase & {
    category?: string
    referrer?: string
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
  }
  scroll_milestone: ArticleEventBase & { percent: 25 | 50 | 75 | 100 }
  chapter_enter: ArticleEventBase & { chapter_id: string; seconds_since_start: number }
  engaged_time: ArticleEventBase & { seconds: number }
  read_complete: ArticleEventBase & { read_seconds: number }
  interaction: ArticleEventBase & { element: string }
  article_share: ArticleEventBase & { method: 'native' | 'copy' }
  cta_click: ArticleEventBase & { cta: string; target: string }
  newsletter_signup: { source_slug: string }
  consent_update: { status: 'all' | 'essential-only' | 'custom' }
}

export type TrackEvent = keyof TrackParams

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type QueuedEvent = { event: TrackEvent; params: Record<string, unknown> }

let ready = false
const queue: QueuedEvent[] = []

/** Registra um evento. Enfileira até o gate liberar; nunca lança, nunca bloqueia a UI. */
export function track<E extends TrackEvent>(event: E, params: TrackParams[E]): void {
  const entry: QueuedEvent = { event, params: params as Record<string, unknown> }
  if (!ready) {
    if (queue.length >= QUEUE_MAX) return
    queue.push(entry)
    return
  }
  dispatch(entry)
}

function dispatch({ event, params }: QueuedEvent): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', event, params)
  } catch {
    /* GA indisponível — nunca derruba a página por causa de telemetria */
  }
}

/** Chamado pelo AnalyticsGate quando o consentimento libera o GA4: despacha a fila pendente. */
export function flushQueue(): void {
  ready = true
  while (queue.length) {
    const next = queue.shift()
    if (next) dispatch(next)
  }
}

/** Chamado pelo AnalyticsGate quando o consentimento é revogado: volta a enfileirar. */
export function pauseQueue(): void {
  ready = false
}
