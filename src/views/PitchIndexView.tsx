// =============================================================================
// /pitch: ÍNDICE de todos os decks de pitch
//
// Antes /pitch ERA o deck 1.0 (agora em /pitch/v1). O fundador quis uma página
// que classifica todos os pitches, inclusive os endereçados a uma empresa
// específica (pedido 2026-09-09). Lista vertical, tipografia grande, fundo
// escuro, nada além do título e dos links na tela.
//
// PARA ACRESCENTAR UM PITCH NOVO: uma linha em GENERAL_PITCHES (deck geral) ou
// em COMPANY_PITCHES (deck endereçado a uma empresa). O `label` não passa por
// tradução de propósito: é numeração e nome próprio, idêntico nos dois
// idiomas, igual ao resto do dicionário de marca.
// =============================================================================

import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { pitch } from '@/content/i18n/pages/pitch'
import { localizedPath, type Lang } from '@/lib/i18n'

type PitchEntry = { label: string; href: string }

const GENERAL_PITCHES: PitchEntry[] = [
  { label: 'Pitch 1.0', href: '/pitch/v1' },
  { label: 'Pitch 2.0', href: '/pitch/v2' },
  { label: 'Pitch 3.0', href: '/pitch/v3' },
]

const COMPANY_PITCHES: PitchEntry[] = [
  { label: 'Overlens', href: '/pitch/v3/overlens' },
]

function PitchIndexList({ items, path }: { items: PitchEntry[]; path: (p: string) => string }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((item) => (
        <li key={item.href} style={{ marginBottom: 'var(--tbf-space-6)' }}>
          <Link
            href={path(item.href)}
            className="pitch-index__item"
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: 'var(--tbf-space-3)',
              fontFamily: 'var(--tbf-font-family-display)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 8vw, 4.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            {item.label}
            <span aria-hidden="true" style={{ fontSize: '0.6em', opacity: 0.6 }}>
              ↗
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function PitchIndexView({ lang }: { lang: Lang }) {
  const t = pitch[lang].index
  const path = (p: string) => localizedPath(p, lang)

  return (
    <div
      style={{
        background: '#000000',
        minHeight: '100dvh',
        paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-24))',
        paddingBottom: 'var(--tbf-space-24)',
        paddingInline: 'var(--tbf-grid-margin-sm)',
      }}
    >
      <div style={{ maxWidth: 'var(--tbf-grid-max-xl)', marginInline: 'auto' }}>
        <h1
          style={{
            fontFamily: 'var(--tbf-font-family-display)',
            fontWeight: 900,
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            opacity: 0.4,
            margin: 0,
            marginBottom: 'var(--tbf-space-20)',
          }}
        >
          {t.title}
        </h1>

        <PitchIndexList items={GENERAL_PITCHES} path={path} />

        <p
          style={{
            fontFamily: 'var(--tbf-font-family-body)',
            fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            opacity: 0.4,
            marginTop: 'var(--tbf-space-24)',
            marginBottom: 'var(--tbf-space-8)',
          }}
        >
          {t.sectionCompany}
        </p>

        <PitchIndexList items={COMPANY_PITCHES} path={path} />
      </div>
    </div>
  )
}
