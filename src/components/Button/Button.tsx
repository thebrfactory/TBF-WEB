// =============================================================================
// BUTTON — TBF WEB 2026
// Variantes: primary / secondary / ghost
// Funciona como <a> ou <button>
// =============================================================================

import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  variant?: ButtonVariant
  href?: string
  children: React.ReactNode
  showArrow?: boolean
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  'aria-label'?: string
  external?: boolean
}

export function Button({
  variant = 'primary',
  href,
  children,
  showArrow = false,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
  external = false,
}: ButtonProps) {
  const classes = `btn btn--${variant} ${className}`.trim()

  const content = (
    <>
      {children}
      {showArrow && (
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  )

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  )
}
