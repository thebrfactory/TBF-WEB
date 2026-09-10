// Rota `/pt/ecosystem`: redireciona para /labels. A lógica vive em
// src/views/EcosystemView.tsx e serve os dois idiomas.
// `noindex`: a página não tem conteúdo próprio, é só redirecionamento; quem
// deve aparecer na busca é o destino (/pt/labels), não o intermediário.

import type { Metadata } from 'next'
import EcosystemView from '@/views/EcosystemView'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const TITLE = 'Ecosystem'
const DESCRIPTION = 'Redirecionando para os labels da .TBF.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: languageAlternates('/ecosystem'),
  openGraph: openGraphMeta({ title: TITLE, description: DESCRIPTION }),
}

export default function Page() {
  return <EcosystemView lang="pt" />
}
