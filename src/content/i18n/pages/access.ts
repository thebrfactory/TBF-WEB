// =============================================================================
// Dicionário da /access. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Access',
    description:
      "Open a channel with .THE BRAZILIAN FACTORY. Tell us what you're building. We find the right place inside the Factory.",
    ogTitle: 'Access | .THE BRAZILIAN FACTORY.',
    ogDescription: "You don't need to know where you belong.",
  },

  hero: {
    title: 'Open a channel.',
    deck: "You don't need to know where you belong. Tell us what you're building.",
    list: 'A brand. A story. A film. A business. A world.',
  },

  destinations: {
    lead: "Already know where you're going?",
    items: [
      { tag: '.TBF.', href: '/zine' },
      { tag: '.TFD.', href: '/labels/thefioredaily' },
      { tag: '.RUC.', href: '/labels/runwayunited' },
      { tag: '.TGF.', href: '/labels/factoryofgrowth' },
    ],
  },

  closing: 'The door is open. The signal is yours.',

  entryPoints: [
    {
      value: 'build' as const,
      name: 'BUILD',
      desc: 'Business, strategy, growth, technology.',
    },
    {
      value: 'create' as const,
      name: 'CREATE',
      desc: 'Creative direction, production, fashion, image.',
    },
    {
      value: 'publish' as const,
      name: 'PUBLISH',
      desc: 'Editorial, research, photography, writing.',
    },
    {
      value: 'collaborate' as const,
      name: 'COLLABORATE',
      desc: 'Brands, projects, events, cultural partnerships.',
    },
    {
      value: 'join' as const,
      name: 'JOIN',
      desc: 'The Collective has its own door. →',
      href: '/collective',
    },
  ],

  form: {
    entryLegend: 'Your intention',
    helper: 'Choose one. We find the right place inside the Factory.',
    formHeading: "What are you building?",
    formAriaLabel: 'Contact form',
    nameLabel: 'Name',
    namePlaceholder: 'Your full name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@email.com',
    handleLabel: 'Where can we see your work?',
    handleOptional: '(optional)',
    handlePlaceholder: '@handle or https://...',
    messageLabel: "What are you building?",
    messagePlaceholder: 'The project, the problem or the opportunity. Be specific.',
    whyLabel: 'Why .TBF.?',
    bringLabel: 'What do you bring to the table?',
    submitCta: 'Send the transmission',
    submitLoading: 'Sending…',
    collectiveLinkCta: 'Looking for the Collective? →',
    errors: {
      nameRequired: 'Name is required.',
      emailRequired: 'Email is required.',
      emailInvalid: 'Invalid email.',
      messageRequired: 'Message is required.',
      messageMin: 'Tell us more. Minimum 20 characters.',
      generic: 'Something failed. Try again.',
      connection: 'Connection error. Try again.',
    },
    success: {
      title: 'Channel open.',
      line: 'We reply when it makes sense.',
      tag: '.TBF.',
    },
  },
}

const pt: typeof en = {
  meta: {
    title: 'Access',
    description:
      'Abra um canal com a .THE BRAZILIAN FACTORY. Diga o que você está construindo. A gente acha o lugar certo dentro da Factory.',
    ogTitle: 'Access | .THE BRAZILIAN FACTORY.',
    ogDescription: 'Você não precisa saber onde se encaixa.',
  },

  hero: {
    title: 'Abra um canal.',
    deck: 'Você não precisa saber onde se encaixa. Diga o que está construindo.',
    list: 'Uma marca. Uma história. Um filme. Um negócio. Um mundo.',
  },

  destinations: {
    lead: 'Já sabe para onde vai?',
    items: [
      { tag: '.TBF.', href: '/zine' },
      { tag: '.TFD.', href: '/labels/thefioredaily' },
      { tag: '.RUC.', href: '/labels/runwayunited' },
      { tag: '.TGF.', href: '/labels/factoryofgrowth' },
    ],
  },

  closing: 'A porta está aberta. O sinal é seu.',

  entryPoints: [
    {
      value: 'build',
      name: 'BUILD',
      desc: 'Negócio, estratégia, crescimento, tecnologia.',
    },
    {
      value: 'create',
      name: 'CREATE',
      desc: 'Direção criativa, produção, moda, imagem.',
    },
    {
      value: 'publish',
      name: 'PUBLISH',
      desc: 'Editorial, pesquisa, fotografia, texto.',
    },
    {
      value: 'collaborate',
      name: 'COLLABORATE',
      desc: 'Marcas, projetos, eventos, parcerias culturais.',
    },
    {
      value: 'join',
      name: 'JOIN',
      desc: 'O Collective tem porta própria. →',
      href: '/collective',
    },
  ],

  form: {
    entryLegend: 'Sua intenção',
    helper: 'Escolha uma. A gente acha o lugar certo dentro da Factory.',
    formHeading: 'O que você está construindo?',
    formAriaLabel: 'Formulário de contato',
    nameLabel: 'Nome',
    namePlaceholder: 'Seu nome completo',
    emailLabel: 'E-mail',
    emailPlaceholder: 'seu@email.com',
    handleLabel: 'Onde a gente vê seu trabalho?',
    handleOptional: '(opcional)',
    handlePlaceholder: '@handle ou https://...',
    messageLabel: 'O que você está construindo?',
    messagePlaceholder: 'O projeto, o problema ou a oportunidade. Seja específico.',
    whyLabel: 'Por que a .TBF.?',
    bringLabel: 'O que você traz para a mesa?',
    submitCta: 'Enviar a transmissão',
    submitLoading: 'Enviando…',
    collectiveLinkCta: 'Procurando o Collective? →',
    errors: {
      nameRequired: 'Nome é obrigatório.',
      emailRequired: 'E-mail é obrigatório.',
      emailInvalid: 'E-mail inválido.',
      messageRequired: 'Mensagem é obrigatória.',
      messageMin: 'Conta mais. Mínimo 20 caracteres.',
      generic: 'Algo falhou. Tente novamente.',
      connection: 'Erro de conexão. Tente novamente.',
    },
    success: {
      title: 'Canal aberto.',
      line: 'A gente responde quando faz sentido.',
      tag: '.TBF.',
    },
  },
}

export const access: Record<Lang, typeof en> = { en, pt }
