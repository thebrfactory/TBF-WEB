'use client'

// =============================================================================
// NEWSLETTER POPUP — captura de e-mail sitewide
// Aparece uma vez por sessão, SOMENTE por tempo: 20s no site (pedido do fundador).
// Sem gatilho de scroll — nunca aborda quem acabou de chegar.
// Reaproveita a mesma lógica de submit do MailingList (rodapé) via useNewsletterSubmit.
//
// Mora no MESMO canto do banner de cookies (inferior direito) e é gateado por ele:
// a contagem dos 20s só começa DEPOIS que a pessoa decidiu sobre cookies. As duas
// caixas nunca dividem a tela, então não precisam se desviar uma da outra.
// =============================================================================

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useNewsletterSubmit } from '@/hooks/useNewsletterSubmit'
import { readConsent } from '@/lib/consent'

const SESSION_KEY = 'tbf-newsletter-shown'
const SHOW_DELAY_MS = 20000

export function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const { email, setEmail, status, errorMsg, submit } = useNewsletterSubmit()

  const close = useCallback(() => {
    setOpen(false)
    sessionStorage.setItem(SESSION_KEY, 'true')
  }, [])

  // Trigger — uma vez por sessão. Só aparece DEPOIS que a escolha de cookies foi
  // feita (as duas caixas ocupam o mesmo canto: sem esse gate elas se sobrepõem)
  // e SOMENTE após 20s no site (pedido do fundador — sem gatilho de scroll).
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    let stop = () => {}

    // Único gatilho: 20s no site.
    const start = () => {
      const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS)
      stop = () => clearTimeout(timer)
    }

    // Consentimento vencido ou de versão antiga conta como SEM escolha: o banner
    // vai reaparecer, e o popup espera a nova decisão em vez de brigar por espaço.
    if (readConsent()) {
      start()
      return () => stop()
    }

    // Ainda sem escolha de cookies → espera o evento do CookieBanner.
    const onCookieChoice = () => start()
    window.addEventListener('tbf-cookie-choice', onCookieChoice, { once: true })
    return () => {
      window.removeEventListener('tbf-cookie-choice', onCookieChoice)
      stop()
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
          aria-label="Close"
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
          style={{ width: 'auto', height: 44, marginBottom: 'var(--tbf-space-6)' }}
        />

        <h2
          id="newsletter-popup-heading"
          style={{
            fontFamily: 'var(--tbf-font-family-display)',
            fontSize: 'clamp(1.35rem, 4vw, 1.85rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--tbf-text-primary)',
            marginBottom: 'var(--tbf-space-4)',
            maxWidth: '20ch',
          }}
        >
          Get the best stories<br />from .TBF. community.
        </h2>

        {status === 'success' ? (
          <p
            style={{
              fontFamily: 'var(--tbf-font-family-ui)',
              fontSize: 'var(--tbf-type-micro-size)',
              letterSpacing: 'var(--tbf-type-micro-ls)',
              color: 'var(--tbf-text-primary)',
              textTransform: 'uppercase',
            }}
          >
            You&apos;re in. Welcome to the factory.
          </p>
        ) : (
          <form onSubmit={submit} noValidate>
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
                style={{
                  borderRadius: '999px',
                  whiteSpace: 'nowrap',
                  fontSize: '0.6rem',
                  padding: '0.45rem 1.05rem',
                }}
              >
                {status === 'loading' ? '...' : 'Subscribe'}
              </button>
            </div>

            {/* Aviso LGPD — o envio do form é o ato de consentimento. */}
            <p
              style={{
                marginTop: 'var(--tbf-space-4)',
                maxWidth: '46ch',
                fontFamily: 'var(--tbf-type-caption-family)',
                fontSize: 'var(--tbf-type-caption-size-sm)',
                lineHeight: 1.5,
                color: 'var(--tbf-text-tertiary)',
              }}
            >
              By subscribing, you agree to our{' '}
              <Link
                href="/legal/privacy"
                style={{
                  color: 'inherit',
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px',
                }}
              >
                Privacy Policy
              </Link>
              .
            </p>

            {status === 'error' && (
              <p
                role="alert"
                style={{
                  marginTop: 'var(--tbf-space-3)',
                  fontFamily: 'var(--tbf-font-family-ui)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  color: 'var(--tbf-color-status-error)',
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
