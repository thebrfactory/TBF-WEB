---
description: Create a new label page for TBF.COM ecosystem (TFD/RUC/TGF pattern)
---

# new-label

Creates a new label institutional page at `src/app/labels/<label-slug>/page.tsx` following the exact structure of existing label pages (TFD, RUC).

## Before starting

1. Confirm the label slug, full name, and handle:
   - Slug: e.g. `thegrowthfactory`
   - Full name: e.g. `.THE GROWTH FACTORY.`
   - Short: e.g. `.TGF.`
   - Instagram: e.g. `@thegrowthfactory`

2. Prepare 2 images via the `image-prep` skill and place in `public/images/<slug>/`:
   - `<slug>-<middle-section>.webp` — "Why it exists" section background (2400×1350)
   - `<slug>-closing.webp` — footer block background (2400×1350)

   O herói **não** usa imagem: roda o `<HeroVideo />` do ecossistema.

3. Add redirect in `next.config.ts` if a vanity route is needed:
   ```ts
   { source: '/<slug>', destination: '/labels/<slug>', permanent: true }
   ```

## Page structure (fixed order)

> Herói reestruturado em 16/07/2026 a pedido do fundador: **a página de label abre igual à
> home** — nome + lockup + tagline sobre o vídeo, ancorados na base. Copie o herói de
> `labels/runwayunited/page.tsx`, que é a referência canônica das três páginas.

1. **HERO** — `<section className="hero hero--label" style={{ width: '100vw' }}>` com
   `<div className="hero__overlay-grain" />`, `<HeroVideo />` (opacidade **padrão**: é ela,
   com o grain, que legibiliza o texto por cima) e o grupo `.hero-label__content`, nesta ordem:
   - H1 `className="hero-label__title"` com o nome completo da label
   - lockup de 3 linhas (`HERO_LOCKUP`): `a.k.a. .X.` / `<Descritor> Label` / `of .THE BRAZILIAN FACTORY.`,
     com as marcas em `B900` (Black — peso mais forte da Brother1816)
   - tagline de 2 linhas (`HERO_TAGLINE`): as 3 palavras da label numa linha + `In Brazilian Bass.`
2. **TICKER** — `<Ticker />` logo depois do herói.
3. **INTRO** — `<section className="section container">` com decks + CTA (sem título: o H1 da
   página é o do herói).
4. **OVERVIEW** — `layout-b`, "What is .X.?" — two paragraphs in Portuguese
5. **WHY IT EXISTS** — full-bleed section with middle image at 45% opacity, two columns: left = manifestos (3 lines) + explanation; right = philosophy headline + body
6. **FOCUS AREAS** — tag cloud of 6–8 focus areas, `border: 1px solid rgba(255,255,255,0.3)`
7. **INSIDE THE COLLECTIVE** — `layout-b`, relationship with .TBF., two paragraphs
8. **FOOTER BLOCK** — full-bleed with closing image at 55% opacity, 3-line manifesto statement + provenance line + CTA

> As sections de fundo cheio (5 e 8) mantêm o gradiente: ali existe texto por cima da imagem,
> e a regra de legibilidade vale igual à do herói.

## CTA button

```tsx
<a href="https://instagram.com/<handle>" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
  @<handle>
  <span className="btn__arrow" aria-hidden="true">→</span>
</a>
```

## Conventions (inherited from new-page)

- `data-theme="inverse"`, `background: #000`, `color: #fff`
- All brand marks in `fontWeight: 800` — exceto as do lockup do herói, que vão em `900` (Black)
- No dividers, no `<hr>`, no `nowrap`
- `layout-b` for two-column sections
- Typography tokens throughout — no hardcoded font sizes except `TITLE_FIT` do H1 (abaixo) e `0.9rem` for subtitle micro

### O H1 do herói: por que é `100cqw ÷ TITLE_FIT`, e não um `clamp`

A home preenche a linha com o **SVG** do logotype, que escala sozinho. Aqui o nome é **texto**,
e texto não escala para caber. Então `.hero-label__content` é um container e o corpo do título
sai de `calc(100cqw / var(--tbf-label-title-fit))`: o nome preenche a linha do grupo em
qualquer viewport, sem quebrar (CLAUDE.md regra 1, mobile-first, e `nowrap` é proibido).

`TITLE_FIT` é a **largura do nome em ems**, medida no browser na Brother1816 ExtraBold com
`ls -0.04em`, mais 1% de folga contra arredondamento. Medidos em 16/07/2026:

| Nome | Medida (em) | `TITLE_FIT` |
|---|---|---|
| `.RUNWAY UNTD COLLECTIVE.` | 13.982 | `14.12` |
| `.THE GROWTH FACTORY.` | 11.842 | `11.96` |
| `.THE FIORE DAILY.` | 8.565 | `8.65` |

**Label nova: meça, não estime.** Renderize o nome a `font-size: 100px` com `letter-spacing:
-0.04em` na ExtraBold, divida a largura por 100, some 1%. Não há valor universal — cada nome
tem o seu, e é isso que faz o título caber sozinho da home ao iPhone.

## After creating the page

- Run dev server (`/run`) and navigate to `/labels/<slug>` to verify
- Add the label to the `/labels` index page if it lists all labels
- Deploy via `/deploy`
