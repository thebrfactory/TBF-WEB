// =============================================================================
// PITCH 3.0: CONTEÚDO DAS 7 CENAS
// -----------------------------------------------------------------------------
// FONTE ÚNICA DO TEXTO, DOS DADOS E DOS PATHS DE MÍDIA do deck 3.0.
// Direcionamento do fundador: `~/Desktop/CHANGES/TBF_PITCH_3.0_DIRECIONAMENTO_CLAUDE_CODE.md`
// (instrução 9: "Manter conteúdo separável de layout"). O `PitchV3Client.tsx`
// só compõe; revisar texto, trocar mídia ou corrigir um número acontece AQUI,
// sem tocar em layout.
//
// O QUE MUDOU DE 13 MOVIMENTOS PARA 7 CENAS
//
//   cena-01  ← mov-01 Capa + mov-02 Abertura
//   cena-02  ← mov-03 Campo de Referência
//   cena-03  ← mov-04 A Pergunta + mov-05 O Contexto + mov-06 Nossa Tese
//   cena-04  ← mov-07 Sistema Operacional + mov-08 Portfólio + mov-09 Evidência
//              (+ mov-10 Visão de Longo Prazo, ver nota abaixo)
//   cena-05  ← mov-11 Case Selecionado
//   cena-06  ← mov-12 Por Que a Overlens
//   cena-07  ← mov-13 Fecho
//
// 🔴 NOTA SOBRE O mov-10 (VISÃO DE LONGO PRAZO). As 7 telas do direcionamento
// não previram lugar para ele. Não joguei fora: em 2026-07-31 o fundador MOVEU
// esse movimento para antes do case, de propósito, para "declarar a ambição
// antes de mostrar a prova". Ele virou a última batida da cena-04 (`vision`),
// em UMA linha com os quatro estágios, em vez de uma cadeia visual própria que
// competiria com a cadeia do método na mesma tela. Se o fundador quiser que
// volte a ser tela inteira, o deck passa a ter 8 cenas: é decisão dele.
//
// REGRA DE VOZ (CLAUDE.md regra 6 / skill `/brand-lint`): NENHUM travessão nem
// en-dash em texto de marca. O direcionamento usa travessão em alguns trechos;
// as frases foram transportadas sem ele, com dois-pontos ou vírgula. Pontuação
// da marca preservada exatamente: `.TBF.`, `.THE BRAZILIAN FACTORY.`, `Culture™`,
// `.THE FIORE DAILY.`, `.RUNWAY UNTD COLLECTIVE.`, `.THE GROWTH FACTORY.`
// =============================================================================

export interface Bi {
  pt: string
  en: string
}

// ─── Cenas: fonte única da navegação ────────────────────────────────────────
// A mecânica do deck (contador, setas, IntersectionObserver) é toda derivada
// deste array. Cada `id` precisa existir como `<section id>` no cliente.
export const SCENES = [
  // A CAPA DE ANTES VOLTOU, como PAGINA 00 (pedido do fundador 2026-08-12). Ela
  // e o hero da home com o letreiro em movimento, e nao entra na contagem das 7
  // cenas do argumento: por isso o numero dela e `00` e o total continua `07`.
  { id: 'cena-00', pt: 'Capa', en: 'Cover', n: '00' },
  { id: 'cena-01', pt: 'Abertura', en: 'Opening', n: '01' },
  { id: 'cena-02', pt: 'Campo de Referência', en: 'Reference Field', n: '02' },
  // O NOME PERDEU O CONTEXTO junto com o bloco (#03, #01 CHANGES 2026-08-14):
  // o passador não pode anunciar uma parte que a cena não mostra mais.
  { id: 'cena-03', pt: 'A Pergunta e a Tese', en: 'The Question and the Thesis', n: '03' },
  { id: 'cena-04', pt: 'Da Cultura ao Negócio', en: 'From Culture to Business', n: '04' },
  { id: 'cena-05', pt: 'Case Selecionado', en: 'Selected Case', n: '05' },
  // Nome NEUTRO. Esta lista serve ao passador (o número + o anúncio de leitor de
  // tela), e o passador é o mesmo nas duas rotas: a aberta e a endereçada. Quem
  // diz o nome do destinatário é o kicker da cena, que vem do `PartnerScene`.
  { id: 'cena-06', pt: 'A Parceria', en: 'The Partnership', n: '06' },
  { id: 'cena-07', pt: 'Fecho', en: 'Close', n: '07' },
] as const

// =============================================================================
// CENA 01: CAPA · 15 a 20 s
// A capa do V2/V3 era DUAS telas (o hero da home + a Abertura). Como o deck
// agora tem sete telas contadas, as duas viraram uma: o vídeo editorial dá a
// presença, o letreiro do fundador dá a frase, e `Culture™` volta para a capa,
// que é onde o direcionamento pede que ela esteja.
// =============================================================================
export const COVER = {
  // O EYEBROW SAIU DA CENA (#01, #01 CHANGES 2026-08-14). Ele dizia
  // "FELIPE T. · CONFIDENTIAL DOC · .TBF. inc" e o que ele fazia de útil era
  // avisar que aquilo é documento de trabalho, não material público. Esse aviso
  // não sumiu: virou o SELO, logo abaixo. Uma linha de texto miúdo pede leitura;
  // um carimbo é lido sem ser lido, que é o comportamento certo para um aviso.
  /**
   * O carimbo de confidencial, atrás do título. Origem: a referência que o
   * fundador mandou (`CHANGES/image-10.png`, carimbo vermelho sobre branco).
   * O branco virou transparência e o traço foi tingido de PAPER: vermelho puro
   * seria uma quinta cor num deck que só tem preto, papel e o acento, e o
   * carimbo passaria a gritar mais que a headline. A rotação já vem desenhada
   * na arte, então o CSS não gira nada; ele só posiciona e baixa a opacidade.
   */
  stamp: '/images/pitch/marks/confidential.webp',
  /** Headline em inglês nos dois idiomas: veio assim do fundador, não se traduz. */
  headlineEn: ['SP BASED.', 'BUILT ACROSS THE COUNTRY.', 'DESIGNED FOR WORLDWIDE REACH.'],
  culture: 'Culture™',
  craft: 'Crafted in São Paulo, Brazil. Consumed Worldwide.',
  // UMA LINHA SÓ, EM INGLÊS (#01, #01 CHANGES 2026-08-14). Era a frase bilíngue
  // "Um cultural venture studio para ideias brasileiras com alcance global." e
  // virou a definição seca. Não é `Bi` porque não há português para dobrar: como
  // a headline, veio do fundador já em inglês e é assim nas duas rotas.
  body: 'A Brazilian Cultural Venture Studio',
}

// =============================================================================
// CENA 02: CAMPO DE REFERÊNCIA · 25 a 30 s
// Os cinco retratos e os papéis são os mesmos do V3 (não se reescreve o que já
// foi aprovado em voz). O que mudou é o enquadramento: a frase de fecho do V3
// dizia que essas pessoas "capturaram o espírito do momento", e essa ideia subiu
// para o TÍTULO. O fecho agora carrega o argumento, não o resumo.
// =============================================================================
export const REFERENCE = {
  headline: {
    pt: ['Capturar o espírito de um tempo.', 'Transformá-lo em linguagem.'],
    en: ['Capture the spirit of a time.', 'Turn it into language.'],
  },
  // DOIS, NÃO CINCO (pedido do fundador #04, #01 CHANGES 2026-08-14: "deixe
  // apenas o ícone do andy warhol e do oswald de andrade, cada um em uma
  // extremidade da página unidos por uma linha de pontos").
  //
  // A fila de cinco círculos iguais no meio da tela tratava os cinco como uma
  // lista, e lista não é argumento. Com dois, e um em cada beirada, a cena passa
  // a AFIRMAR alguma coisa: de um lado quem transformou consumo em arte, do
  // outro quem devorou a influência estrangeira e a devolveu brasileira, e a
  // linha pontilhada entre eles é a ponte que a .TBF. diz atravessar. A mesma
  // linha de pontos que corre embaixo de HOME no menu, no hover.
  //
  // Os outros três saíram da cena, não da história. Ficam aqui inteiros, para
  // repor é copiar de volta para o array:
  //   { name: 'VIRGIL ABLOH', src: '/images/pitch/references/abloh.webp', role: { pt: 'Traduziu a rua para a alta-costura', en: 'Translated the street into luxury' } },
  //   { name: 'WILL.I.AM', src: '/images/pitch/references/william.webp', role: { pt: 'Levou a cultura pop para dentro da tecnologia', en: 'Carried pop culture into technology' } },
  //   { name: 'OSKAR METSAVAHT', src: '/images/pitch/references/metsavaht.webp', role: { pt: 'Fez do Brasil uma linguagem de design', en: 'Made Brazil a design language' } },
  // Os arquivos .webp dos três continuam em public/images/pitch/references/.
  people: [
    { name: 'ANDY WARHOL', src: '/images/pitch/references/warhol.webp', role: { pt: 'Transformou consumo em arte', en: 'Turned consumption into art' } },
    { name: 'OSWALD DE ANDRADE', src: '/images/pitch/references/oswald.webp', role: { pt: 'Devorou a influência estrangeira e a devolveu brasileira', en: 'Devoured foreign influence and gave it back Brazilian' } },
  ],
  close: {
    pt: 'Campos diferentes. A mesma capacidade: perceber cultura antes que ela vire mercado.',
    en: 'Different fields. The same ability: to read culture before it becomes market.',
  } as Bi,
}

// =============================================================================
// CENA 03: A PERGUNTA, O CONTEXTO E A TESE · 45 a 55 s
// UMA composição em TRÊS TEMPOS, não três telas coladas (instrução 5 do
// direcionamento). A pergunta abre a tensão, o contexto mostra onde o valor
// vaza, a tese resolve. Os três tempos são revelados em sequência dentro da
// mesma cena.
// =============================================================================
export const ARGUMENT = {
  question: {
    /** A pergunta grande. A segunda linha recebe o acento de cor. */
    headline: { pt: ['Como se cria', 'valor cultural?'], en: ['How is', 'cultural value created?'] },
    items: [
      { pt: 'Como produtos comuns viram símbolos de status?', en: 'How do ordinary products become status symbols?' },
      { pt: 'Como uma ideia local ganha desejo, comunidade e permanência?', en: 'How does a local idea earn desire, community and permanence?' },
    ] as Bi[],
  },
  // 🔴 O CONTEXTO SAIU DA TELA (#03, #01 CHANGES 2026-08-14). O fundador colou
  // as TRÊS falas do bloco (as duas linhas de contexto e a assertiva) e escreveu
  // "-> remove". O dado continua aqui inteiro, e é uma linha no cliente para
  // devolver: a cena 03 passa a ter dois tempos, a pergunta e a tese, e é isso
  // que ela mostra hoje. Se ele quiser qualquer uma das três de volta, o texto
  // está abaixo, do jeito que estava.
  //
  // O contexto NÃO é "falta de infraestrutura" (o direcionamento proíbe essa
  // formulação genérica). O ponto é autoria e captura de valor: o repertório já
  // existe, o que escapa é a propriedade.
  context: {
    lines: [
      { pt: 'O Brasil já produz repertório, talento e audiência.', en: 'Brazil already produces repertoire, talent and audience.' },
      {
        pt: 'Mas o valor que nasce da nossa cultura costuma ser organizado, distribuído e apropriado por outros.',
        en: 'But the value born of our culture tends to be organised, distributed and captured by others.',
      },
    ] as Bi[],
    /** Frase do V3 que sobreviveu inteira porque é a melhor da cena. */
    assert: { pt: 'Atenção é a consequência, não o objetivo.', en: 'Attention is the consequence, not the objective.' } as Bi,
  },
  thesis: {
    kicker: { pt: 'Nossa Tese', en: 'Our Thesis' } as Bi,
    lines: [
      { pt: 'O Brasil não precisa apenas exportar cultura.', en: 'Brazil does not only need to export culture.' },
      { pt: 'Precisa transformar cultura em propriedade.', en: 'It needs to turn culture into property.' },
    ] as Bi[],
    /** Cadeia do V3, intacta. `\n` é quebra de linha dentro do nó. */
    chain: [
      { pt: 'Capital\nCultural', en: 'Cultural\nCapital' },
      { pt: 'Capital\nNarrativo', en: 'Narrative\nCapital' },
      { pt: 'Propriedade\nIntelectual', en: 'Intellectual\nProperty' },
      { pt: 'Mídia +\nNegócio', en: 'Media +\nBusiness' },
    ] as Bi[],
  },
}

// =============================================================================
// CENA 04: DA CULTURA AO NEGÓCIO · 60 a 70 s
// A tela mais longa do deck, e a única com dois níveis de leitura: a linha de
// raciocínio (o método) e o portfólio (as propriedades).
//
// SEM VOCABULÁRIO DE STARTUP, por exigência do direcionamento. Foi por isso que
// o antigo mov-07 saiu inteiro: ele se chamava "O Sistema Operacional" e listava
// "Inteligência Produtizada", "Venture Studio de IP", "Ferramentas Internas como
// Ativos de Mercado" e "Modelo de Spin-off". O argumento é o mesmo; a linguagem
// virou verbo em português: OBSERVAR, DAR FORMA, COLOCAR EM MOVIMENTO, FAZER
// PERMANECER.
// =============================================================================
export const BUSINESS = {
  headline: {
    pt: ['Lemos movimentos culturais.', 'Transformamos em linguagem.'],
    en: ['We read cultural movements.', 'We turn them into language.'],
  },
  lead: {
    pt: 'E construímos propriedades que ganham forma, audiência, produto e continuidade.',
    en: 'And we build properties that gain form, audience, product and continuity.',
  } as Bi,
  /** A linha de raciocínio. Quatro tempos, um verbo cada. */
  method: [
    {
      title: { pt: 'Observar', en: 'Observe' },
      desc: { pt: 'Coolhunting, comportamento, território, comunidades e sinais emergentes.', en: 'Coolhunting, behaviour, territory, communities and emerging signals.' },
    },
    {
      title: { pt: 'Dar forma', en: 'Give form' },
      desc: { pt: 'Conceito, narrativa, identidade, formato, linguagem e direção criativa.', en: 'Concept, narrative, identity, format, language and creative direction.' },
    },
    {
      title: { pt: 'Colocar em movimento', en: 'Set in motion' },
      desc: { pt: 'Conteúdo, experiências, parcerias, produto, distribuição e audiência.', en: 'Content, experiences, partnerships, product, distribution and audience.' },
    },
    {
      title: { pt: 'Fazer permanecer', en: 'Make it last' },
      desc: { pt: 'Marca, propriedade intelectual, recorrência, comunidade e novos desdobramentos.', en: 'Brand, intellectual property, recurrence, community and new offshoots.' },
    },
  ],
  /** Não é vertical nenhuma: virou subtítulo do bloco de portfólio (2026, decisão do fundador). */
  portfolioSubtitle: 'DUDE… WHERE’S MY CULTURE?',
  // Cada propriedade diz TRÊS coisas, como o direcionamento exige: o que é
  // (`role`), por que existe no organismo (`why`) e como ganha forma no mundo
  // (`forms`). `proof` só aparece onde existe número REAL e verificado.
  portfolio: [
    {
      name: '.THE BRAZILIAN FACTORY.',
      href: '/zine',
      role: { pt: 'Holding, camada de pesquisa e de venture', en: 'Holding, research and venture layer' },
      why: { pt: 'Cria a leitura cultural e define o ponto de vista da casa.', en: 'Creates the cultural reading and sets the house point of view.' },
      forms: { pt: 'Editorial, manifesto, curadoria, projetos autorais e narrativas de marca.', en: 'Editorial, manifesto, curation, authored projects and brand narratives.' },
      proof: null,
    },
    {
      name: '.RUNWAY UNTD COLLECTIVE.',
      href: '/labels/runwayunited',
      role: { pt: 'Primeiro label, laboratório de moda, cultura e comunidade', en: 'First label, a laboratory for fashion, culture and community' },
      why: { pt: 'Transforma estética em cena e em circulação.', en: 'Turns aesthetics into scene and circulation.' },
      forms: { pt: 'Fashion films, editoriais, SPFW, ativações e colaborações.', en: 'Fashion films, editorials, SPFW, activations and collaborations.' },
      proof: null,
    },
    {
      name: '.THE FIORE DAILY.',
      href: '/labels/thefioredaily',
      role: { pt: 'Marca de mídia de lifestyle e sexualidade', en: 'Lifestyle and sexuality media brand' },
      why: { pt: 'Testa linguagem e comunidade numa pauta cotidiana, com voz autoral própria.', en: 'Tests language and community on a daily beat, with its own authored voice.' },
      forms: { pt: 'Conteúdo, experiências, produtos, colaborações e comunidade.', en: 'Content, experiences, products, collaborations and community.' },
      // 🔴 ÚNICO NÚMERO DE PLATAFORMA DO DECK, e é medido, não estimado.
      // Fonte: painel do Instagram de @thefioredaily, resumo mensal de julho de
      // 2026, capturado pelo fundador (`~/Desktop/CHANGES/DADOS MELFIORE`).
      // O recorte de 77% de não seguidores é o número que importa aqui: mostra
      // alcance conquistado fora da própria base, que é exatamente a tese da casa.
      proof: {
        source: { pt: 'Instagram de .THE FIORE DAILY., resumo de julho de 2026', en: '.THE FIORE DAILY. Instagram, July 2026 summary' } as Bi,
        stats: [
          { value: '192 mil', label: { pt: 'visualizações no mês', en: 'views in the month' } as Bi },
          { value: '77%', label: { pt: 'de quem viu não seguia a marca', en: 'of viewers were not followers' } as Bi },
          { value: '15 mil', label: { pt: 'seguidores', en: 'followers' } as Bi },
        ],
      },
    },
    {
      name: '.THE GROWTH FACTORY.',
      href: '/labels/factoryofgrowth',
      role: { pt: 'Soluções de crescimento para negócios brasileiros construindo fora', en: 'Growth solutions for Brazilian businesses building abroad' },
      why: { pt: 'Conecta estratégia a resultado sem perder a linguagem.', en: 'Connects strategy to result without losing the language.' },
      forms: { pt: 'Estratégia, posicionamento, conteúdo, campanhas, crescimento e mensuração.', en: 'Strategy, positioning, content, campaigns, growth and measurement.' },
      proof: null,
    },
  ],
  craftFields: {
    pt: 'Moda, hospitalidade e lifestyle: universos de marca, público internacional dentro do Brasil e relações longas de cliente.',
    en: 'Fashion, hospitality and lifestyle: brand worlds, an international audience inside Brazil and long client relationships.',
  } as Bi,
  // O mov-10 resgatado. Uma linha, quatro estágios, sem cadeia visual própria.
  vision: {
    lead: { pt: 'E o caminho tem direção declarada:', en: 'And the path has a declared direction:' } as Bi,
    stages: {
      pt: 'estúdio criativo, empresa de mídia, venture studio de IP, instituição cultural.',
      en: 'creative studio, media company, IP venture studio, cultural institution.',
    } as Bi,
    northStar: {
      pt: 'Norte: instituições como a 032c, estudadas como modelo de relevância cultural, nunca copiadas como identidade.',
      en: 'North star: institutions such as 032c, studied as a model of cultural relevance, never copied as an identity.',
    } as Bi,
  },
}

// =============================================================================
// CENA 05: CASE SELECIONADO · 45 a 55 s
// A prova comercial da tese. Texto mínimo, mídia protagonista.
//
// 🔴 POR QUE NÃO HÁ MÉTRICA DE CAMPANHA AQUI. O direcionamento manda usar
// "somente as verificadas" e proíbe placeholder fictício na versão final. Eu fui
// à pasta do case no SSD (`TAV05 → TBF .Ô De Casa → 00. VERÃOZÃO 26`) e a única
// pasta de resultado é `05. RESULTADO/métricas-janeiro`. Abri as 34 capturas: o
// que está lá é a janela de 23/ago a 20/nov, a campanha ÔBlack de Black Friday
// (fim de novembro) e o resumo de dezembro, mais um painel de 12/dez a 10/jan.
// O VERÃOZÃO começa em 1º de janeiro e as peças da pasta são de janeiro e
// fevereiro. Ou seja: NENHUM daqueles números mede o período da campanha.
// Apresentar "502 mil" ou "177,2 mil" como resultado do VERÃOZÃO seria falso.
// Enquanto a métrica de janeiro/fevereiro não existir, `metrics` fica vazio e a
// prova é visual e de circulação (a matéria da Globo), como o próprio
// direcionamento autoriza. Basta preencher `metrics` para a tela passar a
// mostrar o bloco de números.
// =============================================================================
export const CASE = {
  // A IDENTIDADE OFICIAL, NÃO O NOME DIGITADO (pedido do fundador 2026-08-14:
  // "no lugar de VERÃOZÃO, use a identidade visual oficial da campanha").
  // O título era a palavra VERÃOZÃO na Brother do site, o que é uma tradução da
  // campanha para a tipografia da casa. A campanha TEM letra própria, desenhada
  // para ela, e é ela que roda no Instagram do cliente: usar outra no deck é
  // apresentar o trabalho com a voz errada.
  //
  // Origem: 00. IDENTIDADE/VERÃOZÃO.ai, exportado em PNG 1080x1440. O fundo azul
  // do arquivo foi removido por chave de cor e a peça recortada no traço, para
  // ela assentar em qualquer fundo do deck. Fica `headline` como texto ainda,
  // porque é ele que vira o `alt` da imagem e o rótulo de leitor de tela.
  headline: 'VERÃOZÃO',
  wordmark: '/images/pitch/veraozao/veraozao-wordmark.webp',
  // O CLIENTE TAMBÉM ENTRA PELA IDENTIDADE, NÃO PELO NOME DIGITADO (#05, #01
  // CHANGES 2026-08-14: "Ô de Casa Hostel -> preciso da identidade visual da
  // empresa no lugar disso escrito"). Mesmo argumento do wordmark da campanha,
  // aplicado a quem assina o trabalho: o hostel tem marca desenhada, e escrever
  // o nome dele na tipografia da .TBF. é apresentar o cliente com a voz errada.
  //
  // Origem: `Ô From House/01. Branding/PNGS_ID_O/logo_negativo.png` (a versão
  // negativa do manual da marca deles). O arquivo vinha branco sobre PRETO
  // CHAPADO, sem canal alfa: o preto virou transparência e o traço foi tingido
  // de PAPER, para a marca assentar em qualquer fundo do deck. `client` fica
  // como texto porque é ele que vira o `alt` e o rótulo de leitor de tela.
  client: 'Ô de Casa Hostel',
  clientLogo: '/images/pitch/odecasa/odecasa-logo.webp',
  deck: {
    pt: ['Quando uma temporada deixa de ser campanha', 'e vira uma cena.'],
    en: ['When a season stops being a campaign', 'and becomes a scene.'],
  },
  body: {
    pt: 'Para o Ô de Casa, a .TBF. transformou o verão em território vivo de marca. Não foi só conteúdo: foi atmosfera, programação, comunidade e desejo, com uma experiência que as pessoas quiseram viver e compartilhar.',
    en: 'For Ô de Casa, .TBF. turned summer into a living brand territory. It was not only content: it was atmosphere, programming, community and desire, with an experience people wanted to live and share.',
  } as Bi,
  blocks: [
    {
      label: { pt: 'Desafio', en: 'Challenge' } as Bi,
      body: {
        pt: 'Fazer uma campanha de verão de hostel importar para um público majoritariamente internacional.',
        en: 'Make a summer hostel campaign matter to an audience that was mostly international.',
      } as Bi,
    },
    {
      label: { pt: 'Insight', en: 'Insight' } as Bi,
      body: {
        pt: 'Não venda uma cama. Venda a experiência cultural brasileira que as pessoas vieram encontrar.',
        en: 'Do not sell a bed. Sell the Brazilian cultural experience people came to find.',
      } as Bi,
    },
  ],
  execution: [
    { pt: 'Direção criativa', en: 'Creative direction' },
    { pt: 'Sistema de conteúdo', en: 'Content system' },
    { pt: 'Social media', en: 'Social media' },
    { pt: 'Ativação de comunidade', en: 'Community activation' },
  ] as Bi[],
  /** Filme de lançamento da campanha. Vertical, porque nasceu vertical. */
  video: {
    src: '/videos/veraozao-launch.mp4',
    srcAv1: '/videos/veraozao-launch.av1.mp4',
    poster: '/images/pitch/veraozao/veraozao-launch-poster.webp',
    alt: { pt: 'Filme de lançamento da campanha VERÃOZÃO.', en: 'Launch film for the VERÃOZÃO campaign.' } as Bi,
  },
  // AS PEÇAS DA CAMPANHA, NÃO FOTOS DA CAMPANHA (pedido do fundador
  // 2026-08-14: "troque as fotos por stories-ôàsis-fevereiro"). A diferença é o
  // argumento inteiro desta cena: antes eram nove FOTOS do evento, que provam
  // que a festa aconteceu. Estas são as PEÇAS que a .TBF. publicou, com a
  // identidade da campanha impressa em cada uma. Elas provam outra coisa, que é
  // a que o deck precisa: que existiu um sistema visual rodando todo dia, em
  // fevereiro inteiro, no formato em que a audiência consome.
  //
  // Fonte: TAV05 → TBF .Ô De Casa → 00. VERÃOZÃO 26 → 01. PEÇAS →
  // stories-ôàsis-fevereiro. Nativas em 1080x1920, reduzidas a 720x1280 (o teto
  // de exibição no deck é ~300px, então 720 cobre retina com folga).
  //
  // A ordem é de ARCO, não cronológica: abre no visual-chave, atravessa
  // atmosfera, rua, marca, gente, público, experiência, programação e
  // comunidade, e fecha em duas pessoas rindo. É a curva que a fala do deck
  // acompanha.
  media: [
    { src: '/images/pitch/veraozao/story-01-chave.webp', role: { pt: 'Visual-chave', en: 'Key visual' } as Bi, alt: { pt: 'Peça de abertura da campanha VERÃOZÃO, com o estandarte e a identidade do ÔÀSIS.', en: 'Opening piece of the VERÃOZÃO campaign, with the banner and the ÔÀSIS identity.' } as Bi },
    { src: '/images/pitch/veraozao/story-02-atmosfera.webp', role: { pt: 'Atmosfera', en: 'Atmosphere' } as Bi, alt: { pt: 'Story da campanha com a estrela de espelhos e o público embaixo.', en: 'Campaign story with the mirror star and the crowd beneath it.' } as Bi },
    { src: '/images/pitch/veraozao/story-03-rua.webp', role: { pt: 'A rua', en: 'The street' } as Bi, alt: { pt: 'Story com o estandarte do Ô de Casa levantado na rua, em dia de sol.', en: 'Story with the Ô de Casa banner raised in the street on a sunny day.' } as Bi },
    { src: '/images/pitch/veraozao/story-04-marca.webp', role: { pt: 'Marca no corpo', en: 'Brand on the body' } as Bi, alt: { pt: 'Story com duas hóspedes diante do mural da marca.', en: 'Story with two guests in front of the brand mural.' } as Bi },
    { src: '/images/pitch/veraozao/story-05-pessoas.webp', role: { pt: 'Pessoas', en: 'People' } as Bi, alt: { pt: 'Story com hóspede maquiada com a identidade da campanha.', en: 'Story with a guest wearing the campaign identity as make-up.' } as Bi },
    { src: '/images/pitch/veraozao/story-06-publico.webp', role: { pt: 'Público', en: 'Audience' } as Bi, alt: { pt: 'Story do público de braços erguidos na ativação de rua.', en: 'Story of the crowd with raised arms at the street activation.' } as Bi },
    { src: '/images/pitch/veraozao/story-07-experiencia.webp', role: { pt: 'Experiência', en: 'Experience' } as Bi, alt: { pt: 'Story da festa de espuma dentro do hostel.', en: 'Story of the foam party inside the hostel.' } as Bi },
    { src: '/images/pitch/veraozao/story-08-programacao.webp', role: { pt: 'Programação', en: 'Programming' } as Bi, alt: { pt: 'Story do DJ na cabine, sob luz azul.', en: 'Story of the DJ in the booth under blue light.' } as Bi },
    { src: '/images/pitch/veraozao/story-09-comunidade.webp', role: { pt: 'Comunidade', en: 'Community' } as Bi, alt: { pt: 'Story com um grupo de hóspedes posando junto na rua.', en: 'Story with a group of guests posing together in the street.' } as Bi },
    { src: '/images/pitch/veraozao/story-10-retrato.webp', role: { pt: 'Retrato', en: 'Portrait' } as Bi, alt: { pt: 'Story com retrato de hóspede de óculos vermelhos.', en: 'Story with a portrait of a guest in red sunglasses.' } as Bi },
    { src: '/images/pitch/veraozao/story-11-noite.webp', role: { pt: 'A noite', en: 'The night' } as Bi, alt: { pt: 'Story da fachada à noite com o estandarte iluminado.', en: 'Story of the façade at night with the banner lit.' } as Bi },
    { src: '/images/pitch/veraozao/story-12-fecho.webp', role: { pt: 'O que fica', en: 'What remains' } as Bi, alt: { pt: 'Story de fecho, com duas pessoas rindo dentro do hostel.', en: 'Closing story, two people laughing inside the hostel.' } as Bi },
  ],
  /** Prova de circulação. É fato datado e conferível, não número de vaidade. */
  press: {
    label: { pt: 'Circulação conquistada', en: 'Earned circulation' } as Bi,
    body: {
      pt: 'A campanha virou pauta de televisão aberta: o Ô de Casa entrou no SP1 e no SPTV, da TV Globo, em matéria sobre o comércio no mês do carnaval, em janeiro de 2026.',
      en: 'The campaign became broadcast news: Ô de Casa appeared on SP1 and SPTV, TV Globo, in a story about carnival-month commerce, in January 2026.',
    } as Bi,
    // O CRÉDITO SEGUE O QUE ESTÁ NA TELA. Ele dizia "imagens de tela: SP1 /
    // SPTV, TV Globo" porque a faixa mostrava três capturas do telejornal. Com
    // as peças da campanha no lugar das fotos (2026-08-14), creditar a Globo
    // seria creditar imagem que não está mais ali. O fato da TV aberta continua
    // vivo e verdadeiro logo acima, em `body`, que é onde ele vale como prova.
    credit: 'Peças da campanha VERÃOZÃO, fevereiro de 2026. .TBF. para Ô de Casa Hostel.',
  },
  /**
   * Números do case. VAZIO de propósito enquanto não houver medição do período
   * da campanha. Ver a nota vermelha no topo desta seção antes de preencher.
   * Máximo de três, cada um com contexto, nenhum sem fonte.
   */
  metrics: [] as { value: string; label: Bi; source: string }[],
  close: {
    pt: 'O trabalho traduziu hospitalidade em um convite culturalmente legível: verão brasileiro, feito para ser sentido, não explicado.',
    en: 'The work translated hospitality into a culturally legible invitation: Brazilian summer, designed to be felt, not explained.',
  } as Bi,
}

// =============================================================================
// CENA 06: A CENA DO PARCEIRO · 55 a 65 s
// Dois territórios que convergem. Nenhum dos dois é "cliente" do outro: a cena
// resolve no centro, onde está o objetivo comum, e é o objetivo que recebe o
// maior peso visual.
//
// DUAS VERSÕES DA MESMA CENA, e essa é a arquitetura que este bloco resolve
// (pedido do fundador #02, #01 CHANGES 2026-08-14):
//
//   PARTNERSHIP_OPEN ...... vive em /pitch/v3. Genérica, endereçada a NINGUÉM em
//                           particular: "por que a .TBF. está à procura de novos
//                           parceiros estratégicos?". É o deck que se manda para
//                           qualquer mesa.
//   PARTNERSHIP_OVERLENS .. vive em /pitch/v3/overlens. A proposta para UMA
//                           empresa específica, com o nome dela na tela.
//
// Ele foi explícito sobre o porquê: a cena com nome de empresa "é muito bom",
// mas ela não pode morar no deck público, proposta endereçada a alguém não é
// deck de apresentação, é carta. A regra que fica: toda nova proposta para
// empresa específica nasce como uma rota-filha de /pitch/v3, com o slug da
// empresa, reusando este mesmo formato. NÃO editar a cena aberta para encaixar
// um cliente novo.
//
// As duas têm a MESMA forma (dois lados, um objetivo, hipóteses), de propósito:
// é uma cena com dois conteúdos, não duas cenas. Por isso o tipo abaixo.
// =============================================================================

export interface PartnerScene {
  /** Rótulo numerado da cena. Muda com o destinatário. */
  kicker: Bi
  question: { pt: string[]; en: string[] }
  sides: {
    who: string
    color: 'paper' | 'accent'
    lines: Bi[]
  }[]
  goal: { kicker: string; lines: Bi[] }
  hypotheses: Bi
  /** Assinatura do fecho (cena 07). Também muda com o destinatário. */
  closeEyebrow: Bi
}

export const PARTNERSHIP_OVERLENS: PartnerScene = {
  kicker: { pt: 'Por Que a Overlens', en: 'Why Overlens' },
  closeEyebrow: { pt: 'Uma conversa de trabalho com a Overlens', en: 'A working conversation with Overlens' },
  question: {
    pt: ['Como uma empresa de educação pode crescer', 'entendendo o cenário cultural brasileiro?'],
    en: ['How can an education company grow', 'by understanding Brazilian culture?'],
  },
  sides: [
    {
      who: 'OVERLENS',
      color: 'paper' as const,
      lines: [
        { pt: 'Estrutura empresarial já consolidada.', en: 'An established company structure.' },
        { pt: 'Execução em alto padrão.', en: 'High-quality execution.' },
        { pt: 'Capacidade de operar, educar e escalar com consistência.', en: 'The ability to operate, educate and scale with consistency.' },
      ] as Bi[],
    },
    {
      who: '.TBF.',
      color: 'accent' as const,
      lines: [
        { pt: 'Coolhunting e leitura de tendências culturais.', en: 'Coolhunting and cultural trend reading.' },
        { pt: 'Desenvolvimento de propriedade intelectual.', en: 'Intellectual property development.' },
        { pt: 'Direção criativa e projetos de impacto.', en: 'Creative direction and projects with impact.' },
        // A QUARTA LINHA SAIU DAS DUAS VERSÕES DA CENA (#06, #01 CHANGES
        // 2026-08-14). Ela dizia "Repertório que vira desejo, linguagem e
        // presença cultural." e era a única do lado da .TBF. que não nomeava uma
        // capacidade: as outras três dizem o que a casa FAZ, essa dizia o que o
        // trabalho VIRA, que é promessa e já está dita na tese da cena 03. Com
        // ela fora, os dois lados da mesa ficam com três linhas cada, que é a
        // simetria que a cena sempre quis.
      ] as Bi[],
    },
  ],
  goal: {
    kicker: 'THE GOAL',
    lines: [
      { pt: 'Transformar educação em cultura.', en: 'Turn education into culture.' },
      { pt: 'E cultura em crescimento.', en: 'And culture into growth.' },
    ] as Bi[],
  },
  /** Hipóteses, não projeto fechado. É o que abre a conversa depois do deck. */
  hypotheses: {
    pt: 'Novos formatos de conteúdo, comunidade, experiências, colaborações e propriedades educacionais com relevância cultural.',
    en: 'New content formats, community, experiences, collaborations and educational properties with cultural relevance.',
  } as Bi,
}

// A CENA ABERTA. Mesma forma, destinatário nenhum.
//
// A pergunta é a que ele escreveu: "Por que a .TBF. está a procura de novos
// parceiros estratégicos?". O lado esquerdo deixa de ser uma empresa e passa a
// ser o PERFIL de quem a .TBF. procura, que é o que uma proposta aberta pode
// dizer sem mentir. O lado direito é o mesmo: o que a .TBF. traz não muda com
// quem está do outro lado da mesa.
//
// O objetivo também mudou, e tinha de mudar: "transformar educação em cultura"
// só faz sentido conversando com uma empresa de educação. Aqui ele volta a ser o
// que a casa faz com qualquer parceiro, transformar cultura em propriedade, que
// é a tese da cena 03 e fecha o circuito do deck.
export const PARTNERSHIP_OPEN: PartnerScene = {
  kicker: { pt: 'Novos Parceiros', en: 'New Partners' },
  closeEyebrow: { pt: 'Uma conversa de trabalho', en: 'A working conversation' },
  question: {
    pt: ['Por que a .TBF. está à procura', 'de novos parceiros estratégicos?'],
    en: ['Why is .TBF. looking for', 'new strategic partners?'],
  },
  sides: [
    {
      who: 'QUEM PROCURAMOS',
      color: 'paper',
      lines: [
        { pt: 'Estrutura empresarial já consolidada.', en: 'An established company structure.' },
        { pt: 'Execução em alto padrão.', en: 'High-quality execution.' },
        { pt: 'Capacidade de operar e escalar com consistência.', en: 'The ability to operate and scale with consistency.' },
        // TRÊS LINHAS, não quatro. A quarta ("um mercado onde cultura ainda não
        // virou linguagem") estourava a cena 05 em 31px no iPhone 13, medido, e
        // num deck com overflow: hidden isso come conteúdo sem avisar. O lado
        // esquerdo nasceu com três por causa dessa conta; quem tem quatro é o
        // lado da .TBF., e é assim nas duas versões da cena.
      ],
    },
    {
      who: '.TBF.',
      color: 'accent',
      lines: [
        { pt: 'Coolhunting e leitura de tendências culturais.', en: 'Coolhunting and cultural trend reading.' },
        { pt: 'Desenvolvimento de propriedade intelectual.', en: 'Intellectual property development.' },
        { pt: 'Direção criativa e projetos de impacto.', en: 'Creative direction and projects with impact.' },
        // Mesma retirada da versão endereçada (#06): ver a nota em
        // PARTNERSHIP_OVERLENS. As duas cenas continuam com a mesma forma.
      ],
    },
  ],
  goal: {
    kicker: 'THE GOAL',
    lines: [
      { pt: 'Transformar o que a sua empresa faz em cultura.', en: 'Turn what your company does into culture.' },
      { pt: 'E cultura em propriedade.', en: 'And culture into property.' },
    ],
  },
  hypotheses: {
    pt: 'Novos formatos de conteúdo, comunidade, experiências, colaborações e propriedades com relevância cultural, desenhados a partir do que a parceria já sabe fazer.',
    en: 'New content formats, community, experiences, collaborations and properties with cultural relevance, designed from what the partnership already knows how to do.',
  },
}

// =============================================================================
// CENA 07: FECHO · 20 a 25 s
// Fim definitivo. Sem CTA de venda, sem oitava tela, sem "obrigado".
//
// A frase do fecho MUDOU em relação ao V3, e a troca é deliberada. O V3 fechava
// com "O Brasil sempre exportou commodities. Nós exportamos valor cultural." A
// frase abaixo é a do direcionamento, e ela fecha o circuito com a tese da
// cena-03 (cultura em propriedade) usando as mesmas duas palavras. A frase
// antiga fica aqui registrada, caso o fundador prefira voltar a ela:
//   pt: 'O Brasil sempre exportou commodities. Nós exportamos valor cultural.'
//   en: 'Brazil has always exported commodities. We export cultural value.'
// =============================================================================
export const CLOSE = {
  quote: {
    pt: ['O Brasil já exporta cultura.', 'Agora precisa exportar propriedade.'],
    en: ['Brazil already exports culture.', 'Now it needs to export property.'],
  },
  culture: 'Culture™',
  // A ASSINATURA DO FECHO SAIU DAQUI (#02, 2026-08-14). Ela dizia "uma conversa
  // de trabalho com a Overlens", quem é o destinatário é decisão da CENA 06,
  // não do fecho, senão o deck aberto fecharia com o nome de uma empresa
  // específica. Agora vem de `PartnerScene.closeEyebrow`.
  site: 'thebrfactory.com',
  email: 'tavaristico@thebrfactory.com',
  links: [
    { label: 'Manifesto', href: '/manifesto', external: false },
    { label: 'Labels', href: '/labels', external: false },
    { label: '@thebrfactory', href: 'https://www.instagram.com/thebrfactory/', external: true },
  ],
  legal: '.TBF. inc · CNPJ 61.360.565/0001-74 · Rua Pamplona 145, Jardim Paulista, São Paulo, SP, 01405-900',
}
