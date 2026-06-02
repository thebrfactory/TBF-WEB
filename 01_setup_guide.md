# 01 — Setup Guide
## TBF WEB 2026 — Como rodar localmente

> Stack: Next.js 15 · React 19 · Sanity.io · TypeScript 5 · Resend

---

## Pré-requisitos

- Node.js 20+ (recomendado: 22 LTS)
- npm 10+ ou pnpm 9+
- Conta no [Sanity.io](https://sanity.io) (free tier OK para desenvolvimento)
- Acesso ao projeto Sanity (solicitar ao fundador via `/access?intent=tbf`)

---

## 1. Clonar e instalar

```bash
# Clonar o repositório
git clone <repo-url>
cd "1. TBF.COM/frontend"

# Instalar dependências
npm install
```

---

## 2. Variáveis de ambiente

Criar o arquivo `.env.local` na raiz de `/frontend/`:

```bash
# Sanity — obrigatório para qualquer dado do CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=<seu-project-id>
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity token — necessário para ISR / revalidation (read token)
SANITY_API_TOKEN=<seu-read-token>

# Resend — opcional em dev, obrigatório em produção para formulários
RESEND_API_KEY=<sua-api-key>

# E-mail receptor dos formulários de contato
CONTACT_EMAIL=thebrazilianfactory@gmail.com
```

### Como obter os valores Sanity

1. Acesse [sanity.io/manage](https://sanity.io/manage)
2. Selecione o projeto `tbf-web-2026`
3. `NEXT_PUBLIC_SANITY_PROJECT_ID`: na URL do projeto (`manage.sanity.io/projects/<ID>`)
4. `SANITY_API_TOKEN`: Settings → API → Tokens → Create token (Read-only)

---

## 3. Rodar em desenvolvimento

```bash
npm run dev
# → http://localhost:3000
```

O site funciona sem conteúdo no Sanity — todas as páginas têm fallbacks estáticos elegantes.

---

## 4. Sanity Studio (CMS)

O Studio está configurado em `frontend/sanity.config.ts` e roda embutido no Next.js:

```bash
# Studio disponível em:
http://localhost:3000/studio
```

Para rodá-lo separado (opcional):

```bash
cd frontend
npx sanity dev
# → http://localhost:3333
```

---

## 5. Type check e lint

```bash
# TypeScript
npm run type-check

# ESLint
npm run lint
```

---

## 6. Build de produção

```bash
npm run build
npm run start
```

O build usa Next.js ISR (Incremental Static Regeneration) — páginas são regeneradas a cada 3600s (1h) automaticamente.

---

## 7. Estrutura de arquivos

```
frontend/
├── src/
│   ├── app/                   ← Páginas (App Router)
│   │   ├── page.tsx           ← Homepage /
│   │   ├── editorial/         ← /editorial + /editorial/[slug]
│   │   ├── ecosystem/         ← /ecosystem
│   │   ├── melfiore/          ← /melfiore
│   │   ├── runway/            ← /runway
│   │   ├── factory/           ← /factory (BU cashflow)
│   │   ├── manifesto/         ← /manifesto
│   │   ├── collective/        ← /collective
│   │   ├── access/            ← /access
│   │   ├── api/               ← Route handlers
│   │   ├── sitemap.ts         ← Sitemap dinâmico
│   │   ├── robots.ts          ← robots.txt
│   │   └── opengraph-image.tsx← OG image padrão
│   ├── components/            ← 14+ componentes reutilizáveis
│   ├── lib/
│   │   └── sanity.ts          ← Cliente + queries GROQ
│   ├── types/
│   │   └── index.ts           ← Tipos TypeScript
│   └── styles/
│       ├── tokens.css         ← 444 tokens do design system
│       ├── components.css     ← 16 componentes CSS
│       └── globals.css        ← Base + utilitários
├── package.json
├── next.config.ts
└── sanity.config.ts
```

---

## 8. Variáveis opcionais de produção

```bash
# Webhook para ISR on-demand (Sanity → Next.js)
SANITY_WEBHOOK_SECRET=<secret-aleatorio>

# URL base para metadata (padrão: thebrfactory.com)
NEXT_PUBLIC_SITE_URL=https://thebrfactory.com
```

---

*01_setup_guide.md | TBF WEB 2026 | Frontend*
