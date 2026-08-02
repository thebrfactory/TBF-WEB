// =============================================================================
// Dicionário da /contact-us. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Contact Us',
    description:
      "Let's make brave work for your brand. Open a channel with .THE BRAZILIAN FACTORY. São Paulo, Brazil.",
  },

  hero: {
    title: "Let's make brave work for your brand.",
    deck: "Tell us what you're building. Brands, press, collaborations and the unexpected. We read everything and reply when it makes sense.",
  },

  form: {
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
    title: 'Contact Us',
    description:
      'Vamos fazer trabalho corajoso pra sua marca. Abra um canal com a .THE BRAZILIAN FACTORY. São Paulo, Brasil.',
  },

  hero: {
    title: 'Vamos fazer trabalho corajoso pra sua marca.',
    deck: 'Conta o que você está construindo. Marcas, imprensa, colaborações e o inesperado. A gente lê tudo e responde quando faz sentido.',
  },

  form: {
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

export const contactUs: Record<Lang, typeof en> = { en, pt }
