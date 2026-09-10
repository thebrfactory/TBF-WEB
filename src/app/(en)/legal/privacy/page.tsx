// Rota `/legal/privacy` — Política de Privacidade em inglês.
// A página em si vive em src/views/LegalPrivacyView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import LegalPrivacyView from '@/views/LegalPrivacyView'
import { legalPrivacy } from '@/content/i18n/pages/legal-privacy'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = legalPrivacy.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/legal/privacy'),
  openGraph: openGraphMeta({ title: t.meta.title, description: t.meta.description }),
}

export default function Page() {
  return <LegalPrivacyView lang="en" />
}
