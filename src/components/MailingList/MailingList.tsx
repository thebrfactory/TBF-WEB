'use client'

import { useNewsletterSubmit } from '@/hooks/useNewsletterSubmit'

export function MailingList() {
  const { email, setEmail, status, errorMsg, submit } = useNewsletterSubmit()

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
            onSubmit={submit}
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
