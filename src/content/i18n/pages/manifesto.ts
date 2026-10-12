// =============================================================================
// Dicionário do MANIFESTO. Convenções: ../README.md
// O corpo mora aqui: um bloco por estrofe, uma linha por verso. `tone` diz
// como a estrofe se veste na página (mark, lead, hit, beat, body, sign).
// =============================================================================

import type { Lang } from '@/lib/i18n'

export type StanzaTone = 'mark' | 'lead' | 'hit' | 'beat' | 'body' | 'sign'

const en = {
  meta: {
    title: 'Manifesto',
    description:
      'The founding document of .THE BRAZILIAN FACTORY. Brazil never lacked culture. It lacked machines.',
    ogTitle: 'Manifesto | .THE BRAZILIAN FACTORY.',
    ogDescription: 'Culture is raw material. Brazil is the source code.',
  },
  heading: 'Manifesto',
  kicker: 'Founding document',
  bodyLabel: 'Manifesto',
  nextStepsLabel: 'Next steps',
  ctaEditorial: 'Enter the Zine',
  ctaAccess: 'Open a channel',
  photos: [
    'Clowns in colorful costumes riding a pink car in the Brazilian countryside.',
    'A masked rider in blue and gold regalia standing beside a horse.',
    'A line of riders in red and gold costumes on a grass field at a cavalhada.',
    'Riders in red costumes at sunset under a deep blue sky.',
  ],
  body: [
    { tone: 'mark', lines: ['.THE BRAZILIAN FACTORY.'] },
    { tone: 'lead', lines: ['Culture is raw material.', 'Brazil is the source code.'] },
    { tone: 'body', lines: ['Brazil learned early how to export raw material.', 'Sugar. Gold. Coffee.', 'Someone else did the finishing.'] },
    { tone: 'body', lines: ['Culture left the same way.', 'A rhythm, a body, a color.', 'It came back with a foreign label.'] },
    { tone: 'hit', lines: ['We were not born to translate Brazil for the world.', 'We were born to make Brazil impossible to ignore.'] },
    { tone: 'body', lines: ['We take what is here.', 'What is strange, what is excessive, what is unfinished.', 'What is ours.'] },
    { tone: 'beat', lines: ['We mix it.', 'We distort it.', 'We produce it.', 'We export it.'] },
    { tone: 'body', lines: ['Agency, media company, fashion label, studio.', 'The category was never the point. The collision is.', 'This is a factory.'] },
    { tone: 'hit', lines: ['Where ideas become things.', 'Things become worlds.', 'Worlds become culture.', 'And culture becomes property.'] },
    { tone: 'body', lines: ['Culture is not decoration. It is infrastructure.', 'It builds desire, identity, markets.'] },
    { tone: 'body', lines: ['We don\'t wait for culture to happen.', 'We get in the room early, find the signal,', 'and give it a name, a body, a business.'] },
    { tone: 'body', lines: ['Brazil has never lacked culture.', 'It has lacked machines that turn culture into property.'] },
    { tone: 'hit', lines: ['So we built one.'] },
    { tone: 'body', lines: ['São Paulo is the factory floor.', 'Brazil is the archive.', 'The internet is the distribution.', 'The world is the market.'] },
    { tone: 'body', lines: ['And the work is never finished.'] },
    { tone: 'sign', lines: ['.TBF. inc.', 'Born in Brazil.', 'Built for everywhere.'] },
  ],
} satisfies { body: { tone: StanzaTone; lines: string[] }[] } & Record<string, unknown>

const pt: typeof en = {
  meta: {
    title: 'Manifesto',
    description:
      'O documento fundador da .THE BRAZILIAN FACTORY. Cultura nunca faltou ao Brasil. Faltou máquina.',
    ogTitle: 'Manifesto | .THE BRAZILIAN FACTORY.',
    ogDescription: 'A cultura é matéria-prima. O Brasil é o código-fonte.',
  },
  heading: 'Manifesto',
  kicker: 'Documento fundador',
  bodyLabel: 'Manifesto',
  nextStepsLabel: 'Próximos passos',
  ctaEditorial: 'Entrar no Zine',
  ctaAccess: 'Abrir um canal',
  photos: [
    'Palhaços de fantasia colorida em um carro rosa no interior do Brasil.',
    'Cavaleiro mascarado em trajes azul e dourado ao lado de um cavalo.',
    'Fila de cavaleiros de roupa vermelha e dourada em um gramado, durante uma cavalhada.',
    'Cavaleiros de roupa vermelha ao entardecer, sob um céu azul profundo.',
  ],
  body: [
    { tone: 'mark', lines: ['.THE BRAZILIAN FACTORY.'] },
    { tone: 'lead', lines: ['A cultura é matéria-prima.', 'O Brasil é o código-fonte.'] },
    { tone: 'body', lines: ['O Brasil aprendeu cedo a exportar matéria-prima.', 'Açúcar. Ouro. Café.', 'O acabamento ficava lá fora.'] },
    { tone: 'body', lines: ['A cultura saiu do mesmo jeito.', 'Um ritmo, um corpo, uma cor.', 'Voltou com etiqueta de fora.'] },
    { tone: 'hit', lines: ['A gente não nasceu para traduzir o Brasil para o mundo.', 'Nasceu para tornar o Brasil impossível de ignorar.'] },
    { tone: 'body', lines: ['A gente pega o que está aqui.', 'O estranho, o excessivo, o inacabado.', 'O que é nosso.'] },
    { tone: 'beat', lines: ['Mistura.', 'Distorce.', 'Produz.', 'Exporta.'] },
    { tone: 'body', lines: ['Agência, empresa de mídia, marca de moda, estúdio.', 'A categoria nunca foi a questão. A colisão é.', 'Isto é uma fábrica.'] },
    { tone: 'hit', lines: ['Onde ideia vira coisa.', 'Coisa vira mundo.', 'Mundo vira cultura.', 'E cultura vira propriedade.'] },
    { tone: 'body', lines: ['Cultura não é enfeite. É infraestrutura.', 'Constrói desejo, identidade, mercado.'] },
    { tone: 'body', lines: ['A gente não espera a cultura acontecer.', 'Entra cedo na sala, acha o sinal', 'e dá a ele um nome, um corpo, um negócio.'] },
    { tone: 'body', lines: ['Cultura nunca faltou ao Brasil.', 'Faltou máquina para transformar cultura em propriedade.'] },
    { tone: 'hit', lines: ['Então a gente construiu uma.'] },
    { tone: 'body', lines: ['São Paulo é o chão de fábrica.', 'O Brasil é o arquivo.', 'A internet é a distribuição.', 'O mundo é o mercado.'] },
    { tone: 'body', lines: ['E o trabalho nunca fica pronto.'] },
    { tone: 'sign', lines: ['.TBF. inc.', 'Born in Brazil.', 'Built for everywhere.'] },
  ],
}

export const manifesto: Record<Lang, typeof en> = { en, pt }
