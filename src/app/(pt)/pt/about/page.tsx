// Rota `/pt/about` — a mesma página About, em português.
// A página em si vive em src/views/AboutView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import AboutView from '@/views/AboutView'
import { about } from '@/content/i18n/pages/about'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = about.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/about'),
  openGraph: openGraphMeta({ title: t.meta.title, description: t.meta.description }),
}

export default function Page() {
  return <AboutView lang="pt" />
}
