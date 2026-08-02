// =============================================================================
// Dicionário da /press/media. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Media Resources | .THE BRAZILIAN FACTORY.',
    description:
      'Official brand assets, logos, visual identity guidelines and photography resources from .THE BRAZILIAN FACTORY. for editorial and press use.',
  },

  hero: {
    tag: 'Media Resources',
    title: 'Brand Assets.',
    deck: 'Official visual identity resources for editorial, press and approved brand partnership use. All content is subject to usage terms.',
  },

  usageTerms: {
    label: 'Usage Terms',
    heading: 'Editorial use only',
    p1Pre: 'All content downloaded from this page, including photography, video, brand marks and typographic assets, may only be used for ',
    p1Strong: 'editorial purposes',
    p1Post: '. Any other use is strictly prohibited without prior written approval from our communications team.',
    p2Pre: 'When in doubt, contact ',
    p2Post: ' before publishing.',
  },

  assets: {
    label: 'Available Resources',
    heading: 'Brand kit',
    groups: [
      {
        category: 'Brand',
        items: [
          '.TBF. Primary Logotype',
          '.TBF. São Paulo Mark',
          '.TBF. Symbol (Asterisk Mark)',
          'Brand color palette',
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
        category: 'Photography',
        items: [
          'Brand photography library',
          'Editorial photography (licensed per use)',
          'High-resolution product images',
        ],
      },
    ],
    footnote: 'Assets are available upon approved request. Contact press@thebrfactory.com to receive the brand kit.',
  },

  guidelines: {
    label: 'Guidelines',
    heading: 'Brand usage rules',
    rules: [
      'Use .TBF. brand marks only in contexts approved in writing by our press team.',
      'Do not modify, crop, recolor or distort any brand mark or logotype.',
      'Maintain minimum clear space around all marks as specified in the brand guidelines.',
      'Never place brand marks over busy backgrounds without our approval.',
      'Photography and video content may only be used for editorial purposes.',
      'All asset requests must be attributed to .THE BRAZILIAN FACTORY. in published work.',
    ],
  },

  contact: {
    label: 'Contact',
    heading: 'Request assets',
    line: 'To request brand assets, high-resolution photography or approval for specific uses, contact our press team with a brief description of the project and intended publication.',
    email: 'press@thebrfactory.com',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Media Resources | .THE BRAZILIAN FACTORY.',
    description:
      'Ativos de marca oficiais, logos, guia de identidade visual e fotografia da .THE BRAZILIAN FACTORY. para uso editorial e de imprensa.',
  },

  hero: {
    tag: 'Media Resources',
    title: 'Ativos de Marca.',
    deck: 'Recursos oficiais de identidade visual para uso editorial, de imprensa e parcerias de marca aprovadas. Todo conteúdo está sujeito a termos de uso.',
  },

  usageTerms: {
    label: 'Termos de Uso',
    heading: 'Uso editorial apenas',
    p1Pre: 'Todo conteúdo baixado desta página, incluindo fotografia, vídeo, marcas registradas e ativos tipográficos, só pode ser usado para ',
    p1Strong: 'fins editoriais',
    p1Post: '. Qualquer outro uso é estritamente proibido sem aprovação prévia por escrito do nosso time de comunicação.',
    p2Pre: 'Na dúvida, fale com ',
    p2Post: ' antes de publicar.',
  },

  assets: {
    label: 'Recursos Disponíveis',
    heading: 'Kit de marca',
    groups: [
      {
        category: 'Marca',
        items: [
          'Logotipo Primário .TBF.',
          'Selo São Paulo .TBF.',
          'Símbolo .TBF. (Asterisco)',
          'Paleta de cores da marca',
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
        category: 'Fotografia',
        items: [
          'Biblioteca de fotografia da marca',
          'Fotografia editorial (licenciada por uso)',
          'Imagens de produto em alta resolução',
        ],
      },
    ],
    footnote: 'Ativos disponíveis mediante solicitação aprovada. Fale com press@thebrfactory.com para receber o kit de marca.',
  },

  guidelines: {
    label: 'Diretrizes',
    heading: 'Regras de uso da marca',
    rules: [
      'Use as marcas .TBF. só em contextos aprovados por escrito pelo nosso time de imprensa.',
      'Não modifique, corte, recolora ou distorça nenhuma marca ou logotipo.',
      'Mantenha o espaço livre mínimo ao redor de todas as marcas, conforme o guia de marca.',
      'Nunca posicione marcas sobre fundos poluídos sem nossa aprovação.',
      'Conteúdo de fotografia e vídeo só pode ser usado para fins editoriais.',
      'Todo pedido de ativo precisa creditar a .THE BRAZILIAN FACTORY. no material publicado.',
    ],
  },

  contact: {
    label: 'Contato',
    heading: 'Solicitar ativos',
    line: 'Para solicitar ativos de marca, fotografia em alta resolução ou aprovação para usos específicos, fale com nosso time de imprensa com uma breve descrição do projeto e da publicação pretendida.',
    email: 'press@thebrfactory.com',
  },
}

export const pressMedia: Record<Lang, typeof en> = { en, pt }
