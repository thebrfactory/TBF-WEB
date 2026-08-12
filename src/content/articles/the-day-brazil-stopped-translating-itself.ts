// =============================================================================
// CONTEÚDO DO PILOTO — "THE DAY BRAZIL STOPPED TRANSLATING ITSELF" /
// "O DIA EM QUE O BRASIL PAROU DE SE TRADUZIR"
// ORD-01 · fonte EN: `1. TBF.COM/article/#01/debut.md`, mapa: `05_PILOTO-CENAS.md`
// ORD-03 · fonte PT: `1. TBF.COM/article/#01/debut-pt.md` (tradução já aprovada em
// voz pelo orquestrador — TRANSPORTADA aqui linha a linha, nunca traduzida por
// este executor). Cada campo de texto virou `{ en, pt }`. A estrutura de cenas é
// EXATAMENTE a mesma nos dois idiomas: mesma quantidade de blocos, mesma ordem,
// mesmo tipo (regra dura da ORD-03).
//
// Nota de transporte (ver ORD-03-report.md / ESC-03.md para detalhe): o bloco
// `raw` ("Raw land." / "Raw bodies." / "Raw stories.") usa um dispositivo visual
// que assume um PREFIXO FIXO repetido — isso não existe em português, onde o
// adjetivo ("crua"/"crus"/"cruas") muda de forma e vem DEPOIS do substantivo
// ("Terra crua.", "Corpos crus.", "Histórias cruas."). Mantive `kind: 'raw'`
// (mesmo tipo de bloco nos dois idiomas, como a regra exige) e movi a frase PT
// inteira para `items`, deixando `fixed` vazio em PT — nenhuma palavra foi
// inventada, só reposicionada dentro da mesma estrutura de dados. Escalado em
// ESC-03.md para o fundador confirmar se quer um tratamento visual dedicado.
// =============================================================================

import type { ScrollyTheme } from '@/components/scrolly'

export interface Bilingual {
  en: string
  pt: string
}

export type Lang = 'en' | 'pt'

export type ManifestoBlock =
  | { kind: 'lines'; lines: Bilingual[]; emphasize?: number[] }
  | { kind: 'divider'; theme?: ScrollyTheme }
  | { kind: 'word'; label: Bilingual; theme?: ScrollyTheme }
  | { kind: 'pinned'; text: Bilingual; kicker?: Bilingual }
  | { kind: 'fullbleed'; text: Bilingual; theme?: ScrollyTheme; scale?: 'display' | 'word' | 'wordmark' }
  | { kind: 'mirror'; before: Bilingual[]; after: Bilingual[] }
  | { kind: 'raw'; fixed: Bilingual; items: Bilingual[] }
  | { kind: 'negation'; pairs: [Bilingual, Bilingual][] }
  | { kind: 'stickers'; fragments: Bilingual[] }
  | { kind: 'stat'; value: number; formatted: Bilingual; label: Bilingual; prefix?: Bilingual }
  | { kind: 'closing'; text: Bilingual }
  // O motor já tinha o componente de imagem (MediaParallax) desde a ORD-01; ele
  // só estava dormente porque o piloto nasceu sem foto. Este bloco é o que
  // acorda. `credit` é campo separado de `caption` de propósito: as imagens são
  // de licença livre COM ATRIBUIÇÃO OBRIGATÓRIA (CC BY / CC BY-SA), então o
  // crédito não pode depender de alguém lembrar de escrevê-lo dentro da legenda.
  // Procedência completa em `public/images/editorial/gurgel/_CREDITOS.md`.
  //
  // `variant` escolhe entre foto que sangra (`bleed`, padrão) e prancha de museu
  // (`plate`) — ver o cabeçalho de MediaParallax.tsx para o porquê. Em `plate`,
  // `width`/`height` são a proporção NATIVA do arquivo e não são opcionais: é
  // ela que define a altura da peça, já que nada é recortado.
  | {
      kind: 'image'
      src: string
      alt: Bilingual
      caption?: Bilingual
      credit: string
      variant?: 'bleed'
    }
  | {
      kind: 'image'
      src: string
      alt: Bilingual
      caption?: Bilingual
      credit: string
      variant: 'plate'
      width: number
      height: number
    }

export interface ManifestoArticle {
  slug: string
  loaderTitle: Bilingual
  heroTitle: Bilingual
  heroSubtitle: Bilingual
  category: string
  publishedAt: string
  deck: Bilingual
  /**
   * Capa. Serve a DOIS lugares ao mesmo tempo, de propósito: o fundo do hero da
   * matéria e a miniatura dela no /editorial e na home. Um campo só, para a capa
   * do card nunca divergir da capa que a pessoa vê ao abrir.
   */
  cover: { src: string; alt: Bilingual; credit: string }
  blocks: ManifestoBlock[]
}

export const theDayBrazilStoppedTranslatingItself: ManifestoArticle = {
  slug: 'the-day-brazil-stopped-translating-itself',
  // Loader usa só a 1ª metade do título (05_PILOTO-CENAS.md §6) — o resto entra
  // no hero. O corte em PT é mecânico (mesma substring do título já aprovado em
  // debut-pt.md, na mesma posição semântica do corte EN: antes do trecho que
  // fala do ato de "se traduzir"), não é uma escolha de tradução.
  loaderTitle: { en: 'THE DAY BRAZIL STOPPED', pt: 'O DIA EM QUE O BRASIL PAROU' },
  heroTitle: {
    en: 'THE DAY BRAZIL STOPPED TRANSLATING ITSELF.',
    pt: 'O DIA EM QUE O BRASIL PAROU DE SE TRADUZIR.',
  },
  heroSubtitle: {
    en: 'Or: what if the Gurgel Renegado had always been parked next to the Jeep Renegade?',
    pt: 'Ou: e se o Gurgel Renegado sempre tivesse estado estacionado ao lado do Jeep Renegade?',
  },
  category: 'Manifesto',
  publishedAt: '2026-08-01',
  deck: {
    en: "The first industry Brazil industrialised wasn't steel. It was confidence.",
    pt: 'A primeira indústria que o Brasil industrializou não foi o aço. Foi a confiança.',
  },
  // NOTA DE FATO, e ela importa para quem editar este artigo: não existe um
  // modelo "Gurgel Renegado" na história real da montadora. A matéria é
  // especulativa e o próprio subtítulo assume o "e se". O SUV compacto real da
  // Gurgel, o par lógico do Jeep Renegade, é o CARAJÁS (1986) — é ele nas
  // fotos. Nenhuma legenda chama o carro de Renegado, para a imagem não
  // desmentir a ficção nem fingir que ela é registro histórico.
  cover: {
    src: '/images/editorial/gurgel/01-capa.webp',
    alt: {
      en: 'A Gurgel Carajás, the Brazilian compact SUV, photographed in São Paulo state.',
      pt: 'Um Gurgel Carajás, o SUV compacto brasileiro, fotografado no interior de São Paulo.',
    },
    credit: 'Marcelo Bezerra Cavalcanti / Wikimedia Commons · CC BY 3.0',
  },
  blocks: [
    // ─── Abertura ─────────────────────────────────────────────────────────
    {
      kind: 'lines',
      lines: [
        { en: 'There is no official date for when a country stops being a colony.', pt: 'Não existe data oficial para quando um país deixa de ser colônia.' },
        { en: 'Some say it happens after independence.', pt: 'Uns dizem que acontece depois da independência.' },
        { en: 'Others believe it happens when the economy grows.', pt: 'Outros acham que acontece quando a economia cresce.' },
        { en: 'Some insist it happens after winning wars.', pt: 'Alguns insistem que acontece depois de vencer guerras.' },
        { en: "They're all wrong.", pt: 'Todos estão errados.' },
      ],
    },
    // TIER 1 #1 — a tese
    {
      kind: 'pinned',
      kicker: undefined,
      text: {
        en: 'A country only stops being a colony when it no longer asks permission to imagine itself.',
        pt: 'Um país só deixa de ser colônia quando para de pedir licença para se imaginar.',
      },
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Brazil crossed that threshold quietly.', pt: 'O Brasil cruzou essa linha em silêncio.' },
        { en: 'Not with a revolution.', pt: 'Não com uma revolução.' },
        { en: 'Not with a speech.', pt: 'Não com um discurso.' },
        { en: 'Not with a flag.', pt: 'Não com uma bandeira.' },
      ],
    },
    // TIER 2 — fecho da abertura
    { kind: 'lines', lines: [{ en: 'It started in a dealership.', pt: 'Começou numa concessionária.' }], emphasize: [0] },
    {
      kind: 'image',
      src: '/images/editorial/gurgel/08-concessionaria.webp',
      alt: { en: 'A car dealership showroom.', pt: 'O salão de uma concessionária de automóveis.' },
      caption: { en: 'Where the story begins: the showroom floor, the most ordinary room in the country.', pt: 'Onde a história começa: o salão da concessionária, a sala mais comum do país.' },
      credit: 'Domínio público / Wikimedia Commons',
    },

    { kind: 'divider' },

    // ─── 2015. Gurgel Renegado x Jeep Renegade ───────────────────────────
    {
      kind: 'lines',
      lines: [
        { en: 'Two compact SUVs.', pt: 'Dois SUVs compactos.' },
        { en: 'One American.', pt: 'Um americano.' },
        { en: 'One Brazilian.', pt: 'Um brasileiro.' },
        { en: 'On the left, the Jeep Renegade.', pt: 'À esquerda, o Jeep Renegade.' },
        { en: 'On the right, the Gurgel Renegado.', pt: 'À direita, o Gurgel Renegado.' },
        { en: 'Nobody takes pictures.', pt: 'Ninguém tira foto.' },
        { en: 'Nobody says "look, a Brazilian car."', pt: 'Ninguém diz "olha, um carro brasileiro".' },
        { en: 'Nobody writes patriotic posts on social media.', pt: 'Ninguém escreve post patriótico nas redes.' },
        { en: 'Because there is nothing unusual about it.', pt: 'Porque não há nada de estranho nisso.' },
        { en: 'Your father owned a Gurgel.', pt: 'Seu pai teve um Gurgel.' },
        { en: 'Your grandfather worked at one of its suppliers.', pt: 'Seu avô trabalhou num dos fornecedores.' },
        { en: "Your cousin designs suspensions for the company's African division.", pt: 'Seu primo desenha suspensão para a divisão africana da empresa.' },
        { en: 'Your neighbor develops embedded software in Campinas.', pt: 'Seu vizinho desenvolve software embarcado em Campinas.' },
        { en: 'Choosing a Gurgel feels no more political than choosing Adidas over Nike.', pt: 'Escolher um Gurgel não é mais político do que escolher Adidas em vez de Nike.' },
        { en: "That's how cultures become invisible.", pt: 'É assim que culturas ficam invisíveis.' },
        { en: "Not when they're imposed.", pt: 'Não quando são impostas.' },
      ],
    },
    // TIER 2 — definição de cultura invisível
    { kind: 'lines', lines: [{ en: 'When they become normal.', pt: 'Quando viram normal.' }], emphasize: [0] },
    {
      kind: 'image',
      src: '/images/editorial/gurgel/03-jeep-renegade.webp',
      alt: { en: 'A 2015 Jeep Renegade, front three-quarter view.', pt: 'Um Jeep Renegade 2015, em três quartos frontal.' },
      caption: { en: 'On the left of the aisle, the American.', pt: 'À esquerda do corredor, o americano.' },
      credit: 'Mr.choppers / Wikimedia Commons · CC BY-SA 3.0',
    },
    // O carro da ficção agora é um DESENHO, não uma foto de outro modelo com
    // legenda desmentindo. Kleber Silva desenhou em 2020 uma releitura moderna do
    // Gurgel BR-800 — um Gurgel compacto contemporâneo que nunca foi produzido.
    // É o objeto exato de que esta matéria precisa: o leitor vê o carro do "e se"
    // sem que nada finja ser registro histórico. A legenda diz que é render.
    // (O Carajás real, o compacto que a Gurgel de fato fez, continua na matéria:
    // é ele na capa.)
    {
      kind: 'image',
      src: '/images/editorial/gurgel/10-renegado-frente.webp',
      alt: {
        en: 'A design rendering of a modern Gurgel compact SUV, front three-quarter view, in yellow.',
        pt: 'Render de um SUV compacto Gurgel moderno, em três quartos frontal, amarelo.',
      },
      caption: {
        en: 'On the right, the Brazilian. It was never built: this is the modern Gurgel the designer Kleber Silva drew in 2020, a rereading of the BR-800.',
        pt: 'À direita, o brasileiro. Ele nunca foi feito: este é o Gurgel moderno que o designer Kleber Silva desenhou em 2020, uma releitura do BR-800.',
      },
      credit: 'Render: Kleber Silva',
    },
    {
      kind: 'image',
      src: '/images/editorial/gurgel/11-renegado-traseira.webp',
      alt: {
        en: 'The same rendering of a modern Gurgel compact SUV, seen from the rear three-quarter.',
        pt: 'O mesmo render do SUV compacto Gurgel moderno, visto em três quartos traseiro.',
      },
      caption: {
        en: 'The wordmark on the tailgate is the only part of this car that ever existed.',
        pt: 'A assinatura na tampa é a única parte deste carro que existiu de verdade.',
      },
      credit: 'Render: Kleber Silva',
    },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        { en: 'History rarely changes because someone invents something.', pt: 'A história raramente muda porque alguém inventou alguma coisa.' },
        { en: 'History changes because millions stop noticing it.', pt: 'A história muda porque milhões param de reparar.' },
        { en: "The Gurgel Renegado wasn't revolutionary because it existed.", pt: 'O Gurgel Renegado não foi revolucionário porque existiu.' },
        { en: 'It was revolutionary because nobody needed to explain why it existed.', pt: 'Foi revolucionário porque ninguém precisou explicar por que ele existia.' },
        { en: 'That subtle difference reshaped an entire country.', pt: 'Essa diferença sutil redesenhou um país inteiro.' },
      ],
    },

    { kind: 'divider' },

    // ─── TIER 3 — o que o mundo queria x o que o Brasil passou a exportar ─
    { kind: 'lines', lines: [{ en: 'For decades, Brazil was told what it should export.', pt: 'Por décadas, disseram ao Brasil o que ele deveria exportar.' }] },
    {
      kind: 'lines',
      lines: [{ en: 'The world wanted Brazil to remain an endless supplier of raw materials.', pt: 'O mundo queria que o Brasil continuasse fornecedor infinito de matéria-prima.' }],
    },
    // TIER 3 — "Raw" fixo, o resto trocando (máquina de escrever, sem cursor).
    // Ver nota de transporte no topo do arquivo: em PT o adjetivo muda de forma
    // e de posição, então não há prefixo fixo — `fixed.pt` fica vazio e a frase
    // completa (já traduzida, sem invenção) vai inteira em `items.pt`.
    {
      kind: 'raw',
      fixed: { en: 'Raw', pt: '' },
      items: [
        { en: 'land.', pt: 'Terra crua.' },
        { en: 'bodies.', pt: 'Corpos crus.' },
        { en: 'stories.', pt: 'Histórias cruas.' },
      ],
    },
    { kind: 'lines', lines: [{ en: 'But somewhere along the way, Brazil learned to export something else.', pt: 'Mas em algum ponto do caminho o Brasil aprendeu a exportar outra coisa.' }] },
    {
      kind: 'image',
      src: '/images/editorial/gurgel/09-industria.webp',
      alt: { en: 'Brazilian industrial plant, archive photograph.', pt: 'Planta industrial brasileira, foto de arquivo.' },
      caption: { en: 'The industry the country was told to build.', pt: 'A indústria que mandaram o país construir.' },
      credit: 'Wikimedia Commons · CC BY-SA 2.0',
    },
    // TIER 3 — as duas listas espelhadas
    {
      kind: 'mirror',
      before: [
        { en: 'Coffee.', pt: 'Café.' },
        { en: 'Sugar.', pt: 'Açúcar.' },
        { en: 'Rubber.', pt: 'Borracha.' },
        { en: 'Ore.', pt: 'Minério.' },
        { en: 'Soy.', pt: 'Soja.' },
        { en: 'Talent.', pt: 'Talento.' },
        { en: 'Footballers.', pt: 'Jogadores.' },
        { en: 'Models.', pt: 'Modelos.' },
        { en: 'Musicians.', pt: 'Músicos.' },
      ],
      after: [
        { en: 'Systems.', pt: 'Sistemas.' },
        { en: 'Languages.', pt: 'Linguagens.' },
        { en: 'Myths.', pt: 'Mitos.' },
        { en: 'Infrastructure.', pt: 'Infraestrutura.' },
        { en: 'Imagination.', pt: 'Imaginação.' },
      ],
    },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        { en: 'People often ask what transformed the Brazilian economy.', pt: 'Costumam perguntar o que transformou a economia brasileira.' },
        { en: "They're asking the wrong question.", pt: 'É a pergunta errada.' },
        { en: 'The economy was never the beginning.', pt: 'A economia nunca foi o começo.' },
        { en: 'It was the consequence.', pt: 'Foi a consequência.' },
        { en: "The first industry Brazil industrialised wasn't steel.", pt: 'A primeira indústria que o Brasil industrializou não foi o aço.' },
      ],
    },
    // TIER 1 #2 — o pivô, o momento mais silencioso da página
    { kind: 'fullbleed', text: { en: 'It was confidence.', pt: 'Foi a confiança.' }, theme: 'dark', scale: 'display' },
    {
      kind: 'image',
      src: '/images/editorial/gurgel/06-estrada-goias.webp',
      alt: { en: 'A dirt road cutting through the Brazilian countryside.', pt: 'Uma estrada de terra cortando o interior do Brasil.' },
      caption: { en: 'The suspension was engineered for this ground, and the ground turned out to be everywhere.', pt: 'A suspensão foi projetada para este chão, e este chão acabou existindo no mundo inteiro.' },
      credit: 'Wikimedia Commons · CC BY-SA 4.0',
    },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        {
          en: 'By the early 2000s, Brazilian companies were no longer trying to become "the Brazilian version" of foreign brands.',
          pt: 'No início dos anos 2000, as empresas brasileiras já não tentavam ser "a versão brasileira" de marcas estrangeiras.',
        },
        { en: 'That expression disappeared.', pt: 'Essa expressão desapareceu.' },
      ],
    },
    // TIER 3 — pares de negação
    {
      kind: 'negation',
      pairs: [
        [
          { en: 'There was no Brazilian Apple.', pt: 'Não existia Apple brasileira.' },
          { en: 'Only Arara Technologies.', pt: 'Só Arara Technologies.' },
        ],
        [
          { en: 'No Brazilian Disney.', pt: 'Não existia Disney brasileira.' },
          { en: 'Only Amazônia Studios.', pt: 'Só Amazônia Studios.' },
        ],
        [
          { en: 'No Brazilian Studio 54.', pt: 'Não existia Studio 54 brasileiro.' },
          { en: 'Only Brazilian Hi-Fi.', pt: 'Só Brazilian Hi-Fi.' },
        ],
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Nobody introduced these institutions by comparing them to somewhere else.', pt: 'Ninguém apresentava essas instituições comparando com outro lugar.' },
        { en: 'Comparison had become obsolete.', pt: 'A comparação tinha ficado obsoleta.' },
      ],
    },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        { en: "Brazilian Hi-Fi wasn't a nightclub.", pt: 'Brazilian Hi-Fi não era uma casa noturna.' },
        { en: 'It was where the country rehearsed its next version of itself.', pt: 'Era onde o país ensaiava sua próxima versão.' },
        { en: 'Designers met engineers.', pt: 'Designers encontravam engenheiros.' },
        { en: 'Filmmakers met physicists.', pt: 'Cineastas encontravam físicos.' },
        { en: 'Fashion editors argued with anthropologists until sunrise.', pt: 'Editoras de moda discutiam com antropólogos até o sol nascer.' },
        { en: 'Musicians tested unfinished albums in front of semiconductor founders.', pt: 'Músicos testavam álbuns inacabados na frente de fundadores de semicondutores.' },
        { en: "Ideas weren't pitched.", pt: 'Ideias não eram pitchadas.' },
        { en: 'They circulated.', pt: 'Circulavam.' },
        { en: 'Every country has places where culture accelerates.', pt: 'Todo país tem lugares onde a cultura acelera.' },
        { en: 'New York had Studio 54.', pt: 'Nova York teve o Studio 54.' },
        { en: 'Manchester had the Haçienda.', pt: 'Manchester teve o Haçienda.' },
        { en: 'São Paulo had Brazilian Hi-Fi.', pt: 'São Paulo teve o Brazilian Hi-Fi.' },
        { en: 'The difference?', pt: 'A diferença?' },
        { en: "Brazilian Hi-Fi didn't launch trends.", pt: 'O Brazilian Hi-Fi não lançava tendências.' },
      ],
    },
    // TIER 2 — o que diferencia Brazilian Hi-Fi de Studio 54
    { kind: 'lines', lines: [{ en: 'It metabolised them.', pt: 'Ele as metabolizava.' }], emphasize: [0] },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        { en: 'Around the same time, another institution quietly emerged.', pt: 'Na mesma época, outra instituição surgiu discretamente.' },
        { en: 'Nobody could explain exactly what it was.', pt: 'Ninguém sabia explicar exatamente o que era.' },
        { en: 'Agency?', pt: 'Agência?' },
        { en: 'Not really.', pt: 'Não exatamente.' },
        { en: 'Production company?', pt: 'Produtora?' },
        { en: 'Sometimes.', pt: 'Às vezes.' },
        { en: 'Holding?', pt: 'Holding?' },
        { en: 'Too small.', pt: 'Pequena demais.' },
        { en: 'Creative studio?', pt: 'Estúdio criativo?' },
        { en: 'Not even close.', pt: 'Nem perto.' },
        { en: 'People simply called it:', pt: 'As pessoas simplesmente chamavam de:' },
      ],
    },
    // TIER 1 #3 — a casa se nomeia
    { kind: 'fullbleed', text: { en: '.THE BRAZILIAN FACTORY.', pt: '.THE BRAZILIAN FACTORY.' }, theme: 'dark', scale: 'wordmark' },
    {
      kind: 'lines',
      lines: [
        { en: 'Trying to define it always felt slightly embarrassing.', pt: 'Tentar definir sempre soava meio constrangedor.' },
        { en: 'Like trying to define the internet as a website.', pt: 'Como tentar definir a internet como um site.' },
        { en: 'Technically possible.', pt: 'Tecnicamente possível.' },
        { en: 'Conceptually useless.', pt: 'Conceitualmente inútil.' },
        { en: "The Brazilian Factory didn't produce campaigns.", pt: 'A Brazilian Factory não produzia campanhas.' },
        { en: "It didn't produce films.", pt: 'Não produzia filmes.' },
        { en: "It didn't produce brands.", pt: 'Não produzia marcas.' },
        { en: 'Those were side effects.', pt: 'Isso eram efeitos colaterais.' },
      ],
    },
    // TIER 2 — o que a casa vende, dito sem vender
    { kind: 'lines', lines: [{ en: 'Its real product was institutional imagination.', pt: 'Seu produto real era imaginação institucional.' }], emphasize: [0] },
    {
      kind: 'lines',
      lines: [
        { en: 'It transformed cultural signals into companies.', pt: 'Ela transformava sinais culturais em empresas.' },
        { en: 'Companies into movements.', pt: 'Empresas em movimentos.' },
        { en: 'Movements into myths.', pt: 'Movimentos em mitos.' },
        { en: 'If Brazilian Hi-Fi was where ideas collided...', pt: 'Se o Brazilian Hi-Fi era onde as ideias colidiam...' },
        { en: 'The Brazilian Factory was where they acquired permanent form.', pt: 'A Brazilian Factory era onde elas ganhavam forma permanente.' },
      ],
    },

    { kind: 'divider' },

    // ─── MELFIORE entra na história ───────────────────────────────────────
    {
      kind: 'lines',
      lines: [
        { en: 'This is also where MELFIORE enters the story.', pt: 'É aqui também que a MELFIORE entra na história.' },
        { en: 'Nobody remembers the first night she appeared.', pt: 'Ninguém lembra da primeira noite em que ela apareceu.' },
        { en: 'Only that one day everyone already knew her.', pt: 'Só que um dia todo mundo já a conhecia.' },
        { en: 'Not because she went viral.', pt: 'Não porque viralizou.' },
        { en: 'Virality was always considered a weak form of reputation.', pt: 'Viralizar sempre foi considerado uma forma fraca de reputação.' },
        { en: 'People knew MELFIORE because someone always had a story.', pt: 'As pessoas conheciam a MELFIORE porque alguém sempre tinha uma história.' },
      ],
    },
    // TIER 3 — as únicas aspas do artigo, conversa de festa ouvida pela metade
    {
      kind: 'stickers',
      fragments: [
        { en: 'I met her after a screening.', pt: 'Conheci ela depois de uma exibição.' },
        { en: 'She disappeared with a filmmaker from Recife.', pt: 'Ela sumiu com um cineasta de Recife.' },
        { en: 'She convinced a software founder to finance an opera.', pt: 'Ela convenceu um fundador de software a financiar uma ópera.' },
        { en: 'She was wearing yellow over her eyes.', pt: 'Ela estava de amarelo sobre os olhos.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Nobody could verify any of it.', pt: 'Ninguém conseguia confirmar nada.' },
        { en: 'Nobody wanted to.', pt: 'Ninguém queria.' },
        { en: 'Some figures become celebrities.', pt: 'Algumas figuras viram celebridades.' },
        { en: 'Others become folklore.', pt: 'Outras viram folclore.' },
        { en: 'MELFIORE belonged to the second category.', pt: 'A MELFIORE pertencia à segunda categoria.' },
      ],
    },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        { en: 'Foreign journalists kept asking the same question.', pt: 'Jornalistas estrangeiros repetiam a mesma pergunta.' },
        { en: '"When did Brazil become a cultural superpower?"', pt: '"Quando o Brasil virou uma potência cultural?"' },
        { en: 'Brazilian historians usually smiled before answering.', pt: 'Historiadores brasileiros costumavam sorrir antes de responder.' },
        { en: '"We didn\'t."', pt: '"Não viramos."' },
      ],
    },
    // TIER 1 #4 — o título voltando, na voz de outro personagem
    { kind: 'fullbleed', text: { en: 'We simply stopped translating ourselves.', pt: 'Nós simplesmente paramos de nos traduzir.' }, theme: 'dark', scale: 'display' },
    {
      kind: 'lines',
      lines: [
        { en: 'That sentence confused almost everyone.', pt: 'Essa frase confundia quase todo mundo.' },
        { en: 'Until they looked closer.', pt: 'Até olharem de perto.' },
      ],
    },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        {
          en: 'The suspension system developed by Gurgel for dirt roads in Goiás became the global standard for rural mobility in Australia.',
          pt: 'O sistema de suspensão que a Gurgel desenvolveu para estradas de terra em Goiás virou o padrão global de mobilidade rural na Austrália.',
        },
        {
          en: 'A Brazilian operating system designed for public schools became the preferred educational platform across Latin America and West Africa.',
          pt: 'Um sistema operacional brasileiro feito para escolas públicas virou a plataforma educacional preferida da América Latina e da África Ocidental.',
        },
        { en: 'Children in London dressed as Curupira on Halloween.', pt: 'Crianças em Londres se vestiam de Curupira no Halloween.' },
        { en: 'Japanese animation studios openly cited Monteiro Lobato alongside Miyazaki.', pt: 'Estúdios de animação japoneses citavam Monteiro Lobato ao lado de Miyazaki.' },
        {
          en: 'A filmmaker from Xique-Xique refused a Hollywood contract because his next feature had already secured R$ 500 million from a Brazilian cultural investment fund.',
          pt: 'Um cineasta de Xique-Xique recusou um contrato de Hollywood porque seu próximo longa já tinha R$ 500 milhões garantidos por um fundo brasileiro de investimento cultural.',
        },
      ],
    },
    // A frase anterior fala de SUSPENSÃO virando padrão global. Esta é a peça de
    // que a frase fala: a estrutura nua, a parte que ninguém fotografa porque não
    // é a parte bonita. Entra aqui, e não junto dos carros prontos, porque o
    // argumento do parágrafo é de engenharia, não de estilo.
    {
      kind: 'image',
      src: '/images/editorial/gurgel/13-chassi.webp',
      alt: {
        en: 'The bare chassis of a Gurgel on a stand, wheels and steering fitted, beneath the Gurgel wordmark.',
        pt: 'O chassi nu de um Gurgel sobre um cavalete, com rodas e direção montadas, sob a marca Gurgel.',
      },
      caption: {
        en: 'The part nobody photographs. This is where the suspension argument lives.',
        pt: 'A parte que ninguém fotografa. É aqui que mora o argumento da suspensão.',
      },
      credit: 'Acervo Gurgel · procedência não verificada',
    },
    // TIER 3 — o único número do texto. `label.en` deriva das palavras já usadas
    // no parágrafo EN acima ("Brazilian cultural investment fund"), já que o
    // rótulo é legenda de UI (StatBlock), não uma linha do corpo do texto — não
    // existe frase EN equivalente em debut.md para transportar. Ver ESC-03.md.
    {
      kind: 'stat',
      value: 500,
      formatted: { en: '500', pt: '500' },
      prefix: { en: 'R$ ', pt: 'R$ ' },
      label: {
        en: "million — the filmmaker's cultural investment fund, Xique-Xique",
        pt: 'milhões — o fundo cultural de Xique-Xique',
      },
    },
    {
      kind: 'lines',
      lines: [
        { en: 'None of this happened because Brazil wanted global recognition.', pt: 'Nada disso aconteceu porque o Brasil queria reconhecimento global.' },
        { en: 'It happened because recognition became inevitable.', pt: 'Aconteceu porque o reconhecimento virou inevitável.' },
      ],
    },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        { en: 'For decades, critics misunderstood Brazilian originality.', pt: 'Por décadas, os críticos entenderam errado a originalidade brasileira.' },
        { en: 'They assumed it emerged despite contradiction.', pt: 'Achavam que ela surgia apesar da contradição.' },
        { en: "They couldn't see that contradiction was the engine.", pt: 'Não enxergavam que a contradição era o motor.' },
        {
          en: 'Long before artificial intelligence began remixing culture, Brazil had already mastered the practice.',
          pt: 'Muito antes de a inteligência artificial começar a remixar cultura, o Brasil já dominava a prática.',
        },
        { en: 'Not in laboratories.', pt: 'Não em laboratórios.' },
        { en: 'In street festivals.', pt: 'Em festas de rua.' },
        { en: 'In public squares.', pt: 'Em praças públicas.' },
        { en: 'On carnival trucks.', pt: 'Em cima de trio elétrico.' },
        { en: 'Inside dance halls.', pt: 'Dentro de salões de baile.' },
        { en: 'In improvised garages.', pt: 'Em garagens improvisadas.' },
        {
          en: 'The infamous Carreta Furacão became one of the earliest case studies taught in design schools worldwide.',
          pt: 'A infame Carreta Furacão virou um dos primeiros estudos de caso ensinados em escolas de design do mundo inteiro.',
        },
        { en: 'Not because it was absurd.', pt: 'Não por ser absurda.' },
        { en: 'Because it revealed a uniquely Brazilian technology.', pt: 'Por revelar uma tecnologia unicamente brasileira.' },
        { en: 'The ability to absorb global symbols...', pt: 'A capacidade de absorver símbolos globais...' },
        { en: '...and return them as something impossible to classify.', pt: '...e devolvê-los como algo impossível de classificar.' },
        { en: 'Not imitation.', pt: 'Não imitação.' },
        { en: 'Not parody.', pt: 'Não paródia.' },
        { en: 'Transformation.', pt: 'Transformação.' },
        { en: 'Oswald de Andrade had already named the process a century earlier.', pt: 'Oswald de Andrade já tinha batizado o processo um século antes.' },
      ],
    },
    // TIER 1 #5 — uma palavra sozinha, ChapterDivider no seu uso mais puro
    { kind: 'word', label: { en: 'Anthropophagy.', pt: 'Antropofagia.' } },
    {
      kind: 'image',
      src: '/images/editorial/gurgel/05-oswald.webp',
      alt: { en: 'Portrait of the Brazilian writer Oswald de Andrade.', pt: 'Retrato do escritor brasileiro Oswald de Andrade.' },
      caption: { en: 'Oswald de Andrade, who wrote the manifesto this country never got around to industrialising.', pt: 'Oswald de Andrade, que escreveu o manifesto que este país nunca chegou a industrializar.' },
      credit: 'Domínio público / Wikimedia Commons',
    },
    {
      kind: 'image',
      src: '/images/editorial/gurgel/07-modernismo.webp',
      alt: { en: 'Brazilian modernist work.', pt: 'Obra do modernismo brasileiro.' },
      caption: { en: 'Modernism got as far as the museum. In this story, it got as far as the factory.', pt: 'O modernismo chegou até o museu. Nesta história, ele chegou até a fábrica.' },
      credit: 'Domínio público / Wikimedia Commons',
    },
    { kind: 'lines', lines: [{ en: 'In this Brazil, anthropophagy never remained an artistic manifesto.', pt: 'Neste Brasil, a antropofagia nunca ficou como manifesto artístico.' }] },
    // TIER 2 — a piada séria: manifesto virou política
    { kind: 'lines', lines: [{ en: 'It became industrial policy.', pt: 'Virou política industrial.' }], emphasize: [0] },
    // O SEGUNDO RETRATO, e ele é o par do primeiro. Oswald está algumas telas
    // acima, com a legenda dizendo que ele escreveu o manifesto que o país nunca
    // industrializou. Aqui está o homem que industrializou: mesma pose de retrato,
    // um século depois, e no lugar da caneta um carro que ele mesmo projetou. É o
    // ponto exato em que a frase "virou política industrial" ganha rosto.
    // `plate` porque é retrato em pé: em 16/10 com cover, o corte comeria a cabeça.
    {
      kind: 'image',
      src: '/images/editorial/gurgel/12-joao-gurgel.webp',
      variant: 'plate',
      width: 736,
      height: 1122,
      alt: {
        en: 'Joao Augusto Conrado do Amaral Gurgel leaning on the open door of a Gurgel Supermini.',
        pt: 'João Augusto Conrado do Amaral Gurgel debruçado na porta aberta de um Gurgel Supermini.',
      },
      caption: {
        en: 'Joao Gurgel, engineer, leaning on a car he drew himself. The manifesto got a factory.',
        pt: 'João Gurgel, engenheiro, debruçado num carro que ele mesmo desenhou. O manifesto ganhou uma fábrica.',
      },
      credit: 'Autor não identificado · procedência não verificada',
    },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        { en: "Foreign analysts spent years trying to decode the country's unexpected rise.", pt: 'Analistas estrangeiros passaram anos tentando decifrar a ascensão inesperada do país.' },
        { en: 'Most failed because they kept measuring GDP.', pt: 'A maioria falhou porque continuava medindo PIB.' },
        { en: 'The real transformation had happened elsewhere.', pt: 'A transformação real tinha acontecido em outro lugar.' },
        { en: 'Brazil had quietly rewritten the grammar of influence.', pt: 'O Brasil tinha reescrito, em silêncio, a gramática da influência.' },
        { en: 'Hollywood no longer dictated imagination.', pt: 'Hollywood não ditava mais a imaginação.' },
        { en: 'Silicon Valley no longer monopolised innovation.', pt: 'O Vale do Silício não monopolizava mais a inovação.' },
        { en: 'Milan no longer defined elegance.', pt: 'Milão não definia mais a elegância.' },
        { en: 'Tokyo no longer owned the future.', pt: 'Tóquio não era mais dona do futuro.' },
        { en: 'Not because those places declined.', pt: 'Não porque esses lugares decaíram.' },
      ],
    },
    // TIER 2 — a tese geopolítica em nove palavras
    { kind: 'lines', lines: [{ en: 'Because another accent entered the conversation.', pt: 'Porque outro sotaque entrou na conversa.' }], emphasize: [0] },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        { en: 'Looking back, historians agree on one detail.', pt: 'Olhando para trás, os historiadores concordam num detalhe.' },
        { en: "The decisive moment wasn't technological.", pt: 'O momento decisivo não foi tecnológico.' },
        { en: "It wasn't economic.", pt: 'Não foi econômico.' },
        { en: "It wasn't geopolitical.", pt: 'Não foi geopolítico.' },
        { en: "It wasn't even political.", pt: 'Não foi nem político.' },
        { en: 'It was psychological.', pt: 'Foi psicológico.' },
      ],
    },
    // TIER 1 #6 — o clímax emocional. A ÚNICA virada para branco do artigo inteiro.
    {
      kind: 'fullbleed',
      text: {
        en: 'The day Brazilian children stopped believing the future always spoke another language.',
        pt: 'O dia em que as crianças brasileiras pararam de acreditar que o futuro sempre falava outra língua.',
      },
      theme: 'light',
      scale: 'display',
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Everything else followed naturally.', pt: 'Todo o resto veio naturalmente.' },
        { en: 'Including the cars.', pt: 'Inclusive os carros.' },
        { en: 'Including the films.', pt: 'Inclusive os filmes.' },
        { en: 'Including the billion-dollar companies.', pt: 'Inclusive as empresas bilionárias.' },
        { en: 'Including the currency.', pt: 'Inclusive a moeda.' },
        { en: 'Including the confidence.', pt: 'Inclusive a confiança.' },
      ],
    },
    // A ÚLTIMA IMAGEM É A ÚNICA COISA REAL DA MATÉRIA INTEIRA, e é por isso que
    // ela é a última. Tudo até aqui foi especulação declarada; este folheto foi
    // impresso pela Gurgel em 1981 e traz a tese do artigo escrita pela própria
    // empresa, em três palavras, antes de qualquer um deste texto ter nascido.
    // O país disse isso em voz alta uma vez. A matéria é sobre o Brasil onde a
    // frase pegou.
    // `plate` porque o slogan é a beirada de cima do folheto e a marca é a de
    // baixo: em cover 16/10 com scale, o recorte apagaria justamente as duas
    // coisas pelas quais a imagem está aqui.
    {
      kind: 'image',
      src: '/images/editorial/gurgel/14-nossa-terra.webp',
      variant: 'plate',
      width: 736,
      height: 516,
      alt: {
        en: 'A 1981 Gurgel brochure for the G-15 L, showing the pickup on a farm track beside a man on horseback, under the line "Nossa terra - Nossa gente - Nosso carro".',
        pt: 'Folheto Gurgel de 1981 do G-15 L, com a picape numa estrada de fazenda ao lado de um homem a cavalo, sob a frase "Nossa terra - Nossa gente - Nosso carro".',
      },
      caption: {
        en: 'Our land. Our people. Our car. Gurgel printed the thesis of this article in 1981, and meant it literally.',
        pt: 'Nossa terra. Nossa gente. Nosso carro. A Gurgel imprimiu a tese desta matéria em 1981, e falava literalmente.',
      },
      credit: 'Folheto Gurgel, 1981 · acervo, procedência não verificada',
    },
    {
      kind: 'lines',
      lines: [
        {
          en: "Perhaps that's why nobody remembers exactly when Brazil became one of the world's cultural centres.",
          pt: 'Talvez seja por isso que ninguém lembra exatamente quando o Brasil virou um dos centros culturais do mundo.',
        },
        { en: 'They only remember something much simpler.', pt: 'Lembram apenas de algo muito mais simples.' },
        { en: 'The day choosing a Gurgel stopped meaning anything at all.', pt: 'O dia em que escolher um Gurgel deixou de significar qualquer coisa.' },
        { en: 'Because, by then...', pt: 'Porque, a essa altura...' },
      ],
    },
    // Fecho — 05_PILOTO-CENAS.md §6: sozinha, entrando devagar no preto, depois do branco do clímax.
    { kind: 'closing', text: { en: '...it had always been there.', pt: '...ele sempre esteve ali.' } },
  ],
}
