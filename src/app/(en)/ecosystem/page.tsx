// Rota `/ecosystem`: redireciona para /labels. A lógica vive em
// src/views/EcosystemView.tsx e serve os dois idiomas.
// `noindex`: a página não tem conteúdo próprio, é só redirecionamento; quem
// deve aparecer na busca é o destino (/labels), não o intermediário.

import type { Metadata } from 'next'
import EcosystemView from '@/views/EcosystemView'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const TITLE = 'Ecosystem'
const DESCRIPTION = 'Redirecting to the .TBF. labels.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: languageAlternates('/ecosystem'),
  openGraph: openGraphMeta({ title: TITLE, description: DESCRIPTION }),
}

export default function Page() {
  return <EcosystemView lang="en" />
}
