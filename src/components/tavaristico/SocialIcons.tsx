// =============================================================================
// SOCIAL ICONS, TAVARISTICO CREATOR PAGE 2.0
// -----------------------------------------------------------------------------
// Glifo flat, sem contorno e sem caixinha (correção do fundador, 09/09/2026):
// mesmo desenho dos ícones de compartilhar do dopamine article, componente
// compartilhado `@/components/icons/FlatIcon`. Hover é só opacidade.
//
// GitHub entra como quarto ícone, mas só renderiza quando a URL existe
// (IDENTITY.socials.github em _data.ts). Link vazio não é ícone: seria pior
// que não ter o quarto ícone.
// =============================================================================

import { FlatIcon, type FlatIconName } from '@/components/icons/FlatIcon'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'

export interface SocialLink {
  key: FlatIconName
  href: string
  label: string
}

export function SocialIcons({ links, className = '' }: { links: SocialLink[]; className?: string }) {
  const visible = links.filter((l) => l.href)

  return (
    <ul className={`${styles.socialRow} ${className}`.trim()}>
      {visible.map((l) => {
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
              <FlatIcon name={l.key} size={20} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
