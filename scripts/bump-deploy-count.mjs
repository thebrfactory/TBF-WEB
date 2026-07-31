#!/usr/bin/env node
// =============================================================================
// BUMP DEPLOY COUNT — incrementa o contador de deploys de produção do rodapé.
//
// Uso: npm run deploy:count            → +1 e grava a data de hoje
//      npm run deploy:count -- --check → só imprime o estado atual, não escreve
//
// POR QUE UM ARQUIVO E NÃO GIT/VERCEL:
//   · contar commits mente — um deploy sobe vários commits de uma vez
//     (`git push origin develop:main` é fast-forward de N commits);
//   · a Vercel não expõe índice de deploy em variável de build;
//   · a API de deployments do GitHub tem o número certo, mas exigiria token no
//     build e responderia N-1 no meio do próprio build que a criou.
// Como a skill /deploy é o ÚNICO caminho para produção (hook tbf-main-guard.sh
// bloqueia o resto), incrementar aqui dá o número exato, versionado e auditável
// no git — cada +1 é um commit de deploy.
//
// A SEMENTE (42) veio da verdade histórica, não de chute: deployments de
// ambiente Production registrados pelo Vercel em thebrfactory/TBF-WEB.
//   gh api --paginate "repos/thebrfactory/TBF-WEB/deployments?per_page=100" \
//     --jq '.[].environment' | sort | uniq -c
// =============================================================================

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const FILE = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'deploy-count.json')

const data = JSON.parse(readFileSync(FILE, 'utf8'))

if (process.argv.includes('--check')) {
  console.log(`deploy atual: #${data.deploys} (${data.lastDeployAt}) · versão ${data.version}`)
  process.exit(0)
}

data.deploys += 1
data.lastDeployAt = new Date().toISOString().slice(0, 10)

writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n')
console.log(`deploy #${data.deploys} registrado (${data.lastDeployAt}).`)
