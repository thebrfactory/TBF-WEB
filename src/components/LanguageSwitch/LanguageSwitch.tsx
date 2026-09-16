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

import { useState } from 'react'
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

/** Nome falado de cada idioma, para o aria-label do link (o rotulo visual e
 * so o icone). */
const NOME: Record<Lang, string> = { pt: 'Português', en: 'English' }

/** Selo circular da bandeira do Brasil. SVG proprio, cores fixas da bandeira:
 * nao sao token de marca, sao cor de pais. */
function BandeiraBrasil() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="12" fill="#009C3B" />
      <path d="M12 4L21 12L12 20L3 12Z" fill="#FFDF00" />
      <circle cx="12" cy="12" r="5" fill="#002776" />
    </svg>
  )
}

/** Selo circular de globo, para o idioma sem bandeira propria (ingles como
 * lingua franca). Cores dos tokens de superficie/texto, entao seguem o tema. */
function Globo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="12" fill="var(--tbf-color-quartz)" />
      <g fill="none" stroke="var(--tbf-color-parchment)" strokeWidth="1.4">
        <circle cx="12" cy="12" r="8.5" />
        <ellipse cx="12" cy="12" rx="3.6" ry="8.5" />
        <path d="M4 9.5h16M4 14.5h16" />
      </g>
    </svg>
  )
}

export function LanguageSwitch() {
  const pathname = usePathname() || '/'
  const { lang, path } = splitLang(pathname)

  // A BOLINHA ATRAVESSA A PÍLULA (pedido do fundador 2026-08-08).
  //
  // O problema de desenho: trocar de idioma é um carregamento COMPLETO de
  // página (dois root layouts, ver o comentário acima). Se a bolinha só
  // dependesse da URL, ela já nasceria do outro lado na página nova e ninguém
  // veria movimento nenhum — a troca seria um salto seco.
  //
  // `indo` é o idioma clicado. Ele desloca a bolinha NA HORA do clique, enquanto
  // o navegador ainda está buscando a página nova: a viagem acontece por cima da
  // página velha, que continua na tela até o documento novo chegar. Nada segura
  // a navegação — o link é um link de verdade e vai embora no mesmo instante.
  // Chegando a página nova, o componente remonta e o estado zera sozinho.
  const [indo, setIndo] = useState<Lang | null>(null)
  const mostrado = indo ?? lang

  if (SEM_GEMEO.some((p) => path === p || path.startsWith(p + '/'))) return null

  return (
    <div
      className="lang-switch"
      data-lang={mostrado}
      role="group"
      aria-label="Idioma / Language"
    >
      {/* A bolinha. Era o fundo do botão ativo (aparecia e sumia); agora é UM
          elemento só que escorrega entre as duas pontas. */}
      <span className="lang-switch__thumb" aria-hidden="true" />

      {ORDER.map((code) => {
        // `aria-current` segue a URL (o que a página É), o traço visual segue o
        // destino do clique (para onde ela está indo). Só divergem durante o
        // carregamento.
        const real = code === lang
        return (
          <Link
            key={code}
            href={localizedPath(pathname, code)}
            className="lang-switch__btn"
            data-active={code === mostrado}
            hrefLang={code}
            aria-label={NOME[code]}
            aria-current={real ? 'true' : undefined}
            onClick={() => setIndo(code)}
          >
            {code === 'pt' ? <BandeiraBrasil /> : <Globo />}
          </Link>
        )
      })}
    </div>
  )
}
