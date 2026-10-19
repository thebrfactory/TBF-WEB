// =============================================================================
// WORK EDITORIAL: lookbook (carrossel 9:16) e grid de feed (3 colunas) da pagina
// de obra. Pecas entram como vieram do arquivo: nenhum texto e montado por
// codigo e nenhuma sobreposicao existe; a legenda fica FORA da imagem.
// Mobile-first: o lookbook rola de lado com snap no celular e vira grade a
// partir de 768px; o feed e 3 colunas em qualquer largura, com teto de largura.
// CHANGES #01, 19/10/2026.
// =============================================================================

import Image from 'next/image'
import type { WorkPiece } from '@/app/(en)/creators/tavaristico/_data'
import type { Lang } from '@/lib/i18n'
import styles from './WorkEditorial.module.css'

export function Lookbook({ pieces, lang, label }: { pieces: WorkPiece[]; lang: Lang; label: string }) {
  return (
    <section className={styles.section} aria-label={label}>
      <span className={styles.label}>{label}</span>
      <ul className={styles.lookbook}>
        {pieces.map((p, i) => {
          const caption = lang === 'pt' ? p.captionPT : p.captionEN
          return (
            <li key={p.src} className={styles.lookItem}>
              <span className={styles.lookMedia}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 62vw"
                  quality={85}
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              </span>
              {caption ? <span className={styles.caption}>{caption}</span> : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function FeedGrid({ pieces, label }: { pieces: WorkPiece[]; label: string }) {
  return (
    <section className={styles.section} aria-label={label}>
      <span className={styles.label}>{label}</span>
      <ul className={styles.feed}>
        {pieces.map((p) => (
          <li key={p.src} className={styles.feedItem}>
            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 400px, 33vw" quality={85} />
          </li>
        ))}
      </ul>
    </section>
  )
}
