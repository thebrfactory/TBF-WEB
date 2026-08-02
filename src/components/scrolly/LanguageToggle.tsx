'use client'

// =============================================================================
// LanguageToggle — client component (ORD-03, entregável B)
// Alterna o idioma visível do ArticleScrolly SEM re-renderizar conteúdo: o
// componente só troca o atributo `data-lang` no wrapper raiz (#scrolly-article-
// root) — a visibilidade EN/PT em si é pura CSS (ver scrolly.css e
// ArticleScrolly.tsx). Como nada remonta, o scrollY em pixels não muda: a
// pessoa continua na mesma posição vertical da página.
// Guarda a escolha em localStorage (`tbf-article-lang`) para a próxima matéria.
// =============================================================================

import { useEffect, useState } from 'react'
import type { Lang } from '@/content/articles/the-day-brazil-stopped-translating-itself'

const STORAGE_KEY = 'tbf-article-lang'
const ROOT_ID = 'scrolly-article-root'

interface LanguageToggleProps {
  /** Idioma resolvido no servidor — usado como palpite inicial antes do mount. */
  initialLang: Lang
}

export function LanguageToggle({ initialLang }: LanguageToggleProps) {
  const [lang, setLang] = useState<Lang>(initialLang)

  // O <script> bloqueante em ArticleScrolly pode ter corrigido `data-lang`
  // (preferência salva) antes deste componente hidratar. Lê o valor real do
  // DOM para o botão nascer com o destaque certo, sem depender de re-render.
  useEffect(() => {
    const root = document.getElementById(ROOT_ID)
    const current = root?.getAttribute('data-lang')
    if (current === 'en' || current === 'pt') {
      setLang((prev) => (prev === current ? prev : current))
    }
  }, [])

  function switchTo(next: Lang) {
    if (next === lang) return
    const root = document.getElementById(ROOT_ID)
    root?.setAttribute('data-lang', next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // localStorage indisponível (modo privado) — troca visual segue, só não persiste
    }
    setLang(next)
  }

  return (
    <div className="scrolly-lang-toggle" role="group" aria-label="Idioma da matéria / Article language">
      <button
        type="button"
        className="scrolly-lang-toggle__btn"
        aria-pressed={lang === 'pt'}
        onClick={() => switchTo('pt')}
      >
        PT
      </button>
      <button
        type="button"
        className="scrolly-lang-toggle__btn"
        aria-pressed={lang === 'en'}
        onClick={() => switchTo('en')}
      >
        EN
      </button>
    </div>
  )
}
