// =============================================================================
// Dicionário de /creators/tavaristico/hospitality — A PROPOSTA COMERCIAL
// -----------------------------------------------------------------------------
// Pedido do fundador (#01 CHANGES 2026-08-14): "preciso que crie uma página no
// site que vai ser para uma proposta diferente. Preciso selecionar as fotos mais
// comerciais do Ô De Casa Hostel (...) É uma proposta de fotografias mais
// comerciais com foco em apresentação dentro do Booking e outros motores de
// hospedagem."
//
// O QUE ESTA PÁGINA É, e o que ela não é. Ela NÃO é um case do portfólio: o Ô de
// Casa já tem o dele (`o-18-years` em `_data.ts`), e case olha para trás. Esta
// olha para frente — é uma OFERTA, endereçada a quem administra uma hospedagem e
// vive de conversão dentro do Booking, do Airbnb, do Hostelworld. Por isso ela
// mora numa rota-filha do portfólio em vez de virar mais um item da vitrine:
// serve de prova de que o autor da oferta é o mesmo autor daquelas fotos.
//
// O ARGUMENTO, e ele é o miolo da página. Todo anúncio de hospedagem em motor de
// reserva foi fotografado do mesmo jeito: a cama de frente, o banheiro de canto,
// a fachada às onze da manhã. O hóspede compara vinte anúncios idênticos e
// escolhe por preço, porque foi a única variável que sobrou. Uma hospedagem que
// mostra CULTURA sai da comparação por preço, porque passa a ser a única com
// aquilo. As catorze fotos são o argumento: nenhuma delas é uma cama.
//
// Fonte das fotos: seleção do próprio fundador em
// `TAV05 → TBF .Ô De Casa → RAW → SAÍDA`, 14 arquivos, convertidos para webp a
// 2000px. Cliente real, trabalho real — o Ô de Casa é o primeiro cliente da casa.
//
// As catorze legendas são as FUNÇÕES de cada foto num anúncio, não descrições
// bonitas: é isso que transforma a galeria em argumento comercial em vez de
// álbum. Ver `SHOTS` no fim do arquivo.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const base = '/images/creators/tavaristico/hospitality'

export interface Shot {
  src: string
  /** Proporção nativa do arquivo. Evita salto de layout no carregamento. */
  w: number
  h: number
  /** A FUNÇÃO da foto dentro de um anúncio de hospedagem. */
  role: { en: string; pt: string }
  alt: { en: string; pt: string }
}

/**
 * As catorze, na ordem de leitura da página — que é uma ORDEM DE ANÚNCIO, não a
 * ordem em que foram tiradas: chegada, espaço, gente, noite. É a sequência em
 * que o hóspede decide.
 */
export const SHOTS: Shot[] = [
  {
    src: `${base}/13-recepcao.webp`,
    w: 2000,
    h: 1333,
    role: { en: 'Arrival', pt: 'Chegada' },
    alt: {
      en: 'The Ô de Casa front desk under a lit RECEPÇÃO sign, a staff member smiling behind it.',
      pt: 'A recepção do Ô de Casa sob o letreiro aceso RECEPÇÃO, com um atendente sorrindo atrás do balcão.',
    },
  },
  {
    src: `${base}/02-mural-oste.webp`,
    w: 1500,
    h: 2000,
    role: { en: 'The wall people photograph', pt: 'A parede que rende foto' },
    alt: {
      en: 'A guest walking past the orange Ô de Casa mural holding a drink.',
      pt: 'Uma hóspede passando pelo mural laranja do Ô de Casa com um drink na mão.',
    },
  },
  {
    src: `${base}/06-corredor.webp`,
    w: 2000,
    h: 1500,
    role: { en: 'Circulation', pt: 'Circulação' },
    alt: {
      en: 'The planted corridor of the hostel, a guest walking through with a backpack.',
      pt: 'O corredor com plantas do hostel, uma hóspede atravessando de mochila.',
    },
  },
  {
    src: `${base}/08-area-externa.webp`,
    w: 2000,
    h: 1333,
    role: { en: 'Common area, in use', pt: 'Área comum, em uso' },
    alt: {
      en: 'Guests seated in deck chairs in the outdoor area under an umbrella.',
      pt: 'Hóspedes sentados em cadeiras de praia na área externa, sob um guarda-sol.',
    },
  },
  {
    src: `${base}/11-deck-de-cima.webp`,
    w: 2000,
    h: 1500,
    role: { en: 'The floor plan, from above', pt: 'A planta, vista de cima' },
    alt: {
      en: 'The outdoor deck seen from above, coloured chairs and guests around a table.',
      pt: 'O deck externo visto de cima, cadeiras coloridas e hóspedes em volta de uma mesa.',
    },
  },
  {
    src: `${base}/05-rede.webp`,
    w: 1333,
    h: 2000,
    role: { en: 'What resting looks like here', pt: 'Como é descansar aqui' },
    alt: {
      en: 'A guest resting in a blue hammock strung under the plants.',
      pt: 'Uma hóspede descansando numa rede azul armada sob as plantas.',
    },
  },
  {
    src: `${base}/14-piscina.webp`,
    w: 1333,
    h: 2000,
    role: { en: 'The amenity, at night', pt: 'O diferencial, à noite' },
    alt: {
      en: 'The lit pool at night, a guest sitting on the painted edge.',
      pt: 'A piscina iluminada à noite, com uma hóspede sentada na borda pintada.',
    },
  },
  {
    src: `${base}/09-recepcao-retrato.webp`,
    w: 2000,
    h: 1500,
    role: { en: 'Who receives you', pt: 'Quem recebe' },
    alt: {
      en: 'A staff member in the hostel shirt against the orange fridge covered in photographs.',
      pt: 'Uma integrante da equipe com a camiseta do hostel diante da geladeira laranja coberta de fotos.',
    },
  },
  {
    src: `${base}/10-recepcao-retrato-2.webp`,
    w: 2000,
    h: 1500,
    role: { en: 'Who receives you', pt: 'Quem recebe' },
    alt: {
      en: 'The same staff member, second frame, the wall of guest photographs behind her.',
      pt: 'A mesma integrante da equipe, segundo quadro, com a parede de fotos de hóspedes atrás.',
    },
  },
  {
    src: `${base}/03-parede-azul.webp`,
    w: 2000,
    h: 1500,
    role: { en: 'The guest, at their best', pt: 'O hóspede, no melhor dele' },
    alt: {
      en: 'A guest posing against the blue wall in a Brasil shirt and sunglasses.',
      pt: 'Uma hóspede posando na parede azul, de camiseta Brasil e óculos escuros.',
    },
  },
  {
    src: `${base}/01-engradados.webp`,
    w: 1500,
    h: 2000,
    role: { en: 'The house has humour', pt: 'A casa tem humor' },
    alt: {
      en: 'A guest sitting on a stack of coloured beer crates in the storeroom.',
      pt: 'Uma hóspede sentada numa pilha de engradados coloridos no depósito.',
    },
  },
  {
    src: `${base}/04-torcida.webp`,
    w: 1500,
    h: 2000,
    role: { en: 'Why you book here and not next door', pt: 'Por que se reserva aqui e não ao lado' },
    alt: {
      en: 'Guests crowded together watching a match in Brazil shirts, under the painted XOXO wall.',
      pt: 'Hóspedes amontoados assistindo a um jogo, de camisa do Brasil, sob a parede pintada com XOXO.',
    },
  },
  {
    src: `${base}/12-sax.webp`,
    w: 1500,
    h: 2000,
    role: { en: 'Programming, not decoration', pt: 'Programação, não decoração' },
    alt: {
      en: 'A saxophone player performing live in red light over the DJ deck.',
      pt: 'Um saxofonista tocando ao vivo sob luz vermelha, em cima da mesa de DJ.',
    },
  },
  {
    src: `${base}/07-rua.webp`,
    w: 1333,
    h: 2000,
    role: { en: 'The neighbourhood is part of the room', pt: 'O bairro faz parte do quarto' },
    alt: {
      en: 'The street outside the hostel at night, people gathered under a bar umbrella.',
      pt: 'A rua na frente do hostel à noite, pessoas reunidas sob um guarda-sol de bar.',
    },
  },
]


// =============================================================================
// OS DESTAQUES DO PERFIL — a segunda leva de material (2026-08-14)
// -----------------------------------------------------------------------------
// Pedido do fundador: "use também esses materiais seguindo a mesma lógica do
// layout 05 no pitch". A pasta é `TAV05 → TBF .Ô De Casa → 02. MARÇO →
// DESTAQUES`, 81 arquivos; entram treze.
//
// POR QUE ESTES TREZE, e por que eles fecham o argumento da página. As catorze
// fotos de cima são FOTOGRAFIA: provam que a casa foi bem fotografada. Estas
// são os DESTAQUES do perfil, e provam outra coisa, que é o que um hoteleiro
// precisa ver: que o mesmo material vira um anúncio navegável, tipo por tipo de
// quarto, com o preço da diária longe da conversa. É literalmente um anúncio de
// Booking, só que contado por quem tem voz.
//
// A ordem é a de um anúncio de verdade: o que fazer, onde dormir (por tipo de
// acomodação, que é como o hóspede filtra), o que comer, a prova social, e a
// cidade. O último quadro é o único com número, e o número é deles, não nosso.
// =============================================================================

const destaques = '/images/creators/tavaristico/hospitality/destaques'

export interface Highlight {
  src: string
  role: { en: string; pt: string }
  alt: { en: string; pt: string }
}

export const HIGHLIGHTS: Highlight[] = [
  { src: `${destaques}/01-play.webp`, role: { en: 'What there is to do', pt: 'O que tem para fazer' }, alt: { en: 'Highlight cover reading PLAY over the hostel mural.', pt: 'Capa de destaque com a palavra PLAY sobre o mural do hostel.' } },
  { src: `${destaques}/02-piscina.webp`, role: { en: 'The heated pool', pt: 'A piscina aquecida' }, alt: { en: 'A guest in the heated pool, seen from behind.', pt: 'Uma hóspede na piscina aquecida, vista de costas.' } },
  { src: `${destaques}/03-rede.webp`, role: { en: 'The hammocks', pt: 'As redes' }, alt: { en: 'A blue hammock strung among the plants.', pt: 'Uma rede azul armada entre as plantas.' } },
  { src: `${destaques}/04-sleep.webp`, role: { en: 'Where you sleep', pt: 'Onde se dorme' }, alt: { en: 'Highlight cover reading SLEEP over a yellow room.', pt: 'Capa de destaque com a palavra SLEEP sobre um quarto amarelo.' } },
  { src: `${destaques}/05-dorms.webp`, role: { en: 'Dorms', pt: 'Dorms' }, alt: { en: 'A shared dorm with bunk beds.', pt: 'Um quarto compartilhado com beliches.' } },
  { src: `${destaques}/06-pods.webp`, role: { en: 'Pods', pt: 'Pods' }, alt: { en: 'The capsule pods with individual curtains.', pt: 'As cápsulas individuais com cortina.' } },
  { src: `${destaques}/07-suites.webp`, role: { en: 'Suites', pt: 'Suítes' }, alt: { en: 'A private suite with artwork on the wall.', pt: 'Uma suíte privativa com arte na parede.' } },
  { src: `${destaques}/08-lofts.webp`, role: { en: 'Lofts', pt: 'Lofts' }, alt: { en: 'A loft room seen from the doorway.', pt: 'Um loft visto da porta.' } },
  { src: `${destaques}/09-estudios.webp`, role: { en: 'Studios', pt: 'Estúdios' }, alt: { en: 'A studio with a double bed and yellow wall.', pt: 'Um estúdio com cama de casal e parede amarela.' } },
  { src: `${destaques}/10-eat-drink.webp`, role: { en: 'The kitchen', pt: 'A cozinha' }, alt: { en: 'A sandwich being made, highlight cover reading SANDUBAS.', pt: 'Um sanduíche sendo montado, capa de destaque com a palavra SANDUBAS.' } },
  { src: `${destaques}/11-cafe.webp`, role: { en: 'Breakfast', pt: 'O café da manhã' }, alt: { en: 'Breakfast served, highlight cover reading CAFÉ DA MANHÃ.', pt: 'Café da manhã servido, capa de destaque com a chamada CAFÉ DA MANHÃ.' } },
  { src: `${destaques}/12-awards.webp`, role: { en: 'What others say', pt: 'O que dizem' }, alt: { en: 'Highlight with awards and review scores for the hostel.', pt: 'Destaque com prêmios e notas de avaliação do hostel.' } },
  { src: `${destaques}/13-explore.webp`, role: { en: 'The city starts here', pt: 'A cidade começa aqui' }, alt: { en: 'Highlight cover reading EXPLORE over the lit hostel sign at night.', pt: 'Capa de destaque com a palavra EXPLORE sobre o letreiro do hostel à noite.' } },
]

/** Foto de perfil do @odecasahostel, e o handle que assina o quadro. */
export const HIGHLIGHT_PROFILE = {
  handle: 'Ô',
  avatar: '/images/creators/tavaristico/hospitality/o-avatar.webp',
}

const en = {
  meta: {
    title: 'Where Brazil Stays · Tavarístico',
    description:
      'Commercial photography for hostels, hotels and guesthouses, made for Booking, Airbnb and the other booking engines. Selected work: Ô de Casa Hostel, São Paulo.',
  },
  eyebrow: 'Creators · Tavarístico · Proposal',
  crumb: '← Portfolio',
  title: 'Ô De Casa! Somebody just arrived.',
  deck:
    'Ô de Casa is a hostel in São Paulo and the first client of .TBF. A mural at the door, plants in the hallway, a hammock, a sax over the DJ deck, a room in Brazil shirts for the match. This is the house, and this is why people stay.',
  thesis: 'Make Brazil impossible to ignore, one house at a time.',
  thesisSub:
    'That is what .TBF. does. It started at Ô de Casa.',

  argumentTitle: 'What the engines actually reward',
  argument: [
    {
      n: '01',
      title: 'The first photo decides',
      body:
        'On a phone, a listing is one image and a number. The image has under a second to say something the next twenty will not say.',
    },
    {
      n: '02',
      title: 'People in the frame',
      body:
        'An empty room says the room is available. A room with people in it says the stay is worth having. Booking listings are almost always empty.',
    },
    {
      n: '03',
      title: 'Night counts as a room',
      body:
        'Properties are photographed by daylight and sold for the night. What the place is like after dark is exactly what the guest is trying to imagine, and almost nobody shows it.',
    },
    {
      n: '04',
      title: 'The neighbourhood is part of the room',
      body:
        'Nobody travels to a bed. The street, the bar on the corner, the walk back. All of it is inventory, and none of it is in the gallery.',
    },
  ],

  reelLabel: 'Ô de Casa Hostel, São Paulo. Fourteen frames, none of them a bed.',

  listingTitle: 'And then it becomes a listing.',
  listingDeck:
    'The same material, cut for the place people actually browse. Room type by room type, with the nightly rate nowhere near the argument. This is the hostel profile as it stands today.',
  listingRole: 'What this frame answers',

  galleryTitle: 'Ô de Casa Hostel, São Paulo',
  galleryDeck:
    'Fourteen frames. Not one of them is a bed. This is what the same property looks like when it is photographed as a place instead of as a room count.',
  roleLabel: 'Role in a listing',

  deliverableTitle: 'What the work is',
  deliverables: [
    {
      title: 'A shoot built around the listing',
      body:
        'Shot list written from what the engines rank and what the guest scrolls past, not from a generic interiors brief.',
    },
    {
      title: 'Day and night, guests included',
      body:
        'Arrival, common areas, the amenity after dark, staff and guests in frame with releases signed on the day.',
    },
    {
      title: 'Delivered in the formats the engines want',
      body:
        'Sized and cropped for Booking, Airbnb, Hostelworld and Google, plus verticals for stories and reels. One shoot, every surface.',
    },
    {
      title: 'An ordered gallery, not a folder',
      body:
        'The photographs arrive in the sequence the guest decides in, with the role of each frame written down, in the same order used on this page.',
    },
  ],

  ctaTitle: 'Bring your property.',
  ctaBody:
    'Tell us where it is, how many rooms, and what people say when they leave. We answer with a shot list.',
  ctaButton: 'Start a conversation',
  ctaMail: 'tavaristico@thebrfactory.com',
  clientNote: 'Photographs: Ô de Casa Hostel, São Paulo. Client of .TBF. inc.',
}

const pt: typeof en = {
  meta: {
    title: 'Onde o Brasil se hospeda · Tavarístico',
    description:
      'Fotografia comercial para hostels, hotéis e pousadas, feita para o Booking, o Airbnb e os outros motores de reserva. Trabalho selecionado: Ô de Casa Hostel, São Paulo.',
  },
  eyebrow: 'Creators · Tavarístico · Proposta',
  crumb: '← Portfólio',
  title: 'Ô De Casa! Chegou alguém.',
  deck:
    'O Ô de Casa é um hostel em São Paulo e o primeiro cliente da .TBF. Um mural na porta, plantas no corredor, uma rede, um sax em cima da mesa de DJ, uma sala de camisa do Brasil para o jogo. Esta é a casa, e é por isso que o povo fica.',
  thesis: 'Tornar o Brasil impossível de ignorar, uma casa de cada vez.',
  thesisSub: 'É o que a .TBF. faz. Começou no Ô de Casa.',

  argumentTitle: 'O que os motores realmente premiam',
  argument: [
    {
      n: '01',
      title: 'A primeira foto decide',
      body:
        'No celular, um anúncio é uma imagem e um número. A imagem tem menos de um segundo para dizer alguma coisa que os próximos vinte não vão dizer.',
    },
    {
      n: '02',
      title: 'Gente dentro do quadro',
      body:
        'Quarto vazio diz que o quarto está disponível. Quarto com gente diz que a estadia vale a pena. Anúncio de Booking é quase sempre vazio.',
    },
    {
      n: '03',
      title: 'A noite conta como cômodo',
      body:
        'A hospedagem é fotografada de dia e vendida para a noite. Como é o lugar depois que escurece é exatamente o que o hóspede está tentando imaginar, e quase ninguém mostra.',
    },
    {
      n: '04',
      title: 'O bairro faz parte do quarto',
      body:
        'Ninguém viaja para uma cama. A rua, o bar da esquina, a volta a pé. Tudo isso é inventário, e nada disso está na galeria.',
    },
  ],

  reelLabel: 'Ô de Casa Hostel, São Paulo. Catorze quadros, nenhum deles uma cama.',

  listingTitle: 'E aí vira anúncio.',
  listingDeck:
    'O mesmo material, recortado para o lugar onde as pessoas de fato procuram. Tipo de quarto por tipo de quarto, com o valor da diária longe do argumento. É o perfil do hostel como ele está hoje.',
  listingRole: 'O que este quadro responde',

  galleryTitle: 'Ô de Casa Hostel, São Paulo',
  galleryDeck:
    'Catorze quadros. Nenhum deles é uma cama. É assim que a mesma hospedagem fica quando é fotografada como lugar, e não como número de quartos.',
  roleLabel: 'Função no anúncio',

  deliverableTitle: 'O que é o trabalho',
  deliverables: [
    {
      title: 'Um ensaio construído em cima do anúncio',
      body:
        'Lista de fotos escrita a partir do que os motores rankeiam e do que o hóspede pula, não de um briefing genérico de interiores.',
    },
    {
      title: 'Dia e noite, com hóspede dentro',
      body:
        'Chegada, áreas comuns, o diferencial depois de escurecer, equipe e hóspedes no quadro com autorização de imagem assinada no dia.',
    },
    {
      title: 'Entregue nos formatos que os motores pedem',
      body:
        'Dimensionado e recortado para Booking, Airbnb, Hostelworld e Google, mais os verticais para stories e reels. Um ensaio, todas as superfícies.',
    },
    {
      title: 'Uma galeria ordenada, não uma pasta',
      body:
        'As fotos chegam na sequência em que o hóspede decide, com a função de cada quadro escrita, na mesma ordem usada nesta página.',
    },
  ],

  ctaTitle: 'Traga a sua hospedagem.',
  ctaBody:
    'Conte onde fica, quantos quartos tem e o que as pessoas falam quando vão embora. A gente responde com uma lista de fotos.',
  ctaButton: 'Começar uma conversa',
  ctaMail: 'tavaristico@thebrfactory.com',
  clientNote: 'Fotografias: Ô de Casa Hostel, São Paulo. Cliente da .TBF. inc.',
}

export const hospitality: Record<Lang, typeof en> = { en, pt }
