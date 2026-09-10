// =============================================================================
// Dicionário de ABOUT. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'About Us',
    description:
      '.THE BRAZILIAN FACTORY. is a multi-label creative company born in São Paulo, built to give Brazilian culture a global platform.',
  },

  hero: {
    tag: 'About .TBF.',
    // "Culture Factory." ecoa o nome da empresa (.THE BRAZILIAN FACTORY.) e o
    // termo de marca Culture™ — fica em inglês nos dois idiomas, como o
    // Culture™ da home. Ver src/content/i18n/pages/home.ts.
    title: 'Culture Factory.',
    deck: 'Born in São Paulo. Built for global relevance. We exist to prove that Brazilian creativity belongs at the center of the global cultural conversation.',
  },

  whoWeAre: {
    sectionLabel: 'Who We Are',
    h2: 'A company built around culture.',
    // Renderizada após o nome da marca em negrito (".THE BRAZILIAN FACTORY. " + p1).
    p1: 'is a multi-label creative company founded in 2025 in São Paulo, Brazil. We operate at the intersection of editorial, fashion, wellness, lifestyle and business growth, creating content, communities and brands that carry cultural weight.',
    p2: 'We are not a media company. We are not an agency. We are a creative ecosystem: a collection of labels, each with its own identity, audience and purpose, united by a shared commitment to craft and culture.',
    p3: 'Everything we build is intentional. Every label, every story, every collaboration exists because it adds something real to the culture, not because it was convenient or commercially safe.',
  },

  mission: {
    sectionLabel: 'Mission',
    statement: 'To make Brazilian culture undeniable.',
  },

  values: {
    sectionLabel: 'Values',
    h2: 'How we operate',
    items: [
      { name: 'Culture First', desc: 'Every decision starts with a cultural question. We build for meaning before we build for scale.' },
      { name: 'Creative Integrity', desc: 'We do not compromise creative vision for convenience. Quality is non-negotiable.' },
      { name: 'Community Over Everything', desc: 'Our community is the product. We build with them, not for them.' },
      { name: 'Long-term Thinking', desc: "We are not building for today's trend. We are building a company that will still matter in 20 years." },
    ] as { name: string; desc: string }[],
  },

  labels: {
    sectionLabel: 'The Ecosystem',
    h2: 'Our labels',
    items: [
      { code: '.TBF.', name: '.THE BRAZILIAN FACTORY.', desc: 'Editorial label and cultural backbone of the ecosystem. Stories, essays, photography.', href: '/mag' },
      { code: '.TFD.', name: '.THE FIORE DAILY.', desc: 'Wellness, intimacy, ritual and feminine expression. Presence as a practice.', href: '/labels/thefioredaily' },
      { code: '.RUC.', name: '.RUNWAY UNTD COLLECTIVE.', desc: 'Fashion film, editorial, SPFW, creative direction. Fashion as cultural memory.', href: '/labels/runwayunited' },
      { code: '.TGF.', name: '.THE GROWTH FACTORY.', desc: 'Growth strategy, business development and scalable innovation.', href: '/labels/factoryofgrowth' },
    ] as { code: string; name: string; desc: string; href: string }[],
  },
}

const pt: typeof en = {
  meta: {
    title: 'Sobre Nós',
    description:
      '.THE BRAZILIAN FACTORY. é uma empresa criativa multilabel nascida em São Paulo, construída para dar à cultura brasileira uma plataforma global.',
  },

  hero: {
    tag: 'Sobre a .TBF.',
    title: 'Culture Factory.',
    deck: 'Nascida em São Paulo. Construída para relevância global. Existimos para provar que a criatividade brasileira pertence ao centro da conversa cultural mundial.',
  },

  whoWeAre: {
    sectionLabel: 'Quem Somos',
    h2: 'Uma empresa construída em torno da cultura.',
    p1: '.THE BRAZILIAN FACTORY. é uma empresa criativa multilabel fundada em 2025 em São Paulo, Brasil. Atuamos na interseção entre editorial, moda, bem-estar, lifestyle e growth, criando conteúdo, comunidades e marcas com peso cultural real.',
    p2: 'Não somos uma empresa de mídia. Não somos uma agência. Somos um ecossistema criativo: um conjunto de labels, cada uma com identidade, público e propósito próprios, unidas pelo mesmo compromisso com ofício e cultura.',
    p3: 'Tudo o que construímos é intencional. Cada label, cada história, cada colaboração existe porque acrescenta algo real à cultura, não porque era conveniente ou comercialmente seguro.',
  },

  mission: {
    sectionLabel: 'Missão',
    statement: 'Tornar a cultura brasileira inegável.',
  },

  values: {
    sectionLabel: 'Valores',
    h2: 'Como operamos',
    items: [
      { name: 'Cultura em primeiro lugar', desc: 'Toda decisão começa com uma pergunta cultural. Construímos para significado antes de construir para escala.' },
      { name: 'Integridade criativa', desc: 'Não abrimos mão da visão criativa por conveniência. Qualidade não é negociável.' },
      { name: 'Comunidade acima de tudo', desc: 'Nossa comunidade é o produto. Construímos com ela, não para ela.' },
      { name: 'Pensamento de longo prazo', desc: 'Não estamos construindo para a tendência de hoje. Estamos construindo uma empresa que ainda vai importar daqui a 20 anos.' },
    ],
  },

  labels: {
    sectionLabel: 'O Ecossistema',
    h2: 'Nossas labels',
    items: [
      { code: '.TBF.', name: '.THE BRAZILIAN FACTORY.', desc: 'Label editorial e espinha dorsal cultural do ecossistema. Histórias, ensaios, fotografia.', href: '/mag' },
      { code: '.TFD.', name: '.THE FIORE DAILY.', desc: 'Bem-estar, intimidade, ritual e expressão feminina. Presença como prática.', href: '/labels/thefioredaily' },
      { code: '.RUC.', name: '.RUNWAY UNTD COLLECTIVE.', desc: 'Fashion film, editorial, SPFW, direção criativa. Moda como memória cultural.', href: '/labels/runwayunited' },
      { code: '.TGF.', name: '.THE GROWTH FACTORY.', desc: 'Estratégia de growth, desenvolvimento de negócios e inovação escalável.', href: '/labels/factoryofgrowth' },
    ],
  },
}

export const about: Record<Lang, typeof en> = { en, pt }
