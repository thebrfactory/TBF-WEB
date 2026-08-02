// Rota `/pt/factory` — português. Redireciona para /pt/labels/factoryofgrowth.
// A página em si vive em src/views/FactoryView.tsx.

import FactoryView from '@/views/FactoryView'

export default function Page() {
  return <FactoryView lang="pt" />
}
