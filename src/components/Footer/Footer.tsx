// =============================================================================
// FOOTER — TBF WEB 2026
// 3 colunas desktop / 2 colunas mobile-first
// =============================================================================

import Link from 'next/link'
import Image from 'next/image'
import { CookiePrefsButton } from '@/components/CookiePrefs/CookiePrefsButton'
import { Ticker } from '@/components/Ticker/Ticker'
import deployCount from '@/data/deploy-count.json'
import { localizedPath, type Lang } from '@/lib/i18n'
import { shell } from '@/content/i18n/shell'

// Selo de versão do rodapé. Nomenclatura oficial (pedido do fundador
// 2026-07-31): `.TBF. OS 3.0.<deploy>`. O 3.0 é a linhagem do sistema
// (SISTEMA 3.0 / TBF BUSINESS OS) e o último número é SEMPRE o número de
// deploy REAL, que sai de src/data/deploy-count.json e é incrementado pela
// skill /deploy a cada publicação em produção.
const SITE_VERSION = `.TBF. OS 3.0.${deployCount.deploys}`

// Cidades sob gestão, agora em letreiro. O separador e o ponto final repetem a
// construção do letreiro do topo (o texto precisa fechar com " · " para emendar
// consigo mesmo no loop).
const CITIES_TICKER = 'SÃO PAULO, SP. · GOIÂNIA, GO. · SALVADOR, BA. ·'

// `headingKey`/`linkKey` apontam pra `shell.footer` — rótulo vem do
// dicionário, o href fica cru aqui e passa por `localizedPath()` na hora de
// renderizar.
const NAV_COLUMNS = [
  {
    headingKey: 'pages',
    links: [
      { href: '/editorial', linkKey: 'magazine' },
      { href: '/labels', linkKey: 'labels' },
      { href: '/manifesto', linkKey: 'manifesto' },
      { href: '/collective', linkKey: 'collective' },
      { href: '/access', linkKey: 'access' },
      // Os dois decks, na ordem cronológica: a 1.0 logo acima da 2.0 (pedido
      // 2026-07-31). A 1.0 estava publicada mas sem nenhum link no site. Os
      // rótulos carregam a versão de propósito: sem eles não dá para distinguir
      // um deck do outro no rodapé.
      { href: '/pitch', linkKey: 'pitch1' },
      { href: '/pitch/v2', linkKey: 'pitch2' },
      { href: '/pitch/v3', linkKey: 'pitch3' },
    ],
  },
  {
    headingKey: 'company',
    links: [
      { href: '/consulting', linkKey: 'consulting' },
      { href: '/press', linkKey: 'press' },
      { href: '/about', linkKey: 'about' },
      { href: '/about/quick-facts', linkKey: 'quickFacts' },
      { href: '/press/media', linkKey: 'media' },
      { href: '/creators/tavaristico', linkKey: 'founders' },
      { href: '/careers', linkKey: 'careers' },
      { href: '/publishing', linkKey: 'publishing' },
    ],
  },
  {
    headingKey: 'legal',
    links: [
      { href: '/legal/terms', linkKey: 'terms' },
      { href: '/legal/privacy', linkKey: 'privacy' },
      { href: '/legal/conduct', linkKey: 'conduct' },
      { href: '/legal/law-enforcement', linkKey: 'lawEnforcement' },
    ],
  },
] as const satisfies {
  headingKey: 'pages' | 'company' | 'legal'
  links: readonly { href: string; linkKey: keyof typeof shell.en.footer.links }[]
}[]

export function Footer({ lang }: { lang: Lang }) {
  const t = shell[lang].footer
  // aria-label do logo é o mesmo texto invariável usado no Navigation.
  const logoAriaLabel = shell[lang].nav.logoAriaLabel
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">

        {/* Top: selo da marca (.TBF. SÃO PAULO) — reduzido a um selo, no mesmo
            lugar. Blocos Labels + Instagram removidos (pedido). */}
        <div className="footer__grid--top">
          <div>
            <Link href={localizedPath('/', lang)} aria-label={logoAriaLabel} style={{ display: 'block', maxWidth: 110 }}>
              <Image
                src="/brand/TBF-SAO-PAULO.svg"
                alt={t.brandAlt}
                width={110}
                height={79}
                style={{ display: 'block', width: '100%', height: 'auto' }}
                unoptimized
              />
            </Link>
            <p className="footer__meta" style={{ padding: 0, textTransform: 'uppercase', marginTop: 'var(--tbf-space-4)' }}>
              {t.tagline[0]}
              <br />
              {t.tagline[1]}
              <br />
              {t.tagline[2]}
            </p>
          </div>
        </div>

        {/* Cidades .TBF.: logo abaixo de "Consumed Worldwide." e ACIMA das colunas
            Pages/Company/Legal. Desde 2026-07-31 correm em LETREIRO, com a mesma
            construção do letreiro do topo (pedido do fundador) — mesmo
            componente, só que no fluxo em vez de pinado. */}
        <div className="footer__cities">
          <Ticker text={CITIES_TICKER} sticky={false} className="ticker--cities" />
        </div>

        {/* Nav: pages + company 2-col mobile / 3-col desktop; legal full-width on mobile */}
        <div className="footer__grid--nav">
          {NAV_COLUMNS.map((col) => (
            <nav key={col.headingKey} aria-label={t.columns[col.headingKey]}>
              <p
                className="footer__meta"
                style={{ textTransform: 'uppercase', marginBottom: 'var(--tbf-space-4)', padding: 0, opacity: 0.4 }}
              >
                {t.columns[col.headingKey]}
              </p>
              <ul className="footer__nav-list" role="list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={localizedPath(link.href, lang)} className="footer__link">
                      {t.links[link.linkKey]}
                    </Link>
                  </li>
                ))}
                {col.headingKey === 'legal' && (
                  <li>
                    <CookiePrefsButton lang={lang} />
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
          <p className="footer__meta" style={{ textTransform: 'uppercase', margin: 0 }}>
            {SITE_VERSION}
          </p>
        </div>

      </div>
    </footer>
  )
}
