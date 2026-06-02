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
  { href: '/melfiore', label: '.TFD. | MELFIORE' },
  { href: '/runway', label: '.RUC. | RUNWAY UNITED COLLECTIVE' },
  { href: '/factory', label: '.TGF. | THE GROWTH FACTORY' },
] as const

const SOCIAL_HANDLES = [
  { href: 'https://instagram.com/thebrfactory', label: '@thebrfactory' },
  { href: 'https://instagram.com/thefioredaily', label: '@thefioredaily' },
  { href: 'https://instagram.com/runwayunited', label: '@runwayunited' },
  { href: 'https://instagram.com/factoryofgrowth', label: '@factoryofgrowth' },
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__grid">
          {/* Col 1: Logo + descrição */}
          <div>
            <Link href="/" aria-label=".THE BRAZILIAN FACTORY." style={{ display: 'inline-block', marginBottom: 'var(--tbf-space-4)' }}>
              <Image
                src="/brand/TBF-SAO-PAULO.svg"
                alt=".TBF. SÃO PAULO"
                width={160}
                height={115}
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
              Crafted in São Paulo.
              <br />
              Consumed Worldwide.
            </p>
          </div>

          {/* Col 2: Navegação */}
          <nav aria-label="Footer navigation — pages">
            <ul className="footer__nav-list" role="list">
              {FOOTER_NAV.map((link) => (
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

          {/* Col 4: Labels / BUs */}
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
        </div>

        {/* Meta / copyright — inclui endereço completo */}
        <p
          className="footer__meta"
          style={{ textTransform: 'uppercase' }}
        >
          © {currentYear} .TBF. INC — CNPJ 61.360.565/0001-74 · RUA PAMPLONA 145, JARDIM PAULISTA, SÃO PAULO, SP, 01405-900 · BRASIL
        </p>
      </div>
    </footer>
  )
}
