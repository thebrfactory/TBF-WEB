// Rota `/consulting` — inglês, o idioma nativo do site.
// A página em si vive em src/views/ConsultingView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import ConsultingView from '@/views/ConsultingView'
import { consulting } from '@/content/i18n/pages/consulting'
import { languageAlternates } from '@/lib/i18n'

const t = consulting.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/consulting'),
  openGraph: {
    title: t.meta.ogTitle,
    description: t.meta.ogDescription,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <ConsultingView lang="en" />
}
