import type { Metadata } from 'next'
import { IDENTITY, DISCIPLINES, WORKS } from './_data'
import { MasonryGallery } from './MasonryGallery'
import styles from './tavaristico.module.css'

export const metadata: Metadata = {
  title: 'Felipe Tavares (Tavarístico) — Portfolio',
  description:
    'Felipe Tavares — aka Tavarístico. Associate Creative Director / Art Director. Selected work. Represented by .TBF. inc.',
}

export default function TavaristicoPage() {
  return (
    <main className={styles.page}>
      {/* ─── HEADLINE + TEXTO ─────────────────────────────────────────── */}
      <header className={`${styles.hero} container`}>
        <span className={styles.label}>Creators — Portfolio</span>
        <h1 className={styles.heroName}>{IDENTITY.name}</h1>
        <p className={styles.heroAlias}>
          aka <b>{IDENTITY.alias}</b> · {IDENTITY.role}
        </p>
        <p className={styles.heroText}>{IDENTITY.bioEN}</p>
      </header>

      {/* ─── GALERIA PINTEREST ────────────────────────────────────────── */}
      <section className={`${styles.worksSection} container`} id="work">
        <MasonryGallery works={WORKS} disciplines={DISCIPLINES} />
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
