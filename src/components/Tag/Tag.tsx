// =============================================================================
// TAG / LABEL — TBF WEB 2026
// Variantes: category / status / bu
// Interativo: aria-pressed para filtros
// =============================================================================

interface TagProps {
  children: React.ReactNode
  variant?: 'category' | 'status' | 'bu' | 'status-success' | 'status-error'
  active?: boolean
  onClick?: () => void
  href?: string
  className?: string
}

export function Tag({
  children,
  variant = 'category',
  active = false,
  onClick,
  href,
  className = '',
}: TagProps) {
  const classes = [
    'tag',
    `tag--${variant}`,
    active ? 'tag--active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        aria-pressed={active}
      >
        {children}
      </button>
    )
  }

  return <span className={classes}>{children}</span>
}
