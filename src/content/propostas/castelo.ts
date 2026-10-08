// =============================================================================
// PROPOSTA · HOSTEL CASTELO — conteúdo das 8 telas
// -----------------------------------------------------------------------------
// O QUE ESTA PEÇA É. Uma proposta ENDEREÇADA, de fotografia comercial, do
// Tavarístico para o Hostel Castelo (Pampulha, Belo Horizonte), ligada à estadia
// de 27 de agosto a 9 de setembro de 2026. Ela usa o formato de tela cheia do
// deck 3.0 (o casco em `src/components/DeckShell/DeckShell.tsx`), e NÃO é o
// pitch da .TBF.: o fundador foi explícito em 2026-08-18 de que o pitch entrava
// como exemplo de layout, não de conteúdo. Aqui quem está à venda é o autor das
// fotos, não o venture studio.
//
// 🔴 A LINHA QUE SEPARA O QUE ENTRA DO QUE NÃO ENTRA (ordem do fundador, mesma
// data): a pesquisa em `~/TBF X CASTELO/PESQUISA INICIAL/` tem duas naturezas
// misturadas, e só uma delas é apresentável.
//
//   ENTRA (o cliente pode ler): o diagnóstico da vitrine, o que os motores de
//   reserva premiam, a prova de trabalho anterior, o que será entregue, as datas
//   e os limites do escopo.
//
//   NÃO ENTRA, é uso interno dele: o roteiro minuto a minuto da call, o texto
//   pronto de WhatsApp, a lista de perguntas a fazer ao Danilo, a leitura de
//   "forças e lacunas" do negócio deles, a comparação com outras casas e as duas
//   imagens de referência de terceiros (Freehand Miami e Los Patios), que são
//   estudo interno e não têm licença nenhuma para republicação. Nada disso tem
//   representação neste arquivo, e não deve ganhar uma.
//
// AMARRAÇÃO COM O QUE JÁ EXISTE NO SITE. O argumento comercial e as catorze
// fotos do Ô de Casa não foram reescritos aqui: eles vêm de
// `src/content/i18n/pages/hospitality.ts`, que é a oferta aberta de fotografia
// de hospedagem em `/creators/tavaristico/hospitality`. Esta peça é a mesma
// oferta com nome, casa e data. Corrigir o argumento lá corrige aqui.
//
// FONTES DOS NÚMEROS que aparecem na tela, todas públicas e datadas na própria
// peça (ver `SOURCES` no fim do arquivo). Número sem fonte não entra: a peça
// abre dizendo que a vitrine dos outros é frouxa, e não pode ser frouxa.
//
// VOZ (CLAUDE.md regra 6): nenhum travessão, nenhum en-dash. Português é a voz
// principal; o inglês entra pequeno, como no deck, e aqui ele tem um motivo a
// mais que estética: hostel vende para hóspede estrangeiro.
// =============================================================================

export interface Bi {
  pt: string
  en: string
}

const HOSP = '/images/creators/tavaristico/hospitality'

// ─── Cenas: fonte única do passador ──────────────────────────────────────────
// A capa é a página 00 e não entra na contagem, igual ao deck: o total anunciado
// é o das telas de argumento.
export const SCENES = [
  { id: 'cena-00', pt: 'Capa', en: 'Cover', n: '00' },
  { id: 'cena-01', pt: 'O Problema', en: 'The Problem', n: '01' },
  // RÓTULOS CURTOS. O kicker é uma linha só, ancorada: PT e EN correm lado a
  // lado e, quando o par não cabe, a dobra em inglês desce por cima da headline
  // da cena (a faixa do título tem altura reservada). Nome de cena aqui é
  // etiqueta de passador, não título: o título quem dá é a própria tela.
  { id: 'cena-02', pt: 'Os Motores', en: 'The Engines', n: '02' },
  { id: 'cena-03', pt: 'A Prova', en: 'The Proof', n: '03' },
  { id: 'cena-04', pt: 'Quem Assina', en: 'Who Signs', n: '04' },
  { id: 'cena-05', pt: 'O Castelo Hoje', en: 'Castelo Today', n: '05' },
  { id: 'cena-06', pt: 'A Proposta', en: 'The Proposal', n: '06' },
  { id: 'cena-07', pt: 'O Combinado', en: 'The Agreement', n: '07' },
] as const

// =============================================================================
// CENA 00 — CAPA
// A foto de capa é do Ô de Casa, não do Castelo, e isso é dito na tela. Abrir
// com a piscina do trabalho anterior faz a promessa no idioma da própria casa
// que está lendo: o Castelo também tem piscina, e é ali que a proposta mira.
// =============================================================================
export const COVER = {
  eyebrow: { pt: 'Proposta de fotografia comercial', en: 'Commercial photography proposal' } as Bi,
  title: ['HOSTEL CASTELO', 'TAVARÍSTICO'],
  /** Fica entre os dois nomes, na capa. */
  cross: '×',
  line: {
    pt: 'Pampulha, Belo Horizonte. Estadia de 27 de agosto a 9 de setembro de 2026.',
    en: 'Pampulha, Belo Horizonte. Stay from August 27 to September 9, 2026.',
  } as Bi,
  thesis: {
    pt: 'Quinze imagens para a casa ser escolhida por quem nunca entrou nela.',
    en: 'Fifteen images so the house gets chosen by people who have never walked in.',
  } as Bi,
  media: { src: `${HOSP}/08-area-externa.webp`, alt: { pt: 'Pátio do Ô de Casa Hostel com hóspedes sentados em roda.', en: 'The patio at Ô de Casa Hostel with guests sitting in a circle.' } as Bi },
  credit: {
    pt: 'Fotografia: Ô de Casa Hostel, São Paulo. Trabalho anterior do autor desta proposta.',
    en: 'Photograph: Ô de Casa Hostel, São Paulo. Previous work by the author of this proposal.',
  } as Bi,
}

// =============================================================================
// CENA 01 — O PROBLEMA
// Copy transportada de `content/i18n/pages/hospitality.ts` (a oferta aberta).
// Uma proposta endereçada não inventa argumento novo: ela chega com o mesmo.
// =============================================================================
export const PROBLEM = {
  headline: {
    pt: ['O seu anúncio está igual', 'ao anúncio de todo mundo.'],
    en: ['Your listing looks like', 'everyone else’s listing.'],
  },
  body: {
    pt: 'Toda hospedagem no Booking foi fotografada do mesmo jeito: a cama de frente, o banheiro de canto, a fachada às onze da manhã. Vinte anúncios idênticos, e o hóspede escolhe por preço, porque preço é a única coisa que sobrou diferente.',
    en: 'Every property on Booking was photographed the same way: the bed head-on, the bathroom from the corner, the façade at eleven in the morning. Twenty identical listings, and the guest picks on price, because price is the only thing left that differs.',
  } as Bi,
  thesis: {
    pt: 'Hospedagem que mostra cultura para de competir por preço.',
    en: 'A property that shows culture stops competing on price.',
  } as Bi,
  thesisSub: {
    pt: 'Não por ser mais barata. Por ser a única que tem aquilo.',
    en: 'Not because it is cheaper. Because it is the only one with that.',
  } as Bi,
}

// =============================================================================
// CENA 02 — O QUE OS MOTORES PREMIAM
// Os quatro pontos são os da oferta aberta. Os três números são novos e existem
// para tirar a conversa do gosto pessoal: fotografia aqui é variável comercial,
// e variável comercial se mede. Fonte de cada um em `SOURCES`.
// =============================================================================
export const ENGINES = {
  headline: { pt: 'O que os motores de reserva premiam.', en: 'What the booking engines reward.' } as Bi,
  points: [
    {
      n: '01',
      title: { pt: 'A primeira foto decide', en: 'The first photo decides' } as Bi,
      body: {
        pt: 'No celular, um anúncio é uma imagem e um número. A imagem tem menos de um segundo para dizer o que os próximos vinte não vão dizer.',
        en: 'On a phone, a listing is one image and a number. The image has under a second to say what the next twenty will not.',
      } as Bi,
    },
    {
      n: '02',
      title: { pt: 'Gente dentro do quadro', en: 'People in the frame' } as Bi,
      body: {
        pt: 'Quarto vazio diz que o quarto está disponível. Quarto com gente diz que a estadia vale a pena.',
        en: 'An empty room says the room is available. A room with people says the stay is worth having.',
      } as Bi,
    },
    {
      n: '03',
      title: { pt: 'A noite conta como cômodo', en: 'Night counts as a room' } as Bi,
      body: {
        pt: 'A casa é fotografada de dia e vendida para a noite. Como ela fica depois que escurece é o que o hóspede está tentando imaginar.',
        en: 'The house is photographed by day and sold for the night. What it is like after dark is what the guest is trying to imagine.',
      } as Bi,
    },
    {
      n: '04',
      title: { pt: 'O bairro faz parte do quarto', en: 'The neighbourhood is part of the room' } as Bi,
      body: {
        pt: 'Ninguém viaja para uma cama. A Pampulha, a lagoa, a volta a pé: tudo isso é inventário, e nada disso costuma estar na galeria.',
        en: 'Nobody travels to a bed. Pampulha, the lake, the walk back: all of it is inventory, and none of it is usually in the gallery.',
      } as Bi,
    },
  ],
  // RÓTULOS CURTOS DE PROPÓSITO. Os três números correm numa fila só, e fila de
  // números com legenda de seis palavras vira três parágrafos empilhados: no
  // telefone isso custou 119px além da tela (medido). A frase inteira de cada um
  // está no argumento acima; aqui o rótulo só nomeia o número.
  stats: [
    {
      value: '24%',
      label: { pt: 'mais reservas', en: 'more bookings' } as Bi,
      source: 'Booking.com',
    },
    {
      value: '60%',
      label: { pt: 'reservam no celular', en: 'book on mobile' } as Bi,
      source: 'Punch Hospitality, 2026',
    },
    {
      value: '24+',
      label: { pt: 'fotos, o piso do motor', en: 'photos, the engine’s floor' } as Bi,
      source: 'Booking.com',
    },
  ],
}

// =============================================================================
// CENA 03 — A PROVA
// As catorze do Ô de Casa, as mesmas de /creators/tavaristico/hospitality. A
// ordem é a ordem de anúncio (chegada, espaço, gente, noite), não a ordem em que
// foram tiradas. Quem escreve a função de cada quadro é o dicionário de lá.
// =============================================================================
export const PROOF = {
  headline: { pt: 'Ô de Casa Hostel, São Paulo.', en: 'Ô de Casa Hostel, São Paulo.' } as Bi,
  line: {
    pt: 'Catorze quadros. Nenhum deles é uma cama.',
    en: 'Fourteen frames. Not one of them is a bed.',
  } as Bi,
  /**
   * A FRASE FORTE SUBIU para debaixo do título, em largura cheia, e o que sobrou
   * na coluna estreita ao lado do anúncio é só a procedência. A coluna do story
   * tem cerca de 135px no telefone: parágrafo ali vira uma palavra por linha.
   */
  lead: {
    pt: 'Fotografada como lugar, não como número de quartos.',
    en: 'Photographed as a place, not as a room count.',
  } as Bi,
  body: {
    pt: 'Cliente real da .TBF. inc. Imagens em uso nos canais de reserva da casa.',
    en: 'A real client of .TBF. inc. Images in use across the property’s booking channels.',
  } as Bi,
  link: { label: { pt: 'Ver a proposta completa', en: 'See the full proposal' } as Bi, href: '/creators/tavaristico/hospitality' },
}

// =============================================================================
// CENA 04 — QUEM ASSINA
// A cena que vende a pessoa. Sem inventar currículo: cargo, origem, quem
// representa e as frentes de trabalho, com o portfólio a um clique.
// =============================================================================
export const AUTHOR = {
  headline: { pt: 'Quem assina.', en: 'Who signs it.' } as Bi,
  name: 'TAVARÍSTICO',
  alias: 'Felipe Tavares',
  role: {
    pt: 'Diretor de arte e diretor criativo associado. Representado pela .TBF. inc.',
    en: 'Art director and associate creative director. Represented by .TBF. inc.',
  } as Bi,
  bio: {
    pt: 'Publicidade, design gráfico e conteúdo de marca. Vim do solo sagrado e profano da capital do axé, Salvador, Bahia. Trabalho com direção de arte para moda, cultura e hospitalidade.',
    en: 'Advertising, graphic design and branded content. I came from the sacred and profane soil of the capital of axé, Salvador, Bahia. I work in art direction for fashion, culture and hospitality.',
  } as Bi,
  credits: [
    { pt: 'São Paulo Fashion Week', en: 'São Paulo Fashion Week' } as Bi,
    { pt: 'Ô de Casa Hostel, São Paulo', en: 'Ô de Casa Hostel, São Paulo' } as Bi,
    { pt: '.TBF. inc, estúdio criativo', en: '.TBF. inc, creative studio' } as Bi,
  ],
  link: { label: { pt: 'Portfólio', en: 'Portfolio' } as Bi, href: '/creators/tavaristico' },
}

// =============================================================================
// CENA 05 — O CASTELO VISTO DE FORA
// A cena que prova que a casa foi estudada antes da conversa, e a única com
// dados sobre eles. Tudo o que está aqui é público e datado. O que ficou de fora
// de propósito: qualquer leitura de fraqueza do negócio deles. A tela diz o que
// a casa TEM e o que os canais ainda não mostram, que é uma diferença de
// educação e também de verdade: o gargalo não é o serviço.
// =============================================================================
export const CASTELO = {
  headline: {
    pt: ['A casa já é boa.', 'A vitrine é que está atrás dela.'],
    // A dobra em inglês precisa caber em UMA linha no telefone: em duas, ela
    // passava por cima do topo das duas colunas (a faixa do título tem altura
    // reservada, e o que excede não empurra, invade).
    en: ['The house is good.', 'The shop window lags behind.'],
  },
  sides: [
    {
      // DUAS PALAVRAS POR COLUNA. Os títulos longos quebravam em três linhas no
      // telefone e as duas colunas começavam em alturas diferentes, que é
      // exatamente o que uma cena de dois lados não pode fazer.
      who: { pt: 'A CASA', en: 'THE HOUSE' } as Bi,
      color: 'paper' as const,
      lines: [
        { pt: 'Casa de grande porte na Pampulha, com pátio, piscina e terraço.', en: 'A large house in Pampulha, with a patio, a pool and a terrace.' } as Bi,
        { pt: 'Cozinha compartilhada, área social e proposta de bem estar.', en: 'A shared kitchen, social areas and a wellness offer.' } as Bi,
        { pt: 'Notas altas de limpeza, equipe e localização.', en: 'High scores for cleanliness, staff and location.' } as Bi,
        { pt: 'Endereço dentro de um conjunto que a UNESCO reconheceu em 2016.', en: 'An address inside an ensemble UNESCO recognised in 2016.' } as Bi,
      ],
    },
    {
      who: { pt: 'A VITRINE', en: 'THE WINDOW' } as Bi,
      color: 'accent' as const,
      lines: [
        { pt: 'Uma capa que prometa a experiência antes da lista de comodidades.', en: 'A cover image that promises the experience before the amenity list.' } as Bi,
        { pt: 'A piscina e o pátio como lugar de estar, não como item de infraestrutura.', en: 'The pool and the patio as a place to be, not as infrastructure items.' } as Bi,
        { pt: 'A casa depois de escurecer, que é quando ela é vendida.', en: 'The house after dark, which is when it is sold.' } as Bi,
        { pt: 'A Pampulha dentro da galeria, e não só no campo de endereço.', en: 'Pampulha inside the gallery, not only in the address field.' } as Bi,
      ],
    },
  ],
  note: {
    pt: 'Leitura feita a partir dos canais públicos da casa em agosto de 2026: Booking, Expedia, Agoda, TripAdvisor, Google e Worldpackers.',
    en: 'Read from the property’s public channels in August 2026: Booking, Expedia, Agoda, TripAdvisor, Google and Worldpackers.',
  } as Bi,
}

// =============================================================================
// CENA 06 — A PROPOSTA
// Quinze imagens, e a lógica delas. A lista NÃO é a shotlist final: a shotlist
// se escreve com a casa, depois do reconhecimento. O que a tela promete é a
// COBERTURA, que é o que o cliente precisa saber para dizer sim.
// =============================================================================
export const OFFER = {
  headline: { pt: 'Quinze imagens finais, na ordem em que o hóspede decide.', en: 'Fifteen final images, in the order the guest decides.' } as Bi,
  groups: [
    { n: '01', title: { pt: 'Chegada', en: 'Arrival' } as Bi, body: { pt: 'Capa, fachada e a primeira impressão da casa.', en: 'Cover, façade and the first impression of the house.' } as Bi },
    { n: '02', title: { pt: 'Água e pátio', en: 'Water and patio' } as Bi, body: { pt: 'A piscina e a área externa como experiência, de dia e no fim da tarde.', en: 'The pool and the outdoor area as experience, by day and at dusk.' } as Bi },
    { n: '03', title: { pt: 'Onde se dorme', en: 'Where you sleep' } as Bi, body: { pt: 'Os tipos de acomodação, cada um com uma leitura ampla e uma de material.', en: 'The room types, each with a wide read and a material one.' } as Bi },
    { n: '04', title: { pt: 'Onde se vive', en: 'Where you live' } as Bi, body: { pt: 'Área social, cozinha, café e o espaço de bem estar.', en: 'Social areas, kitchen, breakfast and the wellness space.' } as Bi },
    { n: '05', title: { pt: 'Gente e bairro', en: 'People and neighbourhood' } as Bi, body: { pt: 'Convivência real, com autorização de imagem, e a Pampulha em volta.', en: 'Real shared life, with image releases, and Pampulha around it.' } as Bi },
  ],
  deliverables: [
    { pt: 'Tratadas e entregues em alta resolução.', en: 'Retouched and delivered in high resolution.' } as Bi,
    { pt: 'Recortadas para Booking, Hostelworld, Google, Expedia, Agoda e site.', en: 'Cropped for Booking, Hostelworld, Google, Expedia, Agoda and the website.' } as Bi,
    { pt: 'Entregues em sequência, com a função de cada quadro escrita.', en: 'Delivered as a sequence, with the role of each frame written down.' } as Bi,
  ],
}

// =============================================================================
// CENA 07 — O COMBINADO E O FECHO
// O escopo escrito é parte da oferta, não letra miúda: é ele que protege as duas
// partes de expectativa diferente. O que NÃO entra aqui é a negociação (o que
// pedir, como conduzir, o que aceitar): isso é do fundador, fica fora da tela.
// =============================================================================
export const AGREEMENT = {
  headline: { pt: 'O combinado.', en: 'The agreement.' } as Bi,
  terms: [
    { k: { pt: 'Contrapartida', en: 'In exchange' } as Bi, v: { pt: 'Hospedagem de 27 de agosto a 9 de setembro de 2026.', en: 'Accommodation from August 27 to September 9, 2026.' } as Bi },
    { k: { pt: 'Entrega', en: 'Delivery' } as Bi, v: { pt: 'Quinze fotografias finais, selecionadas e tratadas.', en: 'Fifteen final photographs, selected and retouched.' } as Bi },
    { k: { pt: 'Uso', en: 'Usage' } as Bi, v: { pt: 'Uso comercial próprio da casa nos canais de reserva e no material institucional.', en: 'The property’s own commercial use across booking channels and institutional material.' } as Bi },
    { k: { pt: 'Prazo', en: 'Timeline' } as Bi, v: { pt: 'Prévia da seleção em até 7 dias após a última foto. Finais em até 14 dias após a aprovação.', en: 'Selection preview within 7 days of the last shooting day. Finals within 14 days of approval.' } as Bi },
  ],
  /**
   * O LIMITE SAIU DA FILA e virou uma linha à parte. Ele não é um termo como os
   * outros: os quatro de cima dizem o que acontece, e este diz o que não
   * acontece. Na mesma fila ele lia como mais um item de entrega, e ainda
   * empurrava a cena para fora da tela nas duas larguras.
   */
  scope: {
    k: { pt: 'Fora do escopo:', en: 'Out of scope:' } as Bi,
    v: {
      pt: 'redes sociais, vídeo, design e arquivos brutos. Vira outro projeto, com orçamento próprio.',
      en: 'social media, video, design and raw files. That becomes another project, quoted separately.',
    } as Bi,
  },
  close: {
    pt: ['A casa já tem a experiência.', 'Falta ela caber numa imagem.'],
    en: ['The house already has the experience.', 'It just needs to fit in one image.'],
  },
  contact: {
    mail: 'tavaristico@thebrfactory.com',
    site: 'thebrfactory.com',
    instagram: { label: '@thebrfactory', href: 'https://www.instagram.com/thebrfactory/' },
  },
  legal: '.TBF. inc · CNPJ 61.360.565/0001-74 · Rua Pamplona 145, Jardim Paulista, São Paulo, SP',
}

// =============================================================================
// FONTES dos números e das afirmações públicas desta peça. Ficam no código, e a
// tela mostra a atribuição curta ao lado de cada número. Se um deles for
// contestado numa conversa, a resposta está aqui e não na memória de ninguém.
//
//   24% mais reservas com fotografia profissional ... Booking.com, número citado
//       pela própria plataforma em material para parceiros.
//   ~60% das reservas pelo aplicativo ............... Punch Hospitality, 2026.
//   piso de 24 fotos de alta qualidade .............. Booking.com, orientação de
//       inventário de imagem para anúncios.
//   Pampulha, Patrimônio Mundial da UNESCO em 2016 .. whc.unesco.org/en/list/1493
//   Canais públicos do Hostel Castelo, agosto de 2026: Booking, Expedia, Agoda,
//       TripAdvisor, Google e Worldpackers. As notas por critério (limpeza,
//       equipe, localização) foram lidas na página do Booking na mesma data e
//       NÃO são reproduzidas como número na tela de propósito: nota de avaliação
//       muda sozinha, e uma peça que envelhece sozinha perde autoridade.
// =============================================================================
export const SOURCES = {
  unesco: 'https://whc.unesco.org/en/list/1493/',
  hospitality: '/creators/tavaristico/hospitality',
}
