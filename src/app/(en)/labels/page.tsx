// Rota `/labels` — as 4 labels, em inglês.
// A página em si vive em src/views/LabelsView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import LabelsView from '@/views/LabelsView'
import { labels } from '@/content/i18n/pages/labels'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = labels.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/labels'),
  openGraph: openGraphMeta({ title: t.meta.ogTitle, description: t.meta.ogDescription }),
}

export default function Page() {
  return <LabelsView lang="en" />
}
