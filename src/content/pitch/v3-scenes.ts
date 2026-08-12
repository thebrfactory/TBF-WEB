// =============================================================================
// PITCH 3.0 — CONTEÚDO DAS 7 CENAS
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
  { id: 'cena-01', pt: 'Capa', en: 'Cover' },
  { id: 'cena-02', pt: 'Campo de Referência', en: 'Reference Field' },
  { id: 'cena-03', pt: 'A Pergunta, o Contexto e a Tese', en: 'The Question, the Context, the Thesis' },
  { id: 'cena-04', pt: 'Da Cultura ao Negócio', en: 'From Culture to Business' },
  { id: 'cena-05', pt: 'Case Selecionado', en: 'Selected Case' },
  { id: 'cena-06', pt: 'Por Que a Overlens', en: 'Why Overlens' },
  { id: 'cena-07', pt: 'Fecho', en: 'Close' },
] as const

// =============================================================================
// CENA 01 — CAPA · 15 a 20 s
// A capa do V2/V3 era DUAS telas (o hero da home + a Abertura). Como o deck
// agora tem sete telas contadas, as duas viraram uma: o vídeo editorial dá a
// presença, o letreiro do fundador dá a frase, e `Culture™` volta para a capa,
// que é onde o direcionamento pede que ela esteja.
// =============================================================================
export const COVER = {
  eyebrow: 'FELIPE T. · CONFIDENTIAL DOC · .TBF. inc',
  /** Headline em inglês nos dois idiomas: veio assim do fundador, não se traduz. */
  headlineEn: ['SP BASED.', 'BUILT ACROSS THE COUNTRY.', 'DESIGNED FOR WORLDWIDE REACH.'],
  culture: 'Culture™',
  craft: 'Crafted in São Paulo, Brazil. Consumed Worldwide.',
  body: {
    pt: 'Um cultural venture studio para ideias brasileiras com alcance global.',
    en: 'A cultural venture studio for Brazilian ideas with global reach.',
  } as Bi,
}

// =============================================================================
// CENA 02 — CAMPO DE REFERÊNCIA · 25 a 30 s
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
  people: [
    { name: 'ANDY WARHOL', src: '/images/pitch/references/warhol.webp', role: { pt: 'Transformou consumo em arte', en: 'Turned consumption into art' } },
    { name: 'VIRGIL ABLOH', src: '/images/pitch/references/abloh.webp', role: { pt: 'Traduziu a rua para a alta-costura', en: 'Translated the street into luxury' } },
    { name: 'OSWALD DE ANDRADE', src: '/images/pitch/references/oswald.webp', role: { pt: 'Devorou a influência estrangeira e a devolveu brasileira', en: 'Devoured foreign influence and gave it back Brazilian' } },
    { name: 'WILL.I.AM', src: '/images/pitch/references/william.webp', role: { pt: 'Levou a cultura pop para dentro da tecnologia', en: 'Carried pop culture into technology' } },
    { name: 'OSKAR METSAVAHT', src: '/images/pitch/references/metsavaht.webp', role: { pt: 'Fez do Brasil uma linguagem de design', en: 'Made Brazil a design language' } },
  ],
  close: {
    pt: 'Campos diferentes. A mesma capacidade: perceber cultura antes que ela vire mercado.',
    en: 'Different fields. The same ability: to read culture before it becomes market.',
  } as Bi,
}

// =============================================================================
// CENA 03 — A PERGUNTA, O CONTEXTO E A TESE · 45 a 55 s
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
// CENA 04 — DA CULTURA AO NEGÓCIO · 60 a 70 s
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
  assert: { pt: 'Não é uma agência com vocabulário maior.', en: 'Not an agency with a bigger vocabulary.' } as Bi,
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
      href: '/editorial',
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
  /** Evidência de ofício, do antigo mov-09. Mantida em uma linha só. */
  craftStat: { value: '6+', label: { pt: 'anos em direção criativa', en: 'years in creative direction' } as Bi },
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
// CENA 05 — CASE SELECIONADO · 45 a 55 s
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
  headline: 'VERÃOZÃO',
  client: 'Ô de Casa Hostel',
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
  // Cada mídia cumpre UMA função no arco atmosfera, pessoas, experiência,
  // circulação (o direcionamento proíbe galeria decorativa). `role` é o que a
  // imagem prova, e é isso que a fala do deck usa para escolher onde parar.
  media: [
    { src: '/images/pitch/veraozao/01-atmosfera.webp', role: { pt: 'Atmosfera', en: 'Atmosphere' } as Bi, alt: { pt: 'O teto do hostel vestido de fitas, lâmpadas e globo de espelhos.', en: 'The hostel ceiling dressed in ribbons, bulbs and a mirror ball.' } as Bi },
    { src: '/images/pitch/veraozao/02-estandarte.webp', role: { pt: 'Marca no espaço', en: 'Brand in the space' } as Bi, alt: { pt: 'O estandarte do Ô de Casa montado no espaço físico.', en: 'The Ô de Casa banner installed in the venue.' } as Bi },
    { src: '/images/pitch/veraozao/03-equipe.webp', role: { pt: 'Pessoas', en: 'People' } as Bi, alt: { pt: 'Integrante da equipe do hostel na parede laranja.', en: 'A hostel team member against the orange wall.' } as Bi },
    { src: '/images/pitch/veraozao/04-publico.webp', role: { pt: 'Público', en: 'Audience' } as Bi, alt: { pt: 'O público sentado em cadeiras de praia dentro do hostel.', en: 'Guests seated in beach chairs inside the hostel.' } as Bi },
    { src: '/images/pitch/veraozao/05-oasis.webp', role: { pt: 'Experiência', en: 'Experience' } as Bi, alt: { pt: 'A praia montada dentro do hostel na ativação ÔÀSIS.', en: 'The beach built inside the hostel for the ÔÀSIS activation.' } as Bi },
    { src: '/images/pitch/veraozao/06-sax.webp', role: { pt: 'Programação', en: 'Programming' } as Bi, alt: { pt: 'Saxofonista ao vivo sobre a mesa de DJ.', en: 'A live saxophone player over the DJ deck.' } as Bi },
    { src: '/images/pitch/veraozao/07-globo-camera.webp', role: { pt: 'Circulação', en: 'Circulation' } as Bi, alt: { pt: 'Câmera da TV Globo gravando dentro do Ô de Casa.', en: 'A TV Globo camera recording inside Ô de Casa.' } as Bi },
    { src: '/images/pitch/veraozao/08-globo-entrevista.webp', role: { pt: 'Circulação', en: 'Circulation' } as Bi, alt: { pt: 'Entrevista da TV Globo gravada no hostel durante a campanha.', en: 'A TV Globo interview recorded at the hostel during the campaign.' } as Bi },
    { src: '/images/pitch/veraozao/09-sp1-no-ar.webp', role: { pt: 'No ar', en: 'On air' } as Bi, alt: { pt: 'A matéria no ar no SP1, da TV Globo.', en: 'The segment on air on SP1, TV Globo.' } as Bi },
  ],
  /** Prova de circulação. É fato datado e conferível, não número de vaidade. */
  press: {
    label: { pt: 'Circulação conquistada', en: 'Earned circulation' } as Bi,
    body: {
      pt: 'A campanha virou pauta de televisão aberta: o Ô de Casa entrou no SP1 e no SPTV, da TV Globo, em matéria sobre o comércio no mês do carnaval, em janeiro de 2026.',
      en: 'The campaign became broadcast news: Ô de Casa appeared on SP1 and SPTV, TV Globo, in a story about carnival-month commerce, in January 2026.',
    } as Bi,
    credit: 'Imagens de tela: SP1 / SPTV, TV Globo, janeiro de 2026.',
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
// CENA 06 — POR QUE A OVERLENS · 55 a 65 s
// Dois territórios que convergem. Nenhum dos dois é "cliente" do outro: a cena
// resolve no centro, onde está o objetivo comum, e é o objetivo que recebe o
// maior peso visual.
// =============================================================================
export const PARTNERSHIP = {
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
        { pt: 'Repertório que vira desejo, linguagem e presença cultural.', en: 'Repertoire that becomes desire, language and cultural presence.' },
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

// =============================================================================
// CENA 07 — FECHO · 20 a 25 s
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
  eyebrow: { pt: 'Uma conversa de trabalho com a Overlens', en: 'A working conversation with Overlens' } as Bi,
  site: 'thebrfactory.com',
  email: 'tavaristico@thebrfactory.com',
  links: [
    { label: 'Manifesto', href: '/manifesto', external: false },
    { label: 'Labels', href: '/labels', external: false },
    { label: '@thebrfactory', href: 'https://www.instagram.com/thebrfactory/', external: true },
  ],
  legal: '.TBF. inc · CNPJ 61.360.565/0001-74 · Rua Pamplona 145, Jardim Paulista, São Paulo, SP, 01405-900',
}
