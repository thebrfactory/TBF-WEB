// =============================================================================
// Dicionário de PUBLISHING. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Publishing',
    description:
      '.THE BRAZILIAN FACTORY. Publishing: editorial content, creative contributions and brand storytelling from inside the .TBF. ecosystem.',
  },

  hero: {
    tag: 'Publishing',
    title: '.TBF. Publishing.',
    // "Editorial content, creative contributions and cultural storytelling
    // from inside the " + <strong>.THE BRAZILIAN FACTORY.</strong> + " ecosystem."
    deckPrefix: 'Editorial content, creative contributions and cultural storytelling from inside the',
    deckSuffix: 'ecosystem.',
  },

  whatWePublish: {
    sectionLabel: 'What We Publish',
    h2: 'Culture, told well.',
    // <strong>.TBF. Magazine</strong> + " is the editorial arm of " + <strong>.THE BRAZILIAN FACTORY.</strong> + p1End
    p1Mid: 'is the editorial arm of',
    p1End: 'We publish long-form editorial content, photography, interviews and cultural essays, all rooted in the São Paulo creative scene and connected to a broader global conversation.',
    p2: 'Our publishing extends across all four labels: each label contributes content from its own specific cultural territory. Everything we publish is made with intention and produced to a high standard.',
  },

  formats: {
    sectionLabel: 'Content Formats',
    h2: 'What we make',
    items: [
      { format: 'Editorial', desc: 'Long-form essays, cultural criticism, profiles and opinion pieces. Grounded in culture, written with depth.' },
      { format: 'Photography', desc: 'Visual storytelling from inside the São Paulo creative scene and beyond. Documentary, fashion, lifestyle.' },
      { format: 'Interviews', desc: 'Conversations with creators, founders, artists and thinkers working at the intersection of culture and craft.' },
      { format: 'Label Content', desc: 'Original content from .TFD., .RUC. and .TGF. Each label with its own editorial voice and focus.' },
    ] as { format: string; desc: string }[],
  },

  contribute: {
    sectionLabel: 'Contribute',
    h2: 'Work with us',
    p1: 'We are open to editorial pitches, photography submissions and creative partnerships from independent writers, photographers, designers and cultural thinkers. We prioritize work that is specific, rigorous and culturally grounded.',
    p2: 'Before reaching out, explore our editorial to understand the kind of work we publish. Pitches that align with our existing voice and topics are far more likely to be considered.',
    pitchLabel: 'Editorial pitches',
    pitchEmail: 'contact@thebrfactory.com',
    partnershipsLabel: 'Brand partnerships',
    partnershipsEmail: 'press@thebrfactory.com',
  },

  explore: {
    sectionLabel: 'Explore',
    h2: 'Read the Magazine',
    cta: 'Go to Magazine',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Publishing',
    description:
      'Publishing da .THE BRAZILIAN FACTORY.: conteúdo editorial, contribuições criativas e narrativas de marca de dentro do ecossistema .TBF.',
  },

  hero: {
    tag: 'Publishing',
    title: '.TBF. Publishing.',
    deckPrefix: 'Conteúdo editorial, contribuições criativas e narrativa cultural de dentro do ecossistema',
    deckSuffix: '.',
  },

  whatWePublish: {
    sectionLabel: 'O Que Publicamos',
    h2: 'Cultura, bem contada.',
    p1Mid: 'é o braço editorial da',
    p1End: 'Publicamos conteúdo editorial de fôlego, fotografia, entrevistas e ensaios culturais, todos enraizados na cena criativa de São Paulo e conectados a uma conversa global mais ampla.',
    p2: 'Nossa publicação se estende pelas quatro labels: cada uma contribui com conteúdo do seu território cultural específico. Tudo o que publicamos é feito com intenção e produzido com alto padrão.',
  },

  formats: {
    sectionLabel: 'Formatos de Conteúdo',
    h2: 'O que fazemos',
    items: [
      { format: 'Editorial', desc: 'Ensaios de fôlego, crítica cultural, perfis e artigos de opinião. Ancorados na cultura, escritos com profundidade.' },
      { format: 'Fotografia', desc: 'Narrativa visual de dentro da cena criativa de São Paulo e além. Documental, moda, lifestyle.' },
      { format: 'Entrevistas', desc: 'Conversas com criadores, fundadores, artistas e pensadores que trabalham na interseção entre cultura e ofício.' },
      { format: 'Conteúdo das Labels', desc: 'Conteúdo original da .TFD., .RUC. e .TGF. Cada label com voz e foco editorial próprios.' },
    ],
  },

  contribute: {
    sectionLabel: 'Contribua',
    h2: 'Trabalhe com a gente',
    p1: 'Estamos abertos a pautas editoriais, envio de fotografia e parcerias criativas de escritores, fotógrafos, designers e pensadores independentes. Priorizamos trabalho específico, rigoroso e culturalmente ancorado.',
    p2: 'Antes de entrar em contato, explore nosso editorial para entender o tipo de trabalho que publicamos. Pautas alinhadas com nossa voz e temas atuais têm muito mais chance de serem consideradas.',
    pitchLabel: 'Pautas editoriais',
    pitchEmail: 'contact@thebrfactory.com',
    partnershipsLabel: 'Parcerias de marca',
    partnershipsEmail: 'press@thebrfactory.com',
  },

  explore: {
    sectionLabel: 'Explore',
    h2: 'Leia a Revista',
    cta: 'Ir para a Revista',
  },
}

export const publishing: Record<Lang, typeof en> = { en, pt }
