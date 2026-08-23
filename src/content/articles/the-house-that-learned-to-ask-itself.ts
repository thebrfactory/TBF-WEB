// =============================================================================
// CONTEÚDO: "THE HOUSE THAT LEARNED TO ASK ITSELF" /
// "A CASA QUE APRENDEU A SE PERGUNTAR"
// 2ª matéria local do motor scrolly. Ensaio sobre IA como infraestrutura de
// pesquisa, pensamento e execução.
//
// PROCEDÊNCIA DOS NÚMEROS. Nenhum número deste texto é estimativa. Todos saem de
// consulta ao índice do acervo da casa
// (`TBF SYSTEM/operacao/acervo/pergunte-ao-acervo/_index/acervo.db`), medidos em
// 2026-08-23:
//
//   3.132     transcrições geradas          select count(*) from transcricoes
//   43,0 h    duração somada                select sum(dur)/3600 from transcricoes
//   2.047.322 caracteres de fala            select sum(length(texto)) ...
//   1.494     arquivos em português         group by idioma
//   1.471     arquivos em inglês            group by idioma
//   18        idiomas distintos             count(distinct idioma)
//   13.267    itens catalogados no total    select count(*) from itens
//   44        itens invisíveis por NFD/NFC  registrado em _extract/MAPA-EXTRACAO.md
//
// Quem editar este arquivo e mexer num número tem de refazer a consulta. O caderno
// de contexto que originou o ensaio impõe isso em uma linha: número interno só
// entra se puder ser sustentado.
//
// CAPA. Não é foto nem ilustração: é o próprio acervo desenhado. Cada tracinho é
// um dos 3.132 arquivos falados, na ordem real do índice, colorido pelo idioma que
// a máquina ouviu (pergaminho = português, âmbar = inglês, cinza = os outros 16).
// A grade é 87 x 36, que é exatamente 3.132: nenhuma célula é enfeite. Gerador em
// `TBF SYSTEM/operacao/acervo/gerar-capa-substrato.py`.
// =============================================================================

import type { ManifestoArticle } from './types'

export const theHouseThatLearnedToAskItself: ManifestoArticle = {
  slug: 'the-house-that-learned-to-ask-itself',
  loaderTitle: { en: 'THE HOUSE THAT LEARNED', pt: 'A CASA QUE APRENDEU' },
  heroTitle: {
    en: 'THE HOUSE THAT LEARNED TO ASK ITSELF.',
    pt: 'A CASA QUE APRENDEU A SE PERGUNTAR.',
  },
  heroSubtitle: {
    en: 'Or: what a creative company finds when it points the machine at its own archive instead of at the world.',
    pt: 'Ou: o que uma empresa criativa encontra quando aponta a máquina para o próprio acervo, e não para o mundo.',
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
  // fica grudado na tela o tempo todo. É o dispositivo da TESE, um por matéria:
  // o piloto usa exatamente um. A 1ª montagem deste ensaio usou nove, e o
  // resultado foi uma parede de preto entre parágrafos gigantes, com a página
  // passando de 72.000px de altura no telefone.
  //
  // Aqui: UM `pinned` na abertura, e um segundo no único momento que o merece.
  // O corpo anda em `lines` (cascata compacta, uma ideia por linha, que é a
  // regra 0 aplicada à diagramação), as viradas em `fullbleed` (100vh) e os
  // capítulos em `word` (60vh).
  // ===========================================================================
  blocks: [
    // ─── ABERTURA: A CENA. Sem tese, como manda o caderno de contexto: começar
    //     por dentro, e abrir para a tese só depois.
    {
      kind: 'pinned',
      kicker: { en: 'ONE NIGHT, 43 HOURS OF TALK', pt: 'UMA NOITE, 43 HORAS DE FALA' },
      text: {
        en: 'One night in August we asked a machine to listen to everything this house had ever recorded. It came back with a number nobody had asked for.',
        pt: 'Numa noite de agosto pedimos que uma máquina ouvisse tudo que esta casa já gravou. Ela voltou com um número que ninguém tinha pedido.',
      },
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Three thousand one hundred and thirty two files.', pt: 'Três mil cento e trinta e dois arquivos.' },
        { en: 'Forty three hours of speech.', pt: 'Quarenta e três horas de fala.' },
        { en: 'Two million characters that had never been text.', pt: 'Dois milhões de caracteres que nunca tinham sido texto.' },
        { en: 'Seven hours of machine, running while the city slept.', pt: 'Sete horas de máquina, rodando enquanto a cidade dormia.' },
        { en: 'No failures.', pt: 'Nenhuma falha.' },
      ],
      emphasize: [4],
    },
    {
      kind: 'stat',
      value: 1494,
      formatted: { en: '1,494', pt: '1.494' },
      label: { en: 'files spoken in Portuguese', pt: 'arquivos falados em português' },
    },
    {
      kind: 'stat',
      value: 1471,
      formatted: { en: '1,471', pt: '1.471' },
      label: { en: 'files spoken in English', pt: 'arquivos falados em inglês' },
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'Half of what this house says, it says in English. Nobody here knew.',
        pt: 'Metade do que esta casa fala, ela fala em inglês. Ninguém aqui sabia.',
      },
      theme: 'dark',
    },
    {
      kind: 'lines',
      lines: [
        { en: 'A partial count, taken the day before on a sample, said one third.', pt: 'Uma contagem parcial, feita na véspera sobre uma amostra, dizia um terço.' },
        { en: 'The full pass said half.', pt: 'A passada inteira disse metade.' },
        { en: 'And it found sixteen other languages underneath.', pt: 'E encontrou outros dezesseis idiomas embaixo.' },
      ],
      emphasize: [1],
    },

    // ─── CAPÍTULO 1: ACERVO
    { kind: 'word', label: { en: 'ARCHIVE', pt: 'ACERVO' }, theme: 'dark' },
    {
      kind: 'image',
      src: '/images/editorial/substrato-capa.webp',
      alt: {
        en: 'Field of 3,132 marks, one per spoken file, coloured by language.',
        pt: 'Campo de 3.132 marcas, uma por arquivo falado, colorido por idioma.',
      },
      caption: {
        en: 'Every mark is one file. Parchment is Portuguese, amber is English, grey is the other sixteen languages. The grid is 87 by 36, which is exactly 3,132. This is not an illustration of the archive. It is the archive.',
        pt: 'Cada marca é um arquivo. Pergaminho é português, âmbar é inglês, cinza são os outros dezesseis idiomas. A grade é 87 por 36, que dá exatamente 3.132. Isto não é uma ilustração do acervo. É o acervo.',
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
        { en: 'Thirteen thousand of them, across four business units and six years.', pt: 'Treze mil deles, em quatro unidades de negócio e seis anos.' },
        { en: 'What changed in one night was not what we owned.', pt: 'O que mudou numa noite não foi o que a gente tinha.' },
        { en: 'It was that we could ask.', pt: 'Foi a gente poder perguntar.' },
      ],
      emphasize: [3],
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
          { en: 'It is the ground a decision can stand on.', pt: 'É o chão onde uma decisão consegue ficar de pé.' },
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

    // ─── CAPÍTULO 2: O DIAGNÓSTICO
    { kind: 'word', label: { en: 'THE SAMENESS', pt: 'A IGUALDADE' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'The tools became the same for everyone.', pt: 'As ferramentas ficaram iguais para todo mundo.' },
        { en: 'That is the part everybody repeats, and it is true.', pt: 'Essa é a parte que todo mundo repete, e é verdade.' },
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
        { en: 'Six years of our own recordings.', pt: 'Seis anos de gravação nossa.' },
        { en: 'What we refused, and the day we refused it.', pt: 'O que a gente recusou, e o dia em que recusou.' },
        { en: 'The first client, who is still a client.', pt: 'O primeiro cliente, que ainda é cliente.' },
        { en: 'Our mistakes, dated and kept.', pt: 'Nossos erros, datados e guardados.' },
      ],
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'Homogenisation is a problem of source, not of model.',
        pt: 'A homogeneização é problema de fonte, não de modelo.',
      },
      theme: 'dark',
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The same prompt over a public corpus returns the average.', pt: 'O mesmo prompt sobre um corpus público devolve a média.' },
        { en: 'The average is what everyone else is already competing with.', pt: 'A média é aquilo com que todo mundo já está competindo.' },
        { en: 'Nobody escapes it with a better adjective.', pt: 'Ninguém escapa dela com um adjetivo melhor.' },
      ],
      emphasize: [2],
    },

    // ─── CAPÍTULO 3: CRITÉRIO
    { kind: 'word', label: { en: 'CRITERION', pt: 'CRITÉRIO' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'A house rule, written down and enforced by a script:', pt: 'Uma regra da casa, escrita e imposta por script:' },
        { en: 'a signal that already exists beats a new signal.', pt: 'sinal que já existe vence sinal novo.' },
        { en: 'Before spending a machine to generate something,', pt: 'Antes de gastar máquina para gerar alguma coisa,' },
        { en: 'exhaust the column the archive already has.', pt: 'esgote a coluna que o acervo já tem.' },
      ],
      emphasize: [1],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Cameras write the date, the lens, the coordinates.', pt: 'A câmera escreve a data, a lente, as coordenadas.' },
        { en: 'Editors write the folder, the order, the version.', pt: 'O editor escreve a pasta, a ordem, a versão.' },
        { en: 'All of it is free, and all of it was already there.', pt: 'Tudo isso é de graça, e tudo isso já estava lá.' },
        { en: 'What was cut is information too.', pt: 'O que foi cortado também é informação.' },
      ],
      emphasize: [3],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Every creative house has a manifesto.', pt: 'Toda casa criativa tem manifesto.' },
        { en: 'A manifesto is memory, and memory fails at some rate, quietly.', pt: 'Manifesto é memória, e memória falha a alguma taxa, em silêncio.' },
        { en: 'So here the rules stopped being remembered and started being run:', pt: 'Então aqui as regras deixaram de ser lembradas e passaram a ser rodadas:' },
        { en: 'a linter that refuses the wrong dash,', pt: 'um lint que recusa o traço errado,' },
        { en: 'a guard that closes the road to production,', pt: 'um guard que fecha o caminho para produção,' },
        { en: 'a census that counts how many of our rules are code, and how many are still hope.', pt: 'um censo que conta quantas das nossas regras são código, e quantas ainda são só esperança.' },
      ],
      emphasize: [1, 5],
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
        { en: 'An alarm that rings on the wrong file teaches everyone to ignore alarms.', pt: 'Alarme que toca no arquivo errado ensina todo mundo a ignorar alarme.' },
        { en: 'So a new rule only enters if it is born with a test, or retires another one.', pt: 'Então regra nova só entra se nascer com teste, ou se aposentar outra.' },
      ],
      emphasize: [1],
    },

    // ─── CAPÍTULO 4: O ERRO
    { kind: 'word', label: { en: 'THE ERROR', pt: 'O ERRO' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'The night the archive learned to answer, it also lied.', pt: 'Na noite em que o acervo aprendeu a responder, ele também mentiu.' },
        { en: 'The database stored accented names one way.', pt: 'O banco guardava nome com acento de um jeito.' },
        { en: 'The script that fed it normalised them another way.', pt: 'O script que o alimentava normalizava de outro.' },
        { en: 'On screen the two are identical. Byte by byte they are not.', pt: 'Na tela os dois são idênticos. Byte a byte, não.' },
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
        { en: 'Every one of them had an accent in the name.', pt: 'Todos eles tinham acento no nome.' },
        { en: 'A search for them would have returned nothing.', pt: 'Uma busca por eles teria devolvido nada.' },
        { en: 'Nothing looks exactly like an absence.', pt: 'Nada se parece exatamente com uma ausência.' },
        { en: 'And an absence is the most valuable thing an archive can show you.', pt: 'E ausência é a coisa mais valiosa que um acervo pode mostrar.' },
      ],
      emphasize: [2, 3],
    },
    {
      kind: 'fullbleed',
      text: {
        en: 'When execution gets cheap, the expensive mistake is trusting a number you cannot explain.',
        pt: 'Quando executar fica barato, o erro caro é confiar num número que você não sabe explicar.',
      },
      theme: 'dark',
    },

    // ─── CAPÍTULO 5: EXECUÇÃO
    { kind: 'word', label: { en: 'EXECUTION', pt: 'EXECUÇÃO' }, theme: 'dark' },
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
        { en: 'Seven steps from noticing something to selling something.', pt: 'Sete passos entre notar uma coisa e vender uma coisa.' },
        { en: 'Machines are good at the first three, and at the sixth.', pt: 'A máquina é boa nos três primeiros, e no sexto.' },
        { en: 'Houses die between the fourth and the fifth,', pt: 'As casas morrem entre o quarto e o quinto,' },
        { en: 'where somebody has to say what the finding means.', pt: 'onde alguém precisa dizer o que o achado significa.' },
      ],
      emphasize: [2, 3],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Producing got cheap.', pt: 'Produzir ficou barato.' },
        { en: 'Choosing got expensive.', pt: 'Escolher ficou caro.' },
        { en: 'The bottleneck moved, and most people still guard the old one.', pt: 'O gargalo mudou de lugar, e a maioria ainda vigia o antigo.' },
      ],
      emphasize: [1],
    },

    // ─── CAPÍTULO 6: AUTORIA. Aqui a forma prova o conteúdo, e é o único
    //     momento que merece o segundo dispositivo pesado da matéria.
    { kind: 'word', label: { en: 'AUTHORSHIP', pt: 'AUTORIA' }, theme: 'dark' },
    {
      kind: 'pinned',
      kicker: { en: 'YOU ARE INSIDE THE PROOF', pt: 'VOCÊ ESTÁ DENTRO DA PROVA' },
      text: {
        en: 'This essay exists in two languages because the house measured itself and found out it was already bilingual, and had been for years without noticing. The form of this page is the argument of this page.',
        pt: 'Este ensaio existe em dois idiomas porque a casa se mediu e descobriu que já era bilíngue, e vinha sendo havia anos sem perceber. A forma desta página é o argumento desta página.',
      },
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The machine does not choose.', pt: 'A máquina não escolhe.' },
        { en: 'It does not know what this house refuses.', pt: 'Ela não sabe o que esta casa recusa.' },
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
        { en: 'Four questions no model answers for you.', pt: 'Quatro perguntas que modelo nenhum responde por você.' },
        { en: 'They are the whole job.', pt: 'Elas são o trabalho inteiro.' },
        { en: 'Everything this house automated, it automated so that these four would finally get the hours they never had.', pt: 'Tudo que esta casa automatizou, automatizou para que essas quatro ganhassem enfim as horas que nunca tiveram.' },
      ],
      emphasize: [1],
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
