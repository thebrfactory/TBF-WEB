'use client'

// Link de post/reel do Instagram usado no PhotoCarousel (que e componente de
// SERVIDOR, ver comentario em PhotoCarousel.tsx). Este arquivo e o UNICO
// pedaco de cliente da cadeia: renderiza o MESMO <a href> do SSR (sem
// mismatch de hidratacao, o texto e o atributo href nao mudam), e so ganha
// comportamento extra depois de hidratado, no onClick.
//
// Fora do navegador in-app do Instagram: link normal, https de sempre, nada
// muda. DENTRO do navegador in-app do Instagram (o bug relatado pelo
// fundador em 2026-09-21): tenta abrir o reel no APP nativo, com fallback
// automatico pro https se o app nao responder. Ver src/lib/instagram.ts pra
// pesquisa e fontes.
import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { isInstagramInAppBrowser, smartOpenInstagram } from '@/lib/instagram'

type Props = AnchorHTMLAttributes<HTMLAnchorElement>

export function InstagramLink({ href, onClick, ...rest }: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented || !href) return
    if (!isInstagramInAppBrowser()) return // fora do in-app browser, segue o link normal
    event.preventDefault()
    smartOpenInstagram(href)
  }

  return <a href={href} onClick={handleClick} {...rest} />
}
