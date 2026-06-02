// =============================================================================
// FORM INPUT — TBF WEB 2026
// Variantes: text / email / textarea
// ARIA: aria-required, aria-describedby, role="alert" em erros
// Label sempre acima — nunca placeholder como label
// =============================================================================

interface FormInputProps {
  id: string
  name: string
  label: string
  type?: 'text' | 'email' | 'url' | 'textarea'
  required?: boolean
  error?: string
  success?: boolean
  disabled?: boolean
  placeholder?: string
  rows?: number
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  autoComplete?: string
}

export function FormInput({
  id,
  name,
  label,
  type = 'text',
  required = false,
  error,
  success = false,
  disabled = false,
  placeholder,
  rows = 4,
  value,
  onChange,
  autoComplete,
}: FormInputProps) {
  const errorId = `${id}-error`
  const fieldClass = `field ${error ? 'field--error' : ''} ${success ? 'field--success' : ''}`

  return (
    <div className={fieldClass} role="group">
      <label className="field__label" htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden="true" style={{ marginLeft: 'var(--tbf-space-1)' }}>
            *
          </span>
        )}
      </label>

      {type === 'textarea' ? (
        <textarea
          className="field__input"
          id={id}
          name={name}
          rows={rows}
          required={required}
          aria-required={required}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className="field__input"
          id={id}
          name={name}
          type={type}
          required={required}
          aria-required={required}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
      )}

      {error && (
        <span
          id={errorId}
          className="field__error-msg"
          role="alert"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  )
}
