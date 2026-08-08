// =============================================================================
// /pt/pitch/v3 · o MESMO deck 3.0 da rota em inglês
//
// Mesma exceção consciente da 2.0: o deck já é um artefato dos dois idiomas AO
// MESMO TEMPO por desenho (português em Brother, inglês em Brother Printed
// itálico, lado a lado em cada movimento). Traduzi-lo seria desfazer a peça.
// Esta rota existe para a pílula PT|EN não cair em 404 quando alguém estiver
// lendo o deck: o cromo do site vem em português, o deck é o mesmo.
//
// Segue `noindex` como a rota em inglês. O deck é documento de trabalho.
// =============================================================================

import type { Metadata } from 'next'
import { PitchV3Client } from '@/app/(en)/pitch/v3/PitchV3Client'

export const metadata: Metadata = {
  title: 'Pitch 3.0',
  description:
    '.THE BRAZILIAN FACTORY. Um cultural venture studio para ideias brasileiras com alcance global. Deck de trabalho.',
  robots: { index: false, follow: false },
}

export default function PitchV3PagePT() {
  return <PitchV3Client />
}
