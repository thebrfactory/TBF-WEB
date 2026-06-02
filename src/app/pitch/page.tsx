// =============================================================================
// /pitch — INVESTOR / PARTNER DECK
// .THE BRAZILIAN FACTORY. — Startup Pitch
// =============================================================================

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PitchClient } from './PitchClient'

export const metadata: Metadata = {
  title: 'Pitch',
  description:
    '.THE BRAZILIAN FACTORY. — The Brazilian Cultural Infrastructure. Pitch deck for investors & partners.',
  robots: { index: false, follow: false },
}

export default function PitchPage() {
  return <PitchClient />
}
