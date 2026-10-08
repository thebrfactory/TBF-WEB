# 03: Performance Report
## TBF WEB 2026: Core Web Vitals · SEO Técnico · Otimizações Implementadas

> Relatório de análise das otimizações implementadas na Fase 06, Frontend

---

## 1. Core Web Vitals: Checklist

### LCP (Largest Contentful Paint): Meta: < 2.5s

| Otimização | Status | Implementação |
|------------|--------|---------------|
| Hero image com `priority` prop | ✅ | `/editorial/[slug]`: `<Image priority />` |
| `next/image` com `sizes` corretos | ✅ | ArticleCard, hero do artigo |
| Fontes com `display: swap` | ✅ | `layout.tsx`: Plus Jakarta Sans + Lora |
| Preconnect para fonts.googleapis.com | ✅ | `<head>` no layout root |
| Hero sem media video no SSR (sem blocking) | ✅ | Hero é background CSS, não `<video>` bloqueante |
| ISR, páginas pre-renderizadas | ✅ | `export const revalidate = 3600` em todas as páginas |

### FID / INP (Interaction to Next Paint): Meta: < 200ms

| Otimização | Status | Implementação |
|------------|--------|---------------|
| Componentes interativos isolados como Client Components | ✅ | EditorialGrid, AccessForm, CollectiveForm, Navigation |
| Server Components por padrão (zero JS desnecessário) | ✅ | Todas as pages são Server Components |
| Transitions CSS puras (sem JS) | ✅ | Ticker, reveal animations, page transitions |
| Form submit assíncrono sem bloquear UI | ✅ | fetch() com loading state |
| `passive: true` em event listeners de scroll | ✅ | Navigation.tsx |

### CLS (Cumulative Layout Shift): Meta: < 0.1

| Otimização | Status | Implementação |
|------------|--------|---------------|
| `width` e `height` explícitos em todas as imagens | ✅ | `<Image>` com dimensões sempre presentes |
| `aspect-ratio` nos containers de imagem | ✅ | `.card__image-wrapper`, `.video-embed` |
| Fontes com `size-adjust` via `display: swap` | ✅ | next/font configurado |
| Sem inserção dinâmica de conteúdo acima do fold | ✅ | Loading screen é overlay, não empurra conteúdo |

---

## 2. SEO Técnico: Checklist

### Metadata

| Item | Status | Implementação |
|------|--------|---------------|
| `<title>` único por página | ✅ | `export const metadata` ou `generateMetadata` em todas as páginas |
| `<meta description>` único por página (max 160) | ✅ | Todas as páginas |
| OG image por página | ✅ | `/opengraph-image.tsx` + imagens específicas por página |
| OG image dinâmica para artigos | ✅ | `generateMetadata` usa `post.ogImage` ou `post.heroImage` |
| Twitter Card | ✅ | `layout.tsx` + páginas individuais |
| `<html lang="pt-BR">` | ✅ | `layout.tsx` |
| `canonical` | ✅ | `metadataBase` + URLs absolutas no OG |

### Estrutura

| Item | Status | Implementação |
|------|--------|---------------|
| Hierarquia de headings correta (H1 único por página) | ✅ | Verificado em todas as páginas |
| `aria-label` em seções sem heading visível | ✅ | Seções com `aria-labelledby` ou `aria-label` |
| Skip navigation | ✅ | `layout.tsx`: primeiro elemento do body |
| Sitemap dinâmico | ✅ | `/sitemap.ts`: inclui slugs do Sanity |
| robots.txt | ✅ | `/robots.ts`: noindex em /access e /api/ |
| Structured data (JSON-LD) | ⚠️ Pendente | Implementar em `/editorial/[slug]` para `Article` schema |

### Performance de rede

| Item | Status | Implementação |
|------|--------|---------------|
| ISR com revalidate 3600s | ✅ | Todas as páginas de conteúdo |
| Imagens via Sanity CDN com parâmetros otimizados | ✅ | `urlFor().width().height().fit('crop').auto('format')` |
| `next/image`: lazy loading padrão | ✅ | Apenas hero/LCP tem `priority` |
| CSS sem JavaScript, ticker, animações | ✅ | CSS animation-timeline, keyframes puros |

---

## 3. Acessibilidade: Checklist WCAG AA

| Item | Status | Implementação |
|------|--------|---------------|
| Contraste texto/fundo mínimo 4.5:1 | ✅ | Combinações aprovadas em F04 (ratios 4.7:1 a 17.8:1) |
| Focus ring visível em todos os elementos interativos | ✅ | `*:focus-visible` global + por componente |
| Focus trap no mobile drawer | ✅ | Navigation.tsx, Tab key handling |
| `aria-expanded`, `aria-controls` no burger menu | ✅ | Navigation.tsx |
| `aria-live="polite"` em estados de formulário | ✅ | AccessForm, CollectiveForm |
| `role="alert"` em mensagens de erro | ✅ | Todos os campos com erro |
| `alt` text em todas as imagens | ✅ | `post.heroImage.alt ?? post.title` como fallback |
| Imagens decorativas com `aria-hidden="true"` | ✅ | Grain, glow, scroll indicator |
| Ticker com `aria-hidden="true"` | ✅ | Ticker.tsx |
| `prefers-reduced-motion` respeitado | ✅ | globals.css, todas as animações desabilitadas |
| Labels explícitos em todos os inputs | ✅ | `htmlFor` correspondente ao `id` com `useId()` |

---

## 4. Pendências e Recomendações

### Prioridade alta (pré-launch)

1. **JSON-LD Schema.org** em `/editorial/[slug]`:
   ```tsx
   <script type="application/ld+json">
     { "@type": "Article", "headline": post.title, ... }
   </script>
   ```

2. **Favicon completo**: `favicon.ico`, `favicon-16x16.png`, `apple-touch-icon.png`, `site.webmanifest`: presentes nas referencias do `layout.tsx` mas precisam ser criados como assets reais.

3. **Hero com vídeo Cloudflare**: a homepage está preparada para receber um `<video>` loop no hero (`.hero__media`). Implementar quando o Stream ID estiver disponível.

4. **`SANITY_WEBHOOK_SECRET`**: configurar webhook no Sanity para ISR on-demand, sem ele, mudanças no CMS demoram até 1h para aparecer.

### Prioridade média

5. **`@portabletext/react`**: o package está no `package.json`. Para produção com Portable Text rico (imagens embutidas, video embed, pullquotes), substituir o `renderPortableText` manual de `/editorial/[slug]` pelo `<PortableText>` component do package.

6. **Testes de performance Lighthouse**: rodar após deploy em produção (CDN Vercel/Cloudflare). Meta: LCP < 2.5s, CLS < 0.1, INP < 200ms.

7. **OG images dinâmicas por artigo**: implementar `/api/og` route com `ImageResponse` recebendo `?title=` e `?image=` params para geração server-side.

---

## 5. Stack de Deploy Recomendada

| Serviço | Propósito | Tier gratuito |
|---------|-----------|---------------|
| Vercel | Hosting Next.js + ISR | Sim (Hobby) |
| Sanity.io | CMS headless | Sim (Free) |
| Cloudflare Stream | Vídeos fashion films | Não (pago por uso) |
| Resend | Emails de formulário | Sim (100/dia) |
| Cloudflare R2 | Assets estáticos (opcional) | Sim (5GB) |

---

*03_performance_report.md | TBF WEB 2026 | Fase 06, Frontend*
*Gerado por: pages-dev-agent | 2026-06-01*
