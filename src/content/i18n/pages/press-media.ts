// =============================================================================
// Dicionário da /press/media. Convenções: ../README.md
//
// Nova arquitetura (08/10/2026), a partir de TBF_Press_Media_Nova_Arquitetura:
// de "onde pegar o logo" para "como entender e representar a TBF". Ordem:
// contexto, sistema, fatos, linguagem, ativos, uso, pedido de acesso.
//
// FICOU DE FORA, DE PROPÓSITO: quote bank, founder kit, fact sheet e press kit
// PDF (ativos que ainda não existem). Nada foi inventado.
//
// Nomes de página e de produto ficam em inglês também na PT.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Media Resources | The .TBF. Media Desk',
    description:
      'Official resources for understanding and representing .THE BRAZILIAN FACTORY.: definition, approved language, brand assets and usage.',
  },

  hero: {
    tag: 'Media Resources',
    title: 'The .TBF. Media Desk.',
    deck: 'Official resources for understanding and representing .THE BRAZILIAN FACTORY.',
    context: 'Don’t just take the logo. Take the context.',
  },

  about: {
    kicker: 'About the Factory',
    heading: 'Born in São Paulo. Built for everywhere.',
    definition: '.THE BRAZILIAN FACTORY. is a Brazil-born cultural factory building brands, worlds, businesses and intellectual property for a global audience.',
    items: [
      { key: 'mission', kicker: 'Mission', title: 'Make Brazilian culture undeniable.' },
      { key: 'vision', kicker: 'Vision', title: 'Build cultural properties from Brazil with global relevance.' },
      { key: 'thesis', kicker: 'Thesis', title: 'Culture is raw material. Brazil is the source code. Ideas must become things.' },
    ] as { key: string; kicker: string; title: string }[],
  },

  system: {
    kicker: 'The system',
    heading: 'How the Factory fits together.',
    items: [
      { key: 'factory', kicker: 'Factory', title: 'Creates', body: 'The Factory creates.' },
      { key: 'labels', kicker: 'Labels', title: 'Become worlds', body: 'The Labels become worlds.' },
      { key: 'collective', kicker: 'Collective', title: 'Brings the people', body: 'The Collective brings the people.' },
      { key: 'publishing', kicker: 'Publishing', title: 'Gives culture memory', body: 'Publishing gives culture memory and distribution.' },
      { key: 'consulting', kicker: 'Consulting', title: 'Builds structure', body: 'Consulting builds structure.' },
      { key: 'access', kicker: 'Access', title: 'Opens the door', body: 'Access opens the door.' },
    ] as { key: string; kicker: string; title: string; body: string }[],
  },

  facts: {
    kicker: 'Press facts',
    heading: 'What you can quote.',
    items: [
      { key: 'founded', kicker: 'Founded', title: '2025' },
      { key: 'origin', kicker: 'Born in', title: 'São Paulo, Brazil' },
      { key: 'status', kicker: 'Status', title: 'Independent' },
      { key: 'labels', kicker: 'Active labels', title: '4' },
      { key: 'ambition', kicker: 'Ambition', title: 'Global' },
    ] as { key: string; kicker: string; title: string }[],
  },

  language: {
    kicker: 'Language',
    heading: 'How to describe the house.',
    deck: 'Use the approved descriptions below when referencing .THE BRAZILIAN FACTORY. in editorial, press or partnership contexts.',
    items: [
      { key: 'one', title: 'One line', body: '.THE BRAZILIAN FACTORY. is a Brazil-born cultural factory building brands, worlds, businesses and intellectual property for a global audience.' },
      { key: 'short', title: 'Short bio', body: '.THE BRAZILIAN FACTORY. is an independent cultural company born in São Paulo. It builds cultural properties across editorial, fashion, intimacy, growth and creative business.' },
      { key: 'not', title: 'What we are not', body: 'Not a traditional agency. Not a media company. Not a conventional holding. A Factory built to turn cultural intelligence into things that can exist in the world.' },
      { key: 'brazil', title: 'Brazil', body: 'Brazil is not our theme. It is our source code.' },
      { key: 'mission', title: 'Mission', body: 'Make Brazilian culture undeniable.' },
    ] as { key: string; title: string; body: string }[],
  },

  assets: {
    kicker: 'Brand assets',
    heading: 'What is available.',
    groups: [
      {
        category: 'Brand',
        items: [
          '.TBF. Primary Logotype',
          '.TBF. São Paulo Mark',
          '.TBF. Symbol (Asterisk Mark)',
          'Color systems',
          'Typography specifications',
        ],
      },
      {
        category: 'Labels',
        items: [
          '.TFD. | THE FIORE DAILY mark',
          '.RUC. | RUNWAY UNTD COLLECTIVE mark',
          '.TGF. | THE GROWTH FACTORY mark',
          'Label color systems',
        ],
      },
      {
        category: 'Image library',
        items: [
          'Brand photography',
          'Editorial photography (licensed per use)',
          'Founder portraits',
          'Product and project imagery',
        ],
      },
    ] as { category: string; items: string[] }[],
  },

  usage: {
    kicker: 'Usage',
    heading: 'We want the world to use .TBF. correctly, not narrowly.',
    p1: 'Assets are provided for approved editorial and press use. Commercial, partnership or other uses require prior written approval from our press team.',
    rulesLabel: 'The rules',
    rules: [
      'Do not alter, recolor, crop or distort the marks.',
      'Keep the minimum clear space around every mark, as set in the brand guidelines.',
      'Never place a mark over a busy background without our approval.',
      'Photography and video are for editorial use only.',
      'Credit .THE BRAZILIAN FACTORY. in published work.',
      'Use of the marks in any context other than editorial needs written approval.',
    ],
  },

  contact: {
    kicker: 'Request access',
    heading: 'Tell us what you are publishing.',
    line: 'Tell us what you are publishing, where it will appear and what assets you need. We also take interview, quote, image, partnership and fact-check requests here.',
    email: 'press@thebrfactory.com',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Media Resources | The .TBF. Media Desk',
    description:
      'Recursos oficiais para entender e representar a .THE BRAZILIAN FACTORY.: definição, linguagem aprovada, ativos de marca e regras de uso.',
  },

  hero: {
    tag: 'Media Resources',
    title: 'The .TBF. Media Desk.',
    deck: 'Recursos oficiais para entender e representar a .THE BRAZILIAN FACTORY.',
    context: 'Não leve só o logo. Leve o contexto.',
  },

  about: {
    kicker: 'About the Factory',
    heading: 'Nascida em São Paulo. Feita para qualquer lugar.',
    definition: 'A .THE BRAZILIAN FACTORY. é uma factory cultural nascida no Brasil que transforma cultura em marcas, mundos, negócios e propriedade intelectual para o mundo.',
    items: [
      { key: 'mission', kicker: 'Missão', title: 'Tornar a cultura brasileira inegável.' },
      { key: 'vision', kicker: 'Visão', title: 'Construir propriedades culturais a partir do Brasil, com relevância global.' },
      { key: 'thesis', kicker: 'Tese', title: 'Cultura é matéria-prima. O Brasil é o código-fonte. Ideias precisam virar coisas.' },
    ],
  },

  system: {
    kicker: 'The system',
    heading: 'Como a Factory se encaixa.',
    items: [
      { key: 'factory', kicker: 'Factory', title: 'Cria', body: 'A Factory cria.' },
      { key: 'labels', kicker: 'Labels', title: 'Viram mundos', body: 'As Labels viram mundos.' },
      { key: 'collective', kicker: 'Collective', title: 'Traz as pessoas', body: 'O Collective traz as pessoas.' },
      { key: 'publishing', kicker: 'Publishing', title: 'Dá memória à cultura', body: 'O Publishing dá memória e circulação à cultura.' },
      { key: 'consulting', kicker: 'Consulting', title: 'Constrói estrutura', body: 'O Consulting constrói estrutura.' },
      { key: 'access', kicker: 'Access', title: 'Abre a porta', body: 'O Access abre a porta.' },
    ],
  },

  facts: {
    kicker: 'Press facts',
    heading: 'O que você pode citar.',
    items: [
      { key: 'founded', kicker: 'Fundação', title: '2025' },
      { key: 'origin', kicker: 'Origem', title: 'São Paulo, Brasil' },
      { key: 'status', kicker: 'Status', title: 'Independente' },
      { key: 'labels', kicker: 'Labels ativas', title: '4' },
      { key: 'ambition', kicker: 'Ambição', title: 'Global' },
    ],
  },

  language: {
    kicker: 'Language',
    heading: 'Como descrever a casa.',
    deck: 'Use as descrições aprovadas abaixo ao citar a .THE BRAZILIAN FACTORY. em contexto editorial, de imprensa ou de parceria.',
    items: [
      { key: 'one', title: 'Em uma linha', body: 'A .THE BRAZILIAN FACTORY. é uma factory cultural nascida no Brasil que transforma cultura em marcas, mundos, negócios e propriedade intelectual para o mundo.' },
      { key: 'short', title: 'Bio curta', body: 'A .THE BRAZILIAN FACTORY. é uma empresa cultural independente nascida em São Paulo. Constrói propriedades culturais em editorial, moda, intimidade, growth e negócios criativos.' },
      { key: 'not', title: 'O que não somos', body: 'Não somos uma agência tradicional. Não somos uma empresa de mídia. Não somos uma holding convencional. Somos uma Factory feita para transformar inteligência cultural em coisas que existem no mundo.' },
      { key: 'brazil', title: 'Brasil', body: 'O Brasil não é o nosso tema. É o nosso código-fonte.' },
      { key: 'mission', title: 'Missão', body: 'Tornar a cultura brasileira inegável.' },
    ],
  },

  assets: {
    kicker: 'Brand assets',
    heading: 'O que está disponível.',
    groups: [
      {
        category: 'Marca',
        items: [
          'Logotipo primário .TBF.',
          'Selo São Paulo .TBF.',
          'Símbolo .TBF. (Asterisco)',
          'Sistemas de cor',
          'Especificações de tipografia',
        ],
      },
      {
        category: 'Labels',
        items: [
          'Selo .TFD. | THE FIORE DAILY',
          'Selo .RUC. | RUNWAY UNTD COLLECTIVE',
          'Selo .TGF. | THE GROWTH FACTORY',
          'Sistemas de cor das labels',
        ],
      },
      {
        category: 'Image library',
        items: [
          'Fotografia de marca',
          'Fotografia editorial (licenciada por uso)',
          'Retratos do founder',
          'Imagens de produto e de projeto',
        ],
      },
    ],
  },

  usage: {
    kicker: 'Usage',
    heading: 'Queremos que o mundo use a .TBF. do jeito certo, não do jeito estreito.',
    p1: 'Os ativos são oferecidos para uso editorial e de imprensa aprovado. Uso comercial, de parceria ou qualquer outro exige aprovação prévia por escrito do nosso time de imprensa.',
    rulesLabel: 'As regras',
    rules: [
      'Não altere, recolora, corte nem distorça as marcas.',
      'Mantenha o espaço livre mínimo ao redor de cada marca, conforme o guia de marca.',
      'Nunca posicione uma marca sobre fundo poluído sem a nossa aprovação.',
      'Fotografia e vídeo são só para uso editorial.',
      'Credite a .THE BRAZILIAN FACTORY. no material publicado.',
      'Uso das marcas fora do contexto editorial precisa de aprovação por escrito.',
    ],
  },

  contact: {
    kicker: 'Request access',
    heading: 'Conte o que você vai publicar.',
    line: 'Conte o que você vai publicar, onde vai sair e de quais ativos precisa. Também recebemos aqui pedidos de entrevista, citação, imagem, parceria e checagem de fatos.',
    email: 'press@thebrfactory.com',
  },
}

export const pressMedia: Record<Lang, typeof en> = { en, pt }
