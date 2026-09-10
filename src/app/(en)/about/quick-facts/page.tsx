// Rota `/about/quick-facts` — em inglês, o idioma nativo do site.
// A página em si vive em src/views/AboutQuickFactsView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import AboutQuickFactsView from '@/views/AboutQuickFactsView'
import { aboutQuickFacts } from '@/content/i18n/pages/about-quick-facts'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = aboutQuickFacts.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/about/quick-facts'),
  openGraph: openGraphMeta({ title: t.meta.title, description: t.meta.description }),
}

export default function Page() {
  return <AboutQuickFactsView lang="en" />
}
