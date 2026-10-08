import type { NextConfig } from 'next'

// ─── Multi-Zones ─────────────────────────────────────────────────────────────
// O .AURA. (brandsystem vivo) é uma zona Next independente, dona do prefixo
// /brandsystem. Origem definida pela env AURA_ZONE_ORIGIN (sem hardcode).
// Se ausente, os rewrites ficam vazios (fallback seguro — não quebra o site).
const AURA_ZONE_ORIGIN = process.env.AURA_ZONE_ORIGIN

const nextConfig: NextConfig = {
  // ─── Experimental Features ─────────────────────────────────────────────────
  experimental: {
    // View Transitions API support
    viewTransition: true,
  },

  // ─── Image Domains (Sanity + Cloudflare) ──────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        port: '',
        pathname: '/**',
      },
      {
        // Cloudflare Stream thumbnails
        protocol: 'https',
        hostname: 'videodelivery.net',
        port: '',
        pathname: '/**',
      },
    ],
    // Formato moderno para performance
    formats: ['image/avif', 'image/webp'],
    // Breakpoints alinhados com design system
    deviceSizes: [390, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ─── Headers de segurança ─────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // ─── Rewrites (Multi-Zones → .AURA.) ──────────────────────────────────────
  async rewrites() {
    if (!AURA_ZONE_ORIGIN) return []
    return [
      { source: '/brandsystem', destination: `${AURA_ZONE_ORIGIN}/brandsystem` },
      { source: '/brandsystem/:path*', destination: `${AURA_ZONE_ORIGIN}/brandsystem/:path*` },
    ]
  },

  // ─── Redirects ────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Garante canonical URLs sem trailing slash
      {
        source: '/zine/',
        destination: '/zine',
        permanent: true,
      },
      {
        source: '/factory/',
        destination: '/factory',
        permanent: true,
      },
      // MAG virou ZINE (pedido do fundador, 08/10/2026). Link antigo de
      // matéria não perde a matéria: o slug segue no redirect.
      {
        source: '/mag/:slug*',
        destination: '/zine/:slug*',
        permanent: true,
      },
      {
        source: '/mag',
        destination: '/zine',
        permanent: true,
      },
      {
        source: '/pt/mag/:slug*',
        destination: '/pt/zine/:slug*',
        permanent: true,
      },
      {
        source: '/pt/mag',
        destination: '/pt/zine',
        permanent: true,
      },
      // /editorial (nome ainda mais antigo) aponta direto para o destino final.
      {
        source: '/editorial/:slug*',
        destination: '/zine/:slug*',
        permanent: true,
      },
      {
        source: '/editorial',
        destination: '/zine',
        permanent: true,
      },
      {
        source: '/pt/editorial/:slug*',
        destination: '/pt/zine/:slug*',
        permanent: true,
      },
      {
        source: '/pt/editorial',
        destination: '/pt/zine',
        permanent: true,
      },
      {
        source: '/runwayunited',
        destination: '/labels/runwayunited',
        permanent: false,
      },
      // Perfil consolidado: founders → creator
      {
        source: '/about/founders',
        destination: '/creators/tavaristico',
        permanent: true,
      },
      // Rota curta do perfil do TAVARÍSTICO: canoniza para /creators/tavaristico.
      {
        source: '/tavaristico',
        destination: '/creators/tavaristico',
        permanent: true,
      },
      {
        source: '/pt/tavaristico',
        destination: '/pt/creators/tavaristico',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
