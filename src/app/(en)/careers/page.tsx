// Rota `/careers` — em inglês, o idioma nativo do site.
// A página em si vive em src/views/CareersView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import CareersView from '@/views/CareersView'
import { careers } from '@/content/i18n/pages/careers'
import { languageAlternates } from '@/lib/i18n'

const t = careers.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/careers'),
}

export default function Page() {
  return <CareersView lang="en" />
}
