// =============================================================================
// HOMEPAGE — serve `/` (inglês) e `/pt` (português)
// Hero fullscreen (HomeHero, compartilhado com a capa do /pitch/v2) + Ticker +
// Editorial + Labels + Manifesto + Instagram
//
// Uma página, dois idiomas: o texto vem do dicionário e os links passam por
// localizedPath. Ver src/content/i18n/README.md.
// =============================================================================

import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { sanityFetch, HOMEPAGE_QUERY } from '@/lib/sanity'
import type { HomePageProps } from '@/types'
import { ArticleCard } from '@/components/ArticleCard/ArticleCard'
import { Ticker } from '@/components/Ticker/Ticker'
import { PhotoCarousel } from '@/components/PhotoCarousel/PhotoCarousel'
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen'
import { HomeHero } from '@/components/HomeHero/HomeHero'
import { LocalArticleCard } from '@/components/ArticleCard/LocalArticleCard'
import { InstagramFloat } from '@/components/InstagramFloat/InstagramFloat'
import { LOCAIS } from '@/content/articles'
import { home } from '@/content/i18n/pages/home'
import { localizedPath, type Lang } from '@/lib/i18n'
import type { CarouselArticle } from '@/components/PhotoCarousel/PhotoCarousel'

// NOME E LINK DE CADA FOTO DOS DOIS CARROSSÉIS (pedido do fundador).
// Cada foto tem, agora, nome e link próprios, 1 para 1, na mesma ordem do
// array `photos` de cada PhotoCarousel: não é mais um pool cíclico de
// matérias do CMS. `title` leva uma palavra por linha (quebra `\n`, aplicada
// no CSS via white-space: pre-line em .carousel-slide__title).
//
// Carrossel 01, fotos slide1/01..10.webp, nesta ordem exata. Conferido foto a
// foto contra os prints do fundador (image-25 a image-34): bateu 1 para 1,
// sem troca de ordem.
const SLIDE1_ARTICLES: CarouselArticle[] = [
  { title: '.BRAZILIAN\nHIGH\nSUMMER.', href: 'https://www.instagram.com/p/DXKxoDVFdPs/' },
  { title: '.THE\nBRAZILIAN\nBACKSTAGE.', href: 'https://www.instagram.com/p/DXaLo3CjgQm/' },
  { title: '.THE\nBRAZILIAN\nLIFESTYLE.', href: 'https://www.instagram.com/p/DPbjzwgjbKM/' },
  { title: '.BRAZILIAN\nRUNWAY\nLIFESTYLE.', href: 'https://www.instagram.com/p/DPpNWr7CXj0/' },
  { title: '.THE\nFASHION\nMOOD.', href: 'https://www.instagram.com/p/DPUk0hvgn-6/' },
  { title: '.BRAZILIAN\nRUNWAY\nCULTURE.', href: 'https://www.instagram.com/p/Da5fZDlOfoj/' },
  { title: '.BRAZILIAN\nFASHION\nMAGAZINE.', href: 'https://www.instagram.com/p/DPUzB6BD3-9/' },
  { title: '.THE\nBRAZILIAN\nDEBUT.', href: 'https://www.instagram.com/p/DO1wm-kD93p/' },
  { title: '.WITH\nCULTURAL\nIMPACT.', href: 'https://www.instagram.com/p/DPKfbR6jmx_/' },
  { title: '.BRAZILIAN\nFASHION\nREEL.', href: 'https://www.instagram.com/p/DPXO1KyDjKL/' },
]

// Carrossel 02, fotos slide2/01,02,03,04,05,06,09.webp, nesta ordem.
// 🔴 ORDEM CONFERIDA CONTRA OS PRINTS (image-35 a image-41): NÃO bateu com a
// ordem literal do pedido. Os prints mostram cada foto deslocada uma posição
// para frente, então slide2/09 é a mesma foto do primeiro print, não do
// último. A ordem abaixo segue o que os prints mostram: a foto decide, a
// lista não.
function slide2Articles(path: (p: string) => string): CarouselArticle[] {
  return [
    { title: '.THE\nBRAZILIAN\nAFTERPARTY.', href: 'https://www.instagram.com/p/DPUs4WKlG6n/' }, // 01
    { title: '.BRAZILIAN\nFASHION\nWEEK.', href: 'https://www.instagram.com/p/DXaLo3CjgQm/' }, // 02
    { title: '.THE\nLOST\nTAPE.', href: 'https://www.instagram.com/p/DX-b6Pbium6/' }, // 03
    { title: '.BRAZILIAN\nFASHION\nMAGAZINE.', href: 'https://www.instagram.com/p/DPpNWr7CXj0/' }, // 04
    { title: '.BRAZILIAN\nRUNWAY\nCULTURE.', href: 'https://www.instagram.com/p/DPbo2BBCaIB/' }, // 05
    { title: '.BRAZILIAN\nCOUNTRY\nSIDE.', href: path('/mag/brazilian-country-side') }, // 06, matéria interna
    { title: '.BRAZILIAN\nDEMO\nREEL.', href: 'https://www.instagram.com/p/DP-F299lK8V/' }, // 09
  ]
}

export default async function HomeView({ lang }: { lang: Lang }) {
  const t = home[lang]
  const path = (p: string) => localizedPath(p, lang)

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

  // Nome e link de cada foto do carrossel 02 (item 17 é matéria interna, e por
  // isso depende de `path`, com idioma).
  const carousel2Articles = slide2Articles(path)

  // Vitrine da home = só matéria com capa. O critério é o MESMO que o
  // <ArticleCard /> usa para decidir se desenha a foto ou o bloco chapado
  // (`post.heroImage`), de propósito: se um dia ele mudar de campo, este filtro
  // tem que mudar junto, e a única forma de garantir isso é os dois lerem a
  // mesma coisa. Se a featured não tem capa, ela não é promovida a featured nem
  // rebaixada a standard — ela simplesmente não entra.
  const featuredWithCover = data.featuredPost?.heroImage ? data.featuredPost : undefined
  const postsWithCover = data.latestPosts.filter((p) => p.heroImage)
  // Quantos cards a grade vai realmente desenhar. Quando é UM, a grade
  // multi-coluna precisa saber (ver `.editorial-grid--solo` em components.css):
  // sem isso, o card único fica do tamanho de um terço da tela.
  const homeCardCount =
    (featuredWithCover ? 1 : 0) + postsWithCover.length ||
    1 /* fallback do piloto: também é um card */

  return (
    <>
      <LoadingScreen />

      {/* Bolha flutuante do Instagram, pedido do fundador no bloco "AJUSTES
          NA HOMEPAGE": so aqui, nunca no layout global. */}
      <InstagramFloat />

      {/* ─── HERO — LOGOTYPE CENTRALIZADO ────────────────────────────────────── */}
      <HomeHero />

      {/* ─── TICKER ──────────────────────────────────────────────────────────── */}
      <Ticker />

      {/* ─── PHOTO CAROUSEL ──────────────────────────────────────────────────────
             O carrossel tem o MESMO respiro em cima e embaixo: acima é este
             paddingTop, abaixo é o paddingTop da grade editorial logo a seguir.
             Ele nasce centrado entre o letreiro e a primeira fileira de cards,
             em vez de colado num dos dois. Gestalt, pedido do fundador
             2026-07-31 (a medida caiu à metade em 2026-07-31, mesma sessão).
             Mexeu num dos dois? Mexa no outro. */}
      <div style={{ background: '#000000', paddingTop: 'var(--tbf-home-carousel-gap)' }}>
        <PhotoCarousel articles={SLIDE1_ARTICLES} fallbackLabel={t.magazine.cta} />
      </div>

      {/* ─── EDITORIAL GRID ──────────────────────────────────────────────────────
             O rótulo "MAGAZINE" saiu (pedido do fundador 2026-07-31): as capas
             já dizem o que a seção é, e ele era a única coisa entre o carrossel
             e os cards, o que desequilibrava o respiro de baixo. O nome da
             seção segue existindo para leitor de tela no aria-label. */}
      <section
        aria-label={t.magazine.sectionLabel}
        style={{
          paddingTop: 'var(--tbf-home-carousel-gap)',
          paddingBottom: 'var(--tbf-space-10)',
        }}
      >
        <div
          className={`editorial-grid container${homeCardCount === 1 ? ' editorial-grid--solo' : ''}`}
        >
          {/* SÓ MATÉRIA COM CAPA (pedido do fundador 2026-08-12, #01 CHANGES).
              A home é vitrine: card sem capa aparecia como bloco chapado em
              parchment com o selo de dimensão, o que é ferramenta de produção e
              não peça de vitrine. Duas coisas saíram por causa disso:
              1) os mocks TBFipsum, que nunca tiveram capa nem matéria por trás;
              2) qualquer post do Sanity publicado sem heroImage — o filtro é por
                 DADO, não por lista, então um post sem capa não volta a vazar
                 aqui só porque alguém publicou com pressa.
              O /editorial (o arquivo) segue mostrando tudo: lá o bloco chapado
              tem função, é o inventário do que existe. */}
          {featuredWithCover && (
            <ArticleCard post={featuredWithCover} variant="featured" />
          )}
          {postsWithCover.map((post) => (
            <ArticleCard key={post._id} post={post} variant="standard" />
          ))}

          {/* Sanity vazio (ou sem nenhum post com capa): as matérias reais que
              vivem no repo abrem a grade. Cada uma tem capa própria, vinda do
              próprio artigo. A mais nova entra em destaque. */}
          {!featuredWithCover &&
            postsWithCover.length === 0 &&
            LOCAIS.map((a, i) => (
              <LocalArticleCard
                key={a.slug}
                article={a}
                lang={lang}
                variant={i === 0 ? 'featured' : 'standard'}
              />
            ))}
        </div>

        <div className="container" style={{ marginTop: 'var(--tbf-space-8)' }}>
          <Link href={path('/mag')} className="btn btn--secondary">
            {t.magazine.cta}
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
        {/* A caixa e o corpo do texto andam JUNTOS. A primeira linha da citação
            ("São Paulo é já a cidade que pede romancistas e poetas.") precisa
            caber inteira no desktop, sem quebra (pedido do fundador
            2026-07-31): são ~26em de texto, então a largura da caixa e o teto do
            corpo foram calibrados para essa linha sobreviver de 768px pra cima.
            Encolher a caixa ou subir o corpo aqui traz a quebra de volta. */}
        <div style={{ maxWidth: 'min(96vw, 1040px)', marginInline: 'auto', textAlign: 'center' }}>
          <blockquote
            className="manifesto-fragment"
            style={{
              fontFamily: 'var(--tbf-font-family-display)',
              fontSize: 'clamp(1.3rem, 3.3vw, 2.05rem)',
              fontWeight: 400,
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
              color: 'var(--tbf-text-primary)',
              marginBottom: 'var(--tbf-space-6)',
            }}
          >
            <span id="sp-quote-heading" style={{ display: 'none' }}>{t.saoPaulo.srHeading}</span>
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
              color: 'color-mix(in srgb, var(--tbf-color-parchment) 72%, transparent)',
              marginBottom: 'var(--tbf-space-8)',
            }}
          >
            {t.saoPaulo.gloss}
          </p>

          <cite
            style={{
              fontFamily: 'var(--tbf-font-family-ui)',
              fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
              letterSpacing: '0.1em',
              lineHeight: 1.5,
              color: 'var(--tbf-text-primary)',
              textTransform: 'uppercase',
              fontStyle: 'normal',
            }}
          >
            {t.saoPaulo.credit[0]}{' '}<br className="br-mobile-only" />{t.saoPaulo.credit[1]}{' '}<br className="br-mobile-only" />{t.saoPaulo.credit[2]}{' '}<br className="br-mobile-only" />{t.saoPaulo.credit[3]}
          </cite>
        </div>
      </section>

      {/* ─── CAROUSEL 02 — acima do manifesto ──────────────────────────────── */}
      <PhotoCarousel
        articles={carousel2Articles}
        fallbackLabel={t.magazine.cta}
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
              {t.manifesto.eyebrow}
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
              {t.manifesto.quote[0]}<br />{t.manifesto.quote[1]}<br />{t.manifesto.quote[2]}<br />{t.manifesto.quote[3]}
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
              {t.manifesto.line}
            </p>

            <Link
              href={path('/manifesto')}
              className="btn btn--primary"
            >
              {t.manifesto.cta}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
