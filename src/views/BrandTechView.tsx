// =============================================================================
// BRAND TECH: serve `/brand-tech` (inglês) e `/pt/brand-tech` (português)
// =============================================================================

import Link from 'next/link'
import { brandTech } from '@/content/i18n/pages/brand-tech'
import { localizedPath, type Lang } from '@/lib/i18n'
import { Block, Cards, Closing, Hero, Lines, LinkCards, Page, Paragraphs, Statement } from './institutional'

export default function BrandTechView({ lang }: { lang: Lang }) {
  const t = brandTech[lang]
  const path = (p: string) => localizedPath(p, lang)

  return (
    <Page>
      <Hero tag={t.hero.tag} title={t.hero.title} deck={t.hero.deck}>
        <div style={{ marginTop: 'var(--tbf-space-12)' }}>
          <Statement size="md">{t.hero.statement}</Statement>
        </div>
      </Hero>

      <Block label={t.problem.sectionLabel}>
        <Paragraphs items={[t.problem.p1]} />
        <div style={{ margin: 'var(--tbf-space-8) 0' }}>
          <Lines items={t.problem.lines} muted />
        </div>
        <Statement>{t.problem.statement}</Statement>
      </Block>

      <Block label={t.what.sectionLabel} title={t.what.h2} wide>
        <Cards items={t.what.items} numbered />
      </Block>

      <Block label={t.program.sectionLabel} title={t.program.h2} wide>
        <div style={{ marginBottom: 'var(--tbf-space-8)' }}>
          <Paragraphs items={[t.program.intro]} />
        </div>
        <Cards items={t.program.items} numbered min={220} />
        <div style={{ marginTop: 'var(--tbf-space-12)' }}>
          <Statement size="md">{t.program.statement}</Statement>
        </div>
      </Block>

      <Block label={t.think.sectionLabel} title={t.think.h2} wide>
        <Cards items={t.think.items} numbered min={200} />
        <div style={{ marginTop: 'var(--tbf-space-8)' }}>
          <Paragraphs items={[t.think.never]} />
        </div>
      </Block>

      <Block label={t.why.sectionLabel} title={t.why.h2}>
        <Lines items={t.why.lines} />
      </Block>

      <Block label={t.factory.sectionLabel} title={t.factory.h2} wide>
        <div style={{ marginBottom: 'var(--tbf-space-8)' }}>
          <Paragraphs items={[t.factory.p1]} />
        </div>
        <LinkCards items={t.factory.links.map((l) => ({ ...l, href: path(l.href) }))} />
      </Block>

      <Closing line={t.closing.line}>
        <Link href={path('/contact-us')} className="btn btn--primary">
          {t.closing.cta}
          <span className="btn__arrow" aria-hidden="true">→</span>
        </Link>
      </Closing>
    </Page>
  )
}
