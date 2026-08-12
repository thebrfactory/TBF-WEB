// Rota `/labels/factoryofgrowth` — .THE GROWTH FACTORY., em inglês.
// A página em si vive em src/views/FactoryOfGrowthView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import FactoryOfGrowthView from '@/views/FactoryOfGrowthView'
import { factoryOfGrowth } from '@/content/i18n/pages/labels/factoryofgrowth'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = factoryOfGrowth.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/labels/factoryofgrowth'),
  openGraph: openGraphMeta({ title: t.meta.ogTitle, description: t.meta.ogDescription }),
}

export default function Page() {
  return <FactoryOfGrowthView lang="en" />
}
