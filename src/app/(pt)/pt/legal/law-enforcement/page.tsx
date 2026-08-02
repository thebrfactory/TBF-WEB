// Rota `/pt/legal/law-enforcement` — a mesma página, em português.
// A página em si vive em src/views/LegalLawEnforcementView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import LegalLawEnforcementView from '@/views/LegalLawEnforcementView'
import { legalLawEnforcement } from '@/content/i18n/pages/legal-law-enforcement'
import { languageAlternates } from '@/lib/i18n'

const t = legalLawEnforcement.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/legal/law-enforcement'),
}

export default function Page() {
  return <LegalLawEnforcementView lang="pt" />
}
