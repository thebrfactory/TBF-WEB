// Rota `/creators/tavaristico/hospitality` — inglês.
// A proposta de fotografia comercial para hospedagem. A página vive em
// src/views/HospitalityView.tsx; o porquê dela, no dicionário
// src/content/i18n/pages/hospitality.ts.

import type { Metadata } from 'next'
import { hospitality } from '@/content/i18n/pages/hospitality'
import HospitalityView from '@/views/HospitalityView'

export const metadata: Metadata = {
  title: hospitality.en.meta.title,
  description: hospitality.en.meta.description,
}

export default function HospitalityPage() {
  return <HospitalityView lang="en" />
}
