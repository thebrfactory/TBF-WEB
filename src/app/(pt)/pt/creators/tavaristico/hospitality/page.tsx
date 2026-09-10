// Rota `/pt/creators/tavaristico/hospitality` — português.
// Mesma view da rota em inglês; aqui a proposta É traduzida por inteiro,
// inclusive as legendas das fotos (ver o cabeçalho da view).

import type { Metadata } from 'next'
import { hospitality } from '@/content/i18n/pages/hospitality'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'
import HospitalityView from '@/views/HospitalityView'

export const metadata: Metadata = {
  title: hospitality.pt.meta.title,
  description: hospitality.pt.meta.description,
  alternates: languageAlternates('/creators/tavaristico/hospitality'),
  openGraph: openGraphMeta({
    title: hospitality.pt.meta.title,
    description: hospitality.pt.meta.description,
  }),
}

export default function HospitalityPagePT() {
  return <HospitalityView lang="pt" />
}
