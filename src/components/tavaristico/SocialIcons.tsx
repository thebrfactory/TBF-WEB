// =============================================================================
// SOCIAL ICONS, TAVARISTICO CREATOR PAGE 2.0
// -----------------------------------------------------------------------------
// Marcas reais em SVG (parte 08 do briefing): nada de emoji, nada de botao
// SaaS. Mono, editorial, herda a cor do texto ao redor via `currentColor` e so
// muda de cor no hover/focus (ver .socialLink no CSS module). Cada link tem
// aria-label, foco visivel e alvo de toque generoso no mobile.
//
// So entram os canais com URL real hoje: Instagram, LinkedIn e email (ver
// _data.ts, IDENTITY.socials, e o relatorio de entrega sobre o GitHub que
// falta). Criar um quarto icone apontando para lugar nenhum seria pior que
// nao ter o quarto icone.
// =============================================================================

import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  )
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7.3" cy="8" r="1.15" fill="currentColor" />
      <path d="M7.3 11v6.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M11.2 17.2V11m0 0c0-1.4 1.1-2.2 2.3-2.2 1.3 0 2.2.9 2.2 2.4v5.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function EmailMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 6.5 12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export interface SocialLink {
  key: 'instagram' | 'linkedin' | 'email'
  href: string
  label: string
}

const ICONS = {
  instagram: InstagramMark,
  linkedin: LinkedInMark,
  email: EmailMark,
}

export function SocialIcons({ links, className = '' }: { links: SocialLink[]; className?: string }) {
  return (
    <ul className={`${styles.socialRow} ${className}`.trim()}>
      {links.map((l) => {
        const Icon = ICONS[l.key]
        const isEmail = l.key === 'email'
        return (
          <li key={l.key}>
            <a
              href={l.href}
              className={styles.socialLink}
              aria-label={l.label}
              title={l.label}
              {...(isEmail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <Icon />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
