'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Work, Discipline } from './_data'
import styles from './tavaristico.module.css'
import { useLang } from '@/lib/LangProvider'
import { localizedPath } from '@/lib/i18n'
import { tavaristico } from '@/content/i18n/pages/tavaristico'

const slugify = (d: string) => d.toLowerCase().replace(/[^a-z]+/g, '-').replace(/(^-|-$)/g, '')
const ALL = 'all'

// Ritmo Pinterest: alturas variadas, deterministas por posição (evita layout shift).
const RATIOS = ['3 / 4', '1 / 1', '4 / 5', '3 / 4', '4 / 3', '1 / 1', '4 / 5', '3 / 4']

export function MasonryGallery({
  works,
  disciplines,
}: {
  works: Work[]
  disciplines: Discipline[]
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
        {works.map((w, i) => (
          <Link
            key={w.slug}
            href={path(`/creators/tavaristico/works/${w.slug}`)}
            className={`${styles.card} ${visible(w) ? '' : styles.cardHidden}`}
          >
            <span className={styles.cardMedia} style={{ aspectRatio: RATIOS[i % RATIOS.length] }}>
              <Image
                src={w.media.cover}
                alt={w.title}
                fill
                sizes="(min-width: 1200px) 24vw, (min-width: 768px) 32vw, 48vw"
              />
              <span className={styles.cardOverlay} aria-hidden="true" />
            </span>
            <span className={styles.cardCaption}>
              <span className={styles.cardTitle}>{w.title}</span>
              <span className={styles.cardMeta}>{w.disciplines.join(' · ')}</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
