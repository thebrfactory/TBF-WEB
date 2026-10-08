// =============================================================================
// /manifesto: O MANIFESTO FUNDADOR
// Corpo no dicionário · Coluna de leitura · Reveal via CSS animation-timeline
// CTAs APENAS após texto completo (regra sagrada)
// Zero sidebar · Zero distração
// =============================================================================

import type { CSSProperties } from 'react'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { manifesto } from '@/content/i18n/pages/manifesto'
import { localizedPath, type Lang } from '@/lib/i18n'

// ─── Estrofes: ritmo denso, uma voz por tom ───────────────────────────────────

const BODY: CSSProperties = {
  fontFamily: 'var(--tbf-type-body-family)',
  fontSize: 'var(--tbf-type-body-size-sm)',
  lineHeight: 'var(--tbf-type-body-lh)',
  color: 'var(--tbf-text-secondary)',
  marginBottom: 'var(--tbf-space-8)',
}

const H2: CSSProperties = {
  fontFamily: 'var(--tbf-type-h2-family)',
  fontSize: 'var(--tbf-type-h2-size-sm)',
  fontWeight: 'var(--tbf-type-h2-weight)',
  lineHeight: 'var(--tbf-type-h2-lh)',
  letterSpacing: 'var(--tbf-type-h2-ls)',
  color: 'var(--tbf-text-primary)',
}

const STANZA_STYLE: Record<'mark' | 'lead' | 'hit' | 'beat' | 'body' | 'sign', CSSProperties> = {
  mark: {
    fontFamily: 'var(--tbf-type-tag-family)',
    fontSize: 'var(--tbf-type-tag-size)',
    letterSpacing: 'var(--tbf-type-tag-ls)',
    color: 'var(--tbf-text-tertiary)',
    fontWeight: 'var(--tbf-font-weight-raw-800)',
    marginBottom: 'var(--tbf-space-6)',
  },
  lead: {
    fontFamily: 'var(--tbf-type-display-lg-family)',
    fontSize: 'var(--tbf-type-display-lg-size-sm)',
    fontWeight: 'var(--tbf-font-weight-raw-800)',
    lineHeight: 'var(--tbf-type-display-lg-lh-sm)',
    letterSpacing: 'var(--tbf-type-display-lg-ls)',
    color: 'var(--tbf-text-primary)',
    marginBottom: 'var(--tbf-space-12)',
  },
  hit: { ...H2, marginTop: 'var(--tbf-space-8)', marginBottom: 'var(--tbf-space-8)' },
  beat: { ...H2, color: 'var(--tbf-accent)', marginBottom: 'var(--tbf-space-8)' },
  body: BODY,
  sign: {
    fontFamily: 'var(--tbf-type-tag-family)',
    fontSize: 'var(--tbf-type-tag-size)',
    letterSpacing: 'var(--tbf-type-tag-ls)',
    color: 'var(--tbf-text-tertiary)',
    textTransform: 'uppercase',
    marginTop: 'var(--tbf-space-12)',
    marginBottom: 'var(--tbf-space-12)',
  },
}

export default function ManifestoView({ lang }: { lang: Lang }) {
  const t = manifesto[lang]
  const path = (u: string) => localizedPath(u, lang)

  return (
    <div
      style={{
        paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
      }}
    >
      {/* ─── TÍTULO ────────────────────────────────────────────────────── */}
      <header
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          marginBottom: 'var(--tbf-space-12)',
        }}
      >
        <div
          style={{
            maxWidth: 'min(var(--tbf-grid-max-xl), 42.5rem)',
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
              marginBottom: 'var(--tbf-space-6)',
            }}
          >
            {t.kicker}
          </p>
          <h1
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'var(--tbf-type-display-xl-size-sm)',
              fontWeight: 'var(--tbf-type-display-xl-weight)',
              lineHeight: 'var(--tbf-type-display-xl-lh-sm)',
              letterSpacing: 'var(--tbf-type-display-xl-ls)',
              color: 'var(--tbf-text-primary)',
            }}
          >
            {t.heading}
          </h1>
        </div>
      </header>

      {/* ─── CORPO: estrofes do dicionário, coluna de leitura ─────────── */}
      <section
        aria-label={t.bodyLabel}
        style={{ paddingInline: 'var(--tbf-grid-margin-sm)' }}
      >
        <div style={{ maxWidth: 'min(var(--tbf-grid-max-xl), 42.5rem)', marginInline: 'auto' }}>
          {t.body.map((stanza, i) => (
            <p
              key={i}
              className="manifesto-fragment"
              lang={lang === 'pt' ? 'pt-BR' : 'en'}
              style={STANZA_STYLE[stanza.tone]}
            >
              {stanza.lines.map((line, j) => (
                <span key={j} style={{ display: 'block' }}>
                  {line}
                </span>
              ))}
            </p>
          ))}
        </div>
      </section>

      {/* ─── CTAs : SÓ APÓS TEXTO COMPLETO (regra sagrada) ─────────────── */}
      <section
        aria-label={t.nextStepsLabel}
        style={{
          paddingInline: 'var(--tbf-grid-margin-sm)',
          paddingBlock: 'var(--tbf-space-20)',
          }}
      >
        <div
          style={{
            maxWidth: 'min(var(--tbf-grid-max-xl), 42.5rem)',
            marginInline: 'auto',
            display: 'flex',
            gap: 'var(--tbf-space-4)',
            flexWrap: 'wrap',
          }}
        >
          {/* CTA 1 primário: Entrar no Zine */}
          <Link href={path('/zine')} className="btn btn--primary">
            {t.ctaEditorial}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>

          {/* CTA 2: Open a channel */}
          <Link href={path('/access')} className="btn btn--ghost">
            {t.ctaAccess}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
