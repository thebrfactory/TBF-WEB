// =============================================================================
// /pt/proposta/castelo · a MESMA peça da rota em inglês
//
// Existe pelo mesmo motivo das rotas gêmeas do deck: a pílula PT|EN não pode
// cair em 404 no meio da leitura. A peça já é bilíngue por desenho (português em
// Brother, inglês em Brother Printed itálico), então não há o que traduzir.
// =============================================================================

import type { Metadata } from 'next'
import { PropostaCasteloClient } from '@/app/(en)/proposta/castelo/PropostaCasteloClient'

export const metadata: Metadata = {
  title: 'Proposta · Hostel Castelo',
  description:
    'Proposta de fotografia comercial para o Hostel Castelo, Pampulha, Belo Horizonte. Quinze imagens finais para os canais onde a reserva acontece.',
  robots: { index: false, follow: false },
}

export default function PropostaCasteloPagePT() {
  return <PropostaCasteloClient />
}
