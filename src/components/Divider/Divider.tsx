// =============================================================================
// DIVIDER / SEPARATOR — TBF WEB 2026
// Variantes: horizontal / space / dot
// Sempre aria-hidden="true" — elemento puramente estrutural
// =============================================================================

interface DividerProps {
  variant?: 'horizontal' | 'space' | 'dot'
}

export function Divider({ variant = 'horizontal' }: DividerProps) {
  if (variant === 'horizontal') {
    return
  }

  return (
    <div className={`divider--${variant}`} aria-hidden="true" role="presentation" />
  )
}
