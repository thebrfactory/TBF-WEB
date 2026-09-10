// Rota `/pt/publishing` — a mesma página, em português.
// A página em si vive em src/views/PublishingView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import PublishingView from '@/views/PublishingView'
import { publishing } from '@/content/i18n/pages/publishing'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = publishing.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/publishing'),
  openGraph: openGraphMeta({ title: t.meta.title, description: t.meta.description }),
}

export default function Page() {
  return <PublishingView lang="pt" />
}
