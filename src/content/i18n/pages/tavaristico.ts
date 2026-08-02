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
    eyebrow: 'Creators · Portfolio',
    akaPrefix: 'aka',
    contactLabel: 'Contact',
    contactHeadline: "Let's make brave work.",
    instagramLabel: 'Instagram ↗',
    linkedinLabel: 'LinkedIn ↗',
    representedByPrefix: 'Represented by',
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
    eyebrow: 'Criadores · Portfólio',
    akaPrefix: 'conhecido como',
    contactLabel: 'Contato',
    contactHeadline: 'Vamos fazer trabalho corajoso.',
    instagramLabel: 'Instagram ↗',
    linkedinLabel: 'LinkedIn ↗',
    representedByPrefix: 'Representado pela',
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
