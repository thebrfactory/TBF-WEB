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
// 2026-08-23 e reconferidos em 2026-08-24:
//
//   3.132     transcrições geradas       select count(*) from transcricoes
//   43,0 h    duração somada             select sum(dur)/3600 from transcricoes
//   370.700   palavras ditas             sum(palavras) where veredito='FALA'
//   1.382     arquivos falados em pt     where veredito='FALA' group by idioma
//     798     arquivos falados em ingles  idem
//    55.260   dessas palavras, em ingles = 14,9%, um setimo
//
// TODA CONTA DE IDIOMA FILTRA veredito='FALA'. Sem o filtro, o Whisper etiqueta
// 'en' por padrao no que nao tem ninguem falando (575 arquivos mudos), e o
// ingles infla ate parecer metade do acervo. Nao e. Travado em 23/08/2026.
//   18        idiomas distintos          count(distinct idioma)
//   13.267    itens catalogados          select count(*) from itens
//   7 anos    span do ACERVO             min/max de `data` em itens: 2019 a 2026
//   4         unidades de negócio        TAVARÍSTICO, Ô DE CASA, TBF, RUC
//   Whisper   modelo da transcrição      mlx-community/whisper-large-v3-turbo,
//                                        MLX, rodando local no Mac (sem nuvem)
//   44        itens invisíveis (NFD/NFC) registrado em _extract/MAPA-EXTRACAO.md
//
// A PROCEDENCIA DA FALA, medida em 24/08/2026 pela coluna `natureza` do catalogo,
// que ja existia e separa o que veio de fora do que saiu da camera da casa:
//
//   REFERENCIA (reel, podcast e aula salvos de fora) .... 202.398 palavras  54,6%
//   ESTUDO (curso e tutorial de terceiro) ...............  94.543 palavras  25,5%
//   PLAYBOOK (material de campanha e processo) ..........  48.319 palavras  13,0%
//   ACERVO FACTORY (nossa camera) ......................   14.135 palavras   3,8%
//   sem classificacao ..................................   11.136 palavras   3,0%
//
// Em HORAS, na mesma base (veredito='FALA', que soma 38,03 h das 43,02 h de audio
// transcrito): REFERENCIA 19,4 + ESTUDO 9,4 + PLAYBOOK 5,2 = 34,0 h de fora, contra
// 2,5 h de ACERVO FACTORY e 1,5 h sem classificacao. ATENCAO: o `_extract/
// MAPA-EXTRACAO.md` traz "39 das 43 horas" porque conta a DURACAO DO VIDEO na
// triagem, antes do corte de quem nao fala. As duas contas estao certas e NAO se
// misturam. O artigo roda inteiro na base FALA. No ingles o desequilibrio e ainda
// maior: 50.582 das 55.260 palavras ditas em ingles sao material salvo, nao
// alguem da .TBF. falando.
//
// A IDADE DA LABEL NAO E A IDADE DO ACERVO, e confundir as duas foi o erro da
// versao anterior, corrigido pelo fundador em 23/08/2026. A .TBF. fez UM ANO em
// junho de 2026. Os sete anos sao de arquivo DELE, de trabalho, pesquisa e
// repertorio, anteriores a existencia da empresa. O texto diz as duas coisas de
// proposito, porque a diferenca entre elas E a tese: uma label de um ano que
// comeca com sete anos de substrato nao comeca do zero. Nao reescrever isso para
// "sete anos de .TBF."
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
// REVISAO ANTI-IA 1, 2026-08-24 madrugada (skill `/humanizar`). O detector de
// vocabulario deu LIMPO: o problema nunca foi palavra, foi forma. Negrito de 37
// linhas para 12, antitese "X nao e Y, e Z" de 12 para 3, aforismo de tela cheia
// de 5 para 3, anuncio meta cortado, folego variado, fecho que repetia o deck
// refeito.
//
// REVISAO 2, 2026-08-24 (mesma skill, pedido dele: "o artigo inteiro precisa ser
// mais conciso e eu vejo tracos de IA em toda a leitura"). Esta passada mexeu na
// TESE, nao so na forma, e por um motivo de fato:
//
//   1. O ARTIGO AFIRMAVA UMA COISA QUE O BANCO DESMENTE. A versao anterior lia o
//      numero do ingles como "reuniao de trabalho, aula, entrevista, ideia dita
//      no caminho de casa" e concluia "com quem esta label ja estava falando sem
//      ter percebido". Conferido arquivo por arquivo: 50.582 das 55.260 palavras
//      em ingles sao material SALVO, e os 20 maiores arquivos em ingles do acervo
//      inteiro sao TikTok de direcao de arte, tutorial de After Effects, reel de
//      vendas e uma reza em hebraico. Os poucos clipes em ingles filmados pela
//      propria camera sao MUSICA TOCANDO AO FUNDO DE FESTA. O ingles nao e com
//      quem a .TBF. fala, e o que a .TBF. assiste. Frase trocada.
//   2. O ACHADO MAIOR ESTAVA EMBAIXO DESSE. Se 39 das 43 horas de fala vieram de
//      fora, o ensaio tem um numero muito mais duro do que o do idioma, e ele
//      contradiz o proprio capitulo A IGUALDADE: a coluna da direita existe, mas
//      e pequena. O texto agora diz isso, com o numero, e vira confissao em vez
//      de sermao. Esse era o "traco de IA" mais grave da peca: a tese confortavel.
//   3. CORTES. Saiu a cadeia de SETE PASSOS (`stickers` SINAL...MERCADO) com o
//      paragrafo que a explicava: framework generico, de infoproduto, que nao
//      dizia nada que os numeros do proprio ensaio ja nao digam. Sairam as QUATRO
//      PERGUNTAS retoricas do fim, pelo mesmo motivo, e no lugar delas entrou a
//      UNICA pergunta que o acervo produziu de verdade. O bloco `negation` caiu
//      de 4 pares para 2: "substrato" e "infraestrutura" eram definidos e nunca
//      mais usados. Sairam as tres linhas que anunciavam a propria estrutura
//      ("Sai da nossa noite um instante", "Quatro palavras que o resto do texto
//      usa", "O metodo inteiro e menor do que parece"). O capitulo EXECUCAO foi
//      dissolvido dentro de AUTORIA.
//   4. A CITACAO QUE FALTAVA ENTROU. O ensaio falava de 370.700 palavras e nao
//      citava uma. Agora fecha numa frase real, gravada em 27/03/2025
//      (`IMG_1779.MOV`, pasta TAVARISTICO, 98 s), achada por uma busca que so
//      passou a existir em agosto de 2026.
//      🔴 PENDENTE DO FUNDADOR: QUEM fala nessa gravacao. O texto nao atribui a
//      ninguem de proposito, porque atribuir no chute e proibido pela skill. Se
//      ele der o nome, entra.
// NENHUM NUMERO FOI INVENTADO OU ARREDONDADO NESTA PASSADA.
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
    en: 'AI handed everyone the same tools. So the advantage went back to being repertoire. Then the archive answered how much of ours was actually ours.',
    pt: 'A IA entregou a todo mundo as mesmas ferramentas. Então a vantagem voltou a ser o repertório. Aí o acervo respondeu quanto do nosso era nosso mesmo.',
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
  // caiu em 23/08/2026, ver o comentario do CAPITULO 5.) O corpo anda em
  // `lines` (cascata compacta, uma ideia por linha), as viradas em `fullbleed`
  // (100vh) e os capítulos em `word` (60vh).
  //
  // DIDÁTICA (pedido do fundador, 2026-08-23): a 1ª versão abria em "uma máquina
  // ouviu tudo que esta casa gravou", sem dizer que máquina, que casa, nem por
  // quê. Esta abre nomeando: quem é a .TBF., quanto acervo é, qual ferramenta,
  // rodando onde, e o que se queria com isso. Concisao NAO revoga isso: a
  // passada de 24/08 cortou palavra, nunca o que ele mandou nomear.
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
        { en: 'Nobody had ever heard the whole archive. It is forty three hours of audio.', pt: 'Ninguém nunca tinha ouvido esse acervo inteiro. São quarenta e três horas de áudio.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The tool was Whisper, an open transcription model, running inside our own Mac. No cloud.', pt: 'A ferramenta foi o Whisper, modelo aberto de transcrição, rodando dentro do nosso Mac. Sem nuvem.' },
        { en: 'It started at eleven at night and finished at six in the morning.', pt: 'Começou às onze da noite e terminou às seis da manhã.' },
        { en: 'It read the 3,132 files that had audio in them, and failed on none.', pt: 'Leu os 3.132 arquivos que tinham áudio dentro, e não falhou em nenhum.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'We wanted to be able to search inside what was said.', pt: 'A gente queria poder buscar dentro do que foi dito.' },
        { en: 'What came back was a problem.', pt: 'O que voltou foi um problema.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'stat',
      value: 370700,
      formatted: { en: '370,700', pt: '370.700' },
      label: { en: 'words said out loud across seven years', pt: 'palavras ditas em voz alta em sete anos' },
    },
    {
      kind: 'stat',
      value: 14135,
      formatted: { en: '14,135', pt: '14.135' },
      label: { en: 'of them said into our own camera', pt: 'dessas, ditas para a nossa própria câmera' },
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Thirty four of the thirty eight spoken hours came from people who do not work here.', pt: 'Trinta e quatro das trinta e oito horas faladas saíram de gente que não trabalha aqui.' },
        { en: 'Saved reels, courses by other people, podcasts, tutorials.', pt: 'Reel salvo, curso de terceiro, podcast, tutorial.' },
        { en: 'Our own camera accounts for two and a half hours.', pt: 'A nossa própria câmera responde por duas horas e meia.' },
        { en: 'What it films is a party, a shoot, a trip. Gesture, not speech.', pt: 'O que ela filma é festa, ensaio, viagem. Gesto, não frase.' },
      ],
      emphasize: [0],
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'We built an archive of our own voice and found somebody else talking in it.',
        pt: 'A gente montou um acervo da própria voz e achou outra pessoa falando dentro dele.',
      },
      theme: 'dark',
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Inside those hours, one in every seven words was said in English.', pt: 'Dentro dessas horas, uma em cada sete palavras foi dita em inglês.' },
        { en: 'Nobody at the .TBF. knew that number existed.', pt: 'Ninguém na .TBF. sabia que esse número existia.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'And the English is almost all borrowed: 50,582 of those 55,260 words are saved material.', pt: 'E o inglês é quase todo emprestado: 50.582 daquelas 55.260 palavras são material salvo.' },
        { en: 'Art direction on TikTok, an After Effects tutorial, a sales reel, a prayer in Hebrew.', pt: 'Direção de arte no TikTok, tutorial de After Effects, reel de vendas, uma reza em hebraico.' },
        { en: 'The few English clips our own camera shot are music playing at a party.', pt: 'Os poucos clipes em inglês que saíram da nossa câmera são música tocando numa festa.' },
        { en: 'It is not who this label was talking to. It is what this label watches.', pt: 'Não é com quem esta label estava falando. É o que esta label assiste.' },
      ],
      emphasize: [3],
    },

    // ─── CAPÍTULO 1: ACERVO. As duas palavras que o resto do ensaio usa como se
    //     fossem a mesma. Eram quatro; substrato e infraestrutura sairam em
    //     24/08/2026 porque o texto as definia e nunca mais voltava a elas.
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
      ],
    },

    // ─── CAPÍTULO 2: O DIAGNÓSTICO. Era o capitulo mais fraco do ensaio: a tese
    //     de que "as ferramentas ficaram iguais" e a que todo mundo escreve. Em
    //     24/08/2026 ele passou a ser sustentado pelo numero da propria casa, que
    //     custa: a coluna da direita existe e e pequena.
    { kind: 'word', label: { en: 'THE SAMENESS', pt: 'A IGUALDADE' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'Everyone says AI made the tools the same. It made the inputs the same too.', pt: 'Todo mundo diz que a IA igualou as ferramentas. Igualou os insumos também.' },
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
        { en: 'The one on the right only we have. Our own tape says it fits in 14,135 words.', pt: 'A da direita só nós temos. A nossa própria fita diz que ela cabe em 14.135 palavras.' },
        { en: 'We spend the day on the left like everybody else. We just had it written down.', pt: 'A gente passa o dia na esquerda como todo mundo. A diferença é que ficou escrito.' },
        { en: 'Nobody escapes the average by writing a prettier prompt.', pt: 'Ninguém escapa da média escrevendo um prompt mais bonito.' },
      ],
      emphasize: [1],
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
        { en: 'One refuses the wrong dash. One closes the road to production.', pt: 'Um recusa o traço errado. Outro fecha o caminho para produção.' },
        { en: 'One counts how many of our rules are code, and how many are still hope.', pt: 'Outro conta quantas das nossas regras são código, e quantas ainda são só esperança.' },
      ],
      emphasize: [3],
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
        { en: 'With one counterweight, learned the hard way: a guard that guesses is worse than no guard at all.', pt: 'Com um contrapeso, aprendido na marra: guard que chuta é pior que guard nenhum.' },
        { en: 'One of ours rang on a file that had only been read, not written.', pt: 'Um dos nossos tocou num arquivo que só tinha sido lido, não escrito.' },
        { en: 'An alarm that rings on the wrong file teaches everyone to ignore alarms.', pt: 'Alarme que toca no arquivo errado ensina todo mundo a ignorar alarme.' },
        { en: 'So a new rule only enters if it is born with a test, or retires another one.', pt: 'Então regra nova só entra se nascer com teste, ou se aposentar outra.' },
      ],
      emphasize: [0],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The oldest rule here is the cheapest: a signal that already exists beats a new signal.', pt: 'A regra mais antiga daqui é a mais barata: sinal que já existe vence sinal novo.' },
        { en: 'Cameras already write the date, the lens, the coordinates.', pt: 'A câmera já escreve a data, a lente, as coordenadas.' },
        { en: 'The column that told us whose voice this was had been sitting in the catalogue the whole time.', pt: 'A coluna que disse de quem era aquela voz estava parada no catálogo o tempo todo.' },
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

    // ─── CAPÍTULO 5: AUTORIA.
    //     NAO EXISTE MAIS o bloco 'VOCE ESTA DENTRO DA PROVA', que dizia que a
    //     pagina ser bilingue era consequencia do achado do acervo. Cortado pelo
    //     fundador em 23/08/2026 por sensacionalismo: o site e dual language por
    //     decisao tomada muito antes da pauta do media package, e amarrar uma
    //     coisa na outra e inventar causa. Nao reintroduzir.
    //     Em 24/08/2026 o antigo capitulo EXECUCAO foi dissolvido aqui dentro: a
    //     cadeia de sete passos era framework generico e as tres linhas que
    //     sobreviveram sao as unicas que diziam alguma coisa.
    { kind: 'word', label: { en: 'AUTHORSHIP', pt: 'AUTORIA' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'The machine did seven hours of work that night.', pt: 'A máquina fez sete horas de trabalho naquela noite.' },
        { en: 'Deciding what thirty four hours of borrowed speech mean for this label is still open.', pt: 'Decidir o que trinta e quatro horas de fala emprestada significam para esta label segue aberto.' },
        { en: 'Producing got cheap. Choosing got expensive.', pt: 'Produzir ficou barato. Escolher ficou caro.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Because the machine does not choose.', pt: 'Porque a máquina não escolhe.' },
        { en: 'It has no provenance, and provenance cannot be generated.', pt: 'Ela não tem procedência, e procedência não se gera.' },
        { en: 'It widens the field. Somebody still has to frame the shot.', pt: 'Ela amplia o campo. Alguém ainda tem que enquadrar.' },
      ],
      emphasize: [2],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Recorded on 27 March 2025, inside those 370,700 words:', pt: 'Gravado em 27 de março de 2025, dentro daquelas 370.700 palavras:' },
      ],
    },
    {
      kind: 'fullbleed',
      text: {
        en: '"People keep asking how I do my work. I just answer: by paying attention."',
        pt: '"Muita gente pergunta como é que você faz seu trabalho. Eu simplesmente respondo: prestando atenção."',
      },
      theme: 'dark',
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Ninety eight seconds of tape, filed under a portrait shoot, unheard for seventeen months.', pt: 'Noventa e oito segundos de fita, arquivados dentro de um ensaio de retrato, não ouvidos por dezessete meses.' },
        { en: 'It took a machine reading forty three hours to hand back one sentence we already owned.', pt: 'Foi preciso uma máquina ler quarenta e três horas para devolver uma frase que já era nossa.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'closing',
      text: {
        en: 'The archive answered the part that was its to answer. How much of what we say is ours is not.',
        pt: 'O acervo respondeu a parte que cabia a ele. Quanto do que a gente fala é da gente, não.',
      },
    },
  ],
}
