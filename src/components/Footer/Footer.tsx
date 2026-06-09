// =============================================================================
// FOOTER — TBF WEB 2026
// 4 colunas desktop / vertical mobile
// =============================================================================

import Link from 'next/link'
import Image from 'next/image'

const FOOTER_NAV = [
  { href: '/editorial', label: 'Magazine' },
  { href: '/labels', label: 'Labels' },
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/collective', label: 'Collective' },
  { href: '/pitch', label: 'Pitch' },
  { href: '/access', label: 'Access' },
] as const

const FOOTER_BUS = [
  { href: '/editorial', label: '.TBF. | THE BRAZILIAN FACTORY' },
  { href: '/melfiore', label: '.TFD. | THE FIORE DAILY' },
  { href: '/runway', label: '.RUC. | RUNWAY UNITED COLLECTIVE' },
  { href: '/labels/factoryofgrowth', label: '.TGF. | THE GROWTH FACTORY' },
] as const

const SOCIAL_HANDLES = [
  { href: 'https://instagram.com/thebrfactory', label: '@thebrfactory' },
  { href: 'https://instagram.com/thefioredaily', label: '@thefioredaily' },
  { href: 'https://instagram.com/runwayunited', label: '@runwayunited' },
  { href: 'https://instagram.com/factoryofgrowth', label: '@factoryofgrowth' },
] as const

const COMPANY_LINKS = [
  { href: '/press', label: 'Press Room' },
  { href: '/about', label: 'About Us' },
  { href: '/about/quick-facts', label: 'Quick Facts' },
  { href: '/press/media', label: 'Media' },
  { href: '/about/founders', label: 'Founders' },
  { href: '/careers', label: 'Careers' },
  { href: '/publishing', label: 'Publishing' },
] as const

const LEGAL_LINKS = [
  { href: '/legal/terms', label: 'Terms of Service' },
  { href: '/legal/privacy', label: 'Privacy Policy' },
  { href: '/legal/conduct', label: 'Code of Conduct' },
  { href: '/legal/law-enforcement', label: 'Law Enforcement Guidelines' },
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* Grid: 3 colunas — Logo | Labels | Social */}
        <div className="footer__grid">
          {/* Col 1: Logo + descrição */}
          <div>
            <Link href="/" aria-label=".THE BRAZILIAN FACTORY." style={{ display: 'inline-block', marginBottom: 'var(--tbf-space-4)' }}>
              <Image
                src="/brand/TBF-SAO-PAULO.svg"
                alt=".TBF. SÃO PAULO"
                width={220}
                height={158}
                style={{ display: 'block', filter: 'invert(0)' }}
                unoptimized
              />
            </Link>
            <p
              className="footer__meta"
              style={{
                marginTop: 'var(--tbf-space-3)',
                padding: 0,
                textTransform: 'uppercase',
              }}
            >
              Culture™
              <br />
              Crafted in São Paulo, Brazil.
              <br />
              Consumed Worldwide.
            </p>
          </div>

          {/* Col 2: Labels / BUs */}
          <nav aria-label=".TBF. labels">
            <ul className="footer__nav-list" role="list">
              {FOOTER_BUS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Social handles */}
          <nav aria-label=".TBF. social media">
            <ul className="footer__nav-list" role="list">
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

        {/* Navegação — linha horizontal acima das institucional */}
        <nav
          aria-label="Footer navigation — pages"
          style={{ marginTop: 'var(--tbf-space-12)' }}
        >
          <ul
            role="list"
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--tbf-space-6)',
            }}
          >
            {FOOTER_NAV.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company links — linha institucional */}
        <nav
          aria-label="Company information"
          style={{ marginTop: 'var(--tbf-space-6)' }}
        >
          <ul
            role="list"
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--tbf-space-6)',
            }}
          >
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal links + copyright em coluna */}
        <div
          style={{
            marginTop: 'var(--tbf-space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--tbf-space-3)',
          }}
        >
          <ul
            role="list"
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--tbf-space-6)',
            }}
          >
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="footer__meta" style={{ textTransform: 'uppercase', margin: 0 }}>
            © {currentYear} .TBF. INC · CNPJ 61.360.565/0001-74 · R. Pamplona, 145 - Jardim Paulista, São Paulo - SP, 01405-100
          </p>
        </div>
      </div>
    </footer>
  )
}
