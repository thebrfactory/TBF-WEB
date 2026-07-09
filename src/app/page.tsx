// =============================================================================
// HOMEPAGE — /
// Hero fullscreen com LOGOTYPE.svg ponta a ponta + Ticker + Editorial + Labels + Manifesto + Instagram
// =============================================================================

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch, HOMEPAGE_QUERY } from '@/lib/sanity'
import type { HomePageProps } from '@/types'
import { ArticleCard } from '@/components/ArticleCard/ArticleCard'
import { Ticker } from '@/components/Ticker/Ticker'
import { PhotoCarousel } from '@/components/PhotoCarousel/PhotoCarousel'
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen'
import { HeroVideo } from '@/components/HeroVideo/HeroVideo'

export const metadata: Metadata = {
  title: '.THE BRAZILIAN FACTORY.',
  description:
    'Culture™ Crafted in São Paulo. Consumed Worldwide. A Brazilian label. Editorial · Labels · Collective.',
  openGraph: {
    title: '.THE BRAZILIAN FACTORY.',
    description: 'Culture™ Crafted in São Paulo. Consumed Worldwide.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

export const revalidate = 3600

// Pool de matérias exibido no hover dos carrosséis quando o CMS ainda está vazio
// (mesmos títulos/placeholder do preview editorial do site).
const FALLBACK_CAROUSEL_ARTICLES = [
  { title: 'What about the Brazilian fashion culture?', href: '/editorial/lorem-ipsum-1' },
  { title: 'AFTERPARTY: the feeling behind Brazilian parties', href: '/editorial/lorem-ipsum-2' },
  { title: 'ACT I: feeling a Brazilian runway backstage', href: '/editorial/lorem-ipsum-3' },
]

export default async function HomePage() {
  let data: HomePageProps = {
    featuredPost: undefined,
    latestPosts: [],
    siteSettings: {
      _id: 'default',
      _type: 'siteSettings',
      siteTitle: '.THE BRAZILIAN FACTORY.',
      collectiveApplicationOpen: false,
    },
  }

  try {
    const fetched = await sanityFetch<HomePageProps>(HOMEPAGE_QUERY)
    if (fetched) data = fetched
  } catch {
    // Static fallback — non-blocking
  }

  // Matérias reais (featured + latest) para o hover dos carrosséis; fallback
  // para o placeholder editorial quando o CMS ainda não tem posts publicados.
  const articlePool = [
    ...(data.featuredPost
      ? [{ title: data.featuredPost.title, href: `/editorial/${data.featuredPost.slug.current}` }]
      : []),
    ...data.latestPosts.map((p) => ({
      title: p.title,
      href: `/editorial/${p.slug.current}`,
    })),
  ]
  const carouselArticles =
    articlePool.length > 0 ? articlePool : FALLBACK_CAROUSEL_ARTICLES

  return (
    <>
      <LoadingScreen />

      {/* ─── HERO — LOGOTYPE CENTRALIZADO ────────────────────────────────────── */}
      <section
        className="hero hero--home"
        aria-label="Hero .THE BRAZILIAN FACTORY."
        style={{ width: '100vw' }}
      >
        {/* Grain overlay */}
        <div className="hero__overlay-grain" aria-hidden="true" />

        {/* Vídeo de fundo (mobile vertical / desktop horizontal) */}
        <HeroVideo />

        {/* LOGOTYPE + DECK — grupo alinhado, junto à base do vídeo */}
        <div className="hero-home__content">
          {/* Logotype SVG — mobile: margem a margem · desktop: 65% centralizado */}
          <svg
            viewBox="0 397 595.28 47"
            aria-label=".THE BRAZILIAN FACTORY."
            role="img"
            className="hero-home__logo"
          >
            <path d="M5.21,428.52c3.22,0,5.21,1.9,5.21,5.02s-2,5.02-5.21,5.02-5.21-1.9-5.21-5.02,2-5.02,5.21-5.02Z" fill="#fff"/>
            <path d="M36.36,403.16v8.46h-8.84v26.15h-10.09v-26.15h-8.84v-8.46h27.78Z" fill="#fff"/>
            <path d="M60.39,437.77v-13.36h-11.49v13.36h-10.05v-34.61h10.05v12.83h11.49v-12.83h10.09v34.61h-10.09Z" fill="#fff"/>
            <path d="M75.48,403.16h23.17v8.46h-13.12v4.61h11.25v7.93h-11.25v5.14h13.84v8.46h-23.89v-34.61Z" fill="#fff"/>
            <path d="M114.85,403.16h11.78c7.83,0,14.28,2.93,14.28,9.95,0,3.56-2.21,5.62-4.47,6.49,2.79.77,5.72,3.65,5.72,7.74,0,7.35-6.1,10.43-14.76,10.43h-12.55v-34.61ZM124.42,411.14v5.91h2.79c1.92,0,3.6-.72,3.6-2.93s-1.68-2.98-3.6-2.98h-2.79ZM124.42,423.4v6.39h3.51c1.92,0,3.85-.77,3.85-3.17s-1.92-3.22-3.85-3.22h-3.51Z" fill="#fff"/>
            <path d="M163.11,437.77l-5.1-10.77h-2.84v10.77h-9.81v-34.61h13.03c8.51,0,14.52,3.99,14.52,12.16,0,4.9-2.31,8.22-6.1,10.05l6.73,12.4h-10.43ZM155.18,411.62v7.4h3.75c2.02,0,3.85-.87,3.85-3.7s-1.83-3.7-3.85-3.7h-3.75Z" fill="#fff"/>
            <path d="M196.13,433.2h-10.53l-2.11,4.57h-10.43l17.59-35.09h.48l17.59,35.09h-10.43l-2.16-4.57ZM188.39,426.67h5c-.87-2.02-2.16-5.19-2.45-6.44h-.1c-.29,1.25-1.59,4.42-2.45,6.44Z" fill="#fff"/>
            <path d="M223.28,429.31h13.84v8.46h-29.13l14.9-26.15h-13.12v-8.46h28.31l-14.8,26.15Z" fill="#fff"/>
            <path d="M250.92,437.77h-10.05v-34.61h10.05v34.61Z" fill="#fff"/>
            <path d="M255.92,437.77v-34.61h10.05v26.15h11.82v8.46h-21.87Z" fill="#fff"/>
            <path d="M290.57,437.77h-10.05v-34.61h10.05v34.61Z" fill="#fff"/>
            <path d="M315.18,433.2h-10.53l-2.11,4.57h-10.43l17.59-35.09h.48l17.59,35.09h-10.43l-2.16-4.57ZM307.44,426.67h5c-.86-2.02-2.16-5.19-2.45-6.44h-.1c-.29,1.25-1.59,4.42-2.45,6.44Z" fill="#fff"/>
            <path d="M339.12,422.24v15.53h-9.81v-35.09h.48l19.8,16.01v-15.53h9.85v35.09h-.43l-19.9-16.01Z" fill="#fff"/>
            <path d="M379.23,403.16h21.97v8.46h-11.92v5.14h10.05v8.22h-10.05v12.79h-10.05v-34.61Z" fill="#fff"/>
            <path d="M419.94,433.2h-10.53l-2.11,4.57h-10.43l17.59-35.09h.48l17.59,35.09h-10.43l-2.16-4.57ZM412.2,426.67h5c-.86-2.02-2.16-5.19-2.45-6.44h-.1c-.29,1.25-1.59,4.42-2.45,6.44Z" fill="#fff"/>
            <path d="M448.83,402.44c4.42,0,7.45,1.01,9.85,2.26v9.13c-1.87-.96-4.81-2.21-8.84-2.21-6.15,0-9.37,4.28-9.37,8.84s3.12,8.84,8.84,8.84c4.37,0,7.59-1.2,9.61-2.21v9.23c-2.4,1.25-6.39,2.16-10.57,2.16-10.38,0-17.98-7.98-17.98-18.02s7.59-18.02,18.46-18.02Z" fill="#fff"/>
            <path d="M489.18,403.16v8.46h-8.84v26.15h-10.09v-26.15h-8.84v-8.46h27.78Z" fill="#fff"/>
            <path d="M508.38,402.44c10.91,0,18.51,8.12,18.51,18.02s-7.59,18.02-18.51,18.02-18.46-7.98-18.46-18.02,7.59-18.02,18.46-18.02ZM508.38,429.31c5.09,0,8.36-4.18,8.36-8.84s-3.27-8.84-8.36-8.84-8.36,4.28-8.36,8.84,3.32,8.84,8.36,8.84Z" fill="#fff"/>
            <path d="M547.84,437.77l-5.09-10.77h-2.84v10.77h-9.81v-34.61h13.03c8.51,0,14.52,3.99,14.52,12.16,0,4.9-2.31,8.22-6.1,10.05l6.73,12.4h-10.43ZM539.91,411.62v7.4h3.75c2.02,0,3.85-.87,3.85-3.7s-1.83-3.7-3.85-3.7h-3.75Z" fill="#fff"/>
            <path d="M568.94,437.77v-13.07l-12.64-21.53h11.44l6.25,11.97,6.25-11.97h11.44l-12.64,21.53v13.07h-10.09Z" fill="#fff"/>
            <path d="M590.06,428.52c3.22,0,5.21,1.9,5.21,5.02s-2,5.02-5.21,5.02-5.21-1.9-5.21-5.02,2-5.02,5.21-5.02Z" fill="#fff"/>
          </svg>

          {/* Deck — alinhado ao início do SVG */}
          <p className="hero-home__deck">
            Culture™<br />Crafted in São Paulo, Brazil<br />.Consumed Worldwide.
          </p>
        </div>

      </section>

      {/* ─── TICKER ──────────────────────────────────────────────────────────── */}
      <Ticker />

      {/* ─── PHOTO CAROUSEL ──────────────────────────────────────────────────── */}
      <PhotoCarousel articles={carouselArticles} />

      {/* ─── EDITORIAL GRID ──────────────────────────────────────────────────── */}
      <section
        aria-labelledby="editorial-section-heading"
        style={{ paddingTop: 'var(--tbf-space-10)', paddingBottom: 'var(--tbf-space-10)' }}
      >
        <div className="container">
          <div style={{ marginBottom: 'var(--tbf-space-8)' }}>
            <h2
              id="editorial-section-heading"
              style={{
                fontFamily: 'var(--tbf-font-family-ui)',
                fontSize: 'var(--tbf-type-micro-size)',
                letterSpacing: 'var(--tbf-type-micro-ls)',
                color: 'var(--tbf-text-tertiary)',
                textTransform: 'uppercase',
              }}
            >
              Magazine
            </h2>
          </div>
        </div>

        <div className="editorial-grid">
          {data.featuredPost && (
            <ArticleCard post={data.featuredPost} variant="featured" />
          )}
          {data.latestPosts.map((post) => (
            <ArticleCard key={post._id} post={post} variant="standard" />
          ))}

          {!data.featuredPost && data.latestPosts.length === 0 && (
            <>
              {[
                {
                  img: '/images/thumb-01.webp',
                  category: 'Editorial',
                  title: 'What about the Brazilian fashion culture?',
                  date: '01 Jun. 2026',
                },
                {
                  img: '/images/thumb-02.webp',
                  category: 'Coolhunting',
                  title: 'AFTERPARTY: the feeling behind Brazilian parties',
                  date: '28 Mai. 2026',
                },
                {
                  img: '/images/thumb-03.webp',
                  category: 'Fashion Film',
                  title: 'ACT I: feeling a Brazilian runway backstage',
                  date: '20 Mai. 2026',
                },
              ].map((mock, i) => (
                <Link key={i} href={`/editorial/lorem-ipsum-${i + 1}`} className="card card--standard" style={{ textDecoration: 'none' }}>
                  <div className="card__image-wrapper">
                    <Image
                      className="card__image"
                      src={mock.img}
                      alt=""
                      width={955}
                      height={640}
                      sizes="(min-width:768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="card__content">
                    <div className="card__tags">
                      <span className="tag tag--category">{mock.category}</span>
                    </div>
                    <h3 className="card__title">{mock.title}</h3>
                    <div className="byline">
                      <span className="byline__text">
                        <span className="card__meta">{mock.date}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>

        <div className="container" style={{ marginTop: 'var(--tbf-space-8)' }}>
          <Link href="/editorial" className="btn btn--secondary">
            Enter the Magazine
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ─── MONOGRAM DIVIDER ─────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          width: '100%',
          paddingBlock: 'var(--tbf-space-8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'var(--tbf-space-6)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Monogram central */}
        <svg
          viewBox="100 336 396 170"
          width="120"
          height="51"
          style={{ opacity: 0.6, fill: 'var(--tbf-text-tertiary)', flexShrink: 0 }}
        >
          <path d="M441.35,346c20.76,19.49,25.61,51.77,45.16,74.54-19.55,22.77-24.4,55.04-45.16,74.54-8.31-2.7-20.68,2.39-29.85.8,20.99-19.08,26.96-53.89,43.38-75.33-16.42-21.45-22.39-56.26-43.38-75.33,9.16-1.59,21.54,3.5,29.85.8Z"/>
          <path d="M154.73,346c-20.76,19.49-25.61,51.77-45.16,74.54,19.55,22.77,24.4,55.04,45.16,74.54,8.31-2.7,20.68,2.39,29.85.8-20.99-19.08-26.96-53.89-43.38-75.33,16.42-21.45,22.39-56.26,43.38-75.33-9.16-1.59-21.54,3.5-29.85.8Z"/>
          <path d="M245.75,428.67c7.24-.24,14.35-.73,21.13-1.91-1.88,10.84-1.6,23.14,0,36.34,4.86-5.21,9.45-10.51,13.35-16.05,6.32,8.98,15.19,17.47,25.62,25.65-.27-6.85-.78-13.59-1.91-20.04,11.02,1.87,23.52,1.53,36.91-.14-5.22-4.86-10.53-9.46-16.1-13.36,8.96-6.36,17.42-15.23,25.57-25.64-6.89.27-13.68.79-20.18,1.92,1.91-11.03,1.59-23.55-.07-36.96-4.77,5.13-9.27,10.36-13.11,15.83-6.41-9.09-15.41-17.67-25.97-25.92.25,7.13.77,14.14,1.94,20.84-10.87-1.87-23.19-1.59-36.39,0,5.06,4.67,10.2,9.08,15.57,12.85-9.25,6.53-17.97,15.76-26.37,26.58Z"/>
        </svg>
      </div>

      {/* ─── SÃO PAULO MANIFESTO QUOTE ──────────────────────────────────────── */}
      <section
        className="section container"
        aria-labelledby="sp-quote-heading"
        style={{ paddingBlock: 'var(--tbf-space-16)' }}
      >
        <div style={{ maxWidth: 'min(92vw, 800px)', marginInline: 'auto', textAlign: 'center' }}>
          <blockquote
            className="manifesto-fragment"
            style={{
              fontFamily: 'var(--tbf-font-family-display)',
              fontSize: 'clamp(1.3rem, 3.9vw, 2.1rem)',
              fontWeight: 400,
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
              color: 'var(--tbf-text-primary)',
              marginBottom: 'var(--tbf-space-6)',
            }}
          >
            <span id="sp-quote-heading" style={{ display: 'none' }}>São Paulo, cidade-manifesto</span>
            &ldquo;São Paulo é já a cidade{' '}<br className="br-mobile-only" />que pede romancistas e poetas.{' '}<br />Que impõe pasmosos problemas humanos{' '}<br className="br-mobile-only" />e agita,{' '}<br className="br-desktop-only" />no seu tumulto discreto,{' '}<br className="br-mobile-only" />egoísta e inteligente,{' '}<br />as profundas revoluções{' '}<br className="br-mobile-only" />criadoras de imortalidades.&rdquo;
          </blockquote>

          <p
            className="manifesto-fragment"
            style={{
              fontFamily: 'var(--tbf-font-family-body)',
              fontSize: 'clamp(1rem, 2.6vw, 1.3rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.6,
              color: 'rgba(240, 237, 230, 0.72)',
              marginBottom: 'var(--tbf-space-8)',
            }}
          >
            &ldquo;São Paulo is already the city that calls for novelists and poets. That imposes astonishing human problems and stirs, in its discreet, selfish and intelligent tumult, the profound revolutions that breed immortality.&rdquo;
          </p>

          <cite
            style={{
              fontFamily: 'var(--tbf-font-family-ui)',
              fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
              letterSpacing: '0.1em',
              lineHeight: 1.5,
              color: '#ffffff',
              textTransform: 'uppercase',
              fontStyle: 'normal',
            }}
          >
            — Oswald de Andrade,{' '}<br className="br-mobile-only" />do grupo modernista,{' '}<br className="br-mobile-only" />1922,{' '}<br className="br-mobile-only" />São Paulo, SP.
          </cite>
        </div>
      </section>

      {/* ─── CAROUSEL 02 — acima do manifesto ──────────────────────────────── */}
      <PhotoCarousel
        articles={carouselArticles}
        photos={[
          '/images/slide2/01.webp','/images/slide2/02.webp','/images/slide2/03.webp',
          '/images/slide2/04.webp','/images/slide2/05.webp','/images/slide2/06.webp',
          '/images/slide2/09.webp',
        ]}
      />

      {/* ─── MANIFESTO FRAGMENT ──────────────────────────────────────────────── */}
      <section
        className="section container"
        aria-labelledby="manifesto-fragment-heading"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div className="layout-d" style={{ marginBlock: 'var(--tbf-space-24)' }}>
          <div>
            <p
              style={{
                fontFamily: 'var(--tbf-font-family-ui)',
                fontSize: 'var(--tbf-type-micro-size)',
                letterSpacing: 'var(--tbf-type-micro-ls)',
                color: 'var(--tbf-text-tertiary)',
                textTransform: 'uppercase',
                marginBottom: 'var(--tbf-space-8)',
              }}
              id="manifesto-fragment-heading"
            >
              Manifesto
            </p>

            <blockquote
              className="manifesto-fragment"
              style={{
                fontFamily: 'var(--tbf-font-family-display)',
                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--tbf-text-primary)',
                marginBottom: 'var(--tbf-space-8)',
                maxWidth: '22ch',
              }}
            >
              &ldquo;What about<br />this Brazilian label<br />called .TBF.?<br />It&apos;s a brand?&rdquo;
            </blockquote>

            <p
              className="manifesto-fragment"
              style={{
                fontFamily: 'var(--tbf-font-family-body)',
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                lineHeight: 1.7,
                color: 'var(--tbf-text-secondary)',
                maxWidth: '55ch',
                marginBottom: 'var(--tbf-space-10)',
                fontStyle: 'italic',
              }}
            >
              We don't copy Paris — we print over it. / A gente não copia Paris — imprime por cima.
            </p>

            <Link
              href="/manifesto"
              className="btn btn--primary"
            >
              READ THE MANIFESTO
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
