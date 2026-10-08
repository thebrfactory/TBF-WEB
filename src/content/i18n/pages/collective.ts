// =============================================================================
// Dicionário da /collective. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Collective',
    description:
      "The .TBF. Collective. Artists, makers, thinkers and founders who make culture move. Apply with what you're building.",
    ogTitle: 'Collective | .THE BRAZILIAN FACTORY.',
    ogDescription: 'The Factory has a floor.',
  },

  hero: {
    eyebrow: '.TBF. Collective',
    titleLine1: 'The Factory',
    titleLine2: 'has a floor.',
    deck: 'Artists, makers, thinkers, founders and changemakers building what comes next.',
  },

  floor: {
    body: "Warhol's Factory had silver walls. What people remember is who came through the door.",
    line: 'The Labels build worlds. The Collective fills them with people.',
  },

  who: {
    heading: 'Who walks in',
    list: 'Artists. Makers. Thinkers. Founders. Changemakers. Allies.',
    line: "We don't count followers. We look at what you move.",
  },

  inside: {
    items: [
      { name: 'Access', desc: 'People, projects and closed calls before they go public.' },
      { name: 'Collaboration', desc: 'Work with each other and with the Labels.' },
      { name: 'Visibility', desc: 'Your work documented and published by the Zine.' },
      { name: 'Signals', desc: "Field research and references while they're still early." },
    ],
    closing: 'Clubs sell access. The Collective asks what you bring. Belonging is earned by contribution.',
  },

  members: {
    heading: 'The Collective',
  },

  application: {
    heading: 'What are you building?',
    closedTitle: 'Applications closed for now.',
    closedLine: 'We reply when it makes sense.',
  },

  form: {
    beforeApplyingPre: 'Before applying, ',
    beforeApplyingLink: 'read the manifesto',
    beforeApplyingPost: '. Whoever arrives without context leaves without an answer.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    roleLabel: 'What do you make?',
    rolePlaceholder: 'Photography, art direction, styling, music...',
    lookingLabel: 'What are you looking for?',
    bringLabel: 'What can you bring to the Collective?',
    portfolioLabel: 'Where can we see your work?',
    portfolioOptional: '(optional)',
    portfolioPlaceholder: 'https://... or @handle',
    howLabel: 'How did you find us?',
    howPlaceholder: 'This answer says it all. Be honest.',
    formAriaLabel: 'Collective application form',
    submitCta: 'Submit your presence',
    submitLoading: 'Sending…',
    errors: {
      nameRequired: 'Name is required.',
      roleRequired: 'Tell us what you make.',
      howRequired: 'How did you find us? It matters.',
      howMin: 'Tell us a bit more.',
      generic: 'Something failed.',
      connection: 'Connection error.',
    },
    success: {
      title: 'Presence registered.',
      line: 'We review and reply when it makes sense.',
      tag: '.TBF. Collective',
    },
  },

  closing: 'The Factory has a floor. We\'re filling it with people.',
}

const pt: typeof en = {
  meta: {
    title: 'Collective',
    description:
      'O .TBF. Collective. Artistas, makers, pensadores e founders que fazem a cultura andar. Entre com o que você está construindo.',
    ogTitle: 'Collective | .THE BRAZILIAN FACTORY.',
    ogDescription: 'A Factory tem um chão.',
  },

  hero: {
    eyebrow: '.TBF. Collective',
    titleLine1: 'A Factory',
    titleLine2: 'tem um chão.',
    deck: 'Artistas, makers, pensadores, founders e changemakers construindo o que vem depois.',
  },

  floor: {
    body: 'A Factory de Warhol tinha paredes prateadas. O que ficou foi quem entrou pela porta.',
    line: 'As Labels constroem mundos. O Collective enche esses mundos de gente.',
  },

  who: {
    heading: 'Quem entra',
    list: 'Artists. Makers. Thinkers. Founders. Changemakers. Allies.',
    line: 'A gente não conta seguidor. Olha o que você move.',
  },

  inside: {
    items: [
      { name: 'Access', desc: 'Gente, projetos e chamadas fechadas antes de virarem públicos.' },
      { name: 'Collaboration', desc: 'Trabalho entre membros e com as Labels.' },
      { name: 'Visibility', desc: 'Seu trabalho documentado e publicado pelo Zine.' },
      { name: 'Signals', desc: 'Pesquisa de campo e referências enquanto ainda é cedo.' },
    ],
    closing: 'Clube vende acesso. O Collective pergunta o que você traz. Pertencimento se ganha contribuindo.',
  },

  members: {
    heading: 'O Coletivo',
  },

  application: {
    heading: 'O que você está construindo?',
    closedTitle: 'Candidaturas fechadas por ora.',
    closedLine: 'A gente responde quando faz sentido.',
  },

  form: {
    beforeApplyingPre: 'Antes de se candidatar, ',
    beforeApplyingLink: 'leia o manifesto',
    beforeApplyingPost: '. Quem chega sem contexto sai sem resposta.',
    nameLabel: 'Nome',
    namePlaceholder: 'Seu nome',
    roleLabel: 'O que você faz?',
    rolePlaceholder: 'Fotografia, direção de arte, styling, música...',
    lookingLabel: 'O que você procura?',
    bringLabel: 'O que você traz para o Collective?',
    portfolioLabel: 'Onde a gente vê seu trabalho?',
    portfolioOptional: '(opcional)',
    portfolioPlaceholder: 'https://... ou @handle',
    howLabel: 'Como você chegou até aqui?',
    howPlaceholder: 'Essa resposta diz tudo. Seja honesto.',
    formAriaLabel: 'Formulário de candidatura ao coletivo',
    submitCta: 'Registrar presença',
    submitLoading: 'Enviando…',
    errors: {
      nameRequired: 'Nome é obrigatório.',
      roleRequired: 'Diga o que você faz.',
      howRequired: 'Como você chegou aqui? Isso importa.',
      howMin: 'Elabore um pouco mais.',
      generic: 'Algo falhou.',
      connection: 'Erro de conexão.',
    },
    success: {
      title: 'Presença registrada.',
      line: 'A gente lê e responde quando faz sentido.',
      tag: '.TBF. Collective',
    },
  },

  closing: 'A Factory tem um chão. A gente está enchendo de gente.',
}

export const collective: Record<Lang, typeof en> = { en, pt }
