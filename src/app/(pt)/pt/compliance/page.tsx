// Rota `/pt/compliance`, Compliance em português.
// A página em si vive em src/views/LegalComplianceView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import LegalComplianceView from '@/views/LegalComplianceView'
import { legalCompliance } from '@/content/i18n/pages/legal-compliance'
import { languageAlternates } from '@/lib/i18n'

const t = legalCompliance.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/compliance'),
}

export default function Page() {
  return <LegalComplianceView lang="pt" />
}
