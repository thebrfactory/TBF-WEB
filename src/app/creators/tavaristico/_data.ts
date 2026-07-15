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
    linkedin: 'https://www.linkedin.com/in/felipetavares', // [ECD] confirmar handle exato
    linkedinProvisional: true,
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
      'Direção de arte para a São Paulo Fashion Week. Construção de um universo visual que traduz a passarela em narrativa de marca. (Mesmo corpo de trabalho de Runway United Collective.)',
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
    title: 'Ô: 18 Years',
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
