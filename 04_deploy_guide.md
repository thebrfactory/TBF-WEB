# 04 — Deploy Guide
## TBF WEB 2026 — thebrfactory.com
### Do código ao ar: o manual completo de deploy

> Produzido por: ORCHESTRATOR (F08 — direct)
> Depende de: F07 QA Final APROVADO (qa/laudos/f07_final.md — 13/13 PASS)
> Data: 2026-06-01
> Alvo: thebrfactory.com via Vercel → Cloudflare Pages (migração recomendada após 3–6 meses)

---

## 1. PRÉ-DEPLOY CHECKLIST

Antes de executar qualquer passo de deploy, valide cada item desta lista:

### 1.1 Código

- [ ] `npm run build` executa sem erros localmente
- [ ] `npm run type-check` (tsc --noEmit) retorna sem erros TypeScript
- [ ] `npm run lint` retorna sem erros ESLint críticos
- [ ] Todos os 10 `page.tsx` existem (verificar contra `01_sitemap.md`)
- [ ] `src/app/sitemap.ts` e `src/app/robots.ts` presentes
- [ ] `src/app/opengraph-image.tsx` presente
- [ ] Nenhum `console.log` de debug no código de produção
- [ ] Nenhuma variável de ambiente real commitada no repositório (`.env.local` no `.gitignore`)

### 1.2 Assets obrigatórios pré-deploy

Estes arquivos NÃO estão no repositório e precisam ser criados manualmente antes do deploy:

- [ ] `/public/favicon.ico` — favicon principal (32×32, formato ICO)
- [ ] `/public/favicon-16x16.png` — (16×16 PNG)
- [ ] `/public/favicon-32x32.png` — (32×32 PNG)
- [ ] `/public/apple-touch-icon.png` — (180×180 PNG)
- [ ] `/public/site.webmanifest` — manifest para PWA básico
- [ ] `/public/og-default.jpg` — imagem Open Graph padrão (1200×630, fundo Obsidiana `#0D0C0B`, logotipo TBF em Pergaminho)
- [ ] `/public/og-factory.jpg` — OG específica para /factory (1200×630, tema inverse — fundo Pergaminho)

**Referência visual para favicons e OG:** usar a identidade visual definida em `design/01_visual_identity.md` — paleta Obsidiana + Pergaminho + Âmbar Exposto. Nunca usar fundo branco puro (`#FFFFFF`) ou preto puro (`#000000`).

**Ferramenta recomendada para gerar favicons:** [realfavicongenerator.net](https://realfavicongenerator.net) — upload de SVG ou PNG em alta resolução, gera todos os formatos.

**Conteúdo do `site.webmanifest`:**
```json
{
  "name": ".THE BRAZILIAN FACTORY.",
  "short_name": ".TBF.",
  "icons": [
    { "src": "/favicon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/favicon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#0D0C0B",
  "background_color": "#0D0C0B",
  "display": "standalone"
}
```

### 1.3 Conteúdo mínimo no Sanity (para primeiro deploy não ficar vazio)

- [ ] 1 documento `siteSettings` publicado (tickerText, siteTitle, collectiveApplicationOpen)
- [ ] 1 artigo editorial publicado (status: "published", featured: true) — para homepage não ficar em estado de fallback
- [ ] 1 programa TGF publicado (para /factory não ficar vazio)

Sem estes dados, o site funciona via fallbacks estáticos, mas a experiência é incompleta.

---

## 2. VARIÁVEIS DE AMBIENTE

### 2.1 Variáveis obrigatórias

| Variável | Descrição | Onde obter |
|----------|-----------|-----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID do projeto Sanity | [sanity.io/manage](https://sanity.io/manage) → selecionar projeto → URL: `manage.sanity.io/projects/<ID>` |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset do Sanity | Usar `production` para produção, `staging` para testes |
| `SANITY_API_TOKEN` | Token de leitura do Sanity (para ISR e SSR) | Sanity Manage → Settings → API → Tokens → Create Token → Permission: **Viewer** |
| `RESEND_API_KEY` | Chave da API do Resend para emails transacionais | [resend.com](https://resend.com) → API Keys → Create API Key → Nome: `tbf-production` |
| `CONTACT_EMAIL` | E-mail que recebe os formulários de /access e /collective | `thebrazilianfactory@gmail.com` (ou criar endereço dedicado `contato@thebrfactory.com`) |

### 2.2 Variáveis recomendadas para produção

| Variável | Descrição | Onde obter |
|----------|-----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL canônica do site (para metadata absolutas) | Valor: `https://thebrfactory.com` |
| `SANITY_WEBHOOK_SECRET` | Secret para validar webhooks Sanity → ISR on-demand | Gerar com: `openssl rand -hex 32` (qualquer terminal) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Domínio para analytics Plausible | `thebrfactory.com` (após configurar conta no Plausible) |

### 2.3 Configuração no Vercel

No Vercel Dashboard → Project → Settings → Environment Variables:

1. Adicionar cada variável da tabela 2.1 com scope **Production**
2. Para variáveis `NEXT_PUBLIC_*`: scope **Production + Preview + Development**
3. Para `SANITY_API_TOKEN` e `RESEND_API_KEY`: scope **Production** apenas (segurança)
4. Para `CONTACT_EMAIL`: scope **Production** (não expor em Preview)

**Importante:** Variáveis `NEXT_PUBLIC_*` são expostas no bundle do browser. Nunca usar `NEXT_PUBLIC_` para tokens secretos.

---

## 3. SETUP SANITY

### 3.1 Criar projeto Sanity

```bash
# Na raiz do repositório ou em frontend/
npx sanity@latest init --project-id <novo-id>

# Ou via Sanity Manage (sem CLI):
# 1. Acessar sanity.io/manage
# 2. New Project → "tbf-web-2026"
# 3. Dataset: "production"
# 4. Anotar o Project ID gerado
```

### 3.2 Configurar o Sanity Studio

O Studio está configurado em `frontend/sanity.config.ts`. Verificar se o `projectId` e `dataset` estão corretos (devem vir de variáveis de ambiente em produção):

```bash
# Rodar o Studio localmente para validar
cd frontend
npx sanity dev
# → http://localhost:3333
```

### 3.3 Publicar os schemas no Sanity Cloud

```bash
# Deploy do Studio para o Sanity Cloud (subdomínio automático)
cd frontend
npx sanity deploy

# Ou configurar Studio como rota interna no Next.js:
# O Studio fica em: thebrfactory.com/studio
# (já configurado em sanity.config.ts se presente)
```

**Recomendação:** usar subdomínio separado `studio.thebrfactory.com` via Sanity Cloud para manter o domínio principal limpo. Configurar CNAME no DNS para apontar ao domínio gerado pelo Sanity.

### 3.4 Criar o primeiro conteúdo

Acessar o Studio e criar, nesta ordem:

1. **Site Settings** (singleton):
   - Titulo: `.THE BRAZILIAN FACTORY.`
   - Ticker text: `.THE BRAZILIAN FACTORY. · COLLECTIVE HOTEL CASINO · ONLY FOR ARTISTS & CHANGEMAKERS · EST. 2025 ·`
   - Candidaturas ao Coletivo: conforme decisão do momento

2. **Primeiro artigo editorial** (`editorialPost`):
   - Status: `published`
   - Featured: `true` (aparece em destaque na homepage)
   - Categoria: `editorial`
   - BU: `tbf`

3. **Primeiro programa TGF** (`tgfProgram`):
   - Active: `true`
   - Ordem: `1`
   - CTA URL: link do Calendly ou Cal.com configurado

### 3.5 Configurar o webhook para ISR on-demand (opcional mas recomendado)

No Sanity Manage → API → Webhooks → Create Webhook:

```
URL: https://thebrfactory.com/api/revalidate
Method: POST
Trigger on: Create, Update, Delete
Dataset: production
Secret: <valor do SANITY_WEBHOOK_SECRET>
HTTP Headers: Content-Type: application/json
```

Nota: O route handler `/api/revalidate` deve ser implementado pré-produção para aceitar este webhook. Está referenciado na arquitetura (`01_sitemap.md` §04) mas não foi implementado na F06 — pendência pré-launch de alta prioridade.

**Implementação básica do route handler:**

```typescript
// frontend/src/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('sanity-webhook-secret')
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  revalidatePath('/', 'layout')
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
```

---

## 4. DEPLOY NO VERCEL

### 4.1 Conectar repositório

1. Acessar [vercel.com](https://vercel.com) → Add New Project
2. Importar o repositório Git (GitHub/GitLab/Bitbucket)
3. **Root Directory:** definir como `frontend/` (o código Next.js não está na raiz do repo)
4. Framework Preset: Next.js (detectado automaticamente)
5. Build Command: `npm run build` (padrão)
6. Output Directory: `.next` (padrão)
7. Install Command: `npm install` (padrão)

### 4.2 Configurar variáveis de ambiente no Vercel

Antes de fazer o primeiro deploy, adicionar todas as variáveis do **Seção 2** no painel do Vercel:

Dashboard → Project → Settings → Environment Variables → Add

### 4.3 Primeiro deploy

```bash
# Via CLI Vercel (opcional)
npm install -g vercel
cd frontend
vercel --prod

# Ou via Vercel Dashboard:
# Push para branch main → deploy automático disparado
```

### 4.4 Verificar o deploy

Após o deploy, verificar:

- [ ] Acessar a URL de preview gerada pelo Vercel (ex: `tbf-web-2026-xxxx.vercel.app`)
- [ ] Homepage carrega sem erro 500
- [ ] Navigation e Footer presentes
- [ ] Ticker animado funcional
- [ ] `/editorial` carrega (pode estar vazia se não há conteúdo no Sanity)
- [ ] `/factory` carrega com tema inverse (fundo claro)
- [ ] `/manifesto` carrega com scrollytelling
- [ ] `/access` carrega (noindex — não precisa de conteúdo Sanity)
- [ ] Formulário de `/access` submete e exibe estado de sucesso
- [ ] Console do browser sem erros críticos

### 4.5 Configurar domínio customizado

No Vercel Dashboard → Project → Settings → Domains:

1. Adicionar `thebrfactory.com`
2. Adicionar `www.thebrfactory.com` (Vercel sugere automaticamente)
3. Vercel exibe os registros DNS necessários (Seção 5)
4. Aguardar propagação DNS (geralmente 5–30 minutos com Cloudflare)

---

## 5. DNS — Configuração do domínio thebrfactory.com

### 5.1 Assumindo DNS gerenciado no Cloudflare (recomendado)

Acessar Cloudflare Dashboard → thebrfactory.com → DNS → Records:

| Tipo | Nome | Conteúdo | Proxy | TTL |
|------|------|---------|-------|-----|
| `A` | `@` (raiz) | `76.76.21.21` (IP do Vercel) | Sim (laranja) | Auto |
| `CNAME` | `www` | `cname.vercel-dns.com` | Sim (laranja) | Auto |
| `CNAME` | `studio` | `<subdomínio-gerado>.sanity.studio` | Sim | Auto |

**Nota sobre proxy Cloudflare:** manter o proxy ativo (ícone laranja) para aproveitar CDN e proteção DDoS do Cloudflare. O Vercel funciona corretamente com proxy Cloudflare ativo.

**Verificar os IPs exatos no Vercel:** Dashboard → Project → Settings → Domains → thebrfactory.com → o Vercel exibe os registros DNS exatos para aquele projeto.

### 5.2 Verificar SSL

Com Cloudflare como proxy:
- SSL/TLS Mode: **Full (strict)** — garante HTTPS ponta a ponta
- Always Use HTTPS: **On**
- Minimum TLS Version: **TLS 1.2**

O certificado é gerenciado automaticamente pelo Cloudflare + Vercel.

### 5.3 Redirect www → raiz

No Vercel ou no Cloudflare, configurar redirect:
`www.thebrfactory.com` → `https://thebrfactory.com` (301 permanente)

No Vercel, isso é configurado automaticamente quando você adiciona `www.thebrfactory.com` como domínio alias.

---

## 6. PÓS-DEPLOY: VERIFICAÇÕES ESSENCIAIS

### 6.1 SEO e Metadata

Execute estas verificações depois que o domínio estiver propagado:

```bash
# Verificar sitemap
curl https://thebrfactory.com/sitemap.xml

# Verificar robots.txt
curl https://thebrfactory.com/robots.txt

# Verificar que /access retorna noindex no header
curl -I https://thebrfactory.com/access
# → deve conter: X-Robots-Tag: noindex (se configurado via next.config)
```

**Open Graph Tags — verificação manual:**
- Acessar [opengraph.xyz](https://www.opengraph.xyz) ou [metatags.io](https://metatags.io)
- Testar URL: `https://thebrfactory.com`
- Verificar: título, descrição, imagem OG aparecem corretamente
- Testar também: `/editorial`, `/factory`, `/manifesto`

**Google Search Console:**
1. Acessar [search.google.com/search-console](https://search.google.com/search-console)
2. Adicionar propriedade: `https://thebrfactory.com`
3. Verificar via DNS TXT record (adicionar no Cloudflare)
4. Submeter sitemap: `https://thebrfactory.com/sitemap.xml`

### 6.2 Analytics (Plausible)

**Por que Plausible:** privacy-first, sem cookies, GDPR-compliant, sem banner de cookies necessário. Recomendado em `03_performance_report.md`.

Setup:
1. Criar conta em [plausible.io](https://plausible.io)
2. Adicionar site: `thebrfactory.com`
3. Adicionar ao `layout.tsx`:
```tsx
<Script
  defer
  data-domain="thebrfactory.com"
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
```
4. Verificar no dashboard Plausible após o primeiro visitante

**Alternativa gratuita:** Vercel Analytics (integrado ao dashboard Vercel, zero setup adicional) — útil para primeiros 30 dias antes de decidir sobre Plausible.

### 6.3 Testar formulário /access

1. Acessar `https://thebrfactory.com/access`
2. Preencher e submeter o formulário
3. Verificar: estado de sucesso aparece na UI
4. Verificar: email chegou em `thebrazilianfactory@gmail.com` (ou `CONTACT_EMAIL` configurado)
5. Verificar no Resend Dashboard: email enviado com status `delivered`

Se o email não chegar:
- Verificar que `RESEND_API_KEY` está configurado no Vercel (Seção 2.3)
- Verificar que o domínio remetente está verificado no Resend (Resend → Domains → Verify `thebrfactory.com`)
- Para verificar domínio no Resend: adicionar registros DNS TXT/MX conforme instruções do Resend

### 6.4 Pendências pré-launch identificadas no QA (OB-F01 e OB-F02)

**OB-F01 — JSON-LD Schema.org em `/editorial/[slug]`:**

Implementar antes de indexação significativa. Adicionar em `src/app/editorial/[slug]/page.tsx`:

```tsx
// Após o fetching do artigo, antes do return
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.metaDescription || post.deck,
  image: post.heroImage ? urlFor(post.heroImage).width(1200).url() : undefined,
  datePublished: post.publishedAt,
  author: post.author ? {
    '@type': 'Person',
    name: post.author.name,
  } : {
    '@type': 'Organization',
    name: '.THE BRAZILIAN FACTORY.',
  },
  publisher: {
    '@type': 'Organization',
    name: '.THE BRAZILIAN FACTORY.',
    url: 'https://thebrfactory.com',
  },
}

// No JSX, antes do </> final:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

**OB-F02 — Favicon assets:**

Criar os arquivos listados na Seção 1.2 e colocar em `/frontend/public/`. Commit + push → Vercel fará re-deploy automático.

---

## 7. MANUTENÇÃO — Operação diária

### 7.1 Publicar um novo artigo editorial

1. Acessar o Sanity Studio: `thebrfactory.com/studio` ou `studio.thebrfactory.com`
2. Criar novo documento tipo **Artigo Editorial**
3. Preencher: título (PT), slug (EN), deck, categoria, BU, hero image, corpo do artigo, créditos
4. Status: `published` quando pronto
5. Featured: `true` se deve aparecer em destaque na homepage
6. O artigo aparece automaticamente em até 1 hora (ISR revalidate=3600)
7. Para aparecer imediatamente: usar o webhook Sanity → ISR on-demand (Seção 3.5)

**Checklist editorial pré-publicação:**
- [ ] Alt text preenchido na hero image
- [ ] Deck com no máximo 160 caracteres
- [ ] Slug em inglês, limpo (sem caracteres especiais)
- [ ] Categoria selecionada
- [ ] Créditos completos (fotógrafo, estilista, etc.)
- [ ] Artigos relacionados selecionados (máx. 3)

### 7.2 Atualizar o ticker

1. Sanity Studio → Site Settings
2. Campo "Texto do ticker" — separar itens com ` · `
3. Publicar
4. Aguardar revalidação ISR (até 1h) ou usar webhook

Exemplo:
```
.THE BRAZILIAN FACTORY. · COLLECTIVE HOTEL CASINO · SPFW N59 — NOW STREAMING · ONLY FOR ARTISTS & CHANGEMAKERS · EST. 2025 ·
```

### 7.3 Abrir/fechar candidaturas ao Collective

1. Sanity Studio → Site Settings
2. Campo "Candidaturas ao Coletivo abertas?" → toggle
3. Publicar
4. Efeito imediato após revalidação ISR:
   - Se `true`: formulário de candidatura aparece em `/collective` e CTA "Enter the Collective" aparece em `/editorial/[slug]`
   - Se `false`: formulário não aparece, CTA oculto

### 7.4 Adicionar programa TGF

1. Sanity Studio → Programa TGF → Criar novo
2. Preencher: nome, tagline, descrição, público-alvo, deliverables (máx. 5), pricing (opcional), CTA label, CTA URL (Calendly/Cal.com)
3. Ordem: 1, 2 ou 3 (ordem de exibição na página /factory)
4. Ativo: `true`

### 7.5 Adicionar membro ao Collective

1. Sanity Studio → Membro do Coletivo → Criar novo
2. Preencher: nome, função, BU, bio, retrato (com alt text obrigatório)
3. Featured: `true` para aparecer em `/collective`
4. Status: `active`

---

## 8. MIGRAÇÃO CLOUDFLARE PAGES (recomendada após 3–6 meses)

### 8.1 Por que migrar

Conforme recomendação do `tech-scout-agent` em `research/03_tech_recommendations.md` e `03_performance_report.md`:

| Critério | Vercel | Cloudflare Pages |
|----------|--------|-----------------|
| Edge compute global | CDN padrão (edge em PoPs Vercel) | Edge native em 300+ PoPs globais |
| Custo a escala | Cresce com uso (serverless functions) | Mais previsível para tráfego constante |
| Analytics | Pago acima do free tier | Workers Analytics — incluído |
| Integração com Cloudflare | Via CNAME proxy | Nativa |
| Cold starts | Existentes (serverless) | Mínimos (edge workers) |
| App Router (Next.js) | Suporte completo oficial | Suporte via `@cloudflare/next-on-pages` |

**Recomendação:** começar com Vercel (menor atrito, suporte oficial ao Next.js App Router). Migrar para Cloudflare Pages quando:
- Tráfego > 100k pageviews/mês (custo começa a escalar no Vercel)
- Performance em mercados não-americanos se torna prioridade
- Uso de Cloudflare Workers para funcionalidades adicionais

### 8.2 Quando NÃO migrar ainda

- Nos primeiros 3 meses: foco em conteúdo e trackinr de conversão, não infraestrutura
- Se o time não tem familiaridade com Workers/Pages: a curva de aprendizado não vale agora
- Se o ISR via Vercel está funcionando bem: não consertar o que não está quebrado

### 8.3 Passos para migrar (quando chegar a hora)

**Pré-requisitos:**
```bash
npm install -g wrangler
npm install @cloudflare/next-on-pages
```

**Configurar `wrangler.toml`:**
```toml
name = "tbf-web-2026"
compatibility_date = "2026-06-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"
```

**Build para Cloudflare:**
```bash
npx @cloudflare/next-on-pages
```

**Deploy:**
```bash
wrangler pages deploy .vercel/output/static --project-name tbf-web-2026
```

**Configurar domínio:** Cloudflare Pages Dashboard → Custom Domains → `thebrfactory.com`

**Variáveis de ambiente:** Cloudflare Pages → Settings → Environment Variables (mesmas do Vercel)

**Diferenças funcionais a testar pós-migração:**
- Route handlers (`/api/contact`, `/api/revalidate`) precisam ser compatíveis com Cloudflare Workers runtime
- `next/font` funciona normalmente
- `next/image` requer configuração de Image Resizing no Cloudflare (ou usar `unoptimized: true` como fallback)
- ISR `revalidate` é substituído por Cache-Control no edge — testar comportamento

---

## APÊNDICE — Stack de ferramentas de terceiros

| Ferramenta | Função | Tier inicial | Upgrade quando |
|-----------|--------|-------------|---------------|
| [Sanity.io](https://sanity.io) | CMS headless | Free (200k API requests/mês) | > 200k requests/mês → Growth plan |
| [Vercel](https://vercel.com) | Hosting/Deploy | Hobby (gratuito, sem SLA) | Ao precisar de SLA ou domínio comercial → Pro ($20/mês) |
| [Resend](https://resend.com) | Email transacional | Free (100 emails/dia) | > 100 emails/dia → Pro ($20/mês) |
| [Plausible](https://plausible.io) | Analytics | Trial 30 dias | $9/mês → tracking de até 10k pageviews/mês |
| [Cloudflare](https://cloudflare.com) | DNS + CDN proxy | Free | Quando migrar para Pages (Free tier generoso) |
| [Cal.com](https://cal.com) ou [Calendly](https://calendly.com) | Agendamento /factory | Free (básico) | Ao precisar de integrações avançadas (CRM, pagamentos) |

---

*04_deploy_guide.md | TBF WEB 2026 | Fase 08 — Deploy*
*Produzido por: ORCHESTRATOR (direct) | 2026-06-01*
*Base: qa/laudos/f07_final.md APROVADO — Sistema pronto para launch*
