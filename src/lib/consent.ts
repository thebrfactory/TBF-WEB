// =============================================================================
// CONSENTIMENTO DE COOKIES — fonte única da verdade (LGPD)
//
// Três componentes leem o mesmo registro (CookieBanner, ConsentedAnalytics,
// NewsletterPopup). Cada um lendo localStorage à sua maneira é como o site
// acabou tratando registro legado como consentimento válido — e o banner parou
// de aparecer para sempre. A regra de validade mora AQUI e só aqui.
//
// Um consentimento salvo vence por dois motivos:
//   · versão — `v` diferente de CONSENT_VERSION significa que as categorias
//     mudaram desde a escolha, então a escolha antiga não cobre o site atual.
//   · idade — mais velho que CONSENT_MAX_AGE_MS (12 meses). Consentimento não é
//     eterno; a renovação periódica é a prática recomendada pela ANPD.
//
// Registro ausente, vencido, fora do formato, ou storage bloqueado ⇒ SEM
// consentimento. Nunca o contrário: na dúvida o site pergunta de novo e não
// carrega nada opcional.
// =============================================================================

export const CONSENT_STORAGE_KEY = 'tbf-cookie-consent'

// Bump ao adicionar/remover/renomear categoria de cookie.
// v1 = registro legado (ainda trazia `marketing`, categoria que o site não usa)
// v2 = necessários + analytics
export const CONSENT_VERSION = 2

export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000

export type Consent = {
  v: number
  necessary: true
  analytics: boolean
  ts: number
}

/** Consentimento vigente, ou null quando o site precisa perguntar de novo. */
export function readConsent(): Consent | null {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(CONSENT_STORAGE_KEY)
  } catch {
    return null
  }
  if (!raw) return null

  try {
    const saved = JSON.parse(raw) as Partial<Consent>
    if (saved.v !== CONSENT_VERSION) return null
    if (typeof saved.analytics !== 'boolean') return null
    if (typeof saved.ts !== 'number') return null
    if (Date.now() - saved.ts > CONSENT_MAX_AGE_MS) return null
    return { v: CONSENT_VERSION, necessary: true, analytics: saved.analytics, ts: saved.ts }
  } catch {
    return null
  }
}

/** Grava a escolha e avisa o site inteiro (analytics + popup reagem na hora). */
export function writeConsent(analytics: boolean): void {
  const consent: Consent = {
    v: CONSENT_VERSION,
    necessary: true,
    analytics,
    ts: Date.now(),
  }
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))
  } catch {
    /* modo privado / storage bloqueado — segue sem persistir */
  }
  try {
    window.dispatchEvent(new Event('tbf-cookie-choice'))
  } catch {
    /* ambiente sem window — ignora */
  }
}
