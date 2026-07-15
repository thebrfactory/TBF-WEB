'use client'

// =============================================================================
// NEWSLETTER POPUP — captura de e-mail sitewide
// Aparece uma vez por sessão, ~1.5s após o primeiro load. Reaproveita a mesma
// lógica de submit do MailingList (rodapé) via useNewsletterSubmit.
// =============================================================================

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useNewsletterSubmit } from '@/hooks/useNewsletterSubmit'

const SESSION_KEY = 'tbf-newsletter-shown'
const SHOW_DELAY_MS = 10000

export function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const { email, setEmail, status, errorMsg, submit } = useNewsletterSubmit()
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)

  // Consentimento LGPD obrigatório antes do envio.
  function handleSubmit(e: React.FormEvent) {
    if (!consent) {
      e.preventDefault()
      setConsentError(true)
      return
    }
    setConsentError(false)
    submit(e, { consent: true })
  }

  const close = useCallback(() => {
    setOpen(false)
    sessionStorage.setItem(SESSION_KEY, 'true')
  }, [])

  // Trigger — uma vez por sessão, após 10s no site. Só aparece DEPOIS que a
  // escolha de cookies foi feita (senão popup e cookie banner se sobrepõem na
  // primeira visita, sobretudo no mobile).
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    let timer: ReturnType<typeof setTimeout> | undefined
    const start = () => {
      timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS)
    }

    let hasCookieChoice = true
    try {
      hasCookieChoice = !!localStorage.getItem('tbf-cookie-consent')
    } catch {
      hasCookieChoice = true // storage bloqueado → não trava o popup
    }

    if (hasCookieChoice) {
      start()
      return () => { if (timer) clearTimeout(timer) }
    }

    // Ainda sem escolha de cookies → espera o evento do CookieBanner.
    const onCookieChoice = () => start()
    window.addEventListener('tbf-cookie-choice', onCookieChoice, { once: true })
    return () => {
      window.removeEventListener('tbf-cookie-choice', onCookieChoice)
      if (timer) clearTimeout(timer)
    }
  }, [])

  // Fecha automaticamente após inscrição confirmada
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(close, 2200)
      return () => clearTimeout(timer)
    }
  }, [status, close])

  // ESC fecha. NÃO trava o scroll do body — a home continua rolável com o popup
  // aberto (pedido). O overlay é só visual (grayscale) e não captura cliques.
  useEffect(() => {
    if (!open) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, close])

  return (
    <>
      <div
        className={`newsletter-popup-overlay ${open ? 'newsletter-popup-overlay--open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />
      <div
        className={`newsletter-popup ${open ? 'newsletter-popup--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-popup-heading"
      >
        <button
          type="button"
          className="newsletter-popup__close"
          onClick={close}
          aria-label="Fechar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        <Image
          src="/brand/TBF-SAO-PAULO.svg"
          alt=".TBF. SÃO PAULO"
          width={140}
          height={100}
          unoptimized
          style={{ width: 'auto', height: 44, marginBottom: 'var(--tbf-space-2)' }}
        />

        <h2
          id="newsletter-popup-heading"
          style={{
            fontFamily: 'var(--tbf-font-family-display)',
            fontSize: 'clamp(1.35rem, 4vw, 1.85rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--tbf-text-primary)',
            marginBottom: 'var(--tbf-space-2)',
            maxWidth: '20ch',
          }}
        >
          Get the best stories<br />from <span style={{ color: 'var(--tbf-accent)' }}>.TBF.</span> community.
        </h2>

        {status === 'success' ? (
          <p
            style={{
              fontFamily: 'var(--tbf-font-family-ui)',
              fontSize: 'var(--tbf-type-micro-size)',
              letterSpacing: 'var(--tbf-type-micro-ls)',
              color: 'var(--tbf-accent)',
              textTransform: 'uppercase',
            }}
          >
            You&apos;re in. Welcome to the factory.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'flex', gap: 'var(--tbf-space-3)', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                aria-label="Email address"
                disabled={status === 'loading'}
                style={{
                  flex: 1,
                  minWidth: '180px',
                  background: 'transparent',
                  border: '1px solid var(--tbf-border)',
                  color: 'var(--tbf-text-primary)',
                  fontFamily: 'var(--tbf-font-family-body)',
                  fontSize: '0.9rem',
                  padding: '0.5rem 1.1rem',
                  outline: 'none',
                  borderRadius: '999px',
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn--primary"
                style={{ borderRadius: '999px', whiteSpace: 'nowrap' }}
              >
                {status === 'loading' ? '...' : 'Subscribe'}
              </button>
            </div>

            {/* Consentimento LGPD */}
            <label className="consent-check" style={{ marginTop: 'var(--tbf-space-2)' }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => { setConsent(e.target.checked); if (e.target.checked) setConsentError(false) }}
                aria-invalid={consentError}
              />
              <span>
                Você concorda em receber nossas comunicações.{' '}
                <Link href="/legal/privacy">Saiba mais em nossa política de privacidade.</Link>
              </span>
            </label>
            {consentError && (
              <p role="alert" className="consent-check__error">
                Confirme o consentimento para continuar.
              </p>
            )}

            {status === 'error' && (
              <p
                role="alert"
                style={{
                  marginTop: 'var(--tbf-space-3)',
                  fontFamily: 'var(--tbf-font-family-ui)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  color: '#ff4444',
                }}
              >
                {errorMsg}
              </p>
            )}
          </form>
        )}
      </div>
    </>
  )
}
