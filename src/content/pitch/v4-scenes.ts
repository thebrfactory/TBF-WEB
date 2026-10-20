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

// ─── Cenas: 00 capa, 01 fundador (novo), 02 a 08 = as 7 da 3.0, 09 empresa (mesclada na 07)
export const SCENES_V4 = [
  { id: 'cena-00', pt: 'Capa', en: 'Cover', n: '00' },
  { id: 'cena-01', pt: 'O Fundador', en: 'The Founder', n: '01' },
  { id: 'cena-02', pt: 'Abertura', en: 'Opening', n: '02' },
  { id: 'cena-03', pt: 'Campo de Referência', en: 'Reference Field', n: '03' },
  { id: 'cena-04', pt: 'A Pergunta e a Tese', en: 'The Question and the Thesis', n: '04' },
  { id: 'cena-05', pt: 'Da Cultura ao Negócio', en: 'From Culture to Business', n: '05' },
  { id: 'cena-06', pt: 'Case Selecionado', en: 'Selected Case', n: '06' },
  { id: 'cena-07', pt: 'A Parceria e a Empresa', en: 'The Partnership and the Company', n: '07' },
  { id: 'cena-08', pt: 'Fecho', en: 'Close', n: '08' },
] as const

export const TOTAL_V4 = '08'

// ─── Timer ───────────────────────────────────────────────────────────────────
export const TIMER_SECONDS = 10 * 60

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
  // O PORTFÓLIO EM MOVIMENTO (pedido do fundador 20/10/2026: mínimo de texto,
  // máximo de imagem). Quatro colunas de quatro; todas são imagens que já
  // existem em /public e já aparecem em /creators/tavaristico. No celular só as
  // três primeiras colunas entram.
  reel: [
    [
      '/images/creators/tavaristico/arquiloucura/cover.webp',
      '/images/creators/tavaristico/hospitality/04-torcida.webp',
      '/images/creators/tavaristico/virtuosa/cover.webp',
      '/images/creators/tavaristico/o-18-years/cover.webp',
    ],
    [
      '/images/creators/tavaristico/spfw-the-paradise/cover.webp',
      '/images/creators/tavaristico/crush-coins/cover.webp',
      '/images/creators/tavaristico/hospitality/12-sax.webp',
      '/images/creators/tavaristico/charlotte/cover.webp',
    ],
    [
      '/images/creators/tavaristico/blackboah/cover.webp',
      '/images/creators/tavaristico/hospitality/02-mural-oste.webp',
      '/images/creators/tavaristico/tiger-capsule/cover.webp',
      '/images/creators/tavaristico/virtuosa/feed-05.webp',
    ],
    [
      '/images/creators/tavaristico/capsula-brasilidade/cover.webp',
      '/images/creators/tavaristico/hospitality/14-piscina.webp',
      '/images/creators/tavaristico/virtuosa/feed-01.webp',
      '/images/creators/tavaristico/tiger-capsule/03.webp',
    ],
  ] as readonly (readonly string[])[],
  // A jornada, em quatro passos. Cada linha existe em fonte publicada.
  // (Fora da tela desde 20/10/2026; o dado fica para voltar se pedirem.)
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
// TGF: foto de perfil oficial (TAV05, 00. TGF /PROFILE).
// Stories: vídeos tocam inteiros; o StoryPlayer espera o fim para avançar.
export interface VerticalStoryItem {
  src: string
  alt: string
  role: string
  /** Quadro em vídeo: `src` é o poster. Toca inteiro (o player espera o fim). */
  video?: { av1: string; h264: string; hasAudio?: boolean }
  /** Tempo do quadro em ms (só foto). */
  ms?: number
}

export interface VerticalStory {
  handle: string
  avatar: string
  avatarIsReal: boolean
  timeLabel?: string
  items: VerticalStoryItem[]
}

const SV = '/images/pitch/verticais/stories'
const VV = '/videos/pitch/verticais'
const clip = (name: string, alt: string, role: string, hasAudio = true): VerticalStoryItem => ({
  src: `${SV}/${name}.webp`,
  alt,
  role,
  video: { av1: `${VV}/${name}.av1.mp4`, h264: `${VV}/${name}.mp4`, hasAudio },
})

export const VERTICAL_STORIES: Record<string, VerticalStory> = {
  '.THE BRAZILIAN FACTORY.': {
    handle: 'thebrfactory',
    avatar: '/brand/TBF-AVATAR.webp',
    avatarIsReal: true,
    items: [
      clip('tbf-01', 'The Brazilian Factory, abertura', 'The Brazilian Factory'),
      clip('tbf-02', 'The Brazilian Factory, digital', 'The Brazilian Factory'),
      clip('tbf-03', 'The Brazilian Factory, filme', 'The Brazilian Factory'),
    ],
  },
  '.RUNWAY UNTD COLLECTIVE.': {
    handle: 'runwayunited',
    avatar: '/images/pitch/verticais/ruc-avatar.webp',
    avatarIsReal: true,
    items: [
      clip('ruc-01', 'Runway Untd, peça 1', 'Runway Untd'),
      clip('ruc-02', 'Runway Untd, peça 2', 'Runway Untd'),
      clip('ruc-03', 'Runway Untd, peça 3', 'Runway Untd'),
      clip('ruc-04', 'Runway Untd, peça 4', 'Runway Untd'),
    ],
  },
  '.THE FIORE DAILY.': {
    handle: 'thefioredaily',
    avatar: '/images/pitch/verticais/tfd-avatar.webp',
    avatarIsReal: true,
    items: [
      { src: `${SV}/tfd-01.webp`, alt: 'The Fiore Daily, branding', role: 'The Fiore Daily' },
      clip('tfd-02', 'The Fiore Daily, filme', 'The Fiore Daily'),
      clip('tfd-03', 'The Fiore Daily, produto', 'The Fiore Daily', false),
      { src: `${SV}/tfd-04.webp`, alt: 'The Fiore Daily, WhatsApp', role: 'The Fiore Daily' },
    ],
  },
  '.THE GROWTH FACTORY.': {
    handle: 'The Growth Factory',
    avatar: '/images/pitch/verticais/tgf-avatar.webp',
    avatarIsReal: true,
    items: [{ src: `${SV}/tgf-01.webp`, alt: 'The Growth Factory', role: 'The Growth Factory' }],
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
