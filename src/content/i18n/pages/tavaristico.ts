// =============================================================================
// Dicionário de /creators/tavaristico (índice + páginas de obra). Convenções:
// ../README.md
//
// Portfólio do fundador. NÃO se traduzem: nomes de projeto, nomes de cliente,
// títulos de obra e o texto de cada case (role/summary/description): tudo
// isso mora em `_data.ts`, fora deste dicionário, e continua igual nos dois
// idiomas (ver observação no relatório final sobre esse corte). O que muda
// aqui é só o cromo: rótulos, aria-labels, a bio (que já tinha bioEN/bioPT em
// `_data.ts`) e os textos de contato.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'TAVARÍSTICO · Portfolio',
    description:
      'TAVARÍSTICO. Associate Creative Director / Art Director. Selected work. Represented by .TBF. inc.',
  },
  index: {
    // A.K.A., correção 09/09/2026: "aka" virou sigla pontuada nos dois
    // idiomas, pedido do fundador.
    akaPrefix: 'A.K.A.',
    role: 'Creative Director & Founder',
    // Correção 10/09/2026 (rodada 7, item 4): a frase de entrada virou o par
    // da referência que ele mandou (bold caixa alta em cima, thin minúsculo
    // embaixo). Mesmas palavras de antes, partidas em duas linhas: nada de
    // copy nova, só o contraste tipográfico que ele aprovou.
    // Quebras FIXAS em todo viewport (pedido 09/10/2026): uma entrada por linha.
    heroHeadline: ['I build brands,', 'products', 'and businesses'],
    heroStatement: ['where creativity', 'meets technology.'],
    // Localização quebrada em duas frases (correção 09/09/2026): cada uma
    // vira uma linha no hero, sem depender de <br/> hardcoded no texto.
    locationCity: 'Based in São Paulo.',
    locationOrigin: 'Originally from Bahia.',
    introHeadline: 'I build things.',
    introStatement:
      'My background is in advertising and creative direction. Today, I work across brands, products and businesses, exploring how technology and AI can turn ideas into new forms of value.',
    selectedWorkLabel: 'Selected Work',
    // Título de campanhas, correção 09/09/2026: o convite entra no próprio
    // título, em itálico, e sai do componente Campaigns (inviteLabel="").
    campaignsLabel: 'Selected Campaigns',
    campaignsParenthetical: '(tap to open)',
    campaignsCaseLabel: 'Selected Case',
    campaignsInvite: 'Tap to open the project',
    workLabel: 'Advertising, fashion & culture',
    whatIBuildLabel: 'What I Build',
    aboutLabel: 'About',
    careerLabel: 'Career',
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
    // ENTRADA PARA A PROPOSTA DE HOSPEDAGEM (#01 CHANGES 2026-08-14). Fica no
    // bloco de contato, e não na vitrine de obras, porque não é obra: é oferta.
    // Na vitrine ela seria lida como mais um case e perderia o verbo.
    // Correção 09/09/2026: vira um card de "próxima leitura" (NextRead), não
    // mais um link solto. kicker/label continuam, + support e cta novos.
    hospitalityKicker: 'Also available',
    hospitalityLabel: 'Photography for hostels, hotels and guesthouses',
    hospitalitySupport: 'A portfolio built for hospitality brands, shot by Tavarístico.',
    hospitalityCta: 'See the work',
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
    title: 'TAVARÍSTICO · Portfólio',
    description:
      'TAVARÍSTICO. Associate Creative Director / Art Director. Trabalhos selecionados. Representado pela .TBF. inc.',
  },
  index: {
    akaPrefix: 'A.K.A.',
    role: 'Creative Director & Founder',
    heroHeadline: ['Construo marcas,', 'produtos', 'e negócios'],
    heroStatement: ['onde criatividade', 'encontra tecnologia.'],
    locationCity: 'Baseado em São Paulo.',
    locationOrigin: 'Originalmente da Bahia.',
    introHeadline: 'Eu construo coisas.',
    introStatement:
      'Venho da publicidade e da direção de arte. Hoje trabalho entre marcas, produtos e negócios, explorando como tecnologia e IA transformam ideias em novas formas de valor.',
    selectedWorkLabel: 'Trabalhos Selecionados',
    campaignsLabel: 'Campanhas Selecionadas',
    campaignsParenthetical: '(toque para abrir)',
    campaignsCaseLabel: 'Caso Selecionado',
    campaignsInvite: 'Toque para abrir o projeto',
    workLabel: 'Publicidade, moda e cultura',
    whatIBuildLabel: 'O Que Eu Construo',
    aboutLabel: 'Sobre',
    careerLabel: 'Carreira',
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
    hospitalityKicker: 'Também disponível',
    hospitalityLabel: 'Fotografia para hostels, hotéis e pousadas',
    hospitalitySupport: 'Um portfólio feito para marcas de hospitalidade, fotografado pelo Tavarístico.',
    hospitalityCta: 'Ver o trabalho',
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
