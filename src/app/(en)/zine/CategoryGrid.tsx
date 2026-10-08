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
                {/* Anel de story + nome AO LADO, um item embaixo do outro
                    (10/09/2026). O desenho e o mesmo do Selected Work do
                    portfolio: anel gradiente do Instagram, vao de 2,5px na cor
                    do fundo entre o anel e a foto, nome em display 800 caixa
                    alta. A fonte do desenho e StoryRing.module.css; aqui ele e
                    reescrito em classes proprias porque a linha inteira e UM
                    botao, e o StoryRing ja e um botao (botao dentro de botao
                    nao existe em HTML). */}
                <span className="category-card__ring">
                  <span className="category-card__frame">
                    <Image
                      src={cat.image}
                      alt=""
                      fill
                      sizes="76px"
                      className="category-card__image"
                    />
                    <span className="category-card__overlay" aria-hidden="true" />
                  </span>
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
