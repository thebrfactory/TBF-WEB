'use client'

// =============================================================================
// EDITORIAL GRID — Client Component
// Filtros por categoria + load more
// =============================================================================

import { useState } from 'react'
import type { EditorialPost, ArticleCategory } from '@/types'
import { ArticleCard } from '@/components/ArticleCard/ArticleCard'
import { CategoryGrid } from './CategoryGrid'

const CATEGORIES: { value: ArticleCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Tudo' },
  { value: 'fashion-film', label: 'Fashion Film' },
  { value: 'editorial', label: 'Editorial' },
  { value: 'manifesto', label: 'Manifesto' },
  { value: 'coolhunting', label: 'Coolhunting' },
  { value: 'collaboration', label: 'Colaboração' },
]

const MOCK_ARTICLES = [
  { category: 'Editorial',    title: 'What about the Brazilian fashion culture?',         date: '01 Jun. 2026' },
  { category: 'Coolhunting',  title: 'AFTERPARTY: the feeling behind Brazilian parties',  date: '28 Mai. 2026' },
  { category: 'Fashion Film', title: 'ACT I: feeling a Brazilian runway backstage',        date: '20 Mai. 2026' },
  { category: 'Editorial',    title: 'São Paulo as fashion capital: the city that prints its own rules', date: '15 Mai. 2026' },
  { category: 'Colaboração',  title: 'When Brazilian music and fashion collide',            date: '08 Mai. 2026' },
  { category: 'Manifesto',    title: 'We are not a trend: why .TBF. refuses to follow',    date: '01 Mai. 2026' },
]

const PAGE_SIZE = 9

interface EditorialGridProps {
  posts: EditorialPost[]
}

export function EditorialGrid({ posts }: EditorialGridProps) {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const hasPosts = posts.length > 0

  const filtered =
    activeCategory === 'all'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function handleCategoryChange(cat: ArticleCategory | 'all') {
    setActiveCategory(cat)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <section aria-label="Arquivo editorial">
      {/* ─── GRID DE CATEGORIAS — estilo revista, foto + overlay + botão ─── */}
      <CategoryGrid onSelect={handleCategoryChange} />

      {/* ─── FILTROS — só quando há conteúdo real ─── */}
      {hasPosts && (
        <div
          style={{
            paddingInline: 'var(--tbf-grid-margin-sm)',
            paddingBottom: 'var(--tbf-space-12)',
            marginBottom: 'var(--tbf-space-12)',
          }}
        >
          <div style={{ maxWidth: 'var(--tbf-grid-max-xl)', marginInline: 'auto' }}>
            <ul className="tag-group" role="list" aria-label="Filtrar por categoria">
              {CATEGORIES.map((cat) => (
                <li key={cat.value}>
                  <button
                    className={`tag${activeCategory === cat.value ? ' tag--active' : ''}`}
                    onClick={() => handleCategoryChange(cat.value)}
                    aria-pressed={activeCategory === cat.value}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ─── GRID ─── */}
      {hasPosts ? (
        <>
          {visible.length > 0 ? (
            <div className="editorial-grid" role="feed" aria-label="Artigos editoriais">
              {visible.map((post, i) => (
                <ArticleCard
                  key={post._id}
                  post={post}
                  variant={i === 0 && activeCategory === 'all' ? 'featured' : 'standard'}
                />
              ))}
            </div>
          ) : (
            <div style={{ paddingInline: 'var(--tbf-grid-margin-sm)', paddingBlock: 'var(--tbf-space-16)', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--tbf-type-micro-family)', fontSize: 'var(--tbf-type-micro-size)', letterSpacing: 'var(--tbf-type-micro-ls)', textTransform: 'uppercase', color: 'var(--tbf-text-tertiary)' }}>
                Nenhum conteúdo nesta categoria ainda.
              </p>
            </div>
          )}
          {hasMore && (
            <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: 'var(--tbf-space-16)', paddingInline: 'var(--tbf-grid-margin-sm)' }}>
              <button
                className="btn btn--secondary"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                aria-label={`Carregar mais ${filtered.length - visibleCount} artigos`}
              >
                Expand the archive
                <span className="btn__arrow" aria-hidden="true">↓</span>
              </button>
            </div>
          )}
        </>
      ) : (
        /* Mock articles — preview visual enquanto Sanity está vazio */
        <div className="editorial-grid" role="feed" aria-label="Prévia do arquivo editorial">
          {MOCK_ARTICLES.map((mock, i) => (
            <a key={i} href={`/editorial/lorem-ipsum-${i + 1}`} className={`card ${i === 0 ? 'card--featured' : 'card--standard'}`} style={{ textDecoration: 'none' }}>
              <div className="card__image-wrapper" style={{ background: '#060d18', position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  left: '12px',
                  fontFamily: 'var(--tbf-font-family-ui)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.2)',
                  textTransform: 'uppercase',
                }}>
                  ADD-PREVIEW-MATERIAL
                </span>
              </div>
              <div className="card__content">
                <div className="card__tags">
                  <span className="tag tag--category">{mock.category}</span>
                </div>
                <h3 className="card__title">{mock.title}</h3>
                <div className="byline">
                  <span className="byline__text">
                    <span className="card__meta">{mock.date}</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
