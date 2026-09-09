// =============================================================================
// WHAT I BUILD, TAVARISTICO CREATOR PAGE 2.0 (parte 15 do briefing)
// -----------------------------------------------------------------------------
// Nao chama "skills": um sistema visual de quatro pecas (BRANDS, PRODUCTS,
// BUSINESSES, SYSTEMS), numeradas como o resto da pagina, sem icone, sem
// card de SaaS.
// =============================================================================

import type { BuildPillar } from '@/app/(en)/creators/tavaristico/_data'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'
import type { Lang } from '@/lib/i18n'

export function WhatIBuild({ pillars, lang }: { pillars: BuildPillar[]; lang: Lang }) {
  return (
    <div className={styles.buildGrid}>
      {pillars.map((p, i) => (
        <div key={p.name} className={styles.buildItem}>
          {/* Correção 09/09/2026 (rodada 2): número e título na MESMA linha.
              O que o fundador queria era simplificar o layout, não achatar o
              espaçamento (que voltou ao que era). */}
          <span className={styles.buildHead}>
            <span className={styles.buildIndex}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.buildName}>{p.name}</span>
          </span>
          <span className={styles.buildDescription}>{lang === 'pt' ? p.descriptionPT : p.descriptionEN}</span>
        </div>
      ))}
    </div>
  )
}
