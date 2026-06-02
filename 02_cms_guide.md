# 02 — CMS Guide
## TBF WEB 2026 — Como criar e publicar conteúdo no Sanity Studio

> Acesse o Studio em: `thebrfactory.com/studio` (produção) ou `localhost:3000/studio` (dev)

---

## Schemas disponíveis

| Schema | Descrição | Página |
|--------|-----------|--------|
| `editorialPost` | Artigos editoriais | `/editorial`, `/editorial/[slug]`, homepage |
| `melfioreEntry` | The Fiore Daily | `/melfiore` |
| `fashionFilm` | Fashion films RUC | `/runway` |
| `tgfProgram` | Programas TGF | `/factory` |
| `collectiveMember` | Membros do coletivo | `/collective`, créditos |
| `tag` | Tags/categorias | Usado em artigos e Melfiore |
| `siteSettings` | Configurações globais | Header, footer, ticker, flags |

---

## 1. Criar um artigo editorial

1. No Studio → **Editorial Posts** → **Create new**
2. Preencher:
   - **Título (PT)** — obrigatório, máx. 120 caracteres
   - **Slug** — gerado do `titleEn`, edite se necessário
   - **Deck (PT)** — subtítulo editorial, máx. 160 caracteres
   - **Categoria** — `fashion-film` / `editorial` / `manifesto` / `coolhunting` / `collaboration`
   - **BU** — `tbf` / `melfiore` / `ruc` / `tgf`
   - **Hero Image** — obrigatório; adicione `alt`, `caption` e `credit`
   - **Corpo (Body)** — editor rico com suporte a parágrafos, h2, h3, blockquote, imagens
   - **Créditos** — array de `role + name + handle`
   - **Autor** — referência a `collectiveMember`
   - **Tags** — referências a `tag[]`
   - **Data de publicação** — `publishedAt`
3. Alterar **Status** de `draft` → `published`
4. Salvar → conteúdo aparece em produção em até 1h (ISR)

### Para publicar imediatamente (ISR on-demand)

Configure o webhook Sanity → Next.js:
- Endpoint: `https://thebrfactory.com/api/revalidate`
- Secret: `SANITY_WEBHOOK_SECRET` do `.env`

---

## 2. Marcar artigo como destaque (featured)

No artigo → campo **Featured** → ativar.

O artigo featured aparece na posição de destaque (8 colunas) na homepage e no feed editorial.

Apenas 1 artigo featured é exibido na homepage.

---

## 3. Configurar o Ticker

Site Settings → **Ticker Text** → editar o texto do ticker.

Formato recomendado:
```
.THE BRAZILIAN FACTORY. · TEXTO DO MOMENTO · OUTRO PONTO · EST. 2025 ·
```

---

## 4. Controlar candidaturas ao Collective

Site Settings → **Collective Application Open** → toggle.

- `true` → formulário de candidatura visível em `/collective`
- `false` → mensagem "Candidaturas encerradas por ora."

O CTA "Enter the Collective" em `/editorial/[slug]` também é controlado por essa flag.

---

## 5. Criar entrada Melfiore (The Fiore Daily)

1. **Melfiore Entries** → **Create new**
2. Campos:
   - **Title** — máx. 100 caracteres
   - **Entry Type** — `fragment` / `curation` / `collection` / `ritual`
   - **Body** — conteúdo rico
   - **Hero Image** — opcional
   - **Product Name** + **Product Status** + **Product Link** — para itens comercializáveis
3. Se `productStatus = 'available'` + `productLink` preenchido → botão "Acquire" aparece
4. Se `productStatus = 'coming-soon'` → aparece texto "Soon" sem link

---

## 6. Adicionar fashion film (RUC)

1. **Fashion Films** → **Create new**
2. Campos:
   - **Content Type** — `fashion-film` / `backstage` / `collaboration` / `spfw`
   - **Cloudflare Stream ID** — ID do vídeo (não URL YouTube)
   - **Thumbnail Image** — obrigatório, com `alt`
   - **Credits** — array de `role + name + handle + brand`
   - **Featured** — toggle para destaque

---

## 7. Gerenciar programas TGF

1. **TGF Programs** → **Create new** (máx. 3 programas — ordem 1, 2, 3)
2. Campos:
   - **Name** — nome do programa
   - **Tagline** — máx. 120 caracteres
   - **Description** — editor rico
   - **Target Audience** — quem é o público
   - **Deliverables** — lista de entregáveis (máx. 5)
   - **Pricing** — texto de preço (ex: "R$ 3.500/mês")
   - **CTA Label** — texto do botão (vocabulário TBF: "Start the Program")
   - **CTA URL** — link de conversão (Calendly, Cal.com, etc.)
   - **Active** — toggle para exibir/ocultar

---

## 8. Bilinguismo

Todos os schemas têm campos `EN` opcionais (`titleEn`, `deckEn`, `bodyEn`):
- Se preenchido → exibe EN para usuários em locale EN
- Se ausente → exibe PT para todos (bilinguismo orgânico)
- Slugs são sempre em inglês (obrigatório)

---

## Boas práticas

- **Hero Images**: mínimo 1200×630px, preferência 3:2 para artigos featured
- **Alt text**: sempre descritivo — nunca "imagem de moda" ou vazio
- **Slugs**: em inglês, hifenizados, sem caracteres especiais
- **Créditos**: obrigatórios em fashion films e editoriais de moda
- **publishedAt**: use a data real de publicação, não hoje automático

---

*02_cms_guide.md | TBF WEB 2026 | Frontend*
