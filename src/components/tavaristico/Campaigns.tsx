// =============================================================================
// CAMPAIGNS, TAVARISTICO CREATOR PAGE 2.0 (partes 12, 13, 14 do briefing)
// -----------------------------------------------------------------------------
// Gesto do Instagram (pedido do fundador 09/09/2026): o estado padrao nao e
// mais o StoryDeck aberto ocupando a altura da pagina, e sim um circulo de
// story por campanha, anel gradiente, "ainda nao visto". Clicar abre o mesmo
// StoryDeck (nasceu em /pitch/v3) num popup modal 9:16 sobre a pagina. Fechar
// marca o circulo como visto (anel cinza, como o Instagram), persistido por
// viewer em localStorage.
//
// A parte 13 e taxativa: nao inventar campanha. `campaigns` vem de CAMPAIGNS
// em _data.ts, hoje com uma unica entrada real (O: 18 Years). O componente e
// generico para qualquer tamanho de lista: grade de circulos lado a lado,
// rolagem horizontal se nao couber.
// =============================================================================

'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { StoryDeck } from '@/components/StoryPlayer/StoryPlayer'
import type { Campaign } from '@/app/(en)/creators/tavaristico/_data'
import type { Lang } from '@/lib/i18n'
import styles from './Campaigns.module.css'

const SEEN_KEY = 'tav:campaigns:seen'

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
    // volta a "nao visto" na proxima carga, o que e um degrade aceitavel.
  }
}

export function Campaigns({
  campaigns,
  lang,
  label,
  caseLabel,
  inviteLabel = 'Tap to open the project',
}: {
  campaigns: Campaign[]
  lang: Lang
  label: string
  caseLabel: string
  /** Convite perto do circulo. Prop nova, valor padrao em ingles: chave de
   * i18n ainda nao existe (arquivo em edicao paralela). */
  inviteLabel?: string
}) {
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

  // Devolve o foco ao circulo que abriu, sempre que o modal fecha.
  useEffect(() => {
    if (openIndex !== null) return
    const last = lastOpenedRef.current
    if (last) triggerRefs.current[last]?.focus()
  }, [openIndex])

  if (campaigns.length === 0) return null

  const active = campaigns.find((c) => c.index === openIndex) ?? null

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
      {campaigns.map((c) => {
        const isSeen = !!seen[c.index]
        const cover = c.frames[0]
        return (
          <div key={c.index} className={styles.item}>
            <button
              type="button"
              ref={(el) => {
                triggerRefs.current[c.index] = el
              }}
              className={`${styles.ring}${isSeen ? ` ${styles.ringSeen}` : ''}`}
              aria-haspopup="dialog"
              aria-expanded={openIndex === c.index}
              aria-label={`${inviteLabel}: ${c.name}`}
              onClick={() => open(c.index)}
            >
              <span className={styles.thumbWrap}>
                {cover ? (
                  <Image
                    src={cover.src}
                    alt=""
                    width={200}
                    height={200}
                    sizes="120px"
                    className={styles.thumb}
                  />
                ) : null}
              </span>
            </button>
            <span className={styles.name}>{c.name}</span>
          </div>
        )
      })}
      </div>
      <span className={styles.invite} aria-hidden="true">
        {inviteLabel}
      </span>

      {active ? (
        <CampaignModal
          campaign={active}
          lang={lang}
          label={label}
          caseLabel={caseLabel}
          onClose={close}
        />
      ) : null}
    </div>
  )
}

function CampaignModal({
  campaign,
  lang,
  label,
  onClose,
}: {
  campaign: Campaign
  lang: Lang
  label: string
  caseLabel: string
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const deckWrapRef = useRef<HTMLDivElement>(null)
  // Segurar pausa, soltar retoma: o gesto do Instagram. `held` so vira true
  // depois de 180ms de pressao, senao um toque comum para o story antes de
  // avancar. O timer morre no pointerup e no unmount.
  const [held, setHeld] = useState(false)
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cancelHold = useCallback(() => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
    setHeld(false)
  }, [])
  useEffect(() => cancelHold, [cancelHold])
  const titleId = useId()
  const description = lang === 'pt' ? campaign.descriptionPT : campaign.descriptionEN

  // Toque na metade direita avanca, toque na metade esquerda volta: o
  // StoryDeck ja tem os botoes "Peca anterior" / "Proxima peca" (as setas
  // discretas nas bordas do quadro), so nao ocupam a tela toda. Em vez de
  // duplicar a logica de indice aqui (o `i`/`ir` sao internos do StoryDeck,
  // fora do escopo editavel), a zona de toque aciona o mesmo botao real por
  // aria-label. Reusa o componente em vez de reescrever o que ele ja faz.
  const tap = useCallback((label: 'Peça anterior' | 'Próxima peça') => {
    const btn = deckWrapRef.current?.querySelector<HTMLButtonElement>(
      `button[aria-label="${label}"]`
    )
    btn?.click()
  }, [])

  // Trava o scroll do corpo enquanto o modal existe, destrava ao fechar e
  // tambem se o componente desmontar direto (navegacao, troca de rota).
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // Escape fecha; foco preso dentro do dialog enquanto aberto.
  useEffect(() => {
    const node = dialogRef.current
    const focusable = node?.querySelectorAll<HTMLElement>(
      'button:not([aria-hidden="true"]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    focusable?.[0]?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  // 🔴 PORTAL OBRIGATORIO. A secao de campanhas vive dentro do RevealWrapper,
  // que anima com `transform`. Um ancestral com transform vira bloco de
  // contencao e QUEBRA `position: fixed`: o overlay parava de cobrir a pagina
  // e o deck flutuava no meio do texto. Montar no body resolve na raiz.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={styles.dialog}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          <span aria-hidden="true">&#10005;</span>
        </button>
        <h2 id={titleId} className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
          {campaign.name}
        </h2>
        <div
          ref={deckWrapRef}
          className={styles.deckWrap}
          onPointerDown={() => {
            holdTimer.current = setTimeout(() => setHeld(true), 180)
          }}
          onPointerUp={cancelHold}
          onPointerCancel={cancelHold}
          onPointerLeave={cancelHold}
        >
          <StoryDeck
            items={campaign.frames}
            handle={campaign.client}
            ms={3200}
            nav="dots"
            label={`${label}: ${campaign.name}${description ? `. ${description}` : ''}`}
            playerClassName={styles.modalPlayer}
            paused={held}
          />
          {/* Zonas de toque sobre o quadro, no espirito do Instagram: metade
              direita avanca, metade esquerda volta. `aria-hidden` porque a
              navegacao acessivel de verdade ja existe nos pontos/setas do
              StoryDeck (role="tablist" + botoes rotulados); isto e so um
              atalho de gesto para quem usa mouse ou touch. */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className={`${styles.tapZone} ${styles.tapPrev}`}
            onClick={() => {
              if (!held) tap('Peça anterior')
            }}
          />
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className={`${styles.tapZone} ${styles.tapNext}`}
            onClick={() => {
              if (!held) tap('Próxima peça')
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}
