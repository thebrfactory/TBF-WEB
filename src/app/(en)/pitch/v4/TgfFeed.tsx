'use client'

// =============================================================================
// FEED DA THE GROWTH FACTORY (rodada 29/10/2026, CHANGES #01, item 138)
// Desde 02/11/2026 a grade e o visor moram em `FeedGrid.tsx`, genericos, e este
// arquivo so liga os 12 posts da TGF a eles. Sem cabecalho "Feed" nem contagem
// de posts (pedido do fundador). Dados e ordem em `v4-fronts.ts`.
// =============================================================================

import { TGF_POSTS, tgfSlide } from '@/content/pitch/v4-fronts'
import { FeedGrid } from './FeedGrid'

export function TgfFeed({
  host,
  onViewer,
}: {
  host: HTMLElement | null
  onViewer: (open: boolean) => void
}) {
  return <FeedGrid posts={TGF_POSTS} slideSrc={tgfSlide} label="The Growth Factory" host={host} onViewer={onViewer} />
}
