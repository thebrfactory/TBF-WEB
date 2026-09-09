// =============================================================================
// SELECTED WORK, TAVARISTICO CREATOR PAGE 2.0 (partes 10 e 11 do briefing)
// -----------------------------------------------------------------------------
// Cinco pecas editoriais, nao uma grade uniforme de cards. Cada linha carrega
// numero, categoria, nome e descricao curta; o peso visual muda por item
// (`.venturePrimary` x `.ventureSecondary`), que e a hierarquia que a parte 11
// pede: CRIVO, .TBF e BRAND SYSTEM pesam mais que .RUC e TAVARISTICO.
//
// Quando existe `href`, a linha inteira e um link (TbfLink resolve interno x
// externo). Quando nao existe, e um <div> com o mesmo layout: territorio real
// sem pagina propria neste repo (ver relatorio de entrega) nao pode fingir
// ser clicavel.
// =============================================================================

import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import type { Venture } from '@/app/(en)/creators/tavaristico/_data'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'
import { localizedPath, type Lang } from '@/lib/i18n'

// Ancora na propria pagina (`#work`) nao passa por `localizedPath`: e o mesmo
// hash nos dois idiomas. Rota real (`/`) passa, para nao mandar quem le em
// PT para a home em inglês.
function resolveHref(href: string, lang: Lang): string {
  return href.startsWith('#') ? href : localizedPath(href, lang)
}

function VentureRow({ v, lang }: { v: Venture; lang: Lang }) {
  const weightClass = v.weight === 'primary' ? styles.venturePrimary : styles.ventureSecondary

  const inner = (
    <>
      <span className={styles.ventureIndex}>{v.index}</span>
      <span className={styles.ventureBody}>
        <span className={styles.ventureName}>{v.name}</span>
        <span className={styles.ventureCategory}>{v.category}</span>
        <span className={styles.ventureDescription}>{v.description}</span>
      </span>
    </>
  )

  if (v.href) {
    return (
      <Link href={resolveHref(v.href, lang)} className={`${styles.ventureRow} ${weightClass}`}>
        {inner}
      </Link>
    )
  }

  return (
    <div className={`${styles.ventureRow} ${weightClass}`}>
      {inner}
    </div>
  )
}

export function SelectedWork({ ventures, lang }: { ventures: Venture[]; lang: Lang }) {
  return (
    <div className={styles.ventureList}>
      {ventures.map((v) => (
        <VentureRow key={v.index} v={v} lang={lang} />
      ))}
    </div>
  )
}
