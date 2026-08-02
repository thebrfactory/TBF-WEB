// =============================================================================
// Dicionário do /consulting. Convenções: ../README.md
//
// O texto original (antes desta leva) já vinha majoritariamente em português,
// com poucos rótulos em inglês espalhados — reflexo de o site ter nascido
// falando com o público brasileiro antes de existir /pt como rota própria.
// Esse texto virou a base do dicionário PT (revisado e completado); o
// dicionário EN é tradução integral, não literal, mantendo o tom institucional
// da consultoria.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Consulting | Branding & Business Development | .THE BRAZILIAN FACTORY.',
    description:
      'Branding and business development consulting by .THE BRAZILIAN FACTORY. Creative and strategic infrastructure for brands and businesses under construction. By project, no agency, no package.',
    ogTitle: '.TBF. CONSULTING | Branding & Business Development',
    ogDescription: 'Creative and strategic infrastructure for the project you are building.',
  },

  domains: [
    'Brand Strategy',
    'Positioning',
    'Naming & Verbal Identity',
    'Visual Identity',
    'Brand Governance',
    'Business Development',
    'Go-to-Market',
    'Offer Design',
    'Revenue Systems',
    'Creative Direction',
  ],

  method: [
    {
      n: '01',
      title: 'Diagnosis',
      body: 'A long briefing session, before any proposal. This is where we understand what you are really building, not what the market would say you should build.',
    },
    {
      n: '02',
      title: 'Direction',
      body: 'Positioning, brand territory and the commercial thesis that sustains both. This is where we decide what the brand is, for whom, and why someone would pay for it.',
    },
    {
      n: '03',
      title: 'Execution',
      body: 'Identity, narrative, content and revenue-entry systems, executed together. The whole house ecosystem comes in here, including the editorial structure of .RUC.',
    },
    {
      n: '04',
      title: 'Delivery',
      body: 'A delivery report and the governance written down: the rules that keep the brand standing after we leave. A brand that depends on human memory does not survive its first hire.',
    },
  ] as { n: string; title: string; body: string }[],

  hero: {
    title: '.CONSULTING.',
    lockupLine1: 'Branding & Business Development',
    lockupLine2: 'Practice',
    lockupOf: 'of',
    tagline: ['Your problem isn’t talent.', 'It’s lack of structure.'] as [string, string],
  },

  intro: {
    line1: 'Creative and strategic infrastructure for the project you are building. No agency, no fixed package, no long-term commitment.',
    line2Prefix: 'A practice of',
    startConversation: 'Start a conversation',
  },

  overview: {
    subtitle: 'Overview',
    headingPrefix: 'What is',
    headingSuffix: '?',
    p1: 'It is .TBF.’s consulting layer: brand and business treated as one thing. Positioning that answers how the company makes money, and a business model that answers how the brand is perceived.',
    p2Prefix: 'We are not an agency, a freelancer, or a slide-deck consultancy. We work by project, with closed scope and a stated deadline, inside the same ecosystem that produces',
    p2Middle: ', ',
    p2And: 'and',
    p3: 'The client does not buy hours. They buy a partner who understood what is being built before making a proposal.',
  },

  why: {
    subtitle: 'Why it exists',
    heading: 'It isn’t a lack of ideas.',
    lines: [
      'A good brand without structure becomes personal taste.',
      'A good business without a brand becomes a commodity.',
      'The two apart become rework.',
    ],
    body: 'Most companies that come to the house already have repertoire, product and drive. What’s missing is the structure that turns that into something repeatable: a written thesis, a governed brand and a revenue path that doesn’t depend on referrals.',
    philosophySubtitle: 'Philosophy',
    philosophyQuote: ['Branding isn’t the layer on top.', 'It’s the most expensive business decision there is.'] as [string, string],
    philosophyBody: 'Every brand choice is a choice of margin, of audience and of competitor. That’s why the two conversations happen in the same room, with the same people, in the same project.',
  },

  method_section: {
    subtitle: 'How it works',
    heading: 'Four movements',
  },

  domainsSection: {
    subtitle: 'Areas of practice',
    heading: 'Core Domains',
  },

  commitment: {
    subtitle: 'What we commit to',
    heading: 'Level, or it gets reworked.',
    p1: 'Every project has written scope and a stated deadline. If the delivery doesn’t reach the level of the approved concept, it goes back to the table at no extra cost, until it does. That’s the guarantee, and it’s in the contract.',
    p2: 'We take on few projects per quarter, on purpose: the house delivers with its own team and doesn’t outsource direction. No retainer on the first engagement, because the first delivery is what builds the relationship, not the contract.',
  },

  closing: {
    lines: ['Brand creates relevance.', 'Business creates scale.', 'Structure keeps both standing.'],
    creditLine1: 'Crafted in São Paulo, Brazil. Consumed Worldwide.',
    creditLine2Prefix: 'Part of',
    startConversation: 'Start a conversation',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Consulting | Branding & Business Development | .THE BRAZILIAN FACTORY.',
    description:
      'Consultoria de branding e business development da .THE BRAZILIAN FACTORY. Infraestrutura criativa e estratégica para marcas e empresas em construção. Por projeto, sem agência e sem pacote.',
    ogTitle: '.TBF. CONSULTING | Branding & Business Development',
    ogDescription: 'Infraestrutura criativa e estratégica para o projeto que você está construindo.',
  },

  // "Go-to-Market" ficou em inglês de propósito: é jargão consagrado no
  // mercado brasileiro de marca/growth, traduzir soaria mais estranho que
  // manter (mesmo raciocínio de manter "Naming").
  domains: [
    'Estratégia de Marca',
    'Posicionamento',
    'Naming e Identidade Verbal',
    'Identidade Visual',
    'Governança de Marca',
    'Business Development',
    'Go-to-Market',
    'Desenho de Oferta',
    'Sistemas de Receita',
    'Direção Criativa',
  ],

  method: [
    {
      n: '01',
      title: 'Diagnóstico',
      body: 'Uma sessão longa de briefing, antes de qualquer proposta. É onde entendemos o que você está construindo de verdade, e não o que o mercado diria que você deveria construir.',
    },
    {
      n: '02',
      title: 'Direção',
      body: 'Posicionamento, território de marca e a tese comercial que sustenta os dois. Sai daqui a decisão do que a marca é, para quem, e por que alguém pagaria por isso.',
    },
    {
      n: '03',
      title: 'Execução',
      body: 'Identidade, narrativa, conteúdo e os sistemas de entrada de receita, executados de forma integrada. O ecossistema inteiro da casa entra aqui, incluindo a estrutura editorial do .RUC.',
    },
    {
      n: '04',
      title: 'Entrega',
      body: 'Relatório de entrega e a governança escrita: as regras que fazem a marca continuar de pé depois que a gente sai. Marca que depende de memória humana não sobrevive à primeira contratação.',
    },
  ],

  hero: {
    title: '.CONSULTING.',
    lockupLine1: 'Branding & Business Development',
    lockupLine2: 'Prática',
    lockupOf: 'da',
    tagline: ['Seu problema não é talento.', 'É falta de estrutura.'],
  },

  intro: {
    line1: 'Infraestrutura criativa e estratégica para o projeto que você está construindo. Sem agência, sem pacote fechado, sem compromisso de longo prazo.',
    line2Prefix: 'Uma prática de',
    startConversation: 'Comece uma conversa',
  },

  overview: {
    subtitle: 'Visão geral',
    headingPrefix: 'O que é',
    headingSuffix: '?',
    p1: 'É a camada de consultoria da .TBF.: marca e negócio tratados como uma coisa só. Posicionamento que resolve como a empresa ganha dinheiro, e modelo de negócio que resolve como a marca é percebida.',
    p2Prefix: 'Não somos uma agência, nem um freelancer, nem uma consultoria de slides. Trabalhamos por projeto, com escopo fechado e prazo declarado, dentro do mesmo ecossistema que produz',
    p2Middle: ', ',
    p2And: 'e',
    p3: 'O cliente não compra horas. Compra um parceiro que entendeu o que está sendo construído antes de fazer proposta.',
  },

  why: {
    subtitle: 'Por que existe',
    heading: 'Não é falta de ideia.',
    lines: [
      'Marca boa sem estrutura vira gosto pessoal.',
      'Negócio bom sem marca vira commodity.',
      'Os dois separados viram retrabalho.',
    ],
    body: 'A maior parte das empresas que procura a casa já tem repertório, produto e vontade. O que falta é a estrutura que transforma isso em algo repetível: uma tese escrita, uma marca governada e um caminho de receita que não depende de indicação.',
    philosophySubtitle: 'Filosofia',
    philosophyQuote: ['Branding não é a camada de cima.', 'É a decisão de negócio mais cara que existe.'],
    philosophyBody: 'Toda escolha de marca é uma escolha de margem, de público e de concorrente. Por isso as duas conversas acontecem na mesma sala, com as mesmas pessoas, no mesmo projeto.',
  },

  method_section: {
    subtitle: 'Como funciona',
    heading: 'Quatro movimentos',
  },

  domainsSection: {
    subtitle: 'Áreas de atuação',
    heading: 'Domínios centrais',
  },

  commitment: {
    subtitle: 'Com o que nos comprometemos',
    heading: 'Nível ou retrabalho',
    p1: 'Todo projeto tem escopo escrito e prazo declarado. Se a entrega não chegar ao nível do conceito aprovado, ela volta para a mesa sem custo adicional, até chegar. Essa é a garantia, e ela está no contrato.',
    p2: 'Aceitamos poucos projetos por trimestre, de propósito: a casa entrega com a própria equipe e não terceiriza direção. Sem retainer no primeiro engajamento, porque a primeira entrega é que constrói a relação, não o contrato.',
  },

  closing: {
    lines: ['Marca cria relevância.', 'Negócio cria escala.', 'Estrutura mantém as duas de pé.'],
    creditLine1: 'Feita em São Paulo, Brasil. Consumida no mundo inteiro.',
    creditLine2Prefix: 'Parte da',
    startConversation: 'Comece uma conversa',
  },
}

export const consulting: Record<Lang, typeof en> = { en, pt }
