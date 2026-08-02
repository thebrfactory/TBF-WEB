# Como o site fala duas línguas

> Lei desta pasta. Quem for mexer em texto de página, ler isto antes.

## A decisão

O site existe **inteiro em inglês** e **inteiro em português**. O inglês é o
nativo e mora na raiz (`/manifesto`); o português mora sob prefixo
(`/pt/manifesto`). Quem chega cai **sempre em inglês** — não há redirecionamento
por idioma do navegador. O brasileiro troca pela pílula do topo, e a escolha é
lembrada.

## O que NÃO fazer

**Não duplicar páginas.** Duas cópias de cada página cobram para sempre: toda
mudança teria de ser feita duas vezes e, no dia em que alguém esquecer uma, as
versões divergem em silêncio. Existe **uma** página por rota.

## A forma

Três peças por rota:

1. **A página real**, em `src/views/<Nome>View.tsx`. Recebe `lang` e lê o texto
   do dicionário. Nenhuma frase escrita direto na marcação. Ela sai de dentro de
   `app/` porque as duas rotas precisam da MESMA página com metadados
   diferentes, e `metadata` é declarado por arquivo de rota.
2. **O dicionário**, em `src/content/i18n/pages/<rota>.ts`, exportando
   `{ en: {...}, pt: {...} }` com **exatamente as mesmas chaves** nos dois.
3. **As duas cascas**: `src/app/(en)/<rota>/page.tsx` e
   `src/app/(pt)/pt/<rota>/page.tsx`. Cada uma declara os metadados no seu
   idioma e renderiza a view com o `lang` certo. Cinco linhas de corpo.

## Regras duras

- **Chaves iguais nos dois idiomas.** O tipo do dicionário é derivado do inglês,
  então uma chave faltando no português quebra o `type-check` — de propósito.
- **Todo link interno passa por `localizedPath()`.** Um `href="/about"` cru leva
  o leitor de português de volta ao site em inglês, sem aviso. Em componente de
  servidor use o `lang` recebido; em componente de cliente use `useLang()`.
- **Metadados também são texto**: `title`, `description` e `alternates`
  (hreflang, via `languageAlternates()`) mudam com o idioma.
- **Sem travessão em texto de marca** (regra .TBF.). Rode `/brand-lint` antes de
  entregar.
- **Português do Brasil, não tradução literal.** Texto de marca traduzido é
  texto de marca reescrito: mantenha a intenção e o ritmo, não a sintaxe.
  Nomes próprios, marcas e o `Culture™` não se traduzem.

## O idioma dentro do componente

- Componente de **servidor**: recebe `lang: Lang` por propriedade.
- Componente de **cliente**: `const t = useT()` e `t({ en: '...', pt: '...' })`,
  ou `useLang()` quando precisar do valor cru.

O idioma nunca muda em runtime dentro de uma árvore: trocar de idioma é navegar
para a outra rota. Por isso cada idioma tem seu próprio root layout, e é de lá
que sai o `<html lang>` correto.
