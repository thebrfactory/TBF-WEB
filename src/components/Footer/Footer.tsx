// =============================================================================
// FOOTER — TBF WEB 2026
// 3 colunas desktop / 2 colunas mobile-first
// =============================================================================

import Link from 'next/link'
import Image from 'next/image'
import { CookiePrefsButton } from '@/components/CookiePrefs/CookiePrefsButton'
import deployCount from '@/data/deploy-count.json'

// Selo de versão do rodapé. O número de deploy é REAL: sai de
// src/data/deploy-count.json, incrementado pela skill /deploy a cada publicação
// em produção (ver scripts/bump-deploy-count.mjs). Antes era um "1.5.0" fixo que
// nunca mudou — mentira simpática, mas mentira.
const SITE_VERSION = `.TBF.SYSTEM VERSION ${deployCount.version} · DEPLOY ${deployCount.deploys}`

const NAV_COLUMNS = [
  {
    heading: 'Pages',
    links: [
      { href: '/editorial', label: 'Magazine' },
      { href: '/labels', label: 'Labels' },
      { href: '/manifesto', label: 'Manifesto' },
      { href: '/collective', label: 'Collective' },
      { href: '/access', label: 'Access' },
      // Os dois decks, na ordem cronológica: a 1.0 logo acima da 2.0 (pedido
      // 2026-07-31). A 1.0 estava publicada mas sem nenhum link no site. Os
      // rótulos carregam a versão de propósito: sem eles não dá para distinguir
      // um deck do outro no rodapé.
      { href: '/pitch', label: 'Pitch 1.0' },
      { href: '/pitch/v2', label: 'Pitch 2.0' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/consulting', label: 'Consulting' },
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

        {/* Top: selo da marca (.TBF. SÃO PAULO) — reduzido a um selo, no mesmo
            lugar. Blocos Labels + Instagram removidos (pedido). */}
        <div className="footer__grid--top">
          <div>
            <Link href="/" aria-label=".THE BRAZILIAN FACTORY." style={{ display: 'block', maxWidth: 110 }}>
              <Image
                src="/brand/TBF-SAO-PAULO.svg"
                alt=".TBF. SÃO PAULO"
                width={110}
                height={79}
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
        </div>

        {/* Cidades .TBF.: logo abaixo de "Consumed Worldwide." e ACIMA das colunas
            Pages/Company/Legal (pedido). Espalhadas de ponta a ponta da largura,
            sem separador. */}
        <div className="footer__cities">
          <p className="footer__cities-list">
            <span>São Paulo, SP.</span>
            <span>Goiânia, GO.</span>
            <span>Salvador, BA.</span>
          </p>
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
                {col.heading === 'Legal' && (
                  <li>
                    <CookiePrefsButton />
                  </li>
                )}
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
            R. Pamplona, 145. Jardim Paulista, São Paulo, SP. 01405-100
          </p>
          <p className="footer__meta" style={{ margin: 0, opacity: 0.4 }}>
            {SITE_VERSION}
          </p>
        </div>

      </div>
    </footer>
  )
}
