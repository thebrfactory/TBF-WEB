// =============================================================================
// Dicionário da /labels: os 4 mundos da Factory. Convenções: ../README.md
// Os `keywords` e o `territory` ficam em inglês nas duas línguas (código de marca).
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Labels',
    description:
      'The Labels of .THE BRAZILIAN FACTORY. Four worlds built inside one factory: .TBF. · .TFD. · .RUC. · .TGF.',
    ogTitle: 'Labels | .THE BRAZILIAN FACTORY.',
    ogDescription: 'One factory. Four worlds.',
  },

  hero: {
    title: 'Labels',
    // Frase principal do idioma da página, mais o eco dela no outro idioma
    // logo abaixo, em itálico: mesmo gesto bilíngue em ambas as rotas.
    lead: 'One factory. Four worlds.',
    echo: 'Uma Factory. Quatro mundos.',
    intro:
      'Labels are how the Factory becomes culture. Each one starts from a cultural tension. Its own language, its own audience, its own point of view.',
  },

  sectionAriaLabel: 'Labels of .TBF. inc',

  labels: [
    {
      index: '01',
      tag: '.TBF.',
      image: { src: '/images/editorial/country-side/capa.webp', width: 1920, height: 1280, alt: 'Masked clowns riding a pink pickup truck in a Brazilian countryside festival' },
      name: 'The Brazilian Factory',
      territory: 'CULTURE',
      line: 'The cultural factory.',
      keywords: 'Editorial. Research. Ideas.',
      note: 'The layer that gives every other world context, repertoire and legitimacy.',
      href: '/zine',
      cta: '→ Enter the Zine',
    },
    {
      index: '02',
      tag: '.TFD.',
      image: { src: '/images/tfd/tfd-closing.webp', width: 2000, height: 1125, alt: 'The Fiore Daily key art: red silhouette of legs in heels in the dark' },
      name: 'The Fiore Daily',
      territory: 'INTIMACY',
      line: 'Intimacy as culture.',
      keywords: 'Wellness. Ritual. Community.',
      note: 'Care and desire turned into behavior, product and community.',
      href: '/labels/thefioredaily',
      cta: '→ Enter The Fiore Daily',
    },
    {
      index: '03',
      tag: '.RUC.',
      image: { src: '/images/ruc/ruc-hero.webp', width: 2000, height: 1125, alt: 'Two DJs under a lit Fashion Club logo at a Runway Untd night' },
      name: 'Runway Untd Collective',
      territory: 'FASHION',
      line: 'Fashion as cultural memory.',
      keywords: 'Film. Image. Archive.',
      note: "Part media, part studio, part archive. It films Brazilian fashion so it doesn't disappear.",
      href: '/labels/runwayunited',
      cta: '→ Explore the Archive',
    },
    {
      index: '04',
      tag: '.TGF.',
      image: { src: '/images/tgf/tgf-ambition.webp', width: 2000, height: 1334, alt: 'A person with a backpack facing a city skyline at sunset' },
      name: 'The Growth Factory',
      territory: 'GROWTH',
      line: 'Cultural capital into business value.',
      keywords: 'Strategy. Technology. Expansion.',
      note: 'Where what the other worlds accumulate meets the market.',
      href: '/labels/factoryofgrowth',
      cta: '→ Explore .TGF.',
    },
  ],

  born: {
    heading: 'How a label is born',
    body: "A real cultural tension. An audience that recognizes itself in it. A language of its own. Room for IP. A business that doesn't kill the idea.",
    verdict: "Miss one, and it's a project.",
  },

  closing: {
    line: 'Culture. Intimacy. Fashion. Growth. Different territories, same frequency.',
    ariaLabel: 'Enter the Collective',
    collectiveCta: 'Enter the Collective',
    pitchCta: 'See our Pitch',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Labels',
    description:
      'As Labels da .THE BRAZILIAN FACTORY. Quatro mundos construídos dentro de uma Factory: .TBF. · .TFD. · .RUC. · .TGF.',
    ogTitle: 'Labels | .THE BRAZILIAN FACTORY.',
    ogDescription: 'Uma Factory. Quatro mundos.',
  },

  hero: {
    title: 'Labels',
    lead: 'Uma Factory. Quatro mundos.',
    echo: 'One factory. Four worlds.',
    intro:
      'As Labels são o jeito de a Factory virar cultura. Cada uma nasce de uma tensão cultural. Linguagem própria, público próprio, ponto de vista próprio.',
  },

  sectionAriaLabel: 'Labels da .TBF. inc',

  labels: [
    {
      index: '01',
      tag: '.TBF.',
      image: { src: '/images/editorial/country-side/capa.webp', width: 1920, height: 1280, alt: 'Palhaços mascarados numa caminhonete rosa em festa do interior do Brasil' },
      name: 'The Brazilian Factory',
      territory: 'CULTURE',
      line: 'A fábrica cultural.',
      keywords: 'Editorial. Research. Ideas.',
      note: 'A camada que dá contexto, repertório e legitimidade a todos os outros mundos.',
      href: '/zine',
      cta: '→ Entrar no Zine',
    },
    {
      index: '02',
      tag: '.TFD.',
      image: { src: '/images/tfd/tfd-closing.webp', width: 2000, height: 1125, alt: 'Arte da The Fiore Daily: silhueta vermelha de pernas em salto alto no escuro' },
      name: 'The Fiore Daily',
      territory: 'INTIMACY',
      line: 'Intimidade como cultura.',
      keywords: 'Wellness. Ritual. Community.',
      note: 'Cuidado e desejo transformados em comportamento, produto e comunidade.',
      href: '/labels/thefioredaily',
      cta: '→ Entrar na The Fiore Daily',
    },
    {
      index: '03',
      tag: '.RUC.',
      image: { src: '/images/ruc/ruc-hero.webp', width: 2000, height: 1125, alt: 'Dois DJs sob o logo iluminado do Fashion Club numa noite da Runway Untd' },
      name: 'Runway Untd Collective',
      territory: 'FASHION',
      line: 'Moda como memória cultural.',
      keywords: 'Film. Image. Archive.',
      note: 'Parte mídia, parte estúdio, parte arquivo. Filma a moda brasileira para ela não sumir.',
      href: '/labels/runwayunited',
      cta: '→ Explorar o Arquivo',
    },
    {
      index: '04',
      tag: '.TGF.',
      image: { src: '/images/tgf/tgf-ambition.webp', width: 2000, height: 1334, alt: 'Pessoa de mochila diante do skyline de uma cidade ao pôr do sol' },
      name: 'The Growth Factory',
      territory: 'GROWTH',
      line: 'Capital cultural em valor de negócio.',
      keywords: 'Strategy. Technology. Expansion.',
      note: 'Onde o que os outros mundos acumulam encontra o mercado.',
      href: '/labels/factoryofgrowth',
      cta: '→ Explorar a .TGF.',
    },
  ],

  born: {
    heading: 'Como nasce uma Label',
    body: 'Uma tensão cultural real. Um público que se reconhece nela. Uma linguagem própria. Espaço para IP. Um negócio que não mata a ideia.',
    verdict: 'Faltou uma, é projeto.',
  },

  closing: {
    line: 'Culture. Intimacy. Fashion. Growth. Territórios diferentes, a mesma frequência.',
    ariaLabel: 'Entrar no Collective',
    collectiveCta: 'Entrar no Collective',
    pitchCta: 'Ver o Pitch',
  },
}

export const labels: Record<Lang, typeof en> = { en, pt }
