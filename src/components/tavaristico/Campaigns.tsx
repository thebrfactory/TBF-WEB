// =============================================================================
// CAMPAIGNS, TAVARISTICO CREATOR PAGE 2.0 (partes 12, 13, 14 do briefing)
// -----------------------------------------------------------------------------
// A logica de "sequencia de stories" pedida na parte 12, sem carrossel de
// ecommerce: reaproveita o StoryDeck que ja existe (nasceu em /pitch/v3, o
// mesmo objeto que a proposta de hospitality usa). Numero grande no fundo,
// label editorial, contador de frame, tudo que a referencia anexada descreve.
//
// A parte 13 e taxativa: nao inventar campanha. `campaigns` vem de
// CAMPAIGNS em _data.ts, hoje com uma unica entrada real (O: 18 Years). O
// componente e generico para qualquer tamanho de lista, entao um segundo
// case entra so adicionando dado, sem tocar aqui.
// =============================================================================

'use client'

import { StoryDeck } from '@/components/StoryPlayer/StoryPlayer'
import type { Campaign } from '@/app/(en)/creators/tavaristico/_data'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'
import type { Lang } from '@/lib/i18n'

export function Campaigns({
  campaigns,
  lang,
  label,
  caseLabel,
}: {
  campaigns: Campaign[]
  lang: Lang
  label: string
  caseLabel: string
}) {
  if (campaigns.length === 0) return null

  return (
    <div className={styles.campaignList}>
      {campaigns.map((c) => {
        const description = lang === 'pt' ? c.descriptionPT : c.descriptionEN
        return (
          <article key={c.index} className={styles.campaignCard}>
            <span className={styles.campaignBigIndex} aria-hidden="true">
              {c.index}
            </span>
            <span className={styles.label}>{caseLabel}</span>
            <div className={styles.campaignBody}>
              <div className={styles.campaignDeck}>
                <StoryDeck
                  items={c.frames}
                  handle={c.client}
                  ms={3200}
                  nav="dots"
                  label={`${label}: ${c.name}`}
                  playerClassName={styles.campaignPlayer}
                />
              </div>
              <div className={styles.campaignText}>
                <h3 className={styles.campaignName}>{c.name}</h3>
                <p className={styles.campaignDescription}>{description}</p>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
