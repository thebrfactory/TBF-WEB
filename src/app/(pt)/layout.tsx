// =============================================================================
// ROOT LAYOUT — PORTUGUÊS (sob o prefixo /pt)
//
// Gêmeo do layout de `(en)`. A marcação não é duplicada: os dois chamam o mesmo
// <SiteShell>, só que declarando idioma e metadados próprios. O que justifica
// haver dois layouts RAIZ, e não um layout aninhado, é o `<html lang>`: só um
// root layout pode declará-lo, e ele precisa dizer pt-BR aqui e en lá.
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
    'Culture™ feita em São Paulo. Consumida no mundo inteiro. Revista · Labels · Collective.',
  keywords: [
    'The Brazilian Factory',
    'TBF',
    'editorial',
    'moda',
    'São Paulo',
    'cultura',
    'moda brasileira',
    'Mel Fiore',
    'Runway Untd Collective',
    'The Growth Factory',
    'label brasileira',
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
    locale: 'pt_BR',
    alternateLocale: 'en_US',
    url: 'https://thebrfactory.com/pt',
    siteName: '.THE BRAZILIAN FACTORY.',
    title: '.THE BRAZILIAN FACTORY.',
    description: 'Culture™ feita em São Paulo. Consumida no mundo inteiro.',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thebrfactory',
    creator: '@thebrfactory',
    title: '.THE BRAZILIAN FACTORY.',
    description: 'Culture™ feita em São Paulo. Consumida no mundo inteiro.',
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

export default function RootLayoutPT({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="pt">{children}</SiteShell>
}
