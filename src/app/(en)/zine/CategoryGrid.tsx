'use client'

// Categorias do /zine em stories (pedido do fundador, #01 CHANGES 19/10/2026).
// Desenho: o SELECTED WORK do Tavaristico (rotulo pequeno, avatar, titulo, tags
// em letreiro, "About"). O componente é o mesmo (SelectedWork, que usa o
// StoryRing e o StoryPlayer padrão); aqui só se monta o dado.
// Tocar no avatar abre o story da categoria.
//
// RODADA 29/10 (CHANGES #01, zine): "quero que seja de fato apenas materiais em
// formato stories e que encaixe em conteúdo de stories". Só entra quadro 9:16
// NATIVO, feito para story, com o texto já gravado no arquivo: peça entra como
// veio, sem legenda por cima (o `overlay` saiu). Saíram a capa de matéria (3:2),
// as fotos de case (16:9 e 3:4) e a foto de apoio img-01 a img-05 (3:4 a 2:3),
// que o player encaixava em contain sobre o fundo desfocado, e isso não é story.
// A matéria da categoria segue no story, só que como link: o botão branco sob o
// quadro. Categoria sem peça nativa não abre story (o avatar não aparece), nunca
// volta foto de apoio no lugar.

import { useMemo } from 'react'
import type { ArticleCategory, EditorialPost } from '@/types'
import type { StoryFrame, Venture } from '@/app/(en)/creators/tavaristico/_data'
import { SelectedWork } from '@/components/tavaristico/SelectedWork'
import { LOCAIS } from '@/content/articles'
import { editorial } from '@/content/i18n/pages/editorial'
import { useLang } from '@/lib/LangProvider'
import { localizedPath } from '@/lib/i18n'
import { zineHref } from '@/lib/zine-url'
import styles from './CategoryGrid.module.css'

const CATEGORY_VALUES: ArticleCategory[] = [
  'fashion-film',
  'editorial',
  'manifesto',
  'coolhunting',
  'collaboration',
]

// PEÇAS NATIVAS DE STORY (rodada 29/10, CHANGES #01, zine). Todas 9:16 de
// origem e da casa: os stories do Instagram da .TBF. e da .RUC. (pasta
// `0. TBF inc/01. Instagram` no TAV05, só leitura), convertidos para
// public/images/zine/stories e public/videos/zine/stories. Foto: webp 1080x1920.
// Filme: 720x1280, par av1 + h264 e poster webp, o mesmo desenho do clip() de
// src/content/pitch/v4-scenes.ts. Texto em inglês nos dois idiomas, como veio
// no arquivo; só o `alt` muda de língua.
interface NativePiece {
  src: string
  alt: { en: string; pt: string }
  video?: { av1: string; h264: string; hasAudio: boolean }
  ms?: number
}

const IMG = '/images/zine/stories'
const VID = '/videos/zine/stories'

// Citação com parágrafo embaixo pede mais tempo na tela que os 5s padrão do player.
const still = (cat: ArticleCategory, name: string, alt: NativePiece['alt'], ms?: number): NativePiece => ({
  src: `${IMG}/${cat}/${name}.webp`,
  alt,
  ...(ms ? { ms } : null),
})

const clip = (cat: ArticleCategory, name: string, alt: NativePiece['alt'], hasAudio = true): NativePiece => ({
  src: `${IMG}/${cat}/${name}.webp`,
  alt,
  video: { av1: `${VID}/${cat}/${name}.av1.mp4`, h264: `${VID}/${cat}/${name}.mp4`, hasAudio },
})

const NATIVE: Record<ArticleCategory, NativePiece[]> = {
  // Passarela e filme: os fashion films da .RUC. (RUC-24, RUC-22, RUC-19).
  'fashion-film': [
    clip('fashion-film', '01-gods', {
      en: 'Fashion film by .RUC.: models on the runway, over the line “Brazilians are closer to the gods than other humans”.',
      pt: 'Fashion film da .RUC.: modelos na passarela, com a frase “Brazilians are closer to the gods than other humans”.',
    }),
    clip('fashion-film', '02-fashion-edit', {
      en: 'Fashion film by .RUC.: “Brazilian Fashion Edit”, a line of models walking toward the camera.',
      pt: 'Fashion film da .RUC.: “Brazilian Fashion Edit”, fila de modelos caminhando em direção à câmera.',
    }),
    clip('fashion-film', '03-cinematic', {
      en: 'Fashion film by .RUC.: “Cinematic Fashion Edit”, a runway in blue light.',
      pt: 'Fashion film da .RUC.: “Cinematic Fashion Edit”, uma passarela em luz azul.',
    }),
  ],
  // Pesquisa de cultura brasileira: a série de modernismo da .RUC. (Mário, Tarsila,
  // Anita, Menotti), na ordem em que a casa publicou. As citações de Oswald estão em Manifesto.
  editorial: [
    still('editorial', '01-mario-passage', {
      en: 'Quote card: “My work is my passage through Brazil.” Mário de Andrade.',
      pt: 'Card de citação: “My work is my passage through Brazil.” Mário de Andrade.',
    }, 6000),
    still('editorial', '02-tarsila-painter', {
      en: 'Quote card: “I want to be the painter of my country.” Tarsila do Amaral.',
      pt: 'Card de citação: “I want to be the painter of my country.” Tarsila do Amaral.',
    }, 6000),
    still('editorial', '03-anita-freedom', {
      en: 'Quote card: “Art is freedom.” Anita Malfatti.',
      pt: 'Card de citação: “Art is freedom.” Anita Malfatti.',
    }, 6000),
    still('editorial', '04-mario-discover', {
      en: 'Quote card: “Brazil needs to discover itself.” Mário de Andrade.',
      pt: 'Card de citação: “Brazil needs to discover itself.” Mário de Andrade.',
    }, 6000),
    still('editorial', '05-tarsila-found', {
      en: 'Quote card: “I found Brazil in Brazil.” Tarsila do Amaral.',
      pt: 'Card de citação: “I found Brazil in Brazil.” Tarsila do Amaral.',
    }, 6000),
    still('editorial', '06-menotti-hands', {
      en: 'Quote card: “We want an art created with our own hands.” Menotti del Picchia.',
      pt: 'Card de citação: “We want an art created with our own hands.” Menotti del Picchia.',
    }, 6000),
    still('editorial', '07-welcome', {
      en: 'Closing card: “Brazil never wanted to be the next Paris. Brazil wanted to invent itself. Welcome to Brazilian Modernism.”',
      pt: 'Card de fecho: “Brazil never wanted to be the next Paris. Brazil wanted to invent itself. Welcome to Brazilian Modernism.”',
    }, 6000),
  ],
  // No que a casa acredita: a fala da .TBF. e as frases do Manifesto Antropófago.
  manifesto: [
    still('manifesto', '01-tbf-manifesto', {
      en: '.The Brazilian Factory.: “we move the world through Brazilian emotion, creative rituals and symbolic innovation”, over a city of lights.',
      pt: '.The Brazilian Factory.: “we move the world through Brazilian emotion, creative rituals and symbolic innovation”, sobre uma cidade de luzes.',
    }, 6000),
    clip('manifesto', '02-global-network', {
      en: '.The Brazilian Factory. as a global creative network: a mosaic of black shards on orange.',
      pt: '.The Brazilian Factory. como rede criativa global: um mosaico de cacos pretos sobre laranja.',
    }, false),
    still('manifesto', '03-anthropophagy', {
      en: 'Quote card: “Only Anthropophagy unites us. Socially. Economically. Philosophically.” Oswald de Andrade.',
      pt: 'Card de citação: “Only Anthropophagy unites us. Socially. Economically. Philosophically.” Oswald de Andrade.',
    }, 6000),
    still('manifesto', '04-not-mine', {
      en: 'Quote card: “I am only interested in what is not mine.” Oswald de Andrade.',
      pt: 'Card de citação: “I am only interested in what is not mine.” Oswald de Andrade.',
    }, 6000),
    still('manifesto', '05-canned-consciousness', {
      en: 'Quote card: “Against all importers of canned consciousness.” Oswald de Andrade.',
      pt: 'Card de citação: “Against all importers of canned consciousness.” Oswald de Andrade.',
    }, 6000),
    still('manifesto', '06-tupi', {
      en: 'Quote card: “Tupi or not Tupi: that is the question.” Manifesto Antropófago, 1928.',
      pt: 'Card de citação: “Tupi or not Tupi: that is the question.” Manifesto Antropófago, 1928.',
    }, 6000),
  ],
  // Noite e rua de São Paulo: o afterparty e o filme-lifestyle da .TBF.
  coolhunting: [
    clip('coolhunting', '01-afterparty', {
      en: '.The Brazilian Afterparty. São Paulo: DJ hands and the city skyline at night.',
      pt: '.The Brazilian Afterparty. São Paulo: mãos de DJ e a linha da cidade à noite.',
    }),
    clip('coolhunting', '02-lifestyle', {
      en: '.The Brazilian Factory.: “it’s a lifestyle way of living”, a film through São Paulo streets and nights.',
      pt: '.The Brazilian Factory.: “it’s a lifestyle way of living”, um filme pelas ruas e noites de São Paulo.',
    }),
  ],
  // Os stories do coletivo: a vinheta .RUC., a cartela do filme "The VHS Lost Tape" e o retrato.
  collaboration: [
    clip('collaboration', '01-collective', {
      en: 'Film by .RUC.: a model seen from behind in blue light, with the title “.RUC. São Paulo”.',
      pt: 'Filme da .RUC.: modelo de costas em luz azul, com o título “.RUC. São Paulo”.',
    }),
    clip('collaboration', '02-vhs-lost-tape', {
      en: 'Title card of the collective’s film “The VHS Lost Tape”, on a dark neon background.',
      pt: 'Cartela do filme do coletivo, “The VHS Lost Tape”, sobre fundo escuro com neon.',
    }, false),
    still('collaboration', '03-ruc-portrait', {
      en: 'Close of a model in a blue crochet dress, with the title “.RUC. São Paulo”.',
      pt: 'Close de modelo com vestido de crochê azul, com o título “.RUC. São Paulo”.',
    }),
  ],
}

// Destino do botão quando a categoria ainda não tem matéria publicada no zine.
// Só Fashion Film e Collaboration têm: a label dona dos filmes.
interface SiteLink {
  path: string
  cta: { en: string; pt: string }
}

const LABEL_LINK: SiteLink = {
  path: '/labels/runwayunited',
  cta: { en: 'Visit the label', pt: 'Conhecer a label' },
}

const SITE_LINK: Partial<Record<ArticleCategory, SiteLink>> = {
  'fashion-film': LABEL_LINK,
  collaboration: LABEL_LINK,
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

// Matéria do zine, só o que o botão precisa: a capa não vira quadro (não é 9:16).
interface Piece {
  slug: string
  category: ArticleCategory
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
      ...posts.map((p) => ({ slug: p.slug.current, category: p.category })),
      ...LOCAIS.filter((a) => LOCAL_CATEGORY[a.category]).map((a) => ({
        slug: a.slug,
        category: LOCAL_CATEGORY[a.category],
      })),
    ]

    return CATEGORY_VALUES.flatMap<Venture>((value) => {
      const label = t.categories[value]
      const info = cs.items[value]

      // Botão do quadro: a matéria mais nova da categoria; sem matéria, a label
      // da casa (Fashion Film e Collaboration); sem nenhum dos dois, sem botão.
      const latest = pieces.find((p) => p.category === value)
      const site = SITE_LINK[value]
      const cta = latest
        ? { label: cs.readCta, href: zineHref(latest.slug, lang) }
        : site
          ? { label: site.cta[lang], href: siteHref(site.path, lang) }
          : undefined

      const frames = NATIVE[value].map<CategoryFrame>((f) => ({
        src: f.src,
        alt: f.alt.pt,
        altEN: f.alt.en,
        role: label,
        video: f.video,
        ms: f.ms,
        cta,
      }))

      if (frames.length === 0) return []

      return [
        {
          index: `zine-${value}`,
          name: label,
          category: info.tags,
          description: info.description,
          weight: 'primary',
          // Avatar do anel: o primeiro quadro da categoria (poster, no filme).
          cover: frames[0].src,
          coverAlt: label,
          frames,
        } satisfies Venture,
      ]
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
