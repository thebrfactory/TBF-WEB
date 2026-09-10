// =============================================================================
// /proposta/castelo · a proposta endereçada ao Hostel Castelo
//
// Fora de /pitch de propósito. O deck da .TBF. apresenta a casa a um investidor
// ou parceiro estratégico; esta peça vende UM trabalho de fotografia a um
// cliente, e usar a rota do pitch faria a proposta herdar um contexto que não é
// o dela (decisão do fundador, 2026-08-18). O que as duas compartilham é o
// formato, via `@/components/DeckShell/DeckShell`.
//
// `noindex`: documento de trabalho endereçado a uma casa específica.
// =============================================================================

import type { Metadata } from 'next'
import { PropostaCasteloClient } from './PropostaCasteloClient'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const TITLE = 'Proposta · Hostel Castelo'
const DESCRIPTION =
  'Commercial photography proposal for Hostel Castelo, Pampulha, Belo Horizonte. Fifteen final images for the channels where booking happens.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: languageAlternates('/proposta/castelo'),
  openGraph: openGraphMeta({ title: TITLE, description: DESCRIPTION }),
}

export default function PropostaCasteloPage() {
  return <PropostaCasteloClient />
}
