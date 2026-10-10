// =============================================================================
// ArticleScrolly — composição das cenas (SPEC §3, ORD-01) + bilíngue
// `page.tsx` continua dono do fetch/SEO; este componente só monta o motor.
// tone="manifesto" é o único implementado neste ciclo (é o que o piloto usa —
// narrativa/jornalismo/ensaio entram quando houver matéria real desses tons).
//
// BILÍNGUE: cada idioma é uma ROTA (`/zine/x` e `/pt/zine/x`), então
// o servidor já sabe qual servir e renderiza SÓ ele. Antes as duas versões iam
// juntas no HTML e um script escondia uma delas antes do primeiro paint, porque
// a rota era a mesma para os dois idiomas. Agora isso é desperdício: o HTML da
// matéria caiu pela metade, o script sumiu e cada idioma tem URL própria, que é
// o que o Google indexa e o leitor compartilha.
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
  MediaParallax,
  MediaPair,
} from '@/components/scrolly'
import type { MediaPairItem } from '@/components/scrolly'
import { GalleryScope } from '@/components/gallery'
import { MediaBelt } from '@/components/StoryPlayer/StoryPlayer'
import type { ManifestoArticle, ManifestoBlock } from '@/content/articles/the-day-brazil-stopped-translating-itself'
import type { Lang } from '@/lib/i18n'
import { withTbf } from '@/lib/tbf-text'

interface ArticleScrollyProps {
  tone: 'manifesto' | 'narrativa' | 'jornalismo' | 'ensaio'
  article: ManifestoArticle
  /** Idioma da rota. Quem manda é a URL, não o navegador. */
  lang: Lang
}

const LIGHTBOX_LABELS = {
  en: { close: 'Close', prev: 'Previous photo', next: 'Next photo', dialog: 'Photo gallery' },
  pt: { close: 'Fechar', prev: 'Foto anterior', next: 'Próxima foto', dialog: 'Galeria de fotos' },
}

export function ArticleScrolly({ article, lang }: ArticleScrollyProps) {
  // Toda foto da matéria abre em tela cheia (galeria, #01 CHANGES 09/10/2026).
  // A capa fica de fora: é o fundo do título, não uma foto para ver.
  const lightboxItems = Array.from(
    new Map(collectPhotos(article.blocks, lang).map((p) => [p.src, { src: p.src, alt: p.alt }])).values(),
  )
  return (
    // `data-article` existe para a Camada 3 poder afinar UMA materia sem
    // reescrever o motor de todas. Ver a alternancia de peso em scrolly.css.
    <div className="scrolly-article" id="scrolly-article-root" data-article={article.slug}>
      <ArticleLoader />
      <ScrollProgress />
      <GalleryScope items={lightboxItems} labels={LIGHTBOX_LABELS[lang]}>

      {/* A capa deixou de ser `null`. O void preto existia porque o piloto
          nasceu sem foto, e forçar uma imagem ali teria sido mentira visual;
          agora existe foto de licença livre, e é a MESMA que vira miniatura no
          /zine e na home. */}
      {(() => {
        // ESTEIRA DE ABERTURA (10/09/2026, pedido do fundador com a referência
        // na mão: o reel de /creators/tavaristico/hospitality). As fotos são
        // as da própria matéria, colhidas dos blocos `image` e `pair`, então a
        // tira nunca mostra imagem que a matéria não tenha. Toda matéria com
        // foto suficiente ganha a tira, sem ninguém ter que lembrar de montá-la.
        //
        // POSIÇÃO (21/09/2026, pedido do fundador): por padrão ela roda logo
        // depois da capa. Matéria com `heroBelt` preenchido pede a tira AINDA
        // NO CABEÇALHO (dentro do HeroCinema, antes do título, igual à
        // referência), então aqui ela entra como prop do Hero em vez de
        // section à parte. Opt-in por matéria: sem o campo, nada muda.
        const strip = collectPhotos(article.blocks, lang)
        const hasBelt = strip.length >= 4
        const beltInHeader = hasBelt && Boolean(article.heroBelt)

        return (
          <>
            <HeroCinema
              title={article.heroTitle[lang]}
              subtitle={article.heroSubtitle[lang]}
              eyebrow={article.category}
              image={{ src: article.cover.src, alt: article.cover.alt[lang] }}
              lang={lang}
            />
            {hasBelt && !beltInHeader && <MediaBelt className="scrolly-reel" items={strip} />}
            {/* 10/10/2026, fundador: a esteira com legenda sai do topo do Hero e
                ocupa o vão entre o fim do Hero e a primeira seção. Hero limpo. */}
            {beltInHeader && (
              <section className="scrolly-reel-gap" aria-label={article.heroBelt?.[lang]}>
                <MediaBelt className="scrolly-reel" items={strip} label={article.heroBelt?.[lang]} />
                <p className="scrolly-reel-gap__caption">{article.heroBelt?.[lang]}</p>
              </section>
            )}
          </>
        )
      })()}

      {renderBlocks(article.blocks, lang)}
      </GalleryScope>

      {/* O seletor PT|EN não mora mais aqui: virou a pílula da navegação
          (components/LanguageSwitch), visível em todo o site e permanente no
          topo mesmo com o header escondido. Lá ele NAVEGA para a mesma matéria
          na outra rota, em vez de esconder metade do HTML. */}

      <ShareRow title={article.heroTitle[lang]} />
    </div>
  )
}

// Fotos da matéria, na ordem em que ela as usa: alimenta a esteira de
// abertura. `plate` entra junto (é foto também); a capa não, porque ela acabou
// de aparecer em tela cheia logo acima.
function collectPhotos(blocks: ManifestoBlock[], lang: Lang) {
  const out: { src: string; alt: string; role: string }[] = []
  for (const block of blocks) {
    if (block.kind === 'image') out.push({ src: block.src, alt: block.alt[lang], role: '' })
    if (block.kind === 'pair') for (const it of block.items) out.push({ src: it.src, alt: it.alt[lang], role: '' })
  }
  return out
}

// ─── Motor: uma única função de render, chamada 1x por idioma ──────────────

function renderBlocks(blocks: ManifestoBlock[], lang: Lang) {
  let chapterIndex = 0
  const capitulo = (n: number) => (lang === 'pt' ? `Capítulo ${n}` : `Chapter ${n}`)

  return blocks.map((block, i) => {
    const key = `${lang}-${block.kind}-${i}`

    switch (block.kind) {
      case 'lines':
        return <LineCascade key={key} lines={block.lines.map((l) => l[lang])} emphasize={block.emphasize} />

      case 'divider':
        chapterIndex += 1
        return (
          <ChapterDivider key={key} index={chapterIndex} theme={block.theme} srLabel={capitulo(chapterIndex)} />
        )

      case 'word':
        chapterIndex += 1
        return (
          <ChapterDivider
            key={key}
            index={chapterIndex}
            theme={block.theme ?? 'dark'}
            label={block.label[lang]}
            srLabel={capitulo(chapterIndex)}
          />
        )

      case 'pinned':
        return <PinnedIntro key={key} text={block.text[lang]} kicker={block.kicker?.[lang]} />

      case 'fullbleed':
        return <FullBleedLine key={key} text={block.text[lang]} theme={block.theme} scale={block.scale} />

      case 'mirror':
        return (
          <MirrorLists
            key={key}
            before={block.before.map((b) => b[lang])}
            after={block.after.map((a) => a[lang])}
            beforeLabel={block.beforeLabel?.[lang]}
            afterLabel={block.afterLabel?.[lang]}
          />
        )

      case 'raw':
        return <RawCascade key={key} fixed={block.fixed[lang]} items={block.items.map((it) => it[lang])} />

      case 'negation':
        return (
          <NegationPairs
            key={key}
            pairs={block.pairs.map(([no, yes]) => [no[lang], yes[lang]] as [string, string])}
          />
        )

      case 'stickers':
        return <StickerLayer key={key} fragments={block.fragments.map((f) => f[lang])} />

      case 'stat':
        return (
          <StatBlock
            key={key}
            value={block.value}
            formatted={block.formatted[lang]}
            prefix={block.prefix?.[lang]}
            label={block.label[lang]}
          />
        )

      case 'image':
        // O crédito anda GRUDADO na legenda, no mesmo nó, porque as licenças em
        // uso (CC BY e CC BY-SA) exigem atribuição junto da obra. Sem legenda,
        // o crédito aparece sozinho: a atribuição nunca é opcional.
        return (
          <MediaParallax
            key={key}
            src={block.src}
            alt={block.alt[lang]}
            caption={block.caption?.[lang]}
            credit={block.credit}
            variant={block.variant}
            width={block.variant === 'plate' ? block.width : undefined}
            height={block.variant === 'plate' ? block.height : undefined}
          />
        )

      // O par carrega o crédito do mesmo jeito que a imagem solta: colado na
      // legenda, no mesmo nó, porque atribuição nunca é opcional.
      case 'pair':
        return (
          <MediaPair
            key={key}
            items={
              block.items.map((it) => ({
                src: it.src,
                alt: it.alt[lang],
                caption: it.caption?.[lang],
                credit: it.credit,
              })) as [MediaPairItem, MediaPairItem]
            }
            ratio={block.ratio}
          />
        )

      case 'closing':
        return <FullBleedLine key={key} text={block.text[lang]} theme="dark" scale="display" />

      default:
        return null
    }
  })
}

// ─── TIER 3 — estruturas próprias do piloto ─────────────────────────────────

function MirrorLists({
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  before: string[]
  after: string[]
  beforeLabel?: string
  afterLabel?: string
}) {
  return (
    <div className="scrolly-mirror">
      <div className="scrolly-mirror__col">
        {beforeLabel ? <p className="scrolly-mirror__label">{withTbf(beforeLabel)}</p> : null}
        <ul className="scrolly-mirror__list scrolly-mirror__list--before">
          {before.map((item, i) => (
            <li key={i} className="scrolly-mirror__item">
              {withTbf(item)}
            </li>
          ))}
        </ul>
      </div>
      <div className="scrolly-mirror__col">
        {afterLabel ? <p className="scrolly-mirror__label">{withTbf(afterLabel)}</p> : null}
        <ul className="scrolly-mirror__list scrolly-mirror__list--after">
          {after.map((item, i) => (
            <li key={i} className="scrolly-mirror__item">
              {withTbf(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function RawCascade({ fixed, items }: { fixed: string; items: string[] }) {
  return (
    <div className="scrolly-raw">
      {items.map((item, i) => (
        <p key={i} className="scrolly-raw__row">
          <span className="scrolly-raw__fixed">{withTbf(fixed)}</span>
          <span className="scrolly-raw__variable">{withTbf(item)}</span>
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
          <p className="scrolly-negation__no">{withTbf(no)}</p>
          <p className="scrolly-negation__yes">{withTbf(yes)}</p>
        </div>
      ))}
    </div>
  )
}
