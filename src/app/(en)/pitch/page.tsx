// Rota `/pitch`: página índice que classifica todos os pitches (decks gerais
// 1.0/2.0/3.0 e decks endereçados a uma empresa específica). Pedido do
// fundador 2026-09-09: antes esta rota ERA o deck 1.0, que morou para
// /pitch/v1. A página em si vive em src/views/PitchIndexView.tsx e serve os
// dois idiomas.
// Segue `noindex`: é documento de trabalho para investidores/parceiros, não
// conteúdo editorial do site.

import type { Metadata } from 'next'
import PitchIndexView from '@/views/PitchIndexView'
import { pitch } from '@/content/i18n/pages/pitch'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = pitch.en.index

export const metadata: Metadata = {
  title: t.title,
  description: t.description,
  robots: { index: false, follow: false },
  alternates: languageAlternates('/pitch'),
  openGraph: openGraphMeta({ title: t.title, description: t.description }),
}

export default function Page() {
  return <PitchIndexView lang="en" />
}
