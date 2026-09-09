// =============================================================================
// STORY MODAL: o CampaignModal de hoje, extraido e generico (09/09/2026).
// Quem chama entra so com frames/handle/label: nenhuma nocao de "campanha" ou
// de i18n mora aqui, e por isso outro consumidor pode abrir o mesmo popup
// sobre outro conteudo sem duplicar portal, trava de scroll, foco ou gesto.
// =============================================================================

'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { StoryDeck, type StoryItem } from '@/components/StoryPlayer/StoryPlayer'
import styles from './StoryModal.module.css'

export function StoryModal({
  frames,
  handle,
  label,
  onClose,
}: {
  frames: StoryItem[]
  handle: string
  label: string
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

  // Toque na metade direita avanca, toque na metade esquerda volta: o
  // StoryDeck ja tem os botoes "Peca anterior" / "Proxima peca" (as setas
  // discretas nas bordas do quadro), so nao ocupam a tela toda. Em vez de
  // duplicar a logica de indice aqui (o `i`/`ir` sao internos do StoryDeck,
  // fora do escopo editavel), a zona de toque aciona o mesmo botao real por
  // aria-label. Reusa o componente em vez de reescrever o que ele ja faz.
  const tap = useCallback((btnLabel: 'Peça anterior' | 'Próxima peça') => {
    const btn = deckWrapRef.current?.querySelector<HTMLButtonElement>(
      `button[aria-label="${btnLabel}"]`
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

  // 🔴 PORTAL OBRIGATORIO. Quem chama pode viver dentro de um wrapper que
  // anima com `transform` (ex.: RevealWrapper). Um ancestral com transform
  // vira bloco de contencao e QUEBRA `position: fixed`: o overlay para de
  // cobrir a pagina e o deck flutua no meio do texto. Montar no body resolve
  // na raiz, sempre.
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
        <h2 id={titleId} className="sr-only">
          {label}
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
            items={frames}
            handle={handle}
            ms={3200}
            nav="dots"
            label={label}
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
          {/* X DENTRO DO QUADRO, igual ao Instagram (correcao do fundador
              09/09/2026 em cima de print: o (X) estava fora, flutuando acima
              do quadro). Fica no MESMO invólucro das zonas de toque, que tem
              exatamente a largura do quadro (ver StoryModal.module.css), por
              isso "right: 0" aqui cai na quina certa em vez de na quina do
              dialog (que pode ser mais largo). z-index acima das zonas de
              toque e da barra de tempo, senao o clique cairia nelas. Sem
              fundo: so o glifo branco com sombra sutil, area de toque de
              44px, o mesmo tratamento discreto do story real. */}
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
          >
            <span aria-hidden="true">&#10005;</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
