// =============================================================================
// Dicionário da /press. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Press Room',
    description:
      'Official source for .THE BRAZILIAN FACTORY. news, announcements, brand assets and media inquiries.',
  },

  hero: {
    tag: 'Press Room',
    title: '.TBF. Newsroom',
    deckPre: 'The official source for ',
    deckPost: ' news, company announcements, brand assets and media inquiries.',
  },

  about: {
    label: 'About',
    heading: 'We build culture.',
    p1: 'is a multi-label creative company born in São Paulo. We operate at the intersection of editorial, fashion, wellness, lifestyle and growth, producing content, communities and creative work that reflects the depth and ambition of Brazilian culture.',
    p2Pre: 'Our work is built across four active labels: ',
    p2Connector: 'and',
    p2Post: '.',
  },

  resources: {
    label: 'Resources',
    heading: 'For the press',
    items: [
      {
        label: 'Brand Assets',
        desc: 'Logos, brand marks, visual identity guidelines and photography for editorial use.',
        href: '/press/media',
      },
      {
        label: 'Company Facts',
        desc: 'Key figures, founding date, label overview and company information.',
        href: '/about/quick-facts',
      },
      {
        label: 'Founders',
        desc: 'Background on the people who created and lead .THE BRAZILIAN FACTORY.',
        href: '/creators/tavaristico',
      },
      {
        label: 'About .TBF.',
        desc: 'Our mission, values, ecosystem structure and creative philosophy.',
        href: '/about',
      },
    ],
  },

  contact: {
    label: 'Contact',
    heading: 'Media inquiries',
    line: 'For all press and media inquiries, interview requests, brand partnership discussions and image usage approvals, contact our communications team directly. We aim to respond within 48 business hours.',
    email: 'press@thebrfactory.com',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Press Room',
    description:
      'Fonte oficial de notícias, anúncios, ativos de marca e contatos de imprensa da .THE BRAZILIAN FACTORY.',
  },

  hero: {
    tag: 'Press Room',
    title: '.TBF. Newsroom',
    deckPre: 'A fonte oficial de notícias, anúncios da empresa, ativos de marca e contatos de imprensa da ',
    deckPost: '.',
  },

  about: {
    label: 'Sobre',
    heading: 'A gente constrói cultura.',
    p1: 'é uma empresa criativa multi-label nascida em São Paulo. Operamos no cruzamento entre editorial, moda, wellness, lifestyle e growth, produzindo conteúdo, comunidades e trabalho criativo que reflete a profundidade e a ambição da cultura brasileira.',
    p2Pre: 'Nosso trabalho é construído em quatro labels ativas: ',
    p2Connector: 'e',
    p2Post: '.',
  },

  resources: {
    label: 'Recursos',
    heading: 'Para a imprensa',
    items: [
      {
        label: 'Ativos de Marca',
        desc: 'Logos, marcas registradas, guia de identidade visual e fotografia para uso editorial.',
        href: '/press/media',
      },
      {
        label: 'Dados da Empresa',
        desc: 'Números-chave, data de fundação, panorama das labels e informações da empresa.',
        href: '/about/quick-facts',
      },
      {
        label: 'Fundadores',
        desc: 'Histórico de quem criou e lidera a .THE BRAZILIAN FACTORY.',
        href: '/creators/tavaristico',
      },
      {
        label: 'Sobre a .TBF.',
        desc: 'Nossa missão, valores, estrutura do ecossistema e filosofia criativa.',
        href: '/about',
      },
    ],
  },

  contact: {
    label: 'Contato',
    heading: 'Contatos de imprensa',
    line: 'Para toda solicitação de imprensa e mídia, pedido de entrevista, discussão de parceria de marca e aprovação de uso de imagem, fale direto com nosso time de comunicação. Buscamos responder em até 48 horas úteis.',
    email: 'press@thebrfactory.com',
  },
}

export const press: Record<Lang, typeof en> = { en, pt }
