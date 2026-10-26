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

// ─── Cenas (rodada 23/10: deck enxuto, 8 telas) ─────────────────────────────
// Rodada 26/10 tarde: 07 telas viraram 06. A pergunta e a tese (antiga 04) foram
// para DENTRO da abertura (02), por toque. Ordem atual: 00 capa, 01 fundador,
// 02 abertura e tese (revelacao por clique), 03 referencia, 04 as quatro frentes
// (cada uma abre em tela cheia), 05 case, 06 parceiros e fecho.
// (Texto abaixo e da rodada 23/10, com a numeracao antiga.) Saiu a cena de mercado (o essencial foi
// para a 04), a cena "como cada vertical ganha" (virou papel de cada frente na 05)
// e a cena "o que construimos juntos" (os marcos foram para a 07).
// Sem captacao, sem valor, sem equity, sem numero de receita ou cliente.
export const SCENES_V4 = [
  { id: 'cena-00', pt: 'Capa', en: 'Cover', n: '00' },
  { id: 'cena-01', pt: 'O Fundador', en: 'The Founder', n: '01' },
  { id: 'cena-02', pt: 'Abertura e Tese', en: 'Opening and Thesis', n: '02' },
  { id: 'cena-03', pt: 'Campo de Referência', en: 'Reference Field', n: '03' },
  { id: 'cena-04', pt: 'Da Cultura ao Negócio', en: 'From Culture to Business', n: '04' },
  { id: 'cena-05', pt: 'Case Selecionado', en: 'Selected Case', n: '05' },
  { id: 'cena-06', pt: 'Parceiros e Fecho', en: 'Partners and Close', n: '06' },
] as const

export const TOTAL_V4 = '06'

// ─── Timer ───────────────────────────────────────────────────────────────────
export const TIMER_SECONDS = 10 * 60

// ─── Mosaico do fundador: tipos e atalhos ────────────────────────────────────
export type ReelTile =
  | { kind: 'img'; src: string; ar: string }
  | { kind: 'info'; big: string; sub: string; line: Bi; tone: 'accent' | 'paper' | 'dark'; ar: string }

const TV = '/images/creators/tavaristico'
const img = (path: string, w: number, h: number): ReelTile => ({
  kind: 'img',
  src: `${TV}/${path}.webp`,
  ar: `${w} / ${h}`,
})
const info = (big: string, sub: string | number, line: Bi, tone: 'accent' | 'paper' | 'dark'): ReelTile => ({
  kind: 'info',
  big,
  sub: String(sub),
  line,
  tone,
  ar: '1 / 1',
})

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
  // O PORTFÓLIO EM MOVIMENTO (20/10/2026, ampliado em 22/10/2026; 11 peças saíram na
  // aprovação de 26/10 noite): cinco
  // colunas de doze quadros (rodada 23/10), esteira vertical. As imagens são as peças ATUAIS do
  // portfólio (capas e galerias de `creators/tavaristico/_data.ts`, incluindo as
  // capas novas de The Fashion Backstage, Tiger Capsule e Virtuosa) mais as
  // peças de campanha e de marca. `ar` é a proporção REAL do arquivo (nada é
  // cortado). Os quadros `info` são peças tipográficas com fato já publicado
  // (papel, cliente, ano). No celular entram as duas primeiras colunas; no desktop, as cinco.
  reel: [
    [
      info('SPFW N58', 2024, { pt: 'Direção criativa', en: 'Creative direction' }, 'accent'),
      img('behance/arquiloucura/01', 1400, 1000),
      img('virtuosa/card-sonata', 1080, 1440),
      img('martha-medeiros/cover', 1600, 900),
      img('tiger-capsule/cover', 1400, 800),
      info('MANACÁ', 'Martha Medeiros', { pt: 'Direção de arte', en: 'Art direction' }, 'dark'),
      img('hospitality/04-torcida', 1500, 2000),
      img('behance/bahia-em-cores-quentes/01', 2800, 1867),
      img('o-18-years/cover', 1080, 1350),
      img('ventures/veraozao', 1080, 1080),
      img('behance/promomeats/01', 1350, 818),
    ],
    [
      img('virtuosa/pp-01', 2800, 1659),
      img('stories/veraozao/03-01', 1080, 1920),
      info('LAUDA', 'Virtuosa', { pt: 'Direção de arte', en: 'Art direction' }, 'paper'),
      img('behance/charlotte/01', 1754, 1240),
      img('martha-medeiros/garden-01', 1067, 1599),
      img('fashion-backstage/04', 2000, 1125),
      info('BOAH', 'Branded content', { pt: 'Campanha e conteúdo', en: 'Campaign and content' }, 'accent'),
      img('ventures/runway-untd', 1000, 1000),
      img('behance/max-vidros/09', 2800, 1855),
      img('behance/grocery-store/04', 1867, 2800),
    ],
    [
      img('behance/black-boah/01', 1400, 800),
      img('virtuosa/feed-01', 720, 900),
      img('hospitality/12-sax', 1500, 2000),
      info('TIGER', 'SS24', { pt: 'Direção de arte', en: 'Art direction' }, 'dark'),
      img('stories/veraozao/07-01-copy-12', 1080, 1920),
      info('ARQUILOUCURA', 2023, { pt: 'Gráfico e motion', en: 'Graphic and motion' }, 'paper'),
      img('spfw-the-paradise/cover', 1080, 1080),
      img('behance/branded-content-boah/20', 1080, 1350),
      img('tiger-capsule/05', 1200, 686),
    ],
    [
      img('behance/capsula-brasilidade-boah/01', 1400, 800),
      img('tiger-capsule/03', 1200, 686),
      info('VERÃOZÃO', 2026, { pt: 'Campanha, Ô de Casa', en: 'Campaign, Ô de Casa' }, 'accent'),
      img('hospitality/02-mural-oste', 1500, 2000),
      img('behance/crush-coins/01', 1350, 1080),
      info('MEATS', 'Espeteria', { pt: 'Campanha e conteúdo', en: 'Campaign and content' }, 'dark'),
      img('virtuosa/lauda-cat-02', 900, 1600),
      img('behance/arquimeats-o-baile-de-mascaras/01', 1350, 818),
      img('o-18-years/k1-dezoitou', 1080, 1920),
      img('virtuosa/g1', 1440, 1440),
    ],
    [
      img('hospitality/03-parede-azul', 1500, 1125),
      img('hospitality/06-corredor', 1500, 1125),
      img('tiger-capsule/01', 1200, 686),
      img('behance/bahia-em-cores-quentes/05', 1867, 2800),
      img('fashion-backstage/05', 2000, 1125),
      img('virtuosa/feed-05', 720, 900),
      img('hospitality/14-piscina', 1209, 2000),
      img('behance/festival-de-arte-e-gastronomia/05', 1080, 1350),
      img('hospitality/13-recepcao', 1500, 1000),
    ],
  ] as readonly (readonly ReelTile[])[],
  // Facto de equipe, dito com honestidade (pedido 22/10/2026, item 6).
  team: {
    pt: 'Hoje a .TBF. é um fundador só, em estágio inicial. Por isso procura parceiros.',
    en: 'Today .TBF. is one founder, at an early stage. That is why it looks for partners.',
  } as Bi,
  // O que o fundador faz, na ordem em que a disciplina aparece no portfólio.
  // Fonte: `Discipline` em tavaristico/_data.ts.
  disciplines: [
    { pt: 'Direção de arte', en: 'Art direction' },
    { pt: 'Branding', en: 'Branding' },
    { pt: 'Campanha e conteúdo', en: 'Campaign and content' },
    { pt: 'Moda', en: 'Fashion' },
    { pt: 'Gráfico e motion', en: 'Graphic and motion' },
  ] as Bi[],
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
  // Rodada 23/10: so o fato escrito nas fontes (LEGAL-ACCOUNTING e tbf-context):
  // a empresa e enquadrada no Inova Simples. Nenhuma vantagem concreta esta
  // escrita la, entao nenhuma e afirmada aqui (a linha de prioridade no INPI saiu).
  regimeText: {
    pt: 'Empresa enquadrada no Inova Simples (LC 167/2019)',
    en: 'Company registered under Inova Simples (Supplementary Law 167/2019)',
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

// =============================================================================
// RODADA 22/10/2026 b: DECK PARA PARCEIRO ESTRATEGICO
// A .TBF. hoje e um one person business em estagio inicial que busca parcerias.
// Nada de captacao, valor, equity, nem numero de receita ou de clientes.
// =============================================================================

// ─── CENA 05: MERCADO E POSICAO ──────────────────────────────────────────────
// Dois dados, ambos conferidos na fonte em 22/10/2026:
//   Firjan, Mapeamento da Industria Criativa 2025 (dados de 2023, RAIS/MTE):
//     3,59% do PIB (R$ 393,3 bi) e 1,26 milhao de profissionais.
//     https://www.firjan.com.br/noticias/mapeamento-da-industria-criativa-2025-8AE4828D96AAF437019783E8CFE02F31-00.htm
//   Goldman Sachs Research, 2023: economia de criadores de US$ 250 bi para
//     US$ 480 bi em 2027 (PROJECAO, nao dado medido).
//     https://www.goldmansachs.com/insights/articles/the-creator-economy-could-approach-half-a-trillion-dollars-by-2027
export const MARKET = {
  headline: {
    pt: ['O Brasil exporta cultura.', 'Não exporta propriedade.'],
    en: ['Brazil exports culture.', 'It does not export property.'],
  },
  stats: [
    {
      value: '3,59%',
      label: {
        pt: 'do PIB brasileiro vem da indústria criativa',
        en: 'of Brazil’s GDP comes from the creative industry',
      } as Bi,
      source: { pt: 'Firjan, dados de 2023', en: 'Firjan, 2023 data' } as Bi,
    },
    {
      value: 'US$ 480 bi',
      label: {
        pt: 'projeção para a economia global de criadores em 2027',
        en: 'projection for the global creator economy in 2027',
      } as Bi,
      source: { pt: 'Goldman Sachs Research, 2023', en: 'Goldman Sachs Research, 2023' } as Bi,
    },
  ],
  mapTitle: {
    pt: 'No Brasil, quem é dono da propriedade e chega ao mundo?',
    en: 'In Brazil, who owns the property and reaches the world?',
  } as Bi,
  // Eixo vertical: agencia (embaixo) a dona de IP (em cima). Horizontal: local a global.
  // Pontos genericos (tipos de player), nunca nome de concorrente. So a .TBF. ocupa
  // o canto dona de IP + global.
  axes: {
    local: { pt: 'Local', en: 'Local' } as Bi,
    global: { pt: 'Global', en: 'Global' } as Bi,
    ip: { pt: 'Dona de IP', en: 'IP owner' } as Bi,
    agency: { pt: 'Agência', en: 'Agency' } as Bi,
  },
  quadrants: {
    ipLocal: { pt: 'Marcas e coletivos culturais regionais', en: 'Regional cultural brands and collectives' } as Bi,
    agencyLocal: { pt: 'Agências e produtoras locais', en: 'Local agencies and production houses' } as Bi,
    agencyGlobal: { pt: 'Redes globais de agências', en: 'Global agency networks' } as Bi,
  },
  sources: {
    pt: 'Fontes: Firjan, Mapeamento da Indústria Criativa 2025 (dados de 2023); Goldman Sachs Research, 2023 (projeção).',
    en: 'Sources: Firjan, Creative Industry Mapping 2025 (2023 data); Goldman Sachs Research, 2023 (projection).',
  } as Bi,
}

// ─── CENA 07: COMO CADA VERTICAL GANHA + ROADMAP ─────────────────────────────
// Sem valores em R$. A ordem das linhas e a ordem do roadmap. O papel de cada
// uma vem de `tbf-context.md` (BUs) e de `oferta-producao-conteudo.md`.
export const MODEL = {
  headline: {
    pt: ['Quatro frentes.', 'Uma por vez.'],
    en: ['Four fronts.', 'One at a time.'],
  },
  lead: {
    pt: 'Sabemos que são quatro frentes. Fazemos uma por vez, e é isso que escala.',
    en: 'We know there are four fronts. We do one at a time, and that is what scales.',
  } as Bi,
  rows: [
    {
      name: '.RUNWAY UNTD COLLECTIVE.',
      earns: {
        pt: 'Colaborações e ativações com marcas de moda.',
        en: 'Collaborations and activations with fashion brands.',
      } as Bi,
      tag: { pt: 'Credibilidade', en: 'Credibility' } as Bi,
      tone: 'next' as const,
    },
    {
      name: '.THE BRAZILIAN FACTORY.',
      earns: {
        pt: 'Plano mensal de conteúdo e projetos criativos.',
        en: 'Monthly content plan and creative projects.',
      } as Bi,
      tag: { pt: 'Caixa hoje', en: 'Cash today' } as Bi,
      tone: 'cash' as const,
    },
    {
      name: '.THE FIORE DAILY.',
      earns: {
        pt: 'Mídia própria que vira produto próprio.',
        en: 'Owned media that becomes an owned product.',
      } as Bi,
      tag: { pt: 'A aposta', en: 'The bet' } as Bi,
      tone: 'bet' as const,
    },
    {
      name: '.THE GROWTH FACTORY.',
      earns: {
        pt: 'Fee de crescimento: estratégia, conteúdo e ads.',
        en: 'Growth fee: strategy, content and ads.',
      } as Bi,
      tag: { pt: 'Próximo motor', en: 'Next engine' } as Bi,
      tone: 'next' as const,
    },
  ],
  building: {
    pt: 'Em construção: CRIVO, BRANDSYSTEM e o produto da TFD.',
    en: 'Under construction: CRIVO, BRANDSYSTEM and the TFD product.',
  } as Bi,
}

// ─── CENA 08: CASE VERAOZAO, METRICAS ────────────────────────────────────────
// Fonte: TBF SYSTEM/operacao/veraozao/metricas-media-package-20260925.tsv,
// conta @odecasahostel, confirmadas pelo fundador em 25/09/2026.
//   408.992 visualizacoes e 31,9% nao seguidores: 28 jan a 26 fev 2026 (30 dias).
//   8.874 toques em links externos (+28,3%): 1 a 24 fev 2026.
// Fora do card, por escolha: 20.886 contas alcancadas (+46,8%), 10.351 visitas ao
// perfil (+24,6%) e as 15 festas do "maior carnaval da historia da casa".
export const VERAOZAO_METRICS = [
  {
    value: '408.992',
    label: { pt: 'visualizações em 30 dias', en: 'views in 30 days' } as Bi,
    period: { pt: '28 jan a 26 fev 2026', en: 'Jan 28 to Feb 26, 2026' } as Bi,
  },
  {
    value: '31,9%',
    label: { pt: 'de quem viu não seguia a conta', en: 'of viewers were not followers' } as Bi,
    period: { pt: '28 jan a 26 fev 2026', en: 'Jan 28 to Feb 26, 2026' } as Bi,
  },
  {
    value: '+28,3%',
    label: { pt: 'toques em links externos (8.874)', en: 'taps on external links (8,874)' } as Bi,
    period: { pt: '1 a 24 fev 2026', en: 'Feb 1 to 24, 2026' } as Bi,
  },
]
export const VERAOZAO_SOURCE: Bi = {
  pt: 'Instagram @odecasahostel, painel profissional, 2026.',
  en: 'Instagram @odecasahostel, professional dashboard, 2026.',
}

// ─── CASE TFD: AREA DE METRICAS (abre ao clicar no cartao da TFD) ────────────
// Cada numero com periodo. So entra o que tem periodo confiavel em fonte:
//   julho de 2026: painel do Instagram de @thefioredaily, resumo mensal,
//     capturado pelo fundador (v3-scenes.ts, BUSINESS.portfolio, `proof`).
//   junho de 2026: `_SHARED/BUSINESS/tbf-context.md` (atualizado em 10/06/2026):
//     14k+ seguidores e 220+ posts.
//   31/05/2026: melfiore.com em producao com lista de espera
//     (`2. MELFIORE/_DOCS/SITE-OFICIAL/BRIEFING.md`).
// Ficaram de fora por falta de periodo confirmado: ver o relatorio da rodada.
export const TFD_METRICS = {
  title: { pt: 'Métricas', en: 'Metrics' } as Bi,
  groups: [
    {
      period: { pt: 'Julho de 2026', en: 'July 2026' } as Bi,
      source: {
        pt: 'Instagram @thefioredaily, resumo mensal',
        en: 'Instagram @thefioredaily, monthly summary',
      } as Bi,
      stats: [
        { value: '192 mil', label: { pt: 'visualizações no mês', en: 'views in the month' } as Bi },
        { value: '77%', label: { pt: 'de quem viu não seguia a marca', en: 'of viewers were not followers' } as Bi },
        { value: '15 mil', label: { pt: 'seguidores', en: 'followers' } as Bi },
      ],
    },
    {
      period: { pt: 'Junho de 2026', en: 'June 2026' } as Bi,
      source: { pt: 'Perfil @thefioredaily', en: 'Profile @thefioredaily' } as Bi,
      stats: [
        { value: '14 mil+', label: { pt: 'seguidores', en: 'followers' } as Bi },
        { value: '220+', label: { pt: 'posts publicados', en: 'posts published' } as Bi },
      ],
    },
    {
      period: { pt: 'Desde 31 de maio de 2026', en: 'Since May 31, 2026' } as Bi,
      source: { pt: 'melfiore.com', en: 'melfiore.com' } as Bi,
      stats: [
        {
          value: 'No ar',
          label: { pt: 'página com lista de espera ativa', en: 'live page with an active waitlist' } as Bi,
        },
      ],
    },
  ],
}

// ─── CENA 09: O QUE CONSTRUIMOS JUNTOS ───────────────────────────────────────
// Tres marcos com retorno para o PARCEIRO, datados em trimestres de 2027.
// 🔴 As METAS sao PROPOSTAS para calibrar com o parceiro, nao resultado. A
// referencia do alcance e o VERAOZAO (408.992 visualizacoes em 30 dias).
export const TOGETHER = {
  headline: {
    pt: ['O que construímos', 'juntos.'],
    en: ['What we build', 'together.'],
  },
  milestones: [
    {
      when: '1T 2027',
      whenEn: 'Q1 2027',
      kind: { pt: 'Conteúdo entregue', en: 'Content delivered' } as Bi,
      goal: {
        pt: 'Temporada piloto: 12 peças autorais no ar.',
        en: 'Pilot season: 12 original pieces live.',
      } as Bi,
      back: {
        pt: 'Retorno: a marca do parceiro dentro da cultura.',
        en: 'Return: the partner’s brand inside the culture.',
      } as Bi,
    },
    {
      when: '2T 2027',
      whenEn: 'Q2 2027',
      kind: { pt: 'Alcance', en: 'Reach' } as Bi,
      goal: {
        pt: '1 milhão de visualizações no trimestre.',
        en: '1 million views in the quarter.',
      } as Bi,
      back: {
        pt: 'Retorno: público novo, fora da base dele.',
        en: 'Return: a new audience, outside its base.',
      } as Bi,
    },
    {
      when: '3T 2027',
      whenEn: 'Q3 2027',
      kind: { pt: 'Produto lançado', en: 'Product launched' } as Bi,
      goal: {
        pt: '1 produto ou propriedade da parceria lançado.',
        en: '1 product or property from the partnership launched.',
      } as Bi,
      back: {
        pt: 'Retorno: uma propriedade desenhada com ele.',
        en: 'Return: a property designed with it.',
      } as Bi,
    },
  ],
  note: {
    pt: 'Metas propostas, para calibrar com o parceiro.',
    en: 'Proposed targets, to calibrate with the partner.',
  } as Bi,
  ask: {
    pt: 'Buscamos um parceiro estratégico com estrutura e escala, para construir propriedades culturais junto com a .TBF.',
    en: 'We seek a strategic partner with structure and scale, to build cultural properties together with .TBF.',
  } as Bi,
}


// =============================================================================
// RODADA 23/10/2026: CENA 04 (revelacao por clique), CENA 06 (video do case)
// =============================================================================

// Video vertical dinamico do VERAOZAO: os quatro stories de 18/02 (01, 03, 04,
// 05, 1080x1920, texto ja gravado) em sequencia com zoom lento e transicoes.
// Gerado com ffmpeg a partir de `TAV05/.../stories-oasis-fevereiro/18.02`.
export const VERAOZAO_REEL = {
  src: '/images/pitch/veraozao-reel/veraozao-reel.mp4',
  poster: '/images/pitch/veraozao-reel/veraozao-reel-poster.webp',
  alt: { pt: 'Quatro stories da campanha VERÃOZÃO em sequência', en: 'Four VERÃOZÃO campaign stories in sequence' } as Bi,
}

// Dado de mercado que migrou da antiga cena 05 para o ultimo passo da cena 04.
// Fonte e conferencia em `MARKET` acima (Firjan, dados de 2023).
export const THESIS_MARKET = {
  stat: MARKET.stats[0],
  tbf: {
    label: { pt: 'Dona de IP, alcance global', en: 'IP owner, global reach' } as Bi,
    line: { pt: 'Propriedade brasileira, alcance global.', en: 'Brazilian property, global reach.' } as Bi,
    others: {
      pt: 'Agências e produtoras locais, redes globais de agências, coletivos regionais: nenhuma ocupa esse canto.',
      en: 'Local agencies and production houses, global agency networks, regional collectives: none occupies this corner.',
    } as Bi,
  },
  source: {
    pt: 'Fonte: Firjan, Mapeamento da Indústria Criativa 2025 (dados de 2023).',
    en: 'Source: Firjan, Creative Industry Mapping 2025 (2023 data).',
  } as Bi,
}
