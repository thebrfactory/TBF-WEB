import { readConsent } from '@/lib/consent'

// Meta Pixel: ID por env. Vazio = integração inerte (ver components/Analytics/MetaPixel).
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''

// Correspondência avançada MANUAL. A Meta só reconhece os parâmetros no
// fbq('init', ID, {...}) do código base: por isso o dado é guardado aqui no envio
// do formulário e o MetaPixel o lê no init de cada carga. Só com marketing aceito;
// revogar o consentimento apaga a chave (ver writeConsent). Minúsculas sem hash:
// o pixel aplica o SHA-256.
export const META_AM_STORAGE_KEY = 'tbf-meta-am'

export type MetaUserData = Partial<Record<'em' | 'ph' | 'fn' | 'ln', string>>

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const plain = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')

/** Normaliza o que o formulário trouxe. Campo vazio ou inválido sai fora. */
export function normalizeUserData(input: {
  email?: string
  phone?: string
  name?: string
}): MetaUserData {
  const out: MetaUserData = {}
  const em = input.email?.trim().toLowerCase()
  if (em && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) out.em = em
  const digits = input.phone?.replace(/\D/g, '')
  if (digits && digits.length >= 8) {
    out.ph = digits.startsWith('55') && digits.length >= 12 ? digits : `55${digits.replace(/^0+/, '')}`
  }
  const parts = (input.name ?? '').trim().split(/\s+/).map(plain).filter(Boolean)
  if (parts[0]) out.fn = parts[0]
  if (parts.length > 1) out.ln = parts[parts.length - 1]
  return out
}

/** Dados salvos (objeto vazio se nada ou sem consentimento). Uso no cliente. */
export function readSavedUserData(): MetaUserData {
  try {
    const raw = localStorage.getItem(META_AM_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const out: MetaUserData = {}
    for (const k of ['em', 'ph', 'fn', 'ln'] as const) {
      const v = parsed[k]
      if (typeof v === 'string' && v) out[k] = v
    }
    return out
  } catch {
    return {}
  }
}

/** JSON seguro para dentro de <script>: escapa < > & e separadores de linha. */
export function safeJsonForScript(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .split(String.fromCharCode(0x2028)).join('\\u2028')
    .split(String.fromCharCode(0x2029)).join('\\u2029')
}

export type MetaEventName = 'PageView' | 'ViewContent' | 'Contact' | 'Lead' | 'PitchComplete'

const STANDARD = new Set<string>(['PageView', 'ViewContent', 'Contact', 'Lead'])
const CAPI_PATH = '/api/meta-capi'

function newEventId(): string {
  try {
    return crypto.randomUUID()
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
  }
}

/** Espelho server-side (API de Conversoes) com o MESMO event_id do pixel. */
function sendCapi(
  name: MetaEventName,
  eventId: string,
  custom: Record<string, unknown>,
  userData: MetaUserData,
): void {
  try {
    const payload: Record<string, unknown> = {
      event_name: name,
      event_id: eventId,
      event_source_url: window.location.href,
      custom_data: custom,
    }
    if (Object.keys(userData).length) payload.user_data_raw = userData
    const body = JSON.stringify(payload)
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' })
      if (navigator.sendBeacon(CAPI_PATH, blob)) return
    }
    void fetch(CAPI_PATH, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* telemetria nunca derruba a pagina */
  }
}

/**
 * Evento do pixel + espelho na API de Conversoes, mesmo eventID (deduplicacao).
 * No-op sem marketing aceito. Se o fbq ainda nao carregou (o snippet entra
 * depois da hidratacao), espera ate 6s antes de desistir.
 * Retorna false quando nao disparou por falta de consentimento.
 */
export function trackMetaEvent(
  name: MetaEventName,
  custom: Record<string, unknown> = {},
  userData: MetaUserData = {},
): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (readConsent()?.marketing !== true) return false
    const eventId = newEventId()
    const fire = () => {
      window.fbq?.(STANDARD.has(name) ? 'track' : 'trackCustom', name, custom, { eventID: eventId })
    }
    if (typeof window.fbq === 'function') {
      fire()
    } else {
      let tries = 0
      const t = window.setInterval(() => {
        tries += 1
        if (typeof window.fbq === 'function') {
          window.clearInterval(t)
          if (readConsent()?.marketing === true) fire()
        } else if (tries > 60) {
          window.clearInterval(t)
        }
      }, 100)
    }
    sendCapi(name, eventId, custom, userData)
    return true
  } catch {
    return false
  }
}

/**
 * Evento Lead no envio com sucesso de um formulario. No-op sem marketing aceito.
 * Salva a correspondencia avancada, refaz o init com ela e dispara o Lead
 * (pixel + API de Conversoes, mesmo eventID).
 */
export function trackMetaLead(input: { email?: string; phone?: string; name?: string } = {}): void {
  if (typeof window === 'undefined') return
  try {
    if (readConsent()?.marketing !== true) return
    const merged = { ...readSavedUserData(), ...normalizeUserData(input) }
    if (Object.keys(merged).length) {
      localStorage.setItem(META_AM_STORAGE_KEY, JSON.stringify(merged))
    }
    if (typeof window.fbq === 'function' && META_PIXEL_ID) window.fbq('init', META_PIXEL_ID, merged)
    trackMetaEvent('Lead', {}, merged)
  } catch {
    /* telemetria nunca derruba a pagina */
  }
}
