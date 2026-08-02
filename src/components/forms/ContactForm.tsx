'use client'

// =============================================================================
// CONTACT FORM — Client Component
// Formulário geral de contato. Reusa /api/contact (mesmo backend de /access).
// Voz .TBF. — zero "Obrigado pelo contato".
// =============================================================================

import { useId, useState } from 'react'
import { useLang } from '@/lib/LangProvider'
import { contactUs } from '@/content/i18n/pages/contact-us'

interface FormData {
  name: string
  email: string
  message: string
  handle: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const formId = useId()
  const lang = useLang()
  const t = contactUs[lang].form

  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '', handle: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  function validate(): boolean {
    const next: Partial<Record<keyof FormData, string>> = {}
    if (!form.name.trim()) next.name = t.errors.nameRequired
    if (!form.email.trim()) {
      next.email = t.errors.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = t.errors.emailInvalid
    }
    if (!form.message.trim()) {
      next.message = t.errors.messageRequired
    } else if (form.message.trim().length < 20) {
      next.message = t.errors.messageMin
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    setError('')

    try {
      // Contrato com a API é fixo: name/email/message/handle/intent, sem
      // depender do idioma da UI.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, intent: 'tbf' }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        setStatus('error')
        setError(data.error ?? t.errors.generic)
      }
    } catch {
      setStatus('error')
      setError(t.errors.connection)
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <p
          style={{
            fontFamily: 'var(--tbf-type-display-lg-family)',
            fontSize: 'var(--tbf-type-display-lg-size-sm)',
            fontWeight: 'var(--tbf-type-display-lg-weight)',
            color: 'var(--tbf-text-primary)',
            marginBottom: 'var(--tbf-space-6)',
          }}
        >
          {t.success.title}
        </p>
        <p
          style={{
            fontFamily: 'var(--tbf-type-deck-family)',
            fontSize: 'var(--tbf-type-deck-size-sm)',
            color: 'var(--tbf-text-secondary)',
            marginBottom: 'var(--tbf-space-4)',
          }}
        >
          {t.success.line}
        </p>
        <p
          style={{
            fontFamily: 'var(--tbf-type-tag-family)',
            fontSize: 'var(--tbf-type-tag-size)',
            letterSpacing: 'var(--tbf-type-tag-ls)',
            color: 'var(--tbf-text-tertiary)',
            textTransform: 'uppercase',
          }}
        >
          {t.success.tag}
        </p>
      </div>
    )
  }

  return (
    <form
      className="form contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label={t.formAriaLabel}
    >
      {/* Nome */}
      <div className={`field${errors.name ? ' field--error' : ''}`}>
        <label className="field__label" htmlFor={`${formId}-name`}>{t.nameLabel}</label>
        <input
          id={`${formId}-name`}
          type="text"
          className="field__input"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder={t.namePlaceholder}
          autoComplete="name"
          required
          aria-required="true"
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
        />
        {errors.name && (
          <span id={`${formId}-name-error`} className="field__error-msg" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      {/* E-mail */}
      <div className={`field${errors.email ? ' field--error' : ''}`}>
        <label className="field__label" htmlFor={`${formId}-email`}>{t.emailLabel}</label>
        <input
          id={`${formId}-email`}
          type="email"
          className="field__input"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder={t.emailPlaceholder}
          autoComplete="email"
          required
          aria-required="true"
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
        />
        {errors.email && (
          <span id={`${formId}-email-error`} className="field__error-msg" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      {/* Handle / Link (opcional) */}
      <div className="field">
        <label className="field__label" htmlFor={`${formId}-handle`}>
          {t.handleLabel}{' '}
          <span style={{ color: 'var(--tbf-text-tertiary)', fontWeight: 'var(--tbf-font-weight-raw-300)' }}>
            {t.handleOptional}
          </span>
        </label>
        <input
          id={`${formId}-handle`}
          type="text"
          className="field__input"
          value={form.handle}
          onChange={(e) => setForm((f) => ({ ...f, handle: e.target.value }))}
          placeholder={t.handlePlaceholder}
          autoComplete="url"
        />
      </div>

      {/* Mensagem */}
      <div className={`field${errors.message ? ' field--error' : ''}`}>
        <label className="field__label" htmlFor={`${formId}-message`}>{t.messageLabel}</label>
        <textarea
          id={`${formId}-message`}
          className="field__input"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder={t.messagePlaceholder}
          required
          aria-required="true"
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          rows={6}
        />
        {errors.message && (
          <span id={`${formId}-message-error`} className="field__error-msg" role="alert">
            {errors.message}
          </span>
        )}
      </div>

      {/* Erro global */}
      {status === 'error' && error && (
        <p
          role="alert"
          style={{
            fontFamily: 'var(--tbf-type-caption-family)',
            fontSize: 'var(--tbf-type-caption-size-sm)',
            color: 'var(--tbf-color-status-error)',
          }}
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="btn btn--primary"
        disabled={status === 'loading'}
        aria-disabled={status === 'loading'}
      >
        {status === 'loading' ? t.submitLoading : t.submitCta}
        {status !== 'loading' && <span className="btn__arrow" aria-hidden="true">→</span>}
      </button>
    </form>
  )
}
