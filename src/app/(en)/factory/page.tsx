// Rota `/factory`: inglês. Redireciona para /labels/factoryofgrowth.
// A página em si vive em src/views/FactoryView.tsx.
// `noindex`: a página não tem conteúdo próprio, é só redirecionamento; quem
// deve aparecer na busca é o destino, não o intermediário.

import type { Metadata } from 'next'
import FactoryView from '@/views/FactoryView'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const TITLE = 'Factory'
const DESCRIPTION = 'Redirecting to The Growth Factory.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: languageAlternates('/factory'),
  openGraph: openGraphMeta({ title: TITLE, description: DESCRIPTION }),
}

export default function Page() {
  return <FactoryView lang="en" />
}
