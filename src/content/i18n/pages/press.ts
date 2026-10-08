// =============================================================================
// Dicionário da /press. Convenções: ../README.md
//
// Nova arquitetura (08/10/2026), a partir de TBF_Press_Nova_Arquitetura:
// "não é uma página de imprensa, é o registro público da Factory". Oito blocos:
// Latest, The Factory, People, Labels, Facts, Media Kit, Stories, Contact.
//
// Só entram fatos que o site já publica (fundação 2025, sede, quatro labels,
// territórios). FICOU DE FORA, DE PROPÓSITO: contagem editorial, membros do
// Collective, audiência, press kit PDF, bios e citações do founder. Os dados
// ainda não existem e nada foi inventado.
//
// Nomes de página e de produto ficam em inglês também na PT.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Press Room | The .TBF. Newsroom',
    description:
      'The official source for stories, facts, people and media assets from .THE BRAZILIAN FACTORY.',
  },

  hero: {
    tag: 'Press Room',
    title: '.TBF. Newsroom',
    deckPre: 'The official source for the Factory. Stories, announcements, facts, people and media assets from ',
    deckPost: '',
    tagline: ['Born in São Paulo.', 'Built for global relevance.'],
  },

  latest: {
    kicker: '01 / Latest',
    heading: 'What we’re building now.',
    body: 'Stories, launches and projects from the Factory, as they are published.',
    cta: 'Read the Zine',
    href: '/zine',
  },

  factory: {
    kicker: '02 / The Factory',
    heading: 'Who we are, why we exist and where we’re going.',
    lines: ['We build culture.', 'We build brands.', 'We build worlds.'],
    p1: 'is a São Paulo-born cultural factory building brands, worlds and intellectual property from Brazil for a global audience.',
    cta: 'About .TBF.',
    href: '/about',
  },

  people: {
    kicker: '03 / People',
    heading: 'The people behind the work.',
    body: 'Founder and creative leadership. A source with a name, beyond the brand.',
    cta: 'Founder profile',
    href: '/creators/tavaristico',
  },

  labels: {
    kicker: '04 / Labels',
    heading: 'The worlds we’re building.',
    items: [
      { key: 'tbf', kicker: '.TBF.', title: 'Cultural intelligence', body: 'Editorial, field research, ideas and the Factory thesis.', href: '/about', linkLabel: 'Read more' },
      { key: 'tfd', kicker: '.TFD.', title: 'THE FIORE DAILY', body: 'Intimacy, wellness, ritual, femininity and presence.', href: '/labels/thefioredaily', linkLabel: 'Read more' },
      { key: 'ruc', kicker: '.RUC.', title: 'RUNWAY UNTD COLLECTIVE', body: 'Fashion, image, runway, film and cultural memory.', href: '/labels/runwayunited', linkLabel: 'Read more' },
      { key: 'tgf', kicker: '.TGF.', title: 'THE GROWTH FACTORY', body: 'Growth, business, Brazilian entrepreneurship and economic culture.', href: '/labels/factoryofgrowth', linkLabel: 'Read more' },
    ] as { key: string; kicker: string; title: string; body: string; href: string; linkLabel: string }[],
  },

  facts: {
    kicker: '05 / Facts',
    heading: 'The numbers and information you can quote.',
    items: [
      { key: 'founded', kicker: 'Founded', title: '2025' },
      { key: 'hq', kicker: 'Headquarters', title: 'São Paulo, Brazil' },
      { key: 'labels', kicker: 'Active labels', title: '4' },
      { key: 'territories', kicker: 'Core territories', title: 'Culture, Fashion, Intimacy, Growth' },
    ] as { key: string; kicker: string; title: string }[],
    cta: 'Quick Facts',
    href: '/about/quick-facts',
  },

  mediaKit: {
    kicker: '06 / Media Kit',
    heading: 'Logos, photography, marks and approved assets.',
    body: 'Context first, then files. Everything you need to represent the house correctly.',
    cta: 'Open the Media Kit',
    href: '/press/media',
  },

  stories: {
    kicker: '07 / Stories',
    heading: 'The conversations we want to start.',
    items: [
      { key: 'infra', kicker: 'Angle 01', title: 'Brazilian creativity as infrastructure', body: 'A company turning Brazilian creativity into global cultural property.' },
      { key: 'model', kicker: 'Angle 02', title: 'The cultural factory model', body: 'An operation that connects labels, editorial, community, consulting and growth.' },
      { key: 'sp', kicker: 'Angle 03', title: 'São Paulo as source code', body: 'The city read as a cultural platform, beyond a location.' },
      { key: 'build', kicker: 'Angle 04', title: 'From advertising to building', body: 'The shift from campaign logic to brands, products, systems and ventures.' },
      { key: 'translation', kicker: 'Angle 05', title: 'Brazil without translation', body: 'The thesis of not explaining Brazil to the world, but producing from it.' },
    ] as { key: string; kicker: string; title: string; body: string }[],
  },

  boilerplate: {
    kicker: 'Boilerplate',
    heading: 'Approved descriptions.',
    shortLabel: 'Short',
    short: '.THE BRAZILIAN FACTORY. is a São Paulo-born cultural factory building brands, worlds and intellectual property from Brazil for a global audience.',
    mediumLabel: 'Medium',
    medium: '.THE BRAZILIAN FACTORY. is a multi-label creative company born in São Paulo. It operates across culture, editorial, fashion, intimacy and growth, building brands, communities, products and cultural properties. Its ecosystem connects labels, publishing, creative production, consulting and a growing network of artists, makers, thinkers and founders.',
  },

  contact: {
    kicker: '08 / Contact',
    heading: 'Media contact',
    line: 'Need a quote, interview, image, company fact or background on one of our labels? Start here.',
    email: 'press@thebrfactory.com',
    closing: 'The Factory is open to the press.',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Press Room | The .TBF. Newsroom',
    description:
      'A fonte oficial de histórias, fatos, pessoas e ativos de mídia da .THE BRAZILIAN FACTORY.',
  },

  hero: {
    tag: 'Press Room',
    title: '.TBF. Newsroom',
    deckPre: 'A fonte oficial da Factory. Histórias, anúncios, fatos, pessoas e ativos de mídia da ',
    deckPost: '',
    tagline: ['Nascida em São Paulo.', 'Feita para relevância global.'],
  },

  latest: {
    kicker: '01 / Latest',
    heading: 'O que estamos construindo agora.',
    body: 'Histórias, lançamentos e projetos da Factory, conforme são publicados.',
    cta: 'Ler o Zine',
    href: '/zine',
  },

  factory: {
    kicker: '02 / The Factory',
    heading: 'Quem somos, por que existimos e para onde vamos.',
    lines: ['A gente constrói cultura.', 'A gente constrói marcas.', 'A gente constrói mundos.'],
    p1: 'é uma factory cultural nascida em São Paulo que constrói marcas, mundos e propriedade intelectual a partir do Brasil, para um público global.',
    cta: 'Sobre a .TBF.',
    href: '/about',
  },

  people: {
    kicker: '03 / People',
    heading: 'As pessoas por trás do trabalho.',
    body: 'Founder e liderança criativa. Uma fonte com nome, não só uma marca.',
    cta: 'Perfil do founder',
    href: '/creators/tavaristico',
  },

  labels: {
    kicker: '04 / Labels',
    heading: 'Os mundos que estamos construindo.',
    items: [
      { key: 'tbf', kicker: '.TBF.', title: 'Inteligência cultural', body: 'Editorial, pesquisa de campo, ideias e a tese da Factory.', href: '/about', linkLabel: 'Saiba mais' },
      { key: 'tfd', kicker: '.TFD.', title: 'THE FIORE DAILY', body: 'Intimidade, bem-estar, ritual, feminilidade e presença.', href: '/labels/thefioredaily', linkLabel: 'Saiba mais' },
      { key: 'ruc', kicker: '.RUC.', title: 'RUNWAY UNTD COLLECTIVE', body: 'Moda, imagem, passarela, filme e memória cultural.', href: '/labels/runwayunited', linkLabel: 'Saiba mais' },
      { key: 'tgf', kicker: '.TGF.', title: 'THE GROWTH FACTORY', body: 'Crescimento, negócios, empreendedorismo brasileiro e cultura econômica.', href: '/labels/factoryofgrowth', linkLabel: 'Saiba mais' },
    ],
  },

  facts: {
    kicker: '05 / Facts',
    heading: 'Os números e informações que você pode citar.',
    items: [
      { key: 'founded', kicker: 'Fundação', title: '2025' },
      { key: 'hq', kicker: 'Sede', title: 'São Paulo, Brasil' },
      { key: 'labels', kicker: 'Labels ativas', title: '4' },
      { key: 'territories', kicker: 'Territórios centrais', title: 'Cultura, Moda, Intimidade, Growth' },
    ],
    cta: 'Quick Facts',
    href: '/about/quick-facts',
  },

  mediaKit: {
    kicker: '06 / Media Kit',
    heading: 'Logos, fotografia, marcas e ativos aprovados.',
    body: 'Primeiro o contexto, depois os arquivos. Tudo para representar a casa do jeito certo.',
    cta: 'Abrir o Media Kit',
    href: '/press/media',
  },

  stories: {
    kicker: '07 / Stories',
    heading: 'As conversas que queremos começar.',
    items: [
      { key: 'infra', kicker: 'Ângulo 01', title: 'Criatividade brasileira como infraestrutura', body: 'Uma empresa transformando a criatividade brasileira em propriedade cultural global.' },
      { key: 'model', kicker: 'Ângulo 02', title: 'O modelo da factory cultural', body: 'Uma operação que conecta labels, editorial, comunidade, consulting e growth.' },
      { key: 'sp', kicker: 'Ângulo 03', title: 'São Paulo como código-fonte', body: 'A cidade lida como plataforma cultural, não só como endereço.' },
      { key: 'build', kicker: 'Ângulo 04', title: 'Da publicidade ao construir', body: 'A passagem da lógica de campanha para marcas, produtos, sistemas e ventures.' },
      { key: 'translation', kicker: 'Ângulo 05', title: 'Brasil sem tradução', body: 'A tese de não explicar o Brasil para o mundo, e sim produzir a partir dele.' },
    ],
  },

  boilerplate: {
    kicker: 'Boilerplate',
    heading: 'Descrições aprovadas.',
    shortLabel: 'Curta',
    short: 'A .THE BRAZILIAN FACTORY. é uma factory cultural nascida em São Paulo que constrói marcas, mundos e propriedade intelectual a partir do Brasil, para um público global.',
    mediumLabel: 'Média',
    medium: 'A .THE BRAZILIAN FACTORY. é uma empresa criativa multi-label nascida em São Paulo. Atua em cultura, editorial, moda, intimidade e growth, construindo marcas, comunidades, produtos e propriedades culturais. Seu ecossistema conecta labels, publishing, produção criativa, consulting e uma rede crescente de artistas, makers, pensadores e founders.',
  },

  contact: {
    kicker: '08 / Contact',
    heading: 'Media contact',
    line: 'Precisa de uma citação, entrevista, imagem, dado da empresa ou contexto sobre uma das nossas labels? Comece aqui.',
    email: 'press@thebrfactory.com',
    closing: 'A Factory está aberta à imprensa.',
  },
}

export const press: Record<Lang, typeof en> = { en, pt }
