// =============================================================================
// /pitch — INVESTOR / PARTNER DECK (1.0)
// .THE BRAZILIAN FACTORY. — Startup Pitch
//
// Uma página, dois idiomas: o texto vem do dicionário e os links passam por
// localizedPath. Ver src/content/i18n/README.md. PitchClient e
// PressLogosCarousel moraram na raiz de app/(en)/pitch/ e agora vivem em
// app/(en)/pitch/v1/ (não são rota, só mudaram de pasta junto com o deck) e
// leem o idioma via useLang(), herdado do LangProvider da árvore em que a
// página está montada.
//
// NÃO CONFUNDIR com /pitch/v2: aquele deck é deliberadamente bilíngue
// (português + inglês na mesma tela) e está fora deste escopo de i18n.
// =============================================================================

import { PitchClient } from '@/app/(en)/pitch/v1/PitchClient'
import type { Lang } from '@/lib/i18n'

export default function PitchView({ lang }: { lang: Lang }) {
  return <PitchClient />
}
