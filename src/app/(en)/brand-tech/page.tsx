// Rota `/brand-tech`: em inglês, o idioma nativo do site.
// A página em si vive em src/views/BrandTechView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import BrandTechView from '@/views/BrandTechView'
import { brandTech } from '@/content/i18n/pages/brand-tech'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = brandTech.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/brand-tech'),
  openGraph: openGraphMeta({ title: t.meta.title, description: t.meta.description }),
}

export default function Page() {
  return <BrandTechView lang="en" />
}
