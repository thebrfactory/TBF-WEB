'use client'

// =============================================================================
// EDITORIAL GRID — Client Component
// Filtros por categoria + load more
// =============================================================================

import { useState } from 'react'
import type { EditorialPost, ArticleCategory } from '@/types'
import { ArticleCard } from '@/components/ArticleCard/ArticleCard'
import { ThumbSpec } from '@/components/ThumbSpec/ThumbSpec'
import { CategoryGrid } from './CategoryGrid'

const CATEGORIES: { value: ArticleCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Tudo' },
  { value: 'fashion-film', label: 'Fashion Film' },
  { value: 'editorial', label: 'Editorial' },
  { value: 'manifesto', label: 'Manifesto' },
  { value: 'coolhunting', label: 'Coolhunting' },
  { value: 'collaboration', label: 'Colaboração' },
]

// aspect-ratio VARIADA por card (mesmo espírito da home, ver app/page.tsx) —
// é isso que dá a cara Pinterest ao masonry; sem variação todo card cai no
// fallback 3/2 e fica tudo com a mesma altura.
const MOCK_ARTICLES = [
  { category: 'Editorial',    title: 'What about the Brazilian fashion culture?',         date: '01 Jun. 2026', ratio: '3/4' },
  { category: 'Coolhunting',  title: 'AFTERPARTY: the feeling behind Brazilian parties',  date: '28 Mai. 2026', ratio: '1/1' },
  { category: 'Fashion Film', title: 'ACT I: feeling a Brazilian runway backstage',        date: '20 Mai. 2026', ratio: '4/3' },
  { category: 'Editorial',    title: 'São Paulo as fashion capital: the city that prints its own rules', date: '15 Mai. 2026', ratio: '3/4' },
  { category: 'Colaboração',  title: 'When Brazilian music and fashion collide',            date: '08 Mai. 2026', ratio: '4/5' },
  { category: 'Manifesto',    title: 'We are not a trend: why .TBF. refuses to follow',    date: '01 Mai. 2026', ratio: '1/1' },
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
            <div className="editorial-grid container" role="feed" aria-label="Artigos editoriais">
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
        /* Mock articles — preview visual enquanto Sanity está vazio.
           O destaque saiu daqui: a imagem de capa agora é o fundo do header
           da página (ver app/editorial/page.tsx). */
        <>
          <div className="editorial-grid container" role="feed" aria-label="Prévia do arquivo editorial">
            {MOCK_ARTICLES.slice(1).map((mock, idx) => {
              const i = idx + 1
              return (
                <a key={i} href={`/editorial/lorem-ipsum-${i + 1}`} className="card card--standard" style={{ textDecoration: 'none' }}>
                  {/* Placeholder/mock: sem imagem real (não existe matéria de
                      verdade por trás do link). Bloco chapado em parchment com o
                      selo da dimensão que a capa precisa ter; quando virar post
                      real do CMS, ArticleCard mostra a imagem de verdade. */}
                  <div
                    className="card__image-wrapper card__image-wrapper--empty"
                    style={{ aspectRatio: mock.ratio }}
                  >
                    <ThumbSpec ratio={mock.ratio} />
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
              )
            })}
          </div>
        </>
      )}

      {/* ─── MINI CARROSSEL DE CATEGORIAS — no final, depois do último artigo ─── */}
      <div style={{ paddingTop: 'var(--tbf-space-16)' }}>
        <CategoryGrid onSelect={handleCategoryChange} />
      </div>
    </section>
  )
}
