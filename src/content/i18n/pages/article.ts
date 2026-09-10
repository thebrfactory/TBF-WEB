// =============================================================================
// Dicionário da MATÉRIA (/mag/[slug]). Convenções: ../README.md
//
// Só o cromo da página vive aqui. O texto das matérias de verdade vem do Sanity
// e o do piloto scrolly vem de content/articles/, os dois já bilíngues.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  backToMagazine: '← Back to Magazine',
  articleInfo: 'Article information',
  alsoFrom: 'Also from the ecosystem .TBF.',
  enterCollective: 'Enter the Collective',
  accessSystem: 'Access the system →',

  categories: {
    'fashion-film': 'Fashion Film',
    editorial: 'Editorial',
    manifesto: 'Manifesto',
    coolhunting: 'Coolhunting',
    collaboration: 'Collaboration',
  } as Record<string, string>,

  // Matérias de exemplo: só aparecem enquanto o CMS não tem post publicado.
  mocks: {
    'lorem-ipsum-1': {
      title: 'What about the Brazilian fashion culture?',
      deck: 'São Paulo has always been a city that creates, but rarely gets credit. We change that.',
      category: 'Editorial',
    },
    'lorem-ipsum-2': {
      title: 'AFTERPARTY: the feeling behind Brazilian parties',
      deck: 'After the lights go down and the crowd disperses, something lingers. We went looking for it.',
      category: 'Coolhunting',
    },
    'lorem-ipsum-3': {
      title: 'ACT I: feeling a Brazilian runway backstage',
      deck: 'Before the first model steps out, a whole universe breathes in the wings. We were there.',
      category: 'Fashion Film',
    },
    'lorem-ipsum-4': {
      title: 'São Paulo as fashion capital: the city that prints its own rules',
      deck: 'Paris sets the trends. Milan refines them. London breaks them. São Paulo ignores them and starts over.',
      category: 'Editorial',
    },
    'lorem-ipsum-5': {
      title: 'When Brazilian music and fashion collide',
      deck: "Funk, baile, axé. Brazilian music has always dressed itself in something unmistakable. Here's where it meets the runway.",
      category: 'Collaboration',
    },
    'lorem-ipsum-6': {
      title: 'We are not a trend: why .TBF. refuses to follow',
      deck: "Trends are questions. .TBF. is the answer they didn't see coming.",
      category: 'Manifesto',
    },
  } as Record<string, { title: string; deck: string; category: string }>,

  mockBody:
    'There is a city in South America that has been manufacturing culture for decades without receiving proper credit from the global fashion machine. São Paulo is not trying to be Paris. It never was. It is trying to be itself, which is harder, bolder, and far more interesting. .THE BRAZILIAN FACTORY. exists to document what that looks like. We are not journalists, although we write. We are not designers, although we create. We are custodians of a cultural output that has long been undervalued and under-seen. The Brazilian creative industry does not lack talent. It lacks infrastructure, visibility, and the institutional confidence to say: this is ours. We are building that, one editorial, one film, one collaboration at a time. We don\'t copy Paris. We print over it. São Paulo is the origin point of a new creative axis, one that runs from the periphery to the runway, from the baile to the boutique, from the favela to the festival. .TBF. is not a brand that follows culture. It is the factory where culture is made.',
}

const pt: typeof en = {
  backToMagazine: '← Voltar para a revista',
  articleInfo: 'Informações do artigo',
  alsoFrom: 'Também do ecossistema .TBF.',
  enterCollective: 'Entrar no Collective',
  accessSystem: 'Acessar o sistema →',

  categories: {
    'fashion-film': 'Fashion Film',
    editorial: 'Editorial',
    manifesto: 'Manifesto',
    coolhunting: 'Coolhunting',
    collaboration: 'Colaboração',
  },

  mocks: {
    'lorem-ipsum-1': {
      title: 'E a cultura de moda brasileira, como fica?',
      deck: 'São Paulo sempre foi uma cidade que cria e quase nunca recebe o crédito. Isso muda aqui.',
      category: 'Editorial',
    },
    'lorem-ipsum-2': {
      title: 'AFTERPARTY: o sentimento por trás das festas brasileiras',
      deck: 'Quando a luz cai e a multidão se desfaz, alguma coisa continua. Fomos atrás dela.',
      category: 'Coolhunting',
    },
    'lorem-ipsum-3': {
      title: 'ATO I: o backstage de uma passarela brasileira',
      deck: 'Antes da primeira modelo pisar na passarela, um universo inteiro respira nas coxias. A gente estava lá.',
      category: 'Fashion Film',
    },
    'lorem-ipsum-4': {
      title: 'São Paulo capital da moda: a cidade que imprime as próprias regras',
      deck: 'Paris cria a tendência. Milão refina. Londres quebra. São Paulo ignora e começa de novo.',
      category: 'Editorial',
    },
    'lorem-ipsum-5': {
      title: 'Quando a música e a moda brasileiras se encontram',
      deck: 'Funk, baile, axé. A música brasileira sempre se vestiu de um jeito inconfundível. É aqui que ela encontra a passarela.',
      category: 'Colaboração',
    },
    'lorem-ipsum-6': {
      title: 'Não somos tendência: por que a .TBF. se recusa a seguir',
      deck: 'Tendência é pergunta. A .TBF. é a resposta que ninguém viu chegando.',
      category: 'Manifesto',
    },
  },

  mockBody:
    'Existe uma cidade na América do Sul que fabrica cultura há décadas sem receber o devido crédito da máquina global da moda. São Paulo não está tentando ser Paris. Nunca esteve. Está tentando ser ela mesma, o que é mais difícil, mais corajoso e muito mais interessante. A .THE BRAZILIAN FACTORY. existe para documentar como isso se parece. Não somos jornalistas, embora escrevamos. Não somos designers, embora criemos. Somos guardiões de uma produção cultural historicamente subvalorizada e pouco vista. Falta à indústria criativa brasileira infraestrutura, visibilidade e a confiança institucional de dizer: isto é nosso. Talento não falta. É isso que estamos construindo, um editorial, um filme, uma colaboração por vez. A gente não copia Paris. Imprime por cima. São Paulo é o ponto de origem de um novo eixo criativo, que vai da periferia à passarela, do baile à boutique, da favela ao festival. A .TBF. não é uma marca que segue a cultura. É a fábrica onde a cultura é feita.',
}

export const article: Record<Lang, typeof en> = { en, pt }
