// Rota `/pt/pitch`: a mesma página índice, em português. Ver
// src/app/(en)/pitch/page.tsx para o histórico da mudança (fundador
// 2026-09-09).

import type { Metadata } from 'next'
import PitchIndexView from '@/views/PitchIndexView'
import { pitch } from '@/content/i18n/pages/pitch'
import { languageAlternates } from '@/lib/i18n'

const t = pitch.pt.index

export const metadata: Metadata = {
  title: t.title,
  description: t.description,
  robots: { index: false, follow: false },
  alternates: languageAlternates('/pitch'),
}

export default function Page() {
  return <PitchIndexView lang="pt" />
}
