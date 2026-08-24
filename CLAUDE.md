# CLAUDE.md — TBF-WEB
> thebrfactory.com — sede digital da `.TBF. inc`. Site **em produção** (modo manutenção).
> Este arquivo é autossuficiente: contém o crítico para mexer neste código com segurança.

## Stack e comandos

- Next.js 15 (App Router) + React 19 + Sanity CMS + Resend · deploy Vercel
- `npm run dev` · antes de commitar: `npm run build` + `npm run type-check`
- 🔴 **`build` e `dev` não convivem**: os dois escrevem na mesma `.next`, e o build
  por cima do dev server deixa rotas mortas e um build sujo que depois aparece como
  "erro" em página estática (foi o que travou o deploy em 24/08/2026). O
  `prebuild` (`scripts/build-guard.mjs`) barra a colisão e diz como sair dela.

## Branches e deploy

| Branch | Uso |
|---|---|
| `develop` | Trabalho. Todo desenvolvimento começa e fica aqui. |
| `main` | Produção. Push dispara deploy automático na Vercel (conta `thebrazilianfactory@gmail.com`). |

- **Nunca** merge/push para `main` sem aprovação explícita do usuário
- `.env.local` nunca vai para o repo
- Commits: `fix:` `add:` `update:` `remove:`

## Regras de código e brand (obrigatórias)

- **Mobile-first** — layout, componentes e tipografia partem do mobile e escalam para desktop. Nunca o contrário. (espelhada da raiz do ecossistema)
- Nomes de pessoas e marcas em destaque: peso **extrabold**
- Toda imagem com texto sobreposto recebe **overlay** para legibilidade
- Seções com variantes de layout usam **layout-b no mobile**
- Nunca usar `white-space: nowrap` em texto
- **Sem traços/dividers horizontais** em nenhuma página
- Referência operacional: 032c.com — princípio editorial, nunca cópia estética

## Docs sob demanda

> Paths relativos ao ecossistema local. Em clone isolado (CI/web), pedir os arquivos ao usuário.

| Precisa de | Leia |
|---|---|
| Contexto do negócio (BUs, ICPs) | `../../_SHARED/BUSINESS/tbf-context.md` |
| Contas e acessos | `../../_SHARED/INFRA/accounts.md` |
| Arquitetura do site (rotas, seções) | `../02_SITE_ARCHITECTURE.md` |
| Design tokens | `../design-system/01_tokens.md` |
| Guia de deploy | `04_deploy_guide.md` |
| CMS / Sanity | `02_cms_guide.md` |

## Nunca fazer

- Push direto para `main` sem aprovação
- Commitar `.env.local`
- Adicionar dividers/traços horizontais em qualquer página
