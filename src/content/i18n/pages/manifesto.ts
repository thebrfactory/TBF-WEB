// =============================================================================
// Dicionário do MANIFESTO. Convenções: ../README.md
//
// EXCEÇÃO CONSCIENTE: o corpo do manifesto NÃO entra aqui. Ele é publicado em
// português e em inglês LADO A LADO, nas duas colunas, e é assim de propósito:
// o documento fundador de uma casa que fala das duas margens mostra as duas ao
// mesmo tempo. Traduzir isso em duas rotas separadas destruiria o artefato.
// O que segue o idioma da rota é o cromo: título, rótulos e os CTAs.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Manifesto',
    description:
      'The founding document of .THE BRAZILIAN FACTORY. Culture is produced, not followed.',
    ogTitle: 'Manifesto | .THE BRAZILIAN FACTORY.',
    ogDescription: 'The founding document of .THE BRAZILIAN FACTORY.',
  },
  heading: 'Manifesto',
  bodyPtLabel: 'Manifesto in Portuguese',
  nextStepsLabel: 'Next steps',
  ctaEditorial: 'Enter the Editorial',
  ctaAccess: 'Apply for Access',
}

const pt: typeof en = {
  meta: {
    title: 'Manifesto',
    description:
      'O documento fundador da .THE BRAZILIAN FACTORY. A cultura que se produz, não se segue.',
    ogTitle: 'Manifesto | .THE BRAZILIAN FACTORY.',
    ogDescription: 'O documento fundador da .THE BRAZILIAN FACTORY.',
  },
  heading: 'Manifesto',
  bodyPtLabel: 'Manifesto em português',
  nextStepsLabel: 'Próximos passos',
  ctaEditorial: 'Entrar no Zine',
  ctaAccess: 'Pedir acesso',
}

export const manifesto: Record<Lang, typeof en> = { en, pt }
