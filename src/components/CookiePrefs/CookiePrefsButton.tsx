'use client'

// =============================================================================
// COOKIE PREFERENCES — reabre o CookieBanner em modo preferências de qualquer
// lugar (rodapé). Revogabilidade exigida pela LGPD (art. 18) e resposta ao
// "cadê o banner de cookies?": some depois da 1a escolha, mas volta por aqui.
//
// O Footer (que chama este botão) é componente de SERVIDOR, então o idioma
// chega por propriedade em vez de useLang().
// =============================================================================

import type { Lang } from '@/lib/i18n'
import { shell } from '@/content/i18n/shell'

export function CookiePrefsButton({ lang }: { lang: Lang }) {
  const t = shell[lang].cookies

  return (
    <button
      type="button"
      className="footer__link"
      onClick={() => {
        try {
          window.dispatchEvent(new Event('tbf-open-cookie-prefs'))
        } catch {
          /* ambiente sem window — ignora */
        }
      }}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        margin: 0,
        cursor: 'pointer',
        textAlign: 'inherit',
      }}
    >
      {t.footerButton}
    </button>
  )
}
