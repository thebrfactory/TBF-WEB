// Rota `/labels/thefioredaily` — .THE FIORE DAILY., em inglês.
// A página em si vive em src/views/TheFioreDailyView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import TheFioreDailyView from '@/views/TheFioreDailyView'
import { theFioreDaily } from '@/content/i18n/pages/labels/thefioredaily'
import { languageAlternates } from '@/lib/i18n'

const t = theFioreDaily.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/labels/thefioredaily'),
  openGraph: {
    title: t.meta.ogTitle,
    description: t.meta.ogDescription,
    images: [{ url: '/og-factory.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <TheFioreDailyView lang="en" />
}
