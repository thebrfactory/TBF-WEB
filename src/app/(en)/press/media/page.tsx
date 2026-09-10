// Rota `/press/media` — em inglês.
// A página em si vive em src/views/PressMediaView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import PressMediaView from '@/views/PressMediaView'
import { pressMedia } from '@/content/i18n/pages/press-media'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = pressMedia.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/press/media'),
  openGraph: openGraphMeta({ title: t.meta.title, description: t.meta.description }),
}

export default function Page() {
  return <PressMediaView lang="en" />
}
