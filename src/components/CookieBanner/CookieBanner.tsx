'use client'

// =============================================================================
// COOKIE BANNER — consentimento LGPD sitewide
// Aparece na primeira visita (sem escolha salva). Duas categorias REAIS: cookies
// necessários (sempre) + analytics (Vercel — gateado de verdade pelo
// ConsentedAnalytics). Sem categoria de marketing: o site não seta esse cookie.
// A escolha persiste em localStorage e pode ser reaberta a qualquer momento pelo
// link "Cookie Preferences" do rodapé (evento tbf-open-cookie-prefs). Zero rede.
// =============================================================================

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'tbf-cookie-consent'

type Consent = {
  necessary: true
  analytics: boolean
  ts: number
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [analytics, setAnalytics] = useState(true)

  // Primeira visita → aparece. Reabertura (rodapé) → aparece já em modo
  // preferências, refletindo a escolha salva (revogabilidade, LGPD art. 18).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        setVisible(true)
      } else {
        const saved = JSON.parse(raw) as Partial<Consent>
        setAnalytics(saved.analytics ?? true)
      }
    } catch {
      setVisible(true)
    }

    // Reabridor: qualquer lugar do site pode reabrir o painel de preferências.
    const onReopen = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) setAnalytics((JSON.parse(raw) as Partial<Consent>).analytics ?? true)
      } catch {
        /* storage bloqueado — mantém o estado atual */
      }
      setShowPrefs(true)
      setVisible(true)
    }
    window.addEventListener('tbf-open-cookie-prefs', onReopen)
    return () => window.removeEventListener('tbf-open-cookie-prefs', onReopen)
  }, [])

  function persist(consent: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    } catch {
      /* modo privado / storage bloqueado — segue sem persistir */
    }
    setVisible(false)
    setShowPrefs(false)
    // Avisa (1) o NewsletterPopup, que só aparece depois da escolha de cookies, e
    // (2) o ConsentedAnalytics, que liga/desliga o Vercel Analytics na hora.
    try {
      window.dispatchEvent(new Event('tbf-cookie-choice'))
    } catch {
      /* ambiente sem window — ignora */
    }
  }

  const acceptAll = () =>
    persist({ necessary: true, analytics: true, ts: Date.now() })

  const rejectOptional = () =>
    persist({ necessary: true, analytics: false, ts: Date.now() })

  const savePrefs = () =>
    persist({ necessary: true, analytics, ts: Date.now() })

  if (!visible) return null

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
    >
      <div className="cookie-banner__inner">
        {showPrefs && (
          <div className="cookie-banner__prefs">
            <label className="cookie-pref cookie-pref--locked">
              <input type="checkbox" checked disabled aria-label="Cookies necessários (sempre ativos)" />
              <span>
                <strong>Necessários</strong>: essenciais para o funcionamento do site. Sempre ativos.
              </span>
            </label>
            <label className="cookie-pref">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span>
                <strong>Analytics</strong>: nos ajudam a entender como o site é usado (Vercel, sem perfilamento).
              </span>
            </label>
          </div>
        )}

        <div className="cookie-banner__actions">
          {showPrefs ? (
            <button type="button" className="btn btn--primary cookie-banner__btn" onClick={savePrefs}>
              Salvar preferências
            </button>
          ) : (
            <button type="button" className="btn btn--primary cookie-banner__btn" onClick={acceptAll}>
              Aceitar todos os cookies
            </button>
          )}
          <button type="button" className="btn btn--secondary cookie-banner__btn" onClick={rejectOptional}>
            Rejeitar cookies opcionais
          </button>
        </div>

        {/* Texto abaixo dos botões (pedido), enxuto. */}
        <p className="cookie-banner__text">
          Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com a{' '}
          <Link href="/legal/privacy" className="cookie-banner__link">
            Política de Privacidade
          </Link>
          .
        </p>

        {!showPrefs && (
          <button
            type="button"
            className="cookie-banner__prefs-toggle"
            onClick={() => setShowPrefs(true)}
          >
            Preferências de cookies
          </button>
        )}
      </div>
    </div>
  )
}
