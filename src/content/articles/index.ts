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
// LOCAIS: a rota, os metadados, o card da home e o arquivo do /editorial passam a
// enxergá-la sozinhos.
//
// ORDEM. Da mais nova para a mais velha, que é a ordem em que o /editorial mostra.
// =============================================================================

import type { ManifestoArticle } from './types'
import { theHouseThatLearnedToAskItself } from './the-house-that-learned-to-ask-itself'
import { theDayBrazilStoppedTranslatingItself } from './the-day-brazil-stopped-translating-itself'

export const LOCAIS: ManifestoArticle[] = [
  theHouseThatLearnedToAskItself,
  theDayBrazilStoppedTranslatingItself,
]

/** A matéria local de um slug, ou null se o slug não for de matéria local. */
export function materiaLocal(slug: string): ManifestoArticle | null {
  return LOCAIS.find((a) => a.slug === slug) ?? null
}

/** Os slugs locais, para o generateStaticParams somar aos do CMS. */
export const SLUGS_LOCAIS = LOCAIS.map((a) => a.slug)

export type { ManifestoArticle }
