// =============================================================================
// ABOUT: serve `/about` (inglês) e `/pt/about` (português)
// =============================================================================

import Link from 'next/link'
import { about } from '@/content/i18n/pages/about'
import { localizedPath, type Lang } from '@/lib/i18n'
import { B800, Block, Cards, Closing, Hero, Lines, LinkCards, Page, Paragraphs, PILL, Statement } from './institutional'

export default function AboutView({ lang }: { lang: Lang }) {
  const t = about[lang]
  const path = (p: string) => localizedPath(p, lang)
  const withHref = (items: { title: string; desc: string; href: string }[]) =>
    items.map((i) => ({ ...i, href: path(i.href) }))

  return (
    <Page>
      <Hero tag={t.hero.tag} title={t.hero.title} deck={t.hero.deck} />

      <Block>
        <Lines items={t.hero.lines} />
      </Block>

      <Block label={t.whatWeAre.sectionLabel}>
        <Paragraphs
          items={[
            <>
              <span style={B800}>.THE BRAZILIAN FACTORY.</span> {t.whatWeAre.intro}
            </>,
          ]}
        />
        <div style={{ margin: 'var(--tbf-space-8) 0' }}>
          <Lines items={t.whatWeAre.nots} muted />
        </div>
        <Statement>{t.whatWeAre.statement}</Statement>
        <div style={{ marginTop: 'var(--tbf-space-6)' }}>
          <Paragraphs items={[t.whatWeAre.body]} />
        </div>
      </Block>

      <Block label={t.why.sectionLabel}>
        <Statement>{t.why.mission}</Statement>
        <div style={{ marginTop: 'var(--tbf-space-8)' }}>
          <Paragraphs items={[t.why.p1, t.why.p2]} />
        </div>
      </Block>

      <Block label={t.how.sectionLabel} title={t.how.h2} wide>
        <Cards items={t.how.items} numbered min={200} />
      </Block>

      <Block label={t.build.sectionLabel}>
        <Lines items={t.build.items} />
      </Block>

      <Block label={t.labels.sectionLabel} title={t.labels.h2} wide>
        <LinkCards items={withHref(t.labels.items)} />
      </Block>

      <Block label={t.system.sectionLabel} title={t.system.h2} wide>
        <LinkCards items={withHref(t.system.items)} />
      </Block>

      <Block label={t.principles.sectionLabel} title={t.principles.h2} wide>
        <Cards items={t.principles.items} numbered />
      </Block>

      <Block label={t.founder.sectionLabel}>
        <Statement size="md">
          {t.founder.foundedBy} <span style={B800}>{t.founder.name}</span>.
        </Statement>
        <div style={{ margin: 'var(--tbf-space-6) 0' }}>
          <Paragraphs items={[t.founder.p1, t.founder.p2]} />
        </div>
        <Link href={path(t.founder.ctaHref)} style={{ ...PILL, textDecoration: 'none' }}>
          {t.founder.cta} →
        </Link>
      </Block>

      <Closing line={t.closing} />
    </Page>
  )
}
