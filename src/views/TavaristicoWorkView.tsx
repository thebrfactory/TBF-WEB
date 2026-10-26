// Página de obra do portfólio Tavarístico. Uma view, dois idiomas: o cromo
// (rótulos Role/Client/Year, Prev/Next, breadcrumb) vem do
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
import { WORKS, findWork } from '@/app/(en)/creators/tavaristico/_data'
import { Campaigns } from '@/components/tavaristico/Campaigns'
import { FeedGrid } from '@/components/tavaristico/WorkEditorial'
import { WorkCarousel, type CarouselItem } from '@/components/tavaristico/WorkCarousel'
import { InstagramEmbeds } from '@/components/tavaristico/InstagramEmbeds'
import { WorkBlocks } from '@/components/tavaristico/WorkBlocks'
import { WorkProcess } from '@/components/tavaristico/WorkProcess'
import { DIMS } from '@/app/(en)/creators/tavaristico/_dims'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'
import { tavaristico } from '@/content/i18n/pages/tavaristico'
import { MetaContentView } from '@/components/Analytics/MetaEvent'
import { localizedPath, type Lang } from '@/lib/i18n'

export default function TavaristicoWorkView({ lang, slug }: { lang: Lang; slug: string }) {
  const t = tavaristico[lang].work
  const path = (p: string) => localizedPath(p, lang)

  const w = findWork(slug)
  if (!w) notFound()

  const i = WORKS.findIndex((x) => x.slug === w.slug)
  const prev = WORKS[(i - 1 + WORKS.length) % WORKS.length]
  const next = WORKS[(i + 1) % WORKS.length]
  // Rodada 26/10 tarde: capa vertical (ex.: ÔBLACK) nao se corta em 16:9. Com `coverAsStrip`,
  // a capa entra como a 1a lamina da faixa da galeria, inteira, e o bloco de capa some.
  const gallery = w.coverAsStrip ? [w.media.cover, ...(w.media.gallery ?? [])] : (w.media.gallery ?? [])
  const altFor = (idx: number) =>
    w.coverAsStrip
      ? idx === 0
        ? (w.coverAlt ?? w.title)
        : (w.galleryAlts?.[idx - 1] ?? `${w.title} ${idx + 1}`)
      : (w.galleryAlts?.[idx] ?? `${w.title} ${idx + 2}`)
  const text = lang === 'en' ? (w.descriptionEn ?? w.description) : w.description
  // A narrativa pode ter varios paragrafos, separados por quebra de linha.
  const paragraphs = (text ?? '').split('\n').filter(Boolean)
  // Capa com a proporção da própria peça quando é paisagem; o resto (retrato,
  // quadrado) segue em 16:9 como nos cards.
  const [cw, ch] = DIMS[w.media.cover] ?? [16, 9]
  const roleList = (lang === 'pt' ? (w.roleListPT ?? w.roleList) : w.roleList)?.length
    ? (lang === 'pt' ? (w.roleListPT ?? w.roleList) : w.roleList)
    : undefined
  const coverRatio = cw / ch >= 1.2 && cw / ch <= 2.4 ? `${cw} / ${ch}` : '16 / 9'

  // Rodada 26/10/2026: pecas verticais lado a lado viram a faixa que sangra (padrao do
  // reel da hospitality). Na galeria, 2 ou mais verticais seguidas formam uma faixa;
  // o resto segue na grade de sempre.
  type Cell = { src: string; idx: number; iw: number; ih: number }
  type Chunk = { kind: 'grid'; items: Cell[] } | { kind: 'strip'; items: CarouselItem[] }
  const cells: Cell[] = gallery.map((src, idx) => {
    const [iw, ih] = DIMS[src] ?? [1600, 1000]
    return { src, idx, iw, ih }
  })
  const isTall = (c: Cell) => c.ih / c.iw > 1.15
  const galleryChunks: Chunk[] = []
  for (let k = 0; k < cells.length; ) {
    let e = k
    if (!w.galleryDense && isTall(cells[k])) {
      while (e < cells.length && isTall(cells[e])) e++
    }
    if (e - k >= 2) {
      galleryChunks.push({
        kind: 'strip',
        items: cells.slice(k, e).map((c) => ({
          src: c.src,
          alt: altFor(c.idx),
          w: c.iw,
          h: c.ih,
        })),
      })
      k = e
    } else {
      const last = galleryChunks[galleryChunks.length - 1]
      if (last && last.kind === 'grid') last.items.push(cells[k])
      else galleryChunks.push({ kind: 'grid', items: [cells[k]] })
      k++
    }
  }
  const lookbookItems: CarouselItem[] = (w.lookbook ?? []).map((p) => ({
    src: p.src,
    alt: p.alt,
    w: 1080,
    h: 1920,
    caption: lang === 'pt' ? p.captionPT : p.captionEN,
  }))

  return (
    <main className={styles.page}>
      <MetaContentView name={w.title} category="case" id={w.slug} />
      <article className={`${styles.work} container`}>
        {/* #01 CHANGES 09/10: voltar ao portfólio na mesma guia (ordem do fundador) */}
        <Link href={path('/creators/tavaristico#work')} target="_self" newTabIcon={false} className={styles.crumb}>
          {t.crumb}
        </Link>

        <div className={styles.workHead}>
          <span className={styles.index}>{w.index}</span>
          <h1 className={styles.workTitle}>{w.title}</h1>
        </div>

        <div className={styles.workMeta}>
          <span className={styles.metaCell}>
            <span className={styles.label}>{t.roleLabel}</span>
            {roleList ? (
              <ul className={`${styles.val} ${styles.roleVal} ${styles.roleList}`}>
                {roleList.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            ) : (
              <span className={`${styles.val} ${styles.roleVal}`}>
                {lang === 'pt' ? (w.rolePT ?? w.role) : w.role}
              </span>
            )}
          </span>
          {w.client && (
            <span className={styles.metaCell}>
              <span className={styles.label}>{t.clientLabel}</span>
              <span className={styles.val}>{w.client}</span>
            </span>
          )}
        </div>

        {paragraphs.map((para, k) => (
          <p
            key={k}
            className={`${styles.workIntro} ${k < paragraphs.length - 1 ? styles.workIntroGap : ''}`}
          >
            {para}
          </p>
        ))}

        {w.credits && w.credits.length > 0 && (
          <section className={styles.credits} aria-label={t.creditsLabel}>
            <span className={styles.label}>{t.creditsLabel}</span>
            <dl className={styles.creditList}>
              {w.credits.map((c) => (
                <div key={c.roleEN} className={styles.creditRow}>
                  <dt>{lang === 'pt' ? c.rolePT : c.roleEN}</dt>
                  <dd>{c.name}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {w.highlights && w.highlights.length > 0 && (
          <div className={styles.workStories}>
            <Campaigns campaigns={w.highlights} lang={lang} label={w.title} caseLabel="" inviteLabel="" hideNames />
          </div>
        )}

        {w.coverAsStrip ? null : (
          <div className={styles.cover} style={{ aspectRatio: coverRatio }}>
            <Image src={w.media.cover} alt={w.coverAlt ?? w.title} fill sizes="100vw" quality={95} priority />
          </div>
        )}
        {w.lowRes && (
          <span className={styles.lowResTag}>{t.lowResTag}</span>
        )}

        {w.topBlocks && w.topBlocks.length > 0 && (
          <WorkBlocks blocks={w.topBlocks} lang={lang} prevLabel={t.carouselPrev} nextLabel={t.carouselNext} />
        )}

        {galleryChunks.map((chunk, ci) =>
          chunk.kind === 'strip' ? (
            <WorkCarousel
              key={`s${ci}`}
              items={chunk.items}
              variant="tall"
              prevLabel={t.carouselPrev}
              nextLabel={t.carouselNext}
            />
          ) : (
            <div
              key={`g${ci}`}
              className={`${styles.gallery} ${w.galleryDense ? styles.galleryDense : ''}`}
              style={chunk.items.length === 1 ? { columnCount: 1 } : undefined}
            >
              {chunk.items.map(({ src, idx, iw, ih }) => (
                <div
                  key={src}
                  className={`${styles.galleryItem} ${iw / ih >= 2.2 ? styles.galleryWide : ''}`}
                >
                  <Image
                    src={src}
                    alt={altFor(idx)}
                    width={iw}
                    height={ih}
                    sizes={
                      w.galleryDense
                        ? '(min-width: 1200px) 24vw, (min-width: 768px) 32vw, 50vw'
                        : '(min-width: 768px) 50vw, 100vw'
                    }
                    quality={92}
                    unoptimized={src.endsWith('.gif')}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          ),
        )}

        {lookbookItems.length > 0 && (
          <WorkCarousel
            items={lookbookItems}
            label={t.lookbookLabel}
            variant="tall"
            prevLabel={t.carouselPrev}
            nextLabel={t.carouselNext}
          />
        )}

        {w.feedGrid && w.feedGrid.length > 0 && <FeedGrid pieces={w.feedGrid} label={t.feedLabel} ratio={w.feedRatio} />}

        {w.process && w.process.length > 0 && (
          <WorkProcess
            steps={w.process}
            lang={lang}
            label={t.processLabel}
            prevLabel={t.carouselPrev}
            nextLabel={t.carouselNext}
          />
        )}

        {w.blocks && w.blocks.length > 0 && (
          <WorkBlocks blocks={w.blocks} lang={lang} prevLabel={t.carouselPrev} nextLabel={t.carouselNext} />
        )}

        {w.instagramEmbeds && w.instagramEmbeds.length > 0 && (
          <InstagramEmbeds urls={w.instagramEmbeds} label={t.reelsLabel} />
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
