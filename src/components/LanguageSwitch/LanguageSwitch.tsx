'use client'

// =============================================================================
// LanguageSwitch — o controle de idioma do site inteiro
//
// Nasceu como o toggle da matéria scrolly (components/scrolly/LanguageToggle,
// removido) e subiu para a navegação por pedido do fundador: a pílula PT|EN
// ocupa agora o lugar do antigo rótulo estático "EN" no topo da página.
//
// POR QUE ELE NÃO VIVE DENTRO DO <header>: o header se esconde ao rolar para
// baixo (translateY(-100%)), e a pílula precisa ficar visível SEMPRE — é o
// único elemento fixo que sobrevive ao header sumir. Um filho não escapa do
// transform do pai, então a pílula é irmã do <header>, com position:fixed
// própria. Para o alinhamento não depender de sorte, o header carrega um
// espaçador invisível da largura exata da pílula (.nav__lang-slot): assim os
// outros ícones se organizam ao redor dela e nada salta quando o header some.
// A largura de ambos vem da mesma variável (--tbf-lang-switch-w).
//
// ESCOPO ATUAL (fase 1): a troca alterna o idioma da MATÉRIA scrolly, que é o
// único conteúdo bilíngue do site hoje — o mesmo contrato de antes
// (`data-lang` no wrapper #scrolly-article-root, visibilidade por CSS pura).
// Fora de uma matéria, a pílula registra a preferência e ainda não tem para
// onde levar. Quem dá destino a ela nas outras páginas é a fase 2, a duplicação
// do site em PT e EN — e aí o destino vira navegação de rota, não CSS.
// =============================================================================

import { useEffect, useState } from 'react'

export type Lang = 'en' | 'pt'

const STORAGE_KEY = 'tbf-article-lang'
const ARTICLE_ROOT_ID = 'scrolly-article-root'

function isLang(value: string | null | undefined): value is Lang {
  return value === 'en' || value === 'pt'
}

export function LanguageSwitch() {
  // Nasce em 'en' — o idioma nativo do site — nos dois lados (servidor e
  // cliente), então a hidratação bate. O ajuste para a preferência real
  // acontece depois do mount, abaixo.
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    // Prioridade: idioma que a página já está mostrando > preferência salva.
    // Numa matéria, o <script> bloqueante do ArticleScrolly já resolveu isso
    // antes da primeira pintura, então o DOM é a fonte mais confiável.
    const fromArticle = document.getElementById(ARTICLE_ROOT_ID)?.getAttribute('data-lang')
    if (isLang(fromArticle)) {
      setLang(fromArticle)
      return
    }
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (isLang(saved)) setLang(saved)
    } catch {
      // localStorage indisponível (modo privado) — segue no idioma nativo
    }
  }, [])

  function switchTo(next: Lang) {
    if (next === lang) return

    // Matéria bilíngue: trocar o atributo troca o idioma visível por CSS, sem
    // remontar nada — a pessoa não perde a posição de leitura em pixels.
    document.getElementById(ARTICLE_ROOT_ID)?.setAttribute('data-lang', next)

    // Marca no <html> para quem quiser reagir a idioma via CSS/JS sem
    // conhecer a matéria. É também o gancho que a fase 2 vai usar.
    document.documentElement.setAttribute('data-lang', next)

    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // idem: a troca visual acontece, só não persiste
    }

    setLang(next)
  }

  return (
    <div className="lang-switch" role="group" aria-label="Idioma / Language">
      <button
        type="button"
        className="lang-switch__btn"
        aria-pressed={lang === 'pt'}
        onClick={() => switchTo('pt')}
      >
        PT
      </button>
      <button
        type="button"
        className="lang-switch__btn"
        aria-pressed={lang === 'en'}
        onClick={() => switchTo('en')}
      >
        EN
      </button>
    </div>
  )
}
