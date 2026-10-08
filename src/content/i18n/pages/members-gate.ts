// =============================================================================
// Dicionário das portas fechadas /shop, /talks e /agency. Convenções: ../README.md
// Uma porta só, três nomes: o componente MembersGate lê daqui.
// Nomes de área são marca e ficam em inglês nos dois idiomas.
// =============================================================================

import type { Lang } from '@/lib/i18n'

export type GateArea = 'shop' | 'talks' | 'agency'

const en = {
  areas: {
    shop: { name: 'SHOP', line: 'A private room of .TBF.' },
    talks: { name: 'TALKS', line: 'A private room of .TBF. for members.' },
    agency: { name: 'AGENCY', line: 'A private room of .TBF. Members only.' },
  },
  meta: {
    title: { shop: 'Shop', talks: 'Talks', agency: 'Agency' },
    description: 'A private room of .TBF. Members only.',
    ogDescription: 'Members only.',
  },
  login: 'Login',
  membersOnly: 'Members only',
  notice: 'Membership by invitation.',
  noticeLink: 'Access',
  roomLabel: 'Members only area',
}

const pt: typeof en = {
  areas: {
    shop: { name: 'SHOP', line: 'Uma sala privada da .TBF.' },
    talks: { name: 'TALKS', line: 'Uma sala privada da .TBF. para membros.' },
    agency: { name: 'AGENCY', line: 'Uma sala privada da .TBF. Só para membros.' },
  },
  meta: {
    title: { shop: 'Shop', talks: 'Talks', agency: 'Agency' },
    description: 'Uma sala privada da .TBF. Só para membros.',
    ogDescription: 'Só para membros.',
  },
  login: 'Login',
  membersOnly: 'Members only',
  notice: 'Acesso por convite.',
  noticeLink: 'Access',
  roomLabel: 'Área exclusiva para membros',
}

export const membersGate: Record<Lang, typeof en> = { en, pt }
