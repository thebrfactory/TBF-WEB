// Página de obra do portfólio Tavarístico. Uma view, dois idiomas: o cromo
// (rótulos Role/Client/Discipline/Year, Prev/Next, breadcrumb) vem do
// dicionário; título, papel, cliente e narrativa da obra continuam em
// `_data.ts` sem tradução — são conteúdo de portfólio, não cromo de UI (ver
// src/content/i18n/pages/tavaristico.ts e o relatório desta leva).
//
// generateStaticParams e generateMetadata ficam nas cascas (app/(en) e
// app/(pt)/pt), porque cada árvore precisa gerar as próprias páginas
// estáticas — ver src/content/i18n/README.md.

import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { notFound } from 'next/navigation'
import { WORKS, findWork, isProv } from '@/app/(en)/creators/tavaristico/_data'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'
import { tavaristico } from '@/content/i18n/pages/tavaristico'
import { localizedPath, type Lang } from '@/lib/i18n'

export default function TavaristicoWorkView({ lang, slug }: { lang: Lang; slug: string }) {
  const t = tavaristico[lang].work
  const path = (p: string) => localizedPath(p, lang)

  const w = findWork(slug)
  if (!w) notFound()

  const i = WORKS.findIndex((x) => x.slug === w.slug)
  const prev = WORKS[(i - 1 + WORKS.length) % WORKS.length]
  const next = WORKS[(i + 1) % WORKS.length]
  const gallery = w.media.gallery ?? []

  return (
    <main className={styles.page}>
      <article className={`${styles.work} container`}>
        <Link href={path('/creators/tavaristico#work')} className={styles.crumb}>
          {t.crumb}
        </Link>

        <div className={styles.workHead}>
          <span className={styles.index}>{w.index}</span>
          <h1 className={styles.workTitle}>{w.title}</h1>
        </div>

        <div className={styles.workMeta}>
          <span className={styles.metaCell}>
            <span className={styles.label}>{t.roleLabel}</span>
            <span className={`${styles.val} ${styles.roleVal} ${isProv(w, 'role') ? styles.prov : ''}`}>
              {w.role}
            </span>
          </span>
          {w.client && (
            <span className={styles.metaCell}>
              <span className={styles.label}>{t.clientLabel}</span>
              <span className={`${styles.val} ${isProv(w, 'client') ? styles.prov : ''}`}>{w.client}</span>
            </span>
          )}
          <span className={styles.metaCell}>
            <span className={styles.label}>{t.disciplineLabel}</span>
            <span className={styles.val}>{w.disciplines.join(' · ')}</span>
          </span>
          {w.year && (
            <span className={styles.metaCell}>
              <span className={styles.label}>{t.yearLabel}</span>
              <span className={styles.val}>{w.year}</span>
            </span>
          )}
        </div>

        {w.description && (
          <p className={`${styles.workIntro} ${isProv(w, 'description') ? styles.prov : ''}`}>
            {w.description}
          </p>
        )}

        <div className={styles.cover}>
          <Image src={w.media.cover} alt={w.title} fill sizes="100vw" priority />
        </div>
        {w.lowRes && (
          <span className={styles.lowResTag}>{t.lowResTag}</span>
        )}

        {gallery.length > 0 && (
          <div className={styles.gallery}>
            {gallery.map((src, idx) => (
              <div key={src} className={styles.galleryItem}>
                <Image
                  src={src}
                  alt={`${w.title} ${idx + 1}`}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </div>
        )}

        <nav className={styles.workNav}>
          <Link href={path(`/creators/tavaristico/works/${prev.slug}`)} className={styles.navLink}>
            <span className={styles.label}>{t.prevLabel}</span>
            <span className={styles.navTitle}>{prev.title}</span>
          </Link>
          <Link href={path(`/creators/tavaristico/works/${next.slug}`)} className={`${styles.navLink} ${styles.navNext}`}>
            <span className={styles.label}>{t.nextLabel}</span>
            <span className={styles.navTitle}>{next.title}</span>
          </Link>
        </nav>
      </article>
    </main>
  )
}
