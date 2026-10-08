// =============================================================================
// Dicionário do /zine. Convenções: ../README.md
//
// O conteúdo dos artigos vem do Sanity e NÃO mora aqui — só o cromo da página
// (categorias fixas, filtros, estados vazios, os cards de exemplo exibidos
// enquanto o CMS ainda está vazio). Rota /zine/[slug] é de outro executor:
// nada aqui altera aquela árvore.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Editorial',
    description:
      'Editorial archive of .THE BRAZILIAN FACTORY. Fashion, culture, manifesto and coolhunting from São Paulo to the world.',
    ogTitle: 'Editorial | .THE BRAZILIAN FACTORY.',
    ogDescription: 'Brazilian fashion and culture editorial archive.',
  },

  heroImageAlt: '.TBF. SÃO PAULO · Zine',

  // Rótulos das categorias fixas — usados no filtro (EditorialGrid) e na
  // grade de categorias (CategoryGrid). O `value` é o slug técnico
  // (ArticleCategory), que nunca muda entre idiomas.
  categories: {
    all: 'All',
    'fashion-film': 'Fashion Film',
    editorial: 'Editorial',
    manifesto: 'Manifesto',
    coolhunting: 'Coolhunting',
    collaboration: 'Collaboration',
  } as Record<'all' | 'fashion-film' | 'editorial' | 'manifesto' | 'coolhunting' | 'collaboration', string>,

  filterAriaLabel: 'Filter by category',
  categoryCardAriaLabel: (label: string) => `View ${label} category`,

  grid: {
    sectionAriaLabel: 'Editorial archive',
    feedAriaLabel: 'Editorial articles',
    previewAriaLabel: 'Editorial archive preview',
    emptyCategory: 'No content in this category yet.',
    loadMoreCta: 'Expand the archive',
    loadMoreAria: (n: number) => `Load ${n} more articles`,
  },

  // Capas de exemplo, exibidas só enquanto o Sanity não tem matéria publicada
  // na categoria (ou no geral). Mesmo espírito do mockCards da home.
  mockArticles: [
    { category: 'Editorial', title: 'What about the Brazilian fashion culture?', date: '01 Jun. 2026', ratio: '3/4' },
    { category: 'Coolhunting', title: 'AFTERPARTY: the feeling behind Brazilian parties', date: '28 Mai. 2026', ratio: '1/1' },
    { category: 'Fashion Film', title: 'ACT I: feeling a Brazilian runway backstage', date: '20 Mai. 2026', ratio: '4/3' },
    { category: 'Editorial', title: 'São Paulo as fashion capital: the city that prints its own rules', date: '15 Mai. 2026', ratio: '3/4' },
    { category: 'Collaboration', title: 'When Brazilian music and fashion collide', date: '08 Mai. 2026', ratio: '4/5' },
    { category: 'Manifesto', title: 'We are not a trend: why .TBF. refuses to follow', date: '01 Mai. 2026', ratio: '1/1' },
  ] as { category: string; title: string; date: string; ratio: string }[],
}

const pt: typeof en = {
  meta: {
    title: 'Editorial',
    description:
      'Arquivo editorial da .THE BRAZILIAN FACTORY. Moda, cultura, manifesto e coolhunting de São Paulo para o mundo.',
    ogTitle: 'Editorial | .THE BRAZILIAN FACTORY.',
    ogDescription: 'Arquivo editorial de moda e cultura brasileira.',
  },

  heroImageAlt: '.TBF. SÃO PAULO · Zine',

  categories: {
    all: 'Tudo',
    'fashion-film': 'Fashion Film',
    editorial: 'Editorial',
    manifesto: 'Manifesto',
    coolhunting: 'Coolhunting',
    collaboration: 'Colaboração',
  },

  filterAriaLabel: 'Filtrar por categoria',
  categoryCardAriaLabel: (label: string) => `Ver categoria ${label}`,

  grid: {
    sectionAriaLabel: 'Arquivo editorial',
    feedAriaLabel: 'Artigos editoriais',
    previewAriaLabel: 'Prévia do arquivo editorial',
    emptyCategory: 'Nenhum conteúdo nesta categoria ainda.',
    loadMoreCta: 'Expandir o arquivo',
    loadMoreAria: (n: number) => `Carregar mais ${n} artigos`,
  },

  mockArticles: [
    { category: 'Editorial', title: 'E a cultura de moda brasileira, como fica?', date: '01 Jun. 2026', ratio: '3/4' },
    { category: 'Coolhunting', title: 'AFTERPARTY: o sentimento por trás das festas brasileiras', date: '28 Mai. 2026', ratio: '1/1' },
    { category: 'Fashion Film', title: 'ATO I: o backstage de uma passarela brasileira', date: '20 Mai. 2026', ratio: '4/3' },
    { category: 'Editorial', title: 'São Paulo como capital da moda: a cidade que imprime as próprias regras', date: '15 Mai. 2026', ratio: '3/4' },
    { category: 'Colaboração', title: 'Quando música e moda brasileiras colidem', date: '08 Mai. 2026', ratio: '4/5' },
    { category: 'Manifesto', title: 'A gente não é tendência: por que a .TBF. se recusa a seguir', date: '01 Mai. 2026', ratio: '1/1' },
  ],
}

export const editorial: Record<Lang, typeof en> = { en, pt }
