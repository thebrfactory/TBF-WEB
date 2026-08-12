// Rota `/pt/labels/runwayunited` — a mesma página, em português.
// A página em si vive em src/views/RunwayUnitedView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import RunwayUnitedView from '@/views/RunwayUnitedView'
import { runwayUnited } from '@/content/i18n/pages/labels/runwayunited'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = runwayUnited.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/labels/runwayunited'),
  openGraph: openGraphMeta({ title: t.meta.ogTitle, description: t.meta.ogDescription }),
}

export default function Page() {
  return <RunwayUnitedView lang="pt" />
}
