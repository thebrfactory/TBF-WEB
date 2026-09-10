// Rota `/creators/tavaristico` — inglês, o idioma nativo do site.
// A página em si vive em src/views/TavaristicoView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import TavaristicoView from '@/views/TavaristicoView'
import { tavaristico } from '@/content/i18n/pages/tavaristico'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = tavaristico.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/creators/tavaristico'),
  openGraph: openGraphMeta({ title: t.meta.title, description: t.meta.description }),
}

export default function Page() {
  return <TavaristicoView lang="en" />
}
