// Índice do portfólio do Felipe Tavares (Tavarístico). Uma página, dois
// idiomas: o cromo (rótulos, bio, contato) vem do dicionário; nomes de
// projeto, cliente e obra continuam em `_data.ts` sem tradução (ver
// src/content/i18n/pages/tavaristico.ts). Ver src/content/i18n/README.md.

import { IDENTITY, DISCIPLINES, WORKS } from '@/app/(en)/creators/tavaristico/_data'
import { MasonryGallery } from '@/app/(en)/creators/tavaristico/MasonryGallery'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'
import { tavaristico } from '@/content/i18n/pages/tavaristico'
import type { Lang } from '@/lib/i18n'

export default function TavaristicoView({ lang }: { lang: Lang }) {
  const t = tavaristico[lang]
  const bio = lang === 'pt' ? IDENTITY.bioPT : IDENTITY.bioEN

  return (
    <main className={styles.page}>
      {/* ─── HEADLINE + TEXTO ─────────────────────────────────────────── */}
      <header className={`${styles.hero} container`}>
        <span className={styles.label}>{t.index.eyebrow}</span>
        <h1 className={styles.heroName}>{IDENTITY.name}</h1>
        <p className={styles.heroAlias}>
          {t.index.akaPrefix} <b>{IDENTITY.alias}</b> · {IDENTITY.role}
        </p>
        <p className={styles.heroText}>{bio}</p>
      </header>

      {/* ─── GALERIA PINTEREST ────────────────────────────────────────── */}
      <section className={`${styles.worksSection} container`} id="work">
        <MasonryGallery works={WORKS} disciplines={DISCIPLINES} />
      </section>

      {/* ─── CONTATO ──────────────────────────────────────────────────── */}
      <section className={`${styles.contact} container`}>
        <span className={styles.label}>{t.index.contactLabel}</span>
        <p className={styles.contactName}>{t.index.contactHeadline}</p>
        <div className={styles.links}>
          <a className={styles.link} href={IDENTITY.socials.instagram} target="_blank" rel="noopener noreferrer">
            {t.index.instagramLabel}
          </a>
          <a
            className={`${styles.link} ${IDENTITY.socials.linkedinProvisional ? styles.prov : ''}`}
            href={IDENTITY.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.index.linkedinLabel}
          </a>
          <span className={styles.link}>{t.index.representedByPrefix} {IDENTITY.representedBy}</span>
        </div>
      </section>
    </main>
  )
}
