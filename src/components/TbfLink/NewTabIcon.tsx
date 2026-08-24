// =============================================================================
// NewTabIcon · a setinha que avisa "isto abre em outra guia"
// -----------------------------------------------------------------------------
// Pedido do fundador (#01 CHANGES 2026-08-24): "todos os links do site que abrem
// em nova guia tenham esse ícone da setinha, mas padronize para ser um pouco
// menor, e também não precisa colocar em parênteses 'nova guia'".
//
// A SETA SUBSTITUI O AVISO ESCRITO. O popup de newsletter dizia "Política de
// Privacidade ↗ (nova guia)": a seta e o parêntese diziam a mesma coisa, e o
// parêntese ainda por cima ocupava linha. Ficou a seta.
//
// TAMANHO EM `em`, e isso é a padronização: a seta mede uma fração do texto ao
// lado dela, então ela sai igual num link de rodapé de 12px e numa linha de 20px
// sem ninguém escolher pixel nenhum. Antes ela vinha solta no meio da string do
// texto, no corpo inteiro, e era isso que a fazia parecer grande demais.
//
// `aria-hidden`: quem usa leitor de tela não recebe "seta para cima e direita".
// O aviso real de guia nova, para essa pessoa, é o `target="_blank"` do link.
// =============================================================================

export function NewTabIcon() {
  return (
    <span className="newtab-icon" aria-hidden="true">
      ↗
    </span>
  )
}
