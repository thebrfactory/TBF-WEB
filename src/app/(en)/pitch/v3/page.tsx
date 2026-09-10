// =============================================================================
// /pitch/v3 · WORKING DECK 3.0
// .THE BRAZILIAN FACTORY. · cultural venture studio
// Nasceu cópia da 2.0 (pedido do fundador 2026-08-08) para poder divergir dela
// sem mexer no deck que já foi apresentado. A 1.0 (/pitch) segue congelada.
// =============================================================================

import type { Metadata } from 'next'
import { PitchV3Client } from './PitchV3Client'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const TITLE = 'Pitch 3.0'
const DESCRIPTION =
  '.THE BRAZILIAN FACTORY. A cultural venture studio for Brazilian ideas with global reach. Working deck.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: languageAlternates('/pitch/v3'),
  openGraph: openGraphMeta({ title: TITLE, description: DESCRIPTION }),
}

export default function PitchV3Page() {
  return <PitchV3Client />
}
