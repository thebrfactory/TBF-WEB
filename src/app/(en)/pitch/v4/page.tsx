// =============================================================================
// /pitch/v4 · WORKING DECK 4.0
// .THE BRAZILIAN FACTORY. · cultural venture studio
// Nasceu cópia da 3.0 (pedido do fundador, CHANGES #01, 19/10/2026): timer de
// 5 minutos, cena do fundador, stories nas verticais e cena da empresa. A 3.0
// segue intacta. `noindex` como as outras versões.
// =============================================================================

import type { Metadata } from 'next'
import { PitchV4Client } from './PitchV4Client'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const TITLE = 'Pitch 4.0'
const DESCRIPTION =
  '.THE BRAZILIAN FACTORY. A cultural venture studio for Brazilian ideas with global reach. Working deck.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: languageAlternates('/pitch/v4'),
  openGraph: openGraphMeta({ title: TITLE, description: DESCRIPTION }),
}

export default function PitchV4Page() {
  return <PitchV4Client />
}
