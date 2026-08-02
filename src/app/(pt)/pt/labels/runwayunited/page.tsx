// Rota `/pt/labels/runwayunited` — a mesma página, em português.
// A página em si vive em src/views/RunwayUnitedView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import RunwayUnitedView from '@/views/RunwayUnitedView'
import { runwayUnited } from '@/content/i18n/pages/labels/runwayunited'
import { languageAlternates } from '@/lib/i18n'

const t = runwayUnited.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/labels/runwayunited'),
  openGraph: {
    title: t.meta.ogTitle,
    description: t.meta.ogDescription,
    images: [{ url: '/og-factory.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <RunwayUnitedView lang="pt" />
}
