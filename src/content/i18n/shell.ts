// =============================================================================
// Dicionário do CROMO do site, o que aparece em toda página.
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
    magazineShort: 'ZINE',
    magazine: 'Zine',
    login: 'Login',
    // Linha sob o LOGIN dentro do menu. O acesso ao brandsystem nao e um item
    // de lista como os outros: e porta de assinante, e diz isso em voz baixa.
    loginNote: 'Members only',
    // Rotulo do grupo dentro do menu, no desenho do 032c: rotulo pequeno em
    // cima, itens grandes embaixo.
    menuGroupRead: 'Read',
    // Itens do menu overlay. Nomes de marca: ficam em ingles no PT tambem.
    menuAbout: 'About',
    menuShop: 'Shop',
    menuTalks: 'Talks',
    menuAgency: 'Agency',
    logoAriaLabel: '.THE BRAZILIAN FACTORY.',
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

  // Rodapé no chamado da newsletter (MailingList). Mesmas frases de fundo do
  // popup sitewide (NewsletterPopup), chaves separadas de propósito: os dois
  // textos podem divergir no futuro sem se atrapalhar.
  mailing: {
    eyebrow: 'Join our mailing list',
    headlineLine1: 'Get the best stories',
    // Contém o literal ".TBF." de propósito, o componente separa a frase
    // nesse ponto pra deixar só a marca em negrito, sem markup no dicionário.
    headlineLine2: 'from .TBF. community.',
    successMessage: "You're in. Welcome to the factory.",
    emailPlaceholder: 'Email address',
    emailAriaLabel: 'Email address',
    submitLabel: 'Subscribe',
    privacyPrefix: 'By subscribing, you agree to our ',
    genericError: 'Something went wrong. Please try again.',
  },

  // Popup sitewide de captura de e-mail (NewsletterPopup), 20s de permanência.
  popup: {
    closeAriaLabel: 'Close',
    headlineLine1: 'Get the best stories',
    headlineLine2: 'from .TBF. community.',
    successMessage: "You're in. Welcome to the factory.",
    emailPlaceholder: 'Email address',
    emailAriaLabel: 'Email address',
    submitLabel: 'Subscribe',
    privacyPrefix: 'By subscribing, you agree to our ',
    // Aviso de nova guia: o link da política abre fora da página atual, e quem
    // clica precisa saber disso ANTES (pedido do fundador 2026-08-08).
    newTabNotice: '(new tab)',
  },

  // Aviso de cookies (CookieBanner) + botão de reabertura no rodapé
  // (CookiePrefsButton). O inglês aqui foi ESCRITO agora (2026-08-02), o
  // banner vivia inteiro em português, inclusive no site em inglês. Ver README
  // desta pasta e o relato da leva de i18n do cromo.
  cookies: {
    dialogAriaLabel: 'Cookie notice',
    necessaryAriaLabel: 'Necessary cookies (always active)',
    necessaryLabel: 'Necessary',
    necessaryText: ': essential for the site to work. Always active.',
    analyticsLabel: 'Analytics',
    analyticsText: ': help us understand how the site is used (Vercel and Google Analytics, no profiling).',
    savePrefs: 'Save preferences',
    acceptAll: 'Accept cookies',
    rejectOptional: 'Reject optional',
    textPrefix: 'We use cookies to improve your experience. By continuing, you agree to our ',
    prefsToggle: 'Cookie preferences',
    footerButton: 'Cookie Preferences',
  },

  footer: {
    brandAlt: '.TBF. SÃO PAULO',
    tagline: ['Culture™', 'Crafted in São Paulo, Brazil.', 'Consumed worldwide.'] as [string, string, string],
    columns: {
      pages: 'Pages',
      company: 'Company',
      legal: 'Legal',
    },
    links: {
      magazine: 'Zine',
      labels: 'Labels',
      manifesto: 'Manifesto',
      collective: 'Collective',
      access: 'Access',
      pitch: 'Pitch',
      consulting: 'Consulting',
      press: 'Press Room',
      about: 'About Us',
      quickFacts: 'Quick Facts',
      media: 'Media',
      creators: 'Creators',
      brandTech: 'Brand Tech',
      careers: 'Careers',
      publishing: 'Publishing',
      shop: 'Shop',
      talks: 'Talks',
      agency: 'Agency',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      conduct: 'Code of Conduct',
      lawEnforcement: 'Law Enforcement Guidelines',
      compliance: 'Compliance',
    },
  },
}

// O português repete as MESMAS chaves, o tipo abaixo obriga.
const pt: typeof en = {
  skipNav: 'Pular para o conteúdo',

  closing: {
    // O OLHO PERDEU A PALAVRA "IMPACTO" (#01 CHANGES 2026-08-24, pedido dele no
    // mesmo turno). Com o fecho novo terminando em "em impacto", o olho logo
    // acima repetia a palavra a duas linhas de distância. O inglês não tem o
    // problema: lá o fecho é "brave work for your brand", então "impact" no
    // olho continua sendo a única vez que a palavra aparece.
    eyebrow: 'Estamos aqui para fazer acontecer',
    // TRADUÇÃO REFEITA pelo fundador (#01 CHANGES 2026-08-24: "essa descrição
    // traduzida para português está muito ruim"). O inglês continua sendo
    // "Let's make brave work for your brand.": ele corrigiu o português, não a
    // frase. As duas linhas são a quebra da tipografia, não duas frases.
    headline: ['Vamos transformar ideias', 'em impacto.'],
    cta: 'Fale com a gente',
  },

  nav: {
    home: 'Início',
    magazineShort: 'ZINE',
    magazine: 'Zine',
    login: 'Entrar',
    loginNote: 'Só para assinantes',
    menuGroupRead: 'Leitura',
    menuAbout: 'About',
    menuShop: 'Shop',
    menuTalks: 'Talks',
    menuAgency: 'Agency',
    logoAriaLabel: '.THE BRAZILIAN FACTORY.',
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

  mailing: {
    eyebrow: 'Assine nossa newsletter',
    headlineLine1: 'As melhores histórias',
    headlineLine2: 'da comunidade .TBF.',
    successMessage: 'Pronto. Bem-vindo à fábrica.',
    emailPlaceholder: 'Endereço de e-mail',
    emailAriaLabel: 'Endereço de e-mail',
    submitLabel: 'Inscrever-se',
    privacyPrefix: 'Ao se inscrever, você concorda com a nossa ',
    genericError: 'Algo deu errado. Tente de novo.',
  },

  popup: {
    closeAriaLabel: 'Fechar',
    headlineLine1: 'As melhores histórias',
    headlineLine2: 'da comunidade .TBF.',
    successMessage: 'Pronto. Bem-vindo à fábrica.',
    emailPlaceholder: 'Endereço de e-mail',
    emailAriaLabel: 'Endereço de e-mail',
    submitLabel: 'Inscrever-se',
    privacyPrefix: 'Ao se inscrever, você concorda com a nossa ',
    newTabNotice: '(nova guia)',
  },

  // Texto ORIGINAL do banner, só movido pro dicionário, nenhuma palavra
  // mudou (pedido explícito: manter o PT como está).
  cookies: {
    dialogAriaLabel: 'Aviso de cookies',
    necessaryAriaLabel: 'Cookies necessários (sempre ativos)',
    necessaryLabel: 'Necessários',
    necessaryText: ': essenciais para o funcionamento do site. Sempre ativos.',
    analyticsLabel: 'Analytics',
    analyticsText: ': nos ajudam a entender como o site é usado (Vercel e Google Analytics, sem perfilamento).',
    savePrefs: 'Salvar preferências',
    acceptAll: 'Aceitar cookies',
    rejectOptional: 'Rejeitar opcionais',
    textPrefix: 'Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com a ',
    prefsToggle: 'Preferências de cookies',
    footerButton: 'Preferências de Cookies',
  },

  footer: {
    brandAlt: '.TBF. SÃO PAULO',
    // Tagline fica em ingles tambem no PT: e assinatura de marca (08/10/2026).
    tagline: ['Culture™', 'Crafted in São Paulo, Brazil.', 'Consumed worldwide.'],
    columns: {
      pages: 'Páginas',
      company: 'Empresa',
      legal: 'Jurídico',
    },
    links: {
      magazine: 'Zine',
      labels: 'Labels',
      manifesto: 'Manifesto',
      collective: 'Collective',
      access: 'Access',
      pitch: 'Pitch',
      consulting: 'Consulting',
      press: 'Press Room',
      about: 'About Us',
      quickFacts: 'Quick Facts',
      media: 'Media',
      creators: 'Creators',
      brandTech: 'Brand Tech',
      careers: 'Careers',
      publishing: 'Publishing',
      shop: 'Shop',
      talks: 'Talks',
      agency: 'Agency',
      terms: 'Termos de Uso',
      privacy: 'Política de Privacidade',
      conduct: 'Código de Conduta',
      lawEnforcement: 'Diretrizes para Autoridades',
      compliance: 'Compliance',
    },
  },
}

export const shell: Record<Lang, typeof en> = { en, pt }
