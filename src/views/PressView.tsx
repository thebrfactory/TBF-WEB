import Link from 'next/link'
import { press } from '@/content/i18n/pages/press'
import {
  B800,
  BODY,
  CARD,
  CardGrid,
  DECK,
  H2,
  KICKER,
  LABEL,
  MailLink,
  PageHero,
  READING,
  Section,
  Statement,
} from '@/components/Institutional/Institutional'
import { localizedPath, type Lang } from '@/lib/i18n'

// =============================================================================
// /press: .TBF. Newsroom
//
// Nova arquitetura (08/10/2026): "uma página de imprensa que é o registro
// público da Factory". Coluna de leitura central, blocos curtos e cartões
// arredondados, na linguagem do template de matéria. Só fatos que o site já
// publica; o que ainda não existe (press kit, bios, citações) ficou de fora.
//
// Uma página, dois idiomas: o texto vem do dicionário e os links passam por
// localizedPath. Ver src/content/i18n/README.md.
// =============================================================================

function InlineLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="btn btn--secondary"
      style={{ marginTop: 'var(--tbf-space-4)' }}
    >
      {children}
      <span className="btn__arrow" aria-hidden="true">→</span>
    </Link>
  )
}

export default function PressView({ lang }: { lang: Lang }) {
  const t = press[lang]
  const path = (p: string) => localizedPath(p, lang)

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100dvh' }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        tag={t.hero.tag}
        title={t.hero.title}
        deck={
          <>
            {t.hero.deckPre}
            <span style={B800}>.THE BRAZILIAN FACTORY.</span>
            {t.hero.deckPost}
          </>
        }
      >
        <p style={{ ...BODY, color: '#fff', fontWeight: 700, marginBottom: 0 }}>
          {t.hero.tagline[0]}
          <br />
          {t.hero.tagline[1]}
        </p>
      </PageHero>

      {/* ─── 01 LATEST ────────────────────────────────────────────────────── */}
      <Section id="press-latest" kicker={t.latest.kicker} heading={t.latest.heading}>
        <p style={BODY}>{t.latest.body}</p>
        <InlineLink href={path(t.latest.href)}>{t.latest.cta}</InlineLink>
      </Section>

      {/* ─── 02 THE FACTORY ───────────────────────────────────────────────── */}
      <Statement lines={t.factory.lines} />
      <Section id="press-factory" kicker={t.factory.kicker} heading={t.factory.heading}>
        <p style={BODY}>
          <span style={B800}>.THE BRAZILIAN FACTORY.</span> {t.factory.p1}
        </p>
        <InlineLink href={path(t.factory.href)}>{t.factory.cta}</InlineLink>
      </Section>

      {/* ─── 03 PEOPLE ────────────────────────────────────────────────────── */}
      <Section id="press-people" kicker={t.people.kicker} heading={t.people.heading}>
        <p style={BODY}>{t.people.body}</p>
        <InlineLink href={path(t.people.href)}>{t.people.cta}</InlineLink>
      </Section>

      {/* ─── 04 LABELS ────────────────────────────────────────────────────── */}
      <Section
        id="press-labels"
        kicker={t.labels.kicker}
        heading={t.labels.heading}
        wide={
          <CardGrid
            items={t.labels.items.map((item) => ({ ...item, href: path(item.href) }))}
          />
        }
      />

      {/* ─── 05 FACTS ─────────────────────────────────────────────────────── */}
      <Section
        id="press-facts"
        kicker={t.facts.kicker}
        heading={t.facts.heading}
        wide={<CardGrid items={t.facts.items} />}
      >
        <InlineLink href={path(t.facts.href)}>{t.facts.cta}</InlineLink>
      </Section>

      {/* ─── 06 MEDIA KIT ─────────────────────────────────────────────────── */}
      <Section id="press-media-kit" kicker={t.mediaKit.kicker} heading={t.mediaKit.heading}>
        <p style={BODY}>{t.mediaKit.body}</p>
        <InlineLink href={path(t.mediaKit.href)}>{t.mediaKit.cta}</InlineLink>
      </Section>

      {/* ─── 07 STORIES ───────────────────────────────────────────────────── */}
      <Section
        id="press-stories"
        kicker={t.stories.kicker}
        heading={t.stories.heading}
        wide={<CardGrid items={t.stories.items} />}
      />

      {/* ─── BOILERPLATE ──────────────────────────────────────────────────── */}
      <Section id="press-boilerplate" kicker={t.boilerplate.kicker} heading={t.boilerplate.heading}>
        <div style={{ ...CARD, marginBottom: 'var(--tbf-space-4)' }}>
          <span style={{ ...LABEL, color: 'rgba(255,255,255,0.4)' }}>{t.boilerplate.shortLabel}</span>
          <p style={{ ...BODY, color: '#fff', marginBottom: 0 }}>{t.boilerplate.short}</p>
        </div>
        <div style={CARD}>
          <span style={{ ...LABEL, color: 'rgba(255,255,255,0.4)' }}>{t.boilerplate.mediumLabel}</span>
          <p style={{ ...BODY, color: '#fff', marginBottom: 0 }}>{t.boilerplate.medium}</p>
        </div>
      </Section>

      {/* ─── 08 CONTACT ───────────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="press-contact-h">
        <div style={READING}>
          <span style={KICKER}>{t.contact.kicker}</span>
          <h2 id="press-contact-h" style={H2}>{t.contact.heading}</h2>
          <p style={DECK}>{t.contact.line}</p>
          <MailLink email={t.contact.email} />
          <p style={{ ...BODY, color: '#fff', fontWeight: 800, marginTop: 'var(--tbf-space-12)', marginBottom: 0 }}>
            {t.contact.closing}
          </p>
        </div>
      </section>

    </div>
  )
}
