// =============================================================================
// WORK PROCESS: processo do case em etapas numeradas. Cada etapa: numero, titulo,
// narrativa curta (PT ou EN) e a faixa com as pecas daquela etapa. Mobile first.
// Sem dividers, sem texto sobre imagem. Rodada 26/10/2026.
// =============================================================================

import type { ProcessStep } from '@/app/(en)/creators/tavaristico/_data'
import type { Lang } from '@/lib/i18n'
import { WorkCarousel } from './WorkCarousel'
import styles from './WorkProcess.module.css'

export function WorkProcess({
  steps,
  lang,
  label,
  prevLabel,
  nextLabel,
}: {
  steps: ProcessStep[]
  lang: Lang
  label: string
  prevLabel: string
  nextLabel: string
}) {
  return (
    <section className={styles.process} aria-label={label}>
      <span className={styles.label}>{label}</span>
      <ol className={styles.steps}>
        {steps.map((st, i) => {
          const title = lang === 'pt' ? st.titlePT : st.titleEN
          return (
            <li key={st.titleEN} className={styles.step}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.text}>{lang === 'pt' ? st.textPT : st.textEN}</p>
              <WorkCarousel items={st.items} variant={st.variant} label={undefined} prevLabel={prevLabel} nextLabel={nextLabel} />
            </li>
          )
        })}
      </ol>
    </section>
  )
}
