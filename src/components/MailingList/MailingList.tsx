'use client'

import { useState } from 'react'

export function MailingList() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMsg(data.error ?? 'Erro. Tente novamente.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Erro. Tente novamente.')
    }
  }

  return (
    <section
      aria-labelledby="mailing-list-heading"
      style={{
        borderTop: '1px solid var(--tbf-border)',
        borderBottom: '1px solid var(--tbf-border)',
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
              color: 'var(--tbf-text-primary)',
              maxWidth: '18ch',
            }}
          >
            Get the best stories from the .TBF. community.
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
              gap: 'var(--tbf-space-3)',
              width: '100%',
              maxWidth: '560px',
              flexWrap: 'wrap',
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
                flex: 1,
                minWidth: '200px',
                background: 'transparent',
                border: '1px solid var(--tbf-border)',
                color: 'var(--tbf-text-primary)',
                fontFamily: 'var(--tbf-font-family-body)',
                fontSize: '0.9rem',
                padding: '0.75rem 1.25rem',
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
