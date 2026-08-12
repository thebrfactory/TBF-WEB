// Rota `/access` — em inglês.
// A página em si vive em src/views/AccessView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import AccessView from '@/views/AccessView'
import { access } from '@/content/i18n/pages/access'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = access.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/access'),
  openGraph: openGraphMeta({ title: t.meta.ogTitle, description: t.meta.ogDescription }),
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
