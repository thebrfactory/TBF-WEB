import type { ReactNode } from 'react'

// Gêmeo do layout de (en)/creators/tavaristico/layout.tsx. Por pedido do
// fundador, o portfólio usa SOMENTE a família Brother (display global) — as
// vozes serif (Lora) e mono (IBM Plex) foram removidas. Sem texto próprio,
// então não há nada a puxar do dicionário aqui.
export default function TavaristicoLayoutPT({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
