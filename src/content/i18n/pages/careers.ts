// =============================================================================
// Dicionário de CAREERS. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Careers | .THE BRAZILIAN FACTORY.',
    description:
      'Join the team building .THE BRAZILIAN FACTORY. A creative company at the intersection of culture, fashion, wellness and growth.',
  },

  hero: {
    tag: 'Careers',
    title: 'Build With Us.',
    // <strong>.THE BRAZILIAN FACTORY.</strong> + " is looking for people..."
    deckSuffix: 'is looking for people who believe culture is the most powerful business, and are ready to prove it.',
  },

  whyTbf: {
    sectionLabel: 'Why .TBF.',
    h2: 'Small team. Big ambition.',
    p1: 'We are a lean team building something with genuine cultural ambition. There is no bureaucracy, no committee approval for every small decision. If you join, you will have real ownership and real impact, from day one.',
    p2: 'We are São Paulo-based and remote-friendly. We work across editorial, fashion, wellness, lifestyle and business growth. Regardless of your discipline, your work will connect directly to the culture we are building.',
    p3: 'We are looking for people with strong opinions, high standards and a genuine obsession with their craft. If that sounds like you, we want to talk.',
  },

  whatWeLookFor: {
    sectionLabel: 'What We Look For',
    h2: 'Who fits here',
    items: [
      { trait: 'Creative courage', desc: 'We want people who have a point of view and are willing to defend it.' },
      { trait: 'Independent thinking', desc: 'We are a small team. Everyone has ownership. We need people who think, not just execute.' },
      { trait: 'Deep craft', desc: 'Whatever your discipline: writing, design, strategy, code. We expect mastery.' },
      { trait: 'Cultural sensitivity', desc: 'We build for and from culture. You need to understand why that matters.' },
    ] as { trait: string; desc: string }[],
  },

  openRoles: {
    sectionLabel: 'Open Roles',
    h2: 'Current openings',
    p1: 'We do not always have a formal listing open, but we are always looking for exceptional people. If you have a perspective on what you would build here and why it would matter, send us a message.',
    p2: 'Areas we are always interested in: editorial, creative direction, photography, video, community management, design, brand strategy, and growth.',
    email: 'careers@thebrfactory.com',
  },

  howWeWork: {
    sectionLabel: 'How We Work',
    items: [
      { label: 'Location', value: 'São Paulo, Brazil\nRemote-friendly' },
      { label: 'Language', value: 'Portuguese\nEnglish' },
      { label: 'Culture', value: 'Culture-first\nHigh ownership' },
      { label: 'Stage', value: 'MVP\nEarly team' },
    ] as { label: string; value: string }[],
  },
}

const pt: typeof en = {
  meta: {
    title: 'Carreiras | .THE BRAZILIAN FACTORY.',
    description:
      'Junte-se ao time que constrói a .THE BRAZILIAN FACTORY. Uma empresa criativa na interseção entre cultura, moda, bem-estar e growth.',
  },

  hero: {
    tag: 'Carreiras',
    title: 'Construa Com a Gente.',
    deckSuffix: 'está procurando pessoas que acreditam que cultura é o negócio mais poderoso que existe, e estão prontas para provar isso.',
  },

  whyTbf: {
    sectionLabel: 'Por Que a .TBF.',
    h2: 'Time pequeno. Ambição grande.',
    p1: 'Somos um time enxuto construindo algo com ambição cultural genuína. Não existe burocracia, não existe comitê aprovando cada pequena decisão. Se você entrar, vai ter posse real e impacto real desde o primeiro dia.',
    p2: 'Estamos baseados em São Paulo e somos remote-friendly. Trabalhamos entre editorial, moda, bem-estar, lifestyle e growth. Independentemente da sua área, seu trabalho vai se conectar diretamente com a cultura que estamos construindo.',
    p3: 'Procuramos pessoas com opiniões fortes, padrões altos e uma obsessão genuína pelo próprio ofício. Se isso parece com você, queremos conversar.',
  },

  whatWeLookFor: {
    sectionLabel: 'O Que Procuramos',
    h2: 'Quem se encaixa aqui',
    items: [
      { trait: 'Coragem criativa', desc: 'Queremos gente que tem ponto de vista e está disposta a defendê-lo.' },
      { trait: 'Pensamento independente', desc: 'Somos um time pequeno. Todo mundo tem posse. Precisamos de gente que pensa, não só executa.' },
      { trait: 'Ofício profundo', desc: 'Seja qual for sua área: escrita, design, estratégia, código. Esperamos domínio de verdade.' },
      { trait: 'Sensibilidade cultural', desc: 'Construímos para a cultura e a partir dela. Você precisa entender por que isso importa.' },
    ],
  },

  openRoles: {
    sectionLabel: 'Vagas Abertas',
    h2: 'Oportunidades atuais',
    p1: 'Nem sempre temos uma vaga formal aberta, mas estamos sempre em busca de gente excepcional. Se você tem uma visão do que construiria aqui e por que isso importaria, manda uma mensagem pra gente.',
    p2: 'Áreas que sempre nos interessam: editorial, direção criativa, fotografia, vídeo, gestão de comunidade, design, estratégia de marca e growth.',
    email: 'careers@thebrfactory.com',
  },

  howWeWork: {
    sectionLabel: 'Como Trabalhamos',
    items: [
      { label: 'Localização', value: 'São Paulo, Brasil\nRemote-friendly' },
      { label: 'Idioma', value: 'Português\nInglês' },
      { label: 'Cultura', value: 'Cultura em primeiro lugar\nAlta posse' },
      { label: 'Estágio', value: 'MVP\nTime inicial' },
    ],
  },
}

export const careers: Record<Lang, typeof en> = { en, pt }
