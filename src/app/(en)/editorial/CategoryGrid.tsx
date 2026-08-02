import Image from 'next/image'
import type { ArticleCategory } from '@/types'

// Grid de categorias estilo revista — cada card tem foto de fundo + overlay +
// nome da categoria + botão. Imagens reaproveitadas de /public/images (site já
// existente) como placeholder até termos fotos dedicadas por categoria.
const CATEGORIES: { value: ArticleCategory; label: string; image: string }[] = [
  { value: 'fashion-film', label: 'Fashion Film', image: '/images/img-01.webp' },
  { value: 'editorial', label: 'Editorial', image: '/images/img-02.webp' },
  { value: 'manifesto', label: 'Manifesto', image: '/images/img-03.webp' },
  { value: 'coolhunting', label: 'Coolhunting', image: '/images/img-04.webp' },
  { value: 'collaboration', label: 'Colaboração', image: '/images/img-05.webp' },
]

interface CategoryGridProps {
  onSelect: (category: ArticleCategory) => void
}

export function CategoryGrid({ onSelect }: CategoryGridProps) {
  return (
    <div
      style={{
        paddingInline: 'var(--tbf-grid-margin-sm)',
        paddingBottom: 'var(--tbf-space-10)',
      }}
    >
      <div style={{ maxWidth: 'var(--tbf-grid-max-xl)', marginInline: 'auto' }}>
        <div className="category-row">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              className="category-card"
              onClick={() => onSelect(cat.value)}
              aria-label={`Ver categoria ${cat.label}`}
            >
              {/* Círculo + nome embaixo, estética de story do Instagram (pedido
                  do fundador 2026-07-31). O nome saiu de DENTRO da foto: em
                  moldura redonda ele brigava com o recorte e as cinco fotos
                  são escuras demais para segurar texto por cima. */}
              <span className="category-card__frame">
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 140px, 20vw"
                  className="category-card__image"
                />
                <span className="category-card__overlay" aria-hidden="true" />
              </span>
              <span className="category-card__label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
