// =============================================================================
// Dicionário da /labels/thefioredaily — .THE FIORE DAILY. Convenções: ../../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: '.THE FIORE DAILY. | .TFD. | .THE BRAZILIAN FACTORY.',
    description:
      'An intimacy, wellness and ritual label inside the .THE BRAZILIAN FACTORY. ecosystem. A daily practice of presence, care and intention.',
    ogTitle: '.THE FIORE DAILY. | .TFD.',
    ogDescription: 'Intimacy-Wellness Community. Part of .THE BRAZILIAN FACTORY.',
  },

  hero: {
    title: '.THE FIORE DAILY.',
    // Descritor central do lockup fica fixo em inglês nos dois idiomas: o
    // clamp() do lockup foi calibrado para o descritor mais longo das 3
    // labels (.TGF.) caber em 3 linhas sem quebrar no mobile — mesma nota
    // da FactoryOfGrowth. Ver relato de entrega.
    lockupDescriptor: 'Intimacy & Wellness Label',
    tagline: ['Intimacy. Wellness. Ritual.', 'In Brazilian Bass.'] as [string, string],
  },

  intro: {
    line1: 'A daily practice of presence, care and intention.',
    line2Prefix: 'Part of the',
    line2Suffix: 'ecosystem.',
    ctaLabel: '@thefioredaily',
  },

  overview: {
    subtitle: 'Overview',
    heading: 'What is .TFD.?',
    p1: '.THE FIORE DAILY. is the wellness, intimacy and ritual-care vertical of .THE BRAZILIAN FACTORY.',
    p2: 'Built to explore the relationship between presence, body and intention, turning daily life into conscious practice and a culture of care.',
  },

  why: {
    subtitle: 'Position inside the ecosystem',
    heading: 'Why it exists',
    deck: ['Every body needs attention.', 'Every mind needs silence.', 'Every routine needs intention.'] as [string, string, string],
    body: '.TFD. exists to cultivate the human layer of the .TBF. ecosystem, turning care into culture and presence into identity.',
    philosophySubtitle: 'Philosophy',
    philosophyLine: ['Wellness is not a destination.', 'Wellness is a daily practice.'] as [string, string],
    philosophyBody: 'We believe the most present people of the next generation will be the ones able to unite self-knowledge, ritual and expression into a single daily practice.',
  },

  focus: {
    subtitle: 'Areas of interest',
    heading: 'Core Domains',
    areas: [
      'Intimacy',
      'Wellness',
      'Ritual',
      'Self-Care',
      'Body Culture',
      'Mental Health',
      'Lifestyle',
      'Feminine Expression',
    ],
  },

  connection: {
    subtitlePrefix: 'Relationship with',
    heading: 'Inside the Collective',
    p1: '.TFD. works in collaboration with other initiatives across the .TBF. ecosystem, connecting wellness with culture, creativity and community.',
    p2: 'Its work complements the other labels through a lens focused on presence, care and human expression.',
  },

  footer: {
    closer: ['Presence creates depth.', 'Ritual creates identity.', 'Together they create life.'] as [string, string, string],
    microLine1: 'Founded in São Paulo. Built for global ambition.',
    microLine2Prefix: 'Part of',
    ctaLabel: '@thefioredaily',
  },
}

const pt: typeof en = {
  meta: {
    title: '.THE FIORE DAILY. | .TFD. | .THE BRAZILIAN FACTORY.',
    description:
      'Uma label de intimidade, bem-estar e rituais dentro do ecossistema .THE BRAZILIAN FACTORY. Uma prática diária de presença, cuidado e intenção.',
    ogTitle: '.THE FIORE DAILY. | .TFD.',
    ogDescription: 'Intimacy-Wellness Community. Parte da .THE BRAZILIAN FACTORY.',
  },

  hero: {
    title: '.THE FIORE DAILY.',
    lockupDescriptor: 'Intimacy & Wellness Label',
    tagline: ['Intimidade. Bem-Estar. Ritual.', 'In Brazilian Bass.'],
  },

  intro: {
    line1: 'Uma prática diária de presença, cuidado e intenção.',
    line2Prefix: 'Parte do ecossistema',
    line2Suffix: '',
    ctaLabel: '@thefioredaily',
  },

  overview: {
    subtitle: 'Overview',
    heading: 'O que é a .TFD.?',
    p1: '.THE FIORE DAILY. é a vertical de bem-estar, intimidade e rituais de cuidado da .THE BRAZILIAN FACTORY.',
    p2: 'Criada para explorar a relação entre presença, corpo e intenção, transformando o cotidiano em prática consciente e cultura de cuidado.',
  },

  why: {
    subtitle: 'Posição dentro do ecossistema',
    heading: 'Por que existe',
    deck: ['Todo corpo precisa de atenção.', 'Toda mente precisa de silêncio.', 'Toda rotina precisa de intenção.'],
    body: '.TFD. existe para cultivar a camada humana do ecossistema .TBF., transformando cuidado em cultura e presença em identidade.',
    philosophySubtitle: 'Filosofia',
    philosophyLine: ['Bem-estar não é um destino.', 'Bem-estar é uma prática diária.'],
    philosophyBody: 'Acreditamos que as pessoas mais presentes da próxima geração serão aquelas capazes de unir autoconhecimento, rituais e expressão em uma única prática diária.',
  },

  focus: {
    subtitle: 'Áreas de interesse',
    heading: 'Domínios Centrais',
    areas: [
      'Intimidade',
      'Bem-Estar',
      'Ritual',
      'Autocuidado',
      'Cultura Corporal',
      'Saúde Mental',
      'Estilo de Vida',
      'Expressão Feminina',
    ],
  },

  connection: {
    subtitlePrefix: 'Relação com',
    heading: 'Dentro do Collective',
    p1: '.TFD. trabalha em colaboração com outras iniciativas do ecossistema .TBF., conectando bem-estar com cultura, criatividade e comunidade.',
    p2: 'Sua atuação complementa as demais labels através de uma perspectiva orientada para presença, cuidado e expressão humana.',
  },

  footer: {
    closer: ['Presença cria profundidade.', 'Ritual cria identidade.', 'Juntos criam vida.'],
    microLine1: 'Fundada em São Paulo. Construída para ambição global.',
    microLine2Prefix: 'Parte da',
    ctaLabel: '@thefioredaily',
  },
}

export const theFioreDaily: Record<Lang, typeof en> = { en, pt }
