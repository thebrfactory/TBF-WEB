// Rota `/pt/pitch` — a mesma página do deck 1.0, em português.
// A página em si vive em src/views/PitchView.tsx e serve os dois idiomas.
// Segue `noindex`: é documento de trabalho para investidores/parceiros, não
// conteúdo editorial do site.

import type { Metadata } from 'next'
import PitchView from '@/views/PitchView'
import { pitch } from '@/content/i18n/pages/pitch'
import { languageAlternates } from '@/lib/i18n'

const t = pitch.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  robots: { index: false, follow: false },
  alternates: languageAlternates('/pitch'),
}

export default function Page() {
  return <PitchView lang="pt" />
}
