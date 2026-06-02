// =============================================================================
// /collective — COLLECTIVE HOTEL CASINO
// Membros do coletivo + formulário de candidatura
// CTAs: Submit your presence · Read the Manifesto first
// =============================================================================

import type { Metadata } from 'next'
import Image from 'next/image'
import { sanityFetch, COLLECTIVE_FEATURED_QUERY, SITE_SETTINGS_QUERY, urlFor } from '@/lib/sanity'
import type { CollectiveMember, SiteSettings } from '@/types'
import { CollectiveForm } from './CollectiveForm'

export const metadata: Metadata = {
  title: 'Collective Hotel Casino',
  description:
    'Collective Hotel Casino — somente para artistas e agentes de mudança. Candidature-se ao coletivo da .THE BRAZILIAN FACTORY.',
  openGraph: {
    title: 'Collective Hotel Casino | .THE BRAZILIAN FACTORY.',
    description: 'Only for artists & changemakers.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

export const revalidate = 3600

export default async function CollectivePage() {
  let members: CollectiveMember[] = []
  let siteSettings: SiteSettings | null = null

  try {
    ;[members, siteSettings] = await Promise.all([
      sanityFetch<CollectiveMember[]>(COLLECTIVE_FEATURED_QUERY),
      sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY),
    ])
  } catch {
    // fallback
  }

  const collectiveOpen = siteSettings?.collectiveApplicationOpen ?? true

  return (
    <div
      style={{
        paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
      }}
    >
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <header
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBottom: 'var(--tbf-space-20)',
          marginBottom: 'var(--tbf-space-20)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
          }}
        >
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
            .TBF. inc
          </p>
          <h1
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'var(--tbf-type-display-xl-size-sm)',
              fontWeight: 'var(--tbf-type-display-xl-weight)',
              lineHeight: 'var(--tbf-type-display-xl-lh-sm)',
              letterSpacing: 'var(--tbf-type-display-xl-ls)',
              color: 'var(--tbf-text-primary)',
              marginBottom: 'var(--tbf-space-8)',
              textTransform: 'uppercase',
            }}
          >
            Collective<br />Hotel Casino.
          </h1>
          <p
            style={{
              fontFamily: 'var(--tbf-type-deck-family)',
              fontSize: 'var(--tbf-type-deck-size-sm)',
              fontWeight: 'var(--tbf-type-deck-weight)',
              lineHeight: 'var(--tbf-type-deck-lh)',
              color: 'var(--tbf-text-secondary)',
              maxWidth: '55ch',
            }}
          >
            Only for artists &amp; changemakers.
            Um coletivo de agentes criativos que operam com intenção.
            Acesso seletivo. Pertencimento real.
          </p>
        </div>
      </header>

      {/* ─── MEMBROS FEATURED ──────────────────────────────────────────── */}
      {members.length > 0 && (
        <section
          aria-labelledby="members-heading"
          style={{
            paddingInline: 'var(--tbf-grid-margin-sm)',
            paddingBottom: 'var(--tbf-space-20)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--tbf-grid-max-xl)',
              marginInline: 'auto',
            }}
          >
            <p
              id="members-heading"
              style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: 'var(--tbf-type-micro-size)',
                letterSpacing: 'var(--tbf-type-micro-ls)',
                color: 'var(--tbf-text-tertiary)',
                textTransform: 'uppercase',
                marginBottom: 'var(--tbf-space-8)',
              }}
            >
              O Coletivo
            </p>

            <div className="layout-c">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="reveal reveal--card"
                  style={{
                    paddingTop: 'var(--tbf-space-6)',
                  }}
                >
                  {member.portrait && (
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        overflow: 'hidden',
                        marginBottom: 'var(--tbf-space-4)',
                        backgroundColor: 'var(--tbf-bg-secondary)',
                      }}
                    >
                      <Image
                        src={urlFor(member.portrait).width(400).height(400).fit('crop').url()}
                        alt={member.name}
                        width={400}
                        height={400}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <p
                    style={{
                      fontFamily: 'var(--tbf-type-h4-family)',
                      fontSize: 'var(--tbf-type-h4-size-sm)',
                      fontWeight: 'var(--tbf-type-h4-weight)',
                      color: 'var(--tbf-text-primary)',
                      marginBottom: 'var(--tbf-space-1)',
                    }}
                  >
                    {member.name}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--tbf-type-caption-family)',
                      fontSize: 'var(--tbf-type-caption-size-sm)',
                      color: 'var(--tbf-text-tertiary)',
                    }}
                  >
                    {member.role}
                    {member.bu && ` · .${member.bu.toUpperCase()}.`}
                  </p>
                  {member.instagramHandle && (
                    <a
                      href={`https://instagram.com/${member.instagramHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="byline__link"
                      style={{
                        fontFamily: 'var(--tbf-type-micro-family)',
                        fontSize: 'var(--tbf-type-micro-size)',
                        letterSpacing: 'var(--tbf-type-micro-ls)',
                        display: 'inline-block',
                        marginTop: 'var(--tbf-space-2)',
                      }}
                    >
                      @{member.instagramHandle}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FORMULÁRIO DE CANDIDATURA ─────────────────────────────────── */}
      <section
        id="application"
        aria-labelledby="application-heading"
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBottom: 'var(--tbf-space-32)',
          paddingTop: 'var(--tbf-space-20)',
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
              <p
                id="application-heading"
                style={{
                  fontFamily: 'var(--tbf-type-micro-family)',
                  fontSize: 'var(--tbf-type-micro-size)',
                  letterSpacing: 'var(--tbf-type-micro-ls)',
                  color: 'var(--tbf-text-tertiary)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--tbf-space-6)',
                }}
              >
                Candidatura
              </p>

              {collectiveOpen ? (
                <CollectiveForm />
              ) : (
                <div
                  style={{ paddingBlock: 'var(--tbf-space-12)' }}
                  role="status"
                >
                  <p
                    style={{
                      fontFamily: 'var(--tbf-type-h3-family)',
                      fontSize: 'var(--tbf-type-h3-size-sm)',
                      fontWeight: 'var(--tbf-type-h3-weight)',
                      color: 'var(--tbf-text-primary)',
                      marginBottom: 'var(--tbf-space-4)',
                    }}
                  >
                    Candidaturas encerradas por ora.
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--tbf-type-body-family)',
                      fontSize: 'var(--tbf-type-body-size-sm)',
                      color: 'var(--tbf-text-secondary)',
                    }}
                  >
                    Retornamos quando faz sentido.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
