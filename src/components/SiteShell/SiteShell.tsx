// =============================================================================
// SiteShell — o cromo do site, em qualquer idioma
//
// Aqui vive TUDO que existe em toda página: fontes, cursor, navegação, main,
// newsletter, assinatura de fechamento, rodapé, cookies, analytics. Era o corpo
// do root layout único; virou componente quando o site passou a ter dois root
// layouts (um por idioma), justamente para que essa marcação não fosse copiada.
//
// Quem chama são os dois layouts raiz — `app/(en)/layout.tsx` e
// `app/(pt)/layout.tsx` — cada um só declarando o próprio idioma e os próprios
// metadados. Se algo aqui muda, muda nas duas línguas de uma vez, que é o
// ponto: nada de manter dois sites.
// =============================================================================

import Link from 'next/link'
import { Navigation } from '@/components/Navigation/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { MailingList } from '@/components/MailingList/MailingList'
import { NewsletterPopup } from '@/components/NewsletterPopup/NewsletterPopup'
import { CookieBanner } from '@/components/CookieBanner/CookieBanner'
import { CustomCursor } from '@/components/CustomCursor/CustomCursor'
import { ConsentedAnalytics } from '@/components/Analytics/ConsentedAnalytics'
import { AnalyticsGate } from '@/components/Analytics/AnalyticsGate'
import { ViewTransitionBridge } from '@/components/PageTransition/ViewTransitionBridge'
import { LangProvider } from '@/lib/LangProvider'
import { HTML_LANG, LANG_PREFIX, type Lang } from '@/lib/i18n'
import { shell } from '@/content/i18n/shell'

export function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const t = shell[lang]
  const home = LANG_PREFIX[lang] || '/'

  return (
    <html lang={HTML_LANG[lang]}>
      <head>
        {/* Preload critical Brother1816 weights */}
        <link rel="preload" href="/fonts/Brother1816-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Brother1816-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Brother1816-Black.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Brother1816-ExtraBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <LangProvider lang={lang}>
          {/* Skip nav — acessibilidade */}
          <a className="skip-nav" href="#main">
            {t.skipNav}
          </a>

          {/* Libera a transição de imagem quando a rota nova é comitada. */}
          <ViewTransitionBridge />

          {/* Cursor customizado — desktop only */}
          <div className="cursor" id="cursor" aria-hidden="true" role="presentation" />

          <Navigation />

          <main id="main" tabIndex={-1}>
            {children}
          </main>

          <MailingList />

          {/* Popup sitewide de captura de e-mail — uma vez por sessão */}
          <NewsletterPopup />

          {/* Assinatura de fechamento — abaixo da newsletter, em todas as páginas */}
          <section
            aria-label={t.closing.headline.join(' ')}
            style={{ background: '#000', paddingBottom: 'var(--tbf-space-16)' }}
          >
            <div
              className="container"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 'var(--tbf-space-6)',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--tbf-font-family-ui)',
                    fontSize: 'var(--tbf-type-micro-size)',
                    letterSpacing: 'var(--tbf-type-micro-ls)',
                    color: 'var(--tbf-text-tertiary)',
                    textTransform: 'uppercase',
                    margin: '0 0 var(--tbf-space-4)',
                  }}
                >
                  {t.closing.eyebrow}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--tbf-font-family-display)',
                    // Mesma hierarquia visual do headline da mailing list (MailingList.tsx)
                    fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: 'var(--tbf-text-primary)',
                    margin: 0,
                  }}
                >
                  {t.closing.headline[0]}
                  <br />
                  {t.closing.headline[1]}
                </p>
              </div>
              <Link href={`${home === '/' ? '' : home}/contact-us`} className="btn btn--primary">
                {t.closing.cta}
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </section>

          <Footer />

          {/* Aviso de cookies LGPD — primeira visita, persiste a escolha */}
          <CookieBanner />

          <CustomCursor />

          {/* Analytics carrega SÓ com consentimento (gateado pelo CookieBanner). */}
          <ConsentedAnalytics />

          {/* GA4 sob Consent Mode v2 — default denied até o opt-in real. */}
          <AnalyticsGate />
        </LangProvider>
      </body>
    </html>
  )
}
