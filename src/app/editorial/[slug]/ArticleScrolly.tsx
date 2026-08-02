// =============================================================================
// ArticleScrolly — composição das cenas (SPEC §3, ORD-01) + bilíngue (ORD-03)
// `page.tsx` continua dono do fetch/SEO; este componente só monta o motor.
// tone="manifesto" é o único implementado neste ciclo (é o que o piloto usa —
// narrativa/jornalismo/ensaio entram quando houver matéria real desses tons).
//
// BILÍNGUE (ORD-03): as duas versões de idioma são renderizadas AO MESMO TEMPO
// no HTML (server component — zero JS necessário para o conteúdo em si) e a
// alternância é 100% CSS, controlada pelo atributo `data-lang` no wrapper raiz.
// Isso resolve três exigências ao mesmo tempo:
//   1. Zero flash: o servidor já resolve `data-lang` via ?lang=/Accept-Language
//      (ver page.tsx); um <script> bloqueante (1º filho do wrapper, roda antes
//      do browser pintar o resto) corrige para a preferência salva no
//      localStorage ANTES de qualquer conteúdo aparecer, se ela divergir do
//      palpite do servidor.
//   2. Troca sem reload e sem perder a posição de leitura: trocar de idioma só
//      alterna `display:none` via CSS — o scrollY em pixels não muda. (O que
//      pode mudar é QUAL trecho aparece nessa posição, já que EN e PT têm
//      comprimentos de texto diferentes — reportado em ORD-03-report.md.)
//   3. Funciona sem JS: o `data-lang` inicial já vem certo no HTML do servidor,
//      então mesmo sem JavaScript o visitante vê o idioma correto (via CSS puro).
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
import { LanguageToggle } from '@/components/scrolly/LanguageToggle'
import type { ManifestoArticle, ManifestoBlock, Lang } from '@/content/articles/the-day-brazil-stopped-translating-itself'

interface ArticleScrollyProps {
  tone: 'manifesto' | 'narrativa' | 'jornalismo' | 'ensaio'
  article: ManifestoArticle
  /**
   * Ritmo vertical. Existe para o fundador COMPARAR rolando de verdade, não
   * para virar configuração permanente: quando ele escolher, a vencedora vira
   * o padrão e as outras duas somem daqui e do scrolly.css.
   * v0 = como nasceu (39 telas) · v1 = uniforme · v2 = seletiva.
   */
  rhythm?: 'v0' | 'v1' | 'v2' | 'v3'
  /** Idioma resolvido no servidor (?lang= > Accept-Language > 'en'). ORD-03. */
  initialLang?: Lang
}

// Script bloqueante: roda ANTES do browser pintar o conteúdo que vem depois
// dele no HTML (é um <script> síncrono, sem defer/async/module). Reproduz a
// MESMA prioridade da ORD-03 (§C), agora com acesso a localStorage, que o
// servidor não tem: ?lang= > escolha salva > navigator.language > 'en'.
const LANG_BOOT_SCRIPT = `
(function () {
  try {
    var root = document.getElementById('scrolly-article-root');
    if (!root) return;
    var params = new URLSearchParams(window.location.search);
    var urlLang = params.get('lang');
    var lang;
    if (urlLang === 'pt' || urlLang === 'en') {
      lang = urlLang;
    } else {
      var saved = window.localStorage.getItem('tbf-article-lang');
      if (saved === 'pt' || saved === 'en') {
        lang = saved;
      } else {
        lang = (navigator.language || '').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
      }
    }
    if (lang !== root.getAttribute('data-lang')) {
      root.setAttribute('data-lang', lang);
    }
    // Ritmo vertical: comparação temporária com o fundador (?ritmo=v1|v2|v3).
    // Vive aqui, e não no servidor, porque ler parâmetro de URL no servidor
    // torna a rota dinâmica e derruba a página estática em produção.
    var r = params.get('ritmo');
    if (r === 'v1' || r === 'v2' || r === 'v3') root.setAttribute('data-rhythm', r);
  } catch (e) {}
})();
`

export function ArticleScrolly({ article, rhythm = 'v0', initialLang = 'en' }: ArticleScrollyProps) {
  return (
    <div
      className="scrolly-article"
      data-rhythm={rhythm}
      data-lang={initialLang}
      id="scrolly-article-root"
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line react/no-danger */}
      <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />

      <ArticleLoader title={article.loaderTitle[initialLang]} />
      <ScrollProgress />

      <div className="scrolly-lang scrolly-lang--en" lang="en">
        <HeroCinema title={article.heroTitle.en} subtitle={article.heroSubtitle.en} eyebrow={article.category} image={null} />
        {renderBlocks(article.blocks, 'en')}
      </div>
      <div className="scrolly-lang scrolly-lang--pt" lang="pt-BR">
        <HeroCinema title={article.heroTitle.pt} subtitle={article.heroSubtitle.pt} eyebrow={article.category} image={null} />
        {renderBlocks(article.blocks, 'pt')}
      </div>

      <LanguageToggle initialLang={initialLang} />

      <ShareRow title={article.heroTitle[initialLang]} />
    </div>
  )
}

// ─── Motor: uma única função de render, chamada 1x por idioma ──────────────

function renderBlocks(blocks: ManifestoBlock[], lang: Lang) {
  let chapterIndex = 0

  return blocks.map((block, i) => {
    const key = `${lang}-${block.kind}-${i}`

    switch (block.kind) {
      case 'lines':
        return <LineCascade key={key} lines={block.lines.map((l) => l[lang])} emphasize={block.emphasize} />

      case 'divider':
        chapterIndex += 1
        return <ChapterDivider key={key} index={chapterIndex} theme={block.theme} />

      case 'word':
        chapterIndex += 1
        return <ChapterDivider key={key} index={chapterIndex} theme={block.theme ?? 'dark'} label={block.label[lang]} />

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

      case 'closing':
        return <FullBleedLine key={key} text={block.text[lang]} theme="dark" scale="display" />

      default:
        return null
    }
  })
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
