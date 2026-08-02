import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { WORKS, findWork, isProv } from '../../_data'
import styles from '../../tavaristico.module.css'

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const w = findWork(slug)
  if (!w) return { title: 'Work · Tavarístico' }
  return {
    title: `${w.title} · Tavarístico`,
    description: w.summary,
  }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const w = findWork(slug)
  if (!w) notFound()

  const i = WORKS.findIndex((x) => x.slug === w.slug)
  const prev = WORKS[(i - 1 + WORKS.length) % WORKS.length]
  const next = WORKS[(i + 1) % WORKS.length]
  const gallery = w.media.gallery ?? []

  return (
    <main className={styles.page}>
      <article className={`${styles.work} container`}>
        <Link href="/creators/tavaristico#work" className={styles.crumb}>
          ← Tavarístico · Work
        </Link>

        <div className={styles.workHead}>
          <span className={styles.index}>{w.index}</span>
          <h1 className={styles.workTitle}>{w.title}</h1>
        </div>

        <div className={styles.workMeta}>
          <span className={styles.metaCell}>
            <span className={styles.label}>Role</span>
            <span className={`${styles.val} ${styles.roleVal} ${isProv(w, 'role') ? styles.prov : ''}`}>
              {w.role}
            </span>
          </span>
          {w.client && (
            <span className={styles.metaCell}>
              <span className={styles.label}>Client</span>
              <span className={`${styles.val} ${isProv(w, 'client') ? styles.prov : ''}`}>{w.client}</span>
            </span>
          )}
          <span className={styles.metaCell}>
            <span className={styles.label}>Discipline</span>
            <span className={styles.val}>{w.disciplines.join(' · ')}</span>
          </span>
          {w.year && (
            <span className={styles.metaCell}>
              <span className={styles.label}>Year</span>
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
          <span className={styles.lowResTag}>capa preliminar, aguardando arquivo-fonte</span>
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
          <Link href={`/creators/tavaristico/works/${prev.slug}`} className={styles.navLink}>
            <span className={styles.label}>Prev</span>
            <span className={styles.navTitle}>{prev.title}</span>
          </Link>
          <Link href={`/creators/tavaristico/works/${next.slug}`} className={`${styles.navLink} ${styles.navNext}`}>
            <span className={styles.label}>Next</span>
            <span className={styles.navTitle}>{next.title}</span>
          </Link>
        </nav>
      </article>
    </main>
  )
}
