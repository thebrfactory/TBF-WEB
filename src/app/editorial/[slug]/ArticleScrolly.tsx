// =============================================================================
// ArticleScrolly — composição das cenas (SPEC §3, ORD-01)
// `page.tsx` continua dono do fetch/SEO; este componente só monta o motor.
// tone="manifesto" é o único implementado neste ciclo (é o que o piloto usa —
// narrativa/jornalismo/ensaio entram quando houver matéria real desses tons).
// =============================================================================

import {
  ArticleLoader,
  ScrollProgress,
  HeroCinema,
  PinnedIntro,
  ChapterDivider,
  LineCascade,
  FullBleedLine,
  ShareRow,
  StickerLayer,
  StatBlock,
} from '@/components/scrolly'
import type { ManifestoArticle, ManifestoBlock } from '@/content/articles/the-day-brazil-stopped-translating-itself'

interface ArticleScrollyProps {
  tone: 'manifesto' | 'narrativa' | 'jornalismo' | 'ensaio'
  article: ManifestoArticle
}

export function ArticleScrolly({ article }: ArticleScrollyProps) {
  let chapterIndex = 0

  return (
    <div className="scrolly-article">
      <ArticleLoader title={article.loaderTitle} />
      <ScrollProgress />

      <HeroCinema title={article.heroTitle} subtitle={article.heroSubtitle} eyebrow={article.category} image={null} />

      {article.blocks.map((block, i) => {
        const key = `${block.kind}-${i}`

        switch (block.kind) {
          case 'lines':
            return <LineCascade key={key} lines={block.lines} emphasize={block.emphasize} />

          case 'divider':
            chapterIndex += 1
            return <ChapterDivider key={key} index={chapterIndex} theme={block.theme} />

          case 'word':
            chapterIndex += 1
            return <ChapterDivider key={key} index={chapterIndex} theme={block.theme ?? 'dark'} label={block.label} />

          case 'pinned':
            return <PinnedIntro key={key} text={block.text} kicker={block.kicker} />

          case 'fullbleed':
            return <FullBleedLine key={key} text={block.text} theme={block.theme} scale={block.scale} />

          case 'mirror':
            return <MirrorLists key={key} before={block.before} after={block.after} />

          case 'raw':
            return <RawCascade key={key} fixed={block.fixed} items={block.items} />

          case 'negation':
            return <NegationPairs key={key} pairs={block.pairs} />

          case 'stickers':
            return <StickerLayer key={key} fragments={block.fragments} />

          case 'stat':
            return <StatBlock key={key} value={block.value} formatted={block.formatted} prefix={block.prefix} label={block.label} />

          case 'closing':
            return <FullBleedLine key={key} text={block.text} theme="dark" scale="display" />

          default:
            return null
        }
      })}

      <ShareRow title={article.heroTitle} />
    </div>
  )
}

// ─── TIER 3 — estruturas próprias do piloto ─────────────────────────────────

function MirrorLists({ before, after }: { before: string[]; after: string[] }) {
  return (
    <div className="scrolly-mirror">
      <ul className="scrolly-mirror__list scrolly-mirror__list--before">
        {before.map((item, i) => (
          <li key={i} className="scrolly-mirror__item">
            {item}
          </li>
        ))}
      </ul>
      <ul className="scrolly-mirror__list scrolly-mirror__list--after">
        {after.map((item, i) => (
          <li key={i} className="scrolly-mirror__item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function RawCascade({ fixed, items }: { fixed: string; items: string[] }) {
  return (
    <div className="scrolly-raw">
      {items.map((item, i) => (
        <p key={i} className="scrolly-raw__row">
          <span className="scrolly-raw__fixed">{fixed}</span>
          <span className="scrolly-raw__variable">{item}</span>
        </p>
      ))}
    </div>
  )
}

function NegationPairs({ pairs }: { pairs: [string, string][] }) {
  return (
    <div className="scrolly-negation">
      {pairs.map(([no, yes], i) => (
        <div key={i} className="scrolly-negation__pair">
          <p className="scrolly-negation__no">{no}</p>
          <p className="scrolly-negation__yes">{yes}</p>
        </div>
      ))}
    </div>
  )
}
