// =============================================================================
// Dicionário de BRAND TECH. Convenções: ../README.md
// "TECH HOUSE" da .TBF. inc: sistemas de IA para marcas e negócios.
// =============================================================================

import type { Lang } from '@/lib/i18n'

type Item = { title: string; desc: string }

const en = {
  meta: {
    title: 'Brand Tech',
    description:
      '.TBF. Brand Tech builds AI-native systems for brands, businesses and cultural companies. We build the intelligence behind the brand.',
  },

  hero: {
    tag: 'Brand Tech',
    title: 'We build the intelligence behind the brand.',
    deck: 'AI-native systems for ambitious brands, businesses and cultural companies.',
    statement: 'AI is not our product. It is our operating system.',
  },

  problem: {
    sectionLabel: 'The problem',
    p1: 'Most companies have access to AI. Few have changed the way they operate because of it.',
    lines: ['Tools everywhere.', 'Knowledge everywhere.', 'Workflows everywhere.', 'Systems nowhere.'],
    statement: 'We build the system.',
  },

  what: {
    sectionLabel: 'What we do',
    h2: 'Six ways we add capability.',
    items: [
      { title: 'AI Strategy', desc: 'Find where intelligence can create real leverage.' },
      { title: 'AI Brand Systems', desc: 'Turn brand knowledge into an intelligent, usable system.' },
      { title: 'AI Agents', desc: 'Build specialized agents that do real work.' },
      { title: 'Automation', desc: 'Connect tools, data and workflows into operating systems.' },
      { title: 'AI Products', desc: 'Prototype and build new digital products and internal tools.' },
      { title: 'AI Creative', desc: 'Increase the capacity of creative teams without flattening the idea.' },
    ] as Item[],
  },

  program: {
    sectionLabel: 'The program',
    h2: '.TBF. AI Systems Program',
    intro: 'A closed program that turns an operation into an AI-native system.',
    items: [
      { title: 'Audit', desc: 'Where is the work? Where is the waste? Where is the knowledge?' },
      { title: 'Architect', desc: 'Which systems, agents, data and automations need to exist?' },
      { title: 'Build', desc: 'The first systems and workflows, built.' },
      { title: 'Integrate', desc: 'Connected to your tools and your real operation.' },
      { title: 'Govern', desc: 'Rules, documentation, security, ownership and evolution.' },
      { title: 'Compound', desc: 'Measurement, learning and expansion.' },
    ] as Item[],
    statement: 'You do not buy AI. You buy capability.',
  },

  think: {
    sectionLabel: 'How we think',
    h2: 'Problem. System. Technology. Output.',
    items: [
      { title: 'Problem', desc: 'What needs to change?' },
      { title: 'System', desc: 'Which process needs to exist?' },
      { title: 'Technology', desc: 'Where do AI, software or automation really increase capability?' },
      { title: 'Output', desc: 'Which result starts to exist?' },
    ] as Item[],
    never: 'Never the other way around.',
  },

  why: {
    sectionLabel: 'Why .TBF.',
    h2: 'Culture × Brand × Business × AI × Craft.',
    lines: ['We understand the thing before we automate the thing.', 'We do not sell tools. We build advantage.'],
  },

  factory: {
    sectionLabel: 'The Factory',
    h2: 'Brand Tech is one layer of .THE BRAZILIAN FACTORY.',
    p1: 'The Factory builds. Consulting structures. Brand Tech increases capability. Publishing gives ideas context. The Collective brings people. The Labels become worlds.',
    links: [
      { title: 'About', desc: 'The Factory and how it works.', href: '/about' },
      { title: 'Consulting', desc: 'Brand, business and structure as one decision.', href: '/consulting' },
    ] as { title: string; desc: string; href: string }[],
  },

  closing: {
    line: 'Built in São Paulo. AI-native by design. Built for everywhere.',
    cta: 'Start a conversation',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Brand Tech',
    description:
      'A .TBF. Brand Tech constrói sistemas AI-native para marcas, negócios e empresas culturais. Construímos a inteligência por trás da marca.',
  },

  hero: {
    tag: 'Brand Tech',
    title: 'Construímos a inteligência por trás da marca.',
    deck: 'Sistemas AI-native para marcas, negócios e empresas culturais ambiciosos.',
    statement: 'IA não é o nosso produto. É o nosso sistema operacional.',
  },

  problem: {
    sectionLabel: 'O problema',
    p1: 'A maioria das empresas tem acesso à IA. Poucas mudaram a forma de operar por causa dela.',
    lines: ['Ferramentas por toda parte.', 'Conhecimento por toda parte.', 'Workflows por toda parte.', 'Sistema em lugar nenhum.'],
    statement: 'Nós construímos o sistema.',
  },

  what: {
    sectionLabel: 'O que fazemos',
    h2: 'Seis formas de aumentar capacidade.',
    items: [
      { title: 'AI Strategy', desc: 'Encontrar onde a inteligência cria alavanca de verdade.' },
      { title: 'AI Brand Systems', desc: 'Transformar o conhecimento da marca em um sistema inteligente e usável.' },
      { title: 'AI Agents', desc: 'Construir agentes especializados que fazem trabalho real.' },
      { title: 'Automation', desc: 'Conectar ferramentas, dados e workflows em sistemas operacionais.' },
      { title: 'AI Products', desc: 'Prototipar e construir novos produtos digitais e ferramentas internas.' },
      { title: 'AI Creative', desc: 'Aumentar a capacidade dos times criativos sem achatar a ideia.' },
    ],
  },

  program: {
    sectionLabel: 'O programa',
    h2: '.TBF. AI Systems Program',
    intro: 'Um programa fechado que transforma uma operação em um sistema AI-native.',
    items: [
      { title: 'Audit', desc: 'Onde está o trabalho? Onde está o desperdício? Onde está o conhecimento?' },
      { title: 'Architect', desc: 'Quais sistemas, agentes, dados e automações precisam existir?' },
      { title: 'Build', desc: 'Os primeiros sistemas e workflows, construídos.' },
      { title: 'Integrate', desc: 'Conectados às suas ferramentas e à operação real.' },
      { title: 'Govern', desc: 'Regras, documentação, segurança, ownership e evolução.' },
      { title: 'Compound', desc: 'Medição, aprendizado e expansão.' },
    ],
    statement: 'Você não compra IA. Compra capacidade.',
  },

  think: {
    sectionLabel: 'Como pensamos',
    h2: 'Problem. System. Technology. Output.',
    items: [
      { title: 'Problem', desc: 'O que precisa mudar?' },
      { title: 'System', desc: 'Qual processo precisa existir?' },
      { title: 'Technology', desc: 'Onde IA, software ou automação realmente aumentam capacidade?' },
      { title: 'Output', desc: 'Qual resultado passa a existir?' },
    ],
    never: 'Nunca na ordem inversa.',
  },

  why: {
    sectionLabel: 'Por que a .TBF.',
    h2: 'Culture × Brand × Business × AI × Craft.',
    lines: ['Entendemos a coisa antes de automatizar a coisa.', 'Não vendemos ferramentas. Construímos vantagem.'],
  },

  factory: {
    sectionLabel: 'A Factory',
    h2: 'Brand Tech é uma camada da .THE BRAZILIAN FACTORY.',
    p1: 'A Factory constrói. A Consulting estrutura. A Brand Tech aumenta a capacidade. O Publishing dá contexto às ideias. O Collective traz as pessoas. As Labels viram mundos.',
    links: [
      { title: 'About', desc: 'A Factory e como ela funciona.', href: '/about' },
      { title: 'Consulting', desc: 'Marca, negócio e estrutura como uma única decisão.', href: '/consulting' },
    ],
  },

  closing: {
    line: 'Feita em São Paulo. AI-native por design. Construída para qualquer lugar.',
    cta: 'Iniciar uma conversa',
  },
}

export const brandTech: Record<Lang, typeof en> = { en, pt }
