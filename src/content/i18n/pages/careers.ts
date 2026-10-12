// =============================================================================
// Dicionário de CAREERS. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

type Item = { title: string; desc: string }
type Role = { title: string; tag: string; mission: string; standard: string }

const en = {
  meta: {
    title: 'Careers',
    description:
      '.THE BRAZILIAN FACTORY. is building a creative company born in Brazil and designed to operate globally. Meet the Dream Team and the open roles.',
  },

  hero: {
    tag: 'Careers',
    title: 'We are building the Factory.',
    // <strong>.THE BRAZILIAN FACTORY.</strong> + deckSuffix
    deckSuffix: 'is building a capable team, not a big one.',
    openRoles: 'open roles',
    where: 'São Paulo / remote',
    cta: 'See open roles',
    howLabel: 'How we work',
    detailsLabel: 'Details',
    lines: ['Small inside.', 'Big outside.'],
  },

  building: {
    sectionLabel: 'What we are building',
    p1: 'A Factory where culture becomes brands, worlds, businesses, products and intellectual property.',
    p2: 'The work moves across culture, editorial, fashion, intimacy, growth, technology and creative business.',
  },

  how: {
    sectionLabel: 'How we work',
    lines: ['High ownership.', 'Low bureaucracy.', 'Strong opinions.', 'Deep craft.', 'Real accountability.'],
    facts: [
      { label: 'Location', value: 'São Paulo, Brazil\nRemote-friendly' },
      { label: 'Language', value: 'Portuguese\nEnglish' },
      { label: 'Stage', value: 'MVP\nEarly team' },
    ] as { label: string; value: string }[],
  },

  principles: {
    sectionLabel: 'The principles',
    h2: 'What it looks like in the work.',
    items: [
      { title: 'Culture First', desc: 'Every decision starts with a cultural question. The work needs context, not only aesthetics.' },
      { title: 'Creative Integrity', desc: 'You defend a vision, even when it creates friction.' },
      { title: 'Ownership', desc: 'Problems do not go back to the founder. Whoever takes a front owns the result.' },
      { title: 'Craft', desc: 'Repertoire without execution is decoration. We expect real mastery of the trade.' },
      { title: 'Commercial Intelligence', desc: 'Think about business without killing the idea. Culture has to be able to become value.' },
      { title: 'Long-term Thinking', desc: 'We do not build for the trend. We build assets that accumulate value.' },
    ] as Item[],
  },

  core: {
    sectionLabel: 'The core',
    h2: 'Four people hold the structure.',
    founder: {
      title: 'Founder / Creative Chair',
      tag: 'TAVARÍSTICO',
      desc: 'Protect the thesis. Define direction. Build the future.',
    },
  },

  network: {
    sectionLabel: 'The network',
    h2: 'Small at the core. Large through the network.',
    lines: ['Growth.', 'Finance.', 'Creative Technology / AI.', 'Editorial.', 'Community.', 'Partnerships.'],
    people: 'Artists. Writers. Photographers. Developers. Producers. Stylists.',
  },

  fit: {
    sectionLabel: 'Who fits here',
    yes: {
      title: 'You may fit here if',
      points: [
        'You have a point of view and you can defend it.',
        'You have repertoire and you deliver.',
        'You work well without a manual.',
        'You disagree without turning it into ego.',
        'You think about business without killing the idea.',
        'You need autonomy more than supervision.',
        'You want to build something that does not exist yet.',
      ],
    },
    no: {
      title: 'You probably do not fit if',
      points: [
        'You need a brief for every decision.',
        'You care more about title than ownership.',
        'Your references are stronger than your work.',
        'You prefer certainty to experimentation.',
        'You want a ready-made structure to occupy.',
      ],
    },
  },

  roles: {
    sectionLabel: 'Open roles',
    h2: 'We hire for capability, not headcount.',
    missionLabel: 'The mission',
    standardLabel: 'The standard',
    core: {
      title: 'Core now',
      intro: 'The first three hires. Operation, thinking and craft.',
      apply: 'Apply for this role',
      items: [
        {
          title: 'COO / Chief of Staff',
          tag: 'Idea, plan, execution',
          mission: 'Turn ideas into projects, processes, schedules, budgets, suppliers, contracts, follow-up, KPIs and internal organization.',
          standard: 'Obsessively organized, pragmatic and comfortable demanding execution. The operational antidote to the founder.',
        },
        {
          title: 'Creative Strategist',
          tag: 'Culture × Brand × Business × Consumer',
          mission: 'Positioning, research, trends, brand systems, business model, go-to-market, client strategy and label strategy.',
          standard: 'Thinks beyond branding. Connects culture to results and turns abstraction into decision.',
        },
        {
          title: 'Creative Producer / Designer',
          tag: 'Brief to work',
          mission: 'Art direction, design, content, production, shoots, campaigns, fashion films, experiences and visual extensions.',
          standard: 'Has a visual repertoire of their own and real capacity to produce. We are not looking for a template operator.',
        },
      ] as Role[],
    },
    fractional: {
      title: 'Fractional / Partners',
      intro: 'Not every skill needs to become headcount. These roles come in as revenue, demand and complexity prove the need.',
      apply: 'Talk to us',
      items: [
        {
          title: 'Growth & Business Development',
          tag: 'How does this become money?',
          mission: 'Acquisition, CRM, partnerships, B2B sales, distribution, monetization and growth experiments.',
          standard: 'Commercial, analytical and entrepreneurial. Opens markets, not only manages media.',
        },
        {
          title: 'Finance / CFO',
          tag: 'Where should the money be?',
          mission: 'Revenue, margin, cash, runway, capital allocation, contracts, pricing, investments and financial structure.',
          standard: 'Strategic finance profile. Can start fractional, but understands creative companies and growth.',
        },
        {
          title: 'Creative Technology / AI',
          tag: 'How do we build technological advantage?',
          mission: 'AI, automation, agents, internal tools, prototyping, data and digital products.',
          standard: 'A builder. Using AI tools is not enough: you build systems that increase the capacity of the company.',
        },
      ] as Role[],
    },
    future: {
      title: 'Future hires',
      intro: 'Not open today. Listed so you know where the Factory is going.',
      items: [
        { title: 'Editorial Director', desc: 'Turn thinking into media: magazine, interviews, essays, cultural research, curation and intellectual voice.' },
        { title: 'Community & Partnerships Director', desc: 'Build the network of artists, founders, designers, photographers, writers, models, developers, producers and brands.' },
        { title: 'Executive Creative Director', desc: 'Take on a larger creative layer as the portfolio and production grow, creating friction and language beyond the founder.' },
      ] as Item[],
    },
  },

  apply: {
    sectionLabel: 'How to apply',
    h2: 'Do not just send us your CV.',
    p1: 'Show us what you have built. Tell us what you would build here. Tell us why it matters.',
    email: 'contact@thebrfactory.com',
    cta: 'Send your work',
  },

  closing: 'Come build it with us.',
}

const pt: typeof en = {
  meta: {
    title: 'Careers',
    description:
      'A .THE BRAZILIAN FACTORY. está construindo uma empresa criativa nascida no Brasil e desenhada para operar globalmente. Conheça o Dream Team e as vagas.',
  },

  hero: {
    tag: 'Careers',
    title: 'Estamos construindo a Factory.',
    deckSuffix: 'está montando um time capaz, não um time grande.',
    openRoles: 'vagas abertas',
    where: 'São Paulo / remoto',
    cta: 'Ver vagas abertas',
    howLabel: 'Como trabalhamos',
    detailsLabel: 'Detalhes',
    lines: ['Pequena por dentro.', 'Grande por fora.'],
  },

  building: {
    sectionLabel: 'O que estamos construindo',
    p1: 'Uma Factory onde cultura vira marcas, mundos, negócios, produtos e propriedade intelectual.',
    p2: 'O trabalho circula entre cultura, editorial, moda, intimidade, growth, tecnologia e negócios criativos.',
  },

  how: {
    sectionLabel: 'Como trabalhamos',
    lines: ['Muita autonomia.', 'Pouca burocracia.', 'Opiniões fortes.', 'Craft profundo.', 'Responsabilidade real.'],
    facts: [
      { label: 'Localização', value: 'São Paulo, Brasil\nRemote-friendly' },
      { label: 'Idioma', value: 'Português\nInglês' },
      { label: 'Estágio', value: 'MVP\nTime inicial' },
    ],
  },

  principles: {
    sectionLabel: 'Os princípios',
    h2: 'Como aparecem no trabalho.',
    items: [
      { title: 'Culture First', desc: 'Toda decisão começa com uma pergunta cultural. O trabalho precisa de contexto, não só de estética.' },
      { title: 'Creative Integrity', desc: 'Você defende uma visão, mesmo quando isso gera fricção.' },
      { title: 'Ownership', desc: 'Problemas não voltam para o fundador. Quem assume uma frente é dono do resultado.' },
      { title: 'Craft', desc: 'Repertório sem execução é decoração. Esperamos domínio real do ofício.' },
      { title: 'Commercial Intelligence', desc: 'Pensar em negócio sem matar a ideia. Cultura precisa conseguir virar valor.' },
      { title: 'Long-term Thinking', desc: 'Não construímos para a tendência. Construímos ativos que acumulam valor.' },
    ],
  },

  core: {
    sectionLabel: 'O core',
    h2: 'Quatro pessoas sustentam a estrutura.',
    founder: {
      title: 'Founder / Creative Chair',
      tag: 'TAVARÍSTICO',
      desc: 'Proteger a tese. Definir a direção. Construir o futuro.',
    },
  },

  network: {
    sectionLabel: 'A rede',
    h2: 'Pequenos no core. Grandes pela rede.',
    lines: ['Growth.', 'Finance.', 'Creative Technology / AI.', 'Editorial.', 'Community.', 'Partnerships.'],
    people: 'Artistas. Escritores. Fotógrafos. Desenvolvedores. Produtores. Stylists.',
  },

  fit: {
    sectionLabel: 'Quem se encaixa',
    yes: {
      title: 'Você pode se encaixar se',
      points: [
        'Tem ponto de vista e consegue defendê-lo.',
        'Tem repertório e entrega.',
        'Trabalha bem sem manual.',
        'Discorda sem transformar isso em ego.',
        'Pensa em negócio sem matar a ideia.',
        'Precisa mais de autonomia do que de supervisão.',
        'Quer construir algo que ainda não existe.',
      ],
    },
    no: {
      title: 'Provavelmente não se encaixa se',
      points: [
        'Precisa de briefing para cada decisão.',
        'Liga mais para cargo do que para ownership.',
        'Tem referências mais fortes do que o próprio trabalho.',
        'Prefere certeza a experimentação.',
        'Quer uma estrutura pronta para ocupar.',
      ],
    },
  },

  roles: {
    sectionLabel: 'Vagas',
    h2: 'Contratamos por capacidade, não por headcount.',
    missionLabel: 'A missão',
    standardLabel: 'O padrão',
    core: {
      title: 'Core now',
      intro: 'As três primeiras contratações. Operação, pensamento e craft.',
      apply: 'Candidatar-se a esta vaga',
      items: [
        {
          title: 'COO / Chief of Staff',
          tag: 'Ideia, plano, execução',
          mission: 'Transformar ideias em projetos, processos, cronogramas, orçamento, fornecedores, contratos, acompanhamento, KPIs e organização interna.',
          standard: 'Obsessivamente organizado, pragmático e confortável em cobrar execução. O antídoto operacional do fundador.',
        },
        {
          title: 'Creative Strategist',
          tag: 'Cultura × Marca × Negócio × Consumidor',
          mission: 'Posicionamento, pesquisa, tendências, brand systems, modelo de negócio, go-to-market, estratégia de clientes e das labels.',
          standard: 'Pensa além do branding. Conecta cultura a resultado e transforma abstração em decisão.',
        },
        {
          title: 'Creative Producer / Designer',
          tag: 'Brief em obra',
          mission: 'Direção de arte, design, conteúdo, produção, shoots, campanhas, fashion films, experiências e desdobramentos visuais.',
          standard: 'Tem repertório visual próprio e capacidade real de produzir. Não buscamos um operador de template.',
        },
      ],
    },
    fractional: {
      title: 'Fractional / Partners',
      intro: 'Nem toda competência precisa virar headcount. Estas funções entram conforme receita, demanda e complexidade provarem a necessidade.',
      apply: 'Fale com a gente',
      items: [
        {
          title: 'Growth & Business Development',
          tag: 'Como isso vira dinheiro?',
          mission: 'Aquisição, CRM, parcerias, vendas B2B, distribuição, monetização e experimentos de growth.',
          standard: 'Perfil comercial, analítico e empreendedor. Abre mercado, não só administra mídia.',
        },
        {
          title: 'Finance / CFO',
          tag: 'Onde o dinheiro deve estar?',
          mission: 'Receita, margem, caixa, runway, alocação de capital, contratos, pricing, investimentos e estrutura financeira.',
          standard: 'Perfil financeiro estratégico. Pode começar fractional, mas entende empresas criativas e crescimento.',
        },
        {
          title: 'Creative Technology / AI',
          tag: 'Como construímos vantagem tecnológica?',
          mission: 'IA, automação, agentes, ferramentas internas, prototipagem, dados e produtos digitais.',
          standard: 'Builder. Não basta usar ferramentas de IA: você constrói sistemas que aumentam a capacidade da empresa.',
        },
      ],
    },
    future: {
      title: 'Future hires',
      intro: 'Não estão abertas hoje. Estão aqui para você saber para onde a Factory vai.',
      items: [
        { title: 'Editorial Director', desc: 'Transformar pensamento em mídia: magazine, entrevistas, ensaios, pesquisa cultural, curadoria e voz intelectual.' },
        { title: 'Community & Partnerships Director', desc: 'Construir a rede de artistas, founders, designers, fotógrafos, escritores, modelos, desenvolvedores, produtores e marcas.' },
        { title: 'Executive Creative Director', desc: 'Assumir uma camada criativa maior conforme o portfólio e a produção crescerem, criando fricção e linguagem além do fundador.' },
      ],
    },
  },

  apply: {
    sectionLabel: 'Como se candidatar',
    h2: 'Não mande só o currículo.',
    p1: 'Mostre o que você construiu. Conte o que construiria aqui. Diga por que isso importa.',
    email: 'contact@thebrfactory.com',
    cta: 'Enviar seu trabalho',
  },

  closing: 'Venha construir com a gente.',
}

export const careers: Record<Lang, typeof en> = { en, pt }
