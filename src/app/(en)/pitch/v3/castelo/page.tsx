// =============================================================================
// /pitch/v3/castelo · a proposta ENDEREÇADA ao Hostel Castelo
//
// Rota-filha de /pitch/v3, pela regra escrita em `v3-scenes.ts`: proposta com
// nome de empresa na tela nasce como rota própria, com o slug dela, e NUNCA
// editando a cena aberta do deck. O componente é o mesmo: só a cena 06 troca de
// conteúdo, via a prop `partner`.
//
// Contexto da parceria: colaboração fotográfica de escopo fechado durante a
// estadia de 27/ago a 09/set de 2026. Pesquisa e guia de alinhamento em
// `~/TBF X CASTELO/PESQUISA INICIAL/`.
//
// `noindex` como todo o deck, e aqui com um motivo a mais: é documento de
// trabalho endereçado a uma casa específica, não material público.
// =============================================================================

import type { Metadata } from 'next'
import { PitchV3Client } from '../PitchV3Client'
import { PARTNERSHIP_CASTELO } from '@/content/pitch/v3-scenes'

export const metadata: Metadata = {
  title: 'Pitch 3.0 · Hostel Castelo',
  description:
    '.THE BRAZILIAN FACTORY. A cultural venture studio for Brazilian ideas with global reach. Working deck for Hostel Castelo.',
  robots: { index: false, follow: false },
}

export default function PitchV3CasteloPage() {
  return <PitchV3Client partner={PARTNERSHIP_CASTELO} />
}
