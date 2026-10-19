// =============================================================================
// /pt/pitch/v4 · o MESMO deck 4.0 da rota em inglês
//
// Mesma exceção consciente da 2.0 e da 3.0: o deck já é bilíngue por desenho
// (PT e EN lado a lado em cada cena), então traduzi-lo desfaria a peça. A rota
// existe para a pílula PT|EN não cair em 404. Segue `noindex`.
// =============================================================================

import type { Metadata } from 'next'
import { PitchV4Client } from '@/app/(en)/pitch/v4/PitchV4Client'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const TITLE = 'Pitch 4.0'
const DESCRIPTION =
  '.THE BRAZILIAN FACTORY. Um cultural venture studio para ideias brasileiras com alcance global. Deck de trabalho.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: languageAlternates('/pitch/v4'),
  openGraph: openGraphMeta({ title: TITLE, description: DESCRIPTION }),
}

export default function PitchV4PagePT() {
  return <PitchV4Client />
}
