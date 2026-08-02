// =============================================================================
// Dicionário do CROMO do site — o que aparece em toda página.
// Layout, navegação, rodapé, newsletter, popup e aviso de cookies.
// Convenções e regras: ./README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  skipNav: 'Skip to main content',

  closing: {
    eyebrow: 'We are here to make an impact',
    headline: ["Let's make brave work", 'for your brand.'] as [string, string],
    cta: 'Contact Us',
  },

  nav: {
    home: 'Home',
    magazineShort: 'MAG',
    magazine: 'Magazine',
    login: 'Login',
    mainNav: 'Main navigation',
    mobileMenu: 'Mobile menu',
    navMenu: 'Navigation menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    search: 'Search',
    searchTitle: 'Search .TBF.',
    searchPlaceholder: 'Search .TBF.',
    searchQuery: 'Search query',
    closeSearch: 'Close search',
    escToClose: 'Press Esc to close',
    language: 'Language',
  },

  footer: {
    brandAlt: '.TBF. SÃO PAULO',
    tagline: ['Culture™', 'Crafted in São Paulo, Brazil.', 'Consumed Worldwide.'] as [string, string, string],
    columns: {
      pages: 'Pages',
      company: 'Company',
      legal: 'Legal',
    },
    links: {
      magazine: 'Magazine',
      labels: 'Labels',
      manifesto: 'Manifesto',
      collective: 'Collective',
      access: 'Access',
      pitch1: 'Pitch 1.0',
      pitch2: 'Pitch 2.0',
      consulting: 'Consulting',
      press: 'Press Room',
      about: 'About Us',
      quickFacts: 'Quick Facts',
      media: 'Media',
      founders: 'Founders',
      careers: 'Careers',
      publishing: 'Publishing',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      conduct: 'Code of Conduct',
      lawEnforcement: 'Law Enforcement Guidelines',
    },
  },
}

// O português repete as MESMAS chaves — o tipo abaixo obriga.
const pt: typeof en = {
  skipNav: 'Pular para o conteúdo',

  closing: {
    eyebrow: 'Estamos aqui para causar impacto',
    headline: ['Vamos fazer trabalho corajoso', 'para a sua marca.'],
    cta: 'Fale com a gente',
  },

  nav: {
    home: 'Início',
    magazineShort: 'MAG',
    magazine: 'Revista',
    login: 'Entrar',
    mainNav: 'Navegação principal',
    mobileMenu: 'Menu mobile',
    navMenu: 'Menu de navegação',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    search: 'Buscar',
    searchTitle: 'Buscar na .TBF.',
    searchPlaceholder: 'Buscar na .TBF.',
    searchQuery: 'Termo de busca',
    closeSearch: 'Fechar busca',
    escToClose: 'Aperte Esc para fechar',
    language: 'Idioma',
  },

  footer: {
    brandAlt: '.TBF. SÃO PAULO',
    tagline: ['Culture™', 'Feita em São Paulo, Brasil.', 'Consumida no mundo inteiro.'],
    columns: {
      pages: 'Páginas',
      company: 'Empresa',
      legal: 'Jurídico',
    },
    links: {
      magazine: 'Revista',
      labels: 'Labels',
      manifesto: 'Manifesto',
      collective: 'Collective',
      access: 'Acesso',
      pitch1: 'Pitch 1.0',
      pitch2: 'Pitch 2.0',
      consulting: 'Consultoria',
      press: 'Sala de Imprensa',
      about: 'Sobre',
      quickFacts: 'Em Números',
      media: 'Mídia',
      founders: 'Fundadores',
      careers: 'Carreiras',
      publishing: 'Publishing',
      terms: 'Termos de Uso',
      privacy: 'Política de Privacidade',
      conduct: 'Código de Conduta',
      lawEnforcement: 'Diretrizes para Autoridades',
    },
  },
}

export const shell: Record<Lang, typeof en> = { en, pt }
