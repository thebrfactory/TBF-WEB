// Rota `/pt/consulting` — a mesma página, em português.
// A página em si vive em src/views/ConsultingView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import ConsultingView from '@/views/ConsultingView'
import { consulting } from '@/content/i18n/pages/consulting'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = consulting.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/consulting'),
  openGraph: openGraphMeta({ title: t.meta.ogTitle, description: t.meta.ogDescription }),
}

export default function Page() {
  return <ConsultingView lang="pt" />
}
