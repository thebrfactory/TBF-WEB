// =============================================================================
// /pitch/v2 · WORKING DECK 2.0
// .THE BRAZILIAN FACTORY. · cultural venture studio
// A 1.0 (/pitch) permanece congelada. Esta é a versão paralela.
// =============================================================================

import type { Metadata } from 'next'
import { PitchV2Client } from './PitchV2Client'

export const metadata: Metadata = {
  title: 'Pitch 2.0',
  description:
    '.THE BRAZILIAN FACTORY. A cultural venture studio for Brazilian ideas with global reach. Working deck.',
  robots: { index: false, follow: false },
}

export default function PitchV2Page() {
  return <PitchV2Client />
}
