// Rota `/ecosystem` — redireciona para /labels. A lógica vive em
// src/views/EcosystemView.tsx e serve os dois idiomas.

import EcosystemView from '@/views/EcosystemView'

export default function Page() {
  return <EcosystemView lang="en" />
}
