// =============================================================================
// /pitch/v3/overlens · a proposta ENDEREÇADA
//
// Pedido do fundador (#02, #01 CHANGES 2026-08-14): "propostas com essa página
// em específico para empresas específicas entram para páginas dentro da v3".
//
// O deck é o mesmo, componente e tudo — só a cena 06 troca de conteúdo, via a
// prop `partner`. É de propósito: um ajuste de layout no deck vale para as duas
// rotas no mesmo commit, e a proposta endereçada nunca envelhece sozinha.
//
// PARA UMA PROPOSTA NOVA: escrever um `PartnerScene` em `v3-scenes.ts` e copiar
// este arquivo trocando o slug e o objeto. Não editar a cena aberta de
// /pitch/v3 para encaixar um cliente.
//
// `noindex` como todo o deck, e aqui com um motivo a mais: é documento de
// trabalho endereçado a uma empresa, não material público.
// =============================================================================

import type { Metadata } from 'next'
import { PitchV3Client } from '../PitchV3Client'
import { PARTNERSHIP_OVERLENS } from '@/content/pitch/v3-scenes'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const TITLE = 'Pitch 3.0 · Overlens'
const DESCRIPTION =
  '.THE BRAZILIAN FACTORY. A cultural venture studio for Brazilian ideas with global reach. Working deck for Overlens.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: languageAlternates('/pitch/v3/overlens'),
  openGraph: openGraphMeta({ title: TITLE, description: DESCRIPTION }),
}

export default function PitchV3OverlensPage() {
  return <PitchV3Client partner={PARTNERSHIP_OVERLENS} />
}
