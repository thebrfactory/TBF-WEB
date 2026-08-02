'use client'

// =============================================================================
// COLLECTIVE FORM — Client Component
// Formulário de candidatura inline com voz TBF
// CTAs: Submit your presence · Read the Manifesto first
// =============================================================================

import { useState, useId } from 'react'
import Link from 'next/link'
import type { CollectiveFormData, ContactFormState } from '@/types'

export function CollectiveForm() {
  const formId = useId()

  const [form, setForm] = useState<CollectiveFormData>({
    name: '',
    role: '',
    portfolioLink: '',
    howDidYouFind: '',
  })
  const [state, setState] = useState<ContactFormState>({ status: 'idle' })
  const [errors, setErrors] = useState<Partial<Record<keyof CollectiveFormData, string>>>({})

  function validate(): boolean {
    const newErrors: Partial<Record<keyof CollectiveFormData, string>> = {}

    if (!form.name.trim()) newErrors.name = 'Nome é obrigatório.'
    if (!form.role.trim()) newErrors.role = 'Área de atuação é obrigatória.'
    if (!form.howDidYouFind.trim()) {
      newErrors.howDidYouFind = 'Como você chegou aqui? Isso importa.'
    } else if (form.howDidYouFind.trim().length < 15) {
      newErrors.howDidYouFind = 'Elabore um pouco mais.'
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
        body: JSON.stringify({
          name: form.name,
          email: `collective-application-${Date.now()}@tbf.internal`,
          intent: 'tbf',
          message: [
            `Área de atuação: ${form.role}`,
            form.portfolioLink ? `Portfolio/Link: ${form.portfolioLink}` : '',
            '',
            `Como chegou até aqui: ${form.howDidYouFind}`,
          ]
            .filter(Boolean)
            .join('\n'),
          handle: form.portfolioLink,
          formType: 'collective',
        }),
      })

      if (res.ok) {
        setState({ status: 'success' })
      } else {
        const data = await res.json()
        setState({ status: 'error', error: data.error ?? 'Algo falhou.' })
      }
    } catch {
      setState({ status: 'error', error: 'Erro de conexão.' })
    }
  }

  // Sucesso — voz TBF
  if (state.status === 'success') {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <p
          style={{
            fontFamily: 'var(--tbf-type-display-lg-family)',
            fontSize: 'var(--tbf-type-display-lg-size-sm)',
            fontWeight: 'var(--tbf-type-display-lg-weight)',
            color: 'var(--tbf-text-primary)',
            marginBottom: 'var(--tbf-space-4)',
          }}
        >
          Presença registrada.
        </p>
        <p
          style={{
            fontFamily: 'var(--tbf-type-deck-family)',
            fontSize: 'var(--tbf-type-deck-size-sm)',
            color: 'var(--tbf-text-secondary)',
            marginBottom: 'var(--tbf-space-4)',
          }}
        >
          Avaliamos e retornamos quando faz sentido.
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
          .TBF. Collective Hotel Casino
        </p>
      </div>
    )
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulário de candidatura ao coletivo"
    >
      {/* CTA 2: Read the Manifesto first — ANTES do formulário */}
      <p
        style={{
          fontFamily: 'var(--tbf-type-body-family)',
          fontSize: 'var(--tbf-type-body-sm-size-sm)',
          lineHeight: 'var(--tbf-type-body-sm-lh)',
          color: 'var(--tbf-text-secondary)',
          marginBottom: 'var(--tbf-space-2)',
        }}
      >
        Antes de candidatar-se,{' '}
        <Link
          href="/manifesto"
          style={{
            color: 'var(--tbf-accent)',
            textDecoration: 'none',
            }}
        >
          leia o manifesto
        </Link>
        . Quem chega sem contexto, sai sem resposta.
      </p>

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
          placeholder="Seu nome"
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

      {/* Área de atuação */}
      <div className={`field${errors.role ? ' field--error' : ''}`}>
        <label className="field__label" htmlFor={`${formId}-role`}>
          Área de atuação
        </label>
        <input
          id={`${formId}-role`}
          type="text"
          className="field__input"
          value={form.role}
          onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          placeholder="Fotografia, direção de arte, styling, música..."
          required
          aria-required="true"
          aria-describedby={errors.role ? `${formId}-role-error` : undefined}
        />
        {errors.role && (
          <span id={`${formId}-role-error`} className="field__error-msg" role="alert">
            {errors.role}
          </span>
        )}
      </div>

      {/* Portfolio / Link */}
      <div className="field">
        <label className="field__label" htmlFor={`${formId}-portfolio`}>
          Portfolio ou Link{' '}
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
          id={`${formId}-portfolio`}
          type="text"
          className="field__input"
          value={form.portfolioLink ?? ''}
          onChange={(e) => setForm((f) => ({ ...f, portfolioLink: e.target.value }))}
          placeholder="https://... ou @handle"
          autoComplete="url"
        />
      </div>

      {/* Como chegou aqui */}
      <div className={`field${errors.howDidYouFind ? ' field--error' : ''}`}>
        <label className="field__label" htmlFor={`${formId}-how`}>
          Como você chegou até aqui?
        </label>
        <textarea
          id={`${formId}-how`}
          className="field__input"
          value={form.howDidYouFind}
          onChange={(e) => setForm((f) => ({ ...f, howDidYouFind: e.target.value }))}
          placeholder="Essa resposta diz tudo. Seja honesto."
          required
          aria-required="true"
          aria-describedby={errors.howDidYouFind ? `${formId}-how-error` : undefined}
          rows={4}
        />
        {errors.howDidYouFind && (
          <span id={`${formId}-how-error`} className="field__error-msg" role="alert">
            {errors.howDidYouFind}
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

      {/* Submit — CTA 1 */}
      <div>
        <button
          type="submit"
          className="btn btn--primary"
          disabled={state.status === 'loading'}
          aria-disabled={state.status === 'loading'}
        >
          {state.status === 'loading' ? 'Enviando…' : 'Submit your presence'}
          {state.status !== 'loading' && (
            <span className="btn__arrow" aria-hidden="true">→</span>
          )}
        </button>
      </div>
    </form>
  )
}
