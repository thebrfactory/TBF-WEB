// =============================================================================
// TIPOS DO MOTOR SCROLLY: o contrato que toda matéria local obedece
// -----------------------------------------------------------------------------
// Saíram do arquivo do piloto quando a segunda matéria nasceu. Enquanto havia uma
// só, tipo e conteúdo no mesmo arquivo era honesto; com duas, a segunda teria de
// importar o tipo de dentro do texto da primeira, e o motor passaria a depender de
// uma matéria específica para saber o que é uma matéria. Regra 4: apontar, não
// copiar. O piloto continua reexportando os nomes, então nada que o importava dele
// precisou mudar.
// =============================================================================

import type { ScrollyTheme } from '@/components/scrolly'

export interface Bilingual {
  en: string
  pt: string
}

export type Lang = 'en' | 'pt'

export type ManifestoBlock =
  | { kind: 'lines'; lines: Bilingual[]; emphasize?: number[] }
  | { kind: 'divider'; theme?: ScrollyTheme }
  | { kind: 'word'; label: Bilingual; theme?: ScrollyTheme }
  | { kind: 'pinned'; text: Bilingual; kicker?: Bilingual }
  | { kind: 'fullbleed'; text: Bilingual; theme?: ScrollyTheme; scale?: 'display' | 'word' | 'wordmark' }
  | { kind: 'mirror'; before: Bilingual[]; after: Bilingual[]; beforeLabel?: Bilingual; afterLabel?: Bilingual }
  | { kind: 'raw'; fixed: Bilingual; items: Bilingual[] }
  | { kind: 'negation'; pairs: [Bilingual, Bilingual][] }
  | { kind: 'stickers'; fragments: Bilingual[] }
  | { kind: 'stat'; value: number; formatted: Bilingual; label: Bilingual; prefix?: Bilingual }
  | { kind: 'closing'; text: Bilingual }
  // O motor já tinha o componente de imagem (MediaParallax) desde a ORD-01; ele
  // só estava dormente porque o piloto nasceu sem foto. Este bloco é o que
  // acorda. `credit` é campo separado de `caption` de propósito: as imagens são
  // de licença livre COM ATRIBUIÇÃO OBRIGATÓRIA (CC BY / CC BY-SA), então o
  // crédito não pode depender de alguém lembrar de escrevê-lo dentro da legenda.
  // Procedência completa em `public/images/editorial/gurgel/_CREDITOS.md`.
  //
  // `variant` escolhe entre foto que sangra (`bleed`, padrão) e prancha de museu
  // (`plate`), ver o cabeçalho de MediaParallax.tsx para o porquê. Em `plate`,
  // `width`/`height` são a proporção NATIVA do arquivo e não são opcionais: é
  // ela que define a altura da peça, já que nada é recortado.
  | {
      kind: 'image'
      src: string
      alt: Bilingual
      caption?: Bilingual
      credit: string
      variant?: 'bleed'
    }
  | {
      kind: 'image'
      src: string
      alt: Bilingual
      caption?: Bilingual
      credit: string
      variant: 'plate'
      width: number
      height: number
    }
  // PAR LADO A LADO (pedido do fundador, #01 CHANGES 2026-08-14): "no mobile a
  // imagem de ponta a ponta da tela fica bom, mas no desktop fica muito grande e
  // fica estourado, por isso pode ser interessante deixar duas imagens lado a
  // lado". O par NÃO é um recurso de diagramação solto: só existe quando as duas
  // peças são a mesma coisa vista de dois jeitos (frente e traseira do mesmo
  // carro). Duas fotos sem relação lado a lado viram grade de portfólio, que é
  // exatamente o que uma matéria não é.
  //
  // No telefone as duas empilham e continuam sangrando de ponta a ponta, que é o
  // que ele aprovou. Ver `.scrolly-pair` em scrolly.css.
  | {
      kind: 'pair'
      items: [PairImage, PairImage]
      /**
       * Proporcao do quadro de cada metade, em sintaxe de `aspect-ratio`
       * ('2 / 3'). Sem ela o par usa 4/3, que e a proporcao nativa dos dois
       * renders do Gurgel e nasceu com o recurso. Retrato vertical num quadro
       * 4/3 perde cabeca e pe, entao todo par de foto em pe passa a sua
       * propria proporcao aqui (ver .scrolly-pair__frame em scrolly.css).
       */
      ratio?: string
    }

export interface PairImage {
  src: string
  alt: Bilingual
  caption?: Bilingual
  credit: string
}

export interface ManifestoArticle {
  slug: string
  loaderTitle: Bilingual
  heroTitle: Bilingual
  heroSubtitle: Bilingual
  category: string
  publishedAt: string
  deck: Bilingual
  /**
   * Capa. Serve a DOIS lugares ao mesmo tempo, de propósito: o fundo do hero da
   * matéria e a miniatura dela no /zine e na home. Um campo só, para a capa
   * do card nunca divergir da capa que a pessoa vê ao abrir.
   */
  cover: { src: string; alt: Bilingual; credit: string }
  /**
   * Capa de compartilhamento (OpenGraph), 1200x630. O que aparece quando o link
   * e colado no WhatsApp, LinkedIn ou Slack. Campo separado da `cover` de
   * proposito: a capa do card e 3:2 e o recorte de 1,91:1 cortaria a peca.
   * Sem este campo a materia cai na capa generica do site (`OG_IMAGE_PATH`),
   * igual a de qualquer outra pagina.
   */
  ogImage?: string
  /**
   * LEGENDA DA ESTEIRA NO CABEÇALHO, opt-in por matéria (pedido do fundador,
   * 21/09/2026: o reel de fotos do corpo, no estilo do
   * /creators/tavaristico/hospitality, mas sem sair do cabeçalho).
   *
   * As FOTOS não vêm daqui: o motor já coleta as mesmas fotos dos blocos
   * `image`/`pair` (ver `collectPhotos` em ArticleScrolly.tsx) e reaproveita a
   * fila, para nunca existir foto na esteira que a matéria não tenha. Este
   * campo só liga a legenda, e move essa esteira para DENTRO do HeroCinema:
   * sem ele, a matéria mantém o comportamento padrão (esteira depois do
   * Hero). Presença do campo é o interruptor, nenhuma outra matéria muda de
   * lugar por causa disto.
   */
  heroBelt?: Bilingual
  /**
   * AVISO DE FICÇÃO. Obrigatório em toda matéria `Manifesto` (guard:
   * scripts/check-zine-contract.mjs). Aparece em letra pequena abaixo do
   * subtítulo do hero e se repete no fim da matéria. Ficção pode inventar fato,
   * mas tem de dizer que é ficção.
   */
  fiction?: Bilingual
  /**
   * FONTES. Obrigatório (ao menos uma) em toda matéria `Field Research`. Lista
   * curta no fim da matéria, em letra pequena, com link.
   */
  sources?: { label: Bilingual; url: string }[]
  blocks: ManifestoBlock[]
}
