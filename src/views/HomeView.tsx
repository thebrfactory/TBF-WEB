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
import { MonogramDivider } from '@/components/MonogramDivider/MonogramDivider'
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
// 🔴 CONFERIDO NO INSTAGRAM EM 10/09/2026, e o resultado inverteu o diagnostico
// que a auditoria tinha feito. Havia dois links repetidos entre os carrosseis, e
// a suspeita era de copia e cola na SLIDE2. Abrindo os posts, o errado era o da
// SLIDE1:
//   . `DXaLo3CjgQm` e o post do PALCO NEON, que e a foto slide2/02. A slide1/02
//     e o GRUPO DE BONES, e agora aponta para `DPeM0mBDEPa`, o post certo dela.
//   . `DPpNWr7CXj0` (.BORN IN RUNWAY.) continua repetido de proposito: slide1/04
//     e slide2/04 sao a MESMA foto em recortes diferentes, entao o mesmo post nos
//     dois esta certo. Nao "consertar" isso: e duplicacao de FOTO, nao de link.
// Quem quiser mexer aqui de novo: abra o post antes, a foto decide.
const SLIDE1_ARTICLES: CarouselArticle[] = [
  { title: '.BRAZILIAN\nHIGH\nSUMMER.', href: 'https://www.instagram.com/p/DXKxoDVFdPs/' },
  { title: '.THE\nBRAZILIAN\nBACKSTAGE.', href: 'https://www.instagram.com/p/DPeM0mBDEPa/' },
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
    { title: '.BRAZILIAN\nCOUNTRY\nSIDE.', href: path('/zine/brazilian-country-side') }, // 06, matéria interna
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
  // Quando o Sanity nao devolve NENHUMA materia com capa, quem desenha a grade
  // e a lista LOCAL (as materias que vivem no repo). Isso esta escrito la
  // embaixo, no JSX, com esta mesma condicao.
  const usandoLocais = !featuredWithCover && postsWithCover.length === 0

  // Quantos cards a grade vai realmente desenhar. Quando e UM, a grade
  // multi-coluna precisa saber (ver `.editorial-grid--solo` em components.css):
  // sem isso, o card unico fica do tamanho de um terco da tela.
  //
  // 🔴 A CONTA OLHAVA SO O SANITY, e por isso mentia. Com o Sanity vazio ela
  // dava 1 (o `|| 1` do fallback), a grade entrava em `--solo`, e as TRES
  // materias locais empilhavam numa coluna de 66% de largura, com o resto da
  // tela vazio. Foi o que o fundador viu em 10/09/2026 e leu como "muito espaco
  // sobrando": nao era falta do layout Pinterest, era o Pinterest DESLIGADO por
  // uma contagem que nao contava quem estava na tela. A conta agora conta quem
  // e desenhado, que e a unica versao dela que nao volta a mentir.
  const homeCardCount = usandoLocais
    ? LOCAIS.length
    : (featuredWithCover ? 1 : 0) + postsWithCover.length

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
             Acima do trilho, o respiro é este paddingTop: nasce centrado entre
             o letreiro e o trilho, em vez de colado nele. Gestalt, pedido do
             fundador 2026-07-31 (a medida caiu à metade em 2026-07-31, mesma
             sessão). Mexeu neste respiro? Confira o de baixo também. */}
      <div style={{ background: '#000000', paddingTop: 'var(--tbf-home-carousel-gap)' }}>
        <PhotoCarousel articles={SLIDE1_ARTICLES} fallbackLabel={t.magazine.cta} />
      </div>

      {/* ─── GLIFO ENTRE CARROSSEL E MATÉRIAS ────────────────────────────────────
             Layout ficava sobrecarregado com o carrossel colado na grade
             (pedido do fundador 2026-09-16). O respiro do proprio glifo
             (paddingBlock) ja separa as duas secoes, igual acima e abaixo:
             sem classe extra de margem, que criava vao grande demais somado
             ao paddingTop da grade logo depois (pedido do fundador
             2026-09-16, correcao no mesmo dia). */}
      <MonogramDivider />

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
          {usandoLocais &&
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
          <Link href={path('/zine')} className="btn btn--secondary">
            {t.magazine.cta}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ─── MONOGRAM DIVIDER ─────────────────────────────────────────────────── */}
      <MonogramDivider />

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
