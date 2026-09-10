// Rota `/pt/legal/terms` — a mesma página, em português.
// A página em si vive em src/views/LegalTermsView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import LegalTermsView from '@/views/LegalTermsView'
import { legalTerms } from '@/content/i18n/pages/legal-terms'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = legalTerms.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/legal/terms'),
  openGraph: openGraphMeta({ title: t.meta.title, description: t.meta.description }),
}

export default function Page() {
  return <LegalTermsView lang="pt" />
}
