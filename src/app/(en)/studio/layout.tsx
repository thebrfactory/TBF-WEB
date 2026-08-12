// =============================================================================
// LAYOUT DO STUDIO — existe por UM motivo só: marcar o painel como noindex.
//
// Medido em produção (2026-08-10): `https://thebrfactory.com/studio` respondia
// 200 e o robots.txt não bloqueava. Não era vazamento — o Sanity exige login
// para qualquer ação — mas era uma tela de ADMINISTRAÇÃO indexável servindo
// 1,64 MB de JS a qualquer robô que passasse.
//
// A metadata não podia morar no `page.tsx`: ele é `'use client'`, e client
// component não exporta `metadata`. Por isso um layout de servidor, que é o
// lugar certo — e cobre o segmento inteiro, incluindo as rotas do catch-all.
//
// O `robots.ts` também ganhou `/studio` no `disallow`. Os dois juntos: um
// pede para não rastrear, o outro para não indexar mesmo se chegar.
// =============================================================================

import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
