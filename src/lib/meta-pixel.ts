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

/**
 * Evento Lead no envio com sucesso de um formulário. No-op sem marketing aceito.
 * Salva a correspondência avançada, refaz o init com ela e dispara o Lead.
 */
export function trackMetaLead(input: { email?: string; phone?: string; name?: string } = {}): void {
  if (typeof window === 'undefined') return
  try {
    if (readConsent()?.marketing !== true) return
    const merged = { ...readSavedUserData(), ...normalizeUserData(input) }
    if (Object.keys(merged).length) {
      localStorage.setItem(META_AM_STORAGE_KEY, JSON.stringify(merged))
    }
    if (typeof window.fbq !== 'function') return
    if (META_PIXEL_ID) window.fbq('init', META_PIXEL_ID, merged)
    window.fbq('track', 'Lead')
  } catch {
    /* telemetria nunca derruba a página */
  }
}
