'use client'

// =============================================================================
// COOKIE BANNER — consentimento LGPD sitewide
// Aparece na primeira visita (sem escolha salva). 3 ações: aceitar todos ·
// rejeitar opcionais · preferências. Persiste em localStorage. Zero rede.
// =============================================================================

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'tbf-cookie-consent'

type Consent = {
  necessary: true
  analytics: boolean
  marketing: boolean
  ts: number
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)

  // Só aparece se ainda não houver escolha registrada.
  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  function persist(consent: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    } catch {
      /* modo privado / storage bloqueado — segue sem persistir */
    }
    setVisible(false)
    // Avisa o NewsletterPopup que a escolha de cookies foi feita — ele só aparece
    // depois disso, para os dois nunca se sobreporem na primeira visita.
    try {
      window.dispatchEvent(new Event('tbf-cookie-choice'))
    } catch {
      /* ambiente sem window — ignora */
    }
  }

  const acceptAll = () =>
    persist({ necessary: true, analytics: true, marketing: true, ts: Date.now() })

  const rejectOptional = () =>
    persist({ necessary: true, analytics: false, marketing: false, ts: Date.now() })

  const savePrefs = () =>
    persist({ necessary: true, analytics, marketing, ts: Date.now() })

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
                <strong>Analytics</strong>: nos ajudam a entender como o site é usado.
              </span>
            </label>
            <label className="cookie-pref">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <span>
                <strong>Marketing</strong>: personalizam conteúdo e comunicações.
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
