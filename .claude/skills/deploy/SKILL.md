---
description: Deploy TBF.COM, redireciona para a skill raiz do ecossistema
---

# deploy (TBF.COM)

> **Esta skill não roda um fluxo próprio.** A fonte de verdade é a skill raiz
> `/Users/factory/TBF CODE SYSTEM/.claude/skills/deploy/SKILL.md` (invocada como `/deploy`).
> Ela já cobre TBF.COM na sua tabela de alvos, com o caminho e o protocolo corretos.

Project root correto: `/Users/factory/TBF CODE SYSTEM/1. TBF.COM/frontend`
Repo: `github.com/thebrfactory/TBF-WEB`: branch `main` (produção), `develop` (trabalho)

## Por que este arquivo mudou

A versão anterior tinha o path antigo (`0. TBF | CODE SYSTEM STARTUP/...`, pasta já
renomeada) e descrevia commit/push direto em `main` sem a trava da palavra `DEPLOY`
literal, conflitava com a regra 2 do CLAUDE.md raiz. Use sempre `/deploy` (raiz).
