// =============================================================================
// ROOT LAYOUT — TBF WEB 2026
// Font: Brother1816 (local) — toda a família via @font-face em globals.css
// =============================================================================

import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import '@/styles/globals.css'
import { Navigation } from '@/components/Navigation/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { MailingList } from '@/components/MailingList/MailingList'
import { NewsletterPopup } from '@/components/NewsletterPopup/NewsletterPopup'
import { CookieBanner } from '@/components/CookieBanner/CookieBanner'
import { CustomCursor } from '@/components/CustomCursor/CustomCursor'
import { ConsentedAnalytics } from '@/components/Analytics/ConsentedAnalytics'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL('https://thebrfactory.com'),
  title: {
    default: '.THE BRAZILIAN FACTORY.',
    template: '%s | .THE BRAZILIAN FACTORY.',
  },
  description:
    'Culture™ Crafted in São Paulo. Consumed Worldwide. Editorial · Labels · Collective.',
  keywords: [
    'The Brazilian Factory',
    'TBF',
    'editorial',
    'fashion',
    'São Paulo',
    'cultura',
    'moda brasileira',
    'Mel Fiore',
    'Runway Untd Collective',
    'The Growth Factory',
    'Brazilian label',
    'cultura brasileira',
  ],
  authors: [{ name: 'Felipe Tavares', url: 'https://thebrfactory.com' }],
  creator: '.THE BRAZILIAN FACTORY.',
  publisher: '.TBF. inc',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'pt_BR',
    url: 'https://thebrfactory.com',
    siteName: '.THE BRAZILIAN FACTORY.',
    title: '.THE BRAZILIAN FACTORY.',
    description:
      'Culture™ Crafted in São Paulo. Consumed Worldwide.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: '.THE BRAZILIAN FACTORY.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thebrfactory',
    creator: '@thebrfactory',
    title: '.THE BRAZILIAN FACTORY.',
    description: 'Culture™ Crafted in São Paulo. Consumed Worldwide.',
    images: ['/og-default.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-tbf.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical Brother1816 weights */}
        <link rel="preload" href="/fonts/Brother1816-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Brother1816-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Brother1816-Black.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Brother1816-ExtraBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Skip nav — acessibilidade */}
        <a className="skip-nav" href="#main">
          Skip to main content
        </a>

        {/* Cursor customizado — desktop only */}
        <div
          className="cursor"
          id="cursor"
          aria-hidden="true"
          role="presentation"
        />

        <Navigation />

        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <MailingList />

        {/* Popup sitewide de captura de e-mail — uma vez por sessão */}
        <NewsletterPopup />

        {/* Assinatura de fechamento — abaixo da newsletter, em todas as páginas */}
        <section
          aria-label="Let's make brave work for your brand"
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
                We are here to make an impact
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
                {"Let's make brave work"}<br />{"for your brand."}
              </p>
            </div>
            <Link href="/contact-us" className="btn btn--primary">
              Contact Us
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <Footer />

        {/* Aviso de cookies LGPD — primeira visita, persiste a escolha */}
        <CookieBanner />

        <CustomCursor />

        {/* Analytics carrega SÓ com consentimento (gateado pelo CookieBanner). */}
        <ConsentedAnalytics />
      </body>
    </html>
  )
}
