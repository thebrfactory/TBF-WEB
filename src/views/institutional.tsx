// =============================================================================
// Peças das páginas institucionais (About, Quick Facts, Careers, Brand Tech).
// Linguagem editorial do ArticleView: coluna de leitura central, título forte,
// blocos curtos, cartões de cantos arredondados, sem dividers. Mobile-first:
// tudo parte do celular e escala por clamp() e minmax().
// =============================================================================

import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'

const READ = '44rem'
const WIDE = 'var(--tbf-grid-max-xl)'

export const MICRO: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: 'var(--tbf-type-micro-size)',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.45)',
}

export const BODY: CSSProperties = {
  fontFamily: 'var(--tbf-type-body-family)',
  fontSize: 'var(--tbf-type-body-size-sm)',
  lineHeight: 'var(--tbf-type-body-lh)' as CSSProperties['lineHeight'],
  color: 'rgba(255,255,255,0.72)',
  margin: 0,
}

const H2: CSSProperties = {
  fontFamily: 'var(--tbf-type-h2-family)',
  fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: 'var(--tbf-type-h2-ls)',
  color: '#fff',
  margin: 0,
}

const CARD: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: 'var(--tbf-radius-card)',
  padding: 'var(--tbf-space-6)',
}

const CARD_TITLE: CSSProperties = {
  fontFamily: 'var(--tbf-type-h2-family)',
  fontSize: 'clamp(1.0625rem, 2.4vw, 1.25rem)',
  fontWeight: 800,
  lineHeight: 1.2,
  color: '#fff',
  margin: 0,
}

export const PILL: CSSProperties = {
  display: 'inline-block',
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: 'var(--tbf-type-micro-size)',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#fff',
  background: 'rgba(255,255,255,0.1)',
  borderRadius: 'var(--tbf-radius-full)',
  padding: '6px 12px',
}

export function Page({ children }: { children: ReactNode }) {
  return <div style={{ background: '#000', color: '#fff', minHeight: '100dvh' }}>{children}</div>
}

export function Hero({ tag, title, deck, children }: { tag: string; title: string; deck?: ReactNode; children?: ReactNode }) {
  return (
    <header
      className="container"
      style={{ paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-16))', paddingBottom: 'var(--tbf-space-12)' }}
    >
      <div style={{ maxWidth: READ, marginInline: 'auto' }}>
        <span style={{ ...MICRO, marginBottom: 'var(--tbf-space-4)' }}>{tag}</span>
        <h1
          style={{
            fontFamily: 'var(--tbf-type-display-xl-family)',
            fontSize: 'clamp(2.5rem, 9vw, 5.25rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: 'var(--tbf-type-display-xl-ls)',
            color: '#fff',
            margin: 0,
            marginBottom: 'var(--tbf-space-8)',
            overflowWrap: 'break-word',
          }}
        >
          {title}
        </h1>
        {deck && (
          <p
            style={{
              fontFamily: 'var(--tbf-type-deck-family)',
              fontSize: 'var(--tbf-type-deck-size-sm)',
              lineHeight: 'var(--tbf-type-deck-lh)' as CSSProperties['lineHeight'],
              color: 'rgba(255,255,255,0.7)',
              margin: 0,
            }}
          >
            {deck}
          </p>
        )}
        {children}
      </div>
    </header>
  )
}

/** Bloco de leitura: rótulo, título e conteúdo na coluna central. */
export function Block({
  label,
  title,
  wide = false,
  children,
}: {
  label?: string
  title?: string
  wide?: boolean
  children: ReactNode
}) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2.5rem, 7vw, 5rem)' }}>
      <div style={{ maxWidth: wide ? WIDE : READ, marginInline: 'auto' }}>
        {(label || title) && (
          <div style={{ maxWidth: READ, marginBottom: 'var(--tbf-space-8)', marginInline: wide ? 0 : 'auto' }}>
            {label && <span style={{ ...MICRO, marginBottom: 'var(--tbf-space-4)' }}>{label}</span>}
            {title && <h2 style={H2}>{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export function Paragraphs({ items }: { items: ReactNode[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-5)' }}>
      {items.map((p, i) => (
        <p key={i} style={BODY}>
          {p}
        </p>
      ))}
    </div>
  )
}

/** Frase de impacto em display. */
export function Statement({ children, size = 'lg' }: { children: ReactNode; size?: 'lg' | 'md' }) {
  return (
    <p
      style={{
        fontFamily: 'var(--tbf-type-display-xl-family)',
        fontSize: size === 'lg' ? 'clamp(1.75rem, 6vw, 3.25rem)' : 'clamp(1.375rem, 4.5vw, 2rem)',
        fontWeight: 800,
        lineHeight: 1.08,
        letterSpacing: 'var(--tbf-type-display-xl-ls)',
        color: '#fff',
        margin: 0,
        overflowWrap: 'break-word',
      }}
    >
      {children}
    </p>
  )
}

/** Linhas curtas, uma por linha, em peso forte (ritmo de manifesto). */
export function Lines({ items, muted = false }: { items: string[]; muted?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-1)' }}>
      {items.map((line) => (
        <p
          key={line}
          style={{
            fontFamily: 'var(--tbf-type-h2-family)',
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: muted ? 'rgba(255,255,255,0.5)' : '#fff',
            margin: 0,
          }}
        >
          {line}
        </p>
      ))}
    </div>
  )
}

export type Item = { title: string; desc: string; tag?: string }

/** Grade de cartões arredondados. `numbered` mostra 01, 02... */
export function Cards({ items, numbered = false, min = 240 }: { items: Item[]; numbered?: boolean; min?: number }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))`,
        gap: 'var(--tbf-space-4)',
      }}
    >
      {items.map((it, i) => (
        <div key={it.title} style={CARD}>
          {(numbered || it.tag) && (
            <span style={{ ...MICRO, marginBottom: 'var(--tbf-space-3)' }}>
              {numbered ? String(i + 1).padStart(2, '0') : it.tag}
            </span>
          )}
          <h3 style={{ ...CARD_TITLE, marginBottom: 'var(--tbf-space-2)' }}>{it.title}</h3>
          <p style={{ ...BODY, color: 'rgba(255,255,255,0.6)' }}>{it.desc}</p>
        </div>
      ))}
    </div>
  )
}

/** Cartões que levam a outra página. */
export function LinkCards({ items }: { items: { title: string; desc: string; href: string }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--tbf-space-3)' }}>
      {items.map((it) => (
        <Link
          key={it.href + it.title}
          href={it.href}
          style={{
            ...CARD,
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 'var(--tbf-space-4)',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <span>
            <span style={{ ...CARD_TITLE, display: 'block', marginBottom: 'var(--tbf-space-1)' }}>{it.title}</span>
            <span style={{ ...BODY, display: 'block', color: 'rgba(255,255,255,0.6)' }}>{it.desc}</span>
          </span>
          <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.25rem' }}>
            →
          </span>
        </Link>
      ))}
    </div>
  )
}

/** Pares rótulo / valor em cartão. */
export function Facts({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
        gap: 'var(--tbf-space-4)',
      }}
    >
      {items.map((f) => (
        <div key={f.label} style={CARD}>
          <span style={{ ...MICRO, marginBottom: 'var(--tbf-space-2)' }}>{f.label}</span>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'clamp(1.125rem, 3.4vw, 1.5rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#fff',
              whiteSpace: 'pre-line',
              overflowWrap: 'break-word',
            }}
          >
            {f.value}
          </span>
        </div>
      ))}
    </div>
  )
}

/** Fecho com botão primário. */
export function Closing({ line, children }: { line: string; children?: ReactNode }) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(3rem, 9vw, 7rem)' }}>
      <div style={{ maxWidth: READ, marginInline: 'auto' }}>
        <Statement>{line}</Statement>
        {children && <div style={{ marginTop: 'var(--tbf-space-8)', display: 'flex', flexWrap: 'wrap', gap: 'var(--tbf-space-3)' }}>{children}</div>}
      </div>
    </section>
  )
}

export const B800: CSSProperties = { fontWeight: 800 }
