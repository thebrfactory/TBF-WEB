// =============================================================================
// CONTEÚDO: "THE HOLY, THE HORSEPOWER & THE CLOWN" /
// "O SAGRADO, O CAVALO-VAPOR E O PALHAÇO"
// 3ª matéria local do motor scrolly. Slug `brazilian-country-side`, escolhido
// pelo fundador de propósito: não precisa bater com o título.
//
// PROCEDÊNCIA. Texto fonte: `~/Downloads/THE HOLY, THE HORSEPOWER & THE
// CLOWN.md`, 1.361 palavras em português, relato em primeira pessoa da Folia
// do Divino e das Cavalhadas em Posse (GO), com o encontro entre a festa
// religiosa, a cultura automotiva do interior e o eletrofunk. Kicker
// "BRAZILIAN DEEP SEEK / FIELD RESEARCH / 001" e dateline "Posse, Goiás,
// Brazil" vêm do próprio arquivo fonte.
//
// TRADUÇÃO. O texto fonte é só em português. O inglês de todo bloco é
// TRADUÇÃO EDITORIAL (registro VICE/DAZED), não tradução literal palavra por
// palavra. Nenhum fato, nome, lugar ou número foi adicionado: o texto fonte
// não tem nenhum número, e este artigo também não tem nenhum (por isso não há
// bloco `stat`).
//
// FOTOGRAFIA (10/09/2026). As 15 fotos entraram: são do próprio fundador, do
// mesmo dia e do mesmo campo que o texto descreve, entregues em
// `TBF GOIÁS COOLHUNTING PACK/SAÍDA`. Ritmo: uma foto por capítulo logo depois
// da palavra-título, e `pair` só onde as duas peças são a MESMA coisa vista de
// dois jeitos (o mouro montado e a pé, o cristão de frente e de costas, a
// companhia parada e com os cavalos), que é a regra escrita em types.ts. O
// panorama é o único `plate`: 1920x783 sangrando viraria uma tira de 300 px de
// altura. Procedência e conversão em
// `public/images/editorial/country-side/_CREDITOS.md`.
//
// 🔴 PASSADA `/humanizar` (10/09/2026, ordem direta do fundador: "tem MUITO
// pra melhorar isso ainda, conserta todos os vícios"). O detector da skill deu
// LIMPO na primeira versão (1 família, 0,7 ponto por mil palavras), e mesmo
// assim havia vício: o detector mede LISTA, não RITMO. A etapa 5 da skill (a
// auditoria "o que ainda entrega que isto foi feito por IA?") achou quatro
// famílias que a lista não pega. O que foi cortado, e por quê:
//
//   1. HEDGE EMPILHADO. "parece" 9x, "talvez" 6x, mais "provavelmente", "não
//      necessariamente", "é possível imaginar que estamos diante de". Quem
//      esteve no campo em 24 de maio não precisa de amortecedor para dizer o
//      que viu. Sobrou UM "talvez", o do fecho, que é a última palavra do
//      texto fonte e é dele. Um hedge depois de dez cortados aterrissa; onze
//      hedges viram tique.
//   2. "NÃO É X, É Y" QUATRO VEZES. Um é estilo. Quatro é máquina. Ficaram os
//      dois em que a virada É o argumento (o bloco `negation` do carro e a
//      superfície nova da máscara). Os outros dois viraram afirmação direta:
//      "Diversidade é descrição. O mecanismo é o que interessa."
//   3. ABSTRAÇÃO PROFESSORAL no lugar do concreto visto: "operação cultural
//      contemporânea", "transformam a fantasia em uma linguagem social",
//      "novas formas de ser desejado", "uma linguagem que não pertence
//      inteiramente a nenhum dos lados". Trocado por palavra de gente.
//   4. TIQUES MENORES: o anglicismo "recebeu o memorando" (get the memo), a
//      tríade "mascarados, coloridos, performáticos", e as aspas em "festa
//      tradicional" e "diversos", que serviam para o texto se desculpar da
//      palavra que ele mesmo escolheu.
//
// O QUE NÃO FOI TOCADO, de propósito: a frase curta isolada, uma por linha.
// Isso NÃO é tell de IA, é a gramática do motor scrolly e é como o fundador
// escreve (`references/03-nao-acusar.md` da skill manda conferir isto antes de
// reescrever, porque metade do estrago de uma revisão anti-IA é apagar a marca
// de humano que já estava lá).
//
// O QUE FOI CORTADO NA MONTAGEM (antes da passada acima). Cortes de
// REPETIÇÃO, não de conteúdo:
//   - A linha final "Posse, Goiás." (repetição do dateline que já abre a
//     matéria no `pinned`) saiu por redundância.
//   - Frases de transição pura ("À rua. / À infância." e similares) foram
//     agrupadas em blocos `stickers`, que é o dispositivo certo para
//     fragmento solto, em vez de uma cascata `lines` de uma palavra por vez.
// NENHUMA CITAÇÃO, NOME, DATA OU DADO FOI INVENTADO. A revisão foi
// SUBTRATIVA: onde faltava concretude (cheiro, hora, calor, o nome da música,
// a cor do carro, o que o primo disse), o texto foi ENCURTADO, nunca
// preenchido com detalhe que o fundador não escreveu.
//
// ESTRUTURA. 8 capítulos (`word`): PRODUCTION, THE CLOWN, HORSEPOWER, LIVING
// TRADITION, THE MASK, APPROPRIATION, THE FRAME, LIVING CULTURE. O texto
// fonte tem doze `***` no original; os capítulos aqui agrupam por virada de
// argumento, não um por `***`, porque bloco `word` na tela cheia é revelação
// de ideia nova, e várias das doze seções do fonte continuam a MESMA ideia
// (ex.: apropriação e o mecanismo de fricção cultural são o mesmo argumento
// em duas seções do fonte, e viraram um capítulo só aqui).
//
// CAPA RESOLVIDA em 10/09/2026. Era tipográfica e provisória (fundo preto com
// um filete âmbar, gerada por script), porque nenhuma foto de Posse existia no
// repositório na época. O fundador desenhou as duas pranchetas em
// `/Volumes/TAV05/0. TBF inc/DOPAMINE ARTICLE thumbs.psd`, canvas 3940x1280 com
// dois quadros de 1920x1280 (o segundo começa em x=2020; a faixa entre eles não
// é vão vazio, é sangria dos dois, por isso não dá para achar o corte
// procurando coluna preta). Quadro 1 virou a capa, quadro 2 virou o card
// social, recortado no centro para 1200x630 porque WhatsApp e Telegram cortam
// o card pelo meio. A provisória está em `public/_ARQUIVO/`.
// =============================================================================

import type { ManifestoArticle } from './types'

export const brazilianCountrySide: ManifestoArticle = {
  slug: 'brazilian-country-side',
  loaderTitle: { en: 'THE HOLY, THE HORSEPOWER', pt: 'O SAGRADO, O CAVALO-VAPOR' },
  heroTitle: {
    en: 'THE HOLY, THE HORSEPOWER & THE CLOWN.',
    pt: 'O SAGRADO, O CAVALO-VAPOR E O PALHAÇO.',
  },
  heroSubtitle: {
    en: 'Field notes from Posse, Goiás: a religious procession, a horseback battle between Moors and Christians, and a lowered car with the bass turned all the way up.',
    pt: 'Notas de campo de Posse, Goiás: uma procissão religiosa, uma batalha a cavalo entre mouros e cristãos, e um carro rebaixado com o som no talo.',
  },
  category: 'Field Research',
  publishedAt: '2026-09-10',
  deck: {
    en: 'In inland Goiás, a Catholic feast with European roots shares a field with sound systems built for eletrofunk. Nobody agreed to keep the sacred and the profane apart.',
    pt: 'No interior de Goiás, uma festa católica de raiz europeia divide o campo com som feito para eletrofunk. Ninguém combinou de manter o sagrado e o profano separados.',
  },
  cover: {
    src: '/images/editorial/country-side/capa.webp',
    alt: {
      en: 'Masked revellers on a pink car during the feast in Posse: clown, skull and bull masks, hands raised, a storm sky behind.',
      pt: 'Foliões mascarados sobre um carro rosa na festa de Posse: máscaras de palhaço, caveira e boi, mãos erguidas, céu de tempestade atrás.',
    },
    credit: '.TBF. inc',
  },

  // Card social próprio. Vem do segundo quadro do mesmo PSD, composto para
  // sobreviver ao corte central: o campo `cover` acima é 3:2 e ficaria decepado
  // no preview de mensageiro.
  ogImage: '/images/editorial/country-side/og-capa.jpg',

  // ESTEIRA NO CABEÇALHO (21/09/2026, pedido do fundador: o reel do
  // hospitality, mas sem sair do cabeçalho). Liga a esteira dentro do
  // HeroCinema, com as mesmas 12 fotos que os blocos `image`/`pair` abaixo já
  // usam (ver `collectPhotos` em ArticleScrolly.tsx). Legenda no mesmo tom do
  // `reelLabel` do hospitality: lugar, contagem, tese em uma linha.
  heroBelt: {
    en: 'Posse, Goiás. Fifteen frames from the same field the words describe.',
    pt: 'Posse, Goiás. Quinze quadros do mesmo campo que o texto descreve.',
  },

  blocks: [
    // ─── ABERTURA. O dateline do próprio texto fonte entra no kicker do
    //     `pinned`, então o hero não precisa repeti-lo.
    {
      kind: 'pinned',
      kicker: { en: 'POSSE, GOIÁS, BRAZIL', pt: 'POSSE, GOIÁS, BRASIL' },
      text: {
        en: 'In Posse, Goiás, history does not stay in the past.',
        pt: 'Em Posse, Goiás, a história não fica no passado.',
      },
    },
    {
      kind: 'lines',
      lines: [
        { en: 'I got there on May 24th, for the feast of the Holy Spirit.', pt: 'Cheguei em 24 de maio, para a festa do Divino Espírito Santo.' },
        { en: 'Family invite. My cousin was a folião, one of the people who put the Folia do Divino together.', pt: 'Vim a convite de família. Meu primo era folião, um dos que põem a Folia do Divino de pé.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The first impression is religious.', pt: 'A primeira impressão é religiosa.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Groups walk the city carrying a flag with the Holy Spirit on it, a white dove.', pt: 'Grupos percorrem a cidade carregando a bandeira do Divino, a pomba branca.' },
        { en: 'People open the house. They sing, they pray, they visit.', pt: 'As pessoas abrem a casa. Cantam, rezam, visitam.' },
        { en: 'Faith, community, repetition. It crosses generations because the generations keep doing it.', pt: 'Fé, comunidade e repetição. Atravessa gerações porque as gerações continuam fazendo.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'But Posse does not end at prayer.', pt: 'Mas Posse não termina na oração.' },
        { en: 'A few days later, the city changes scale.', pt: 'Alguns dias depois, a cidade muda de escala.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The house visit turns into spectacle. The field fills with horses, characters, costumes, choreography.', pt: 'A visita vira espetáculo. O campo recebe cavalos, personagens, figurinos, coreografia.' },
        { en: 'History comes in through the Cavalhadas, the staged battle between Moors and Christians, European in origin and long since absorbed into Brazil.', pt: 'A história entra pelas Cavalhadas, a encenação da batalha entre mouros e cristãos, de origem europeia e há muito incorporada ao Brasil.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'For a minute it passes for a historical play.', pt: 'Por um minuto passa por peça histórica.' },
        { en: 'Until a lowered car shows up.', pt: 'Até que um carro rebaixado aparece.' },
      ],
    },
    {
      kind: 'fullbleed',
      text: { en: 'And the bass gets there before the car does.', pt: 'E o grave chega antes dele.' },
      theme: 'dark',
    },

    {
      kind: 'image',
      src: '/images/editorial/country-side/01-bandeira-do-divino.webp',
      alt: {
        en: 'A man in a red shirt carries the ribboned banner of the Folia do Divino.',
        pt: 'Homem de camisa vermelha carrega a bandeira de fitas da Folia do Divino.',
      },
      caption: {
        en: 'The banner opens the way. Everything else in Posse comes after it.',
        pt: 'A bandeira abre o caminho. Tudo o mais em Posse vem depois dela.',
      },
      credit: 'TAVARÍSTICO / .TBF. inc',
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    // ─── CAPÍTULO 1: PRODUÇÃO.
    { kind: 'word', label: { en: 'PRODUCTION', pt: 'PRODUÇÃO' }, theme: 'dark' },
    {
      kind: 'image',
      src: '/images/editorial/country-side/02-sanfona.webp',
      alt: {
        en: 'An accordion player in a cap, mid tune, inside the crowd of the feast.',
        pt: 'Sanfoneiro de boné toca no meio da multidão da festa.',
      },
      caption: {
        en: 'The feast is made by hand, one player at a time.',
        pt: 'A festa é feita à mão, um tocador por vez.',
      },
      credit: 'TAVARÍSTICO / .TBF. inc',
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Something curious is going on in Posse.', pt: 'Tem uma coisa curiosa acontecendo em Posse.' },
        { en: 'Tradition here is not being preserved.', pt: 'A tradição ali não está sendo preservada.' },
        { en: 'It is being produced.', pt: 'Está sendo produzida.' },
      ],
      emphasize: [2],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Months of preparation. Organizers, money, infrastructure, communication, sponsors, city hall.', pt: 'Meses de preparação. Organização, dinheiro, infraestrutura, comunicação, patrocínio, poder público.' },
        { en: 'What could be community memory alone is also a production.', pt: 'O que podia ser só memória de comunidade também é produção.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The past needs production.', pt: 'O passado precisa de produção.' },
        { en: 'Tradition needs logistics.', pt: 'A tradição precisa de logística.' },
        { en: 'Heritage needs a budget.', pt: 'O patrimônio precisa de orçamento.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'And on the day of the feast, all of it disappears behind the spectacle.', pt: 'E no dia da festa tudo isso desaparece atrás do espetáculo.' },
      ],
    },

    // ─── CAPÍTULO 2: O PALHAÇO.
    { kind: 'word', label: { en: 'THE CLOWN', pt: 'O PALHAÇO' }, theme: 'dark' },
    {
      kind: 'image',
      src: '/images/editorial/country-side/03-palhaco-ao-volante.webp',
      alt: {
        en: 'A masked clown at the wheel of a pink car, giving a thumbs up.',
        pt: 'Palhaço mascarado ao volante de um carro rosa, com o polegar erguido.',
      },
      caption: {
        en: 'The mask does not hide anyone here. It announces.',
        pt: 'A máscara ali não esconde ninguém. Ela anuncia.',
      },
      credit: 'TAVARÍSTICO / .TBF. inc',
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    {
      kind: 'lines',
      lines: [
        { en: 'That is where the characters come in.', pt: 'É aí que entram os personagens.' },
        { en: 'Among them, the clowns.', pt: 'Entre eles, os palhaços.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Clown is not a big enough word for it.', pt: 'Palhaço é palavra pequena para o que eles fazem.' },
        { en: 'Masked and colorful, they hold their own place inside the Cavalhadas. They are part of the tradition and they belong somewhere else at the same time.', pt: 'Mascarados e coloridos, ocupam um lugar próprio dentro das Cavalhadas. São parte da tradição e pertencem a outra coisa ao mesmo tempo.' },
      ],
    },
    {
      kind: 'stickers',
      fragments: [
        { en: 'To the street.', pt: 'À rua.' },
        { en: 'To childhood.', pt: 'À infância.' },
        { en: 'To fantasy.', pt: 'À fantasia.' },
        { en: 'To the will to show up.', pt: 'À vontade de aparecer.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The younger ones get it without anyone explaining.', pt: 'Os mais jovens entendem sem ninguém explicar.' },
        { en: 'They put on the character, put on the mask, play with their own image. The costume becomes a way of talking to everyone else.', pt: 'Vestem o personagem, põem a máscara, brincam com a própria imagem. A fantasia vira jeito de falar com os outros.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Nobody there is worried about freezing tradition in place.', pt: 'Ninguém ali está preocupado em congelar a tradição.' },
        { en: 'They are using it.', pt: 'Eles estão usando.' },
        { en: 'And that is how it stays alive.', pt: 'E é assim que ela continua viva.' },
      ],
      emphasize: [2],
    },

    // ─── CAPÍTULO 3: CAVALO-VAPOR.
    { kind: 'word', label: { en: 'HORSEPOWER', pt: 'CAVALO-VAPOR' }, theme: 'dark' },
    {
      kind: 'image',
      src: '/images/editorial/country-side/04-palhaco-no-rallye.webp',
      alt: {
        en: 'A clown in a polka dot costume standing on the door of a white car with the sound system open.',
        pt: 'Palhaço de fantasia de bolinhas em pé na porta de um carro branco com o som aberto.',
      },
      caption: {
        en: 'The car is the stage, and the sound system is the second costume.',
        pt: 'O carro é o palco, e o som é a segunda fantasia.',
      },
      credit: 'TAVARÍSTICO / .TBF. inc',
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Out in the field, a decorated horse shares the ground with a character from another century.', pt: 'No campo, cavalo ornamentado divide o chão com personagem de outro século.' },
      ],
    },
    {
      kind: 'stickers',
      fragments: [
        { en: 'Children.', pt: 'Crianças.' },
        { en: 'Teenagers.', pt: 'Jovens.' },
        { en: 'Families.', pt: 'Famílias.' },
        { en: 'Clowns.', pt: 'Palhaços.' },
        { en: 'Costumes.', pt: 'Fantasias.' },
        { en: 'Masks.', pt: 'Máscaras.' },
        { en: 'Color.', pt: 'Cores.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'And, at some point, cars.', pt: 'E, em algum momento, carros.' },
      ],
    },
    {
      kind: 'negation',
      pairs: [
        [
          { en: 'Not cars as transportation.', pt: 'Não carro como transporte.' },
          { en: 'Cars as an extension of the body.', pt: 'Carro como extensão do corpo.' },
        ],
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Machines lowered and modified to produce presence. Huge sound systems. Bass that crosses the field.', pt: 'Máquina rebaixada e modificada para produzir presença. Som enorme. Grave que atravessa o campo.' },
      ],
    },
    {
      kind: 'stickers',
      fragments: [
        { en: 'Inland car culture meets eletrofunk.', pt: 'A cultura automotiva do interior encontra o eletrofunk.' },
        { en: 'The horse meets the car.', pt: 'O cavalo encontra o carro.' },
        { en: 'The medieval character meets the teenager.', pt: 'O personagem medieval encontra o adolescente.' },
        { en: 'The mask meets the sound system.', pt: 'A máscara encontra o sistema de som.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The church is right there.', pt: 'A igreja está ali.' },
        { en: 'So is the history.', pt: 'A história também.' },
        { en: 'And nobody agreed to keep those things apart.', pt: 'E ninguém combinou de manter essas coisas separadas.' },
      ],
      emphasize: [2],
    },

    // ─── CAPÍTULO 4: TRADIÇÃO VIVA.
    { kind: 'word', label: { en: 'LIVING TRADITION', pt: 'TRADIÇÃO VIVA' }, theme: 'dark' },
    {
      kind: 'image',
      src: '/images/editorial/country-side/08-cavalhada-panorama.webp',
      alt: {
        en: 'The full line of riders drawn up on the field before the charge.',
        pt: 'A fila inteira de cavaleiros formada no campo antes da investida.',
      },
      caption: {
        en: 'The field is not a stage set. It is a street with a fence around it.',
        pt: 'O campo não é cenário. É rua com cerca em volta.',
      },
      credit: 'TAVARÍSTICO / .TBF. inc',
      variant: 'plate',
      width: 1920,
      height: 783,
    },
    {
      kind: 'image',
      src: '/images/editorial/country-side/05-cavaleiro-silhueta.webp',
      alt: {
        en: 'A rider in plumed helmet silhouetted against a blue sky, lance raised.',
        pt: 'Cavaleiro de elmo com penacho em silhueta contra o céu azul, lança erguida.',
      },
      caption: {
        en: 'Moors and Christians, at the exact hour the light gives in.',
        pt: 'Mouros e cristãos, na hora exata em que a luz cede.',
      },
      credit: 'TAVARÍSTICO / .TBF. inc',
    },
    {
      kind: 'lines',
      lines: [
        { en: 'This is the hard part to explain from the outside.', pt: 'Essa é a parte difícil de explicar de fora.' },
        { en: 'The word tradition comes with an expectation glued to it.', pt: 'A palavra tradição vem com uma expectativa colada nela.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'We think preserving means keeping.', pt: 'A gente acha que preservar é manter.' },
      ],
    },
    {
      kind: 'stickers',
      fragments: [
        { en: 'Keep the customs.', pt: 'Manter os costumes.' },
        { en: 'Keep the costumes.', pt: 'Manter os figurinos.' },
        { en: 'Keep the rituals.', pt: 'Manter os rituais.' },
        { en: 'Keep the meanings.', pt: 'Manter os significados.' },
        { en: 'Keep everything in place.', pt: 'Manter tudo no lugar.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Culture does not work that way.', pt: 'Cultura não funciona assim.' },
        { en: 'A tradition that has to stay identical has already become a museum piece.', pt: 'Tradição que precisa ficar idêntica já virou peça de museu.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'A living tradition does something else.', pt: 'Tradição viva faz outra coisa.' },
      ],
    },
    {
      kind: 'stickers',
      fragments: [
        { en: 'It absorbs.', pt: 'Ela absorve.' },
        { en: 'It incorporates.', pt: 'Ela incorpora.' },
        { en: 'It changes clothes.', pt: 'Ela muda de roupa.' },
        { en: 'It finds new people.', pt: 'Ela encontra novas pessoas.' },
        { en: 'It finds new sounds.', pt: 'Ela encontra novos sons.' },
        { en: 'It finds new desires.', pt: 'Ela encontra novos desejos.' },
      ],
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'In Posse, the young are not choosing between tradition and the present.',
        pt: 'Em Posse, os jovens não escolhem entre a tradição e o presente.',
      },
      theme: 'light',
    },
    {
      kind: 'pair',
      ratio: '2 / 3',
      items: [
        {
          src: '/images/editorial/country-side/06-mouro-azul-montado.webp',
          alt: {
            en: 'A Moor rider in blue and silver, mounted, seen from the front.',
            pt: 'Cavaleiro mouro de azul e prata, montado, visto de frente.',
          },
          caption: {
            en: 'The Moor, mounted.',
            pt: 'O mouro, montado.',
          },
          credit: 'TAVARÍSTICO / .TBF. inc',
        },
        {
          src: '/images/editorial/country-side/07-mouro-azul-cavalo.webp',
          alt: {
            en: 'The same blue rider on foot, beside the decorated horse.',
            pt: 'O mesmo cavaleiro azul a pé, ao lado do cavalo ornamentado.',
          },
          caption: {
            en: 'The same Moor, on foot.',
            pt: 'O mesmo mouro, a pé.',
          },
          credit: 'TAVARÍSTICO / .TBF. inc',
        },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'They live both.', pt: 'Vivem os dois.' },
      ],
    },

    // ─── CAPÍTULO 5: A MÁSCARA.
    { kind: 'word', label: { en: 'THE MASK', pt: 'A MÁSCARA' }, theme: 'dark' },
    {
      kind: 'image',
      src: '/images/editorial/country-side/13-mascara-no-carro.webp',
      alt: {
        en: 'A young man pulls an orange devil mask over his face, leaning on a car.',
        pt: 'Jovem puxa uma máscara laranja de diabo sobre o rosto, encostado num carro.',
      },
      caption: {
        en: 'The gesture that starts everything: putting the face on.',
        pt: 'O gesto que começa tudo: vestir o rosto.',
      },
      credit: 'TAVARÍSTICO / .TBF. inc',
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    {
      kind: 'lines',
      lines: [
        { en: 'This is where the clown gets interesting.', pt: 'É aqui que o palhaço fica interessante.' },
        { en: 'He exists inside the tradition and escapes it.', pt: 'Ele existe dentro da tradição e escapa dela.' },
      ],
    },
    {
      kind: 'mirror',
      beforeLabel: { en: 'RITUAL', pt: 'RITUAL' },
      afterLabel: { en: 'PERSON', pt: 'PESSOA' },
      before: [
        { en: 'Character.', pt: 'Personagem.' },
        { en: 'Mask.', pt: 'Máscara.' },
        { en: 'Ritual.', pt: 'Ritual.' },
        { en: 'Heritage.', pt: 'Patrimônio.' },
      ],
      after: [
        { en: 'Person.', pt: 'Pessoa.' },
        { en: 'Identity.', pt: 'Identidade.' },
        { en: 'Play.', pt: 'Brincadeira.' },
        { en: 'Performance.', pt: 'Performance.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'When he climbs on top of the car, in front of the sound system, something shifts.', pt: 'Quando ele sobe no carro, diante do som, alguma coisa se desloca.' },
        { en: 'Tradition was not abandoned.', pt: 'A tradição não foi abandonada.' },
        { en: 'It gained another surface.', pt: 'Ela ganhou outra superfície.' },
      ],
      emphasize: [2],
    },
    {
      kind: 'mirror',
      beforeLabel: { en: 'IT WAS', pt: 'ERA' },
      afterLabel: { en: 'IT CAN ALSO BECOME', pt: 'TAMBÉM PODE VIRAR' },
      before: [
        { en: 'A ritual mask.', pt: 'Uma máscara ritual.' },
        { en: 'A historical costume.', pt: 'Uma fantasia histórica.' },
        { en: 'A character.', pt: 'Um personagem.' },
        { en: 'A feast.', pt: 'Uma festa.' },
      ],
      after: [
        { en: 'An accessory.', pt: 'Um acessório.' },
        { en: 'An aesthetic.', pt: 'Uma estética.' },
        { en: 'A selfie.', pt: 'Uma selfie.' },
        { en: 'A dance floor.', pt: 'Uma pista.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'That does not shrink the tradition.', pt: 'Isso não diminui a tradição.' },
        { en: 'The meaning survives because somebody still wants it.', pt: 'O significado sobrevive porque alguém ainda quer ele.' },
      ],
      emphasize: [1],
    },

    // ─── CAPÍTULO 6: APROPRIAÇÃO. As seções "apropriação" e "fricção" do
    //     texto fonte são o MESMO argumento (o mecanismo brasileiro de
    //     absorver referência e devolver diferente), então viram um
    //     capítulo só, sem `word` duplicado no meio.
    { kind: 'word', label: { en: 'APPROPRIATION', pt: 'APROPRIAÇÃO' }, theme: 'dark' },
    {
      kind: 'pair',
      ratio: '2 / 3',
      items: [
        {
          src: '/images/editorial/country-side/09-cristao-vermelho-frente.webp',
          alt: {
            en: 'A Christian rider in red and gold on a white horse, seen from the front.',
            pt: 'Cavaleiro cristão de vermelho e dourado sobre cavalo branco, visto de frente.',
          },
          caption: {
            en: 'Red and gold, from the front.',
            pt: 'Vermelho e dourado, de frente.',
          },
          credit: 'TAVARÍSTICO / .TBF. inc',
        },
        {
          src: '/images/editorial/country-side/10-cristao-vermelho-costas.webp',
          alt: {
            en: 'The same costume from behind, the cape open over the shoulders.',
            pt: 'A mesma fantasia por trás, com a capa aberta sobre os ombros.',
          },
          caption: {
            en: 'And the same costume, from behind.',
            pt: 'E a mesma fantasia, por trás.',
          },
          credit: 'TAVARÍSTICO / .TBF. inc',
        },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'There is a word for this: appropriation.', pt: 'Tem uma palavra para isso: apropriação.' },
        { en: 'Not in the sense of theft.', pt: 'Não no sentido de roubo.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Appropriation is what a generation does with what it inherited without creating.', pt: 'Apropriação é o que uma geração faz com o que recebeu sem ter criado.' },
      ],
    },
    {
      kind: 'stickers',
      fragments: [
        { en: 'It takes.', pt: 'Ela pega.' },
        { en: 'It reinterprets.', pt: 'Reinterpreta.' },
        { en: 'It mixes.', pt: 'Mistura.' },
        { en: 'It gives back, different.', pt: 'Devolve diferente.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Old mechanism. It is how Brazil built itself.', pt: 'Mecanismo antigo. Foi assim que o Brasil se construiu.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'European references landed here and ran into indigenous peoples, African populations, popular Catholicism, street parties, music, oral tradition, religion, violence, invention, improvisation.', pt: 'A referência europeia chegou aqui e encontrou povo indígena, população africana, catolicismo popular, festa de rua, música, oralidade, religiosidade, violência, invenção, improviso.' },
        { en: 'Nothing stayed the same.', pt: 'Nada ficou igual.' },
        { en: 'What came from outside had to learn how to exist here.', pt: 'O que veio de fora aprendeu a existir aqui.' },
      ],
      emphasize: [2],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The Cavalhadas too.', pt: 'As Cavalhadas também.' },
        { en: 'A battle between Moors and Christians carries centuries of European imagination.', pt: 'Uma batalha entre mouros e cristãos carrega séculos de imaginário europeu.' },
        { en: 'In Posse it happens in the Cerrado.', pt: 'Em Posse ela acontece no Cerrado.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'With the horses from there. With the families from there. With the young people from there.', pt: 'Com o cavalo dali. Com a família dali. Com o jovem dali.' },
        { en: 'With the money, the infrastructure and the look of now.', pt: 'Com o dinheiro, a infraestrutura e a estética de agora.' },
      ],
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'And when the cars show up, there is no doubt left about where we are.',
        pt: 'E quando os carros aparecem, não sobra dúvida de onde estamos.',
      },
      theme: 'dark',
    },
    {
      kind: 'pair',
      ratio: '2 / 3',
      items: [
        {
          src: '/images/editorial/country-side/11-cristaos-retrato.webp',
          alt: {
            en: 'A group of Christian riders in red, standing together before the charge.',
            pt: 'Grupo de cavaleiros cristãos de vermelho, reunidos antes da investida.',
          },
          caption: {
            en: 'The company, waiting.',
            pt: 'A companhia, esperando.',
          },
          credit: 'TAVARÍSTICO / .TBF. inc',
        },
        {
          src: '/images/editorial/country-side/12-cristaos-cavalos.webp',
          alt: {
            en: 'The same group with the horses, harnesses and plumes at close range.',
            pt: 'O mesmo grupo com os cavalos, arreios e penachos de perto.',
          },
          caption: {
            en: 'The company, with the horses.',
            pt: 'A companhia, com os cavalos.',
          },
          credit: 'TAVARÍSTICO / .TBF. inc',
        },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'This is not medieval Europe.', pt: 'Isso não é Europa medieval.' },
        { en: 'This is Goiás.', pt: 'É Goiás.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The mistake is looking for purity where there is continuity.', pt: 'O erro é procurar pureza onde tem continuidade.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Brazilian culture is good at making things fit that should not fit.', pt: 'A cultura brasileira é boa em fazer caber junto o que não deveria caber.' },
        { en: 'Diversity is a description.', pt: 'Diversidade é descrição.' },
        { en: 'The mechanism is what matters.', pt: 'O mecanismo é o que interessa.' },
      ],
      emphasize: [2],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Brazil absorbs references and sets them against each other until something new comes out.', pt: 'O Brasil absorve referência e põe uma contra a outra até sair coisa nova.' },
      ],
    },
    {
      kind: 'stickers',
      fragments: [
        { en: 'The erudite meets the popular.', pt: 'O erudito encontra o popular.' },
        { en: 'The religious meets the sensual.', pt: 'O religioso encontra o sensual.' },
        { en: 'The historical meets the contemporary.', pt: 'O histórico encontra o contemporâneo.' },
        { en: 'The imported meets the local.', pt: 'O importado encontra o local.' },
        { en: 'The institutional meets the street.', pt: 'O institucional encontra a rua.' },
        { en: 'The sacred meets the bass.', pt: 'O sagrado encontra o grave.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'In that friction a language shows up that belongs to neither side.', pt: 'Nessa fricção nasce uma língua que não é de nenhum dos dois lados.' },
      ],
    },

    // ─── CAPÍTULO 7: O ENQUADRAMENTO.
    { kind: 'word', label: { en: 'THE FRAME', pt: 'O ENQUADRAMENTO' }, theme: 'dark' },
    {
      kind: 'image',
      src: '/images/editorial/country-side/14-calca-de-bolinhas.webp',
      alt: {
        en: 'Close on red polka dot trousers, one leg wrapped in a bandage, sneakers on the dirt.',
        pt: 'Detalhe de calça vermelha de bolinhas, uma perna enfaixada, tênis na terra.',
      },
      caption: {
        en: 'Sneakers under the costume. Nobody there sees a contradiction.',
        pt: 'Tênis por baixo da fantasia. Ninguém ali vê contradição.',
      },
      credit: 'TAVARÍSTICO / .TBF. inc',
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    {
      kind: 'lines',
      lines: [
        { en: 'That is what the photographs showed.', pt: 'Foi isso que as fotos mostraram.' },
      ],
    },
    {
      kind: 'stickers',
      fragments: [
        { en: 'A man in the organization uniform.', pt: 'Um homem com a roupa da organização.' },
        { en: 'Masked clowns in a field.', pt: 'Palhaços mascarados num campo.' },
        { en: 'Children dressed as characters.', pt: 'Crianças vestidas de personagem.' },
        { en: 'Decorated horses.', pt: 'Cavalos ornamentados.' },
        { en: 'Characters from the Cavalhadas.', pt: 'Personagens das Cavalhadas.' },
        { en: 'Clowns on top of cars.', pt: 'Palhaços em cima de carro.' },
        { en: 'Lowered cars.', pt: 'Carros rebaixados.' },
        { en: 'Colorful costumes.', pt: 'Fantasias coloridas.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Bodies from different worlds inside the same frame.', pt: 'Corpos de mundos diferentes no mesmo enquadramento.' },
        { en: 'The photograph proves that the separation we make in our heads does not exist in the field.', pt: 'A foto prova que a separação que a gente faz na cabeça não existe no campo.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'There is no area reserved for tradition.', pt: 'Não tem área reservada para a tradição.' },
        { en: 'Another for the young.', pt: 'Outra para a juventude.' },
        { en: 'Another for the cars.', pt: 'Outra para o carro.' },
        { en: 'Another for religion.', pt: 'Outra para a religião.' },
        { en: 'It all happens at once.', pt: 'Tudo acontece ao mesmo tempo.' },
      ],
      emphasize: [4],
    },

    // ─── CAPÍTULO 8: CULTURA VIVA. Fecho.
    { kind: 'word', label: { en: 'LIVING CULTURE', pt: 'CULTURA VIVA' }, theme: 'dark' },
    {
      kind: 'image',
      src: '/images/editorial/country-side/15-entardecer.webp',
      alt: {
        en: 'The procession of riders under a wide blue sky at the end of the day.',
        pt: 'A procissão de cavaleiros sob um céu azul largo no fim do dia.',
      },
      caption: {
        en: 'The last light, and the feast still going.',
        pt: 'A última luz, e a festa ainda de pé.',
      },
      credit: 'TAVARÍSTICO / .TBF. inc',
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    {
      kind: 'lines',
      lines: [
        { en: 'That is what makes Posse more interesting than the idea of a traditional feast.', pt: 'É isso que torna Posse mais interessante que a ideia de festa tradicional.' },
        { en: 'What gets celebrated there is not a story that survived.', pt: 'O que se celebra ali não é uma história que sobreviveu.' },
        { en: 'It is a story that keeps finding a use.', pt: 'É uma história que continua servindo para alguma coisa.' },
      ],
      emphasize: [2],
    },
    {
      kind: 'stickers',
      fragments: [
        { en: 'To be wanted.', pt: 'De ser desejada.' },
        { en: 'To be performed.', pt: 'De ser performada.' },
        { en: 'To be modified.', pt: 'De ser modificada.' },
        { en: 'To be photographed.', pt: 'De ser fotografada.' },
        { en: 'To be heard at full volume.', pt: 'De ser ouvida em alto volume.' },
      ],
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'A tradition does not stay alive because its guardians protect it from the present.',
        pt: 'Tradição não fica viva porque o guardião protege ela do presente.',
      },
      theme: 'light',
    },
    {
      kind: 'lines',
      lines: [
        { en: 'It stays alive when the present decides what to do with it.', pt: 'Fica viva quando o presente decide o que fazer com ela.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'In the end, the question stops being why the young transform tradition.', pt: 'No fim, a pergunta deixa de ser por que os jovens transformam a tradição.' },
        { en: 'The question is why we expected them not to.', pt: 'A pergunta é por que a gente esperava que eles não transformassem.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Every generation inherits symbols it did not choose.', pt: 'Toda geração recebe símbolo que não escolheu.' },
        { en: 'Some get abandoned.', pt: 'Alguns são abandonados.' },
        { en: 'Others get preserved.', pt: 'Outros são preservados.' },
        { en: 'The ones that last are the ones that can be reinvented.', pt: 'Os que resistem são os que podem ser reinventados.' },
      ],
      emphasize: [3],
    },
    {
      kind: 'stickers',
      fragments: [
        { en: 'A white dove crosses the city.', pt: 'Uma pomba branca atravessa a cidade.' },
        { en: 'Then come the horses.', pt: 'Depois vêm os cavalos.' },
        { en: 'The Moors.', pt: 'Os mouros.' },
        { en: 'The Christians.', pt: 'Os cristãos.' },
        { en: 'The clowns.', pt: 'Os palhaços.' },
        { en: 'The masks.', pt: 'As máscaras.' },
        { en: 'The costumes.', pt: 'As fantasias.' },
        { en: 'The cars.', pt: 'Os carros.' },
        { en: 'The eletrofunk.', pt: 'O eletrofunk.' },
        { en: 'The bass.', pt: 'O grave.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'And none of it asks theory for permission.', pt: 'E nada disso pede licença para a teoria.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The phenomenon is not the attempt to keep a tradition intact.', pt: 'O fenômeno não é a tentativa de manter a tradição intacta.' },
        { en: 'It is what happens when it meets a generation that refuses to treat it like a museum piece.', pt: 'É o que acontece quando ela encontra uma geração que se recusa a tratar ela como peça de museu.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'stickers',
      fragments: [
        { en: 'A tradition meets a city.', pt: 'Uma tradição encontra uma cidade.' },
        { en: 'A city meets its young.', pt: 'Uma cidade encontra seus jovens.' },
        { en: 'The young meet a costume.', pt: 'Os jovens encontram uma fantasia.' },
        { en: 'The costume meets a horse.', pt: 'A fantasia encontra um cavalo.' },
        { en: 'The horse meets a car.', pt: 'O cavalo encontra um carro.' },
        { en: 'The car meets a sound system.', pt: 'O carro encontra um sistema de som.' },
      ],
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'And a few centuries of history walk onto the same field.',
        pt: 'E alguns séculos de história entram no mesmo campo.',
      },
      theme: 'dark',
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The sacred never ended.', pt: 'O sagrado nunca terminou.' },
        { en: 'The profane never began.', pt: 'O profano nunca começou.' },
        { en: 'They were happening at the same time.', pt: 'Estavam acontecendo ao mesmo tempo.' },
      ],
      emphasize: [2],
    },
    {
      kind: 'closing',
      text: {
        en: 'Maybe this is what living culture looks like.',
        pt: 'Talvez seja essa a cara de uma cultura viva.',
      },
    },
  ],
}
