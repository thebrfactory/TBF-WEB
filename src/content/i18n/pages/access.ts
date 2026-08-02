// =============================================================================
// Dicionário da /access. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Access',
    description:
      'Open a channel with .THE BRAZILIAN FACTORY. Editorial, Melfiore, Runway or The Growth Factory.',
    ogTitle: 'Access | .THE BRAZILIAN FACTORY.',
    ogDescription: 'Open a channel with .THE BRAZILIAN FACTORY.',
  },

  hero: {
    title: 'Open a channel.',
    deck: 'Select the entry point. Then write.',
  },

  entryPoints: [
    {
      value: 'tbf' as const,
      tag: '.TBF.',
      name: 'Editorial & Collaboration',
      desc: 'Editorial proposal, creative collaboration, content partnership.',
    },
    {
      value: 'melfiore' as const,
      tag: '.MELFIORE.',
      name: 'The Fiore Daily',
      desc: 'Intimacy, wellness, ritual curation and Mel Fiore collaborations.',
    },
    {
      value: 'ruc' as const,
      tag: '.RUC.',
      name: 'Runway Untd Collective',
      desc: 'Fashion films, fashion editorial, SPFW collaboration and backstage.',
    },
    {
      value: 'tgf' as const,
      tag: '.TGF.',
      name: 'The Growth Factory',
      desc: 'Business acceleration, strategic consulting, growth programs.',
    },
  ],

  form: {
    entryLegend: 'Entry Point',
    formHeading: 'The transmission',
    formAriaLabel: 'Contact form',
    nameLabel: 'Name',
    namePlaceholder: 'Your full name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@email.com',
    handleLabel: 'Handle or Link',
    handleOptional: '(optional)',
    handlePlaceholder: '@handle or https://...',
    messageLabel: 'Message',
    messagePlaceholder: 'What you want to say. No filter.',
    submitCta: 'Send the transmission',
    submitLoading: 'Sending…',
    collectiveLinkCta: 'Enter the Collective instead →',
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
      'Abra um canal com a .THE BRAZILIAN FACTORY. Editorial, Melfiore, Runway ou The Growth Factory.',
    ogTitle: 'Access | .THE BRAZILIAN FACTORY.',
    ogDescription: 'Abra um canal com a .THE BRAZILIAN FACTORY.',
  },

  hero: {
    title: 'Abra um canal.',
    deck: 'Selecione o ponto de entrada. Depois escreva.',
  },

  entryPoints: [
    {
      value: 'tbf',
      tag: '.TBF.',
      name: 'Editorial & Colaboração',
      desc: 'Proposta editorial, colaboração criativa, parceria de conteúdo.',
    },
    {
      value: 'melfiore',
      tag: '.MELFIORE.',
      name: 'The Fiore Daily',
      desc: 'Intimacy, wellness, curadoria de rituais e colaborações Mel Fiore.',
    },
    {
      value: 'ruc',
      tag: '.RUC.',
      name: 'Runway Untd Collective',
      desc: 'Fashion films, editorial de moda, colaboração SPFW e backstage.',
    },
    {
      value: 'tgf',
      tag: '.TGF.',
      name: 'The Growth Factory',
      desc: 'Aceleração de negócios, consultoria estratégica, programas de crescimento.',
    },
  ],

  form: {
    entryLegend: 'Ponto de Entrada',
    formHeading: 'A transmissão',
    formAriaLabel: 'Formulário de contato',
    nameLabel: 'Nome',
    namePlaceholder: 'Seu nome completo',
    emailLabel: 'E-mail',
    emailPlaceholder: 'seu@email.com',
    handleLabel: 'Handle ou Link',
    handleOptional: '(opcional)',
    handlePlaceholder: '@handle ou https://...',
    messageLabel: 'Mensagem',
    messagePlaceholder: 'O que você quer dizer. Sem filtro.',
    submitCta: 'Manda a transmissão',
    submitLoading: 'Enviando…',
    collectiveLinkCta: 'Entrar no Collective →',
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
      line: 'Retornamos quando faz sentido.',
      tag: '.TBF.',
    },
  },
}

export const access: Record<Lang, typeof en> = { en, pt }
