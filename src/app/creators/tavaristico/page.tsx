import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { IDENTITY, DISCIPLINES, WORKS, selectedWorks } from './_data'
import { DisciplineGrid } from './DisciplineGrid'
import styles from './tavaristico.module.css'

export const metadata: Metadata = {
  title: 'Felipe Tavares (Tavarístico) — Portfolio',
  description:
    'Felipe Tavares — aka Tavarístico. Associate Creative Director / Art Director. Selected work. Represented by .TBF. inc.',
}

export default function TavaristicoPage() {
  const selected = selectedWorks()

  return (
    <main className={styles.page}>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <header className={`${styles.hero} container`}>
        <span className={styles.label}>Creators — Portfolio</span>
        <h1 className={styles.heroName}>{IDENTITY.name}</h1>
        <p className={styles.heroAlias}>
          aka <b>{IDENTITY.alias}</b>
        </p>
        <p className={styles.heroRole}>
          {IDENTITY.role} · represented by{' '}
          <span className={styles.heroRepresented}>{IDENTITY.representedBy}</span>
        </p>
      </header>

      {/* ─── IDENTIDADE / BIO ─────────────────────────────────────────── */}
      <section className={`${styles.identity} container layout-b`}>
        <div>
          <span className={styles.label}>About</span>
          <p className={styles.bio}>{IDENTITY.bioEN}</p>
        </div>
        <div>
          <p className={`${styles.bioSub} ${IDENTITY.bioPTProvisional ? styles.prov : ''}`}>
            {IDENTITY.bioPT}
          </p>
          <p className={`${styles.metaMono} ${styles.origin}`}>
            <b>Origin</b> — {IDENTITY.origin}
          </p>
        </div>
      </section>

      {/* ─── SELECTED WORK — carrossel dinâmico ───────────────────────── */}
      <section className={styles.selected}>
        <div className={`${styles.sectionHead} container`}>
          <span className={styles.label}>Selected Work</span>
          <span className={styles.count}>{String(selected.length).padStart(2, '0')}</span>
        </div>
        <div className={styles.selCarousel}>
          <ul className={styles.selTrack} role="list">
            {[...selected, ...selected].map((w, i) => (
              <li key={`${w.slug}-${i}`}>
                <Link
                  href={`/creators/tavaristico/works/${w.slug}`}
                  className={styles.selSlide}
                  aria-hidden={i >= selected.length}
                  tabIndex={i >= selected.length ? -1 : undefined}
                >
                  <Image
                    src={w.media.cover}
                    alt={w.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 52vw, 80vw"
                  />
                  <span className={styles.selSlideOverlay} aria-hidden="true" />
                  <span className={styles.selSlideBody}>
                    <span className={styles.index}>{w.index}</span>
                    <span className={styles.selSlideTitle}>{w.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── GRADE POR DISCIPLINA ─────────────────────────────────────── */}
      <section className={`${styles.ledger} container`} id="work">
        <div className={styles.sectionHead}>
          <span className={styles.label}>All Work — by discipline</span>
          <span className={styles.count}>{String(WORKS.length).padStart(2, '0')}</span>
        </div>
        <DisciplineGrid works={WORKS} disciplines={DISCIPLINES} />
      </section>

      {/* ─── CONTATO ──────────────────────────────────────────────────── */}
      <section className={`${styles.contact} container`}>
        <span className={styles.label}>Contact</span>
        <p className={styles.contactName}>Let&apos;s make brave work.</p>
        <div className={styles.links}>
          <a className={styles.link} href={IDENTITY.socials.instagram} target="_blank" rel="noopener noreferrer">
            Instagram ↗
          </a>
          <a
            className={`${styles.link} ${IDENTITY.socials.linkedinProvisional ? styles.prov : ''}`}
            href={IDENTITY.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <span className={styles.link}>Represented by {IDENTITY.representedBy}</span>
        </div>
      </section>
    </main>
  )
}
