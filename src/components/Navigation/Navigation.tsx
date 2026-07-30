'use client'

// =============================================================================
// NAVIGATION — TBF WEB 2026
// Header sticky com scroll behavior + Mobile Drawer
// ARIA: role="banner", aria-expanded, aria-controls, focus trap
// =============================================================================

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.css'

const SEARCH_PLACEHOLDER = 'Search .TBF.'

// Labels saiu da navegação principal (por pedido): a entrada para as divisões
// vive agora só no final da página /pitch — "labels só aparecem pra quem está dentro".
// Pitch também saiu da navegação principal (pedido do fundador): o deck vive
// agora só no rodapé, em Pages. Mesma lógica de Labels, entrada discreta.
const NAV_LINKS: { href: string; label: string; external?: boolean }[] = [
  { href: '/editorial', label: 'Magazine' },
  // Login do brandsystem (.AURA. — auth Supabase). Outra zona → hard nav via <a>.
  { href: '/brandsystem/login', label: 'Login', external: true },
]

export function Navigation() {
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
    const handleScroll = () => {
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
        {/* Left: abaixo de 1024px o nav de desktop (com Magazine) some, então o
            slot vira MAG → /editorial; a partir de 1024px volta a ser Home,
            porque o Magazine já está na lista de links. Duas classes CSS
            alternam por breakpoint (sem JS/matchMedia, evita hydration mismatch). */}
        <Link
          href="/editorial"
          className={`${styles.nav__link} ${styles['nav__left--mobile']}`}
          aria-current={pathname === '/editorial' ? 'page' : undefined}
        >
          MAG
        </Link>
        <Link
          href="/"
          className={`${styles.nav__link} ${styles['nav__left--desktop']}`}
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          Home
        </Link>

        {/* Center: Logo — absolutamente centralizado */}
        <Link
          href="/"
          className={styles.nav__logo}
          aria-label=".THE BRAZILIAN FACTORY."
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

        {/* Right: Desktop nav + Search + Language + Burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--tbf-space-8)' }}>
          <nav aria-label="Navegação principal">
            <ul className={styles.nav__links} role="list">
              {NAV_LINKS.map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a href={link.href} className={styles.nav__link}>
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${styles.nav__link} ${pathname.startsWith(link.href) ? styles['nav__link--active'] : ''}`}
                      aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Search icon — desktop only */}
          <button
            className={styles.nav__icon}
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Language indicator — EN */}
          <span className={styles.nav__lang} aria-label="Site language: English">
            EN
          </span>

          {/* Burger button — mobile */}
          <button
            ref={burgerRef}
            className={styles.nav__burger}
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            aria-label={drawerOpen ? 'Fechar menu' : 'Abrir menu'}
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
              {drawerOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`drawer-overlay ${drawerOpen ? 'drawer-overlay--open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className={`drawer ${drawerOpen ? 'drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <button
          className="drawer__close"
          onClick={() => {
            setDrawerOpen(false)
            burgerRef.current?.focus()
          }}
          aria-label="Fechar menu"
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

        <nav className="drawer__nav" aria-label="Menu mobile">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} className="drawer__link">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="drawer__link">
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
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
            aria-label="Close search"
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
              Search .TBF.
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
                placeholder={SEARCH_PLACEHOLDER}
                aria-label="Search query"
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
              Press Esc to close
            </p>
          </div>
        </div>
      )}
    </>
  )
}
