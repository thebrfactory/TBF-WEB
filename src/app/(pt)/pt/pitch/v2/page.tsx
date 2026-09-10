// =============================================================================
// /pt/pitch/v2 · o MESMO deck 2.0 da rota em inglês
//
// EXCEÇÃO CONSCIENTE à leva bilíngue: o deck 2.0 já é um artefato dos dois
// idiomas AO MESMO TEMPO por desenho (português em Brother, inglês em Brother
// Printed itálico, lado a lado em cada movimento). Traduzi-lo seria desfazer a
// peça. Esta rota existe para a pílula PT|EN não cair em 404 quando alguém
// estiver lendo o deck: o cromo do site vem em português, o deck é o mesmo.
//
// Segue `noindex` como a rota em inglês. O deck é documento de trabalho.
// =============================================================================

import type { Metadata } from 'next'
import { PitchV2Client } from '@/app/(en)/pitch/v2/PitchV2Client'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const TITLE = 'Pitch 2.0'
const DESCRIPTION =
  '.THE BRAZILIAN FACTORY. Um cultural venture studio para ideias brasileiras com alcance global. Deck de trabalho.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: languageAlternates('/pitch/v2'),
  openGraph: openGraphMeta({ title: TITLE, description: DESCRIPTION }),
}

export default function PitchV2PagePT() {
  return <PitchV2Client />
}
