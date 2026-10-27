// =============================================================================
// REGISTRO DAS MATÉRIAS LOCAIS
// -----------------------------------------------------------------------------
// Matéria local é a que vive no repo, não no Sanity. O piloto era a única, e por
// isso o site o conhecia PELO NOME: quatro arquivos importavam
// `theDayBrazilStoppedTranslatingItself` e comparavam slug na mão. Com a segunda
// matéria isso vira quatro edições por publicação, e a que alguém esquecer é um
// link que abre em 404.
//
// Aqui a lista mora em UM lugar. Publicar a próxima é acrescentar uma linha em
// LOCAIS: a rota, os metadados, o card da home e o arquivo do /zine passam a
// enxergá-la sozinhos.
//
// ORDEM. Da mais nova para a mais velha, que é a ordem em que o /zine mostra.
// =============================================================================

import type { ManifestoArticle } from './types'
import { brazilianCountrySide } from './brazilian-country-side'
import { theLabelThatLearnedToAskItself } from './the-label-that-learned-to-ask-itself'
import { theDayBrazilStoppedTranslatingItself } from './the-day-brazil-stopped-translating-itself'
import { ifYouKnowYouKnow } from './if-you-know-you-know'
import { troughCopperAndOak } from './trough-copper-and-oak'
import { theScumWearsACrown } from './the-scum-wears-a-crown'

const PUBLICADAS: ManifestoArticle[] = [
  brazilianCountrySide,
  theLabelThatLearnedToAskItself,
  theDayBrazilStoppedTranslatingItself,
]

// NA FILA (26/10/2026, pedido do fundador: "a gente não precisa publicar nada
// agora", lançar aos poucos, uma a cada 15 dias). Escritas e prontas para
// revisão, aparecem SÓ no dev server. O build de produção não as enxerga, então
// um deploy de outra coisa não solta a série inteira de uma vez. Lançar uma é
// mover a linha dela para o topo de PUBLICADAS. Ordem de lançamento em
// `_SHARED/JORNADAZED/investigacoes/2026-10-26-cotegipana-cachaca-cerrado-baiano/07-serie-plano.md`.
const NA_FILA: ManifestoArticle[] = [
  theScumWearsACrown,
  troughCopperAndOak,
  ifYouKnowYouKnow,
]

export const LOCAIS: ManifestoArticle[] =
  process.env.NODE_ENV === 'production' ? PUBLICADAS : [...NA_FILA, ...PUBLICADAS]

/** A matéria local de um slug, ou null se o slug não for de matéria local. */
export function materiaLocal(slug: string): ManifestoArticle | null {
  return LOCAIS.find((a) => a.slug === slug) ?? null
}

/** Os slugs locais, para o generateStaticParams somar aos do CMS. */
export const SLUGS_LOCAIS = LOCAIS.map((a) => a.slug)

export type { ManifestoArticle }
