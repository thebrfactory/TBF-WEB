// Rota `/collective` — em inglês.
// A página em si vive em src/views/CollectiveView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import CollectiveView from '@/views/CollectiveView'
import { collective } from '@/content/i18n/pages/collective'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = collective.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/collective'),
  openGraph: openGraphMeta({ title: t.meta.ogTitle, description: t.meta.ogDescription }),
}

export const revalidate = 3600

export default function Page() {
  return <CollectiveView lang="en" />
}
