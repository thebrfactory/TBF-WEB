// =============================================================================
// /access — PONTO DE ENTRADA AO SISTEMA
// Intent param pré-seleciona BU · Formulário segmentado
// CTAs: Initiate contact · Enter the Collective instead
//
// Uma página, dois idiomas: o texto vem do dicionário e os links passam por
// localizedPath. Ver src/content/i18n/README.md.
// =============================================================================

import type { ContactIntent } from '@/types'
import { AccessForm } from '@/components/forms/AccessForm'
import { access } from '@/content/i18n/pages/access'
import type { Lang } from '@/lib/i18n'

export default async function AccessView({
  lang,
  searchParams,
}: {
  lang: Lang
  searchParams: Promise<{ intent?: string }>
}) {
  const t = access[lang]
  const { intent } = await searchParams

  // Valida intent — fallback para 'tbf' se inválido
  const validIntents: ContactIntent[] = ['tbf', 'melfiore', 'ruc', 'tgf']
  const defaultIntent: ContactIntent = validIntents.includes(intent as ContactIntent)
    ? (intent as ContactIntent)
    : 'tbf'

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
        </div>
      </section>
    </div>
  )
}
