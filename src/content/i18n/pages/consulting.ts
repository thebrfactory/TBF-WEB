// =============================================================================
// Dicionário do /consulting. Convenções: ../README.md
//
// Nova arquitetura (08/10/2026), a partir de TBF_Consulting_Nova_Arquitetura:
// hero, problema, tese, quatro problemas (Define, Build, Scale, Rewire),
// programa e método (Origin, Position, Signal, Offer, System), o que o cliente
// leva, a Factory como vantagem, compromisso, briefing mínimo e CTA.
//
// FICOU DE FORA, DE PROPÓSITO: prova (cases, números, clientes, depoimentos) e
// preço. O PDF pede os dois, mas os dados ainda não existem. Nada foi inventado.
//
// Nomes de página, produto e método ficam em inglês também na PT.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Consulting | Brand, Business, Structure',
    description:
      'Brand, business and creative direction for ambitious companies, in one defined engagement. The .TBF. Brand Strategy Program, by .THE BRAZILIAN FACTORY.',
    ogTitle: '.TBF. CONSULTING | Brand. Business. Structure.',
    ogDescription: 'Build the structure behind the idea.',
  },

  hero: {
    title: '.CONSULTING.',
    lockupLine1: 'Brand. Business. Structure.',
    lockupLine2: 'A practice',
    lockupOf: 'of',
    tagline: ['Build the structure', 'behind the idea.'] as [string, string],
  },

  intro: {
    line1: 'Brand, business and creative direction for ambitious companies.',
    line2: 'No agency retainer. No generic deck. One defined problem. One defined engagement.',
    cta: 'Build with us',
    ctaSecondary: 'See the program',
  },

  problem: {
    kicker: 'The problem',
    heading: 'Your business is moving. Your brand is not.',
    lead: 'Or the opposite: a beautiful brand with no business underneath.',
    p1: 'Ambitious companies rarely have an idea problem. They have a structure problem.',
    p2: 'The offer is unclear. The positioning is weak. The brand says one thing. The business does another. Growth depends on improvisation.',
    p3: 'We fix the system behind it.',
  },

  thesis: {
    kicker: 'The thesis',
    heading: 'Brand is not the layer on top.',
    deck: 'It is the system that connects what you are, what you sell and why people choose you.',
    body: 'Most companies that come to the house already have repertoire, product and drive. What is missing is the structure that makes it repeatable: a written thesis, a governed brand and a revenue path that does not depend on referrals.',
  },

  work: {
    kicker: 'What we solve',
    heading: 'Four problems, four moves.',
    items: [
      { key: 'define', kicker: '01', title: 'Define', body: 'Thesis, positioning, category, audience, offer and narrative.' },
      { key: 'build', kicker: '02', title: 'Build', body: 'Brand system, verbal and visual identity, offer design and go-to-market.' },
      { key: 'scale', kicker: '03', title: 'Scale', body: 'Business development, revenue systems, growth and governance.' },
      { key: 'rewire', kicker: '04', title: 'Rewire', body: 'Rebuilding what is broken when brand, offer and operation stop talking to each other.' },
    ] as { key: string; kicker: string; title: string; body: string }[],
  },

  program: {
    kicker: 'The program',
    heading: 'The .TBF. Brand Strategy Program',
    deck: 'Brand, business and creative direction in one engagement.',
    body: 'The method is Aesthetika. It connects business, brand, narrative, image and market in five decisions. Each one has steps, artifacts and a clear output.',
    methodKicker: 'The method',
    methodHeading: 'Origin. Position. Signal. Offer. System.',
    steps: [
      { key: 'origin', kicker: '01', title: 'Origin', sub: 'Where does the business come from?', body: 'Founder thesis, context, tension and cultural origin.' },
      { key: 'position', kicker: '02', title: 'Position', sub: 'What space should it own?', body: 'Category, audience, differentiation and positioning.' },
      { key: 'signal', kicker: '03', title: 'Signal', sub: 'How will it be recognized?', body: 'Narrative, verbal identity, visual territory and codes.' },
      { key: 'offer', kicker: '04', title: 'Offer', sub: 'What exactly is being bought?', body: 'Offer, pricing logic, go-to-market and revenue path.' },
      { key: 'system', kicker: '05', title: 'System', sub: 'How does it keep working?', body: 'Governance, brand rules, operation and priorities.' },
    ] as { key: string; kicker: string; title: string; sub: string; body: string }[],
  },

  deliverables: {
    kicker: 'What you take away',
    heading: 'You leave with a thesis, a brand, an offer, a route to market and the rules to keep it moving.',
    deck: 'The final output is an operating blueprint of the brand, not a deck.',
    items: [
      'Strategic thesis',
      'Positioning architecture',
      'Brand narrative',
      'Verbal identity',
      'Visual direction',
      'Offer architecture',
      'Go-to-market priorities',
      'Revenue logic',
      'Governance system',
      '90-day action map',
    ],
  },

  factory: {
    kicker: 'The advantage',
    heading: 'You don’t just get the consultant. You get the Factory.',
    body: 'Consulting is not an island. It reaches a creative, cultural and business infrastructure built to make ideas tangible.',
    items: [
      { key: 'tbf', kicker: '.TBF.', title: 'Culture and direction', body: 'Culture, editorial, research and direction.' },
      { key: 'ruc', kicker: '.RUC.', title: 'Image and production', body: 'Fashion, image, film, production and archive.' },
      { key: 'tgf', kicker: '.TGF.', title: 'Growth and technology', body: 'Growth, business development, technology and expansion.' },
      { key: 'collective', kicker: 'Collective', title: 'People and network', body: 'Artists, makers, thinkers and founders.' },
      { key: 'publishing', kicker: 'Publishing', title: 'Authority and memory', body: 'Distribution, documentation and cultural authority.' },
    ] as { key: string; kicker: string; title: string; body: string }[],
  },

  commitment: {
    kicker: 'What we commit to',
    heading: 'No retainer by default. No generic package. No strategy theatre.',
    p1: 'Every project has written scope and a stated deadline. If the delivery does not reach the level of the approved concept, it goes back to the table at no extra cost, until it does. It is in the contract.',
    p2: 'We take on few projects per quarter, on purpose. The house delivers with its own team and does not outsource direction.',
  },

  briefing: {
    kicker: 'Before we talk',
    heading: 'Come with answers to five questions.',
    questions: [
      'What are you building?',
      'What is not working?',
      'What needs to change?',
      'Where are you now?',
      'What would make this worth it?',
    ],
  },

  closing: {
    lines: ['One defined problem.', 'One defined engagement.', 'One stronger business.'],
    creditLine1: 'Crafted in São Paulo, Brazil. Consumed worldwide.',
    creditLine2Prefix: 'Part of',
    cta: 'Build with us',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Consulting | Brand, Business, Structure',
    description:
      'Direção de marca, negócio e criação para empresas ambiciosas, em um único engajamento. O .TBF. Brand Strategy Program, da .THE BRAZILIAN FACTORY.',
    ogTitle: '.TBF. CONSULTING | Brand. Business. Structure.',
    ogDescription: 'Construímos a estrutura por trás da ideia.',
  },

  hero: {
    title: '.CONSULTING.',
    lockupLine1: 'Brand. Business. Structure.',
    lockupLine2: 'Uma prática',
    lockupOf: 'da',
    tagline: ['Construímos a estrutura', 'por trás da ideia.'],
  },

  intro: {
    line1: 'Direção de marca, negócio e criação para empresas ambiciosas.',
    line2: 'Sem retainer de agência. Sem deck genérico. Um problema definido. Um engajamento definido.',
    cta: 'Construa com a gente',
    ctaSecondary: 'Ver o programa',
  },

  problem: {
    kicker: 'O problema',
    heading: 'Seu negócio anda. Sua marca não.',
    lead: 'Ou o contrário: uma marca linda sem negócio por baixo.',
    p1: 'Empresas ambiciosas raramente têm problema de ideia. Têm problema de estrutura.',
    p2: 'A oferta é confusa. O posicionamento é fraco. A marca diz uma coisa. O negócio faz outra. O crescimento depende de improviso.',
    p3: 'Nós consertamos o sistema por trás disso.',
  },

  thesis: {
    kicker: 'A tese',
    heading: 'Marca não é a camada de cima.',
    deck: 'É o sistema que liga o que você é, o que você vende e por que as pessoas escolhem você.',
    body: 'A maior parte das empresas que procura a casa já tem repertório, produto e vontade. O que falta é a estrutura que torna isso repetível: uma tese escrita, uma marca governada e um caminho de receita que não depende de indicação.',
  },

  work: {
    kicker: 'O que resolvemos',
    heading: 'Quatro problemas, quatro movimentos.',
    items: [
      { key: 'define', kicker: '01', title: 'Define', body: 'Tese, posicionamento, categoria, público, oferta e narrativa.' },
      { key: 'build', kicker: '02', title: 'Build', body: 'Brand system, identidade verbal e visual, desenho de oferta e go-to-market.' },
      { key: 'scale', kicker: '03', title: 'Scale', body: 'Business development, sistemas de receita, crescimento e governança.' },
      { key: 'rewire', kicker: '04', title: 'Rewire', body: 'Reconstrução quando marca, oferta e operação deixam de conversar.' },
    ],
  },

  program: {
    kicker: 'O programa',
    heading: 'O .TBF. Brand Strategy Program',
    deck: 'Direção de marca, negócio e criação em um único engajamento.',
    body: 'O método é a Aesthetika. Ela conecta negócio, marca, narrativa, imagem e mercado em cinco decisões. Cada uma tem etapas, artefatos e uma entrega clara.',
    methodKicker: 'O método',
    methodHeading: 'Origin. Position. Signal. Offer. System.',
    steps: [
      { key: 'origin', kicker: '01', title: 'Origin', sub: 'De onde vem o negócio?', body: 'Tese do fundador, contexto, tensão e origem cultural.' },
      { key: 'position', kicker: '02', title: 'Position', sub: 'Que espaço deve ocupar?', body: 'Categoria, público, diferenciação e posicionamento.' },
      { key: 'signal', kicker: '03', title: 'Signal', sub: 'Como será reconhecido?', body: 'Narrativa, identidade verbal, território visual e códigos.' },
      { key: 'offer', kicker: '04', title: 'Offer', sub: 'O que exatamente está sendo comprado?', body: 'Oferta, lógica de preço, go-to-market e caminho de receita.' },
      { key: 'system', kicker: '05', title: 'System', sub: 'Como continua funcionando?', body: 'Governança, regras de marca, operação e prioridades.' },
    ],
  },

  deliverables: {
    kicker: 'O que você leva',
    heading: 'Você sai com uma tese, uma marca, uma oferta, um caminho até o mercado e as regras para manter tudo andando.',
    deck: 'A entrega final é um operating blueprint da marca, não um deck.',
    items: [
      'Tese estratégica',
      'Arquitetura de posicionamento',
      'Narrativa de marca',
      'Identidade verbal',
      'Direção visual',
      'Arquitetura de oferta',
      'Prioridades de go-to-market',
      'Lógica de receita',
      'Sistema de governança',
      'Mapa de ação de 90 dias',
    ],
  },

  factory: {
    kicker: 'A vantagem',
    heading: 'Você não leva só o consultor. Você leva a Factory.',
    body: 'Consulting não é uma ilha. Ela acessa uma infraestrutura criativa, cultural e de negócios feita para tornar ideias concretas.',
    items: [
      { key: 'tbf', kicker: '.TBF.', title: 'Cultura e direção', body: 'Cultura, editorial, pesquisa e direção.' },
      { key: 'ruc', kicker: '.RUC.', title: 'Imagem e produção', body: 'Moda, imagem, filme, produção e acervo.' },
      { key: 'tgf', kicker: '.TGF.', title: 'Crescimento e tecnologia', body: 'Growth, business development, tecnologia e expansão.' },
      { key: 'collective', kicker: 'Collective', title: 'Pessoas e rede', body: 'Artistas, makers, pensadores e founders.' },
      { key: 'publishing', kicker: 'Publishing', title: 'Autoridade e memória', body: 'Distribuição, documentação e autoridade cultural.' },
    ],
  },

  commitment: {
    kicker: 'Com o que nos comprometemos',
    heading: 'Sem retainer por padrão. Sem pacote genérico. Sem teatro de estratégia.',
    p1: 'Todo projeto tem escopo escrito e prazo declarado. Se a entrega não chegar ao nível do conceito aprovado, ela volta para a mesa sem custo adicional, até chegar. Está no contrato.',
    p2: 'Aceitamos poucos projetos por trimestre, de propósito. A casa entrega com a própria equipe e não terceiriza direção.',
  },

  briefing: {
    kicker: 'Antes da conversa',
    heading: 'Chegue com a resposta para cinco perguntas.',
    questions: [
      'O que você está construindo?',
      'O que não está funcionando?',
      'O que precisa mudar?',
      'Onde você está agora?',
      'O que faria isso valer a pena?',
    ],
  },

  closing: {
    lines: ['Um problema definido.', 'Um engajamento definido.', 'Um negócio mais forte.'],
    creditLine1: 'Crafted in São Paulo, Brazil. Consumed worldwide.',
    creditLine2Prefix: 'Parte da',
    cta: 'Construa com a gente',
  },
}

export const consulting: Record<Lang, typeof en> = { en, pt }
