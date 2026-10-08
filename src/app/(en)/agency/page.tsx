// Rota `/agency`: porta fechada, só para membros.
// O componente vive em src/components/MembersGate e serve as três áreas.

import type { Metadata } from 'next'
import { MembersGate } from '@/components/MembersGate/MembersGate'
import { membersGate } from '@/content/i18n/pages/members-gate'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = membersGate.en

export const metadata: Metadata = {
  title: t.meta.title.agency,
  description: t.meta.description,
  alternates: languageAlternates('/agency'),
  openGraph: openGraphMeta({ title: `${t.meta.title.agency} | .THE BRAZILIAN FACTORY.`, description: t.meta.ogDescription }),
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page() {
  return <MembersGate area="agency" lang="en" />
}
