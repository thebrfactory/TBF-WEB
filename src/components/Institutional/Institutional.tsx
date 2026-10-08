// =============================================================================
// INSTITUTIONAL: primitivos das páginas institucionais da coluna COMPANY
// (/consulting, /press, /press/media, /publishing).
//
// Herdam a linguagem do template de matéria (ArticleView): coluna de leitura
// central, ritmo editorial, títulos fortes, blocos curtos e mídia/cartões com
// cantos arredondados. Mobile-first: tudo parte de uma coluna só e a medida de
// leitura (65ch) centraliza sozinha quando a tela é larga. Sem divisores
// horizontais, sem nowrap.
//
// Server components, sem estado. Estilo inline sobre os tokens de src/styles.
// =============================================================================

import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'

export const RADIUS = '18px'

export const B800: CSSProperties = { fontWeight: 800 }

export const KICKER: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: 'var(--tbf-type-micro-size)',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.45)',
  marginBottom: 'var(--tbf-space-4)',
}

export const TITLE: CSSProperties = {
  fontFamily: 'var(--tbf-type-display-xl-family)',
  fontSize: 'clamp(2.25rem, 8vw, 4.75rem)',
  fontWeight: 800,
  lineHeight: 0.95,
  letterSpacing: 'var(--tbf-type-display-xl-ls)',
  color: '#fff',
  marginBottom: 'var(--tbf-space-8)',
  overflowWrap: 'break-word',
}

export const H2: CSSProperties = {
  fontFamily: 'var(--tbf-type-h2-family)',
  fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
  fontWeight: 800,
  lineHeight: 1.08,
  letterSpacing: 'var(--tbf-type-h2-ls)',
  color: '#fff',
  marginBottom: 'var(--tbf-space-6)',
}

export const H3: CSSProperties = {
  fontFamily: 'var(--tbf-type-h2-family)',
  fontSize: '1.25rem',
  fontWeight: 800,
  lineHeight: 1.15,
  color: '#fff',
  margin: 0,
}

export const DECK: CSSProperties = {
  fontFamily: 'var(--tbf-type-deck-family)',
  fontSize: 'clamp(1.125rem, 3.4vw, 1.5rem)',
  fontWeight: 300,
  lineHeight: 1.35,
  color: 'rgba(255,255,255,0.8)',
  marginBottom: 'var(--tbf-space-6)',
}

export const BODY: CSSProperties = {
  fontFamily: 'var(--tbf-type-body-family)',
  fontSize: 'var(--tbf-type-body-size-sm)',
  lineHeight: 'var(--tbf-type-body-lh)' as CSSProperties['lineHeight'],
  color: 'rgba(255,255,255,0.72)',
  marginBottom: 'var(--tbf-space-5)',
}

export const LABEL: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--tbf-type-micro-family)',
  fontSize: 'var(--tbf-type-micro-size)',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#fff',
  marginBottom: 'var(--tbf-space-3)',
}

export const CARD: CSSProperties = {
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: RADIUS,
  padding: 'var(--tbf-space-6)',
  background: 'rgba(255,255,255,0.03)',
}

/** Coluna de leitura: 65ch, centrada. Em celular ocupa a largura toda. */
export const READING: CSSProperties = {
  maxWidth: 'var(--tbf-type-body-max-width)',
  marginInline: 'auto',
}

/** Seção editorial: faixa com respiro, conteúdo na coluna de leitura. */
export function Section({
  id,
  kicker,
  heading,
  children,
  wide,
}: {
  id?: string
  kicker?: string
  heading?: ReactNode
  children?: ReactNode
  /** Deixa os filhos usarem a largura do container (grades de cartões). */
  wide?: ReactNode
}) {
  return (
    <section id={id} className="section container" aria-labelledby={id ? `${id}-h` : undefined}>
      {(kicker || heading || children) && (
        <div style={READING}>
          {kicker && <span style={KICKER}>{kicker}</span>}
          {heading && (
            <h2 id={id ? `${id}-h` : undefined} style={H2}>
              {heading}
            </h2>
          )}
          {children}
        </div>
      )}
      {wide && <div style={{ marginTop: 'var(--tbf-space-10)' }}>{wide}</div>}
    </section>
  )
}

/** Hero tipográfico simples (Press, Media, Publishing). */
export function PageHero({
  tag,
  title,
  deck,
  children,
}: {
  tag: string
  title: ReactNode
  deck: ReactNode
  children?: ReactNode
}) {
  return (
    <section
      style={{
        paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-16))',
        paddingBottom: 'var(--tbf-space-16)',
      }}
    >
      <div className="container">
        <div style={READING}>
          <span style={KICKER}>{tag}</span>
          <h1 style={TITLE}>{title}</h1>
          <p style={DECK}>{deck}</p>
          {children}
        </div>
      </div>
    </section>
  )
}

/** Frase de destaque em corpo grande, na coluna de leitura. */
export function Statement({ lines }: { lines: string[] }) {
  return (
    <section className="section container">
      <div style={READING}>
        <p
          style={{
            fontFamily: 'var(--tbf-type-display-xl-family)',
            fontSize: 'clamp(1.75rem, 6.2vw, 3.25rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: 'var(--tbf-type-display-xl-ls)',
            color: '#fff',
            margin: 0,
          }}
        >
          {lines.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

/**
 * Grade de cartões arredondados. 1 coluna no celular, 2 a partir de 768px
 * (auto-fit com mínimo de 280px). Cada item: rótulo, título opcional, corpo.
 */
export function CardGrid({
  items,
}: {
  items: { key: string; kicker?: string; title: string; body?: string; sub?: string; href?: string; linkLabel?: string }[]
}) {
  return (
    <ul
      role="list"
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: 'var(--tbf-space-4)',
        maxWidth: 'var(--tbf-grid-max-xl)',
        marginInline: 'auto',
      }}
    >
      {items.map((it) => (
        <li key={it.key} style={CARD}>
          {it.kicker && (
            <p style={{ ...LABEL, color: 'rgba(255,255,255,0.4)', marginBottom: 'var(--tbf-space-3)' }}>
              {it.kicker}
            </p>
          )}
          <h3 style={{ ...H3, marginBottom: 'var(--tbf-space-3)' }}>{it.title}</h3>
          {it.sub && (
            <p style={{ ...BODY, color: '#fff', marginBottom: 'var(--tbf-space-2)' }}>{it.sub}</p>
          )}
          {it.body && <p style={{ ...BODY, marginBottom: 0 }}>{it.body}</p>}
          {it.href && (
            <Link
              href={it.href}
              style={{
                ...LABEL,
                display: 'inline-block',
                marginTop: 'var(--tbf-space-5)',
                marginBottom: 0,
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                textDecorationColor: 'rgba(255,255,255,0.35)',
              }}
            >
              {it.linkLabel} →
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

/** Lista curta de itens (sem traços), com marcador numérico opcional. */
export function PlainList({ items, numbered }: { items: string[]; numbered?: boolean }) {
  return (
    <ul
      role="list"
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--tbf-space-3)',
      }}
    >
      {items.map((item, i) => (
        <li key={item} style={{ ...BODY, marginBottom: 0, display: 'flex', gap: 'var(--tbf-space-4)' }}>
          {numbered && (
            <span
              aria-hidden="true"
              style={{
                fontFamily: 'var(--tbf-type-micro-family)',
                fontSize: 'var(--tbf-type-micro-size)',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.35)',
                minWidth: '1.75rem',
                paddingTop: '3px',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          )}
          <span style={{ color: '#fff' }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Link de e-mail em caixa-alta, padrão das páginas de contato. */
export function MailLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      style={{
        display: 'inline-block',
        fontFamily: 'var(--tbf-type-micro-family)',
        fontSize: 'var(--tbf-type-micro-size)',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#fff',
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
        textDecorationColor: 'rgba(255,255,255,0.35)',
      }}
    >
      {email}
    </a>
  )
}
