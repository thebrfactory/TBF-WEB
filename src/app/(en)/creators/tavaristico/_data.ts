// ─────────────────────────────────────────────────────────────────────────────
// PORTFÓLIO TAVARÍSTICO — modelo de dados (curadoria V1)
// Fonte: PRJ-20260626-01 (direção ORD-01 + UX ORD-02, ambas aprovadas).
// Regras: SEM ano como padrão (year opcional). Card sem border-top — separação por
// número-índice. Papel do Tavarístico obrigatório por obra.
// `provisional`: campos escritos pelo PM (placeholder) → renderizados SUBLINHADOS
// para o redator substituir. Ô:18 Years é copy real (não provisória).
// ─────────────────────────────────────────────────────────────────────────────

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
  /** papel do Tavarístico — OBRIGATÓRIO (credibilidade) */
  role: string
  client?: string
  /** ano é opcional por decisão do ECD (entra só onde faz sentido) */
  year?: string
  /** 1 linha — card da vitrine */
  summary: string
  /** narrativa do case — página de obra */
  description?: string
  /** entra no bloco Selected Work (alta densidade) do index */
  selected?: boolean
  media: { cover: string; gallery?: string[] }
  /** campos provisórios (sublinhar) — aguardam redator/ECD */
  provisional?: ProvField[]
  /** capa screenshot-grade (aguarda fonte hi-res) */
  lowRes?: boolean
}

const base = '/images/creators/tavaristico'

export const IDENTITY = {
  name: 'Felipe Tavares',
  alias: 'Tavarístico',
  role: 'Associate Creative Director / Art Director',
  representedBy: '.TBF. inc',
  origin: 'Salvador, Bahia',
  bioEN:
    'Advertising, Graphic Design & Branded Content. I came from sacred and profane soil, the capital of axé: Salvador, Bahia. My essence is my enthusiasm in collaborating with causes that I truly believe in, the curiosity to discover the new and the versatility to adapt to new environments.',
  // PT provisório — redator/ECD confirma.
  bioPT:
    'Felipe Tavares, conhecido como Tavarístico, é Associate Creative Director e Art Director. Vindo do solo sagrado e profano de Salvador, Bahia, traduz cultura brasileira em trabalho que viaja. Representado pela .TBF. inc.',
  bioPTProvisional: true,
  socials: {
    instagram: 'https://instagram.com/thebrfactory',
    linkedin: 'https://www.linkedin.com/in/tavaristico/', // confirmado pelo fundador em 09/09/2026
    linkedinProvisional: false,
    // Fundador ainda não passou a URL do GitHub. Fica vazio até chegar; o
    // ícone só renderiza com URL real (ver SocialIcons).
    github: 'https://github.com/thebrfactory', // confirmado pelo fundador em 09/09/2026
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

export const WORKS: Work[] = [
  {
    slug: 'spfw-the-paradise',
    index: '01',
    title: 'SPFW · The Paradise',
    disciplines: ['Art Direction', 'Fashion'],
    role: 'Art Director',
    client: 'São Paulo Fashion Week',
    summary: 'Direção de arte e linguagem visual para a São Paulo Fashion Week.',
    description:
      'Direção de arte para a São Paulo Fashion Week. Construção de um universo visual que traduz a passarela em narrativa de marca. (Mesmo corpo de trabalho de Runway Untd Collective.)',
    selected: true,
    media: {
      cover: `${base}/spfw-the-paradise/cover.webp`,
      gallery: [`${base}/spfw-the-paradise/g1.webp`, `${base}/spfw-the-paradise/g2.webp`, `${base}/spfw-the-paradise/g3.webp`],
    },
    provisional: ['role', 'summary', 'description'],
  },
  {
    slug: 'capsula-brasilidade',
    index: '02',
    title: 'Cápsula Brasilidade',
    disciplines: ['Branding'],
    role: 'Art Director / Designer',
    client: 'Projeto autoral',
    summary: 'Uma cápsula que traduz brasilidade em conceito, produto e identidade.',
    description:
      'Conceito, embalagem e sistema de identidade de uma cápsula de brasilidade: do folder ao produto, uma leitura contemporânea de repertório brasileiro.',
    media: {
      cover: `${base}/capsula-brasilidade/cover.webp`,
      gallery: [`${base}/capsula-brasilidade/g1.webp`, `${base}/capsula-brasilidade/g2.webp`, `${base}/capsula-brasilidade/g3.webp`],
    },
    provisional: ['role', 'client', 'summary', 'description'],
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
    slug: 'virtuosa',
    index: '04',
    title: 'Virtuosa',
    disciplines: ['Fashion', 'Art Direction'],
    role: 'Art Director',
    client: 'Virtuosa',
    summary: 'Direção de arte e campanha de drop de moda.',
    description: 'Direção de arte, styling e linguagem de campanha para o drop da Virtuosa.',
    selected: true,
    media: {
      cover: `${base}/virtuosa/cover.webp`,
      gallery: [`${base}/virtuosa/g1.webp`, `${base}/virtuosa/g2.webp`],
    },
    provisional: ['role', 'client', 'summary', 'description'],
  },
  {
    slug: 'blackboah',
    index: '05',
    title: 'Blackboah',
    disciplines: ['Art Direction'],
    role: 'Art Director',
    client: 'Blackboah',
    summary: 'Direção de arte e identidade visual.',
    description: 'Construção de linguagem visual e direção de arte para Blackboah.',
    media: {
      cover: `${base}/blackboah/cover.webp`,
      gallery: [`${base}/blackboah/g1.webp`, `${base}/blackboah/g2.webp`, `${base}/blackboah/g3.webp`],
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
      'Direção de arte e sistema gráfico de Arquiloucura. Uma celebração visual da magia do Farol da Barra, em Salvador.',
    media: {
      cover: `${base}/arquiloucura/cover.webp`,
      gallery: [`${base}/arquiloucura/g1.webp`, `${base}/arquiloucura/g2.webp`, `${base}/arquiloucura/g3.webp`],
    },
    provisional: ['role', 'client', 'summary', 'description'],
  },
  {
    slug: 'crush-coins',
    index: '07',
    title: 'Crush Coins',
    disciplines: ['Graphic & Motion', 'Art Direction'],
    role: 'Art Director',
    client: 'Crush Coins',
    summary: 'Direção de arte e identidade: cultura pop e meme em linguagem visual.',
    description: 'Direção de arte de Crush Coins: colisão de cultura pop, retrato e tipografia.',
    media: { cover: `${base}/crush-coins/cover.webp` },
    provisional: ['role', 'client', 'summary', 'description'],
    lowRes: true,
  },
  {
    slug: 'charlotte',
    index: '08',
    title: 'Charlotte',
    disciplines: ['Branding'],
    role: 'Art Director / Designer',
    client: 'Charlotte',
    summary: 'Identidade e logotipo: branding de assinatura.',
    description: 'Branding e construção de logotipo para Charlotte.',
    media: { cover: `${base}/charlotte/cover.webp` },
    provisional: ['role', 'client', 'summary', 'description'],
    lowRes: true,
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
}

export const VENTURES: Venture[] = [
  {
    index: '01',
    name: 'CRIVO',
    category: ['AI AGENTS', 'PRODUCT'],
    description: 'AI-powered supplier intelligence for corporate events.',
    weight: 'primary',
    cover: `${base}/ventures/crivo.svg`,
    coverAlt: 'CRIVO',
  },
  {
    index: '02',
    name: 'VERÃOZÃO',
    category: ['CAMPAIGN', 'CULTURE'],
    description: 'A summer campaign for Ô de Casa, the most awarded Brazilian hostel.',
    weight: 'primary',
    cover: `${base}/ventures/veraozao.webp`,
    coverAlt: 'VERÃOZÃO, Ô de Casa',
  },
  {
    index: '03',
    name: 'BRANDSYSTEM',
    category: ['AI', 'BRAND', 'PRODUCT'],
    description: "An agentic brand system that connects a company's brand knowledge to its marketing workflow.",
    weight: 'primary',
    cover: '/brand/TBF-AVATAR.webp',
    coverAlt: 'BRANDSYSTEM, .TBF. inc',
  },
  {
    index: '04',
    name: '.RUNWAY UNTD COLLECTIVE.',
    category: ['FASHION', 'CULTURE', 'CREATIVE DIRECTION'],
    description: 'Fashion, image and cultural production.',
    weight: 'primary',
    cover: `${base}/ventures/runway-untd.webp`,
    coverAlt: '.RUNWAY UNTD COLLECTIVE.',
  },
]

// -----------------------------------------------------------------------------
// CAMPAIGNS (partes 12, 13, 14): sequencia tipo "stories" navegavel,
// reaproveitando o StoryDeck que ja existe (nascido no /pitch/v3).
// Nome corrigido pelo fundador em 09/09/2026: a campanha se chama DEZOITÔ,
// nao "Ô: 18 Years".
// -----------------------------------------------------------------------------

export interface Campaign {
  index: string
  name: string
  client: string
  descriptionEN: string
  descriptionPT: string
  frames: { src: string; alt: string; role: string }[]
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
    frames: [
      { src: `${base}/o-18-years/cover.webp`, alt: 'DEZOITÔ, capa da campanha', role: 'Campaign key visual' },
      { src: `${base}/o-18-years/g1.webp`, alt: 'DEZOITÔ, frame 1', role: 'Lifestyle photography' },
      { src: `${base}/o-18-years/g2.webp`, alt: 'DEZOITÔ, frame 2', role: 'Lifestyle photography' },
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
