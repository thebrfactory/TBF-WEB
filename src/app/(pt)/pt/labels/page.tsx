// Rota `/pt/labels` — a mesma página, em português.
// A página em si vive em src/views/LabelsView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import LabelsView from '@/views/LabelsView'
import { labels } from '@/content/i18n/pages/labels'
import { languageAlternates } from '@/lib/i18n'

const t = labels.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/labels'),
  openGraph: {
    title: t.meta.ogTitle,
    description: t.meta.ogDescription,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <LabelsView lang="pt" />
}
