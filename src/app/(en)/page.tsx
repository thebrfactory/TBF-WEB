// Rota `/` — a home em inglês, o idioma nativo do site.
// A página em si vive em src/views/HomeView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import HomeView from '@/views/HomeView'
import { home } from '@/content/i18n/pages/home'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = home.en

export const metadata: Metadata = {
  // `absolute` porque o title da home JÁ É a marca: sem isso o template do layout
  // ('%s | .THE BRAZILIAN FACTORY.') carimbaria a marca em cima da marca.
  title: { absolute: t.meta.title },
  description: t.meta.description,
  alternates: languageAlternates('/'),
  openGraph: openGraphMeta({ title: t.meta.title, description: t.meta.ogDescription }),
}

export const revalidate = 3600

export default function Page() {
  return <HomeView lang="en" />
}
