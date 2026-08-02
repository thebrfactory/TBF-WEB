// Rota `/factory` — sem conteúdo próprio: redireciona para a página real do
// .TGF. (/labels/factoryofgrowth), respeitando o idioma corrente. Mantido nos
// dois idiomas por consistência com o resto do site, ainda que o destino
// (labels/factoryofgrowth) esteja fora do escopo desta leva.

import { redirect } from 'next/navigation'
import { localizedPath, type Lang } from '@/lib/i18n'

export default function FactoryView({ lang }: { lang: Lang }): never {
  redirect(localizedPath('/labels/factoryofgrowth', lang))
}
