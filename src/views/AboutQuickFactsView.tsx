// =============================================================================
// ABOUT/QUICK-FACTS — serve `/about/quick-facts` (inglês) e
// `/pt/about/quick-facts` (português)
// =============================================================================

import Link from 'next/link'
import { aboutQuickFacts } from '@/content/i18n/pages/about-quick-facts'
import { localizedPath, type Lang } from '@/lib/i18n'
import { B800, Block, Cards, Closing, Facts, Hero, Lines, LinkCards, Page, Paragraphs, PILL } from './institutional'

export default function AboutQuickFactsView({ lang }: { lang: Lang }) {
  const t = aboutQuickFacts[lang]
  const path = (p: string) => localizedPath(p, lang)

  return (
    <Page>
      <Hero tag={t.hero.tag} title={t.hero.title} deck={t.hero.deck} />

      <Block label={t.what.sectionLabel}>
        <Paragraphs
          items={[
            <>
              <span style={B800}>.THE BRAZILIAN FACTORY.</span> {t.what.intro}
            </>,
            t.what.nots,
          ]}
        />
      </Block>

      <Block label={t.why.sectionLabel} wide>
        <Cards items={t.why.items} min={220} />
      </Block>

      <Block label={t.think.sectionLabel} title={t.think.h2} wide>
        <Cards items={t.think.items} numbered />
      </Block>

      <Block label={t.operate.sectionLabel} title={t.operate.h2} wide>
        <Cards items={t.operate.items} numbered min={200} />
      </Block>

      <Block label={t.build.sectionLabel}>
        <Lines items={t.build.items} />
      </Block>

      <Block label={t.architecture.sectionLabel} title={t.architecture.h2} wide>
        <LinkCards items={t.architecture.items.map((i) => ({ ...i, href: path(i.href) }))} />
      </Block>

      <Block label={t.facts.sectionLabel} wide>
        <Facts items={t.facts.items} />
      </Block>

      <Block label={t.legal.sectionLabel} wide>
        <Facts items={t.legal.items} />
      </Block>

      <Closing line={t.thesis}>
        {t.cta.items.map((c) => (
          <Link key={c.href} href={path(c.href)} style={{ ...PILL, textDecoration: 'none' }}>
            {c.title} →
          </Link>
        ))}
      </Closing>
    </Page>
  )
}
