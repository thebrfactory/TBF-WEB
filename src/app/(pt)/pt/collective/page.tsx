// Rota `/pt/collective` — a mesma página, em português.
// A página em si vive em src/views/CollectiveView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import CollectiveView from '@/views/CollectiveView'
import { collective } from '@/content/i18n/pages/collective'
import { languageAlternates } from '@/lib/i18n'

const t = collective.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/collective'),
  openGraph: {
    title: t.meta.ogTitle,
    description: t.meta.ogDescription,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

export const revalidate = 3600

export default function Page() {
  return <CollectiveView lang="pt" />
}
