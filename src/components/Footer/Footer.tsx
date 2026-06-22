// =============================================================================
// FOOTER — TBF WEB 2026
// 3 colunas desktop / 2 colunas mobile-first
// =============================================================================

import Link from 'next/link'
import Image from 'next/image'

const SITE_VERSION = '.TBF.SYSTEM VERSION 1.5.0'

const FOOTER_BUS = [
  { href: '/editorial', label: '.TBF. | THE BRAZILIAN FACTORY' },
  { href: '/labels/thefioredaily', label: '.TFD. | THE FIORE DAILY' },
  { href: '/labels/runwayunited', label: '.RUC. | RUNWAY UNITED COLLECTIVE' },
  { href: '/labels/factoryofgrowth', label: '.TGF. | THE GROWTH FACTORY' },
] as const

const SOCIAL_HANDLES = [
  { href: 'https://instagram.com/thebrfactory', label: '@thebrfactory' },
  { href: 'https://instagram.com/thefioredaily', label: '@thefioredaily' },
  { href: 'https://instagram.com/runwayunited', label: '@runwayunited' },
  { href: 'https://instagram.com/factoryofgrowth', label: '@factoryofgrowth' },
] as const

const NAV_COLUMNS = [
  {
    heading: 'Pages',
    links: [
      { href: '/editorial', label: 'Magazine' },
      { href: '/labels', label: 'Labels' },
      { href: '/manifesto', label: 'Manifesto' },
      { href: '/collective', label: 'Collective' },
      { href: '/pitch', label: 'Pitch' },
      { href: '/access', label: 'Access' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/press', label: 'Press Room' },
      { href: '/about', label: 'About Us' },
      { href: '/about/quick-facts', label: 'Quick Facts' },
      { href: '/press/media', label: 'Media' },
      { href: '/creators/tavaristico', label: 'Founders' },
      { href: '/careers', label: 'Careers' },
      { href: '/publishing', label: 'Publishing' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/legal/terms', label: 'Terms of Service' },
      { href: '/legal/privacy', label: 'Privacy Policy' },
      { href: '/legal/conduct', label: 'Code of Conduct' },
      { href: '/legal/law-enforcement', label: 'Law Enforcement Guidelines' },
    ],
  },
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">

        {/* Top: logo full-width | labels + instagram 2-col mobile / 3-col desktop */}
        <div className="footer__grid--top">
          <div>
            <Link href="/" aria-label=".THE BRAZILIAN FACTORY." style={{ display: 'block', maxWidth: 220 }}>
              <Image
                src="/brand/TBF-SAO-PAULO.svg"
                alt=".TBF. SÃO PAULO"
                width={220}
                height={158}
                style={{ display: 'block', width: '100%', height: 'auto' }}
                unoptimized
              />
            </Link>
            <p className="footer__meta" style={{ padding: 0, textTransform: 'uppercase', marginTop: 'var(--tbf-space-4)' }}>
              Culture™
              <br />
              Crafted in São Paulo, Brazil.
              <br />
              Consumed Worldwide.
            </p>
          </div>

          <nav aria-label=".TBF. labels">
            <p className="footer__meta" style={{ textTransform: 'uppercase', marginBottom: 'var(--tbf-space-4)', padding: 0, opacity: 0.4 }}>
              Labels
            </p>
            <ul className="footer__nav-list" role="list">
              {FOOTER_BUS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label=".TBF. social media">
            <p className="footer__meta" style={{ textTransform: 'uppercase', marginBottom: 'var(--tbf-space-4)', padding: 0, opacity: 0.4 }}>
              Instagram
            </p>
            <ul className="footer__nav-list" role="list" style={{ opacity: 0.55 }}>
              {SOCIAL_HANDLES.map((handle) => (
                <li key={handle.href}>
                  <a
                    href={handle.href}
                    className="footer__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${handle.label} on Instagram (opens in new tab)`}
                  >
                    {handle.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Nav: pages + company 2-col mobile / 3-col desktop; legal full-width on mobile */}
        <div className="footer__grid--nav">
          {NAV_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p
                className="footer__meta"
                style={{ textTransform: 'uppercase', marginBottom: 'var(--tbf-space-4)', padding: 0, opacity: 0.4 }}
              >
                {col.heading}
              </p>
              <ul className="footer__nav-list" role="list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer__link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Copyright + version */}
        <div className="footer__copyright">
          <p className="footer__meta" style={{ textTransform: 'uppercase', margin: 0 }}>
            © {currentYear} .TBF. INC · CNPJ 61.360.565/0001-74
          </p>
          <p className="footer__meta" style={{ textTransform: 'uppercase', margin: 0 }}>
            R. Pamplona, 145 — Jardim Paulista, São Paulo — SP, 01405-100
          </p>
          <p className="footer__meta" style={{ margin: 0, opacity: 0.4 }}>
            {SITE_VERSION}
          </p>
        </div>

      </div>
    </footer>
  )
}
