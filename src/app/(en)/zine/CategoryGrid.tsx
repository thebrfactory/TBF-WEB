'use client'

// Categorias do /zine em stories (pedido do fundador, #01 CHANGES 19/10/2026).
// Desenho: o SELECTED WORK do Tavaristico (rotulo pequeno, avatar, titulo, tags
// em letreiro, "About"). O componente é o mesmo (SelectedWork, que usa o
// StoryRing e o StoryPlayer padrão); aqui só se monta o dado.
// Tocar no avatar abre o story da categoria: um quadro por post do zine (capa,
// título, link para o post). Categoria sem post: um quadro com o texto da
// categoria e o link para o zine.

import { useMemo } from 'react'
import type { ArticleCategory, EditorialPost } from '@/types'
import type { StoryFrame, Venture } from '@/app/(en)/creators/tavaristico/_data'
import { SelectedWork } from '@/components/tavaristico/SelectedWork'
import { LOCAIS } from '@/content/articles'
import { editorial } from '@/content/i18n/pages/editorial'
import { urlFor } from '@/lib/sanity'
import { useLang } from '@/lib/LangProvider'
import { zineHref } from '@/lib/zine-url'
import styles from './CategoryGrid.module.css'

// Fotos de apoio já existentes em /public/images (placeholder até haver capa
// dedicada por categoria). Servem de avatar e de quadro da categoria vazia.
const CATEGORY_VALUES: { value: ArticleCategory; image: string }[] = [
  { value: 'fashion-film', image: '/images/img-01.webp' },
  { value: 'editorial', image: '/images/img-02.webp' },
  { value: 'manifesto', image: '/images/img-03.webp' },
  { value: 'coolhunting', image: '/images/img-04.webp' },
  { value: 'collaboration', image: '/images/img-05.webp' },
]

// Matéria local tem categoria em texto livre; aqui vira o slug do filtro.
// Field Research é pesquisa de campo editorial, por isso cai em `editorial`.
const LOCAL_CATEGORY: Record<string, ArticleCategory> = {
  Manifesto: 'manifesto',
  Coolhunting: 'coolhunting',
  'Field Research': 'editorial',
}

// O SelectedWork repassa o quadro inteiro ao StoryPlayer, que aceita `cta`.
// StoryFrame (do Tavaristico) não declara o campo, então ele entra por aqui.
type CategoryFrame = StoryFrame & { cta?: { label: string; href: string } }

interface Piece {
  slug: string
  category: ArticleCategory
  title: string
  src: string
  alt: string
}

interface CategoryGridProps {
  posts: EditorialPost[]
}

export function CategoryGrid({ posts }: CategoryGridProps) {
  const lang = useLang()
  const t = editorial[lang]
  const cs = t.categoryStories

  const ventures = useMemo<Venture[]>(() => {
    const pieces: Piece[] = [
      ...posts
        .filter((p) => p.heroImage)
        .map((p) => {
          const title = (lang === 'en' && p.titleEn) || p.title
          return {
            slug: p.slug.current,
            category: p.category,
            title,
            src: urlFor(p.heroImage).width(900).url(),
            alt: title,
          }
        }),
      ...LOCAIS.filter((a) => LOCAL_CATEGORY[a.category]).map((a) => ({
        slug: a.slug,
        category: LOCAL_CATEGORY[a.category],
        title: a.heroTitle[lang],
        src: a.cover.src,
        alt: a.cover.alt[lang],
      })),
    ]

    return CATEGORY_VALUES.map((cat, idx) => {
      const label = t.categories[cat.value]
      const info = cs.items[cat.value]
      const mine = pieces.filter((p) => p.category === cat.value)

      const frames: CategoryFrame[] = mine.length
        ? mine.map((p) => ({
            src: p.src,
            alt: p.alt,
            role: p.title,
            overlay: { titleEN: p.title, titlePT: p.title, kickerEN: label, kickerPT: label },
            cta: { label: cs.readCta, href: zineHref(p.slug, lang) },
          }))
        : [
            {
              src: cat.image,
              alt: label,
              role: label,
              overlay: {
                titleEN: info.description,
                titlePT: info.description,
                kickerEN: `${label} · ${cs.emptyKicker}`,
                kickerPT: `${label} · ${cs.emptyKicker}`,
              },
              cta: { label: cs.enterCta, href: zineHref(undefined, lang) },
            },
          ]

      return {
        index: `zine-${cat.value}`,
        name: label,
        category: info.tags,
        description: info.description,
        weight: 'primary',
        cover: cat.image,
        coverAlt: label,
        frames,
      } satisfies Venture
    })
  }, [posts, lang, t, cs])

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <span className={styles.label}>{cs.label}</span>
        <SelectedWork ventures={ventures} lang={lang} openLabel={cs.openLabel} />
      </div>
    </div>
  )
}
