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

const NAV_LINKS = [
  { href: '/editorial', label: 'Magazine' },
  { href: '/labels', label: 'Labels' },
  { href: '/pitch', label: 'Pitch' },
] as const

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

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

  // ─── Close drawer on route change ─────────────────────────────────────────

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

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
        {/* Logo — MONOGRAM-02 (simpler monogram: brackets + star) */}
        <Link
          href="/"
          className={styles.nav__logo}
          aria-label=".THE BRAZILIAN FACTORY."
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

        {/* Desktop navigation */}
        <nav aria-label="Navegação principal">
          <ul className={styles.nav__links} role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.nav__link} ${pathname.startsWith(link.href) ? styles['nav__link--active'] : ''}`}
                  aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

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
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="drawer__link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
