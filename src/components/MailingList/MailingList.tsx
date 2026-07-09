'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useNewsletterSubmit } from '@/hooks/useNewsletterSubmit'

export function MailingList() {
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

  return (
    <section
      aria-labelledby="mailing-list-heading"
      style={{
        paddingBlock: 'var(--tbf-space-16)',
        background: '#000',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'var(--tbf-space-8)',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--tbf-font-family-ui)',
              fontSize: 'var(--tbf-type-micro-size)',
              letterSpacing: 'var(--tbf-type-micro-ls)',
              color: 'var(--tbf-text-tertiary)',
              textTransform: 'uppercase',
              marginBottom: 'var(--tbf-space-4)',
            }}
          >
            Join our mailing list
          </p>
          <h2
            id="mailing-list-heading"
            style={{
              fontFamily: 'var(--tbf-font-family-display)',
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--tbf-text-primary)',
            }}
          >
            Get the best stories<br />from <span style={{ fontWeight: 800 }}>.TBF.</span> community.
          </h2>
        </div>

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
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--tbf-space-5)',
              width: '100%',
            }}
            noValidate
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              aria-label="Email address"
              disabled={status === 'loading'}
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px solid var(--tbf-border)',
                color: 'var(--tbf-text-primary)',
                fontFamily: 'var(--tbf-font-family-body)',
                fontSize: '1rem',
                padding: '1rem 1.5rem',
                outline: 'none',
                borderRadius: '999px',
                boxSizing: 'border-box',
              }}
            />

            {/* Consentimento LGPD */}
            <label className="consent-check">
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
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn btn--primary"
              style={{ borderRadius: '999px' }}
            >
              {status === 'loading' ? (
                '...'
              ) : (
                <>
                  Subscribe
                  <span className="btn__arrow" aria-hidden="true">→</span>
                </>
              )}
            </button>
            {status === 'error' && (
              <p
                role="alert"
                style={{
                  width: '100%',
                  fontFamily: 'var(--tbf-font-family-ui)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  color: '#ff4444',
                  textAlign: 'center',
                }}
              >
                {errorMsg}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
