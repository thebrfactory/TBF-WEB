// Rota `/legal/conduct` — Código de Conduta em inglês.
// A página em si vive em src/views/LegalConductView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import LegalConductView from '@/views/LegalConductView'
import { legalConduct } from '@/content/i18n/pages/legal-conduct'
import { languageAlternates } from '@/lib/i18n'

const t = legalConduct.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/legal/conduct'),
}

export default function Page() {
  return <LegalConductView lang="en" />
}
