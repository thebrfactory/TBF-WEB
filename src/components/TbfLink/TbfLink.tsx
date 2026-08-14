// =============================================================================
// TbfLink — o link do site que sabe sozinho quando abrir em guia nova
// -----------------------------------------------------------------------------
// Pedido do fundador (#01 CHANGES 2026-08-14): páginas que estão no rodapé abrem
// em nova guia, em qualquer clique do site.
//
// POR QUE UM COMPONENTE E NÃO UM `target` em cada `<Link>`: a regra é do SITE,
// não de um botão. Espalhada por trinta call sites, ela sobrevive até o próximo
// link que alguém escrever sem lembrar dela. Aqui existe UM lugar que decide, e
// a lista de rotas que alimenta a decisão é conferida contra o rodapé de verdade
// por teste (ver `lib/footer-routes.ts`).
//
// `rel="noopener noreferrer"` sempre que abre guia nova: `noopener` corta o
// acesso da página nova ao `window.opener` da nossa, que é a brecha clássica de
// tabnabbing, e vale mesmo em link para o próprio domínio.
//
// A API é a do `next/link`. Trocar `<Link>` por `<TbfLink>` num call site é uma
// troca de nome, nada mais — inclusive `target` explícito, que continua vencendo
// a regra se alguém precisar dele.
// =============================================================================

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { opensInNewTab } from '@/lib/footer-routes'

type TbfLinkProps = ComponentProps<typeof Link>

export function TbfLink({ href, target, rel, children, ...rest }: TbfLinkProps) {
  // `href` do next/link também aceita objeto de rota. Só o formato string passa
  // pela regra; o objeto segue o comportamento padrão, e hoje não há nenhum no
  // código deste site.
  const novaGuia = typeof href === 'string' && opensInNewTab(href)

  return (
    <Link
      href={href}
      // `target` explícito de quem chama vence a regra, sempre.
      target={target ?? (novaGuia ? '_blank' : undefined)}
      rel={rel ?? (novaGuia ? 'noopener noreferrer' : undefined)}
      {...rest}
    >
      {children}
    </Link>
  )
}
