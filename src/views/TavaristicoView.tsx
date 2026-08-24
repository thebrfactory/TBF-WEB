// Índice do portfólio do Felipe Tavares (Tavarístico). Uma página, dois
// idiomas: o cromo (rótulos, bio, contato) vem do dicionário; nomes de
// projeto, cliente e obra continuam em `_data.ts` sem tradução (ver
// src/content/i18n/pages/tavaristico.ts). Ver src/content/i18n/README.md.

import { IDENTITY, DISCIPLINES, WORKS } from '@/app/(en)/creators/tavaristico/_data'
import { MasonryGallery } from '@/app/(en)/creators/tavaristico/MasonryGallery'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'
import { tavaristico } from '@/content/i18n/pages/tavaristico'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
// A SETINHA DE GUIA NOVA (#01 CHANGES 2026-08-24). Estes dois vao para fora do
// dominio com target="_blank" na mao, entao nao passam pela regra do TbfLink: o
// icone entra explicito. Ele saiu da string do rotulo em content/i18n, onde
// vinha grudado no texto e no corpo inteiro.
import { NewTabIcon } from '@/components/TbfLink/NewTabIcon'
import { localizedPath, type Lang } from '@/lib/i18n'

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
            <NewTabIcon />
          </a>
          <a
            className={`${styles.link} ${IDENTITY.socials.linkedinProvisional ? styles.prov : ''}`}
            href={IDENTITY.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.index.linkedinLabel}
            <NewTabIcon />
          </a>
          <span className={styles.link}>{t.index.representedByPrefix} {IDENTITY.representedBy}</span>
        </div>
      </section>

      {/* ─── PROPOSTA DE HOSPEDAGEM ──────────────────────────────────────
             A entrada para /creators/tavaristico/hospitality (#01 CHANGES
             2026-08-14). Fica DEPOIS do contato, e fora da vitrine de obras,
             porque não é obra: a vitrine olha para trás, a proposta olha para
             frente. Posta entre os cases, ela seria lida como mais um deles. */}
      <section className={`${styles.contact} container`}>
        <span className={styles.label}>{t.index.hospitalityKicker}</span>
        <Link href={localizedPath('/creators/tavaristico/hospitality', lang)} className={styles.contactName}>
          {t.index.hospitalityLabel}
        </Link>
      </section>
    </main>
  )
}
