// ─────────────────────────────────────────────────────────────────────────────
// PORTFÓLIO TAVARÍSTICO: modelo de dados (curadoria V1)
// Fonte: PRJ-20260626-01 (direção ORD-01 + UX ORD-02, ambas aprovadas).
// Regras: SEM ano como padrão (year opcional). Card sem border-top, separação por
// número-índice. Papel do Tavarístico obrigatório por obra.
// `provisional`: campos escritos pelo PM (placeholder) → renderizados SUBLINHADOS
// para o redator substituir. Ô:18 Years é copy real (não provisória).
// ─────────────────────────────────────────────────────────────────────────────

import type { CarouselItem } from '@/components/tavaristico/WorkCarousel'

export type Discipline =
  | 'Art Direction'
  | 'Branding'
  | 'Campaign & Content'
  | 'Fashion'
  | 'Graphic & Motion'

export type ProvField = 'role' | 'client' | 'summary' | 'description'

export interface Work {
  slug: string
  index: string
  title: string
  disciplines: Discipline[]
  /** papel do Tavarístico, OBRIGATÓRIO (credibilidade) */
  role: string
  /** papel em PT; sem ele, a pagina PT mostra `role` */
  rolePT?: string
  client?: string
  /** ano é opcional por decisão do ECD (entra só onde faz sentido) */
  year?: string
  /** 1 linha, card da vitrine */
  summary: string
  /** narrativa do case, página de obra */
  description?: string
  /** versão EN da narrativa; sem ela, a página EN mostra `description` */
  descriptionEn?: string
  /** entra no bloco Selected Work (alta densidade) do index */
  selected?: boolean
  media: { cover: string; gallery?: string[] }
  /** campos provisórios (sublinhar), aguardam redator/ECD */
  provisional?: ProvField[]
  /** capa screenshot-grade (aguarda fonte hi-res) */
  lowRes?: boolean
  /** Destaques de conteudo no topo da pagina de obra: aneis de story, mesmo
   * formato e componente (Campaigns) da home do portfolio. `index` deve ser
   * unico no site (chave do "visto" em localStorage). */
  highlights?: Campaign[]
  /** alt descritivo (PT) da capa e da galeria; sem eles, vale o titulo */
  coverAlt?: string
  /** Capa so do card do portfolio (a pagina de obra segue em media.cover). */
  cardCover?: string
  /** Card do portfolio com a capa contida (sem corte) sobre fundo chapado: `inset` e o respiro (padding) em volta. */
  cardFit?: { bg: string; inset: string }
  /** Proporcao fixa do card (ex.: '4 / 5'). Sem ela, o card segue o ritmo da grade. */
  cardRatio?: string
  /** Ponto focal da capa no card, em fracao da imagem [x, y]. A grade calcula o
   * object-position para esse ponto cair no centro do card, em qualquer proporcao. */
  cardFocus?: [number, number]
  /** Galeria densa: 2 colunas no celular, 3 no tablet, 4 no desktop, proporcao nativa. */
  galleryDense?: boolean
  galleryAlts?: string[]
  /** Ficha de creditos da obra (nomes proprios: extrabold na tela).
   * Rodada 19/10/2026: substituiu o "Producao executiva: LAUDA" do topo. */
  credits?: WorkCredit[]
  /** Pecas 9:16 de lookbook/catalogo, em carrossel na pagina de obra. */
  lookbook?: WorkPiece[]
  /** Grid do feed (3 colunas, quadrado como no PDF de planejamento). */
  feedGrid?: WorkPiece[]
  /** Proporcao dos quadros do feedGrid (ex.: '4 / 5'); sem ela, quadrado. */
  feedRatio?: string
  /** Posts/reels do Instagram embedados (embed oficial, carregado so ao rolar ate eles). */
  instagramEmbeds?: string[]
  /** Sequencia editorial apos a galeria: carrossel, feed, embed e imagem, na ordem do array. */
  blocks?: WorkBlock[]
}

/** Bloco da pagina de obra (rodada 23/10/2026). Rotulos curtos, PT e EN, fora da imagem. */
export type WorkBlock = { labelEN?: string; labelPT?: string } & (
  | { kind: 'carousel'; variant: 'tall' | 'wide'; items: CarouselItem[] }
  | { kind: 'feed'; pieces: WorkPiece[]; ratio?: string }
  | { kind: 'embed'; url: string }
  | { kind: 'image'; src: string; alt: string; w: number; h: number }
)

/** Peca de pagina de obra: arquivo pronto (nunca montado por codigo) e alt em PT. */
export interface WorkPiece {
  src: string
  alt: string
  /** legenda curta fora da imagem (nunca sobre ela) */
  captionEN?: string
  captionPT?: string
}

const base = '/images/creators/tavaristico'
// Quadros de story, produzidos em 10/09/2026 (1080x1920 nativos).
const stories = '/images/creators/tavaristico/stories'

export const IDENTITY = {
  // Hero: nome civil em cima, A.K.A. embaixo (ordem do fundador, 09/10/2026).
  name: 'Felipe Tavares',
  alias: 'TAVARÍSTICO',
  role: 'Associate Creative Director / Art Director',
  representedBy: '.TBF. inc',
  origin: 'Salvador, Bahia',
  bioEN:
    'Advertising, Graphic Design & Branded Content. I came from sacred and profane soil, the capital of axé: Salvador, Bahia. My essence is my enthusiasm in collaborating with causes that I truly believe in, the curiosity to discover the new and the versatility to adapt to new environments.',
  // PT provisório, redator/ECD confirma.
  bioPT:
    'TAVARÍSTICO é Associate Creative Director e Art Director. Vindo do solo sagrado e profano de Salvador, Bahia, traduz cultura brasileira em trabalho que viaja. Representado pela .TBF. inc.',
  bioPTProvisional: true,
  socials: {
    instagram: 'https://instagram.com/thebrfactory',
    linkedin: 'https://www.linkedin.com/in/tavaristico/', // confirmado pelo fundador em 09/09/2026
    linkedinProvisional: false,
    github: 'https://github.com/tavaristico', // conta nova, pedido do fundador em 19/10/2026
    githubPending: false,
  },
}

export const DISCIPLINES: Discipline[] = [
  'Art Direction',
  'Branding',
  'Campaign & Content',
  'Fashion',
  'Graphic & Motion',
]

// Lookbook e catalogo da Virtuosa (CHANGES #01, 19/10/2026): pecas 9:16 prontas.
const vz = `${base}/virtuosa`
const LOOKBOOK: WorkPiece[] = [
  { src: `${vz}/lb-capa-v2.webp`, alt: 'Capa do catálogo Virtuosa, da LAUDA: mulher de blusa transparente preta e calça preta, com o título VIRTUOSA ao fundo.', captionEN: 'Cover', captionPT: 'Capa' },
  { src: `${vz}/lb-indice.webp`, alt: 'Índice do catálogo Virtuosa Inverno 24, com miniaturas de todos os looks em fileiras sobre fundo claro.', captionEN: 'Index', captionPT: 'Índice' },
  { src: `${vz}/lb-inverno24.webp`, alt: 'Quinze looks da coleção Inverno 24, da LAUDA, em três fileiras sobre fundo cinza claro.', captionEN: 'Winter 24', captionPT: 'Inverno 24' },
  { src: `${vz}/lb-drop12.webp`, alt: 'Lookbook Virtuosa Inverno 24, Drop I e II, com doze looks em quatro fileiras sobre fundo claro.', captionEN: 'Lookbook Drop I & II', captionPT: 'Lookbook Drop I & II' },
  { src: `${vz}/lb-capa.webp`, alt: 'Capa alternativa do catálogo: mulher de body preto com manga esvoaçante, com o título VIRTUOSA ao fundo, Inverno 24, Drop I e II.', captionEN: 'Cover, alternate', captionPT: 'Capa, alternativa' },
  { src: `${vz}/lb-final.webp`, alt: 'Página final do catálogo: mulher de body preto de corpo inteiro, com o título VIRTUOSA ao fundo.', captionEN: 'Closing page', captionPT: 'Página final' },
]

// Grid do feed de setembro (FEED_SETEMBRO.pdf): 15 quadros, 3 colunas, os dois
// tiles LAUDA FASHION FILM nos cantos da terceira fileira. Quadros 07, 09, 11 e
// 15 refeitos em alta (19/10/2026) a partir de MKT LAUDA/05. Feed/AGO:
// 0.FASHIONFILM.png (07 e 09), 12.png (11) e 10.png (15).
const FEED_ALTS = [
  'Mulher de costas olhando para trás, com moletom branco de capuz.',
  'Mulher de camisa branca e calça preta justa sobre fundo claro.',
  'Mulher de costas olhando para trás, com moletom bege de capuz.',
  'Mulher de suéter preto brilhante sobre fundo cinza.',
  'Mulher de moletom e calça bege diante de painéis de madeira e uma coluna bordô.',
  'Mulher de vestido longo preto transparente sobre fundo claro.',
  'Tile LAUDA Fashion Film, texto sobre fundo bege.',
  'Mulher de vestido preto longo com os braços erguidos sobre fundo cinza.',
  'Tile LAUDA Fashion Film, texto sobre fundo bege.',
  'Mulher de blazer preto e calça justa sobre fundo claro.',
  'Mulher de blazer xadrez marrom e blusa amarela diante de painéis de madeira.',
  'Perfil de mulher com coque e vestido preto de costas abertas.',
  'Mulher de moletom e calça bege apoiada em uma coluna bordô.',
  'Mulher de costas em terno xadrez marrom sobre fundo claro.',
  'Mulher de blusa branca e calça caramelo diante de um painel curvo de madeira.',
]
const FEED_GRID: WorkPiece[] = FEED_ALTS.map((alt, i) => ({
  src: `${vz}/feed-${String(i + 1).padStart(2, '0')}.webp`,
  alt,
}))

// BOAH BRANDED CONTENT (rodada 22/10/2026): a maioria das pecas e 9:16 e entra como
// stories (mesmo componente da Virtuosa), agrupadas por tema. Os quadros ficam como
// vieram do arquivo (texto ja gravado), sem montagem nem sobreposicao por codigo.
// Os quadrados e os 4:5 seguem na galeria densa, lado a lado.
const bo = `${base}/behance/branded-content-boah`
const boFrames = (nums: number[], alt: string, role: string): StoryFrame[] =>
  nums.map((n, i) => ({
    src: `${bo}/${String(n).padStart(2, '0')}.webp`,
    alt: `${alt}, quadro ${i + 1} de ${nums.length}.`,
    role,
  }))
const BOAH_HIGHLIGHTS: Campaign[] = [
  {
    index: 'boah-dias-de-folga',
    name: 'DIAS DE FOLGA',
    client: 'BOAH',
    descriptionEN: 'Days off stories for BOAH: the season looks and accessories.',
    descriptionPT: 'Stories Dias de folga, da BOAH: os looks da estação e os acessórios.',
    frames: boFrames([2, 3, 4, 5, 6], 'Story Dias de folga da BOAH', 'Stories'),
  },
  {
    index: 'boah-registros',
    name: 'REGISTROS',
    client: 'BOAH',
    descriptionEN: 'Records stories for BOAH: looks photographed on location.',
    descriptionPT: 'Stories Registros, da BOAH: looks fotografados em locação.',
    frames: boFrames([13, 14, 15, 16], 'Story Registros da BOAH', 'Stories'),
  },
  {
    index: 'boah-celebre-o-amor',
    name: 'CELEBRE O AMOR',
    client: 'BOAH',
    descriptionEN: 'Celebrate love stories for BOAH: the red looks of the season.',
    descriptionPT: 'Stories Celebre o amor, da BOAH: os looks vermelhos da estação.',
    frames: boFrames([22, 23, 24, 25, 26], 'Story Celebre o amor da BOAH', 'Stories'),
  },
  {
    index: 'boah-lojas-abertas',
    name: 'LOJAS ABERTAS',
    client: 'BOAH',
    descriptionEN: 'Open stores stories for BOAH: the stores, the looks and the opening hours.',
    descriptionPT: 'Stories Lojas abertas, da BOAH: as lojas, os looks e os horários.',
    frames: boFrames([27, 28, 29, 30, 31], 'Story Lojas abertas da BOAH', 'Stories'),
  },
  {
    index: 'boah-manha-tarde-noite',
    name: 'MANHÃ, TARDE E NOITE',
    client: 'BOAH',
    descriptionEN: 'Morning, afternoon and night stories for BOAH: one look for each moment of the day.',
    descriptionPT: 'Stories Manhã, tarde e noite, da BOAH: um look para cada momento do dia.',
    frames: boFrames([32, 33, 34, 35, 36], 'Story Manhã, tarde e noite da BOAH', 'Stories'),
  },
]

// TIGER CAPSULE (CHANGES #01, 19/10/2026). Texto so do que a midia afirma:
// "A Savannah Odyssey", "Spring Summer 24", "Creative District", "Designed and
// created in Brazil". Papel e cliente nao constam da midia: papel provisorio.
const tg = `${base}/tiger-capsule`
const TIGER_CAPSULE: Work = {
  slug: 'tiger-capsule',
  index: '19',
  title: 'Tiger Capsule',
  disciplines: ['Fashion', 'Graphic & Motion'],
  role: 'Art Director',
  summary: 'A Savannah Odyssey: cápsula de camisas e camiseta com estampa de tigres.',
  description:
    'A Savannah Odyssey, Spring Summer 24, Creative District. Cápsula com identidade própria: lockup, emblema de tigres com louros, ícone do tigre, estampa contínua em ocre sobre branco, camisa e camiseta preta. Desenhada e criada no Brasil.',
  descriptionEn:
    'A Savannah Odyssey, Spring Summer 24, Creative District. A capsule with its own identity: lockup, tiger emblem with laurels, tiger icon, continuous ochre-on-white pattern, shirt and black tee. Designed and created in Brazil.',
  coverAlt: 'Camisa de manga curta com a estampa de tigres ocre sobre branco, sobre fundo marrom escuro.',
  galleryAlts: [
    'Dois tigres de pé, em silhueta ocre sobre fundo marrom escuro.',
    'Emblema de tigre cercado por coroa de louros, em ocre sobre fundo escuro.',
    'Cabeça de tigre rugindo, em silhueta ocre sobre fundo escuro.',
    'Três símbolos em ocre: cabeça de tigre, emblema com louros e tigre de pé.',
    'Camiseta preta com pequeno emblema ocre no peito, sobre fundo escuro.',
    'Detalhe da estampa contínua de tigres ocre sobre branco, com botões laranja.',
    'Camisa de manga curta com a estampa de tigres ocre sobre branco, sobre fundo escuro.',
    'Camisa de manga curta com a estampa de tigres, em animação, sobre fundo escuro.',
  ],
  media: {
    cover: `${tg}/cover.webp`,
    gallery: [
      `${tg}/02.webp`,
      `${tg}/03.webp`,
      `${tg}/04.webp`,
      `${tg}/05.webp`,
      `${tg}/06.webp`,
      `${tg}/07.webp`,
      `${tg}/08.webp`,
      `${tg}/09.webp`,
    ],
  },
  provisional: ['role', 'summary'],
  // Camisa no centro do card (rodada 22/10/2026): a camisa fica a 54% da largura e 50% da altura da capa.
  cardFocus: [0.546, 0.5],
}

// Rodada 23/10/2026: blocos editoriais dos cases BOAH, Festival e The Fashion Backstage.
// Dimensoes reais dos arquivos (w, h) reservam o espaco: carrossel sem CLS.
const BO = `${base}/behance/branded-content-boah`
const BX = `${base}/branded-content-boah-extra`
const FEST = `${base}/behance/festival-de-arte-e-gastronomia`
const FB = `${base}/fashion-backstage`
const SP = `${base}/spfw-the-paradise`
const VID = '/videos/tavaristico'
const px = (src: string, w: number, h: number, alt: string) => ({ src, w, h, alt })

const BOAH_FEED: WorkPiece[] = [
  { src: `${BO}/17.webp`, alt: 'Look de linho com colete de botões, no corredor claro.' },
  { src: `${BO}/08.webp`, alt: 'Colar de pérola barroca e fios azuis sobre blusa branca.' },
  { src: `${BO}/09.webp`, alt: 'Estampa verde e creme em tecido dobrado.' },
  { src: `${BO}/10.webp`, alt: 'Colar de miçangas verdes com moedas douradas.' },
  { src: `${BO}/19.webp`, alt: 'Look de linho diante da arara de peças, com a frase da campanha na própria peça.' },
  { src: `${BO}/11.webp`, alt: 'Bolsa xadrez verde, óculos escuros e taça sobre a mesa.' },
  { src: `${BO}/18.webp`, alt: 'Detalhe do colete de linho com botões de madeira e pingente.' },
  { src: `${BO}/12.webp`, alt: 'Bolsa de tecido listrado e brincos em still de produto.' },
  { src: `${BO}/20.webp`, alt: 'Look de linho refletido no espelho de um provador claro.' },
  { src: `${BO}/21.webp`, alt: 'Colete e calça de linho, com o braço apoiado na cortina.' },
  { src: `${BO}/07.gif`, alt: 'Look de vestido longo listrado, em animação.' },
  { src: `${BX}/detail-06.webp`, alt: 'Três modelos em looks brancos e verdes diante do fundo claro.' },
]

const BOAH_LOOKS: CarouselItem[] = [
  px(`${BX}/look-01.webp`, 1068, 1600, 'Conjunto azul em estúdio, modelo de frente.'),
  px(`${BX}/look-04.webp`, 1068, 1600, 'Macacão azul com recorte nas costas.'),
  px(`${BX}/look-05.webp`, 1200, 1600, 'Conjunto azul listrado e chapéu, na varanda branca.'),
  px(`${BX}/look-08.webp`, 1067, 1600, 'Look azul claro no deque de madeira.'),
  px(`${BX}/look-02.webp`, 1068, 1600, 'Conjunto azul de duas peças, de pé no estúdio.'),
  px(`${BX}/look-07.webp`, 1200, 1600, 'Modelo de chapéu e conjunto listrado, apoiada na balaustrada.'),
  px(`${BX}/look-11.webp`, 1067, 1600, 'Vestido estampado na praia, entre coqueiros.'),
  px(`${BX}/look-13.webp`, 1067, 1600, 'Colete de linho branco com botões de madeira.'),
  px(`${BX}/look-15.webp`, 1200, 1600, 'Vestido branco diante do azulejo azul de um casarão.'),
  px(`${BX}/look-03.webp`, 1068, 1600, 'Conjunto azul de duas peças, de costas, no estúdio.'),
  px(`${BX}/look-09.webp`, 1067, 1600, 'Vestido azul no deque, com o mar ao fundo.'),
  px(`${BX}/look-12.webp`, 1280, 1600, 'Camiseta creme com estampa vermelha, na areia.'),
  px(`${BX}/look-06.webp`, 1200, 1600, 'Modelo de chapéu e conjunto azul listrado, de braços cruzados.'),
  px(`${BX}/look-10.webp`, 1067, 1600, 'Look estampado na escada de madeira.'),
  px(`${BX}/look-14.webp`, 1067, 1600, 'Detalhe do colete de linho com botões.'),
  px(`${BX}/look-16.webp`, 1080, 1350, 'Vestido branco à beira da piscina.'),
  px(`${BX}/look-17.webp`, 1200, 1600, 'Look jeans e verde na grama.'),
  px(`${BX}/look-18.webp`, 1067, 1600, 'Grupo de modelos em looks claros no deque.'),
  px(`${BX}/look-19.webp`, 1200, 1600, 'Modelo de linho sentada nas pedras, com o mar ao fundo.'),
]

const BOAH_DETAILS: CarouselItem[] = [
  px(`${BX}/set-01.webp`, 900, 1600, 'Bastidor: a equipe fotografando um look em locação.'),
  px(`${BX}/set-02.webp`, 900, 1600, 'Bastidor: o fotógrafo em ação, de camisa azul.'),
  px(`${BX}/detail-01.webp`, 900, 1600, 'Camiseta creme com estampa vermelha, em still.'),
  px(`${BX}/detail-02.webp`, 1067, 1600, 'Colar de contas marrons sobre fundo branco.'),
  px(`${BX}/detail-03.webp`, 1067, 1600, 'Colar de contas vermelhas sobre tecido claro.'),
  px(`${BX}/detail-04.webp`, 1067, 1600, 'Colares de contas verdes e vermelhas.'),
  px(`${BX}/detail-05.webp`, 900, 1600, 'Bolsa xadrez verde sobre bandeja de metal, à beira da piscina.'),
]

const FEST_FEED: WorkPiece[] = Array.from({ length: 21 }, (_, i) => {
  const n = String(i + 2).padStart(2, '0')
  return { src: `${FEST}/${n}.webp`, alt: `Peça ${i + 1} de 21 do feed do Festival de Arte e Gastronomia.` }
})

const SPFW_BLOCKS: WorkBlock[] = [
  {
    kind: 'carousel',
    variant: 'wide',
    labelEN: 'Runway and light',
    labelPT: 'Passarela e luz',
    items: [
      px(`${FB}/04.webp`, 2000, 1125, 'Modelo de vestido azul de crochê na passarela, com a plateia ao fundo.'),
      px(`${SP}/ruc-hero.webp`, 1800, 1013, 'Emblema vermelho do Fashion Club em luz vermelha, com duas pessoas ao fundo.'),
      px(`${FB}/05.webp`, 2000, 1125, 'Retrato de modelo em luz azul e roxa, camisa branca e paletó.'),
      px(`${SP}/ruc-closing.webp`, 1800, 1306, 'Plateia em silhueta diante do painel luminoso, com refletores azuis.'),
      px(`${SP}/cover.webp`, 1080, 1080, 'Modelos nos bastidores, com bonés e peças coloridas.'),
      px(`${SP}/g2.webp`, 1080, 1080, 'Perfil de modelo em luz azul e magenta.'),
    ],
  },
  { kind: 'embed', url: 'https://www.instagram.com/p/DPUk0hvgn-6/', labelEN: 'On Instagram, @runwayunited', labelPT: 'No Instagram, @runwayunited' },
  {
    kind: 'carousel',
    variant: 'tall',
    labelEN: 'Backstage',
    labelPT: 'Bastidor',
    items: [
      px(`${SP}/g3.webp`, 1080, 1920, 'Fila de modelos na passarela branca, em perspectiva.'),
      px(`${FB}/02.webp`, 1080, 1440, 'Silhueta de modelo de costas em névoa azul.'),
      px(`${SP}/ruc-22.webp`, 1080, 1920, 'Modelo de vestido azul na passarela, com o selo .RUC. São Paulo.'),
      px(`${FB}/03.webp`, 1080, 1440, 'Silhueta de modelo de costas em luz vermelha e azul.'),
      px(`${SP}/ruc-backstage.webp`, 900, 1600, 'Modelos enfileirados em tons de vermelho e franjas verdes, com o reflexo no piso.'),
      px(`${SP}/g1.webp`, 1080, 1920, 'Mulher de costas caminhando em luz azul.'),
      px(`${SP}/ruc-23.webp`, 1080, 1920, 'Silhueta de modelo em luz azul, com o selo .RUC. São Paulo.'),
    ],
  },
  { kind: 'embed', url: 'https://www.instagram.com/p/Da5fZDlOfoj/' },
  {
    kind: 'carousel',
    variant: 'tall',
    labelEN: 'Films',
    labelPT: 'Filmes',
    items: [
      { src: `${VID}/ruc-24.mp4`, poster: `${SP}/ruc-24-poster.webp`, w: 720, h: 1280, alt: 'Filme: close de modelo de vestido azul de crochê na passarela.' },
      { src: `${VID}/ruc-18.mp4`, poster: `${SP}/ruc-18-poster.webp`, w: 720, h: 1280, alt: 'Filme: Brasil Eco Fashion Week, desfile visto de frente.' },
      { src: `${VID}/ruc-19.mp4`, poster: `${SP}/ruc-19-poster.webp`, w: 720, h: 1280, alt: 'Filme: cinematic fashion edit, em luz azul e magenta.' },
      { src: `${VID}/ruc-22.mp4`, poster: `${SP}/ruc-22-poster.webp`, w: 720, h: 1280, alt: 'Filme: modelo de costas na passarela, em movimento.' },
    ],
  },
  { kind: 'embed', url: 'https://www.instagram.com/p/DPKfbR6jmx_/' },
]

export const WORKS: Work[] = [
  {
    slug: 'virtuosa',
    index: '04',
    title: 'LAUDA: Virtuosa',
    disciplines: ['Fashion', 'Art Direction'],
    role: 'Art Director',
    client: 'LAUDA',
    summary: 'Direção de arte e linguagem da campanha Virtuosa, da LAUDA.',
    description:
      'Virtuosa foi inspirada em mulheres habilidosas e naturalmente elegantes, que nos levaram a criar uma harmoniosa reunião de materiais nobres, silhuetas e cores que celebram as múltiplas essências femininas, através da tecitura das nossas coleções.\nA rotina das mulheres contemporâneas demanda, a cada dia mais, criatividade e versatilidade no vestir. Para acompanhá-las em todos os momentos do dia, idealizamos cada roupa para atender diversos estilos de vida, possibilitando diferentes combinações, sempre com muita personalidade.',
    descriptionEn:
      'Virtuosa was inspired by skilled, naturally elegant women, who led us to create a harmonious gathering of noble materials, silhouettes and colors that celebrate the many feminine essences, through the weaving of our collections.\nThe routine of contemporary women demands, more every day, creativity and versatility in dressing. To accompany them through every moment of the day, we designed each garment to suit different lifestyles, allowing different combinations, always with plenty of personality.',
    selected: true,
    cardCover: `${base}/virtuosa/card-sonata.webp`, // 6 modelos em fila, pedido do fundador 20/10/2026
    media: {
      cover: `${base}/virtuosa/pp-01.webp`,
      gallery: [
        `${base}/virtuosa/pp-02.webp`,
        `${base}/virtuosa/pp-drop2.gif`,
      ],
    },
    highlights: [
      {
        index: 'virtuosa-inst',
        name: 'INSTITUCIONAL',
        client: 'LAUDA',
        descriptionEN: "Institutional portraits for LAUDA's Virtuosa campaign.",
        descriptionPT: 'Retratos institucionais da campanha Virtuosa, da LAUDA.',
        frames: [
          { src: `${base}/virtuosa/lauda-inst-02.webp`, alt: 'Segundo retrato institucional da LAUDA, mulher de preto.', role: 'Institucional' },
          { src: `${base}/virtuosa/lauda-inst-01.webp`, alt: 'Retrato institucional da LAUDA, mulher de preto.', role: 'Institucional' },
        ],
      },
      {
        index: 'virtuosa-cat',
        name: 'CATEGORIA',
        client: 'LAUDA',
        descriptionEN: "Category pieces for LAUDA's Virtuosa campaign.",
        descriptionPT: 'Peças de categoria da campanha Virtuosa, da LAUDA.',
        frames: [
          {
            src: `${base}/virtuosa/lauda-cat-00-poster.webp`,
            alt: 'Capa da categoria LAUDA, shop por categoria.',
            role: 'Categoria',
            ms: 4000,
            video: {
              av1: `${base}/virtuosa/lauda-cat-00.av1.mp4`,
              h264: `${base}/virtuosa/lauda-cat-00.mp4`,
            },
          },
          { src: `${base}/virtuosa/lauda-cat-02.webp`, alt: 'Peça de categoria da campanha Virtuosa.', role: 'Categoria' },
          { src: `${base}/virtuosa/lauda-cat-03.webp`, alt: 'Peça de categoria da campanha Virtuosa.', role: 'Categoria' },
          { src: `${base}/virtuosa/lauda-cat-04.webp`, alt: 'Peça de categoria da campanha Virtuosa.', role: 'Categoria' },
          { src: `${base}/virtuosa/lauda-cat-05.webp`, alt: 'Peça de categoria da campanha Virtuosa.', role: 'Categoria' },
        ],
      },
      {
        index: 'virtuosa-body-sonata',
        name: 'BODY SONATA',
        client: 'LAUDA',
        descriptionEN: 'Institutional Body Sonata stories for LAUDA, dark looks.',
        descriptionPT: 'Stories institucionais Body Sonata, da LAUDA, looks escuros.',
        frames: [
          { src: `${base}/virtuosa/st03-01.webp`, alt: 'Seis figuras de preto lado a lado sobre fundo cinza, com o logotipo LAUDA ao fundo.', role: 'Institucional Body Sonata' },
          { src: `${base}/virtuosa/st03-02.webp`, alt: 'Mulher de macacão preto, mãos na cintura, sobre fundo cinza.', role: 'Institucional Body Sonata' },
          { src: `${base}/virtuosa/st03-03.webp`, alt: 'Colagem de looks pretos com a modelo repetida em recortes.', role: 'Institucional Body Sonata' },
          { src: `${base}/virtuosa/st03-04.webp`, alt: 'Fundo escuro com silhuetas pretas e o logotipo LAUDA ao centro.', role: 'Institucional Body Sonata' },
        ],
      },
      {
        index: 'virtuosa-composizione',
        name: 'COMPOSIZIONE',
        client: 'LAUDA',
        descriptionEN: 'Composizione stories for LAUDA, light looks.',
        descriptionPT: 'Stories Composizione, da LAUDA, looks claros.',
        frames: [
          { src: `${base}/virtuosa/st04-01.webp`, alt: 'Abertura sobre tecido xadrez marrom com o menu da coleção.', role: 'Composizione' },
          { src: `${base}/virtuosa/st04-02.webp`, alt: 'Mulher de costas em casaco longo de alfaiataria sobre fundo cinza, com texto sobre os tecidos.', role: 'Composizione' },
          { src: `${base}/virtuosa/st04-03.webp`, alt: 'Mulher de blazer xadrez marrom, blusa amarela e calça larga.', role: 'Composizione' },
          { src: `${base}/virtuosa/st04-04.webp`, alt: 'Detalhe de calça larga de tecido xadrez marrom.', role: 'Composizione' },
          { src: `${base}/virtuosa/st04-05.webp`, alt: 'Close de casaco xadrez marrom com lenço amarelo e o logotipo LAUDA.', role: 'Composizione' },
        ],
      },
      {
        index: 'virtuosa-polo',
        name: 'POLO',
        client: 'LAUDA',
        descriptionEN: 'Polo shirt stories for LAUDA, April content.',
        descriptionPT: 'Stories da camisa polo, da LAUDA, conteúdo de abril.',
        frames: [
          {
            src: `${base}/virtuosa/st05-video-poster.webp`,
            alt: 'Mulher sentada em cadeira de madeira com uma camisa polo branca em destaque e o texto Ícone dentro e fora das quadras.',
            role: 'Polo',
            video: {
              av1: `${base}/virtuosa/st05-video.av1.mp4`,
              h264: `${base}/virtuosa/st05-video.mp4`,
              hasAudio: true,
            },
          },
          { src: `${base}/virtuosa/st05-01.webp`, alt: 'Mulher sentada ao lado de um cachorro marrom, com o texto Ícone dentro e fora das quadras.', role: 'Polo' },
          { src: `${base}/virtuosa/st05-02.webp`, alt: 'Foto em preto e branco de um tenista, com texto sobre o ano de 1936.', role: 'Polo' },
          { src: `${base}/virtuosa/st05-03.webp`, alt: 'Fotos em preto e branco de tenistas em quadra, com texto sobre a história da camisa polo.', role: 'Polo' },
          { src: `${base}/virtuosa/st05-04.webp`, alt: 'Retrato antigo em preto e branco, com o texto Em 1933 e uma descrição.', role: 'Polo' },
          { src: `${base}/virtuosa/st05-05.webp`, alt: 'Mulher sentada ao lado de um cachorro marrom, com o texto Conheça as nossas versões da camisa polo.', role: 'Polo' },
          { src: `${base}/virtuosa/st05-06.webp`, alt: 'Camisa polo branca Regina sobre fundo claro, com descrição do produto.', role: 'Polo' },
          { src: `${base}/virtuosa/st05-07.webp`, alt: 'Camisa polo branca Pétalas sobre fundo claro, com descrição do produto.', role: 'Polo' },
          { src: `${base}/virtuosa/st05-08.webp`, alt: 'Mulher de conjunto polo e short claros diante de painel de madeira.', role: 'Polo' },
        ],
      },
      {
        index: 'virtuosa-domingo',
        name: 'DOMINGO',
        client: 'LAUDA',
        descriptionEN: 'Sunday stories for LAUDA, July content.',
        descriptionPT: 'Stories de domingo, da LAUDA, conteúdo de julho.',
        frames: [
          { src: `${base}/virtuosa/st06-01.webp`, alt: 'Mulher de moletom com capuz e calça bege sobre fundo cinza, com o texto Shop now.', role: 'Domingo' },
          { src: `${base}/virtuosa/st06-02.webp`, alt: 'Detalhe de moletom e calça bege, com o texto Get the look.', role: 'Domingo' },
          { src: `${base}/virtuosa/st06-03.webp`, alt: 'Look completo de moletom e calça bege, com o texto Get the look.', role: 'Domingo' },
          { src: `${base}/virtuosa/st06-04.webp`, alt: 'Detalhe de calça bege e sapato de salto, sobre fundo cinza.', role: 'Domingo' },
        ],
      },
      {
        index: 'virtuosa-marrom',
        name: 'MARROM',
        client: 'LAUDA',
        descriptionEN: 'Brown on the radar: LAUDA stories in rust tones.',
        descriptionPT: 'Marrom no radar: stories da LAUDA em tons de ferrugem.',
        frames: [
          { src: `${base}/virtuosa/st07-01.webp`, alt: 'Colagem de quatro vistas de um look cor de ferrugem, mulher loira de blazer e calça.', role: 'Marrom no radar' },
          { src: `${base}/virtuosa/st07-02.webp`, alt: 'Peça Marrom no radar, com blazer e calça cor de ferrugem sobre fundo claro.', role: 'Marrom no radar' },
          { src: `${base}/virtuosa/st07-03.webp`, alt: 'Peça Marrom no radar, com vestido cor de ferrugem sobre fundo claro.', role: 'Marrom no radar' },
          { src: `${base}/virtuosa/st07-04.webp`, alt: 'Peça Marrom no radar, com blazer e calça cor de ferrugem sobre fundo claro.', role: 'Marrom no radar' },
          { src: `${base}/virtuosa/st07-05.webp`, alt: 'Colagem de vistas do look cor de ferrugem, com o texto Confira já.', role: 'Marrom no radar' },
          { src: `${base}/virtuosa/st07-06.webp`, alt: 'Mulher de blazer e calça cor de ferrugem, com o texto Marrom no radar.', role: 'Marrom no radar' },
        ],
      },
      {
        index: 'virtuosa-namorados',
        name: 'NAMORADOS',
        client: 'LAUDA',
        descriptionEN: 'Virtuosa Drop III, Valentine\'s Day pieces.',
        descriptionPT: 'Peças da Virtuosa Drop III, Dia dos Namorados.',
        frames: [
          { src: `${base}/virtuosa/st08-01.webp`, alt: 'Três modelos de vestido vermelho e preto sobre fundo bordô, com o título VIRTUOSA.', role: 'Virtuosa Drop III' },
          { src: `${base}/virtuosa/st08-02.webp`, alt: 'Mulher loira de vestido vermelho sobre fundo bordô, com o título VIRTUOSA.', role: 'Virtuosa Drop III' },
          { src: `${base}/virtuosa/st08-03.webp`, alt: 'Mulher loira de vestido preto com renda sobre fundo bordô, com o título VIRTUOSA.', role: 'Virtuosa Drop III' },
          { src: `${base}/virtuosa/st08-04.webp`, alt: 'Mulher loira de vestido preto sobre fundo bordô, com o título VIRTUOSA.', role: 'Virtuosa Drop III' },
          { src: `${base}/virtuosa/st08-05.webp`, alt: 'Fundo bordô com o título VIRTUOSA e o convite para conferir no site.', role: 'Virtuosa Drop III' },
          { src: `${base}/virtuosa/st08-06.webp`, alt: 'Duas modelos de vestido preto e vermelho sobre fundo bordô, com o título VIRTUOSA.', role: 'Virtuosa Drop III' },
          { src: `${base}/virtuosa/st08-07.webp`, alt: 'Close de braços e tecido preto sobre fundo escuro, com o título VIRTUOSA.', role: 'Virtuosa Drop III' },
        ],
      },
    ],
    coverAlt: 'Campanha Virtuosa, da LAUDA, imagem de capa.',
    galleryAlts: [
      'Campanha Virtuosa, da LAUDA, imagem da coleção.',
      'Virtuosa Drop II, da LAUDA, imagem em movimento.',
    ],
    credits: [
      { roleEN: 'Stills', rolePT: 'Stills', name: 'Bruno Barreto' },
      { roleEN: 'Make up & hair', rolePT: 'Maquiagem e cabelo', name: 'Hicaro Thales' },
      { roleEN: 'Executive production', rolePT: 'Produção executiva', name: 'Aileen Beattie' },
      { roleEN: 'Art director', rolePT: 'Direção de arte', name: 'Felipe Tavares' },
    ],
    lookbook: LOOKBOOK,
    feedGrid: FEED_GRID,
    provisional: ['role', 'summary'],
  },
  {
    slug: 'capsula-brasilidade',
    index: '02',
    title: 'Cápsula Brasilidade',
    disciplines: ['Branding'],
    role: 'Art Director / Designer',
    // Cliente corrigido pelo fundador em 16/09/2026: "e um projeto de minha
    // autoria para o cliente BOAH (da epoca que trabalhei la)". Nao era
    // projeto autoral solto, era autoral DENTRO da BOAH.
    client: 'BOAH',
    summary: 'Uma cápsula que traduz brasilidade em conceito, produto e identidade.',
    description:
      'Conceito, embalagem e sistema de identidade de uma cápsula de brasilidade para a BOAH: do folder ao produto, uma leitura contemporânea de repertório brasileiro. Projeto autoral, do período na marca.',
    descriptionEn:
      'Concept, packaging and identity system for a Brazilianness capsule for BOAH: from the folder to the product, a contemporary reading of Brazilian repertoire. An authorial project from the period at the brand.',
    media: {
      cover: `${base}/behance/capsula-brasilidade-boah/01.webp`,
      gallery: [
        `${base}/behance/capsula-brasilidade-boah/02.gif`,
        `${base}/behance/capsula-brasilidade-boah/03.webp`,
        `${base}/behance/capsula-brasilidade-boah/04.webp`,
        `${base}/behance/capsula-brasilidade-boah/05.webp`,
        `${base}/behance/capsula-brasilidade-boah/06.webp`,
        `${base}/behance/capsula-brasilidade-boah/07.webp`,
        `${base}/behance/capsula-brasilidade-boah/08.webp`,
        `${base}/behance/capsula-brasilidade-boah/09.webp`,
        `${base}/capsula-brasilidade/box-01.webp`,
        `${base}/capsula-brasilidade/box-02.webp`,
        `${base}/capsula-brasilidade/pp-bottle-1.webp`,
        `${base}/capsula-brasilidade/pp-bottle-2.webp`,
        `${base}/behance/capsula-brasilidade-boah/10.webp`,
      ],
    },
    provisional: ['role', 'summary', 'description'],
  },
  TIGER_CAPSULE,
  {
    slug: 'blackboah',
    index: '05',
    title: 'BLACKBOAH',
    disciplines: ['Art Direction'],
    role: 'Art Director',
    client: 'BOAH',
    summary: 'Direção de arte e identidade visual.',
    description:
      'Construção de linguagem visual e direção de arte para Blackboah.',
    descriptionEn:
      'Visual language and art direction for Blackboah.',
    media: {
      cover: `${base}/behance/black-boah/01.webp`,
      gallery: [
        `${base}/behance/black-boah/02.gif`,
        `${base}/behance/black-boah/03.webp`,
        `${base}/behance/black-boah/04.webp`,
        `${base}/behance/black-boah/05.gif`,
        `${base}/behance/black-boah/06.webp`,
      ],
    },
    provisional: ['role', 'client', 'summary', 'description'],
  },
  {
    slug: 'arquiloucura',
    index: '06',
    title: 'Arquiloucura',
    disciplines: ['Art Direction', 'Graphic & Motion'],
    role: 'Art Director',
    client: 'Arquiloucura',
    year: '2023',
    summary: 'A magia do Farol da Barra traduzida em sistema visual.',
    description:
      'Direção de arte e sistema gráfico do Bloco Arquiloucura para o Carnaval de Salvador de 2023, com o tema "A Magia do Farol da Barra". Camisa, caneca e peças para redes sociais. O bloco foi fundado em 2011 por estudantes de arquitetura da UFBA e desfila no circuito Sérgio Bezerra, na Barra.',
    descriptionEn:
      'Art direction and graphic system for Bloco Arquiloucura at the 2023 Salvador Carnival, themed "The Magic of Farol da Barra". Shirt, mug and social media pieces. The bloco was founded in 2011 by architecture students at UFBA and parades on the Sérgio Bezerra circuit, in Barra.',
    media: {
      cover: `${base}/behance/arquiloucura/01.webp`,
      gallery: [
        `${base}/behance/arquiloucura/02.webp`,
        `${base}/behance/arquiloucura/03.webp`,
        `${base}/behance/arquiloucura/04.webp`,
        `${base}/behance/arquiloucura/05.gif`,
        `${base}/behance/arquiloucura/06.webp`,
        `${base}/behance/arquiloucura/07.webp`,
        `${base}/behance/arquiloucura/08.webp`,
      ],
    },
    provisional: ['role', 'client', 'summary'],
  },
  {
    slug: 'charlotte',
    index: '08',
    title: 'Charlotte',
    disciplines: ['Branding'],
    role: 'Art Director / Designer',
    client: 'Charlotte',
    summary: 'Identidade e logotipo: branding de assinatura.',
    description:
      'Branding e construção de logotipo para Charlotte.',
    descriptionEn:
      'Branding and logo construction for Charlotte.',
    media: {
      cover: `${base}/behance/charlotte/01.webp`,
      gallery: [
        `${base}/behance/charlotte/02.webp`,
        `${base}/behance/charlotte/03.webp`,
        `${base}/behance/charlotte/04.gif`,
        `${base}/behance/charlotte/05.webp`,
        `${base}/behance/charlotte/06.webp`,
        `${base}/behance/charlotte/07.webp`,
        `${base}/behance/charlotte/08.webp`,
        `${base}/behance/charlotte/09.webp`,
        `${base}/behance/charlotte/10.webp`,
        `${base}/behance/charlotte/11.webp`,
        `${base}/behance/charlotte/12.webp`,
        `${base}/behance/charlotte/13.webp`,
        `${base}/behance/charlotte/14.webp`,
        `${base}/behance/charlotte/15.webp`,
        `${base}/behance/charlotte/16.webp`,
        `${base}/behance/charlotte/17.webp`,
        `${base}/behance/charlotte/18.webp`,
        `${base}/behance/charlotte/19.webp`,
        `${base}/behance/charlotte/20.webp`,
        `${base}/behance/charlotte/21.webp`,
        `${base}/behance/charlotte/22.webp`,
        `${base}/behance/charlotte/23.webp`,
        `${base}/behance/charlotte/24.webp`,
        `${base}/behance/charlotte/25.webp`,
        `${base}/behance/charlotte/26.webp`,
        `${base}/behance/charlotte/27.webp`,
        `${base}/behance/charlotte/28.webp`,
        `${base}/behance/charlotte/29.webp`,
        `${base}/behance/charlotte/30.webp`,
        `${base}/behance/charlotte/31.webp`,
        `${base}/behance/charlotte/32.webp`,
        `${base}/behance/charlotte/33.webp`,
        `${base}/behance/charlotte/34.webp`,
        `${base}/behance/charlotte/35.webp`,
      ],
    },
    provisional: ['role', 'client', 'summary', 'description'],
  },
  {
    slug: 'branded-content-boah',
    index: '09',
    title: 'Branded Content | BOAH',
    disciplines: ['Campaign & Content', 'Fashion'],
    role: 'Content production, community management, graphic design, video editing and social media management',
    rolePT: 'Produção de conteúdo, community management, design gráfico, edição de vídeo e social media management',
    client: 'BOAH',
    summary: 'Branded content e campanhas sazonais para a BOAH.',
    description:
      'Direção de arte de conteúdo de marca para a BOAH: campanhas sazonais, still de produto e conteúdo lifestyle para redes sociais.',
    descriptionEn:
      'Art direction of branded content for BOAH: seasonal campaigns, product still and lifestyle content for social media.',
    // Rodada 22/10/2026: card com o logo recortado (card.webp) sobre o creme exato do arquivo,
    // maior e centralizado de verdade (a capa original tinha margem preta e logo fora do centro).
    cardCover: `${base}/behance/branded-content-boah/card.webp`,
    cardFit: { bg: '#f7f3ed', inset: '20%' },
    highlights: BOAH_HIGHLIGHTS,
    // Rodada 23/10/2026: feed em grade de 3 colunas (estilo perfil do Instagram) e carrosseis
    // de pecas verticais, para ver o conteudo de forma mais fluida.
    blocks: [
      { kind: 'feed', ratio: '4 / 5', labelEN: 'Feed', labelPT: 'Feed', pieces: BOAH_FEED },
      { kind: 'carousel', variant: 'tall', labelEN: 'Looks', labelPT: 'Looks', items: BOAH_LOOKS },
      { kind: 'carousel', variant: 'tall', labelEN: 'Behind the scenes and details', labelPT: 'Bastidores e detalhes', items: BOAH_DETAILS },
      { kind: 'image', src: `${BO}/37.webp`, w: 1401, h: 401, alt: 'Fechamento do case, faixa com a marca BOAH.' },
    ],
    media: {
      cover: `${BO}/01.webp`,
    },
  },
  {
    slug: 'arquimeats-o-baile-de-mascaras',
    index: '10',
    title: 'ArquiMeats: O baile de máscaras',
    disciplines: ['Graphic & Motion', 'Campaign & Content'],
    role: 'Art Director',
    client: 'Meats Espeteria',
    summary: 'Identidade e cobertura do baile de máscaras da Meats Espeteria.',
    description:
      'Identidade e peças do ArquiMeats, baile de máscaras da Meats Espeteria no circuito Sérgio Bezerra, em Salvador. O desafio foi criar algo que lembrasse um bloquinho de rua tradicional, estilo marchinha: tipografia de tom retrô e o vermelho como cor de energia e ação.',
    // Rodada 22/10/2026: o lockup fica a 51,5% da largura da capa; o foco o leva ao centro do card.
    cardFocus: [0.515, 0.48],
    descriptionEn:
      'Identity and pieces for ArquiMeats, the masquerade ball of Meats Espeteria on the Sérgio Bezerra circuit, in Salvador. The challenge was to create something that recalled a traditional street bloco, marchinha style: retro-toned typography and red as the color of energy and action.',
    media: {
      cover: `${base}/behance/arquimeats-o-baile-de-mascaras/01.webp`,
      gallery: [
        `${base}/behance/arquimeats-o-baile-de-mascaras/02.webp`,
        `${base}/behance/arquimeats-o-baile-de-mascaras/03.webp`,
        `${base}/behance/arquimeats-o-baile-de-mascaras/04.webp`,
        `${base}/behance/arquimeats-o-baile-de-mascaras/05.gif`,
        `${base}/behance/arquimeats-o-baile-de-mascaras/06.webp`,
        `${base}/behance/arquimeats-o-baile-de-mascaras/07.webp`,
      ],
    },
  },
  {
    slug: 'spfw-the-paradise',
    index: '01',
    title: 'The Fashion Backstage',
    disciplines: ['Art Direction', 'Fashion'],
    role: 'Creative Director',
    client: 'São Paulo Fashion Week',
    summary: 'Direção de arte e linguagem visual para a São Paulo Fashion Week.',
    description:
      'Antes da passarela, o bastidor. Pelo Runway United Collective (RUC), a câmera acompanhou a moda brasileira de dentro: São Paulo Fashion Week N58, Casa de Criadores 55 e Brasil Eco Fashion Week, em 2024. A luz azul, o corpo a caminho do desfile, o olhar de quem espera a vez.',
    descriptionEn:
      'Before the runway, the backstage. Through Runway United Collective (RUC), the camera followed Brazilian fashion from the inside: São Paulo Fashion Week N58, Casa de Criadores 55 and Brasil Eco Fashion Week, in 2024. The blue light, the body on its way to the show, the gaze of someone waiting for their turn.',
    selected: true,
    // Rodada 23/10/2026: pagina em ritmo. Carrossel de stills, embed, carrossel de bastidor, embed,
    // carrossel de filmes, embed. Os 3 reels do perfil @runwayunited ficam entre os blocos.
    blocks: SPFW_BLOCKS,
    media: {
      cover: `${base}/fashion-backstage/cover.webp`,
    },
    provisional: ['summary'],
  },
  {
    slug: 'crush-coins',
    index: '07',
    title: 'Crush Coins',
    disciplines: ['Graphic & Motion', 'Art Direction'],
    role: 'Art Director',
    client: 'Crush Coins',
    summary: 'Direção de arte e identidade: cultura pop e meme em linguagem visual.',
    description:
      'O cliente precisava de uma estratégia de bonificação em consumação para aniversariantes e ocasiões específicas. O resultado é a CrushCoin, moeda própria do Crush Hall: notas com personalidades do empoderamento feminino, cores vivas e traços das notas do real.',
    descriptionEn:
      'The client needed a strategy for consumption bonuses for birthdays and other specific occasions. The result is the CrushCoin, the own currency of Crush Hall: notes featuring figures of female empowerment, vivid colors and traits of the Brazilian real banknotes.',
    cardFocus: [0.495, 0.5],
    media: {
      cover: `${base}/behance/crush-coins/01.webp`,
      gallery: [
        `${base}/behance/crush-coins/02.gif`,
        `${base}/behance/crush-coins/03.webp`,
        `${base}/behance/crush-coins/04.webp`,
        `${base}/behance/crush-coins/05.webp`,
        `${base}/behance/crush-coins/06.webp`,
        `${base}/behance/crush-coins/07.webp`,
      ],
    },
    provisional: ['role', 'client', 'summary'],
  },
  {
    slug: 'martha-medeiros',
    index: '19',
    title: 'Martha Medeiros',
    disciplines: ['Fashion', 'Art Direction', 'Campaign & Content'],
    role: 'Art Director / Creative Director',
    client: 'Martha Medeiros',
    summary: 'Campanha conceitual Manacá para a Martha Medeiros: identidade, banners, catálogo de WhatsApp e stories.',
    description:
      'Essa construção de campanha e composição foi uma campanha fantasma de apresentação para a marca, por isso não foi circulada.\nPartindo da coleção Manacá, de verão, criamos uma identidade visual própria, com construção, mudança e refinamento de formas e fontes até o símbolo ganhar pregnância. Dela saíram banners de e-commerce, um catálogo de WhatsApp em formato vertical e um set de stories no jogo This or That.\nFerramentas de inteligência artificial generativa foram usadas no desenvolvimento do material.',
    descriptionEn:
      'This campaign and composition was a ghost campaign, a presentation piece for the brand, which is why it was never circulated.\nStarting from the Manacá summer collection, we built a visual identity of its own, shaping and refining forms and typefaces until the symbol became memorable. It gave way to e-commerce banners, a vertical WhatsApp catalog and a This or That story set.\nGenerative AI tools were used in developing the material.',
    media: {
      cover: `${base}/martha-medeiros/cover.webp`,
      gallery: [
        `${base}/martha-medeiros/banner-h.webp`,
        `${base}/martha-medeiros/banner-v.webp`,
        `${base}/martha-medeiros/garden-01.webp`,
        `${base}/martha-medeiros/garden-02.webp`,
        `${base}/martha-medeiros/garden-03.webp`,
        `${base}/martha-medeiros/garden-04.webp`,
        `${base}/martha-medeiros/garden-05.webp`,
        `${base}/martha-medeiros/garden-06.webp`,
        `${base}/martha-medeiros/garden-07.webp`,
        `${base}/martha-medeiros/garden-08.webp`,
        `${base}/martha-medeiros/garden-09.webp`,
        `${base}/martha-medeiros/garden-10.webp`,
      ],
    },
    highlights: [
      {
        index: 'martha-medeiros-this-or-that',
        name: 'THIS OR THAT',
        client: 'Martha Medeiros',
        descriptionEN: 'This or That story set for the Manacá collection, a ghost campaign.',
        descriptionPT: 'Set de stories This or That da coleção Manacá, campanha fantasma.',
        frames: [
          { src: `${base}/martha-medeiros/tot-01.webp`, alt: 'Duas modelos de vestidos azul e verde em rendas, com o texto This or That e o logotipo Manacá.', role: 'This or That' },
          { src: `${base}/martha-medeiros/tot-02.webp`, alt: 'Quatro looks sobre fundo claro, dois claros e dois pink, para votar no favorito.', role: 'This or That' },
          { src: `${base}/martha-medeiros/tot-03.webp`, alt: 'Quatro looks sobre fundo claro, dois verdes e dois brancos, para votar no favorito.', role: 'This or That' },
          { src: `${base}/martha-medeiros/tot-08.webp`, alt: 'Quatro looks sobre fundo claro, dois azuis e dois pretos, para votar no favorito.', role: 'This or That' },
        ],
      },
      {
        index: 'martha-medeiros-catalogo',
        name: 'CATÁLOGO',
        client: 'Martha Medeiros',
        descriptionEN: 'Vertical WhatsApp catalog for the Manacá collection.',
        descriptionPT: 'Catálogo vertical de WhatsApp da coleção Manacá.',
        frames: [
          { src: `${base}/martha-medeiros/cat-00.webp`, alt: 'Capa do catálogo Manacá, modelo de vestido pink diante de folhagem.', role: 'Catálogo' },
          { src: `${base}/martha-medeiros/cat-00001.webp`, alt: 'Página de apresentação da coleção Manacá, com três looks sobre fundo claro.', role: 'Catálogo' },
          { src: `${base}/martha-medeiros/cat-01.webp`, alt: 'Look de blusa e calça pink sobre fundo claro.', role: 'Catálogo' },
          { src: `${base}/martha-medeiros/cat-02.webp`, alt: 'Look pink visto de costas e de frente.', role: 'Catálogo' },
          { src: `${base}/martha-medeiros/cat-04.webp`, alt: 'Vestido curto branco de renda sobre fundo claro.', role: 'Catálogo' },
          { src: `${base}/martha-medeiros/cat-07.webp`, alt: 'Vestido longo azul de babados sobre fundo claro.', role: 'Catálogo' },
          { src: `${base}/martha-medeiros/cat-09.webp`, alt: 'Vestido longo azul de babados, em plano mais próximo.', role: 'Catálogo' },
          { src: `${base}/martha-medeiros/cat-11.webp`, alt: 'Contracapa do catálogo Manacá, modelo de vestido pink e o endereço do site da marca.', role: 'Catálogo' },
        ],
      },
    ],
    coverAlt: 'Manacá, da Martha Medeiros: quatro modelos de vestidos de festa em meio à folhagem, com o logotipo ao centro.',
    galleryAlts: [
      'Banner horizontal da coleção Manacá, com modelo de vestido pink e o logotipo.',
      'Banner vertical da coleção Manacá, com modelo de vestido pink e o logotipo.',
      'Duas modelos de vestidos estampados em pink e branco, de costas e de frente, na mata.',
      'Modelo de vestido longo rosa de renda com fenda, na mata.',
      'Duas modelos, de vestido azul de babados e vestido verde de renda.',
      'Duas modelos de vestidos amarelos de mangas bufantes.',
      'Duas modelos de vestidos verdes de renda e babados.',
      'Modelo de vestido longo azul de renda, saia ampla.',
      'Duas modelos, de vestido azul e de top com saia verdes.',
      'Duas modelos de vestidos brancos de renda.',
      'Modelo de vestido pink de ombros de fora, saia em movimento.',
      'Modelo de vestido rosa de camadas.',
    ],
    credits: [
      { roleEN: 'Stills', rolePT: 'Stills', name: 'André Salcedo' },
      { roleEN: 'Art director', rolePT: 'Direção de arte', name: 'Felipe Tavares' },
    ],
    provisional: ['summary'],
  },
  {
    slug: 'festival-de-arte-e-gastronomia',
    index: '14',
    title: 'Festival de Arte e Gastronomia',
    disciplines: ['Graphic & Motion', 'Campaign & Content'],
    role: 'Art Director',
    summary: 'Identidade e peças de divulgação do Festival de Arte e Gastronomia.',
    description:
      'Key visual e peças de divulgação para a 5ª edição do Festival de Arte e Gastronomia, com o tema do cacau ao chocolate.',
    descriptionEn:
      'Key visual and promotional pieces for the 5th edition of the Festival de Arte e Gastronomia, themed from cocoa to chocolate.',
    // Rodada 22/10/2026: a capa da pagina passa a ser o key visual 16:9 em 2560x1440 (antes o 05, 4:5,
    // era cortado em 16:9). O 05 segue no card, na proporcao nativa, e entra na galeria.
    cardCover: `${base}/behance/festival-de-arte-e-gastronomia/05.webp`,
    cardRatio: '4 / 5',
    // Rodada 23/10/2026: as 21 pecas viram um feed de Instagram, 3 por fileira (4 / 5, a proporcao do arquivo);
    // a faixa 23 fecha a pagina como veio.
    blocks: [
      { kind: 'feed', ratio: '4 / 5', labelEN: 'Feed', labelPT: 'Feed', pieces: FEST_FEED },
      { kind: 'image', src: `${base}/behance/festival-de-arte-e-gastronomia/23.webp`, w: 851, h: 315, alt: 'Faixa de fechamento com o cacau e a frase Mais que um festival, um movimento.' },
    ],
    media: {
      cover: `${base}/behance/festival-de-arte-e-gastronomia/01.webp`,
    },
  },
]

// arquivadas em 09/10/2026 por ordem do fundador (#01 CHANGES)
export const ARCHIVED_WORKS: Work[] = [
  {
    slug: 'bahia-em-cores-quentes',
    index: '18',
    title: 'Bahia em cores quentes',
    disciplines: ['Fashion'],
    role: 'Photographer',
    summary: 'Ensaio de moda e retrato em Salvador, Bahia.',
    description:
      'Ensaio de moda e retrato ao ar livre, nas paisagens de Salvador, Bahia.',
    descriptionEn:
      'Outdoor fashion and portrait shoot in the landscapes of Salvador, Bahia.',
    media: {
      cover: `${base}/behance/bahia-em-cores-quentes/01.webp`,
      gallery: [
        `${base}/behance/bahia-em-cores-quentes/02.webp`,
        `${base}/behance/bahia-em-cores-quentes/03.webp`,
        `${base}/behance/bahia-em-cores-quentes/04.webp`,
        `${base}/behance/bahia-em-cores-quentes/05.webp`,
        `${base}/behance/bahia-em-cores-quentes/06.webp`,
        `${base}/behance/bahia-em-cores-quentes/07.webp`,
        `${base}/behance/bahia-em-cores-quentes/08.webp`,
        `${base}/behance/bahia-em-cores-quentes/09.webp`,
        `${base}/behance/bahia-em-cores-quentes/10.webp`,
        `${base}/behance/bahia-em-cores-quentes/11.webp`,
        `${base}/behance/bahia-em-cores-quentes/12.webp`,
        `${base}/behance/bahia-em-cores-quentes/13.webp`,
        `${base}/behance/bahia-em-cores-quentes/14.webp`,
        `${base}/behance/bahia-em-cores-quentes/15.webp`,
        `${base}/behance/bahia-em-cores-quentes/16.webp`,
        `${base}/behance/bahia-em-cores-quentes/17.webp`,
        `${base}/behance/bahia-em-cores-quentes/18.webp`,
        `${base}/behance/bahia-em-cores-quentes/19.webp`,
      ],
    },
  },
  {
    slug: 'o-18-years',
    index: '03',
    title: 'DEZOITÔ',
    disciplines: ['Campaign & Content'],
    role: 'Creative Director',
    client: '@odecasahostel',
    summary: '18 anos do hostel brasileiro mais premiado.',
    description:
      'Campaign & Content Production. 18 years of the most awarded Brazilian hostel. A campaign showing all the gen Z lifestyle of a place that is a meeting point for many cultures around the globe. / 18 anos do hostel brasileiro mais premiado: uma campanha que mostra todo o estilo de vida da geração Z em um lugar que é ponto de encontro de diversas culturas ao redor do mundo.',
    selected: true,
    media: {
      cover: `${base}/o-18-years/cover.webp`,
      gallery: [`${base}/o-18-years/g1.webp`, `${base}/o-18-years/g2.webp`],
    },
  },
  {
    slug: 'promomeats',
    index: '11',
    title: 'PromoMeats',
    disciplines: ['Campaign & Content'],
    role: 'Community Manager',
    client: 'Meats Espeteria',
    summary: 'Peças promocionais para redes sociais da Meats Espeteria.',
    description:
      'Peças gráficas e stories promocionais para o Instagram da Meats Espeteria.',
    descriptionEn:
      'Graphic pieces and promotional stories for the Instagram of Meats Espeteria.',
    media: {
      cover: `${base}/behance/promomeats/01.webp`,
      gallery: [
        `${base}/behance/promomeats/02.webp`,
        `${base}/behance/promomeats/03.webp`,
        `${base}/behance/promomeats/04.webp`,
        `${base}/behance/promomeats/05.webp`,
        `${base}/behance/promomeats/06.webp`,
        `${base}/behance/promomeats/07.webp`,
      ],
    },
  },
  {
    slug: 'meats-content',
    index: '12',
    title: 'Meats Content',
    disciplines: ['Campaign & Content'],
    role: 'Community Manager',
    client: 'Meats Espeteria',
    summary: 'Conteúdo de redes sociais da Meats Espeteria.',
    description:
      'Produção de peças para stories e feed da Meats Espeteria, no período como Community Manager da marca.',
    descriptionEn:
      'Production of pieces for stories and feed of Meats Espeteria, during the period as the brand Community Manager.',
    media: {
      cover: `${base}/behance/meats-content/01.webp`,
      gallery: [
        `${base}/behance/meats-content/02.webp`,
        `${base}/behance/meats-content/03.webp`,
        `${base}/behance/meats-content/04.webp`,
        `${base}/behance/meats-content/05.webp`,
        `${base}/behance/meats-content/06.webp`,
        `${base}/behance/meats-content/07.webp`,
        `${base}/behance/meats-content/08.webp`,
        `${base}/behance/meats-content/09.webp`,
        `${base}/behance/meats-content/10.webp`,
      ],
    },
  },
  {
    slug: 'max-vidros',
    index: '13',
    title: 'Max Vidros',
    disciplines: ['Branding'],
    role: 'Designer',
    client: 'Max Vidros',
    summary: 'Identidade visual e logotipo da Max Vidros.',
    description:
      'Construção de conceito, logotipo e aplicações de identidade visual para a Max Vidros.',
    descriptionEn:
      'Concept, logo and visual identity applications for Max Vidros.',
    media: {
      cover: `${base}/behance/max-vidros/09.webp`,
      gallery: [
        `${base}/behance/max-vidros/01.webp`,
        `${base}/behance/max-vidros/02.webp`,
        `${base}/behance/max-vidros/03.webp`,
        `${base}/behance/max-vidros/04.webp`,
        `${base}/behance/max-vidros/05.webp`,
        `${base}/behance/max-vidros/06.webp`,
        `${base}/behance/max-vidros/07.webp`,
        `${base}/behance/max-vidros/08.webp`,
        `${base}/behance/max-vidros/10.webp`,
        `${base}/behance/max-vidros/11.webp`,
        `${base}/behance/max-vidros/12.webp`,
      ],
    },
  },
  {
    slug: 'cores-e-sabores',
    index: '15',
    title: 'Cores e Sabores',
    disciplines: ['Art Direction'],
    role: 'Photographer',
    summary: 'Still de produto em cor forte.',
    description:
      'Ensaio still-life de picolés e frutas, em cor saturada.',
    descriptionEn:
      'Still-life shoot of popsicles and fruit, in a vivid color palette.',
    media: {
      cover: `${base}/behance/cores-e-sabores/01.webp`,
      gallery: [
        `${base}/behance/cores-e-sabores/02.webp`,
        `${base}/behance/cores-e-sabores/03.webp`,
        `${base}/behance/cores-e-sabores/04.webp`,
        `${base}/behance/cores-e-sabores/05.webp`,
        `${base}/behance/cores-e-sabores/06.webp`,
        `${base}/behance/cores-e-sabores/07.webp`,
        `${base}/behance/cores-e-sabores/08.webp`,
        `${base}/behance/cores-e-sabores/09.webp`,
        `${base}/behance/cores-e-sabores/10.webp`,
        `${base}/behance/cores-e-sabores/11.webp`,
        `${base}/behance/cores-e-sabores/12.webp`,
      ],
    },
  },
  {
    slug: 'grocery-store',
    index: '16',
    title: 'Grocery Store',
    disciplines: ['Fashion'],
    role: 'Photographer',
    summary: 'Ensaio de moda e beleza num mercadinho.',
    description:
      'Ensaio de moda e beleza fotografado nos corredores de um mercadinho.',
    descriptionEn:
      'Fashion and beauty shoot photographed in the aisles of a grocery store.',
    media: {
      cover: `${base}/behance/grocery-store/04.webp`,
      gallery: [
        `${base}/behance/grocery-store/01.webp`,
        `${base}/behance/grocery-store/02.webp`,
        `${base}/behance/grocery-store/03.webp`,
        `${base}/behance/grocery-store/05.webp`,
        `${base}/behance/grocery-store/06.webp`,
        `${base}/behance/grocery-store/07.webp`,
        `${base}/behance/grocery-store/08.webp`,
      ],
    },
  },
  {
    slug: 'bw-mood',
    index: '17',
    title: 'B&W Mood',
    disciplines: ['Fashion'],
    role: 'Photographer',
    summary: 'Ensaio de retrato em preto e branco.',
    description:
      'Ensaio de retrato e casal em preto e branco, luz natural de fim de tarde.',
    descriptionEn:
      'Portrait and couple shoot in black and white, natural late-afternoon light.',
    media: {
      cover: `${base}/behance/bw-mood/05.webp`,
      gallery: [
        `${base}/behance/bw-mood/01.webp`,
        `${base}/behance/bw-mood/02.webp`,
        `${base}/behance/bw-mood/03.webp`,
        `${base}/behance/bw-mood/04.webp`,
        `${base}/behance/bw-mood/06.webp`,
        `${base}/behance/bw-mood/07.webp`,
        `${base}/behance/bw-mood/08.webp`,
        `${base}/behance/bw-mood/09.webp`,
        `${base}/behance/bw-mood/10.webp`,
      ],
    },
  },
]

export const findWork = (slug: string): Work | undefined => WORKS.find((w) => w.slug === slug)
export const selectedWorks = (): Work[] => WORKS.filter((w) => w.selected)
export const isProv = (w: Work, f: ProvField): boolean => !!w.provisional?.includes(f)

// -----------------------------------------------------------------------------
// CREATOR PAGE 2.0 (redesign PRJ TAVARISTICO 2.0, briefing "TAVARISTICO /
// CREATOR PAGE 2.0"). Listas novas, com os textos exatos do briefing. Nome,
// categoria e descricao de cada territorio sao conteudo de portfolio, nao
// traduzido, mesma regra do resto deste arquivo.
//
// VENTURES: a secao "Selected Work" (parte 10 do briefing). CRIVO, .TBF,
// BRAND SYSTEM e .RUC sao os territorios do fundador fora da publicidade, sem
// pagina propria neste repo, por isso o `href` fica vazio nos que nao tem
// rota real (ver relatorio de entrega). O item TAVARISTICO foi removido
// (correcao do fundador, 09/09/2026): a galeria que vem logo depois na pagina
// ja e a prova daquele territorio, item redundante.
// -----------------------------------------------------------------------------

export type VentureWeight = 'primary' | 'secondary'

/**
 * Um quadro de story. Mesma forma do `StoryItem` do StoryPlayer, declarada
 * aqui para o arquivo de dados nao importar componente (regra: dado nao
 * depende de tela). `overlay` e a sobreposicao de texto branco sobre degrade
 * preto, aberta pelo fundador em 10/09/2026; quadro sem ela continua liso.
 */
export interface StoryFrame {
  src: string
  alt: string
  role: string
  /**
   * Bilíngue desde 10/09/2026: o pedido do fundador foi "PT/EN de tudo,
   * inclusive stories", e o overlay tinha nascido só em inglês na leva da
   * noite anterior. Mesmo par EN/PT de `Campaign.descriptionEN/PT` acima.
   * Quem escolhe o idioma é o componente que monta os frames (`lang` já
   * chega até ele); o StoryPlayer continua recebendo string pronta.
   */
  overlay?: { titleEN: string; titlePT: string; kickerEN?: string; kickerPT?: string }
  /**
   * QUADRO EM MOVIMENTO (11/09/2026). `src` continua sendo o poster e a
   * miniatura; isto aqui e o filme que entra por cima. Par AV1 + H.264, a
   * mesma escada do HeroVideo. Quadro sem `video` segue foto parada.
   */
  video?: { av1: string; h264: string; hasAudio?: boolean }
  /** Tempo do quadro em ms. Sem ele, vale o do deck (2800). Video pede o seu. */
  ms?: number
}

export interface Venture {
  index: string
  name: string
  /** categoria em partes: o separador visual (ponto medio) e do componente,
   * nunca uma barra escrita no dado (correcao do fundador, 09/09/2026). */
  category: string[]
  description: string
  /** peso visual. Correcao 09/09/2026: todos iguais, o 04 nao pode ficar
   * menor que os outros. Campo mantido para uso futuro. */
  weight: VentureWeight
  /** rota interna, quando existe. Vazio: sem pagina propria neste repo. */
  href?: string
  /** capa do circulo de story, identidade visual do proprio projeto */
  cover: string
  /** alt da capa */
  coverAlt: string
  /**
   * A SEQUENCIA de quadros 9:16 do story (10/09/2026). Antes era UM quadro so,
   * a marca centrada em fundo preto: abria o story e nao dizia nada. Pedido do
   * fundador: "para cada projeto elabore uma sequencia curta de stories falando
   * sobre e com imagens". Cada quadro leva imagem propria e uma frase branca
   * sobre degrade, no mesmo tratamento do nome no hero desta pagina.
   *
   * Texto em ingles nos dois idiomas, seguindo o que ja valia para `name`,
   * `category` e `description` deste mesmo dado: nome de projeto e territorio
   * nao se traduzem aqui.
   */
  frames: StoryFrame[]
}

export const VENTURES: Venture[] = [
  {
    index: '01',
    name: 'CRIVO',
    category: ['AI AGENTS', 'PRODUCT DEVELOPMENT'],
    description: 'AI-powered supplier intelligence for corporate events.',
    weight: 'primary',
    cover: `${base}/ventures/crivo.webp`,
    coverAlt: 'CRIVO',
    // Os cinco quadros saem do DECK V3 do proprio projeto (repo privado
    // `thebrfactory/crivo-pitch`, o link que ele ja tinha): cada frame e um
    // slide real da apresentacao, montado no formato vertical. Nenhum numero
    // aqui e meu: todos estao no deck, com fonte declarada la.
    frames: [
      {
        src: `${stories}/crivo/01-capa.webp`,
        alt: 'CRIVO, capa do deck: Autopilot de Eventos.',
        role: 'Deck cover',
        overlay: {
          kickerEN: 'AI AGENTS · PRODUCT',
          kickerPT: 'AGENTES DE IA · PRODUTO',
          titleEN: 'An autopilot for corporate events. It researches, verifies and ranks suppliers, and hands back the decision.',
          titlePT: 'Piloto automático para eventos corporativos. Pesquisa, verifica, ranqueia fornecedor e devolve a decisão pronta.',
        },
      },
      {
        src: `${stories}/crivo/02-dor.webp`,
        alt: 'Slide do problema: R$ 400 mil desaparecidos com uma produtora.',
        role: 'The problem',
        overlay: {
          kickerEN: 'THE PROBLEM',
          kickerPT: 'O PROBLEMA',
          titleEN: 'Hiring an event supplier in Brazil is still an act of faith. R$400k once vanished with one producer.',
          titlePT: 'Contratar fornecedor de evento no Brasil ainda é ato de fé. Uma vez, R$400 mil sumiram com uma produtora.',
        },
      },
      {
        src: `${stories}/crivo/03-agentes.webp`,
        alt: 'Slide da arquitetura: quatro agentes, uma chave de API.',
        role: 'How it works',
        overlay: {
          kickerEN: 'HOW IT WORKS',
          kickerPT: 'COMO FUNCIONA',
          titleEN: 'Four agents, one API key. The score is deterministic code, not a model guessing a number.',
          titlePT: 'Quatro agentes, uma chave de API. A nota sai de código determinístico, não de um modelo chutando número.',
        },
      },
      {
        src: `${stories}/crivo/04-veredito.webp`,
        alt: 'Slide dos vereditos: verificado, atencao, evitar.',
        role: 'The verdict',
        overlay: {
          kickerEN: 'THE VERDICT',
          kickerPT: 'O VEREDITO',
          titleEN: 'Every supplier leaves with a verdict, and with the honest list of what could not be checked.',
          titlePT: 'Todo fornecedor sai com um veredito, e com a lista honesta do que não deu para checar.',
        },
      },
      {
        src: `${stories}/crivo/05-valor.webp`,
        alt: 'Slide de valor: de 20 a 40 horas para cerca de 15 minutos.',
        role: 'The value',
        overlay: {
          kickerEN: 'WINNER · ATON PRAXIS HACKATHON, 2026',
          kickerPT: 'VENCEDOR · ATON PRAXIS HACKATHON, 2026',
          titleEN: 'From forty hours of WhatsApp to fifteen minutes of decision, with clickable evidence on every line.',
          titlePT: 'De quarenta horas de WhatsApp a quinze minutos de decisão, com prova clicável em cada linha.',
        },
      },
    ],
  },
  {
    index: '02',
    name: 'VERÃOZÃO',
    category: ['CAMPAIGN', 'ART DIRECTION'],
    description: 'A summer campaign for Ô de Casa, the most awarded Brazilian hostel.',
    weight: 'primary',
    cover: `${base}/ventures/veraozao.webp`,
    coverAlt: 'VERÃOZÃO, Ô de Casa',
    // 14/10/2026: as pecas sao as NOVAS do Tavaristico (TAV05, PERSONAL
    // PRESENTATION/VERAOZAO), 1080x1920 nativas, com o texto ja gravado no
    // arquivo: por isso nenhum quadro leva `overlay`. Capas primeiro, depois a
    // numeracao, e o filme BASE-2 (sem audio) fecha. As antigas seguem em
    // `/images/pitch/veraozao/` porque o case do /pitch ainda as usa.
    frames: [
      {
        src: `${stories}/veraozao/01-capa1.webp`,
        alt: 'Capa 1 da campanha VERÃOZÃO: estandarte do Ô de Casa na rua, com o título Gringo Loco.',
        role: 'Cover 1',
      },
      {
        src: `${stories}/veraozao/02-capa4.webp`,
        alt: 'Capa 4 da campanha VERÃOZÃO: close de um rapaz com chifres de diabo e um copo na mão.',
        role: 'Cover 4',
      },
      {
        src: `${stories}/veraozao/03-01.webp`,
        alt: 'Peça 01 da campanha VERÃOZÃO: estandarte colorido e mão em primeiro plano.',
        role: 'Piece 01',
      },
      {
        src: `${stories}/veraozao/06-01-copy-10.webp`,
        alt: 'Peça da campanha VERÃOZÃO: piscina em São Paulo.',
        role: 'Pool',
      },
      {
        src: `${stories}/veraozao/07-01-copy-12.webp`,
        alt: 'Peça da campanha VERÃOZÃO: o hostel acontece aqui.',
        role: 'Here',
      },
      {
        src: `${stories}/veraozao/08-01-copy-17.webp`,
        alt: 'Peça da campanha VERÃOZÃO: a água da piscina ao sol.',
        role: 'Water',
      },
      {
        src: `${stories}/veraozao/09-01-copy-22.webp`,
        alt: 'Peça da campanha VERÃOZÃO: samba, mãos e camisa listrada.',
        role: 'Samba',
      },
      {
        src: `${stories}/veraozao/10-02.webp`,
        alt: 'Peça 02 da campanha VERÃOZÃO: bolsa colorida e espuma.',
        role: 'Piece 02',
      },
      {
        src: `${stories}/veraozao/11-02-2.webp`,
        alt: 'Peça 02 (versão 2) da campanha VERÃOZÃO: o estandarte erguido na rua.',
        role: 'Piece 02, v2',
      },
      {
        src: `${stories}/veraozao/12-03.webp`,
        alt: 'Peça 03 da campanha VERÃOZÃO: retrato gritando de alegria, de camisa estampada.',
        role: 'Piece 03',
      },
      {
        src: `${stories}/veraozao/04-01-2.webp`,
        alt: 'Peça 01 (versão 2) da campanha VERÃOZÃO: câmera de TV e o selo do Ô.',
        role: 'Piece 01, v2',
      },
      {
        src: `${stories}/veraozao/05-01-3.webp`,
        alt: 'Peça 01 (versão 3) da campanha VERÃOZÃO: dançarina na festa do hostel.',
        role: 'Piece 01, v3',
      },
      {
        src: `${stories}/veraozao/13-base-poster.jpg`,
        video: {
          av1: '/videos/veraozao/base.av1.mp4',
          h264: '/videos/veraozao/base.mp4',
        },
        ms: 10500,
        alt: 'Filme da campanha VERÃOZÃO: espuma, festa e o selo do Ô.',
        role: 'Film',
      },
    ],
  },
  {
    index: '03',
    name: 'BRANDSYSTEM',
    category: ['AI AGENTS', 'PRODUCT DEVELOPMENT', 'BRANDING'],
    description: "An agentic brand system that connects a company's brand knowledge to its marketing workflow.",
    weight: 'primary',
    cover: '/brand/TBF-AVATAR.webp',
    coverAlt: 'BRANDSYSTEM, .TBF. inc',
    // Nao ha fotografia de um sistema de marca: os quatro quadros sao pecas
    // desenhadas com os proprios ativos da `.TBF.` (`public/brand/`), na
    // paleta da casa.
    // PECAS REAIS, a partir de 10/09/2026. Ate aqui os 4 quadros do BRANDSYSTEM
    // eram as unicas pecas INVENTADAS do lote: nao existe foto de um sistema de
    // marca, entao foram desenhadas com os ativos de `public/brand`. O fundador
    // mandou as telas do proprio .TBF.AURA e elas entraram no lugar.
    // As desenhadas estao inteiras em `public/_ARQUIVO/.../stories/brandsystem/`.
    //
    // O QUE FICOU DE FORA, e por que: das 7 telas de celular que ele mandou, 3
    // nao entraram. A de OVERVIEW traz CNPJ e endereco da sede; a de
    // POSICIONAMENTO traz os ICPs por vertical, que e inteligencia de negocio.
    // Nenhuma das duas ganha nada em ser publicada. A terceira, a Prompt
    // Library, ENTROU com os dois blocos de prompt BORRADOS: a tela conta que o
    // sistema tem uma biblioteca, sem entregar os prompts, que sao ativo da
    // casa. Autorizacao dele: "coloque um blur nas informacoes sensiveis".
    frames: [
      {
        src: `${stories}/brandsystem/01-marca.webp`,
        alt: 'Tela do .TBF.AURA no celular: o índice dos capítulos do sistema de marca.',
        role: 'The brand',
        overlay: {
          kickerEN: 'AI · BRAND · PRODUCT',
          kickerPT: 'IA · MARCA · PRODUTO',
          titleEN: 'A brand always knows more than it manages to repeat.',
          titlePT: 'Toda marca sabe mais do que consegue repetir.',
        },
      },
      {
        src: `${stories}/brandsystem/02-conhecimento.webp`,
        alt: 'Capítulo de introdução do .TBF.AURA, com o livro de branding da casa aberto.',
        role: 'The knowledge',
        overlay: {
          kickerEN: 'THE KNOWLEDGE',
          kickerPT: 'O CONHECIMENTO',
          titleEN: 'Voice, rules and assets stop living inside a PDF nobody opens.',
          titlePT: 'Voz, regra e ativo param de morar dentro de um PDF que ninguém abre.',
        },
      },
      {
        src: `${stories}/brandsystem/03-agente.webp`,
        alt: 'Biblioteca de prompts do sistema, com o conteúdo dos prompts borrado.',
        role: 'The agent',
        overlay: {
          kickerEN: 'THE AGENT',
          kickerPT: 'O AGENTE',
          titleEN: 'The system reads the brand before it writes a single line.',
          titlePT: 'O sistema lê a marca antes de escrever a primeira linha.',
        },
      },
      {
        src: `${stories}/brandsystem/04-fluxo.webp`,
        alt: 'Capítulo do pacote cultural: as referências que formam o DNA da marca.',
        role: 'The output',
        overlay: {
          kickerEN: 'THE OUTPUT',
          kickerPT: 'O RESULTADO',
          titleEN: 'Marketing that comes out on brand because it could not come out any other way.',
          titlePT: 'Marketing que nasce on brand, porque não aprendeu outro jeito.',
        },
      },
    ],
  },
  {
    index: '04',
    name: '.RUNWAY UNTD COLLECTIVE.',
    category: ['FASHION FILM', 'CULTURE', 'CREATIVE DIRECTION'],
    // A BIO LITERAL do @runwayunited, passada por ele em 11/09/2026 (o
    // gallery-dl nao conseguiu ler: o Instagram derrubou a sessao). Fica em
    // ingles nos dois idiomas, como `name` e `category`: bio de perfil e texto
    // proprio da marca, nao se traduz.
    description: 'A Global Creative Collective representing artists across Art, Media & Entertainment. São Paulo-based.',
    weight: 'primary',
    cover: `${base}/ventures/runway-untd.webp`,
    coverAlt: '.RUNWAY UNTD COLLECTIVE.',
    // 🔴 OS QUATRO QUADROS VIRARAM FILME EM 11/09/2026, a pedido dele: passarela
    // e movimento, e provar moda com foto parada prova pela metade. A fonte sao
    // quatro pecas reais do proprio .RUNWAY UNTD COLLECTIVE. (TAV05, Instagram:
    // RUC-24, RUC-22, RUC-09, RUC-12-V2), cortadas em 6s e recodificadas em
    // 720x1280. O poster de cada quadro e um frame DO PROPRIO filme, para o
    // quadro nao piscar uma foto que nao e a do video. As fotos antigas estao
    // em public/_ARQUIVO, nao foram apagadas.
    //
    // Imagem: o corpo de trabalho do SPFW · THE PARADISE, que o proprio WORKS
    // ja declara ser "o mesmo corpo de trabalho de Runway Untd Collective".
    // Texto: a base e o site da label, `/labels/runwayunited`, dicionario em
    // src/content/i18n/pages/labels/runwayunited.ts. Nada foi inventado aqui:
    // as frases sao as da propria label, encurtadas para caber num quadro.
    frames: [
      {
        src: `${stories}/runway-untd/01-passarela.webp`,
        video: {
          av1: '/videos/runway-untd/01-passarela.av1.mp4',
          h264: '/videos/runway-untd/01-passarela.mp4',
        },
        ms: 6000,
        alt: 'Desfile em andamento: a fila de modelos desce a passarela.',
        role: 'Runway',
        overlay: {
          kickerEN: 'FASHION · CULTURE · CREATIVE DIRECTION',
          kickerPT: 'MODA · CULTURA · DIREÇÃO CRIATIVA',
          titleEN: 'Every runway tells a story. Every collection carries a vision.',
          titlePT: 'Toda passarela conta uma história. Toda coleção carrega uma visão.',
        },
      },
      {
        src: `${stories}/runway-untd/02-bastidor.webp`,
        video: {
          av1: '/videos/runway-untd/02-bastidor.av1.mp4',
          h264: '/videos/runway-untd/02-bastidor.mp4',
        },
        ms: 6000,
        alt: 'Brazilian Fashion Edit: o grupo em looks de estampa, entre o bastidor e a rua.',
        role: 'Backstage',
        overlay: {
          kickerEN: 'THE COLLECTIVE',
          kickerPT: 'O COLETIVO',
          titleEN: 'Fashion is not an industry. Fashion is a language.',
          titlePT: 'Moda não é indústria. Moda é linguagem.',
        },
      },
      {
        src: `${stories}/runway-untd/03-retrato.webp`,
        video: {
          av1: '/videos/runway-untd/03-retrato.av1.mp4',
          h264: '/videos/runway-untd/03-retrato.mp4',
        },
        ms: 6000,
        alt: 'Modelo em primeiro plano na passarela, look azul e branco.',
        role: 'The people',
        overlay: {
          kickerEN: 'WHAT WE DOCUMENT',
          kickerPT: 'O QUE DOCUMENTAMOS',
          titleEN: 'The people, the movements and the stories shaping the next generation.',
          titlePT: 'As pessoas, os movimentos e as histórias que moldam a próxima geração.',
        },
      },
      {
        src: `${stories}/runway-untd/04-noite.webp`,
        video: {
          av1: '/videos/runway-untd/04-noite.av1.mp4',
          h264: '/videos/runway-untd/04-noite.mp4',
        },
        ms: 6000,
        alt: 'Cartela do coletivo, THE VHS LOST TAPE, sobre fundo escuro.',
        role: 'The night',
        overlay: {
          kickerEN: 'SÃO PAULO, MADE FOR THE WORLD',
          kickerPT: 'SÃO PAULO, FEITA PARA O MUNDO',
          titleEN: 'Music. Fashion. Film. In Brazilian Bass.',
          titlePT: 'Música. Moda. Filme. Em Brazilian Bass.',
        },
      },
    ],
  },
]

// -----------------------------------------------------------------------------
// CAMPAIGNS (partes 12, 13, 14): sequencia tipo "stories" navegavel,
// reaproveitando o StoryDeck que ja existe (nascido no /pitch/v3).
// Nome corrigido pelo fundador em 09/09/2026: a campanha se chama DEZOITÔ,
// nao "Ô: 18 Years".
// -----------------------------------------------------------------------------

export interface WorkCredit {
  roleEN: string
  rolePT: string
  name: string
}

export interface Campaign {
  index: string
  name: string
  client: string
  descriptionEN: string
  descriptionPT: string
  /** Imagem do circulo. Sem ela, usa o primeiro frame. */
  cover?: string
  frames: StoryFrame[]
}

export const CAMPAIGNS: Campaign[] = [
  {
    index: '01',
    name: 'DEZOITÔ',
    client: '@odecasahostel',
    descriptionEN:
      '18 years of the most awarded Brazilian hostel. A campaign showing the gen Z lifestyle of a place that is a meeting point for cultures around the globe.',
    descriptionPT:
      '18 anos do hostel brasileiro mais premiado. Uma campanha que mostra o estilo de vida da geracao Z num lugar que e ponto de encontro de culturas ao redor do mundo.',
    // Capa nova (CHANGES #01, 09/10/2026): o circulo usa `cover`, que nao e
    // frame do story. Os frames sao o 01.png de cada pasta 01, 02 e 03.
    cover: `${base}/o-18-years/capa.webp`,
    frames: [
      {
        src: `${base}/o-18-years/s1.webp`,
        alt: 'DEZOITÔ, crianças diante da parede laranja do hostel com o lockup 18 de casa',
        role: 'Campaign key visual',
        overlay: {
          kickerEN: 'THE HOUSE',
          kickerPT: 'A CASA',
          titleEN: 'The address is the campaign. It always was.',
          titlePT: 'O endereço é a campanha. Sempre foi.',
        },
      },
      {
        src: `${base}/o-18-years/s2.webp`,
        alt: 'DEZOITÔ, close de uma pessoa sorrindo com óculos de adesivos 18 de casa e uma jarra de cobre',
        role: 'Lifestyle photography',
        overlay: {
          kickerEN: 'GEN Z LIFESTYLE',
          kickerPT: 'ESTILO DE VIDA GERAÇÃO Z',
          titleEN: 'A meeting point for cultures, told by the people who slept there.',
          titlePT: 'Um ponto de encontro de culturas, contado por quem dormiu lá.',
        },
      },
      {
        src: `${base}/o-18-years/s3.webp`,
        alt: 'DEZOITÔ, rapaz deitado na grama com chapéu de adesivos 18 de casa e a palavra DEZOITÔ',
        role: 'Campaign key visual',
        overlay: {
          kickerEN: 'THE CAMPAIGN',
          kickerPT: 'A CAMPANHA',
          titleEN: 'DEZOITÔ. A birthday that became a season.',
          titlePT: 'DEZOITÔ. Um aniversário que virou temporada.',
        },
      },
    ],
  },
  {
    index: '02',
    name: 'VIRTUOSA',
    client: 'LAUDA',
    descriptionEN:
      "LAUDA's Virtuosa campaign: two films for the collection.",
    descriptionPT:
      'Campanha Virtuosa, da LAUDA: dois filmes da coleção.',
    cover: `${base}/virtuosa/avatar.webp`,
    frames: [
      {
        src: `${base}/virtuosa/back-to-black-poster.webp`,
        alt: 'Filme Back To Black, da LAUDA: três modelos de preto lado a lado sobre fundo claro.',
        role: 'Back To Black',
        video: {
          av1: `${base}/virtuosa/back-to-black.av1.mp4`,
          h264: `${base}/virtuosa/back-to-black.mp4`,
          hasAudio: true,
        },
      },
      {
        src: `${base}/virtuosa/lauda-movie-poster.webp`,
        alt: 'Filme LAUDA Movie: mosaico de cenas da coleção em torno do logotipo LAUDA.',
        role: 'LAUDA Movie',
        video: {
          av1: `${base}/virtuosa/lauda-movie.av1.mp4`,
          h264: `${base}/virtuosa/lauda-movie.mp4`,
          hasAudio: true,
        },
      },
    ],
  },
]

// -----------------------------------------------------------------------------
// WHAT I BUILD (parte 15): nao e "skills". Texto exato do briefing.
// -----------------------------------------------------------------------------

export interface BuildPillar {
  name: string
  descriptionEN: string
  descriptionPT: string
}

export const BUILD_PILLARS: BuildPillar[] = [
  {
    name: 'BRANDS',
    descriptionEN: 'Positioning, identity, narrative and cultural systems.',
    descriptionPT: 'Posicionamento, identidade, narrativa e sistemas culturais.',
  },
  {
    name: 'PRODUCTS',
    descriptionEN: 'Digital products, experiences and MVPs.',
    descriptionPT: 'Produtos digitais, experiencias e MVPs.',
  },
  {
    name: 'BUSINESSES',
    descriptionEN: 'New ventures and creative businesses.',
    descriptionPT: 'Novos negocios e empresas criativas.',
  },
  {
    name: 'SYSTEMS',
    descriptionEN: 'AI agents, brand systems and creative technology.',
    descriptionPT: 'Agentes de IA, sistemas de marca e tecnologia criativa.',
  },
]

// CURRENTLY EXPLORING (parte 17): texto exato do briefing, nao se traduz,
// mesma convencao das disciplinas acima (rotulo de territorio).
export const EXPLORING: string[] = ['CREATIVE DIRECTION', 'AI PRODUCTS', 'BRAND SYSTEMS', 'NEW VENTURES']

// =============================================================================
// CARREIRA (10/09/2026). Pedido do fundador: "coloque alguns blocos ao lado de
// ABOUT com minha carreira profissional seguindo minhas posicoes no LinkedIn".
// FONTE: linkedin.com/in/tavaristico, aba Experiencia, lida em 10/09/2026 com
// a sessao dele. As dez posicoes estao aqui na mesma ORDEM do LinkedIn, que
// nao e cronologica pura (ele mantem o freelance no meio da lista): a ordem e
// dele, nao minha.
//
// Periodo em ANO, nao em mes: a coluna vive ao lado do About, estreita, e
// "Jun 2025" em dez linhas vira ruido. Cargo e empresa ficam em ingles nos
// dois idiomas, pela mesma regra que ja vale para nome de obra e de cliente no
// resto desta pagina: nome proprio nao se traduz. So o periodo troca ("Atual").
// =============================================================================

export interface CareerEntry {
  role: string
  org: string
  periodEN: string
  periodPT: string
  /**
   * Cidade da posicao. Pedido dele em 11/09/2026: "e importante mostrar que
   * sou de Salvador". Decisao do fundador em 16/09/2026, resolvendo o LinkedIn
   * (authwall HTTP 999 nas duas tentativas de leitura direta): tudo da Lauda
   * pra frente e Sao Paulo, tudo antes da Lauda e Salvador, Bahia. Freelance
   * atravessa a fronteira (2019-2025) e por isso leva as duas cidades.
   */
  city?: string
}

export const CAREER: CareerEntry[] = [
  {
    role: 'Founder & Creative Director',
    org: '.TBF. inc',
    periodEN: '2025 - Present',
    periodPT: '2025 - Atual',
    city: 'São Paulo',
  },
  {
    role: 'Marketing Analyst',
    org: 'Ô de Casa Hostel & Bar',
    periodEN: '2024 - 2026',
    periodPT: '2024 - 2026',
    city: 'São Paulo',
  },
  {
    role: 'Art Director & Brand Strategist',
    org: 'Freelance',
    periodEN: '2019 - 2025',
    periodPT: '2019 - 2025',
    city: 'Salvador e São Paulo',
  },
  {
    role: 'Art Director & Media Strategist',
    org: 'Lauda Brand Store',
    periodEN: '2023 - 2024',
    periodPT: '2023 - 2024',
    city: 'São Paulo',
  },
  {
    role: 'Junior Marketing Analyst',
    org: 'BOAH',
    periodEN: '2022 - 2023',
    periodPT: '2022 - 2023',
    city: 'Salvador, Bahia',
  },
  {
    role: 'Community Manager',
    org: 'Meats Espeteria',
    periodEN: '2019 - 2022',
    periodPT: '2019 - 2022',
    city: 'Salvador, Bahia',
  },
  {
    role: 'Marketing Intern',
    org: 'Soul Dila',
    periodEN: '2021',
    periodPT: '2021',
    city: 'Salvador, Bahia',
  },
  {
    role: 'Graphic Designer',
    org: 'Ouzar Comunicação',
    periodEN: '2020 - 2021',
    periodPT: '2020 - 2021',
    city: 'Salvador, Bahia',
  },
  {
    role: 'Design Intern',
    org: 'Agência Yellowmelon',
    periodEN: '2019 - 2020',
    periodPT: '2019 - 2020',
    city: 'Salvador, Bahia',
  },
  {
    role: 'Marketing',
    org: 'Ammi Express Hotels',
    periodEN: '2019',
    periodPT: '2019',
    city: 'Salvador, Bahia',
  },
]

// =============================================================================
// FORMACAO E IDIOMAS (rodada 22/10/2026). Fonte: curriculo do fundador, passado
// por ele no pedido. Mesma forma visual da carreira (periodo, titulo, instituicao).
// Nome de instituicao e cidade nao se traduzem; o titulo do curso e o idioma sim.
// =============================================================================

export interface EducationEntry {
  titleEN: string
  titlePT: string
  org: string
  city: string
  periodEN: string
  periodPT: string
}

export const EDUCATION: EducationEntry[] = [
  {
    titleEN: 'Bachelor in Social Communication: Advertising',
    titlePT: 'Comunicação Social: Publicidade e Propaganda',
    org: 'UNIFACS',
    city: 'Salvador, Bahia',
    periodEN: '2018 - 2022',
    periodPT: '2018 - 2022',
  },
]

export interface LanguageEntry {
  labelEN: string
  labelPT: string
}

export const LANGUAGES: LanguageEntry[] = [{ labelEN: 'English, fluent', labelPT: 'Inglês fluente' }]
