// =============================================================================
// CONTEÚDO: "THE SCUM WEARS A CROWN." / "A ESPUMA TEM COROA."
// Série UMA DOSE DE CERRADO BAIANO (A SHOT OF BAHIAN CERRADO), 3 de 3 na ordem
// de lançamento. Matéria de texto, por isso menos foto.
//
// PROCEDÊNCIA. Investigação JORNADAZED em
// `_SHARED/JORNADAZED/investigacoes/2026-10-26-cotegipana-cachaca-cerrado-baiano`,
// texto revisado em `10-texto-leitura.md` (26/10/2026). Todo número tem fonte
// primária em `sources`. O 146 é o único `stat` da série.
//
// 🔴 A garrafa de murici é "aguardente composta" pela lei; o texto não a chama
// de cachaça em lugar nenhum, só nomeia a fruta. Manter assim.
//
// FOTOGRAFIA. Do fundador. Na 0816 o telefone do rótulo foi borrado antes da
// conversão. Ver `public/images/editorial/cotegipe/_CREDITOS.md`.
// =============================================================================

import type { ManifestoArticle } from './types'

const CREDITO = 'TAVARÍSTICO / .TBF. inc'
const F = '/images/editorial/cotegipe'

export const theScumWearsACrown: ManifestoArticle = {
  slug: 'the-scum-wears-a-crown',
  loaderTitle: { en: 'THE SCUM WEARS A CROWN', pt: 'A ESPUMA TEM COROA' },
  heroTitle: {
    en: 'THE SCUM WEARS A CROWN.',
    pt: 'A ESPUMA TEM COROA.',
  },
  heroSubtitle: {
    en: 'From Bahia in 1711 to a shelf in Cotegipe: the name for what the sugar mill threw away, now with a crown on the label.',
    pt: 'Da Bahia de 1711 a uma prateleira de Cotegipe: o nome do que o engenho jogava fora, hoje com coroa no rótulo.',
  },
  category: 'Field Research',
  publishedAt: '2026-12-28',
  deck: {
    en: 'In 1711, cachaça was the scum skimmed off the boiling juice and discarded. In Cotegipe, the oak-aged bottle has a crown, cursive lettering and the name of the town’s people.',
    pt: 'Em 1711, cachaça era a espuma tirada do caldo e descartada. Em Cotegipe, a garrafa envelhecida em carvalho tem coroa, letra cursiva e o nome da gente da cidade.',
  },
  cover: {
    src: `${F}/murici-ouro-especial.webp`,
    alt: {
      en: 'Cotegipana bottles against a worn wall: murici in front, Ouro Especial aged in oak on the right.',
      pt: 'Garrafas da Cotegipana contra a parede gasta: a de murici na frente, a Ouro Especial envelhecida em carvalho à direita.',
    },
    credit: '.TBF. inc',
  },
  ogImage: `${F}/og-murici-ouro-especial.jpg`,

  heroBelt: {
    en: 'A SHOT OF BAHIAN CERRADO, 3 of 3. Bahia, 1711. Cotegipe, 2026.',
    pt: 'UMA DOSE DE CERRADO BAIANO, 3 de 3. Bahia, 1711. Cotegipe, 2026.',
  },

  sources: [
    {
      label: {
        en: 'Antonil, Cultura e opulencia do Brasil, 1711 (Project Gutenberg).',
        pt: 'Antonil, Cultura e opulencia do Brasil, 1711 (Project Gutenberg).',
      },
      url: 'https://www.gutenberg.org/cache/epub/70662/pg70662.txt',
    },
    {
      label: {
        en: 'Curto, on cachaça and the Luanda slave trade, 2013.',
        pt: 'Curto, sobre cachaça e tráfico em Luanda, 2013.',
      },
      url: 'https://revistas.rcaap.pt/aham/article/download/37103/26335/170502',
    },
    {
      label: {
        en: 'Decree 4,062, December 21, 2001.',
        pt: 'Decreto 4.062, de 21 de dezembro de 2001.',
      },
      url: 'https://www.planalto.gov.br/ccivil_03/decreto/2001/d4062.htm',
    },
    {
      label: {
        en: 'TTB, US Treasury, final rule of February 25, 2013.',
        pt: 'TTB, Tesouro dos Estados Unidos, regra final de 25 de fevereiro de 2013.',
      },
      url: 'https://www.govinfo.gov/content/pkg/FR-2013-02-25/pdf/2013-04242.pdf',
    },
    {
      label: {
        en: 'Cotegipe town hall, Garota Cotegipana 2026.',
        pt: 'Prefeitura de Cotegipe, Garota Cotegipana 2026.',
      },
      url: 'https://www.cotegipe.ba.gov.br',
    },
  ],

  blocks: [
    {
      kind: 'pinned',
      kicker: { en: 'BAHIA, 1711', pt: 'BAHIA, 1711' },
      text: {
        en: 'In 1711, André João Antonil counted the sugar mills of Bahia.',
        pt: 'Em 1711, André João Antonil contou os engenhos de açúcar da Bahia.',
      },
    },
    {
      kind: 'stat',
      value: 146,
      formatted: { en: '146', pt: '146' },
      label: {
        en: 'mills grinding, not counting the ones still being built',
        pt: 'engenhos moendo, fora os que ainda estavam em construção',
      },
    },

    // ─── A ESPUMA.
    { kind: 'word', label: { en: 'THE SCUM', pt: 'A ESPUMA' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'In the same book, cachaça is not yet a drink.', pt: 'No mesmo livro, cachaça ainda não é bebida.' },
        { en: 'It is the first scum on the juice boiling in the kettle, skimmed off and thrown away as filth.', pt: 'É a primeira espuma do caldo fervendo na caldeira, tirada e jogada fora como sujeira.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The drink had another name, aguardente.', pt: 'A bebida tinha outro nome, aguardente.' },
        { en: 'From the molasses "se estilla aguardente", Antonil writes, and he would advise no mill owner to make it: it stirred up the slave quarters.', pt: 'Do mel do açúcar "se estilla aguardente", escreve Antonil, e ele não a aconselharia a senhor de engenho nenhum: deixava a senzala inquieta.' },
      ],
    },

    // ─── O PREÇO.
    { kind: 'word', label: { en: 'THE PRICE', pt: 'O PREÇO' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'It paid all the same.', pt: 'Mesmo assim, a aguardente pagava.' },
        { en: 'Between 1710 and 1830, a quarter of the 1.2 million enslaved Africans shipped from Luanda to Brazil were bought with cachaça, according to a 2013 study of the Luanda trade.', pt: 'Entre 1710 e 1830, um quarto dos 1,2 milhão de africanos escravizados embarcados em Luanda para o Brasil foi comprado com cachaça, segundo um estudo de 2013 sobre o comércio de Luanda.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The mill’s drink became a currency for people.', pt: 'A bebida do engenho virou moeda de gente.' },
      ],
      emphasize: [0],
    },

    // ─── O NOME.
    { kind: 'word', label: { en: 'THE NAME', pt: 'O NOME' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'In 2001, a federal decree declared cachaça a word "of exclusively Brazilian origin and use" and made it a geographical indication of the country.', pt: 'Em 2001, um decreto federal declarou que cachaça é palavra "de origem e uso exclusivamente brasileiros" e fez dela indicação geográfica do país.' },
        { en: 'Twelve years later, the United States recognised cachaça as a distinctive product of Brazil, and filed it as a type of rum.', pt: 'Doze anos depois, os Estados Unidos reconheceram a cachaça como produto distintivo do Brasil e a classificaram como um tipo de rum.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Brazil kept the name. The clothes were still borrowed.', pt: 'O nome ficou com o Brasil. A roupa ainda era emprestada.' },
      ],
      emphasize: [0],
    },

    // ─── O RÓTULO.
    { kind: 'word', label: { en: 'THE LABEL', pt: 'O RÓTULO' }, theme: 'dark' },
    {
      kind: 'image',
      src: `${F}/barril-vermelho.webp`,
      alt: {
        en: 'A red-varnished barrel on a wooden stand at the mill, a tap at its base.',
        pt: 'Barril envernizado de vermelho num cavalete de madeira no engenho, com torneira embaixo.',
      },
      credit: CREDITO,
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    {
      kind: 'lines',
      lines: [
        { en: 'In Cotegipe, the bottles come in a ranking.', pt: 'Em Cotegipe, as garrafas têm uma ordem.' },
        { en: 'On top, the one aged in oak barrels, Ouro Especial, 45%.', pt: 'No topo, a envelhecida em barril de carvalho, Ouro Especial, 45%.' },
        { en: 'Below, the fruit bottles: murici, a fruit of the cerrado, and banana.', pt: 'Embaixo, as de fruta: murici, fruta do cerrado, e bananinha.' },
      ],
    },
    {
      kind: 'image',
      src: `${F}/murici-ouro-especial.webp`,
      alt: {
        en: 'Cotegipana bottles against a worn wall: murici in front, Ouro Especial aged in oak on the right.',
        pt: 'Garrafas da Cotegipana contra a parede gasta: a de murici na frente, a Ouro Especial envelhecida em carvalho à direita.',
      },
      credit: CREDITO,
      variant: 'plate',
      width: 1920,
      height: 1280,
    },
    {
      kind: 'lines',
      lines: [
        { en: 'A crown, cursive lettering, Ouro Especial. It is the outfit of shelf whisky and rum.', pt: 'Coroa, letra cursiva, Ouro Especial. É a roupa do uísque e do rum de prateleira.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The wood on top came from far away. The fruit below grows right there.', pt: 'A madeira de cima veio de longe. A fruta de baixo dá ali.' },
        { en: 'It is the order of every bar shelf in the world, set up at the end of a dirt road.', pt: 'É a ordem da prateleira de qualquer bar do mundo, montada no fim de uma estrada de chão.' },
      ],
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'Three centuries after Antonil, the scum wears a crown.',
        pt: 'Três séculos depois de Antonil, a espuma tem coroa.',
      },
      theme: 'dark',
    },
    {
      kind: 'image',
      src: `${F}/selo-bananinha.webp`,
      alt: {
        en: 'A hand holds the round stamp of the banana bottle: Uma dose de ALEGRIA!',
        pt: 'Mão segura o selo redondo da garrafa de bananinha: Uma dose de ALEGRIA!',
      },
      caption: {
        en: 'On the banana bottle, the stamp promises a shot of joy.',
        pt: 'Na bananinha, o selo promete uma dose de alegria.',
      },
      credit: CREDITO,
      variant: 'plate',
      width: 1365,
      height: 2048,
    },

    // ─── A ASSINATURA.
    { kind: 'word', label: { en: 'THE SIGNATURE', pt: 'A ASSINATURA' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'And then there is the name. Cotegipana is what you call a woman from Cotegipe.', pt: 'E tem o nome. Cotegipana é o gentílico da cidade.' },
        { en: 'In June, the town hall opened entries for Garota Cotegipana 2026.', pt: 'Em junho, a prefeitura abriu inscrição para a Garota Cotegipana 2026.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The cachaça is called what the people there are called.', pt: 'A cachaça se chama como a gente de lá se chama.' },
      ],
      emphasize: [0],
    },
    {
      kind: 'closing',
      text: {
        en: 'The label borrows whisky’s clothes and signs with the name of the town.',
        pt: 'O rótulo pega emprestada a roupa do uísque e assina com o nome de Cotegipe.',
      },
    },
  ],
}
