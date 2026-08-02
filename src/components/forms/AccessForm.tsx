'use client'

// =============================================================================
// ACCESS FORM — Client Component
// Intent radio group visual + campos + submit com voz TBF
// =============================================================================

import { useState, useId } from 'react'
import Link from 'next/link'
import type { ContactIntent, ContactFormData, ContactFormState } from '@/types'
import { useLang } from '@/lib/LangProvider'
import { access } from '@/content/i18n/pages/access'
import { localizedPath } from '@/lib/i18n'

interface EntryPoint {
  value: ContactIntent
  tag: string
  name: string
  desc: string
}

interface AccessFormProps {
  entryPoints: EntryPoint[]
  defaultIntent: ContactIntent
}

export function AccessForm({ entryPoints, defaultIntent }: AccessFormProps) {
  const formId = useId()
  const lang = useLang()
  const t = access[lang].form

  const [intent, setIntent] = useState<ContactIntent>(defaultIntent)
  const [form, setForm] = useState<Omit<ContactFormData, 'intent'>>({
    name: '',
    email: '',
    message: '',
    handle: '',
  })
  const [state, setState] = useState<ContactFormState>({ status: 'idle' })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})

  function validate(): boolean {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}

    if (!form.name.trim()) newErrors.name = t.errors.nameRequired
    if (!form.email.trim()) {
      newErrors.email = t.errors.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t.errors.emailInvalid
    }
    if (!form.message.trim()) newErrors.message = t.errors.messageRequired
    if (form.message.trim().length < 20) {
      newErrors.message = t.errors.messageMin
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setState({ status: 'loading' })

    try {
      // Contrato com a API é fixo: name/email/message/handle/intent, sem
      // depender do idioma da UI.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, intent }),
      })

      if (res.ok) {
        setState({ status: 'success' })
      } else {
        const data = await res.json()
        setState({ status: 'error', error: data.error ?? t.errors.generic })
      }
    } catch {
      setState({ status: 'error', error: t.errors.connection })
    }
  }

  // Estado de sucesso — voz TBF
  if (state.status === 'success') {
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'var(--tbf-space-16)',
      }}
    >
      {/* ─── PONTOS DE ENTRADA ─────────────────────────────────────────── */}
      <fieldset
        style={{ padding: 0, margin: 0 }}
        aria-labelledby={`${formId}-intent-legend`}
      >
        <legend
          id={`${formId}-intent-legend`}
          style={{
            fontFamily: 'var(--tbf-type-micro-family)',
            fontSize: 'var(--tbf-type-micro-size)',
            letterSpacing: 'var(--tbf-type-micro-ls)',
            color: 'var(--tbf-text-tertiary)',
            textTransform: 'uppercase',
            marginBottom: 'var(--tbf-space-6)',
            display: 'block',
          }}
        >
          {t.entryLegend}
        </legend>

        <ul className="intent-group" role="list">
          {entryPoints.map((ep) => (
            <li key={ep.value}>
              <label className="intent-option">
                <input
                  type="radio"
                  name="intent"
                  value={ep.value}
                  checked={intent === ep.value}
                  onChange={() => setIntent(ep.value)}
                  aria-label={`${ep.tag}, ${ep.name}`}
                />
                <span className="intent-option__indicator" aria-hidden="true" />
                <span className="intent-option__label">
                  <span className="intent-option__name">
                    <span
                      style={{
                        fontFamily: 'var(--tbf-type-tag-family)',
                        letterSpacing: 'var(--tbf-type-tag-ls)',
                        textTransform: 'uppercase',
                        marginRight: 'var(--tbf-space-2)',
                      }}
                    >
                      {ep.tag}
                    </span>
                    {ep.name}
                  </span>
                  <span className="intent-option__desc">{ep.desc}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* ─── FORMULÁRIO ────────────────────────────────────────────────── */}
      <form
        id={`${formId}-form`}
        className="form"
        onSubmit={handleSubmit}
        noValidate
        aria-label={t.formAriaLabel}
      >
        <h2
          id={`${formId}-form-heading`}
          style={{
            fontFamily: 'var(--tbf-type-micro-family)',
            fontSize: 'var(--tbf-type-micro-size)',
            letterSpacing: 'var(--tbf-type-micro-ls)',
            color: 'var(--tbf-text-tertiary)',
            textTransform: 'uppercase',
          }}
        >
          {t.formHeading}
        </h2>

        {/* Nome */}
        <div className={`field${errors.name ? ' field--error' : ''}`}>
          <label className="field__label" htmlFor={`${formId}-name`}>
            {t.nameLabel}
          </label>
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
            <span
              id={`${formId}-name-error`}
              className="field__error-msg"
              role="alert"
            >
              {errors.name}
            </span>
          )}
        </div>

        {/* E-mail */}
        <div className={`field${errors.email ? ' field--error' : ''}`}>
          <label className="field__label" htmlFor={`${formId}-email`}>
            {t.emailLabel}
          </label>
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
            <span
              id={`${formId}-email-error`}
              className="field__error-msg"
              role="alert"
            >
              {errors.email}
            </span>
          )}
        </div>

        {/* Handle / Link (opcional) */}
        <div className="field">
          <label className="field__label" htmlFor={`${formId}-handle`}>
            {t.handleLabel}{' '}
            <span
              style={{
                color: 'var(--tbf-text-tertiary)',
                fontWeight: 'var(--tbf-font-weight-raw-300)',
              }}
            >
              {t.handleOptional}
            </span>
          </label>
          <input
            id={`${formId}-handle`}
            type="text"
            className="field__input"
            value={form.handle ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, handle: e.target.value }))}
            placeholder={t.handlePlaceholder}
            autoComplete="url"
          />
        </div>

        {/* Mensagem */}
        <div className={`field${errors.message ? ' field--error' : ''}`}>
          <label className="field__label" htmlFor={`${formId}-message`}>
            {t.messageLabel}
          </label>
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
            <span
              id={`${formId}-message-error`}
              className="field__error-msg"
              role="alert"
            >
              {errors.message}
            </span>
          )}
        </div>

        {/* Erro global */}
        {state.status === 'error' && state.error && (
          <p
            role="alert"
            style={{
              fontFamily: 'var(--tbf-type-caption-family)',
              fontSize: 'var(--tbf-type-caption-size-sm)',
              color: 'var(--tbf-color-status-error)',
            }}
          >
            {state.error}
          </p>
        )}

        {/* Submit */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--tbf-space-4)',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <button
            type="submit"
            className="btn btn--primary"
            disabled={state.status === 'loading'}
            aria-disabled={state.status === 'loading'}
          >
            {state.status === 'loading' ? t.submitLoading : t.submitCta}
            {state.status !== 'loading' && (
              <span className="btn__arrow" aria-hidden="true">→</span>
            )}
          </button>

          {/* CTA 2: Enter the Collective instead */}
          <Link
            href={localizedPath('/collective', lang)}
            style={{
              fontFamily: 'var(--tbf-type-tag-family)',
              fontSize: 'var(--tbf-type-tag-size)',
              letterSpacing: 'var(--tbf-type-tag-ls)',
              color: 'var(--tbf-text-tertiary)',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color var(--tbf-motion-duration-micro) var(--tbf-motion-easing-micro)',
            }}
          >
            {t.collectiveLinkCta}
          </Link>
        </div>
      </form>
    </div>
  )
}
