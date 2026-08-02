// =============================================================================
// ECOSYSTEM — redireciona para /labels. Serve `/ecosystem` (inglês) e
// `/pt/ecosystem` (português).
//
// Não tem texto visível (é só um redirect), então não existe dicionário. O que
// muda por idioma é o DESTINO: quem chega em `/pt/ecosystem` tem de cair em
// `/pt/labels`, senão o redirecionamento devolve a pessoa para o site em
// inglês sem nenhum aviso.
// =============================================================================

import { redirect } from 'next/navigation'
import { localizedPath, type Lang } from '@/lib/i18n'

export default function EcosystemView({ lang }: { lang: Lang }) {
  // `return` (não só chamar) porque `redirect()` é tipado como `never`: sem o
  // `return`, o TS infere o retorno da função como `void` e ela deixa de
  // bater com o tipo de componente JSX esperado por quem a renderiza.
  return redirect(localizedPath('/labels', lang))
}
