'use client'

// GalleryScope: envolve fotos ja renderizadas (server components, next/image)
// e abre o Lightbox ao clicar em qualquer uma que esteja na lista `items`.
// Delegacao de clique: nao mexe nos componentes das fotos. A foto clicada e
// achada pelo src original (le o parametro `url` do /_next/image). Foto fora
// da lista (capa, avatar) passa batida.

import { useCallback, useEffect, useRef, useState } from 'react'
import { Lightbox, type LightboxItem } from './Lightbox'
import styles from './GalleryScope.module.css'

function originalSrc(img: HTMLImageElement): string {
  const raw = img.currentSrc || img.src
  try {
    const u = new URL(raw, window.location.origin)
    if (u.pathname.startsWith('/_next/image')) return u.searchParams.get('url') ?? u.pathname
    return u.pathname
  } catch {
    return raw
  }
}

export function GalleryScope({
  items,
  children,
  labels,
}: {
  items: LightboxItem[]
  children: React.ReactNode
  labels?: { close: string; prev: string; next: string; dialog: string }
}) {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const indexOf = useCallback(
    (img: HTMLImageElement) => {
      const s = originalSrc(img)
      return items.findIndex((it) => it.src === s)
    },
    [items],
  )

  const onClick = (e: React.MouseEvent) => {
    const img = (e.target as HTMLElement).closest('img')
    if (!img) return
    const i = indexOf(img as HTMLImageElement)
    if (i >= 0) {
      e.preventDefault()
      setOpen(i)
    }
  }

  // Teclado: foto vira botao para quem navega por Tab.
  useEffect(() => {
    const root = ref.current
    if (!root) return
    root.querySelectorAll('img').forEach((img) => {
      if (img.closest('[aria-hidden="true"]') || indexOf(img) < 0) return
      img.setAttribute('tabindex', '0')
      img.setAttribute('role', 'button')
    })
  }, [indexOf, children])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    const t = e.target as HTMLElement
    if (t.tagName !== 'IMG') return
    const i = indexOf(t as HTMLImageElement)
    if (i >= 0) {
      e.preventDefault()
      setOpen(i)
    }
  }

  return (
    <div ref={ref} className={styles.scope} onClick={onClick} onKeyDown={onKeyDown}>
      {children}
      {open !== null && (
        <Lightbox
          items={items}
          index={open}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
          labels={labels}
        />
      )}
    </div>
  )
}
