// =============================================================================
// /pitch/v3 · WORKING DECK 3.0
// .THE BRAZILIAN FACTORY. · cultural venture studio
// Nasceu cópia da 2.0 (pedido do fundador 2026-08-08) para poder divergir dela
// sem mexer no deck que já foi apresentado. A 1.0 (/pitch) segue congelada.
// =============================================================================

import type { Metadata } from 'next'
import { PitchV3Client } from './PitchV3Client'

export const metadata: Metadata = {
  title: 'Pitch 3.0',
  description:
    '.THE BRAZILIAN FACTORY. A cultural venture studio for Brazilian ideas with global reach. Working deck.',
  robots: { index: false, follow: false },
}

export default function PitchV3Page() {
  return <PitchV3Client />
}
