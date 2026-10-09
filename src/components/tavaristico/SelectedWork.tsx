// =============================================================================
// SELECTED WORK, TAVARISTICO CREATOR PAGE 2.0 (correcao 09/09/2026 em cima de
// print do fundador)
// -----------------------------------------------------------------------------
// Antes era uma lista editorial com numero-indice (01/02/03/04) e peso visual
// diferente por item. Pedido novo: virar fileira de "stories", mesma estetica
// da secao Campaigns (StoryRing com anel gradiente de Instagram + StoryModal),
// mas mantendo nome, categoria e descricao de cada item, que Campaigns nao
// tem.
//
// O que muda:
// - Numero-indice sai. No lugar entra o StoryRing com a capa do proprio
//   projeto (`cover`), aberto sempre pelo clique, tenha ou nao rota.
// - Todo item pesa igual (fim da distincao primary/secondary): o fundador
//   reclamou que o item 04 ficava menor que os outros.
// - Categoria e descricao usam familias e tamanhos bem diferentes entre si
//   (mono micro vs. display corrido), pra parar de parecer o mesmo texto.
// - Separador da categoria e ponto medio (·), nunca barra.
//
// Quando existe `href`, so o NOME e link (TbfLink resolve interno x
// externo): o circulo abre o story independente de ter rota. Quando nao
// existe `href`, nada finge ser link de pagina, mas a linha inteira tambem
// abre o story (alem do circulo), porque e a unica acao que ela tem.
// =============================================================================

'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import type { Venture } from '@/app/(en)/creators/tavaristico/_data'
import { localizedPath, type Lang } from '@/lib/i18n'
import { StoryRing } from '@/components/tavaristico/StoryRing'
import { StoryModal } from '@/components/tavaristico/StoryModal'
import styles from './SelectedWork.module.css'

// Mesma chave de padrao do Campaigns (`tav:campaigns:seen`), namespace
// proprio pra nao misturar "visto" de campanha com "visto" de venture.
const SEEN_KEY = 'tav:ventures:seen'

// Rotulo de abertura do story: nao existe chave de i18n pra isso ainda (o
// arquivo de traducao esta em edicao paralela por outro executor), entao
// segue o mesmo padrao do Campaigns.tsx de default inline em vez de esperar
// a chave.
const OPEN_LABEL: Record<Lang, string> = {
  pt: 'Abrir projeto',
  en: 'Open project',
}

const MORE_LABEL: Record<Lang, string> = {
  pt: 'Sobre o projeto',
  en: 'About the project',
}

// Letreiro de tags: a lista se repete ate encher a faixa e o trilho anda 50%
// (duas metades identicas), loop sem costura. Metade 2 e so decoracao.
function TagTicker({ tags }: { tags: string[] }) {
  const group = (hidden: boolean, key: number) => (
    <span className={styles.tickerHalf} key={key} aria-hidden={hidden || undefined}>
      {[0, 1, 2].map((rep) =>
        tags.map((t) => (
          <span className={`${styles.tickerItem}${rep > 0 ? ` ${styles.tickerRep}` : ''}`} key={`${rep}-${t}`}>
            {t}
            <span className={styles.categoryDot} aria-hidden="true">
              &middot;
            </span>
          </span>
        )),
      )}
    </span>
  )
  return (
    <span className={styles.ticker} style={{ ['--ticker-n' as string]: tags.length }}>
      <span className={styles.tickerTrack}>
        {group(false, 0)}
        {group(true, 1)}
      </span>
    </span>
  )
}

function readSeen(): Record<string, true> {
  try {
    const raw = window.localStorage.getItem(SEEN_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function markSeen(index: string) {
  try {
    const seen = readSeen()
    seen[index] = true
    window.localStorage.setItem(SEEN_KEY, JSON.stringify(seen))
  } catch {
    // localStorage indisponivel (modo privado, cookies bloqueados): o anel
    // volta a "nao visto" na proxima carga, degrade aceitavel.
  }
}

// Ancora na propria pagina (`#work`) nao passa por `localizedPath`: e o mesmo
// hash nos dois idiomas. Rota real (`/`) passa, para nao mandar quem le em
// PT para a home em ingles.
function resolveHref(href: string, lang: Lang): string {
  return href.startsWith('#') ? href : localizedPath(href, lang)
}

function VentureRow({
  v,
  lang,
  seen,
  onOpen,
  registerRef,
}: {
  v: Venture
  lang: Lang
  seen: boolean
  onOpen: (index: string) => void
  registerRef: (index: string, el: HTMLButtonElement | null) => void
}) {
  const ariaLabel = `${OPEN_LABEL[lang]}: ${v.name}`
  const [open, setOpen] = useState(false)
  const descId = useId()

  const ring = (
    <StoryRing
      cover={v.cover}
      alt={v.coverAlt}
      seen={seen}
      ariaLabel={ariaLabel}
      onClick={() => onOpen(v.index)}
      buttonRef={(el) => registerRef(v.index, el)}
      // Correcao 10/09/2026 (rodada 6, item 4): volta pro default `cover`
      // do StoryRing. Pedido do fundador: a imagem preenche o circulo
      // inteiro, cortada por ele, tipo clipping mask, em vez de encolher
      // com respiro dentro do circulo.
    />
  )

  const body = (
    <span className={styles.ventureBody}>
      {v.href ? (
        <Link href={resolveHref(v.href, lang)} className={styles.ventureName}>
          {v.name}
        </Link>
      ) : (
        <span className={styles.ventureName}>{v.name}</span>
      )}
      <TagTicker tags={v.category} />
      <button
        type="button"
        className={styles.moreBtn}
        aria-expanded={open}
        aria-controls={descId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.moreIcon} aria-hidden="true" />
        {MORE_LABEL[lang]}
      </button>
      <span id={descId} className={`${styles.descWrap}${open ? ` ${styles.descWrapOpen}` : ''}`}>
        <span className={styles.descInner}>
          <span className={styles.ventureDescription}>{v.description}</span>
        </span>
      </span>
    </span>
  )

  // Correcao 09/09/2026 (print do fundador): a linha inteira NAO abre mais
  // o story. Antes, sem `href`, a div da linha toda era clicavel e o toque
  // desenhava selecao/retangulo sobre a area inteira do projeto. Só o
  // circulo (StoryRing) abre o story agora, com ou sem `href`.
  return (
    <div className={styles.ventureRow}>
      {ring}
      {body}
    </div>
  )
}

export function SelectedWork({ ventures, lang }: { ventures: Venture[]; lang: Lang }) {
  const [seen, setSeen] = useState<Record<string, true>>({})
  const [openIndex, setOpenIndex] = useState<string | null>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const lastOpenedRef = useRef<string | null>(null)

  useEffect(() => {
    setSeen(readSeen())
  }, [])

  const open = useCallback((index: string) => {
    lastOpenedRef.current = index
    setOpenIndex(index)
  }, [])

  const close = useCallback(() => {
    setOpenIndex((current) => {
      if (current) {
        markSeen(current)
        setSeen((s) => ({ ...s, [current]: true }))
      }
      return null
    })
  }, [])

  // Devolve o foco pro circulo que abriu, sempre que o modal fecha.
  useEffect(() => {
    if (openIndex !== null) return
    const last = lastOpenedRef.current
    if (last) triggerRefs.current[last]?.focus()
  }, [openIndex])

  const active = ventures.find((v) => v.index === openIndex) ?? null

  // Escolhe o idioma do overlay aqui (pedido do fundador 10/09/2026: "PT/EN
  // de tudo, inclusive stories"). `StoryFrame.overlay` chega bilingue do
  // dado; o StoryPlayer so recebe string pronta, sem nocao de idioma.
  const activeFrames = active
    ? active.frames.map((f) => ({
        ...f,
        overlay: f.overlay
          ? {
              title: lang === 'pt' ? f.overlay.titlePT : f.overlay.titleEN,
              kicker: lang === 'pt' ? f.overlay.kickerPT : f.overlay.kickerEN,
            }
          : undefined,
      }))
    : []

  return (
    <div className={styles.ventureList}>
      {ventures.map((v) => (
        <VentureRow
          key={v.index}
          v={v}
          lang={lang}
          seen={!!seen[v.index]}
          onOpen={open}
          registerRef={(index, el) => {
            triggerRefs.current[index] = el
          }}
        />
      ))}

      {active ? (
        <StoryModal
          // Correcao 10/09/2026: era UM quadro so (a marca em fundo preto).
          // Agora e a sequencia que o proprio dado carrega, com a sobreposicao
          // de texto de cada quadro no idioma da pagina. Ver `Venture.frames`
          // em _data.ts e `activeFrames` acima.
          frames={activeFrames}
          handle={active.name}
          label={`${OPEN_LABEL[lang]}: ${active.name}. ${active.description}`}
          onClose={close}
        />
      ) : null}
    </div>
  )
}
