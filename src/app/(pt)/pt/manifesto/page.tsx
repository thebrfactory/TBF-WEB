// Rota do manifesto. A página vive em src/views/ManifestoView.tsx e serve os
// dois idiomas: só o cromo muda, o corpo é bilíngue por desenho.

import type { Metadata } from 'next'
import ManifestoView from '@/views/ManifestoView'
import { manifesto } from '@/content/i18n/pages/manifesto'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = manifesto.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/manifesto'),
  openGraph: openGraphMeta({ title: t.meta.ogTitle, description: t.meta.ogDescription }),
}

export default function Page() {
  return <ManifestoView lang="pt" />
}
