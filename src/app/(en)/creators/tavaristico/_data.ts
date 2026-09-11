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
  video?: { av1: string; h264: string }
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
          kickerEN: 'Ô DE CASA HOSTEL · SUMMER 2026',
          kickerPT: 'Ô DE CASA HOSTEL · VERÃO 2026',
          titleEN: 'When a season stops being a campaign and becomes a scene.',
          titlePT: 'Quando uma temporada para de ser campanha e vira cena.',
        },
      },
      {
        src: '/images/pitch/veraozao/story-03-rua.webp',
        alt: 'Story com o estandarte do Ô de Casa levantado na rua, em dia de sol.',
        role: 'The street',
        overlay: {
          kickerEN: 'THE STREET',
          kickerPT: 'A RUA',
          titleEN: 'The banner left the hostel and took the block with it.',
          titlePT: 'O estandarte saiu do hostel e levou o quarteirão junto.',
        },
      },
      {
        src: '/images/pitch/veraozao/story-06-publico.webp',
        alt: 'Story do público de braços erguidos na ativação de rua.',
        role: 'Audience',
        overlay: {
          kickerEN: 'THE CROWD',
          kickerPT: 'A GALERA',
          titleEN: 'Nobody was invited to watch. They were invited to be in it.',
          titlePT: 'Ninguém foi chamado para assistir. Foi chamado para estar dentro.',
        },
      },
      {
        src: '/images/pitch/veraozao/story-07-experiencia.webp',
        alt: 'Story da festa de espuma dentro do hostel.',
        role: 'Experience',
        overlay: {
          kickerEN: 'THE EXPERIENCE',
          kickerPT: 'A EXPERIÊNCIA',
          titleEN: 'Foam, bass and a February that ran every single day.',
          titlePT: 'Espuma, grave e um fevereiro que não parou um dia sequer.',
        },
      },
      {
        src: '/images/pitch/veraozao/story-12-fecho.webp',
        alt: 'Story de fecho, com duas pessoas rindo dentro do hostel.',
        role: 'What remains',
        overlay: {
          kickerEN: 'WHAT REMAINS',
          kickerPT: 'O QUE FICOU',
          titleEN: 'It reached open TV in January. It reached the hallway every night.',
          titlePT: 'Chegou na TV aberta em janeiro. Chegou no corredor todas as noites.',
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
    category: ['FASHION', 'CULTURE', 'CREATIVE DIRECTION'],
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
          kickerEN: '@ODECASAHOSTEL · 18 YEARS',
          kickerPT: '@ODECASAHOSTEL · 18 ANOS',
          titleEN: 'Eighteen years of the most awarded hostel in Brazil.',
          titlePT: 'Dezoito anos do hostel mais premiado do Brasil.',
        },
      },
      {
        src: `${base}/o-18-years/g1.webp`,
        alt: 'DEZOITÔ, frame 1',
        role: 'Lifestyle photography',
        overlay: {
          kickerEN: 'GEN Z LIFESTYLE',
          kickerPT: 'ESTILO DE VIDA GERAÇÃO Z',
          titleEN: 'A meeting point for cultures, told by the people who slept there.',
          titlePT: 'Um ponto de encontro de culturas, contado por quem dormiu lá.',
        },
      },
      {
        src: `${base}/o-18-years/g2.webp`,
        alt: 'DEZOITÔ, frame 2',
        role: 'Lifestyle photography',
        overlay: {
          kickerEN: 'THE CAMPAIGN',
          kickerPT: 'A CAMPANHA',
          titleEN: 'DEZOITÔ. A birthday that became a season.',
          titlePT: 'DEZOITÔ. Um aniversário que virou temporada.',
        },
      },

      // CURADORIA 10/09/2026. O story tinha só o ensaio do merch (as três
      // acima). Estes cinco são a PEÇA GRÁFICA da campanha, tirados de
      // `Ô | 04 | Abril 25/GRID` no TAV05, que é a grade publicada em abril de
      // 2025: 1080x1920 de origem, formato de story, convertidos para webp
      // sem redimensionar (já estão no teto de 1920 da spec de imagem).
      // O que ficou de fora, de propósito: as outras cinco peças da grade
      // (18+, FERIADOU, e três variações do mesmo letreiro) repetem lockup
      // ou pertencem a outro momento de abril, e story que repete cansa; as
      // 24 imagens da pasta DEZOITOU são referência de terceiro baixada de
      // rede social, não peça nossa; e a pasta STORIES do mês é cobertura da
      // Expotel, outra história.
      {
        src: `${base}/o-18-years/k1-dezoitou.webp`,
        alt: 'DEZOITÔ, o letreiro pintado no muro do hostel',
        role: 'Campaign key visual',
        overlay: {
          kickerEN: 'THE ANNOUNCEMENT',
          kickerPT: 'O ANÚNCIO',
          titleEN: 'DEZOITOU. The house comes of age, and everyone is invited.',
          titlePT: 'DEZOITOU. A casa fez idade, e a maioridade chega para todos.',
        },
      },
      {
        src: `${base}/o-18-years/k2-18-de-casa.webp`,
        alt: 'DEZOITÔ, lockup 18 de casa sobre laranja',
        role: 'Campaign key visual',
        overlay: {
          kickerEN: 'THE MARK',
          kickerPT: 'A MARCA',
          titleEN: 'Eighteen, written the way the house writes everything.',
          titlePT: 'Dezoito, escrito do jeito que a casa escreve tudo.',
        },
      },
      {
        src: `${base}/o-18-years/k3-hostel-18.webp`,
        alt: 'DEZOITÔ, fachada do hostel com hóspedes',
        role: 'Campaign key visual',
        overlay: {
          kickerEN: 'THE HOUSE',
          kickerPT: 'A CASA',
          titleEN: 'The address is the campaign. It always was.',
          titlePT: 'O endereço é a campanha. Sempre foi.',
        },
      },
      {
        src: `${base}/o-18-years/k4-staff.webp`,
        alt: 'DEZOITÔ, equipe da casa na piscina',
        role: 'Campaign key visual',
        overlay: {
          kickerEN: 'THE STAFF',
          kickerPT: 'A EQUIPE',
          titleEN: 'Eighteen years of people who make the place a place.',
          titlePT: 'Dezoito anos de gente que faz o lugar ser um lugar.',
        },
      },
      {
        src: `${base}/o-18-years/k5-efervescente.webp`,
        alt: 'DEZOITÔ, fitas coloridas e a palavra EFERVESCENTE',
        role: 'Campaign key visual',
        overlay: {
          kickerEN: 'THE SEASON',
          kickerPT: 'A TEMPORADA',
          titleEN: 'EFERVESCENTE. A month of parties instead of one night.',
          titlePT: 'EFERVESCENTE. Um mês de festa no lugar de uma noite.',
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
   * Cidade da posicao. Pedido dele em 11/09/2026, com o motivo: "e importante
   * mostrar que sou de Salvador". Fica em branco enquanto ele nao mandar a
   * lista: o LinkedIn devolveu HTTP 999 (authwall) nas duas tentativas, e
   * cidade de emprego e fato dele, nao coisa que se deduz. Entrada sem
   * `city` simplesmente nao imprime a linha.
   */
  city?: string
}

export const CAREER: CareerEntry[] = [
  { role: 'Founder & Creative Director', org: '.TBF. inc', periodEN: '2025 - Present', periodPT: '2025 - Atual' },
  { role: 'Marketing Analyst', org: 'Ô de Casa Hostel & Bar', periodEN: '2024 - 2026', periodPT: '2024 - 2026' },
  { role: 'Art Director & Brand Strategist', org: 'Freelance', periodEN: '2019 - 2025', periodPT: '2019 - 2025' },
  { role: 'Art Director & Media Strategist', org: 'Lauda Brand Store', periodEN: '2023 - 2024', periodPT: '2023 - 2024' },
  { role: 'Junior Marketing Analyst', org: 'BOAH', periodEN: '2022 - 2023', periodPT: '2022 - 2023' },
  { role: 'Community Manager', org: 'Meats Espeteria', periodEN: '2019 - 2022', periodPT: '2019 - 2022' },
  { role: 'Marketing Intern', org: 'Soul Dila', periodEN: '2021', periodPT: '2021' },
  { role: 'Graphic Designer', org: 'Ouzar Comunicação', periodEN: '2020 - 2021', periodPT: '2020 - 2021' },
  { role: 'Design Intern', org: 'Agência Yellowmelon', periodEN: '2019 - 2020', periodPT: '2019 - 2020' },
  { role: 'Marketing', org: 'Ammi Express Hotels', periodEN: '2019', periodPT: '2019' },
]
