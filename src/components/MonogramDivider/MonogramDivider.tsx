// =============================================================================
// MONOGRAM DIVIDER: o glifo cinza (colchetes angulares + estrela no meio) que
// separa secoes editoriais na home.
//
// Nasceu inline na home, entre a grade de materias e a citacao de Oswald de
// Andrade. Extraido pra componente pra ser reusado entre o carrossel de fotos
// e a grade de materias (pedido do fundador 2026-09-16, layout "sobrecarregado"
// entre os dois), sem duplicar SVG. MESMO markup, MESMO estilo nas duas
// posicoes: `className` so adiciona respiro extra ao redor, nunca muda o
// glifo em si.
// =============================================================================

interface MonogramDividerProps {
  /** Classe opcional pra ajustar o respiro AO REDOR do glifo num lugar
   * especifico. O glifo em si (SVG, opacidade, tamanho) nunca muda. */
  className?: string
}

export function MonogramDivider({ className }: MonogramDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        width: '100%',
        paddingBlock: 'var(--tbf-space-8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'var(--tbf-space-6)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="100 336 396 170"
        width="120"
        height="51"
        style={{ opacity: 0.6, fill: 'var(--tbf-text-tertiary)', flexShrink: 0 }}
      >
        <path d="M441.35,346c20.76,19.49,25.61,51.77,45.16,74.54-19.55,22.77-24.4,55.04-45.16,74.54-8.31-2.7-20.68,2.39-29.85.8,20.99-19.08,26.96-53.89,43.38-75.33-16.42-21.45-22.39-56.26-43.38-75.33,9.16-1.59,21.54,3.5,29.85.8Z" />
        <path d="M154.73,346c-20.76,19.49-25.61,51.77-45.16,74.54,19.55,22.77,24.4,55.04,45.16,74.54,8.31-2.7,20.68,2.39,29.85.8-20.99-19.08-26.96-53.89-43.38-75.33,16.42-21.45,22.39-56.26,43.38-75.33-9.16-1.59-21.54,3.5-29.85.8Z" />
        <path d="M245.75,428.67c7.24-.24,14.35-.73,21.13-1.91-1.88,10.84-1.6,23.14,0,36.34,4.86-5.21,9.45-10.51,13.35-16.05,6.32,8.98,15.19,17.47,25.62,25.65-.27-6.85-.78-13.59-1.91-20.04,11.02,1.87,23.52,1.53,36.91-.14-5.22-4.86-10.53-9.46-16.1-13.36,8.96-6.36,17.42-15.23,25.57-25.64-6.89.27-13.68.79-20.18,1.92,1.91-11.03,1.59-23.55-.07-36.96-4.77,5.13-9.27,10.36-13.11,15.83-6.41-9.09-15.41-17.67-25.97-25.92.25,7.13.77,14.14,1.94,20.84-10.87-1.87-23.19-1.59-36.39,0,5.06,4.67,10.2,9.08,15.57,12.85-9.25,6.53-17.97,15.76-26.37,26.58Z" />
      </svg>
    </div>
  )
}
