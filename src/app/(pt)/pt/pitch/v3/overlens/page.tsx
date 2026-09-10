// =============================================================================
// /pt/pitch/v3/overlens · a MESMA proposta endereçada da rota em inglês
//
// Mesmo motivo da rota /pt/pitch/v3: o deck já é bilíngue por desenho (PT em
// Brother, EN em Brother Printed itálico, lado a lado em cada cena), então não
// há o que traduzir. Esta rota existe para a pílula PT|EN não cair em 404
// enquanto alguém estiver lendo a proposta.
//
// `noindex`, como todo o deck.
// =============================================================================

import type { Metadata } from 'next'
import { PitchV3Client } from '@/app/(en)/pitch/v3/PitchV3Client'
import { PARTNERSHIP_OVERLENS } from '@/content/pitch/v3-scenes'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const TITLE = 'Pitch 3.0 · Overlens'
const DESCRIPTION =
  '.THE BRAZILIAN FACTORY. Um cultural venture studio para ideias brasileiras com alcance global. Deck de trabalho para a Overlens.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: languageAlternates('/pitch/v3/overlens'),
  openGraph: openGraphMeta({ title: TITLE, description: DESCRIPTION }),
}

export default function PitchV3OverlensPagePT() {
  return <PitchV3Client partner={PARTNERSHIP_OVERLENS} />
}
