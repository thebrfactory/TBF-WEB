// =============================================================================
// Dicionário de /creators/tavaristico (índice + páginas de obra). Convenções:
// ../README.md
//
// Portfólio do fundador. NÃO se traduzem: nomes de projeto, nomes de cliente,
// títulos de obra e o texto de cada case (role/summary/description) — tudo
// isso mora em `_data.ts`, fora deste dicionário, e continua igual nos dois
// idiomas (ver observação no relatório final sobre esse corte). O que muda
// aqui é só o cromo: rótulos, aria-labels, a bio (que já tinha bioEN/bioPT em
// `_data.ts`) e os textos de contato.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Felipe Tavares (Tavarístico) · Portfolio',
    description:
      'Felipe Tavares, aka Tavarístico. Associate Creative Director / Art Director. Selected work. Represented by .TBF. inc.',
  },
  index: {
    akaPrefix: 'aka',
    role: 'Creative Director & Founder',
    heroStatement: 'I build brands, products and businesses where creativity meets technology.',
    location: 'Based in São Paulo. Originally from Bahia.',
    introHeadline: 'I build things.',
    introStatement:
      'My background is in advertising and creative direction. Today, I work across brands, products and businesses, exploring how technology and AI can turn ideas into new forms of value.',
    selectedWorkLabel: 'Selected Work',
    campaignsLabel: 'Selected Campaigns',
    campaignsCaseLabel: 'Selected Case',
    workLabel: 'Advertising, fashion & culture',
    whatIBuildLabel: 'What I Build',
    aboutLabel: 'About',
    aboutHeadline: 'I came from advertising.',
    aboutBody:
      "I built my career through creative direction, branding, fashion and culture. Today I'm exploring what happens when that creative practice meets product, business and AI.",
    exploringLabel: 'Currently Exploring',
    contactLabel: 'Contact',
    contactHeadline: "Let's build something.",
    instagramLabel: 'Instagram',
    linkedinLabel: 'LinkedIn',
    emailLabel: 'Email',
    githubLabel: 'GitHub',
    representedByPrefix: 'Represented by',
    // ENTRADA PARA A PROPOSTA DE HOSPEDAGEM (#01 CHANGES 2026-08-14). Fica no
    // bloco de contato, e não na vitrine de obras, porque não é obra: é oferta.
    // Na vitrine ela seria lida como mais um case e perderia o verbo.
    hospitalityKicker: 'Also available',
    hospitalityLabel: 'Photography for hostels, hotels and guesthouses',
  },
  gallery: {
    filterAriaLabel: 'Filter by discipline',
    all: 'All',
  },
  work: {
    crumb: '← Tavarístico · Work',
    roleLabel: 'Role',
    clientLabel: 'Client',
    disciplineLabel: 'Discipline',
    yearLabel: 'Year',
    lowResTag: 'preliminary cover, awaiting source file',
    prevLabel: 'Prev',
    nextLabel: 'Next',
    metaTitleSuffix: 'Tavarístico',
    fallbackTitle: 'Work · Tavarístico',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Felipe Tavares (Tavarístico) · Portfólio',
    description:
      'Felipe Tavares, conhecido como Tavarístico. Associate Creative Director / Art Director. Trabalhos selecionados. Representado pela .TBF. inc.',
  },
  index: {
    akaPrefix: 'conhecido como',
    role: 'Creative Director & Founder',
    heroStatement: 'Construo marcas, produtos e negócios onde criatividade encontra tecnologia.',
    location: 'Baseado em São Paulo. Originalmente da Bahia.',
    introHeadline: 'Eu construo coisas.',
    introStatement:
      'Venho da publicidade e da direção de arte. Hoje trabalho entre marcas, produtos e negócios, explorando como tecnologia e IA transformam ideias em novas formas de valor.',
    selectedWorkLabel: 'Trabalhos Selecionados',
    campaignsLabel: 'Campanhas Selecionadas',
    campaignsCaseLabel: 'Caso Selecionado',
    workLabel: 'Publicidade, moda e cultura',
    whatIBuildLabel: 'O Que Eu Construo',
    aboutLabel: 'Sobre',
    aboutHeadline: 'Vim da publicidade.',
    aboutBody:
      'Construí minha carreira através da direção de arte, branding, moda e cultura. Hoje exploro o que acontece quando essa prática criativa encontra produto, negócio e IA.',
    exploringLabel: 'Explorando Agora',
    contactLabel: 'Contato',
    contactHeadline: 'Vamos construir algo.',
    instagramLabel: 'Instagram',
    linkedinLabel: 'LinkedIn',
    emailLabel: 'Email',
    githubLabel: 'GitHub',
    representedByPrefix: 'Representado pela',
    hospitalityKicker: 'Também disponível',
    hospitalityLabel: 'Fotografia para hostels, hotéis e pousadas',
  },
  gallery: {
    filterAriaLabel: 'Filtrar por disciplina',
    all: 'Tudo',
  },
  work: {
    crumb: '← Tavarístico · Trabalhos',
    roleLabel: 'Papel',
    clientLabel: 'Cliente',
    disciplineLabel: 'Disciplina',
    yearLabel: 'Ano',
    lowResTag: 'capa preliminar, aguardando arquivo-fonte',
    prevLabel: 'Anterior',
    nextLabel: 'Próximo',
    metaTitleSuffix: 'Tavarístico',
    fallbackTitle: 'Obra · Tavarístico',
  },
}

export const tavaristico: Record<Lang, typeof en> = { en, pt }
