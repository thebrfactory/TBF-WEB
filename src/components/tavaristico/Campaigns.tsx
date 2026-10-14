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
// em _data.ts, hoje com uma unica entrada real (DEZOITÔ). O componente e
// generico para qualquer tamanho de lista: grade de circulos lado a lado,
// rolagem horizontal se nao couber.
//
// EXTRACAO (09/09/2026): o circulo e o popup viraram StoryRing e StoryModal,
// componentes proprios e genericos (sem nocao de "campanha"). Este arquivo so
// cuida do que e especifico daqui: a lista, o estado de visto e a montagem do
// aria-label/label a partir do dado da campanha.
// =============================================================================

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Campaign } from '@/app/(en)/creators/tavaristico/_data'
import type { Lang } from '@/lib/i18n'
import { StoryRing } from './StoryRing'
import { StoryPlayer, type StoryGroup } from '@/components/StoryPlayer/StoryPlayer'
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
  caseLabel: _caseLabel,
  inviteLabel = 'Tap to open the project',
}: {
  campaigns: Campaign[]
  lang: Lang
  label: string
  /** Mantida por compatibilidade de chamada (o titulo com o convite passou
   * para o view). Sem uso interno aqui. */
  caseLabel: string
  /** Convite perto do circulo. String vazia = sem convite nenhum, sem
   * espaco reservado para ele (o titulo com o convite passou para o view). */
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
  const description = active ? (lang === 'pt' ? active.descriptionPT : active.descriptionEN) : ''
  const modalLabel = active
    ? `${label}: ${active.name}${description ? `. ${description}` : ''}`
    : ''

  // Mesma escolha de idioma do overlay que o SelectedWork faz (pedido do
  // fundador 10/09/2026: "PT/EN de tudo, inclusive stories").
  // Todas as campanhas viram stories vizinhos no desktop (layout padrão).
  const groups: StoryGroup[] = campaigns.map((c) => ({
    id: c.index,
    handle: c.client,
    avatarSrc: c.cover ?? c.frames[0]?.src,
    items: c.frames.map((f) => ({
      ...f,
      overlay: f.overlay
        ? {
            title: lang === 'pt' ? f.overlay.titlePT : f.overlay.titleEN,
            kicker: lang === 'pt' ? f.overlay.kickerPT : f.overlay.kickerEN,
          }
        : undefined,
    })),
  }))

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
      {campaigns.map((c) => {
        const isSeen = !!seen[c.index]
        const cover = c.frames[0]
        const ariaLabel = inviteLabel ? `${inviteLabel}: ${c.name}` : c.name
        return (
          <div key={c.index} className={styles.item}>
            <StoryRing
              cover={c.cover ?? cover?.src ?? ''}
              alt=""
              seen={isSeen}
              ariaLabel={ariaLabel}
              onClick={() => open(c.index)}
              buttonRef={(el) => {
                triggerRefs.current[c.index] = el
              }}
            />
            <span className={styles.name}>{c.name}</span>
          </div>
        )
      })}
      </div>
      {/* Sem convite (string vazia): nem o texto, nem o espaco dele. Repetir
          o span vazio deixava uma margem morta acima. */}
      {inviteLabel ? (
        <span className={styles.invite} aria-hidden="true">
          {inviteLabel}
        </span>
      ) : null}

      {active ? (
        <StoryPlayer
          groups={groups}
          startGroup={campaigns.indexOf(active)}
          lang={lang}
          label={modalLabel}
          onClose={close}
        />
      ) : null}
    </div>
  )
}
