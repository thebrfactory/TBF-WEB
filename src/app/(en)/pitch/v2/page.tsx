// =============================================================================
// /pitch/v2 · WORKING DECK 2.0
// .THE BRAZILIAN FACTORY. · cultural venture studio
// A 1.0 (/pitch) permanece congelada. Esta é a versão paralela.
// =============================================================================

import type { Metadata } from 'next'
import { PitchV2Client } from './PitchV2Client'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const TITLE = 'Pitch 2.0'
const DESCRIPTION =
  '.THE BRAZILIAN FACTORY. A cultural venture studio for Brazilian ideas with global reach. Working deck.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: languageAlternates('/pitch/v2'),
  openGraph: openGraphMeta({ title: TITLE, description: DESCRIPTION }),
}

export default function PitchV2Page() {
  return <PitchV2Client />
}
