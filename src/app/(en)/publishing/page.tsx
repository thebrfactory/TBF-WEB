// Rota `/publishing` — em inglês, o idioma nativo do site.
// A página em si vive em src/views/PublishingView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import PublishingView from '@/views/PublishingView'
import { publishing } from '@/content/i18n/pages/publishing'
import { languageAlternates } from '@/lib/i18n'

const t = publishing.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/publishing'),
}

export default function Page() {
  return <PublishingView lang="en" />
}
