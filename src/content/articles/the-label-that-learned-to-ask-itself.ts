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
      en: 'Field of 3,132 marks, one per spoken file in the archive, coloured by the language the machine heard.',
      pt: 'Campo de 3.132 marcas, uma por arquivo falado do acervo, colorido pelo idioma que a máquina ouviu.',
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
  // Aqui: DOIS `pinned`, a abertura e a virada de autoria. O corpo anda em
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
        { en: 'The reason was ordinary, and it is worth saying out loud:', pt: 'O motivo era banal, e vale dizer em voz alta:' },
        { en: 'nobody had ever heard that archive from end to end.', pt: 'ninguém nunca tinha ouvido esse acervo de ponta a ponta.' },
        { en: 'Nobody has forty three hours to spare.', pt: 'Ninguém tem quarenta e três horas sobrando.' },
      ],
      emphasize: [1, 3],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'THE TOOL, said plainly:', pt: 'A FERRAMENTA, dita sem rodeio:' },
        { en: 'an open transcription model, Whisper, running inside our own Mac.', pt: 'um modelo aberto de transcrição, o Whisper, rodando dentro do nosso próprio Mac.' },
        { en: 'No cloud. Nothing left the machine.', pt: 'Sem nuvem. Nada saiu da máquina.' },
        { en: 'Seven hours of processing, from eleven at night to six in the morning.', pt: 'Sete horas de processamento, das onze da noite às seis da manhã.' },
        { en: 'It read 3,132 files that had audio in them, and failed on none.', pt: 'Ela leu 3.132 arquivos que tinham áudio dentro, e não falhou em nenhum.' },
      ],
      emphasize: [2, 4],
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
        { en: 'Not accent. Not affectation.', pt: 'Não é sotaque. Não é firula.' },
        { en: 'Work calls, classes, interviews, ideas said out loud on the way somewhere.', pt: 'É reunião de trabalho, aula, entrevista, ideia dita em voz alta no caminho.' },
        { en: 'Seven years of recording like that, and nobody had noticed.', pt: 'Sete anos gravando assim, e ninguém tinha percebido.' },
      ],
      emphasize: [2],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'It changes decisions that were already on the table:', pt: 'Isso muda decisões que já estavam na mesa:' },
        { en: 'which language a piece is born in, which market a product opens in,', pt: 'em que idioma uma peça nasce, em que mercado um produto abre,' },
        { en: 'and who this label was already talking to without ever saying so.', pt: 'e com quem esta label já estava falando sem nunca ter dito isso.' },
        { en: 'No amount of intuition would have produced that number.', pt: 'Nenhuma quantidade de intuição teria produzido esse número.' },
      ],
      emphasize: [3],
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
        { en: 'The files had always been there.', pt: 'Os arquivos sempre estiveram ali.' },
        { en: 'Thirteen thousand, across seven years and four business units.', pt: 'Treze mil, atravessando sete anos e quatro unidades de negócio.' },
        { en: 'What changed in one night was not what we owned.', pt: 'O que mudou numa noite não foi o que a gente tinha.' },
        { en: 'It was that we could ask.', pt: 'Foi a gente poder perguntar.' },
      ],
      emphasize: [3],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'BEFORE: you opened folders and remembered filenames.', pt: 'ANTES: você abria pastas e lembrava nome de arquivo.' },
        { en: 'AFTER: you type a question in plain language and the archive answers.', pt: 'DEPOIS: você digita uma pergunta em linguagem normal e o acervo responde.' },
        { en: 'Show me the starred photos from the hostel. Find where we talked about pricing.', pt: 'Me mostra as fotos marcadas do hostel. Acha onde a gente falou de preço.' },
        { en: 'The search now looks inside what was SAID and inside what is WRITTEN ON SCREEN.', pt: 'A busca agora olha dentro do que foi DITO e dentro do que está ESCRITO NA TELA.' },
      ],
      emphasize: [1, 3],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Four words the rest of this essay leans on, separated once:', pt: 'Quatro palavras em que o resto deste ensaio se apoia, separadas uma vez:' },
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
    {
      kind: 'fullbleed',
      text: { en: 'Having is not knowing.', pt: 'Ter não é saber.' },
      theme: 'light',
    },

    // ─── CAPÍTULO 2: O DIAGNÓSTICO. A ponte entre o caso da casa e o problema
    //     que todo mundo no mercado está vivendo.
    { kind: 'word', label: { en: 'THE SAMENESS', pt: 'A IGUALDADE' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'Step back from our night for a moment, because the point is not the night.', pt: 'Afaste um pouco da nossa noite, porque o ponto não é a noite.' },
        { en: 'The tools became the same for everyone. Everybody repeats that, and it is true.', pt: 'As ferramentas ficaram iguais para todo mundo. Todo mundo repete isso, e é verdade.' },
        { en: 'The part nobody says is that the inputs became the same too.', pt: 'A parte que ninguém diz é que os insumos também ficaram iguais.' },
      ],
      emphasize: [2],
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
        { en: 'The column on the left is what everyone feeds the machine.', pt: 'A coluna da esquerda é o que todo mundo dá de comer para a máquina.' },
        { en: 'The column on the right is what only one label has.', pt: 'A coluna da direita é o que só uma label tem.' },
        { en: 'The same prompt over the left column returns the average.', pt: 'O mesmo prompt sobre a coluna da esquerda devolve a média.' },
        { en: 'Nobody escapes the average with a better adjective.', pt: 'Ninguém escapa da média com um adjetivo melhor.' },
      ],
      emphasize: [1, 3],
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'Homogenisation is a problem of source, not of model.',
        pt: 'A homogeneização é problema de fonte, não de modelo.',
      },
      theme: 'dark',
    },

    // ─── CAPÍTULO 3: CRITÉRIO. Da pesquisa para o pensamento. Explica o que é
    //     um guard antes de usar a palavra.
    { kind: 'word', label: { en: 'CRITERION', pt: 'CRITÉRIO' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'Feeding the machine your own archive is the first half.', pt: 'Dar o próprio acervo de comer à máquina é a primeira metade.' },
        { en: 'The second half is teaching it what this label refuses.', pt: 'A segunda metade é ensinar a ela o que esta label recusa.' },
        { en: 'Every creative label has a manifesto.', pt: 'Toda label criativa tem manifesto.' },
        { en: 'A manifesto is memory, and memory fails at some rate, quietly.', pt: 'Manifesto é memória, e memória falha a alguma taxa, em silêncio.' },
      ],
      emphasize: [1, 3],
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
      emphasize: [1, 4],
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
      emphasize: [1, 4],
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
      emphasize: [1, 4],
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
        { en: 'But sit with what it would have done.', pt: 'Mas fique um segundo com o que ele teria feito.' },
        { en: 'A search for those files would have returned nothing.', pt: 'Uma busca por esses arquivos teria devolvido nada.' },
        { en: 'And nothing looks exactly like an absence.', pt: 'E nada se parece exatamente com uma ausência.' },
        { en: 'We would have concluded the archive was empty where it was full.', pt: 'A gente teria concluído que o acervo era vazio onde ele era cheio.' },
      ],
      emphasize: [3, 4],
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
      emphasize: [2, 3],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Our own night is the example. Steps one to three took seven hours of machine.', pt: 'A nossa noite é o exemplo. Os passos um a três levaram sete horas de máquina.' },
        { en: 'Step four, deciding what a bilingual archive means for this label, is still open.', pt: 'O passo quatro, decidir o que um acervo bilíngue significa para esta label, segue aberto.' },
        { en: 'Producing got cheap. Choosing got expensive.', pt: 'Produzir ficou barato. Escolher ficou caro.' },
        { en: 'The bottleneck moved, and most people still guard the old one.', pt: 'O gargalo mudou de lugar, e a maioria ainda vigia o antigo.' },
      ],
      emphasize: [2],
    },

    // ─── CAPÍTULO 6: AUTORIA. Aqui a forma prova o conteúdo, e é o único
    //     momento que merece o segundo dispositivo pesado da matéria.
    { kind: 'word', label: { en: 'AUTHORSHIP', pt: 'AUTORIA' }, theme: 'dark' },
    {
      kind: 'pinned',
      kicker: { en: 'YOU ARE INSIDE THE PROOF', pt: 'VOCÊ ESTÁ DENTRO DA PROVA' },
      text: {
        en: 'You are reading this in English. The same page exists in Portuguese, and not out of courtesy to anyone: it exists because the archive showed eight hundred files of work spoken in English that nobody had ever counted. The finding became a decision, and the decision became this page.',
        pt: 'Você está lendo isto em português. A mesma página existe em inglês, e não por cortesia com ninguém: existe porque o acervo mostrou oitocentos arquivos de trabalho falados em inglês que ninguém tinha contado. O achado virou decisão, e a decisão virou esta página.',
      },
    },
    {
      kind: 'lines',
      lines: [
        { en: 'That is the whole method, and it is smaller than it sounds:', pt: 'Esse é o método inteiro, e ele é menor do que parece:' },
        { en: 'point the machine at what is yours, write the criteria down as code,', pt: 'aponte a máquina para o que é seu, escreva os critérios como código,' },
        { en: 'check every number before believing it,', pt: 'confira todo número antes de acreditar nele,' },
        { en: 'and spend the hours you saved on the part that is still human.', pt: 'e gaste as horas que sobraram na parte que continua humana.' },
      ],
      emphasize: [1, 3],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Because the machine does not choose.', pt: 'Porque a máquina não escolhe.' },
        { en: 'It does not know what this label refuses.', pt: 'Ela não sabe o que esta label recusa.' },
        { en: 'It has no provenance, and provenance cannot be generated.', pt: 'Ela não tem procedência, e procedência não se gera.' },
        { en: 'It widens the field. Somebody still has to frame the shot.', pt: 'Ela amplia o campo. Alguém ainda tem que enquadrar.' },
      ],
      emphasize: [2, 3],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'What matters?', pt: 'O que importa?' },
        { en: 'Why does it matter now?', pt: 'Por que importa agora?' },
        { en: 'What connection is nobody seeing?', pt: 'Qual conexão ninguém está vendo?' },
        { en: 'Which idea deserves to be built?', pt: 'Qual ideia merece virar execução?' },
      ],
      emphasize: [0, 1, 2, 3],
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
        en: 'AI levelled the tools. The advantage went back to being repertoire. The difference is that now you can build one.',
        pt: 'A IA igualou as ferramentas. A vantagem voltou a ser o repertório. A diferença é que agora dá para construir um.',
      },
    },
  ],
}
