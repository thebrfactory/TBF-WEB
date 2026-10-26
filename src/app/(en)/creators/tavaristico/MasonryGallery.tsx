'use client'

import { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import type { Work, Discipline } from './_data'
import { DIMS } from './_dims'
import styles from './tavaristico.module.css'
import { useLang } from '@/lib/LangProvider'
import { localizedPath } from '@/lib/i18n'
import { tavaristico } from '@/content/i18n/pages/tavaristico'

const slugify = (d: string) => d.toLowerCase().replace(/[^a-z]+/g, '-').replace(/(^-|-$)/g, '')
const ALL = 'all'

// Ritmo Pinterest: alturas variadas, deterministas por posição (evita layout shift).
const RATIOS = ['3 / 4', '1 / 1', '4 / 5', '3 / 4', '4 / 3', '1 / 1', '4 / 5', '3 / 4']

const ratioNum = (r: string) => {
  const [a, b] = r.split('/').map((n) => parseFloat(n))
  return a / b
}

// object-position que leva o ponto focal [fx, fy] (fracao da imagem) ao centro
// do card, para o recorte `cover` de qualquer proporcao (rodada 22/10/2026:
// camisa da Tiger e lockup do ArquiMeats desalinhados no card).
function focusPosition(src: string, ratio: string, [fx, fy]: [number, number]): string {
  const [iw, ih] = DIMS[src] ?? [1, 1]
  const ri = iw / ih
  const rb = ratioNum(ratio)
  const clamp = (n: number) => Math.min(100, Math.max(0, n * 100))
  if (ri > rb) return `${clamp((fx * ri - rb / 2) / (ri - rb))}% 50%`
  if (ri < rb) return `50% ${clamp((fy / ri - 1 / (2 * rb)) / (1 / ri - 1 / rb))}%`
  return '50% 50%'
}

export function MasonryGallery({
  works,
  disciplines,
  extraCard,
  extraAfter,
}: {
  works: Work[]
  disciplines: Discipline[]
  /** Card extra no fim da grade (ex.: hospitalidade). Só aparece em "All". */
  extraCard?: {
    href: string
    image: string
    title: string
    meta: string
    /** proporção fixa do card (sem ela, segue o ritmo da grade) */
    ratio?: string
    /** object-position da thumb, para rosto e corpo não cortarem */
    position?: string
  }
  /** Quantos works vêm antes do card extra. Sem isso, ele fecha a grade. */
  extraAfter?: number
}) {
  const lang = useLang()
  const t = tavaristico[lang].gallery
  const path = (p: string) => localizedPath(p, lang)

  const [active, setActive] = useState<string>(ALL)

  // Deep-link: lê a disciplina do hash ao montar (#art-direction) e responde a navegação.
  // Disciplinas (Art Direction, Branding...) não se traduzem: são convenção de
  // categoria profissional do portfólio, mantidas em inglês nos dois idiomas —
  // o slug do hash também não muda entre idiomas por causa disso.
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace(/^#/, '')
      const match = disciplines.find((d) => slugify(d) === h)
      setActive(match ?? ALL)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [disciplines])

  const select = (key: string) => {
    setActive(key)
    const hash = key === ALL ? ' ' : `#${slugify(key)}`
    history.replaceState(null, '', key === ALL ? window.location.pathname + window.location.search : hash)
  }

  const visible = (w: Work) => active === ALL || w.disciplines.some((d) => d === active)
  const onlyOne = disciplines.length <= 1

  const extraNode = extraCard ? (
      <Link
        href={extraCard.href}
        className={`${styles.card} ${active === ALL ? '' : styles.cardHidden}`}
      >
        <span className={styles.cardMedia} style={{ aspectRatio: extraCard.ratio ?? RATIOS[works.length % RATIOS.length] }}>
          <Image
            src={extraCard.image}
            alt={extraCard.title}
            fill
            style={extraCard.position ? { objectPosition: extraCard.position } : undefined}
            sizes="(min-width: 1200px) 24vw, (min-width: 768px) 32vw, 48vw"
          />
          <span className={styles.cardOverlay} aria-hidden="true" />
        </span>
        <span className={styles.cardCaption}>
          <span className={styles.cardTitle}>{extraCard.title}</span>
          <span className={styles.cardMeta}>{extraCard.meta}</span>
        </span>
      </Link>
    ) : null

  return (
    <>
      {!onlyOne && (
        <div className={styles.filters} role="group" aria-label={t.filterAriaLabel}>
          <button
            type="button"
            className={`${styles.chip} ${active === ALL ? styles.chipActive : ''}`}
            aria-pressed={active === ALL}
            onClick={() => select(ALL)}
          >
            {t.all}
          </button>
          {disciplines.map((d) => (
            <button
              key={d}
              type="button"
              className={`${styles.chip} ${active === d ? styles.chipActive : ''}`}
              aria-pressed={active === d}
              onClick={() => select(d)}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      <div className={styles.masonry}>
        {works.map((w, i) => {
          const ratio = w.cardRatio ?? RATIOS[i % RATIOS.length]
          const cardSrc = w.cardCover ?? w.media.cover
          const card = (
          <Link
            key={w.slug}
            href={path(`/creators/tavaristico/works/${w.slug}`)}
            className={`${styles.card} ${visible(w) ? '' : styles.cardHidden}`}
          >
            <span
              className={styles.cardMedia}
              style={{ aspectRatio: ratio, ...(w.cardFit ? { background: w.cardFit.bg } : null) }}
            >
              <Image
                src={cardSrc}
                alt={w.title}
                fill
                style={
                  w.cardFit
                    ? { objectFit: 'contain', padding: w.cardFit.inset }
                    : w.cardFocus
                      ? { objectPosition: focusPosition(cardSrc, ratio, w.cardFocus) }
                      : undefined
                }
                sizes="(min-width: 1200px) 24vw, (min-width: 768px) 32vw, 48vw"
              />
              <span className={styles.cardOverlay} aria-hidden="true" />
            </span>
            <span className={styles.cardCaption}>
              <span className={styles.cardTitle}>{w.title}</span>
              <span className={styles.cardMeta}>{w.disciplines.join(' · ')}</span>
            </span>
          </Link>
          )
          return extraAfter !== undefined && i === extraAfter - 1 ? (
            <Fragment key={w.slug}>
              {card}
              {extraNode}
            </Fragment>
          ) : (
            card
          )
        })}
        {extraCard && extraAfter === undefined && extraNode}
      </div>
    </>
  )
}
