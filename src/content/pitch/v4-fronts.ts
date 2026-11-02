// =============================================================================
// PITCH 4.0: DADOS DAS QUATRO FRENTES (rodada 29/10/2026, CHANGES #01, item 138)
// -----------------------------------------------------------------------------
// Dois blocos, um por frente que ganhou conteúdo no popup da cena 04:
//   TFD: série de métricas de @thefioredaily, lida de PRINTS do Media Package
//        (TAV05, só leitura). Cada ponto traz o PERÍODO que o próprio print
//        mostra e a fonte. A data de captura vem do nome do arquivo e posiciona o
//        ponto no tempo; ela não é o período. Número ambíguo ficou de fora (a
//        tabela de auditoria, uma linha por número, foi entregue à parte).
//   TGF: o feed da The Growth Factory, 12 carrosséis e 53 slides em webp 1080
//        (q82), na ordem das pastas de `00. TGF /FEED`. A revisão de 31/10 tirou
//        2 avulsos; a de 02/11 deixou 12 posts (ver o fim de `TGF_POSTS`).
// Nada inventado. Sem travessão nem en-dash.
// =============================================================================

import type { Bi } from './v3-scenes'

// ─── TFD: pontos da série ────────────────────────────────────────────────────
export interface TfdPoint {
  id: string
  /** Data da captura (nome do arquivo, aaaa-mm-dd). Só posiciona o ponto no eixo. */
  captured: string
  value: number
  /** O número como o print o mostra. */
  shown: Bi
  /** Como o print nomeia o número. */
  label: Bi
  /** O período que o PRÓPRIO print mostra. */
  period: Bi
  /** Complemento impresso no mesmo print. */
  note?: Bi
  source: Bi
  /** Arquivo de origem no Media Package (rastro, não aparece na tela). */
  file: string
}

export interface TfdMonth {
  id: string
  /** Mês do resumo, aaaa-mm. */
  month: string
  period: Bi
  /** Sem print do resumo no acervo: o mês fica vazio no gráfico, sem estimativa. */
  missing?: boolean
  captured?: string
  value?: number
  shown?: Bi
  label?: Bi
  /** Parcela das visualizações vinda de quem não seguia, como impresso (0 a 1). */
  nonFollowers?: number
  /** Volume publicado no mês, de outro cartão do mesmo resumo. */
  shared?: Bi
  source?: Bi
  file?: string
}

const SRC = (pt: string, en: string): Bi => ({ pt, en })

// Seguidores. Um ponto por data, o mais preciso. Os resumos de maio (14 mil) e de
// junho (14 mil) ficaram de fora do traço: o do dia 02/06 empata com o perfil
// (14,7 mil) e o de junho cairia abaixo dele só por arredondamento do cartão.
export const TFD_FOLLOWERS: TfdPoint[] = [
  {
    id: 'seg-jan',
    captured: '2026-01-04',
    value: 10000,
    shown: { pt: '10 mil', en: '10K' },
    label: { pt: 'seguidores', en: 'followers' },
    period: { pt: '4 de janeiro de 2026', en: 'January 4, 2026' },
    note: { pt: 'Marco: o Instagram avisa que chegou a 10 mil', en: 'Milestone: Instagram notice of 10K followers' },
    source: SRC(
      'Instagram @thefioredaily, aviso de marco, print de 04/01/2026',
      'Instagram @thefioredaily, milestone notice, screenshot of Jan 4, 2026'
    ),
    file: '2026-01-04_SEM_thefioredaily-alcancou-10-mil-seguidores_IMG_7767.PNG',
  },
  {
    id: 'seg-fev',
    captured: '2026-03-03',
    value: 13000,
    shown: { pt: '13 mil', en: '13K' },
    label: { pt: 'seguidores', en: 'followers' },
    period: { pt: 'Fevereiro de 2026', en: 'February 2026' },
    note: { pt: '+483 em relação a janeiro', en: '+483 vs January' },
    source: SRC(
      'Instagram @thefioredaily, resumo mensal, print de 03/03/2026',
      'Instagram @thefioredaily, monthly summary, screenshot of Mar 3, 2026'
    ),
    file: '2026-03-03_SEM_insights-fevereiro-241-mil-visualizacoes_IMG_0111.PNG',
  },
  {
    id: 'seg-abr',
    captured: '2026-05-05',
    value: 14000,
    shown: { pt: '14 mil', en: '14K' },
    label: { pt: 'seguidores', en: 'followers' },
    period: { pt: 'Abril de 2026', en: 'April 2026' },
    note: { pt: '+650 em relação a março', en: '+650 vs March' },
    source: SRC(
      'Instagram @thefioredaily, resumo mensal, print de 05/05/2026',
      'Instagram @thefioredaily, monthly summary, screenshot of May 5, 2026'
    ),
    file: '2026-05-05_TAV_resumo-abril-426-mil-views-89_IMG_2751.PNG',
  },
  {
    id: 'seg-perfil',
    captured: '2026-06-02',
    value: 14700,
    shown: { pt: '14,7 mil', en: '14.7K' },
    label: { pt: 'seguidores', en: 'followers' },
    period: { pt: '2 de junho de 2026', en: 'June 2, 2026' },
    note: { pt: 'Tela do perfil, com 268 posts', en: 'Profile screen, with 268 posts' },
    source: SRC(
      'Instagram @thefioredaily, tela do perfil, print de 02/06/2026',
      'Instagram @thefioredaily, profile screen, screenshot of Jun 2, 2026'
    ),
    file: '2026-06-02_MEL_painel-perfil-thefioredaily-14-mil-seg_IMG_3725.PNG',
  },
  {
    id: 'seg-jul',
    captured: '2026-08-09',
    value: 15000,
    shown: { pt: '15 mil', en: '15K' },
    label: { pt: 'seguidores', en: 'followers' },
    period: { pt: 'Julho de 2026', en: 'July 2026' },
    note: { pt: '+458 em relação a junho', en: '+458 vs June' },
    source: SRC(
      'Instagram @thefioredaily, resumo mensal, print de 09/08/2026',
      'Instagram @thefioredaily, monthly summary, screenshot of Aug 9, 2026'
    ),
    file: '2026-08-09_TBF_insights-ig-julho-192-mil-views-15-mil_IMG_5592.PNG',
  },
]

// Visualizações por mês. Março não tem print do resumo no acervo: fica vazio.
// O print de julho nomeia o número "Visualizações" (sem "de reels e posts"); o
// rótulo de cada mês segue o que o print diz, e o leitor vê a diferença.
const VIEWS_REELS_POSTS: Bi = { pt: 'visualizações de reels e posts', en: 'reel and post views' }

export const TFD_VIEWS: TfdMonth[] = [
  {
    id: 'vis-fev',
    month: '2026-02',
    period: { pt: 'Fevereiro de 2026', en: 'February 2026' },
    captured: '2026-03-03',
    value: 241000,
    shown: { pt: '241 mil', en: '241K' },
    label: VIEWS_REELS_POSTS,
    nonFollowers: 0.86,
    shared: { pt: '31 reels e 2 posts no mês', en: '31 reels and 2 posts in the month' },
    source: SRC(
      'Instagram @thefioredaily, resumo mensal, print de 03/03/2026',
      'Instagram @thefioredaily, monthly summary, screenshot of Mar 3, 2026'
    ),
    file: '2026-03-03_SEM_insights-fevereiro-241-mil-visualizacoes_IMG_0111.PNG',
  },
  {
    id: 'vis-mar',
    month: '2026-03',
    period: { pt: 'Março de 2026', en: 'March 2026' },
    missing: true,
  },
  {
    id: 'vis-abr',
    month: '2026-04',
    period: { pt: 'Abril de 2026', en: 'April 2026' },
    captured: '2026-05-05',
    value: 426000,
    shown: { pt: '426 mil', en: '426K' },
    label: VIEWS_REELS_POSTS,
    nonFollowers: 0.89,
    shared: { pt: '39 reels e 2 posts no mês', en: '39 reels and 2 posts in the month' },
    source: SRC(
      'Instagram @thefioredaily, resumo mensal, print de 05/05/2026',
      'Instagram @thefioredaily, monthly summary, screenshot of May 5, 2026'
    ),
    file: '2026-05-05_TAV_resumo-abril-426-mil-views-89_IMG_2751.PNG',
  },
  {
    id: 'vis-mai',
    month: '2026-05',
    period: { pt: 'Maio de 2026', en: 'May 2026' },
    captured: '2026-06-02',
    value: 523000,
    shown: { pt: '523 mil', en: '523K' },
    label: VIEWS_REELS_POSTS,
    nonFollowers: 0.91,
    shared: { pt: '54 reels e 1 post no mês', en: '54 reels and 1 post in the month' },
    source: SRC(
      'Instagram @thefioredaily, resumo mensal, print de 02/06/2026',
      'Instagram @thefioredaily, monthly summary, screenshot of Jun 2, 2026'
    ),
    file: '2026-06-02_TBF_insights-ig-523-mil-views-22_IMG_3698.PNG',
  },
  {
    id: 'vis-jun',
    month: '2026-06',
    period: { pt: 'Junho de 2026', en: 'June 2026' },
    captured: '2026-07-01',
    value: 236000,
    shown: { pt: '236 mil', en: '236K' },
    label: VIEWS_REELS_POSTS,
    nonFollowers: 0.87,
    shared: { pt: '45 reels e 5 posts no mês', en: '45 reels and 5 posts in the month' },
    source: SRC(
      'Instagram @thefioredaily, resumo mensal, print de 01/07/2026',
      'Instagram @thefioredaily, monthly summary, screenshot of Jul 1, 2026'
    ),
    file: '2026-07-01_TBF_236-mil-visualizacoes-14-mil-seguidores_IMG_4616.PNG',
  },
  {
    id: 'vis-jul',
    month: '2026-07',
    period: { pt: 'Julho de 2026', en: 'July 2026' },
    captured: '2026-08-09',
    value: 192000,
    shown: { pt: '192 mil', en: '192K' },
    label: { pt: 'visualizações', en: 'views' },
    nonFollowers: 0.77,
    shared: { pt: '48 reels, 6 posts e 16 stories no mês', en: '48 reels, 6 posts and 16 stories in the month' },
    source: SRC(
      'Instagram @thefioredaily, resumo mensal, print de 09/08/2026',
      'Instagram @thefioredaily, monthly summary, screenshot of Aug 9, 2026'
    ),
    file: '2026-08-09_TBF_insights-ig-julho-192-mil-views-15-mil_IMG_5592.PNG',
  },
]

// Tela do perfil em 02/06/2026 (IMG_3725): os números grandes do painel profissional.
// "Últimos 30 dias" no print: a janela termina na data da captura.
export const TFD_PROFILE = {
  captured: '2026-06-02',
  period: { pt: 'Perfil em 2 de junho de 2026', en: 'Profile on June 2, 2026' } as Bi,
  window: {
    pt: 'Visualizações: 30 dias até 2 de junho de 2026',
    en: 'Views: 30 days up to June 2, 2026',
  } as Bi,
  stats: [
    { value: '14,7 mil', label: { pt: 'seguidores', en: 'followers' } as Bi },
    { value: '268', label: { pt: 'posts', en: 'posts' } as Bi },
    { value: '496,3 mil', label: { pt: 'visualizações em 30 dias', en: 'views in 30 days' } as Bi },
  ],
  source: SRC(
    'Instagram @thefioredaily, tela do perfil e painel profissional, print de 02/06/2026',
    'Instagram @thefioredaily, profile screen and professional dashboard, screenshot of Jun 2, 2026'
  ),
  file: '2026-06-02_MEL_painel-perfil-thefioredaily-14-mil-seg_IMG_3725.PNG',
}

// ─── TGF: o feed ─────────────────────────────────────────────────────────────
// Fonte: TAV05 `0. TBF inc/00. TGF /FEED`. Pasta numerada = carrossel (os slides
// na ordem dos arquivos); png solto na raiz = post único (`avulso`). Ordem: a
// numeração das pastas, 01 a 14, e o avulso no fim (rascunho de jan/2026, sem número
// de pasta). Imagem em `public/images/pitch/verticais/tgf-feed/<post>/NN.webp`,
// todas 1080x1440 (3:4).
//
// FICARAM DE FORA, e por quê:
//   01-02.png (raiz)  duplicata byte a byte de 01/01-02.png.
//   08/01.png         camada com a janela do vídeo transparente. O quadro 1 do post
//                     08 é o frame 0 de 08/08-01.mp4; o vídeo em si não entrou.
//   10/01.png         captura real do Google com nome de pessoa e anúncio de terceiros
//                     (Anderson Plumbing, John Padilla Plumbing). Guardado no scratchpad.
//   Artboard 1.png    (era `avulso-01`) variante de rascunho da capa do post 01: o mesmo
//                     "O objetivo principal é gerar bons resultados" duas vezes na grade.
//   Artboard 1 copy 11.png (era `avulso-03`) inacabado: a metade de baixo é um bloco
//                     preto, a janela de imagem ou vídeo.
//   Os dois últimos (revisão de 31/10) estão em `public/_ARQUIVO/pitch-tgf-feed-pre-31-10/
//   avulso-01` e `avulso-03`. Para voltar: mover a pasta de volta para `tgf-feed/` e
//   recolocar a linha em `TGF_POSTS`.
export interface TgfPost {
  id: string
  kind: 'carrossel' | 'avulso'
  slides: number
  /** O texto de abertura do primeiro slide, para o rótulo de quem não vê a imagem. */
  hook: string
}

export const TGF_FEED_BASE = '/images/pitch/verticais/tgf-feed'

export const TGF_POSTS: TgfPost[] = [
  { id: '01', kind: 'carrossel', slides: 2, hook: 'O objetivo principal é gerar bons resultados.' },
  { id: '02', kind: 'carrossel', slides: 4, hook: 'O selo do Google coloca seu negócio acima dos concorrentes.' },
  { id: '03', kind: 'carrossel', slides: 4, hook: 'O erro mais comum dos brasileiros que anunciam nos EUA.' },
  { id: '04', kind: 'carrossel', slides: 5, hook: 'A maior diferença entre vender seus serviços no Brasil e nos EUA.' },
  { id: '05', kind: 'carrossel', slides: 6, hook: 'O erro mais comum dos brasileiros que trabalham nos EUA.' },
  { id: '07', kind: 'carrossel', slides: 5, hook: 'Google Local Service Ads: quem pode usar?' },
  { id: '08', kind: 'carrossel', slides: 5, hook: 'Brazilian in the US? Seu negócio precisa de visibilidade.' },
  { id: '09', kind: 'carrossel', slides: 4, hook: 'Ready to get clients? Atendimento em português.' },
  { id: '11', kind: 'carrossel', slides: 4, hook: 'Seu negócio pode ser excelente. E mesmo assim perder clientes todos os dias.' },
  { id: '12', kind: 'carrossel', slides: 4, hook: 'Mudar de país também significa mudar a forma de crescer.' },
  { id: '13', kind: 'carrossel', slides: 5, hook: 'Se você presta serviços nos Estados Unidos, fique nesse carrossel.' },
  { id: '14', kind: 'carrossel', slides: 5, hook: 'Seu concorrente não está ganhando mais clientes porque trabalha melhor.' },
]
// Rodada 02/11 (fundador: "deixe 12 posts"): saíram da grade, imagens continuam em
// `tgf-feed/`. Para voltar, recolocar a linha acima.
//   06         repete o gancho do 02 ("O selo do Google coloca seu negócio acima...").
//   10         perdeu o slide 01 (anúncio de terceiro), sobrou carrossel de 3.
//   avulso-02  rascunho de jan/2026, único post em inglês puro.
//   { id: '06', kind: 'carrossel', slides: 6, hook: 'O selo do Google coloca seu negócio acima dos concorrentes.' },
//   { id: '10', kind: 'carrossel', slides: 3, hook: 'Nos EUA, clientes procuram serviços no Google.' },
//   { id: 'avulso-02', kind: 'avulso', slides: 1, hook: 'Local Service Ads: the secret tool for small businesses.' },

/** Caminho do slide `i` (começa em 0) de um post. */
export const tgfSlide = (post: TgfPost, i: number) =>
  `${TGF_FEED_BASE}/${post.id}/${String(i + 1).padStart(2, '0')}.webp`
