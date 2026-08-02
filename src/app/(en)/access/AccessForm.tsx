'use client'

// =============================================================================
// ACCESS FORM — Client Component
// Intent radio group visual + campos + submit com voz TBF
// =============================================================================

import { useState, useId } from 'react'
import Link from 'next/link'
import type { ContactIntent, ContactFormData, ContactFormState } from '@/types'

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

    if (!form.name.trim()) newErrors.name = 'Nome é obrigatório.'
    if (!form.email.trim()) {
      newErrors.email = 'E-mail é obrigatório.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'E-mail inválido.'
    }
    if (!form.message.trim()) newErrors.message = 'Mensagem é obrigatória.'
    if (form.message.trim().length < 20) {
      newErrors.message = 'Conta mais. Mínimo 20 caracteres.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setState({ status: 'loading' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, intent }),
      })

      if (res.ok) {
        setState({ status: 'success' })
      } else {
        const data = await res.json()
        setState({ status: 'error', error: data.error ?? 'Algo falhou. Tente novamente.' })
      }
    } catch {
      setState({ status: 'error', error: 'Erro de conexão. Tente novamente.' })
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
          Canal aberto.
        </p>
        <p
          style={{
            fontFamily: 'var(--tbf-type-deck-family)',
            fontSize: 'var(--tbf-type-deck-size-sm)',
            color: 'var(--tbf-text-secondary)',
            marginBottom: 'var(--tbf-space-4)',
          }}
        >
          Retornamos quando faz sentido.
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
          .TBF.
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
          Ponto de Entrada
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
        aria-label="Formulário de contato"
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
          A transmissão
        </h2>

        {/* Nome */}
        <div className={`field${errors.name ? ' field--error' : ''}`}>
          <label className="field__label" htmlFor={`${formId}-name`}>
            Nome
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            className="field__input"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Seu nome completo"
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
            E-mail
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            className="field__input"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="seu@email.com"
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
            Handle ou Link{' '}
            <span
              style={{
                color: 'var(--tbf-text-tertiary)',
                fontWeight: 'var(--tbf-font-weight-raw-300)',
              }}
            >
              (opcional)
            </span>
          </label>
          <input
            id={`${formId}-handle`}
            type="text"
            className="field__input"
            value={form.handle ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, handle: e.target.value }))}
            placeholder="@handle ou https://..."
            autoComplete="url"
          />
        </div>

        {/* Mensagem */}
        <div className={`field${errors.message ? ' field--error' : ''}`}>
          <label className="field__label" htmlFor={`${formId}-message`}>
            Mensagem
          </label>
          <textarea
            id={`${formId}-message`}
            className="field__input"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder="O que você quer dizer. Sem filtro."
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
            {state.status === 'loading' ? 'Enviando…' : 'Send the transmission'}
            {state.status !== 'loading' && (
              <span className="btn__arrow" aria-hidden="true">→</span>
            )}
          </button>

          {/* CTA 2: Enter the Collective instead */}
          <Link
            href="/collective"
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
            Enter the Collective instead →
          </Link>
        </div>
      </form>
    </div>
  )
}
