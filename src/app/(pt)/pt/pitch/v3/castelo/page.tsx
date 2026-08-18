// =============================================================================
// /pt/pitch/v3/castelo · a MESMA proposta endereçada da rota em inglês
//
// Existe pelo mesmo motivo da /pt/pitch/v3: a pílula PT|EN não pode cair em 404
// no meio da leitura. O deck já é bilíngue por desenho, então não se traduz: o
// cromo do site vem em português e a peça é a mesma.
// =============================================================================

import type { Metadata } from 'next'
import { PitchV3Client } from '@/app/(en)/pitch/v3/PitchV3Client'
import { PARTNERSHIP_CASTELO } from '@/content/pitch/v3-scenes'

export const metadata: Metadata = {
  title: 'Pitch 3.0 · Hostel Castelo',
  description:
    '.THE BRAZILIAN FACTORY. Um cultural venture studio para ideias brasileiras com alcance global. Deck de trabalho para o Hostel Castelo.',
  robots: { index: false, follow: false },
}

export default function PitchV3CasteloPagePT() {
  return <PitchV3Client partner={PARTNERSHIP_CASTELO} />
}
