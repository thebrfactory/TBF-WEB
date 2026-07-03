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
              <Image
                src={cat.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="category-card__image"
              />
              <span className="category-card__overlay" aria-hidden="true" />
              <span className="category-card__content">
                <span className="category-card__label">{cat.label}</span>
                <span className="category-card__cta">
                  Ver categoria
                  <span className="btn__arrow" aria-hidden="true">→</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
