// Rota `/pt/editorial` — o mesmo arquivo editorial, em português.
// A página em si vive em src/views/EditorialView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import EditorialView from '@/views/EditorialView'
import { editorial } from '@/content/i18n/pages/editorial'
import { languageAlternates } from '@/lib/i18n'

const t = editorial.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/editorial'),
  openGraph: {
    title: t.meta.ogTitle,
    description: t.meta.ogDescription,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

export const revalidate = 3600

export default function Page() {
  return <EditorialView lang="pt" />
}
