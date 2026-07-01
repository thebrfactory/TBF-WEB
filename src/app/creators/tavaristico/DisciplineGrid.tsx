'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Work, Discipline } from './_data'
import { isProv } from './_data'
import styles from './tavaristico.module.css'

const slugify = (d: string) => d.toLowerCase().replace(/[^a-z]+/g, '-').replace(/(^-|-$)/g, '')
const ALL = 'all'

export function DisciplineGrid({
  works,
  disciplines,
}: {
  works: Work[]
  disciplines: Discipline[]
}) {
  const [active, setActive] = useState<string>(ALL)

  // Deep-link: lê a disciplina do hash ao montar (#art-direction) e responde a navegação.
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
        <div className={styles.controls} role="group" aria-label="Filtrar por disciplina">
          <button
            type="button"
            className={`${styles.chip} ${active === ALL ? styles.chipActive : ''}`}
            aria-pressed={active === ALL}
            onClick={() => select(ALL)}
          >
            Tudo
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

      <div className={styles.ledgerList}>
        {works.map((w) => (
          <Link
            key={w.slug}
            href={`/creators/tavaristico/works/${w.slug}`}
            className={`${styles.ledgerRow} ${visible(w) ? '' : styles.hiddenRow}`}
          >
            <span className={styles.index}>{w.index}</span>
            <span>
              <span className={styles.ledgerTitle}>{w.title}</span>
              <span className={styles.ledgerSide}>
                <span className={styles.metaMono}>{w.disciplines.join(' · ')}</span>
              </span>
            </span>
            <span className={`${styles.metaMono} ${isProv(w, 'role') ? styles.prov : ''}`}>{w.role}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
