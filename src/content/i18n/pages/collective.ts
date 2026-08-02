// =============================================================================
// Dicionário da /collective. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Collective Hotel Casino',
    description:
      'Collective Hotel Casino. Only for artists & changemakers. Apply to join the .THE BRAZILIAN FACTORY. collective.',
    ogTitle: 'Collective Hotel Casino | .THE BRAZILIAN FACTORY.',
    ogDescription: 'Only for artists & changemakers.',
  },

  hero: {
    eyebrow: '.TBF. inc',
    titleLine1: 'Collective',
    titleLine2: 'Hotel Casino.',
    // A tagline de marca não se traduz nos dois idiomas.
    deck: 'Only for artists & changemakers. A collective of creative agents who operate with intention. Selective access. Real belonging.',
  },

  members: {
    heading: 'The Collective',
  },

  application: {
    heading: 'Application',
    closedTitle: 'Applications closed for now.',
    closedLine: 'We reply when it makes sense.',
  },

  form: {
    beforeApplyingPre: 'Before applying, ',
    beforeApplyingLink: 'read the manifesto',
    beforeApplyingPost: '. Whoever arrives without context, leaves without an answer.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    roleLabel: 'Field of work',
    rolePlaceholder: 'Photography, art direction, styling, music...',
    portfolioLabel: 'Portfolio or Link',
    portfolioOptional: '(optional)',
    portfolioPlaceholder: 'https://... or @handle',
    howLabel: 'How did you find us?',
    howPlaceholder: 'This answer says it all. Be honest.',
    formAriaLabel: 'Collective application form',
    submitCta: 'Submit your presence',
    submitLoading: 'Sending…',
    errors: {
      nameRequired: 'Name is required.',
      roleRequired: 'Field of work is required.',
      howRequired: 'How did you find us? It matters.',
      howMin: 'Tell us a bit more.',
      generic: 'Something failed.',
      connection: 'Connection error.',
    },
    success: {
      title: 'Presence registered.',
      line: 'We review and reply when it makes sense.',
      tag: '.TBF. Collective Hotel Casino',
    },
  },
}

const pt: typeof en = {
  meta: {
    title: 'Collective Hotel Casino',
    description:
      'Collective Hotel Casino. Somente para artistas e agentes de mudança. Candidature-se ao coletivo da .THE BRAZILIAN FACTORY.',
    ogTitle: 'Collective Hotel Casino | .THE BRAZILIAN FACTORY.',
    ogDescription: 'Only for artists & changemakers.',
  },

  hero: {
    eyebrow: '.TBF. inc',
    titleLine1: 'Collective',
    titleLine2: 'Hotel Casino.',
    deck: 'Only for artists & changemakers. Um coletivo de agentes criativos que operam com intenção. Acesso seletivo. Pertencimento real.',
  },

  members: {
    heading: 'O Coletivo',
  },

  application: {
    heading: 'Candidatura',
    closedTitle: 'Candidaturas encerradas por ora.',
    closedLine: 'Retornamos quando faz sentido.',
  },

  form: {
    beforeApplyingPre: 'Antes de candidatar-se, ',
    beforeApplyingLink: 'leia o manifesto',
    beforeApplyingPost: '. Quem chega sem contexto, sai sem resposta.',
    nameLabel: 'Nome',
    namePlaceholder: 'Seu nome',
    roleLabel: 'Área de atuação',
    rolePlaceholder: 'Fotografia, direção de arte, styling, música...',
    portfolioLabel: 'Portfolio ou Link',
    portfolioOptional: '(opcional)',
    portfolioPlaceholder: 'https://... ou @handle',
    howLabel: 'Como você chegou até aqui?',
    howPlaceholder: 'Essa resposta diz tudo. Seja honesto.',
    formAriaLabel: 'Formulário de candidatura ao coletivo',
    submitCta: 'Manda sua presença',
    submitLoading: 'Enviando…',
    errors: {
      nameRequired: 'Nome é obrigatório.',
      roleRequired: 'Área de atuação é obrigatória.',
      howRequired: 'Como você chegou aqui? Isso importa.',
      howMin: 'Elabore um pouco mais.',
      generic: 'Algo falhou.',
      connection: 'Erro de conexão.',
    },
    success: {
      title: 'Presença registrada.',
      line: 'Avaliamos e retornamos quando faz sentido.',
      tag: '.TBF. Collective Hotel Casino',
    },
  },
}

export const collective: Record<Lang, typeof en> = { en, pt }
