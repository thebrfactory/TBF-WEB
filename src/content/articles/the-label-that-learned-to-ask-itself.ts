// =============================================================================
// CONTEÚDO: "THE LABEL THAT LEARNED TO ASK ITSELF" /
// "A LABEL QUE APRENDEU A SE PERGUNTAR"
// 2ª matéria local do motor scrolly. Ensaio sobre IA como infraestrutura de
// pesquisa, pensamento e execução.
//
// NOME DA CASA. A 1ª versão dizia "esta casa". O fundador cortou em 23/08/2026:
// "casa" é termo que a .TBF. nunca usou, e ele prefere "label". O texto agora
// chama a empresa pelo NOME (`.TBF.`) na maior parte das vezes, e usa "label"
// onde o lugar pede substantivo genérico. Ficou registrado o alerta: no
// brandbook, "label" é o nível ABAIXO da BU (MELFIORE, RUC, TGF são labels, e o
// site tem /labels/... para elas), então chamar a própria .TBF. de label carrega
// uma colisão de taxonomia. Ele decidiu assim mesmo, e a decisão é dele.
//
// PROCEDÊNCIA DOS NÚMEROS. Nenhum número deste texto é estimativa. Todos saem de
// consulta ao índice do acervo da casa
// (`TBF SYSTEM/operacao/acervo/pergunte-ao-acervo/_index/acervo.db`), medidos em
// 2026-08-23:
//
//   3.132     transcrições geradas       select count(*) from transcricoes
//   43,0 h    duração somada             select sum(dur)/3600 from transcricoes
//   1.382     arquivos falados em pt     where veredito='FALA' group by idioma
//     798     arquivos falados em ingles  idem
//   370.700   palavras ditas             sum(palavras) where veredito='FALA'
//    55.260   dessas, em ingles          = 14,9%, um setimo
//
// TODA CONTA DE IDIOMA FILTRA veredito='FALA'. Sem o filtro, o Whisper etiqueta
// 'en' por padrao no que nao tem ninguem falando (575 arquivos mudos), e o
// ingles infla ate parecer metade do acervo. Nao e. Travado em 23/08/2026.
//   18        idiomas distintos          count(distinct idioma)
//   13.267    itens catalogados          select count(*) from itens
//   7 anos    span do ACERVO             min/max de `data` em itens: 2019 a 2026
//
// A IDADE DA LABEL NAO E A IDADE DO ACERVO, e confundir as duas foi o erro da
// versao anterior, corrigido pelo fundador em 23/08/2026. A .TBF. fez UM ANO em
// junho de 2026. Os sete anos sao de arquivo DELE, de trabalho, pesquisa e
// repertorio, anteriores a existencia da empresa. O texto diz as duas coisas de
// proposito, porque a diferenca entre elas E a tese: uma label de um ano que
// comeca com sete anos de substrato nao comeca do zero. Nao reescrever isso para
// "sete anos de .TBF."
//   4         unidades de negócio        TAVARÍSTICO, Ô DE CASA, TBF, RUC
//   Whisper   modelo da transcrição      mlx-community/whisper-large-v3-turbo,
//                                        MLX, rodando local no Mac (sem nuvem)
//   44        itens invisíveis (NFD/NFC) registrado em _extract/MAPA-EXTRACAO.md
//
// Quem editar este arquivo e mexer num número tem de refazer a consulta. O caderno
// de contexto que originou o ensaio impõe isso em uma linha: número interno só
// entra se puder ser sustentado.
//
// CAPA. Não é foto nem ilustração: é o próprio acervo desenhado. Cada tracinho é
// um dos 3.132 arquivos com áudio, na ordem real do índice, colorido pelo que a
// máquina ouviu DENTRO dele (pergaminho = fala em português, âmbar = fala em
// inglês, cinza = os outros 16 idiomas, quase preto = os 879 sem fala nenhuma).
// O quase preto é o conserto de 23/08/2026: sem separar o silêncio, o âmbar dobra
// e o campo mente dizendo metade em inglês.
// A grade é 87 x 36, que é exatamente 3.132: nenhuma célula é enfeite. Gerador em
// `TBF SYSTEM/operacao/acervo/gerar-capa-substrato.py`, que reproduz o arquivo
// publicado byte a byte.
// =============================================================================
//
// REVISAO ANTI-IA, 2026-08-24 (skill `/humanizar`). O fundador leu a pagina e
// disse que o ritmo, a argumentacao e o desenvolvimento eram de maquina. O
// detector de vocabulario deu LIMPO: o problema nunca foi palavra, foi forma.
// O que mudou, e por que:
//   1. NEGRITO de 37 linhas para 12 (de 36% do texto para 12%). 22 dos 24
//      blocos carregavam `emphasize`, quase sempre na 2a linha e na ultima. O
//      olho aprende a batida em trinta segundos e para de ler.
//   2. ANTITESE. A figura "X nao e Y, e Z" aparecia 12 vezes. Ela e o tique
//      retorico numero um de LLM. Sobraram as que o DISPOSITIVO pede (o bloco
//      `negation`) e as duas que sao tese de capitulo.
//   3. AFORISMO DE TELA CHEIA de 5 para 3. Cada capitulo fechava num, sempre
//      no mesmo lugar. Sairam "Ter nao e saber" (redundante logo apos quatro
//      pares de negacao) e "A homogeneizacao e problema de fonte".
//   4. ANUNCIO META cortado: "vale dizer em voz alta", "dita sem rodeio", "a
//      parte que ninguem diz", "fique um segundo com", "quatro palavras em que
//      o resto deste ensaio se apoia". Texto que comenta a propria estrutura.
//   5. FOLEGO. Todo bloco tinha 4 ou 5 linhas de 8 a 14 palavras. Agora ha
//      blocos de 2 e frases longas com subordinada, para a leitura variar.
//   6. FECHO. O `closing` repetia o `deck` quase palavra por palavra. Agora
//      termina no passo quatro, que o proprio texto admite estar aberto.
// NENHUM NUMERO, NOME OU FATO FOI ALTERADO.
//
// O QUE NAO FOI CONSERTADO, e depende dele: o ensaio fala de 370.700 palavras
// transcritas e nao cita UMA. Texto sobre uma descoberta que nao mostra a
// descoberta le como maquina por mais limpo que fique o ritmo. Falta uma frase
// real dita dentro de um daqueles arquivos. Inventar uma e proibido.
// =============================================================================

import type { ManifestoArticle } from './types'

export const theLabelThatLearnedToAskItself: ManifestoArticle = {
  slug: 'the-label-that-learned-to-ask-itself',
  loaderTitle: { en: 'THE LABEL THAT LEARNED', pt: 'A LABEL QUE APRENDEU' },
  heroTitle: {
    en: 'THE LABEL THAT LEARNED TO ASK ITSELF.',
    pt: 'A LABEL QUE APRENDEU A SE PERGUNTAR.',
  },
  heroSubtitle: {
    en: 'A one year old label pointed a machine at an archive seven years older than itself. This is what came back.',
    pt: 'Uma label de um ano apontou uma máquina para um acervo sete anos mais velho que ela. Foi isto que voltou.',
  },
  category: 'Coolhunting',
  publishedAt: '2026-08-23',
  deck: {
    en: 'AI handed everyone the same tools. So the advantage went back to being repertoire. The difference is that now you can build one.',
    pt: 'A IA entregou a todo mundo as mesmas ferramentas. Então a vantagem voltou a ser o repertório. A diferença é que agora dá para construir um.',
  },
  cover: {
    src: '/images/editorial/substrato-capa.webp',
    alt: {
      en: 'Field of 3,132 marks, one per audio file in the archive, coloured by what the machine heard inside it.',
      pt: 'Campo de 3.132 marcas, uma por arquivo com áudio do acervo, colorido pelo que a máquina ouviu dentro dele.',
    },
    credit: '.TBF. inc',
  },

  // ===========================================================================
  // ESCOLHA DE DISPOSITIVO, e ela é a diferença entre ensaio e slideshow.
  //
  // `pinned` (PinnedIntro) tem 180vh no telefone e 250vh no desktop, e o filho
  // fica grudado na tela o tempo todo. É o dispositivo da TESE: o piloto usa
  // exatamente um. Uma montagem anterior deste ensaio usou nove, e virou parede
  // de preto entre parágrafos gigantes, com a página em 72.000px de altura.
  //
  // Aqui: UM `pinned`, a abertura. (Eram dois; o segundo, a virada de autoria,
  // caiu em 23/08/2026, ver o comentario do CAPITULO 6.) O corpo anda em
  // `lines` (cascata compacta, uma ideia por linha), as viradas em `fullbleed`
  // (100vh) e os capítulos em `word` (60vh).
  //
  // DIDÁTICA (pedido do fundador, 2026-08-23): a 1ª versão abria em "uma máquina
  // ouviu tudo que esta casa gravou", sem dizer que máquina, que casa, nem por
  // quê. Esta abre nomeando: quem é a .TBF., quanto acervo é, qual ferramenta,
  // rodando onde, e o que se queria com isso. Cada conceito (acervo, repertório,
  // guard, índice) é explicado no parágrafo em que passa a ser útil, nunca antes.
  // ===========================================================================
  blocks: [
    // ─── CAPÍTULO 0: O CONTEXTO. Antes da cena, o leitor precisa saber onde
    //     está. Nomes, números e ferramentas, sem metáfora.
    {
      kind: 'pinned',
      kicker: { en: 'SAO PAULO, AUGUST 2026', pt: 'SÃO PAULO, AGOSTO DE 2026' },
      text: {
        en: 'The .TBF. is a creative label in Sao Paulo, and it turned one year old in June. Its archive is older than the label itself: seven years of its founder working, researching and collecting, from before there was a company to keep any of it.',
        pt: 'A .TBF. é uma label criativa de São Paulo, e ela fez um ano em junho. O acervo dela é mais velho que ela: sete anos do fundador trabalhando, pesquisando e juntando repertório, de antes de existir uma empresa para guardar aquilo.',
      },
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Thirteen thousand files: photographs, videos, screen grabs, recorded meetings.', pt: 'Treze mil arquivos: fotografia, vídeo, print de tela, reunião gravada.' },
        { en: 'One night in August we put a machine to listen to all of them.', pt: 'Numa noite de agosto colocamos uma máquina para ouvir todos eles.' },
        { en: 'Nobody had ever heard the whole archive, and the reason is dull:', pt: 'Ninguém nunca tinha ouvido esse acervo inteiro, e o motivo é chato:' },
        { en: 'it is forty three hours of people talking. Nobody has that lying around.', pt: 'são quarenta e três horas de gente falando. Ninguém tem esse tempo sobrando.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The tool was Whisper, an open transcription model, running inside our own Mac.', pt: 'A ferramenta foi o Whisper, modelo aberto de transcrição, rodando dentro do nosso Mac.' },
        { en: 'No cloud: nothing left the machine.', pt: 'Sem nuvem: nada saiu da máquina.' },
        { en: 'It started at eleven at night and finished at six in the morning.', pt: 'Começou às onze da noite e terminou às seis da manhã.' },
        { en: 'It read the 3,132 files that had audio in them, and failed on none.', pt: 'Leu os 3.132 arquivos que tinham áudio dentro, e não falhou em nenhum.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'What we wanted was modest: to be able to search inside what was said.', pt: 'O que a gente queria era modesto: poder buscar dentro do que foi dito.' },
        { en: 'What came back was something else.', pt: 'O que voltou foi outra coisa.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'stat',
      value: 1382,
      formatted: { en: '1,382', pt: '1.382' },
      label: { en: 'files spoken in Portuguese', pt: 'arquivos falados em português' },
    },
    {
      kind: 'stat',
      value: 798,
      formatted: { en: '798', pt: '798' },
      label: { en: 'files spoken in English', pt: 'arquivos falados em inglês' },
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Nobody at the .TBF. knew the second number existed.', pt: 'Ninguém na .TBF. sabia que o segundo número existia.' },
        { en: 'Almost eight hours of it. And sixteen other languages underneath.', pt: 'Quase oito horas dele. E outros dezesseis idiomas embaixo.' },
      ],
      emphasize: [0],
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'One in every seven words said out loud here was said in English.',
        pt: 'Uma em cada sete palavras ditas em voz alta aqui foi dita em inglês.',
      },
      theme: 'dark',
    },
    {
      kind: 'lines',
      lines: [
        { en: 'That is not accent. It is work calls, classes, interviews, ideas said out loud on the way home.', pt: 'Isso não é sotaque. São reuniões de trabalho, aula, entrevista, ideia dita em voz alta no caminho de casa.' },
        { en: 'Seven years of recording like that, and nobody had noticed.', pt: 'Sete anos gravando assim, e ninguém tinha percebido.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'It changes decisions that were already on the table:', pt: 'Isso muda decisões que já estavam na mesa:' },
        { en: 'which language a piece is born in, which market a product opens in,', pt: 'em que idioma uma peça nasce, em que mercado um produto abre,' },
        { en: 'and who this label was already talking to without noticing.', pt: 'e com quem esta label já estava falando sem ter percebido.' },
        { en: 'No hunch was ever going to arrive at that number.', pt: 'Nenhum palpite ia chegar nesse número.' },
      ],
    },

    // ─── CAPÍTULO 1: ACERVO. Aqui o texto separa as quatro palavras que o resto
    //     do ensaio usa. Nenhuma delas aparece antes deste ponto sem explicação.
    { kind: 'word', label: { en: 'ARCHIVE', pt: 'ACERVO' }, theme: 'dark' },
    {
      kind: 'image',
      src: '/images/editorial/substrato-capa.webp',
      alt: {
        en: 'Field of 3,132 marks, one per audio file, coloured by what was said inside it.',
        pt: 'Campo de 3.132 marcas, uma por arquivo com áudio, colorido pelo que foi dito dentro dele.',
      },
      caption: {
        en: 'This is the finding, drawn. Every mark is one file: parchment for speech in Portuguese, amber for speech in English, grey for the other sixteen languages, and near black for the 879 files where nobody speaks at all. The grid is 87 by 36, which is exactly 3,132, so no cell is decoration. Made by a script that reads the database, not by hand.',
        pt: 'Este é o achado, desenhado. Cada marca é um arquivo: pergaminho para fala em português, âmbar para fala em inglês, cinza para os outros dezesseis idiomas, e quase preto para os 879 arquivos em que ninguém fala nada. A grade é 87 por 36, que dá exatamente 3.132, então nenhuma célula é enfeite. Feito por um script que lê o banco, não à mão.',
      },
      credit: '.TBF. inc',
      variant: 'plate',
      width: 2400,
      height: 1600,
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The files had always been there, thirteen thousand of them, across seven years and four business units.', pt: 'Os arquivos sempre estiveram ali, treze mil deles, atravessando sete anos e quatro unidades de negócio.' },
        { en: 'That night we gained no files at all. We gained the question.', pt: 'Naquela noite não ganhamos arquivo nenhum. Ganhamos a pergunta.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Before, you opened folders and tried to remember filenames.', pt: 'Antes você abria pasta e tentava lembrar nome de arquivo.' },
        { en: 'Now you type "show me the starred photos from the client" and the archive answers.', pt: 'Agora você digita "me mostra as fotos marcadas do cliente" e o acervo responde.' },
        { en: 'It looks inside what was said and inside what is written on screen.', pt: 'Ela olha dentro do que foi dito e dentro do que está escrito na tela.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Four words the rest of this text uses as if they were obvious, and they are not:', pt: 'Quatro palavras que o resto do texto usa como se fossem óbvias, e não são:' },
      ],
    },
    {
      kind: 'negation',
      pairs: [
        [
          { en: 'An archive is not a repertoire.', pt: 'Acervo não é repertório.' },
          { en: 'An archive is what you kept. A repertoire is being able to relate it.', pt: 'Acervo é o que você guardou. Repertório é conseguir relacionar.' },
        ],
        [
          { en: 'A repertoire is not a collection.', pt: 'Repertório não é coleção.' },
          { en: 'It is noticing a connection that is not obvious yet.', pt: 'É perceber uma conexão que ainda não está evidente.' },
        ],
        [
          { en: 'A substrate is not a folder.', pt: 'Substrato não é pasta.' },
          { en: 'It is archive, memory and criteria arranged so a decision can stand on them.', pt: 'É acervo, memória e critério arrumados para uma decisão ficar de pé em cima.' },
        ],
        [
          { en: 'Infrastructure is not the tool.', pt: 'Infraestrutura não é a ferramenta.' },
          { en: 'It is what keeps that ground alive after the excitement passes.', pt: 'É o que mantém esse chão vivo depois que a empolgação passa.' },
        ],
      ],
    },
    // ─── CAPÍTULO 2: O DIAGNÓSTICO. A ponte entre o caso da casa e o problema
    //     que todo mundo no mercado está vivendo.
    { kind: 'word', label: { en: 'THE SAMENESS', pt: 'A IGUALDADE' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'Step out of our night for a moment, because the point is not the night.', pt: 'Sai da nossa noite um instante, porque o ponto não é a noite.' },
        { en: 'That the tools became the same for everyone, everyone has already said, and it is true.', pt: 'Que as ferramentas ficaram iguais para todo mundo, todo mundo já disse, e é verdade.' },
        { en: 'The inputs became the same too, and nobody talks about that.', pt: 'Os insumos também ficaram iguais, e disso ninguém fala.' },
      ],
    },
    {
      kind: 'mirror',
      before: [
        { en: 'The same public corpus.', pt: 'O mesmo corpus público.' },
        { en: 'The same references, three clicks deep.', pt: 'As mesmas referências, a três cliques.' },
        { en: 'The same trend report, read by everyone.', pt: 'O mesmo relatório de tendência, lido por todos.' },
        { en: 'The same question, phrased the same way.', pt: 'A mesma pergunta, formulada do mesmo jeito.' },
      ],
      after: [
        { en: 'Seven years of recordings nobody else has.', pt: 'Sete anos de gravação que mais ninguém tem.' },
        { en: 'What we refused, and the day we refused it.', pt: 'O que a gente recusou, e o dia em que recusou.' },
        { en: 'The first client, who is still a client.', pt: 'O primeiro cliente, que ainda é cliente.' },
        { en: 'Our mistakes, dated and kept.', pt: 'Nossos erros, datados e guardados.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Everyone feeds the machine the column on the left, and the machine hands back the average.', pt: 'Todo mundo dá a coluna da esquerda de comer para a máquina, e a máquina devolve a média.' },
        { en: 'The one on the right only we have.', pt: 'A da direita só nós temos.' },
        { en: 'Nobody escapes the average by writing a prettier prompt.', pt: 'Ninguém escapa da média escrevendo um prompt mais bonito.' },
      ],
    },

    // ─── CAPÍTULO 3: CRITÉRIO. Da pesquisa para o pensamento. Explica o que é
    //     um guard antes de usar a palavra.
    { kind: 'word', label: { en: 'CRITERION', pt: 'CRITÉRIO' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'Feeding the machine our own archive was half the job.', pt: 'Dar o acervo de comer à máquina foi metade do trabalho.' },
        { en: 'The other half is teaching it what this label refuses, and that is where it gets hard:', pt: 'A outra metade é ensinar a ela o que esta label recusa, e aí começa o problema:' },
        { en: 'a manifesto is memory, and memory fails at some rate, always quietly.', pt: 'manifesto é memória, e memória falha a alguma taxa, sempre em silêncio.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'So here the rules stopped being remembered and started being run.', pt: 'Então aqui as regras deixaram de ser lembradas e passaram a ser rodadas.' },
        { en: 'A GUARD is a small script that sits between the work and the world.', pt: 'GUARD é um script pequeno que fica entre o trabalho e o mundo.' },
        { en: 'It reads what is about to be written and refuses what breaks a house rule.', pt: 'Ele lê o que está prestes a ser escrito e recusa o que quebra uma regra.' },
        { en: 'One refuses the wrong dash. One closes the road to production.', pt: 'Um recusa o traço errado. Outro fecha o caminho para produção.' },
        { en: 'One counts how many of our rules are code, and how many are still hope.', pt: 'Outro conta quantas das nossas regras são código, e quantas ainda são só esperança.' },
      ],
      emphasize: [4],
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'Culture that does not become code is decoration.',
        pt: 'Cultura que não vira código é decoração.',
      },
      theme: 'light',
    },
    {
      kind: 'lines',
      lines: [
        { en: 'With one counterweight, learned the hard way:', pt: 'Com um contrapeso, aprendido na marra:' },
        { en: 'a guard that guesses is worse than no guard at all.', pt: 'guard que chuta é pior que guard nenhum.' },
        { en: 'One of ours rang on a file that had only been read, not written.', pt: 'Um dos nossos tocou num arquivo que só tinha sido lido, não escrito.' },
        { en: 'An alarm that rings on the wrong file teaches everyone to ignore alarms.', pt: 'Alarme que toca no arquivo errado ensina todo mundo a ignorar alarme.' },
        { en: 'So a new rule only enters if it is born with a test, or retires another one.', pt: 'Então regra nova só entra se nascer com teste, ou se aposentar outra.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The oldest rule here is the cheapest one:', pt: 'A regra mais antiga daqui é a mais barata:' },
        { en: 'a signal that already exists beats a new signal.', pt: 'sinal que já existe vence sinal novo.' },
        { en: 'Cameras already write the date, the lens, the coordinates.', pt: 'A câmera já escreve a data, a lente, as coordenadas.' },
        { en: 'Before paying a machine to invent a signal, exhaust the free one.', pt: 'Antes de pagar uma máquina para inventar sinal, esgote o que é de graça.' },
        { en: 'And what was cut is information too.', pt: 'E o que foi cortado também é informação.' },
      ],
    },

    // ─── CAPÍTULO 4: O ERRO. O contrapeso do ensaio inteiro, e ele é honesto:
    //     o defeito nasceu no MESMO lote que a descoberta.
    { kind: 'word', label: { en: 'THE ERROR', pt: 'O ERRO' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'The same night the archive learned to answer, it also lied.', pt: 'Na mesma noite em que o acervo aprendeu a responder, ele também mentiu.' },
        { en: 'A file name with an accent can be stored two different ways.', pt: 'Nome de arquivo com acento pode ser guardado de dois jeitos diferentes.' },
        { en: 'Our database used one. The script feeding it used the other.', pt: 'Nosso banco usava um. O script que o alimentava usava o outro.' },
        { en: 'On screen they are identical. Byte by byte they are not.', pt: 'Na tela eles são idênticos. Byte a byte, não.' },
      ],
      emphasize: [0],
    },
    {
      kind: 'stat',
      value: 44,
      formatted: { en: '44', pt: '44' },
      label: {
        en: 'files that got their text and stayed invisible to the search',
        pt: 'arquivos que ganharam o texto e continuaram invisíveis para a busca',
      },
    },
    {
      kind: 'lines',
      lines: [
        { en: 'We caught it before the batch was applied, and fixed it.', pt: 'A gente pegou antes de aplicar o lote, e consertou.' },
        { en: 'Had we not, a search for those files would have returned nothing, and nothing looks exactly like an absence.', pt: 'Se não tivesse pego, a busca por esses arquivos devolveria nada, e nada se parece exatamente com uma ausência.' },
        { en: 'We would have concluded the archive was empty in the place where it was fullest.', pt: 'Teríamos concluído que o acervo era vazio justo no lugar onde ele era mais cheio.' },
      ],
      emphasize: [2],
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'When execution gets cheap, the expensive mistake is trusting a number you cannot explain.',
        pt: 'Quando executar fica barato, o erro caro é confiar num número que você não sabe explicar.',
      },
      theme: 'dark',
    },

    // ─── CAPÍTULO 5: EXECUÇÃO. A cadeia, com cada passo explicado, e o ponto
    //     exato em que as casas morrem.
    { kind: 'word', label: { en: 'EXECUTION', pt: 'EXECUÇÃO' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'From noticing something to selling something there are seven steps.', pt: 'De notar uma coisa até vender uma coisa existem sete passos.' },
      ],
    },
    {
      kind: 'stickers',
      fragments: [
        { en: 'SIGNAL', pt: 'SINAL' },
        { en: 'RESEARCH', pt: 'PESQUISA' },
        { en: 'CROSS-CHECK', pt: 'CONFERÊNCIA' },
        { en: 'INTERPRET', pt: 'INTERPRETAÇÃO' },
        { en: 'SYNTHESISE', pt: 'SÍNTESE' },
        { en: 'BUILD', pt: 'CONSTRUÇÃO' },
        { en: 'MARKET', pt: 'MERCADO' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Something catches the eye. You go looking. You check it against another source.', pt: 'Alguma coisa chama atenção. Você vai investigar. Você confere com outra fonte.' },
        { en: 'You say what it means. You turn that into one hypothesis. You build a test. It circulates.', pt: 'Você diz o que aquilo significa. Vira uma hipótese. Você constrói um teste. Aquilo circula.' },
        { en: 'Machines are good at one, two, three and six.', pt: 'A máquina é boa no um, no dois, no três e no seis.' },
        { en: 'Labels die between four and five, where somebody has to say what the finding means.', pt: 'As labels morrem entre o quatro e o cinco, onde alguém precisa dizer o que o achado significa.' },
      ],
      emphasize: [3],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Our own night is the example. Steps one to three took seven hours of machine.', pt: 'A nossa noite é o exemplo. Os passos um a três levaram sete horas de máquina.' },
        { en: 'Step four, deciding what a bilingual archive means for this label, is still open.', pt: 'O passo quatro, decidir o que um acervo bilíngue significa para esta label, segue aberto.' },
        { en: 'Producing got cheap. Choosing got expensive.', pt: 'Produzir ficou barato. Escolher ficou caro.' },
        { en: 'The bottleneck moved, and most people still guard the old one.', pt: 'O gargalo mudou de lugar, e a maioria ainda vigia o antigo.' },
      ],
      emphasize: [1],
    },

    // ─── CAPÍTULO 6: AUTORIA.
    //     NAO EXISTE MAIS o bloco 'VOCE ESTA DENTRO DA PROVA', que dizia que a
    //     pagina ser bilingue era consequencia do achado do acervo. Cortado pelo
    //     fundador em 23/08/2026 por sensacionalismo: o site e dual language por
    //     decisao tomada muito antes da pauta do media package, e amarrar uma
    //     coisa na outra e inventar causa. Nao reintroduzir.
    { kind: 'word', label: { en: 'AUTHORSHIP', pt: 'AUTORIA' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'The whole method is smaller than it sounds: point the machine at what is yours,', pt: 'O método inteiro é menor do que parece: apontar a máquina para o que é seu,' },
        { en: 'write the criteria down as code, check every number before believing it,', pt: 'escrever os critérios como código, conferir todo número antes de acreditar nele,' },
        { en: 'and spend the hours you saved on the part that is still human.', pt: 'e gastar as horas que sobraram na parte que continua humana.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Because the machine does not choose.', pt: 'Porque a máquina não escolhe.' },
        { en: 'It does not know what this label refuses.', pt: 'Ela não sabe o que esta label recusa.' },
        { en: 'It has no provenance, and provenance cannot be generated.', pt: 'Ela não tem procedência, e procedência não se gera.' },
        { en: 'It widens the field. Somebody still has to frame the shot.', pt: 'Ela amplia o campo. Alguém ainda tem que enquadrar.' },
      ],
      emphasize: [3],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'What matters?', pt: 'O que importa?' },
        { en: 'Why does it matter now?', pt: 'Por que importa agora?' },
        { en: 'What connection is nobody seeing?', pt: 'Qual conexão ninguém está vendo?' },
        { en: 'Which idea deserves to be built?', pt: 'Qual ideia merece virar execução?' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Four questions no model answers for you. They are the whole job.', pt: 'Quatro perguntas que modelo nenhum responde por você. Elas são o trabalho inteiro.' },
        { en: 'Everything automated here was automated so these four would get the hours they never had.', pt: 'Tudo que foi automatizado aqui foi automatizado para que essas quatro ganhassem as horas que nunca tiveram.' },
      ],
      emphasize: [0],
    },

    {
      kind: 'closing',
      text: {
        en: 'The archive has answered the part it could answer. Step four is still ours.',
        pt: 'O acervo já respondeu a parte que cabia a ele. O passo quatro continua sendo nosso.',
      },
    },
  ],
}
