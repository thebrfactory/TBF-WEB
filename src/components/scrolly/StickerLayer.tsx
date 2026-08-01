// =============================================================================
// StickerLayer — server component (SPEC §2.1)
// Reusa @keyframes stickerFloat* (components.css). Fragmentos soltos flutuando
// discretos. Regra: no máx. 3 CONCORRENTES por cena — com 4 fragmentos (piloto,
// boatos MELFIORE) eles se distribuem ao longo de um contêiner mais alto para
// nunca coexistirem os 4 ao mesmo tempo (ver ORD-01-report.md). display:none
// em <768px se atrapalhar a leitura.
// =============================================================================

interface StickerLayerProps {
  fragments: string[]
  /** Esconde em mobile quando os fragmentos competiriam com o corpo do texto. */
  hideOnMobile?: boolean
}

export function StickerLayer({ fragments, hideOnMobile = false }: StickerLayerProps) {
  return (
    <div
      className={`scrolly-stickers${hideOnMobile ? ' scrolly-stickers--hide-mobile' : ''}`}
      style={{ ['--scrolly-sticker-count' as string]: fragments.length }}
      aria-hidden="true"
    >
      {fragments.map((text, i) => (
        <span key={i} className={`scrolly-stickers__item scrolly-stickers__item--${(i % 3) + 1}`} style={{ ['--i' as string]: i }}>
          {text}
        </span>
      ))}
    </div>
  )
}
