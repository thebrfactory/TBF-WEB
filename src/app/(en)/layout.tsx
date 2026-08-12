// =============================================================================
// ROOT LAYOUT — INGLÊS (o idioma nativo, na raiz do domínio)
//
// O site tem DOIS layouts raiz, um por idioma, agrupados por route group:
// `(en)` serve `/...` e `(pt)` serve `/pt/...`. É o que permite cada árvore
// declarar o próprio `<html lang>` e os próprios metadados — um layout aninhado
// não conseguiria. A marcação em si não é duplicada: vive em <SiteShell>.
//
// Font: Brother1816 (local) — toda a família via @font-face em globals.css
// =============================================================================

import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { SiteShell } from '@/components/SiteShell/SiteShell'
import { languageAlternates } from '@/lib/i18n'

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
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thebrfactory',
    creator: '@thebrfactory',
    title: '.THE BRAZILIAN FACTORY.',
    description: 'Culture™ Crafted in São Paulo. Consumed Worldwide.',
    images: ['/og'],
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
  alternates: languageAlternates('/'),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>
}
