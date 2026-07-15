// =============================================================================
// /editorial/[slug] — ARTIGO INDIVIDUAL
// Hero full-bleed + corpo editorial + sidebar sticky + créditos + relacionados
// CTAs: Also from the ecosystem · Enter the Collective · Access the system
// =============================================================================

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch, ARTICLE_QUERY, ARTICLE_SLUGS_QUERY, SITE_SETTINGS_QUERY, urlFor } from '@/lib/sanity'
import type { EditorialPost, SiteSettings } from '@/types'
import { ArticleCard } from '@/components/ArticleCard/ArticleCard'

// ─── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>(ARTICLE_SLUGS_QUERY)
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await sanityFetch<EditorialPost>(ARTICLE_QUERY, { slug })
    if (!post) return {}

    const ogImageUrl = post.ogImage
      ? urlFor(post.ogImage).width(1200).height(630).url()
      : post.heroImage
      ? urlFor(post.heroImage).width(1200).height(630).url()
      : '/og-default.jpg'

    return {
      title: post.title,
      description: post.metaDescription ?? post.deck,
      openGraph: {
        title: post.title,
        description: post.metaDescription ?? post.deck,
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
        type: 'article',
        publishedTime: post.publishedAt,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.metaDescription ?? post.deck,
        images: [ogImageUrl],
      },
    }
  } catch {
    return {}
  }
}

// ─── Helper: formatar data ─────────────────────────────────────────────────────

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

// ─── Helper: renderizar Portable Text simples ──────────────────────────────────

function renderPortableText(body: EditorialPost['body']) {
  if (!body || !Array.isArray(body)) return null

  return body.map((block) => {
    if (block._type !== 'block') return null

    const text = block.children.map((child) => {
      if (child.marks?.includes('strong')) {
        return <strong key={child._key}>{child.text}</strong>
      }
      if (child.marks?.includes('em')) {
        return <em key={child._key}>{child.text}</em>
      }
      return child.text
    })

    switch (block.style) {
      case 'h2':
        return (
          <h2
            key={block._key}
            style={{
              fontFamily: 'var(--tbf-type-h2-family)',
              fontSize: 'var(--tbf-type-h2-size-sm)',
              fontWeight: 'var(--tbf-type-h2-weight)',
              lineHeight: 'var(--tbf-type-h2-lh)',
              letterSpacing: 'var(--tbf-type-h2-ls)',
              color: 'var(--tbf-text-primary)',
              marginTop: 'var(--tbf-space-12)',
              marginBottom: 'var(--tbf-type-h2-mb)',
            }}
          >
            {text}
          </h2>
        )
      case 'h3':
        return (
          <h3
            key={block._key}
            style={{
              fontFamily: 'var(--tbf-type-h3-family)',
              fontSize: 'var(--tbf-type-h3-size-sm)',
              fontWeight: 'var(--tbf-type-h3-weight)',
              lineHeight: 'var(--tbf-type-h3-lh)',
              letterSpacing: 'var(--tbf-type-h3-ls)',
              color: 'var(--tbf-text-primary)',
              marginTop: 'var(--tbf-space-8)',
              marginBottom: 'var(--tbf-type-h3-mb)',
            }}
          >
            {text}
          </h3>
        )
      case 'blockquote':
        return (
          <blockquote
            key={block._key}
            style={{
              paddingLeft: 'var(--tbf-space-6)',
              marginBlock: 'var(--tbf-space-8)',
              fontStyle: 'italic',
              color: 'var(--tbf-text-secondary)',
            }}
          >
            {text}
          </blockquote>
        )
      default:
        return (
          <p
            key={block._key}
            style={{ marginBottom: 'var(--tbf-type-body-mb)' }}
          >
            {text}
          </p>
        )
    }
  })
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export const revalidate = 3600

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let post: EditorialPost | null = null
  let siteSettings: SiteSettings | null = null

  try {
    ;[post, siteSettings] = await Promise.all([
      sanityFetch<EditorialPost>(ARTICLE_QUERY, { slug }),
      sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY),
    ])
  } catch {
    // fallback
  }

  // Mock articles para preview sem Sanity
  if (!post) {
    const MOCKS: Record<string, { title: string; deck: string; category: string; img: string; date: string }> = {
      'lorem-ipsum-1': { title: 'What about the Brazilian fashion culture?', deck: 'São Paulo has always been a city that creates, but rarely gets credit. We change that.', category: 'Editorial', img: '/images/slide1/01.webp', date: '2026-06-01' },
      'lorem-ipsum-2': { title: 'AFTERPARTY: the feeling behind Brazilian parties', deck: 'After the lights go down and the crowd disperses, something lingers. We went looking for it.', category: 'Coolhunting', img: '/images/slide1/03.webp', date: '2026-05-28' },
      'lorem-ipsum-3': { title: 'ACT I: feeling a Brazilian runway backstage', deck: 'Before the first model steps out, a whole universe breathes in the wings. We were there.', category: 'Fashion Film', img: '/images/slide1/05.webp', date: '2026-05-20' },
      'lorem-ipsum-4': { title: 'São Paulo as fashion capital: the city that prints its own rules', deck: 'Paris sets the trends. Milan refines them. London breaks them. São Paulo ignores them and starts over.', category: 'Editorial', img: '/images/slide1/07.webp', date: '2026-05-15' },
      'lorem-ipsum-5': { title: 'When Brazilian music and fashion collide', deck: 'Funk, baile, axé. Brazilian music has always dressed itself in something unmistakable. Here\'s where it meets the runway.', category: 'Colaboração', img: '/images/slide1/09.webp', date: '2026-05-08' },
      'lorem-ipsum-6': { title: 'We are not a trend: why .TBF. refuses to follow', deck: 'Trends are questions. .TBF. is the answer they didn\'t see coming.', category: 'Manifesto', img: '/images/slide1/02.webp', date: '2026-05-01' },
    }
    const mock = MOCKS[slug as string]
    if (!mock) notFound()
    const BODY = 'There is a city in South America that has been manufacturing culture for decades without receiving proper credit from the global fashion machine. São Paulo is not trying to be Paris. It never was. It is trying to be itself, which is harder, bolder, and far more interesting. .THE BRAZILIAN FACTORY. exists to document what that looks like. We are not journalists, although we write. We are not designers, although we create. We are custodians of a cultural output that has long been undervalued and under-seen. The Brazilian creative industry does not lack talent. It lacks infrastructure, visibility, and the institutional confidence to say: this is ours. We are building that, one editorial, one film, one collaboration at a time. We don\'t copy Paris. We print over it. São Paulo is the origin point of a new creative axis, one that runs from the periphery to the runway, from the baile to the boutique, from the favela to the festival. .TBF. is not a brand that follows culture. It is the factory where culture is made.'
    return (
      <article>
        <header style={{ paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-16))', paddingBottom: 'var(--tbf-space-12)', paddingInline: 'var(--tbf-grid-margin-sm)' }}>
          <div style={{ maxWidth: 'var(--tbf-grid-max-xl)', marginInline: 'auto' }}>
            <div style={{ display: 'flex', gap: 'var(--tbf-space-4)', alignItems: 'center', marginBottom: 'var(--tbf-space-6)', flexWrap: 'wrap' }}>
              <span className="tag tag--category">{mock.category}</span>
              <time dateTime={mock.date} style={{ fontFamily: 'var(--tbf-type-micro-family)', fontSize: 'var(--tbf-type-micro-size)', letterSpacing: 'var(--tbf-type-micro-ls)', color: 'var(--tbf-text-tertiary)', textTransform: 'uppercase', marginLeft: 'auto' }}>
                {new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(mock.date))}
              </time>
            </div>
            <h1 style={{ fontFamily: 'var(--tbf-type-h1-family)', fontSize: 'var(--tbf-type-h1-size-sm)', fontWeight: 'var(--tbf-type-h1-weight)', lineHeight: 'var(--tbf-type-h1-lh)', letterSpacing: 'var(--tbf-type-h1-ls)', color: 'var(--tbf-text-primary)', marginBottom: 'var(--tbf-space-6)' }}>
              {mock.title}
            </h1>
            <p style={{ fontFamily: 'var(--tbf-type-deck-family)', fontSize: 'var(--tbf-type-deck-size-sm)', fontWeight: 'var(--tbf-type-deck-weight)', lineHeight: 'var(--tbf-type-deck-lh)', color: 'var(--tbf-text-secondary)', maxWidth: '60ch' }}>
              {mock.deck}
            </p>
          </div>
        </header>
        <div style={{ position: 'relative', aspectRatio: '32/9', marginBottom: 'var(--tbf-space-16)', background: '#060d18' }}>
          <p style={{ position: 'absolute', top: 'var(--tbf-space-3)', left: 'var(--tbf-space-4)', fontFamily: 'var(--tbf-font-family-ui)', fontSize: '0.55rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
            ADD-PREVIEW-MATERIAL
          </p>
        </div>
        <div style={{ paddingInline: 'var(--tbf-grid-margin-sm)', paddingBottom: 'var(--tbf-space-20)' }}>
          <div style={{ maxWidth: 'var(--tbf-grid-max-xl)', marginInline: 'auto' }}>
            <div className="article-body" style={{ maxWidth: 'var(--tbf-type-body-max-width)' }}>
              {BODY.split('. ').map((s, i, arr) => (
                <p key={i} style={{ marginBottom: 'var(--tbf-type-body-mb)' }}>{s}{i < arr.length - 1 ? '.' : ''}</p>
              ))}
            </div>
          </div>
        </div>
        <div style={{ paddingInline: 'var(--tbf-grid-margin-sm)', paddingBlock: 'var(--tbf-space-12)', display: 'flex', gap: 'var(--tbf-space-4)' }}>
          <a href="/editorial" className="btn btn--secondary">← Back to Magazine</a>
        </div>
      </article>
    )
  }

  const collectiveOpen = siteSettings?.collectiveApplicationOpen ?? false

  const heroImageUrl = post.heroImage
    ? urlFor(post.heroImage).width(1920).height(1080).fit('crop').auto('format').url()
    : null

  const CATEGORY_LABELS: Record<string, string> = {
    'fashion-film': 'Fashion Film',
    editorial: 'Editorial',
    manifesto: 'Manifesto',
    coolhunting: 'Coolhunting',
    collaboration: 'Colaboração',
  }

  return (
    <article>
      {/* ─── ARTICLE HEADER ─────────────────────────────────────────────── */}
      <header
        style={{
          paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-16))',
          paddingBottom: 'var(--tbf-space-12)',
          paddingInline: 'var(--tbf-grid-margin-sm)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
          }}
        >
          <div className="layout-d">
            <div>
              {/* Meta — categoria + data */}
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--tbf-space-4)',
                  alignItems: 'center',
                  marginBottom: 'var(--tbf-space-6)',
                  flexWrap: 'wrap',
                }}
              >
                <span className="tag tag--category">
                  {CATEGORY_LABELS[post.category] ?? post.category}
                </span>
                {post.tags?.slice(0, 2).map((tag) => (
                  <span key={tag._id} className="tag tag--bu">
                    {tag.label}
                  </span>
                ))}
                <time
                  dateTime={post.publishedAt}
                  style={{
                    fontFamily: 'var(--tbf-type-micro-family)',
                    fontSize: 'var(--tbf-type-micro-size)',
                    letterSpacing: 'var(--tbf-type-micro-ls)',
                    color: 'var(--tbf-text-tertiary)',
                    textTransform: 'uppercase',
                    marginLeft: 'auto',
                  }}
                >
                  {formatDate(post.publishedAt)}
                </time>
              </div>

              {/* Título */}
              <h1
                style={{
                  fontFamily: 'var(--tbf-type-h1-family)',
                  fontSize: 'var(--tbf-type-h1-size-sm)',
                  fontWeight: 'var(--tbf-type-h1-weight)',
                  lineHeight: 'var(--tbf-type-h1-lh)',
                  letterSpacing: 'var(--tbf-type-h1-ls)',
                  color: 'var(--tbf-text-primary)',
                  marginBottom: 'var(--tbf-space-6)',
                }}
              >
                {post.title}
              </h1>

              {/* Deck */}
              {post.deck && (
                <p
                  style={{
                    fontFamily: 'var(--tbf-type-deck-family)',
                    fontSize: 'var(--tbf-type-deck-size-sm)',
                    fontWeight: 'var(--tbf-type-deck-weight)',
                    lineHeight: 'var(--tbf-type-deck-lh)',
                    color: 'var(--tbf-text-secondary)',
                    maxWidth: '60ch',
                    marginBottom: 'var(--tbf-space-8)',
                  }}
                >
                  {post.deck}
                </p>
              )}

              {/* Byline */}
              {post.author && (
                <div className="byline">
                  {post.author.portrait && (
                    <Image
                      className="byline__portrait"
                      src={urlFor(post.author.portrait).width(80).height(80).fit('crop').url()}
                      alt={post.author.name}
                      width={40}
                      height={40}
                    />
                  )}
                  <span className="byline__text">
                    Por{' '}
                    <span className="byline__link">{post.author.name}</span>
                    {post.author.instagramHandle && (
                      <>
                        {' · '}
                        <a
                          href={`https://instagram.com/${post.author.instagramHandle}`}
                          className="byline__link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          @{post.author.instagramHandle}
                        </a>
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── HERO IMAGE FULL-BLEED ──────────────────────────────────────── */}
      <div
        className="layout-e"
        style={{
          marginLeft: 'calc(-1 * var(--tbf-grid-margin-sm))',
          marginBottom: 'var(--tbf-space-16)',
          position: 'relative',
          aspectRatio: '32 / 9',
          background: '#060d18',
        }}
      >
        <p
          style={{
            position: 'absolute',
            top: 'var(--tbf-space-3)',
            left: 'var(--tbf-space-4)',
            fontFamily: 'var(--tbf-font-family-ui)',
            fontSize: '0.55rem',
            letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase',
          }}
        >
          ADD-PREVIEW-MATERIAL
        </p>
      </div>

      {/* ─── CORPO + SIDEBAR ────────────────────────────────────────────── */}
      <div
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBottom: 'var(--tbf-space-20)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--tbf-space-12)',
          }}
        >
          {/* Corpo */}
          <div
            className="article-body"
            style={{ maxWidth: 'var(--tbf-type-body-max-width)' }}
          >
            {renderPortableText(post.body)}
          </div>

          {/* Sidebar — só desktop via CSS grid override */}
          {(post.author || (post.tags && post.tags.length > 0) || (post.relatedPosts && post.relatedPosts.length > 0)) && (
            <aside
              aria-label="Informações do artigo"
              style={{
                paddingTop: 'var(--tbf-space-8)',
              }}
            >
              {/* Autor */}
              {post.author && (
                <div style={{ marginBottom: 'var(--tbf-space-8)' }}>
                  <p
                    style={{
                      fontFamily: 'var(--tbf-type-micro-family)',
                      fontSize: 'var(--tbf-type-micro-size)',
                      letterSpacing: 'var(--tbf-type-micro-ls)',
                      color: 'var(--tbf-text-tertiary)',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--tbf-space-4)',
                    }}
                  >
                    Autor
                  </p>
                  <div className="byline">
                    {post.author.portrait && (
                      <Image
                        className="byline__portrait"
                        src={urlFor(post.author.portrait).width(80).height(80).fit('crop').url()}
                        alt={post.author.name}
                        width={40}
                        height={40}
                      />
                    )}
                    <span className="byline__text">
                      {post.author.name}
                      {post.author.instagramHandle && (
                        <>
                          <br />
                          <a
                            href={`https://instagram.com/${post.author.instagramHandle}`}
                            className="byline__link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            @{post.author.instagramHandle}
                          </a>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div style={{ marginBottom: 'var(--tbf-space-8)' }}>
                  <p
                    style={{
                      fontFamily: 'var(--tbf-type-micro-family)',
                      fontSize: 'var(--tbf-type-micro-size)',
                      letterSpacing: 'var(--tbf-type-micro-ls)',
                      color: 'var(--tbf-text-tertiary)',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--tbf-space-3)',
                    }}
                  >
                    Tags
                  </p>
                  <div className="tag-group">
                    {post.tags.map((tag) => (
                      <span key={tag._id} className="tag">
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>

      {/* ─── CRÉDITOS ───────────────────────────────────────────────────── */}
      {post.credits && post.credits.length > 0 && (
        <section
          aria-labelledby="creditos-heading"
          style={{
            paddingInline: 'var(--tbf-grid-margin-sm)',
            paddingBlock: 'var(--tbf-space-12)',
            }}
        >
          <div
            style={{
              maxWidth: 'var(--tbf-grid-max-xl)',
              marginInline: 'auto',
            }}
          >
            <p
              id="creditos-heading"
              style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: 'var(--tbf-type-micro-size)',
                letterSpacing: 'var(--tbf-type-micro-ls)',
                color: 'var(--tbf-text-tertiary)',
                textTransform: 'uppercase',
                marginBottom: 'var(--tbf-space-6)',
              }}
            >
              Créditos
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 'var(--tbf-space-6)',
              }}
            >
              {post.credits.map((credit) => (
                <div key={credit._key}>
                  <p
                    style={{
                      fontFamily: 'var(--tbf-type-micro-family)',
                      fontSize: 'var(--tbf-type-micro-size)',
                      letterSpacing: 'var(--tbf-type-micro-ls)',
                      color: 'var(--tbf-text-tertiary)',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--tbf-space-1)',
                    }}
                  >
                    {credit.role}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--tbf-type-body-family)',
                      fontSize: 'var(--tbf-type-body-sm-size-sm)',
                      color: 'var(--tbf-text-primary)',
                    }}
                  >
                    {credit.name}
                    {credit.handle && (
                      <span
                        style={{
                          color: 'var(--tbf-text-tertiary)',
                          marginLeft: 'var(--tbf-space-2)',
                        }}
                      >
                        @{credit.handle}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── ARTIGOS RELACIONADOS — CTA primário ────────────────────────── */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section
          aria-labelledby="related-heading"
          style={{
            paddingInline: 'var(--tbf-grid-margin-sm)',
            paddingBlock: 'var(--tbf-space-16)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--tbf-grid-max-xl)',
              marginInline: 'auto',
            }}
          >
            <p
              id="related-heading"
              style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: 'var(--tbf-type-micro-size)',
                letterSpacing: 'var(--tbf-type-micro-ls)',
                color: 'var(--tbf-text-tertiary)',
                textTransform: 'uppercase',
                marginBottom: 'var(--tbf-space-8)',
              }}
            >
              Also from the ecosystem .TBF.
            </p>
            <div className="layout-c">
              {post.relatedPosts.map((related) => (
                <ArticleCard key={related._id} post={related} variant="standard" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTAs FINAIS ────────────────────────────────────────────────── */}
      <div
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBlock: 'var(--tbf-space-12)',
          display: 'flex',
          gap: 'var(--tbf-space-4)',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
            width: '100%',
            display: 'flex',
            gap: 'var(--tbf-space-4)',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {/* CTA 2: Enter the Collective (condicional) */}
          {collectiveOpen && (
            <Link href="/collective" className="btn btn--secondary">
              Enter the Collective
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          )}

          {/* CTA 3: Access the system (discreto) */}
          <Link
            href="/access"
            style={{
              fontFamily: 'var(--tbf-type-tag-family)',
              fontSize: 'var(--tbf-type-tag-size)',
              letterSpacing: 'var(--tbf-type-tag-ls)',
              color: 'var(--tbf-text-tertiary)',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color var(--tbf-motion-duration-micro) var(--tbf-motion-easing-micro)',
            }}
          >
            Access the system →
          </Link>
        </div>
      </div>
    </article>
  )
}
