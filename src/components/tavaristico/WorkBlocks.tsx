// =============================================================================
// WORK BLOCKS: sequencia editorial da pagina de obra (carrossel, grid de feed,
// embed do Instagram, imagem solta), na ordem em que `blocks` vem do _data.ts.
// Serve para quebrar a pagina em ritmo: embeds entre carrosseis, nunca todos
// juntos. Rodada 23/10/2026.
// =============================================================================

import Image from 'next/image'
import type { WorkBlock } from '@/app/(en)/creators/tavaristico/_data'
import type { Lang } from '@/lib/i18n'
import { FeedGrid } from './WorkEditorial'
import { WorkCarousel } from './WorkCarousel'
import { InstagramEmbeds } from './InstagramEmbeds'
import styles from './WorkEditorial.module.css'

export function WorkBlocks({
  blocks,
  lang,
  prevLabel,
  nextLabel,
}: {
  blocks: WorkBlock[]
  lang: Lang
  prevLabel: string
  nextLabel: string
}) {
  return (
    <>
      {blocks.map((b, i) => {
        const label = lang === 'pt' ? b.labelPT : b.labelEN
        switch (b.kind) {
          case 'carousel':
            return (
              <WorkCarousel
                key={i}
                items={b.items}
                label={label}
                variant={b.variant}
                prevLabel={prevLabel}
                nextLabel={nextLabel}
              />
            )
          case 'feed':
            return <FeedGrid key={i} pieces={b.pieces} label={label} ratio={b.ratio} />
          case 'embed':
            return <InstagramEmbeds key={i} urls={[b.url]} label={label} single />
          case 'image':
            return (
              <section key={i} className={styles.section}>
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={b.w}
                  height={b.h}
                  sizes="(min-width: 1200px) 1100px, 100vw"
                  quality={85}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </section>
            )
        }
      })}
    </>
  )
}
