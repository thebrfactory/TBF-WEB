// =============================================================================
// Dicionário da /labels/factoryofgrowth — .THE GROWTH FACTORY. Convenções: ../../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: '.THE GROWTH FACTORY. | .TGF. | .THE BRAZILIAN FACTORY.',
    description:
      'A growth & business development label inside the .THE BRAZILIAN FACTORY. ecosystem. Focused on strategy, expansion and scalable opportunities.',
    ogTitle: '.THE GROWTH FACTORY. | .TGF.',
    ogDescription: 'Growth & Business Development Label. Part of .THE BRAZILIAN FACTORY.',
  },

  hero: {
    title: '.THE GROWTH FACTORY.',
    // "a.k.a. .TGF." + descritor + "of .THE BRAZILIAN FACTORY." — o descritor
    // do meio ("Growth & Business Development Label") FICA em inglês nos dois
    // idiomas de propósito: o clamp() do lockup foi calibrado (ver
    // FactoryOfGrowthView) para o descritor mais longo das 3 labels caber em
    // 3 linhas sem quebrar no mobile. Traduzir mudaria o comprimento e
    // arriscaria a quebra — risco assumido, ver relato de entrega.
    lockupDescriptor: 'Growth & Business Development Label',
    // As três palavras antes de "In Brazilian Bass." são copy e podem mudar;
    // "In Brazilian Bass." é assinatura de marca e NUNCA se traduz.
    tagline: ['Growth. Strategy. Expansion.', 'In Brazilian Bass.'] as [string, string],
  },

  intro: {
    line1: 'A strategic growth label focused on business development, innovation and scalable opportunities.',
    line2Prefix: 'Part of the',
    line2Suffix: 'ecosystem.',
    ctaLabel: 'Visit factoryofgrowth.com',
  },

  overview: {
    subtitle: 'Overview',
    heading: 'What is .TGF.?',
    p1: '.THE GROWTH FACTORY. is the growth, strategy and business development vertical of .THE BRAZILIAN FACTORY.',
    p2: 'Built to turn ideas, brands and companies into scalable assets, connecting creativity, positioning, technology and market opportunity.',
  },

  why: {
    subtitle: 'Position inside the ecosystem',
    heading: 'Why it exists',
    deck: ['Every community needs to grow.', 'Every brand needs to scale.', 'Every vision needs execution.'] as [string, string, string],
    body: '.TGF. exists to develop the strategic layer of the .TBF. ecosystem, turning creative capital into business value.',
    philosophySubtitle: 'Philosophy',
    philosophyLine: ['Growth is not a marketing department.', 'Growth is an organizational mindset.'] as [string, string],
    philosophyBody: 'We believe the most relevant companies of the next decade will be the ones able to unite creativity, technology and execution into a single system.',
  },

  focus: {
    subtitle: 'Areas of interest',
    heading: 'Core Domains',
    areas: [
      'Growth Strategy',
      'Business Development',
      'Brand Expansion',
      'Startup Ecosystems',
      'Innovation',
      'Artificial Intelligence',
      'Market Opportunities',
      'Revenue Systems',
    ],
  },

  connection: {
    subtitlePrefix: 'Relationship with',
    heading: 'Inside the Collective',
    p1: '.TGF. works in collaboration with other initiatives across the .TBF. ecosystem, connecting growth with culture, communication and community.',
    p2: 'Its work complements the other labels through a lens focused on expansion, innovation and value creation.',
  },

  footer: {
    closer: ['Culture creates relevance.', 'Growth creates scale.', 'Together they create value.'] as [string, string, string],
    microLine1: 'Founded in São Paulo. Built for global ambition.',
    microLine2Prefix: 'Part of',
    ctaLabel: 'factoryofgrowth.com',
  },
}

const pt: typeof en = {
  meta: {
    title: '.THE GROWTH FACTORY. | .TGF. | .THE BRAZILIAN FACTORY.',
    description:
      'Uma label de crescimento e desenvolvimento de negócios dentro do ecossistema .THE BRAZILIAN FACTORY. Focada em estratégia, expansão e oportunidades escaláveis.',
    ogTitle: '.THE GROWTH FACTORY. | .TGF.',
    ogDescription: 'Label de Crescimento e Desenvolvimento de Negócios. Parte da .THE BRAZILIAN FACTORY.',
  },

  hero: {
    title: '.THE GROWTH FACTORY.',
    lockupDescriptor: 'Growth & Business Development Label',
    tagline: ['Crescimento. Estratégia. Expansão.', 'In Brazilian Bass.'],
  },

  intro: {
    line1: 'Uma label de crescimento estratégico focada em desenvolvimento de negócios, inovação e oportunidades escaláveis.',
    line2Prefix: 'Parte do ecossistema',
    line2Suffix: '',
    ctaLabel: 'Visite factoryofgrowth.com',
  },

  overview: {
    subtitle: 'Overview',
    heading: 'O que é a .TGF.?',
    p1: '.THE GROWTH FACTORY. é a vertical de crescimento, estratégia e desenvolvimento de negócios da .THE BRAZILIAN FACTORY.',
    p2: 'Criada para transformar ideias, marcas e empresas em ativos escaláveis, conectando criatividade, posicionamento, tecnologia e oportunidades de mercado.',
  },

  why: {
    subtitle: 'Posição dentro do ecossistema',
    heading: 'Por que existe',
    deck: ['Toda comunidade precisa crescer.', 'Toda marca precisa escalar.', 'Toda visão precisa de execução.'],
    body: '.TGF. existe para desenvolver a camada estratégica do ecossistema .TBF., transformando capital criativo em valor de negócio.',
    philosophySubtitle: 'Filosofia',
    philosophyLine: ['Crescimento não é um departamento de marketing.', 'Crescimento é uma mentalidade organizacional.'],
    philosophyBody: 'Acreditamos que as empresas mais relevantes da próxima década serão aquelas capazes de unir criatividade, tecnologia e execução em um único sistema.',
  },

  focus: {
    subtitle: 'Áreas de interesse',
    heading: 'Domínios Centrais',
    areas: [
      'Estratégia de Crescimento',
      'Desenvolvimento de Negócios',
      'Expansão de Marca',
      'Ecossistemas de Startups',
      'Inovação',
      'Inteligência Artificial',
      'Oportunidades de Mercado',
      'Sistemas de Receita',
    ],
  },

  connection: {
    subtitlePrefix: 'Relação com',
    heading: 'Dentro do Collective',
    p1: '.TGF. trabalha em colaboração com outras iniciativas do ecossistema .TBF., conectando crescimento com cultura, comunicação e comunidade.',
    p2: 'Sua atuação complementa as demais labels através de uma perspectiva orientada para expansão, inovação e geração de valor.',
  },

  footer: {
    closer: ['Cultura cria relevância.', 'Crescimento cria escala.', 'Juntos, criam valor.'],
    microLine1: 'Fundada em São Paulo. Construída para ambição global.',
    microLine2Prefix: 'Parte da',
    ctaLabel: 'factoryofgrowth.com',
  },
}

export const factoryOfGrowth: Record<Lang, typeof en> = { en, pt }
