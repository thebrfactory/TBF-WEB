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

export const metadata: Metadata = {
  title: 'Proposta · Hostel Castelo',
  description:
    'Commercial photography proposal for Hostel Castelo, Pampulha, Belo Horizonte. Fifteen final images for the channels where booking happens.',
  robots: { index: false, follow: false },
}

export default function PropostaCasteloPage() {
  return <PropostaCasteloClient />
}
