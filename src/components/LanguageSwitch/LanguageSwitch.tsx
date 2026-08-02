'use client'

// =============================================================================
// LanguageSwitch — o controle de idioma do site inteiro
//
// Ocupa o lugar do antigo rótulo estático "EN" no topo da página.
//
// POR QUE ELE NÃO VIVE DENTRO DO <header>: o header se esconde ao rolar para
// baixo (translateY(-100%)), e a pílula precisa ficar visível SEMPRE — é o
// único elemento fixo que sobrevive ao header sumir. Um filho não escapa do
// transform do pai, então a pílula é irmã do <header>, com position:fixed
// própria. Para o alinhamento não depender de sorte, o header carrega um
// espaçador invisível da largura exata da pílula (.nav__lang-slot): assim os
// outros ícones se organizam ao redor dela e nada salta quando o header some.
//
// SÃO LINKS, NÃO BOTÕES. Cada idioma é uma URL de verdade (`/manifesto` e
// `/pt/manifesto`), então trocar de idioma é navegar — o que também significa
// que a troca pode ser aberta em outra aba, compartilhada e indexada. O destino
// é a MESMA página no outro idioma, nunca a home: quem está lendo uma matéria
// em inglês e aperta PT continua na matéria.
//
// A troca entre idiomas atravessa dois root layouts diferentes, então o Next
// faz um carregamento completo em vez de navegação de cliente. É o preço de
// cada idioma ter o seu próprio `<html lang>`, e é barato: ninguém troca de
// idioma o tempo todo.
// =============================================================================

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localizedPath, splitLang, type Lang } from '@/lib/i18n'

/** Ordem de leitura da pílula: PT à esquerda, EN à direita (desenho aprovado). */
const ORDER: readonly Lang[] = ['pt', 'en']

/**
 * Rotas que existem em UM idioma só, e por isso não podem oferecer a troca:
 * apertar PT levaria a um 404. Hoje é só o Studio do Sanity, que é ferramenta
 * de administração e não página do site. Se algum dia entrar outra, ela vem
 * para cá em vez de virar link quebrado.
 */
const SEM_GEMEO = ['/studio']

export function LanguageSwitch() {
  const pathname = usePathname() || '/'
  const { lang, path } = splitLang(pathname)

  if (SEM_GEMEO.some((p) => path === p || path.startsWith(p + '/'))) return null

  return (
    <div className="lang-switch" role="group" aria-label="Idioma / Language">
      {ORDER.map((code) => {
        const active = code === lang
        return (
          <Link
            key={code}
            href={localizedPath(pathname, code)}
            className="lang-switch__btn"
            data-active={active}
            hrefLang={code}
            aria-current={active ? 'true' : undefined}
          >
            {code.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
