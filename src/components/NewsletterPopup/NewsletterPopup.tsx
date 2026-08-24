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
import { useNewsletterSubmit } from '@/hooks/useNewsletterSubmit'
import { readConsent } from '@/lib/consent'
import { useLang } from '@/lib/LangProvider'
import { localizedPath } from '@/lib/i18n'
import { shell } from '@/content/i18n/shell'
import { NewTabIcon } from '@/components/TbfLink/NewTabIcon'

const SESSION_KEY = 'tbf-newsletter-shown'
const SHOW_DELAY_MS = 20000

export function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const { email, setEmail, status, errorMsg, submit } = useNewsletterSubmit()
  const lang = useLang()
  const t = shell[lang].popup
  const brandAlt = shell[lang].footer.brandAlt
  const privacyLabel = shell[lang].footer.links.privacy

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
          aria-label={t.closeAriaLabel}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        {/* O logotipo respira enquanto o popup está aberto (pedido do fundador
            2026-08-08): o site em preto e branco sozinho não explicava a causa
            do efeito, e a marca acesa é o que puxa o olho até aqui. A curva da
            luz mora no CSS (.newsletter-popup__brand, components.css). */}
        <Image
          src="/brand/TBF-SAO-PAULO.svg"
          alt={brandAlt}
          width={140}
          height={100}
          unoptimized
          className="newsletter-popup__brand"
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
          {t.headlineLine1}<br />{t.headlineLine2}
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
            {t.successMessage}
          </p>
        ) : (
          <form onSubmit={submit} noValidate>
            <div style={{ display: 'flex', gap: 'var(--tbf-space-3)', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                required
                aria-label={t.emailAriaLabel}
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
                {status === 'loading' ? '...' : t.submitLabel}
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
                // O aviso de nova guia caía sozinho na última linha, órfão. O
                // navegador reequilibra as linhas em vez de empurrar a sobra
                // toda para o fim.
                textWrap: 'pretty',
              }}
            >
              {t.privacyPrefix}
              {/* NOVA GUIA (pedido do fundador 2026-08-08). O popup pode aparecer
                  em QUALQUER página, inclusive no meio de uma matéria: mandar a
                  pessoa para a política de privacidade na mesma aba tirava ela de
                  onde estava. Abrir em segundo plano (a aba nasce atrás) não tem
                  API — só o navegador decide isso, no cmd/ctrl+clique do usuário.
                  Como ele mesmo pediu, a melhor decisão possível: nova guia +
                  aviso de que ela vai abrir, para ninguém se perder.
                  O AVISO VIROU SÓ A SETINHA (#01 CHANGES 2026-08-24: "não
                  precisa colocar em parênteses 'nova guia'"). A seta e o
                  parêntese diziam a mesma coisa, e o parêntese ainda ocupava uma
                  linha inteira do aviso de LGPD. `t.newTabNotice` continua no
                  dicionário, sem uso, caso ele queira o texto de volta.
                  É <a>, não <Link>: destino externo à navegação de cliente. */}
              <a
                href={localizedPath('/legal/privacy', lang)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'inherit',
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px',
                }}
              >
                {privacyLabel}
                <NewTabIcon />
              </a>
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
