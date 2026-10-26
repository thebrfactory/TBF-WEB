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
import { localizedPath } from '@/lib/i18n'
import { zineHref } from '@/lib/zine-url'
import styles from './CategoryGrid.module.css'

// Fotos de apoio já existentes em /public/images (placeholder até haver capa
// dedicada por categoria). Só aparecem em categoria sem matéria e sem material da casa.
const CATEGORY_VALUES: { value: ArticleCategory; image: string }[] = [
  { value: 'fashion-film', image: '/images/img-01.webp' },
  { value: 'editorial', image: '/images/img-02.webp' },
  { value: 'manifesto', image: '/images/img-03.webp' },
  { value: 'coolhunting', image: '/images/img-04.webp' },
  { value: 'collaboration', image: '/images/img-05.webp' },
]

// MATERIAL DA CASA (#01 CHANGES 26/10/2026: "quero que tenha conteúdo nos
// stories"). O Sanity não tem post publicado, então Fashion Film e Collaboration
// abriam "Coming soon" com foto genérica. Enquanto a categoria não tiver matéria,
// o story mostra peça real já publicada no site e leva até ela. Matéria nova da
// categoria entra antes destes quadros, sem mexer aqui.
interface HousePiece {
  src: string
  title: string
  kicker: { en: string; pt: string }
  cta: { en: string; pt: string }
  path: string
}

const BACKSTAGE = '/images/creators/tavaristico/fashion-backstage'
const RUC = '/images/ruc'

const HOUSE: Partial<Record<ArticleCategory, HousePiece[]>> = {
  'fashion-film': ['cover', '02', '03', '04', '05'].map((f) => ({
    src: `${BACKSTAGE}/${f}.webp`,
    title: 'The Fashion Backstage',
    kicker: { en: 'SPFW N58 · 2024', pt: 'SPFW N58 · 2024' },
    cta: { en: 'See the case', pt: 'Ver o case' },
    path: '/creators/tavaristico/works/spfw-the-paradise',
  })),
  collaboration: ['ruc-hero', 'ruc-backstage', 'ruc-closing'].map((f) => ({
    src: `${RUC}/${f}.webp`,
    title: '.RUNWAY UNTD COLLECTIVE.',
    kicker: { en: 'Music. Fashion. Film.', pt: 'Música. Moda. Filme.' },
    cta: { en: 'Visit the label', pt: 'Conhecer a label' },
    path: '/labels/runwayunited',
  })),
}

// No subdomínio do zine todo caminho relativo é reescrito para /zine/..., então
// link para o site principal precisa sair absoluto em produção.
function siteHref(path: string, lang: 'en' | 'pt'): string {
  const local = localizedPath(path, lang)
  return process.env.NODE_ENV === 'production' ? `https://thebrfactory.com${local}` : local
}

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

      const house = (HOUSE[cat.value] ?? []).map<CategoryFrame>((h) => ({
        src: h.src,
        alt: h.title,
        role: h.title,
        overlay: { titleEN: h.title, titlePT: h.title, kickerEN: h.kicker.en, kickerPT: h.kicker.pt },
        cta: { label: h.cta[lang], href: siteHref(h.path, lang) },
      }))

      const posted: CategoryFrame[] = mine.map((p) => ({
        src: p.src,
        alt: p.alt,
        role: p.title,
        overlay: { titleEN: p.title, titlePT: p.title, kickerEN: label, kickerPT: label },
        cta: { label: cs.readCta, href: zineHref(p.slug, lang) },
      }))

      const frames: CategoryFrame[] = posted.length || house.length
        ? [...posted, ...house]
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

      // Avatar do anel: o primeiro quadro real da categoria; a foto genérica
      // só sobra para categoria sem nada.
      const cover = frames[0].src

      return {
        index: `zine-${cat.value}`,
        name: label,
        category: info.tags,
        description: info.description,
        weight: 'primary',
        cover,
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
