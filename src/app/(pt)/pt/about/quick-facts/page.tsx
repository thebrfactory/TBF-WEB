// Rota `/pt/about/quick-facts` — a mesma página, em português.
// A página em si vive em src/views/AboutQuickFactsView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import AboutQuickFactsView from '@/views/AboutQuickFactsView'
import { aboutQuickFacts } from '@/content/i18n/pages/about-quick-facts'
import { languageAlternates } from '@/lib/i18n'

const t = aboutQuickFacts.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/about/quick-facts'),
}

export default function Page() {
  return <AboutQuickFactsView lang="pt" />
}
