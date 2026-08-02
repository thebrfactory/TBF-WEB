// =============================================================================
// Dicionário de ABOUT/QUICK-FACTS. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Quick Facts | .THE BRAZILIAN FACTORY.',
    description:
      'Key facts and figures about .THE BRAZILIAN FACTORY. Founding date, labels, location and company data.',
  },

  hero: {
    tag: 'Quick Facts',
    title: 'By the Numbers.',
    // "Key facts and figures about " + <strong>.THE BRAZILIAN FACTORY.</strong>
    deckPrefix: 'Key facts and figures about',
  },

  overview: {
    sectionLabel: 'Overview',
    items: [
      { label: 'Founded', value: '2025' },
      { label: 'Headquartered', value: 'São Paulo, Brazil' },
      { label: 'Active Labels', value: '4' },
      { label: 'Status', value: 'Active · Growing' },
    ] as { label: string; value: string }[],
  },

  activeLabels: {
    sectionLabel: 'Active Labels',
    items: [
      { code: '.TBF.', name: '.THE BRAZILIAN FACTORY.', focus: 'Editorial · Culture · Community' },
      { code: '.TFD.', name: '.THE FIORE DAILY.', focus: 'Wellness · Ritual · Feminine Expression' },
      { code: '.RUC.', name: '.RUNWAY UNTD COLLECTIVE.', focus: 'Fashion Film · Editorial · SPFW' },
      { code: '.TGF.', name: '.THE GROWTH FACTORY.', focus: 'Growth · Strategy · Business Development' },
    ] as { code: string; name: string; focus: string }[],
  },

  company: {
    sectionLabel: 'Company Information',
    items: [
      { label: 'Legal Name', value: '.TBF. INC' },
      { label: 'CNPJ', value: '61.360.565/0001-74' },
      { label: 'Address', value: 'R. Pamplona, 145. Jardim Paulista\nSão Paulo, SP. 01405-100\nBrasil' },
      { label: 'Website', value: 'thebrfactory.com' },
      { label: 'Main Instagram', value: '@thebrfactory' },
    ] as { label: string; value: string }[],
  },

  social: {
    sectionLabel: 'Social Media',
    items: [
      { handle: '@thebrfactory', platform: 'Instagram', href: 'https://instagram.com/thebrfactory' },
      { handle: '@thefioredaily', platform: 'Instagram', href: 'https://instagram.com/thefioredaily' },
      { handle: '@runwayunited', platform: 'Instagram', href: 'https://instagram.com/runwayunited' },
      { handle: '@factoryofgrowth', platform: 'Instagram', href: 'https://instagram.com/factoryofgrowth' },
    ] as { handle: string; platform: string; href: string }[],
  },
}

const pt: typeof en = {
  meta: {
    title: 'Dados Rápidos | .THE BRAZILIAN FACTORY.',
    description:
      'Principais dados e números sobre a .THE BRAZILIAN FACTORY. Data de fundação, labels, localização e dados da empresa.',
  },

  hero: {
    tag: 'Dados Rápidos',
    title: 'Em Números.',
    deckPrefix: 'Principais dados e números sobre a',
  },

  overview: {
    sectionLabel: 'Visão Geral',
    items: [
      { label: 'Fundação', value: '2025' },
      { label: 'Sede', value: 'São Paulo, Brasil' },
      { label: 'Labels Ativas', value: '4' },
      { label: 'Status', value: 'Ativa · Crescendo' },
    ],
  },

  activeLabels: {
    sectionLabel: 'Labels Ativas',
    items: [
      { code: '.TBF.', name: '.THE BRAZILIAN FACTORY.', focus: 'Editorial · Cultura · Comunidade' },
      { code: '.TFD.', name: '.THE FIORE DAILY.', focus: 'Bem-estar · Ritual · Expressão Feminina' },
      { code: '.RUC.', name: '.RUNWAY UNTD COLLECTIVE.', focus: 'Fashion Film · Editorial · SPFW' },
      { code: '.TGF.', name: '.THE GROWTH FACTORY.', focus: 'Growth · Estratégia · Desenvolvimento de Negócios' },
    ],
  },

  company: {
    sectionLabel: 'Informações da Empresa',
    items: [
      { label: 'Razão Social', value: '.TBF. INC' },
      { label: 'CNPJ', value: '61.360.565/0001-74' },
      { label: 'Endereço', value: 'R. Pamplona, 145. Jardim Paulista\nSão Paulo, SP. 01405-100\nBrasil' },
      { label: 'Site', value: 'thebrfactory.com' },
      { label: 'Instagram Principal', value: '@thebrfactory' },
    ],
  },

  social: {
    sectionLabel: 'Redes Sociais',
    items: [
      { handle: '@thebrfactory', platform: 'Instagram', href: 'https://instagram.com/thebrfactory' },
      { handle: '@thefioredaily', platform: 'Instagram', href: 'https://instagram.com/thefioredaily' },
      { handle: '@runwayunited', platform: 'Instagram', href: 'https://instagram.com/runwayunited' },
      { handle: '@factoryofgrowth', platform: 'Instagram', href: 'https://instagram.com/factoryofgrowth' },
    ],
  },
}

export const aboutQuickFacts: Record<Lang, typeof en> = { en, pt }
