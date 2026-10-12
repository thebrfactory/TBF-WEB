// =============================================================================
// Dicionário de ABOUT. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

type Item = { title: string; desc: string }
type LinkItem = { title: string; desc: string; href: string }

const en = {
  meta: {
    title: 'About Us',
    description:
      '.THE BRAZILIAN FACTORY. is a Brazil-born cultural factory building brands, worlds, businesses and intellectual property for a global audience.',
  },

  hero: {
    tag: 'About .TBF.',
    title: '.THE CULTURE FACTORY.',
    deck: 'Born in São Paulo. Built for global relevance. We build brands, worlds, businesses and intellectual property from Brazil for a global audience.',
    lines: ['Culture is our raw material.', 'Brazil is our source code.', 'Ideas are our starting point.', 'Building is the job.'],
  },

  whatWeAre: {
    sectionLabel: 'What we are',
    // Renderizada após o nome da marca em negrito (".THE BRAZILIAN FACTORY. " + intro).
    intro: 'is an independent cultural company operating across editorial, fashion, intimacy, growth, technology and creative business.',
    nots: ['We are not a traditional agency.', 'We are not a media company.', 'We are not a holding company.'],
    statement: 'We are a Factory.',
    body: 'A system built to investigate signals, gather people, develop properties and turn culture into things that can exist in the world.',
  },

  why: {
    sectionLabel: 'Why we exist',
    mission: 'To make Brazilian culture undeniable.',
    p1: 'Brazil is not our theme. It is our source code.',
    p2: 'We do not translate Brazil for the world. We build from Brazil for everywhere.',
  },

  how: {
    sectionLabel: 'How the Factory works',
    h2: 'Observe. Curate. Build. Distribute. Compound.',
    items: [
      { title: 'Observe', desc: 'Field research, culture, trends, behavior.' },
      { title: 'Curate', desc: 'Editorial, references, people, signals.' },
      { title: 'Build', desc: 'Labels, brands, products, communities, systems.' },
      { title: 'Distribute', desc: 'Publishing, media, events, internet, partnerships.' },
      { title: 'Compound', desc: 'Audience, IP, revenue, reputation, network.' },
    ] as Item[],
  },

  build: {
    sectionLabel: 'What we build',
    items: ['Brands.', 'Worlds.', 'Products.', 'Communities.', 'Businesses.', 'Intellectual property.'],
  },

  labels: {
    sectionLabel: 'The Labels',
    h2: 'Four active properties.',
    items: [
      { title: '.THE BRAZILIAN FACTORY.', desc: 'Editorial label and cultural backbone of the Factory. Stories, essays, photography.', href: '/zine' },
      { title: '.THE FIORE DAILY.', desc: 'Wellness, intimacy, ritual and feminine expression. Presence as a practice.', href: '/labels/thefioredaily' },
      { title: '.RUNWAY UNTD COLLECTIVE.', desc: 'Fashion film, editorial, SPFW, creative direction. Fashion as cultural memory.', href: '/labels/runwayunited' },
      { title: '.THE GROWTH FACTORY.', desc: 'Growth strategy, business development and scalable innovation.', href: '/labels/factoryofgrowth' },
    ] as LinkItem[],
  },

  system: {
    sectionLabel: 'The system',
    h2: 'One Factory, seven doors.',
    items: [
      { title: 'Labels', desc: 'Cultural properties, each with its own thesis.', href: '/labels' },
      { title: 'Collective', desc: 'The people who build with us.', href: '/collective' },
      { title: 'Publishing', desc: 'Memory, narrative and distribution.', href: '/publishing' },
      { title: 'Consulting', desc: 'Brand, business and structure as one decision.', href: '/consulting' },
      { title: 'Brand Tech', desc: 'AI-native systems for brands and businesses.', href: '/brand-tech' },
      { title: 'Access', desc: 'The way in.', href: '/access' },
      { title: 'Press Room', desc: 'The record the world can verify.', href: '/press' },
    ] as LinkItem[],
  },

  principles: {
    sectionLabel: 'Our principles',
    h2: 'Operating codes, not slogans.',
    items: [
      { title: 'Culture is raw material', desc: 'We extract signal, tension, language and opportunity from culture.' },
      { title: 'Brazil is the source code', desc: 'Origin and operating system, never decoration.' },
      { title: 'Ideas must become things', desc: 'A concept without a form is only intention.' },
      { title: 'Contribution over audience', desc: 'We prefer those who move culture to those who only collect followers.' },
      { title: 'Craft is strategy', desc: 'Form, language and execution are part of the business decision.' },
      { title: 'Build for longevity', desc: 'We build properties that can accumulate value, not instant relevance.' },
    ] as Item[],
  },

  founder: {
    sectionLabel: 'The people',
    // "Founded by " + <strong>TAVARÍSTICO</strong> + "."
    foundedBy: 'Founded by',
    name: 'TAVARÍSTICO',
    p1: 'Creative Director and entrepreneur building brands, products and businesses where creativity meets technology.',
    p2: 'From advertising and fashion to cultural ventures, his work sits between creative direction, brand strategy, technology and new business.',
    cta: 'Press Room',
    ctaHref: '/press',
  },

  photos: [
    'The silhouette of a rider on horseback against a blue sky.',
    'A person wearing an orange mask and a purple and blue jacket at night.',
    'A gallery wall with paintings and a sculpture in a blue-lit exhibition hall.',
    'A clown mask driver giving a thumbs up inside a pink car.',
  ],

  closing: 'Born in São Paulo. Built for everywhere.',
}

const pt: typeof en = {
  meta: {
    title: 'Sobre Nós',
    description:
      'A .THE BRAZILIAN FACTORY. é uma factory cultural nascida no Brasil que constrói marcas, mundos, negócios e propriedade intelectual para uma audiência global.',
  },

  hero: {
    tag: 'Sobre a .TBF.',
    title: '.THE CULTURE FACTORY.',
    deck: 'Nascida em São Paulo. Construída para relevância global. Construímos marcas, mundos, negócios e propriedade intelectual a partir do Brasil, para uma audiência global.',
    lines: ['Cultura é nossa matéria-prima.', 'Brasil é nosso código-fonte.', 'Ideias são o ponto de partida.', 'Construir é o trabalho.'],
  },

  whatWeAre: {
    sectionLabel: 'O que somos',
    intro: 'é uma empresa cultural independente que atua entre editorial, moda, intimidade, growth, tecnologia e negócios criativos.',
    nots: ['Não somos uma agência tradicional.', 'Não somos uma empresa de mídia.', 'Não somos uma holding.'],
    statement: 'Somos uma Factory.',
    body: 'Um sistema feito para investigar sinais, reunir pessoas, desenvolver propriedades e transformar cultura em coisas que existem no mundo.',
  },

  why: {
    sectionLabel: 'Por que existimos',
    mission: 'Tornar a cultura brasileira inegável.',
    p1: 'O Brasil não é o nosso tema. É o nosso código-fonte.',
    p2: 'Não traduzimos o Brasil para o mundo. Construímos a partir do Brasil, para qualquer lugar.',
  },

  how: {
    sectionLabel: 'Como a Factory funciona',
    h2: 'Observe. Curate. Build. Distribute. Compound.',
    items: [
      { title: 'Observe', desc: 'Pesquisa de campo, cultura, tendências, comportamento.' },
      { title: 'Curate', desc: 'Editorial, referências, pessoas, sinais.' },
      { title: 'Build', desc: 'Labels, marcas, produtos, comunidades, sistemas.' },
      { title: 'Distribute', desc: 'Publishing, mídia, eventos, internet, parcerias.' },
      { title: 'Compound', desc: 'Audiência, IP, receita, reputação, rede.' },
    ],
  },

  build: {
    sectionLabel: 'O que construímos',
    items: ['Marcas.', 'Mundos.', 'Produtos.', 'Comunidades.', 'Negócios.', 'Propriedade intelectual.'],
  },

  labels: {
    sectionLabel: 'As Labels',
    h2: 'Quatro propriedades ativas.',
    items: [
      { title: '.THE BRAZILIAN FACTORY.', desc: 'Label editorial e espinha dorsal cultural da Factory. Histórias, ensaios, fotografia.', href: '/zine' },
      { title: '.THE FIORE DAILY.', desc: 'Bem-estar, intimidade, ritual e expressão feminina. Presença como prática.', href: '/labels/thefioredaily' },
      { title: '.RUNWAY UNTD COLLECTIVE.', desc: 'Fashion film, editorial, SPFW, direção criativa. Moda como memória cultural.', href: '/labels/runwayunited' },
      { title: '.THE GROWTH FACTORY.', desc: 'Estratégia de growth, desenvolvimento de negócios e inovação escalável.', href: '/labels/factoryofgrowth' },
    ],
  },

  system: {
    sectionLabel: 'O sistema',
    h2: 'Uma Factory, sete portas.',
    items: [
      { title: 'Labels', desc: 'Propriedades culturais, cada uma com tese própria.', href: '/labels' },
      { title: 'Collective', desc: 'As pessoas que constroem com a gente.', href: '/collective' },
      { title: 'Publishing', desc: 'Memória, narrativa e distribuição.', href: '/publishing' },
      { title: 'Consulting', desc: 'Marca, negócio e estrutura como uma única decisão.', href: '/consulting' },
      { title: 'Brand Tech', desc: 'Sistemas AI-native para marcas e negócios.', href: '/brand-tech' },
      { title: 'Access', desc: 'A porta de entrada.', href: '/access' },
      { title: 'Press Room', desc: 'O registro que o mundo pode verificar.', href: '/press' },
    ],
  },

  principles: {
    sectionLabel: 'Nossos princípios',
    h2: 'Códigos de operação, não slogans.',
    items: [
      { title: 'Cultura é matéria-prima', desc: 'Extraímos da cultura sinal, tensão, linguagem e oportunidade.' },
      { title: 'Brasil é código-fonte', desc: 'Origem e sistema operacional, nunca decoração.' },
      { title: 'Ideias precisam virar coisas', desc: 'Conceito sem forma é só intenção.' },
      { title: 'Contribuição acima de audiência', desc: 'Preferimos quem movimenta a cultura a quem só acumula seguidores.' },
      { title: 'Craft é estratégia', desc: 'Forma, linguagem e execução fazem parte da decisão de negócio.' },
      { title: 'Construir para durar', desc: 'Construímos propriedades que acumulam valor, não relevância instantânea.' },
    ],
  },

  founder: {
    sectionLabel: 'As pessoas',
    foundedBy: 'Fundada por',
    name: 'TAVARÍSTICO',
    p1: 'Diretor criativo e empreendedor, constrói marcas, produtos e negócios onde criatividade encontra tecnologia.',
    p2: 'Da publicidade e da moda a empreendimentos culturais, seu trabalho está entre direção criativa, estratégia de marca, tecnologia e novos negócios.',
    cta: 'Press Room',
    ctaHref: '/press',
  },

  photos: [
    'Silhueta de um cavaleiro montado contra o céu azul.',
    'Pessoa com máscara laranja e jaqueta roxa e azul à noite.',
    'Parede de galeria com pinturas e uma escultura em um salão de exposição com luz azul.',
    'Motorista de máscara de palhaço fazendo joinha dentro de um carro rosa.',
  ],

  closing: 'Nascida em São Paulo. Construída para qualquer lugar.',
}

export const about: Record<Lang, typeof en> = { en, pt }
