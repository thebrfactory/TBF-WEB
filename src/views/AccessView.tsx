// =============================================================================
// /access: ABRIR UM CANAL
// Cinco intenções no lugar da escolha por label · Intent param pré-seleciona
// CTAs: Send the transmission · Looking for the Collective
//
// Uma página, dois idiomas: o texto vem do dicionário e os links passam por
// localizedPath. Ver src/content/i18n/README.md.
// =============================================================================

import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import type { ContactIntent } from '@/types'
import { AccessForm } from '@/components/forms/AccessForm'
import { access } from '@/content/i18n/pages/access'
import { localizedPath, type Lang } from '@/lib/i18n'

export default async function AccessView({
  lang,
  searchParams,
}: {
  lang: Lang
  searchParams: Promise<{ intent?: string }>
}) {
  const t = access[lang]
  const { intent } = await searchParams

  // Valida intent. Links antigos por label (?intent=tgf) viram a intenção
  // equivalente. Sem valor válido, começa em build.
  const legacy: Record<string, ContactIntent> = {
    tbf: 'publish',
    melfiore: 'create',
    ruc: 'create',
    tgf: 'build',
  }
  const validIntents: ContactIntent[] = ['build', 'create', 'publish', 'collaborate']
  const defaultIntent: ContactIntent = validIntents.includes(intent as ContactIntent)
    ? (intent as ContactIntent)
    : (legacy[intent ?? ''] ?? 'build')

  return (
    <div
      style={{
        paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
      }}
    >
      {/* ─── PAGE TITLE ────────────────────────────────────────────────── */}
      <header
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          marginBottom: 'var(--tbf-space-20)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'var(--tbf-type-display-xl-size-sm)',
              fontWeight: 'var(--tbf-type-display-xl-weight)',
              lineHeight: 'var(--tbf-type-display-xl-lh-sm)',
              letterSpacing: 'var(--tbf-type-display-xl-ls)',
              color: 'var(--tbf-text-primary)',
              marginBottom: 'var(--tbf-space-6)',
              textTransform: 'uppercase',
            }}
          >
            {t.hero.title}
          </h1>
          <p
            style={{
              fontFamily: 'var(--tbf-type-deck-family)',
              fontSize: 'var(--tbf-type-deck-size-sm)',
              fontWeight: 'var(--tbf-type-deck-weight)',
              lineHeight: 'var(--tbf-type-deck-lh)',
              color: 'var(--tbf-text-secondary)',
              maxWidth: '50ch',
            }}
          >
            {t.hero.deck}
          </p>
          <p
            style={{
              fontFamily: 'var(--tbf-type-body-family)',
              fontSize: 'var(--tbf-type-body-size-sm)',
              lineHeight: 'var(--tbf-type-body-lh)',
              color: 'var(--tbf-text-tertiary)',
              marginTop: 'var(--tbf-space-4)',
            }}
          >
            {t.hero.list}
          </p>
        </div>
      </header>

      {/* ─── FORMULÁRIO (client component) ────────────────────────────── */}
      <section
        aria-labelledby="access-form-heading"
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBottom: 'var(--tbf-space-32)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--tbf-grid-max-xl)',
            marginInline: 'auto',
          }}
        >
          <AccessForm
            entryPoints={t.entryPoints}
            defaultIntent={defaultIntent}
          />
          <p
            style={{
              fontFamily: 'var(--tbf-type-body-family)',
              fontSize: 'var(--tbf-type-body-size-sm)',
              lineHeight: 'var(--tbf-type-body-lh)',
              color: 'var(--tbf-text-tertiary)',
              marginTop: 'var(--tbf-space-12)',
            }}
          >
            {t.destinations.lead}{' '}
            {t.destinations.items.map((d, i) => (
              <span key={d.tag}>
                {i > 0 && ' · '}
                <Link href={localizedPath(d.href, lang)} style={{ color: 'var(--tbf-text-secondary)', fontWeight: 800 }}>
                  {d.tag}
                </Link>
              </span>
            ))}
          </p>

          <p
            style={{
              fontFamily: 'var(--tbf-type-display-lg-family)',
              fontSize: 'var(--tbf-type-display-lg-size-sm)',
              fontWeight: 'var(--tbf-font-weight-raw-800)',
              lineHeight: 'var(--tbf-type-display-lg-lh-sm)',
              letterSpacing: 'var(--tbf-type-display-lg-ls)',
              color: 'var(--tbf-text-primary)',
              marginTop: 'var(--tbf-space-20)',
            }}
          >
            {t.closing}
          </p>
        </div>
      </section>
    </div>
  )
}
