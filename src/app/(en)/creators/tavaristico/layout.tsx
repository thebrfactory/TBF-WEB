import type { ReactNode } from 'react'

// Por pedido do fundador, o portfólio usa SOMENTE a família Brother (display
// global). As vozes serif (Lora) e mono (IBM Plex) foram removidas — as vars
// --serif/--mono no tavaristico.module.css apontam para o display global.
export default function TavaristicoLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
