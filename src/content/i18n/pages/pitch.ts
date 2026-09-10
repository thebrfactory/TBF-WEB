// =============================================================================
// Dicionário do deck 1.0 (agora em /pitch/v1, investidores/parceiros) e da
// página índice em /pitch. Convenções: ../README.md
//
// NÃO é o dicionário do /pitch/v2 ou /pitch/v3: aqueles decks são
// deliberadamente bilíngues (PT + EN na mesma tela) e não passam por este
// sistema de i18n.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Pitch',
    description:
      '.THE BRAZILIAN FACTORY. The Brazilian Cultural Infrastructure. Pitch deck for investors and partners.',
  },

  // Aria-label do wordmark em SVG (capa e fechamento). Nome de marca: idêntico
  // nos dois idiomas, mas passa pelo dicionário mesmo assim (regra da casa).
  brand: {
    wordmarkAriaLabel: '.THE BRAZILIAN FACTORY.',
  },

  cover: {
    ariaLabel: 'Cover',
    confidential: 'Confidential · São Paulo, 2025 · .TBF. inc',
    tagline: 'The Brazilian Cultural Infrastructure.',
    subtitle: 'Culture™ Crafted in São Paulo. Consumed Worldwide.',
  },

  featuredIn: {
    sectionAriaLabel: 'Featured in',
    frameAriaLabel: 'Featured in',
  },

  problem: {
    ariaLabel: 'The problem',
    eyebrow: '01 / The Problem',
    heading: 'Brazilian culture has no digital infrastructure.',
    body: 'Brazil is the 6th largest country by population, top 10 economy worldwide, and one of the most creative nations on earth. But Brazilian culture exports through algorithms, not institutions.',
    tags: ['No editorial standard', 'No cultural OS', 'No prestige system'] as [string, string, string],
  },

  solution: {
    ariaLabel: 'The solution',
    eyebrow: '02 / The Solution',
    heading: '.THE BRAZILIAN FACTORY.',
    subheading: 'A cultural operating system built in São Paulo.',
    body: "TBF is not a magazine. Not an agency. Not an app. It's a cultural infrastructure: an editorial system, a prestige engine, a growth machine, all operating under one identity, one aesthetic, one frequency.",
    labelsEyebrow: 'Labels / Divisions',
    labelsHeading: '“One organism. Four labels.”',
    labels: [
      { tag: '.TBF.', name: 'The Brazilian Factory', desc: 'Collective Hotel Casino', href: '/mag' },
      { tag: '.TFD.', name: 'The Fiore Daily', desc: 'Intimacy-Wellness Community', href: '/labels/thefioredaily' },
      { tag: '.RUC.', name: 'Runway Untd Collective', desc: 'Fashion Film Magazine', href: '/labels/runwayunited' },
      { tag: '.TGF.', name: 'The Growth Factory', desc: 'Worldwide Brazilian Support', href: '/labels/factoryofgrowth' },
    ] as { tag: string; name: string; desc: string; href: string }[],
    exploreCta: 'Explore the Labels',
  },

  traction: {
    ariaLabel: 'Traction',
    eyebrow: '03 / Traction',
    heading: 'Built from scratch. Growing from day one.',
    stats: [
      { value: '4', label: 'Active Labels' },
      { value: '2025', label: 'Year Founded' },
      { value: 'SP', label: 'Base · São Paulo' },
      { value: '∞', label: 'Creative Output' },
    ] as { value: string; label: string }[],
    progress: [
      { label: 'Brand Identity', pct: 100 },
      { label: 'Tech Infrastructure', pct: 100 },
      { label: 'Editorial Pipeline', pct: 75 },
      { label: 'Revenue (TGF)', pct: 60 },
    ] as { label: string; pct: number }[],
  },

  market: {
    ariaLabel: 'Market',
    eyebrow: '04 / Market',
    headingLine1: 'A $2T+ market',
    headingLine2: 'underrepresented.',
    items: [
      {
        stat: '215M+',
        label: 'Brazilians globally',
        sub: 'Brazil + diaspora. One of the most culturally influential populations on earth',
      },
      {
        stat: '$180B+',
        label: 'Brazilian creative economy',
        sub: 'Fashion, music, design, content. Growing 8% YoY',
      },
      {
        stat: '1st',
        label: 'Cultural OS for Brazil',
        sub: 'No direct competitor operating at this intersection',
      },
    ] as { stat: string; label: string; sub: string }[],
  },

  businessModel: {
    ariaLabel: 'Business model',
    eyebrow: '05 / Business Model',
    heading: 'Four revenue streams. One brand.',
    rows: [
      { label: '.TBF. Editorial', model: 'Branded content · Licensing · Subscriptions', stage: 'Building', highlight: false },
      { label: '.MELFIORE. · Wellness', model: 'Products · Retreats · Digital rituals', stage: 'Building', highlight: false },
      { label: '.RUC. · Fashion', model: 'Event production · Film commissions · SPFW', stage: 'Active', highlight: false },
      { label: '.TGF. · Growth', model: 'Consulting retainers · Courses · B2B', stage: 'Revenue', highlight: true },
    ] as { label: string; model: string; stage: string; highlight: boolean }[],
  },

  vision: {
    ariaLabel: 'Vision',
    eyebrow: '06 / Vision',
    quoteLine1: "“We don't copy Paris.",
    quoteLine2: 'We print over it.”',
    body: 'In 5 years, .THE BRAZILIAN FACTORY. is the reference point for Brazilian culture globally: a multi-label infrastructure with editorial authority, brand equity, and cultural IP.',
  },

  team: {
    ariaLabel: 'Team',
    eyebrow: '07 / Founder',
    headingLine1: 'Built by someone',
    headingLine2: 'who lives the culture.',
    initials: 'FT',
    name: 'Felipe Tavares',
    role: 'Founder · CEO · Creative Director',
    project: 'Tavarístico',
    bio: 'Creative director, entrepreneur, and cultural operator based in São Paulo. Founder of the .TBF. universe, building the infrastructure Brazilian culture always deserved.',
  },

  close: {
    ariaLabel: 'Contact',
    kicker: "Let's build together.",
    site: 'thebrfactory.com',
    email: 'tavaristico@thebrfactory.com',
    ctaManifesto: 'Manifesto',
    ctaLabels: 'Labels',
    ctaInstagram: '@thebrfactory',
    legal: '.TBF. inc · CNPJ 61.360.565/0001-74 · Rua Pamplona 145, Jardim Paulista, São Paulo, SP, 01405-900',
  },

  // Dicionário da página índice em `/pitch`. Ela só classifica os decks,
  // cada deck guarda o próprio dicionário.
  index: {
    title: 'Pitch',
    description: '.THE BRAZILIAN FACTORY. Index of pitch decks: general and partner specific.',
    sectionCompany: 'For partners',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Pitch',
    description:
      '.THE BRAZILIAN FACTORY. A Infraestrutura Cultural Brasileira. Deck de apresentação para investidores e parceiros.',
  },

  brand: {
    wordmarkAriaLabel: '.THE BRAZILIAN FACTORY.',
  },

  cover: {
    ariaLabel: 'Capa',
    confidential: 'Confidencial · São Paulo, 2025 · .TBF. inc',
    tagline: 'A Infraestrutura Cultural Brasileira.',
    subtitle: 'Culture™ feita em São Paulo. Consumida no mundo inteiro.',
  },

  featuredIn: {
    sectionAriaLabel: 'Presença na imprensa',
    frameAriaLabel: 'Presença na imprensa',
  },

  problem: {
    ariaLabel: 'O problema',
    eyebrow: '01 / O Problema',
    heading: 'A cultura brasileira não tem infraestrutura digital.',
    body: 'O Brasil é o 6º país mais populoso do mundo, está entre as dez maiores economias e é uma das nações mais criativas do planeta. Mas a cultura brasileira se exporta pelo algoritmo, não pelas instituições.',
    tags: ['Sem padrão editorial', 'Sem sistema operacional cultural', 'Sem sistema de prestígio'],
  },

  solution: {
    ariaLabel: 'A solução',
    eyebrow: '02 / A Solução',
    heading: '.THE BRAZILIAN FACTORY.',
    subheading: 'Um sistema operacional cultural construído em São Paulo.',
    body: 'A .TBF. não é uma revista. Não é uma agência. Não é um aplicativo. É uma infraestrutura cultural: um sistema editorial, um motor de prestígio, uma máquina de crescimento, todos operando sob uma identidade, uma estética, uma frequência.',
    labelsEyebrow: 'Labels / Divisões',
    labelsHeading: '“Um organismo. Quatro labels.”',
    labels: [
      // `Collective Hotel Casino` é o nome da entidade (ver /collective), não
      // descrição: não se traduz, nem aqui nem no site em português.
      { tag: '.TBF.', name: 'The Brazilian Factory', desc: 'Collective Hotel Casino', href: '/mag' },
      { tag: '.TFD.', name: 'The Fiore Daily', desc: 'Comunidade de Intimidade e Bem-estar', href: '/labels/thefioredaily' },
      { tag: '.RUC.', name: 'Runway Untd Collective', desc: 'Revista de Fashion Film', href: '/labels/runwayunited' },
      { tag: '.TGF.', name: 'The Growth Factory', desc: 'Suporte Brasileiro no Mundo', href: '/labels/factoryofgrowth' },
    ],
    exploreCta: 'Conheça as labels',
  },

  traction: {
    ariaLabel: 'Tração',
    eyebrow: '03 / Tração',
    heading: 'Construído do zero. Crescendo desde o primeiro dia.',
    stats: [
      { value: '4', label: 'Labels ativas' },
      { value: '2025', label: 'Ano de fundação' },
      { value: 'SP', label: 'Base · São Paulo' },
      { value: '∞', label: 'Produção criativa' },
    ],
    progress: [
      { label: 'Identidade de marca', pct: 100 },
      { label: 'Infraestrutura de tecnologia', pct: 100 },
      { label: 'Pipeline editorial', pct: 75 },
      { label: 'Receita (TGF)', pct: 60 },
    ],
  },

  market: {
    ariaLabel: 'Mercado',
    eyebrow: '04 / Mercado',
    headingLine1: 'Um mercado de $2T+',
    headingLine2: 'sub-representado.',
    items: [
      {
        stat: '215M+',
        label: 'Brasileiros no mundo',
        sub: 'Brasil + diáspora. Uma das populações culturalmente mais influentes do planeta',
      },
      {
        stat: '$180B+',
        label: 'Economia criativa brasileira',
        sub: 'Moda, música, design, conteúdo. Crescendo 8% ao ano',
      },
      {
        stat: '1º',
        label: 'Sistema operacional cultural do Brasil',
        sub: 'Nenhum concorrente direto operando nessa interseção',
      },
    ],
  },

  businessModel: {
    ariaLabel: 'Modelo de negócio',
    eyebrow: '05 / Modelo de Negócio',
    heading: 'Quatro fontes de receita. Uma marca.',
    rows: [
      { label: '.TBF. Editorial', model: 'Conteúdo de marca · Licenciamento · Assinaturas', stage: 'Em construção', highlight: false },
      { label: '.MELFIORE. · Wellness', model: 'Produtos · Retiros · Rituais digitais', stage: 'Em construção', highlight: false },
      { label: '.RUC. · Fashion', model: 'Produção de eventos · Comissões de filme · SPFW', stage: 'Ativo', highlight: false },
      { label: '.TGF. · Growth', model: 'Contratos de consultoria · Cursos · B2B', stage: 'Receita', highlight: true },
    ],
  },

  vision: {
    ariaLabel: 'Visão',
    eyebrow: '06 / Visão',
    quoteLine1: '“A gente não copia Paris.',
    quoteLine2: 'Imprime por cima.”',
    body: 'Em 5 anos, a .THE BRAZILIAN FACTORY. é o ponto de referência da cultura brasileira no mundo: uma infraestrutura multi-label com autoridade editorial, valor de marca e propriedade intelectual cultural.',
  },

  team: {
    ariaLabel: 'Equipe',
    eyebrow: '07 / Fundador',
    headingLine1: 'Construído por alguém',
    headingLine2: 'que vive a cultura.',
    initials: 'FT',
    name: 'Felipe Tavares',
    role: 'Fundador · CEO · Diretor Criativo',
    project: 'Tavarístico',
    bio: 'Diretor criativo, empreendedor e operador cultural baseado em São Paulo. Fundador do universo .TBF., construindo a infraestrutura que a cultura brasileira sempre mereceu.',
  },

  close: {
    ariaLabel: 'Contato',
    kicker: 'Vamos construir juntos.',
    site: 'thebrfactory.com',
    email: 'tavaristico@thebrfactory.com',
    ctaManifesto: 'Manifesto',
    ctaLabels: 'Labels',
    ctaInstagram: '@thebrfactory',
    legal: '.TBF. inc · CNPJ 61.360.565/0001-74 · Rua Pamplona 145, Jardim Paulista, São Paulo, SP, 01405-900',
  },

  index: {
    title: 'Pitch',
    description: '.THE BRAZILIAN FACTORY. Índice dos decks de pitch: gerais e endereçados a parceiros.',
    sectionCompany: 'Para parceiros',
  },
}

export const pitch: Record<Lang, typeof en> = { en, pt }
