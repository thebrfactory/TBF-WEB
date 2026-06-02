// =============================================================================
// /access — PONTO DE ENTRADA AO SISTEMA
// Intent param pré-seleciona BU · Formulário segmentado
// CTAs: Initiate contact · Enter the Collective instead
// =============================================================================

import type { Metadata } from 'next'
import type { ContactIntent } from '@/types'
import { AccessForm } from './AccessForm'

export const metadata: Metadata = {
  title: 'Access',
  description:
    'Abra um canal com a .THE BRAZILIAN FACTORY. Editorial, Melfiore, Runway ou The Growth Factory.',
  openGraph: {
    title: 'Access | .THE BRAZILIAN FACTORY.',
    description: 'Abra um canal com a .THE BRAZILIAN FACTORY.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  robots: {
    index: false,
    follow: false,
  },
}

const ENTRY_POINTS: {
  value: ContactIntent
  tag: string
  name: string
  desc: string
}[] = [
  {
    value: 'tbf',
    tag: '.TBF.',
    name: 'Editorial & Colaboração',
    desc: 'Proposta editorial, colaboração criativa, parceria de conteúdo.',
  },
  {
    value: 'melfiore',
    tag: '.MELFIORE.',
    name: 'The Fiore Daily',
    desc: 'Intimacy, wellness, curadoria de rituais e colaborações Mel Fiore.',
  },
  {
    value: 'ruc',
    tag: '.RUC.',
    name: 'Runway United Collective',
    desc: 'Fashion films, editorial de moda, colaboração SPFW e backstage.',
  },
  {
    value: 'tgf',
    tag: '.TGF.',
    name: 'The Growth Factory',
    desc: 'Aceleração de negócios, consultoria estratégica, programas de crescimento.',
  },
]

export default async function AccessPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>
}) {
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
            Open a channel.
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
            Selecione o ponto de entrada. Depois escreva.
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
            entryPoints={ENTRY_POINTS}
            defaultIntent={defaultIntent}
          />
        </div>
      </section>
    </div>
  )
}
