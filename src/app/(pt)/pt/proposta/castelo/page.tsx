// =============================================================================
// /pt/proposta/castelo · a MESMA peça da rota em inglês
//
// Existe pelo mesmo motivo das rotas gêmeas do deck: a pílula PT|EN não pode
// cair em 404 no meio da leitura. A peça já é bilíngue por desenho (português em
// Brother, inglês em Brother Printed itálico), então não há o que traduzir.
// =============================================================================

import type { Metadata } from 'next'
import { PropostaCasteloClient } from '@/app/(en)/proposta/castelo/PropostaCasteloClient'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const TITLE = 'Proposta · Hostel Castelo'
const DESCRIPTION =
  'Proposta de fotografia comercial para o Hostel Castelo, Pampulha, Belo Horizonte. Quinze imagens finais para os canais onde a reserva acontece.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: languageAlternates('/proposta/castelo'),
  openGraph: openGraphMeta({ title: TITLE, description: DESCRIPTION }),
}

export default function PropostaCasteloPagePT() {
  return <PropostaCasteloClient />
}
