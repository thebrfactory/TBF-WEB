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

> Herói reestruturado em 15/07/2026 a pedido do fundador: **nada de texto sobre o vídeo de
> abertura, e tudo abaixo do letreiro**. Copie o herói de `labels/runwayunited/page.tsx`, que é
> a referência canônica das três páginas.

1. **HERO** — fullscreen, `minHeight: 100dvh`, `aria-hidden="true"`, contendo APENAS
   `<HeroVideo opacity={1} />`. Sem sombreado, sem gradiente, sem texto: o vídeo roda limpo e
   em opacidade cheia justamente porque não há nada por cima para legibilizar.
2. **TICKER** — `<Ticker />` logo depois do herói. Tudo que é texto vive daqui para baixo.
3. **INTRO** — `<section className="section container">` com, nesta ordem:
   - H1 do nome completo da label
   - lockup de 3 linhas (`HERO_LOCKUP`): `a.k.a. .X.` / `<Descritor> Label` / `of .THE BRAZILIAN FACTORY.`,
     com as marcas em `B900` (Black — peso mais forte da Brother1816)
   - tagline de 2 linhas (`HERO_TAGLINE`): as 3 palavras da label numa linha + `In Brazilian Bass.`
   - decks + CTA
4. **OVERVIEW** — `layout-b`, "What is .X.?" — two paragraphs in Portuguese
5. **WHY IT EXISTS** — full-bleed section with middle image at 45% opacity, two columns: left = manifestos (3 lines) + explanation; right = philosophy headline + body
6. **FOCUS AREAS** — tag cloud of 6–8 focus areas, `border: 1px solid rgba(255,255,255,0.3)`
7. **INSIDE THE COLLECTIVE** — `layout-b`, relationship with .TBF., two paragraphs
8. **FOOTER BLOCK** — full-bleed with closing image at 55% opacity, 3-line manifesto statement + provenance line + CTA

> O sombreado sai só do herói (que não tem texto). As sections de fundo cheio (5 e 8) **mantêm**
> o gradiente: ali existe texto por cima da imagem, e a regra de legibilidade continua valendo.

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
- Typography tokens throughout — no hardcoded font sizes except `clamp(1.15rem, 5.7vw, 4.2rem)` for H1 and `0.9rem` for subtitle micro

### Por que o H1 é `clamp(1.15rem, 5.7vw, 4.2rem)`

Não é gosto, é medida: o fundador exige o nome da label **sem quebra de linha no mobile**
(CLAUDE.md regra 1, mobile-first). O nome mais longo hoje (`.RUNWAY UNITED COLLECTIVE.`, 26
caracteres) ocupa ~14,9 × o tamanho da fonte, na Brother1816 ExtraBold com `ls -0.04em`. A 390px
sobram 350px de container ⇒ teto de ~23px. O `4.2rem` no topo respeita o `.section .container`,
que tem `max-width: 1152px` (⇒ 1024px úteis), não os 1440px do herói antigo.

**Ao criar uma label com nome mais longo que `.RUNWAY UNITED COLLECTIVE.`, refaça a conta** —
o clamp não é universal, é calibrado para o pior caso atual.

## After creating the page

- Run dev server (`/run`) and navigate to `/labels/<slug>` to verify
- Add the label to the `/labels` index page if it lists all labels
- Deploy via `/deploy`
