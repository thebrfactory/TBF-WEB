import type { ReactNode } from 'react'
import { Lora, IBM_Plex_Mono } from 'next/font/google'

// Tripla voz tipográfica da direção (ORD-01): display sans (Brother1816, já global)
// + serif (Lora, assinatura .TBF. nas descrições) + mono (camada-sistema da metadata).
// Escopadas a /creators/tavaristico/* via CSS vars no wrapper — não afetam o resto do site.
const serif = Lora({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--tav-serif',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--tav-mono',
  display: 'swap',
})

export default function TavaristicoLayout({ children }: { children: ReactNode }) {
  return <div className={`${serif.variable} ${mono.variable}`}>{children}</div>
}
