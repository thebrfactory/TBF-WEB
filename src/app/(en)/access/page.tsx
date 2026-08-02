// Rota `/access` — em inglês.
// A página em si vive em src/views/AccessView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import AccessView from '@/views/AccessView'
import { access } from '@/content/i18n/pages/access'
import { languageAlternates } from '@/lib/i18n'

const t = access.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/access'),
  openGraph: {
    title: t.meta.ogTitle,
    description: t.meta.ogDescription,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>
}) {
  return <AccessView lang="en" searchParams={searchParams} />
}
