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
// Quadros de story, produzidos em 10/09/2026 (1080x1920 nativos).
const stories = '/images/creators/tavaristico/stories'

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
  overlay?: { title: string; kicker?: string }
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
    category: ['AI AGENTS', 'PRODUCT'],
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
          kicker: 'AI AGENTS · PRODUCT',
          title: 'An autopilot for corporate events. It researches, verifies and ranks suppliers, and hands back the decision.',
        },
      },
      {
        src: `${stories}/crivo/02-dor.webp`,
        alt: 'Slide do problema: R$ 400 mil desaparecidos com uma produtora.',
        role: 'The problem',
        overlay: {
          kicker: 'THE PROBLEM',
          title: 'Hiring an event supplier in Brazil is still an act of faith. R$400k once vanished with one producer.',
        },
      },
      {
        src: `${stories}/crivo/03-agentes.webp`,
        alt: 'Slide da arquitetura: quatro agentes, uma chave de API.',
        role: 'How it works',
        overlay: {
          kicker: 'HOW IT WORKS',
          title: 'Four agents, one API key. The score is deterministic code, not a model guessing a number.',
        },
      },
      {
        src: `${stories}/crivo/04-veredito.webp`,
        alt: 'Slide dos vereditos: verificado, atencao, evitar.',
        role: 'The verdict',
        overlay: {
          kicker: 'THE VERDICT',
          title: 'Every supplier leaves with a verdict, and with the honest list of what could not be checked.',
        },
      },
      {
        src: `${stories}/crivo/05-valor.webp`,
        alt: 'Slide de valor: de 20 a 40 horas para cerca de 15 minutos.',
        role: 'The value',
        overlay: {
          kicker: 'WINNER · ATON PRAXIS HACKATHON, 2026',
          title: 'From forty hours of WhatsApp to fifteen minutes of decision, with clickable evidence on every line.',
        },
      },
    ],
  },
  {
    index: '02',
    name: 'VERÃOZÃO',
    category: ['CAMPAIGN', 'CULTURE'],
    description: 'A summer campaign for Ô de Casa, the most awarded Brazilian hostel.',
    weight: 'primary',
    cover: `${base}/ventures/veraozao.webp`,
    coverAlt: 'VERÃOZÃO, Ô de Casa',
    // As pecas sao as MESMAS do case do /pitch (`/images/pitch/veraozao/`),
    // apontadas, nao copiadas (regra 4). Sao stories nativos 1080x1920 que a
    // .TBF. publicou em fevereiro: ja nasceram neste formato.
    frames: [
      {
        src: '/images/pitch/veraozao/story-01-chave.webp',
        alt: 'Peça de abertura da campanha VERÃOZÃO, com o estandarte e a identidade do ÔÀSIS.',
        role: 'Key visual',
        overlay: {
          kicker: 'Ô DE CASA HOSTEL · SUMMER 2026',
          title: 'When a season stops being a campaign and becomes a scene.',
        },
      },
      {
        src: '/images/pitch/veraozao/story-03-rua.webp',
        alt: 'Story com o estandarte do Ô de Casa levantado na rua, em dia de sol.',
        role: 'The street',
        overlay: {
          kicker: 'THE STREET',
          title: 'The banner left the hostel and took the block with it.',
        },
      },
      {
        src: '/images/pitch/veraozao/story-06-publico.webp',
        alt: 'Story do público de braços erguidos na ativação de rua.',
        role: 'Audience',
        overlay: {
          kicker: 'THE CROWD',
          title: 'Nobody was invited to watch. They were invited to be in it.',
        },
      },
      {
        src: '/images/pitch/veraozao/story-07-experiencia.webp',
        alt: 'Story da festa de espuma dentro do hostel.',
        role: 'Experience',
        overlay: {
          kicker: 'THE EXPERIENCE',
          title: 'Foam, bass and a February that ran every single day.',
        },
      },
      {
        src: '/images/pitch/veraozao/story-12-fecho.webp',
        alt: 'Story de fecho, com duas pessoas rindo dentro do hostel.',
        role: 'What remains',
        overlay: {
          kicker: 'WHAT REMAINS',
          title: 'It reached open TV in January. It reached the hallway every night.',
        },
      },
    ],
  },
  {
    index: '03',
    name: 'BRANDSYSTEM',
    category: ['AI', 'BRAND', 'PRODUCT'],
    description: "An agentic brand system that connects a company's brand knowledge to its marketing workflow.",
    weight: 'primary',
    cover: '/brand/TBF-AVATAR.webp',
    coverAlt: 'BRANDSYSTEM, .TBF. inc',
    // Nao ha fotografia de um sistema de marca: os quatro quadros sao pecas
    // desenhadas com os proprios ativos da `.TBF.` (`public/brand/`), na
    // paleta da casa.
    frames: [
      {
        src: `${stories}/brandsystem/01-marca.webp`,
        alt: 'A marca .TBF. isolada em fundo preto.',
        role: 'The brand',
        overlay: {
          kicker: 'AI · BRAND · PRODUCT',
          title: 'A brand always knows more than it manages to repeat.',
        },
      },
      {
        src: `${stories}/brandsystem/02-conhecimento.webp`,
        alt: 'Grade com os ativos gráficos da marca, repetidos como prancha de sistema.',
        role: 'The knowledge',
        overlay: {
          kicker: 'THE KNOWLEDGE',
          title: 'Voice, rules and assets stop living inside a PDF nobody opens.',
        },
      },
      {
        src: `${stories}/brandsystem/03-agente.webp`,
        alt: 'Diagrama abstrato do agente: nós ligados em esteira.',
        role: 'The agent',
        overlay: {
          kicker: 'THE AGENT',
          title: 'The system reads the brand before it writes a single line.',
        },
      },
      {
        src: `${stories}/brandsystem/04-fluxo.webp`,
        alt: 'A mesma peça em variações, sugerindo produção em série.',
        role: 'The output',
        overlay: {
          kicker: 'THE OUTPUT',
          title: 'Marketing that comes out on brand because it could not come out any other way.',
        },
      },
    ],
  },
  {
    index: '04',
    name: '.RUNWAY UNTD COLLECTIVE.',
    category: ['FASHION', 'CULTURE', 'CREATIVE DIRECTION'],
    description: 'Fashion, image and cultural production.',
    weight: 'primary',
    cover: `${base}/ventures/runway-untd.webp`,
    coverAlt: '.RUNWAY UNTD COLLECTIVE.',
    // Imagem: o corpo de trabalho do SPFW · THE PARADISE, que o proprio WORKS
    // ja declara ser "o mesmo corpo de trabalho de Runway Untd Collective".
    // Texto: a base e o site da label, `/labels/runwayunited`, dicionario em
    // src/content/i18n/pages/labels/runwayunited.ts. Nada foi inventado aqui:
    // as frases sao as da propria label, encurtadas para caber num quadro.
    frames: [
      {
        src: `${stories}/runway-untd/01-passarela.webp`,
        alt: 'Desfile em andamento, a fila de modelos na passarela.',
        role: 'Runway',
        overlay: {
          kicker: 'FASHION · CULTURE · CREATIVE DIRECTION',
          title: 'Every runway tells a story. Every collection carries a vision.',
        },
      },
      {
        src: `${stories}/runway-untd/02-bastidor.webp`,
        alt: 'Bastidor do desfile, grupo de pessoas em looks de estampa.',
        role: 'Backstage',
        overlay: {
          kicker: 'THE COLLECTIVE',
          title: 'Fashion is not an industry. Fashion is a language.',
        },
      },
      {
        src: `${stories}/runway-untd/03-retrato.webp`,
        alt: 'Retrato em luz azul, perfil de um convidado no evento.',
        role: 'The people',
        overlay: {
          kicker: 'WHAT WE DOCUMENT',
          title: 'The people, the movements and the stories shaping the next generation.',
        },
      },
      {
        src: `${stories}/runway-untd/04-noite.webp`,
        alt: 'Silhuetas em luz azul, a festa depois do desfile.',
        role: 'The night',
        overlay: {
          kicker: 'SÃO PAULO, MADE FOR THE WORLD',
          title: 'Music. Fashion. Film. In Brazilian Bass.',
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

export interface Campaign {
  index: string
  name: string
  client: string
  descriptionEN: string
  descriptionPT: string
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
    // Sobreposicao de texto tambem aqui, por pedido de 10/09/2026 ("aproveite
    // para fazer isso em todos os outros stories tambem, incluindo das
    // campanhas").
    frames: [
      {
        src: `${base}/o-18-years/cover.webp`,
        alt: 'DEZOITÔ, capa da campanha',
        role: 'Campaign key visual',
        overlay: {
          kicker: '@ODECASAHOSTEL · 18 YEARS',
          title: 'Eighteen years of the most awarded hostel in Brazil.',
        },
      },
      {
        src: `${base}/o-18-years/g1.webp`,
        alt: 'DEZOITÔ, frame 1',
        role: 'Lifestyle photography',
        overlay: {
          kicker: 'GEN Z LIFESTYLE',
          title: 'A meeting point for cultures, told by the people who slept there.',
        },
      },
      {
        src: `${base}/o-18-years/g2.webp`,
        alt: 'DEZOITÔ, frame 2',
        role: 'Lifestyle photography',
        overlay: {
          kicker: 'THE CAMPAIGN',
          title: 'DEZOITÔ. A birthday that became a season.',
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
