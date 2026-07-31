'use client'

// =============================================================================
// ARTICLE MORPH LINK — abrir uma matéria entrando PELA foto
//
// Referência de sensação: Pinterest e cosmos.so. Você clica na imagem e ela não
// pisca para outra página: cresce, ocupa o espaço da capa da matéria, e o resto
// do layout aparece por trás dela. A imagem é o fio que costura as duas páginas.
//
// Como funciona aqui: no clique, a caixa da capa do card recebe um
// `view-transition-name`. A capa da matéria de destino tem o MESMO nome (classe
// .article-morph-target). O browser reconhece os dois como o mesmo objeto e
// interpola posição, tamanho e recorte entre eles — nós não animamos nada à mão.
// Se a matéria não tiver capa, não há par: aí a própria imagem cresce e dissolve
// sobre a página nova (::view-transition-old em components.css), que é a mesma
// sensação.
//
// O elemento marcado é a CAIXA da capa (`[data-morph]`), não a <img> dentro dela:
// card sem capa mostra o selo de dimensão em vez de imagem, e mesmo esse card
// precisa abrir com a transição. A <img> só entra como plano B.
//
// O nome é EXCLUSIVO na página: dois elementos com o mesmo view-transition-name
// invalidam a transição inteira. Por isso ele é aplicado só no elemento clicado
// e removido assim que a transição acaba.
//
// Degrada em silêncio: sem suporte do browser, ou com "reduzir movimento"
// ligado, ou em clique de nova aba (cmd/ctrl/shift/botão do meio), o componente
// não intercepta nada e o <Link> do Next faz o trabalho de sempre.
// =============================================================================

import { useRef, type MouseEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ARTICLE_MORPH_NAME, awaitNavigation, canMorph } from '@/lib/viewTransition'

interface Props {
  href: string
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
  children: ReactNode
}

export function ArticleMorphLink({ href, children, ...rest }: Props) {
  const router = useRouter()
  const ref = useRef<HTMLAnchorElement>(null)

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Clique que o usuário quer em outra aba/janela não é nosso.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    if (!canMorph()) return

    const cover = ref.current?.querySelector<HTMLElement>('[data-morph]')
      ?? ref.current?.querySelector<HTMLElement>('img')
    if (!cover) return

    e.preventDefault()

    cover.style.viewTransitionName = ARTICLE_MORPH_NAME

    // Sinaliza para o CSS que ESTA navegação é a de abrir matéria: só nela o
    // fundo recua e desfoca em vez de deslizar (o page-exit/page-enter padrão
    // continua valendo em todo o resto do site).
    document.documentElement.setAttribute('data-morphing', '')

    const transition = document.startViewTransition(() => {
      router.push(href)
      return awaitNavigation()
    })

    // Limpa nos dois desfechos (concluída ou abortada). Deixar o nome para trás
    // envenena a PRÓXIMA transição: o card volta a existir no cache do App
    // Router e o nome ficaria duplicado com o da capa da matéria.
    const release = () => {
      cover.style.viewTransitionName = ''
      document.documentElement.removeAttribute('data-morphing')
    }
    transition.finished.then(release, release)
  }

  return (
    <Link ref={ref} href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
