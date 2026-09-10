// Rota `/pt/careers` — a mesma página, em português.
// A página em si vive em src/views/CareersView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import CareersView from '@/views/CareersView'
import { careers } from '@/content/i18n/pages/careers'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = careers.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/careers'),
  openGraph: openGraphMeta({ title: t.meta.title, description: t.meta.description }),
}

export default function Page() {
  return <CareersView lang="pt" />
}
