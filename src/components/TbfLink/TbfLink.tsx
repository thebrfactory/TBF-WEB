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
import { Children, type ComponentProps } from 'react'
import { opensInNewTab } from '@/lib/footer-routes'
import { NewTabIcon } from './NewTabIcon'

type TbfLinkProps = ComponentProps<typeof Link> & {
  /** `false` tira a setinha de guia nova deste link. Ver a nota abaixo. */
  newTabIcon?: boolean
}

export function TbfLink({ href, target, rel, children, newTabIcon, ...rest }: TbfLinkProps) {
  // `href` do next/link também aceita objeto de rota. Só o formato string passa
  // pela regra; o objeto segue o comportamento padrão, e hoje não há nenhum no
  // código deste site.
  const novaGuia = typeof href === 'string' && opensInNewTab(href)

  // A SETINHA (#01 CHANGES 2026-08-24: "todos os links do site que abrem em nova
  // guia tenham esse icone"). Ela nasce aqui pelo mesmo motivo que a regra de
  // guia nova nasce aqui: e regra do SITE. Posta em cada call site, ela viveria
  // ate o proximo link que alguem escrevesse sem lembrar dela.
  //
  // 🔴 SO EM LINK DE TEXTO, e o teste nao e chute: se os filhos do link sao
  // texto puro, ele e uma linha escrita e a seta cabe ao lado da palavra. Se ha
  // um elemento no meio (o logotipo do rodape, um card de obra, uma foto da
  // galeria), o link e uma IMAGEM, e pendurar uma seta na quina de uma foto e
  // sujeira. Quem precisar do contrario passa `newTabIcon`.
  const soTexto = Children.toArray(children).every(
    (filho) => typeof filho === 'string' || typeof filho === 'number',
  )
  const mostraIcone = newTabIcon ?? (novaGuia && soTexto)

  return (
    <Link
      href={href}
      // `target` explícito de quem chama vence a regra, sempre.
      target={target ?? (novaGuia ? '_blank' : undefined)}
      rel={rel ?? (novaGuia ? 'noopener noreferrer' : undefined)}
      {...rest}
    >
      {children}
      {mostraIcone && <NewTabIcon />}
    </Link>
  )
}
