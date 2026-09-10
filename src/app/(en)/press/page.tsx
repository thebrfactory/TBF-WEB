// Rota `/press` — em inglês.
// A página em si vive em src/views/PressView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import PressView from '@/views/PressView'
import { press } from '@/content/i18n/pages/press'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = press.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/press'),
  openGraph: openGraphMeta({ title: t.meta.title, description: t.meta.description }),
}

export default function Page() {
  return <PressView lang="en" />
}
