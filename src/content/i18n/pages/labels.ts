// =============================================================================
// Dicionário da /labels — as 4 divisões do organismo .TBF. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Labels',
    description:
      'The labels of .THE BRAZILIAN FACTORY. Four divisions of one cultural organism: .TBF. · .TFD. · .RUC. · .TGF.',
    ogTitle: 'Labels | .THE BRAZILIAN FACTORY.',
    ogDescription: 'One organism. Four labels. One frequency.',
  },

  hero: {
    title: 'Labels',
    // Frase principal do idioma da página, mais o eco dela no outro idioma
    // logo abaixo, em itálico — mesmo gesto bilíngue em ambas as rotas.
    lead: 'One organism. Four labels. One shared frequency between editorial, desire, fashion, and growth.',
    echo: 'Um organismo. Quatro divisões. Uma frequência compartilhada entre editorial, desejo, moda e crescimento.',
  },

  sectionAriaLabel: 'Labels, divisions of .TBF. inc',

  // Rótulos dos pontos de cada label (dt do <dl>). Ordem fixa: category,
  // purpose, forWho, deliverables — usada por todas as 4 labels abaixo.
  pointLabels: {
    category: 'Category',
    purpose: 'Purpose',
    forWho: "Who it's for",
    deliverables: 'Deliverables',
  },

  // Nota interna sobre o placeholder de mídia: não é copy de marca, é aviso
  // de produção para quando a arte real entrar. Fica em inglês nos dois
  // idiomas, como um rótulo técnico.
  previewPlaceholder: 'ADD-PREVIEW-MATERIAL',

  labels: [
    {
      tag: '.TBF.',
      name: 'The Brazilian Factory',
      subtitle: 'Collective Hotel Casino',
      href: '/zine',
      cta: '→ Enter .TBF. Editorial',
      category: 'Cultural editorial label. Core identity of the .TBF. inc organism.',
      purpose: 'Produces narrative, manifesto and curation for those who already read the cultural code.',
      forWho: 'Creators, cultural consumers, investors and strategic partners.',
      deliverables: 'Editorial articles · Manifesto · Interviews · Reference curation',
    },
    {
      tag: '.TFD.',
      name: 'Melfiore',
      subtitle: 'Intimacy-Wellness Community',
      href: '/labels/thefioredaily',
      cta: '→ Enter The Fiore Daily',
      category: 'Lifestyle and wellness label with its own visual identity.',
      purpose: 'Creates wellness rituals and intimacy narratives with its own aesthetic and identity.',
      forWho: 'Women who build their routines with intention, beauty and personal care.',
      deliverables: 'Ritual guides · Product curation · Lifestyle content · Collaborations',
    },
    {
      tag: '.RUC.',
      name: 'Runway Untd Collective',
      subtitle: 'Fashion Film Magazine',
      href: '/labels/runwayunited',
      cta: '→ Explore the Archive',
      category: 'Visual fashion archive with a cinematic language.',
      purpose: 'Documents and produces the visual language of emerging Brazilian fashion.',
      forWho: 'Designers, models, photographers, stylists and admirers of contemporary fashion.',
      deliverables: 'Fashion films · Photo editorials · SPFW coverage · Digital archive',
    },
    {
      tag: '.TGF.',
      name: 'The Growth Factory',
      subtitle: 'Worldwide Brazilian Support',
      href: '/labels/factoryofgrowth',
      cta: '→ Explore .TGF.',
      category: 'Performance and business growth consultancy.',
      purpose: 'Delivers real growth for Brazilian businesses in the US with technical authority.',
      forWho: 'Brazilian entrepreneurs in the US with active businesses who want to scale with premium positioning.',
      deliverables: 'Digital strategy · Performance marketing · Positioning · Mentorship',
    },
  ],

  closing: {
    ariaLabel: 'Enter the collective',
    casinoCta: 'Enter the Casino',
    pitchCta: 'See our Pitch',
  },
}

const pt: typeof en = {
  meta: {
    title: 'Labels',
    description:
      'As labels da .THE BRAZILIAN FACTORY. Quatro divisões de um único organismo cultural: .TBF. · .TFD. · .RUC. · .TGF.',
    ogTitle: 'Labels | .THE BRAZILIAN FACTORY.',
    ogDescription: 'Um organismo. Quatro labels. Uma frequência.',
  },

  hero: {
    title: 'Labels',
    lead: 'Um organismo. Quatro divisões. Uma frequência compartilhada entre editorial, desejo, moda e crescimento.',
    echo: 'One organism. Four labels. One shared frequency between editorial, desire, fashion, and growth.',
  },

  sectionAriaLabel: 'Labels, divisões da .TBF. inc',

  pointLabels: {
    category: 'Categoria',
    purpose: 'Propósito',
    forWho: 'Para quem',
    deliverables: 'Entregas',
  },

  previewPlaceholder: 'ADD-PREVIEW-MATERIAL',

  labels: [
    {
      tag: '.TBF.',
      name: 'The Brazilian Factory',
      subtitle: 'Collective Hotel Casino',
      href: '/zine',
      cta: '→ Entrar no .TBF. Editorial',
      category: 'Label editorial cultural. Identidade central do organismo .TBF. inc.',
      purpose: 'Produz narrativas, manifesto e curadoria para quem já entende o código cultural.',
      forWho: 'Criadores, consumidores culturais, investidores e parceiros estratégicos.',
      deliverables: 'Artigos editoriais · Manifesto · Entrevistas · Curadoria de referências',
    },
    {
      tag: '.TFD.',
      name: 'Melfiore',
      subtitle: 'Intimacy-Wellness Community',
      href: '/labels/thefioredaily',
      cta: '→ Entrar na The Fiore Daily',
      category: 'Label de lifestyle e wellness com identidade visual própria.',
      purpose: 'Cria rituais de bem-estar e narrativas de intimidade com estética e identidade próprias.',
      forWho: 'Mulheres que constroem suas rotinas com intenção, beleza e cuidado pessoal.',
      deliverables: 'Guias de ritual · Curadoria de produtos · Conteúdo de lifestyle · Colaborações',
    },
    {
      tag: '.RUC.',
      name: 'Runway Untd Collective',
      subtitle: 'Fashion Film Magazine',
      href: '/labels/runwayunited',
      cta: '→ Explorar o Arquivo',
      category: 'Arquivo visual de moda com linguagem cinematográfica.',
      purpose: 'Documenta e produz a linguagem visual da moda brasileira emergente.',
      forWho: 'Designers, modelos, fotógrafos, stylists e admiradores de moda contemporânea.',
      deliverables: 'Fashion films · Editoriais fotográficos · Cobertura SPFW · Arquivo digital',
    },
    {
      tag: '.TGF.',
      name: 'The Growth Factory',
      subtitle: 'Worldwide Brazilian Support',
      href: '/labels/factoryofgrowth',
      cta: '→ Explorar a .TGF.',
      category: 'Consultoria de performance e crescimento de negócios.',
      purpose: 'Entrega crescimento real para negócios brasileiros nos EUA com autoridade técnica.',
      forWho: 'Empreendedores brasileiros nos EUA com negócios ativos que querem escalar com posicionamento premium.',
      deliverables: 'Estratégia digital · Marketing de performance · Posicionamento · Mentoria',
    },
  ],

  closing: {
    ariaLabel: 'Entrar no Collective',
    casinoCta: 'Entrar no Casino',
    pitchCta: 'Veja nosso Pitch',
  },
}

export const labels: Record<Lang, typeof en> = { en, pt }
