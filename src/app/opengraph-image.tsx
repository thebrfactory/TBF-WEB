// =============================================================================
// OG IMAGE PADRÃO — TBF WEB 2026
// Gerada via next/og (ImageResponse)
// Identidade TBF: Obsidiana + Pergaminho + Âmbar
// =============================================================================

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = '.THE BRAZILIAN FACTORY.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#000000',
          padding: '64px',
          position: 'relative',
        }}
      >
        {/* Glow ambiente */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '50%',
            background: 'radial-gradient(ellipse at bottom center, rgba(200,169,106,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Tag .TBF. */}
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#6E6B67',
            marginBottom: '24px',
          }}
        >
          São Paulo, Brasil · Est. 2025
        </p>

        {/* Título */}
        <h1
          style={{
            fontFamily: 'sans-serif',
            fontSize: '80px',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: '#F0EDE6',
            marginBottom: '32px',
          }}
        >
          .THE BRAZILIAN
          <br />
          FACTORY.
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'serif',
            fontSize: '20px',
            fontWeight: 300,
            lineHeight: 1.4,
            color: '#4A4744',
          }}
        >
          Culture™ Crafted in São Paulo. Consumed Worldwide.
        </p>

        {/* Acento âmbar */}
        <div
          style={{
            position: 'absolute',
            top: '64px',
            right: '64px',
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#C8A96A',
          }}
        >
          thebrfactory.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
