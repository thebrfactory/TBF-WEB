// =============================================================================
// FOOTER — TBF WEB 2026
// 3 colunas desktop / 2 colunas mobile-first
// =============================================================================

import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import Image from 'next/image'
import { CookiePrefsButton } from '@/components/CookiePrefs/CookiePrefsButton'
import { Ticker, type TickerSegment } from '@/components/Ticker/Ticker'
import deployCount from '@/data/deploy-count.json'
import { localizedPath, type Lang } from '@/lib/i18n'
import { shell } from '@/content/i18n/shell'
// A estrutura das colunas mora em `lib/footer-routes.ts`, e não aqui, porque a
// regra "página do rodapé abre em guia nova" (#01 CHANGES 2026-08-14) é
// derivada dela. Uma lista só, para as duas coisas nunca divergirem.
import { FOOTER_COLUMNS } from '@/lib/footer-routes'

// Selo de versão do rodapé. Nomenclatura oficial (pedido do fundador
// 2026-07-31): `.TBF. OS 3.0.<deploy>`. O 3.0 é a linhagem do sistema
// (SISTEMA 3.0 / TBF BUSINESS OS) e o último número é SEMPRE o número de
// deploy REAL, que sai de src/data/deploy-count.json e é incrementado pela
// skill /deploy a cada publicação em produção.
const SITE_VERSION = `.TBF. OS 3.0.${deployCount.deploys}`

// Cidades sob gestão, agora em letreiro. A sigla do estado saiu e o nome dele
// entrou por extenso, em book contra a cidade em medium (#01 CHANGES
// 2026-08-24). Quem separa um segmento do outro é o respiro, não pontuação:
// ver a nota do separador no componente.
const CITIES_TICKER: TickerSegment[] = [
  { text: 'SÃO PAULO', weight: 'medium' },
  { text: 'BRAZIL', weight: 'book' },
  { text: 'GOIÂNIA', weight: 'medium' },
  { text: 'GOIÁS', weight: 'book' },
  { text: 'SALVADOR', weight: 'medium' },
  { text: 'BAHIA', weight: 'book' },
]

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
          {FOOTER_COLUMNS.map((col) => (
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
