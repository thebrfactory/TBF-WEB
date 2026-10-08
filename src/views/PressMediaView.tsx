import { pressMedia } from '@/content/i18n/pages/press-media'
import {
  B800,
  BODY,
  CARD,
  CardGrid,
  DECK,
  H2,
  H3,
  KICKER,
  LABEL,
  MailLink,
  PageHero,
  PlainList,
  READING,
  Section,
} from '@/components/Institutional/Institutional'
import type { Lang } from '@/lib/i18n'

// =============================================================================
// /press/media: .TBF. Media Desk
//
// Nova arquitetura (08/10/2026): "não entregue só o logo, entregue o contexto".
// Ordem: contexto, sistema, fatos, linguagem, ativos, uso, pedido de acesso.
// Coluna de leitura central e cartões arredondados, como o template de matéria.
//
// Uma página, dois idiomas: o texto vem do dicionário. Ver
// src/content/i18n/README.md. Sem links internos nesta página.
// =============================================================================

export default function PressMediaView({ lang }: { lang: Lang }) {
  const t = pressMedia[lang]

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100dvh' }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero tag={t.hero.tag} title={t.hero.title} deck={t.hero.deck}>
        <p style={{ ...BODY, color: '#fff', fontWeight: 700, marginBottom: 0 }}>{t.hero.context}</p>
      </PageHero>

      {/* ─── ABOUT THE FACTORY ────────────────────────────────────────────── */}
      <Section
        id="media-about"
        kicker={t.about.kicker}
        heading={t.about.heading}
        wide={<CardGrid items={t.about.items} />}
      >
        <p style={{ ...DECK, marginBottom: 0 }}>{t.about.definition}</p>
      </Section>

      {/* ─── THE SYSTEM ───────────────────────────────────────────────────── */}
      <Section
        id="media-system"
        kicker={t.system.kicker}
        heading={t.system.heading}
        wide={<CardGrid items={t.system.items} />}
      />

      {/* ─── PRESS FACTS ──────────────────────────────────────────────────── */}
      <Section
        id="media-facts"
        kicker={t.facts.kicker}
        heading={t.facts.heading}
        wide={<CardGrid items={t.facts.items} />}
      />

      {/* ─── LANGUAGE ─────────────────────────────────────────────────────── */}
      <Section id="media-language" kicker={t.language.kicker} heading={t.language.heading}>
        <p style={DECK}>{t.language.deck}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-4)' }}>
          {t.language.items.map((item) => (
            <div key={item.key} style={CARD}>
              <span style={{ ...LABEL, color: 'rgba(255,255,255,0.4)' }}>{item.title}</span>
              <p style={{ ...BODY, color: '#fff', marginBottom: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── BRAND ASSETS + IMAGE LIBRARY ─────────────────────────────────── */}
      <Section
        id="media-assets"
        kicker={t.assets.kicker}
        heading={t.assets.heading}
        wide={
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
            {t.assets.groups.map((group) => (
              <li key={group.category} style={CARD}>
                <h3 style={{ ...H3, marginBottom: 'var(--tbf-space-4)' }}>{group.category}</h3>
                <ul
                  role="list"
                  style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-2)' }}
                >
                  {group.items.map((item) => (
                    <li key={item} style={{ ...BODY, marginBottom: 0 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        }
      />

      {/* ─── USAGE ────────────────────────────────────────────────────────── */}
      <Section id="media-usage" kicker={t.usage.kicker} heading={t.usage.heading}>
        <p style={BODY}>{t.usage.p1}</p>
        <span style={{ ...LABEL, color: 'rgba(255,255,255,0.4)', marginTop: 'var(--tbf-space-8)' }}>
          {t.usage.rulesLabel}
        </span>
        <PlainList items={t.usage.rules} numbered />
      </Section>

      {/* ─── REQUEST ACCESS ───────────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="media-contact-h">
        <div style={READING}>
          <span style={KICKER}>{t.contact.kicker}</span>
          <h2 id="media-contact-h" style={H2}>{t.contact.heading}</h2>
          <p style={DECK}>{t.contact.line}</p>
          <MailLink email={t.contact.email} />
          <p style={{ ...BODY, marginTop: 'var(--tbf-space-12)', marginBottom: 0 }}>
            <span style={B800}>.THE BRAZILIAN FACTORY.</span>
          </p>
        </div>
      </section>

    </div>
  )
}
