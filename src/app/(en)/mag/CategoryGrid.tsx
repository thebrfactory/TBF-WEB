'use client'

import Image from 'next/image'
import type { ArticleCategory } from '@/types'
import { useLang } from '@/lib/LangProvider'
import { editorial } from '@/content/i18n/pages/editorial'

// Grid de categorias estilo revista — cada card tem foto de fundo + overlay +
// nome da categoria + botão. Imagens reaproveitadas de /public/images (site já
// existente) como placeholder até termos fotos dedicadas por categoria.
const CATEGORY_VALUES: { value: ArticleCategory; image: string }[] = [
  { value: 'fashion-film', image: '/images/img-01.webp' },
  { value: 'editorial', image: '/images/img-02.webp' },
  { value: 'manifesto', image: '/images/img-03.webp' },
  { value: 'coolhunting', image: '/images/img-04.webp' },
  { value: 'collaboration', image: '/images/img-05.webp' },
]

interface CategoryGridProps {
  onSelect: (category: ArticleCategory) => void
}

export function CategoryGrid({ onSelect }: CategoryGridProps) {
  const lang = useLang()
  const t = editorial[lang]

  return (
    <div
      style={{
        paddingInline: 'var(--tbf-grid-margin-sm)',
        paddingBottom: 'var(--tbf-space-10)',
      }}
    >
      <div style={{ maxWidth: 'var(--tbf-grid-max-xl)', marginInline: 'auto' }}>
        <div className="category-row">
          {CATEGORY_VALUES.map((cat) => {
            const label = t.categories[cat.value]
            return (
              <button
                key={cat.value}
                type="button"
                className="category-card"
                onClick={() => onSelect(cat.value)}
                aria-label={t.categoryCardAriaLabel(label)}
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
                <span className="category-card__label">{label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
