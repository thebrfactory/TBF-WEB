// Rota `/` — a home em inglês, o idioma nativo do site.
// A página em si vive em src/views/HomeView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import HomeView from '@/views/HomeView'
import { home } from '@/content/i18n/pages/home'
import { languageAlternates } from '@/lib/i18n'

const t = home.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/'),
  openGraph: {
    title: t.meta.title,
    description: t.meta.ogDescription,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

export const revalidate = 3600

export default function Page() {
  return <HomeView lang="en" />
}
