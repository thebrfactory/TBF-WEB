// =============================================================================
// ROOT LAYOUT — TBF WEB 2026
// Font: Brother1816 (local) — toda a família via @font-face em globals.css
// =============================================================================

import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { Navigation } from '@/components/Navigation/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { MailingList } from '@/components/MailingList/MailingList'
import { CustomCursor } from '@/components/CustomCursor/CustomCursor'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
    'Runway United Collective',
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
        <Footer />

        <CustomCursor />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
