// =============================================================================
// Dicionário da /labels/runwayunited — .RUNWAY UNTD COLLECTIVE. Convenções: ../../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: '.RUNWAY UNTD COLLECTIVE. | .RUC. | .THE BRAZILIAN FACTORY.',
    description:
      'A fashion films and editorial label inside the .THE BRAZILIAN FACTORY. ecosystem. Where runway meets culture, film and creative direction.',
    ogTitle: '.RUNWAY UNTD COLLECTIVE. | .RUC.',
    ogDescription: 'Fashion Film Magazine. Part of .THE BRAZILIAN FACTORY.',
  },

  hero: {
    title: '.RUNWAY UNTD COLLECTIVE.',
    // Descritor central do lockup fica fixo em inglês nos dois idiomas: o
    // clamp() do lockup foi calibrado para o descritor mais longo das 3
    // labels (.TGF.) caber em 3 linhas sem quebrar no mobile — mesma nota
    // da FactoryOfGrowth. Ver relato de entrega.
    lockupDescriptor: 'Editorial Fashion Label',
    tagline: ['Music. Fashion. Film.', 'In Brazilian Bass.'] as [string, string],
  },

  intro: {
    line1: 'A platform dedicated to fashion films, visual essays and contemporary runway culture.',
    line2: 'Documenting the people, movements and stories shaping the next generation of fashion.',
    line3Prefix: 'Part of',
    ctaLabel: '@runwayunited',
  },

  overview: {
    subtitle: 'Overview',
    heading: 'What is .RUC.?',
    p1: '.RUNWAY UNTD COLLECTIVE. is the fashion, film and cultural storytelling label of .THE BRAZILIAN FACTORY.',
    p2: "Created to document, produce and amplify Brazil's emerging creative scene, .RUC. brings together runway culture, cinema and visual identity into one editorial language.",
    p3: 'Part media platform, part creative studio, part cultural archive.',
  },

  why: {
    subtitle: 'Position inside the ecosystem',
    heading: 'Why it exists',
    deck: ['Every runway tells a story.', 'Every collection carries a vision.', 'Every creator deserves a platform.'] as [string, string, string],
    body: '.RUNWAY UNTD COLLECTIVE. exists to document the creative layer of the .THE BRAZILIAN FACTORY. ecosystem, transforming fashion into narrative and the runway into cultural memory.',
    philosophySubtitle: 'Philosophy',
    philosophyLine: ['Fashion is not an industry.', 'Fashion is a language.'] as [string, string],
    philosophyBody: 'The next generation of creators will not be defined by what they make, but by the worlds they build through aesthetics, storytelling and cultural influence.',
  },

  focus: {
    subtitle: 'Areas of interest',
    heading: 'What We Document',
    areas: [
      'Fashion Films',
      'Editorial Stories',
      'Runway Culture',
      'Fashion Weeks',
      'Creative Direction',
      'Fashion Photography',
      'Casting',
      'Cultural Curation',
    ],
  },

  connection: {
    subtitlePrefix: 'Relationship with',
    heading: 'Inside the Collective',
    p1: '.RUNWAY UNTD COLLECTIVE. is the fashion and cultural storytelling label of .THE BRAZILIAN FACTORY.',
    p2: 'It exists to document the creative pulse of the ecosystem, connecting runway, editorial and community through a shared visual language.',
    deck: ['Fashion as narrative.', 'Culture as archive.'] as [string, string],
  },

  footer: {
    closer: ['Fashion creates culture.', 'Film preserves memory.', 'Together, they become legacy.'] as [string, string, string],
    microLine1: 'Founded in São Paulo.',
    microLine2: 'Made for the world.',
    microLine3Prefix: 'Part of',
    ctaLabel: '@runwayunited',
  },
}

const pt: typeof en = {
  meta: {
    title: '.RUNWAY UNTD COLLECTIVE. | .RUC. | .THE BRAZILIAN FACTORY.',
    description:
      'Uma label de fashion films e editorial dentro do ecossistema .THE BRAZILIAN FACTORY. Onde a passarela encontra cultura, cinema e direção criativa.',
    ogTitle: '.RUNWAY UNTD COLLECTIVE. | .RUC.',
    ogDescription: 'Fashion Film Magazine. Parte da .THE BRAZILIAN FACTORY.',
  },

  hero: {
    title: '.RUNWAY UNTD COLLECTIVE.',
    lockupDescriptor: 'Editorial Fashion Label',
    tagline: ['Música. Moda. Cinema.', 'In Brazilian Bass.'],
  },

  intro: {
    line1: 'Uma plataforma dedicada a fashion films, ensaios visuais e à cultura de passarela contemporânea.',
    line2: 'Documentando as pessoas, movimentos e histórias que moldam a próxima geração da moda.',
    line3Prefix: 'Parte da',
    ctaLabel: '@runwayunited',
  },

  overview: {
    subtitle: 'Overview',
    heading: 'O que é a .RUC.?',
    p1: '.RUNWAY UNTD COLLECTIVE. é a label de moda, cinema e narrativa cultural da .THE BRAZILIAN FACTORY.',
    p2: 'Criada para documentar, produzir e amplificar a cena criativa emergente do Brasil, a .RUC. reúne cultura de passarela, cinema e identidade visual em uma única linguagem editorial.',
    p3: 'Parte plataforma de mídia, parte estúdio criativo, parte arquivo cultural.',
  },

  why: {
    subtitle: 'Posição dentro do ecossistema',
    heading: 'Por que existe',
    deck: ['Toda passarela conta uma história.', 'Toda coleção carrega uma visão.', 'Todo criador merece uma plataforma.'],
    body: '.RUNWAY UNTD COLLECTIVE. existe para documentar a camada criativa do ecossistema .THE BRAZILIAN FACTORY., transformando moda em narrativa e a passarela em memória cultural.',
    philosophySubtitle: 'Filosofia',
    philosophyLine: ['Moda não é uma indústria.', 'Moda é uma linguagem.'],
    philosophyBody: 'A próxima geração de criadores não será definida pelo que produz, mas pelos mundos que constrói através de estética, narrativa e influência cultural.',
  },

  focus: {
    subtitle: 'Áreas de interesse',
    heading: 'O Que Documentamos',
    areas: [
      'Fashion Films',
      'Histórias Editoriais',
      'Cultura de Passarela',
      'Fashion Weeks',
      'Direção Criativa',
      'Fotografia de Moda',
      'Casting',
      'Curadoria Cultural',
    ],
  },

  connection: {
    subtitlePrefix: 'Relação com',
    heading: 'Dentro do Collective',
    p1: '.RUNWAY UNTD COLLECTIVE. é a label de moda e narrativa cultural da .THE BRAZILIAN FACTORY.',
    p2: 'Existe para documentar o pulso criativo do ecossistema, conectando passarela, editorial e comunidade através de uma linguagem visual compartilhada.',
    deck: ['Moda como narrativa.', 'Cultura como arquivo.'],
  },

  footer: {
    closer: ['Moda cria cultura.', 'Cinema preserva memória.', 'Juntos, se tornam legado.'],
    microLine1: 'Fundada em São Paulo.',
    microLine2: 'Feita para o mundo.',
    microLine3Prefix: 'Parte da',
    ctaLabel: '@runwayunited',
  },
}

export const runwayUnited: Record<Lang, typeof en> = { en, pt }
