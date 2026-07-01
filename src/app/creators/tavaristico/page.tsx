import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { IDENTITY, DISCIPLINES, WORKS, selectedWorks, isProv } from './_data'
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

      {/* ─── SELECTED WORK ────────────────────────────────────────────── */}
      <section className={`${styles.selected} container`}>
        <div className={styles.sectionHead}>
          <span className={styles.label}>Selected Work</span>
          <span className={styles.count}>{String(selected.length).padStart(2, '0')}</span>
        </div>
        <div className={styles.selList}>
          {selected.map((w) => (
            <Link key={w.slug} href={`/creators/tavaristico/works/${w.slug}`} className={styles.selItem}>
              <div className={styles.selTop}>
                <span className={styles.index}>{w.index}</span>
                <span className={styles.selTitle}>{w.title}</span>
              </div>
              <div className={styles.selMedia}>
                <Image
                  src={w.media.cover}
                  alt={w.title}
                  fill
                  sizes="(min-width: 768px) 80vw, 100vw"
                />
              </div>
              <div className={styles.selFoot}>
                <span className={`${styles.selSummary} ${isProv(w, 'summary') ? styles.prov : ''}`}>
                  {w.summary}
                </span>
                <span className={styles.metaMono}>
                  <b className={isProv(w, 'role') ? styles.prov : ''}>{w.role}</b>
                  {w.client ? <> · <span className={isProv(w, 'client') ? styles.prov : ''}>{w.client}</span></> : null}
                  {w.year ? <> · {w.year}</> : null}
                </span>
              </div>
            </Link>
          ))}
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
