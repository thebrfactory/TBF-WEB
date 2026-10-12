// =============================================================================
// CAREERS: serve `/careers` (inglês) e `/pt/careers` (português)
// =============================================================================

import { careers } from '@/content/i18n/pages/careers'
import type { Lang } from '@/lib/i18n'
import { B800, BODY, Block, Cards, Checklist, Closing, Facts, Lines, MICRO, Page, Paragraphs } from './institutional'
import css from './CareersView.module.css'

type Role = { title: string; tag: string; mission: string; standard: string }

export default function CareersView({ lang }: { lang: Lang }) {
  const t = careers[lang]
  const mail = (subject?: string) =>
    `mailto:${t.apply.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`

  const roleList = (roles: Role[], apply: string) => (
    <div className={css.list}>
      {roles.map((r) => (
        <article key={r.title} className={css.card}>
          <h3 className={css.roleTitle}>{r.title}</h3>
          <p className={css.line}>{r.tag}</p>
          <details className={css.details}>
            <summary>{t.hero.detailsLabel}</summary>
            <div className={css.detailsBody}>
              <span style={MICRO}>{t.roles.missionLabel}</span>
              <p style={BODY}>{r.mission}</p>
              <span style={{ ...MICRO, marginTop: 'var(--tbf-space-2)' }}>{t.roles.standardLabel}</span>
              <p style={BODY}>{r.standard}</p>
            </div>
          </details>
          <div className={css.actions}>
            <a href={mail(r.title)} className="btn">
              {apply}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  )

  const count = t.roles.core.items.length + t.roles.fractional.items.length

  return (
    <Page>
      <header className={`container ${css.hero}`}>
        <div className={css.heroInner}>
          <span style={{ ...MICRO, marginBottom: 'var(--tbf-space-3)' }}>{t.hero.tag}</span>
          <h1 className={css.title}>{t.hero.title}</h1>
          <p className={css.deck}>
            <span style={B800}>.THE BRAZILIAN FACTORY.</span> {t.hero.deckSuffix}
          </p>
          <div className={css.evidence}>
            <p className={css.count}>
              {count} {t.hero.openRoles} <span>· {t.hero.where}</span>
            </p>
            <a href="#open-roles" className="btn">
              {t.hero.cta}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

      <section id="open-roles" className={`container ${css.roles}`} aria-label={t.roles.sectionLabel}>
        <div className={css.rolesInner}>
          <div className={css.group}>
            <h2 style={{ ...MICRO, color: '#fff' }}>{t.roles.core.title}</h2>
            {roleList(t.roles.core.items, t.roles.core.apply)}
          </div>
          <div className={css.group}>
            <h2 style={{ ...MICRO, color: '#fff' }}>{t.roles.fractional.title}</h2>
            {roleList(t.roles.fractional.items, t.roles.fractional.apply)}
          </div>
          <div className={css.group}>
            <h2 style={MICRO}>{t.roles.future.title}</h2>
            <div className={css.future}>
              {t.roles.future.items.map((i) => (
                <p key={i.title} className={css.futureItem}>
                  <strong>{i.title}.</strong> {i.desc}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={css.rest}>
        <Block label={t.hero.howLabel}>
          <Lines items={t.hero.lines} />
        </Block>

        <Block label={t.building.sectionLabel}>
          <Paragraphs items={[t.building.p1, t.building.p2]} />
        </Block>

        <Block wide>
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
      </div>

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
