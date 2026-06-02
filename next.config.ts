import type { NextConfig } from 'next'

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

  // ─── Redirects ────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Garante canonical URLs sem trailing slash
      {
        source: '/editorial/',
        destination: '/editorial',
        permanent: true,
      },
      {
        source: '/factory/',
        destination: '/factory',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
