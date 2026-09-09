// =============================================================================
// ROTAS DO RODAPÉ — quem abre em nova guia
// -----------------------------------------------------------------------------
// Pedido do fundador (#01 CHANGES 2026-08-14): "qualquer clique no site para
// links de páginas que se encontram no rodapé sejam direcionados para uma nova
// guia". Ele chegou nisso pelo popup de cookies, onde a Política de Privacidade
// já abria em guia nova, e quis a mesma regra no site inteiro.
//
// GOVERNANÇA COMO CÓDIGO (regra 6 do ecossistema). A regra depende de uma lista
// de rotas, e lista copiada apodrece: bastaria alguém acrescentar um link ao
// rodapé e esquecer daqui para a regra passar a valer para 20 páginas de 21, em
// silêncio.
//
// Por isso a lista NÃO é uma cópia. `FOOTER_COLUMNS` abaixo é a estrutura que o
// próprio `Footer.tsx` renderiza — ele importa daqui — e `FOOTER_ROUTES` é
// DERIVADA dela. Acrescentar um link ao rodapé passa a ser a mesma edição que o
// faz abrir em guia nova. Não há como as duas coisas divergirem.
//
// COMO USAR: `<TbfLink>` no lugar de `<Link>` (ver o componente). Ele consulta
// `opensInNewTab()` e resolve sozinho, então nenhum call site precisa saber
// quais rotas são de rodapé.
//
// 🔴 UMA EXCEÇÃO, E ELA É DELIBERADA: a navegação principal do topo
// (`Navigation.tsx`) continua abrindo na MESMA guia. MAGAZINE aponta para
// /editorial, que é uma rota de rodapé — aplicar a regra ali faria o menu
// principal do site abrir guia nova a cada clique, que não é navegação, é
// vazamento. Para mudar isso basta trocar `<Link>` por `<TbfLink>` no
// Navigation; nada mais precisa ser tocado.
// =============================================================================

import type { shell } from '@/content/i18n/shell'

/**
 * AS TRÊS COLUNAS DO RODAPÉ. Estrutura, não cópia: é isto que o `Footer.tsx`
 * percorre para desenhar.
 *
 * `headingKey`/`linkKey` apontam para `shell.footer` — o rótulo vem do
 * dicionário de idioma, o href fica cru aqui e passa por `localizedPath()` na
 * hora de renderizar.
 */
export const FOOTER_COLUMNS = [
  {
    headingKey: 'pages',
    links: [
      { href: '/editorial', linkKey: 'magazine' },
      { href: '/labels', linkKey: 'labels' },
      { href: '/manifesto', linkKey: 'manifesto' },
      { href: '/collective', linkKey: 'collective' },
      { href: '/access', linkKey: 'access' },
      // Um link só para o índice de pitches (pedido do fundador 2026-09-09).
      // /pitch passou a ser a página que classifica TODOS os decks (1.0, 2.0,
      // 3.0 e os endereçados a empresa, como o da Overlens): o rodapé não
      // precisa mais listar cada deck, listar o índice já entrega os três.
      { href: '/pitch', linkKey: 'pitch' },
    ],
  },
  {
    headingKey: 'company',
    links: [
      { href: '/consulting', linkKey: 'consulting' },
      { href: '/press', linkKey: 'press' },
      { href: '/about', linkKey: 'about' },
      { href: '/about/quick-facts', linkKey: 'quickFacts' },
      { href: '/press/media', linkKey: 'media' },
      { href: '/creators/tavaristico', linkKey: 'founders' },
      { href: '/careers', linkKey: 'careers' },
      { href: '/publishing', linkKey: 'publishing' },
    ],
  },
  {
    headingKey: 'legal',
    links: [
      { href: '/legal/terms', linkKey: 'terms' },
      { href: '/legal/privacy', linkKey: 'privacy' },
      { href: '/legal/conduct', linkKey: 'conduct' },
      { href: '/legal/law-enforcement', linkKey: 'lawEnforcement' },
    ],
  },
] as const satisfies readonly {
  headingKey: 'pages' | 'company' | 'legal'
  links: readonly { href: string; linkKey: keyof typeof shell.en.footer.links }[]
}[]

/**
 * As rotas listadas no rodapé. DERIVADA das colunas acima — nunca escrita à mão.
 * Sempre o caminho CRU, sem prefixo de idioma: `localizedPath()` entra depois.
 */
export const FOOTER_ROUTES: readonly string[] = FOOTER_COLUMNS.flatMap((col) =>
  col.links.map((link) => link.href)
)

/**
 * O href aponta para uma página que está no rodapé?
 *
 * Aceita o caminho cru (`/legal/privacy`), o já localizado (`/pt/legal/privacy`)
 * e o que carrega query ou âncora (`/access?intent=tgf`) — os três aparecem no
 * código de verdade, e a regra tem de valer para os três.
 *
 * 🔴 IGUALDADE EXATA, e a decisão importa. A regra é sobre "páginas que se
 * encontram no rodapé" — e uma MATÉRIA não se encontra no rodapé; o que se
 * encontra lá é o /editorial. Se filhas contassem, todo card de matéria da
 * revista e toda peça do portfólio do TAVARÍSTICO abririam guia nova, e a
 * navegação de leitura do site viraria uma pilha de abas. Pior: o card de
 * matéria não é um link comum, é o `ArticleMorphLink`, que faz a capa da revista
 * VIRAR o topo da matéria numa transição de vista — em guia nova essa transição
 * simplesmente não existe.
 *
 * As sub-rotas que de fato precisam da regra já estão na lista acima, uma a uma,
 * porque o rodapé lista cada uma delas: /about/quick-facts, /press/media.
 *
 * URL absoluta, mailto e tel não são rota deste site: devolve `false` e quem
 * chama trata o alvo como já trata hoje.
 */
export function opensInNewTab(href: string): boolean {
  if (!href.startsWith('/')) return false

  // Corta query e âncora, e depois o prefixo de idioma.
  const path = href.split(/[?#]/)[0].replace(/^\/pt(?=\/|$)/, '') || '/'

  return FOOTER_ROUTES.includes(path)
}
