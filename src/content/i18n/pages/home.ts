// =============================================================================
// Dicionário da HOME. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: '.THE BRAZILIAN FACTORY.',
    description:
      'Culture™ Crafted in São Paulo. Consumed Worldwide. A Brazilian label. Editorial · Labels · Collective.',
    ogDescription: 'Culture™ Crafted in São Paulo. Consumed Worldwide.',
  },

  magazine: {
    sectionLabel: 'Zine',
    cta: 'Enter the Zine',
  },

  // Capas de exemplo, exibidas só enquanto o CMS não tem matéria publicada.
  mockCards: [
    { category: 'Editorial', title: 'What about the Brazilian fashion culture?', date: '01 Jun. 2026', ratio: '3/4' },
    { category: 'Coolhunting', title: 'AFTERPARTY: the feeling behind Brazilian parties', date: '28 Mai. 2026', ratio: '1/1' },
    { category: 'Fashion Film', title: 'ACT I: feeling a Brazilian runway backstage', date: '20 Mai. 2026', ratio: '4/3' },
  ],

  saoPaulo: {
    srHeading: 'São Paulo, cidade-manifesto',
    // A citação de Oswald é de 1922 e em português: ela NÃO se traduz, nem no
    // site em inglês. O que muda entre os idiomas é o que vem abaixo dela.
    gloss:
      '“São Paulo is already the city that calls for novelists and poets. That imposes astonishing human problems and stirs, in its discreet, selfish and intelligent tumult, the profound revolutions that breed immortality.”',
    credit: ['Oswald de Andrade,', 'do grupo modernista,', '1922,', 'São Paulo, SP.'] as [string, string, string, string],
  },

  manifesto: {
    eyebrow: 'Manifesto',
    quote: ['“What about', 'this Brazilian label', 'called .TBF.?', 'It’s a brand?”'] as [string, string, string, string],
    line: "We don't copy Paris, we print over it.",
    cta: 'READ THE MANIFESTO',
  },
}

const pt: typeof en = {
  meta: {
    title: '.THE BRAZILIAN FACTORY.',
    description:
      'Culture™ feita em São Paulo. Consumida no mundo inteiro. Uma label brasileira. Zine · Labels · Collective.',
    ogDescription: 'Culture™ feita em São Paulo. Consumida no mundo inteiro.',
  },

  magazine: {
    sectionLabel: 'Zine',
    cta: 'Entrar no Zine',
  },

  mockCards: [
    { category: 'Editorial', title: 'E a cultura de moda brasileira, como fica?', date: '01 Jun. 2026', ratio: '3/4' },
    { category: 'Coolhunting', title: 'AFTERPARTY: o sentimento por trás das festas brasileiras', date: '28 Mai. 2026', ratio: '1/1' },
    { category: 'Fashion Film', title: 'ATO I: o backstage de uma passarela brasileira', date: '20 Mai. 2026', ratio: '4/3' },
  ],

  saoPaulo: {
    srHeading: 'São Paulo, cidade-manifesto',
    // Em português a citação já está no original: repetir seria redundância.
    // A linha vira o contexto que o leitor brasileiro não tem por padrão.
    gloss: 'Escrito quando a cidade ainda não sabia que estava inventando o modernismo brasileiro.',
    credit: ['Oswald de Andrade,', 'do grupo modernista,', '1922,', 'São Paulo, SP.'],
  },

  manifesto: {
    eyebrow: 'Manifesto',
    quote: ['“E essa tal', 'label brasileira', 'chamada .TBF.?', 'É uma marca?”'],
    line: 'A gente não copia Paris, imprime por cima.',
    cta: 'LEIA O MANIFESTO',
  },
}

export const home: Record<Lang, typeof en> = { en, pt }
