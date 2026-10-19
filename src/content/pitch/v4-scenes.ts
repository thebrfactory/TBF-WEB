// =============================================================================
// PITCH 4.0: CONTEÚDO NOVO E LISTA DE CENAS
// -----------------------------------------------------------------------------
// A 4.0 nasceu da 3.0 (pedido do fundador, CHANGES #01, 19/10/2026). O que não
// mudou continua em `v3-scenes.ts` e é importado de lá; aqui moram só as cenas
// que a 4.0 acrescenta (o fundador e a empresa) e o que cada vertical abre no
// layout padrão de stories. A 3.0 não é tocada.
//
// Todo fato do fundador vem de texto já publicado no repo:
//   about.ts (founder), tavaristico/_data.ts (IDENTITY, SPFW), v3-scenes.ts.
// Todo dado da empresa vem de `_SHARED/LEGAL-ACCOUNTING` e do `CLOSE.legal`.
// Nada inventado. Sem travessão nem en-dash.
// =============================================================================

import type { Bi } from './v3-scenes'

// ─── Cenas: 00 capa, 01 fundador (novo), 02 a 08 = as 7 da 3.0, 09 empresa (novo)
export const SCENES_V4 = [
  { id: 'cena-00', pt: 'Capa', en: 'Cover', n: '00' },
  { id: 'cena-01', pt: 'O Fundador', en: 'The Founder', n: '01' },
  { id: 'cena-02', pt: 'Abertura', en: 'Opening', n: '02' },
  { id: 'cena-03', pt: 'Campo de Referência', en: 'Reference Field', n: '03' },
  { id: 'cena-04', pt: 'A Pergunta e a Tese', en: 'The Question and the Thesis', n: '04' },
  { id: 'cena-05', pt: 'Da Cultura ao Negócio', en: 'From Culture to Business', n: '05' },
  { id: 'cena-06', pt: 'Case Selecionado', en: 'Selected Case', n: '06' },
  { id: 'cena-07', pt: 'A Parceria', en: 'The Partnership', n: '07' },
  { id: 'cena-08', pt: 'Fecho', en: 'Close', n: '08' },
  { id: 'cena-09', pt: 'A Empresa', en: 'The Company', n: '09' },
] as const

export const TOTAL_V4 = '09'

// ─── Timer ───────────────────────────────────────────────────────────────────
export const TIMER_SECONDS = 5 * 60

// ─── CENA 01: O FUNDADOR ─────────────────────────────────────────────────────
export const FOUNDER = {
  portrait: '/images/creators/tavaristico-portrait.webp',
  alt: 'Felipe Tavares, TAVARÍSTICO',
  name: 'Felipe Tavares',
  alias: 'TAVARÍSTICO',
  role: {
    pt: 'Fundador, CEO e Diretor Criativo da .TBF. inc',
    en: 'Founder, CEO and Creative Director of .TBF. inc',
  } as Bi,
  headline: {
    pt: ['Quem constrói a casa', 'vive a cultura.'],
    en: ['The one who builds the house', 'lives the culture.'],
  },
  // A jornada, em quatro passos. Cada linha existe em fonte publicada.
  journey: [
    {
      pt: 'Nascido em Salvador, Bahia, a capital do axé: solo sagrado e profano.',
      en: 'From Salvador, Bahia, the capital of axé: sacred and profane soil.',
    },
    {
      pt: 'Publicidade, design gráfico e conteúdo de marca. Hoje, Associate Creative Director e Art Director.',
      en: 'Advertising, graphic design and branded content. Today, Associate Creative Director and Art Director.',
    },
    {
      pt: 'Moda: Creative Director de Runway United Collective na São Paulo Fashion Week N58, em 2024.',
      en: 'Fashion: Creative Director of Runway United Collective at São Paulo Fashion Week N58, in 2024.',
    },
    {
      pt: 'Em 2025, a .TBF. inc, em São Paulo: marcas, produtos e negócios onde criatividade encontra tecnologia.',
      en: 'In 2025, .TBF. inc, in São Paulo: brands, products and businesses where creativity meets technology.',
    },
  ] as Bi[],
} as const

// ─── CENA 04 (verticais): stories e avatar de cada uma ──────────────────────
// Chave = `name` do item em BUSINESS.portfolio (v3-scenes.ts).
//
// AVATAR: foto de perfil do Instagram de .TBF., RUC (@runwayunited) e TFD
// (@thefioredaily), as duas últimas em 150px, o teto servido pela web.
// TGF ainda sem perfil informado: o anel usa uma imagem de capa da vertical.
export interface VerticalStory {
  handle: string
  avatar: string
  avatarIsReal: boolean
  timeLabel?: string
  items: { src: string; alt: string; role: string }[]
}

const STORIES = '/images/creators/tavaristico/stories'

export const VERTICAL_STORIES: Record<string, VerticalStory> = {
  '.THE BRAZILIAN FACTORY.': {
    handle: 'thebrfactory',
    avatar: '/brand/TBF-AVATAR.webp',
    avatarIsReal: true,
    items: [
      { src: `${STORIES}/brandsystem/01-marca.webp`, alt: 'BRANDSYSTEM, a marca', role: 'BRANDSYSTEM' },
      { src: `${STORIES}/brandsystem/02-conhecimento.webp`, alt: 'BRANDSYSTEM, o conhecimento da marca', role: 'BRANDSYSTEM' },
      { src: `${STORIES}/brandsystem/03-agente.webp`, alt: 'BRANDSYSTEM, o agente', role: 'BRANDSYSTEM' },
      { src: `${STORIES}/brandsystem/04-fluxo.webp`, alt: 'BRANDSYSTEM, o fluxo', role: 'BRANDSYSTEM' },
    ],
  },
  '.RUNWAY UNTD COLLECTIVE.': {
    handle: 'runwayunited',
    avatar: '/images/pitch/verticais/ruc-avatar.webp',
    avatarIsReal: true,
    items: [
      { src: `${STORIES}/runway-untd/01-passarela.webp`, alt: 'Runway Untd, a passarela', role: 'Runway Untd' },
      { src: `${STORIES}/runway-untd/02-bastidor.webp`, alt: 'Runway Untd, o bastidor', role: 'Runway Untd' },
      { src: `${STORIES}/runway-untd/03-retrato.webp`, alt: 'Runway Untd, retrato', role: 'Runway Untd' },
      { src: `${STORIES}/runway-untd/04-noite.webp`, alt: 'Runway Untd, a noite', role: 'Runway Untd' },
    ],
  },
  '.THE FIORE DAILY.': {
    handle: 'thefioredaily',
    avatar: '/images/pitch/verticais/tfd-avatar.webp',
    avatarIsReal: true,
    items: [
      { src: '/images/tfd/tfd-hero.webp', alt: 'The Fiore Daily', role: 'The Fiore Daily' },
      { src: '/images/tfd/tfd-closing.webp', alt: 'The Fiore Daily, fecho', role: 'The Fiore Daily' },
    ],
  },
  '.THE GROWTH FACTORY.': {
    handle: 'The Growth Factory',
    avatar: '/images/tgf/tgf-ambition.webp',
    avatarIsReal: false,
    items: [
      { src: '/images/tgf/tgf-ambition.webp', alt: 'The Growth Factory, ambição', role: 'The Growth Factory' },
      { src: '/images/tgf/tgf-momentum.webp', alt: 'The Growth Factory, momento', role: 'The Growth Factory' },
      { src: '/images/tgf/tgf-global.webp', alt: 'The Growth Factory, alcance global', role: 'The Growth Factory' },
    ],
  },
}

// ─── CENA 09: A EMPRESA ──────────────────────────────────────────────────────
// Fonte: `_SHARED/LEGAL-ACCOUNTING` (README, _sinteses/fiscal-societario.md,
// contabil/cadastro-contribuinte-mobiliario-sp.md). Razão social conforme
// `tbf-context.md`: `.TBF. inc`. O regime INOVA SIMPLES vai no texto `regimeText`
// (a linha de tabela do regime saiu para a cena caber em 390px sem tocar o passador).
export const COMPANY = {
  legalName: '.TBF. inc',
  regime: 'INOVA SIMPLES',
  cnpj: '61.360.565/0001-74',
  address: 'Rua Pamplona 145, Jardim Paulista, São Paulo, SP, 01405-900',
  headline: {
    pt: ['Uma startup,', 'registrada como startup.'],
    en: ['A startup,', 'registered as a startup.'],
  },
  regimeText: {
    pt: 'INOVA SIMPLES é o regime específico para startups. Entre as vantagens, prioridade no registro de propriedade intelectual no INPI.',
    en: 'INOVA SIMPLES is the specific regime for startups. Among its advantages, priority in intellectual property registration at INPI.',
  } as Bi,
  rows: [
    { label: { pt: 'Razão social', en: 'Legal name' } as Bi, value: '.TBF. inc' },
    { label: { pt: 'CNPJ', en: 'CNPJ' } as Bi, value: '61.360.565/0001-74' },
    {
      label: { pt: 'Sede', en: 'Headquarters' } as Bi,
      value: 'Rua Pamplona 145, Jardim Paulista, São Paulo, SP, 01405-900',
    },
  ],
} as const
