// =============================================================================
// Dicionário do /factory. Convenções: ../README.md
//
// A rota em si é só um redirect para /labels/factoryofgrowth (a página real do
// .TGF.) — não há texto de página aqui. FactoryHeroSection e
// FactoryProgramsSection são componentes fora do caminho de renderização
// (nunca importados por nenhuma rota ativa hoje), mas foram trazidos para o
// dicionário do mesmo jeito, por estarem no escopo desta leva.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  hero: {
    eyebrow: '.TGF. · The Growth Factory',
    title: ['Growth', 'without excuses.'] as [string, string],
    deck: 'For businesses with stable revenue that want real scale. Process. Strategy. Execution. No generic promises.',
    scheduleCta: 'Schedule a Session',
    channelCta: 'Open a channel',
  },
  programs: {
    heading: 'Programs',
    forWhomLabel: 'For whom',
    includesLabel: 'Includes',
    placeholder: [
      {
        name: 'Acceleration Program',
        tagline: 'For businesses that want to scale in a structured way.',
        targetAudience: 'Companies earning above R$50k/month',
        deliverables: [
          'Full business diagnostic',
          'Personalized growth strategy',
          'Weekly follow-up for 3 months',
          'Direct access to the founder',
        ],
        ctaLabel: 'Start the Program',
      },
      {
        name: 'Advisory',
        tagline: 'Ongoing strategic counsel for decisions that matter.',
        targetAudience: 'Founders and business leaders',
        deliverables: [
          'Monthly strategy sessions',
          'Availability by message',
          'KPI and goal review',
        ],
        ctaLabel: 'Apply for Advisory',
      },
    ] as {
      name: string
      tagline: string
      targetAudience: string
      deliverables: string[]
      ctaLabel: string
    }[],
  },
}

const pt: typeof en = {
  hero: {
    eyebrow: '.TGF. · The Growth Factory',
    title: ['Crescimento', 'sem desculpas.'],
    deck: 'Para negócios com faturamento estável que querem escala real. Processo. Estratégia. Execução. Sem promessas genéricas.',
    scheduleCta: 'Agende uma sessão',
    channelCta: 'Abra um canal',
  },
  programs: {
    heading: 'Programas',
    forWhomLabel: 'Para quem',
    includesLabel: 'Inclui',
    placeholder: [
      {
        name: 'Programa de Aceleração',
        tagline: 'Para negócios que querem escalar de forma estruturada.',
        targetAudience: 'Empresas com faturamento acima de R$ 50k/mês',
        deliverables: [
          'Diagnóstico completo do negócio',
          'Estratégia de crescimento personalizada',
          'Acompanhamento semanal por 3 meses',
          'Acesso direto ao fundador',
        ],
        ctaLabel: 'Iniciar o Programa',
      },
      {
        name: 'Advisory',
        tagline: 'Conselho estratégico contínuo para decisões que importam.',
        targetAudience: 'Fundadores e líderes de negócio',
        deliverables: [
          'Sessões mensais de estratégia',
          'Disponibilidade por mensagem',
          'Revisão de KPIs e metas',
        ],
        ctaLabel: 'Aplicar para o Advisory',
      },
    ],
  },
}

export const factory: Record<Lang, typeof en> = { en, pt }
