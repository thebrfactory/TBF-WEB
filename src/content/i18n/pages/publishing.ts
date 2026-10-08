// =============================================================================
// Dicionário de PUBLISHING. Convenções: ../README.md
//
// Nova arquitetura (08/10/2026), a partir de TBF_Publishing_Nova_Arquitetura:
// de "braço editorial" para "memória cultural da Factory". Ordem: por que
// publicamos, tese editorial, o que publicamos (sete territórios), as labels,
// o padrão, o Zine, contribuir.
//
// FICOU DE FORA, DE PROPÓSITO: o bloco ARCHIVE como seção própria. O arquivo
// ainda não existe, então só aparece como território editorial. Também não
// entram o funil cultural nem a lista "o que não publicamos" (cabem depois).
// Magazine virou Zine em 08/10/2026: o texto usa Zine.
//
// Nomes de página e de produto ficam em inglês também na PT.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Publishing | The Cultural Memory of the Factory',
    description:
      '.THE BRAZILIAN FACTORY. Publishing: where the Factory observes culture, develops ideas and turns them into stories, images, conversations and cultural records.',
  },

  hero: {
    tag: 'Publishing',
    title: 'The cultural memory of the Factory.',
    deckPrefix: 'Publishing is where',
    deckSuffix: 'observes culture, develops ideas and turns them into stories, images, conversations and cultural records.',
  },

  why: {
    kicker: '01 / Why we publish',
    heading: 'We publish what deserves to exist.',
    p1: 'Culture is our raw material. Publishing is how we give it context, memory and circulation.',
    p2: 'We do not publish to fill a calendar. We publish to leave a record.',
  },

  thesis: {
    kicker: '02 / The editorial thesis',
    heading: 'Born in São Paulo. Built for everywhere.',
    p1: 'We look for signals before they become consensus. We investigate scenes before they become categories. We document people before they become references.',
    p2: 'Culture is not decoration. It is infrastructure.',
  },

  whatWePublish: {
    kicker: '03 / What we publish',
    heading: 'Seven territories, seven questions.',
    items: [
      { key: 'field', kicker: 'Field Research', title: 'What are we seeing?', body: 'Research, observation, behavior, scenes and territories.' },
      { key: 'critical', kicker: 'Critical Editorial', title: 'What does it mean?', body: 'Essays, criticism, analysis and manifestos.' },
      { key: 'people', kicker: 'People', title: 'Who is moving it forward?', body: 'Interviews, profiles, conversations and portraits.' },
      { key: 'visual', kicker: 'Visual Culture', title: 'What does it look like?', body: 'Photography, fashion film, visual essays and documentary.' },
      { key: 'journals', kicker: 'Label Journals', title: 'What is happening inside the Factory?', body: 'Content from .TBF., .TFD., .RUC. and .TGF.' },
      { key: 'collabs', kicker: 'Collaborations', title: 'What happens when worlds meet?', body: 'Editorial projects, co-productions and brand collaborations.' },
      { key: 'archive', kicker: 'Archive', title: 'What deserves to remain?', body: 'Documents, timelines, references and memory.' },
    ] as { key: string; kicker: string; title: string; body: string }[],
  },

  labels: {
    kicker: '04 / The labels',
    heading: 'One infrastructure, four voices.',
    deck: 'Each label has its own editorial voice. Publishing is the common infrastructure, not the voice that erases the differences.',
    items: [
      { key: 'tbf', kicker: '.TBF.', title: 'Cultural intelligence', body: 'Editorial, field research, ideas and the Factory thesis.' },
      { key: 'tfd', kicker: '.TFD.', title: 'Intimacy and presence', body: 'Intimacy, wellness, ritual, femininity and presence.' },
      { key: 'ruc', kicker: '.RUC.', title: 'Image and memory', body: 'Fashion, image, runway, film and cultural memory.' },
      { key: 'tgf', kicker: '.TGF.', title: 'Growth and business', body: 'Growth, business, Brazilian entrepreneurship and economic culture.' },
    ] as { key: string; kicker: string; title: string; body: string }[],
  },

  standard: {
    kicker: '05 / The standard',
    heading: 'Specific. Rigorous. Culturally grounded. Independent. Crafted.',
    items: [
      { key: 'specific', title: 'Specific', body: 'A real object, scene, person or hypothesis.' },
      { key: 'rigorous', title: 'Rigorous', body: 'Enough research, thought or observation to hold the claim.' },
      { key: 'grounded', title: 'Culturally grounded', body: 'It starts from context, not from empty aesthetics.' },
      { key: 'independent', title: 'Independent', body: 'No publication without an editorial choice.' },
      { key: 'crafted', title: 'Crafted', body: 'Text, image, edit and design held to a standard.' },
    ] as { key: string; title: string; body: string }[],
  },

  zine: {
    kicker: '06 / The Zine',
    heading: 'The Factory observes. Publishing remembers.',
    body: 'The Zine is the visible editorial product: the latest work, organized by editorial territory.',
    cta: 'Read the Zine',
  },

  contribute: {
    kicker: '07 / Contribute',
    heading: 'Have an idea? A body of work? A signal we should investigate?',
    p1: 'We are open to editorial pitches, photography and creative partnerships from independent writers, photographers, designers and thinkers. Read the Zine first to see the kind of work we publish.',
    items: [
      { key: 'pitch', kicker: 'Pitch', title: 'I have an editorial idea.' },
      { key: 'submit', kicker: 'Submit', title: 'I have a work, a photo series or an essay.' },
      { key: 'collaborate', kicker: 'Collaborate', title: 'I want to build a piece with .TBF.' },
      { key: 'propose', kicker: 'Propose', title: 'I know a person, scene or signal you should investigate.' },
    ] as { key: string; kicker: string; title: string }[],
    joinPrefix: 'Want to join the network?',
    joinCta: 'Go to Access',
    pitchLabel: 'Editorial pitches',
    pitchEmail: 'contact@thebrfactory.com',
    partnershipsLabel: 'Brand partnerships',
    partnershipsEmail: 'press@thebrfactory.com',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Publishing | The Cultural Memory of the Factory',
    description:
      'Publishing da .THE BRAZILIAN FACTORY.: onde a Factory observa a cultura, desenvolve ideias e as transforma em histórias, imagens, conversas e registros culturais.',
  },

  hero: {
    tag: 'Publishing',
    title: 'A memória cultural da Factory.',
    deckPrefix: 'Publishing é onde a',
    deckSuffix: 'observa a cultura, desenvolve ideias e as transforma em histórias, imagens, conversas e registros culturais.',
  },

  why: {
    kicker: '01 / Why we publish',
    heading: 'Publicamos o que merece existir.',
    p1: 'Cultura é a nossa matéria-prima. Publishing é como damos a ela contexto, memória e circulação.',
    p2: 'Não publicamos para preencher calendário. Publicamos para deixar registro.',
  },

  thesis: {
    kicker: '02 / The editorial thesis',
    heading: 'Born in São Paulo. Built for everywhere.',
    p1: 'Buscamos sinais antes de virarem consenso. Investigamos cenas antes de virarem categorias. Documentamos pessoas antes de virarem referências.',
    p2: 'Cultura não é decoração. É infraestrutura.',
  },

  whatWePublish: {
    kicker: '03 / What we publish',
    heading: 'Sete territórios, sete perguntas.',
    items: [
      { key: 'field', kicker: 'Field Research', title: 'O que estamos vendo?', body: 'Pesquisa, observação, comportamento, cenas e territórios.' },
      { key: 'critical', kicker: 'Critical Editorial', title: 'O que isso significa?', body: 'Ensaios, crítica, análise e manifestos.' },
      { key: 'people', kicker: 'People', title: 'Quem está fazendo isso avançar?', body: 'Entrevistas, perfis, conversas e retratos.' },
      { key: 'visual', kicker: 'Visual Culture', title: 'Como isso se parece?', body: 'Fotografia, fashion film, ensaios visuais e documentário.' },
      { key: 'journals', kicker: 'Label Journals', title: 'O que acontece dentro da Factory?', body: 'Conteúdo da .TBF., .TFD., .RUC. e .TGF.' },
      { key: 'collabs', kicker: 'Collaborations', title: 'O que acontece quando mundos se encontram?', body: 'Projetos editoriais, coproduções e colaborações de marca.' },
      { key: 'archive', kicker: 'Archive', title: 'O que merece permanecer?', body: 'Documentos, linhas do tempo, referências e memória.' },
    ],
  },

  labels: {
    kicker: '04 / The labels',
    heading: 'Uma infraestrutura, quatro vozes.',
    deck: 'Cada label tem a sua voz editorial. Publishing é a infraestrutura comum, não a voz que apaga as diferenças.',
    items: [
      { key: 'tbf', kicker: '.TBF.', title: 'Inteligência cultural', body: 'Editorial, pesquisa de campo, ideias e a tese da Factory.' },
      { key: 'tfd', kicker: '.TFD.', title: 'Intimidade e presença', body: 'Intimidade, bem-estar, ritual, feminilidade e presença.' },
      { key: 'ruc', kicker: '.RUC.', title: 'Imagem e memória', body: 'Moda, imagem, passarela, filme e memória cultural.' },
      { key: 'tgf', kicker: '.TGF.', title: 'Crescimento e negócios', body: 'Crescimento, negócios, empreendedorismo brasileiro e cultura econômica.' },
    ],
  },

  standard: {
    kicker: '05 / The standard',
    heading: 'Específico. Rigoroso. Ancorado na cultura. Independente. Bem feito.',
    items: [
      { key: 'specific', title: 'Específico', body: 'Um objeto, cena, pessoa ou hipótese real.' },
      { key: 'rigorous', title: 'Rigoroso', body: 'Pesquisa, pensamento ou observação suficientes para sustentar a afirmação.' },
      { key: 'grounded', title: 'Ancorado na cultura', body: 'Parte de contexto, não de estética vazia.' },
      { key: 'independent', title: 'Independente', body: 'Não existe publicação sem escolha editorial.' },
      { key: 'crafted', title: 'Bem feito', body: 'Texto, imagem, edição e design com padrão.' },
    ],
  },

  zine: {
    kicker: '06 / The Zine',
    heading: 'A Factory observa. Publishing lembra.',
    body: 'O Zine é o produto editorial visível: o trabalho mais recente, organizado por território editorial.',
    cta: 'Ler o Zine',
  },

  contribute: {
    kicker: '07 / Contribute',
    heading: 'Tem uma ideia? Um conjunto de trabalho? Um sinal que devemos investigar?',
    p1: 'Estamos abertos a pautas editoriais, fotografia e parcerias criativas de escritores, fotógrafos, designers e pensadores independentes. Leia o Zine antes, para ver o tipo de trabalho que publicamos.',
    items: [
      { key: 'pitch', kicker: 'Pitch', title: 'Tenho uma ideia editorial.' },
      { key: 'submit', kicker: 'Submit', title: 'Tenho uma obra, uma série de fotos ou um ensaio.' },
      { key: 'collaborate', kicker: 'Collaborate', title: 'Quero construir uma peça com a .TBF.' },
      { key: 'propose', kicker: 'Propose', title: 'Conheço uma pessoa, cena ou sinal que vocês deveriam investigar.' },
    ],
    joinPrefix: 'Quer entrar na rede?',
    joinCta: 'Ir para o Access',
    pitchLabel: 'Pautas editoriais',
    pitchEmail: 'contact@thebrfactory.com',
    partnershipsLabel: 'Parcerias de marca',
    partnershipsEmail: 'press@thebrfactory.com',
  },
}

export const publishing: Record<Lang, typeof en> = { en, pt }
