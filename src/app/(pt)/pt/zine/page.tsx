// Rota `/pt/zine`, o mesmo arquivo editorial, em português.
// A página em si vive em src/views/EditorialView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import EditorialView from '@/views/EditorialView'
import { editorial } from '@/content/i18n/pages/editorial'
import { zineAlternates, zineUrl } from '@/lib/zine-url'
import { openGraphMeta } from '@/lib/og'

const t = editorial.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: zineAlternates(undefined, 'pt'),
  openGraph: {
    ...openGraphMeta({ title: t.meta.ogTitle, description: t.meta.ogDescription }),
    url: zineUrl(undefined, 'pt'),
  },
}

export const revalidate = 3600

export default function Page() {
  return <EditorialView lang="pt" />
}
