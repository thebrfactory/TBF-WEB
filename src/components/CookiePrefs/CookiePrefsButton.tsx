'use client'

// =============================================================================
// COOKIE PREFERENCES — reabre o CookieBanner em modo preferências de qualquer
// lugar (rodapé). Revogabilidade exigida pela LGPD (art. 18) e resposta ao
// "cadê o banner de cookies?": some depois da 1a escolha, mas volta por aqui.
// =============================================================================

export function CookiePrefsButton() {
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
      Cookie Preferences
    </button>
  )
}
