'use client'

// =============================================================================
// NAVIGATION — TBF WEB 2026
// Header sticky com scroll behavior + Mobile Drawer
// ARIA: role="banner", aria-expanded, aria-controls, focus trap
// =============================================================================

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LanguageSwitch } from '@/components/LanguageSwitch/LanguageSwitch'
import { useLang } from '@/lib/LangProvider'
import { localizedPath } from '@/lib/i18n'
import { shell } from '@/content/i18n/shell'
import styles from './Navigation.module.css'

// O topo não carrega mais lista de links. Labels e Pitch já tinham saído por
// pedido dele (Labels vive no fim do /pitch, Pitch vive no rodapé); em
// 10/09/2026 saíram também Magazine e Login, que eram os dois últimos. Todos os
// destinos moram no menu agora, e o menu os desenha um a um porque cada um tem
// tratamento próprio: Magazine é lista, Login é pílula de acesso.
// `/brandsystem/login` é outra aplicação (zona .AURA.), então é <a> de verdade
// e fica fora do localizedPath().

export function Navigation() {
  const lang = useLang()
  const t = shell[lang].nav
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const searchInputRef = useRef<HTMLInputElement>(null)

  const lastScrollY = useRef(0)
  const drawerRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  // ─── Scroll behavior ──────────────────────────────────────────────────────

  useEffect(() => {
    // Throttle por rAF: o scroll nativo dispara muito mais rápido do que a
    // tela repinta, e cada disparo lia window.scrollY e escrevia estado na
    // hora. Agrupar num único cálculo por frame (`ticking`) corta esse
    // trabalho redundante sem mudar o resultado: mesmo comportamento, menos
    // vezes por segundo.
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        if (currentScrollY > 80) {
          setScrolled(true)
        } else {
          setScrolled(false)
        }

        if (currentScrollY > 300 && currentScrollY > lastScrollY.current) {
          setHidden(true)
        } else if (currentScrollY < lastScrollY.current) {
          setHidden(false)
        }

        lastScrollY.current = currentScrollY
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ─── Close drawer + search on route change ────────────────────────────────

  useEffect(() => {
    setDrawerOpen(false)
    setSearchOpen(false)
  }, [pathname])

  // ─── Search overlay — focus input + Escape ────────────────────────────────

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
  }, [searchOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])

  // ─── Focus trap no drawer ─────────────────────────────────────────────────

  const getFocusableElements = useCallback(() => {
    if (!drawerRef.current) return []
    return Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      )
    )
  }, [])

  const handleDrawerKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!drawerOpen) return

      if (e.key === 'Escape') {
        setDrawerOpen(false)
        burgerRef.current?.focus()
        return
      }

      if (e.key === 'Tab') {
        const focusable = getFocusableElements()
        if (focusable.length === 0) return

        const firstEl = focusable[0]
        const lastEl = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    },
    [drawerOpen, getFocusableElements]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleDrawerKeyDown)
    return () => document.removeEventListener('keydown', handleDrawerKeyDown)
  }, [handleDrawerKeyDown])

  // ─── Lock body scroll quando drawer aberto ────────────────────────────────

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
      // Focus no primeiro elemento do drawer
      setTimeout(() => {
        const focusable = getFocusableElements()
        if (focusable.length > 0) focusable[0].focus()
      }, 50)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen, getFocusableElements])

  // ─── Nav classes ─────────────────────────────────────────────────────────

  const navClasses = [
    styles.nav,
    scrolled ? styles['nav--scrolled'] : '',
    hidden ? styles['nav--hidden'] : styles['nav--revealed'],
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <header className={navClasses} role="banner">
        {/* Left: O SANDUÍCHE, em TODA largura de tela (pedido do fundador
            10/09/2026). Antes este slot era MAG no celular e Home no desktop, e
            o Magazine também vivia como link solto no topo em telas grandes.
            Agora o topo não carrega destino nenhum: ele carrega a PORTA. MAG
            virou item do menu, e o menu é o mesmo no celular e no computador.

            É o arranjo de A24, 032c e HBO: sanduíche na ponta esquerda,
            marca no centro, e nada mais competindo com os dois. O logotipo
            centralizado continua sendo o caminho para a home, então nenhum
            destino se perdeu. */}
        <button
          ref={burgerRef}
          className={styles.nav__burger}
          aria-expanded={drawerOpen}
          aria-controls="site-menu"
          aria-label={drawerOpen ? t.closeMenu : t.openMenu}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Center: Logo — absolutamente centralizado */}
        <Link
          href={localizedPath('/', lang)}
          className={styles.nav__logo}
          aria-label={t.logoAriaLabel}
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
        >
          <svg
            viewBox="100 336 396 170"
            width="52"
            height="22"
            aria-hidden="true"
            style={{ display: 'block', fill: 'currentColor' }}
          >
            <path d="M441.35,346c20.76,19.49,25.61,51.77,45.16,74.54-19.55,22.77-24.4,55.04-45.16,74.54-8.31-2.7-20.68,2.39-29.85.8,20.99-19.08,26.96-53.89,43.38-75.33-16.42-21.45-22.39-56.26-43.38-75.33,9.16-1.59,21.54,3.5,29.85.8Z"/>
            <path d="M154.73,346c-20.76,19.49-25.61,51.77-45.16,74.54,19.55,22.77,24.4,55.04,45.16,74.54,8.31-2.7,20.68,2.39,29.85.8-20.99-19.08-26.96-53.89-43.38-75.33,16.42-21.45,22.39-56.26,43.38-75.33-9.16-1.59-21.54,3.5-29.85.8Z"/>
            <path d="M245.75,428.67c7.24-.24,14.35-.73,21.13-1.91-1.88,10.84-1.6,23.14,0,36.34,4.86-5.21,9.45-10.51,13.35-16.05,6.32,8.98,15.19,17.47,25.62,25.65-.27-6.85-.78-13.59-1.91-20.04,11.02,1.87,23.52,1.53,36.91-.14-5.22-4.86-10.53-9.46-16.1-13.36,8.96-6.36,17.42-15.23,25.57-25.64-6.89.27-13.68.79-20.18,1.92,1.91-11.03,1.59-23.55-.07-36.96-4.77,5.13-9.27,10.36-13.11,15.83-6.41-9.09-15.41-17.67-25.97-25.92.25,7.13.77,14.14,1.94,20.84-10.87-1.87-23.19-1.59-36.39,0,5.06,4.67,10.2,9.08,15.57,12.85-9.25,6.53-17.97,15.76-26.37,26.58Z"/>
          </svg>
        </Link>

        {/* Right: Busca e o lugar da pílula de idioma.
            A lista de links de desktop (Magazine, Login) saiu daqui: os dois
            moram no menu agora, junto com tudo mais. Ver o comentário do
            sanduíche acima. */}
        <div className={styles.nav__right}>
          {/* Ícone de busca, só no desktop. */}
          <button
            className={styles.nav__icon}
            aria-label={t.search}
            onClick={() => setSearchOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>


          {/* Lugar da pílula PT|EN — ÚLTIMO da fila, porque a pílula é o
              elemento mais à direita do topo. Ela é renderizada FORA do header
              (logo abaixo) para sobreviver ao header se esconder no scroll;
              este espaçador invisível guarda o espaço dela aqui dentro, para
              que o menu sanduíche e a busca se alinhem à esquerda dela e nada
              salte quando o header some. Mesma largura, mesma variável. */}
          <span className={styles['nav__lang-slot']} aria-hidden="true" />
        </div>
      </header>

      {/* Idioma — o único elemento do topo que permanece SEMPRE visível,
          inclusive com o header escondido. Por isso é irmão do <header>, e
          não filho: um filho não escapa do transform do pai. */}
      <LanguageSwitch />

      {/* =====================================================================
          MENU DO SITE
          Antes era uma gaveta OPACA que entrava deslizando da direita e tapava
          a página inteira. Virou uma camada por cima da página, que continua
          visível atrás, escurecida e desfocada (pedido do fundador 10/09/2026:
          "o fundo fica escuro, opacidade mais baixa, e na frente os elementos
          em texto branco"). Quem abre o menu não sai da página onde estava.

          A GEOMETRIA, e o porquê de cada canto:
          . o X fica no alto à DIREITA, no mesmo lugar em que a pílula de idioma
            vive, para o polegar não ter que aprender um destino novo;
          . o LOGIN fica no alto à ESQUERDA, no canto OPOSTO ao X (pedido dele).
            Não é item da lista e não se parece com um: é pílula com contorno,
            em letra miúda, com uma linha abaixo dizendo para quem ela é. É o
            desenho do "SIGN IN" da HBO, onde o acesso é botão e não link;
          . a lista fica embaixo, alinhada à esquerda, em corpo grande, com um
            rótulo pequeno em cima do grupo. Esse é o desenho do 032c e da A24.
          ===================================================================== */}
      <div
        className={`menu-scrim ${drawerOpen ? 'menu-scrim--open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <div
        id="site-menu"
        ref={drawerRef}
        className={`menu ${drawerOpen ? 'menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t.navMenu}
        inert={!drawerOpen}
      >
        {/* Canto superior esquerdo: a porta dos assinantes. */}
        <a href="/brandsystem/login" className="menu__access">
          <span className="menu__access-pill">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            {t.login}
          </span>
          <span className="menu__access-note">{t.loginNote}</span>
        </a>

        {/* Canto superior direito: sair. */}
        <button
          className="menu__close"
          onClick={() => {
            setDrawerOpen(false)
            burgerRef.current?.focus()
          }}
          aria-label={t.closeMenu}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="menu__nav" aria-label={t.mobileMenu}>
          <p className="menu__group">{t.menuGroupRead}</p>
          <Link href={localizedPath('/zine', lang)} className="menu__link">
            {t.magazine}
          </Link>
        </nav>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.search}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'calc(var(--tbf-nav-z) + 1)' as React.CSSProperties['zIndex'],
            background: 'rgba(0,0,0,0.96)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--tbf-space-8)',
          }}
        >
          <button
            aria-label={t.closeSearch}
            onClick={() => { setSearchOpen(false); setSearchQuery('') }}
            style={{
              position: 'absolute',
              top: 'var(--tbf-space-6)',
              right: 'var(--tbf-space-6)',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              padding: 'var(--tbf-space-2)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div style={{ width: '100%', maxWidth: '640px' }}>
            <p style={{
              fontFamily: 'var(--tbf-type-micro-family)',
              fontSize: 'var(--tbf-type-micro-size)',
              letterSpacing: 'var(--tbf-type-micro-ls)',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 'var(--tbf-space-4)',
            }}>
              {t.searchTitle}
            </p>
            <div style={{ position: 'relative' }}>
              <svg
                width="18" height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchQuery}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '999px',
                  color: '#fff',
                  fontFamily: 'var(--tbf-type-h2-family)',
                  fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                  fontWeight: 300,
                  padding: '1rem 1.5rem 1rem 3rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <p style={{
              fontFamily: 'var(--tbf-type-micro-family)',
              fontSize: 'var(--tbf-type-micro-size)',
              letterSpacing: 'var(--tbf-type-micro-ls)',
              color: 'rgba(255,255,255,0.25)',
              marginTop: 'var(--tbf-space-4)',
              textTransform: 'uppercase',
            }}>
              {t.escToClose}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
