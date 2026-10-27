// =============================================================================
// CONTEÚDO: "IF YOU KNOW, YOU KNOW." / "QUEM CONHECE, CONHECE."
// Série UMA DOSE DE CERRADO BAIANO (A SHOT OF BAHIAN CERRADO), 1 de 3.
//
// PROCEDÊNCIA. Investigação JORNADAZED em
// `_SHARED/JORNADAZED/investigacoes/2026-10-26-cotegipana-cachaca-cerrado-baiano`,
// texto revisado em `10-texto-leitura.md` (26/10/2026). Relato em primeira
// pessoa do fundador, visita ao engenho em 28/06/2026.
//
// 🔴 DECISÃO JURÍDICA DO FUNDADOR (26/10/2026): fora por inteiro o ângulo de
// registro da marca e o leilão de 2019. Não reintroduzir. O dono fica sem nome
// e sem fala direta.
//
// FOTOGRAFIA. Do fundador, `28 JUNHO - COTEGIPE/SAÍDA`. Procedência e
// conversão em `public/images/editorial/cotegipe/_CREDITOS.md`.
// =============================================================================

import type { ManifestoArticle } from './types'

const CREDITO = 'TAVARÍSTICO / .TBF. inc'
const F = '/images/editorial/cotegipe'

export const ifYouKnowYouKnow: ManifestoArticle = {
  slug: 'if-you-know-you-know',
  loaderTitle: { en: 'IF YOU KNOW', pt: 'QUEM CONHECE' },
  heroTitle: {
    en: 'IF YOU KNOW, YOU KNOW.',
    pt: 'QUEM CONHECE, CONHECE.',
  },
  heroSubtitle: {
    en: 'Field notes from Cotegipe, Bahia: a cachaça the whole region knows, and a mill you only find through someone.',
    pt: 'Notas de campo de Cotegipe, Bahia: uma cachaça que a região inteira conhece e um engenho que só se acha por indicação.',
  },
  category: 'Field Research',
  publishedAt: '2026-11-02',
  deck: {
    en: 'In western Bahia, Cotegipana sits on the shelves of the local cachaça bars. The mill it comes from is at the end of 70 kilometres of dirt road, and the gate opens through people you know.',
    pt: 'No oeste baiano, a Cotegipana está na prateleira das cachaçarias. O engenho de onde ela sai fica no fim de 70 quilômetros de chão, e a porteira se abre por conhecido.',
  },
  cover: {
    src: `${F}/placa-engenho.webp`,
    alt: {
      en: 'A wooden arrow sign reading ENGENHO against a blue sky with clouds.',
      pt: 'Placa de madeira em forma de seta, escrito ENGENHO, contra o céu azul com nuvens.',
    },
    credit: '.TBF. inc',
  },
  ogImage: `${F}/og-placa-engenho.jpg`,

  // A série mora aqui: o motor não tem campo de série, e a legenda da esteira
  // é a única linha do cabeçalho que não é título.
  heroBelt: {
    en: 'A SHOT OF BAHIAN CERRADO, 1 of 3. Cotegipe, Bahia, June 28, 2026.',
    pt: 'UMA DOSE DE CERRADO BAIANO, 1 de 3. Cotegipe, Bahia, 28 de junho de 2026.',
  },

  sources: [
    {
      label: {
        en: 'IBGE, Municipal Agricultural Production 2024, harvested area in Cotegipe and São Desidério.',
        pt: 'IBGE, Produção Agrícola Municipal 2024, área colhida em Cotegipe e São Desidério.',
      },
      url: 'https://apisidra.ibge.gov.br/values/t/5457/n6/2909406,2928901/v/216/p/2024/c782/40124,40106',
    },
    {
      label: {
        en: 'IBGE, 2022 Census, population of Cotegipe.',
        pt: 'IBGE, Censo 2022, população de Cotegipe.',
      },
      url: 'https://servicodados.ibge.gov.br/api/v1/pesquisas/10070/periodos/2022/indicadores/96385/resultados/2909406',
    },
  ],

  blocks: [
    {
      kind: 'pinned',
      kicker: { en: 'COTEGIPE, BAHIA, BRAZIL', pt: 'COTEGIPE, BAHIA, BRASIL' },
      text: {
        en: 'I knew the bottle. I had never seen the mill.',
        pt: 'Eu conhecia a garrafa. Nunca tinha visto o engenho.',
      },
    },
    {
      kind: 'lines',
      lines: [
        { en: 'My aunt asked me to come to Cotegipe. A family trip.', pt: 'Minha tia me chamou para ir a Cotegipe, viagem de família.' },
        { en: 'From Barreiras it is 102 kilometres.', pt: 'De Barreiras até lá são 102 quilômetros.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Cotegipe is a small town, some 13,000 people.', pt: 'Cotegipe é uma cidade pequena, uns 13 mil habitantes.' },
        { en: 'But it was São João, and in inland Bahia São João is always welcome.', pt: 'Mas era São João, e São João no interior da Bahia é sempre bem recebido.' },
        { en: 'They closed off the square, the town hall hired the acts, and the party was out in the street.', pt: 'Fecharam a praça, a prefeitura contratou os artistas e a festa foi na rua.' },
      ],
    },

    // ─── O CERRADO.
    { kind: 'word', label: { en: 'THE CERRADO', pt: 'O CERRADO' }, theme: 'dark' },
    {
      kind: 'image',
      src: `${F}/cerrado-cerca.webp`,
      alt: {
        en: 'Open field and a wire fence in the cerrado, a lone tree on the horizon under a wide sky.',
        pt: 'Campo aberto e cerca de arame no cerrado, uma árvore sozinha no horizonte sob o céu largo.',
      },
      credit: CREDITO,
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Cotegipe sits in western Bahia and looks nothing like it.', pt: 'Cotegipe fica no oeste baiano e não se parece com ele.' },
        { en: 'In 2024 the municipality harvested 1,800 hectares of sorghum, 1,308 of corn and 241 of soy, according to IBGE.', pt: 'Em 2024 o município colheu 1.800 hectares de sorgo, 1.308 de milho e 241 de soja, segundo o IBGE.' },
        { en: 'Next door in São Desidério, soy passed 508,000 hectares.', pt: 'No vizinho São Desidério, a soja passou de 508 mil hectares.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Cane, in Cotegipe, comes to a few dozen hectares.', pt: 'Cana, em Cotegipe, são poucas dezenas de hectares.' },
        { en: 'Cotegipe is the piece of the west that soy never took.', pt: 'Cotegipe é o pedaço do oeste que a soja não ocupou.' },
      ],
      emphasize: [1],
    },

    // ─── A GARRAFA.
    { kind: 'word', label: { en: 'THE BOTTLE', pt: 'A GARRAFA' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'I had known the cachaça from there since I was a kid. In the region, it is well known.', pt: 'A cachaça de lá eu conhecia desde a pré-adolescência. Na região, ela é muito conhecida.' },
        { en: 'The mill does not sell to drinkers.', pt: 'O engenho não vende para quem bebe.' },
        { en: 'Cotegipana leaves for trade partners, cachaça bars and a few chosen shops, and that is where you buy it.', pt: 'A Cotegipana sai de lá para parceiros comerciais, cachaçarias e lojas escolhidas, e é na prateleira deles que a gente compra.' },
      ],
    },
    {
      kind: 'image',
      src: `${F}/rapadurinha.webp`,
      alt: {
        en: 'Packs of little rapadura from the mill, each with a yellow label, a barcode and a nutrition table.',
        pt: 'Pacotes de rapadurinha do engenho, cada um com rótulo amarelo, código de barras e tabela nutricional.',
      },
      credit: CREDITO,
      variant: 'plate',
      width: 1920,
      height: 1280,
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The little rapadura from the same mill has a barcode and a nutrition table.', pt: 'A rapadurinha do mesmo engenho tem código de barras e tabela nutricional.' },
        { en: 'It was made to travel to someone else’s counter.', pt: 'Foi feita para viajar até o balcão de outra pessoa.' },
      ],
    },

    // ─── A PORTEIRA.
    { kind: 'word', label: { en: 'THE GATE', pt: 'A PORTEIRA' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'The next day, a Sunday, we hit the road again.', pt: 'No outro dia, domingo, pegamos a estrada de novo.' },
        { en: 'Another 70 kilometres or so of dirt, tearing through the Bahian backlands, looking for the mill.', pt: 'Mais uns 70 quilômetros de chão, rasgando o sertão baiano atrás do engenho.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'We nearly got lost a few times.', pt: 'Quase nos perdemos algumas vezes.' },
        { en: 'People had warned us it was hard to reach, because of the cane.', pt: 'O pessoal tinha avisado que o acesso era difícil por causa do canavial.' },
      ],
    },
    {
      kind: 'fullbleed',
      text: { en: 'The cane hides the way in.', pt: 'A cana esconde a entrada.' },
      theme: 'dark',
    },
    {
      kind: 'image',
      src: `${F}/cana-contra-luz.webp`,
      alt: {
        en: 'Tall sugarcane against the light, dry straw on the ground.',
        pt: 'Cana alta contra a luz, palha seca no chão.',
      },
      credit: CREDITO,
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    {
      kind: 'image',
      src: `${F}/placa-em-pe.webp`,
      alt: {
        en: 'The ENGENHO arrow sign on its wooden post, upright against the clouds.',
        pt: 'A placa ENGENHO no poste de madeira, em pé contra as nuvens.',
      },
      caption: {
        en: 'The sign shows up before the mill does.',
        pt: 'A placa chega antes do engenho.',
      },
      credit: CREDITO,
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    {
      kind: 'lines',
      lines: [
        { en: 'An address is not enough.', pt: 'O endereço não basta.' },
        { en: 'We only got there, and were only let in, because my family had friends who knew the owner.', pt: 'A gente só chegou, e só foi recebido, porque minha família tinha conhecidos que conheciam o dono.' },
      ],
      emphasize: [0],
    },

    // ─── A CASA.
    { kind: 'word', label: { en: 'THE HOUSE', pt: 'A CASA' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'The owner showed us everything, from the very beginning.', pt: 'O dono mostrou tudo, desde o começo.' },
        { en: 'At the end he invited us to see his house, right next to where he makes it all.', pt: 'No fim, chamou a gente para conhecer a casa dele, ao lado da produção.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'He thanked us for coming.', pt: 'Agradeceu a visita.' },
        { en: 'He was glad that people who already knew what he made wanted to see how it was made.', pt: 'Ficou contente de ver gente que já conhecia os produtos querer saber como eram feitos.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'A story in a zine is also a way of saying something is worth it. I know that.', pt: 'Uma matéria num zine também é um jeito de dizer que uma coisa vale. Eu sei disso.' },
      ],
    },
    {
      kind: 'image',
      src: `${F}/retrovisor.webp`,
      alt: {
        en: 'The low sun in the car’s side mirror on the road back, trees against the sky.',
        pt: 'O sol baixo no retrovisor do carro na estrada de volta, árvores contra o céu.',
      },
      caption: {
        en: 'The way back, late afternoon.',
        pt: 'A volta, fim de tarde.',
      },
      credit: CREDITO,
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    {
      kind: 'closing',
      text: {
        en: 'Around there, if you know, you know. To reach the place Cotegipana comes from, you still have to know someone.',
        pt: 'Na região, quem conhece, conhece. Para chegar onde a Cotegipana nasce, ainda é preciso conhecer alguém.',
      },
    },
  ],
}
