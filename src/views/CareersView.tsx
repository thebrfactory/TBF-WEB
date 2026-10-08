// =============================================================================
// CAREERS — serve `/careers` (inglês) e `/pt/careers` (português)
// =============================================================================

import { careers } from '@/content/i18n/pages/careers'
import type { Lang } from '@/lib/i18n'
import { B800, BODY, Block, Cards, Checklist, Closing, Facts, Hero, Lines, MICRO, Page, Paragraphs, PILL } from './institutional'

type Role = { title: string; tag: string; mission: string; standard: string }

export default function CareersView({ lang }: { lang: Lang }) {
  const t = careers[lang]
  const mail = (subject?: string) =>
    `mailto:${t.apply.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`

  const roleList = (roles: Role[], apply: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-4)' }}>
      {roles.map((r) => (
        <article
          key={r.title}
          style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--tbf-radius-card)', padding: 'var(--tbf-space-6)' }}
        >
          <span style={{ ...MICRO, marginBottom: 'var(--tbf-space-3)' }}>{r.tag}</span>
          <h3
            style={{
              fontFamily: 'var(--tbf-type-h2-family)',
              fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#fff',
              margin: 0,
              marginBottom: 'var(--tbf-space-5)',
            }}
          >
            {r.title}
          </h3>
          <span style={{ ...MICRO, marginBottom: 'var(--tbf-space-2)' }}>{t.roles.missionLabel}</span>
          <p style={{ ...BODY, marginBottom: 'var(--tbf-space-5)' }}>{r.mission}</p>
          <span style={{ ...MICRO, marginBottom: 'var(--tbf-space-2)' }}>{t.roles.standardLabel}</span>
          <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>{r.standard}</p>
          <a href={mail(r.title)} style={{ ...PILL, textDecoration: 'none' }}>
            {apply} →
          </a>
        </article>
      ))}
    </div>
  )

  return (
    <Page>
      <Hero
        tag={t.hero.tag}
        title={t.hero.title}
        deck={
          <>
            <span style={B800}>.THE BRAZILIAN FACTORY.</span> {t.hero.deckSuffix}
          </>
        }
      />

      <Block>
        <Lines items={t.hero.lines} />
      </Block>

      <Block label={t.building.sectionLabel}>
        <Paragraphs items={[t.building.p1, t.building.p2]} />
      </Block>

      <Block label={t.how.sectionLabel} wide>
        <div style={{ marginBottom: 'var(--tbf-space-8)' }}>
          <Lines items={t.how.lines} />
        </div>
        <Facts items={t.how.facts} />
      </Block>

      <Block label={t.principles.sectionLabel} title={t.principles.h2} wide>
        <Cards items={t.principles.items} numbered />
      </Block>

      <Block label={t.core.sectionLabel} title={t.core.h2} wide>
        <Cards
          items={[{ title: t.core.founder.title, tag: t.core.founder.tag, desc: t.core.founder.desc }]}
          min={280}
        />
      </Block>

      <Block label={t.network.sectionLabel} title={t.network.h2}>
        <Lines items={t.network.lines} />
        <div style={{ marginTop: 'var(--tbf-space-6)' }}>
          <Paragraphs items={[t.network.people]} />
        </div>
      </Block>

      <Block label={t.fit.sectionLabel} wide>
        <Checklist items={[t.fit.yes, t.fit.no]} />
      </Block>

      <Block label={t.roles.sectionLabel} title={t.roles.h2} wide>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-12)' }}>
          <div>
            <h3 style={{ ...MICRO, color: '#fff', marginBottom: 'var(--tbf-space-2)' }}>{t.roles.core.title}</h3>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>{t.roles.core.intro}</p>
            {roleList(t.roles.core.items, t.roles.core.apply)}
          </div>
          <div>
            <h3 style={{ ...MICRO, color: '#fff', marginBottom: 'var(--tbf-space-2)' }}>{t.roles.fractional.title}</h3>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>{t.roles.fractional.intro}</p>
            {roleList(t.roles.fractional.items, t.roles.fractional.apply)}
          </div>
          <div>
            <h3 style={{ ...MICRO, color: '#fff', marginBottom: 'var(--tbf-space-2)' }}>{t.roles.future.title}</h3>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-6)' }}>{t.roles.future.intro}</p>
            <Cards items={t.roles.future.items} />
          </div>
        </div>
      </Block>

      <Block label={t.apply.sectionLabel} title={t.apply.h2}>
        <Paragraphs items={[t.apply.p1]} />
        <div style={{ marginTop: 'var(--tbf-space-6)' }}>
          <a href={mail()} className="btn btn--primary">
            {t.apply.cta}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </Block>

      <Closing line={t.closing} />
    </Page>
  )
}
