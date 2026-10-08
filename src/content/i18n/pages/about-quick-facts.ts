// =============================================================================
// Dicionário de ABOUT/QUICK-FACTS. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

type Item = { title: string; desc: string }
type Fact = { label: string; value: string }

const en = {
  meta: {
    title: 'Quick Facts',
    description:
      'The Factory, at a glance. What .THE BRAZILIAN FACTORY. is, why it exists, how it thinks and operates, and the facts that can be verified.',
  },

  hero: {
    tag: 'Quick Facts',
    title: 'The Factory, at a glance.',
    deck: 'A cultural factory born in São Paulo. Built for everywhere. We build brands, worlds, businesses and intellectual property from Brazil for a global audience.',
  },

  what: {
    sectionLabel: 'What we are',
    // ".THE BRAZILIAN FACTORY. " (negrito) + intro
    intro: 'is an independent cultural factory operating across culture, editorial, fashion, intimacy, growth, technology and creative business.',
    nots: 'Not a traditional agency. Not a media company. Not a holding company.',
  },

  why: {
    sectionLabel: 'Why we exist',
    items: [
      { title: 'Mission', desc: 'Make Brazilian culture undeniable.' },
      { title: 'Vision', desc: 'Build cultural properties from Brazil with global relevance.' },
      { title: 'Ambition', desc: 'Build the cultural property of what comes next.' },
    ] as Item[],
  },

  think: {
    sectionLabel: 'How we think',
    h2: 'Six principles.',
    items: [
      { title: 'Culture is raw material', desc: 'We start from behavior, context and cultural signal, not from category.' },
      { title: 'Brazil is the source code', desc: 'Repertoire, tension, language and a starting point. Never decoration.' },
      { title: 'Ideas must become things', desc: 'An idea gains strength when it becomes a brand, product, media, community or business.' },
      { title: 'Craft is strategy', desc: 'Form is not finish. The way something exists defines its perceived value.' },
      { title: 'Contribution over audience', desc: 'We prefer people who move culture forward to empty audience numbers.' },
      { title: 'Build for longevity', desc: 'We build assets that can compound value beyond the cycle of a trend.' },
    ] as Item[],
  },

  operate: {
    sectionLabel: 'How we operate',
    h2: 'Observe. Curate. Build. Distribute. Compound.',
    items: [
      { title: 'Observe', desc: 'Culture, behavior, technology, market and emerging signals.' },
      { title: 'Curate', desc: 'References, people, narratives, repertoire and hypotheses.' },
      { title: 'Build', desc: 'Labels, brands, products, communities, businesses and systems.' },
      { title: 'Distribute', desc: 'Editorial, internet, events, partnerships, media and community.' },
      { title: 'Compound', desc: 'Audience, IP, reputation, revenue, network and new possibilities.' },
    ] as Item[],
  },

  build: {
    sectionLabel: 'What we build',
    items: ['Brands.', 'Worlds.', 'Products.', 'Communities.', 'Businesses.', 'Intellectual property.'],
  },

  architecture: {
    sectionLabel: 'The architecture',
    h2: 'The Factory creates.',
    items: [
      { title: 'Labels', desc: 'Cultural properties with their own language, audience and thesis. The Labels become worlds.', href: '/labels' },
      { title: 'Collective', desc: 'A network of artists, makers, thinkers, founders and changemakers. The Collective brings the people.', href: '/collective' },
      { title: 'Publishing', desc: 'Memory, narrative, investigation and cultural distribution.', href: '/publishing' },
      { title: 'Consulting', desc: 'Brand, business and structure treated as one decision.', href: '/consulting' },
      { title: 'Brand Tech', desc: 'AI-native systems that increase the Factory capability.', href: '/brand-tech' },
      { title: 'Access', desc: 'The door to build, create, publish, collaborate or join.', href: '/access' },
      { title: 'Press Room', desc: 'Public credibility and institutional information. It makes the company legible to the world.', href: '/press' },
    ] as (Item & { href: string })[],
  },

  facts: {
    sectionLabel: 'The facts',
    items: [
      { label: 'Founded', value: '2025' },
      { label: 'Origin', value: 'São Paulo, Brazil' },
      { label: 'Model', value: 'Independent cultural factory' },
      { label: 'Labels', value: '4 active properties' },
      { label: 'Core territories', value: 'Culture · Editorial · Fashion · Intimacy · Growth · Business' },
      { label: 'Audience', value: 'Global, with Brazil as source code' },
      { label: 'Status', value: 'Independent · Active · Building' },
      { label: 'Website', value: 'thebrfactory.com' },
    ] as Fact[],
  },

  legal: {
    sectionLabel: 'Legal and contact',
    items: [
      { label: 'Legal Name', value: '.TBF. INC' },
      { label: 'CNPJ', value: '61.360.565/0001-74' },
      { label: 'Address', value: 'R. Pamplona, 145. Jardim Paulista\nSão Paulo, SP. 01405-100\nBrasil' },
      { label: 'Main Instagram', value: '@thebrfactory' },
    ] as Fact[],
  },

  thesis: 'Culture is not decoration. Culture is infrastructure.',

  cta: {
    sectionLabel: 'Understand the Factory',
    items: [
      { title: 'About', href: '/about' },
      { title: 'Labels', href: '/labels' },
      { title: 'Collective', href: '/collective' },
      { title: 'Consulting', href: '/consulting' },
      { title: 'Access', href: '/access' },
    ] as { title: string; href: string }[],
  },
}

const pt: typeof en = {
  meta: {
    title: 'Quick Facts',
    description:
      'A Factory, em um relance. O que é a .THE BRAZILIAN FACTORY., por que existe, como pensa e opera, e os fatos verificáveis.',
  },

  hero: {
    tag: 'Quick Facts',
    title: 'A Factory, em um relance.',
    deck: 'Uma factory cultural nascida em São Paulo. Construída para qualquer lugar. Construímos marcas, mundos, negócios e propriedade intelectual a partir do Brasil, para uma audiência global.',
  },

  what: {
    sectionLabel: 'O que somos',
    intro: 'é uma factory cultural independente que atua entre cultura, editorial, moda, intimidade, growth, tecnologia e negócios criativos.',
    nots: 'Não somos uma agência tradicional, uma empresa de mídia nem uma holding.',
  },

  why: {
    sectionLabel: 'Por que existimos',
    items: [
      { title: 'Missão', desc: 'Tornar a cultura brasileira inegável.' },
      { title: 'Visão', desc: 'Construir, a partir do Brasil, propriedades culturais com relevância global.' },
      { title: 'Ambição', desc: 'Construir a propriedade cultural do que vem depois.' },
    ],
  },

  think: {
    sectionLabel: 'Como pensamos',
    h2: 'Seis princípios.',
    items: [
      { title: 'Cultura é matéria-prima', desc: 'Começamos pelo comportamento, pelo contexto e pelo sinal cultural, não pela categoria.' },
      { title: 'Brasil é código-fonte', desc: 'Repertório, tensão, linguagem e ponto de partida. Nunca decoração.' },
      { title: 'Ideias precisam virar coisas', desc: 'Uma ideia ganha força quando vira marca, produto, mídia, comunidade ou negócio.' },
      { title: 'Craft é estratégia', desc: 'Forma não é acabamento. O jeito como algo existe define seu valor percebido.' },
      { title: 'Contribuição acima de audiência', desc: 'Preferimos quem faz a cultura avançar a números vazios de audiência.' },
      { title: 'Construir para durar', desc: 'Construímos ativos que acumulam valor além do ciclo de uma tendência.' },
    ],
  },

  operate: {
    sectionLabel: 'Como operamos',
    h2: 'Observe. Curate. Build. Distribute. Compound.',
    items: [
      { title: 'Observe', desc: 'Cultura, comportamento, tecnologia, mercado e sinais emergentes.' },
      { title: 'Curate', desc: 'Referências, pessoas, narrativas, repertório e hipóteses.' },
      { title: 'Build', desc: 'Labels, marcas, produtos, comunidades, negócios e sistemas.' },
      { title: 'Distribute', desc: 'Editorial, internet, eventos, parcerias, mídia e comunidade.' },
      { title: 'Compound', desc: 'Audiência, IP, reputação, receita, rede e novas possibilidades.' },
    ],
  },

  build: {
    sectionLabel: 'O que construímos',
    items: ['Marcas.', 'Mundos.', 'Produtos.', 'Comunidades.', 'Negócios.', 'Propriedade intelectual.'],
  },

  architecture: {
    sectionLabel: 'A arquitetura',
    h2: 'A Factory cria.',
    items: [
      { title: 'Labels', desc: 'Propriedades culturais com linguagem, público e tese próprios. As Labels viram mundos.', href: '/labels' },
      { title: 'Collective', desc: 'Rede de artistas, makers, pensadores, founders e changemakers. O Collective traz as pessoas.', href: '/collective' },
      { title: 'Publishing', desc: 'Memória, narrativa, investigação e distribuição cultural.', href: '/publishing' },
      { title: 'Consulting', desc: 'Marca, negócio e estrutura tratados como uma única decisão.', href: '/consulting' },
      { title: 'Brand Tech', desc: 'Sistemas AI-native que aumentam a capacidade da Factory.', href: '/brand-tech' },
      { title: 'Access', desc: 'A porta para construir, criar, publicar, colaborar ou entrar.', href: '/access' },
      { title: 'Press Room', desc: 'Credibilidade pública e informação institucional. Torna a empresa legível para o mundo.', href: '/press' },
    ],
  },

  facts: {
    sectionLabel: 'Os fatos',
    items: [
      { label: 'Fundação', value: '2025' },
      { label: 'Origem', value: 'São Paulo, Brasil' },
      { label: 'Modelo', value: 'Factory cultural independente' },
      { label: 'Labels', value: '4 propriedades ativas' },
      { label: 'Territórios', value: 'Cultura · Editorial · Moda · Intimidade · Growth · Negócios' },
      { label: 'Audiência', value: 'Global, com o Brasil como código-fonte' },
      { label: 'Status', value: 'Independente · Ativa · Construindo' },
      { label: 'Site', value: 'thebrfactory.com' },
    ],
  },

  legal: {
    sectionLabel: 'Legal e contato',
    items: [
      { label: 'Razão Social', value: '.TBF. INC' },
      { label: 'CNPJ', value: '61.360.565/0001-74' },
      { label: 'Endereço', value: 'R. Pamplona, 145. Jardim Paulista\nSão Paulo, SP. 01405-100\nBrasil' },
      { label: 'Instagram Principal', value: '@thebrfactory' },
    ],
  },

  thesis: 'Cultura não é decoração. Cultura é infraestrutura.',

  cta: {
    sectionLabel: 'Entenda a Factory',
    items: [
      { title: 'About', href: '/about' },
      { title: 'Labels', href: '/labels' },
      { title: 'Collective', href: '/collective' },
      { title: 'Consulting', href: '/consulting' },
      { title: 'Access', href: '/access' },
    ],
  },
}

export const aboutQuickFacts: Record<Lang, typeof en> = { en, pt }
