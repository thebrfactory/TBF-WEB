// Rota `/pt/legal/conduct` — a mesma página, em português.
// A página em si vive em src/views/LegalConductView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import LegalConductView from '@/views/LegalConductView'
import { legalConduct } from '@/content/i18n/pages/legal-conduct'
import { languageAlternates } from '@/lib/i18n'

const t = legalConduct.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/legal/conduct'),
}

export default function Page() {
  return <LegalConductView lang="pt" />
}
