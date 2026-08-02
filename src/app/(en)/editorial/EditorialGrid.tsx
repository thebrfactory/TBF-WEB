'use client'

// =============================================================================
// EDITORIAL GRID — Client Component
// Filtros por categoria + load more
// =============================================================================

import { useState } from 'react'
import type { EditorialPost, ArticleCategory } from '@/types'
import { ArticleCard } from '@/components/ArticleCard/ArticleCard'
import { ThumbSpec } from '@/components/ThumbSpec/ThumbSpec'
import { ArticleMorphLink } from '@/components/PageTransition/ArticleMorphLink'
import { CategoryGrid } from './CategoryGrid'
import { useLang } from '@/lib/LangProvider'
import { localizedPath } from '@/lib/i18n'
import { editorial } from '@/content/i18n/pages/editorial'

const CATEGORY_FILTERS: (ArticleCategory | 'all')[] = [
  'all',
  'fashion-film',
  'editorial',
  'manifesto',
  'coolhunting',
  'collaboration',
]

// Piloto do motor scrolly (ORD-01): o 1º card do arquivo passa a apontar para
// a matéria real, não para o mock TBFipsum — 04_RESUMO-APROVACAO.md §4.
const PILOT_ARTICLE_SLUG = 'the-day-brazil-stopped-translating-itself'

const PAGE_SIZE = 9

interface EditorialGridProps {
  posts: EditorialPost[]
}

export function EditorialGrid({ posts }: EditorialGridProps) {
  const lang = useLang()
  const t = editorial[lang]
  const path = (p: string) => localizedPath(p, lang)

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
    /* Respiro entre o letreiro em motion e os cards estilo pinterest (pedido):
       colados, o olho não separava as duas áreas. */
    <section aria-label={t.grid.sectionAriaLabel} style={{ paddingTop: 'var(--tbf-space-12)' }}>
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
            <ul className="tag-group" role="list" aria-label={t.filterAriaLabel}>
              {CATEGORY_FILTERS.map((cat) => (
                <li key={cat}>
                  <button
                    className={`tag${activeCategory === cat ? ' tag--active' : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                    aria-pressed={activeCategory === cat}
                  >
                    {t.categories[cat]}
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
            <div className="editorial-grid container" role="feed" aria-label={t.grid.feedAriaLabel}>
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
                {t.grid.emptyCategory}
              </p>
            </div>
          )}
          {hasMore && (
            <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: 'var(--tbf-space-16)', paddingInline: 'var(--tbf-grid-margin-sm)' }}>
              <button
                className="btn btn--secondary"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                aria-label={t.grid.loadMoreAria(filtered.length - visibleCount)}
              >
                {t.grid.loadMoreCta}
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
          <div className="editorial-grid container" role="feed" aria-label={t.grid.previewAriaLabel}>
            {t.mockArticles.slice(1).map((mock, idx) => {
              const i = idx + 1
              // 1º card do arquivo (idx === 0) aponta para a matéria real do piloto.
              const href = idx === 0 ? path(`/editorial/${PILOT_ARTICLE_SLUG}`) : path(`/editorial/lorem-ipsum-${i + 1}`)
              return (
                <ArticleMorphLink key={i} href={href} className="card card--standard" style={{ textDecoration: 'none' }}>
                  {/* Placeholder/mock: sem imagem real (não existe matéria de
                      verdade por trás do link). Bloco chapado em parchment com o
                      selo da dimensão que a capa precisa ter; quando virar post
                      real do CMS, ArticleCard mostra a imagem de verdade.
                      `data-morph` mesmo sem imagem: é a CAIXA da capa que cresce
                      na transição, não a foto. */}
                  <div
                    data-morph
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
                </ArticleMorphLink>
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
