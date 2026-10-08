// Rota `/zine`, o arquivo editorial em inglês, o idioma nativo do site.
// A página em si vive em src/views/EditorialView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import EditorialView from '@/views/EditorialView'
import { editorial } from '@/content/i18n/pages/editorial'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = editorial.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/zine'),
  openGraph: openGraphMeta({ title: t.meta.ogTitle, description: t.meta.ogDescription }),
}

export const revalidate = 3600

export default function Page() {
  return <EditorialView lang="en" />
}
