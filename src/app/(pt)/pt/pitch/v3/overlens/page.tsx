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

export const metadata: Metadata = {
  title: 'Pitch 3.0 · Overlens',
  description:
    '.THE BRAZILIAN FACTORY. Um cultural venture studio para ideias brasileiras com alcance global. Deck de trabalho para a Overlens.',
  robots: { index: false, follow: false },
}

export default function PitchV3OverlensPagePT() {
  return <PitchV3Client partner={PARTNERSHIP_OVERLENS} />
}
